// Scoring spike: send every recording in spike/audio to Azure pronunciation
// assessment and write word- and phoneme-level scores to a CSV.
// Throwaway code. Not part of the app.
//
// Usage: node spike/score.mjs [--audio <dir>] [--out <dir>] [--force]
// Expects <audio>/<speaker>/<sentenceId>_take<n>.<ext>, e.g. BN1/s03_take2.m4a

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const args = process.argv.slice(2);
const argValue = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? path.resolve(args[i + 1]) : fallback;
};
const audioDir = argValue("--audio", path.join(root, "spike/audio"));
const outDir = argValue("--out", path.join(root, "spike/results"));
const force = args.includes("--force");

process.loadEnvFile(path.join(root, ".env.local"));
const { AZURE_SPEECH_KEY: key, AZURE_SPEECH_REGION: region } = process.env;
if (!key || !region) throw new Error("Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION in .env.local");

const sentences = JSON.parse(
  fs.readFileSync(path.join(root, "content/sentences.json"), "utf8"),
).sentences;
const sentenceById = new Map(sentences.map((s) => [s.id, s]));

const AUDIO_EXT = /\.(m4a|wav|aiff?|caf|mp3|aac)$/i;
const FILE_NAME = /^(s\d+)_take(\d+)\./i;

function findRecordings() {
  const recordings = [];
  for (const speaker of fs.readdirSync(audioDir).sort()) {
    const speakerDir = path.join(audioDir, speaker);
    if (!fs.statSync(speakerDir).isDirectory()) continue;
    for (const file of fs.readdirSync(speakerDir).sort()) {
      if (!AUDIO_EXT.test(file)) continue;
      const match = file.match(FILE_NAME);
      if (!match || !sentenceById.has(match[1].toLowerCase())) {
        console.warn(`skip ${speaker}/${file}: name should look like s01_take1.m4a`);
        continue;
      }
      recordings.push({
        speaker,
        sentenceId: match[1].toLowerCase(),
        take: Number(match[2]),
        file: path.join(speakerDir, file),
      });
    }
  }
  return recordings;
}

// Azure's short-audio REST API wants 16 kHz mono 16-bit PCM WAV.
// afconvert ships with macOS, so no extra dependency.
function toWav(input, output) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  execFileSync("afconvert", ["-f", "WAVE", "-d", "LEI16@16000", "-c", "1", input, output]);
  const seconds = (fs.statSync(output).size - 44) / 32000;
  if (seconds > 30) console.warn(`  ${path.basename(input)} is ${seconds.toFixed(0)}s; Azure caps short audio at 30s`);
}

async function assess(wavPath, referenceText) {
  const config = {
    ReferenceText: referenceText,
    GradingSystem: "HundredMark",
    Granularity: "Phoneme",
    Dimension: "Comprehensive",
    EnableMiscue: true,
    PhonemeAlphabet: "IPA",
  };
  const url =
    `https://${region}.stt.speech.microsoft.com/speech/recognition/conversation/` +
    `cognitiveservices/v1?language=en-US&format=detailed`;
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
        "Pronunciation-Assessment": Buffer.from(JSON.stringify(config)).toString("base64"),
      },
      body: fs.readFileSync(wavPath),
    });
    // The free tier allows few requests at once; back off and retry.
    if (res.status === 429 && attempt < 5) {
      await new Promise((r) => setTimeout(r, 2000 * attempt));
      continue;
    }
    if (!res.ok) throw new Error(`Azure returned ${res.status}: ${await res.text()}`);
    return res.json();
  }
}

// Azure has returned scores both nested under PronunciationAssessment and flat.
const scoresOf = (x) => x.PronunciationAssessment ?? x;
const normalise = (word) => word.toLowerCase().replace(/[^a-z']/g, "");
const csvCell = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v);

function rowsFor(recording, result) {
  const sentence = sentenceById.get(recording.sentenceId);
  const targets = new Set(sentence.targetWords.map(normalise));
  const best = result.NBest?.[0];
  const base = {
    speaker: recording.speaker,
    group: recording.speaker.replace(/\d+$/, ""),
    sentence: recording.sentenceId,
    take: recording.take,
    pattern: sentence.patternId,
  };
  if (result.RecognitionStatus !== "Success" || !best) {
    return [{ ...base, word: "", status: result.RecognitionStatus }];
  }
  const overall = scoresOf(best);
  return best.Words.map((w) => {
    const phonemes = (w.Phonemes ?? []).map((p) => ({
      phoneme: p.Phoneme,
      score: scoresOf(p).AccuracyScore,
    }));
    const lowest = phonemes.reduce((min, p) => (min && min.score <= p.score ? min : p), null);
    return {
      ...base,
      status: "Success",
      heard: best.Display,
      sentence_pron_score: overall.PronScore,
      word: w.Word,
      is_target: targets.has(normalise(w.Word)) ? 1 : 0,
      word_accuracy: scoresOf(w).AccuracyScore,
      error_type: scoresOf(w).ErrorType,
      lowest_phoneme: lowest?.phoneme ?? "",
      lowest_phoneme_score: lowest?.score ?? "",
      phonemes: phonemes.map((p) => `${p.phoneme}:${p.score}`).join(" "),
    };
  });
}

const COLUMNS = [
  "speaker", "group", "sentence", "take", "pattern", "status", "heard",
  "sentence_pron_score", "word", "is_target", "word_accuracy", "error_type",
  "lowest_phoneme", "lowest_phoneme_score", "phonemes",
];

const recordings = findRecordings();
if (recordings.length === 0) {
  console.log(`No recordings found in ${audioDir}`);
  process.exit(0);
}
console.log(`Scoring ${recordings.length} recordings from ${audioDir}`);

const rows = [];
for (const rec of recordings) {
  const name = `${rec.sentenceId}_take${rec.take}`;
  const rawPath = path.join(outDir, "raw", rec.speaker, `${name}.json`);
  let result;
  // Cache Azure responses so re-runs don't re-send audio or use up quota.
  if (fs.existsSync(rawPath) && !force) {
    result = JSON.parse(fs.readFileSync(rawPath, "utf8"));
  } else {
    const wavPath = path.join(outDir, "wav", rec.speaker, `${name}.wav`);
    toWav(rec.file, wavPath);
    result = await assess(wavPath, sentenceById.get(rec.sentenceId).text);
    fs.mkdirSync(path.dirname(rawPath), { recursive: true });
    fs.writeFileSync(rawPath, JSON.stringify(result, null, 2));
  }
  const recRows = rowsFor(rec, result);
  rows.push(...recRows);
  console.log(`  ${rec.speaker} ${name}: ${recRows[0].status} ${recRows[0].sentence_pron_score ?? ""}`);
}

const csv = [COLUMNS.join(","), ...rows.map((r) => COLUMNS.map((c) => csvCell(r[c] ?? "")).join(","))];
const csvPath = path.join(outDir, "scores.csv");
fs.writeFileSync(csvPath, csv.join("\n") + "\n");
console.log(`Wrote ${rows.length} word rows to ${csvPath}`);
