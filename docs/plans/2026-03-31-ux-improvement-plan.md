# Veltro Website UX Improvement Plan

> Generated 2026-03-31 via 6-agent parallel analysis using UI/UX Pro Max
> Covers: Accessibility, Navigation, Scroll/Animation, Performance, Content/Conversion, Mobile/Responsive

---

## Executive Summary

The Veltro website has a strong cinematic aesthetic but suffers from **critical accessibility gaps**, **performance bottlenecks on mobile**, **missing conversion elements**, and **contrast failures across the site**. The design system relies heavily on opacity modifiers (0.3-0.5) that fail WCAG AA in nearly every usage. There is zero `prefers-reduced-motion` support, no skip-link, no focus indicators, and no social proof on the homepage.

**Total issues found: 67**
- Critical: 18
- High: 16
- Medium: 24
- Low: 9

---

## Phase 1: Critical Fixes (Do This Week)

These are accessibility violations, WCAG failures, and issues that directly hurt usability.

### 1.1 Accessibility Infrastructure

| # | Task | File(s) | Effort |
|---|------|---------|--------|
| A1 | Add skip-to-content link + `id="main-content"` on `<main>` | `layout.tsx` (marketing) | 10 min |
| A2 | Add global `focus-visible` styles (2px ring, clay color) | `globals.css` | 10 min |
| A3 | Add `prefers-reduced-motion` hook — skip all GSAP animations when enabled | New: `useReducedMotion.ts` + all 8 GSAP components | 1 hr |
| A4 | Add `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }` | `globals.css` | 2 min |
| A5 | Add `<h1>` to homepage hero (currently all `<p>` tags, no h1 exists) | `HeroSection.tsx` | 5 min |
| A6 | Add `aria-label` to newsletter email input + hidden `<label>` | `NewsletterForm.tsx` | 5 min |
| A7 | Add `aria-expanded` + `aria-controls` to hamburger button | `Header.tsx` | 5 min |
| A8 | Add `aria-label="Main navigation"` to header `<nav>` | `Header.tsx` | 2 min |

### 1.2 Contrast Fixes (WCAG AA Failures)

All of these currently fail the 4.5:1 minimum for normal text:

| # | Element | Current | Fix | File |
|---|---------|---------|-----|------|
| C1 | Features eyebrow `// capabilities` | `text-charcoal/40` (2.46:1) | `text-charcoal/70` (~6.5:1) | `FeaturesSection.tsx:44` |
| C2 | Footer links | `text-cream/40` (3.50:1) | `text-cream/60` (~6.2:1) | `Footer.tsx:41` |
| C3 | Footer copyright + tagline | `text-cream/30` (2.53:1) | `text-cream/50` (~4.7:1) | `Footer.tsx:22,75,85-93` |
| C4 | Footer legal links (Privacy/Terms) | `text-cream/30` at `text-[11px]` | `text-cream/50` + `text-xs` | `Footer.tsx:85-93` |
| C5 | Hero subtitle | `text-cream/50` (3.72:1) | `text-cream/70` (~6.4:1) | `HeroSection.tsx:74` |
| C6 | Protocol step numbers | `opacity-40` (2.46-2.93:1) | `opacity-70` | `ProtocolSection.tsx:81` |
| C7 | Protocol card descriptions | `opacity-60` (4.36:1 marginal) | `opacity-70` | `ProtocolSection.tsx:85` |
| C8 | Philosophy word reveal start | `opacity: 0.1` (1.30:1) | Start at `0.3` minimum | `PhilosophySection.tsx:28` |
| C9 | CTA subtext | `text-charcoal/40` (2.46:1) | `text-charcoal/60` | `CTASection.tsx:54` |
| C10 | Clay button contrast | bg-clay + text-cream (3.68:1) | Darken clay to `#B84A28` or use `text-white` | `MagneticButton.tsx` / `globals.css` |

**Systemic rule:** Never use opacity below 0.6 for body text, below 0.5 for supplementary text.

### 1.3 Critical Touch Targets

| # | Element | Current | Fix | File |
|---|---------|---------|-----|------|
| T1 | Hamburger button | `p-1` (~28px) | `p-3` (44px) | `Header.tsx:90` |
| T2 | Footer legal links | `text-[11px]` no padding | `text-xs` + `py-1` | `Footer.tsx:85-93` |
| T3 | Mobile menu links | `py-2` (~36px) | `py-3` (44px) | `Header.tsx:102-111` |

---

## Phase 2: High Priority (Do This Sprint)

### 2.1 Navigation & Header

