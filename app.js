'use strict';
/* ---------- helpers ---------- */
const KEY = 'duka-ledger-v1';
const DAY = 864e5;
const $ = s => document.querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nf = new Intl.NumberFormat('en-KE', {maximumFractionDigits: 2});
const money = n => 'KSh ' + nf.format(n);
const r2 = n => Math.round(n * 100) / 100;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

/* ---------- translations ---------- */
const L = {
en: {
  app:'Duka Ledger', tabOwes:'Owes', tabOverdue:'Overdue', tabCustomers:'Customers', tabSettings:'Settings',
  totalOwed:'Total owed', owingCount:'Customers owing: {n}', overdueCount:'Overdue: {n}',
  searchPh:'Search name or phone', noOwes:'Nobody owes you right now.', noOverdue:'Nobody has owed for {n}+ days.', noMatch:'No customers match.',
  emptyTitle:'Start your ledger', emptyBody:'Add your first customer, then record credit and payments in a few taps. Everything stays on this phone.',
  addFirst:'Add a customer', trySample:'Try with sample customers', sampleNote:'These are sample customers.', removeSamples:'Remove samples', sample:'Sample',
  newEntry:'New entry', customer:'Customer', change:'Change', amount:'Amount (KSh)', note:'Note (optional)', notePh:'sugar, bread',
  credit:'Credit', payment:'Payment', saveCredit:'Save credit', savePayment:'Save payment', cancel:'Cancel', save:'Save', back:'Back', del:'Delete', edit:'Edit',
  pickCustomer:'Choose a customer first.', enterAmount:'Enter an amount.', addNew:'Add "{q}" as a new customer',
  owes:'Owes {amt}', noDebt:'No debt',
  warnTitle:'{name} is over the limit', warnAmt:'New balance {bal} is above the {lim} limit.', warnDays:'Has unpaid credit older than {d} days (oldest is {n} days).',
  addAnyway:'Add anyway', goBack:'Go back',
  newCustomer:'New customer', editCustomer:'Edit customer', name:'Name', phone:'Phone', limitAmount:'Credit limit (KSh)', limitDays:'Days allowed to pay',
  limitBlank:'Leave blank to use the shop default.', nameNeeded:'Enter a name.',
  paidAhead:'Paid ahead', settled:'Settled', today:'Today', day1:'1 day', days:'{n} days', oldest:'Oldest unpaid: {d}',
  pastDue:'Past due', overLimit:'Over limit', limAmt:'Limit {amt}', limDays:'Pay within {d} days', noLimit:'No limit set',
  gaveCredit:'Gave credit', gotPayment:'Got payment', remind:'Send reminder', noPhone:'Add a phone number to send reminders.',
  remindMsg:'Hello {name}, your balance at {shop} is {amt}. Please pay when you can. Thank you.', shopFallback:'our shop',
  ledger:'Ledger', colDate:'Date', colDetails:'Details', colAmount:'Amount / Balance', bal:'Bal', noEntries:'No entries yet.',
  delEntryQ:'Delete this entry? The balance will be recalculated.', delCustQ:'Delete {name} and all their entries?', yesDelete:'Yes, delete',
  settings:'Settings', shopName:'Shop name', shopPh:'e.g. Mama Joy Shop', language:'Language',
  limitsTitle:'Default limits', limitsHint:'Used for customers without their own limit. Enter 0 for no limit. You can still add credit past a limit after a warning.',
  pinTitle:'PIN lock', pinHint:'Encrypts your records on this phone and hides them from anyone who picks it up.',
  setPin:'Set PIN', changePin:'Change PIN', removePin:'Remove PIN', lockNow:'Lock now',
  enterPin:'Enter PIN', wrongPin:'Wrong PIN, try again.', wrongPinWait:'Wrong PIN. Try again in {n}s.', pinNew:'Choose a 4-digit PIN', pinConfirm:'Enter it again', pinMismatch:'PINs did not match. Try again.', pinSet:'PIN set.', pinRemoved:'PIN removed.',
  pinNeedsSecure:'PIN lock needs a secure (https) connection and is not available here.',
  backupTitle:'Backup', backupNow:'Back up now', restore:'Restore from file', lastBackup:'Last backup: {when}', never:'never', daysAgo:'{n} days ago', yesterday:'yesterday',
  backupHint:'Send the backup file to your WhatsApp or save it to a memory card. To use it on a new phone, open this app there and restore.',
  nudgeBackup:'Back up your records. Last backup: {when}.', restoreQ:'Replace everything on this phone with this backup ({n} customers)? This cannot be undone and removes any PIN.',
  restored:'Backup restored.', badFile:'This file is not a Duka Ledger backup.', backupDone:'Backup saved.',
  forgotPin:'Forgot PIN?', forgotTitle:'Reset with a backup', forgotBody:'Restoring a backup file replaces everything on this phone and removes the PIN. Without a backup file, the PIN cannot be reset.', chooseBackup:'Choose backup file',
  eraseTitle:'Erase all data', eraseBtn:'Erase everything', eraseQ:'Erase all customers and entries from this phone? This cannot be undone.', erased:'All data erased.',
  storageWarn:'This browser cannot save data. Back up before you close the app.',
  overdueHint:'Customers whose oldest unpaid credit is {n} days old or more.', saved:'Saved.', daysPlus:'{n}+ days',
  copy:'Copy', copied:'Message copied.', smsHint:'If Messages did not open, tap Copy and paste the message there.'
},
sw: {
  app:'Daftari la Duka', tabOwes:'Madeni', tabOverdue:'Yamechelewa', tabCustomers:'Wateja', tabSettings:'Mipangilio',
  totalOwed:'Jumla ya madeni', owingCount:'Wateja wanaodaiwa: {n}', overdueCount:'Yamechelewa: {n}',
  searchPh:'Tafuta jina au simu', noOwes:'Hakuna mtu anayedaiwa kwa sasa.', noOverdue:'Hakuna aliye na deni la siku {n}+.', noMatch:'Hakuna mteja anayelingana.',
  emptyTitle:'Anza daftari lako', emptyBody:'Ongeza mteja wa kwanza, kisha andika madeni na malipo kwa kugusa mara chache. Kila kitu kinabaki kwenye simu hii.',
  addFirst:'Ongeza mteja', trySample:'Jaribu na wateja wa mfano', sampleNote:'Hawa ni wateja wa mfano.', removeSamples:'Ondoa wa mfano', sample:'Mfano',
  newEntry:'Rekodi mpya', customer:'Mteja', change:'Badilisha', amount:'Kiasi (KSh)', note:'Maelezo (si lazima)', notePh:'sukari, mkate',
  credit:'Deni', payment:'Malipo', saveCredit:'Hifadhi deni', savePayment:'Hifadhi malipo', cancel:'Ghairi', save:'Hifadhi', back:'Rudi', del:'Futa', edit:'Hariri',
  pickCustomer:'Chagua mteja kwanza.', enterAmount:'Weka kiasi.', addNew:'Ongeza "{q}" kama mteja mpya',
  owes:'Anadaiwa {amt}', noDebt:'Hana deni',
  warnTitle:'{name} amezidi kikomo', warnAmt:'Salio jipya {bal} ni juu ya kikomo cha {lim}.', warnDays:'Ana deni lisilolipwa la zaidi ya siku {d} (kongwe zaidi ni siku {n}).',
  addAnyway:'Ongeza hata hivyo', goBack:'Rudi nyuma',
  newCustomer:'Mteja mpya', editCustomer:'Hariri mteja', name:'Jina', phone:'Simu', limitAmount:'Kikomo cha deni (KSh)', limitDays:'Siku za kulipa',
  limitBlank:'Acha wazi kutumia kikomo cha duka.', nameNeeded:'Weka jina.',
  paidAhead:'Amelipa mbele', settled:'Hana deni', today:'Leo', day1:'siku 1', days:'siku {n}', oldest:'Deni kongwe zaidi: {d}',
  pastDue:'Amechelewa', overLimit:'Amezidi kikomo', limAmt:'Kikomo {amt}', limDays:'Lipa ndani ya siku {d}', noLimit:'Hakuna kikomo',
  gaveCredit:'Amekopa', gotPayment:'Amelipa', remind:'Tuma ukumbusho', noPhone:'Weka namba ya simu ili kutuma ukumbusho.',
  remindMsg:'Habari {name}, deni lako katika {shop} ni {amt}. Tafadhali lipa unapoweza. Asante.', shopFallback:'duka letu',
  ledger:'Historia', colDate:'Tarehe', colDetails:'Maelezo', colAmount:'Kiasi / Salio', bal:'Salio', noEntries:'Bado hakuna rekodi.',
  delEntryQ:'Futa rekodi hii? Salio litahesabiwa upya.', delCustQ:'Futa {name} na rekodi zake zote?', yesDelete:'Ndiyo, futa',
  settings:'Mipangilio', shopName:'Jina la duka', shopPh:'mf. Duka la Mama Joy', language:'Lugha',
  limitsTitle:'Vikomo vya kawaida', limitsHint:'Hutumika kwa wateja wasio na kikomo chao. Weka 0 kama hakuna kikomo. Bado unaweza kuongeza deni baada ya onyo.',
  pinTitle:'Nambari ya siri (PIN)', pinHint:'Husimba rekodi zako kwenye simu hii na kuzificha mteja akishika simu yako.',
  setPin:'Weka PIN', changePin:'Badilisha PIN', removePin:'Ondoa PIN', lockNow:'Funga sasa',
  enterPin:'Weka PIN', wrongPin:'PIN si sahihi, jaribu tena.', wrongPinWait:'PIN si sahihi. Jaribu tena baada ya sekunde {n}.', pinNew:'Chagua PIN ya tarakimu 4', pinConfirm:'Iweke tena', pinMismatch:'PIN hazilingani. Jaribu tena.', pinSet:'PIN imewekwa.', pinRemoved:'PIN imeondolewa.',
  pinNeedsSecure:'PIN inahitaji muunganisho salama (https) na haipatikani hapa.',
  backupTitle:'Nakala ya hifadhi', backupNow:'Hifadhi nakala sasa', restore:'Rudisha kutoka faili', lastBackup:'Nakala ya mwisho: {when}', never:'haijawahi', daysAgo:'siku {n} zilizopita', yesterday:'jana',
  backupHint:'Tuma faili ya nakala kwenye WhatsApp yako au iweke kwenye kadi ya kumbukumbu. Ili kuitumia kwenye simu mpya, fungua programu hii huko kisha rudisha.',
  nudgeBackup:'Hifadhi nakala ya rekodi zako. Nakala ya mwisho: {when}.', restoreQ:'Badilisha kila kitu kwenye simu hii na nakala hii (wateja {n})? Hili haliwezi kutenduliwa na linaondoa PIN.',
  restored:'Nakala imerudishwa.', badFile:'Faili hii si nakala ya Duka Ledger.', backupDone:'Nakala imehifadhiwa.',
  forgotPin:'Umesahau PIN?', forgotTitle:'Rudisha kwa nakala', forgotBody:'Kurudisha faili ya nakala kunabadilisha kila kitu kwenye simu hii na kuondoa PIN. Bila faili ya nakala, PIN haiwezi kuwekwa upya.', chooseBackup:'Chagua faili ya nakala',
  eraseTitle:'Futa data yote', eraseBtn:'Futa kila kitu', eraseQ:'Futa wateja na rekodi zote kwenye simu hii? Haiwezi kurudishwa.', erased:'Data yote imefutwa.',
  storageWarn:'Kivinjari hiki hakiwezi kuhifadhi data. Hifadhi nakala kabla ya kufunga.',
  overdueHint:'Wateja ambao deni lao la zamani zaidi lina siku {n} au zaidi.', saved:'Imehifadhiwa.', daysPlus:'siku {n}+',
  copy:'Nakili', copied:'Ujumbe umenakiliwa.', smsHint:'Kama Messages haikufunguka, bonyeza Nakili kisha ubandike ujumbe.'
}};

