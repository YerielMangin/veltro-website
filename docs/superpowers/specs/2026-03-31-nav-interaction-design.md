# Phase 2: Navigation & Interaction — Design Spec

> Single spec covering all 11 remaining Phase 2 tasks: navigation overhaul (N1-N5), mobile responsiveness (M1-M3, M5-M6), and breadcrumbs (N7).

**Branch:** `feat/scroll-fix-and-cinematic-design-system`
**Base commit:** `06f08bb`
**Date:** 2026-03-31

---

## 1. Navigation Overhaul (N1-N5)

All changes in `src/components/layout/Header.tsx` unless noted.

### N1 — Show all 5 nav items on desktop

- Remove `.slice(0, 3)` at line 61
- All 5 `mainNav` items render: Features, Pricing, Customers, Blog, Integrations
- Login link stays separate (external URL, not in `mainNav`)
- Tighten gap from `gap-6` to `gap-5` to fit 5 items + Login in the pill

### N2 — Active page indicator (clay dot + font-weight)

Active detection logic:
```ts
const isActive = item.href === "/"
  ? pathname === "/"
  : pathname === item.href || pathname.startsWith(item.href + "/");
```

Active state styling:
- `opacity-100` + `font-semibold`
- 4px clay dot: `absolute bottom-0 left-1/2 -translate-x-1/2`, `w-1 h-1 rounded-full bg-clay`
- Each nav link needs `relative pb-1` to make room for the dot

Inactive state:
- `opacity-70` + `font-medium` (current behavior)
- No dot

Scrolled state (cream background):
- Same dot pattern — clay works on both transparent and cream backgrounds
- No color change needed

### N3 — Mobile menu animation (scale from hamburger origin)

GSAP entrance timeline:
```
Panel:  { scale: 0.95, opacity: 0, transformOrigin: "top right" } → { scale: 1, opacity: 1 }
        duration: 0.25s, ease: "power3.out"

Items:  { opacity: 0, y: 8 } → { opacity: 1, y: 0 }
        stagger: 0.04s, ease: "power3.out"
```

GSAP exit (reverse):
```
Items:  { opacity: 0 }, duration: 0.1s (fast)
Panel:  { scale: 0.95, opacity: 0 }, duration: 0.2s, ease: "power2.inOut"
```

After exit animation completes → `setMobileOpen(false)` to unmount.

Reduced motion (`useReducedMotion`): instant show/hide, no GSAP.

Implementation note: The menu must stay mounted during exit animation. Use a separate `isAnimating` ref or `isVisible` state to control mount/unmount after the exit timeline completes.

### N4 — Mobile menu backdrop

- Fixed overlay behind menu panel: `fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm`
- Menu panel z-index stays at `z-40` but renders after backdrop in DOM (stacking context)
- Fades in via GSAP alongside panel: `{ opacity: 0 } → { opacity: 1 }`, duration 0.25s
- Click/tap on backdrop triggers close animation (N3 exit)
- Backdrop fades out during exit animation

### N5 — Focus trap + accessibility

Attributes on menu container:
- `role="dialog"`
- `aria-modal="true"`
- `aria-label="Navigation menu"`

Focus management:
- On open: focus moves to first menu link after entrance animation completes
- On close: focus returns to hamburger button (store ref)
- Escape key triggers close animation

Focus trap implementation:
- Query all focusable elements within the dialog (`a, button`)
- On Tab at last element → wrap to first
- On Shift+Tab at first element → wrap to last
- No external library — scope is 6-8 focusable elements

---

## 2. Mobile Responsiveness (M1-M3, M5-M6)

### M1 — Safe-area insets

File: `src/app/layout.tsx` (root layout)
- Add `viewport-fit=cover` to the viewport meta tag:
  ```ts
  export const viewport: Viewport = {
    viewportFit: "cover",
  };
  ```

File: `src/components/layout/Header.tsx`
- Add `pt-[env(safe-area-inset-top)]` to the nav element (only meaningful on notch devices)

File: `src/components/layout/Footer.tsx`
- Add `pb-[env(safe-area-inset-bottom)]` to the footer element

File: `src/app/(marketing)/layout.tsx`
- No changes needed — safe-area propagates from root layout

### M2 — Hero "Rhythm." text overflow

File: `src/components/marketing/HeroSection.tsx`

Current (line 72):
```html
<span className="... text-6xl ... md:text-8xl lg:text-[10rem]">
```

Replace with inline `fontSize` style for fluid clamp:
```html
<span className="... md:text-8xl lg:text-[10rem]" style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}>
```