| # | Task | Details | File |
|---|------|---------|------|
| N1 | Show all 5 nav items on desktop | Remove `.slice(0, 3)` — show Features, Pricing, Customers, Blog, Integrations | `Header.tsx:60` |
| N2 | Fix active page indicator | Replace opacity-80/100 with visible underline + `pathname.startsWith()` matching | `Header.tsx:64-67` |
| N3 | Add mobile menu animation | GSAP slide+fade (y:-20, opacity:0 to y:0, opacity:1) | `Header.tsx:100` |
| N4 | Add mobile menu backdrop | Semi-transparent `bg-charcoal/50` behind dropdown, tap to close | `Header.tsx` |
| N5 | Add mobile menu focus trap | Trap focus when open, Escape key handler, `role="dialog"` | `Header.tsx:100-128` |
| N6 | Add `scroll-padding-top: 5rem` | For anchor links and non-hero pages | `globals.css` |
| N7 | Add breadcrumbs on slug pages | `Home > Blog > Post Title` with ARIA + JSON-LD | `blog/[slug]/page.tsx`, `use-cases/[slug]/page.tsx` |

### 2.2 Performance

| # | Task | Details | File |
|---|------|---------|------|
| P1 | Fix hero CLS/LCP | Remove `opacity-0` classes; let GSAP own initial state via `.js-loaded` pattern | `HeroSection.tsx:63,67,69,74` |
| P2 | Replace NoiseOverlay SVG with static PNG | Swap `feTurbulence` for a tiled `background-image` noise PNG (~3KB) | `NoiseOverlay.tsx` |
| P3 | Remove `filter: blur()` from Protocol scrub | Replace with opacity+scale only (GPU composited, no rasterization) | `ProtocolSection.tsx:56` |
| P4 | Pause off-screen animations | IntersectionObserver to pause/resume ConcentricCircles, ScanningLaser, PulsingWaveform | `ProtocolSection.tsx` + 3 animation files |
| P5 | Defer PostHog initialization | Move to `requestIdleCallback` or `afterInteractive` strategy | `posthog-provider.tsx` |
| P6 | Remove `scroll-behavior: smooth` | Conflicts with GSAP ScrollTrigger scrub calculations | `globals.css:152` |

### 2.3 Animation Timing

| # | Task | Current | Target | File |
|---|------|---------|--------|------|
| AN1 | Reduce hero-line-2 duration | 1000ms | 600ms | `HeroSection.tsx:24` |
| AN2 | Reduce hero delay | 300ms | 150ms | `HeroSection.tsx:14` |
| AN3 | Reduce feature card duration | 800ms | 500ms | `FeaturesSection.tsx:23` |
| AN4 | Reduce philosophy duration | 800ms | 500ms | `PhilosophySection.tsx:46` |
| AN5 | Reduce CTA text stagger | 150ms (card-level) | 60ms (text-level) | `CTASection.tsx:21` |
| AN6 | Stop scroll indicator after 3 bounces | `repeat: -1` (infinite) | `repeat: 3` | `HeroSection.tsx:44` |
| AN7 | Reduce MagneticButton hover duration | 400ms | 250ms | `globals.css:172,188,198` |

### 2.4 Mobile-Specific

| # | Task | Details | File |
|---|------|---------|------|
| M1 | Add safe-area insets | `viewportFit: "cover"` + `env(safe-area-inset-*)` on nav and footer | `layout.tsx`, `Header.tsx`, `Footer.tsx` |
| M2 | Fix "Rhythm" text overflow | `text-5xl` or `clamp(3rem,10vw,6rem)` on mobile | `HeroSection.tsx:66` |
| M3 | Reduce CTA display text on mobile | `text-3xl` base instead of `text-5xl` | `CTASection.tsx:41` |
| M4 | Add tap/active states for buttons | `:active { transform: scale(0.97) }` + gate hover behind `@media (hover: hover)` | `globals.css` |
| M5 | Reduce footer corner radius on mobile | `rounded-t-[2rem] md:rounded-t-[4rem]` | `Footer.tsx:10` |
| M6 | Add tablet intermediate layout | `sm:grid-cols-2` before `md:grid-cols-3` | `FeaturesSection.tsx:51` |

---

## Phase 3: Content & Conversion (Do This Month)

These address the fundamental gap between the cinematic brand experience and B2B buyer needs.

### 3.1 Homepage Content (Critical for Conversion)

| # | Task | Priority | Details |
|---|------|----------|---------|
| CO1 | Add product screenshot/video to hero | P0 | Single highest-impact conversion change. Place right of or below headline. |
| CO2 | Add customer logo bar below hero | P0 | "Trusted by maintenance teams at..." with 6-8 logos (or industry icons as placeholder) |
| CO3 | Rename feature cards to benefit-oriented labels | P0 | "DiagnosticShuffler" -> "Smart Diagnostics", etc. Add 1-2 sentence descriptions |
| CO4 | Add secondary CTA in hero | P1 | "Watch Demo" or "See How It Works" as outline button beside primary CTA |
| CO5 | Rewrite hero headline | P1 | Include concrete terms: maintenance, work orders, asset management |
| CO6 | Compress Protocol section | P1 | Convert from 3 fullscreen sticky cards to single-viewport 3-column layout |
| CO7 | Add testimonial section | P1 | 1-2 customer quotes with photos, company names, quantified results |
| CO8 | Replace exclusionary CTA copy | P1 | "Veltro isn't for everyone" -> "Ready to move from reactive to proactive?" |
| CO9 | Add FAQ section | P2 | 6-8 common B2B CMMS questions addressing objections |
| CO10 | Add pricing preview on homepage | P2 | Simple 3-card summary with starting prices |
| CO11 | Add integration logo bar | P2 | "Works with the tools you already use" + link to /integrations |