/* ---------- state ---------- */
let storageOk = true;
let sessionKey = null;   // CryptoKey held only in memory while unlocked with a PIN; never persisted
let pinSalt = '';         // base64 salt for the current PIN, persisted alongside the ciphertext (not secret)
let locked = false;       // true while the lock pad is shown and `db` has been scrubbed
function blank(){
  return {v:1, customers:[], entries:[], settings:{lang:'en', shop:'', defAmt:2000, defDays:14, pin:false, lastBackup:0}};
}
let db = blank();
function t(k, p){
  let s = (L[db.settings.lang] || L.en)[k];
  if (s == null) s = L.en[k];
  if (s == null) s = k;
  if (p) for (const x in p) s = s.split('{' + x + '}').join(p[x]);
  return s;
}

/* ---------- encryption at rest ----------
   When a PIN is set, the whole ledger is encrypted with a key derived from the
   PIN (PBKDF2-SHA256, random per-install salt) using AES-GCM, and stored as
   {enc:1, salt, iv, ct}. Nothing readable is kept in storage while locked, and
   the decrypted data lives only in memory (`db`) while unlocked. Without a PIN,
   data is stored as plain JSON exactly as before (there is nothing to protect
   it with). */
const ENC_ITER = 150000;
function hasCrypto(){ return !!(window.crypto && crypto.subtle); }
function b64(buf){ return btoa(String.fromCharCode(...new Uint8Array(buf))); }
function unb64(s){ const bin = atob(s); const a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a.buffer; }
async function deriveKey(pin, saltB64){
  const enc = new TextEncoder();
  const base = await crypto.subtle.importKey('raw', enc.encode(String(pin)), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    {name:'PBKDF2', salt:unb64(saltB64), iterations:ENC_ITER, hash:'SHA-256'},
    base, {name:'AES-GCM', length:256}, false, ['encrypt', 'decrypt']
  );
}
async function encryptDb(key, obj){
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(JSON.stringify(obj));
  const ct = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, data);
  return {enc:1, iv:b64(iv), ct:b64(ct)};
}
async function decryptDb(key, rec){
  const pt = await crypto.subtle.decrypt({name:'AES-GCM', iv:unb64(rec.iv)}, key, unb64(rec.ct));
  return JSON.parse(new TextDecoder().decode(pt));
}

/* ---------- PIN attempt throttling (persisted so a reload doesn't reset it) ---------- */
const ATT_KEY = 'duka-ledger-pinatt';
function getAttempts(){ try { const a = JSON.parse(localStorage.getItem(ATT_KEY) || '{}'); return {n:a.n || 0, until:a.until || 0}; } catch (e) { return {n:0, until:0}; } }
function setAttempts(a){ try { localStorage.setItem(ATT_KEY, JSON.stringify(a)); } catch (e) {} }
function throttleMs(n){ return n <= 3 ? 0 : Math.min(60000, Math.round(1000 * Math.pow(2, n - 4))); }
/* Runs `tryFn` (an async function that throws on a wrong PIN) behind the throttle.
   Returns undefined on success, or a message string to show on failure/wait. */
async function guardedAttempt(tryFn){
  const a = getAttempts(), now = Date.now();
  if (a.until && now < a.until) return t('wrongPinWait', {n:Math.ceil((a.until - now) / 1000)});
  try {
    await tryFn();
    setAttempts({n:0, until:0});
    return undefined;
  } catch (e) {
    const n = a.n + 1;
    setAttempts({n, until:now + throttleMs(n)});
    return t('wrongPin');
  }
}
/* Legacy hash, kept ONLY to verify the PIN once while migrating a pre-encryption
   install (where the ledger was still stored as plain JSON next to this hash).
   It is never used to protect new data. */
