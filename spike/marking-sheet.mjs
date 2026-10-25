// Scoring spike: make a blank sheet for marking recordings by ear, before
// looking at any Azure scores. One row per Bengali-speaker recording (take 1).
// Throwaway code. Not part of the app.
//
// Usage: node spike/marking-sheet.mjs [--audio <dir>] [--out <dir>] [--all-takes]

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
const allTakes = args.includes("--all-takes");

const sentences = JSON.parse(
  fs.readFileSync(path.join(root, "content/sentences.json"), "utf8"),
).sentences;
const sentenceById = new Map(sentences.map((s) => [s.id, s]));

const sheetPath = path.join(outDir, "marking-sheet.csv");
if (fs.existsSync(sheetPath)) {
  console.log(`${sheetPath} already exists. Not overwriting your marks; delete it first to start over.`);
  process.exit(1);
}

const csvCell = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : v);
const rows = [["speaker", "sentence", "take", "audio_file", "text", "words_you_flagged", "notes"]];

for (const speaker of fs.readdirSync(audioDir).sort()) {
  const speakerDir = path.join(audioDir, speaker);
  if (!speaker.startsWith("BN") || !fs.statSync(speakerDir).isDirectory()) continue;
  for (const file of fs.readdirSync(speakerDir).sort()) {
    const match = file.match(/^(s\d+)_take(\d+)\./i);
    if (!match) continue;
    const take = Number(match[2]);
    if (take !== 1 && !allTakes) continue;
    const sentence = sentenceById.get(match[1].toLowerCase());
    if (!sentence) continue;
    rows.push([speaker, sentence.id, take, `${speaker}/${file}`, sentence.text, "", ""]);
  }
}

if (rows.length === 1) {
  console.log(`No BN recordings found in ${audioDir}`);
  process.exit(0);
}
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(sheetPath, rows.map((r) => r.map(csvCell).join(",")).join("\n") + "\n");
console.log(`Wrote ${rows.length - 1} recordings to ${sheetPath}`);
