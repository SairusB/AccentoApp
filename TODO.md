# TODO (V1)

## Before building
- [ ] Confirm assumptions in PLAN.md (ICP, Bengali, General American)
- [ ] Find someone to validate Bengali content (linguist or knowledgeable native speakers)
- [x] Create Azure Speech account and API key (store in `.env.local`)

## Scoring spike (gate)
- [ ] Record test sentences: 2-3 Bengali speakers + 2-3 General American baseline speakers
- [ ] Run through Azure pronunciation assessment (and one alternative if cheap)
- [ ] Compare against what a human listener would flag
- [ ] Decide: go, adjust, or rethink scoring

## Build
- [x] Homepage: hero, two tracks, how it works, first-language section (Lilac sky design)
- [x] Waitlist form + /api/waitlist endpoint (email, track, optional first language)
- [ ] Connect waitlist to Google Sheet (docs/WAITLIST_SETUP.md) and add env vars on Vercel
- [x] Scaffold Next.js + TypeScript + Tailwind, init git, first commit
- [x] Deploy blank page to Vercel (https://accento-one.vercel.app)
- [ ] Write 15-20 practice sentences in `content/sentences.json`
- [ ] Write Bengali pattern cards in `content/patterns/bengali.json` (validated: false)
- [ ] Onboarding screen (language + accent, only Bengali / General American enabled)
- [ ] Record screen with browser audio capture
- [ ] Scoring interface in `lib/scoring/` + Azure implementation
- [ ] Results screen: flagged sounds + pattern cards
- [ ] Re-record and before/after view
- [ ] Privacy note on record screen
- [ ] Mobile layout pass
- [ ] Deploy and test on a real phone

## Validate
- [ ] Get content reviewed and mark patterns validated: true
- [ ] Recruit ~20 Bengali-speaking testers
- [ ] Run sessions and collect feedback (accuracy, what they learned, willingness to pay)
- [ ] Write up results and decide: continue, pivot, or stop