function legacyHashPin(p){
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  const s = 'duka|' + p;
  for (let i = 0, ch; i < s.length; i++) { ch = s.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

function save(){
  try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); } catch (e) { storageOk = false; return; }
  if (db.settings.pin) {
    if (!sessionKey) return; // locked / mid-migration: nothing we can safely write
    encryptDb(sessionKey, db).then(rec => {
      rec.salt = pinSalt;
      try { localStorage.setItem(KEY, JSON.stringify(rec)); storageOk = true; } catch (e) { storageOk = false; }
    }).catch(() => { storageOk = false; });
  } else {
    try { localStorage.setItem(KEY, JSON.stringify(db)); storageOk = true; } catch (e) { storageOk = false; }
  }
}
const cust = id => db.customers.find(c => c.id === id);

/* ---------- ledger maths ---------- */
/* Payments are applied to the oldest credit first. "Days owing" is the age of the oldest credit still unpaid. */
function stats(c, list){
  const es = (list || db.entries.filter(e => e.cid === c.id)).slice().sort((a, b) => a.ts - b.ts);
  let credit = 0, paid = 0, lastPay = 0;
  for (const e of es) { if (e.type === 'credit') credit += e.amt; else { paid += e.amt; if (e.ts > lastPay) lastPay = e.ts; } }
  const bal = r2(credit - paid);
  let oldest = 0;
  if (bal > 0) {
    let p = paid;
    for (const e of es) {
      if (e.type !== 'credit') continue;
      if (p >= e.amt - 0.005) { p -= e.amt; continue; }
      oldest = e.ts; break;
    }
  }
  const days = oldest ? Math.max(0, Math.floor((Date.now() - oldest) / DAY)) : 0;
  const limA = c.limitAmt > 0 ? c.limitAmt : db.settings.defAmt;
  const limD = c.limitDays > 0 ? c.limitDays : db.settings.defDays;
  return {bal, days, oldest, lastPay, limA, limD, es,
          overAmt: limA > 0 && bal > limA,
          overDays: limD > 0 && bal > 0 && days > limD};
}
let SA = null;
function allStats(){
  if (SA) return SA;
  const m = {};
  for (const e of db.entries) (m[e.cid] || (m[e.cid] = [])).push(e);
  SA = db.customers.map(c => ({c, s: stats(c, m[c.id] || [])}));
  return SA;
}
const dl = n => n <= 0 ? t('today') : n === 1 ? t('day1') : t('days', {n});
function whenText(ts){
  if (!ts) return t('never');
  const n = Math.floor((Date.now() - ts) / DAY);
  return n <= 0 ? t('today') : n === 1 ? t('yesterday') : t('daysAgo', {n});
}
function locale(){ return db.settings.lang === 'sw' ? 'sw-KE' : 'en-KE'; }
function waNumber(p){
  let d = String(p || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('0')) d = '254' + d.slice(1);
  else if (d.length === 9 && /^[17]/.test(d)) d = '254' + d;
  return d;
}
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent || '') || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function remindText(c, s){
  return t('remindMsg', {name:c.name, shop:db.settings.shop || t('shopFallback'), amt:money(s.bal)});
}
function remindLinks(c, s){
  const n = waNumber(c.phone);
  if (!n) return null;
  const q = encodeURIComponent(remindText(c, s));
  /* Android reads "?body=", iPhone reads "&body=" */
  return {wa:'https://wa.me/' + n + '?text=' + q, sms:'sms:+' + n + (isIOS ? '&' : '?') + 'body=' + q};
}
function remindBtns(c, s){
  if (!(s.bal > 0)) return '';
  const lk = remindLinks(c, s);
  return (lk ? '<a class="btn sm" href="' + lk.wa + '" target="_blank" rel="noopener">WhatsApp</a>' +
               '<button class="btn sm" data-act="sms" data-id="' + esc(c.id) + '">SMS</button>' : '') +
    '<button class="btn sm ghost" data-act="copy-msg" data-id="' + esc(c.id) + '">' + esc(t('copy')) + '</button>';
}
function openSms(href){
  let left = false;
  const mark = () => { if (document.hidden) left = true; };
  const mark2 = () => { left = true; };
  document.addEventListener('visibilitychange', mark);
  window.addEventListener('blur', mark2);
  const a = document.createElement('a');
  a.href = href; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => {
    document.removeEventListener('visibilitychange', mark);
    window.removeEventListener('blur', mark2);
    if (!left) toast(t('smsHint'));
  }, 1800);
}
async function copyText(txt){
  try { await navigator.clipboard.writeText(txt); return true; }
  catch (e) {
    const ta = document.createElement('textarea');
    ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) {}
    ta.remove();
    return ok;
  }
}
function matches(c, q){
  if (!q) return true;
  const ql = q.toLowerCase(), qd = q.replace(/\D/g, '');
  return c.name.toLowerCase().includes(ql) || (qd.length > 0 && String(c.phone || '').replace(/\D/g, '').includes(qd));
}

/* ---------- ui state ---------- */
let ui = {tab:'owes', q:'', od:7, cust:null};
let es = null;            // entry sheet state
let pendingConfirm = null;

/* ---------- navigation (phone back button + in-app Back) ----------
   Every screen change (tab, customer) and every open sheet is one history entry,
   so the phone's back button steps back through them instead of leaving the app. */
let navDepth = 0, sheetPushed = false, ignorePop = 0;
function curState(){ return {tab:ui.tab, cust:ui.cust, q:ui.q}; }
function restoreNav(){
  const st = history.state;
  if (st && st.tab) { ui.tab = st.tab; ui.cust = st.cust && cust(st.cust) ? st.cust : null; }
  try { history.replaceState(curState(), ''); } catch (e) {}
}
function navTo(tab, cust){
  if (tab === ui.tab && cust === ui.cust) { window.scrollTo(0, 0); return; }
  try { history.replaceState(Object.assign(curState(), {sy:window.scrollY}), ''); } catch (e) {}
  ui.tab = tab; ui.cust = cust; ui.q = '';
  try { history.pushState(curState(), ''); navDepth++; } catch (e) {}
  render(); window.scrollTo(0, 0);
}
function goBack(){
  if (navDepth > 0) { history.back(); return; }
  ui.cust = null;
  try { history.replaceState(curState(), ''); } catch (e) {}
  render();
}
window.addEventListener('popstate', e => {
  if (ignorePop > 0) {            // we closed a sheet ourselves; just keep the entry in step with the screen
    ignorePop--;
    try { history.replaceState(curState(), ''); } catch (_) {}
    return;
  }
  if (!$('#sheet').hidden) { closeSheet(true); return; }   // back pressed while a sheet is open: close it
  const st = e.state;
  if (!st || st.sheet) return;
  navDepth = Math.max(0, navDepth - 1);
  ui.tab = st.tab || 'owes'; ui.cust = st.cust || null; ui.q = st.q || '';
  render(); window.scrollTo(0, st.sy || 0);
});

function toast(msg){
  const el = $('#toast');
  el.textContent = msg; el.hidden = false;
  clearTimeout(toast.h);
  toast.h = setTimeout(() => { el.hidden = true; }, 2800);
}

