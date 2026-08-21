"use strict";

/*
  FILE: app/app.js
  این را در Cursor باز کن و توابع را پر کن. صفحهٔ studio فقط نقشه است، کد آنجا نیست.

  DEBUG همیشگی
    F12 → Console
    هر WRITE که جا مانده Error می‌اندازد با اسم تابع. همان را در این فایل پیدا کن.
    F12 → Sources → app.js → breakpoint روی خطی که نوشتی → Reload → Step
*/

function $(id) {
  /* WRITE L03 — return document.getElementById(id); */
  throw new Error("WRITE $ in app.js L03");
}

function log(msg) {
  const el = document.getElementById("out");
  const line = typeof msg === "string" ? msg : JSON.stringify(msg, null, 2);
  console.log(msg);
  if (el) el.textContent = line;
}

/* ---------- L04 stopwatch ----------
   requestAnimationFrame لازم نیست. setInterval 100ms برای دهم‌ثانیه کافی است.
   مقدار را در localStorage بنویس تا Refresh کرنومتر را صفر نکند.
   freeze در CSS است؛ اینجا فقط عدد را عوض می‌کنی.
*/
const LS_CLOCK = "fromzero-clock";
const LS_RUN = "fromzero-clock-run";

const clock = {
  acc: Number(localStorage.getItem(LS_CLOCK) || 0),
  t0: 0,
  timer: null,
  render() {
    /* WRITE L04a
       const ms = this.acc + (this.timer ? Date.now() - this.t0 : 0);
       دقیقه:ثانیه.دهم را در $("#clock").textContent بگذار
    */
  },
  persist() {
    /* WRITE L04b — localStorage.setItem LS_CLOCK و LS_RUN */
  },
  start() {
    /* WRITE L04c — اگر timer هست return؛ this.t0 = Date.now(); setInterval render+persist */
  },
  pause() {
    /* WRITE L04d — acc را جمع کن، clearInterval */
  },
  reset() {
    /* WRITE L04e */
  }
};

/* ---------- L05 menu collapse ----------
   fullscreen نخواه. فقط کلاس toc-off روی #layout.
   وضعیت را localStorage نگه دار تا Refresh منو را دوباره باز نکند.
*/
const LS_TOC = "fromzero-toc-off";

function setupMenu() {
  /* WRITE L05
     const layout = $("#layout");
     const btn = $("#btnMenu");
     if (localStorage.getItem(LS_TOC) === "1") layout.classList.add("toc-off");
     btn.onclick = () => {
       layout.classList.toggle("toc-off");
       localStorage.setItem(LS_TOC, layout.classList.contains("toc-off") ? "1" : "0");
     };
  */
  throw new Error("WRITE setupMenu in app.js L05");
}

/* ---------- L07 manifest 200 ----------
   manifest.json الان {} است. فیلدها را خودت در آن فایل تایپ کن:
     name, short_name, start_url, display, background_color, theme_color,
     icons: [{ src:"icon.svg", sizes:"512x512", type:"image/svg+xml", purpose:"any" }]
   بدون comments داخل JSON. JSON کامنت قبول نمی‌کند.

   DEBUG
     fetch("./manifest.json") در Console
     res.status باید 200 باشد
     Network → manifest.json → Status 200
     اگر from ServiceWorker است، ممکن است نسخهٔ کهنه باشد → Unregister + cache:reload
*/
async function probeManifest() {
  /* WRITE L07
     const res = await fetch("./manifest.json", { cache: "no-store" });
     const text = await res.text();
     log("status " + res.status + "\n" + text);
     if (res.status !== 200) throw new Error("manifest not 200");
  */
  throw new Error("WRITE probeManifest in app.js L07");
}

/* ---------- L08 register service worker ----------
   فقط روی http/https. file:// شکست می‌خورد — آن خطا را باید در Console ببینی.
   register صفحه را به sw.js وصل می‌کند. خود sw.js خودبه‌خود اجرا نمی‌شود.
*/
async function registerSW() {
  /* WRITE L08
     if (!("serviceWorker" in navigator)) { log("no serviceWorker"); return; }
     const reg = await navigator.serviceWorker.register("./sw.js");
     log("SW scope " + reg.scope);
     await paintSwChip();
  */
  throw new Error("WRITE registerSW in app.js L08");
}

async function paintSwChip() {
  const el = document.getElementById("swChip");
  if (!el) return;
  const reg = await navigator.serviceWorker.getRegistration();
  el.textContent = reg && reg.active ? "SW active" : "SW none";
}

async function paintQuota() {
  const el = document.getElementById("quotaChip");
  if (!el || !window.quotaReport) return;
  const t = await quotaReport();
  const line = t.split("\n")[0];
  el.textContent = line;
}

/* ---------- L16 GitHub down ----------
   Offline در DevTools = شبیه‌سازی خوابیدن github.io برای فایل استاتیک.
   IndexedDB هنوز هست. registerSW دیگر فایل تازه نمی‌گیرد.
*/
async function probeOrigin() {
  /* WRITE L16
     try {
       const res = await fetch("./index.html", { cache: "no-store" });
       log("origin " + res.status + " onLine=" + navigator.onLine);
     } catch (err) {
       log("origin failed " + err + " onLine=" + navigator.onLine);
     }
  */
  throw new Error("WRITE probeOrigin in app.js L16");
}

function bindClock() {
  $("#btnStart").onclick = () => clock.start();
  $("#btnPause").onclick = () => clock.pause();
  $("#btnReset").onclick = () => clock.reset();
  clock.render();
  if (localStorage.getItem(LS_RUN) === "1") clock.start();
}

async function boot() {
  /*
    WRITE L20 — ترتیب:
      bindClock();
      setupMenu();
      paintQuota();
      await registerSW();
    اگر یکی throw کرد، بقیه را در try/catch جدا بگذار تا یک WRITE ناقص کل صفحه را نکشد.
  */
  try { bindClock(); } catch (e) { log(e.message); }
  try { setupMenu(); } catch (e) { log(e.message); }
  try { await paintQuota(); } catch (e) { log(e.message); }
  try { await registerSW(); } catch (e) { log(e.message); }
}

window.probeManifest = probeManifest;
window.probeOrigin = probeOrigin;
window.clock = clock;
window.log = log;

document.addEventListener("DOMContentLoaded", boot);
