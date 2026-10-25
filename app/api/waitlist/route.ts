import { parseSignup } from "@/lib/waitlist";

// Receives a waitlist signup from the homepage and forwards it to a Google
// Apps Script web app, which appends a row to the waitlist Google Sheet.
// Setup: docs/WAITLIST_SETUP.md
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Hidden "website" field: people never see it, spam bots fill it in.
  // Pretend it worked so bots don't retry.
  if ((body as Record<string, unknown>)?.website) {
    return Response.json({ ok: true });
  }

  const signup = parseSignup(body);
  if (!signup) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const url = process.env.WAITLIST_WEBHOOK_URL;
  const secret = process.env.WAITLIST_WEBHOOK_SECRET;
  if (!url || !secret) {
    if (process.env.NODE_ENV !== "production") {
      console.log("Waitlist not connected yet; would have saved:", signup);
      return Response.json({ ok: true });
    }
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    // Sent as plain text on purpose: Apps Script answers with a redirect, and
    // following it fails with 404 if the request was labelled application/json.
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...signup, secret, source: "homepage" }),
    });
    const result = (await res.json()) as { ok?: boolean };
    if (!res.ok || !result.ok) throw new Error(`Sheet webhook returned ${res.status}`);
  } catch (error) {
    console.error("Waitlist save failed:", error);
    return Response.json({ ok: false, error: "save_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