/* ---------- rendering ---------- */
function render(){
  SA = null;
  document.documentElement.lang = db.settings.lang;
  renderTop(); renderView(); renderTabs();
  const fab = $('#fab');
  fab.textContent = '+ ' + t('newEntry');
  fab.hidden = !!ui.cust || ui.tab === 'settings';
}
function renderTop(){
  const s = db.settings;
  $('#top').innerHTML =
    '<div class="brand">' + (s.shop ? '<small>' + esc(t('app')) + '</small>' + esc(s.shop) : esc(t('app'))) + '</div>' +
    (s.pin ? '<button class="btn sm ghost" data-act="lock-now">' + esc(t('lockNow')) + '</button>' : '');
}
function renderTabs(){
  const n = allStats().filter(x => x.s.bal > 0 && x.s.days >= 7).length;
  const tabs = [['owes','tabOwes'],['overdue','tabOverdue'],['customers','tabCustomers'],['settings','tabSettings']];
  $('#tabs-in').innerHTML = tabs.map(([k, l]) =>
    '<button class="tab" data-act="tab" data-id="' + k + '"' + (ui.tab === k ? ' aria-current="page"' : '') + '>' + esc(t(l)) +
    (k === 'overdue' && n ? '<span class="n">' + n + '</span>' : '') + '</button>').join('');
}
function renderView(){
  const v = $('#view');
  if (ui.cust) v.innerHTML = custView();
  else if (ui.tab === 'owes') v.innerHTML = owesView();
  else if (ui.tab === 'overdue') v.innerHTML = overdueView();
  else if (ui.tab === 'customers') v.innerHTML = customersView();
  else v.innerHTML = settingsView();
}
function renderList(){
  const l = $('#list');
  if (l) l.innerHTML = listFor(ui.tab);
}

function banners(){
  let h = '';
  if (!storageOk) h += '<div class="banner">' + esc(t('storageWarn')) + '</div>';
  if (db.customers.some(c => c.sample)) h += '<div class="banner"><span>' + esc(t('sampleNote')) + '</span><button class="btn sm" data-act="rm-sample">' + esc(t('removeSamples')) + '</button></div>';
  else if (db.entries.length && Date.now() - db.settings.lastBackup > 7 * DAY)
    h += '<div class="banner"><span>' + esc(t('nudgeBackup', {when:whenText(db.settings.lastBackup)})) + '</span><button class="btn sm" data-act="backup">' + esc(t('backupNow')) + '</button></div>';
  return h;
}
function emptyState(){
  return '<div class="empty"><h2>' + esc(t('emptyTitle')) + '</h2><p>' + esc(t('emptyBody')) + '</p>' +
    '<button class="btn primary" data-act="add-cust">' + esc(t('addFirst')) + '</button>' +
    '<button class="btn" data-act="sample">' + esc(t('trySample')) + '</button></div>';
}

function rowHtml(c, s, withRemind){
  const tags = [];
  if (s.overDays) tags.push('<span class="tag bad">' + esc(t('pastDue')) + '</span>');
  if (s.overAmt) tags.push('<span class="tag warn">' + esc(t('overLimit')) + '</span>');
  if (c.sample) tags.push('<span class="tag">' + esc(t('sample')) + '</span>');
  let right;
  if (s.bal > 0) right = '<span class="amt">' + money(s.bal) + '</span><small class="' + (s.overDays ? 'bad-t' : '') + '">' + esc(dl(s.days)) + '</small>';
  else if (s.bal < 0) right = '<span class="amt good">' + money(-s.bal) + '</span><small>' + esc(t('paidAhead')) + '</small>';
  else right = '<span class="amt zero">' + money(0) + '</span><small>' + esc(t('settled')) + '</small>';
  const rb = withRemind ? remindBtns(c, s) : '';
  const act = rb ? '<div class="row-act">' + rb + '</div>' : '';
  return '<div class="row"><button class="row-main" data-act="open" data-id="' + esc(c.id) + '"><span class="who"><b>' + esc(c.name) + '</b><small>' +
    esc(c.phone || '') + '</small>' + tags.join('') + '</span><span class="rt">' + right + '</span></button>' + act + '</div>';
}
function listFor(kind){
  const q = ui.q.trim();
  let items = allStats().filter(x => matches(x.c, q));
  let none;
  if (kind === 'owes') { items = items.filter(x => x.s.bal > 0).sort((a, b) => b.s.bal - a.s.bal); none = t('noOwes'); }
  else if (kind === 'overdue') { items = items.filter(x => x.s.bal > 0 && x.s.days >= ui.od).sort((a, b) => b.s.days - a.s.days || b.s.bal - a.s.bal); none = t('noOverdue', {n:ui.od}); }
  else { items = items.sort((a, b) => a.c.name.localeCompare(b.c.name)); none = t('noMatch'); }
  if (q && !items.length) none = t('noMatch');
  if (!items.length) return '<div class="book"><div class="none">' + esc(none) + '</div></div>';
  return '<div class="book">' + items.map(x => rowHtml(x.c, x.s, kind === 'overdue')).join('') + '</div>';
}
function owesView(){
  const owing = allStats().filter(x => x.s.bal > 0);
  const total = r2(owing.reduce((a, x) => a + x.s.bal, 0));
  const od = owing.filter(x => x.s.days >= 7).length;
  let h = banners();
  h += '<section class="total"><div class="label">' + esc(t('totalOwed')) + '</div><div class="big">' + money(total) + '</div>' +
       '<div class="subline">' + esc(t('owingCount', {n:owing.length})) + (od ? ' · <span class="bad-t">' + esc(t('overdueCount', {n:od})) + '</span>' : '') + '</div></section>';
  if (!db.customers.length) return h + emptyState();
  h += '<input id="q" class="inp" type="search" autocomplete="off" placeholder="' + esc(t('searchPh')) + '" value="' + esc(ui.q) + '">';
  return h + '<div id="list">' + listFor('owes') + '</div>';
}
function overdueView(){
  const seg = [7, 14, 30].map(n => '<button data-act="od" data-id="' + n + '" aria-pressed="' + (ui.od === n) + '">' + esc(t('daysPlus', {n})) + '</button>').join('');
  return '<h2 class="h">' + esc(t('tabOverdue')) + '</h2><div class="seg">' + seg + '</div><p class="hint">' + esc(t('overdueHint', {n:ui.od})) + '</p><div id="list">' + listFor('overdue') + '</div>';
}
function customersView(){
  let h = '<div class="acts" style="justify-content:space-between;margin:12px 0"><h2 class="h" style="margin:0">' + esc(t('tabCustomers')) + '</h2><button class="btn primary sm" data-act="add-cust">+ ' + esc(t('newCustomer')) + '</button></div>';
  if (!db.customers.length) return h + emptyState();
  h += '<input id="q" class="inp" type="search" autocomplete="off" placeholder="' + esc(t('searchPh')) + '" value="' + esc(ui.q) + '">';
  return h + '<div id="list">' + listFor('customers') + '</div>';
}

