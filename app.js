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
const initial = s => ([...String(s || '').trim()][0] || '?').toUpperCase();
const hue = s => { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) % 360; return h; };
const buzz = ms => { try { if (navigator.vibrate) navigator.vibrate(ms || 8); } catch (e) {} };
const ICONS = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.4c2.2.7 3.5 2.6 3.5 5.6"/>',
  sliders:'<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  arrowUp:'<path d="M12 20V6M6 11l6-6 6 6"/>',
  arrowDown:'<path d="M12 4v14M6 13l6 6 6-6"/>',
  trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  shop:'<path d="M4 9l1.5-5h13L20 9v11H4z"/><path d="M4 9c0 1.7 1.3 3 2.7 3S9.3 10.7 9.3 9c0 1.7 1.3 3 2.7 3s2.7-1.3 2.7-3c0 1.7 1.3 3 2.7 3S20 10.7 20 9"/>',
  warn:'<path d="M12 4 3 20h18z"/><path d="M12 10v5M12 18v.5"/>',
  chev:'<path d="m6 9 6 6 6-6"/>'
};
const ic = n => '<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[n] || '') + '</svg>';
function greet(){ const h = new Date().getHours(); return t(h < 12 ? 'greetAm' : h < 17 ? 'greetPm' : 'greetEve'); }

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
  remindHead:'Hello {name}, this is {shop}. Your balance is {amt}.', remindHeadNoShop:'Hello {name}, your balance is {amt}.',
  remindTail:'Please pay when you can. Thank you.', remindMore:'and {n} more earlier', remindOwed:'taken on',
  shopNudge:'Add your shop name so reminders say who they are from.', openSettings:'Settings', preview:'Reminder message',
  ledger:'Ledger', colDate:'Date', colDetails:'Details', colAmount:'Amount / Balance', bal:'Bal', noEntries:'No entries yet.',
  delEntryQ:'Delete this entry? The balance will be recalculated.', delCustQ:'Delete {name} and all their entries?', yesDelete:'Yes, delete',
  settings:'Settings', shopName:'Shop name', shopPh:'e.g. Mama Joy Shop', language:'Language',
  limitsTitle:'Default limits', limitsHint:'Used for customers without their own limit. Enter 0 for no limit. You can still add credit past a limit after a warning.',
  pinTitle:'PIN lock', pinHint:'Locks the app and encrypts your records on this phone. If you forget the PIN, only a backup file can restore them.',
  tooMany:'Too many wrong tries. Wait {s} seconds.', pinWorking:'Checking…', noCrypto:'This browser cannot encrypt a PIN. Update your browser to use PIN lock.',
  badAmount:'Use numbers only, for example 250 or 250.50 (up to 10,000,000).', updReady:'A new version is ready.', updBtn:'Update',
  emailAddr:'Your email address', emailAddrPh:'you@example.com', badEmail:'That email address does not look right.', emailYours:'your email',
  storeOn:'Your data is protected from automatic clean-up by the browser.', storeOff:'The browser may clear this data if the phone runs low on space. Install the app to your home screen and back up often.',
  setPin:'Set PIN', changePin:'Change PIN', removePin:'Remove PIN', lockNow:'Lock now',
  enterPin:'Enter PIN', wrongPin:'Wrong PIN, try again.', pinNew:'Choose a 4-digit PIN', pinConfirm:'Enter it again', pinMismatch:'PINs did not match. Try again.', pinSet:'PIN set.', pinRemoved:'PIN removed.',
  backupTitle:'Backup', backupNow:'Back up now', restore:'Restore from file', lastBackup:'Last backup: {when}', never:'never', daysAgo:'{n} days ago', yesterday:'yesterday',
  backupHint:'Send the backup file to your WhatsApp or save it to a memory card. To use it on a new phone, open this app there and restore.',
  nudgeBackup:'Back up your records. Last backup: {when}.', restoreQ:'Replace everything on this phone with this backup ({n} customers)?',
  restored:'Backup restored.', badFile:'This file is not a Duka Ledger backup.', backupDone:'Backup saved.',
  forgotPin:'Forgot PIN?', forgotTitle:'Reset with a backup', forgotBody:'Restoring a backup file replaces everything on this phone and removes the PIN. Without a backup file, the PIN cannot be reset.', chooseBackup:'Choose backup file',
 
  storageWarn:'This browser cannot save data. Back up before you close the app.',
  overdueHint:'Customers whose oldest unpaid credit is {n} days old or more.', saved:'Saved.', daysPlus:'{n}+ days',
  copy:'Copy', copied:'Message copied.', smsHint:'If Messages did not open, tap Copy and paste the message there.',
  greetAm:'Good morning', greetPm:'Good afternoon', greetEve:'Good evening',
  paidToday:'Collected today: {amt}', recent:'Recent activity',
  sort:'Sort', sortAmt:'Most owed', sortDays:'Oldest debt', sortName:'A–Z', sortRecent:'Recent',
  manage:'Manage', done:'Done',
  setShop:'Shop', setData:'Backup & restore', setEmail:'Email backup', setDanger:'Danger zone',
  on:'On', off:'Off', custCount:'{n} customers',
  lastBackupL:'Last backup', covers:'Records covered', noRecords:'No records yet',
  emailTo:'Sends to', emailAuto:'Automatic', emailNeedsKey:'Needs key', emailKey:'Email access key', emailKeyPh:'Paste your key here',
  emailKeyHint:'Optional, for automatic backups. Get a free key at web3forms.com using your own email address (the same one as above) and paste it here once. After that, every backup is emailed to you automatically with the shop name and dates. The backup passes through web3forms.com on its way to you. Without a key, Back up now opens your email app instead.',
  emailSending:'Sending backup to email…', emailSent:'Backup emailed to {to}.', emailQueued:'No internet. The email will send when you are back online.', emailRejected:'The email was not accepted. Check the access key.',
  dzCust:'This also deletes all their entries.', delCustBtn:'Delete customer', payFull:'Full {amt}'
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
  remindHead:'Habari {name}, huyu ni {shop}. Deni lako ni {amt}.', remindHeadNoShop:'Habari {name}, deni lako ni {amt}.',
  remindTail:'Tafadhali lipa unapoweza. Asante.', remindMore:'na {n} zaidi za zamani', remindOwed:'tarehe',
  shopNudge:'Weka jina la duka lako ili ukumbusho uonyeshe unatoka kwa nani.', openSettings:'Mipangilio', preview:'Ujumbe wa ukumbusho',
  ledger:'Historia', colDate:'Tarehe', colDetails:'Maelezo', colAmount:'Kiasi / Salio', bal:'Salio', noEntries:'Bado hakuna rekodi.',
  delEntryQ:'Futa rekodi hii? Salio litahesabiwa upya.', delCustQ:'Futa {name} na rekodi zake zote?', yesDelete:'Ndiyo, futa',
  settings:'Mipangilio', shopName:'Jina la duka', shopPh:'mf. Duka la Mama Joy', language:'Lugha',
  limitsTitle:'Vikomo vya kawaida', limitsHint:'Hutumika kwa wateja wasio na kikomo chao. Weka 0 kama hakuna kikomo. Bado unaweza kuongeza deni baada ya onyo.',
  pinTitle:'Nambari ya siri (PIN)', pinHint:'Hufunga programu na kusimba rekodi zako kwenye simu hii. Ukisahau PIN, ni faili ya nakala tu inayoweza kuzirudisha.',
  tooMany:'Majaribio mengi yasiyo sahihi. Subiri sekunde {s}.', pinWorking:'Inakagua…', noCrypto:'Kivinjari hiki hakiwezi kusimba PIN. Kisasishe ili utumie PIN.',
  badAmount:'Tumia nambari tu, mfano 250 au 250.50 (hadi 10,000,000).', updReady:'Toleo jipya liko tayari.', updBtn:'Sasisha',
  emailAddr:'Barua pepe yako', emailAddrPh:'wewe@mfano.com', badEmail:'Barua pepe hiyo haionekani sahihi.', emailYours:'barua pepe yako',
  storeOn:'Data yako imelindwa dhidi ya kufutwa kiotomatiki na kivinjari.', storeOff:'Kivinjari kinaweza kufuta data hii simu ikiishiwa nafasi. Weka programu kwenye skrini ya mwanzo na uhifadhi nakala mara kwa mara.',
  setPin:'Weka PIN', changePin:'Badilisha PIN', removePin:'Ondoa PIN', lockNow:'Funga sasa',
  enterPin:'Weka PIN', wrongPin:'PIN si sahihi, jaribu tena.', pinNew:'Chagua PIN ya tarakimu 4', pinConfirm:'Iweke tena', pinMismatch:'PIN hazilingani. Jaribu tena.', pinSet:'PIN imewekwa.', pinRemoved:'PIN imeondolewa.',
  backupTitle:'Nakala ya hifadhi', backupNow:'Hifadhi nakala sasa', restore:'Rudisha kutoka faili', lastBackup:'Nakala ya mwisho: {when}', never:'haijawahi', daysAgo:'siku {n} zilizopita', yesterday:'jana',
  backupHint:'Tuma faili ya nakala kwenye WhatsApp yako au iweke kwenye kadi ya kumbukumbu. Ili kuitumia kwenye simu mpya, fungua programu hii huko kisha rudisha.',
  nudgeBackup:'Hifadhi nakala ya rekodi zako. Nakala ya mwisho: {when}.', restoreQ:'Badilisha kila kitu kwenye simu hii na nakala hii (wateja {n})?',
  restored:'Nakala imerudishwa.', badFile:'Faili hii si nakala ya Duka Ledger.', backupDone:'Nakala imehifadhiwa.',
  forgotPin:'Umesahau PIN?', forgotTitle:'Rudisha kwa nakala', forgotBody:'Kurudisha faili ya nakala kunabadilisha kila kitu kwenye simu hii na kuondoa PIN. Bila faili ya nakala, PIN haiwezi kuwekwa upya.', chooseBackup:'Chagua faili ya nakala',
 
  storageWarn:'Kivinjari hiki hakiwezi kuhifadhi data. Hifadhi nakala kabla ya kufunga.',
  overdueHint:'Wateja ambao deni lao la zamani zaidi lina siku {n} au zaidi.', saved:'Imehifadhiwa.', daysPlus:'siku {n}+',
  copy:'Nakili', copied:'Ujumbe umenakiliwa.', smsHint:'Kama Messages haikufunguka, bonyeza Nakili kisha ubandike ujumbe.',
  greetAm:'Habari za asubuhi', greetPm:'Habari za mchana', greetEve:'Habari za jioni',
  paidToday:'Zilizolipwa leo: {amt}', recent:'Shughuli za hivi karibuni',
  sort:'Panga', sortAmt:'Deni kubwa', sortDays:'Deni kongwe', sortName:'A–Z', sortRecent:'Hivi karibuni',
  manage:'Simamia', done:'Maliza',
  setShop:'Duka', setData:'Nakala & kurudisha', setEmail:'Nakala kwa barua pepe', setDanger:'Eneo la hatari',
  on:'Imewashwa', off:'Imezimwa', custCount:'wateja {n}',
  lastBackupL:'Nakala ya mwisho', covers:'Rekodi zilizojumuishwa', noRecords:'Bado hakuna rekodi',
  emailTo:'Inatumwa kwa', emailAuto:'Kiotomatiki', emailNeedsKey:'Inahitaji ufunguo', emailKey:'Ufunguo wa barua pepe', emailKeyPh:'Bandika ufunguo hapa',
  emailKeyHint:'Hiari, kwa nakala za kiotomatiki. Pata ufunguo bure kwenye web3forms.com ukitumia barua pepe yako mwenyewe (ile ile ya hapo juu) kisha ubandike hapa mara moja. Baada ya hapo kila nakala hutumwa kwako kiotomatiki ikiwa na jina la duka na tarehe. Nakala hupitia web3forms.com njiani kuja kwako. Bila ufunguo, Hifadhi nakala sasa hufungua programu yako ya barua pepe.',
  emailSending:'Inatuma nakala kwa barua pepe…', emailSent:'Nakala imetumwa kwa {to}.', emailQueued:'Hakuna intaneti. Barua pepe itatumwa ukiwa mtandaoni tena.', emailRejected:'Barua pepe haikukubaliwa. Angalia ufunguo.',
  dzCust:'Hii pia hufuta rekodi zake zote.', delCustBtn:'Futa mteja', payFull:'Yote {amt}'
}};

