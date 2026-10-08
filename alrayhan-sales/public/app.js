/* Alrayhan Sales — frontend */
'use strict';

const T = {
  ar: {
    loginSub: 'نظام البيع والشراء لعطور الريحان', username: 'اسم المستخدم', password: 'كلمة المرور', branch: 'الفرع', signIn: 'تسجيل الدخول',
    tabDesk: 'البيع والشراء', tabHistory: 'السجلات', tabSettings: 'الإعدادات',
    sell: 'بيع', sellHint: 'تسجيل مواد مباعة للزبون', buy: 'شراء', buyHint: 'تسجيل مواد مشتراة للمحل',
    recentTitle: 'قيودك اليوم', noRecent: 'لا توجد قيود اليوم بعد. اضغط بيع أو شراء للبدء.',
    daily: 'يومي', weekly: 'أسبوعي', monthly: 'شهري', search: 'بحث', exportCsv: 'تصدير Excel',
    colPeriod: 'الفترة', colSales: 'المبيعات', colBuys: 'المشتريات', colNet: 'الصافي', colCount: 'عدد القيود',
    rateTitle: 'سعر صرف الدولار', rateHelp: 'يُستخدم لتحويل المبالغ بين الدولار والدينار في السجلات. يُحفظ السعر مع كل قيد وقت تسجيله.',
    iqdShort: 'دينار', save: 'حفظ', logoTitle: 'شعار المحل', logoHelp: 'ارفع شعار عطور الريحان ليظهر في الشاشات كافة (PNG أو JPG أو SVG).',
    chooseLogo: 'اختيار صورة', resetLogo: 'إرجاع الشعار الافتراضي', branchesTitle: 'أسماء الفروع', usersTitle: 'المستخدمون',
    name: 'الاسم', role: 'الصلاحية', addUser: 'إضافة مستخدم', roleSeller: 'بائع (بيع وشراء فقط)', roleMaster: 'ماستر (كل الصلاحيات)', add: 'إضافة',
    item: 'المادة', qty: 'الكمية', price: 'السعر', subtotal: 'المجموع الفرعي', addItem: '+ إضافة مادة', note: 'ملاحظة (اختياري)', total: 'المجموع الكلي', cancel: 'إلغاء',
    newSale: 'عملية بيع', newPurchase: 'عملية شراء', saveSale: 'حفظ البيع', savePurchase: 'حفظ الشراء',
    savedSale: 'تم حفظ البيع', savedPurchase: 'تم حفظ الشراء', itemPh: 'اسم العطر أو المادة',
    hello: n => `أهلاً ${n}`, totalSales: 'مجموع المبيعات', totalBuys: 'مجموع المشتريات', net: 'الصافي (مبيعات − مشتريات)',
    lastDays: 'آخر 31 يوماً', lastWeeks: 'آخر 12 أسبوعاً (يبدأ الأسبوع يوم السبت)', lastMonths: 'آخر 12 شهراً',
    allBranches: 'كل الفروع', noData: 'لا توجد قيود في هذه الفترة.', dayOf: d => `قيود يوم ${d}`, weekOf: d => `أسبوع ${d}`,
    by: 'بواسطة', del: 'حذف', confirmDel: 'هل تريد حذف هذا القيد نهائياً؟', deleted: 'تم حذف القيد',
    changePw: 'تغيير كلمة المرور', newPwPrompt: 'اكتب كلمة المرور الجديدة (4 أحرف على الأقل):', pwChanged: 'تم تغيير كلمة المرور',
    confirmUserDel: n => `حذف المستخدم ${n}؟`, userAdded: 'تمت إضافة المستخدم', userDeleted: 'تم حذف المستخدم', you: '(أنت)',
    typeAll: 'الكل', typeSell: 'المبيعات', typeBuy: 'المشتريات', showType: 'عرض', onlySales: 'المبيعات فقط', onlyBuys: 'المشتريات فقط',
    topBought: 'أكثر المواد شراءً', colQtyBought: 'الكمية المشتراة',
    tabReports: 'التقارير', supervisorBadge: 'مشرف', roleSupervisor: 'مشرف (اطلاع فقط وتقارير)',
    workBranch: 'فرع العمل', anyBranch: 'أي فرع (يختاره عند الدخول)', allBranchesShort: 'كل الفروع', branchSaved: 'تم تحديد فرع العمل', roleSaved: 'تم تغيير الصلاحية',
    rateChip: r => `1$ = ${r} د.ع`, rateChipTip: 'سعر صرف الدولار — يغيّره الماستر فقط', workingIn: b => `تعمل الآن في ${b}`,
    dailyReport: 'تقرير يومي', weeklyReport: 'تقرير أسبوعي', monthlyReport: 'تقرير شهري', reportFor: 'التاريخ', makeReport: 'إنشاء التقرير',
    reportHint: 'اختر نوع التقرير والتاريخ والفرع ثم اضغط «إنشاء التقرير».', printReport: 'طباعة / حفظ PDF',
    reportGenerated: (d, n) => `أُنشئ في ${d} بواسطة ${n}`, reportCurrency: (c, r) => `المبالغ بال${c}. سعر الصرف الحالي 1$ = ${r} د.ع (كل قيد محسوب بسعره وقت التسجيل).`,
    entriesCount: 'عدد القيود', byBranch: 'حسب الفرع', bySeller: 'حسب المستخدم', byDay: 'حسب اليوم', topItems: 'أكثر المواد مبيعاً', allEntries: 'كل القيود',
    colUser: 'المستخدم', colBranch: 'الفرع', colDay: 'اليوم', colNo: 'رقم', colWhen: 'الوقت', colType: 'النوع', colItems: 'المواد', colTotal: 'المبلغ', colQtySold: 'الكمية المباعة', colAmount: 'المبلغ',
    e_read_only: 'حساب المشرف للاطلاع فقط ولا يمكنه إجراء تغييرات.', e_no_access: 'ليست لديك صلاحية لهذا القسم.', e_master_only: 'هذا الإجراء للماستر فقط.', e_bad_branch: 'الفرع غير صحيح.',
    saved: 'تم الحفظ', logout: 'تسجيل الخروج', currencyTip: 'تبديل العملة', langTip: 'English', themeTip: 'الوضع الليلي/النهاري',
    nameAr: 'الاسم بالعربي', nameEn: 'الاسم بالإنكليزي', saveBranches: 'حفظ الأسماء', sellerBadge: 'بائع', masterBadge: 'ماستر',
    e_bad_login: 'اسم المستخدم أو كلمة المرور غير صحيحة.', e_too_many_attempts: 'محاولات كثيرة خاطئة. انتظر 10 دقائق ثم حاول مجدداً.',
    e_no_items: 'أدخل مادة واحدة على الأقل مع الكمية والسعر.', e_line: 'أكمل اسم المادة والكمية والسعر في كل سطر أو احذف السطر الفارغ.',
    e_username_taken: 'اسم المستخدم مستخدم مسبقاً. اختر اسماً آخر.', e_bad_username: 'اسم المستخدم بالأحرف الإنكليزية والأرقام فقط (3 أحرف على الأقل).',
    e_short_password: 'كلمة المرور قصيرة. استخدم 4 أحرف أو أكثر.', e_bad_logo: 'الصورة غير مدعومة أو حجمها أكبر من 1.5 ميغابايت.',
    e_not_logged_in: 'انتهت الجلسة. سجّل الدخول من جديد.', e_network: 'لا يمكن الوصول إلى الخادم. تأكد أن نافذة النظام مفتوحة على الحاسبة.',
    e_generic: 'حدث خطأ. حاول مرة أخرى.', cur: { USD: '$', IQD: 'د.ع' }, curName: { USD: 'دولار', IQD: 'دينار' }
  },
  en: {
    loginSub: 'Sales & purchases for Alrayhan Perfumes', username: 'Username', password: 'Password', branch: 'Branch', signIn: 'Sign in',
    tabDesk: 'Sell & buy', tabHistory: 'History', tabSettings: 'Settings',
    sell: 'Sell', sellHint: 'Record items sold to a customer', buy: 'Buy', buyHint: 'Record stock bought for the shop',
    recentTitle: 'Your entries today', noRecent: 'No entries yet today. Press Sell or Buy to start.',
    daily: 'Daily', weekly: 'Weekly', monthly: 'Monthly', search: 'Search', exportCsv: 'Export to Excel',
    colPeriod: 'Period', colSales: 'Sales', colBuys: 'Purchases', colNet: 'Net', colCount: 'Entries',
    rateTitle: 'Dollar exchange rate', rateHelp: 'Used to convert amounts between dollars and dinars in the history. Each entry keeps the rate from when it was saved.',
    iqdShort: 'IQD', save: 'Save', logoTitle: 'Shop logo', logoHelp: 'Upload the Alrayhan logo to show it on every screen (PNG, JPG or SVG).',
    chooseLogo: 'Choose image', resetLogo: 'Use default logo', branchesTitle: 'Branch names', usersTitle: 'Users',
    name: 'Name', role: 'Access', addUser: 'Add a user', roleSeller: 'Seller (sell & buy only)', roleMaster: 'Master (full access)', add: 'Add',
    item: 'Item', qty: 'Qty', price: 'Price', subtotal: 'Subtotal', addItem: '+ Add item', note: 'Note (optional)', total: 'Total', cancel: 'Cancel',
    newSale: 'New sale', newPurchase: 'New purchase', saveSale: 'Save sale', savePurchase: 'Save purchase',
    savedSale: 'Sale saved', savedPurchase: 'Purchase saved', itemPh: 'Perfume or item name',
    hello: n => `Welcome, ${n}`, totalSales: 'Total sales', totalBuys: 'Total purchases', net: 'Net (sales − purchases)',
    lastDays: 'Last 31 days', lastWeeks: 'Last 12 weeks (weeks start Saturday)', lastMonths: 'Last 12 months',
    allBranches: 'All branches', noData: 'No entries in this period.', dayOf: d => `Entries on ${d}`, weekOf: d => `Week of ${d}`,
    by: 'by', del: 'Delete', confirmDel: 'Delete this entry permanently?', deleted: 'Entry deleted',
    changePw: 'Change password', newPwPrompt: 'Type the new password (at least 4 characters):', pwChanged: 'Password changed',
    confirmUserDel: n => `Delete user ${n}?`, userAdded: 'User added', userDeleted: 'User deleted', you: '(you)',
    typeAll: 'All', typeSell: 'Sales', typeBuy: 'Purchases', showType: 'Show', onlySales: 'Sales only', onlyBuys: 'Purchases only',
    topBought: 'Most-bought items', colQtyBought: 'Qty bought',
    tabReports: 'Reports', supervisorBadge: 'Supervisor', roleSupervisor: 'Supervisor (view & reports only)',
    workBranch: 'Works in', anyBranch: 'Any branch (chosen at sign-in)', allBranchesShort: 'All branches', branchSaved: 'Work branch set', roleSaved: 'Access changed',
    rateChip: r => `1$ = ${r} IQD`, rateChipTip: 'Dollar exchange rate — only the master can change it', workingIn: b => `You are working in ${b}`,
    dailyReport: 'Daily report', weeklyReport: 'Weekly report', monthlyReport: 'Monthly report', reportFor: 'Date', makeReport: 'Create report',
    reportHint: 'Choose the report type, date and branch, then press “Create report”.', printReport: 'Print / Save PDF',
    reportGenerated: (d, n) => `Created ${d} by ${n}`, reportCurrency: (c, r) => `Amounts in ${c}. Current rate 1$ = ${r} IQD (each entry is converted at the rate it was saved with).`,
    entriesCount: 'Entries', byBranch: 'By branch', bySeller: 'By user', byDay: 'By day', topItems: 'Top-selling items', allEntries: 'All entries',
    colUser: 'User', colBranch: 'Branch', colDay: 'Day', colNo: 'No.', colWhen: 'Time', colType: 'Type', colItems: 'Items', colTotal: 'Amount', colQtySold: 'Qty sold', colAmount: 'Amount',
    e_read_only: 'Supervisor accounts are view-only and can’t make changes.', e_no_access: 'You don’t have access to this section.', e_master_only: 'Only the master can do this.', e_bad_branch: 'Invalid branch.',
    saved: 'Saved', logout: 'Sign out', currencyTip: 'Switch currency', langTip: 'العربية', themeTip: 'Light / dark mode',
    nameAr: 'Arabic name', nameEn: 'English name', saveBranches: 'Save names', sellerBadge: 'Seller', masterBadge: 'Master',
    e_bad_login: 'Wrong username or password.', e_too_many_attempts: 'Too many wrong tries. Wait 10 minutes and try again.',
    e_no_items: 'Enter at least one item with a quantity and price.', e_line: 'Fill in item, qty and price on every line, or remove the empty line.',
    e_username_taken: 'That username is taken. Choose another.', e_bad_username: 'Use English letters and numbers only (at least 3).',
    e_short_password: 'Password is too short. Use 4 or more characters.', e_bad_logo: 'Image type not supported or larger than 1.5 MB.',
    e_not_logged_in: 'Your session ended. Sign in again.', e_network: 'Can’t reach the server. Make sure the system window is open on the computer.',
    e_generic: 'Something went wrong. Try again.', cur: { USD: '$', IQD: 'IQD' }, curName: { USD: 'Dollar', IQD: 'Dinar' }
  }
};

