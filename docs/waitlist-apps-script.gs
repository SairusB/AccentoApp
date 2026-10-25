// Paste this into your waitlist Google Sheet: Extensions → Apps Script.
// It receives signups from the Accento website and adds one row per email.

// Must match WAITLIST_WEBHOOK_SECRET in .env.local and on Vercel.
const SECRET = "PASTE_YOUR_SECRET_HERE";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  if (data.secret !== SECRET) return reply({ ok: false, error: "unauthorised" });

  // Only one signup is written at a time, so rows never collide.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName("Waitlist") || book.insertSheet("Waitlist");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Signed up", "Email", "Track", "First language", "Source"]);
      sheet.setFrozenRows(1);
    }
    // Skip emails that are already on the list.
    const existing = sheet.getLastRow() > 1
      ? sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues().flat().map(String)
      : [];
    if (!existing.includes(data.email)) {
      sheet.appendRow([new Date(), data.email, data.track, data.language || "", data.source || ""]);
    }
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
