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

## Project Structure

```
├── public/
│   ├── hypercar.svg (placeholder - replace with hypercar.png)
│   └── hypercar.png (add your image here)
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx      # Pinned hero with car animations
│   │   ├── PerformanceSpecs.jsx # Specs section with staggered animations
│   │   └── BrandReveal.jsx      # Brand reveal with car motion
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles & Tailwind
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Animation Details

### Hero Section
- **Pinned during scroll** (200vh height)
- Car scales from `1.2` → `0.85`
- Car rotates on Y-axis from `0deg` → `-10deg`
- Background text "HYPER AERO" moves with parallax (slower than scroll)
- Idle float animation (vertical sine wave, independent of scroll)

### Performance Specs
- Car shifts left by `-20%` (desktop only)
- Specs fade in and translate from alternating sides
- Staggered animation timing
- On mobile: specs stack below car

### Brand Reveal
- Brand text "AERO" scales from `0.5` → `1.0`
- Car moves to bottom-right corner (`30%` x, `30%` y)
- Car scales down to `0.4`

## Tech Stack

- **React 18** with Vite
- **GSAP 3.12+** with ScrollTrigger plugin
- **Tailwind CSS 3.4+**
- **Bebas Neue** & **Syncopate** fonts (Google Fonts)

## Customization

### Update Specs
Edit the `specs` array in `src/components/PerformanceSpecs.jsx`:

```javascript
const specs = [
  { label: 'Top Speed', value: '340', unit: 'km/h' },
  { label: '0-100', value: '2.4', unit: 's' },
  { label: 'Power', value: '1,200', unit: 'hp' },
]
```

### Adjust Animation Timings
All ScrollTrigger configurations use `scrub: 1` for smooth scroll-based animations. You can adjust start/end points in each component's `useEffect` hook.

### Colors & Typography
Colors are defined in Tailwind classes. Typography uses:
- **Bebas Neue** for large headings (hero, brand)
- **Syncopate** for body text and labels

## Browser Support

Modern browsers that support:
- CSS transforms and 3D transforms
- GSAP ScrollTrigger
- ES6+ JavaScript

## Notes

- The page uses pure white background (`#ffffff`)
- No scroll-jacking - native scroll behavior is preserved
- All animations use `ease: "none"` for scroll-driven transforms
- GSAP contexts are properly cleaned up to prevent memory leaks

## License

MIT