// Shared by the waitlist form (browser) and the /api/waitlist endpoint (server),
// so both agree on what a valid signup looks like.

export const TRACKS = [
  { value: "clarity", label: "Clearer English for work or study" },
  { value: "fun", label: "Trying on accents for fun" },
] as const;

export const FIRST_LANGUAGES = [
  "Assamese",
  "Bengali",
  "English",
  "Gujarati",
  "Hindi",
  "Kannada",
  "Malayalam",
  "Marathi",
  "Odia",
  "Punjabi",
  "Tamil",
  "Telugu",
  "Urdu",
  "Other",
] as const;

export type Signup = {
  email: string;
  track: (typeof TRACKS)[number]["value"];
  language: (typeof FIRST_LANGUAGES)[number] | "";
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Returns a clean signup, or null if anything is off. Emails starting with
// = + - @ are rejected so a spreadsheet can never read them as formulas.
export function parseSignup(input: unknown): Signup | null {
  if (typeof input !== "object" || input === null) return null;
  const { email, track, language } = input as Record<string, unknown>;
  if (typeof email !== "string") return null;
  const cleanEmail = email.trim().toLowerCase();
  if (cleanEmail.length > 254 || !EMAIL.test(cleanEmail) || /^[=+\-@]/.test(cleanEmail)) {
    return null;
  }
  const cleanTrack = TRACKS.find((t) => t.value === track)?.value;
  if (!cleanTrack) return null;
  const cleanLanguage = language
    ? FIRST_LANGUAGES.find((l) => l === language)
    : "";
  if (cleanLanguage === undefined) return null;
  return { email: cleanEmail, track: cleanTrack, language: cleanLanguage };
}
