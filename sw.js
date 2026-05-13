// Service Worker - PWA 离线缓存
const CACHE = "vpn-v2";
const ASSETS = [
  "/vpn-sale/",
  "/vpn-sale/index.html",
  "/vpn-sale/manifest.json",
  "/vpn-sale/qr.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
