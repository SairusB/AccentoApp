# V1 Plan: Accent App (working title)

## Assumptions to confirm (change these freely)
- **Primary user (ICP):** need-driven Indian-language speakers who speak good English but want clearer, more target-aligned pronunciation for work or study. Not the "for fun" segment (that is a possible later mode).
- **Mother tongue for V1:** Bengali
- **Target accent for V1:** General American (British RP can follow)

## The idea in one paragraph
Most pronunciation apps score you and tell you which sounds were wrong. This app starts from the learner's mother tongue and explains *why* certain English sounds shift (for example, how Bengali's sound system affects specific English vowels and consonants), then gives targeted drills for exactly those sounds. The depth of per-language contrast is the differentiator.

## Who else is in this space (so we stay honest)
BoldVoice (accent coaching, asks native language, phoneme-level feedback), ELSA Speak (large user base, pronunciation drills), Accentify and actor-focused accent apps, plus Krisp-style real-time accent conversion. We are not claiming white space. Our bet is **depth per Indian language**, not breadth.

## V1 goal
Find out whether a small group of real Bengali speakers finds the feedback (a) accurate and (b) useful enough to come back. This is a test of the idea, not a launch.

## V1 scope (build this)
1. Short onboarding: pick mother tongue (only Bengali enabled) and target accent (only General American enabled).
2. A set of 15 to 20 carefully chosen practice sentences, each targeting known trouble sounds.
3. Record screen: user reads a sentence, records in the browser.
4. Scoring: send audio to the scoring provider, get word- and phoneme-level results.
5. Results screen: show which sounds were off, and for each, a **pattern card** explaining the mother-tongue reason and one thing to try. Offer an immediate re-record.
6. A simple before/after view for the same sentence (attempt 1 vs attempt 2).
7. Deploy so testers can open a link on their phone.

## Not in V1
Accounts and login, payments, other languages, other target accents, a "fun mode" (French/Italian-style accents), detecting the speaker's region from their voice, AI conversation partner, native mobile apps, streaks and gamification, B2B features, saving recordings.

## Content model
- `content/sentences.json`: id, text, target sounds, difficulty
- `content/patterns/bengali.json`: each pattern has id, English sound, what Bengali speakers often do instead, plain-language explanation, a tip, example words, and `validated` (true/false)
- Starting hypotheses for Bengali, all **unverified** and to be checked with a linguist or native speakers before testers see them:
  - /v/ and /w/ often realised as a different sound (e.g. closer to /b/ or /bʰ/)
  - extra vowel inserted before s-clusters ("school", "station")
  - dental "th" sounds replaced by stops
  - vowel contrasts such as /æ/ vs /ɛ/ merged
  - how the inherent Bengali vowel carries over into English word endings (your original example, needs precise wording from an expert)
  - retroflex /t/ and /d/ in place of English alveolars

## Scoring spike (do this FIRST, before building the UI)
Scoring accuracy on accented speech is the make-or-break risk. Before building anything else:
1. Record 10 to 15 sentences from 2 to 3 Bengali speakers, plus 2 to 3 speakers with clear General American as a baseline.
2. Run them through Azure pronunciation assessment (and one alternative if cheap, e.g. SpeechAce).
3. Check: does it flag the sounds a linguist or native listener would flag? Is it stable across repeated takes? Does it unfairly penalise valid Indian English features?
4. **Gate:** if feedback is mostly noise, stop and rethink the scoring approach before building more.

## Validation (after the build)
Test with about 20 Bengali speakers. Look for:
- At least 70% say the flagged sounds felt accurate
- At least half can name a specific thing they learned
- Most people improve on the re-record of at least one sentence
- A meaningful share say they would come back or pay (ask directly, and ask what they would pay)

## Suggested build order
1. Scaffold the Next.js app and deploy a blank page to Vercel
2. Scoring spike (above) as a throwaway script, with the decision gate
3. Write the sentence set and pattern cards, get them reviewed
4. Record screen with browser audio capture
5. Scoring integration behind `lib/scoring/`
6. Results screen with pattern cards and re-record
7. Mobile polish, privacy note, deploy
8. Run the tests with real users

## Open questions
- Who validates the Bengali content (linguist, or a few native speakers with phonetics knowledge)?
- Do we need Indian English as an accepted variant, so the app does not penalise features that are fine for intelligibility?
- Pricing and whether the first paying segment is individuals or B2B (BPOs, colleges)
