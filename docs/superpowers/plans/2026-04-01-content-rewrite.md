# Homepage Content Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite homepage copy for clarity while preserving the cinematic brand voice — add a hero subtitle, rename feature labels, and replace exclusionary CTA copy.

**Architecture:** Pure string swaps across 5 files + one `<p>` element addition in HeroSection. No layout, logic, or styling changes beyond the new subtitle element.

**Tech Stack:** Next.js, React, GSAP (hero animation), Tailwind CSS v4

**Spec:** `docs/superpowers/specs/2026-04-01-content-rewrite-design.md`

---

## File Map

| File | Change |
|------|--------|
| `src/components/marketing/FeaturesSection.tsx` | String swap: eyebrow + heading |
| `src/components/animations/DiagnosticShuffler.tsx` | String swap: badge label |
| `src/components/animations/TelemetryTypewriter.tsx` | String swap: badge label |
| `src/components/animations/CursorProtocol.tsx` | String swap: badge label |
| `src/components/marketing/CTASection.tsx` | String swap: headline + subtext |
| `src/components/marketing/HeroSection.tsx` | Add subtitle `<p>` + integrate into GSAP stagger |

---

### Task 1: Features section — eyebrow and heading

**Files:**
- Modify: `src/components/marketing/FeaturesSection.tsx:43-48`

- [ ] **Step 1: Update eyebrow label**

In `src/components/marketing/FeaturesSection.tsx`, line 44, change the eyebrow text:

```tsx
// Before:
          // capabilities

// After:
          // platform
```

- [ ] **Step 2: Update section heading**

In `src/components/marketing/FeaturesSection.tsx`, line 47, change the heading text:

```tsx
// Before:
          Functional Artifacts

// After:
          Core Capabilities
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/FeaturesSection.tsx
git commit -m "content: rename features eyebrow and heading (CO3)"
```

---

### Task 2: Feature card badges

**Files:**
- Modify: `src/components/animations/DiagnosticShuffler.tsx:47`
- Modify: `src/components/animations/TelemetryTypewriter.tsx:66`
- Modify: `src/components/animations/CursorProtocol.tsx:89`

- [ ] **Step 1: Update DiagnosticShuffler badge**

In `src/components/animations/DiagnosticShuffler.tsx`, line 47, change the badge text:

```tsx
// Before:
        Diagnostic

// After:
        Smart Diagnostics
```

- [ ] **Step 2: Update TelemetryTypewriter badge**

In `src/components/animations/TelemetryTypewriter.tsx`, line 66, change the badge text:

```tsx
// Before:
        <span className="font-mono text-xs text-charcoal/50">Live Feed</span>

// After:
        <span className="font-mono text-xs text-charcoal/50">Real-Time Monitoring</span>
```

- [ ] **Step 3: Update CursorProtocol badge**

In `src/components/animations/CursorProtocol.tsx`, line 89, change the badge text:

```tsx
// Before:
        Protocol

// After:
        Automated Scheduling
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/animations/DiagnosticShuffler.tsx src/components/animations/TelemetryTypewriter.tsx src/components/animations/CursorProtocol.tsx
git commit -m "content: rename feature card badges to benefit labels (CO3)"
```

---

### Task 3: CTA section copy

**Files:**
- Modify: `src/components/marketing/CTASection.tsx:41-46`

- [ ] **Step 1: Update CTA headline**

In `src/components/marketing/CTASection.tsx`, lines 41-43, replace the headline:

```tsx
// Before:
        <p className="font-display text-3xl italic leading-tight text-charcoal md:text-5xl lg:text-7xl">
          Veltro isn't for everyone. It's for the teams who understand that{" "}
          <span className="text-clay">speed is a byproduct of precision.</span>
        </p>

// After:
        <p className="font-display text-3xl italic leading-tight text-charcoal md:text-5xl lg:text-7xl">
          Your team deserves more than reactive chaos. Veltro gives you the{" "}
          <span className="text-clay">clarity to move with precision.</span>
        </p>
```

- [ ] **Step 2: Update CTA subtext**

In `src/components/marketing/CTASection.tsx`, line 44, replace the subtext:

```tsx
// Before:
        <p className="mx-auto mt-6 max-w-lg font-body text-lg text-charcoal/60">
          Join the operations who value flow over friction. Find your rhythm
          today.
        </p>

// After:
        <p className="mx-auto mt-6 max-w-lg font-body text-lg text-charcoal/60">
          Less firefighting. More flow. Find your rhythm today.
        </p>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/marketing/CTASection.tsx
git commit -m "content: replace exclusionary CTA with confident invitation (CO8)"
```

---

### Task 4: Hero subtitle

**Files:**
- Modify: `src/components/marketing/HeroSection.tsx:19,67-86`

- [ ] **Step 1: Add subtitle element after the `</h1>` tag**

In `src/components/marketing/HeroSection.tsx`, after line 78 (the closing `</h1>` tag), add the subtitle paragraph:

```tsx
        </h1>
        <p className="hero-subtitle mt-6 max-w-xl font-heading text-lg text-cream/70 md:text-xl">
          The operations platform that brings clarity to every task, asset, and team.
        </p>
        <div className="hero-cta mt-10">
```

Note: The `mt-10` on `hero-cta` stays unchanged — the subtitle slots between heading and CTA.

- [ ] **Step 2: Add subtitle to GSAP initial hidden state**

In `src/components/marketing/HeroSection.tsx`, line 19, add `.hero-subtitle` to the GSAP `set()` call:

```tsx
// Before:
      gsap.set(".hero-line-1, .hero-line-2, .hero-cta, .hero-sub", { opacity: 0 });

// After:
      gsap.set(".hero-line-1, .hero-line-2, .hero-subtitle, .hero-cta, .hero-sub", { opacity: 0 });
```

- [ ] **Step 3: Add subtitle to GSAP timeline**

In `src/components/marketing/HeroSection.tsx`, insert a new timeline step after the `.hero-line-2` animation (after line 33) and before the `.hero-cta` animation:

```tsx
        .to(
          ".hero-line-2",
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.45"
        )
        .to(
          ".hero-subtitle",
          { opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          ".hero-cta",
          { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
          "-=0.3"
        )
```

The subtitle fades in (no y translation — it's body text, not a headline) between the headline and CTA in the stagger sequence.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Clean build, no errors.

- [ ] **Step 5: Verify visually**

Run: `npm run dev`
Check:
- Subtitle appears below "Rhythm." and above the CTA button
- Text is cream at ~70% opacity, sized `text-lg` on mobile and `text-xl` on desktop
- GSAP animation: subtitle fades in after headline, before CTA
- With `prefers-reduced-motion: reduce` enabled: subtitle is immediately visible (no animation)
- Subtitle does not overflow on mobile — `max-w-xl` constrains width

- [ ] **Step 6: Commit**

```bash
git add src/components/marketing/HeroSection.tsx
git commit -m "content: add hero subtitle describing Veltro platform (CO5)"
```
