const tracks = [
  {
    badge: "Opening first",
    badgeClass: "bg-mint-soft",
    title: "Be understood the first time",
    body: "For interviews, client calls and lectures. Choose a target accent, then practise the handful of sounds that matter for you, instead of drilling every sound in the dictionary.",
    accents: ["General American", "British RP"],
    chipClass: "bg-violet text-white",
  },
  {
    badge: "Coming soon",
    badgeClass: "bg-peach-soft",
    title: "Try on an accent for fun",
    body: "Scottish for a week. Irish for the wedding toast. Learn how an accent actually works, one sound at a time, and wear it whenever you feel like it.",
    accents: ["French accent", "Irish", "Scottish"],
    chipClass: "bg-peach-soft text-ink",
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-violet-strong uppercase">
        Two tracks, same outcome
      </p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Pick your reason
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {tracks.map((track) => (
          <article
            key={track.title}
            className="flex flex-col rounded-3xl border border-line bg-surface p-7 sm:p-9"
          >
            <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${track.badgeClass}`}>
              {track.badge}
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl">{track.title}</h3>
            <p className="mt-3 leading-7 text-muted">{track.body}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Accents">
              {track.accents.map((accent) => (
                <li
                  key={accent}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium ${track.chipClass}`}
                >
                  {accent}
                </li>
              ))}
              <li className="rounded-full border border-dashed border-line px-3 py-1.5 text-sm text-muted">
                and more
              </li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
