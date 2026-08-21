"use strict";
/* Studio does not own a service worker. The app you write lives in /app/sw.js.
   This file only exists so old pwa-lab-v1 clients pick up a new SW and stop
   serving the previous reading-page workshop. */
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
