"use strict";

/*
  FILE: app/idb.js
  IndexedDB یک دیتابیس داخل خود مرورگر است، روی origin فعلی.
  localStorage رشته است و کوچک. IndexedDB آبجکت می‌گیرد و سهمش معمولاً گیگابایت است.

  سهم را حدس نزن:
    const e = await navigator.storage.estimate()
    e.usage  بایت مصرف‌شده
    e.quota  سقف تقریبی این origin
  Chromium معمولاً سهم را از فضای آزاد دیسک می‌دهد، نه یک عدد ثابت چند مگابایتی.

  DEBUG
    F12 → Application → IndexedDB → fromzero
    اگر دیتابیس نیست، openDb را ننوشتی یا صفحه را Reload نکردی.
    اگر onupgradeneeded نیامد، version را بالا نبردی. همان version دوباره upgrade نمی‌دهد.

  GitHub بخوابد: این داده روی دیسک توست. github.io می‌میرد، IndexedDB نمی‌میرد.
  فقط فایل JS تازه از Pages نمی‌آید.
*/

const IDB_NAME = "fromzero";
const IDB_VERSION = 1;
const STORE = "notes";

function openDb() {
  /*
    WRITE L12
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(IDB_NAME, IDB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  */
  return Promise.reject(new Error("WRITE openDb in idb.js L12"));
}

function idbAdd(note) {
  /*
    WRITE L13
    transaction باید readwrite باشد.
    objectStore.add({ at: Date.now(), note, synced: 0 })
    tx.oncomplete یعنی روی دیسک نشسته، نه فقط در حافظهٔ JS.
  */
  return Promise.reject(new Error("WRITE idbAdd in idb.js L13"));
}

function idbAll() {
  /* WRITE L14 — transaction readonly + getAll() */
  return Promise.reject(new Error("WRITE idbAll in idb.js L14"));
}

function queued() {
  /* WRITE L15 — ردیف‌هایی که synced === 0 ؛ این صف همگام‌سازی است */
  return Promise.reject(new Error("WRITE queued in idb.js L15"));
}

async function quotaReport() {
  if (!navigator.storage || !navigator.storage.estimate) {
    return "storage.estimate missing";
  }
  const e = await navigator.storage.estimate();
  const pct = e.quota ? ((100 * e.usage) / e.quota).toFixed(4) : "n/a";
  return (
    "usage " + e.usage + " bytes\n" +
    "quota " + e.quota + " bytes\n" +
    "percent " + pct + "%"
  );
}

window.openDb = openDb;
window.idbAdd = idbAdd;
window.idbAll = idbAll;
window.queued = queued;
window.quotaReport = quotaReport;
