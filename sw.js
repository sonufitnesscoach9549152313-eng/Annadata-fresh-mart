const CACHE = "annadata-v2";
const CORE = ["./", "./index.html", "./style.css?v=2", "./config.js?v=2", "./app.js?v=2", "./assets/supabase.js", "./manifest.webmanifest", "./assets/logo-h.png", "./assets/icon-192.png", "./assets/fonts/mukta-latin-400-normal.woff2", "./assets/fonts/fraunces-latin-600-normal.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).catch(() => {})); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;            // never cache Supabase, Google or payments
  if (url.pathname.endsWith(".mp4") || url.pathname.endsWith("admin.html")) return;
  if (req.mode === "navigate" || /\.(js|css|html|webmanifest)$/.test(url.pathname)) {   // network first: always fresh code & prices
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(h => h || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })));
});
