/* Alrayhan Sales — service worker
   Makes the app installable and lets the screens open quickly.
   Sales data (/api/...) is NEVER cached: it always comes live from the server,
   so every device sees the same, current records. */
'use strict';

const CACHE = 'ars-shell-v2';
const SHELL = [
  '/', '/index.html', '/style.css', '/app.js', '/logo.svg', '/manifest.webmanifest',
  '/icons/icon-192.png', '/icons/icon-512.png',
  '/fonts/IBMPlexSansArabic-Regular.ttf', '/fonts/IBMPlexSansArabic-Medium.ttf',
  '/fonts/IBMPlexSansArabic-Bold.ttf', '/fonts/ElMessiri.ttf'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;
  if (url.pathname.startsWith('/api/') || url.pathname === '/sw.js') return; // always live

  // Network first (so updates show up right away), cached copy when the server can't be reached
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req).then(r => r || (req.mode === 'navigate' ? caches.match('/index.html') : Response.error())))
  );
});
