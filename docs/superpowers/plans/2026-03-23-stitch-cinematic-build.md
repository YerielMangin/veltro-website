# Stitch Cinematic Build — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a navigable Vite + React site in `stitch-cinematic/` faithfully reproducing 12 Stitch screen designs with full responsive support.

**Architecture:** Client-side SPA with React Router 6, shared Layout (Navbar + Footer + NoiseOverlay) wrapping 12 page routes. GSAP + Lenis for animations. Tailwind 3.4 for styling. All content hardcoded from Stitch HTML source files.

**Tech Stack:** Vite 5, React 19, React Router 6, Tailwind CSS 3.4, GSAP 3.12 + ScrollTrigger, Lenis, Material Symbols, Lucide React, clsx + tailwind-merge.

**Spec:** `docs/superpowers/specs/2026-03-23-stitch-cinematic-build-design.md`

**Stitch HTML source files:** `docs/stitch/html/*.html` — extract all content, colors, and structure from these files.

---

## File Map

### Config & Build
| File | Responsibility |
|------|---------------|
| `stitch-cinematic/package.json` | Dependencies and scripts |
| `stitch-cinematic/vite.config.js` | Vite + React plugin |
| `stitch-cinematic/tailwind.config.js` | Design system tokens (colors, fonts, radius, shadows) |
| `stitch-cinematic/postcss.config.js` | Tailwind + autoprefixer |
| `stitch-cinematic/index.html` | Entry HTML, Google Fonts, Material Symbols, noise SVG |

### Core App
| File | Responsibility |
|------|---------------|
| `stitch-cinematic/src/main.jsx` | React 19 entry, render App |
| `stitch-cinematic/src/App.jsx` | BrowserRouter, Layout wrapper, Lenis setup, ScrollToTop, route definitions |
| `stitch-cinematic/src/index.css` | Tailwind directives, custom utilities (btn-magnetic, btn-layer, glass-card, noise-overlay, no-scrollbar) |
| `stitch-cinematic/src/lib/cn.js` | clsx + tailwind-merge utility |

**All file paths in these tables and the tasks below are relative to `stitch-cinematic/`.**

### Shared Components
| File | Responsibility |
|------|---------------|
| `src/components/layout/Navbar.jsx` | Fixed pill navbar, scroll morph, mobile hamburger overlay |
| `src/components/layout/Footer.jsx` | Charcoal footer, link grid, status indicator |
| `src/components/layout/Layout.jsx` | Navbar + main + Footer + NoiseOverlay composition |
| `src/components/shared/NoiseOverlay.jsx` | Renders fixed SVG grain texture (component, not in index.html) |
| `src/components/shared/BlurOrb.jsx` | Decorative gradient blur circles |
| `src/components/shared/SectionWrapper.jsx` | Consistent section padding, max-width, responsive spacing |
| `src/components/shared/ScrollReveal.jsx` | GSAP scroll-triggered entrance (y translate only) |

### UI Components
| File | Responsibility |
|------|---------------|
| `src/components/ui/MagneticButton.jsx` | CTA button with variants (clay, moss, outline), sliding bg hover |
| `src/components/ui/Badge.jsx` | Status/category pill badges |
| `src/components/ui/Card.jsx` | Reusable card with hover lift, rounded-xl |
| `src/components/ui/Accordion.jsx` | Details/summary FAQ accordion with chevron rotation |

### Micro-UI Components
| File | Responsibility |
|------|---------------|
| `src/components/micro/DiagnosticShuffler.jsx` | Cycling work order card stack (3s interval) |
| `src/components/micro/TelemetryTypewriter.jsx` | Character-by-character monospace data feed |
| `src/components/micro/CursorScheduler.jsx` | GSAP-animated cursor on weekly grid |

