# Foundation UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship critical accessibility infrastructure, WCAG contrast compliance, touch targets, performance fixes, and animation timing adjustments across the Veltro marketing site.

**Architecture:** 17 files modified across 7 independent task groups. Each task is self-contained and produces a buildable, testable increment. The `useReducedMotion` hook and CSS foundation (Task 1) must ship first — all subsequent tasks depend on it. Tasks 2-7 are independent of each other and can run in parallel.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, GSAP 3, PostHog, Vitest + Testing Library

**Spec:** `docs/superpowers/specs/2026-03-31-foundation-ux-design.md`

---

## File Map

| File | Responsibility | Task |
|------|---------------|------|
| `src/styles/globals.css` | Clay tokens, focus-visible, reduced-motion, scroll-behavior, button timing, hover gating | 1 |
| `src/lib/useReducedMotion.ts` | **NEW** — shared `prefers-reduced-motion` hook | 1 |
| `src/app/(marketing)/layout.tsx` | Skip link, `id="main-content"` on `<main>` | 2 |
| `src/components/layout/Header.tsx` | ARIA attributes, hamburger touch target (44px), mobile link padding | 2 |
| `src/components/layout/Footer.tsx` | 10 contrast fixes, legal link sizing, `<nav>` wrapper | 3 |
| `src/components/forms/NewsletterForm.tsx` | Label, aria-label, input height | 3 |
| `src/components/marketing/HeroSection.tsx` | `<h1>` tag, remove `opacity-0`, GSAP `set()` pattern, reduced-motion, timing | 4 |
| `src/components/marketing/FeaturesSection.tsx` | Eyebrow contrast, card duration, reduced-motion | 4 |
| `src/components/marketing/PhilosophySection.tsx` | Word reveal start opacity, duration, reduced-motion | 5 |
| `src/components/marketing/CTASection.tsx` | Subtext contrast, stagger/duration, reduced-motion | 5 |
| `src/components/marketing/ProtocolSection.tsx` | Remove blur, will-change, step/description opacity, reduced-motion | 6 |
| `src/components/animations/ConcentricCircles.tsx` | Pause off-screen, reduced-motion | 6 |
| `src/components/animations/ScanningLaser.tsx` | Pause off-screen, reduced-motion | 6 |
| `src/components/animations/PulsingWaveform.tsx` | Pause off-screen, reduced-motion | 6 |
| `src/components/shared/NoiseOverlay.tsx` | Rewrite: SVG → static PNG, lower z-index | 7 |
| `src/lib/posthog-provider.tsx` | Defer init to `requestIdleCallback` | 7 |
| `public/images/noise-texture.png` | **NEW** — static noise texture (~3KB) | 7 |

---

## Task 1: CSS Foundation + useReducedMotion Hook

> **Prerequisite for all other tasks.** Must be completed first.

**Files:**
- Modify: `src/styles/globals.css`
- Create: `src/lib/useReducedMotion.ts`

### globals.css changes

- [ ] **Step 1: Update clay color tokens**

In `src/styles/globals.css`, replace the clay scale (lines 21-30) and semantic tokens that reference clay:

```css
/* Replace lines 21-30 */
/* Clay — burnt orange accent */
--color-clay-50: #FCEEE9;
--color-clay-100: #F9DDD3;
--color-clay-200: #F0B8A2;
--color-clay-300: #E2916E;
--color-clay-400: #D46A3A;
--color-clay: #B84A28;
--color-clay-600: #933B20;
--color-clay-700: #6E2C18;
--color-clay-800: #491E10;
--color-clay-900: #250F08;
```

Also update these semantic tokens (lines 52-53):
```css
--color-ring: #B84A28;
--color-primary: #B84A28;
```

And the dark mode primary (line 113):
```css
--color-primary: #D46A3A;
```

And the `::selection` block (lines 157-160):
```css
::selection {
  background-color: #B84A28;
  color: #F2F0E9;
}
```

- [ ] **Step 2: Add focus-visible, reduced-motion, and scroll-padding**

Append these blocks after the `::selection` rule (after line 160) and before the `/* ── Magnetic Button ── */` comment:

```css
/* ── Accessibility ── */

*:focus-visible {
  outline: 2px solid var(--color-clay);
  outline-offset: 2px;
  border-radius: 4px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

html {
  scroll-padding-top: 5rem;
}
```

- [ ] **Step 3: Remove `scroll-behavior: smooth`**

In `src/styles/globals.css` line 152, remove `scroll-behavior: smooth;` from the `html` rule. The rule should become:

```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

- [ ] **Step 4: Update MagneticButton timing and add hover gating + active state**

Replace the entire Magnetic Button section (lines 164-217) with:

```css
/* ── Magnetic Button ── */

.btn-magnetic {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: var(--font-heading);
  font-weight: 600;
  transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-magnetic.w-full {
  display: flex;
}

.btn-magnetic:active {
  transform: scale(0.97);
}

.btn-magnetic .btn-bg {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  transform: translateY(100%);
  transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.btn-magnetic .btn-label {
  position: relative;
  z-index: 10;
  transition: color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (hover: hover) {
  .btn-magnetic:hover {
    transform: scale(1.03);
  }

  .btn-magnetic:hover .btn-bg {
    transform: translateY(0);
  }

  .btn-magnetic.btn-outline:hover .btn-label {
    color: #F2F0E9;
  }

  .btn-magnetic.btn-outline-cream:hover .btn-label {
    color: #F2F0E9;
  }

  .link-lift:hover {
    transform: translateY(-1px);
  }
}

/* ── Utility Classes ── */

.link-lift {
  transition: transform 0.2s ease;
}
```

Remove the old ungated `.btn-magnetic:hover`, `.btn-magnetic:hover .btn-bg`, `.btn-magnetic.btn-outline:hover .btn-label`, `.btn-magnetic.btn-outline-cream:hover .btn-label`, and `.link-lift:hover` rules that are now inside the `@media (hover: hover)` block.

- [ ] **Step 5: Create `useReducedMotion` hook**

Create `src/lib/useReducedMotion.ts`:

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

- [ ] **Step 6: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds with no errors. The new CSS rules and hook are valid.

- [ ] **Step 7: Commit**

```bash
git add src/styles/globals.css src/lib/useReducedMotion.ts
git commit -m "feat(a11y): add clay WCAG tokens, focus-visible, reduced-motion, hover gating, useReducedMotion hook"
```

---

## Task 2: Layout, Header ARIA & Touch Targets

**Files:**
- Modify: `src/app/(marketing)/layout.tsx`
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Add skip link and main id to layout**

Replace `src/app/(marketing)/layout.tsx` contents with:

```typescript
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-clay focus:px-4 focus:py-2 focus:font-heading focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <NoiseOverlay />
    </div>
  );
}
```

- [ ] **Step 2: Add ARIA attributes to Header nav**

In `src/components/layout/Header.tsx`, add `aria-label="Main navigation"` to the `<nav>` element at line 41. Change the opening tag from:

```tsx
<nav
  className={cn(
    "fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full px-4 py-3 transition-all duration-500 ease-out md:gap-8 md:px-6",
    scrolled
      ? "border border-cream-300 bg-cream/80 text-charcoal shadow-lg backdrop-blur-xl"
      : "bg-transparent text-cream"
  )}
>
```

to:

```tsx
<nav
  aria-label="Main navigation"
  className={cn(
    "fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full px-4 py-3 transition-all duration-500 ease-out md:gap-8 md:px-6",
    scrolled
      ? "border border-cream-300 bg-cream/80 text-charcoal shadow-lg backdrop-blur-xl"
      : "bg-transparent text-cream"
  )}
>
```

- [ ] **Step 3: Fix hamburger button — ARIA + touch target**

In `src/components/layout/Header.tsx`, replace the hamburger button (lines 90-96):

```tsx
<button
  className="p-1 md:hidden"
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label="Toggle menu"
>
  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
</button>
```

with:

```tsx
<button
  className="flex items-center justify-center min-h-[44px] min-w-[44px] md:hidden"
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label="Toggle menu"
  aria-expanded={mobileOpen}
  aria-controls="mobile-menu"
>
  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
</button>
```

- [ ] **Step 4: Add `id="mobile-menu"` and fix mobile link padding**

In `src/components/layout/Header.tsx`, replace the mobile dropdown div (line 101):

```tsx
<div className="fixed left-4 right-4 top-16 z-40 flex flex-col gap-4 rounded-[2rem] border border-cream-300 bg-cream/95 p-6 shadow-xl backdrop-blur-xl md:hidden">
```

with:

```tsx
<div id="mobile-menu" className="fixed left-4 right-4 top-16 z-40 flex flex-col gap-4 rounded-[2rem] border border-cream-300 bg-cream/95 p-6 shadow-xl backdrop-blur-xl md:hidden">
```

And change mobile link padding from `py-2` to `py-3` on lines 107 and 115. Replace:

```tsx
className="border-b border-cream-300 py-2 font-body text-base font-medium text-charcoal last:border-0"
```

with:

```tsx
className="border-b border-cream-300 py-3 font-body text-base font-medium text-charcoal last:border-0"
```

And replace:

```tsx
className="border-b border-cream-300 py-2 font-body text-base font-medium text-charcoal"
```

with:

```tsx
className="border-b border-cream-300 py-3 font-body text-base font-medium text-charcoal"
```

- [ ] **Step 5: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/app/\(marketing\)/layout.tsx src/components/layout/Header.tsx
git commit -m "feat(a11y): add skip link, header ARIA attributes, 44px touch targets"
```

---

## Task 3: Footer Contrast Fixes + Newsletter Form Label

**Files:**
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/forms/NewsletterForm.tsx`

- [ ] **Step 1: Fix footer contrast — all 10 opacity changes + nav wrapper + legal links**

Replace the entire `src/components/layout/Footer.tsx` with:

```typescript
import Link from "next/link";
import { VeltroLogo } from "@/components/brand/VeltroLogo";
import { footerNav } from "@/config/navigation";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-12 rounded-t-[4rem] bg-charcoal px-6 pb-8 pt-20 text-cream/70 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-6 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <VeltroLogo size={28} className="text-cream" />
              <span className="font-heading text-2xl font-bold text-cream">
                Veltro
              </span>
            </div>
            <span className="mt-1 block font-display text-sm italic text-cream/50">
              Velocity + Control
            </span>
            <p className="mt-4 max-w-xs font-body text-sm text-cream/60">
              Manage operations with speed, clarity, and control.
            </p>
          </div>

          {/* Link columns */}
          <nav aria-label="Footer navigation" className="contents">
            {footerNav.map((group) => (
              <div key={group.title} className="md:col-span-1">
                <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-cream/70">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="link-lift font-body text-sm text-cream/60 transition-colors hover:text-cream"
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.title}
                        {item.badge && (
                          <span className="ml-2 rounded-full bg-clay/20 px-1.5 py-0.5 text-[10px] font-medium text-clay-200">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Newsletter */}
        <div className="mt-16 rounded-2xl border border-cream/10 bg-charcoal-200 p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-heading text-base font-semibold text-cream">
                Stay updated
              </h3>
              <p className="mt-1 font-body text-sm text-cream/60">
                Product updates, maintenance insights, and engineering tips.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 md:flex-row">
          <span className="font-mono text-xs text-cream/50">
            &copy; {year} Veltro, Inc.
          </span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse-slow rounded-full bg-green-500" />
            <span className="font-mono text-xs text-cream/50">
              System Operational
            </span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-mono text-xs py-1 tracking-wider text-cream/50 transition-colors hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="font-mono text-xs py-1 tracking-wider text-cream/50 transition-colors hover:text-cream">
              Terms
            </Link>
            <Link href="/cookies" className="font-mono text-xs py-1 tracking-wider text-cream/50 transition-colors hover:text-cream">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Summary of all changes from original:**
- Line 22: `text-cream/30` → `text-cream/50` (tagline)
- Line 25: `text-cream/40` → `text-cream/60` (brand description)
- Line 30-54: Wrapped link columns in `<nav aria-label="Footer navigation" className="contents">`
- Line 33: `text-cream/60` → `text-cream/70` (column headings)
- Line 41: `text-cream/40` → `text-cream/60` (footer links)
- Line 65: `text-cream/40` → `text-cream/60` (newsletter description)
- Line 75: `text-cream/30` → `text-cream/50` (copyright)
- Lines 85-92: `text-[11px]` → `text-xs`, added `py-1`, `text-cream/30` → `text-cream/50` (legal links)

- [ ] **Step 2: Add label and aria to newsletter form**

Replace `src/components/forms/NewsletterForm.tsx` with:

```typescript
"use client";

import { MagneticButton } from "@/components/ui/MagneticButton";

function NewsletterForm() {
  return (
    <form
      className="flex w-full gap-2 sm:w-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="you@company.com"
        aria-label="Email address"
        className="h-11 w-full rounded-full border border-cream/20 bg-charcoal-300 px-4 font-body text-sm text-cream placeholder:text-cream/30 transition-all duration-300 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20 sm:w-64"
      />
      <MagneticButton type="submit" variant="clay" size="md">
        Subscribe
      </MagneticButton>
    </form>
  );
}

export { NewsletterForm };
```

Changes: added `<label>`, added `id="newsletter-email"`, added `aria-label="Email address"`, changed `h-10` → `h-11` (44px touch target).

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Footer.tsx src/components/forms/NewsletterForm.tsx
git commit -m "fix(a11y): footer contrast fixes, nav wrapper, newsletter label, 44px input"
```

---

## Task 4: HeroSection + FeaturesSection — Semantics, CLS Fix, Reduced Motion, Timing

**Files:**
- Modify: `src/components/marketing/HeroSection.tsx`
- Modify: `src/components/marketing/FeaturesSection.tsx`

- [ ] **Step 1: Rewrite HeroSection**

Replace the entire `src/components/marketing/HeroSection.tsx` with:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current) return;
    if (reducedMotion) return; // content is visible by default

    const ctx = gsap.context(() => {
      // Set initial hidden state via GSAP (not CSS) — progressive enhancement
      gsap.set(".hero-line-1, .hero-line-2, .hero-cta, .hero-sub", { opacity: 0 });
      gsap.set(".hero-line-1", { y: 40 });
      gsap.set(".hero-line-2", { y: 60 });
      gsap.set(".hero-cta", { y: 30 });

      const tl = gsap.timeline({ delay: 0.15 });

      tl.to(".hero-line-1", {
        y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
      })
        .to(
          ".hero-line-2",
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.45"
        )
        .to(
          ".hero-cta",
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          ".hero-sub",
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        );

      gsap.to(".hero-scroll", {
        y: 8,
        duration: 1.2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 3,
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-dvh items-end overflow-hidden"
    >
      {/* Background gradient — replace with image when ready */}
      <div className="absolute inset-0 bg-gradient-to-br from-moss-800 via-moss to-moss-400" />
      <div className="absolute inset-0 bg-gradient-to-t from-moss-900/80 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl p-8 md:p-16 lg:p-24">
        <h1>
          <span className="hero-line-1 block font-heading text-3xl font-bold tracking-tight text-cream md:text-5xl lg:text-6xl">
            Your operation has a
          </span>
          <span className="hero-line-2 mt-2 block font-display text-6xl italic leading-[0.9] tracking-tight text-cream md:text-8xl lg:text-[10rem]">
            Rhythm.
          </span>
        </h1>
        <div className="hero-cta mt-10">
          <MagneticButton href="/demo" variant="clay" size="lg">
            Start Your 14-Day Trial
          </MagneticButton>
        </div>
        <p className="hero-sub mt-4 font-mono text-sm text-cream/70">
          No credit card required
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/40">
        <ChevronDown size={28} strokeWidth={1.5} />
      </div>
    </section>
  );
}
```

**Key changes from original:**
- Import `useReducedMotion`
- `reducedMotion` check — if true, skip all animations (content visible by default)
- Removed `opacity-0` from all 4 elements (lines 63, 66, 69, 74 in original)
- GSAP uses `gsap.set()` for initial hidden state instead of CSS classes
- `fromTo` → `set` + `to` pattern (avoids fighting CSS classes)
- `<p>` tags → `<h1>` with `<span>` children for heading hierarchy
- Timeline delay: `0.3` → `0.15`
- hero-line-1 duration: `0.8` → `0.6`
- hero-line-2 duration: `1.0` → `0.6`
- hero-cta duration: `0.6` → `0.4`
- hero-sub duration: `0.6` → `0.4`
- Scroll indicator: `repeat: -1` → `repeat: 3`
- Subtitle: `text-cream/50` → `text-cream/70` (contrast fix)
- Dependency array: `[]` → `[reducedMotion]`

- [ ] **Step 2: Update FeaturesSection with reduced-motion and timing**

Replace the entire `src/components/marketing/FeaturesSection.tsx` with:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DiagnosticShuffler } from "@/components/animations/DiagnosticShuffler";
import { TelemetryTypewriter } from "@/components/animations/TelemetryTypewriter";
import { CursorProtocol } from "@/components/animations/CursorProtocol";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.set(".feature-card", { opacity: 0, y: 60 });
      gsap.to(".feature-card", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="bg-cream px-6 py-24 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <span className="mb-3 block font-mono text-xs text-charcoal/50">
          // capabilities
        </span>
        <h2 className="mb-16 font-heading text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
          Functional Artifacts
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="feature-card">
            <DiagnosticShuffler />
          </div>
          <div className="feature-card">
            <TelemetryTypewriter />
          </div>
          <div className="feature-card">
            <CursorProtocol />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Key changes:**
- Import `useReducedMotion`
- Skip animation entirely when `reducedMotion` is true
- `fromTo` → `set` + `to` pattern (same as HeroSection)
- Duration: `0.8` → `0.5`
- Eyebrow: `text-charcoal/40` → `text-charcoal/50` (contrast fix)
- Dependency array: `[]` → `[reducedMotion]`

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/HeroSection.tsx src/components/marketing/FeaturesSection.tsx
git commit -m "feat(a11y): hero h1 semantics, CLS fix, reduced-motion, faster timing"
```

---

## Task 5: PhilosophySection + CTASection — Contrast, Timing, Reduced Motion

**Files:**
- Modify: `src/components/marketing/PhilosophySection.tsx`
- Modify: `src/components/marketing/CTASection.tsx`

- [ ] **Step 1: Update PhilosophySection**

Replace the entire `src/components/marketing/PhilosophySection.tsx` with:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function PhilosophySection({
  line1 = "Most teams focus on: tracking what happened.",
  line2Part1 = "We focus on:",
  line2Part2 = "driving",
  line2Accent = "what happens next.",
}: {
  line1?: string;
  line2Part1?: string;
  line2Part2?: string;
  line2Accent?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Words = line1.split(" ");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".phil-word",
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 0.25,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".phil-line-1",
            start: "top 70%",
          },
        }
      );

      gsap.set(".phil-line-2 > *", { y: 40, opacity: 0 });
      gsap.to(".phil-line-2 > *", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".phil-line-2",
          start: "top 75%",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [line1, line2Part1, line2Part2, line2Accent, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-charcoal px-6 py-32 md:px-12 lg:px-24"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-charcoal-300 to-charcoal opacity-30" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Statement 1 */}
        <p className="phil-line-1 mb-16 font-heading text-2xl font-medium leading-relaxed text-cream/40 md:text-3xl lg:text-4xl">
          {line1Words.map((word, i) => (
            <span key={i} className="phil-word mr-[0.3em] inline-block">
              {word}
            </span>
          ))}
        </p>

        {/* Statement 2 */}
        <div className="phil-line-2">
          <p className="font-display text-4xl italic leading-tight text-cream md:text-5xl lg:text-7xl">
            {line2Part1}
          </p>
          <p className="mt-2 font-display text-4xl italic leading-tight text-cream md:text-5xl lg:text-7xl">
            {line2Part2}{" "}
            <span className="text-clay">{line2Accent}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
```

**Key changes:**
- Import `useReducedMotion`
- Skip animation entirely when `reducedMotion` is true
- Word reveal start: `opacity: 0.1` → `opacity: 0.3` (WCAG contrast fix)
- Word reveal duration: `0.3` → `0.25`
- Line-2: `fromTo` → `set` + `to` pattern
- Line-2 duration: `0.8` → `0.5`
- `reducedMotion` added to dependency array

- [ ] **Step 2: Update CTASection**

Replace the entire `src/components/marketing/CTASection.tsx` with:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.set(".cta-content > *", { y: 30, opacity: 0 });
      gsap.to(".cta-content > *", {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-32 md:px-12 md:py-48 lg:px-24"
    >
      <div className="cta-content mx-auto max-w-3xl text-center">
        <p className="font-display text-5xl italic leading-tight text-charcoal md:text-7xl">
          Veltro isn't for everyone. It's for the teams who understand that{" "}
          <span className="text-clay">speed is a byproduct of precision.</span>
        </p>
        <p className="mx-auto mt-6 max-w-lg font-body text-lg text-charcoal/60">
          Join the operations who value flow over friction. Find your rhythm
          today.
        </p>
        <div className="mt-10">
          <MagneticButton href="/demo" variant="clay" size="lg">
            Start Your 14-Day Trial
          </MagneticButton>
        </div>
        <p className="mt-4 font-mono text-xs text-charcoal/60 uppercase tracking-widest">
          NO CREDIT CARD REQUIRED &middot; SETUP IN &lt; 2 MINS
        </p>
      </div>
    </section>
  );
}
```

**Key changes:**
- Import `useReducedMotion`
- Skip animation entirely when `reducedMotion` is true
- `fromTo` → `set` + `to` pattern
- Duration: `0.8` → `0.5`
- Stagger: `0.15` → `0.06`
- Subtext: `text-charcoal/40` → `text-charcoal/60` (contrast fix)
- Dependency array: `[]` → `[reducedMotion]`

- [ ] **Step 3: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/PhilosophySection.tsx src/components/marketing/CTASection.tsx
git commit -m "fix(a11y): philosophy/CTA contrast, reduced-motion, faster timing"
```

---

## Task 6: ProtocolSection + Animation Components — Blur Removal, Off-Screen Pause, Reduced Motion

**Files:**
- Modify: `src/components/marketing/ProtocolSection.tsx`
- Modify: `src/components/animations/ConcentricCircles.tsx`
- Modify: `src/components/animations/ScanningLaser.tsx`
- Modify: `src/components/animations/PulsingWaveform.tsx`

- [ ] **Step 1: Update ProtocolSection — remove blur, fix contrast, add reduced-motion**

Replace the entire `src/components/marketing/ProtocolSection.tsx` with:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ConcentricCircles } from "@/components/animations/ConcentricCircles";
import { ScanningLaser } from "@/components/animations/ScanningLaser";
import { PulsingWaveform } from "@/components/animations/PulsingWaveform";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    step: "01",
    title: "Identify",
    description: "Surface what matters before it becomes urgent.",
    bg: "bg-cream",
    text: "text-charcoal",
  },
  {
    step: "02",
    title: "Orchestrate",
    description: "Coordinate people, priorities, and timelines in one view.",
    bg: "bg-moss",
    text: "text-cream",
  },
  {
    step: "03",
    title: "Sustain",
    description: "Build habits that keep operations consistent and visible.",
    bg: "bg-charcoal",
    text: "text-cream",
  },
];

const animations = [ConcentricCircles, ScanningLaser, PulsingWaveform];

export function ProtocolSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (i < cards.length - 1 && card) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            end: `+=${window.innerHeight}`,
            pin: false,
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              gsap.set(card, {
                scale: 1 - progress * 0.08,
                opacity: 1 - progress * 0.7,
              });
            },
          });
        }
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="protocol" ref={sectionRef} className="relative">
      {cards.map((card, i) => {
        const Animation = animations[i];
        return (
          <div
            key={card.step}
            ref={(el) => { cardRefs.current[i] = el; }}
            className={`sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden ${card.bg} ${card.text}`}
            style={{ zIndex: i + 1, willChange: "transform, opacity" }}
          >
            {!reducedMotion && <Animation />}
            <div className="relative z-10 max-w-2xl px-6 text-center">
              <span className="font-mono text-sm opacity-50">{card.step}</span>
              <h3 className="mt-4 font-heading text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                {card.title}
              </h3>
              <p className="mx-auto mt-6 max-w-md font-body text-lg opacity-70 md:text-xl">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
```

**Key changes:**
- Import `useReducedMotion`
- Removed `filter: blur(${progress * 20}px)` — replaced with steeper opacity (0.7 vs 0.5) and reduced scale (0.08 vs 0.1)
- Added `willChange: "transform, opacity"` to card style
- Step numbers: `opacity-40` → `opacity-50`
- Card descriptions: `opacity-60` → `opacity-70`
- Animation components hidden when `reducedMotion` is true
- Dependency array: `[]` → `[reducedMotion]`

- [ ] **Step 2: Update ConcentricCircles — add off-screen pause and reduced-motion**

Replace `src/components/animations/ConcentricCircles.tsx` with:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ConcentricCircles() {
  const ref = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || reducedMotion) return;

    const timelines: gsap.core.Tween[] = [];
    const ctx = gsap.context(() => {
      ref.current!.querySelectorAll("circle").forEach((c, i) => {
        const tween = gsap.to(c, {
          rotation: 360 * (i % 2 === 0 ? 1 : -1),
          duration: 20 - i * 4,
          repeat: -1,
          ease: "none",
          transformOrigin: "50% 50%",
        });
        timelines.push(tween);
      });
    }, ref.current);

    const observer = new IntersectionObserver(
      ([entry]) => {
        timelines.forEach((tl) => {
          if (entry.isIntersecting) {
            tl.resume();
          } else {
            tl.pause();
          }
        });
      },
      { threshold: 0 }
    );
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <svg
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-10"
      viewBox="0 0 400 400"
    >
      {[60, 100, 140, 180, 220].map((r, i) => (
        <circle
          key={i}
          cx="200"
          cy="200"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray={`${4 + i * 2} ${8 + i * 3}`}
        />
      ))}
    </svg>
  );
}
```

- [ ] **Step 3: Update ScanningLaser — add off-screen pause and reduced-motion**

Replace `src/components/animations/ScanningLaser.tsx` with:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ScanningLaser() {
  const ref = useRef<SVGSVGElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || !lineRef.current || reducedMotion) return;

    let tween: gsap.core.Tween;
    const ctx = gsap.context(() => {
      tween = gsap.to(lineRef.current, {
        attr: { y1: 380, y2: 380 },
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, ref.current);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween?.resume();
        } else {
          tween?.pause();
        }
      },
      { threshold: 0 }
    );
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  const dots: React.ReactNode[] = [];
  for (let r = 0; r < 10; r++) {
    for (let c = 0; c < 14; c++) {
      dots.push(
        <circle
          key={`${r}-${c}`}
          cx={30 + c * 26}
          cy={30 + r * 38}
          r="2"
          fill="currentColor"
          opacity="0.2"
        />
      );
    }
  }

  return (
    <svg
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-20"
      viewBox="0 0 400 400"
    >
      {dots}
      <line
        ref={lineRef}
        x1="0"
        y1="20"
        x2="400"
        y2="20"
        stroke="#B84A28"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
}
```

**Note:** Laser stroke color updated from `#CC5833` → `#B84A28` to match new clay token.

- [ ] **Step 4: Update PulsingWaveform — add off-screen pause and reduced-motion**

Replace `src/components/animations/PulsingWaveform.tsx` with:

```typescript
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function PulsingWaveform() {
  const ref = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!pathRef.current || !ref.current || reducedMotion) return;
    const length = pathRef.current.getTotalLength();

    let tween: gsap.core.Tween;
    const ctx = gsap.context(() => {
      gsap.set(pathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      tween = gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tween?.resume();
        } else {
          tween?.pause();
        }
      },
      { threshold: 0 }
    );
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <svg
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-15"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M0,100 L40,100 L50,100 L60,40 L70,160 L80,80 L90,120 L100,100 L140,100 L150,100 L160,40 L170,160 L180,80 L190,120 L200,100 L240,100 L250,100 L260,40 L270,160 L280,80 L290,120 L300,100 L340,100 L350,100 L360,40 L370,160 L380,80 L390,120 L400,100"
        fill="none"
        stroke="#B84A28"
        strokeWidth="2"
      />
    </svg>
  );
}
```

**Note:** Waveform stroke color updated from `#CC5833` → `#B84A28` to match new clay token.

- [ ] **Step 5: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/components/marketing/ProtocolSection.tsx src/components/animations/ConcentricCircles.tsx src/components/animations/ScanningLaser.tsx src/components/animations/PulsingWaveform.tsx
git commit -m "perf: remove protocol blur, pause off-screen animations, add reduced-motion"
```

---

## Task 7: NoiseOverlay Rewrite + PostHog Deferral

**Files:**
- Modify: `src/components/shared/NoiseOverlay.tsx`
- Modify: `src/lib/posthog-provider.tsx`
- Create: `public/images/noise-texture.png`

- [ ] **Step 1: Generate noise texture PNG**

Create a 200x200 noise texture PNG. Use a Node.js script with `sharp` (already in dependencies):

Create and run `scripts/generate-noise.ts`:

```typescript
import sharp from "sharp";

const size = 200;
const channels = 4; // RGBA
const data = Buffer.alloc(size * size * channels);

for (let i = 0; i < size * size; i++) {
  const v = Math.floor(Math.random() * 256);
  data[i * channels] = v;     // R
  data[i * channels + 1] = v; // G
  data[i * channels + 2] = v; // B
  data[i * channels + 3] = 40; // A — subtle
}

sharp(data, { raw: { width: size, height: size, channels } })
  .png({ compressionLevel: 9 })
  .toFile("public/images/noise-texture.png")
  .then((info) => console.log("Generated noise-texture.png:", info.size, "bytes"))
  .catch(console.error);
```

Run: `npx tsx scripts/generate-noise.ts`
Expected: `public/images/noise-texture.png` is created (~3-5KB).

Delete the script after generation:
```bash
rm scripts/generate-noise.ts
```

- [ ] **Step 2: Rewrite NoiseOverlay to use static PNG**

Replace `src/components/shared/NoiseOverlay.tsx` with:

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

**Changes:** SVG `feTurbulence` → static PNG tile. z-index: `9999` → `50`.

- [ ] **Step 3: Defer PostHog initialization**

Replace `src/lib/posthog-provider.tsx` with:

```typescript
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname;
      if (searchParams.toString()) url += `?${searchParams.toString()}`;
      ph.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    if (initialized.current) return;
    initialized.current = true;

    const init = () => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
        person_profiles: "identified_only",
        capture_pageview: false,
      });
    };

    if ("requestIdleCallback" in window) {
      requestIdleCallback(init);
    } else {
      setTimeout(init, 1000);
    }
  }, []);

  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