Note: The `md:` and `lg:` breakpoints in the className act as overrides at larger sizes, but `clamp()` handles the fluid range. Since Tailwind v4 arbitrary values don't support multi-arg `clamp()` cleanly, inline style is the pragmatic choice. The `md:text-8xl lg:text-[10rem]` classes can be removed since `clamp(3.5rem, 12vw, 10rem)` covers the full range.

Final markup:
```html
<span className="hero-line-2 mt-2 block font-display italic leading-[0.9] tracking-tight text-cream"
      style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}>
```

### M3 — CTA section text size on mobile

File: `src/components/marketing/CTASection.tsx`

Current (line 40):
```html
<p className="font-display text-5xl italic leading-tight text-charcoal md:text-7xl">
```

Change to:
```html
<p className="font-display text-3xl italic leading-tight text-charcoal md:text-5xl lg:text-7xl">
```

### M5 — Footer corner radius on mobile

File: `src/components/layout/Footer.tsx`

Current (line 10):
```html
<footer className="... rounded-t-[4rem] ...">
```

Change to:
```html
<footer className="... rounded-t-[2rem] md:rounded-t-[4rem] ...">
```

### M6 — Tablet intermediate layout for features grid

File: `src/components/marketing/FeaturesSection.tsx`

Current (line 50):
```html
<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
```

Change to:
```html
<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
```

---

## 3. Breadcrumbs (N7)

### New component: `src/components/shared/Breadcrumbs.tsx`

Server component (no `"use client"`).

Props:
```ts
interface BreadcrumbItem {
  label: string;
  href?: string;  // omit for current page (last item)
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}
```

Visual design:
- Wrapper: `<nav aria-label="Breadcrumb">`
- List: `<ol>` with `flex items-center gap-2`
- Items: `font-mono text-[10px] uppercase tracking-widest`
- Separator: ` / ` in `text-charcoal/30`
- Link items: `text-charcoal/40 hover:text-charcoal transition-colors`
- Current page (last item): `text-charcoal/60` (no link)
- Truncation: current page label truncated with `max-w-[200px] truncate` to prevent long titles from breaking layout

JSON-LD structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://getveltro.com/" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://getveltro.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Post Title" }
  ]
}
```

Injected via `<script type="application/ld+json">` inside the component. Uses `https://getveltro.com` as the base URL (from site config or hardcoded).

### Blog `[slug]` page integration

File: `src/app/(marketing)/blog/[slug]/page.tsx`

Replace the "← Back to journal" `<Link>` (lines 59-65) with:
```tsx
<Breadcrumbs items={[
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: post.meta.title },
]} />
```

Same position — above the article header, inside the `<ScrollReveal>`.

### Use-cases `[slug]` page integration

File: `src/app/(marketing)/use-cases/[slug]/page.tsx`

Add breadcrumbs above the prose content section (before line 53):
```tsx
<Breadcrumbs items={[
  { label: "Home", href: "/" },
  { label: "Solutions" },
  { label: useCase.meta.industry },
]} />
```

Note: "Solutions" has no href because there is no `/use-cases` index page — it's a label-only breadcrumb segment. If a use-cases index page is added later, this becomes a link.

---

## Files Modified

| File | Changes |
|------|---------|
| `src/components/layout/Header.tsx` | N1-N5: full navigation overhaul |
| `src/components/layout/Footer.tsx` | M1: safe-area, M5: mobile radius |
| `src/components/marketing/HeroSection.tsx` | M2: fluid text clamp |
| `src/components/marketing/CTASection.tsx` | M3: mobile text size |
| `src/components/marketing/FeaturesSection.tsx` | M6: tablet grid |
| `src/app/layout.tsx` | M1: viewport-fit meta |
| `src/components/shared/Breadcrumbs.tsx` | N7: new component |
| `src/app/(marketing)/blog/[slug]/page.tsx` | N7: add breadcrumbs, remove back link |
| `src/app/(marketing)/use-cases/[slug]/page.tsx` | N7: add breadcrumbs |

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Clay dot indicator (not underline or pill) | Echoes the Veltro logo dot, keeps nav visually clean with 5 items |
| Scale-from-origin animation (not slide-down or fullscreen) | Feels intentional — panel "opens" from where user tapped. Light and cinematic without being heavy |
| No focus-trap library | Only 6-8 focusable elements in menu — custom implementation is simpler than adding a dependency |
| Inline `clamp()` style for hero text | Tailwind v4 arbitrary values don't handle multi-arg clamp cleanly; inline style is the pragmatic choice |
| "Solutions" breadcrumb with no href | No `/use-cases` index page exists — adding a dead link is worse than a label-only segment |
| Breadcrumbs as server component | No client interactivity needed — keeps JS bundle impact at zero |
| JSON-LD in breadcrumb component | Co-locates SEO markup with the visual component — single source of truth |