### Pages (all under `src/pages/`)
| File | Stitch Source | Key Sections |
|------|--------------|-------------|
| `Home.jsx` | `home.html` | Hero, Features (micro-UIs), Philosophy, Protocol, CTA |
| `Features.jsx` | `features.html` | Hero, Connected Flow carousel, 4 alternating feature sections |
| `VisualFeatures.jsx` | `visual-features.html` | Hero, carousel, 3 alternating sections |
| `Pricing.jsx` | `pricing.html` | Hero, 3-tier grid, FAQ accordion, CTA |
| `Contact.jsx` | `contact.html` | Hero, form + info cards |
| `About.jsx` | `about.html` | Hero, Story, Values, Numbers, CTA |
| `BlogIndex.jsx` | `blog-index.html` | Hero, filter pills, featured post, grid, newsletter |
| `BlogPost.jsx` | `blog-post.html` | Header, article + TOC sidebar, related posts, CTA |
| `Customers.jsx` | `customers.html` | Hero, featured story, grid, industry tags, CTA |
| `Integrations.jsx` | `integrations.html` | Hero, filter pills, grid, API section, CTA |
| `Security.jsx` | `security.html` | Hero, principles, infrastructure, practices, CTA |
| `Careers.jsx` | `careers.html` | Hero, values, positions, CTA |


---

## Task 1: Project Scaffold & Build Config

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/index.css`, `src/lib/cn.js`

- [ ] **Step 1: Create package.json with all dependencies**

```json
{
  "name": "stitch-cinematic",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^6.28.0",
    "gsap": "^3.12.5",
    "lenis": "^1.3.19",
    "lucide-react": "^0.447.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.41",
    "tailwindcss": "^3.4.17",
    "vite": "^5.4.3"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5174 }
})
```

- [ ] **Step 3: Create tailwind.config.js with full design system**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#182a21', container: '#2e4036' },
        secondary: { DEFAULT: '#a53c19', container: '#ff7e55' },
        clay: '#cc5833',
        surface: {
          DEFAULT: '#fbf9f2',
          dim: '#dcdad3',
          bright: '#fbf9f2',
          container: {
            DEFAULT: '#f0eee7',
            low: '#f6f4ec',
            high: '#eae8e1',
            highest: '#e4e2dc',
            lowest: '#ffffff',
          },
        },
        tertiary: { DEFAULT: '#262626', container: '#3c3c3c' },
        'on-surface': '#1b1c18',
        'on-primary': '#ffffff',
        'outline-variant': '#c3c8c2',
      },
      fontFamily: {
        headline: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Outfit"', 'sans-serif'],
        label: ['"IBM Plex Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        xl: '3rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      boxShadow: {
        ambient: '0 40px 60px -15px rgba(24, 42, 33, 0.04)',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Create postcss.config.js**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: Create index.html with fonts and Material Symbols (noise SVG lives in NoiseOverlay component)**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Veltro — Velocity + Control</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Cormorant+Garamond:ital,wght@1,300..700&family=Outfit:wght@300..500&family=IBM+Plex+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  </head>
  <body class="bg-surface text-on-surface font-body antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  ::selection {
    @apply bg-clay text-white;
  }
}

@layer components {
  .btn-magnetic {
    @apply relative overflow-hidden transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] active:scale-[0.98];
  }
  .btn-layer {
    @apply absolute inset-0 -z-10 bg-current transition-transform duration-500 ease-out translate-y-full group-hover:translate-y-0;
  }
  .glass-card {
    @apply bg-white/40 backdrop-blur-md border border-white/20 rounded-3xl;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 7: Create src/lib/cn.js**

```js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 8: Create src/main.jsx**

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

- [ ] **Step 9: Install dependencies**

Run: `cd stitch-cinematic && npm install`
Expected: `node_modules/` created, no errors.

- [ ] **Step 10: Verify dev server starts**

Run: `cd stitch-cinematic && npm run dev`
Expected: Vite dev server starts on port 5174 with no errors.

- [ ] **Step 11: Commit**

```bash
git add stitch-cinematic/
git commit -m "feat(stitch-cinematic): scaffold Vite + React project with design system tokens"
```

---

## Task 2: Shared Components (Layout, UI, Utilities)

