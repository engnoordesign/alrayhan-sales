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
// Set TRUST_PROXY=1 only when the app sits behind a reverse proxy (Caddy/nginx) and its port is
// NOT reachable directly. Then the real visitor IP / https come from X-Forwarded-For / -Proto.
const TRUST_PROXY = /^(1|true|yes)$/i.test(process.env.TRUST_PROXY || '');
const MIN_PASSWORD = 8;
const COMMON_PASSWORDS = new Set(['12345678', '123456789', '1234567890', '87654321', '11111111', '00000000', 'password', 'password1',
  'master123', 'qwertyui', 'qwerty123', 'abcd1234', '1q2w3e4r', 'iloveyou', 'alrayhan', 'alrayhan1', 'alrayhan123', 'admin123', 'seller123']);

// ---------- storage ----------
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return { salt, hash };
}
// async version for the login path so a burst of logins can't freeze the server
const scryptAsync = (pw, salt) => new Promise((ok, fail) => crypto.scrypt(String(pw), salt, 64, (e, k) => (e ? fail(e) : ok(k))));
const DUMMY = hashPassword(crypto.randomBytes(16).toString('hex'));
async function checkPassword(password, user) {
  const u = user || DUMMY; // unknown username still costs the same time (no username guessing by timing)
  const key = await scryptAsync(password, u.salt);
  return crypto.timingSafeEqual(key, Buffer.from(u.hash, 'hex')) && !!user;
}
// returns an error code, or null when the password is acceptable
function passwordProblem(password, username) {
  const p = String(password ?? '');
  if (p.length < MIN_PASSWORD) return 'short_password';
  if (p.length > 200) return 'bad_password';
  if (COMMON_PASSWORDS.has(p.toLowerCase()) || p.toLowerCase() === String(username || '').toLowerCase() || /^(.)\1+$/.test(p)) return 'weak_password';
  return null;
}
function newId() { return crypto.randomBytes(8).toString('hex'); }
// 'service' = hidden maintenance account for the developer: every master power, but masters can't
// see, edit, delete or create it. It is only made from the server (SERVICE_PASSWORD or the command line).
const ROLES = ['service', 'master', 'supervisor', 'seller'];
const ASSIGNABLE_ROLES = ['master', 'supervisor', 'seller']; // what the Users screen may set
const cleanRole = r => (ROLES.includes(r) ? r : 'seller');
const assignableRole = r => (ASSIGNABLE_ROLES.includes(r) ? r : 'seller');
const hasMasterPower = u => !!u && (u.role === 'master' || u.role === 'service');
const USERNAME_RE = /^[a-z0-9_.-]{3,30}$/;
const cleanUsername = s => cleanText(s, 30).toLowerCase();
const usernameTaken = (name, exceptId) => db.users.some(u => u.id !== exceptId && u.username.toLowerCase() === name);

function randomPassword() {
  const abc = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from(crypto.randomBytes(12), b => abc[b % abc.length]).join('');
}
function announcePassword(username, password, why) {
  const line = '='.repeat(60);
  console.log(`\n${line}\n  ${why}\n  Username: ${username}\n  Password: ${password}\n  Sign in and change it in Settings → Users.\n${line}\n`);
}

function freshDb() {
  // first run: no default passwords. The master password comes from ADMIN_PASSWORD or is generated
  // randomly and printed once in the server log. Sellers are created by the master in Settings.
  let pw = process.env.ADMIN_PASSWORD || '';
  if (passwordProblem(pw, 'master')) {
    if (pw) console.warn('ADMIN_PASSWORD is too weak (8+ characters, not a common password) — generating one instead.');
    pw = randomPassword();
    announcePassword('master', pw, 'Alrayhan Sales — first sign-in');
  }
  const master = hashPassword(pw);
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
      { id: newId(), username: 'master', name: 'المدير', role: 'master', branch: null, salt: master.salt, hash: master.hash, createdAt: new Date().toISOString() }
    ],
    transactions: []
  };
}