function custView(){
  const c = cust(ui.cust);
  if (!c) { ui.cust = null; return owesView(); }
  const s = stats(c), lk = remindLinks(c, s);
  const tags = [];
  if (s.overDays) tags.push('<span class="tag bad">' + esc(t('pastDue')) + '</span>');
  if (s.overAmt) tags.push('<span class="tag warn">' + esc(t('overLimit')) + '</span>');
  const lim = [];
  if (s.limA > 0) lim.push(t('limAmt', {amt:money(s.limA)}));
  if (s.limD > 0) lim.push(t('limDays', {d:s.limD}));
  let balTxt = s.bal > 0 ? money(s.bal) : s.bal < 0 ? money(-s.bal) + ' · ' + t('paidAhead') : t('settled');
  let h = '<button class="back" data-act="back">‹ ' + esc(t('back')) + '</button>' +
    '<section class="head"><h2>' + esc(c.name) + '</h2><div class="ph">' + esc(c.phone || '') + '</div>' +
    '<div class="big">' + esc(balTxt) + '</div> ' + tags.join('') +
    '<div class="lim">' + esc(lim.length ? lim.join(' · ') : t('noLimit')) + (s.bal > 0 ? ' · ' + esc(t('oldest', {d:dl(s.days)})) : '') + '</div>' +
    '<div class="two-btn"><button class="btn primary" data-act="entry-for" data-id="' + esc(c.id) + '" data-type="credit">' + esc(t('gaveCredit')) + '</button>' +
    '<button class="btn pay primary" data-act="entry-for" data-id="' + esc(c.id) + '" data-type="payment">' + esc(t('gotPayment')) + '</button></div>' +
    '<div class="acts">';
  h += remindBtns(c, s);
  h += '<button class="btn sm ghost" data-act="edit-cust" data-id="' + esc(c.id) + '">' + esc(t('edit')) + '</button></div>';
  if (s.bal > 0 && !lk) h += '<p class="hint">' + esc(t('noPhone')) + '</p>';
  h += '</section><h3 class="label">' + esc(t('ledger')) + '</h3>';
  if (!s.es.length) return h + '<div class="book"><div class="none">' + esc(t('noEntries')) + '</div></div>';
  let run = 0;
  const rows = s.es.map(e => { run = r2(run + (e.type === 'credit' ? e.amt : -e.amt)); return {e, run}; }).reverse();
  h += '<div class="book"><div class="led-h"><span>' + esc(t('colDate')) + '</span><span>' + esc(t('colDetails')) + '</span><span>' + esc(t('colAmount')) + '</span></div>';
  for (const {e, run:r} of rows) {
    const d = new Date(e.ts);
    const yr = d.getFullYear() !== new Date().getFullYear() ? ' ' + String(d.getFullYear()).slice(2) : '';
    const isC = e.type === 'credit';
    h += '<div class="led"><div class="d"><b>' + d.getDate() + '</b><span>' + esc(d.toLocaleDateString(locale(), {month:'short'}) + yr) + '</span></div>' +
      '<div class="m"><div class="what">' + esc(e.note || t(isC ? 'credit' : 'payment')) + '</div>' +
      (e.note ? '<div class="ty">' + esc(t(isC ? 'credit' : 'payment')) + '</div>' : '') +
      '<button class="link sm" data-act="del-entry" data-id="' + esc(e.id) + '">' + esc(t('del')) + '</button></div>' +
      '<div class="a ' + (isC ? 'cr' : 'pm') + '"><b>' + (isC ? '+' : '−') + nf.format(e.amt) + '</b><span>' + esc(t('bal')) + ' ' + nf.format(r) + '</span></div></div>';
  }
  return h + '</div>';
}

function settingsView(){
  const s = db.settings;
  let h = '<h2 class="h">' + esc(t('settings')) + '</h2>';
  h += '<section class="card"><label class="lbl" for="st-shop">' + esc(t('shopName')) + '</label>' +
    '<input id="st-shop" class="inp" data-set="shop" value="' + esc(s.shop) + '" placeholder="' + esc(t('shopPh')) + '">' +
    '<div class="lbl">' + esc(t('language')) + '</div><div class="seg" style="margin-bottom:0">' +
    '<button data-act="lang" data-id="en" aria-pressed="' + (s.lang === 'en') + '">English</button>' +
    '<button data-act="lang" data-id="sw" aria-pressed="' + (s.lang === 'sw') + '">Kiswahili</button></div></section>';
  h += '<section class="card"><h3>' + esc(t('limitsTitle')) + '</h3><p class="hint">' + esc(t('limitsHint')) + '</p><div class="two">' +
    '<div><label class="lbl" for="st-la">' + esc(t('limitAmount')) + '</label><input id="st-la" class="inp" inputmode="numeric" data-set="defAmt" value="' + esc(s.defAmt) + '"></div>' +
    '<div><label class="lbl" for="st-ld">' + esc(t('limitDays')) + '</label><input id="st-ld" class="inp" inputmode="numeric" data-set="defDays" value="' + esc(s.defDays) + '"></div></div></section>';
  h += '<section class="card"><h3>' + esc(t('pinTitle')) + '</h3><p class="hint">' + esc(t('pinHint')) + '</p><div class="acts">' +
    (s.pin ? '<button class="btn" data-act="pin-change">' + esc(t('changePin')) + '</button><button class="btn ghost" data-act="pin-remove">' + esc(t('removePin')) + '</button>'
           : '<button class="btn primary" data-act="pin-set">' + esc(t('setPin')) + '</button>') + '</div></section>';
  h += '<section class="card"><h3>' + esc(t('backupTitle')) + '</h3><p class="hint">' + esc(t('lastBackup', {when:whenText(s.lastBackup)})) + '</p><div class="acts">' +
    '<button class="btn primary" data-act="backup">' + esc(t('backupNow')) + '</button><button class="btn" data-act="restore">' + esc(t('restore')) + '</button></div>' +
    '<p class="hint" style="margin-top:12px">' + esc(t('backupHint')) + '</p></section>';
  h += '<section class="card"><h3>' + esc(t('eraseTitle')) + '</h3><div class="acts"><button class="btn danger" data-act="erase">' + esc(t('eraseBtn')) + '</button></div></section>';
  return h;
}

/* ---------- sheets ---------- */
function openSheet(html){
  const r = $('#sheet');
  r.innerHTML = '<div class="scrim" data-act="close-sheet"></div><div class="panel" role="dialog" aria-modal="true">' + html + '</div>';
  r.hidden = false;
  document.body.classList.add('noscroll');
  if (!sheetPushed) {
    try { history.pushState(Object.assign(curState(), {sheet:1}), ''); sheetPushed = true; } catch (e) {}
  }
}
function closeSheet(fromPop){
  const r = $('#sheet');
  r.hidden = true; r.innerHTML = '';
  document.body.classList.remove('noscroll');
  es = null;
  if (sheetPushed) {
    sheetPushed = false;
    if (fromPop !== true) { ignorePop++; try { history.back(); } catch (e) { ignorePop--; } }
  }
}
function openConfirm(msg, yesLabel, fn, danger){
  pendingConfirm = fn;
  openSheet('<p style="font-size:1.05rem">' + esc(msg) + '</p><div class="btns"><button class="btn ghost" data-act="close-sheet">' + esc(t('cancel')) + '</button>' +
    '<button class="btn ' + (danger ? 'danger' : 'primary') + '" data-act="confirm-yes">' + esc(yesLabel) + '</button></div>');
}