**Files:**
- Create: `src/components/shared/NoiseOverlay.jsx`, `src/components/shared/BlurOrb.jsx`, `src/components/shared/SectionWrapper.jsx`, `src/components/shared/ScrollReveal.jsx`, `src/components/ui/MagneticButton.jsx`, `src/components/ui/Badge.jsx`, `src/components/ui/Card.jsx`, `src/components/ui/Accordion.jsx`

- [ ] **Step 1: Create NoiseOverlay.jsx**

```jsx
export default function NoiseOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 isolate z-50 h-full w-full opacity-[0.05] mix-blend-soft-light"
      aria-hidden="true"
    >
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  )
}
```

- [ ] **Step 2: Create BlurOrb.jsx**

```jsx
import { cn } from '../../lib/cn'

export default function BlurOrb({ color = 'bg-clay', size = 'w-96 h-96', className, ...props }) {
  return (
    <div
      className={cn('absolute rounded-full blur-[120px] opacity-20', color, size, className)}
      aria-hidden="true"
      {...props}
    />
  )
}
```

- [ ] **Step 3: Create SectionWrapper.jsx**

```jsx
import { cn } from '../../lib/cn'

export default function SectionWrapper({ children, className, dark, id, ...props }) {
  return (
    <section
      id={id}
      className={cn(
        'px-5 md:px-8 lg:px-12 xl:px-16 py-16 md:py-20 lg:py-24',
        dark ? 'bg-tertiary text-white' : 'bg-surface text-on-surface',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}
```

- [ ] **Step 4: Create ScrollReveal.jsx**

```jsx
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '../../lib/cn'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({ children, className, delay = 0, y = 40, stagger = 0, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      const targets = stagger ? ref.current.children : ref.current
      gsap.from(targets, {
        y,
        duration: 0.8,
        delay,
        stagger: stagger || 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
          once: true,
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [delay, y, stagger])

  return (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  )
}
```

- [ ] **Step 5: Create MagneticButton.jsx**

Reference: Stitch HTML button patterns — pill shape, clay/moss/outline variants, sliding bg layer.

```jsx
import { cn } from '../../lib/cn'
import { Link } from 'react-router-dom'

const variants = {
  clay: 'bg-clay text-white hover:bg-secondary',
  moss: 'bg-primary text-white hover:bg-primary-container',
  outline: 'bg-transparent text-primary border border-outline-variant/20 hover:bg-surface-container',
}

export default function MagneticButton({ children, variant = 'clay', href, to, className, ...props }) {
  const classes = cn(
    'group relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-headline font-bold text-sm md:text-base transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] active:scale-[0.98] overflow-hidden',
    variants[variant],
    className
  )

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={classes} {...props}>{children}</a>
  }

  return <button className={classes} {...props}>{children}</button>
}
```

- [ ] **Step 6: Create Badge.jsx**

```jsx
import { cn } from '../../lib/cn'

export default function Badge({ children, variant = 'default', className, ...props }) {
  const variants = {
    default: 'bg-clay/10 text-clay',
    primary: 'bg-primary/10 text-primary',
    outline: 'border border-outline-variant/20 text-on-surface',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 font-label text-[10px] uppercase tracking-widest font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 7: Create Card.jsx**

```jsx
import { cn } from '../../lib/cn'