const ICONS = {
  moon: '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>',
  sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  logout: '<svg viewBox="0 0 24 24"><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/></svg>'
};

const pref = (k, d) => { try { return localStorage.getItem('ars_' + k) || d; } catch { return d; } };
const setPref = (k, v) => { try { localStorage.setItem('ars_' + k, v); } catch {} };

const S = {
  lang: pref('lang', 'ar'), theme: pref('theme', 'light'), currency: pref('currency', 'IQD'), branch: pref('branch', 'b1'),
  user: null, settings: null, pub: null, view: 'desk', period: 'day', branchFilter: 'all', reportPeriod: 'day', reportBranch: 'all', typeFilter: pref('type', 'all'), reportType: pref('rtype', 'all'), report: null, entryType: 'sell', openPeriod: null, history: []
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const t = (k, ...a) => { const v = T[S.lang][k]; return typeof v === 'function' ? v(...a) : (v ?? k); };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const locale = () => (S.lang === 'ar' ? 'ar-IQ-u-nu-latn' : 'en-GB');

// ---------- API ----------
async function api(path, opts = {}) {
  let res;
  try {
    res = await fetch('/api' + path, { headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin', ...opts, body: opts.body ? JSON.stringify(opts.body) : undefined });
  } catch { throw new Error('network'); }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && path !== '/login') { showLogin(); }
    throw new Error(data.error || 'generic');
  }
  return data;
}
const errText = e => { const k = 'e_' + e.message; return T[S.lang][k] ? t(k) : t('e_generic'); };

// ---------- money ----------
function fmt(amount, cur = S.currency) {
  const dp = cur === 'USD' ? 2 : 0;
  const v = Number(amount) || 0;
  const n = new Intl.NumberFormat('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp }).format(Math.abs(v));
  const sign = v < 0 && n.replace(/[0.,]/g, '') !== '' ? '-' : '';
  return cur === 'USD' ? `${sign}$${n}` : `${sign}${n} ${t('cur').IQD}`;
}
function conv(amount, from, rate, to = S.currency) {
  if (from === to) return amount;
  return from === 'USD' ? amount * rate : amount / rate;
}
const money = (amount, cur) => `<span class="money">${esc(fmt(amount, cur))}</span>`;

// ---------- dates ----------
const pad = n => String(n).padStart(2, '0');
const dayKey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function weekStart(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 1) % 7)); return x; } // Saturday
const fmtDate = (d, o = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) => new Intl.DateTimeFormat(locale(), o).format(d);
const fmtTime = d => new Intl.DateTimeFormat(locale(), { hour: 'numeric', minute: '2-digit' }).format(d);
const roleBadge = r => (r === 'master' ? t('masterBadge') : r === 'supervisor' ? t('supervisorBadge') : t('sellerBadge'));
const ROLE_VIEWS = { master: ['desk', 'history', 'reports', 'settings'], supervisor: ['history', 'reports'], seller: ['desk'] };
const canView = v => (ROLE_VIEWS[S.user?.role] || ['desk']).includes(v);
const branchName = id => { const b = (S.settings || S.pub)?.branches.find(x => x.id === id); return b ? (S.lang === 'ar' ? b.nameAr : b.nameEn) : id; };

