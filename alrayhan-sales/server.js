// Alrayhan Sales — local sales & purchases system for Alrayhan Perfumes
// Zero-dependency Node.js server (Node 18+). Run: node server.js
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const SESSION_HOURS = 12;

// ---------- storage ----------
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return { salt, hash };
}
function checkPassword(password, user) {
  const { hash } = hashPassword(password, user.salt);
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(user.hash, 'hex'));
}
function newId() { return crypto.randomBytes(8).toString('hex'); }

function freshDb() {
  const master = hashPassword('master123');
  const seller = hashPassword('1234');
  return {
    version: 1,
    settings: {
      shopName: 'Alrayhan Perfumes',
      shopNameAr: 'عطور الريحان',
      rate: 1310, // IQD per 1 USD
      branches: [
        { id: 'b1', nameAr: 'فرع حي البلديات', nameEn: 'Al-Baladiyat branch' },
        { id: 'b2', nameAr: 'فرع حي المثنى', nameEn: 'Al-Muthanna branch' }
      ],
      logo: null // data URL uploaded by master
    },
    users: [
      { id: newId(), username: 'master', name: 'المدير', role: 'master', salt: master.salt, hash: master.hash, createdAt: new Date().toISOString() },
      { id: newId(), username: 'seller', name: 'البائع', role: 'seller', salt: seller.salt, hash: seller.hash, createdAt: new Date().toISOString() }
    ],
    transactions: []
  };
}

let db;
function loadDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) { db = freshDb(); saveDb(); return; }
  db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function saveDb() {
  const tmp = DB_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(db, null, 1));
  fs.renameSync(tmp, DB_FILE);
}
// one backup copy per day, kept for 60 days
function dailyBackup() {
  try {
    if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const d = new Date();
    const name = `db-${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}.json`;
    const target = path.join(BACKUP_DIR, name);
    if (!fs.existsSync(target) && fs.existsSync(DB_FILE)) fs.copyFileSync(DB_FILE, target);
    const files = fs.readdirSync(BACKUP_DIR).filter(f => f.startsWith('db-')).sort();
    while (files.length > 60) fs.unlinkSync(path.join(BACKUP_DIR, files.shift()));
  } catch (e) { console.error('Backup failed:', e.message); }
}

// ---------- sessions ----------
const sessions = new Map(); // token -> { userId, expires }
function createSession(userId) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, { userId, expires: Date.now() + SESSION_HOURS * 3600e3 });
  return token;
}
function getUser(req) {
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/(?:^|;\s*)ars=([a-f0-9]+)/);
  if (!m) return null;
  const s = sessions.get(m[1]);
  if (!s || s.expires < Date.now()) { sessions.delete(m[1]); return null; }
  const user = db.users.find(u => u.id === s.userId);
  return user ? { user, token: m[1] } : null;
}
function publicUser(u) { return { id: u.id, username: u.username, name: u.name, role: u.role, createdAt: u.createdAt }; }

// login rate limit: 8 failed tries per 10 min per IP
const failures = new Map();
function tooManyFailures(ip) {
  const f = failures.get(ip);
  if (!f) return false;
  if (Date.now() - f.first > 10 * 60e3) { failures.delete(ip); return false; }
  return f.count >= 8;
}
function noteFailure(ip) {
  const f = failures.get(ip);
  if (!f || Date.now() - f.first > 10 * 60e3) failures.set(ip, { count: 1, first: Date.now() });
  else f.count++;
}

// ---------- helpers ----------
function send(res, status, body, headers = {}) {
  const isObj = typeof body === 'object' && !Buffer.isBuffer(body);
  res.writeHead(status, {
    'Content-Type': isObj ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(isObj ? JSON.stringify(body) : body);
}
function readBody(req, limit = 3 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => { size += c.length; if (size > limit) { reject(new Error('too_large')); req.destroy(); } else chunks.push(c); });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new Error('bad_json')); }
    });
    req.on('error', reject);
  });
}
const round = (n, d) => Math.round(n * 10 ** d) / 10 ** d;
const cleanText = (s, max = 120) => String(s ?? '').replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, max);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.woff2': 'font/woff2',
  '.json': 'application/json', '.pdf': 'application/pdf'
};
function serveStatic(req, res) {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p === '/') p = '/index.html';
  const file = path.normalize(path.join(PUBLIC_DIR, p));
  if (!file.startsWith(PUBLIC_DIR)) return send(res, 403, 'Forbidden');
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}