let db;
function loadDb() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) { db = freshDb(); saveDb(); ensureServiceAccount(); return; }
  db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
  // upgrade older databases: every user gets a known role and a branch field
  for (const u of db.users) { u.role = cleanRole(u.role); if (u.branch === undefined) u.branch = null; }
  ensureServiceAccount();
  // older installs were created with the public default passwords — warn loudly until they are changed
  for (const [name, pw] of [['master', 'master123'], ['seller', '1234']]) {
    const u = db.users.find(x => x.username === name);
    if (u && hashPassword(pw, u.salt).hash === u.hash) {
      console.warn(`\n!!! SECURITY: user "${name}" still has the default password "${pw}" (it is public on GitHub).` +
        `\n!!! Change it now in Settings → Users, or run:  node server.js reset-password ${name}\n`);
    }
  }
}
// Creates the hidden service account on start when SERVICE_PASSWORD is set and none exists yet.
// SERVICE_USERNAME picks its login name (default "service"). An existing service account is never changed here —
// use `node server.js service-account ...` to reset it.
function ensureServiceAccount() {
  const pw = process.env.SERVICE_PASSWORD || '';
  if (!pw || db.users.some(u => u.role === 'service')) return;
  const username = cleanUsername(process.env.SERVICE_USERNAME || 'service');
  if (!USERNAME_RE.test(username) || usernameTaken(username)) { console.warn(`Service account not created: username "${username}" is invalid or taken.`); return; }
  const err = passwordProblem(pw, username);
  if (err) { console.warn(`Service account not created: SERVICE_PASSWORD is not allowed (${err}) — use 8+ characters, not a common password.`); return; }
  const h = hashPassword(pw);
  db.users.push({ id: newId(), username, name: 'الدعم الفني', role: 'service', branch: null, salt: h.salt, hash: h.hash, createdAt: new Date().toISOString() });
  saveDb();
  console.log(`  Service account "${username}" created.`);
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
// drop expired sessions and old login-failure records every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [tok, s] of sessions) if (s.expires < now) sessions.delete(tok);
  for (const m of [failures, userFailures]) for (const [k, f] of m) if (now - f.first > FAIL_WINDOW) m.delete(k);
}, 10 * 60e3).unref();
function getUser(req) {
  const cookie = req.headers.cookie || '';
  const m = cookie.match(/(?:^|;\s*)ars=([a-f0-9]+)/);
  if (!m) return null;
  const s = sessions.get(m[1]);
  if (!s || s.expires < Date.now()) { sessions.delete(m[1]); return null; }
  const user = db.users.find(u => u.id === s.userId);
  return user ? { user, token: m[1] } : null;
}
function publicUser(u) { return { id: u.id, username: u.username, name: u.name, role: u.role, branch: u.branch || null, createdAt: u.createdAt }; }

// login rate limits (10-minute window):
//  - 8 failed tries per visitor IP
//  - 15 failed tries per username from any IPs (stops slow password guessing on the master account)
const FAIL_WINDOW = 10 * 60e3;
const failures = new Map(), userFailures = new Map();
function tooMany(map, key, max) {
  const f = map.get(key);
  if (!f) return false;
  if (Date.now() - f.first > FAIL_WINDOW) { map.delete(key); return false; }
  return f.count >= max;
}
function note(map, key) {
  const f = map.get(key);
  if (!f || Date.now() - f.first > FAIL_WINDOW) map.set(key, { count: 1, first: Date.now() });
  else f.count++;
}
// the visitor's real IP (behind a trusted proxy: the last address the proxy added)
function clientIp(req) {
  if (TRUST_PROXY) {
    const xff = String(req.headers['x-forwarded-for'] || '').split(',').map(s => s.trim()).filter(Boolean);
    if (xff.length) return xff[xff.length - 1];
  }
  return req.socket.remoteAddress || '';
}
const isHttps = req => !!req.socket.encrypted || (TRUST_PROXY && String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim() === 'https');

