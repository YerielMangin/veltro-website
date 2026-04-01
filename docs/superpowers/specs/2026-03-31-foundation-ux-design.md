# Foundation UX — Design Spec

> **Scope:** Accessibility infrastructure, WCAG contrast compliance, touch targets, performance fixes, animation timing.
> **Prerequisite for:** Navigation & Interaction spec, Content & Conversion spec.
> **Does NOT include:** Homepage content rewrites, navigation restructuring, mobile menu animation, breadcrumbs, layout redesigns.

---

## Context

A 6-agent UI/UX analysis (saved at `docs/plans/2026-03-31-ux-improvement-plan.md`) found 67 issues across the Veltro marketing website. This spec covers **Phase 1: Foundation** — the critical accessibility, contrast, performance, and timing fixes that must ship before any content or navigation work begins.

### Tech Stack

- Next.js 15+ (App Router, Turbopack)
- TypeScript 5.7+
- Tailwind CSS v4
- GSAP + ScrollTrigger (animation)
- PostHog (analytics)
- Vercel hosting

### Design System Reference

The cinematic design system is documented in `CLAUDE.md` under "Cinematic Design System (Stitch Reference)". Key tokens:

| Token | Current Hex | Notes |
|-------|------------|-------|
| Moss | `#2E4036` | Primary dark green |
| Clay | `#CC5833` | Accent — **changes to `#B84A28`** |
| Cream | `#F2F0E9` | Light background |
| Charcoal | `#1A1A1A` | Deep dark |

---

## 1. Accessibility Infrastructure

### 1.1 Skip-to-Content Link

Add a visually-hidden skip link as the **first child** inside the marketing layout (`src/app/(marketing)/layout.tsx`), before `<Header />`. It targets `<main id="main-content">`.

**Behavior:**
- Hidden by default using Tailwind `sr-only`
- Becomes visible on keyboard focus using `focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]`
- Styled as a small pill with `bg-clay text-cream rounded-full px-4 py-2 font-heading text-sm font-semibold`
- Links to `#main-content`

**Changes:**
- `src/app/(marketing)/layout.tsx` — add skip link before `<Header />`, add `id="main-content"` to `<main>`

### 1.2 `useReducedMotion` Hook

Create a shared React hook at `src/lib/useReducedMotion.ts` that returns a boolean.

**Implementation:**
```typescript
import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

**Usage pattern in every GSAP component:**
```typescript
const reducedMotion = useReducedMotion();

useEffect(() => {
  if (reducedMotion) {
    // Set all animated elements to their final visible state
    gsap.set(".hero-line-1, .hero-line-2, .hero-cta, .hero-sub", { opacity: 1, y: 0 });
    return;
  }
  // ... existing GSAP animation code
}, [reducedMotion]);
```

**Components that must integrate this hook (8 total):**
- `src/components/marketing/HeroSection.tsx`
- `src/components/marketing/FeaturesSection.tsx`
- `src/components/marketing/PhilosophySection.tsx`
- `src/components/marketing/ProtocolSection.tsx`
- `src/components/marketing/CTASection.tsx`
- `src/components/animations/ConcentricCircles.tsx`
- `src/components/animations/ScanningLaser.tsx`
- `src/components/animations/PulsingWaveform.tsx`

### 1.3 CSS Reduced Motion Override

In `src/styles/globals.css`, add:

```css
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 1.4 Global Focus-Visible Styles

In `src/styles/globals.css`, add:

```css
*:focus-visible {
  outline: 2px solid var(--color-clay);
  outline-offset: 2px;
  border-radius: 4px;
}
```

This applies to all interactive elements globally. The clay color (`#B84A28` after the update) provides sufficient contrast on both cream and charcoal backgrounds.

### 1.5 Heading Hierarchy Fix

In `src/components/marketing/HeroSection.tsx`, wrap both headline lines in a single `<h1>` with internal `<span>` elements for styling:

```html
<h1>
  <span className="hero-line-1 ...">Your operation has a</span>
  <span className="hero-line-2 ...">Rhythm.</span>
</h1>
```

The `<h1>` gets no visual styling itself (it inherits from children). The two `<span>` elements keep their existing classes for GSAP targeting and typography. This preserves the visual layout while providing correct heading semantics.

### 1.6 Newsletter Form Label

In `src/components/forms/NewsletterForm.tsx`:
- Add `<label htmlFor="newsletter-email" className="sr-only">Email address</label>` before the input
- Add `id="newsletter-email"` and `aria-label="Email address"` to the `<input>`

