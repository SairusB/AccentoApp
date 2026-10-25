"use client";

import { useState } from "react";
import { FIRST_LANGUAGES, TRACKS } from "@/lib/waitlist";

type Status = "idle" | "sending" | "done" | "error";

export default function Waitlist() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-20 px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-line bg-surface p-7 sm:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-peach/40 blur-3xl"
        />
        {status === "done" ? (
          <div className="relative py-8 text-center" role="status">
            <p className="font-display text-4xl font-bold">Spot saved.</p>
            <p className="mt-3 text-muted">
              You&apos;re on the list. We&apos;ll email you when your spot opens.
            </p>
          </div>
        ) : (
          <div className="relative">
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Get on the list
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-muted">
              We&apos;re letting in a small group first. Tell us what you&apos;re here for and
              we&apos;ll save you a spot.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="rounded-2xl border border-line bg-canvas px-4 py-3 text-base outline-none transition focus:border-violet focus:ring-4 focus:ring-violet/15"
                />
              </label>

              <fieldset className="flex flex-col gap-2">
                <legend className="mb-2 text-sm font-semibold">What brings you here?</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {TRACKS.map((track, i) => (
                    <label
                      key={track.value}
                      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3 transition has-[:checked]:border-violet has-[:checked]:bg-lilac"
                    >
                      <input
                        type="radio"
                        name="track"
                        value={track.value}
                        defaultChecked={i === 0}
                        className="accent-violet-strong"
                      />
                      <span className="text-sm font-medium">{track.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold">
                  Your first language <span className="font-normal text-muted">(optional)</span>
                </span>
                <select
                  name="language"
                  defaultValue=""
                  className="rounded-2xl border border-line bg-canvas px-4 py-3 text-base outline-none transition focus:border-violet focus:ring-4 focus:ring-violet/15"
                >
                  <option value="">Choose one</option>
                  {FIRST_LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </label>

              {/* Hidden from people; catches spam bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-violet-strong px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet/30 transition hover:bg-ink disabled:opacity-60"
                >
                  {status === "sending" ? "Saving…" : "Save my spot"}
                </button>
                <p className="text-sm text-muted">
                  We&apos;ll only use your email to tell you about Accento.
                </p>
              </div>

              {status === "error" && (
                <p className="text-sm font-medium text-red-700" role="alert">
                  That didn&apos;t go through. Check your email address and try again.
                </p>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
