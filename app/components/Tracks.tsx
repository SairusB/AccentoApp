export default function Tracks() {
  return (
    <section id="tracks" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-violet-strong uppercase">Two ways in</p>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Pick your reason
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <article className="flex flex-col rounded-3xl border border-violet/30 bg-surface p-7 sm:p-9">
          <span className="w-fit rounded-full bg-mint-soft px-3 py-1 text-xs font-semibold">
            Opening first
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
            Be understood the first time
          </h3>
          <p className="mt-3 leading-7 text-muted">
            For interviews, client calls and lectures. Choose a target accent, then practise
            the handful of sounds that matter for you, instead of drilling every sound in the
            dictionary.
          </p>
          <p className="mt-auto pt-6 text-sm font-medium">Bengali → General American to start</p>
        </article>
        <article className="flex flex-col rounded-3xl bg-lilac p-7 sm:p-9">
          <span className="w-fit rounded-full bg-peach-soft px-3 py-1 text-xs font-semibold">
            Coming soon
          </span>
          <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
            Try on an accent for fun
          </h3>
          <p className="mt-3 leading-7 text-muted">
            Scottish for a week. Irish for the wedding toast. Learn how an accent actually
            works, one sound at a time, and wear it whenever you feel like it.
          </p>
          <p className="mt-auto pt-6 text-sm font-medium">Scottish, Irish and more</p>
        </article>
      </div>
    </section>
  );
}