export default function Card({ children, className, hover = true, ...props }) {
  return (
    <div
      className={cn(
        'rounded-xl bg-surface-container-lowest shadow-ambient',
        hover && 'transition-transform duration-300 hover:-translate-y-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 8: Create Accordion.jsx**

```jsx
import { cn } from '../../lib/cn'

export default function Accordion({ items, className }) {
  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, i) => (
        <details key={i} className="group rounded-xl bg-surface-container-lowest p-6 shadow-ambient">
          <summary className="flex cursor-pointer items-center justify-between font-headline font-bold text-lg text-primary list-none">
            {item.question}
            <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180">
              expand_more
            </span>
          </summary>
          <p className="mt-4 font-body text-on-surface/70 leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
```

- [ ] **Step 9: Commit**

```bash
git add stitch-cinematic/src/components/
git commit -m "feat(stitch-cinematic): add shared and UI components"
```

---

## Task 3: Navbar & Footer

**Files:**
- Create: `src/components/layout/Navbar.jsx`, `src/components/layout/Footer.jsx`, `src/components/layout/Layout.jsx`

- [ ] **Step 1: Create Navbar.jsx**

Build the floating pill navbar with:
- Fixed centered position, `rounded-full`
- Scroll morph: transparent → `bg-surface/60 backdrop-blur-xl` at 50px scroll
- Desktop (md+): Logo + nav links (Features, Pricing, Use Cases, Blog) + "Start Trial" CTA
- "Use Cases" links to `/customers` (no dedicated use-cases page in this prototype)
- Mobile (<md): Logo + hamburger icon → full-screen overlay menu
- Active link detection via `useLocation()`
- Extract exact nav link text and structure from `docs/stitch/html/home.html`

- [ ] **Step 2: Create Footer.jsx**

Build the charcoal footer with:
- `bg-tertiary`, `rounded-t-[4rem]`
- Multi-column link grid (Product, Company, Resources, Legal)
- Brand section with Veltro logo + tagline
- System status indicator: pulsing dot + "Operational Pulse" label in monospace
- Copyright + legal links bottom bar
- Responsive: 2-col tablet, 1-col phone
- Extract exact link text and structure from `docs/stitch/html/home.html` footer

- [ ] **Step 3: Create Layout.jsx**

```jsx
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import NoiseOverlay from '../shared/NoiseOverlay'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function Layout() {
  return (
    <>
      <ScrollToTop />
      <NoiseOverlay />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Create App.jsx with routes**

```jsx
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Layout from './components/layout/Layout'

import Home from './pages/Home'
import Features from './pages/Features'
import VisualFeatures from './pages/VisualFeatures'
import Pricing from './pages/Pricing'
import Contact from './pages/Contact'
import About from './pages/About'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import Customers from './pages/Customers'
import Integrations from './pages/Integrations'
import Security from './pages/Security'
import Careers from './pages/Careers'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis()
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Features />} />
        <Route path="features/visual" element={<VisualFeatures />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} /> {/* :slug is accepted but ignored — always renders predictive-maintenance content */}
        <Route path="customers" element={<Customers />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="security" element={<Security />} />
        <Route path="careers" element={<Careers />} />
        <Route path="*" element={<Home />} /> {/* Catch-all: redirect unknown routes to home */}
      </Route>
    </Routes>
  )
}
```

- [ ] **Step 5: Create placeholder pages**

Create all 12 page files (`src/pages/*.jsx`) with minimal placeholder content so routes work:

```jsx
export default function PageName() {
  return <div className="min-h-screen flex items-center justify-center font-headline text-4xl">Page Name</div>
}
```

- [ ] **Step 6: Verify all routes render**

Run: `npm run dev`
Navigate to each route and verify placeholder renders with navbar and footer.

- [ ] **Step 7: Commit**

```bash
git add stitch-cinematic/
git commit -m "feat(stitch-cinematic): add layout (Navbar, Footer) and routing with placeholder pages"
```

---

## Task 4: Home Page

**Files:**
- Create: `src/pages/Home.jsx`, `src/components/micro/DiagnosticShuffler.jsx`, `src/components/micro/TelemetryTypewriter.jsx`, `src/components/micro/CursorScheduler.jsx`

**Source:** `docs/stitch/html/home.html` — extract all text content, section structure, and styling from this file.

- [ ] **Step 1: Create DiagnosticShuffler.jsx**

3 overlapping pill cards cycling every 3s. Stack: index 0 = full opacity/scale, index 1 = 40%/90%/translate-y-12, index 2 = 20%/75%/translate-y-24. Use `useState` + `setInterval` with spring-bounce transition. Check `prefers-reduced-motion` — if enabled, show static stack without cycling.

- [ ] **Step 2: Create TelemetryTypewriter.jsx**

Monospace character-by-character text reveal at 50ms intervals, looping. "Live Feed" pulsing dot. Blinking cursor. Charcoal bg, clay text accents. Check `prefers-reduced-motion` — if enabled, show full text immediately without typing animation.

- [ ] **Step 3: Create CursorScheduler.jsx**

Weekly grid (S M T W T F S) with GSAP-animated arrow cursor. Timeline: move to cell → scale 0.8 "click" → move to "Save" → fade → repeat. Active day highlighted in clay. Check `prefers-reduced-motion` — if enabled, show static grid without cursor animation.

- [ ] **Step 4: Build Home.jsx**

Sections (extract all text from `home.html`):
1. **Hero**: 100dvh, bg image with gradient overlays, two-line headline (sans bold + display italic "Rhythm." in clay), CTA button, bouncing scroll indicator. GSAP staggered entrance on mount.
2. **Features**: "How it works" heading, 3 micro-UI cards in glass-card containers. Responsive: 3-col → 1-col.
3. **Philosophy**: Charcoal bg, parallax texture image. Two contrasting statements with word-by-word ScrollTrigger reveal.
4. **Protocol**: 3 sticky-stacking cards (h-[716px], top offsets 153/204/256px). GSAP ScrollTrigger scrub: blur/scale/fade on overlap. Simplified on mobile (< lg).
5. **CTA**: Cream bg, display italic headline + clay accent, moss CTA button.

- [ ] **Step 5: Verify Home page renders**

Run: `npm run dev`, navigate to `/`
Expected: All 5 sections visible, animations working, responsive on resize.

- [ ] **Step 6: Test mobile responsiveness**

Open browser DevTools, test at 375px (phone), 768px (tablet), 1280px (desktop).
Expected: Hero text scales, cards stack, Protocol simplified on mobile.

- [ ] **Step 7: Commit**

```bash
git add stitch-cinematic/src/
git commit -m "feat(stitch-cinematic): implement Home page with micro-UIs and Protocol"
```

---

## Task 5: Features & Visual Features Pages

**Files:**
- Create: `src/pages/Features.jsx`, `src/pages/VisualFeatures.jsx`

**Source:** `docs/stitch/html/features.html` and `docs/stitch/html/visual-features.html`

- [ ] **Step 1: Build Features.jsx**

Sections:
1. **Hero**: Dark tertiary bg with BlurOrb decorations. Display italic headline.
2. **Connected Flow**: Horizontal scrollable card carousel (6 steps: Inspection → Finding → Work Order → Assignment → Resolution → Dashboard). Cards linked by pulsing arrow icons. `overflow-x-auto no-scrollbar snap-x snap-mandatory`. Each card: image + icon + title + description.
3. **Feature Sections**: 4 alternating image+text grids. Monospace step numbers (01-04) in clay. Grid reverses direction (`md:flex-row-reverse`) on even sections.

Extract all text content from `features.html`.

- [ ] **Step 2: Build VisualFeatures.jsx**

Similar structure to Features — reuse carousel pattern. Dark hero + 6-card carousel + 3 alternating sections. Extract from `visual-features.html`.

- [ ] **Step 3: Verify both pages**

Run: `npm run dev`, navigate to `/features` and `/features/visual`.
Expected: Carousels scroll horizontally, sections alternate correctly, responsive.

- [ ] **Step 4: Commit**

```bash
git add stitch-cinematic/src/pages/Features.jsx stitch-cinematic/src/pages/VisualFeatures.jsx
git commit -m "feat(stitch-cinematic): implement Features and Visual Features pages"
```

---

## Task 6: Pricing Page

**Files:**
- Modify: `src/pages/Pricing.jsx`

**Source:** `docs/stitch/html/pricing.html` — extract exact tier names, prices, feature lists, and FAQ items.

- [ ] **Step 1: Build Pricing.jsx**

Sections:
1. **Hero**: Light cream bg, display italic "Pricing." headline.
2. **Pricing Grid**: 3 tiers extracted from pricing.html. Middle card: dark primary bg, `scale-105`, "MOST POPULAR" badge (absolute positioned). Feature lists with Material Symbols `check_circle` icons.
3. **FAQ**: Accordion component with 5 items extracted from pricing.html.
4. **CTA**: Dark tertiary bg, "Still deciding?" with clay accent.

Responsive: Cards stack on phone (highlighted first). FAQ full width.

- [ ] **Step 2: Verify pricing page**

Run: `npm run dev`, navigate to `/pricing`.
Test at phone/tablet/desktop. Verify cards reorder on mobile.

- [ ] **Step 3: Commit**

```bash
git add stitch-cinematic/src/pages/Pricing.jsx
git commit -m "feat(stitch-cinematic): implement Pricing page with FAQ accordion"
```

---

## Task 7: Contact Page

**Files:**
- Modify: `src/pages/Contact.jsx`

**Source:** `docs/stitch/html/contact.html`

- [ ] **Step 1: Build Contact.jsx**

Sections:
1. **Hero**: Light bg, display italic "Get in touch."
2. **Content**: 2-column grid (`md:grid-cols-2`).
   - Left: Form with IBM Plex Mono labels (uppercase, tracking-widest), surface-container-high input backgrounds, `rounded-[1.5rem]`, no borders. Fields: Name (2-col grid: first/last), Email, Company, Subject, Message (textarea).
   - Right: 3 info cards (Sales, Support, Partnerships). Material Symbols icons (payments, support_agent, handshake). Email links in monospace clay color. Cards have hover translate-x-1.

Responsive: Stack vertically on phone, form first. Form name fields stack to 1-col.

- [ ] **Step 2: Verify contact page**

Run: `npm run dev`, navigate to `/contact`.
Test responsive stacking and form layout.

- [ ] **Step 3: Commit**

```bash
git add stitch-cinematic/src/pages/Contact.jsx
git commit -m "feat(stitch-cinematic): implement Contact page with form and info cards"
```

---

## Task 8: About Page

**Files:**
- Modify: `src/pages/About.jsx`

**Source:** `docs/stitch/html/about.html`

- [ ] **Step 1: Build About.jsx**

Sections:
1. **Hero**: Dark primary bg with BlurOrb (secondary). Display italic headline.
2. **Story**: 2-column: text left + image right. Image has `grayscale-[20%] hover:grayscale-0` transition. Overlay "Internal Motto" note card (`bg-surface/90 backdrop-blur rounded-lg`).
3. **Values**: 3 cards on dark bg (#2a2a2a → #323232 on hover). Material Symbols icons in secondary/20 circles.
4. **By the Numbers**: 4-column metrics grid. Large display italic numbers in clay color. Extract exact numbers from about.html.
5. **CTA**: Dark bg with grid pattern background effect.

Responsive: Story stacks. Numbers: 2-col on tablet/phone.

- [ ] **Step 2: Verify about page**

Test all sections, image hover, responsive grid.

- [ ] **Step 3: Commit**

```bash
git add stitch-cinematic/src/pages/About.jsx
git commit -m "feat(stitch-cinematic): implement About page with story, values, and metrics"
```

---

## Task 9: Blog Index & Blog Post Pages

**Files:**
- Modify: `src/pages/BlogIndex.jsx`, `src/pages/BlogPost.jsx`

**Source:** `docs/stitch/html/blog-index.html` and `docs/stitch/html/blog-post.html`

- [ ] **Step 1: Build BlogIndex.jsx**

Sections:
1. **Hero**: INSIGHTS monospace label, display italic headline, subtitle.
2. **Filter Pills**: Horizontal scrollable pills (All active, others outlined). `overflow-x-auto no-scrollbar`.
3. **Featured Post**: Large card with 50/50 layout (`md:grid-cols-2`). Image left with `group-hover:scale-105`. "FEATURED" badge. Title, excerpt, author avatar, read time.
4. **Recent Posts**: 3-column grid. Post cards: image, category badge, title, excerpt, author avatar + date.
5. **Newsletter**: Dark primary bg. Email input + subscribe button.

Responsive: Featured post stacks. Grid: 2-col tablet, 1-col phone.

- [ ] **Step 2: Build BlogPost.jsx**

Sections:
1. **Header**: Category badge, display headline, author/date in monospace.
2. **Featured Image**: Full width, `rounded-xl`.
3. **Content**: 2-column on desktop (`lg:grid-cols-[1fr_280px]`). Left: article body with styled h2, p, blockquote (border-l-4 border-clay, display italic), code block (tertiary bg, monospace). Right: sticky TOC sidebar (`sticky top-32`) with bullet indicators + share buttons.
4. **Related Posts**: 3-column card grid.
5. **CTA Banner**: primary-container bg with BlurOrb decoration.

Hardcode content from blog-post.html. TOC hidden on < lg.

- [ ] **Step 3: Verify both pages**

Navigate to `/blog` and `/blog/predictive-maintenance`. Test filter pills scroll, featured post layout, TOC sticky behavior, responsive stacking.

- [ ] **Step 4: Commit**

```bash
git add stitch-cinematic/src/pages/BlogIndex.jsx stitch-cinematic/src/pages/BlogPost.jsx
git commit -m "feat(stitch-cinematic): implement Blog Index and Blog Post pages"
```

---

## Task 10: Customers Page

**Files:**
- Modify: `src/pages/Customers.jsx`

**Source:** `docs/stitch/html/customers.html`

- [ ] **Step 1: Build Customers.jsx**

Sections:
1. **Hero**: Dark tertiary bg, display italic "Teams that found their rhythm."
2. **Featured Story**: 50/50 grid: image left + testimonial right. Large display italic blockquote. Metrics (e.g., "40%" in bold clay, followed by descriptor). Author attribution.
3. **Customer Grid**: 4 cards (2x2 on desktop). Each: image, company, industry badge, quote excerpt.
4. **Industry Tags**: Horizontal pills with Material Symbols icons (domain, health_and_safety, school, factory).
5. **CTA**: Dark primary bg.

Responsive: Featured stacks. Grid: 2-col tablet, 1-col phone.

- [ ] **Step 2: Verify customers page**

Run: `npm run dev`, navigate to `/customers`. Test at phone/tablet/desktop.

- [ ] **Step 3: Commit**

```bash
git add stitch-cinematic/src/pages/Customers.jsx
git commit -m "feat(stitch-cinematic): implement Customers page with featured story and grid"
```

---

## Task 11: Integrations Page

**Files:**
- Modify: `src/pages/Integrations.jsx`

**Source:** `docs/stitch/html/integrations.html`

- [ ] **Step 1: Build Integrations.jsx**

Sections:
1. **Hero**: Light bg, display italic "Fits right into your workflow."
2. **Filter Pills**: Category filters (All, Communication, ERP, IoT, Storage, Identity).
3. **Integration Grid**: 3-column, 6 cards. Each: icon in surface-container circle, name, category (monospace), description, status badge ("Available" primary/5, "Coming Soon" clay/10).
4. **API Section**: Dark tertiary bg, 2-column: left = text + bullet points, right = code block (black bg, monospace, syntax highlighting with colored spans).
5. **CTA**: Light bg, "Don't see your tool?"

Responsive: Grid 2-col tablet, 1-col phone. Code block horizontal scroll.

- [ ] **Step 2: Verify integrations page**

Run: `npm run dev`, navigate to `/integrations`. Test filter pills, grid layout, code block scroll.

- [ ] **Step 3: Commit**

```bash
git add stitch-cinematic/src/pages/Integrations.jsx
git commit -m "feat(stitch-cinematic): implement Integrations page with API section"
```

---

## Task 12: Security Page

**Files:**
- Modify: `src/pages/Security.jsx`

**Source:** `docs/stitch/html/security.html`

- [ ] **Step 1: Build Security.jsx**

Sections:
1. **Hero**: Dark tertiary bg with BlurOrbs.
2. **Principles**: 3 cards (Tenant Isolation, Encryption, Access Control). Material Symbols icons (hub, encrypted, admin_panel_settings). Surface-container-lowest bg.
3. **Infrastructure**: Dark primary bg, 2-column. Left: text + monospace item list. Right: nested diagram boxes with icons.
4. **Practices**: 4 expandable items with icons. Flex row: icon + title + monospace label. Group-hover color change.
5. **CTA**: Light bg, "Questions about security?"

Responsive: Cards 1-col on phone. Infrastructure stacks.

- [ ] **Step 2: Verify security page**

Run: `npm run dev`, navigate to `/security`. Test principle cards, infrastructure diagram, responsive stacking.

- [ ] **Step 3: Commit**

```bash
git add stitch-cinematic/src/pages/Security.jsx
git commit -m "feat(stitch-cinematic): implement Security page with infrastructure diagram"
```

---

## Task 13: Careers Page

**Files:**
- Modify: `src/pages/Careers.jsx`

**Source:** `docs/stitch/html/careers.html`

- [ ] **Step 1: Build Careers.jsx**

Sections:
1. **Hero**: Full-height bg image + gradient overlay from primary. Display italic headline.
2. **Why Veltro**: 2-column: left = display headline, right = 3 value cards (number label + icon + title + description).
3. **Open Positions**: 4 job cards. Each: title (bold), category badge (monospace, clay), location (Material Symbols `public` + "Remote"), "View role →" link with group-hover:translate-x-1.
4. **CTA**: Dark tertiary bg.

Responsive: Value cards 1-col on phone. Job cards full width stacked.

- [ ] **Step 2: Verify careers page**

Run: `npm run dev`, navigate to `/careers`. Test hero, value cards, job cards, responsive stacking.

- [ ] **Step 3: Commit**

```bash
git add stitch-cinematic/src/pages/Careers.jsx
git commit -m "feat(stitch-cinematic): implement Careers page with job listings"
```

---

## Task 14: Download Images & Final Polish

**Files:**
- Create: `public/images/` directory with downloaded images
- Modify: All page files to reference local images

- [ ] **Step 1: Extract and download images from Stitch HTML**

Parse all `docs/stitch/html/*.html` files for image URLs (Google-hosted `lh3.googleusercontent.com/aida-public/` URLs). Download each into `stitch-cinematic/public/images/` with descriptive names (e.g., `hero-home.jpg`, `about-team.jpg`, `blog-featured.jpg`).

If Stitch images are placeholder/unavailable, use solid surface-container background colors as fallbacks.

- [ ] **Step 2: Update all pages to reference local images**

Replace any hardcoded Google URLs with `/images/filename.ext` paths. Add `loading="lazy"` to non-hero images.

- [ ] **Step 3: Cross-page responsive audit**

Test every page at 375px, 768px, and 1280px:
- Typography scales correctly
- Grids collapse properly
- Touch targets ≥ 44px
- No horizontal overflow
- Navbar hamburger works
- Footer stacks cleanly

- [ ] **Step 4: Verify production build**

Run: `cd stitch-cinematic && npm run build`
Expected: Build completes with no errors. Output in `dist/`.

Run: `npm run preview`
Expected: Preview server starts, site works on all routes.

- [ ] **Step 5: Commit**

```bash
git add stitch-cinematic/
git commit -m "feat(stitch-cinematic): add images and responsive polish"
```

---

## Task 15: Final Build Verification

- [ ] **Step 1: Run dev server and test all 12 routes**

Navigate to each route in order: `/`, `/features`, `/features/visual`, `/pricing`, `/contact`, `/about`, `/blog`, `/blog/predictive-maintenance`, `/customers`, `/integrations`, `/security`, `/careers`.

Verify:
- No console errors
- All sections render
- GSAP animations trigger on scroll
- Navigation between pages works (Navbar links, CTA buttons)
- Footer renders on every page
- Noise overlay visible

- [ ] **Step 2: Run production build**

Run: `npm run build && npm run preview`
Expected: No errors, site fully functional in preview mode.

- [ ] **Step 3: Final commit**

```bash
git add stitch-cinematic/
git commit -m "feat(stitch-cinematic): complete 12-page cinematic site from Stitch designs"
```
