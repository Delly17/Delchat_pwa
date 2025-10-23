self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("delchat-cache").then((cache) => {
      return cache.addAll([
        "/Delchat_pwa/",
        "/Delchat_pwa/index.html",
        "/Delchat_pwa/style.css",
        "/Delchat_pwa/app.js",
        "/Delchat_pwa/manifest.json",
        "/Delchat_pwa/images/icon-192.png",
        "/Delchat_pwa/images/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
