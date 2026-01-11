# Hypercar Landing Page

A premium, scroll-animated landing page for a hypercar brand built with React (Vite), Tailwind CSS, and GSAP ScrollTrigger.

## Features

- **Single-page, scrollable design** with smooth premium animations
- **Three sections:**
  1. **Hero Section** (200vh, pinned) - Centered hypercar with parallax background text
  2. **Performance Specs** (100vh) - Car shifts left, specs animate in from sides
  3. **Brand Reveal** (100vh) - Large brand text scales in, car moves to corner
- **GSAP ScrollTrigger** with `scrub: 1` for scroll-driven animations
- **Mobile responsive** - No horizontal overflow, specs stack on mobile
- **Idle animations** - Subtle vertical float on hero car
- **Clean code structure** - Uses `useRef` and scoped GSAP contexts

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your hypercar image:**
   - Place a PNG image of a hypercar (3/4 side profile, transparent background) in the `public/` folder
   - Name it `hypercar.png`
   - Recommended size: 800-1200px wide, transparent PNG format

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

"""
# F30 Showcase — BMW 3 Series (F30)

This is a polished showcase landing page for the BMW F30 (3 Series) built with React + Vite, styled with Tailwind CSS, and animated with GSAP ScrollTrigger. It uses a horizontal, scroll-pinned flow to present the car, performance specs, and a final "know more" reveal.

## Quick Overview

- Single-page horizontal/pinned scroll layout driven by GSAP ScrollTrigger and container animation.
- Key visual assets: `front.png` (main hero) and `back.png` (end/reveal). These are expected to live in the `public/` folder and are referenced as `/front.png` and `/back.png` in the code.
- Components:
  - `HeroSection.jsx` — pinned hero with parallax & idle float
  - `PerformanceSpecs.jsx` — front view, compact spec cards, animated counters
  - `BrandReveal.jsx` — back/ending panel with CTA and expandable details

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Project Structure

```
.
├── public/                # public assets (place `front.png`, `back.png` here)
├── src/
│   ├── components/
│   │   ├── BrandReveal.jsx
│   │   ├── HeroSection.jsx
│   │   └── PerformanceSpecs.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── tailwind.config.js
```

## How Animations Work

- All GSAP logic lives inside `useEffect` hooks and uses `gsap.context()` for scoped cleanup.
- Scroll-driven transforms and timelines use `ScrollTrigger` with `containerAnimation` (the horizontal scroll container is identified by id `horizontal-scroll` in `App.jsx`).
- Numeric counters in `PerformanceSpecs.jsx` are animated with GSAP `fromTo` tweens updating `innerText`.
- Animations use `scrub: 1` for smooth, scrubbed scroll control. Many transitions are driven with `fromTo` and container-aware start/end positions.

## Assets & Notes

- Place `front.png` and `back.png` in `public/` (referenced as `/front.png` and `/back.png`).
- There used to be detail images in `src/Images/` (e.g., `1.jpg`, `2.jpg`, `3.jpg`) but those were removed and are no longer referenced.
- If you modify component layout or add images, ensure file paths match how Vite serves `public/` assets (use `/your-file.png`).

## Troubleshooting

- If animations don't trigger, confirm that `ScrollTrigger.registerPlugin()` is called and that the horizontal container with id `horizontal-scroll` exists in `App.jsx`.
- If you encounter JSX parse errors after edits, check for unclosed JSX tags or duplicated `useRef` identifiers.

## Development Tips

- Use browser devtools to inspect `ScrollTrigger` instances: `gsap.utils.toArray(ScrollTrigger.getAll())` can help debug triggers.
- For draggable interactions consider adding GSAP Draggable if you want inertia and bounds.

## License

MIT

"""