/* ---------- state & storage ---------- */
let storageOk = true;
function blank(){
  return {v:1, customers:[], entries:[], settings:{lang:'en', shop:'', defAmt:2000, defDays:14, pin:'', lastBackup:0, mailKey:'', mailPending:false, backupTo:''}};
}
let db = blank();
function t(k, p){
  let s = (L[db.settings.lang] || L.en)[k];
  if (s == null) s = L.en[k];
  if (s == null) s = k;
  if (p) for (const x in p) s = s.split('{' + x + '}').join(p[x]);
  return s;
}
function load(){
  try { localStorage.setItem('__t', '1'); localStorage.removeItem('__t'); } catch (e) { storageOk = false; }
  try {
    const s = localStorage.getItem(KEY);
    if (s) {
      const d = JSON.parse(s);
      if (d && d.enc === 1 && d.ct && d.iv && d.salt) {          // PIN is on: the stored copy is encrypted, so wait for the PIN
        encRec = d; locked = true;
        const b = blank(); b.settings.lang = d.lang === 'sw' ? 'sw' : 'en'; b.settings.pin = 'enc'; return b;
      }
      return normDb(d);
    }
  } catch (e) { storageOk = false; }
  return blank();
}
function normDb(d){
  const b = blank();
  return {v:1, customers:Array.isArray(d.customers)?d.customers:[], entries:Array.isArray(d.entries)?d.entries:[], settings:Object.assign(b.settings, d.settings || {})};
}
function save(){
  if (locked) return;                                  // never overwrite the encrypted copy while it is still locked
  if (db.settings.pin && sessionKey) { encSave(); return; }
  try { localStorage.setItem(KEY, JSON.stringify(db)); storageOk = true; } catch (e) { storageOk = false; }
  if (!persistTried) askPersist();
}

