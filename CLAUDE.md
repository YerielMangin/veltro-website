# CLAUDE.md — Veltro Website

> Marketing website, blog, and customer portal for getveltro.com

---

## Overview
**Veltro Website** — Public-facing marketing site for the Veltro CMMS platform.
Separate from the main Veltro app monorepo (`c:\Dev\veltro`).

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15+ (App Router, Turbopack) |
| Language | TypeScript 5.7+ |
| Styling | Tailwind CSS v4 |
| UI Components | Custom (no component library) |
| Content | MDX (blog, changelog, use cases) |
| Analytics | PostHog + Vercel Analytics |
| Payments | Stripe |
| Email | Resend + React Email |
| Auth | Supabase (separate project from app) |
| Hosting | Vercel |
| CMS | File-based MDX (no headless CMS) |

---

## Directory Structure

```
veltro-website/
├── src/
│   ├── app/
│   │   ├── (marketing)/    # Public pages (home, pricing, features, blog, etc.)
│   │   ├── (auth)/         # Login, register for customer portal
│   │   └── (dashboard)/    # Analytics admin (internal)
│   ├── components/
│   │   ├── brand/          # Logo, wordmark, brand assets
│   │   ├── layout/         # Header, Footer
│   │   ├── marketing/      # Hero, CTA, testimonial sections
│   │   ├── ui/             # Buttons, inputs, cards
│   │   ├── forms/          # Contact, demo request forms
│   │   └── animations/     # Framer Motion components
│   ├── config/             # Site config, navigation, pricing tiers
│   ├── content/            # MDX files (blog, customers, use-cases)
│   ├── lib/                # Utilities, Supabase client, content parser
│   ├── services/           # Analytics, email, AI chat, CMS
│   ├── styles/             # globals.css
│   └── types/              # TypeScript types
├── public/                 # Static assets, OG images, fonts
└── supabase/               # Website-specific DB (leads, subscribers)
```

---

## Key Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing page with hero, features, CTA |
| `/features` | Detailed feature breakdown |
| `/pricing` | Pricing tiers (Starter, Pro, Enterprise) |
| `/blog` + `/blog/[slug]` | MDX blog posts |
| `/customers` + `/customers/[slug]` | Case studies |
| `/use-cases/[slug]` | Industry-specific pages |
| `/integrations` | Integration directory |
| `/demo` | Free trial signup |
| `/contact` | Contact form + sales info |
| `/about` | Company info |
| `/careers` | Job listings |
| `/changelog` | Product changelog |
| `/security` | Security practices |
| `/privacy`, `/terms`, `/cookies` | Legal pages |
| `/status` | System status |
| `/partners` | Partner program |

---

## Brand

- **Name:** Veltro
- **Tagline:** Velocity + Control
- **Logo:** SVG with 4 stroke elements (diagonal, bent, secondary diagonal, dot)
- **Primary color:** `#4263eb` (brand-700)
- **Dark theme default**

---

## Content (MDX)

Blog posts and content pages go in `src/content/{category}/{slug}.mdx`:

```mdx
---
title: "Post Title"
description: "Brief description"
date: "2026-03-16"
author: "Author Name"
image: "/images/blog/post-image.jpg"
tags: ["cmms", "maintenance"]
published: true
---

Content here...
```

---

## Cinematic Design System (Stitch Reference)

The stitch-cinematic prototype (`stitch-cinematic/`) is the reference implementation for the site's cinematic aesthetic. The original builder prompt is saved at `docs/GEMINI.md`.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Moss | `#2E4036` | Primary dark green — backgrounds, text |
| Clay | `#CC5833` | Accent terracotta — CTAs, highlights, labels |
| Cream | `#F2F0E9` | Light background — cards, sections |
| Charcoal | `#1A1A1A` | Deep dark — hero, footer, dark sections |

### Typography

| Role | Font | Usage |
|------|------|-------|
| Heading | Plus Jakarta Sans | Bold sans — section titles, nav, buttons |
| Display | Cormorant Garamond (Italic) | Dramatic serif — hero headlines, manifesto |
| Data | IBM Plex Mono | Monospace — labels, status, telemetry |

### Visual Texture
- Global noise overlay via inline SVG `<feTurbulence>` filter at **0.05 opacity**
- Rounded corners: `rounded-[2rem]` to `rounded-[3rem]` on all containers — no sharp corners

### Animation Conventions (GSAP)
- Use `gsap.context()` in `useEffect`, return `ctx.revert()` in cleanup
- Default easing: `power3.out` (entrances), `power2.inOut` (morphs)
- Stagger: `0.08` for text, `0.15` for cards/containers
- Micro-interactions: magnetic buttons `scale(1.03)` on hover, link lift `translateY(-1px)`
- Scroll blur/fade: only apply when the **next section overlaps** — never on scroll entry

### Component Architecture
- **Navbar:** floating pill, fixed centered, morphs transparent → blurred on scroll
- **Hero:** 100dvh, full-bleed image with gradient overlay, content bottom-left, staggered GSAP entrance
- **Features:** 3 interactive micro-UI cards (DiagnosticShuffler, TelemetryTypewriter, CursorScheduler)
- **Philosophy:** dark bg with parallax texture, word-by-word ScrollTrigger reveal
- **Protocol:** sticky-stacking full-screen cards with blur/scale/opacity on next-card overlap
- **Pricing:** 3-tier grid, middle card highlighted
- **Footer:** dark bg, `rounded-t-[4rem]`, system status indicator with pulsing dot

### Prototype Workflow
- Use `docs/GEMINI.md` prompt with aesthetic presets to generate new cinematic prototypes
- Deploy showcases to Netlify per `docs/NETLIFY_DEPLOY.md` (always prod, each prototype = separate site)
- Stitch-cinematic is the current reference implementation

---

## Do Not

- Do not use a headless CMS — all content is file-based MDX
- Do not use `@apply` with Tailwind theme vars
- Do not use the Veltro app's Supabase project — website has its own
- Do not add `"use client"` unless the component needs client interactivity
- Do not import from the Veltro app monorepo — this is a standalone project
- Do not use sharp corners — maintain `rounded-[2rem]+` radius system on cinematic pages
- Do not apply blur/opacity effects on scroll entry — only on scroll exit (next section overlap)

---

## Scripts

```bash
npm run dev          # Start dev server (Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run test         # Vitest
npm run test:e2e     # Playwright
```