// ---------- chrome: lang / theme / currency ----------
function applyChrome() {
  const root = document.documentElement;
  root.lang = S.lang; root.dir = S.lang === 'ar' ? 'rtl' : 'ltr';
  root.dataset.theme = S.theme;
  $$('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
  $$('[data-ph]').forEach(el => { el.placeholder = t(el.dataset.ph); });
  $$('.js-lang').forEach(b => { b.innerHTML = `<span class="glyph">${S.lang === 'ar' ? 'EN' : 'ع'}</span>`; b.title = t('langTip'); b.setAttribute('aria-label', t('langTip')); });
  $$('.js-theme').forEach(b => { b.innerHTML = S.theme === 'dark' ? ICONS.sun : ICONS.moon; b.title = t('themeTip'); b.setAttribute('aria-label', t('themeTip')); });
  const cb = $('#currencyBtn');
  cb.innerHTML = `<span class="glyph">${t('cur')[S.currency]}</span>`; cb.title = `${t('currencyTip')} (${t('curName')[S.currency]})`; cb.setAttribute('aria-label', cb.title);
  $('#logoutBtn').innerHTML = ICONS.logout; $('#logoutBtn').title = t('logout'); $('#logoutBtn').setAttribute('aria-label', t('logout'));
  const logo = (S.settings || S.pub)?.logo;
  $$('.js-logo').forEach(i => { i.src = logo || 'logo.svg'; });
  fillBranchSelects();
  if (S.user) {
    $('#hello').textContent = t('hello', S.user.name || S.user.username);
    const where = S.user.role === 'supervisor' ? t('allBranchesShort') : branchName(S.branch);
    $('#branchLabel').textContent = `${where} · ${roleBadge(S.user.role)}`;
    const rc = $('#rateChip');
    if (S.settings) { rc.textContent = t('rateChip', new Intl.NumberFormat('en-US').format(S.settings.rate)); rc.title = t('rateChipTip'); }
  }
  tick();
}
function fillBranchSelects() {
  const src = (S.settings || S.pub); if (!src) return;
  $$('.js-branch-select').forEach(sel => {
    sel.innerHTML = src.branches.map(b => `<option value="${b.id}">${esc(S.lang === 'ar' ? b.nameAr : b.nameEn)}</option>`).join('');
    sel.value = S.branch;
  });
  const opts = src.branches.map(b => `<option value="${b.id}">${esc(S.lang === 'ar' ? b.nameAr : b.nameEn)}</option>`).join('');
  const bf = $('#branchFilter');
  bf.innerHTML = `<option value="all">${t('allBranches')}</option>` + opts;
  bf.value = S.branchFilter;
  const rb = $('#reportBranch');
  rb.innerHTML = `<option value="all">${t('allBranches')}</option>` + opts;
  rb.value = S.reportBranch;
  const nb = $('#newUserBranch'), keep = nb.value;
  nb.innerHTML = opts + `<option value="">${t('anyBranch')}</option>`;
  nb.value = keep || src.branches[0].id;
}
function rerender() {
  applyChrome();
  $('#typeSegWrap').innerHTML = typeSegHtml('typeSeg', S.typeFilter);
  $('#reportTypeWrap').innerHTML = typeSegHtml('reportTypeSeg', S.reportType);
  if (!S.user) return;
  renderRecent();
  if (S.view === 'history') { renderHistory(); if (lastSearch) searchDay(lastSearch, false); }
  if (S.view === 'settings') renderSettings();
  if (S.view === 'reports' && S.report) renderReport();
  if ($('#entry').open) { setEntryTitle(); recalc(); }
}
let lastSearch = null;
$$('.js-lang').forEach(b => b.addEventListener('click', () => { S.lang = S.lang === 'ar' ? 'en' : 'ar'; setPref('lang', S.lang); rerender(); }));
$$('.js-theme').forEach(b => b.addEventListener('click', () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; setPref('theme', S.theme); applyChrome(); }));
$('#currencyBtn').addEventListener('click', () => {
  if ($('#entry').open && hasEntryData()) { toast(S.lang === 'ar' ? 'احفظ القيد أو ألغِه قبل تغيير العملة' : 'Save or cancel the entry before switching currency'); return; }
  S.currency = S.currency === 'IQD' ? 'USD' : 'IQD'; setPref('currency', S.currency); rerender();
  toast(`${t('curName')[S.currency]} (${t('cur')[S.currency]})`);
});

