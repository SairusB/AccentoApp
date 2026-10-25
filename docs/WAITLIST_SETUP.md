# Waitlist setup: Google Sheet

About 15 minutes, done once. When you're finished, every signup on the homepage appears as a new row in a Google Sheet you own.

**How it fits together:** someone fills in the form → the website's **endpoint** (`/api/waitlist`, a small piece of server code) checks the details → it sends them to a **webhook** (a web address that accepts incoming data), which here is a small **Apps Script** program inside your Sheet → the script adds a row.

A **shared secret** (a long random password) travels with each signup. The script ignores anything without it, so nobody else can write into your Sheet. Claude has already generated one and put it in `.env.local` as `WAITLIST_WEBHOOK_SECRET`.

## 1. Create the Sheet
1. Go to https://sheets.new (signed in to the Google account you want to own the list).
2. Name it `Accento waitlist`. You don't need to add any columns; the script creates them.

## 2. Add the script
1. In the Sheet: **Extensions → Apps Script**.
2. Delete everything in the editor and paste the whole of `docs/waitlist-apps-script.gs`.
3. Open `.env.local` (in Terminal: `open -e .env.local`), copy the value after `WAITLIST_WEBHOOK_SECRET=`, and paste it in place of `PASTE_YOUR_SECRET_HERE` in the script. Keep the quote marks.
4. Click the **Save** (disk) icon.

## 3. Publish it as a web app
1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set:
   - **Description:** `Accento waitlist`
   - **Execute as:** **Me** (the script writes to your Sheet using your account)
   - **Who has access:** **Anyone** (the website needs to reach it without logging in; the secret is what keeps it safe)
4. Click **Deploy**. Google asks you to **authorise**: choose your account. You may see "Google hasn't verified this app". That's expected for your own script: click **Advanced → Go to Accento waitlist (unsafe) → Allow**. It only gets access to this Sheet's project.
5. Copy the **Web app URL** (it ends in `/exec`).

## 4. Connect the website
1. In `.env.local`, paste the URL after `WAITLIST_WEBHOOK_URL=` and save. That connects your local copy.
2. On **Vercel**: your project → **Settings → Environment Variables**. Add both:
   - `WAITLIST_WEBHOOK_URL` = the `/exec` URL
   - `WAITLIST_WEBHOOK_SECRET` = the same secret as in `.env.local`

   **Environment variables** are settings the live site reads at run time; they're how secrets reach Vercel without going into GitHub.
3. Redeploy so the live site picks them up: **Deployments → ⋯ on the latest → Redeploy**.

Then tell Claude it's done; Claude will send a test signup and you'll see it appear in the Sheet.

## If you change the script later
Use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. This keeps the same URL. (Making a *new* deployment instead gives you a new URL, which you'd then have to update in both places.)