// ---------- helpers ----------
// browser protections sent with every response
const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; " +
    "connect-src 'self'; manifest-src 'self'; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin'
};
function securityHeaders(res) {
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);
  if (res.req && isHttps(res.req)) res.setHeader('Strict-Transport-Security', 'max-age=31536000');
}
function send(res, status, body, headers = {}) {
  const isObj = typeof body === 'object' && !Buffer.isBuffer(body);
  securityHeaders(res);
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
    let over = false;
    req.on('data', c => {
      if (over) return;
      size += c.length;
      if (size > limit) { over = true; chunks.length = 0; reject(new Error('too_large')); } else chunks.push(c);
    });
    req.on('end', () => {
      if (over) return;
      if (!chunks.length) return resolve({});
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new Error('bad_json')); }
    });
    req.on('error', reject);
  });
}
const round = (n, d) => Math.round(n * 10 ** d) / 10 ** d;
const cleanText = (s, max = 120) => String(s ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
// stop Excel from running text that starts with = + - @ as a formula
const csvSafe = v => (typeof v === 'string' && /^[=+\-@\t\r]/.test(v) ? "'" + v : v);

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.ttf': 'font/ttf', '.woff2': 'font/woff2',
  '.json': 'application/json', '.pdf': 'application/pdf', '.webmanifest': 'application/manifest+json'
};
function serveStatic(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'Method not allowed', { Allow: 'GET, HEAD' });
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); } catch { return send(res, 400, 'Bad request'); }
  if (p.includes('\0')) return send(res, 400, 'Bad request');
  if (p === '/') p = '/index.html';
  const file = path.normalize(path.join(PUBLIC_DIR, p));
  if (!file.startsWith(PUBLIC_DIR + path.sep)) return send(res, 403, 'Forbidden');
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'Not found');
    securityHeaders(res);
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}

