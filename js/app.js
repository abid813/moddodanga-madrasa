/* ============================================================
   মধ্যডাঙ্গা পুরুষ মাদ্রাসা (নূরানি বিভাগ) — অ্যাপ লজিক
   ============================================================ */
'use strict';

/* ---------------- ধ্রুবক constant ---------------- */
const SCHOOL = {
  name: 'মধ্যডাঙ্গা পুরুষ মাদ্রাসা',
  sub: 'নূরানি বিভাগ | স্থাপিত ১৯৮৮ | খুলনা, দৌলতপুর',
  phone: '01911756628',
  whatsapp: 'https://wa.me/8801911756628'
};

/* শ্রেণি (স্তর) — নূরানি বিভাগ: প্রি-প্লে থেকে তৃতীয় শ্রেণি পর্যন্ত
   আইডি স্ট্রিং হিসেবে রাখা হয়েছে যাতে c${cid}_${date} কী-তে সমস্যা না হয়। */
const CLASS_ORDER = ['preplay', 'play', 'nursery', '1', '2', '3'];

const CLASS_LABEL = {
  preplay: 'প্রি-প্লে',
  play: 'প্লে',
  nursery: 'নার্সারি',
  '1': 'প্রথম শ্রেণি',
  '2': 'দ্বিতীয় শ্রেণি',
  '3': 'তৃতীয় শ্রেণি'
};

/* প্রতিটা স্তরের জন্য বিষয়ের তালিকা
   ছোট স্তরে (প্রি-প্লে/প্লে) কম বিষয়, বড় স্তরে সব বিষয়। */
const SUBJECTS_BY_CLASS = {
  preplay:  ['আরবি/কুরআন শিক্ষা', 'বাংলা', 'ইংরেজি', 'গণিত'],
  play:     ['আরবি/কুরআন শিক্ষা', 'বাংলা', 'ইংরেজি', 'গণিত'],
  nursery:  ['আরবি/কুরআন শিক্ষা', 'বাংলা', 'ইংরেজি', 'গণিত', 'ইসলাম শিক্ষা/দ্বীন শিক্ষা'],
  '1':      ['আরবি/কুরআন শিক্ষা', 'বাংলা', 'ইংরেজি', 'গণিত', 'সাধারণ বিজ্ঞান', 'সমাজ ভূগোল', 'ইসলাম শিক্ষা/দ্বীন শিক্ষা'],
  '2':      ['আরবি/কুরআন শিক্ষা', 'বাংলা', 'ইংরেজি', 'গণিত', 'সাধারণ বিজ্ঞান', 'সমাজ ভূগোল', 'ইসলাম শিক্ষা/দ্বীন শিক্ষা'],
  '3':      ['আরবি/কুরআন শিক্ষা', 'বাংলা', 'ইংরেজি', 'গণিত', 'সাধারণ বিজ্ঞান', 'সমাজ ভূগোল', 'ইসলাম শিক্ষা/দ্বীন শিক্ষা']
};

const PAGES = {
  exam: { title: 'পরীক্ষার রুটিন', icon: '📝' },
  holidays: { title: 'ছুটির তালিকা', icon: '🎉' },
  stipend: { title: 'বই ও স্টেশনারি', icon: '📚' }
};

/* ---------------- শিক্ষকমন্ডলী (ডিফল্ট তালিকা) ----------------
   স্কেলেবল প্রোফাইল: ছবি, নাম, পদবি, শিক্ষাগত যোগ্যতা, পরিচয় ও ঠিকানা */
const DEFAULT_TEACHERS = [
  {
    id: 't1',
    name: 'মাওলানা মুফতি মো. আব্দুল্লাহ',
    designation: 'মুহতামিম ও প্রধান উপদেষ্টা',
    photo: 'assets/logo.jpg',
    qualification: 'দাওরায়ে হাদিস (মাস্টার্স সমমান), ইফতা (মুফতি), হাফেজে কুরআন।',
    identity: 'খতিব, সরকারি বিএল কলেজ কেন্দ্রীয় জামে মসজিদ, দৌলতপুর, খুলনা এবং প্রতিষ্ঠাতা পরিচালক, মধ্যডাঙ্গা পুরুষ মাদ্রাসা (নূরানি বিভাগ)।',
    address: 'মধ্যডাঙ্গা, দৌলতপুর, খুলনা।',
    phone: '01911756628'
  },
  {
    id: 't2',
    name: 'মাওলানা মো. মাহমুদুল হাসান',
    designation: 'বিভাগীয় প্রধান ও সিনিয়র শিক্ষক',
    photo: 'assets/logo.jpg',
    qualification: 'দাওরায়ে হাদিস, নূরানি মুয়াল্লিম প্রশিক্ষণপ্রাপ্ত ও কামিল (হাদিস)।',
    identity: 'নূরানি বিভাগের সার্বিক পরিচালনা, সহপাঠ শিক্ষা ও বাংলা-ইংরেজি সমন্বয়কারী শিক্ষক।',
    address: 'দৌলতপুর, খুলনা।',
    phone: '01911756628'
  },
  {
    id: 't3',
    name: 'ক্বারী মো. হাবিবুর রহমান',
    designation: 'ক্বারী ও হিফজুল কুরআন শিক্ষক',
    photo: 'assets/logo.jpg',
    qualification: 'হাফেজে কুরআন, তাজবীদ ও ক্বিরাত বিশেষজ্ঞ (আন্তর্জাতিক মানসম্পন্ন সনদপ্রাপ্ত)।',
    identity: 'সহিহ কুরআন তিলাওয়াত, মাখরাজ ও মাশক শিক্ষক, নূরানি বিভাগ।',
    address: 'মধ্যডাঙ্গা, খুলনা।',
    phone: '01911756628'
  },
  {
    id: 't4',
    name: 'মাওলানা মো. আব্দুর রহিম',
    designation: 'সহকারী শিক্ষক (সাধারণ শিক্ষা)',
    photo: 'assets/logo.jpg',
    qualification: 'ফাজিল (ডিগ্রি সমমান), বি.এ। নূরানি মুয়াল্লিম কোর্স সম্পন্ন।',
    identity: 'নূরানি বিভাগের বাংলা, সাধারণ গণিত, ইংরেজি ও দ্বীনিয়াত বিষয়ের শিক্ষক।',
    address: 'দৌলতপুর, খুলনা।',
    phone: '01911756628'
  }
];

/* ---------------- বাংলা হেল্পার ---------------- */
const BN_D = '০১২৩৪৫৬৭৮৯';
const bn = v => String(v).replace(/[0-9]/g, d => BN_D[+d]);

const BN_MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
const BN_DAYS = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];