### 3.2 Messaging Fixes

| Current | Problem | Recommended |
|---------|---------|-------------|
| "Functional Artifacts" | Internal jargon | "Core Capabilities" or "What You Can Do" |
| "// capabilities" | Code comment syntax | "Features" or "Platform Capabilities" |
| "DiagnosticShuffler" | Codename | "Smart Diagnostics" with benefit description |
| "TelemetryTypewriter" | Codename | "Real-Time Equipment Monitoring" |
| "CursorProtocol" | Codename | "Automated Scheduling" |
| "Your operation has a Rhythm." | No product specificity | Lead with benefit, reinforce with brand |

### 3.3 Page-Level Improvements

**Pricing (/pricing)**
- Add feature comparison table across tiers
- Add FAQ addressing annual/monthly, user definition, enterprise
- Add "Talk to Sales" for enterprise (not just self-serve trial)
- Add social proof (customer count or testimonial)

**Features (/features)**
- Replace "Functional Artifacts" heading
- Add product screenshots per feature area
- Organize by use case: Work Orders, Asset Tracking, PM, Reporting, Mobile, Integrations
- Add CTAs between feature sections

**Blog (/blog)**
- Feature 2-3 recent posts on homepage
- Target CMMS keywords for SEO

**Integrations (/integrations)**
- Organize by category (ERP, IoT, Communication)
- Add "request an integration" form

---

## Phase 4: Polish & Optimization (Ongoing)

### 4.1 Bundle Optimization

| # | Task | Impact |
|---|------|--------|
| B1 | Dynamic import below-fold sections (`next/dynamic` with `ssr: false`) | -30-40KB initial JS |
| B2 | Remove Cormorant Garamond weight 700 (unused) | -10-15KB fonts |
| B3 | Evaluate consolidating Outfit + Plus Jakarta Sans | -15-20KB fonts |
| B4 | Audit framer-motion usage (present but may overlap GSAP) | -40KB if removable |
| B5 | Refactor DiagnosticShuffler to avoid setInterval+setState+GSAP triple-render | CPU reduction |
| B6 | Refactor TelemetryTypewriter to use ref instead of 55ms setState | CPU reduction |

### 4.2 Additional Polish

| # | Task |
|---|------|
| PO1 | Add `<nav aria-label="Footer navigation">` wrapper in Footer |
| PO2 | Lower NoiseOverlay z-index from `z-[9999]` to `z-[50]` |
| PO3 | Add `overscroll-behavior: none` to Protocol section for iOS |
| PO4 | Add landscape mode handling (`min-h-[600px]` on hero) |
| PO5 | Add Cmd+K search (as content grows) |
| PO6 | Add security/compliance badges to footer |
| PO7 | Consider mega-menu for Features using `featureNav` config |

---

## Performance Targets

| Metric | Current Estimate | Target |
|--------|-----------------|--------|
| LCP | 2.5-4.0s (mobile) | < 1.5s |
| CLS | 0.05-0.15 | < 0.05 |
| INP | 150-300ms | < 100ms |
| Total JS (initial) | ~180-250KB gzipped | < 120KB |
| Total font weight | ~115-140KB | < 80KB |
| Scroll frame rate (Protocol) | 20-40fps mobile | 55fps+ |

---

## Implementation Order

```
Week 1: Phase 1 (Critical)
  ├── A1-A8: Accessibility infrastructure (1 agent, ~2 hours)
  ├── C1-C10: Contrast fixes (1 agent, ~1 hour)
  └── T1-T3: Touch targets (1 agent, ~30 min)

Week 2: Phase 2 (High)
  ├── N1-N7: Navigation overhaul (1 agent, ~4 hours)
  ├── P1-P6: Performance fixes (1 agent, ~4 hours)
  ├── AN1-AN7: Animation tuning (1 agent, ~2 hours)
  └── M1-M6: Mobile fixes (1 agent, ~3 hours)

Week 3-4: Phase 3 (Content)
  ├── CO1-CO3: Hero + features content (design + copy needed)
  ├── CO4-CO8: CTA + testimonials + messaging
  └── CO9-CO11: FAQ + pricing preview + integrations

Ongoing: Phase 4 (Polish)
  └── Bundle optimization, search, mega-menu, etc.
```

---

## Agent Analysis Sources

| Agent | Focus | Issues Found |
|-------|-------|-------------|
| Agent 1 | Scroll & Animation | 7 critical, 4 high, 7 medium |
| Agent 2 | Navigation & Header | 3 critical, 5 high, 5 medium |
| Agent 3 | Accessibility & Contrast | 7 critical failures, 5 warnings, 8 missing features |
| Agent 4 | Performance & Loading | 3 critical, 3 high, 4 medium, 5 low |
| Agent 5 | Content & Conversion | 5 critical, 6 content gaps, 6 messaging issues |
| Agent 6 | Responsive & Mobile | 4 critical, 3 high, 9 medium, 3 low |