function tick() {
  const now = new Date();
  const txt = `${fmtDate(now)} — ${fmtTime(now)}`;
  $('#clock').textContent = txt;
  if ($('#entry').open) $('#entryWhen').textContent = txt;
}
setInterval(tick, 15000);

let toastTimer;
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 2600); }

// ---------- auth ----------
function showLogin() {
  S.user = null;
  $('#app').hidden = true; $('#login').hidden = false;
  if ($('#entry').open) $('#entry').close();
  applyChrome();
  setTimeout(() => $('#loginForm [name=username]').focus(), 50);
}
async function enterApp(user) {
  S.user = user;
  S.settings = await api('/settings');
  const assigned = user.role === 'seller' && user.branch && S.settings.branches.some(b => b.id === user.branch);
  if (assigned && S.branch !== user.branch) { S.branch = user.branch; setTimeout(() => toast(t('workingIn', branchName(S.branch))), 300); }
  if (!S.settings.branches.some(b => b.id === S.branch)) S.branch = S.settings.branches[0].id;
  $('#login').hidden = true; $('#app').hidden = false;
  const views = ROLE_VIEWS[user.role] || ['desk'];
  $$('.tab').forEach(b => { b.hidden = !views.includes(b.dataset.view); });
  $('#tabs').hidden = views.length < 2;
  switchView(views[0]);
  applyChrome();
  loadItemNames();
  renderRecent();
}
$('#loginForm').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target; $('#loginError').textContent = '';
  S.branch = f.branch.value; setPref('branch', S.branch);
  try {
    const { user } = await api('/login', { method: 'POST', body: { username: f.username.value, password: f.password.value } });
    f.password.value = '';
    await enterApp(user);
  } catch (err) { $('#loginError').textContent = errText(err); }
});
$('#logoutBtn').addEventListener('click', async () => { try { await api('/logout', { method: 'POST' }); } catch {} showLogin(); });

// ---------- views ----------
function switchView(v) {
  if (!canView(v)) v = (ROLE_VIEWS[S.user?.role] || ['desk'])[0];
  S.view = v;
  $$('.tab').forEach(b => b.classList.toggle('is-active', b.dataset.view === v));
  $$('.view').forEach(s => { s.hidden = s.id !== 'view-' + v; });
  if (v === 'history') loadHistory();
  if (v === 'settings') renderSettings();
}
$$('.tab').forEach(b => b.addEventListener('click', () => switchView(b.dataset.view)));

// ---------- desk ----------
async function renderRecent() {
  const ul = $('#recentList');
  let list = [];
  try { list = await api('/transactions/recent'); } catch { return; }
  if (!list.length) { ul.innerHTML = `<li class="empty">${t('noRecent')}</li>`; return; }
  ul.innerHTML = list.map(tx => `
    <li>
      <span class="kind kind-${tx.type}">${t(tx.type)}</span>
      <span class="recent-items">${esc(tx.items.map(i => `${i.name} × ${i.qty}`).join('، '))}</span>
      <span class="recent-time">${fmtTime(new Date(tx.at))}</span>
      <strong>${money(tx.total, tx.currency)}</strong>
    </li>`).join('');
}
async function loadItemNames() {
  try { const names = await api('/items'); $('#itemNames').innerHTML = names.map(n => `<option value="${esc(n)}">`).join(''); } catch {}
}

// ---------- entry sheet ----------
const dlg = $('#entry');
function setEntryTitle() {
  const sell = S.entryType === 'sell';
  $('#entryTitle').textContent = sell ? t('newSale') : t('newPurchase');
  $('#entrySave').textContent = sell ? t('saveSale') : t('savePurchase');
  $('#entryCur').textContent = `${t('cur')[S.currency]} ${t('curName')[S.currency]}`;
  $$('#lines .n').forEach(i => { i.placeholder = t('itemPh'); });
}
function lineTpl() {
  const step = S.currency === 'USD' ? '0.01' : '250';
  const div = document.createElement('div');
  div.className = 'line';
  div.innerHTML = `
    <input class="field n" list="itemNames" maxlength="120" placeholder="${esc(t('itemPh'))}" aria-label="${esc(t('item'))}">
    <input class="field num q" type="number" min="0" step="any" value="1" inputmode="decimal" aria-label="${esc(t('qty'))}">
    <input class="field num p" type="number" min="0" step="${step}" inputmode="decimal" aria-label="${esc(t('price'))}">
    <span class="sub money">${esc(fmt(0))}</span>
    <button type="button" class="rm" aria-label="×">×</button>`;
  return div;
}
function addLine(focus = true) {
  const l = lineTpl(); $('#lines').appendChild(l);
  if (focus) l.querySelector('.n').focus();
  return l;
}
function readLines() {
  return $$('#lines .line').map(l => ({ el: l, name: l.querySelector('.n').value.trim(), qty: parseFloat(l.querySelector('.q').value), priceRaw: l.querySelector('.p').value, price: parseFloat(l.querySelector('.p').value) }));
}
function hasEntryData() { return readLines().some(l => l.name || l.priceRaw); }
function recalc() {
  let total = 0;
  const dp = S.currency === 'USD' ? 2 : 0;
  for (const l of readLines()) {
    const sub = (l.qty > 0 && l.price >= 0) ? Math.round(l.qty * l.price * 10 ** dp) / 10 ** dp : 0;
    l.el.querySelector('.sub').textContent = fmt(sub);
    total += sub;
  }
  $('#entryTotal').textContent = fmt(total);
}
function openEntry(type) {
  S.entryType = type;
  dlg.classList.toggle('is-buy', type === 'buy');
  $('#lines').innerHTML = ''; $('#entryNote').value = ''; $('#entryError').textContent = '';
  setEntryTitle();
  dlg.showModal();
  addLine(true);
  recalc(); tick();
}
$('#sellBtn').addEventListener('click', () => openEntry('sell'));
$('#buyBtn').addEventListener('click', () => openEntry('buy'));
$('#addLine').addEventListener('click', () => addLine(true));
$('#entryCancel').addEventListener('click', () => dlg.close());
$('#lines').addEventListener('input', recalc);
$('#lines').addEventListener('focusin', e => { if (e.target.matches('.q, .p')) e.target.select(); });
$('#lines').addEventListener('click', e => {
  if (!e.target.classList.contains('rm')) return;
  e.target.closest('.line').remove();
  if (!$('#lines').children.length) addLine(true);
  recalc();
});
$('#lines').addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  const line = e.target.closest('.line');
  if (e.target.classList.contains('n')) line.querySelector('.q').focus();
  else if (e.target.classList.contains('q')) line.querySelector('.p').focus();
  else if (e.target.classList.contains('p')) { if (line === $('#lines').lastElementChild) addLine(true); else line.nextElementSibling.querySelector('.n').focus(); }
});
$('#entryForm').addEventListener('submit', async e => {
  e.preventDefault();
  const lines = readLines().filter(l => l.name || l.priceRaw);
  $('#entryError').textContent = '';
  if (!lines.length) { $('#entryError').textContent = t('e_no_items'); return; }
  if (lines.some(l => !l.name || !(l.qty > 0) || l.priceRaw === '' || !(l.price >= 0))) { $('#entryError').textContent = t('e_line'); return; }
  const btn = $('#entrySave'); btn.disabled = true;
  try {
    await api('/transactions', { method: 'POST', body: {
      type: S.entryType, branch: S.branch, currency: S.currency, note: $('#entryNote').value,
      items: lines.map(l => ({ name: l.name, qty: l.qty, price: l.price }))
    } });
    dlg.close();
    toast(S.entryType === 'sell' ? t('savedSale') : t('savedPurchase'));
    renderRecent(); loadItemNames();
    if (S.view === 'history') loadHistory();
  } catch (err) { $('#entryError').textContent = errText(err); }
  finally { btn.disabled = false; }
});