function todayStr(d = new Date()) {
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
function yesterdayStr() {
  const d = new Date(); d.setDate(d.getDate() - 1); return todayStr(d);
}
function bnDate(dateStr) { // "2026-10-29" -> "বৃহস্পতিবার, ২৯ অক্টোবর ২০২৬"
  const d = new Date(dateStr + 'T00:00:00');
  if (isNaN(d)) return dateStr;
  return `${BN_DAYS[d.getDay()]}, ${bn(d.getDate())} ${BN_MONTHS[d.getMonth()]} ${bn(d.getFullYear())}`;
}
function bnTime(iso) { // ISO -> "বিকেল ৪:৩০"
  const d = new Date(iso);
  if (isNaN(d)) return '';
  let h = d.getHours(); const m = d.getMinutes();
  let part = 'সকাল';
  if (h >= 12 && h < 15) part = 'দুপুর';
  else if (h >= 15 && h < 18) part = 'বিকেল';
  else if (h >= 18 && h < 20) part = 'সন্ধ্যা';
  else if (h >= 20 || h < 4) part = 'রাত';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${part} ${bn(h12)}:${bn(String(m).padStart(2, '0'))}`;
}
function bnUpdated(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return `${bn(d.getDate())} ${BN_MONTHS[d.getMonth()]}, ${bnTime(iso)}`;
}
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ---------------- প্রোফাইল (ফোনে সেভ) ---------------- */
const PROFILE_KEY = 'moddodanga_profile';
const getProfile = () => { try { return JSON.parse(localStorage.getItem(PROFILE_KEY)); } catch { return null; } };
const setProfile = p => localStorage.setItem(PROFILE_KEY, JSON.stringify(p));

/* ============================================================
   ডেটা লেয়ার — Firebase নাকি ডেমো
   ============================================================ */
const DEMO = !window.firebaseConfig || String(firebaseConfig.apiKey || '').startsWith('PASTE');

/* ---------- ডেমো ডেটাবেস (localStorage) ---------- */
const DemoDB = (() => {
  const KEY = 'moddodanga_demo_db';
  const seed = () => ({
    homework: {
      [`cnursery_${todayStr()}`]: {
        classId: 'nursery', date: todayStr(),
        subjects: { 'আরবি/কুরআন শিক্ষা': 'সূরা ফাতিহা ৩ বার পড়া।', 'বাংলা': 'সহপাঠ: "আমার মাদ্রাসা" পাঠ ৩ বার পড়া।', 'গণিত': '১ থেকে ১০ সংখ্যা মুখস্থ।' },
        updatedAt: new Date().toISOString()
      },
      [`c2_${todayStr()}`]: {
        classId: '2', date: todayStr(),
        subjects: {
          'আরবি/কুরআন শিক্ষা': 'সূরা ইখলাস মুখস্থ ও অর্থ বুঝে পড়া।',
          'বাংলা': 'ব্যাকরণ: বিশেষ্য পদ চেনা (পৃষ্ঠা ৪০)।',
          'ইংরেজি': 'English for Today: Unit 5, Lesson 1-2 পড়া।',
          'গণিত': 'গুণের নামতা ৬-৭ মুখস্থ।',
          'সাধারণ বিজ্ঞান': 'পৃষ্ঠা ৩২-৩৪ পড়া ও ছবি আঁকা।',
          'ইসলাম শিক্ষা/দ্বীন শিক্ষা': 'দোয়া "বিসমিল্লাহ" অর্থসহ মুখস্থ।'
        },
        updatedAt: new Date().toISOString()
      }
    },
    notices: [
      { id: 'n1', title: 'তৃতীয় সাময়িক পরীক্ষার রুটিন প্রকাশ', body: 'আগামী ১০ ডিসেম্বর থেকে তৃতীয় সাময়িক পরীক্ষা শুরু হবে। বিস্তারিত রুটিন "পরীক্ষার রুটিন" অংশে দেখুন। সবাইকে নিয়মিত উপস্থিত থাকার জন্য অনুরোধ করা হলো।', urgent: true, forClass: 'all', createdAt: new Date().toISOString() },
      { id: 'n2', title: 'নতুন বই বিতরণ', body: 'আগামী রবিবার সকাল ১০টা থেকে নতুন শ্রেণির বই ও খাতা বিতরণ করা হবে। শিক্ষার্থীদের মাদ্রাসায় উপস্থিত থাকতে হবে।', urgent: false, forClass: 'all', createdAt: new Date(Date.now() - 86400000).toISOString() }
    ],
    pages: {
      exam: { title: 'পরীক্ষার রুটিন', body: 'তৃতীয় সাময়িক পরীক্ষা ২০২৬\n\n১০ ডিসেম্বর — আরবি/কুরআন শিক্ষা\n১১ ডিসেম্বর — বাংলা\n১২ ডিসেম্বর — ইংরেজি\n১৩ ডিসেম্বর — গণিত\n১৪ ডিসেম্বর — ইসলাম শিক্ষা/দ্বীন শিক্ষা\n১৫ ডিসেম্বর — সাধারণ বিজ্ঞান ও সমাজ ভূগোল (১ম-৩য়)\n\nসময়: সকাল ৯টা - দুপুর ১১টা', updatedAt: new Date().toISOString() },
      holidays: { title: 'ছুটির তালিকা', body: '১৬ ডিসেম্বর — বিজয় দিবস\n২৫ ডিসেম্বর — বড়দিন\n২১ ফেব্রুয়ারি — শহীদ দিবস\n২৬ মার্চ — স্বাধীনতা দিবস\n১২ রবিউল আউয়াল — ঈদে মিলাদুন্নবী\n\n(সরকারি ও মাদ্রাসা শিক্ষা বোর্ডের ছুটির তালিকা অনুযায়ী হালনাগাদ করা হবে)', updatedAt: new Date().toISOString() },
      stipend: { title: 'বই ও স্টেশনারি', body: '• নতুন শ্রেণির বই ও খাতা সবার জন্য সম্পূর্ণ ফ্রি।\n• প্রতি মাসে কলম ও প্রয়োজনীয় স্টেশনারি মাদ্রাসা থেকে দেওয়া হয়।\n• বই বা স্টেশনারি সংক্রান্ত যেকোনো সমস্যায় মাদ্রাসা অফিসে যোগাযোগ করুন।', updatedAt: new Date().toISOString() }
    },
    routines: {
      nursery: 'নার্সারির রুটিন\n\nসকাল ৮:০০ — আরবি/কুরআন শিক্ষা\nসকাল ৮:৩০ — বাংলা\nসকাল ৯:০০ — ইংরেজি\nসকাল ৯:৩০ — গণিত\nসকাল ১০:০০ — ইসলাম শিক্ষা/দ্বীন শিক্ষা',
      '2': 'দ্বিতীয় শ্রেণির রুটিন\n\nসকাল ৮:০০ — আরবি/কুরআন শিক্ষা\nসকাল ৮:৪৫ — বাংলা\nসকাল ৯:৩০ — ইংরেজি\nসকাল ১০:১৫ — গণিত\nসকাল ১১:০০ — সাধারণ বিজ্ঞান\nসকাল ১১:৩০ — সমাজ ভূগোল\nদুপুর ১২:০০ — ইসলাম শিক্ষা/দ্বীন শিক্ষা'
    },
    complaints: [
      { id: 'x1', name: 'একজন অভিভাবক', classId: '1', message: 'পানির ট্যাংকিটা ঠিক করার অনুরোধ করছি।', createdAt: new Date(Date.now() - 3600000).toISOString() }
    ],
    registrations: []
  });

  let db;
  try { db = JSON.parse(localStorage.getItem(KEY)) || null; } catch { db = null; }
  if (!db) { db = seed(); localStorage.setItem(KEY, JSON.stringify(db)); }
  const persist = () => localStorage.setItem(KEY, JSON.stringify(db));
  const ok = v => Promise.resolve(v);

  return {
    isDemo: true,
    init: () => ok(),
    onAuth: () => { },
    getHomework: (cid, date) => ok(db.homework[`c${cid}_${date}`] || null),
    getNotices: () => ok([...db.notices].sort((a, b) => b.createdAt.localeCompare(a.createdAt))),
    getPage: k => ok(db.pages[k] || null),
    getRoutine: c => ok(db.routines[c] ? { body: db.routines[c] } : null),
    saveRegistration: d => { db.registrations.push(d); persist(); return ok(); },
    submitComplaint: d => { db.complaints.unshift({ id: 'x' + Date.now(), ...d, createdAt: new Date().toISOString() }); persist(); return ok(); },
    // admin
    adminLogin: () => ok({ name: 'ডেমো অ্যাডমিন', role: 'owner' }),
    adminLogout: () => ok(),
    saveHomework: (cid, date, subjects) => {
      db.homework[`c${cid}_${date}`] = { classId: cid, date, subjects, updatedAt: new Date().toISOString() };
      persist(); return ok();
    },
    addNotice: n => { db.notices.unshift({ id: 'n' + Date.now(), ...n, createdAt: new Date().toISOString() }); persist(); return ok(); },
    deleteNotice: id => { db.notices = db.notices.filter(n => n.id !== id); persist(); return ok(); },
    savePage: (k, body) => { db.pages[k] = { title: PAGES[k].title, body, updatedAt: new Date().toISOString() }; persist(); return ok(); },
    saveRoutine: (c, body) => { db.routines[c] = body; persist(); return ok(); },
    getComplaints: () => ok(db.complaints),
    getTeachers: () => ok(db.teachers || DEFAULT_TEACHERS)
  };
})();

/* ---------- Firebase ডেটাবেস ---------- */
const FirebaseDB = (() => {
  let db, auth;
  return {
    isDemo: false,
    async init() {
      firebase.initializeApp(firebaseConfig);
      db = firebase.firestore();
      auth = firebase.auth();
      try { await db.enablePersistence({ synchronizeTabs: true }); } catch (e) { /* অফলাইন ক্যাশ না চললেও চলবে */ }
      try { await auth.signInAnonymously(); } catch (e) { console.warn('anon auth', e); }
    },
    async getHomework(cid, date) {
      const s = await db.collection('homework').doc(`c${cid}_${date}`).get();
      return s.exists ? s.data() : null;
    },
    async getNotices() {
      const s = await db.collection('notices').orderBy('createdAt', 'desc').limit(30).get();
      return s.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async getPage(k) {
      const s = await db.collection('pages').doc(k).get();
      return s.exists ? s.data() : null;
    },
    async getRoutine(c) {
      const s = await db.collection('routines').doc(`class_${c}`).get();
      return s.exists ? s.data() : null;
    },
    saveRegistration: d => db.collection('registrations').add({ ...d, createdAt: new Date().toISOString() }),
    submitComplaint: d => db.collection('complaints').add({ ...d, createdAt: new Date().toISOString() }),
    // admin
    async adminLogin(email, pass) {
      const cred = await auth.signInWithEmailAndPassword(email, pass);
      const a = await db.collection('admins').doc(cred.user.uid).get();
      if (!a.exists) { await auth.signOut(); throw new Error('no-admin'); }
      return a.data();
    },
    adminLogout: () => auth.signOut(),
    saveHomework: (cid, date, subjects) =>
      db.collection('homework').doc(`c${cid}_${date}`).set({ classId: cid, date, subjects, updatedAt: new Date().toISOString() }),
    addNotice: n => db.collection('notices').add({ ...n, createdAt: new Date().toISOString() }),
    deleteNotice: id => db.collection('notices').doc(id).delete(),
    savePage: (k, body) => db.collection('pages').doc(k).set({ title: PAGES[k].title, body, updatedAt: new Date().toISOString() }),
    saveRoutine: (c, body) => db.collection('routines').doc(`class_${c}`).set({ body, updatedAt: new Date().toISOString() }),
    async getComplaints() {
      const s = await db.collection('complaints').orderBy('createdAt', 'desc').limit(50).get();
      return s.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    async getTeachers() {
      try {
        const s = await db.collection('teachers').orderBy('order', 'asc').get();
        if (!s.empty) {
          return s.docs.map(d => ({ id: d.id, ...d.data() }));
        }
      } catch (e) { }
      return DEFAULT_TEACHERS;
    }
  };
})();

const DB = DEMO ? DemoDB : FirebaseDB;

/* ============================================================
   UI স্টেট
   ============================================================ */
const view = document.getElementById('view');
const appbar = document.getElementById('appbar');
const appbarTitle = document.getElementById('appbarTitle');
const backBtn = document.getElementById('backBtn');
const appFooter = document.getElementById('appFooter');

let deferredInstall = null;
let adminUser = null;

/* ---------------- শব্দ সিস্টেম (Web Audio API) ----------------
   ২৩–৩৩ বছরের সম্মানিত অভিভাবকদের জন্য তৈরি নরম, শান্ত, মিষ্টি সুর।
   কোনো বাহ্যিক অডিও ফাইল ছাড়া পিওর সিন্থেসাইজারে তৈরি।
   - সব সুর ০.১৫–০.৩৮ সেকেন্ডের মধ্যে।
   - সর্বোচ্চ ভলিউম ০.১২ (০.১৫-এর অনেক নিচে, কান জুড়ানো)।
   - sine ও triangle ওয়েভ, কোমল অ্যাটাক ও এক্সপোনেনশিয়াল ফেড-আউট।
   - সাউন্ডে যেকোনো ব্যর্থতায় try/catch থাকায় অ্যাপ কখনই থামবে না। */

const MUTE_KEY = 'moddodanga_mute';
let _muted = false;
try {
  _muted = localStorage.getItem(MUTE_KEY) === '1';
} catch (e) {
  _muted = false;
}

function isMuted() { return _muted; }

function setMute(val) {
  _muted = Boolean(val);
  try {
    localStorage.setItem(MUTE_KEY, _muted ? '1' : '0');
  } catch (e) { }
  updateMuteButtonUI();
  if (!_muted) {
    playServiceSound('tap');
  }
}

function toggleMute() {
  try {
    setMute(!_muted);
  } catch (e) { }
}

function updateMuteButtonUI() {
  try {
    const btn = document.getElementById('muteBtn');
    if (btn) {
      btn.innerHTML = _muted ? '🔇 সাউন্ড বন্ধ' : '🔊 সাউন্ড চালু';
      btn.style.background = _muted ? '#ECEFF1' : 'var(--green-light, #E8F5E9)';
      btn.style.color = _muted ? '#546E7A' : 'var(--green-dark, #1B5E20)';
      btn.style.borderColor = _muted ? '#CFD8DC' : '#C8E6C9';
      btn.setAttribute('aria-pressed', _muted ? 'true' : 'false');
    }
  } catch (e) { }
}

let chimeCtx = null;
function ensureAudio() {
  try {
    if (!chimeCtx) {
      chimeCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (chimeCtx.state === 'suspended') {
      chimeCtx.resume().catch(() => {});
    }
    return chimeCtx;
  } catch (e) {
    return null;
  }
}

/* নোটিশ সার্ভিসের সেই মিষ্টি সুর (A4 → E5 শান্ত চাইম) যা এখন সব সার্ভিসে বাজবে */
const NOTICE_SOUND = [
  { f: 440.00, t: 0.00, d: 0.18, v: 0.07, type: 'triangle', attack: 0.03 },
  { f: 659.25, t: 0.08, d: 0.24, v: 0.08, type: 'sine', attack: 0.03 },
];

/* সুর প্যালেট — ব্যবহারকারীর নির্দেশ অনুযায়ী সব মূল সার্ভিসে নোটিশের মিষ্টি সুর */
const SOUND_PALETTE = {
  // ১. অ্যাপ ওপেন / স্প্ল্যাশ (নরম ভৈরবী-ধাঁচের স্বাগত চাইম: C5 → E5 → G5 → C6) - ০.৩৮ সে.
  open: [
    { f: 523.25, t: 0.00, d: 0.28, v: 0.08, type: 'sine', attack: 0.04 },
    { f: 659.25, t: 0.08, d: 0.26, v: 0.07, type: 'sine', attack: 0.03 },
    { f: 783.99, t: 0.16, d: 0.22, v: 0.06, type: 'triangle', attack: 0.03 },
    { f: 1046.50, t: 0.24, d: 0.38, v: 0.06, type: 'sine', attack: 0.03 },
  ],

  // সব মূল সার্ভিসে নোটিশের সেই মিষ্টি সুর
  homework: NOTICE_SOUND,
  notices: NOTICE_SOUND,
  teachers: NOTICE_SOUND,
  routine: NOTICE_SOUND,
  exam: NOTICE_SOUND,
  holidays: NOTICE_SOUND,
  stipend: NOTICE_SOUND,
  soon: NOTICE_SOUND,
  complaint: NOTICE_SOUND,
  contact: NOTICE_SOUND,
  back: NOTICE_SOUND,
  class: NOTICE_SOUND,
  tap: NOTICE_SOUND,

  // সফল সংরক্ষণ / সাবমিট (শান্তিময় ৩ নোটের সম্প্রীতি: F5 → A5 → C6) - ০.৩৮ সে.
  success: [
    { f: 698.46, t: 0.00, d: 0.16, v: 0.07, type: 'sine', attack: 0.02 },
    { f: 880.00, t: 0.07, d: 0.20, v: 0.08, type: 'sine', attack: 0.02 },
    { f: 1046.50, t: 0.14, d: 0.24, v: 0.07, type: 'sine', attack: 0.03 },
  ]
};

/* সিন্থেসাইজার কোর — নোট বাজানোর নিরাপদ ইঞ্জিন */
function playNotes(notes) {
  try {
    if (isMuted()) return;
    const ctx = ensureAudio();
    if (!ctx) return;
    const t0 = ctx.currentTime;

    notes.forEach(n => {
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = n.type || 'sine';
        osc.frequency.setValueAtTime(n.f, t0 + n.t);

        const startTime = t0 + n.t;
        const dur = Math.min(Math.max(n.d || 0.2, 0.15), 0.4);
        const stopTime = startTime + dur;
        const targetVol = Math.min(n.v || 0.07, 0.12);
        const attack = n.attack || 0.025;

        // সফট ফেড-ইন (আক্রমণ কোমল করা, যাতে খটখট শব্দ না হয়)
        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(targetVol, startTime + attack);

        // সফট ফেড-আউট (নরমভাবে শেষ হওয়া)
        gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(stopTime + 0.02);
      } catch (noteErr) {
        // কোনো সিঙ্গেল নোটে এরর হলেও পরেরগুলো বা অ্যাপ যেন না থামে
      }
    });
  } catch (err) {
    // অডিও ক্র্যাশ করলেও মূল অ্যাপ অক্ষত থাকবে
  }
}

/* একক এন্ট্রি পয়েন্ট — সার্ভিস অনুযায়ী শব্দ বাজায় */
function playServiceSound(type) {
  try {
    if (isMuted()) return;
    const notes = SOUND_PALETTE[type] || SOUND_PALETTE.tap;
    playNotes(notes);
  } catch (e) { }
}

/* পুরোনো কোডের সাথে ব্যাকওয়ার্ড কম্প্যাটিবিলিটি */
function playSound(type) { playServiceSound(type); }
function playTap() { playServiceSound('tap'); }
function playChime() { playServiceSound('open'); }
function playSuccess() { playServiceSound('success'); }

/* ---------------- সাউন্ড ডেলিগেশন ----------------
   স্ক্রোল করার সময় যেন কোনো শব্দ না বাজে, সেজন্য pointerdown-এর পরিবর্তে click ইভেন্টে
   সাউন্ড চালানো হয় (ক্যাপচার ফেজে)। ব্রাউজারে ব্যবহারকারী স্ক্রোল/সোয়াইপ করলে click
   ইভেন্ট ফায়ার হয় না; কেবল ইচ্ছাকৃতভাবে কোনো বাটন ট্যাপ করলেই শব্দ বাজবে। */
function setupSoundDelegation() {
  document.addEventListener('click', function handleTapSound(e) {
    try {
      if (isMuted()) return;

      // স্প্ল্যাশ স্ক্রিন অ্যাক্টিভ থাকলে শুধু ওপেন সাউন্ড বাজবে
      const splash = document.getElementById('screen-splash');
      if (splash && splash.classList.contains('active')) return;

      // মিউট বাটনে ক্লিক করলে নিজস্ব হ্যান্ডলার কাজ করবে
      if (e.target.closest('#muteBtn')) return;

      const target = e.target.closest(
        'button, a, .menu-item, .talk-btn, .homework-hero, .class-btn, .class-row, .appbar-back, #homeFab, .admin-tab, .edit-profile, .install-btn, .splash-install-btn'
      );
      if (!target) return;

      let soundType = target.dataset ? target.dataset.sound : null;

      if (!soundType) {
        if (target.classList.contains('homework-hero') || target.matches('[onclick*="#/homework"]')) {
          soundType = 'homework';
        } else if (target.matches('[onclick*="#/notices"]')) {
          soundType = 'notices';
        } else if (target.matches('[onclick*="#/teachers"]') || target.matches('[href*="teachers"]')) {
          soundType = 'teachers';
        } else if (target.matches('[onclick*="#/routine"]')) {
          soundType = 'routine';
        } else if (target.matches('[onclick*="exam"]')) {
          soundType = 'exam';
        } else if (target.matches('[onclick*="holidays"]')) {
          soundType = 'holidays';
        } else if (target.matches('[onclick*="stipend"]')) {
          soundType = 'stipend';
        } else if (target.classList.contains('soon') || target.matches('[onclick*="soon"]')) {
          soundType = 'soon';
        } else if (target.matches('[onclick*="complaint"]')) {
          soundType = 'complaint';
        } else if (target.id === 'imoBtn' || target.matches('[href*="wa.me"]') || target.classList.contains('talk-btn')) {
          soundType = 'contact';
        } else if (target.id === 'backBtn' || target.id === 'homeFab') {
          soundType = 'back';
        } else if (target.classList.contains('class-btn') || target.classList.contains('class-row')) {
          soundType = 'class';
        } else {
          soundType = 'tap';
        }
      }

      playServiceSound(soundType);
    } catch (err) {
      // সাউন্ডে সমস্যা হলেও অ্যাপ যেন কখনই না থামে
    }
  }, true);
}

/* ---------------- স্প্ল্যাশ ও বুট ---------------- */
function isInAppBrowser() {
  const ua = navigator.userAgent || '';
  // সাধারণ ইন-অ্যাপ ব্রাউজার/ওয়েবভিউ চিহ্নিত করো
  return /FBAN|FBAV|Instagram|Messenger|WhatsApp|IMO|Telegram|Twitter|XTwitter|TikTok|Line|WeChat| Snapchat/i.test(ua)
    || /wv\)|Version\/.*Chrome\/1\d/i.test(ua)       // Android WebView pattern
    || (/(iPhone|iPad|iPod).*AppleWebKit(?!.*Safari)/i.test(ua)) // iOS in-app webview
    || (!/Chrome|Safari|Firefox|Edg|Opera/i.test(ua) && /Mobile/i.test(ua));
}

function boot() {
  if (DEMO) document.getElementById('demoBanner').hidden = false;

  // ইন-অ্যাপ ব্রাউজারে Chrome-এ খোলার বাটন (index.html এর inline script অটো চেষ্টা করে)
  // এখানে শুধু বাটনের ক্লিক হ্যান্ডলার — fallback হিসেবে
  if (isInAppBrowser()) {
    const ib = document.getElementById('inappBanner');
    if (ib) ib.hidden = false;
    const openBtn = document.getElementById('openInChrome');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          location.href = 'googlechromes://' + location.host + location.pathname + location.search;
        } else {
          // Android: Chrome intent
          var url = location.href.replace(/^https?:\/\//, '');
          location.href = 'intent://' + url + '#Intent;scheme=https;package=com.android.chrome;end';
        }
      });
    }
  }

  // অ্যাপ খোলার সাউন্ড স্প্ল্যাশের প্রথম ট্যাপে বাজবে
  let openPlayed = false;
  function triggerOpenSound() {
    if (openPlayed) return;
    openPlayed = true;
    playServiceSound('open');
  }

  const splash = document.getElementById('screen-splash');
  if (splash) {
    splash.addEventListener('pointerdown', triggerOpenSound, { once: true });
  }

  // ব্রাউজারে অনুমতি থাকলে সরাসরি বাজবে
  try {
    const ctx = ensureAudio();
    if (ctx && ctx.state === 'running') {
      triggerOpenSound();
    }
  } catch (e) { }

  // মূল সার্ভিস বাটনে আলাদা সাউন্ড বাজার লিসেনার (স্ক্রোল নিরাপদ)
  setupSoundDelegation();

  const splashInstallBtn = document.getElementById('splashInstall');
  let left = false;
  const leave = () => {
    if (left) return; left = true;
    splash.classList.remove('active');
    // স্প্ল্যাশের পর — ইনস্টল বাটন দেখাও (যদি PWA ইনস্টল পাওয়া যায়)
    if (deferredInstall && !isStandalone()) {
      showInstallPrompt();
      return; // ইনস্টল প্রম্পট দেখাচ্ছি, অ্যাপে ঢোকা বন্ধ রাখি
    }
    if (getProfile()) enterApp();
    else document.getElementById('screen-register').classList.add('active');
  };
  document.getElementById('splashSkip').addEventListener('click', leave);
  setTimeout(leave, 4500);

  DB.init().catch(e => console.warn('DB init', e));
  setupRegister();
  setupRouter();
  setupInstall();
}

/* ---------------- রেজিস্ট্রেশন (৪ প্রশ্ন) ---------------- */
function setupRegister() {
  let picked = '';
  document.querySelectorAll('#regClassPicker .class-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#regClassPicker .class-btn').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
      picked = b.dataset.class;
    });
  });

  document.getElementById('registerForm').addEventListener('submit', async e => {
    e.preventDefault();
    const student = document.getElementById('regStudent').value.trim();
    const father = document.getElementById('regFather').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const err = document.getElementById('regError');

    if (!student) return showErr(err, 'শিক্ষার্থীর নাম লিখুন');
    if (!father) return showErr(err, 'বাবার নাম লিখুন');
    if (!picked) return showErr(err, 'শ্রেণি বেছে নিন');
    if (!/^01\d{9}$/.test(phone)) return showErr(err, 'সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন (01 দিয়ে শুরু)');

    err.hidden = true;
    const profile = { studentName: student, fatherName: father, classId: picked, phone };
    setProfile(profile);
    try { await DB.saveRegistration(profile); } catch (e2) { console.warn('reg save', e2); }

    document.getElementById('screen-register').classList.remove('active');
    playServiceSound('success');
    enterApp();
  });
}
function showErr(el, msg) { el.textContent = '⚠️ ' + msg; el.hidden = false; }

/* ---------------- অ্যাপে ঢুকা ---------------- */
function enterApp() {
  appbar.hidden = false;
  view.hidden = false;
  appFooter.hidden = false;
  location.hash = '#/';
  render();
}

/* ---------------- রাউটার ---------------- */
const homeFab = document.getElementById('homeFab');
function setupRouter() {
  window.addEventListener('hashchange', render);
  backBtn.addEventListener('click', () => history.back());
}

const TITLES = {
  home: SCHOOL.name, homework: 'আজকের হোমওয়ার্ক', notices: 'নোটিশ',
  teachers: 'শিক্ষকমন্ডলী',
  page: '', routine: 'ক্লাস রুটিন', complaint: 'অভিযোগ / মতামত', admin: 'অ্যাডমিন'
};

async function render() {
  const hash = location.hash || '#/';
  const parts = hash.replace(/^#\//, '').split('/').filter(Boolean);
  const route = parts[0] || 'home';
  const profile = getProfile();

  if (!profile) { location.hash = ''; return; }

  backBtn.classList.toggle('show', route !== 'home');
  homeFab.hidden = (route === 'home' || route === 'admin');
  appbar.classList.toggle('home-mode', route === 'home');
  appFooter.hidden = (route !== 'home');

  if (route === 'home') { appbarTitle.textContent = TITLES.home; renderHome(profile); }
  else if (route === 'homework' && parts[1]) { appbarTitle.textContent = CLASS_LABEL[parts[1]] + ' — হোমওয়ার্ক'; renderHomeworkDetail(parts[1]); }
  else if (route === 'homework') { appbarTitle.textContent = TITLES.homework; renderClassPick(profile, 'homework'); }
  else if (route === 'notices') { appbarTitle.textContent = TITLES.notices; renderNotices(); }
  else if (route === 'teachers') { appbarTitle.textContent = TITLES.teachers; renderTeachers(); }
  else if (route === 'page' && PAGES[parts[1]]) { appbarTitle.textContent = PAGES[parts[1]].title; renderPage(parts[1]); }
  else if (route === 'routine') { appbarTitle.textContent = TITLES.routine; renderRoutine(profile); }
  else if (route === 'complaint') { appbarTitle.textContent = TITLES.complaint; renderComplaint(profile); }
  else if (route === 'admin') { appbarTitle.textContent = TITLES.admin; renderAdmin(); }
  else if (route === 'soon' && COMING_SOON[parts[1]]) { appbarTitle.textContent = COMING_SOON[parts[1]].title; renderSoon(parts[1]); }
  else { location.hash = '#/'; }
}

/* ---------------- শীঘ্রই আসছে ফিচার ---------------- */
const COMING_SOON = {
  results: {
    icon: '🏆', title: 'ফলাফল',
    desc: 'প্রতিটা পরীক্ষার ফল এখানে দেখতে পাবেন — কোন বিষয়ে কেমন করলো, বিষয়ভিত্তিক সাজানো থাকবে। মাদ্রাসা থেকে দেওয়া কোড দিয়ে শুধু নিজের সন্তানের ফল দেখা যাবে।'
  },
  calendar: {
    icon: '🗓️', title: 'ক্যালেন্ডার',
    desc: 'পুরো বছরের ছুটি, পরীক্ষা, বই বিতরণ, ইসলামিক অনুষ্ঠান — সব এক ক্যালেন্ডারে এক নজরে দেখতে পাবেন।'
  },
  gallery: {
    icon: '📸', title: 'ছবির গ্যালারি',
    desc: 'চালু হলে এখানে দেখতে পাবেন এই মাদ্রাসার বিভিন্ন অনুষ্ঠান, ক্রীড়া প্রতিযোগিতা, বিজয়ী শিক্ষার্থীদের মুহূর্তসহ স্মৃতিচিত্র।'
  }
};

function renderSoon(key) {
  const f = COMING_SOON[key];
  if (!f) { location.hash = '#/'; return; }
  view.innerHTML = `
    <div class="card" style="text-align:center;padding:36px 22px">
      <div style="font-size:3.2rem">${f.icon}</div>
      <h3 style="margin-top:10px;font-size:1.3rem;color:var(--ink)">${f.title}</h3>
      <span class="soon-badge">🚧 এই ফিচারটি খুব শীঘ্রই চালু হবে</span>
      <p style="margin-top:14px;color:var(--ink-soft);line-height:1.8">${f.desc}</p>
    </div>`;
}

/* ---------------- নোটিশ ব্যাজ (কতগুলো নতুন নোটিশ দেখেনি) ---------------- */
/* ---------------- নোটিশ ব্যাজ ----------------
   নিয়ম: প্রতিটা নোটিশ ৩ বার নোটিশ পাতায় দেখা না হলে ব্যাজ থাকবে।
   ৩ বার দেখার পর সেই নোটিশের ব্যাজ চলে যাবে।
   নতুন নোটিশ এলে তার গোনা শূন্য থেকে শুরু — আবার ব্যাজ দেখাবে। */
const NOTICE_VIEWS_KEY = 'moddodanga_notice_views';
const NOTICE_VIEWS_NEEDED = 3;

function getNoticeViews() {
  try { return JSON.parse(localStorage.getItem(NOTICE_VIEWS_KEY)) || {}; } catch { return {}; }
}
function saveNoticeViews(v) {
  // পুরনো এন্ট্রি ছেঁটে ফেলি — স্টোরেজ যেন না ভরে
  const keys = Object.keys(v);
  if (keys.length > 80) {
    const trimmed = {};
    keys.slice(-80).forEach(k => trimmed[k] = v[k]);
    v = trimmed;
  }
  localStorage.setItem(NOTICE_VIEWS_KEY, JSON.stringify(v));
}
/* নোটিশ পাতা খোলার সময় ডাকা হয় — প্রতিটা নোটিশের গোনা ১ বাড়ায় */
function countNoticeView(ids) {
  const v = getNoticeViews();
  ids.forEach(id => {
    v[id] = Math.min(NOTICE_VIEWS_NEEDED, (v[id] || 0) + 1);
  });
  saveNoticeViews(v);
}
/* যেসব নোটিশ এখনো ৩ বার দেখা হয়নি — তাদের সংখ্যা */
async function getUnreadNoticeCount() {
  try {
    const list = await DB.getNotices();
    if (!list || !list.length) return 0;
    const v = getNoticeViews();
    return list.filter(n => (v[n.id] || 0) < NOTICE_VIEWS_NEEDED).length;
  } catch { return 0; }
}

/* ---------------- হোম ---------------- */
async function renderHome(profile) {
  // নতুন নোটিশ কয়টা দেখেনি — ব্যাজে দেখাবে
  const noticeCount = await getUnreadNoticeCount();

  // অভিভাবকের মনে প্রশ্ন আসার ক্রমে সাজানো
  const sections = [
    {
      title: '📌 আজকের খবর',
      items: [
        { icon: '📖', label: 'আজকে ক্লাসে কী পড়া (হোমওয়ার্ক)', go: '#/homework', sound: 'homework' },
        { icon: '📢', label: 'নোটিশ', go: '#/notices', sound: 'notices', badge: noticeCount },
        { icon: '📅', label: 'ক্লাস রুটিন', go: '#/routine', sound: 'routine' }
      ]
    },
    {
      title: '🗓️ সামনে কী আছে',
      items: [
        { icon: '📝', label: 'পরীক্ষার রুটিন', go: '#/page/exam', sound: 'exam' },
        { icon: '🏆', label: 'ফলাফল', soon: 'results', sound: 'soon' },
        { icon: '🎉', label: 'ছুটির তালিকা', go: '#/page/holidays', sound: 'holidays' }
      ]
    },
    {
      title: '🌟 পরে দেখার জিনিস',
      items: [
        { icon: '👨‍🏫', label: 'শিক্ষকমন্ডলী', go: '#/teachers', sound: 'teachers' },
        { icon: '📚', label: 'বই ও স্টেশনারি', go: '#/page/stipend', sound: 'stipend' },
        { icon: '📸', label: 'ছবির গ্যালারি', soon: 'gallery', sound: 'soon' }
      ]
    }
  ];

  view.innerHTML = `
    <div class="home-hello">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
        <div style="flex:1">
          <h2>আসসালামু আলাইকুম! 🌿</h2>
          <p>${esc(profile.studentName)} — ${CLASS_LABEL[profile.classId]}</p>
          <button class="edit-profile" id="editProfile" data-sound="tap">✏️ নাম ঠিকানা বদলাতে চাইলে</button>
        </div>
        <button id="muteBtn" class="mute-btn" type="button" aria-label="সাউন্ড অন বা অফ" style="background:${isMuted() ? '#ECEFF1' : 'var(--green-light, #E8F5E9)'}; color:${isMuted() ? '#546E7A' : 'var(--green-dark, #1B5E20)'}; border:1px solid ${isMuted() ? '#CFD8DC' : '#C8E6C9'}; border-radius:20px; padding:6px 14px; font-size:0.82rem; font-weight:600; cursor:pointer; display:inline-flex; align-items:center; gap:5px; flex-shrink:0; box-shadow:0 1px 3px rgba(0,0,0,0.06); user-select:none;">
          ${isMuted() ? '🔇 সাউন্ড বন্ধ' : '🔊 সাউন্ড চালু'}
        </button>
      </div>
    </div>

    ${deferredInstall && !isStandalone() ? `<button class="install-btn" id="installBtn" data-sound="tap">📲 ফোনের হোম স্ক্রিনে অ্যাপ রাখুন</button>` : ''}
    ${!deferredInstall && !isStandalone() ? `<div class="install-hint" id="installHint" style="background:var(--green-light);border:1.5px solid #C8E6C9;border-radius:12px;padding:14px 16px;margin-bottom:16px;font-size:.92rem;color:var(--green-dark);">
      <b style="font-size:1rem;">📲 অ্যাপ হোম স্ক্রিনে রাখুন</b><br>
      <span style="display:block;margin-top:4px;line-height:1.6;">Chrome ব্রাউজারে খুলুন → উপরে ডানদিকে <b>⋮</b> চাপুন → <b>"Add to Home screen"</b> বা <b>"অ্যাপ ইনস্টল করুন"</b> চাপুন। তাহলে অ্যাপ আইকন ফোনে বসে যাবে।</span>
    </div>` : ''}

    <button class="homework-hero" data-sound="homework" onclick="location.hash='#/homework'">
      <span class="hero-icon">📖</span>
      <span class="hero-text"><b>আজকের হোমওয়ার্ক</b><span>আজ ক্লাসে কী পড়া হয়েছে দেখুন</span></span>
    </button>

    ${sections.map(sec => `
      <div class="section-title">${sec.title}</div>
      <div class="menu-grid">
        ${sec.items.map(m => m.soon
    ? `<div class="menu-item soon" data-sound="${m.sound || 'soon'}" onclick="location.hash='#/soon/${m.soon}'">
               <span class="mi-icon">${m.icon}</span><span class="mi-label">${m.label}</span>
               <span class="badge-soon">শীঘ্রই আসছে</span>
             </div>`
    : `<div class="menu-item" data-sound="${m.sound || 'tap'}" onclick="location.hash='${m.go}'">
               <span class="mi-icon">${m.icon}</span><span class="mi-label">${m.label}</span>
               ${m.badge ? `<span class="notice-badge">${m.badge > 99 ? '৯৯+' : bn(m.badge)}</span>` : ''}
             </div>`).join('')}
      </div>`).join('')}

    <div class="talk-section">
      <h3>💬 কথা বলুন</h3>
      <div class="talk-btns">
        <div class="talk-btn" data-sound="complaint" onclick="location.hash='#/complaint'">✍️ <span>অভিযোগ / মতামত<small>লিখে পাঠালে সরাসরি হোয়াটসঅ্যাপে পৌঁছে যাবে</small></span></div>
        <a class="talk-btn" data-sound="contact" href="${SCHOOL.whatsapp}" target="_blank" rel="noopener">🟢 <span>হোয়াটসঅ্যাপে মেসেজ দিন<span class="try-first">প্রথমে এখানে চেষ্টা করুন</span><small>মেসেজ করলে কয়েক মিনিট থেকে কয়েক ঘণ্টার মধ্যেই উত্তর পেয়ে যাবেন</small></span></a>
        <button class="talk-btn" data-sound="contact" id="imoBtn" style="width:100%;text-align:left">🔵 <span>ইমোতে মেসেজ দিন<small>ইমোতে পেতে হলে আগে নম্বরটি (${bn(SCHOOL.phone)}) সেভ করে নিতে হবে — চাপ দিলে নম্বর কপি হবে</small></span></button>
      </div>
    </div>
  `;

  const mb = document.getElementById('muteBtn');
  if (mb) {
    mb.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      toggleMute();
    });
  }

  document.getElementById('imoBtn').addEventListener('click', async function () {
    try { await navigator.clipboard.writeText(SCHOOL.phone); } catch { }
    const small = this.querySelector('small');
    const old = small.textContent;
    small.textContent = '✅ নম্বর কপি হয়ে গেছে! এবার ইমো খুলে নম্বরটি সেভ করে মেসেজ দিন।';
    small.style.color = 'var(--green-dark)'; small.style.fontWeight = '700';
    setTimeout(() => { small.textContent = old; small.style.color = ''; small.style.fontWeight = ''; }, 5000);
  });

  document.getElementById('editProfile').addEventListener('click', () => openRegister(true));

  const ib = document.getElementById('installBtn');
  if (ib) ib.addEventListener('click', async () => {
    if (!deferredInstall) return;
    deferredInstall.prompt();
    await deferredInstall.userChoice;
    deferredInstall = null;
    render();
  });
}

/* ---------------- প্রোফাইল বদলানো (রেজিস্ট্রেশন আবার খোলা) ---------------- */
function openRegister(edit) {
  const reg = document.getElementById('screen-register');
  if (edit) {
    const p = getProfile();
    if (p) {
      document.getElementById('regStudent').value = p.studentName || '';
      document.getElementById('regFather').value = p.fatherName || '';
      document.getElementById('regPhone').value = p.phone || '';
      document.querySelectorAll('#regClassPicker .class-btn').forEach(b =>
        b.classList.toggle('selected', b.dataset.class === p.classId));
      const btn = document.querySelector(`#regClassPicker .class-btn[data-class="${p.classId}"]`);
      if (btn) btn.click();
    }
    reg.querySelector('h2').textContent = 'তথ্য ঠিক করুন';
  }
  /* ক্যানসেল বাটন — edit মোডে দেখাবে, চাপলে হোমে ফিরবে */
  const cancelBtn = document.getElementById('regCancel');
  cancelBtn.hidden = !edit;
  if (edit) {
    cancelBtn.onclick = () => {
      reg.classList.remove('active');
      enterApp();
    };
  }
  appbar.hidden = true; view.hidden = true; appFooter.hidden = true; homeFab.hidden = true;
  reg.classList.add('active');
}

