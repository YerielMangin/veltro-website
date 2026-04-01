# Phase 2: Navigation & Interaction — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement all 11 remaining Phase 2 tasks — desktop nav overhaul with active indicator, animated mobile menu with focus trap, mobile responsiveness fixes, and breadcrumb navigation with JSON-LD.

**Architecture:** Changes are spread across 9 files with one new component (`Breadcrumbs.tsx`). The Header.tsx rewrite (N1-N5) is the largest change — it adds GSAP animation, backdrop, and focus trap to the existing component. Mobile fixes (M1-M6) are small, independent class changes. Breadcrumbs is a standalone server component integrated into two slug pages.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, GSAP (animations), `useReducedMotion` hook (from Phase 1).

**Spec:** `docs/superpowers/specs/2026-03-31-nav-interaction-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/layout/Header.tsx` | Modify | N1-N5: show all nav items, active indicator, mobile menu animation, backdrop, focus trap |
| `src/components/layout/Footer.tsx` | Modify | M1: safe-area inset, M5: mobile radius |
| `src/components/marketing/HeroSection.tsx` | Modify | M2: fluid clamp text |
| `src/components/marketing/CTASection.tsx` | Modify | M3: mobile text size |
| `src/components/marketing/FeaturesSection.tsx` | Modify | M6: tablet grid |
| `src/app/layout.tsx` | Modify | M1: viewport-fit meta |
| `src/components/shared/Breadcrumbs.tsx` | Create | N7: breadcrumb nav + JSON-LD |
| `src/app/(marketing)/blog/[slug]/page.tsx` | Modify | N7: replace back link with breadcrumbs |
| `src/app/(marketing)/use-cases/[slug]/page.tsx` | Modify | N7: add breadcrumbs |

---

## Task 1: Desktop Nav — Show All Items + Active Indicator (N1, N2)

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Remove `.slice(0, 3)` and tighten gap**

In `src/components/layout/Header.tsx`, replace the desktop links section (lines 60-72):

```tsx
        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {mainNav.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-lift font-body text-sm font-medium opacity-80 transition-opacity hover:opacity-100",
                pathname === item.href && "opacity-100"
              )}
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="https://app.getveltro.com/#/login"
            className="link-lift font-body text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
          >
            Login
          </Link>
        </div>
```

with:

```tsx
        {/* Desktop links */}
        <div className="hidden items-center gap-5 md:flex">
          {mainNav.map((item) => {
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-lift relative pb-1 font-body text-sm transition-opacity hover:opacity-100",
                  isActive
                    ? "font-semibold opacity-100"
                    : "font-medium opacity-70"
                )}
              >
                {item.title}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-clay" />
                )}
              </Link>
            );
          })}
          <Link
            href="https://app.getveltro.com/#/login"
            className="link-lift font-body text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
          >
            Login
          </Link>
        </div>
```

- [ ] **Step 2: Verify build passes**

Run: `npm run typecheck`
Expected: No TypeScript errors.

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat(nav): show all 5 items on desktop, add clay dot active indicator (N1, N2)"
```

---

## Task 2: Mobile Menu Animation + Backdrop (N3, N4)

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Add GSAP import and refs**

At the top of `src/components/layout/Header.tsx`, add the GSAP import alongside existing imports:

```tsx
import gsap from "gsap";
```

Add the `useReducedMotion` import:

```tsx
import { useReducedMotion } from "@/lib/useReducedMotion";
```

Inside the `Header` component, add these refs and state after the existing `sentinelRef`:

```tsx
  const reducedMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const isAnimatingRef = useRef(false);
  const [menuVisible, setMenuVisible] = useState(false);
