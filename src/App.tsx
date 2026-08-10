import { useState } from 'react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';

const NAV_LINKS = ['Overview', 'Details', 'Stack', 'Source'];

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4';

const REPO_URL = 'https://github.com/ItzAditya43/Frontend-animated';

function NavLink({ label }: { label: string }) {
  return (
    <a
      href={label === 'Source' ? REPO_URL : '#'}
      target={label === 'Source' ? '_blank' : undefined}
      rel={label === 'Source' ? 'noreferrer' : undefined}
      className="group relative text-sm text-white/80 hover:text-white transition-colors"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute h-full w-full object-cover animate-[kenBurns_24s_ease-in-out_infinite_alternate]"
        style={{ objectPosition: '70% center' }}
        src={VIDEO_URL}
      />

      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 group">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-lg font-semibold tracking-tight text-white sm:text-xl transition-[letter-spacing] duration-300 group-hover:tracking-wide">
              Foldcraft
            </span>
            <span className="rounded-full border border-white/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
              Demo
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link} label={link} />
            ))}
          </div>
        </div>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden md:block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform"
        >
          View Source
        </a>

        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center text-white md:hidden active:scale-90"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <Menu
            size={24}
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-90 opacity-0 scale-75' : 'rotate-0 opacity-100 scale-100'
            }`}
          />
          <X
            size={24}
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-75'
            }`}
          />
        </button>
      </nav>

      <div
        className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen ? 'h-screen opacity-100' : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={link === 'Source' ? REPO_URL : '#'}
                target={link === 'Source' ? '_blank' : undefined}
                rel={link === 'Source' ? 'noreferrer' : undefined}
                className="text-3xl font-medium text-white/90 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </div>
          <button
            className="mt-6 w-fit rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105"
            onClick={() => setMobileMenuOpen(false)}
          >
            Close
          </button>
        </div>
      </div>

      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <p
            className="mb-4 sm:mb-6 text-xs sm:text-sm text-white/90 animate-[fadeSlideUp_0.8s_ease_0.2s_both]"
          >
            React + Tailwind, built as a frontend demo
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both]"
          >
            Small details,
            <br />
            held together
            <br />
            by motion.
          </h1>
        </div>

        <div>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            A hands-on look at a layered video hero, staggered typography, and a menu that opens
            like it means it — no single element outrunning the rest.
          </p>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="group rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2 animate-[fadeSlideUp_0.8s_ease_0.9s_both]"
          >
            View the Code
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 hidden justify-center sm:flex animate-[fadeSlideUp_0.8s_ease_1.2s_both]">
          <ChevronDown size={18} className="text-white/40 animate-[softBounce_2.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