/* ---------- PIN encryption (AES-GCM, key from PBKDF2) ---------- */
const ATT_KEY = 'duka-ledger-att';
const ENC_ITER = 200000;
let locked = false, encRec = null, sessionKey = null, sessionSalt = '', pendingInc = null;
let encBusy = false, encDirty = false, persistTried = false, storagePersisted = false;
const hasCrypto = () => !!(window.crypto && crypto.subtle);
const b64 = u8 => { let x = ''; for (let i = 0; i < u8.length; i += 8192) x += String.fromCharCode.apply(null, u8.subarray(i, i + 8192)); return btoa(x); };
const unb64 = x => Uint8Array.from(atob(x), c => c.charCodeAt(0));
async function deriveKey(pin, saltB64){
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(String(pin)), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2', salt:unb64(saltB64), iterations:ENC_ITER, hash:'SHA-256'}, base, {name:'AES-GCM', length:256}, false, ['encrypt', 'decrypt']);
}
async function encryptDb(key, saltB64){
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, new TextEncoder().encode(JSON.stringify(db)));
  return {enc:1, v:2, salt:saltB64, iv:b64(iv), ct:b64(new Uint8Array(ct)), lang:db.settings.lang === 'sw' ? 'sw' : 'en'};
}
async function encSave(){
  encDirty = true;
  if (encBusy) return;
  encBusy = true;
  try {
    while (encDirty) {
      encDirty = false;
      const k = sessionKey, sl = sessionSalt;
      if (!k) break;
      const rec = await encryptDb(k, sl);
      if (k !== sessionKey) break;                     // PIN was changed or removed meanwhile; do not overwrite newer data
      try { localStorage.setItem(KEY, JSON.stringify(rec)); encRec = rec; storageOk = true; } catch (e) { storageOk = false; }
    }
  } catch (e) { storageOk = false; }
  finally { encBusy = false; }
}
function askPersist(){
  persistTried = true;
  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().then(ok => { storagePersisted = !!ok; }).catch(() => {});
  } catch (e) {}
}
function getAtt(){ try { const a = JSON.parse(localStorage.getItem(ATT_KEY) || '{}'); return {n:a.n | 0, until:Number(a.until) || 0}; } catch (e) { return {n:0, until:0}; } }
function setAtt(a){ try { if (a.n) localStorage.setItem(ATT_KEY, JSON.stringify(a)); else localStorage.removeItem(ATT_KEY); } catch (e) {} }
function failAtt(a, now){                              // 5 wrong tries, then waits of 30s, 1m, 2m ... up to 1 hour
  const n = a.n + 1, wait = n >= 5 ? Math.min(30 * Math.pow(2, n - 5), 3600) : 0;
  setAtt({n, until:wait ? now + wait * 1000 : 0});
  return {msg:wait ? t('tooMany', {s:wait}) : t('wrongPin')};
}
const isLegacy = () => !!db.settings.pin && db.settings.pin !== 'enc';   // PIN made by the older version (readable data, simple hash)
async function verifyPinValue(p){
  const a = getAtt(), now = Date.now();
  if (a.until > now) return {msg:t('tooMany', {s:Math.ceil((a.until - now) / 1000)})};
  if (isLegacy()) {
    if (hashPin(p) === db.settings.pin) { setAtt({n:0, until:0}); return {ok:true}; }
    return failAtt(a, now);
  }
  let rec = encRec;
  if (!rec) { try { rec = JSON.parse(localStorage.getItem(KEY)); } catch (e) {} }
  try {
    const key = await deriveKey(p, rec.salt);
    const pt = await crypto.subtle.decrypt({name:'AES-GCM', iv:unb64(rec.iv)}, key, unb64(rec.ct));
    setAtt({n:0, until:0});
    return {ok:true, key, salt:rec.salt, data:JSON.parse(new TextDecoder().decode(pt))};
  } catch (e) { return failAtt(a, now); }
}
async function enableEncryption(pin){
  const salt = b64(crypto.getRandomValues(new Uint8Array(16)));
  const key = await deriveKey(pin, salt);
  sessionKey = key; sessionSalt = salt; db.settings.pin = 'enc';
  await encSave();
}
async function unlockApp(p){
  const r = await verifyPinValue(p);
  if (!r.ok) return r.msg;
  if (isLegacy()) { if (hasCrypto()) await enableEncryption(p); }      // quietly upgrade an old PIN to real encryption
  else if (locked) { db = normDb(r.data); sessionKey = r.key; sessionSalt = r.salt; locked = false; render(); retryMail(); }
  hidePad();
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
  const open = [];   // unpaid credits, oldest first, with what is still owed on each
  if (bal > 0) {
    let p = paid;
    for (const e of es) {
      if (e.type !== 'credit') continue;
      if (p >= e.amt - 0.005) { p -= e.amt; continue; }
      const left = r2(e.amt - p); p = 0;
      if (!oldest) oldest = e.ts;
      open.push({ts:e.ts, amt:left, note:e.note || ''});
    }
  }
  const days = oldest ? Math.max(0, Math.floor((Date.now() - oldest) / DAY)) : 0;
  const limA = c.limitAmt > 0 ? c.limitAmt : db.settings.defAmt;
  const limD = c.limitDays > 0 ? c.limitDays : db.settings.defDays;
  return {bal, days, oldest, lastPay, limA, limD, es, open, last: es.length ? es[es.length - 1].ts : (c.created || 0),
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
/* Reminder text: shop name, total owed, then each unpaid credit with the date and time it was taken. */
function remindText(c, s){
  const shop = db.settings.shop;
  const lines = [t(shop ? 'remindHead' : 'remindHeadNoShop', {name:c.name, shop, amt:money(s.bal)}), ''];
  const MAX = 6, shown = s.open.slice(0, MAX);
  for (const o of shown) {
    const d = new Date(o.ts);
    const when = d.toLocaleDateString(locale(), {day:'numeric', month:'short', year:'numeric'}) + ', ' +
                 d.toLocaleTimeString(locale(), {hour:'numeric', minute:'2-digit'});
    lines.push('- ' + when + (o.note ? ' (' + o.note + ')' : '') + ': ' + money(o.amt));
  }
  if (s.open.length > MAX) lines.push('- ' + t('remindMore', {n:s.open.length - MAX}));
  lines.push('', t('remindTail'));
  return lines.join('\n');
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
               '<button class="btn sm" data-act="sms" data-id="' + c.id + '">SMS</button>' : '') +
    '<button class="btn sm ghost" data-act="copy-msg" data-id="' + c.id + '">' + esc(t('copy')) + '</button>';
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
const newUi = () => ({tab:'owes', q:'', od:7, cust:null, sort:{owes:'amt', overdue:'days', customers:'name'}, edit:false, animHero:true, acc:''});
let ui = newUi();
let es = null;            // entry sheet state
let pendingConfirm = null;

/* ---------- navigation (phone back button + in-app Back) ----------
   Every screen change (tab, customer) and every open sheet is one history entry,
   so the phone's back button steps back through them instead of leaving the app. */
let navDepth = 0, sheetPushed = false, ignorePop = 0;
function curState(){ return {tab:ui.tab, cust:ui.cust, q:ui.q}; }
function navTo(tab, cust){
  if (tab === ui.tab && cust === ui.cust) { window.scrollTo(0, 0); return; }
  try { history.replaceState(Object.assign(curState(), {sy:window.scrollY}), ''); } catch (e) {}
  ui.tab = tab; ui.cust = cust; ui.q = ''; ui.edit = false; ui.animHero = (tab === 'owes' && !cust);
  try { history.pushState(curState(), ''); navDepth++; } catch (e) {}
  render(); window.scrollTo(0, 0); animView();
}
function animView(){ const v = $('#view'); v.classList.remove('view-in'); void v.offsetWidth; v.classList.add('view-in'); }
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
  ui.tab = st.tab || 'owes'; ui.cust = st.cust || null; ui.q = st.q || ''; ui.edit = false; ui.animHero = (ui.tab === 'owes' && !ui.cust);
  render(); window.scrollTo(0, st.sy || 0); animView();
});

function toast(msg, ms){
  const el = $('#toast');
  el.textContent = msg; el.hidden = false;
  el.classList.remove('toast-in'); void el.offsetWidth; el.classList.add('toast-in');
  clearTimeout(toast.h);
  toast.h = setTimeout(() => { el.hidden = true; }, ms || 2800);
}