/* ---------------- শ্রেণি বাছাই (হোমওয়ার্ক) ---------------- */
function renderClassPick(profile, mode) {
  view.innerHTML = `
    <p class="meta-line">কোন শ্রেণির হোমওয়ার্ক দেখতে চান?</p>
    <div class="class-list">
      ${CLASS_ORDER.map(c => `
        <div class="class-row ${String(c) === profile.classId ? 'child-class' : ''}"
             onclick="location.hash='#/${mode}/${c}'">
          <span>${CLASS_LABEL[c]}</span>
          ${String(c) === profile.classId ? '<span class="child-tag">আপনার সন্তান</span>' : '<span class="arrow">›</span>'}
        </div>`).join('')}
    </div>`;
}

/* ---------------- হোমওয়ার্ক বিস্তারিত ---------------- */
async function renderHomeworkDetail(classId) {
  view.innerHTML = '<div class="loading">হোমওয়ার্ক আনা হচ্ছে…</div>';
  const subjects = SUBJECTS_BY_CLASS[classId] || [];

  let hw = null, label = 'আজকের হোমওয়ার্ক', date = todayStr(), netErr = false;
  try {
    hw = await DB.getHomework(classId, date);
    if (!hw) { date = yesterdayStr(); label = 'গতকালের হোমওয়ার্ক'; hw = await DB.getHomework(classId, date); }
  } catch (e) { console.warn(e); netErr = true; }

  if (netErr) {
    view.innerHTML = `<div class="empty-note">📶 হোমওয়ার্ক আনা যায়নি।<br>ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</div>`;
    return;
  }

  if (!hw) {
    view.innerHTML = `
      <p class="meta-line">${CLASS_LABEL[classId]} • ${bnDate(todayStr())}</p>
      <div class="empty-note">😔 আজকের হোমওয়ার্ক এখনো আসেনি।<br>সন্ধ্যার দিকে আবার দেখুন।</div>`;
    return;
  }

  view.innerHTML = `
    <p class="meta-line">${label} • ${bnDate(hw.date)} • শেষ হালনাগাদ: ${bnUpdated(hw.updatedAt)}</p>
    ${subjects.map(s => {
    const t = (hw.subjects || {})[s];
    return `<div class="card subject-card ${t ? '' : 'empty'}">
        <div class="sub-name">${s}</div>
        ${t ? `<div class="sub-hw">${esc(t)}</div>` : '<div class="sub-none">আজ এই বিষয়ে পড়া নেই</div>'}
      </div>`;
  }).join('')}`;
}

