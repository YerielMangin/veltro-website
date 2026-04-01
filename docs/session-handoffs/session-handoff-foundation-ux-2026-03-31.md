# Session Handoff — 2026-03-31 — Foundation UX Implementation + Phase 2/3 Prep

## Branch
`feat/scroll-fix-and-cinematic-design-system` — in repo `c:\Dev\veltro-website`

## Status
_Foundation UX (Phase 1) fully implemented, spec-reviewed, code-reviewed, and review fixes applied._

- [x] 6-agent parallel UX analysis (67 issues found) — completed in prior session
- [x] UI/UX Pro Max design system generated — completed in prior session
- [x] Issues organized into 3 subsystems (Foundation, Navigation & Interaction, Content & Conversion) — completed in prior session
- [x] Foundation design spec written and approved (`docs/superpowers/specs/2026-03-31-foundation-ux-design.md`)
- [x] Foundation implementation plan written (`docs/superpowers/plans/2026-03-31-foundation-ux.md`)
- [x] **Foundation implementation — ALL 7 TASKS COMPLETE (8 commits)**
- [x] Spec compliance reviews — all 7 tasks passed
- [x] Final code review — 2 critical + 3 important issues found and fixed
- [ ] Navigation & Interaction spec — NOT YET STARTED
- [ ] Content & Conversion spec — NOT YET STARTED

## Commits (this session)

```
06f08bb fix: address code review issues — noise PNG size, will-change, html merge
6a8f984 perf: static noise PNG, deferred PostHog init
0feb60e perf: remove protocol blur, pause off-screen animations, add reduced-motion
09d7387 fix(a11y): philosophy/CTA contrast, reduced-motion, faster timing
5a803f6 feat(a11y): hero h1 semantics, CLS fix, reduced-motion, faster timing
8920e4e fix(a11y): footer contrast fixes, nav wrapper, newsletter label, 44px input
34a7d90 feat(a11y): add skip link, header ARIA attributes, 44px touch targets
1b9a7e6 feat(a11y): add clay WCAG tokens, focus-visible, reduced-motion, hover gating, useReducedMotion hook
```

Base: `900f0cf` → Head: `06f08bb`

## What Was Shipped (Foundation / Phase 1)

### Accessibility Infrastructure
- Skip-to-content link in marketing layout
- Global `*:focus-visible` styles (2px clay outline)
- `useReducedMotion` hook integrated into all 8 GSAP components
- CSS `@media (prefers-reduced-motion: reduce)` override (kills all transitions/animations)
- `<h1>` heading hierarchy fix in HeroSection
- Newsletter form: `<label>`, `aria-label`, `id`
- Header: `aria-label="Main navigation"`, `aria-expanded`, `aria-controls`, `id="mobile-menu"`
- Footer: `<nav aria-label="Footer navigation">` wrapper

### Contrast Fixes (WCAG AA)
- Clay darkened from `#CC5833` → `#B84A28` (full 10-token scale recalculated)
- 12 opacity values raised across Footer, HeroSection, FeaturesSection, PhilosophySection, ProtocolSection, CTASection
- Hardcoded `#CC5833` in ScanningLaser and PulsingWaveform updated to `#B84A28`

### Touch Targets (44px minimum)
- Hamburger button: `p-1` → `min-h-[44px] min-w-[44px]`
- Mobile menu links: `py-2` → `py-3`
- Footer legal links: `text-[11px]` → `text-xs` + `py-1`
- Newsletter input: `h-10` → `h-11`

### Performance
- Hero CLS/LCP: removed `opacity-0` CSS classes, GSAP `set()` for initial state (progressive enhancement)
- NoiseOverlay: SVG `feTurbulence` → static 5KB PNG tile, z-index 9999 → 50
- ProtocolSection: `filter: blur()` removed entirely, replaced with steeper opacity curve
- 3 infinite animations (ConcentricCircles, ScanningLaser, PulsingWaveform): IntersectionObserver pause/resume
- PostHog: deferred init via `requestIdleCallback` (was blocking main thread 50-150ms)
- `scroll-behavior: smooth` removed (conflicted with GSAP ScrollTrigger)