/* ---------- rendering ---------- */
function render(){
  SA = null;
  document.documentElement.lang = db.settings.lang;
  renderTop(); renderView(); renderTabs(); heroCount();
  const fab = $('#fab');
  fab.innerHTML = ic('plus') + '<span>' + esc(t('newEntry')) + '</span>';
  fab.hidden = !!ui.cust || ui.tab === 'settings';
}
function renderTop(){
  const s = db.settings, nm = s.shop || t('app');
  $('#top').innerHTML =
    '<div class="top-id"><div class="avatar">' + esc(initial(nm)) + '</div><div class="brand"><small>' + esc(greet()) + '</small>' + esc(nm) + '</div></div>' +
    (s.pin ? '<button class="btn sm ghost" data-act="lock-now">' + ic('lock') + esc(t('lockNow')) + '</button>' : '');
}
function renderTabs(){
  const n = allStats().filter(x => x.s.bal > 0 && x.s.days >= 7).length;
  const tabs = [['owes','tabOwes','home'],['overdue','tabOverdue','clock'],['customers','tabCustomers','users'],['settings','tabSettings','sliders']];
  $('#tabs-in').innerHTML = tabs.map(([k, l, i]) =>
    '<button class="tab" data-act="tab" data-id="' + k + '"' + (ui.tab === k ? ' aria-current="page"' : '') + '><span class="ti">' + ic(i) +
    (k === 'overdue' && n ? '<span class="n">' + n + '</span>' : '') + '</span><span>' + esc(t(l)) + '</span></button>').join('');
}
/* the big total counts up once each time the home screen is opened */
function heroCount(){
  const el = $('#hero-total');
  if (!el || !ui.animHero) return;
  ui.animHero = false;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const to = Number(el.dataset.v) || 0;
  if (!to) return;
  const t0 = performance.now(), dur = 650;
  (function step(now){
    if (!el.isConnected) return;
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = p < 1 ? money(Math.round(to * e)) : money(to);
    if (p < 1) requestAnimationFrame(step);
  })(t0);
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
  if (!db.settings.shop && db.customers.length && !db.customers.some(c => c.sample))
    h += '<div class="banner"><span>' + esc(t('shopNudge')) + '</span><button class="btn sm" data-act="tab" data-id="settings">' + esc(t('openSettings')) + '</button></div>';
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
  return '<div class="row"><button class="row-main" data-act="open" data-id="' + c.id + '"><span class="av" style="--h:' + hue(c.name) + '">' + esc(initial(c.name)) + '</span><span class="who"><b>' + esc(c.name) + '</b><small>' +
    esc(c.phone || '') + '</small>' + tags.join('') + '</span><span class="rt">' + right + '</span></button>' + act + '</div>';
}
function listFor(kind){
  const q = ui.q.trim();
  let items = allStats().filter(x => matches(x.c, q));
  let none;
  if (kind === 'owes') { items = items.filter(x => x.s.bal > 0); none = t('noOwes'); }
  else if (kind === 'overdue') { items = items.filter(x => x.s.bal > 0 && x.s.days >= ui.od); none = t('noOverdue', {n:ui.od}); }
  else { none = t('noMatch'); }
  items = items.slice().sort(SORTS[ui.sort[kind]] || SORTS.name);
  if (q && !items.length) none = t('noMatch');
  if (!items.length) return '<div class="book"><div class="none">' + esc(none) + '</div></div>';
  return '<div class="book">' + items.map(x => rowHtml(x.c, x.s, kind === 'overdue')).join('') + '</div>';
}
const SORTS = {
  amt:(a, b) => b.s.bal - a.s.bal || a.c.name.localeCompare(b.c.name),
  days:(a, b) => b.s.days - a.s.days || b.s.bal - a.s.bal,
  name:(a, b) => a.c.name.localeCompare(b.c.name),
  recent:(a, b) => b.s.last - a.s.last
};
function chipsHtml(){
  const cur = ui.sort[ui.tab];
  return '<span class="chips-l">' + esc(t('sort')) + '</span>' +
    [['amt','sortAmt'],['days','sortDays'],['name','sortName'],['recent','sortRecent']].map(([k, l]) =>
      '<button class="chip" data-act="sort" data-id="' + k + '" aria-pressed="' + (cur === k) + '">' + esc(t(l)) + '</button>').join('');
}
function agoText(ts){
  const d = new Date(ts), n = new Date();
  if (d.toDateString() === n.toDateString()) return d.toLocaleTimeString(locale(), {hour:'numeric', minute:'2-digit'});
  return d.toLocaleDateString(locale(), {day:'numeric', month:'short'});
}
function recentHtml(){
  const list = db.entries.slice().sort((a, b) => b.ts - a.ts).slice(0, 5);
  if (!list.length) return '';
  const rows = list.map(e => {
    const c = cust(e.cid);
    if (!c) return '';
    const isC = e.type === 'credit';
    return '<div class="row"><button class="row-main" data-act="open" data-id="' + c.id + '"><span class="av" style="--h:' + hue(c.name) + '">' + esc(initial(c.name)) + '</span>' +
      '<span class="who"><b>' + esc(c.name) + '</b><small>' + esc(t(isC ? 'credit' : 'payment') + (e.note ? ' · ' + e.note : '')) + '</small></span>' +
      '<span class="rt"><span class="amt ' + (isC ? '' : 'good') + '">' + (isC ? '+' : '−') + nf.format(e.amt) + '</span><small>' + esc(agoText(e.ts)) + '</small></span></button></div>';
  }).join('');
  return '<div class="sec"><h3>' + esc(t('recent')) + '</h3></div><div class="book">' + rows + '</div>';
}
function owesView(){
  const owing = allStats().filter(x => x.s.bal > 0);
  const total = r2(owing.reduce((a, x) => a + x.s.bal, 0));
  const od = owing.filter(x => x.s.days >= 7).length;
  const d0 = new Date(); d0.setHours(0, 0, 0, 0);
  const today = r2(db.entries.reduce((a, e) => a + (e.type === 'payment' && e.ts >= d0.getTime() ? e.amt : 0), 0));
  let h = banners();
  h += '<section class="hero"><div class="label">' + esc(t('totalOwed')) + '</div><div class="big" id="hero-total" data-v="' + total + '">' + money(total) + '</div><div class="hero-chips">' +
       '<span class="hchip">' + esc(t('owingCount', {n:owing.length})) + '</span>' +
       (od ? '<span class="hchip alert">' + esc(t('overdueCount', {n:od})) + '</span>' : '') +
       (today > 0 ? '<span class="hchip ok">' + esc(t('paidToday', {amt:money(today)})) + '</span>' : '') + '</div></section>';
  if (!db.customers.length) return h + emptyState();
  h += '<div class="quick"><button class="qa" data-act="quick" data-type="credit"><span class="qi">' + ic('arrowUp') + '</span>' + esc(t('gaveCredit')) + '</button>' +
       '<button class="qa pay" data-act="quick" data-type="payment"><span class="qi">' + ic('arrowDown') + '</span>' + esc(t('gotPayment')) + '</button></div>';
  h += '<input id="q" class="inp" type="search" autocomplete="off" placeholder="' + esc(t('searchPh')) + '" value="' + esc(ui.q) + '">';
  h += '<div class="chips" id="chips">' + chipsHtml() + '</div>';
  return h + '<div id="list">' + listFor('owes') + '</div>' + recentHtml();
}
function overdueView(){
  const seg = [7, 14, 30].map(n => '<button data-act="od" data-id="' + n + '" aria-pressed="' + (ui.od === n) + '">' + esc(t('daysPlus', {n})) + '</button>').join('');
  return '<h2 class="h">' + esc(t('tabOverdue')) + '</h2><div class="seg">' + seg + '</div><p class="hint">' + esc(t('overdueHint', {n:ui.od})) + '</p>' +
    '<div class="chips" id="chips">' + chipsHtml() + '</div><div id="list">' + listFor('overdue') + '</div>';
}
function customersView(){
  let h = '<div class="acts" style="justify-content:space-between;margin:12px 0"><h2 class="h" style="margin:0">' + esc(t('tabCustomers')) + '</h2><button class="btn primary sm" data-act="add-cust">' + ic('plus') + esc(t('newCustomer')) + '</button></div>';
  if (!db.customers.length) return h + emptyState();
  h += '<input id="q" class="inp" type="search" autocomplete="off" placeholder="' + esc(t('searchPh')) + '" value="' + esc(ui.q) + '">';
  h += '<div class="chips" id="chips">' + chipsHtml() + '</div>';
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
    '<section class="head"><div class="head-id"><span class="av lg-av" style="--h:' + hue(c.name) + '">' + esc(initial(c.name)) + '</span><div><h2>' + esc(c.name) + '</h2><div class="ph">' + esc(c.phone || '') + '</div></div></div>' +
    '<div class="big">' + esc(balTxt) + '</div> ' + tags.join('') +
    '<div class="lim">' + esc(lim.length ? lim.join(' · ') : t('noLimit')) + (s.bal > 0 ? ' · ' + esc(t('oldest', {d:dl(s.days)})) : '') + '</div>' +
    '<div class="two-btn"><button class="btn primary" data-act="entry-for" data-id="' + c.id + '" data-type="credit">' + esc(t('gaveCredit')) + '</button>' +
    '<button class="btn pay primary" data-act="entry-for" data-id="' + c.id + '" data-type="payment">' + esc(t('gotPayment')) + '</button></div>' +
    '<div class="acts">';
  h += remindBtns(c, s);
  h += '<button class="btn sm ghost" data-act="edit-cust" data-id="' + c.id + '">' + esc(t('edit')) + '</button></div>';
  if (s.bal > 0 && !lk) h += '<p class="hint">' + esc(t('noPhone')) + '</p>';
  if (s.bal > 0) h += '<div class="lbl">' + esc(t('preview')) + '</div><div class="preview">' + esc(remindText(c, s)) + '</div>';
  h += '</section><div class="sec"><h3>' + esc(t('ledger')) + '</h3>' + (s.es.length ? '<button class="btn sm ' + (ui.edit ? 'primary' : 'ghost') + '" data-act="toggle-edit">' + esc(t(ui.edit ? 'done' : 'manage')) + '</button>' : '') + '</div>';
  if (!s.es.length) return h + '<div class="book"><div class="none">' + esc(t('noEntries')) + '</div></div>';
  let run = 0;
  const rows = s.es.map(e => { run = r2(run + (e.type === 'credit' ? e.amt : -e.amt)); return {e, run}; }).reverse();
  h += '<div class="book' + (ui.edit ? ' editing' : '') + '"><div class="led-h"><span>' + esc(t('colDate')) + '</span><span>' + esc(t('colDetails')) + '</span><span>' + esc(t('colAmount')) + '</span>' + (ui.edit ? '<span></span>' : '') + '</div>';
  for (const {e, run:r} of rows) {
    const d = new Date(e.ts);
    const yr = d.getFullYear() !== new Date().getFullYear() ? ' ' + String(d.getFullYear()).slice(2) : '';
    const isC = e.type === 'credit';
    h += '<div class="led"><div class="d"><b>' + d.getDate() + '</b><span>' + esc(d.toLocaleDateString(locale(), {month:'short'}) + yr) + '</span></div>' +
      '<div class="m"><div class="what">' + esc(e.note || t(isC ? 'credit' : 'payment')) + '</div>' +
      (e.note ? '<div class="ty">' + esc(t(isC ? 'credit' : 'payment')) + '</div>' : '') +
      '</div>' +
      '<div class="a ' + (isC ? 'cr' : 'pm') + '"><b>' + (isC ? '+' : '−') + nf.format(e.amt) + '</b><span>' + esc(t('bal')) + ' ' + nf.format(r) + '</span></div>' +
      (ui.edit ? '<div class="x"><button class="ico" data-act="del-entry" data-id="' + e.id + '" aria-label="' + esc(t('del')) + '">' + ic('trash') + '</button></div>' : '') + '</div>';
  }
  return h + '</div>';
}

