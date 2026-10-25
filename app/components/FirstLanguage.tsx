const languages = ["Bengali", "Tamil", "Telugu", "Kannada", "Malayalam"];

export default function FirstLanguage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid gap-10 rounded-[2rem] bg-ink p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Your first language is the map, not the problem
          </h2>
          <p className="mt-5 leading-7 text-white/75">
            Most pronunciation apps tell you a sound was off. Accento starts a step earlier.
            Every language has its own set of sounds, and it shapes the English you speak in
            ways that follow patterns. Once you know the pattern, practice gets a lot shorter.
          </p>
          <p className="mt-4 leading-7 text-white/75">
            Every explanation is checked by native speakers and language experts before it
            reaches you.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2.5" aria-label="Languages">
          {languages.map((lang) => (
            <li
              key={lang}
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-white"
            >
              {lang}
            </li>
          ))}
          <li className="rounded-full border border-dashed border-white/20 px-4 py-2 text-sm text-white/50">
            more to come
          </li>
        </ul>
      </div>
    </section>
  );
}