// ---------- history (master) ----------
function rangeStart() {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  if (S.period === 'day') { now.setDate(now.getDate() - 30); return now; }
  if (S.period === 'week') { const w = weekStart(now); w.setDate(w.getDate() - 7 * 11); return w; }
  return new Date(now.getFullYear(), now.getMonth() - 11, 1);
}
async function loadHistory() {
  const from = rangeStart();
  try {
    S.history = await api(`/transactions?from=${encodeURIComponent(from.toISOString())}&branch=${S.branchFilter}`);
  } catch (err) { toast(errText(err)); return; }
  renderHistory();
  if (lastSearch) searchDay(lastSearch, false);
}
function periodKey(d) {
  if (S.period === 'day') return dayKey(d);
  if (S.period === 'week') return dayKey(weekStart(d));
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}
function periodLabel(key) {
  if (S.period === 'day') { const [y, m, d] = key.split('-').map(Number); return fmtDate(new Date(y, m - 1, d)); }
  if (S.period === 'week') {
    const [y, m, d] = key.split('-').map(Number); const a = new Date(y, m - 1, d); const b = new Date(a); b.setDate(b.getDate() + 6);
    const o = { day: 'numeric', month: 'short' };
    return `${fmtDate(a, o)} – ${fmtDate(b, { ...o, year: 'numeric' })}`;
  }
  const [y, m] = key.split('-').map(Number); return fmtDate(new Date(y, m - 1, 1), { month: 'long', year: 'numeric' });
}
function sumUp(list) {
  let sales = 0, buys = 0;
  for (const tx of list) { const v = conv(tx.total, tx.currency, tx.rate); if (tx.type === 'sell') sales += v; else buys += v; }
  return { sales, buys, net: sales - buys, count: list.length };
}
// type filter: 'all' | 'sell' | 'buy'
const byType = (list, type) => (type === 'all' ? list : list.filter(tx => tx.type === type));
function totalsCells(s, type = 'all', withCount = false) {
  const cells = [];
  if (type !== 'buy') cells.push(`<div class="total-cell sell"><div class="lbl">${t('totalSales')}</div><div class="val">${money(s.sales)}</div></div>`);
  if (type !== 'sell') cells.push(`<div class="total-cell buy"><div class="lbl">${t('totalBuys')}</div><div class="val">${money(s.buys)}</div></div>`);
  if (type === 'all') cells.push(`<div class="total-cell"><div class="lbl">${t('net')}</div><div class="val ${s.net < 0 ? 'neg' : ''}">${money(s.net)}</div></div>`);
  if (withCount || type !== 'all') cells.push(`<div class="total-cell"><div class="lbl">${t('entriesCount')}</div><div class="val">${s.count}</div></div>`);
  return cells;
}
const totalsBox = (s, type, withCount) => { const c = totalsCells(s, type, withCount); return `<div class="totals" style="--cols:${c.length}">${c.join('')}</div>`; };
function typeSegHtml(id, value) {
  return `<div class="seg type-seg" id="${id}" role="tablist" aria-label="${esc(t('showType'))}">` +
    [['all', 'typeAll'], ['sell', 'typeSell'], ['buy', 'typeBuy']].map(([v, k]) => `<button type="button" data-type="${v}" class="${value === v ? 'is-active' : ''}">${t(k)}</button>`).join('') + '</div>';
}
function historyExportHref() {
  return `/api/export.csv?branch=${S.branchFilter}&type=${S.typeFilter}&name=alrayhan-${S.typeFilter === 'all' ? 'sales' : S.typeFilter === 'sell' ? 'sales-only' : 'purchases-only'}`;
}
function txHtml(tx) {
  const d = new Date(tx.at);
  const conversion = tx.currency !== S.currency ? ` <span class="q">(${esc(fmt(conv(tx.total, tx.currency, tx.rate)))})</span>` : '';
  return `
    <div class="tx ${tx.type}">
      <div class="tx-top">
        <span class="kind kind-${tx.type}">${t(tx.type)} #${tx.no}</span>
        <span class="when">${esc(fmtDate(d, { day: 'numeric', month: 'short', year: 'numeric' }))} — ${esc(fmtTime(d))}</span>
        <span class="by">${esc(branchName(tx.branch))} · ${t('by')} ${esc(tx.userName)}</span>
        <span class="sum">${money(tx.total, tx.currency)}${conversion}</span>
      </div>
      <ul class="tx-items">${tx.items.map(i => `<li><span>${esc(i.name)} <span class="q">× ${i.qty} ${S.lang === 'ar' ? 'بسعر' : '@'} ${esc(fmt(i.price, tx.currency))}</span></span>${money(i.subtotal, tx.currency)}</li>`).join('')}</ul>
      ${tx.note ? `<p class="tx-note">${esc(tx.note)}</p>` : ''}
      ${S.user?.role === 'master' ? `<div class="tx-actions"><button class="btn btn-danger js-del" data-id="${tx.id}">${t('del')}</button></div>` : ''}
    </div>`;
}
function renderHistory() {
  $$('#periodSeg button').forEach(b => b.classList.toggle('is-active', b.dataset.period === S.period));
  $$('#typeSeg button').forEach(b => b.classList.toggle('is-active', b.dataset.type === S.typeFilter));
  $('#view-history').dataset.type = S.typeFilter;
  $('#histExport').href = historyExportHref();
  const shown = byType(S.history, S.typeFilter);
  const groups = new Map();
  for (const tx of shown) { const k = periodKey(new Date(tx.at)); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(tx); }
  const keys = [...groups.keys()].sort().reverse();
  { const c = totalsCells(sumUp(shown), S.typeFilter); $('#totals').style.setProperty('--cols', c.length); $('#totals').innerHTML = c.join(''); }
  $('#histTitle').textContent = S.period === 'day' ? t('lastDays') : S.period === 'week' ? t('lastWeeks') : t('lastMonths');
  const tb = $('#periodTable tbody');
  if (!keys.length) { tb.innerHTML = `<tr class="empty-row"><td colspan="5">${t('noData')}</td></tr>`; return; }
  tb.innerHTML = keys.map(k => {
    const list = groups.get(k); const s = sumUp(list); const open = S.openPeriod === k;
    const row = `<tr class="period ${open ? 'is-open' : ''}" data-key="${k}" tabindex="0" aria-expanded="${open}">
      <td>${esc(periodLabel(k))}</td><td class="money c-sales">${esc(fmt(s.sales))}</td><td class="money c-buys">${esc(fmt(s.buys))}</td>
      <td class="money c-net ${s.net < 0 ? 'neg' : ''}">${esc(fmt(s.net))}</td><td class="num">${s.count}</td></tr>`;
    const detail = open ? `<tr class="detail"><td colspan="5"><div class="tx-list">${[...list].reverse().map(txHtml).join('')}</div></td></tr>` : '';
    return row + detail;
  }).join('');
}
$('#periodTable').addEventListener('click', e => {
  const del = e.target.closest('.js-del'); if (del) return deleteTx(del.dataset.id);
  const row = e.target.closest('tr.period'); if (!row) return;
  S.openPeriod = S.openPeriod === row.dataset.key ? null : row.dataset.key; renderHistory();
});
$('#periodTable').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('tr.period')) { e.preventDefault(); e.target.click(); } });
$$('#periodSeg button').forEach(b => b.addEventListener('click', () => { S.period = b.dataset.period; S.openPeriod = null; loadHistory(); }));
$('#branchFilter').addEventListener('change', e => { S.branchFilter = e.target.value; loadHistory(); });
$('#typeSegWrap').innerHTML = typeSegHtml('typeSeg', S.typeFilter);
$('#typeSegWrap').addEventListener('click', e => {
  const b = e.target.closest('button[data-type]'); if (!b) return;
  S.typeFilter = b.dataset.type; setPref('type', S.typeFilter); S.openPeriod = null;
  renderHistory(); if (lastSearch) searchDay(lastSearch, false);
});