function mailPill(){ const on = !!db.settings.mailKey; return '<span id="mail-pill" class="pill ' + (on ? 'on' : 'warn') + '">' + esc(t(on ? 'emailAuto' : 'emailNeedsKey')) + '</span>'; }
function refreshMailPill(){ const el = $('#mail-pill'); if (el) el.outerHTML = mailPill(); }
function syncProf(){
  const nm = db.settings.shop || t('app');
  const pb = $('.prof b'), pa = $('.prof .avatar');
  if (pb) pb.textContent = nm;
  if (pa) pa.textContent = initial(nm);
}
function accSummary(k){
  const s = db.settings;
  if (k === 'shop') return (s.shop || t('app')) + ' · ' + (s.lang === 'sw' ? 'Kiswahili' : 'English');
  if (k === 'limits') return [s.defAmt > 0 ? money(s.defAmt) : '', s.defDays > 0 ? t('days', {n:s.defDays}) : ''].filter(Boolean).join(' · ') || t('noLimit');
  if (k === 'pin') return t(s.pin ? 'on' : 'off');
  if (k === 'data') return t('lastBackup', {when:whenText(s.lastBackup)});
  if (k === 'email') return t(s.mailKey ? 'emailAuto' : 'emailNeedsKey');
  return '';
}
function refreshAcc(){ document.querySelectorAll('[data-sum]').forEach(el => { el.textContent = accSummary(el.dataset.sum); }); }
function setAcc(id){
  ui.acc = ui.acc === id ? '' : id;
  document.querySelectorAll('.acc').forEach(a => {
    const on = a.dataset.k === ui.acc;
    a.classList.toggle('open', on);
    const h = a.querySelector('.acc-h'); if (h) h.setAttribute('aria-expanded', on);
    const b = a.querySelector('.acc-b'); if (b) { if (on) b.removeAttribute('inert'); else b.setAttribute('inert', ''); }
  });
  if (ui.acc) setTimeout(() => { const a = document.querySelector('.acc.open'); if (a) a.scrollIntoView({block:'nearest', behavior:'smooth'}); }, 260);
}
function settingsView(){
  const s = db.settings, info = backupInfo();
  const acc = (k, icon, title, body, cls) => {
    const on = ui.acc === k;
    return '<section class="acc' + (on ? ' open' : '') + (cls ? ' ' + cls : '') + '" data-k="' + k + '">' +
      '<button class="acc-h" data-act="acc" data-id="' + k + '" aria-expanded="' + on + '" aria-controls="acc-' + k + '">' +
        '<span class="acc-i">' + ic(icon) + '</span><span class="acc-t"><b>' + esc(title) + '</b><small data-sum="' + k + '">' + esc(accSummary(k)) + '</small></span>' +
        '<span class="acc-c">' + ic('chev') + '</span></button>' +
      '<div class="acc-b" id="acc-' + k + '"' + (on ? '' : ' inert') + '><div class="acc-in">' + body + '</div></div></section>';
  };
  let h = '<h2 class="h">' + esc(t('settings')) + '</h2>';
  h += '<div class="prof"><div class="avatar lg">' + esc(initial(s.shop || t('app'))) + '</div><div><b>' + esc(s.shop || t('app')) + '</b><small>' + esc(t('custCount', {n:db.customers.length})) + '</small></div></div>';
  h += acc('shop', 'shop', t('setShop'),
    '<div class="srow"><label class="lbl" for="st-shop">' + esc(t('shopName')) + '</label>' +
      '<input id="st-shop" class="inp" data-set="shop" value="' + esc(s.shop) + '" placeholder="' + esc(t('shopPh')) + '"></div>' +
    '<div class="srow"><div class="lbl">' + esc(t('language')) + '</div><div class="seg">' +
      '<button data-act="lang" data-id="en" aria-pressed="' + (s.lang === 'en') + '">English</button>' +
      '<button data-act="lang" data-id="sw" aria-pressed="' + (s.lang === 'sw') + '">Kiswahili</button></div></div>');
  h += acc('limits', 'sliders', t('limitsTitle'),
    '<div class="srow"><p class="hint">' + esc(t('limitsHint')) + '</p></div>' +
    '<div class="srow"><div class="two">' +
      '<div><label class="lbl" for="st-la">' + esc(t('limitAmount')) + '</label><input id="st-la" class="inp" inputmode="numeric" data-set="defAmt" value="' + s.defAmt + '"></div>' +
      '<div><label class="lbl" for="st-ld">' + esc(t('limitDays')) + '</label><input id="st-ld" class="inp" inputmode="numeric" data-set="defDays" value="' + s.defDays + '"></div></div></div>');
  h += acc('pin', 'shield', t('pinTitle'),
    '<div class="srow line"><div><b>' + esc(t('pinTitle')) + '</b><small>' + esc(t('pinHint')) + '</small></div><span class="pill ' + (s.pin ? 'on' : '') + '">' + esc(t(s.pin ? 'on' : 'off')) + '</span></div>' +
    '<div class="srow"><div class="acts">' + (s.pin
      ? '<button class="btn" data-act="pin-change">' + esc(t('changePin')) + '</button><button class="btn ghost" data-act="pin-remove">' + esc(t('removePin')) + '</button>'
      : '<button class="btn primary" data-act="pin-set">' + esc(t('setPin')) + '</button>') + '</div></div>');
  h += acc('data', 'upload', t('setData'),
    '<div class="srow line"><b>' + esc(t('lastBackupL')) + '</b><span class="val">' + esc(whenText(s.lastBackup)) + '</span></div>' +
    '<div class="srow line"><b>' + esc(t('covers')) + '</b><span class="val">' + (db.entries.length ? esc(fmtD(info.from) + ' – ' + fmtD(info.to)) : esc(t('noRecords'))) + '</span></div>' +
    '<div class="srow"><div class="acts"><button class="btn primary" data-act="backup">' + ic('upload') + esc(t('backupNow')) + '</button><button class="btn" data-act="restore">' + esc(t('restore')) + '</button></div></div>' +
    '<div class="srow"><p class="hint">' + esc(t('backupHint')) + '</p></div>' +
    '<div class="srow"><p class="hint">' + esc(t(storagePersisted ? 'storeOn' : 'storeOff')) + '</p></div>');
  h += acc('email', 'mail', t('setEmail'),
    '<div class="srow"><label class="lbl" for="st-bt">' + esc(t('emailAddr')) + '</label>' +
      '<input id="st-bt" class="inp" type="email" inputmode="email" data-setstr="backupTo" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + esc(t('emailAddrPh')) + '" value="' + esc(s.backupTo) + '"></div>' +
    '<div class="srow line"><b>' + esc(t('emailAuto')) + '</b>' + mailPill() + '</div>' +
    '<div class="srow"><label class="lbl" for="st-mk">' + esc(t('emailKey')) + '</label>' +
      '<input id="st-mk" class="inp" data-setstr="mailKey" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="' + esc(t('emailKeyPh')) + '" value="' + esc(s.mailKey) + '"></div>' +
    '<div class="srow"><p class="hint">' + esc(t('emailKeyHint')) + '</p></div>');
  return h;
}

