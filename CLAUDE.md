# Accent App (working title)

## What this is
A mobile-friendly web app that helps Indian-language speakers speak clear, target-accent English. It explains *why* their mother tongue shifts certain English sounds, then drills those specific sounds with feedback.

V1 is a **validation prototype**, not a product: one mother tongue (Bengali), one target accent (General American), about 20 test users. Full scope and reasoning are in `PLAN.md`. Progress is tracked in `TODO.md`.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS
- Audio capture in the browser with MediaRecorder
- Pronunciation scoring: Azure AI Speech pronunciation assessment is the first candidate, to be confirmed in the scoring spike (see `PLAN.md`). Keep every provider behind a small interface in `lib/scoring/` so it can be swapped.
- Lesson content as JSON files in `/content` (no database in V1)
- No auth, no payments, no database in V1
- Deploy on Vercel

## Commands
Node is installed with nvm (LTS, v24). In a non-interactive shell, load it first: `export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"`.
- `npm run dev` : start local dev server at http://localhost:3000
- `npm run build` : production build
- `npm run lint` : lint (ESLint)
- `npm test` : not set up yet (add when the first logic worth testing exists)

Next.js 16 may differ from what you remember. Check `node_modules/next/dist/docs/` before using a Next API you are unsure of (see `AGENTS.md`).

## Project structure (target)
```
app/            pages and UI
lib/scoring/    scoring provider interface + implementations
content/        sentences and pattern cards (JSON)
```

## Rules
- **Never invent phonetics or claims about a language.** All language-specific content lives in `/content`. Any pattern you add must have `"validated": false` until a human (linguist or native speaker) reviews it. Do not edit existing content claims unless asked.
- **Framing:** use "clarity" and "target accent". Never frame a mother-tongue accent as a defect or something to "fix" or "remove" in UI copy.
- **Privacy:** user audio is processed and discarded. Do not persist recordings or send them anywhere except the scoring provider. Tell users this on the record screen.
- **Secrets:** API keys go in `.env.local` only. Never hardcode or commit them. Keep `.env.example` with variable names and no values.
- **Mobile first:** testers will mostly use phones. Check layouts at narrow widths.
- **Small steps:** one feature at a time, commit after each working step, short clear commit messages.
- **Ask before:** adding dependencies, changing the stack, or expanding scope beyond `PLAN.md`.
- **Keep it simple:** this is a prototype. Prefer the plain solution over a clever or scalable one.
- If a mistake gets corrected in chat, add the lesson to this file.