async function searchDay(value, scroll = true) {
  lastSearch = value;
  const [y, m, d] = value.split('-').map(Number);
  const from = new Date(y, m - 1, d), to = new Date(y, m - 1, d + 1);
  let list;
  try { list = await api(`/transactions?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}&branch=${S.branchFilter}`); }
  catch (err) { toast(errText(err)); return; }
  const box = $('#dayDetail');
  box.className = 'day-detail';
  list = byType(list, S.typeFilter);
  box.innerHTML = `<h2>${esc(t('dayOf', fmtDate(from)))}${S.typeFilter === 'all' ? '' : ` — ${t(S.typeFilter === 'sell' ? 'onlySales' : 'onlyBuys')}`}</h2>${totalsBox(sumUp(list), S.typeFilter)}
    <div class="tx-list">${list.length ? [...list].reverse().map(txHtml).join('') : `<p class="muted">${t('noData')}</p>`}</div>`;
  if (scroll) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
$('#dateSearch').addEventListener('submit', e => { e.preventDefault(); searchDay($('#searchDate').value); });
$('#dayDetail').addEventListener('click', e => { const del = e.target.closest('.js-del'); if (del) deleteTx(del.dataset.id); });
async function deleteTx(id) {
  if (!confirm(t('confirmDel'))) return;
  try { await api('/transactions/' + id, { method: 'DELETE' }); toast(t('deleted')); loadHistory(); renderRecent(); }
  catch (err) { toast(errText(err)); }
}

// ---------- settings (master) ----------
async function renderSettings() {
  $('#rateInput').value = S.settings.rate;
  $('#branchesForm').innerHTML = S.settings.branches.map(b => `
    <div class="pair" data-id="${b.id}">
      <input class="field ar" value="${esc(b.nameAr)}" aria-label="${esc(t('nameAr'))}" placeholder="${esc(t('nameAr'))}" dir="rtl">
      <input class="field en" value="${esc(b.nameEn)}" aria-label="${esc(t('nameEn'))}" placeholder="${esc(t('nameEn'))}" dir="ltr">
    </div>`).join('') + `<div><button class="btn btn-primary">${t('saveBranches')}</button></div>`;
  let users = [];
  try { users = await api('/users'); } catch (err) { toast(errText(err)); }
  $('#usersTable tbody').innerHTML = users.map(u => `
    <tr>
      <td>${esc(u.name)} ${u.id === S.user.id ? `<span class="muted">${t('you')}</span>` : ''}</td>
      <td dir="ltr" style="text-align:start">${esc(u.username)}</td>
      <td>${u.id === S.user.id ? `<span class="role-tag ${u.role}">${roleBadge(u.role)}</span>` : `
        <select class="field js-role" data-id="${u.id}" aria-label="${esc(t('role'))}">
          ${['seller', 'supervisor', 'master'].map(r => `<option value="${r}" ${u.role === r ? 'selected' : ''}>${roleBadge(r)}</option>`).join('')}
        </select>`}</td>
      <td>${u.role === 'seller' ? `
        <select class="field js-ubranch" data-id="${u.id}" aria-label="${esc(t('workBranch'))}">
          ${S.settings.branches.map(b => `<option value="${b.id}" ${u.branch === b.id ? 'selected' : ''}>${esc(S.lang === 'ar' ? b.nameAr : b.nameEn)}</option>`).join('')}
          <option value="" ${u.branch ? '' : 'selected'}>${t('anyBranch')}</option>
        </select>` : `<span class="muted">${t('allBranchesShort')}</span>`}</td>
      <td><div class="user-actions">
        <button class="btn btn-ghost js-pw" data-id="${u.id}">${t('changePw')}</button>
        ${u.id === S.user.id ? '' : `<button class="btn btn-danger js-udel" data-id="${u.id}" data-name="${esc(u.name)}">${t('del')}</button>`}
      </div></td>
    </tr>`).join('');
}
async function saveSettings(body) {
  try { S.settings = await api('/settings', { method: 'PUT', body }); applyChrome(); toast(t('saved')); }
  catch (err) { toast(errText(err)); }
}
$('#rateForm').addEventListener('submit', e => { e.preventDefault(); saveSettings({ rate: Number($('#rateInput').value) }); });
$('#branchesForm').addEventListener('submit', e => {
  e.preventDefault();
  saveSettings({ branches: $$('#branchesForm .pair').map(p => ({ id: p.dataset.id, nameAr: p.querySelector('.ar').value, nameEn: p.querySelector('.en').value })) });
});
$('#logoInput').addEventListener('change', e => {
  const file = e.target.files[0]; if (!file) return;
  if (file.size > 1.5 * 1024 * 1024) { toast(t('e_bad_logo')); return; }
  const r = new FileReader(); r.onload = () => saveSettings({ logo: r.result }); r.readAsDataURL(file); e.target.value = '';
});
$('#logoReset').addEventListener('click', () => saveSettings({ logo: null }));
$('#usersTable').addEventListener('click', async e => {
  const pw = e.target.closest('.js-pw'), del = e.target.closest('.js-udel');
  if (pw) {
    const v = prompt(t('newPwPrompt')); if (v === null) return;
    try { await api('/users/' + pw.dataset.id, { method: 'PUT', body: { password: v } }); toast(t('pwChanged')); } catch (err) { toast(errText(err)); }
  }
  if (del) {
    if (!confirm(t('confirmUserDel', del.dataset.name))) return;
    try { await api('/users/' + del.dataset.id, { method: 'DELETE' }); toast(t('userDeleted')); renderSettings(); } catch (err) { toast(errText(err)); }
  }
});
$('#usersTable').addEventListener('change', async e => {
  const rs = e.target.closest('.js-role'), bs = e.target.closest('.js-ubranch');
  try {
    if (rs) { await api('/users/' + rs.dataset.id, { method: 'PUT', body: { role: rs.value } }); toast(t('roleSaved')); renderSettings(); }
    if (bs) { await api('/users/' + bs.dataset.id, { method: 'PUT', body: { branch: bs.value || null } }); toast(t('branchSaved')); }
  } catch (err) { toast(errText(err)); renderSettings(); }
});
const syncNewUserBranch = () => { $('#newUserBranch').hidden = $('#newUserRole').value !== 'seller'; };
$('#newUserRole').addEventListener('change', syncNewUserBranch);
$('#userForm').addEventListener('submit', async e => {
  e.preventDefault(); const f = e.target;
  try {
    await api('/users', { method: 'POST', body: { name: f.name.value, username: f.username.value, password: f.password.value, role: f.role.value, branch: f.role.value === 'seller' ? (f.branch.value || null) : null } });
    f.reset(); syncNewUserBranch(); fillBranchSelects(); toast(t('userAdded')); renderSettings();
  } catch (err) { toast(errText(err)); }
});

// ---------- reports (master + supervisor) ----------
function reportRange(period, value) {
  const [y, m, d] = value.split('-').map(Number);
  const day = new Date(y, m - 1, d);
  if (period === 'day') return { from: day, to: new Date(y, m - 1, d + 1) };
  if (period === 'week') { const a = weekStart(day); const b = new Date(a); b.setDate(b.getDate() + 7); return { from: a, to: b }; }
  return { from: new Date(y, m - 1, 1), to: new Date(y, m, 1) };
}
function reportPeriodLabel(period, from, to) {
  if (period === 'day') return fmtDate(from);
  if (period === 'week') { const last = new Date(to); last.setDate(last.getDate() - 1); const o = { day: 'numeric', month: 'long' }; return `${fmtDate(from, o)} – ${fmtDate(last, { ...o, year: 'numeric' })}`; }
  return fmtDate(from, { month: 'long', year: 'numeric' });
}
async function makeReport() {
  const value = $('#reportDate').value; if (!value) return;
  const { from, to } = reportRange(S.reportPeriod, value);
  const btn = $('#reportGo'); btn.disabled = true;
  try {
    const list = await api(`/transactions?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}&branch=${S.reportBranch}`);
    S.report = { period: S.reportPeriod, branch: S.reportBranch, from, to, all: list, at: new Date() };
    renderReport();
  } catch (err) { toast(errText(err)); }
  finally { btn.disabled = false; }
}
function groupSum(list, keyFn) {
  const m = new Map();
  for (const tx of list) { const k = keyFn(tx); if (!m.has(k)) m.set(k, []); m.get(k).push(tx); }
  return [...m.entries()].map(([k, l]) => ({ key: k, ...sumUp(l) }));
}
function sumRows(rows, labelFn) {
  return rows.map(r => `<tr><td>${esc(labelFn(r.key))}</td><td class="money c-sales">${esc(fmt(r.sales))}</td><td class="money c-buys">${esc(fmt(r.buys))}</td>
    <td class="money c-net ${r.net < 0 ? 'neg' : ''}">${esc(fmt(r.net))}</td><td class="num">${r.count}</td></tr>`).join('');
}
function sumTable(title, firstCol, rows, labelFn) {
  return `<h3>${title}</h3><div class="table-wrap"><table class="table"><thead><tr><th>${firstCol}</th><th class="money c-sales">${t('colSales')}</th>
    <th class="money c-buys">${t('colBuys')}</th><th class="money c-net">${t('colNet')}</th><th class="num">${t('colCount')}</th></tr></thead>
    <tbody>${rows.length ? sumRows(rows, labelFn) : `<tr class="empty-row"><td colspan="5">${t('noData')}</td></tr>`}</tbody></table></div>`;
}
function renderReport() {
  const R = S.report; if (!R) return;
  const type = S.reportType, list = byType(R.all, type), s = sumUp(list);
  const title = (R.period === 'day' ? t('dailyReport') : R.period === 'week' ? t('weeklyReport') : t('monthlyReport'))
    + (type === 'all' ? '' : ` (${t(type === 'sell' ? 'onlySales' : 'onlyBuys')})`);
  const branchTxt = R.branch === 'all' ? t('allBranches') : branchName(R.branch);
  const logo = S.settings?.logo || 'logo.svg';
  const shop = S.lang === 'ar' ? S.settings.shopNameAr : S.settings.shopName;

  const byBranch = groupSum(list, tx => tx.branch).sort((a, b) => b.sales - a.sales);
  const byUser = groupSum(list, tx => tx.userName).sort((a, b) => b.sales - a.sales);
  const byDay = R.period === 'day' ? [] : groupSum(list, tx => dayKey(new Date(tx.at))).sort((a, b) => a.key.localeCompare(b.key));
  const dayLabel = k => { const [y, m, d] = k.split('-').map(Number); return fmtDate(new Date(y, m - 1, d), { weekday: 'long', day: 'numeric', month: 'short' }); };

  const items = new Map();
  const itemType = type === 'buy' ? 'buy' : 'sell';
  for (const tx of list) if (tx.type === itemType) for (const it of tx.items) {
    const k = it.name.toLowerCase(); const cur = items.get(k) || { name: it.name, qty: 0, amount: 0 };
    cur.qty += it.qty; cur.amount += conv(it.subtotal, tx.currency, tx.rate); items.set(k, cur);
  }
  const top = [...items.values()].sort((a, b) => b.amount - a.amount).slice(0, 15);

  const csv = `/api/export.csv?from=${encodeURIComponent(R.from.toISOString())}&to=${encodeURIComponent(R.to.toISOString())}&branch=${R.branch}&type=${type}&name=alrayhan-${R.period}-report-${type === 'all' ? '' : type === 'sell' ? 'sales-' : 'purchases-'}${dayKey(R.from)}`;
  const nf = new Intl.NumberFormat('en-US');

  $('#report').innerHTML = `
  <article class="report" data-type="${type}">
    <header class="report-head">
      <img src="${esc(logo)}" alt="">
      <div>
        <h2>${esc(title)} — ${esc(shop)}</h2>
        <div class="meta"><strong>${esc(reportPeriodLabel(R.period, R.from, R.to))}</strong> · ${esc(branchTxt)}</div>
        <div class="meta">${esc(t('reportGenerated', `${fmtDate(R.at, { day: 'numeric', month: 'short', year: 'numeric' })} ${fmtTime(R.at)}`, S.user.name || S.user.username))}</div>
      </div>
      <div class="report-actions">
        <button class="btn btn-primary" type="button" id="reportPrint">${t('printReport')}</button>
        <a class="btn btn-ghost" href="${csv}">${t('exportCsv')}</a>
      </div>
    </header>

    ${totalsBox(s, type, true)}

    ${R.branch === 'all' ? sumTable(t('byBranch'), t('colBranch'), byBranch, branchName) : ''}
    ${sumTable(t('bySeller'), t('colUser'), byUser, k => k)}
    ${R.period === 'day' ? '' : sumTable(t('byDay'), t('colDay'), byDay, dayLabel)}

    <h3>${t(itemType === 'buy' ? 'topBought' : 'topItems')}</h3>
    <div class="table-wrap"><table class="table"><thead><tr><th>${t('item')}</th><th class="num">${t(itemType === 'buy' ? 'colQtyBought' : 'colQtySold')}</th><th class="money">${t('colAmount')}</th></tr></thead>
      <tbody>${top.length ? top.map(i => `<tr><td>${esc(i.name)}</td><td class="num">${nf.format(i.qty)}</td><td class="money">${esc(fmt(i.amount))}</td></tr>`).join('')
        : `<tr class="empty-row"><td colspan="3">${t('noData')}</td></tr>`}</tbody></table></div>

    <h3>${t('allEntries')}</h3>
    <div class="table-wrap"><table class="table"><thead><tr><th class="num">${t('colNo')}</th><th>${t('colWhen')}</th><th>${t('colType')}</th>
      ${R.branch === 'all' ? `<th>${t('colBranch')}</th>` : ''}<th>${t('colUser')}</th><th>${t('colItems')}</th><th class="money">${t('colTotal')}</th></tr></thead>
      <tbody>${list.length ? [...list].reverse().map(tx => { const d = new Date(tx.at); return `<tr>
        <td class="num">${tx.no}</td>
        <td>${esc(R.period === 'day' ? fmtTime(d) : `${fmtDate(d, { day: 'numeric', month: 'short' })} ${fmtTime(d)}`)}</td>
        <td class="kind-cell ${tx.type}">${t(tx.type)}</td>
        ${R.branch === 'all' ? `<td>${esc(branchName(tx.branch))}</td>` : ''}
        <td>${esc(tx.userName)}</td>
        <td class="items">${esc(tx.items.map(i => `${i.name} × ${i.qty}`).join('، '))}${tx.note ? ` <span class="muted">— ${esc(tx.note)}</span>` : ''}</td>
        <td class="money">${esc(fmt(tx.total, tx.currency))}</td></tr>`; }).join('')
        : `<tr class="empty-row"><td colspan="7">${t('noData')}</td></tr>`}</tbody></table></div>

    <p class="report-foot">${esc(t('reportCurrency', t('curName')[S.currency], nf.format(S.settings.rate)))}</p>
  </article>`;
  $('#reportPrint').addEventListener('click', () => window.print());
}
$$('#reportSeg button').forEach(b => b.addEventListener('click', () => {
  S.reportPeriod = b.dataset.period;
  $$('#reportSeg button').forEach(x => x.classList.toggle('is-active', x === b));
  if (S.report) makeReport();
}));
$('#reportBranch').addEventListener('change', e => { S.reportBranch = e.target.value; if (S.report) makeReport(); });
$('#reportDate').addEventListener('change', () => { if (S.report) makeReport(); });
$('#reportGo').addEventListener('click', makeReport);
$('#reportTypeWrap').innerHTML = typeSegHtml('reportTypeSeg', S.reportType);
$('#reportTypeWrap').addEventListener('click', e => {
  const b = e.target.closest('button[data-type]'); if (!b) return;
  S.reportType = b.dataset.type; setPref('rtype', S.reportType);
  $$('#reportTypeSeg button').forEach(x => x.classList.toggle('is-active', x === b));
  if (S.report) renderReport();
});

// ---------- boot ----------
(async function boot() {
  $('#searchDate').value = dayKey(new Date());
  $('#reportDate').value = dayKey(new Date());
  try { S.pub = await api('/public'); } catch {}
  applyChrome();
  try { const { user } = await api('/me'); await enterApp(user); }
  catch { showLogin(); }
})();