### Animation Timing
- All durations cut ~40% (800-1000ms → 400-600ms)
- MagneticButton transitions: 0.4s → 0.25s
- Hover effects gated behind `@media (hover: hover)`
- Active state added: `scale(0.97)` for tap feedback
- Scroll indicator: infinite → 3 repeats

## Code Review Fixes Applied
- Noise texture PNG: regenerated at 100x100 with 16 quantized levels (61KB → 5KB)
- `will-change`: conditionally applied only when `!reducedMotion`
- Duplicate `html {}` blocks merged in globals.css
- PostHog pre-init queue behavior documented with comment

---

## Phase 2: Navigation & Interaction — What Remains

> Several Phase 2 items were already completed as part of Foundation. Below shows what's done and what's remaining.

### Already Done (shipped in Foundation)
| # | Task | Status |
|---|------|--------|
| P1 | Fix hero CLS/LCP | Done — `opacity-0` removed, `gsap.set()` pattern |
| P2 | Replace NoiseOverlay SVG with static PNG | Done — 5KB tiled PNG |
| P3 | Remove `filter: blur()` from Protocol | Done — opacity+scale only |
| P4 | Pause off-screen animations | Done — IntersectionObserver on all 3 |
| P5 | Defer PostHog initialization | Done — `requestIdleCallback` |
| P6 | Remove `scroll-behavior: smooth` | Done |
| AN1-AN7 | All animation timing | Done — durations, delays, stagger, repeat |
| M4 | Tap/active states + hover gating | Done — `scale(0.97)` + `@media(hover:hover)` |
| N6 | `scroll-padding-top: 5rem` | Done |

### Remaining Phase 2 Tasks (need spec + plan)
| # | Task | Details | File(s) |
|---|------|---------|---------|
| N1 | Show all 5 nav items on desktop | Remove `.slice(0, 3)` | `Header.tsx:60` |
| N2 | Fix active page indicator | Visible underline + `pathname.startsWith()` | `Header.tsx:64-67` |
| N3 | Add mobile menu animation | GSAP slide+fade entrance | `Header.tsx:100` |
| N4 | Add mobile menu backdrop | `bg-charcoal/50`, tap to close | `Header.tsx` |
| N5 | Add mobile menu focus trap | Escape key, `role="dialog"`, focus trap | `Header.tsx:100-128` |
| N7 | Add breadcrumbs on slug pages | ARIA + JSON-LD breadcrumbs | `blog/[slug]/page.tsx`, `use-cases/[slug]/page.tsx` |
| M1 | Add safe-area insets | `viewportFit: "cover"` + `env(safe-area-inset-*)` | `layout.tsx`, `Header.tsx`, `Footer.tsx` |
| M2 | Fix "Rhythm" text overflow | `clamp(3rem,10vw,6rem)` on mobile | `HeroSection.tsx:66` |
| M3 | Reduce CTA display text on mobile | `text-3xl` base | `CTASection.tsx:41` |
| M5 | Reduce footer corner radius on mobile | `rounded-t-[2rem] md:rounded-t-[4rem]` | `Footer.tsx:10` |
| M6 | Add tablet intermediate layout | `sm:grid-cols-2` before `md:grid-cols-3` | `FeaturesSection.tsx:51` |

### Phase 2 Approach
- These are primarily `Header.tsx` changes (N1-N5) + mobile responsiveness (M1-M6) + breadcrumbs (N7)
- Can be organized into 2-3 independent subsystems:
  1. **Navigation overhaul** (N1-N5): all in `Header.tsx`, tightly coupled, should be one spec
  2. **Mobile responsiveness** (M1-M3, M5-M6): spread across multiple files, mostly independent
  3. **Breadcrumbs** (N7): separate concern, slug pages only

---

## Phase 3: Content & Conversion — Full Scope

> None of Phase 3 has been started. This is the largest scope and requires design/copy decisions.