/* ---------------- নোটিশ ---------------- */
async function renderNotices() {
  view.innerHTML = '<div class="loading">নোটিশ আনা হচ্ছে…</div>';
  let list = [], netErr = false;
  try { list = await DB.getNotices(); } catch (e) { console.warn(e); netErr = true; }

  // নোটিশ পাতা খোলা হলো — প্রতিটা নোটিশের দেখা-গোনা ১ বাড়ালাম
  // (৩ বার হলে ব্যাজ চলে যাবে)
  if (list && list.length) countNoticeView(list.map(n => n.id));

  if (netErr) {
    view.innerHTML = '<div class="empty-note">📶 নোটিশ আনা যায়নি।<br>ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</div>';
    return;
  }

  if (!list.length) {
    view.innerHTML = '<div class="empty-note">📢 এখনো কোনো নোটিশ আসেনি।<br>মাদ্রাসা থেকে নতুন খবর এলে এখানেই দেখা যাবে।</div>';
    return;
  }
  view.innerHTML = list.map(n => `
    <div class="card ${n.urgent ? 'notice-urgent' : 'notice-normal'}">
      <div class="notice-title">${esc(n.title)}
        ${n.urgent ? '<span class="urgent-tag">জরুরি</span>' : ''}
        ${n.forClass && n.forClass !== 'all' ? `<span class="class-tag">${CLASS_LABEL[n.forClass]}</span>` : ''}
      </div>
      <div class="notice-date">${bnUpdated(n.createdAt)}</div>
      <div class="notice-body">${esc(n.body)}</div>
    </div>`).join('');
}

