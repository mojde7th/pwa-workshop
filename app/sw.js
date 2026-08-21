"use strict";

/*
  FILE: app/sw.js
  این فایل را صفحه اجرا نمی‌کند. مرورگر آن را جدا ثبت می‌کند.

  service worker چیست، با دست نه با تعریف کتابی:
    1) در app.js می‌نویسی navigator.serviceWorker.register("./sw.js")
    2) F12 → Application → Service Workers
    3) همین فایل را آنجا می‌بینی، status = activated
    4) Cache Storage بعد از install پر می‌شود
    5) Network → Offline → Reload: اگر fetch handler درست باشد صفحه می‌ماند

  self در این فایل یعنی خود service worker، نه window. window اینجا وجود ندارد.
  اگر window نوشتی، Console اینجا نیست؛ خطا در Application → Service Workers → see errors.

  GitHub Pages فقط همین متن را سرو می‌کند. bundler نیست.
  هر بار منطق کش را عوض کردی CACHE را عوض کن وگرنه پوستهٔ کهنه می‌ماند.
*/

const CACHE = "fromzero-v1";

const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./idb.js",
  "./sync.js",
  "./manifest.json",
  "./icon.svg"
];

/*
  WRITE L09 install
  event.waitUntil به مرورگر می‌گوید نصب تمام نشده تا Promise حل شود.
  caches.open(CACHE) یک Cache Storage به آن نام می‌سازد.
  cache.addAll(SHELL) هر URL را GET می‌کند. یکی 404 بدهد کل addAll رد می‌شود.

  DEBUG
    Application → Cache Storage → fromzero-v1
    اگر خالی است: addAll شکست خورده (مسیر غلط) یا waitUntil ننوشتی.
*/
self.addEventListener("install", (event) => {
  // WRITE: event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()))
});

/*
  WRITE L10 activate
  کش‌های قدیمی با نام دیگر می‌مانند تا خودت حذف‌شان کنی.
  clients.claim() تب‌های باز را همان لحظه زیر کنترل این SW می‌برد.
*/
self.addEventListener("activate", (event) => {
  // WRITE:
  // event.waitUntil(
  //   caches.keys().then((keys) =>
  //     Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
  //   ).then(() => self.clients.claim())
  // )
});

/*
  WRITE L11 fetch
  هر GET هم‌origin از اینجا رد می‌شود.
  POST را دست نزن (Apps Script /exec نباید کش شود).
  origin دیگر را دست نزن.

  cache-first: اول کش، اگر بود همان. باگ DailyLog همین بود: app.js کهنه تا ابد.
  network-first: اول شبکه، اگر بود هم جواب بده هم کش را عوض کن. اگر شبکه مرد، کش.

  DEBUG stale SW
    1) یک متن در index.html عوض کن، CACHE را عوض نکن، Reload
    2) اگر متن کهنه ماند، یا cache-first نوشتی یا Network ستون Size می‌گوید from ServiceWorker
    3) Unregister + Clear site data + Ctrl+F5
    4) بعد از این درس، CACHE را از v1 به v2 ببر وقتی SHELL عوض شد
*/
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // WRITE network-first:
  // event.respondWith(
  //   fetch(req).then((res) => {
  //     const copy = res.clone();
  //     caches.open(CACHE).then((cache) => cache.put(req, copy));
  //     return res;
  //   }).catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
  // )
});