```

- [ ] **Step 2: Create open and close animation functions**

Add these functions inside the `Header` component, after the refs:

```tsx
  const openMenu = () => {
    if (isAnimatingRef.current) return;
    setMobileOpen(true);
    setMenuVisible(true);

    if (reducedMotion) return;

    isAnimatingRef.current = true;
    requestAnimationFrame(() => {
      const tl = gsap.timeline({
        onComplete: () => { isAnimatingRef.current = false; },
      });

      // Backdrop fade in
      if (backdropRef.current) {
        gsap.set(backdropRef.current, { opacity: 0 });
        tl.to(backdropRef.current, { opacity: 1, duration: 0.25, ease: "power3.out" }, 0);
      }

      // Panel scale from top-right
      if (menuRef.current) {
        gsap.set(menuRef.current, { scale: 0.95, opacity: 0, transformOrigin: "top right" });
        tl.to(menuRef.current, { scale: 1, opacity: 1, duration: 0.25, ease: "power3.out" }, 0);
      }

      // Stagger menu items
      if (menuRef.current) {
        const items = menuRef.current.querySelectorAll(".mobile-menu-item");
        gsap.set(items, { opacity: 0, y: 8 });
        tl.to(items, { opacity: 1, y: 0, stagger: 0.04, duration: 0.25, ease: "power3.out" }, 0.05);
      }
    });
  };

  const closeMenu = () => {
    if (isAnimatingRef.current) return;

    if (reducedMotion) {
      setMobileOpen(false);
      setMenuVisible(false);
      return;
    }

    isAnimatingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        setMobileOpen(false);
        setMenuVisible(false);
        isAnimatingRef.current = false;
        hamburgerRef.current?.focus();
      },
    });

    // Fade out items fast
    if (menuRef.current) {
      const items = menuRef.current.querySelectorAll(".mobile-menu-item");
      tl.to(items, { opacity: 0, duration: 0.1 }, 0);
    }

    // Scale down panel
    if (menuRef.current) {
      tl.to(menuRef.current, { scale: 0.95, opacity: 0, duration: 0.2, ease: "power2.inOut" }, 0.05);
    }

    // Fade out backdrop
    if (backdropRef.current) {
      tl.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: "power2.inOut" }, 0.05);
    }
  };
```

- [ ] **Step 3: Update the hamburger button**

Replace the existing hamburger button (the `<button>` with `onClick={() => setMobileOpen(!mobileOpen)}`):

```tsx
        <button
          ref={hamburgerRef}
          className="flex items-center justify-center min-h-[44px] min-w-[44px] md:hidden"
          onClick={() => (mobileOpen ? closeMenu() : openMenu())}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
```

- [ ] **Step 4: Replace the mobile menu markup**

Replace the existing mobile dropdown section (the `{mobileOpen && (` block) with:

```tsx
      {/* Mobile backdrop */}
      {menuVisible && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-40 bg-charcoal/50 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu */}
      {menuVisible && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="fixed left-4 right-4 top-16 z-40 flex flex-col gap-4 rounded-[2rem] border border-cream-300 bg-cream/95 p-6 shadow-xl backdrop-blur-xl md:hidden"
        >
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="mobile-menu-item border-b border-cream-300 py-3 font-body text-base font-medium text-charcoal last:border-0"
            >
              {link.title}
            </Link>
          ))}
          <Link
            href="https://app.getveltro.com/#/login"
            onClick={closeMenu}
            className="mobile-menu-item border-b border-cream-300 py-3 font-body text-base font-medium text-charcoal"
          >
            Login
          </Link>
          <MagneticButton
            href="/demo"
            variant="clay"
            size="md"
            className="mobile-menu-item mt-2 w-full"
          >
            Start Trial
          </MagneticButton>
        </div>
      )}
```

- [ ] **Step 5: Update the body overflow effect**

Replace the existing `mobileOpen` body overflow `useEffect`:

```tsx
  useEffect(() => {
    document.body.style.overflow = menuVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuVisible]);
```

- [ ] **Step 6: Verify build passes**

Run: `npm run typecheck`
Expected: No TypeScript errors.

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat(nav): add mobile menu scale animation + charcoal backdrop (N3, N4)"
```

---

## Task 3: Mobile Menu Focus Trap + Accessibility (N5)

**Files:**
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Add focus trap and Escape key handling**

Add this `useEffect` inside the `Header` component, after the body overflow effect:

```tsx
  // Focus trap + Escape key for mobile menu
  useEffect(() => {
    if (!menuVisible || !menuRef.current) return;

    const menuEl = menuRef.current;

    // Focus first link after animation settles
    const focusTimer = setTimeout(() => {
      const firstLink = menuEl.querySelector<HTMLElement>("a, button");
      firstLink?.focus();
    }, reducedMotion ? 0 : 300);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = menuEl.querySelectorAll<HTMLElement>("a, button");
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuVisible, reducedMotion]);
```

- [ ] **Step 2: Add ARIA dialog attributes to the menu container**

Update the mobile menu `<div>` to include dialog attributes. Find the `id="mobile-menu"` div and add:

```tsx
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="fixed left-4 right-4 top-16 z-40 flex flex-col gap-4 rounded-[2rem] border border-cream-300 bg-cream/95 p-6 shadow-xl backdrop-blur-xl md:hidden"
        >
```

- [ ] **Step 3: Verify build passes**

Run: `npm run typecheck`
Expected: No TypeScript errors.

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Header.tsx
git commit -m "feat(a11y): add focus trap, Escape key, ARIA dialog to mobile menu (N5)"
```

---

## Task 4: Mobile Responsiveness — Safe-Area Insets (M1)

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Add viewport-fit to root layout**

In `src/app/layout.tsx`, update the `viewport` export (lines 85-92). Replace:

```ts
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F0E9" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  width: "device-width",
  initialScale: 1,
};
```

with:

```ts
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F0E9" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
```

- [ ] **Step 2: Add safe-area padding to Header**

In `src/components/layout/Header.tsx`, add safe-area padding to the `<nav>` element. In the className string, append a padding-top for safe area. Update the `<nav>` element's className from:

```
"fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full px-4 py-3 transition-all duration-500 ease-out md:gap-8 md:px-6"
```

to:

```
"fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] transition-all duration-500 ease-out md:gap-8 md:px-6"
```

Note: `pt-[max(0.75rem,env(safe-area-inset-top))]` ensures minimum padding of 0.75rem (the original py-3) and respects safe area on notch devices.

- [ ] **Step 3: Add safe-area padding to Footer**

In `src/components/layout/Footer.tsx`, update the `<footer>` element's className. Change:

```
"mt-12 rounded-t-[4rem] bg-charcoal px-6 pb-8 pt-20 text-cream/70 md:px-12 lg:px-24"
```

to:

```
"mt-12 rounded-t-[4rem] bg-charcoal px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 text-cream/70 md:px-12 lg:px-24"
```

Note: `pb-[max(2rem,env(safe-area-inset-bottom))]` ensures minimum padding of 2rem (the original pb-8) while respecting safe area.

- [ ] **Step 4: Verify build passes**

Run: `npm run typecheck && npm run build`
Expected: Both pass with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/components/layout/Header.tsx src/components/layout/Footer.tsx
git commit -m "feat(mobile): add safe-area insets for notch devices (M1)"
```

---

## Task 5: Mobile Responsiveness — Text Overflow + Radius + Grid (M2, M3, M5, M6)

**Files:**
- Modify: `src/components/marketing/HeroSection.tsx`
- Modify: `src/components/marketing/CTASection.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/marketing/FeaturesSection.tsx`

- [ ] **Step 1: Fix hero "Rhythm." text overflow (M2)**

In `src/components/marketing/HeroSection.tsx`, replace line 72:

```tsx
          <span className="hero-line-2 mt-2 block font-display text-6xl italic leading-[0.9] tracking-tight text-cream md:text-8xl lg:text-[10rem]">
```

with:

```tsx
          <span
            className="hero-line-2 mt-2 block font-display italic leading-[0.9] tracking-tight text-cream"
            style={{ fontSize: "clamp(3.5rem, 12vw, 10rem)" }}
          >
```

- [ ] **Step 2: Reduce CTA text size on mobile (M3)**

In `src/components/marketing/CTASection.tsx`, replace line 40:

```tsx
        <p className="font-display text-5xl italic leading-tight text-charcoal md:text-7xl">
```

with:

```tsx
        <p className="font-display text-3xl italic leading-tight text-charcoal md:text-5xl lg:text-7xl">
```

- [ ] **Step 3: Reduce footer corner radius on mobile (M5)**

In `src/components/layout/Footer.tsx`, update the `<footer>` className. Change `rounded-t-[4rem]` to `rounded-t-[2rem] md:rounded-t-[4rem]`.

The full className after this change and the M1 change from Task 4:

```
"mt-12 rounded-t-[2rem] md:rounded-t-[4rem] bg-charcoal px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 text-cream/70 md:px-12 lg:px-24"
```

- [ ] **Step 4: Add tablet intermediate layout for features (M6)**

In `src/components/marketing/FeaturesSection.tsx`, replace line 50:

```tsx
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
```

with:

```tsx
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
```

- [ ] **Step 5: Verify build passes**