### 3.1 Homepage Content (P0-P2)
| # | Task | Priority | Notes |
|---|------|----------|-------|
| CO1 | Product screenshot/video in hero | P0 | Needs actual product screenshots or video asset |
| CO2 | Customer logo bar below hero | P0 | Needs logos or placeholder industry icons |
| CO3 | Rename feature cards to benefits | P0 | "DiagnosticShuffler" → "Smart Diagnostics", etc. |
| CO4 | Secondary CTA in hero | P1 | "Watch Demo" outline button |
| CO5 | Rewrite hero headline | P1 | Include: maintenance, work orders, asset management |
| CO6 | Compress Protocol section | P1 | 3 fullscreen sticky → single-viewport 3-column |
| CO7 | Add testimonial section | P1 | Customer quotes with quantified results |
| CO8 | Replace exclusionary CTA copy | P1 | "Veltro isn't for everyone" → positive framing |
| CO9 | Add FAQ section | P2 | 6-8 B2B CMMS objection-handling questions |
| CO10 | Add pricing preview on homepage | P2 | 3-card summary with starting prices |
| CO11 | Add integration logo bar | P2 | "Works with tools you already use" |

### 3.2 Messaging Fixes
| Current | Recommended |
|---------|-------------|
| "Functional Artifacts" | "Core Capabilities" or "What You Can Do" |
| "// capabilities" | "Features" or "Platform Capabilities" |
| "DiagnosticShuffler" | "Smart Diagnostics" + benefit description |
| "TelemetryTypewriter" | "Real-Time Equipment Monitoring" |
| "CursorProtocol" | "Automated Scheduling" |
| "Your operation has a Rhythm." | Lead with benefit, reinforce with brand |

### 3.3 Page-Level Improvements
- **Pricing:** Feature comparison table, FAQ, "Talk to Sales", social proof
- **Features:** Replace jargon heading, product screenshots, organize by use case, inter-section CTAs
- **Blog:** Feature recent posts on homepage, CMMS SEO keywords
- **Integrations:** Organize by category, "request integration" form

### Phase 3 Approach
- Requires **design decisions and copy writing** before implementation
- P0 items (CO1-CO3) can ship independently — they're the highest conversion impact
- CO6 (Protocol compression) is a significant layout redesign
- CO7 (testimonials) and CO2 (logo bar) need real or placeholder assets
- Recommend splitting into:
  1. **Content rewrite spec** (CO3, CO5, CO8 + messaging fixes) — copy-only, no layout changes
  2. **Homepage sections spec** (CO1, CO2, CO4, CO6, CO7, CO9-CO11) — new components needed
  3. **Page-level spec** (pricing, features, blog, integrations) — per-page improvements

---

## Phase 4: Polish (Ongoing, Low Priority)

| # | Task | Status |
|---|------|--------|
| PO1 | Footer `<nav>` wrapper | **Done** (shipped in Foundation) |
| PO2 | NoiseOverlay z-index 9999 → 50 | **Done** (shipped in Foundation) |
| B1 | Dynamic import below-fold sections | Not started |
| B2 | Remove unused Cormorant Garamond weight 700 | Not started |
| B3 | Evaluate consolidating Outfit + Plus Jakarta Sans | Not started |
| B4 | Audit framer-motion vs GSAP overlap | Not started |
| B5 | Refactor DiagnosticShuffler triple-render | Not started |
| B6 | Refactor TelemetryTypewriter 55ms setState | Not started |
| PO3-PO7 | Various polish items | Not started |

---

## Next Steps (exact)

### Option A: Phase 2 first (recommended)
> Invoke `superpowers:brainstorming` to create the Navigation & Interaction spec covering remaining Phase 2 items (N1-N5, N7, M1-M3, M5-M6). Use `superpowers:writing-plans` after approval.

### Option B: Phase 3 first
> Invoke `superpowers:brainstorming` for Content & Conversion. This requires design/copy decisions — may need user input on hero headline, feature naming, testimonial content, and whether to use placeholder assets.

### Option C: Quick wins from both phases
> Cherry-pick the mechanical items that need no design decisions: N1 (show all nav items), M2 (text overflow), M5 (footer radius), M6 (tablet grid), CO3 (rename feature cards), CO8 (CTA copy). These could ship as a small spec without brainstorming.

---

## Key Files & Artifacts