function openEntry(cid, type){
  es = {cid:cid || null, type:type || 'credit', amt:'', note:'', q:'', warn:null};
  drawEntry();
}
function syncEs(){
  if (!es) return;
  const a = $('#es-amt'), n = $('#es-note'), q = $('#es-q');
  if (a) es.amt = a.value;
  if (n) es.note = n.value;
  if (q) es.q = q.value;
}
function drawEntry(){
  const c = es.cid ? cust(es.cid) : null;
  const s = c ? stats(c) : null;
  const isC = es.type === 'credit';
  let h = '<h2>' + esc(t('newEntry')) + '</h2>';
  if (c) {
    h += '<div class="picked"><div><b>' + esc(c.name) + '</b><small>' + esc(s.bal > 0 ? t('owes', {amt:money(s.bal)}) : t('noDebt')) + '</small></div>' +
         '<button class="link" data-act="es-change">' + esc(t('change')) + '</button></div>';
  } else {
    h += '<label class="lbl" for="es-q">' + esc(t('customer')) + '</label><input id="es-q" class="inp" type="search" autocomplete="off" placeholder="' + esc(t('searchPh')) + '" value="' + esc(es.q) + '"><div id="es-sugg"></div>';
  }
  h += '<div class="seg" style="margin-top:14px"><button data-act="es-type" data-id="credit" aria-pressed="' + isC + '">' + esc(t('credit')) + '</button>' +
       '<button class="pay" data-act="es-type" data-id="payment" aria-pressed="' + !isC + '">' + esc(t('payment')) + '</button></div>';
  h += '<label class="lbl" for="es-amt" style="margin-top:0">' + esc(t('amount')) + '</label><input id="es-amt" class="inp big-in" inputmode="decimal" autocomplete="off" placeholder="0" value="' + esc(es.amt) + '">';
  h += '<label class="lbl" for="es-note">' + esc(t('note')) + '</label><input id="es-note" class="inp" autocomplete="off" placeholder="' + esc(t('notePh')) + '" value="' + esc(es.note) + '">';
  if (es.warn && c) {
    h += '<div class="warnbox"><b>' + esc(t('warnTitle', {name:c.name})) + '</b><ul>' + es.warn.map(w => '<li>' + esc(w) + '</li>').join('') + '</ul></div>' +
         '<div class="btns"><button class="btn ghost" data-act="es-unwarn">' + esc(t('goBack')) + '</button><button class="btn danger" data-act="es-force">' + esc(t('addAnyway')) + '</button></div>';
  } else {
    h += '<div class="btns"><button class="btn ghost" data-act="close-sheet">' + esc(t('cancel')) + '</button>' +
         '<button class="btn ' + (isC ? 'primary' : 'pay primary') + '" data-act="es-save">' + esc(t(isC ? 'saveCredit' : 'savePayment')) + '</button></div>';
  }
  openSheet(h);
  if (!c) fillSugg();
  setTimeout(() => { const f = $(c ? '#es-amt' : '#es-q'); if (f) f.focus(); }, 60);
}
function fillSugg(){
  const box = $('#es-sugg');
  if (!box || !es) return;
  const q = es.q.trim(), ql = q.toLowerCase();
  const touch = {};
  for (const e of db.entries) if (!touch[e.cid] || e.ts > touch[e.cid]) touch[e.cid] = e.ts;
  const sm = {};
  for (const x of allStats()) sm[x.c.id] = x.s;
  const list = db.customers.filter(c => matches(c, q))
    .sort((a, b) => (touch[b.id] || b.created || 0) - (touch[a.id] || a.created || 0)).slice(0, 6);
  let h = list.map(c => {
    const s = sm[c.id];
    return '<button class="sugg" data-act="es-pick" data-id="' + esc(c.id) + '"><span>' + esc(c.name) + '</span><small>' + (s && s.bal > 0 ? money(s.bal) : '') + '</small></button>';
  }).join('');
  if (q && !db.customers.some(c => c.name.toLowerCase() === ql))
    h += '<button class="sugg add" data-act="es-newc">+ ' + esc(t('addNew', {q})) + '</button>';
  box.innerHTML = h;
}
function saveEntry(force){
  syncEs();
  if (!es.cid) { toast(t('pickCustomer')); return; }
  const amt = r2(parseFloat(String(es.amt).replace(/[^0-9.]/g, '')));
  if (!(amt > 0)) { toast(t('enterAmount')); const f = $('#es-amt'); if (f) f.focus(); return; }
  const c = cust(es.cid), s = stats(c);
  if (es.type === 'credit' && !force) {
    const why = [], nb = r2(s.bal + amt);
    if (s.limA > 0 && nb > s.limA) why.push(t('warnAmt', {bal:money(nb), lim:money(s.limA)}));
    if (s.limD > 0 && s.bal > 0 && s.days > s.limD) why.push(t('warnDays', {d:s.limD, n:s.days}));
    if (why.length) { es.warn = why; drawEntry(); return; }
  }
  db.entries.push({id:uid(), cid:c.id, type:es.type, amt, note:es.note.trim(), ts:Date.now()});
  save(); closeSheet(); render();
  const ns = stats(c);
  toast(c.name + ': ' + (ns.bal > 0 ? t('owes', {amt:money(ns.bal)}) : ns.bal < 0 ? t('paidAhead') : t('settled')));
}

function openCust(id){
  const c = id ? cust(id) : null;
  let h = '<h2>' + esc(t(c ? 'editCustomer' : 'newCustomer')) + '</h2>' +
    '<label class="lbl" for="cs-name">' + esc(t('name')) + '</label><input id="cs-name" class="inp" autocomplete="off" value="' + esc(c ? c.name : '') + '">' +
    '<label class="lbl" for="cs-phone">' + esc(t('phone')) + '</label><input id="cs-phone" class="inp" type="tel" inputmode="tel" autocomplete="off" placeholder="07xx xxx xxx" value="' + esc(c ? c.phone : '') + '">' +
    '<div class="two"><div><label class="lbl" for="cs-la">' + esc(t('limitAmount')) + '</label><input id="cs-la" class="inp" inputmode="numeric" placeholder="' + esc(db.settings.defAmt) + '" value="' + esc(c && c.limitAmt ? c.limitAmt : '') + '"></div>' +
    '<div><label class="lbl" for="cs-ld">' + esc(t('limitDays')) + '</label><input id="cs-ld" class="inp" inputmode="numeric" placeholder="' + esc(db.settings.defDays) + '" value="' + esc(c && c.limitDays ? c.limitDays : '') + '"></div></div>' +
    '<p class="hint">' + esc(t('limitBlank')) + '</p>' +
    '<div class="btns"><button class="btn ghost" data-act="close-sheet">' + esc(t('cancel')) + '</button><button class="btn primary" data-act="cs-save" data-id="' + esc(c ? c.id : '') + '">' + esc(t('save')) + '</button></div>';
  if (c) h += '<div class="btns"><button class="btn danger" data-act="cs-del" data-id="' + esc(c.id) + '">' + esc(t('del')) + '</button></div>';
  openSheet(h);
  setTimeout(() => { const f = $('#cs-name'); if (f && !c) f.focus(); }, 60);
}
function saveCust(id){
  const name = $('#cs-name').value.trim();
  if (!name) { toast(t('nameNeeded')); $('#cs-name').focus(); return; }
  const num = v => Math.max(0, Math.round(parseFloat(v) || 0));
  const data = {name, phone:$('#cs-phone').value.trim(), limitAmt:num($('#cs-la').value), limitDays:num($('#cs-ld').value)};
  if (id) Object.assign(cust(id), data);
  else db.customers.push(Object.assign({id:uid(), created:Date.now()}, data));
  save(); closeSheet(); render(); toast(t('saved'));
}

/* ---------- PIN lock ----------
   A PIN protects the data by encrypting it (see "encryption at rest" above),
   not just by hiding the screen. While locked, `db` holds no customer data and
   the DOM is scrubbed, so there is nothing to read from memory or storage
   without the correct PIN. */