/* ---------- sheets ---------- */
function openSheet(html){
  const r = $('#sheet'), first = r.hidden;
  r.innerHTML = '<div class="scrim' + (first ? ' anim' : '') + '" data-act="close-sheet"></div><div class="panel' + (first ? ' anim' : '') + '" role="dialog" aria-modal="true"><div class="grab" aria-hidden="true"></div>' + html + '</div>';
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
  h += '<div class="chips amt-chips">' + (!isC && s && s.bal > 0 ? '<button class="chip" data-act="es-full" data-id="' + s.bal + '">' + esc(t('payFull', {amt:money(s.bal)})) + '</button>' : '') +
       [50, 100, 200, 500, 1000].map(n => '<button class="chip" data-act="es-add" data-id="' + n + '">+' + nf.format(n) + '</button>').join('') + '</div>';
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
    return '<button class="sugg" data-act="es-pick" data-id="' + c.id + '"><span>' + esc(c.name) + '</span><small>' + (s && s.bal > 0 ? money(s.bal) : '') + '</small></button>';
  }).join('');
  if (q && !db.customers.some(c => c.name.toLowerCase() === ql))
    h += '<button class="sugg add" data-act="es-newc">+ ' + esc(t('addNew', {q})) + '</button>';
  box.innerHTML = h;
}
const parseAmt = x => {                                // plain numbers only: 250, 250.50, 1,250 (a comma only as a thousands separator, so 12,50 is rejected)
  let v = String(x == null ? '' : x).trim().replace(/\s/g, '');
  if (/^\d{1,3}(,\d{3})+(\.\d{1,2})?$/.test(v)) v = v.replace(/,/g, '');
  return /^\d+(\.\d{1,2})?$/.test(v) ? r2(parseFloat(v)) : NaN;
};
function saveEntry(force){
  syncEs();
  if (!es.cid) { toast(t('pickCustomer')); return; }
  const raw = String(es.amt).trim(), amt = parseAmt(raw);
  if (!(amt > 0 && amt <= 1e7)) { toast(t(raw && !(amt === 0) ? 'badAmount' : 'enterAmount')); const f = $('#es-amt'); if (f) f.focus(); return; }
  const c = cust(es.cid), s = stats(c);
  if (es.type === 'credit' && !force) {
    const why = [], nb = r2(s.bal + amt);
    if (s.limA > 0 && nb > s.limA) why.push(t('warnAmt', {bal:money(nb), lim:money(s.limA)}));
    if (s.limD > 0 && s.bal > 0 && s.days > s.limD) why.push(t('warnDays', {d:s.limD, n:s.days}));
    if (why.length) { es.warn = why; drawEntry(); return; }
  }
  db.entries.push({id:uid(), cid:c.id, type:es.type, amt, note:es.note.trim(), ts:Date.now()});
  save(); closeSheet(); render();
  buzz(12);
  const ns = stats(c);
  toast(c.name + ': ' + (ns.bal > 0 ? t('owes', {amt:money(ns.bal)}) : ns.bal < 0 ? t('paidAhead') : t('settled')));
}

