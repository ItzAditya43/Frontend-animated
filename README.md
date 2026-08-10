# Foldcraft — Animated Fullscreen Hero

A single-viewport landing hero for a fictional creative studio, "Foldcraft." Built as a
frontend demo of a video-background hero pattern: autoplaying looping video, a responsive
navbar with an animated mobile menu, and staggered entrance animations on the hero copy.

**Live demo:** https://itzaditya43.github.io/Frontend-animated/
(deployed automatically from `main` via the workflow in `.github/workflows/deploy.yml`)

## Stack

- React 18 + TypeScript
- Vite 8 (dev server / build)
- Tailwind CSS 3 (utility styling, `font-geist` custom font family)
- lucide-react (`ArrowRight`, `Menu`, `X` icons)
- Google Fonts — Geist (weights 300–700), loaded via `<link>` in `index.html`

## Structure

```
src/
  App.tsx       hero section, navbar, mobile menu — all page logic lives here
  main.tsx      React root
  index.css     Tailwind directives, global reset, fadeSlideUp keyframes
index.html      Geist font <link>, page title
tailwind.config.js   font family extension
```

There is intentionally no component split beyond `App.tsx` — the page is one self-contained
section with no routing, no state beyond the mobile-menu toggle, and no data fetching, so a
single file is more legible than scattering ~150 lines across five files.

## What was built and why

**Video background.** A single `<video>` element (`autoPlay muted loop playsInline`) is
positioned `absolute h-full w-full object-cover` with `objectPosition: '70% center'`, sitting
behind every other layer with no explicit `z-index` (default stacking order is enough since
every other section declares its own `z-*`). `muted` + `playsInline` are required for
autoplay to actually fire on mobile Safari/Chrome — without them the video loads but never
plays.

**Navbar.** A flex row with the wordmark + desktop nav links on the left and a CTA button on
the right, all `hidden md:flex` below the `md` breakpoint. Below `md`, a hamburger button
(`z-50`, above the mobile menu overlay) swaps between `Menu` and `X` icons using two
absolutely-stacked icons cross-faded/rotated with Tailwind's `transition-all duration-300` —
simpler and more reliably interruptible mid-animation than swapping the icon in the DOM.

**Mobile menu.** An `inset-x-0 top-0` overlay that animates its own `height` (`h-0` →
`h-screen`) and `opacity` rather than `translate-y`, so the animation reads as the menu
"growing" downward from under the navbar instead of sliding over it. The inner content has a
100ms `delay-100` on top of the panel's own transition so the links visibly fade/slide in
*after* the panel has started opening, which reads as more deliberate than everything
animating in lockstep.

**Hero copy staggering.** Four elements (badge, heading, paragraph, button) each use the same
`fadeSlideUp` keyframe but with increasing delay (0.2s / 0.4s / 0.7s / 0.9s) via Tailwind's
arbitrary-value animation shorthand, e.g. `animate-[fadeSlideUp_0.8s_ease_0.4s_both]`. The
`both` fill-mode keeps each element invisible (`opacity: 0`) until its delay elapses, avoiding
the flash-of-unstyled-content that plain `animation-delay` alone would produce.

**Layout.** The hero content area is sized `h-[calc(100vh-80px)]` (viewport height minus the
navbar's rendered height) and uses `flex flex-col justify-between` to pin the badge/heading to
the top and the paragraph/CTA to the bottom, so the composition holds regardless of exact
viewport height rather than relying on absolute positioning for each piece.

**Secondary motion.** A handful of small, deliberately restrained touches on top of the entry
stagger: the video runs an very slow 24s alternating `scale(1 → 1.06)` (`kenBurns`) so the
background never looks static without reading as an obvious loop; nav links get a `w-0 → w-full`
underline on hover instead of a color-only state change; the "View the Code" arrow nudges
`translate-x-1` on hover; and a small `ChevronDown` at the bottom center does a 6px `softBounce`
to hint the page is a single fixed viewport, not a scroll page. Each of these is a few pixels or
a few percent of scale — nothing competes with the entry animation for attention.

**Content.** The copy was rewritten to describe what the page actually is (a frontend demo of a
layered hero pattern) instead of generic creative-agency marketing copy — including a small
"Demo" tag next to the wordmark and a "View the Code" CTA that links straight to this repo,
rather than a dead "Explore Work" button with nowhere to go.

## Known trade-offs

- No fallback poster image or static background if the video fails to load or autoplay is
  blocked by the browser — acceptable for a demo, not for production.
- `prefers-reduced-motion: reduce` collapses all animations/transitions to effectively instant
  (see `index.css`) rather than removing them individually — simpler, but it also kills
  non-decorative transitions like the mobile menu's open/close, which arguably should stay.
- The `Overview`, `Details`, and `Stack` nav links are placeholders (`href="#"`) since the page
  is a single section with no corresponding content yet; `Source` and both CTAs link to this
  repo.

## Running locally

```bash
npm install
npm run dev      # dev server
npm run build    # production build to dist/
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes
`dist/` to GitHub Pages. `vite.config.ts` sets `base: '/Frontend-animated/'` to match this
repo's current name/Pages path — if the repo is renamed, update `base` (and the live-demo URL
above) to match, or the built asset paths will 404.