function scrubUI(){
  $('#top').innerHTML = ''; $('#view').innerHTML = ''; $('#tabs-in').innerHTML = '';
  $('#fab').hidden = true;
}
function hidePad(){ const el = $('#lock'); el.hidden = true; el.innerHTML = ''; el.onclick = null; }
function showPad(o){
  const el = $('#lock');
  let buf = '';
  el.hidden = false;
  function draw(msg){
    let keys = '';
    for (let i = 1; i <= 9; i++) keys += '<button data-pad="' + i + '">' + i + '</button>';
    keys += '<span></span><button data-pad="0">0</button><button data-pad="del" aria-label="Delete">←</button>';
    el.innerHTML = '<div class="pad"><h2>' + esc(o.title) + '</h2><p class="sub">' + esc(msg || '') + '</p><div class="dots">' +
      [0, 1, 2, 3].map(i => '<i class="' + (i < buf.length ? 'on' : '') + '"></i>').join('') + '</div><div class="keys">' + keys + '</div>' +
      (o.cancelable ? '<button class="btn ghost" data-pad="cancel">' + esc(t('cancel')) + '</button>' : '') +
      (o.forgot ? '<button class="link" data-pad="forgot">' + esc(t('forgotPin')) + '</button>' : '') + '</div>';
  }
  el.onclick = e => {
    const b = e.target.closest('[data-pad]');
    if (!b) return;
    const k = b.dataset.pad;
    if (k === 'cancel') { hidePad(); return; }
    if (k === 'forgot') {
      el.innerHTML = '<div class="pad"><h2>' + esc(t('forgotTitle')) + '</h2><p class="sub" style="margin:10px 0 18px">' + esc(t('forgotBody')) + '</p>' +
        '<label class="btn primary filebtn">' + esc(t('chooseBackup')) + '<input type="file" id="lock-file" accept=".json,application/json" hidden></label>' +
        '<button class="btn ghost" data-pad="again">' + esc(t('back')) + '</button></div>';
      return;
    }
    if (k === 'again') { buf = ''; draw(); return; }
    if (k === 'del') buf = buf.slice(0, -1);
    else if (buf.length < 4) buf += k;
    draw();
    if (buf.length === 4) {
      const pin = buf;
      const r = o.onDone(pin);
      if (r && typeof r.then === 'function') {
        draw('…');
        r.then(res => { if (typeof res === 'string') { buf = ''; draw(res); } })
         .catch(() => { buf = ''; draw(t('wrongPin')); });
      } else if (typeof r === 'string') {
        buf = ''; setTimeout(() => draw(r), 120);
      }
    }
  };
  draw();
}
function lockNow(){
  if (!db.settings.pin) return;
  closeSheet();
  locked = true;
  sessionKey = null;
  scrubUI();
  showPad({title:t('enterPin'), forgot:true, onDone: pin => guardedAttempt(async () => {
    const raw = localStorage.getItem(KEY);
    const rec = raw && JSON.parse(raw);
    if (!(rec && rec.enc === 1)) throw new Error('no-encrypted-record');
    const key = await deriveKey(pin, rec.salt);
    const dec = await decryptDb(key, rec);
    sessionKey = key; pinSalt = rec.salt; db = dec; locked = false;
    hidePad(); render();
  })});
}
function startSetPin(){
  if (!hasCrypto()) { toast(t('pinNeedsSecure')); return; }
  showPad({title:t('pinNew'), cancelable:true, onDone:p1 => {
    showPad({title:t('pinConfirm'), cancelable:true, onDone:p2 => {
      if (p2 !== p1) return t('pinMismatch');
      return (async () => {
        pinSalt = b64(crypto.getRandomValues(new Uint8Array(16)));
        sessionKey = await deriveKey(p2, pinSalt);
        db.settings.pin = true;
        save(); hidePad(); render(); toast(t('pinSet'));
      })();
    }});
  }});
}
function verifyPin(next){
  showPad({title:t('enterPin'), cancelable:true, onDone: pin => guardedAttempt(async () => {
    const raw = localStorage.getItem(KEY);
    const rec = raw && JSON.parse(raw);
    if (!(rec && rec.enc === 1)) throw new Error('no-encrypted-record');
    const key = await deriveKey(pin, rec.salt);
    await decryptDb(key, rec); // throws on a wrong PIN; the already-unlocked `db` in memory is used as-is
    hidePad(); next();
  })});
}
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) hiddenAt = Date.now();
  else if (db.settings.pin && !locked && hiddenAt && Date.now() - hiddenAt > 120000) lockNow();
});

/* ---------- backup / restore ---------- */
function exportData(){
  const s = Object.assign({}, db.settings); delete s.pin;
  return JSON.stringify({app:'duka-ledger', version:1, exportedAt:Date.now(), customers:db.customers, entries:db.entries, settings:s});
}
function markBackup(){ db.settings.lastBackup = Date.now(); save(); render(); toast(t('backupDone')); }
async function backup(){
  const d = new Date(), p = n => String(n).padStart(2, '0');
  const name = 'duka-ledger-' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '.json';
  const data = exportData();
  try {
    const file = new File([data], name, {type:'application/json'});
    if (navigator.canShare && navigator.canShare({files:[file]})) { await navigator.share({files:[file], title:'Duka Ledger'}); markBackup(); return; }
  } catch (e) { if (e && e.name === 'AbortError') return; }
  const url = URL.createObjectURL(new Blob([data], {type:'application/json'}));
  const a = document.createElement('a');
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  markBackup();
}
/* Imported data is never trusted as-is: every customer/entry id is regenerated
   here (so nothing from the file ever reaches the DOM as a stored id), fields
   are type- and range-checked, and any PIN state in the file is dropped. */
function sanitize(d){
  const b = blank();
  const idMap = new Map();
  const customers = (Array.isArray(d.customers) ? d.customers : [])
    .filter(c => c && typeof c.id === 'string' && typeof c.name === 'string' && c.name.trim())
    .map(c => {
      const newId = uid();
      idMap.set(c.id, newId);
      return {
        id: newId,
        name: String(c.name).trim().slice(0, 200),
        phone: String(c.phone || '').slice(0, 50),
        limitAmt: Math.min(1e8, Math.max(0, Number(c.limitAmt) || 0)),
        limitDays: Math.min(3650, Math.max(0, Number(c.limitDays) || 0)),
        created: Number.isFinite(c.created) ? c.created : Date.now(),
        sample: !!c.sample
      };
    });
  const entries = (Array.isArray(d.entries) ? d.entries : [])
    .filter(e => e && idMap.has(e.cid) && (e.type === 'credit' || e.type === 'payment') && isFinite(e.amt) && e.amt > 0 && isFinite(e.ts))
    .map(e => ({id:uid(), cid:idMap.get(e.cid), type:e.type, amt:Number(e.amt), note:String(e.note || '').slice(0, 300), ts:Number(e.ts)}));
  const ds = (d.settings && typeof d.settings === 'object') ? d.settings : {};
  const settings = Object.assign({}, b.settings, {
    lang: ds.lang === 'sw' ? 'sw' : 'en',
    shop: String(ds.shop || '').slice(0, 100),
    defAmt: Math.min(1e8, Math.max(0, Number(ds.defAmt) || 0)),
    defDays: Math.min(3650, Math.max(0, Number(ds.defDays) || 0)),
    pin: false,       // a restored backup always starts unlocked; see forgotBody copy
    lastBackup: 0
  });
  return {v:1, customers, entries, settings};
}
function readBackup(file, cb){
  const r = new FileReader();
  r.onload = () => {
    try {
      const d = JSON.parse(r.result);
      if (!d || d.app !== 'duka-ledger' || !Array.isArray(d.customers) || !Array.isArray(d.entries)) throw new Error('bad');
      cb(sanitize(d));
    } catch (e) { toast(t('badFile')); }
  };
  r.onerror = () => toast(t('badFile'));
  r.readAsText(file);
}
function applyRestore(inc){
  db = inc; sessionKey = null; pinSalt = ''; locked = false;
  save(); ui = {tab:'owes', q:'', od:7, cust:null}; navDepth = 0; render(); toast(t('restored'));
}

/* ---------- sample data ---------- */
function loadSample(){
  const now = Date.now();
  const mk = (name, phone, la, ld) => ({id:uid(), name, phone, limitAmt:la || 0, limitDays:ld || 0, created:now, sample:true});
  const ev = (c, type, amt, ago, note) => db.entries.push({id:uid(), cid:c.id, type, amt, note:note || '', ts:now - ago * DAY});
  const a = mk('Mama Joy', '0712 345 678'), b = mk('Mzee Otieno', '0723 111 222', 1500, 10), c = mk('Wanjiku', '0734 555 019'),
        d = mk('Baba Brian', '0701 888 340'), e = mk('Kamau Hardware', '');
  db.customers.push(a, b, c, d, e);
  ev(a, 'credit', 450, 9, 'sugar, bread'); ev(a, 'credit', 400, 3, 'maziwa, unga');
  ev(b, 'credit', 1200, 21, 'unga, mafuta'); ev(b, 'payment', 400, 14); ev(b, 'credit', 700, 5, 'sukari');
  ev(c, 'credit', 2600, 35, 'school shopping');
  ev(d, 'credit', 180, 1, 'airtime'); ev(d, 'payment', 180, 0);
  ev(e, 'credit', 950, 16, 'cement, nails');
  save(); render();
}