/* ---------------- শিক্ষকমন্ডলী ---------------- */
async function renderTeachers() {
  view.innerHTML = '<div class="loading">শিক্ষকমন্ডলীর তথ্য আনা হচ্ছে…</div>';
  let teachers = [];
  try {
    teachers = await DB.getTeachers();
  } catch (e) {
    console.warn(e);
  }
  if (!teachers || !teachers.length) teachers = DEFAULT_TEACHERS;

  view.innerHTML = `
    <p class="teacher-intro">🌿 মধ্যডাঙ্গা পুরুষ মাদ্রাসা (নূরানি বিভাগ)-এর নিবেদিতপ্রাণ ও অভিজ্ঞ সম্মানিত শিক্ষকমন্ডলীর পরিচয়:</p>
    <div class="teacher-list">
      ${teachers.map(t => `
        <article class="teacher-card">
          <div class="teacher-header">
            <div class="teacher-photo-wrap">
              <img src="${esc(t.photo || 'assets/logo.jpg')}" alt="${esc(t.name)}" class="teacher-photo" onerror="this.src='assets/logo.jpg'">
            </div>
            <div class="teacher-info-head">
              <h1 class="teacher-name">${esc(t.name)}</h1>
              ${t.designation ? `<span class="teacher-badge">${esc(t.designation)}</span>` : ''}
            </div>
          </div>
          <div class="teacher-body">
            ${t.qualification ? `<p class="teacher-p"><strong>🎓 শিক্ষাগত যোগ্যতা:</strong> ${esc(t.qualification)}</p>` : ''}
            ${t.identity ? `<p class="teacher-p"><strong>💼 পরিচয় ও দায়িত্ব:</strong> ${esc(t.identity)}</p>` : ''}
            ${t.address ? `<p class="teacher-p"><strong>📍 ঠিকানা:</strong> ${esc(t.address)}</p>` : ''}
            ${t.phone ? `<p class="teacher-p"><strong>📞 যোগাযোগ:</strong> <a href="tel:${t.phone}" class="teacher-phone">${bn(t.phone)}</a></p>` : ''}
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

/* ---------- সাধারণ পাতা (পরীক্ষা/ছুটি/উপবৃত্তি) ---------- */
async function renderPage(key) {
  view.innerHTML = '<div class="loading">তথ্য আনা হচ্ছে…</div>';
  let p = null, netErr = false;
  try { p = await DB.getPage(key); } catch (e) { console.warn(e); netErr = true; }

  if (netErr) {
    view.innerHTML = '<div class="empty-note">📶 তথ্য আনা যায়নি।<br>ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</div>';
    return;
  }

  view.innerHTML = p && p.body
    ? `${p.updatedAt ? `<p class="meta-line">শেষ হালনাগাদ: ${bnUpdated(p.updatedAt)}</p>` : ''}
       <div class="card"><div class="page-body">${esc(p.body)}</div></div>`
    : '<div class="empty-note">এখনো কোনো তথ্য দেওয়া হয়নি।</div>';
}

/* ---------------- ক্লাস রুটিন ---------------- */
async function renderRoutine(profile, selected) {
  const cur = selected || profile.classId;
  view.innerHTML = `
    <div class="class-picker" style="max-width:320px;margin-bottom:16px">
      ${CLASS_ORDER.map(c => `<button class="class-btn ${String(c) === cur ? 'selected' : ''}" data-c="${c}">${CLASS_LABEL[c]}</button>`).join('')}
    </div>
    <div id="routineBody"><div class="loading">রুটিন আনা হচ্ছে…</div></div>`;

  document.querySelectorAll('#view .class-btn').forEach(b =>
    b.addEventListener('click', () => renderRoutine(profile, b.dataset.c)));

  let r = null, netErr = false;
  try { r = await DB.getRoutine(cur); } catch (e) { console.warn(e); netErr = true; }
  document.getElementById('routineBody').innerHTML = netErr
    ? '<div class="empty-note">📶 রুটিন আনা যায়নি।<br>ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।</div>'
    : r && r.body
      ? `<div class="card"><h3>${CLASS_LABEL[cur]}</h3><div class="page-body" style="margin-top:8px">${esc(r.body)}</div></div>`
      : `<div class="empty-note">${CLASS_LABEL[cur]}-এর রুটিন এখনো দেওয়া হয়নি।</div>`;
}

/* ---------------- অভিযোগ / মতামত (হোয়াটসঅ্যাপে পাঠায়) ---------------- */
function renderComplaint(profile) {
  view.innerHTML = `
    <div class="card">
      <h3>✍️ অভিযোগ বা মতামত লিখুন</h3>
      <p class="meta-line" style="margin:6px 0 14px">আপনার কথা সরাসরি হোয়াটসঅ্যাপে মাদ্রাসা কর্তৃপক্ষের কাছে পৌঁছে যাবে।</p>
      <form id="complaintForm">
        <label class="field"><span class="field-label">আপনার নাম</span>
          <input type="text" id="cpName" value="${esc(profile.fatherName)}"></label>
        <label class="field"><span class="field-label">আপনার অভিযোগ / মতামত</span>
          <textarea id="cpMsg" placeholder="এখানে লিখুন…"></textarea></label>
        <p class="form-error" id="cpErr" hidden></p>
        <button type="submit" class="btn btn-primary">হোয়াটসঅ্যাপে পাঠান 📨</button>
      </form>
    </div>`;

  document.getElementById('complaintForm').addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('cpName').value.trim();
    const msg = document.getElementById('cpMsg').value.trim();
    const err = document.getElementById('cpErr');
    if (!msg) return showErr(err, 'অভিযোগ / মতামত লিখুন');

    /* ব্যাকআপ হিসেবে ডেটাবেসেও রাখি */
    try { await DB.submitComplaint({ name: name || 'অভিভাবক', classId: profile.classId, message: msg }); } catch (e2) { console.warn('complaint save', e2); }

    playServiceSound('success');

    /* হোয়াটসঅ্যাপে পাঠাই */
    const waMsg = `*অভিযোগ / মতামত*\n\nনাম: ${name || 'অভিভাবক'}\nশ্রেণি: ${CLASS_LABEL[profile.classId]}\n\n${msg}`;
    window.open(`${SCHOOL.whatsapp}?text=${encodeURIComponent(waMsg)}`, '_blank');

    view.innerHTML = `
      <div class="card" style="text-align:center;padding:34px 18px">
        <div style="font-size:2.6rem">✅</div>
        <h3 style="margin-top:8px">হোয়াটসঅ্যাপে পাঠানো হচ্ছে</h3>
        <p class="meta-line" style="margin-top:6px">জাজাকাল্লাহ খাইর! হোয়াটসঅ্যাপ খুলবে — সেখান থেকে "পাঠান" চাপুন।</p>
        <button class="btn btn-outline" style="margin-top:16px" onclick="location.hash='#/'">হোমে ফিরুন</button>
      </div>`;
  });
}

