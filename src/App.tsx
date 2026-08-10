import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

const NAV_LINKS = ['Home', 'Projects', 'Studio', 'Reach Us'];

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
        src={VIDEO_URL}
      />

      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-10">
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Foldcraft
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <button className="hidden md:block rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform">
          Let's Talk
        </button>

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
                href="#"
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
            Let's Talk
          </button>
        </div>
      </div>

      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <p
            className="mb-4 sm:mb-6 text-xs sm:text-sm text-white/90 animate-[fadeSlideUp_0.8s_ease_0.2s_both]"
          >
            Brand & Visual Storytelling
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both]"
          >
            Shaping visual
            <br />
            narratives,
            <br />
            one pixel at a time.
          </h1>
        </div>

        <div>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/60 max-w-sm sm:max-w-lg mb-5 sm:mb-6 animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            Turning vision into reality through craft, motion, and an endless pursuit of beauty.
          </p>
          <button className="rounded-lg bg-white px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium text-black hover:scale-105 transition-transform inline-flex items-center gap-2 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            Explore Work
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