### 1.7 Nav ARIA Attributes

In `src/components/layout/Header.tsx`:
- Add `aria-label="Main navigation"` to the `<nav>` element (line 42)
- Add `aria-expanded={mobileOpen}` and `aria-controls="mobile-menu"` to the hamburger `<button>` (line 91)
- Add `id="mobile-menu"` to the mobile dropdown `<div>` (line 101)

In `src/components/layout/Footer.tsx`:
- Wrap the footer link columns in `<nav aria-label="Footer navigation">`

---

## 2. Contrast Fixes

### 2.1 Clay Color Update

**Change from `#CC5833` to `#B84A28` globally.**

**File:** `src/styles/globals.css`

Update the clay token scale. The middle value shifts from `#CC5833` to `#B84A28`. Recalculate the surrounding scale values to maintain proportional steps:

| Token | Current | New |
|-------|---------|-----|
| `--color-clay-50` | `#FCEEE9` | `#FCEEE9` (unchanged) |
| `--color-clay-100` | `#F9DDD3` | `#F9DDD3` (unchanged) |
| `--color-clay-200` | `#F2BBA7` | `#F0B8A2` |
| `--color-clay-300` | `#EC997B` | `#E2916E` |
| `--color-clay-400` | `#E5774F` | `#D46A3A` |
| `--color-clay` | `#CC5833` | `#B84A28` |
| `--color-clay-600` | `#A34629` | `#933B20` |
| `--color-clay-700` | `#7A351F` | `#6E2C18` |
| `--color-clay-800` | `#512314` | `#491E10` |
| `--color-clay-900` | `#29120A` | `#250F08` |

Also update semantic tokens that reference clay:
- `--color-ring: #B84A28;`
- `--color-primary: #B84A28;`
- Dark mode `--color-primary: #D46A3A;` (lighter variant for dark mode, was `#E5774F`)

Also update the `::selection` block:
```css
::selection {
  background-color: #B84A28;
  color: #F2F0E9;
}
```

### 2.2 Opacity Adjustments (Selective Strategy)

**Rule:** Interactive/informational text -> 4.5:1 minimum. Ambient/decorative text -> 3:1 minimum.

| File | Element | Current | New |
|------|---------|---------|-----|
| `src/components/marketing/FeaturesSection.tsx:44` | Eyebrow `// capabilities` | `text-charcoal/40` | `text-charcoal/50` |
| `src/components/marketing/HeroSection.tsx:74` | Subtitle "No credit card required" | `text-cream/50` | `text-cream/70` |
| `src/components/marketing/ProtocolSection.tsx:81` | Step numbers "01", "02", "03" | `opacity-40` | `opacity-50` |
| `src/components/marketing/ProtocolSection.tsx:85` | Card descriptions | `opacity-60` | `opacity-70` |
| `src/components/marketing/PhilosophySection.tsx:28` | Word reveal start opacity | `opacity: 0.1` | `opacity: 0.3` |
| `src/components/marketing/CTASection.tsx:54` | Fine print | `text-charcoal/40` | `text-charcoal/60` |
| `src/components/layout/Footer.tsx:41` | Footer links | `text-cream/40` | `text-cream/60` |
| `src/components/layout/Footer.tsx:22` | Tagline "Velocity + Control" | `text-cream/30` | `text-cream/50` |
| `src/components/layout/Footer.tsx:27` | Brand description | `text-cream/40` | `text-cream/60` |
| `src/components/layout/Footer.tsx:75` | Copyright | `text-cream/30` | `text-cream/50` |
| `src/components/layout/Footer.tsx:85-93` | Privacy/Terms/Cookies links | `text-cream/30` | `text-cream/50` |
| `src/components/layout/Footer.tsx:33` | Column headings | `text-cream/60` | `text-cream/70` |

---

## 3. Touch Targets

### 3.1 Hamburger Button

**File:** `src/components/layout/Header.tsx:90-96`

Change `className="p-1 md:hidden"` to `className="flex items-center justify-center min-h-[44px] min-w-[44px] md:hidden"`.

### 3.2 Mobile Menu Links

**File:** `src/components/layout/Header.tsx:102-111`

Change link `className` from `py-2` to `py-3` to achieve 44px minimum touch height.

### 3.3 Footer Legal Links

**File:** `src/components/layout/Footer.tsx:85-93`

Change from `text-[11px]` to `text-xs` and add `py-1` for adequate touch height.