/* ---------- events ---------- */
document.addEventListener('click', ev => {
  const el = ev.target.closest('[data-act]');
  if (!el) return;
  const a = el.dataset.act, id = el.dataset.id;
  switch (a) {
    case 'tab': navTo(id, null); break;
    case 'open': navTo(ui.tab, id); break;
    case 'back': goBack(); break;
    case 'sms': { const c = cust(id), lk = c && remindLinks(c, stats(c)); if (lk) openSms(lk.sms); break; }
    case 'copy-msg': { const c = cust(id); if (c) copyText(remindText(c, stats(c))).then(ok => toast(ok ? t('copied') : t('smsHint'))); break; }
    case 'new-entry': openEntry(null, 'credit'); break;
    case 'entry-for': openEntry(id, el.dataset.type); break;
    case 'add-cust': openCust(null); break;
    case 'edit-cust': openCust(id); break;
    case 'close-sheet': closeSheet(); break;
    case 'confirm-yes': { const fn = pendingConfirm; pendingConfirm = null; closeSheet(); if (fn) fn(); break; }
    case 'es-type': syncEs(); es.type = id; es.warn = null; drawEntry(); break;
    case 'es-pick': es.cid = id; es.q = ''; es.warn = null; drawEntry(); break;
    case 'es-change': syncEs(); es.cid = null; es.warn = null; drawEntry(); break;
    case 'es-newc': {
      const name = $('#es-q').value.trim(); if (!name) break;
      syncEs();
      const c = {id:uid(), name, phone:'', limitAmt:0, limitDays:0, created:Date.now()};
      db.customers.push(c); save(); SA = null; es.cid = c.id; es.q = ''; drawEntry(); break;
    }
    case 'es-save': saveEntry(false); break;
    case 'es-force': saveEntry(true); break;
    case 'es-unwarn': syncEs(); es.warn = null; drawEntry(); break;
    case 'cs-save': saveCust(id); break;
    case 'cs-del': { const c = cust(id); openConfirm(t('delCustQ', {name:c.name}), t('yesDelete'), () => {
      db.customers = db.customers.filter(x => x.id !== id); db.entries = db.entries.filter(x => x.cid !== id);
      ui.cust = null; save(); render(); }, true); break; }
    case 'del-entry': openConfirm(t('delEntryQ'), t('yesDelete'), () => { db.entries = db.entries.filter(x => x.id !== id); save(); render(); }, true); break;
    case 'od': ui.od = Number(id); render(); break;
    case 'lang': db.settings.lang = id; save(); render(); break;
    case 'pin-set': startSetPin(); break;
    case 'pin-change': verifyPin(startSetPin); break;
    case 'pin-remove': verifyPin(() => { db.settings.pin = false; save(); sessionKey = null; pinSalt = ''; render(); toast(t('pinRemoved')); }); break;
    case 'lock-now': lockNow(); break;
    case 'backup': backup(); break;
    case 'restore': $('#st-file').click(); break;
    case 'erase': openConfirm(t('eraseQ'), t('eraseBtn'), () => { db = blank(); sessionKey = null; pinSalt = ''; save(); render(); toast(t('erased')); }, true); break;
    case 'sample': loadSample(); break;
    case 'rm-sample': {
      const ids = new Set(db.customers.filter(c => c.sample).map(c => c.id));
      db.customers = db.customers.filter(c => !ids.has(c.id)); db.entries = db.entries.filter(e => !ids.has(e.cid));
      save(); render(); break;
    }
  }
});
document.addEventListener('input', e => {
  const id = e.target.id;
  if (id === 'q') { ui.q = e.target.value; renderList(); }
  else if (id === 'es-q' && es) { es.q = e.target.value; fillSugg(); }
  else if (id === 'es-amt' && es) es.amt = e.target.value;
  else if (id === 'es-note' && es) es.note = e.target.value;
});
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset && el.dataset.set) {
    const k = el.dataset.set;
    if (k === 'shop') db.settings.shop = el.value.trim();
    else db.settings[k] = Math.max(0, Math.round(parseFloat(el.value) || 0));
    save(); renderTop(); renderTabs(); toast(t('saved'));
  } else if (el.id === 'st-file' && el.files && el.files[0]) {
    readBackup(el.files[0], inc => openConfirm(t('restoreQ', {n:inc.customers.length}), t('restore'), () => applyRestore(inc), true));
    el.value = '';
  } else if (el.id === 'lock-file' && el.files && el.files[0]) {
    const file = el.files[0];
    readBackup(file, inc => {
      // The lock screen's own dialogs are covered by #sheet's lower z-index,
      // so this uses a native confirm() — it renders above everything and
      // still requires an explicit yes before this unauthenticated restore
      // (the only account-free recovery path there is) wipes the device.
      if (!window.confirm(t('restoreQ', {n:inc.customers.length}))) { el.value = ''; return; }
      applyRestore(inc); hidePad();
    });
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && es && (e.target.id === 'es-amt' || e.target.id === 'es-note')) { e.preventDefault(); saveEntry(false); }
});

function attachSW(){
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }
}

async function init(){
  try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); } catch (e) { storageOk = false; }
  let raw = null;
  try { raw = localStorage.getItem(KEY); } catch (e) { storageOk = false; }
  let parsed = null;
  if (raw) { try { parsed = JSON.parse(raw); } catch (e) { parsed = null; } }

  if (parsed && parsed.enc === 1) {
    // Current (encrypted) format: nothing readable until the right PIN is entered.
    db = blank(); db.settings.pin = true;
    restoreNav(); render();
    lockNow();
    attachSW();
    return;
  }

  if (parsed && typeof parsed.settings === 'object' && parsed.settings && typeof parsed.settings.pin === 'string' && parsed.settings.pin) {
    // One-time migration: an older version of this app stored data as plain
    // JSON even with a PIN set (the PIN only hid the screen). Verify the PIN
    // against that legacy hash, then switch this install over to real
    // encryption from now on, using the same PIN.
    const legacyHash = parsed.settings.pin;
    db = {v:1, customers:Array.isArray(parsed.customers) ? parsed.customers : [], entries:Array.isArray(parsed.entries) ? parsed.entries : [], settings:Object.assign(blank().settings, parsed.settings)};
    db.settings.pin = true;
    restoreNav(); render();
    locked = true; scrubUI();
    showPad({title:t('enterPin'), forgot:true, onDone: pin => guardedAttempt(async () => {
      if (legacyHashPin(pin) !== legacyHash) throw new Error('wrong-legacy-pin');
      if (!hasCrypto()) throw new Error('no-crypto'); // extremely old/insecure browser: cannot encrypt, refuse to unlock
      pinSalt = b64(crypto.getRandomValues(new Uint8Array(16)));
      sessionKey = await deriveKey(pin, pinSalt);
      locked = false;
      save(); hidePad(); render();
    })});
    attachSW();
    return;
  }

  // Plain, unencrypted data with no PIN (the normal no-PIN case).
  db = parsed
    ? {v:1, customers:Array.isArray(parsed.customers) ? parsed.customers : [], entries:Array.isArray(parsed.entries) ? parsed.entries : [], settings:Object.assign(blank().settings, parsed.settings || {})}
    : blank();
  if (typeof db.settings.pin !== 'boolean') db.settings.pin = false;
  restoreNav(); render();
  attachSW();
}
init();