// ---------- API ----------
async function api(req, res, url) {
  const method = req.method;
  const route = url.pathname.replace(/^\/api/, '');
  const ip = req.socket.remoteAddress || '';

  if (route === '/login' && method === 'POST') {
    if (tooManyFailures(ip)) return send(res, 429, { error: 'too_many_attempts' });
    const { username, password } = await readBody(req);
    const user = db.users.find(u => u.username.toLowerCase() === String(username || '').trim().toLowerCase());
    if (!user || !checkPassword(password || '', user)) { noteFailure(ip); return send(res, 401, { error: 'bad_login' }); }
    failures.delete(ip);
    const token = createSession(user.id);
    return send(res, 200, { user: publicUser(user) }, {
      'Set-Cookie': `ars=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_HOURS * 3600}`
    });
  }

  if (route === '/public' && method === 'GET') {
    const s = db.settings;
    return send(res, 200, { branches: s.branches, logo: s.logo });
  }

  const auth = getUser(req);
  if (!auth) return send(res, 401, { error: 'not_logged_in' });
  const me = auth.user;
  const isMaster = me.role === 'master';
  const masterOnly = () => { if (!isMaster) { send(res, 403, { error: 'master_only' }); return false; } return true; };

  if (route === '/logout' && method === 'POST') {
    sessions.delete(auth.token);
    return send(res, 200, { ok: true }, { 'Set-Cookie': 'ars=; Path=/; Max-Age=0' });
  }
  if (route === '/me' && method === 'GET') return send(res, 200, { user: publicUser(me) });

  if (route === '/settings' && method === 'GET') return send(res, 200, db.settings);
  if (route === '/settings' && method === 'PUT') {
    if (!masterOnly()) return;
    const b = await readBody(req);
    const s = db.settings;
    if (b.rate !== undefined) {
      const r = Number(b.rate);
      if (!(r > 0 && r < 1e6)) return send(res, 400, { error: 'bad_rate' });
      s.rate = r;
    }
    if (Array.isArray(b.branches)) {
      s.branches = s.branches.map(br => {
        const nb = b.branches.find(x => x.id === br.id) || {};
        return { id: br.id, nameAr: cleanText(nb.nameAr ?? br.nameAr, 60) || br.nameAr, nameEn: cleanText(nb.nameEn ?? br.nameEn, 60) || br.nameEn };
      });
    }
    if (b.logo !== undefined) {
      if (b.logo === null) s.logo = null;
      else if (/^data:image\/(png|jpeg|webp|svg\+xml);base64,/.test(b.logo) && b.logo.length < 2.5e6) s.logo = b.logo;
      else return send(res, 400, { error: 'bad_logo' });
    }
    saveDb();
    return send(res, 200, s);
  }

  if (route === '/items' && method === 'GET') {
    const names = new Map();
    for (const t of db.transactions) for (const it of t.items) names.set(it.name.toLowerCase(), it.name);
    return send(res, 200, [...names.values()].sort().slice(0, 500));
  }

  if (route === '/transactions' && method === 'POST') {
    const b = await readBody(req);
    if (!['sell', 'buy'].includes(b.type)) return send(res, 400, { error: 'bad_type' });
    if (!['USD', 'IQD'].includes(b.currency)) return send(res, 400, { error: 'bad_currency' });
    const branch = db.settings.branches.find(x => x.id === b.branch);
    if (!branch) return send(res, 400, { error: 'bad_branch' });
    const dp = b.currency === 'USD' ? 2 : 0;
    const items = (Array.isArray(b.items) ? b.items : []).map(it => {
      const qty = Number(it.qty), price = Number(it.price);
      return { name: cleanText(it.name), qty, price: round(price, dp) };
    }).filter(it => it.name && it.qty > 0 && it.price >= 0);
    if (!items.length) return send(res, 400, { error: 'no_items' });
    if (items.length > 100) return send(res, 400, { error: 'too_many_items' });
    for (const it of items) { it.qty = round(it.qty, 3); it.subtotal = round(it.qty * it.price, dp); }
    const tx = {
      id: newId(),
      no: (db.transactions.reduce((m, t) => Math.max(m, t.no || 0), 0)) + 1,
      type: b.type,
      branch: branch.id,
      currency: b.currency,
      rate: db.settings.rate,
      items,
      total: round(items.reduce((s, it) => s + it.subtotal, 0), dp),
      note: cleanText(b.note, 200),
      at: new Date().toISOString(),
      userId: me.id,
      userName: me.name || me.username
    };
    db.transactions.push(tx);
    saveDb();
    return send(res, 201, tx);
  }

  if (route === '/transactions/recent' && method === 'GET') {
    // the logged-in user's own entries from today (sellers see only these)
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const list = db.transactions.filter(t => t.userId === me.id && new Date(t.at) >= start).slice(-8).reverse();
    return send(res, 200, list);
  }

  if (route === '/transactions' && method === 'GET') {
    if (!masterOnly()) return;
    const from = url.searchParams.get('from'), to = url.searchParams.get('to'), branch = url.searchParams.get('branch');
    const f = from ? new Date(from) : null, tt = to ? new Date(to) : null;
    const list = db.transactions.filter(t => {
      const d = new Date(t.at);
      if (f && d < f) return false;
      if (tt && d >= tt) return false;
      if (branch && branch !== 'all' && t.branch !== branch) return false;
      return true;
    });
    return send(res, 200, list);
  }

  const delTx = route.match(/^\/transactions\/([a-f0-9]+)$/);
  if (delTx && method === 'DELETE') {
    if (!masterOnly()) return;
    const i = db.transactions.findIndex(t => t.id === delTx[1]);
    if (i < 0) return send(res, 404, { error: 'not_found' });
    db.transactions.splice(i, 1);
    saveDb();
    return send(res, 200, { ok: true });
  }

  if (route === '/export.csv' && method === 'GET') {
    if (!masterOnly()) return;
    const rows = [['no', 'date', 'time', 'type', 'branch', 'item', 'qty', 'price', 'subtotal', 'currency', 'rate_iqd_per_usd', 'user', 'note']];
    for (const t of db.transactions) {
      const d = new Date(t.at);
      const br = db.settings.branches.find(b => b.id === t.branch);
      for (const it of t.items) rows.push([t.no, d.toLocaleDateString('en-CA'), d.toLocaleTimeString('en-GB'), t.type, br ? br.nameEn : t.branch, it.name, it.qty, it.price, it.subtotal, t.currency, t.rate, t.userName, t.note]);
    }
    const csv = '\ufeff' + rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    return send(res, 200, csv, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="alrayhan-sales.csv"' });
  }

  // ----- users (master) -----
  if (route === '/users' && method === 'GET') { if (!masterOnly()) return; return send(res, 200, db.users.map(publicUser)); }
  if (route === '/users' && method === 'POST') {
    if (!masterOnly()) return;
    const b = await readBody(req);
    const username = cleanText(b.username, 30).toLowerCase();
    if (!/^[a-z0-9_.-]{3,30}$/.test(username)) return send(res, 400, { error: 'bad_username' });
    if (db.users.some(u => u.username === username)) return send(res, 409, { error: 'username_taken' });
    if (String(b.password || '').length < 4) return send(res, 400, { error: 'short_password' });
    const role = b.role === 'master' ? 'master' : 'seller';
    const h = hashPassword(b.password);
    const u = { id: newId(), username, name: cleanText(b.name, 40) || username, role, salt: h.salt, hash: h.hash, createdAt: new Date().toISOString() };
    db.users.push(u); saveDb();
    return send(res, 201, publicUser(u));
  }
  const userRoute = route.match(/^\/users\/([a-f0-9]+)$/);
  if (userRoute && method === 'PUT') {
    if (!masterOnly()) return;
    const u = db.users.find(x => x.id === userRoute[1]);
    if (!u) return send(res, 404, { error: 'not_found' });
    const b = await readBody(req);
    if (b.password !== undefined) {
      if (String(b.password).length < 4) return send(res, 400, { error: 'short_password' });
      Object.assign(u, hashPassword(b.password));
      for (const [tok, s] of sessions) if (s.userId === u.id && tok !== auth.token) sessions.delete(tok);
    }
    if (b.name !== undefined) u.name = cleanText(b.name, 40) || u.name;
    if (b.role !== undefined && u.id !== me.id) u.role = b.role === 'master' ? 'master' : 'seller';
    saveDb();
    return send(res, 200, publicUser(u));
  }
  if (userRoute && method === 'DELETE') {
    if (!masterOnly()) return;
    if (userRoute[1] === me.id) return send(res, 400, { error: 'cannot_delete_self' });
    const i = db.users.findIndex(x => x.id === userRoute[1]);
    if (i < 0) return send(res, 404, { error: 'not_found' });
    db.users.splice(i, 1);
    for (const [tok, s] of sessions) if (s.userId === userRoute[1]) sessions.delete(tok);
    saveDb();
    return send(res, 200, { ok: true });
  }

  return send(res, 404, { error: 'unknown_route' });
}

// ---------- start ----------
loadDb();
dailyBackup();
setInterval(dailyBackup, 3600e3);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  try {
    if (url.pathname.startsWith('/api/')) {
      if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
        // block cross-site requests
        const origin = req.headers.origin;
        if (origin && new URL(origin).host !== req.headers.host) return send(res, 403, { error: 'bad_origin' });
      }
      return await api(req, res, url);
    }
    serveStatic(req, res);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) send(res, e.message === 'bad_json' || e.message === 'too_large' ? 400 : 500, { error: e.message || 'server_error' });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  const addrs = Object.values(os.networkInterfaces()).flat().filter(a => a && a.family === 'IPv4' && !a.internal).map(a => a.address);
  console.log('\n  Alrayhan Sales is running');
  console.log(`  On this computer:   http://localhost:${PORT}`);
  for (const a of addrs) console.log(`  On the shop network: http://${a}:${PORT}`);
  console.log('\n  Keep this window open while the shop is working.\n');
});