### Plans & Specs
```
docs/plans/2026-03-31-ux-improvement-plan.md              # Master plan — all 67 issues, 4 phases
docs/superpowers/specs/2026-03-31-foundation-ux-design.md  # Foundation spec (complete, shipped)
docs/superpowers/plans/2026-03-31-foundation-ux.md         # Foundation implementation plan (complete)
docs/session-handoffs/session-handoff-foundation-ux-2026-03-31.md  # This file
```

### Files Modified by Foundation (17 total)
```
src/styles/globals.css                          # Clay tokens, focus-visible, reduced-motion, timing, hover gating
src/lib/useReducedMotion.ts                     # NEW — shared hook (used by 8 components)
src/app/(marketing)/layout.tsx                  # Skip link, main id
src/components/layout/Header.tsx                # ARIA, hamburger touch target, mobile link padding
src/components/layout/Footer.tsx                # 10 contrast fixes, legal links, nav wrapper
src/components/marketing/HeroSection.tsx        # h1, remove opacity-0, GSAP pattern, timing
src/components/marketing/FeaturesSection.tsx     # Eyebrow contrast, card duration, reduced-motion
src/components/marketing/PhilosophySection.tsx   # Word reveal opacity, duration, reduced-motion
src/components/marketing/ProtocolSection.tsx     # Remove blur, will-change, opacity fixes, reduced-motion
src/components/marketing/CTASection.tsx          # Subtext contrast, stagger/duration, reduced-motion
src/components/shared/NoiseOverlay.tsx           # Rewrite: SVG → static PNG, lower z-index
src/components/animations/ConcentricCircles.tsx  # Pause off-screen, reduced-motion
src/components/animations/ScanningLaser.tsx      # Pause off-screen, reduced-motion, clay color
src/components/animations/PulsingWaveform.tsx    # Pause off-screen, reduced-motion, clay color
src/components/forms/NewsletterForm.tsx          # Label, aria-label, input height
src/lib/posthog-provider.tsx                    # Defer init to requestIdleCallback
public/images/noise-texture.png                 # NEW — static noise texture (5KB)
```

### Files Phase 2 Will Primarily Touch
```
src/components/layout/Header.tsx                # N1-N5 (navigation overhaul)
src/app/(marketing)/layout.tsx                  # M1 (safe-area insets)
src/components/layout/Footer.tsx                # M1 (safe-area), M5 (radius)
src/components/marketing/HeroSection.tsx        # M2 (text overflow)
src/components/marketing/CTASection.tsx         # M3 (mobile text size)
src/components/marketing/FeaturesSection.tsx     # M6 (tablet grid)
src/app/(marketing)/blog/[slug]/page.tsx        # N7 (breadcrumbs) — needs reading
src/app/(marketing)/use-cases/[slug]/page.tsx   # N7 (breadcrumbs) — needs reading
```

---

## Non-Obvious Decisions Made This Session

| Decision | Reason |
|----------|--------|
| PostHog kept `capture_pageview: false` despite spec saying `true` | Preserves existing manual tracking via `PostHogPageView` component. posthog-js queues pre-init `capture()` calls, so initial pageview is buffered. Documented with comment. |
| Noise PNG regenerated at 100x100 (not 200x200) with 16 quantized levels | Original 200x200 random noise was 61KB (incompressible). Reducing tile size and quantizing to 16 gray levels brought it to 5KB. Visually identical at 0.05 opacity. |
| `will-change` conditionally applied via spread | `...(!reducedMotion && { willChange: "transform, opacity" })` avoids permanent GPU layer promotion when animations are disabled. |
| PhilosophySection word color kept at `text-cream/40` (not raised) | The words start at 0.3 opacity in GSAP and animate to 1.0. The CSS class `text-cream/40` is the base color of the fully-revealed text, not the animated start opacity. Raising it further would reduce the cinematic depth effect. |
| `fromTo` replaced with `set` + `to` in all ScrollTrigger components | Avoids GSAP fighting CSS classes. `set()` establishes initial state in JS, `to()` animates to final. If JS fails, content is visible (progressive enhancement). |

## Build Status
- `npm run build`: Passes clean (26 static pages, 102KB shared JS)
- No TypeScript errors, no lint errors
