export function Wordmark() {
  return (
    <span className="font-display text-2xl font-bold tracking-tight">
      Accento<span className="text-violet">.</span>
    </span>
  );
}

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-canvas/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="Accento home">
          <Wordmark />
        </a>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#tracks" className="hidden text-muted hover:text-ink sm:inline">
            Tracks
          </a>
          <a href="#how" className="hidden text-muted hover:text-ink sm:inline">
            How it works
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-ink px-4 py-2 text-white transition hover:bg-violet-strong"
          >
            Join the waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
