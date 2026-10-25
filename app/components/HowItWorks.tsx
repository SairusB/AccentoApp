const steps = [
  {
    title: "Read a line out loud",
    body: "Short sentences built around the sounds you're working on. You record right in your browser, nothing to install.",
  },
  {
    title: "See which sounds drifted",
    body: "Accento marks the sounds that landed away from your target accent and explains why your first language pulls them that way.",
  },
  {
    title: "Take it again",
    body: "Record a second take straight away and hear the two side by side. Small changes are easier to hear than you'd think.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 border-y border-line bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
          How a session goes
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-violet/10 font-display font-bold text-violet-strong">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-12 flex items-center gap-2 text-sm text-muted">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-violet-strong" fill="currentColor" aria-hidden="true">
            <path d="M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm-1.2 14.2-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6Z" />
          </svg>
          Recordings are scored, then deleted. We don&apos;t keep your voice.
        </p>
      </div>
    </section>
  );
}
