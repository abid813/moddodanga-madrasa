/* সার্ভিস ওয়ার্কার — অফলাইনে অ্যাপ খোলা রাখে + নতুন ভার্সন আসলে আপডেট হয় */
const CACHE = 'moddodanga-v6';
const APP_SHELL = [
  './',
  './index.html',
  './css/styles.css',
  './js/app.js',
  './js/firebase-config.js',
  './manifest.webmanifest',
  './manifest.json',
  './assets/logo.jpg',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/* Firebase CDN ফাইলগুলোও প্রিক্যাশ করো (প্রথম লোডে দ্রুত চলবে) */
const CDN_PRECACHE = [
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore-compat.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    Promise.all([
      caches.open(CACHE).then(c => c.addAll(APP_SHELL)),
      // CDN প্রিক্যাশ — একটা fail হলে পুরো install fail করবে না
      caches.open(CACHE).then(c =>
        Promise.allSettled(CDN_PRECACHE.map(url => c.add(url)))
      )
    ]).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Firestore/Google API কল (ডেটা রিড/রাইট) ক্যাশ করা হবে না — সরাসরি নেটওয়ার্ক
  if (url.hostname.includes('googleapis.com') && !url.hostname.includes('gstatic') && !url.hostname.includes('fonts')) {
    return;
  }

  // পাতা (navigation): নেট ফার্স্ট, fallback ক্যাশ
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // app.js / styles.css / firebase-config.js / manifest — নেট ফার্স্ট, cache fallback
  const isCoreAsset = [
    '/js/app.js',
    '/css/styles.css',
    '/js/firebase-config.js',
    '/manifest.webmanifest',
    '/manifest.json',
    '/sw.js'
  ].some(p => url.pathname.endsWith(p));

  if (isCoreAsset) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Firebase SDK (gstatic.com) — cache first (একবার লোড হলে ক্যাশ থেকেই চলবে)
  if (url.hostname.includes('gstatic.com') && url.pathname.includes('firebase')) {
    e.respondWith(
      caches.match(e.request).then(hit =>
        hit || fetch(e.request).then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        })
      )
    );
    return;
  }

  // ফন্ট — cache first, background update
  if (url.hostname.includes('fonts.g')) {
    e.respondWith(
      caches.match(e.request).then(hit => {
        if (hit) {
          // background update
          fetch(e.request).then(res => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then(c => c.put(e.request, copy));
            }
          }).catch(() => {});
          return hit;
        }
        return fetch(e.request).then(res => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, copy));
          }
          return res;
        });
      })
    );
    return;
  }

  // অন্যান্য স্ট্যাটিক — cache first, fallback network
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      if (res.ok && url.origin === location.origin) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => hit))
  );
});
