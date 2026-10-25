const accents = [
  { name: "General American", status: "Opening first", live: true },
  { name: "British RP", status: "Soon", live: false },
  { name: "Scottish", status: "Soon", live: false },
  { name: "Irish", status: "Soon", live: false },
];

function AccentRail() {
  return (
    <div className="relative pt-3">
      {/* the rail the accents hang from */}
      <div className="absolute inset-x-2 top-3 h-1 rounded-full bg-ink/80" />
      <ul className="relative flex gap-3 overflow-hidden">
        {accents.map((a, i) => (
          <li
            key={a.name}
            className="flex shrink-0 flex-col items-center"
            style={{ transform: `rotate(${[-3, 2, -2, 3][i]}deg)` }}
          >
            <span className="h-4 w-0.5 bg-ink/70" />
            <span
              className={`rounded-2xl border px-4 py-3 text-left shadow-sm ${
                a.live
                  ? "border-violet bg-violet text-white"
                  : "border-line bg-surface text-ink"
              }`}
            >
              <span className="block font-display text-sm font-semibold">{a.name}</span>
              <span className={`block text-xs ${a.live ? "text-white/80" : "text-muted"}`}>
                {a.status}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PracticeCard() {
  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-[0_20px_60px_-30px_rgba(99,67,245,0.45)] sm:p-6">
      <div className="flex items-center justify-between text-xs font-medium text-muted">
        <span>Sentence 2 of 12</span>
        <span className="rounded-full bg-mint-soft px-2.5 py-1 text-ink">Take 2 · clearer</span>
      </div>
      <p className="mt-4 font-display text-xl leading-snug sm:text-2xl">
        Will you review the{" "}
        <span className="rounded-md bg-peach-soft px-1 underline decoration-peach decoration-2 underline-offset-4">
          video
        </span>{" "}
        with Victor?
      </p>
      <div className="mt-4 rounded-2xl bg-lilac p-4 text-sm">
        <p className="font-semibold">The “v” in video</p>
        <p className="mt-1 text-muted">
          Rest your top teeth lightly on your lower lip and let the sound buzz.
        </p>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-violet-strong text-white">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2Z" />
          </svg>
        </span>
        <span className="flex h-8 flex-1 items-center justify-between" aria-hidden="true">
          {[40, 70, 55, 90, 65, 35, 80, 50, 95, 60, 45, 75, 30, 85, 55, 40, 70, 50].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-violet/70"
              style={{ height: `${Math.round(h * 0.32)}px` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft colour wash behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-violet/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-40 left-[-10%] h-[360px] w-[360px] rounded-full bg-peach/30 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pt-24 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            Early access · Bengali speakers first
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Accents are cloaks. <span className="whitespace-nowrap text-violet">Try one on.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Accento helps you speak clear English in the accent you choose, starting from the
            language you grew up with. Your voice stays yours. The cloak is up to you.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#waitlist"
              className="rounded-full bg-violet-strong px-6 py-3 font-semibold text-white shadow-lg shadow-violet/30 transition hover:bg-ink"
            >
              Join the waitlist
            </a>
            <a
              href="#how"
              className="rounded-full border border-line bg-surface px-6 py-3 font-semibold transition hover:border-violet"
            >
              See how it works
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <AccentRail />
          <PracticeCard />
        </div>
      </div>
    </section>
  );
}
