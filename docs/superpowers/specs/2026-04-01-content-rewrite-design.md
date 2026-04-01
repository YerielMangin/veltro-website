# Design Spec — Homepage Content Rewrite (Phase 3a)

> Copy-only changes + one subtitle addition. No layout changes, no new components.

## Scope

Items from the Phase 3 Content & Conversion backlog:
- **CO3** — Rename feature card badges to benefit-oriented labels
- **CO5** — Rewrite hero headline area (add subtitle)
- **CO8** — Replace exclusionary CTA copy
- **Messaging fixes** — Features eyebrow and heading

## Design Decisions

| Decision | Choice |
|----------|--------|
| Brand voice | Strong cinematic — rewrite for clarity, preserve poetic/dramatic tone |
| Hero approach | Keep "Rhythm" as anchor, add descriptive subtitle below |
| CTA tone | Confident invitation — empowerment framing, not exclusionary |
| Feature badges | Benefit-oriented labels (not category labels, not removed) |
| Positioning | Veltro is an operations platform, NOT maintenance-only |

---

## Changes by Section

### 1. HeroSection.tsx

| Element | Current | New |
|---------|---------|-----|
| Headline L1 | "Your operation has a" | *(no change)* |
| Headline L2 | "Rhythm." | *(no change)* |
| **Subtitle (NEW element)** | *(none)* | "The operations platform that brings clarity to every task, asset, and team." |
| CTA button | "Start Your 14-Day Trial" | *(no change)* |
| Sub-CTA | "No credit card required" | *(no change)* |

**Implementation:** Add a `<p>` element below the `<h1>` with the subtitle text. Style to match cinematic aesthetic — cream text, slightly muted opacity, appropriate font size for a subtitle.

### 2. FeaturesSection.tsx

| Element | Current | New |
|---------|---------|-----|
| Eyebrow label | `// capabilities` | `// platform` |
| Section heading | `Functional Artifacts` | `Core Capabilities` |

### 3. DiagnosticShuffler.tsx

| Element | Current | New |
|---------|---------|-----|
| Badge label | `Diagnostic` | `Smart Diagnostics` |

### 4. TelemetryTypewriter.tsx

| Element | Current | New |
|---------|---------|-----|
| Badge label | `Live Feed` | `Real-Time Monitoring` |

### 5. CursorProtocol.tsx

| Element | Current | New |
|---------|---------|-----|
| Badge label | `Protocol` | `Automated Scheduling` |

### 6. CTASection.tsx

| Element | Current | New |
|---------|---------|-----|
| Headline | "Veltro isn't for everyone. It's for the teams who understand that speed is a byproduct of precision." | "Your team deserves more than reactive chaos. Veltro gives you the clarity to move with precision." |
| Subtext | "Join the operations who value flow over friction. Find your rhythm today." | "Less firefighting. More flow. Find your rhythm today." |
| CTA button | "Start Your 14-Day Trial" | *(no change)* |
| Footer | "NO CREDIT CARD REQUIRED · SETUP IN < 2 MINS" | *(no change)* |

---

## Files Modified

| File | Change Type |
|------|------------|
| `src/components/marketing/HeroSection.tsx` | Add subtitle `<p>` element + string |
| `src/components/marketing/FeaturesSection.tsx` | String swap (eyebrow + heading) |
| `src/components/animations/DiagnosticShuffler.tsx` | String swap (badge) |
| `src/components/animations/TelemetryTypewriter.tsx` | String swap (badge) |
| `src/components/animations/CursorProtocol.tsx` | String swap (badge) |
| `src/components/marketing/CTASection.tsx` | String swap (headline + subtext) |

**Total: 6 files, ~10 string changes, 1 new JSX element**

---

## Out of Scope

- Hero headline rewrite (keeping "Your operation has a Rhythm.")
- Feature card titles and descriptions (already benefit-oriented)
- Philosophy section copy (already effective)
- Protocol section copy (already clear)
- Layout or component structure changes
- New sections (logo bar, testimonials, FAQ — those are CO1/CO2/CO7/CO9, separate spec)

---

## Styling Notes for Hero Subtitle

The subtitle should:
- Use `text-cream/70` for muted contrast against the hero background
- Size: `text-lg md:text-xl` — body text, not a second headline
- Font: Plus Jakarta Sans (body font), not Cormorant Garamond (display)
- Max width: constrain to `max-w-xl` or similar so it doesn't span the full viewport on desktop
- Animation: fade-in as part of the existing GSAP stagger sequence in HeroSection (add after the headline, before the CTA). Use the same `power3.out` easing and stagger timing.
- Reduced motion: respect the existing `useReducedMotion` hook — if reduced motion, skip the fade-in (element visible immediately)