### 3.4 Newsletter Input

**File:** `src/components/forms/NewsletterForm.tsx`

Change `h-10` to `h-11` on the email input for 44px touch target.

---

## 4. Performance Fixes

### 4.1 Hero CLS/LCP Fix

**Problem:** Hero elements have `opacity-0` Tailwind class. If GSAP loads slowly, content is invisible. LCP is gated on JavaScript execution.

**Fix:** Remove `opacity-0` from all hero elements in `src/components/marketing/HeroSection.tsx` (lines 63, 67, 69, 74). Instead, use GSAP `gsap.set()` at the start of the `useEffect` to set initial hidden state. Content is visible by default (no JS = content shows), GSAP hides and animates on hydration.

```typescript
useEffect(() => {
  if (!sectionRef.current) return;
  if (reducedMotion) {
    // already visible, do nothing
    return;
  }

  const ctx = gsap.context(() => {
    // Set initial hidden state via GSAP (not CSS)
    gsap.set(".hero-line-1, .hero-line-2, .hero-cta, .hero-sub", { opacity: 0 });
    gsap.set(".hero-line-1", { y: 40 });
    gsap.set(".hero-line-2", { y: 60 });
    gsap.set(".hero-cta", { y: 30 });

    const tl = gsap.timeline({ delay: 0.15 });
    // ... rest of animation
  }, sectionRef.current);

  return () => ctx.revert();
}, [reducedMotion]);
```

### 4.2 NoiseOverlay: SVG to Static PNG

**File:** `src/components/shared/NoiseOverlay.tsx`

Replace the live SVG `feTurbulence` filter with a static noise PNG tile.

**Steps:**
1. Generate a 200x200 noise texture PNG at ~3-5KB. Save to `public/images/noise-texture.png`.
2. Rewrite `NoiseOverlay.tsx`:

```typescript
function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[50]"
      style={{
        opacity: 0.05,
        backgroundImage: "url(/images/noise-texture.png)",
        backgroundRepeat: "repeat",
      }}
      aria-hidden="true"
    />
  );
}

export { NoiseOverlay };
```

**Note:** z-index reduced from `z-[9999]` to `z-[50]`.

### 4.3 ProtocolSection: Remove Blur, Add will-change

**File:** `src/components/marketing/ProtocolSection.tsx:47-64`

Replace the `onUpdate` callback:

**Current:**
```javascript
gsap.set(card, {
  scale: 1 - progress * 0.1,
  filter: `blur(${progress * 20}px)`,
  opacity: 1 - progress * 0.5,
});
```

**New:**
```javascript
gsap.set(card, {
  scale: 1 - progress * 0.08,
  opacity: 1 - progress * 0.7,
});
```

Blur removed entirely. Opacity range increased (0.7 instead of 0.5) to compensate for the lost blur visual effect. Scale reduced slightly (0.08 instead of 0.1) for subtlety.

Add `will-change: transform, opacity` to the card style:
```jsx
style={{ zIndex: i + 1, willChange: "transform, opacity" }}
```

### 4.4 Pause Off-Screen Animations

**Files:** `ConcentricCircles.tsx`, `ScanningLaser.tsx`, `PulsingWaveform.tsx`

Each animation component stores its GSAP timeline in a ref. Add an IntersectionObserver that calls `timeline.pause()` when the element leaves the viewport and `timeline.resume()` when it enters.

**Pattern:**
```typescript
useEffect(() => {
  if (!containerRef.current || !tlRef.current) return;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        tlRef.current?.resume();
      } else {
        tlRef.current?.pause();
      }
    },
    { threshold: 0 }
  );
  observer.observe(containerRef.current);
  return () => observer.disconnect();
}, []);
```

### 4.5 PostHog Deferral

**File:** `src/lib/posthog-provider.tsx`

Wrap `posthog.init()` so it runs after the page is interactive:

```typescript
useEffect(() => {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

  // Defer analytics init until browser is idle
  const init = () => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: true,
    });
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(init);
  } else {
    setTimeout(init, 1000);
  }
}, []);
```

### 4.6 Remove `scroll-behavior: smooth`

**File:** `src/styles/globals.css:152`

Remove `scroll-behavior: smooth;` from the `html` rule. This conflicts with GSAP ScrollTrigger's scrub calculations. If smooth-scrolling is needed for anchor links, use GSAP's `scrollTo` plugin programmatically.

---

## 5. Animation Timing

### 5.1 Duration and Stagger Adjustments