// ---------- API ----------
async function api(req, res, url) {
  const method = req.method;
  const route = url.pathname.replace(/^\/api/, '');
  const ip = clientIp(req);
  const secure = isHttps(req) ? '; Secure' : '';

  if (route === '/login' && method === 'POST') {
    if (tooMany(failures, ip, 8)) return send(res, 429, { error: 'too_many_attempts' });
    const b = await readBody(req, 4096);
    const uname = String(b.username || '').trim().toLowerCase().slice(0, 60);
    if (tooMany(userFailures, uname, 15)) return send(res, 429, { error: 'too_many_attempts' });
    const user = db.users.find(u => u.username.toLowerCase() === uname);
    const ok = await checkPassword(String(b.password || '').slice(0, 200), user);
    if (!ok) { note(failures, ip); note(userFailures, uname); return send(res, 401, { error: 'bad_login' }); }
    failures.delete(ip); userFailures.delete(uname);
    // keep at most 20 open sessions per user
    const mine = [...sessions].filter(([, s]) => s.userId === user.id);
    while (mine.length >= 20) sessions.delete(mine.shift()[0]);
    const token = createSession(user.id);
    return send(res, 200, { user: publicUser(user) }, {
      'Set-Cookie': `ars=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_HOURS * 3600}${secure}`
    });
  }

  if (route === '/public' && method === 'GET') {
    const s = db.settings;
    return send(res, 200, { branches: s.branches, logo: s.logo });
  }

  const auth = getUser(req);
  if (!auth) return send(res, 401, { error: 'not_logged_in' });
  const me = auth.user;
  const isMaster = hasMasterPower(me); // master or the hidden service account
  const isService = me.role === 'service';
  const canInspect = isMaster || me.role === 'supervisor'; // supervisor: read-only, sees everything
  // only the service account itself (or another service account) can see or touch a service account
  const visibleTo = u => u.role !== 'service' || isService;
  const masterOnly = () => { if (!isMaster) { send(res, 403, { error: 'master_only' }); return false; } return true; };
  const inspectOnly = () => { if (!canInspect) { send(res, 403, { error: 'no_access' }); return false; } return true; };
  const validBranch = id => db.settings.branches.some(b => b.id === id);

  if (route === '/logout' && method === 'POST') {
    sessions.delete(auth.token);
    return send(res, 200, { ok: true }, { 'Set-Cookie': `ars=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secure}` });
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
    if (me.role === 'supervisor') return send(res, 403, { error: 'read_only' });
    const b = await readBody(req);
    // a seller with an assigned branch always records into that branch
    if (me.role === 'seller' && me.branch && validBranch(me.branch)) b.branch = me.branch;
    if (!['sell', 'buy'].includes(b.type)) return send(res, 400, { error: 'bad_type' });
    if (!['USD', 'IQD'].includes(b.currency)) return send(res, 400, { error: 'bad_currency' });
    const branch = db.settings.branches.find(x => x.id === b.branch);
    if (!branch) return send(res, 400, { error: 'bad_branch' });
    const dp = b.currency === 'USD' ? 2 : 0;
    if (Array.isArray(b.items) && b.items.length > 100) return send(res, 400, { error: 'too_many_items' });
    const maxPrice = b.currency === 'USD' ? 1e7 : 1e10; // sanity limits so a typo or attack can't corrupt totals
    const items = (Array.isArray(b.items) ? b.items : []).filter(it => it && typeof it === 'object').map(it => {
      const qty = Number(it.qty), price = Number(it.price);
      return { name: cleanText(it.name), qty, price: round(price, dp) };
    }).filter(it => it.name && Number.isFinite(it.qty) && Number.isFinite(it.price) && it.qty > 0 && it.qty <= 1e6 && it.price >= 0 && it.price <= maxPrice);
    if (!items.length) return send(res, 400, { error: 'no_items' });
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
    if (!inspectOnly()) return;
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
    if (!inspectOnly()) return;
    const from = url.searchParams.get('from'), to = url.searchParams.get('to'), branchQ = url.searchParams.get('branch');
    const typeQ = url.searchParams.get('type');
    const fromD = from ? new Date(from) : null, toD = to ? new Date(to) : null;
    const name = cleanText(url.searchParams.get('name') || 'alrayhan-sales', 60).replace(/[^A-Za-z0-9_.-]/g, '-');
    const rows = [['no', 'date', 'time', 'type', 'branch', 'item', 'qty', 'price', 'subtotal', 'currency', 'rate_iqd_per_usd', 'user', 'note']];
    for (const t of db.transactions) {
      const d = new Date(t.at);
      if (fromD && d < fromD) continue;
      if (toD && d >= toD) continue;
      if (branchQ && branchQ !== 'all' && t.branch !== branchQ) continue;
      if (typeQ === 'sell' || typeQ === 'buy') { if (t.type !== typeQ) continue; }
      const br = db.settings.branches.find(b => b.id === t.branch);
      for (const it of t.items) rows.push([t.no, d.toLocaleDateString('en-CA'), d.toLocaleTimeString('en-GB'), t.type, csvSafe(br ? br.nameEn : t.branch), csvSafe(it.name), it.qty, it.price, it.subtotal, t.currency, t.rate, csvSafe(t.userName), csvSafe(t.note)]);
    }
    const csv = '\ufeff' + rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    return send(res, 200, csv, { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${name}.csv"` });
  }

  // ----- users (master) -----
  if (route === '/users' && method === 'GET') { if (!masterOnly()) return; return send(res, 200, db.users.filter(visibleTo).map(publicUser)); }
  if (route === '/users' && method === 'POST') {
    if (!masterOnly()) return;
    const b = await readBody(req);
    const username = cleanUsername(b.username);
    if (!USERNAME_RE.test(username)) return send(res, 400, { error: 'bad_username' });
    if (usernameTaken(username)) return send(res, 409, { error: 'username_taken' });
    const pwErr = passwordProblem(b.password, username);
    if (pwErr) return send(res, 400, { error: pwErr });
    const role = assignableRole(b.role); // a service account can never be created from the screen
    if (role === 'seller' && b.branch && !validBranch(b.branch)) return send(res, 400, { error: 'bad_branch' });
    const branch = role === 'seller' && b.branch ? b.branch : null;
    const h = hashPassword(b.password);
    const u = { id: newId(), username, name: cleanText(b.name, 40) || username, role, branch, salt: h.salt, hash: h.hash, createdAt: new Date().toISOString() };
    db.users.push(u); saveDb();
    return send(res, 201, publicUser(u));
  }
  const userRoute = route.match(/^\/users\/([a-f0-9]+)$/);
  if (userRoute && method === 'PUT') {
    if (!masterOnly()) return;
    const u = db.users.find(x => x.id === userRoute[1]);
    if (!u || !visibleTo(u)) return send(res, 404, { error: 'not_found' });
    const b = await readBody(req);
    // check everything first, then change — so a bad field never leaves a half-saved user
    let newUsername = null;
    if (b.username !== undefined) {
      newUsername = cleanUsername(b.username);
      if (!USERNAME_RE.test(newUsername)) return send(res, 400, { error: 'bad_username' });
      if (usernameTaken(newUsername, u.id)) return send(res, 409, { error: 'username_taken' });
    }
    if (b.password !== undefined) {
      const pwErr = passwordProblem(b.password, newUsername || u.username);
      if (pwErr) return send(res, 400, { error: pwErr });
    }
    if (b.branch !== undefined && b.branch && !validBranch(b.branch)) return send(res, 400, { error: 'bad_branch' });
    // a service account's role is fixed; nobody can turn a user into one from the screen
    const roleChange = b.role !== undefined && u.id !== me.id && u.role !== 'service';
    if (roleChange && !ASSIGNABLE_ROLES.includes(b.role)) return send(res, 400, { error: 'bad_role' });
    if (roleChange && u.role === 'master' && b.role !== 'master' && db.users.filter(x => x.role === 'master').length === 1) return send(res, 400, { error: 'last_master' });

    if (newUsername) u.username = newUsername;
    if (b.password !== undefined) {
      Object.assign(u, hashPassword(b.password));
      for (const [tok, s] of sessions) if (s.userId === u.id && tok !== auth.token) sessions.delete(tok);
    }
    if (b.name !== undefined) u.name = cleanText(b.name, 40) || u.name;
    if (roleChange) u.role = b.role;
    if (b.branch !== undefined) u.branch = b.branch || null;
    if (u.role !== 'seller') u.branch = null; // only sellers are tied to a branch
    if (roleChange || b.branch !== undefined) {
      // role / branch changed: sign the user out so the new access applies right away
      for (const [tok, s] of sessions) if (s.userId === u.id && tok !== auth.token) sessions.delete(tok);
    }
    saveDb();
    return send(res, 200, publicUser(u));
  }
  if (userRoute && method === 'DELETE') {
    if (!masterOnly()) return;
    if (userRoute[1] === me.id) return send(res, 400, { error: 'cannot_delete_self' });
    const i = db.users.findIndex(x => x.id === userRoute[1]);
    if (i < 0 || !visibleTo(db.users[i])) return send(res, 404, { error: 'not_found' });
    // never remove the last account that can manage the system
    const managers = db.users.filter(x => x.role === 'master');
    if (db.users[i].role === 'master' && managers.length === 1) return send(res, 400, { error: 'last_master' });
    db.users.splice(i, 1);
    for (const [tok, s] of sessions) if (s.userId === userRoute[1]) sessions.delete(tok);
    saveDb();
    return send(res, 200, { ok: true });
  }

  return send(res, 404, { error: 'unknown_route' });
}

// ---------- command line: reset a forgotten password ----------
//   node server.js reset-password <username> [new-password]
// Stop the running server first (Docker: docker compose stop), run this, then start it again.
if (process.argv[2] === 'reset-password') {
  loadDb();
  const name = String(process.argv[3] || '').toLowerCase();
  const u = db.users.find(x => x.username === name);
  if (!u) { console.error(`No user "${name}". Users: ${db.users.map(x => x.username).join(', ')}`); process.exit(1); }
  let pw = process.argv[4] || '';
  const err = pw && passwordProblem(pw, u.username);
  if (err) { console.error(`That password is not allowed (${err}): use 8+ characters, not a common password.`); process.exit(1); }
  if (!pw) pw = randomPassword();
  Object.assign(u, hashPassword(pw));
  saveDb();
  announcePassword(u.username, pw, 'Password reset');
  process.exit(0);
}

// ---------- command line: create / reset the hidden service account ----------
//   node server.js service-account [username] [new-password]
// Creates it if there is none (default username "service"), otherwise renames it / sets a new password.
if (process.argv[2] === 'service-account') {
  loadDb();
  const wanted = cleanUsername(process.argv[3] || '');
  let u = db.users.find(x => x.role === 'service');
  const username = wanted || (u ? u.username : 'service');
  if (!USERNAME_RE.test(username)) { console.error('Username: 3–30 English letters, numbers, _ . -'); process.exit(1); }
  if (usernameTaken(username, u && u.id)) { console.error(`The username "${username}" is already used by another account.`); process.exit(1); }
  let pw = process.argv[4] || '';
  const err = pw && passwordProblem(pw, username);
  if (err) { console.error(`That password is not allowed (${err}): use 8+ characters, not a common password.`); process.exit(1); }
  if (!pw) pw = randomPassword();
  if (!u) { u = { id: newId(), name: 'الدعم الفني', role: 'service', branch: null, createdAt: new Date().toISOString() }; db.users.push(u); }
  u.username = username;
  Object.assign(u, hashPassword(pw));
  saveDb();
  announcePassword(u.username, pw, 'Service account ready (hidden from the Users screen)');
  process.exit(0);
}

// ---------- start ----------
loadDb();
dailyBackup();
setInterval(dailyBackup, 3600e3);

const server = http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, 'http://localhost'); } catch { return send(res, 400, 'Bad request'); }
  try {
    if (url.pathname.startsWith('/api/')) {
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
        // block cross-site requests: the app always sends JSON, which a plain HTML form can't do
        const ctype = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
        if (ctype !== 'application/json') return send(res, 415, { error: 'json_only' });
        const site = req.headers['sec-fetch-site'];
        if (site && !['same-origin', 'none'].includes(site)) return send(res, 403, { error: 'bad_origin' });
        const origin = req.headers.origin;
        // behind a proxy (e.g. GitHub Codespaces) the public host arrives in X-Forwarded-Host;
        // browsers can't set that header on cross-site requests, so the check stays safe
        const allowed = [req.headers.host, ...String(req.headers['x-forwarded-host'] || '').split(',').map(s => s.trim())].filter(Boolean);
        let originHost = null; try { originHost = origin ? new URL(origin).host : null; } catch { originHost = '?'; }
        if (origin && !allowed.includes(originHost)) return send(res, 403, { error: 'bad_origin' });
      }
      return await api(req, res, url);
    }
    serveStatic(req, res);
  } catch (e) {
    const known = ['bad_json', 'too_large'].includes(e.message);
    if (!known) console.error(e);
    // never send internal error details to the browser
    if (!res.headersSent) send(res, e.message === 'too_large' ? 413 : known ? 400 : 500, { error: known ? e.message : 'server_error' }, e.message === 'too_large' ? { Connection: 'close' } : {});
  }
});
server.requestTimeout = 60e3;   // slow-request protection
server.headersTimeout = 20e3;

server.listen(PORT, '0.0.0.0', () => {
  const addrs = Object.values(os.networkInterfaces()).flat().filter(a => a && a.family === 'IPv4' && !a.internal).map(a => a.address);
  console.log('\n  Alrayhan Sales is running');
  console.log(`  On this computer:   http://localhost:${PORT}`);
  for (const a of addrs) console.log(`  On the shop network: http://${a}:${PORT}`);
  console.log('\n  Keep this window open while the shop is working.\n');
});