/* ============================================================
   অ্যাডমিন প্যানেল
   ============================================================ */
function renderAdmin() {
  if (adminUser) return renderAdminPanel();

  view.innerHTML = `
    <div class="card">
      <h3>🔐 শিক্ষক / অ্যাডমিন লগইন</h3>
      <p class="meta-line" style="margin:6px 0 14px">এই অংশ শুধু মাদ্রাসার জন্য। অভিভাবকদের এখানে কিছু করার নেই।</p>
      ${DB.isDemo ? `
        <p class="meta-line" style="margin-bottom:12px">ডেমো মোডে লগইন লাগবে না —</p>
        <button class="btn btn-primary" id="demoLogin">ডেমো অ্যাডমিন হিসেবে ঢুকুন</button>
      ` : `
      <form id="loginForm">
        <label class="field"><span class="field-label">ইমেইল</span>
          <input type="email" id="adEmail" autocomplete="username"></label>
        <label class="field"><span class="field-label">পাসওয়ার্ড</span>
          <input type="password" id="adPass" autocomplete="current-password"></label>
        <p class="form-error" id="adErr" hidden></p>
        <button type="submit" class="btn btn-primary">ঢুকুন</button>
      </form>`}
    </div>`;

  if (DB.isDemo) {
    document.getElementById('demoLogin').addEventListener('click', async () => {
      adminUser = await DB.adminLogin();
      renderAdminPanel();
    });
  } else {
    document.getElementById('loginForm').addEventListener('submit', async e => {
      e.preventDefault();
      const err = document.getElementById('adErr');
      try {
        adminUser = await DB.adminLogin(
          document.getElementById('adEmail').value.trim(),
          document.getElementById('adPass').value);
        renderAdminPanel();
      } catch (e2) {
        const code = e2.code || '';
        showErr(err,
          e2.message === 'no-admin'
            ? 'লগইন হয়েছে, কিন্তু অ্যাডমিন অনুমতি নেই — SETUP.md-এর ধাপ ৫.২ অনুযায়ী admins কালেকশনে আপনার UID যোগ করা আছে কি না দেখুন।'
            : code === 'auth/invalid-email'
              ? 'ইমেইল ঠিক নেই — পুরো ইমেইল লিখুন (যেমন: naam@gmail.com)।'
              : code === 'auth/user-not-found'
                ? 'এই ইমেইলে কোনো অ্যাকাউন্ট নেই — Firebase Console → Authentication → Users-এ আগে অ্যাকাউন্ট বানান (SETUP.md ধাপ ৫)।'
                : code === 'auth/wrong-password' || code === 'auth/invalid-credential'
                  ? 'ইমেইল বা পাসওয়ার্ড মিলছে না — আবার চেষ্টা করুন।'
                  : 'লগইন হয়নি। ইন্টারনেট দেখে আবার চেষ্টা করুন। (' + code + ')');
      }
    });
  }
}

