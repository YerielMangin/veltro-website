# CLAUDE.md — Veltro Website

> Marketing website, blog, and customer portal for veltro.io

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

## Do Not

- Do not use a headless CMS — all content is file-based MDX
- Do not use `@apply` with Tailwind theme vars
- Do not use the Veltro app's Supabase project — website has its own
- Do not add `"use client"` unless the component needs client interactivity
- Do not import from the Veltro app monorepo — this is a standalone project

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