Run: `npm run typecheck && npm run build`
Expected: Both pass with no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/marketing/HeroSection.tsx src/components/marketing/CTASection.tsx src/components/layout/Footer.tsx src/components/marketing/FeaturesSection.tsx
git commit -m "fix(mobile): fluid hero text, CTA sizing, footer radius, tablet grid (M2, M3, M5, M6)"
```

---

## Task 6: Breadcrumbs Component (N7 — Part 1)

**Files:**
- Create: `src/components/shared/Breadcrumbs.tsx`

- [ ] **Step 1: Create the Breadcrumbs component**

Create `src/components/shared/Breadcrumbs.tsx`:

```tsx
import Link from "next/link";
import { absoluteUrl } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/30">
                  /
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-mono text-[10px] uppercase tracking-widest text-charcoal/40 transition-colors hover:text-charcoal"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest ${
                    isLast ? "max-w-[200px] truncate text-charcoal/60" : "text-charcoal/40"
                  }`}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 2: Verify build passes**

Run: `npm run typecheck && npm run build`
Expected: Both pass (component is created but not yet imported anywhere — tree-shaking removes it).

- [ ] **Step 3: Commit**

```bash
git add src/components/shared/Breadcrumbs.tsx
git commit -m "feat: add Breadcrumbs component with ARIA nav + JSON-LD schema (N7)"
```

---

## Task 7: Integrate Breadcrumbs into Slug Pages (N7 — Part 2)

**Files:**
- Modify: `src/app/(marketing)/blog/[slug]/page.tsx`
- Modify: `src/app/(marketing)/use-cases/[slug]/page.tsx`

- [ ] **Step 1: Add breadcrumbs to blog slug page**

In `src/app/(marketing)/blog/[slug]/page.tsx`, add the import at the top with the other imports:

```tsx
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
```

Remove the `ArrowLeft` import from lucide-react (line 4) since the back link is being replaced:

```tsx
import { ArrowLeft } from "lucide-react";
```

Replace the "Back to journal" link block (lines 59-65):

```tsx
          <Link
            href="/blog"
            className="mb-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-charcoal/40 transition-colors duration-300 hover:text-charcoal"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to journal
          </Link>
```

with:

```tsx
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.meta.title },
            ]}
          />
```

- [ ] **Step 2: Add breadcrumbs to use-cases slug page**

In `src/app/(marketing)/use-cases/[slug]/page.tsx`, add the import at the top:

```tsx
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
```

Add the breadcrumbs inside the content section, right after the opening of the `<section>` tag at line 53 and before the `<ScrollReveal>`:

Replace:

```tsx
      <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <ScrollReveal>
```

with:

```tsx
      <section className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Solutions" },
            { label: useCase.meta.industry },
          ]}
        />
        <ScrollReveal>
```

- [ ] **Step 3: Verify build passes**

Run: `npm run typecheck && npm run build`
Expected: Both pass with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/(marketing)/blog/[slug]/page.tsx src/app/(marketing)/use-cases/[slug]/page.tsx
git commit -m "feat: integrate breadcrumbs into blog + use-cases slug pages (N7)"
```

---

## Task 8: Final Verification

- [ ] **Step 1: Run full build**

Run: `npm run typecheck && npm run build`
Expected: Clean build, no TypeScript errors, no warnings.

- [ ] **Step 2: Run linter**

Run: `npm run lint`
Expected: No lint errors.

- [ ] **Step 3: Visual verification checklist**

Start dev server: `npm run dev`

Verify in browser:
- [ ] Desktop nav shows all 5 items (Features, Pricing, Customers, Blog, Integrations) + Login + Start Trial
- [ ] Active page indicator (clay dot) appears below current page's nav item
- [ ] Active indicator works on nested routes (e.g., `/blog/some-post` highlights Blog)
- [ ] Scrolled state (cream bg) still shows dot correctly
- [ ] Mobile hamburger opens menu with scale-from-top-right animation
- [ ] Charcoal backdrop appears behind mobile menu
- [ ] Tapping backdrop closes menu with reverse animation
- [ ] Escape key closes mobile menu
- [ ] Tab key cycles within mobile menu (focus trap)
- [ ] Focus returns to hamburger after menu closes
- [ ] Hero "Rhythm." text scales fluidly — no overflow at 375px
- [ ] CTA text is readable on mobile (text-3xl)
- [ ] Footer corner radius is smaller on mobile
- [ ] Features grid shows 2 columns on tablet (640px-768px)
- [ ] Blog post page shows breadcrumbs instead of "← Back to journal"
- [ ] Use-case page shows breadcrumbs above content
- [ ] Breadcrumb links navigate correctly