All changes preserve existing easing (`power3.out` for entrances) and stagger patterns. Only durations and delays change.

| File | Property | Current | New |
|------|----------|---------|-----|
| `HeroSection.tsx:14` | Timeline delay | `0.3` | `0.15` |
| `HeroSection.tsx:19` | hero-line-1 duration | `0.8` | `0.6` |
| `HeroSection.tsx:24` | hero-line-2 duration | `1.0` | `0.6` |
| `HeroSection.tsx:30` | hero-cta duration | `0.6` | `0.4` |
| `HeroSection.tsx:36` | hero-sub duration | `0.6` | `0.4` |
| `FeaturesSection.tsx:23` | Feature card duration | `0.8` | `0.5` |
| `PhilosophySection.tsx:33` | Word stagger duration | `0.3` | `0.25` |
| `PhilosophySection.tsx:46` | Line-2 duration | `0.8` | `0.5` |
| `CTASection.tsx:21` | CTA stagger | `0.15` | `0.06` |
| `CTASection.tsx:20` | CTA duration | `0.8` | `0.5` |
| `HeroSection.tsx:44` | Scroll indicator repeat | `-1` | `3` |

### 5.2 MagneticButton Timing

**File:** `src/styles/globals.css`

Change all `0.4s` transitions to `0.25s` in:
- `.btn-magnetic` transition (line 172)
- `.btn-magnetic .btn-bg` transition (line 188)
- `.btn-magnetic .btn-label` transition (line 198)

### 5.3 Active State + Hover Gating

**File:** `src/styles/globals.css`

Add active state for tap feedback:
```css
.btn-magnetic:active {
  transform: scale(0.97);
}
```

Gate hover effects behind media query:
```css
@media (hover: hover) {
  .btn-magnetic:hover {
    transform: scale(1.03);
  }
  .btn-magnetic:hover .btn-bg {
    transform: translateY(0);
  }
  .link-lift:hover {
    transform: translateY(-1px);
  }
}
```

Remove the existing ungated `.btn-magnetic:hover` and `.link-lift:hover` rules and replace with the gated versions above.

---

## Out of Scope (Deferred to Later Specs)

These were identified in the analysis but belong in **Navigation & Interaction** or **Content & Conversion** specs:

- Desktop nav showing all 5 items
- Mobile menu open/close animation
- Mobile menu focus trap (beyond ARIA attributes)
- Mobile menu backdrop
- Breadcrumbs on slug pages
- Safe-area insets
- Mega-menu for features
- Homepage content rewrites (hero headline, feature names, social proof)
- Protocol section layout simplification
- FAQ section
- Pricing preview on homepage
- Product screenshots in hero
- Search functionality

---

## Files Changed (Summary)

| File | Changes |
|------|---------|
| `src/styles/globals.css` | Clay color tokens, focus-visible, reduced-motion, scroll-behavior removal, button timing, hover gating, active state |
| `src/lib/useReducedMotion.ts` | **New file** — shared hook |
| `src/app/(marketing)/layout.tsx` | Skip link, main id |
| `src/components/layout/Header.tsx` | ARIA attributes, hamburger touch target, mobile link padding |
| `src/components/layout/Footer.tsx` | Contrast fixes (10 opacity changes), legal link sizing, nav wrapper |
| `src/components/marketing/HeroSection.tsx` | h1 tag, remove opacity-0, GSAP set() pattern, reduced-motion, timing |
| `src/components/marketing/FeaturesSection.tsx` | Eyebrow contrast, card duration, reduced-motion |
| `src/components/marketing/PhilosophySection.tsx` | Word reveal start opacity, duration, reduced-motion |
| `src/components/marketing/ProtocolSection.tsx` | Remove blur, will-change, step/description opacity, reduced-motion |
| `src/components/marketing/CTASection.tsx` | Subtext contrast, stagger/duration, reduced-motion |
| `src/components/shared/NoiseOverlay.tsx` | Rewrite: SVG to static PNG, lower z-index |
| `src/components/animations/ConcentricCircles.tsx` | Pause off-screen, reduced-motion |
| `src/components/animations/ScanningLaser.tsx` | Pause off-screen, reduced-motion |
| `src/components/animations/PulsingWaveform.tsx` | Pause off-screen, reduced-motion |
| `src/components/forms/NewsletterForm.tsx` | Label, aria-label, input height |
| `src/lib/posthog-provider.tsx` | Defer init to requestIdleCallback |
| `public/images/noise-texture.png` | **New file** — static noise texture |