```

**Key change:** Moved `posthog.init()` from top-level (executes on module import, blocks main thread 50-150ms) to `useEffect` with `requestIdleCallback` wrapper. Added `useRef` guard to prevent double-init in StrictMode.

- [ ] **Step 4: Verify the build passes**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/shared/NoiseOverlay.tsx src/lib/posthog-provider.tsx public/images/noise-texture.png
git commit -m "perf: static noise PNG, deferred PostHog init"
```

---

## Verification Checklist

After all 7 tasks are complete, run these checks:

- [ ] `npm run build` — clean build, no errors
- [ ] `npm run typecheck` — no TypeScript errors
- [ ] `npm run lint` — no lint errors
- [ ] Manual check: Tab through the homepage — skip link appears, focus rings visible on all interactive elements
- [ ] Manual check: Open DevTools → Rendering → Emulate prefers-reduced-motion: reduce — no animations play, all content visible
- [ ] Manual check: Protocol section scrolls at 55fps+ on mobile (no blur filter in DevTools performance trace)
- [ ] Manual check: Footer text is readable (no extremely faint text)
- [ ] Manual check: Hamburger button is comfortably tappable (44px)

---

## Task Dependency Graph

```
Task 1 (CSS + hook) ──┬── Task 2 (Layout + Header)
                       ├── Task 3 (Footer + Newsletter)
                       ├── Task 4 (Hero + Features)
                       ├── Task 5 (Philosophy + CTA)
                       ├── Task 6 (Protocol + Animations)
                       └── Task 7 (Noise + PostHog)
```

Task 1 must complete first. Tasks 2-7 are fully independent and can run in parallel.