function openCust(id){
  const c = id ? cust(id) : null;
  let h = '<h2>' + esc(t(c ? 'editCustomer' : 'newCustomer')) + '</h2>' +
    '<label class="lbl" for="cs-name">' + esc(t('name')) + '</label><input id="cs-name" class="inp" autocomplete="off" value="' + esc(c ? c.name : '') + '">' +
    '<label class="lbl" for="cs-phone">' + esc(t('phone')) + '</label><input id="cs-phone" class="inp" type="tel" inputmode="tel" autocomplete="off" placeholder="07xx xxx xxx" value="' + esc(c ? c.phone : '') + '">' +
    '<div class="two"><div><label class="lbl" for="cs-la">' + esc(t('limitAmount')) + '</label><input id="cs-la" class="inp" inputmode="numeric" placeholder="' + db.settings.defAmt + '" value="' + (c && c.limitAmt ? c.limitAmt : '') + '"></div>' +
    '<div><label class="lbl" for="cs-ld">' + esc(t('limitDays')) + '</label><input id="cs-ld" class="inp" inputmode="numeric" placeholder="' + db.settings.defDays + '" value="' + (c && c.limitDays ? c.limitDays : '') + '"></div></div>' +
    '<p class="hint">' + esc(t('limitBlank')) + '</p>' +
    '<div class="btns"><button class="btn ghost" data-act="close-sheet">' + esc(t('cancel')) + '</button><button class="btn primary" data-act="cs-save" data-id="' + (c ? c.id : '') + '">' + esc(t('save')) + '</button></div>';
  if (c) h += '<div class="dz"><div class="dz-t">' + ic('warn') + esc(t('setDanger')) + '</div><p class="hint">' + esc(t('dzCust')) + '</p>' +
              '<button class="btn danger" data-act="cs-del" data-id="' + c.id + '">' + ic('trash') + esc(t('delCustBtn')) + '</button></div>';
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

/* ---------- PIN lock ---------- */
function hashPin(p){
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  const s = 'duka|' + p;
  for (let i = 0, ch; i < s.length; i++) { ch = s.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
function hidePad(){ const el = $('#lock'); el.hidden = true; el.innerHTML = ''; el.onclick = null; }
function showPad(o){
  const el = $('#lock');
  let buf = '', busy = false;
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
    if (busy) return;
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
    if (k === 'restore-yes') { const inc = pendingInc; pendingInc = null; if (inc) { applyRestore(inc); hidePad(); } return; }
    if (k === 'again') { buf = ''; pendingInc = null; draw(); return; }
    if (k === 'del') buf = buf.slice(0, -1);
    else if (buf.length < 4) buf += k;
    draw();
    if (buf.length === 4) {
      const r = o.onDone(buf);
      if (r && typeof r.then === 'function') {
        busy = true; draw(t('pinWorking'));
        r.then(m => { busy = false; if (typeof m === 'string') { buf = ''; draw(m); } }, () => { busy = false; buf = ''; draw(t('wrongPin')); });
      } else if (typeof r === 'string') { buf = ''; setTimeout(() => draw(r), 120); }
    }
  };
  draw();
}
function showLockRestore(inc){                         // ask before a backup replaces everything (also on the lock screen)
  pendingInc = inc;
  $('#lock').innerHTML = '<div class="pad"><h2>' + esc(t('forgotTitle')) + '</h2><p class="sub" style="margin:10px 0 18px">' + esc(t('restoreQ', {n:inc.customers.length})) + '</p>' +
    '<button class="btn danger" data-pad="restore-yes">' + esc(t('restore')) + '</button><button class="btn ghost" data-pad="again">' + esc(t('cancel')) + '</button></div>';
}
function lockNow(){
  closeSheet();
  showPad({title:t('enterPin'), forgot:true, onDone:p => unlockApp(p)});
}
function startSetPin(){
  if (!hasCrypto()) { toast(t('noCrypto')); return; }
  showPad({title:t('pinNew'), cancelable:true, onDone:p1 => {
    showPad({title:t('pinConfirm'), cancelable:true, onDone:async p2 => {
      if (p2 !== p1) return t('pinMismatch');
      await enableEncryption(p2); hidePad(); render(); toast(t('pinSet'));
    }});
  }});
}
function verifyPin(next){
  showPad({title:t('enterPin'), cancelable:true, onDone:async p => { const r = await verifyPinValue(p); if (!r.ok) return r.msg; hidePad(); next(); }});
}
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) hiddenAt = Date.now();
  else if (db.settings.pin && hiddenAt && Date.now() - hiddenAt > 120000) lockNow();
});

/* ---------- backup / restore ---------- */
function exportData(){
  const s = Object.assign({}, db.settings); delete s.pin; delete s.mailKey; delete s.mailPending; delete s.backupTo;
  return JSON.stringify({app:'duka-ledger', version:1, exportedAt:Date.now(), customers:db.customers, entries:db.entries, settings:s});
}
/* Email backup: when an access key is saved in Settings the backup is emailed on its own (Web3Forms, free).
   Without a key, Back up now saves the file and then opens the mail app with the details filled in. */
