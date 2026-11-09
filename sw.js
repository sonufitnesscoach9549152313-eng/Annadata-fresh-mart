const CACHE = "annadata-v1";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./assets/logo-h.png", "./assets/logo-badge.png", "./assets/icon-192.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return; // never cache Supabase / payments
  const url = new URL(req.url);
  if (url.pathname.endsWith(".mp4")) return; // videos stream directly
  if (req.mode === "navigate" || /\.(js|html|webmanifest)$/.test(url.pathname)) {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }).catch(() => caches.match(req).then(h => h || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
});
