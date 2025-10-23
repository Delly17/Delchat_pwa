
const CACHE_NAME = 'delchat-cache-v1';
const FILES_TO_CACHE = [
  '/Delchat_pwa/',
  '/Delchat_pwa/index.html',
  '/Delchat_pwa/style.css',
  '/Delchat_pwa/app.js',
  '/Delchat_pwa/manifest.json',
  '/Delchat_pwa/images/icon-192.png',
  '/Delchat_pwa/images/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