let adminTab = 'homework';
function renderAdminPanel() {
  const tabs = [
    ['homework', '📖 হোমওয়ার্ক'], ['notice', '📢 নোটিশ'], ['routine', '📅 রুটিন'],
    ['pages', '📄 ঘোষণা'], ['complaints', '✉️ অভিযোগ']
  ];
  view.innerHTML = `
    <div class="admin-head">
      <h3>👋 ${esc(adminUser.name || 'অ্যাডমিন')}</h3>
      <button class="logout-btn" id="adminLogout">বের হোন</button>
    </div>
    <div class="admin-tabs">
      ${tabs.map(([k, l]) => `<button class="admin-tab ${k === adminTab ? 'active' : ''}" data-tab="${k}">${l}</button>`).join('')}
    </div>
    <div id="adminBody"></div>`;

  document.getElementById('adminLogout').addEventListener('click', async () => {
    try { await DB.adminLogout(); } catch { }
    adminUser = null; location.hash = '#/';
  });
  document.querySelectorAll('.admin-tab').forEach(t =>
    t.addEventListener('click', () => { adminTab = t.dataset.tab; renderAdminPanel(); }));

  const body = document.getElementById('adminBody');
  if (adminTab === 'homework') adminHomework(body);
  else if (adminTab === 'notice') adminNotice(body);
  else if (adminTab === 'routine') adminRoutine(body);
  else if (adminTab === 'pages') adminPages(body);
  else if (adminTab === 'complaints') adminComplaints(body);
}

/* ----- অ্যাডমিন: হোমওয়ার্ক ----- */
function adminHomework(body) {
  body.innerHTML = `
    <div class="card">
      <div class="admin-row">
        <label class="field"><span class="field-label">শ্রেণি</span>
          <select id="ahClass">${CLASS_ORDER.map(c => `<option value="${c}">${CLASS_LABEL[c]}</option>`).join('')}</select></label>
        <label class="field"><span class="field-label">তারিখ</span>
          <input type="date" id="ahDate" value="${todayStr()}"></label>
      </div>
      <div id="ahSubjects"></div>
      <button class="btn btn-primary" id="ahSave">প্রকাশ করুন ✅</button>
      <p class="save-ok" id="ahOk" hidden>সেভ হয়েছে! অভিভাবকরা এখনই দেখতে পাবেন।</p>
    </div>`;

  const classSel = document.getElementById('ahClass');
  const dateIn = document.getElementById('ahDate');

  async function load() {
    const cid = classSel.value, date = dateIn.value;
    const subjects = SUBJECTS_BY_CLASS[cid];
    let hw = null;
    try { hw = await DB.getHomework(cid, date); } catch { }
    document.getElementById('ahSubjects').innerHTML = subjects.map(s => `
      <label class="field"><span class="field-label">${s}</span>
        <textarea data-subject="${s}" placeholder="এই বিষয়ে পড়া না থাকলে ফাঁকা রাখুন">${esc((hw?.subjects || {})[s] || '')}</textarea></label>`).join('');
    document.getElementById('ahOk').hidden = true;
  }
  classSel.addEventListener('change', load);
  dateIn.addEventListener('change', load);

  document.getElementById('ahSave').addEventListener('click', async () => {
    const subjects = {};
    document.querySelectorAll('#ahSubjects textarea').forEach(t => {
      const v = t.value.trim();
      if (v) subjects[t.dataset.subject] = v;
    });
    await DB.saveHomework(classSel.value, dateIn.value, subjects);
    document.getElementById('ahOk').hidden = false;
    playServiceSound('success');
  });

  load();
}

/* ----- অ্যাডমিন: নোটিশ ----- */

// নমুনা নোটিশ — নতুন অ্যাডমিনদের শেখানোর জন্য
const SAMPLE_NOTICES = [
  {
    title: 'নতুন বই বিতরণ',
    body: 'আগামী রবিবার সকাল ১০টা থেকে নতুন শ্রেণির বই বিতরণ করা হবে। সব শিক্ষার্থীকে মাদ্রাসায় উপস্থিত থাকতে হবে।',
    urgent: false, forClass: 'all'
  },
  {
    title: 'অভিভাবক সমাবেশ',
    body: 'আগামী বুধবার সকাল ১১টায় অভিভাবক সমাবেশ অনুষ্ঠিত হবে। সব অভিভাবককে উপস্থিত থাকার জন্য বিশেষভাবে অনুরোধ করা হলো।',
    urgent: true, forClass: 'all'
  }
];

