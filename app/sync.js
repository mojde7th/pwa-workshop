"use strict";

/*
  FILE: app/sync.js
  GitHub Pages فقط فایل استاتیک می‌دهد. شیت گوگل روی script.google.com است.
  اگر GitHub بخوابد، fetch به origin این اپ شکست می‌خورد؛ POST به Apps Script جداست.

  CORS: اگر Content-Type: application/json بفرستی مرورگر preflight می‌زند (OPTIONS).
  Apps Script OPTIONS را درست جواب نمی‌دهد. برای همین body را text/plain می‌فرستی
  و در Code.gs با JSON.parse(e.postData.contents) می‌خوانی.

  SCRIPT_VERSION: اپ باید نسخهٔ استقرار را چک کند. اگر editor را Save کردی ولی
  Deploy → Manage deployments → مداد → New version نزدی، /exec همان کد کهنه است.

  این فایل را به DailyLog وصل نکن. SHEET_ID و SECRET جدید.
*/

const SCRIPT_VERSION_EXPECT = "lab-v1";

async function pingScript(url) {
  /*
    WRITE L18
    const res = await fetch(url); // doGet
    const data = await res.json();
    if (data.version !== SCRIPT_VERSION_EXPECT) throw new Error("sheet old: " + data.version);
    return data;
  */
  return Promise.reject(new Error("WRITE pingScript in sync.js L18"));
}

async function postQueue(url, secret) {
  /*
    WRITE L19
    1) rows = await queued()
    2) اگر خالی، برگرد { ok:true, empty:true } بدون toast خطا
    3) fetch(url, { method:"POST", headers:{ "Content-Type":"text/plain" }, body: JSON.stringify({ secret, rows }) })
    4) جواب version را چک کن
  */
  return Promise.reject(new Error("WRITE postQueue in sync.js L19"));
}

window.pingScript = pingScript;
window.postQueue = postQueue;
window.SCRIPT_VERSION_EXPECT = SCRIPT_VERSION_EXPECT;
