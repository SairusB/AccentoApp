# Scoring spike

Throwaway work to answer one question before building the app: does Azure pronunciation assessment flag the sounds a careful listener would flag, consistently, without flagging clear General American speech? See the scoring spike section in `PLAN.md`.

Everything in `spike/audio/` and `spike/results/` stays on this Mac (gitignored).

## Steps

1. **Azure:** follow `AZURE_SETUP.md`. The key goes in `.env.local`.
2. **Recordings:** send `SPEAKER_INSTRUCTIONS.md` to speakers and file what they send as `spike/audio/<BN1|US1|...>/s01_take1.m4a`.
3. **Mark by ear first**, before scoring anything:
   ```bash
   node spike/marking-sheet.mjs
   ```
   Open `spike/results/marking-sheet.csv` in Numbers or Google Sheets. For each row, play the audio file and write the words that sound unclear or off in `words_you_flagged`, separated by commas (e.g. `very, village`). If you can tell which sound was off, add it in `notes` (e.g. `v in very sounded like b`). Leave `words_you_flagged` empty if nothing stood out. Save it as CSV in the same place.

   Mark against **clarity**, not against an American ideal: flag a word if a listener might mishear it or it would stand out as not matching the target accent. Mark what you hear, not what you expect the hypotheses to predict.
4. **Score:**
   ```bash
   node spike/score.mjs
   ```
   This converts each file, sends it to Azure and writes `spike/results/scores.csv`, with one row per word: word accuracy, Azure's error type, the lowest-scoring sound, and every sound's score. Azure responses are cached in `spike/results/raw/`, so re-running doesn't re-send audio. Use `--force` to re-score anyway.
5. **Compare** your marks with Azure's flags against the pass marks agreed beforehand (comparison script to come).

## Pass marks (agreed before seeing results)

| Check | Pass |
|---|---|
| Of the words you flagged, how many Azure also flags | ≥ 60% |
| Of the words Azure flags, how many you agree with | ≥ 50% |
| Clear General American speakers: words flagged per sentence | about 0, rarely more than 1 |
| Same speaker, two takes: same words flagged | mostly yes |
| Valid Indian English features penalised | noted case by case |