async function adminNotice(body) {
  body.innerHTML = `
    <div class="card" style="background:var(--green-light);border:1.5px dashed var(--green)">
      <h3>📚 কীভাবে নোটিশ দেবেন</h3>
      <p class="meta-line" style="margin-top:6px">
        ১) নিচের ফর্মে <b>শিরোনাম</b> (ছোট শিরোনাম) ও <b>বিস্তারিত</b> (পুরো খবর) লিখুন।<br>
        ২) জরুরি খবর হলে <b>"জরুরি"</b> টিক দিন — লাল রঙে দেখাবে।<br>
        ৩) <b>"প্রকাশ করুন"</b> চাপলেই সব অভিভাবকের অ্যাপের নোটিশ পাতায় চলে যাবে।<br>
        প্রথমবার বুঝতে চাইলে নিচের সবুজ বাটনে চাপ দিন — ২টা নমুনা নোটিশ যোগ হবে, পরে মুছে দিতে পারবেন।
      </p>
      <button class="btn btn-outline btn-small" id="anDemo">🧪 ২টা নমুনা নোটিশ যোগ করুন</button>
    </div>
    <div class="card">
      <h3>নতুন নোটিশ</h3>
      <label class="field" style="margin-top:10px"><span class="field-label">শিরোনাম</span>
        <input type="text" id="anTitle" placeholder="যেমন: নতুন বই বিতরণ"></label>
      <label class="field"><span class="field-label">বিস্তারিত</span>
        <textarea id="anBody" placeholder="যেমন: আগামী রবিবার সকাল ১০টা থেকে নতুন শ্রেণির বই বিতরণ করা হবে। সব শিক্ষার্থীকে মাদ্রাসায় উপস্থিত থাকতে হবে।"></textarea></label>
      <div class="admin-row">
        <label class="field"><span class="field-label">কার জন্য</span>
          <select id="anClass"><option value="all">সবার জন্য</option>
            ${CLASS_ORDER.map(c => `<option value="${c}">${CLASS_LABEL[c]}</option>`).join('')}</select></label>
        <label class="field" style="display:flex;align-items:flex-end;gap:8px;padding-bottom:12px">
          <input type="checkbox" id="anUrgent" style="width:22px;height:22px"> <b>জরুরি</b></label>
      </div>
      <button class="btn btn-primary" id="anSave">প্রকাশ করুন 📢</button>
      <p class="save-ok" id="anOk" hidden>নোটিশ প্রকাশিত হয়েছে! অভিভাবকরা এখনই দেখতে পাবেন।</p>
      <p class="form-error" id="anErr" hidden></p>
    </div>
    <div class="card"><h3>পুরোনো নোটিশ</h3><div id="anList"><div class="loading"></div></div></div>`;

  const err = document.getElementById('anErr');

  document.getElementById('anSave').addEventListener('click', async () => {
    const title = document.getElementById('anTitle').value.trim();
    const bodyText = document.getElementById('anBody').value.trim();
    if (!title || !bodyText) return showErr(err, 'শিরোনাম ও বিস্তারিত — দুটোই লিখুন');
    try {
      await DB.addNotice({ title, body: bodyText, urgent: document.getElementById('anUrgent').checked, forClass: document.getElementById('anClass').value });
      err.hidden = true;
      document.getElementById('anOk').hidden = false;
      document.getElementById('anTitle').value = '';
      document.getElementById('anBody').value = '';
      document.getElementById('anUrgent').checked = false;
      playServiceSound('success');
      loadList();
    } catch (e) { showErr(err, 'প্রকাশ হয়নি — ইন্টারনেট দেখে আবার চেষ্টা করুন।'); }
  });

  document.getElementById('anDemo').addEventListener('click', async () => {
    try {
      for (const n of SAMPLE_NOTICES) await DB.addNotice(n);
      loadList();
      showOkOnce();
    } catch (e) { showErr(err, 'নমুনা যোগ হয়নি — ইন্টারনেট দেখুন।'); }
  });
  function showOkOnce() {
    const ok = document.getElementById('anOk');
    ok.textContent = '✅ নমুনা নোটিশ যোগ হয়েছে! হোম → নোটিশ পাতায় গিয়ে দেখুন। (পরে নিচে থেকে মুছে দিতে পারবেন)';
    ok.hidden = false;
  }

  async function loadList() {
    let list = [];
    try { list = await DB.getNotices(); } catch (e) { console.warn(e); }
    document.getElementById('anList').innerHTML = list.length
      ? list.map(n => `<div class="admin-list-item">
          <div><b>${esc(n.title)}</b>
            ${n.urgent ? '<span class="urgent-tag">জরুরি</span>' : ''}
            <div class="notice-date">${bnUpdated(n.createdAt)}</div></div>
          <button class="del" data-id="${n.id}">মুছুন</button></div>`).join('')
      : '<p class="meta-line">কোনো নোটিশ নেই</p>';
    document.querySelectorAll('#anList .del').forEach(b =>
      b.addEventListener('click', async () => {
        if (confirm('নোটিশটি মুছে ফেলবেন?')) { await DB.deleteNotice(b.dataset.id); loadList(); }
      }));
  }
  loadList();
}

/* ----- অ্যাডমিন: রুটিন ----- */
function adminRoutine(body) {
  body.innerHTML = `
    <div class="card">
      <label class="field"><span class="field-label">শ্রেণি</span>
        <select id="arClass">${CLASS_ORDER.map(c => `<option value="${c}">${CLASS_LABEL[c]}</option>`).join('')}</select></label>
      <label class="field"><span class="field-label">রুটিন (প্রতি লাইনে একটা পিরিয়ড)</span>
        <textarea id="arBody" style="min-height:180px"></textarea></label>
      <button class="btn btn-primary" id="arSave">সেভ করুন</button>
      <p class="save-ok" id="arOk" hidden>রুটিন সেভ হয়েছে!</p>
    </div>`;
  const sel = document.getElementById('arClass');
  async function load() {
    const r = await DB.getRoutine(sel.value);
    document.getElementById('arBody').value = r?.body || '';
    document.getElementById('arOk').hidden = true;
  }
  sel.addEventListener('change', load);
  document.getElementById('arSave').addEventListener('click', async () => {
    await DB.saveRoutine(sel.value, document.getElementById('arBody').value.trim());
    document.getElementById('arOk').hidden = false;
    playServiceSound('success');
  });
  load();
}

/* ----- অ্যাডমিন: ঘোষণা (পরীক্ষা/ছুটি/উপবৃত্তি) ----- */
function adminPages(body) {
  body.innerHTML = `
    <div class="card">
      <label class="field"><span class="field-label">কোন পাতা</span>
        <select id="apKey">${Object.entries(PAGES).map(([k, p]) => `<option value="${k}">${p.icon} ${p.title}</option>`).join('')}</select></label>
      <label class="field"><span class="field-label">তথ্য</span>
        <textarea id="apBody" style="min-height:180px"></textarea></label>
      <button class="btn btn-primary" id="apSave">সেভ করুন</button>
      <p class="save-ok" id="apOk" hidden>সেভ হয়েছে!</p>
    </div>`;
  const sel = document.getElementById('apKey');
  async function load() {
    const p = await DB.getPage(sel.value);
    document.getElementById('apBody').value = p?.body || '';
    document.getElementById('apOk').hidden = true;
  }
  sel.addEventListener('change', load);
  document.getElementById('apSave').addEventListener('click', async () => {
    await DB.savePage(sel.value, document.getElementById('apBody').value.trim());
    document.getElementById('apOk').hidden = false;
    playServiceSound('success');
  });
  load();
}

/* ----- অ্যাডমিন: অভিযোগ তালিকা ----- */
async function adminComplaints(body) {
  body.innerHTML = '<div class="loading">অভিযোগ আনা হচ্ছে…</div>';
  let list = [];
  try { list = await DB.getComplaints(); } catch (e) { console.warn(e); }
  body.innerHTML = list.length
    ? list.map(c => `<div class="card complaint-item">
        <div class="who">${esc(c.name)} <span class="class-tag">${CLASS_LABEL[c.classId] || ''}</span></div>
        <div class="when">${bnUpdated(c.createdAt)}</div>
        <div class="msg">${esc(c.message)}</div>
      </div>`).join('')
    : '<div class="empty-note">কোনো অভিযোগ আসেনি।</div>';
}

/* ============================================================
   ইনস্টল + সার্ভিস ওয়ার্কার
   ============================================================ */

/* অ্যাপ ইতিমধ্যে ইনস্টল হয়েছে কিনা চেক (standalone mode) */
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.startsWith('android-app://');
}

/* স্প্ল্যাশের পর ইনস্টল প্রম্পট দেখাও */
function showInstallPrompt() {
  const splash = document.getElementById('screen-splash');
  const btn = document.getElementById('splashInstall');
  if (!btn) return;

  // স্প্ল্যাশ স্ক্রিন রাখো, ইনস্টল বাটন দেখাও
  splash.classList.add('active');
  btn.hidden = false;

  btn.addEventListener('click', async function handleInstall() {
    btn.removeEventListener('click', handleInstall);
    if (deferredInstall) {
      btn.disabled = true;
      btn.textContent = '⏳ ইনস্টল হচ্ছে…';
      deferredInstall.prompt();
      const choice = await deferredInstall.userChoice;
      deferredInstall = null;
      btn.hidden = true;
      // ইনস্টল করুন চাপলে বা বাতিল করলে — অ্যাপে ঢুকে পড়ো
      splash.classList.remove('active');
      if (getProfile()) enterApp();
      else document.getElementById('screen-register').classList.add('active');
    } else {
      btn.hidden = true;
      splash.classList.remove('active');
      if (getProfile()) enterApp();
      else document.getElementById('screen-register').classList.add('active');
    }
  }, { once: true });
}

function setupInstall() {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredInstall = e;
    const splash = document.getElementById('screen-splash');
    // স্প্ল্যাশ চলছে এবং ইউজার এখনো leave করে নি → ইনস্টল বাটন দেখাও
    if (splash && splash.classList.contains('active') && !isStandalone()) {
      showInstallPrompt();
      return;
    }
    // স্প্ল্যাশ শেষ হলে এবং অ্যাপে ঢুকে গেলে হোম পেজে বাটন দেখাও
    if (getProfile()) render();
  });

  // অ্যাপ ইন্সটল হয়ে গেলে
  window.addEventListener('appinstalled', () => {
    deferredInstall = null;
    const btn = document.getElementById('splashInstall');
    if (btn) btn.hidden = true;
  });

  // Service Worker রেজিস্টার করো — HTTPS বা localhost দুটোতেই
  const isSecureContext = location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if ('serviceWorker' in navigator && isSecureContext) {
    navigator.serviceWorker.register('sw.js').catch(() => { });
  }
}

/* ---------------- শুরু ---------------- */
document.addEventListener('DOMContentLoaded', boot);
