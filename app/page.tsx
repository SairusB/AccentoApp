import FirstLanguage from "./components/FirstLanguage";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import SiteHeader, { Wordmark } from "./components/SiteHeader";
import Tracks from "./components/Tracks";
import Waitlist from "./components/Waitlist";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Tracks />
        <HowItWorks />
        <FirstLanguage />
        <Waitlist />
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <Wordmark />
        </div>
      </footer>
    </>
  );
}