const validEmail = x => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(x);
const mailTo = () => validEmail(db.settings.backupTo || '') ? db.settings.backupTo : '';
const fmtD = ts => new Date(ts).toLocaleDateString('en-GB', {day:'numeric', month:'short', year:'numeric'});
function backupInfo(){
  let from = 0, to = 0;
  for (const e of db.entries) { if (!from || e.ts < from) from = e.ts; if (e.ts > to) to = e.ts; }
  const now = Date.now();
  if (!from) from = to = now;
  const owed = r2(allStats().reduce((a, x) => a + (x.s.bal > 0 ? x.s.bal : 0), 0));
  return {shop:db.settings.shop || '(no shop name)', from, to, at:now, customers:db.customers.length, entries:db.entries.length, owed};
}
const mailSubject = i => 'Duka Ledger backup - ' + i.shop + ' (' + fmtD(i.from) + ' to ' + fmtD(i.to) + ')';
function mailText(i, data){
  const lines = ['Shop: ' + i.shop, 'Records from: ' + fmtD(i.from), 'Records to: ' + fmtD(i.to),
    'Backed up on: ' + new Date(i.at).toLocaleString('en-GB', {day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'}),
    'Customers: ' + i.customers, 'Entries: ' + i.entries, 'Total owed: ' + money(i.owed)];
  if (data) lines.push('', '----- BACKUP DATA (save into a .json file to restore) -----', data);
  return lines.join('\n');
}
/* returns true = sent, false = rejected (bad key), 'net' = no connection, null = no key set */
async function sendBackupEmail(i, data){
  const key = db.settings.mailKey;
  if (!key) return null;
  const inc = data.length <= 150000;
  const ctl = ('AbortController' in window) ? new AbortController() : null;
  const to = setTimeout(() => { if (ctl) ctl.abort(); }, 25000);
  try {
    const r = await fetch('https://api.web3forms.com/submit', {
      method:'POST', headers:{'Content-Type':'application/json', 'Accept':'application/json'}, signal:ctl ? ctl.signal : undefined,
      body:JSON.stringify({access_key:key, subject:mailSubject(i), from_name:'Duka Ledger',
        message:mailText(i, inc ? data : '') + (inc ? '' : '\n\n(Too large to include. Use the backup file saved on the phone.)')})
    });
    const j = await r.json().catch(() => ({}));
    return !!(r.ok && j.success === true);
  } catch (e) { return 'net'; }
  finally { clearTimeout(to); }
}
function openMailApp(i){
  const href = 'mailto:' + encodeURIComponent(mailTo()).replace(/%40/g, '@') + '?subject=' + encodeURIComponent(mailSubject(i)) +
    '&body=' + encodeURIComponent(mailText(i) + '\n\n(Attach the backup file you just saved.)');
  const a = document.createElement('a');
  a.href = href; document.body.appendChild(a); a.click(); a.remove();
}
async function retryMail(){
  if (locked || !db.settings.mailKey || !db.settings.mailPending || retryMail.busy) return;
  retryMail.busy = true;
  const r = await sendBackupEmail(backupInfo(), exportData());
  retryMail.busy = false;
  if (r === 'net') return;
  db.settings.mailPending = false; save();
  if (r === true) toast(t('emailSent', {to:mailTo() || t('emailYours')}), 4200);
}
async function backup(){
  const d = new Date(), p = n => String(n).padStart(2, '0');
  const name = 'duka-ledger-' + d.getFullYear() + p(d.getMonth() + 1) + p(d.getDate()) + '.json';
  const data = exportData(), info = backupInfo();
  const hasKey = !!db.settings.mailKey;
  if (hasKey) toast(t('emailSending'), 6000);
  const mailP = hasKey ? sendBackupEmail(info, data) : Promise.resolve(null);   // runs while the share sheet is open
  let saved = false, cancelled = false;
  try {
    const file = new File([data], name, {type:'application/json'});
    if (navigator.canShare && navigator.canShare({files:[file]})) { await navigator.share({files:[file], title:'Duka Ledger'}); saved = true; }
  } catch (e) { if (e && e.name === 'AbortError') cancelled = true; }
  if (!saved && !cancelled) {
    const url = URL.createObjectURL(new Blob([data], {type:'application/json'}));
    const a = document.createElement('a');
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 3000);
    saved = true;
  }
  const mail = await mailP;
  if (mail === 'net') { db.settings.mailPending = true; save(); }
  if (!saved && mail !== true) return;
  db.settings.lastBackup = Date.now(); save(); render();
  if (mail === true) toast(t('emailSent', {to:mailTo() || t('emailYours')}), 4200);
  else if (mail === 'net') toast(t('emailQueued'), 4200);
  else if (mail === false) toast(t('emailRejected'), 4800);
  else { toast(t('backupDone')); setTimeout(() => openMailApp(info), 700); }
}
function sanitize(d){
  const b = blank();
  const customers = d.customers.filter(c => c && typeof c.id === 'string' && typeof c.name === 'string').map(c => ({
    id:c.id, name:c.name, phone:String(c.phone || ''), limitAmt:Math.max(0, Number(c.limitAmt) || 0), limitDays:Math.max(0, Number(c.limitDays) || 0),
    created:Number(c.created) || Date.now(), sample:!!c.sample}));
  const ids = new Set(customers.map(c => c.id));
  const entries = d.entries.filter(e => e && ids.has(e.cid) && (e.type === 'credit' || e.type === 'payment') && isFinite(e.amt) && e.amt > 0 && isFinite(e.ts))
    .map(e => ({id:String(e.id || uid()), cid:e.cid, type:e.type, amt:Number(e.amt), note:String(e.note || ''), ts:Number(e.ts)}));
  const settings = Object.assign(b.settings, d.settings || {}); settings.pin = ''; settings.mailKey = ''; settings.mailPending = false; settings.backupTo = '';
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
  const mk = db.settings.mailKey || '', to = db.settings.backupTo || '';
  const wasLocked = locked, pin = wasLocked ? '' : db.settings.pin;     // forgot-PIN restore removes the PIN; a restore while unlocked keeps it
  if (wasLocked) { sessionKey = null; sessionSalt = ''; encRec = null; locked = false; setAtt({n:0, until:0}); }
  db = inc; db.settings.mailKey = mk; db.settings.backupTo = to; db.settings.pin = pin; save(); ui = newUi(); navDepth = 0; render(); toast(t('restored'));
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
    case 'reload': location.reload(); break;
    case 'tab': buzz(); navTo(id, null); break;
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
    case 'acc': setAcc(id); buzz(); break;
    case 'quick': openEntry(null, el.dataset.type); break;
    case 'sort': { ui.sort[ui.tab] = id; const ch = $('#chips'); if (ch) ch.innerHTML = chipsHtml(); renderList(); buzz(); break; }
    case 'toggle-edit': ui.edit = !ui.edit; render(); break;
    case 'es-add': { syncEs(); const cur = parseAmt(es.amt) || 0; es.amt = String(r2(cur + Number(id))); const f = $('#es-amt'); if (f) f.value = es.amt; buzz(); break; }
    case 'es-full': { es.amt = String(id); const f = $('#es-amt'); if (f) f.value = es.amt; buzz(); break; }
    case 'lang': db.settings.lang = id; save(); render(); break;
    case 'pin-set': startSetPin(); break;
    case 'pin-change': verifyPin(startSetPin); break;
    case 'pin-remove': verifyPin(() => { sessionKey = null; sessionSalt = ''; encRec = null; db.settings.pin = ''; setAtt({n:0, until:0}); save(); render(); toast(t('pinRemoved')); }); break;
    case 'lock-now': lockNow(); break;
    case 'backup': backup(); break;
    case 'restore': $('#st-file').click(); break;
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
    save(); renderTop(); renderTabs(); syncProf(); refreshAcc(); toast(t('saved'));
  } else if (el.dataset && el.dataset.setstr) {
    const k2 = el.dataset.setstr, v2 = el.value.trim();
    if (k2 === 'backupTo' && v2 && !validEmail(v2)) { toast(t('badEmail')); el.value = db.settings.backupTo || ''; return; }
    db.settings[k2] = v2;
    if (!db.settings.mailKey) db.settings.mailPending = false;
    save(); refreshMailPill(); refreshAcc(); toast(t('saved'));
  } else if (el.id === 'st-file' && el.files && el.files[0]) {
    readBackup(el.files[0], inc => openConfirm(t('restoreQ', {n:inc.customers.length}), t('restore'), () => applyRestore(inc), true));
    el.value = '';
  } else if (el.id === 'lock-file' && el.files && el.files[0]) {
    readBackup(el.files[0], inc => showLockRestore(inc));
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !$('#sheet').hidden) { closeSheet(); return; }
  if (e.key === 'Enter' && es && (e.target.id === 'es-amt' || e.target.id === 'es-note')) { e.preventDefault(); saveEntry(false); }
});

function showUpdate(){                                 // a newer version has been saved on the phone: offer to switch to it
  if ($('#upd')) return;
  const d = document.createElement('div');
  d.id = 'upd'; d.className = 'upd'; d.setAttribute('role', 'status');
  d.innerHTML = '<span>' + esc(t('updReady')) + '</span><button class="btn sm" data-act="reload">' + esc(t('updBtn')) + '</button>';
  document.body.appendChild(d);
}
function init(){
  db = load();
  const st = history.state;                       // after a reload, return to the screen the person was on
  if (st && st.tab) { ui.tab = st.tab; ui.cust = st.cust && cust(st.cust) ? st.cust : null; }
  try { history.replaceState(curState(), ''); } catch (e) {}
  render(); animView();
  if (locked || db.settings.pin) lockNow();
  askPersist();
  retryMail();
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    const hadCtl = !!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadCtl) showUpdate(); });
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').then(reg => {
      document.addEventListener('visibilitychange', () => { if (!document.hidden) reg.update().catch(() => {}); });
    }).catch(() => {}));
  }
}
/* header shadow once the page scrolls */
window.addEventListener('scroll', () => { $('#top').classList.toggle('scrolled', window.scrollY > 4); }, {passive:true});
$('#view').addEventListener('animationend', e => { if (e.target === e.currentTarget) e.currentTarget.classList.remove('view-in'); });
window.addEventListener('online', retryMail);
/* drag the handle at the top of a sheet downwards to close it */
(function(){
  const sh = $('#sheet');
  let y0 = null, dy = 0, pan = null;
  sh.addEventListener('touchstart', e => {
    if (!e.target.closest('.grab')) return;
    pan = sh.querySelector('.panel'); y0 = e.touches[0].clientY; dy = 0; pan.style.transition = 'none';
  }, {passive:true});
  sh.addEventListener('touchmove', e => {
    if (y0 == null) return;
    dy = Math.max(0, e.touches[0].clientY - y0); pan.style.transform = 'translateY(' + dy + 'px)';
  }, {passive:true});
  const end = () => {
    if (y0 == null) return;
    const p = pan; y0 = null; p.style.transition = 'transform .18s ease';
    if (dy > 90) { p.style.transform = 'translateY(100%)'; setTimeout(() => closeSheet(), 160); }
    else p.style.transform = '';
  };
  sh.addEventListener('touchend', end); sh.addEventListener('touchcancel', end);
})();
init();
