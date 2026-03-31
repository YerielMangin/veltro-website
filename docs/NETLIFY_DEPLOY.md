# Netlify Showcase Deploy Guide

> Deploy prototype landing pages to Netlify for client showcases.
> Each prototype gets its own site and URL.

---

## Prerequisites

```bash
npm install -g netlify-cli
netlify login
```

Account: **Veltro-team** (slug: `yerielmangin`)

---

## Deploy a New Prototype

### 1. Create a new site

```bash
netlify sites:create --name <site-name> --account-slug yerielmangin
```

Naming convention: `veltro-<client>-<variant>` — e.g., `veltro-acme-v1`, `veltro-demo-dark`

### 2. Link your project directory

```bash
netlify link --name <site-name>
```

### 3. Deploy to production

```bash
netlify deploy --prod
```

Your site is live at: `https://<site-name>.netlify.app`

---

## Quick One-Liner (New Site)

```bash
netlify sites:create --name veltro-<name> --account-slug yerielmangin && netlify link --name veltro-<name> && netlify deploy --prod
```

---

## Update an Existing Showcase

```bash
netlify link --name <site-name>
netlify deploy --prod
```

---

## Switch Between Sites

Since `netlify link` writes to `.netlify/state.json`, you can only be linked to one site at a time per directory. To switch:

```bash
netlify unlink
netlify link --name <other-site-name>
netlify deploy --prod
```

---

## List All Showcase Sites

```bash
netlify sites:list
```

---

## Delete a Showcase Site

```bash
netlify sites:delete <site-id>
```

Get the site ID from `netlify sites:list` or `netlify status`.

---

## Current Showcase Sites

| Site | URL | Type |
|------|-----|------|
| veltro-showcase | https://veltro-showcase.netlify.app | Next.js marketing site |
| veltro-antigravity | https://veltro-antigravity.netlify.app | Vite landing page |
| veltro-cinematic | https://veltro-cinematic.netlify.app | Vite landing page |

---

## For Vite Projects (Static)

```bash
# Build first, then deploy the dist folder
npm run build
netlify sites:create --name veltro-<name> --account-slug yerielmangin
netlify deploy --dir=dist --prod --site=<site-id>
```

The site ID is returned when you create the site.

---

## Notes

- Always deploy with `--prod` — no drafts needed for showcases
- Each prototype is a separate Netlify site with its own URL
- `.netlify/` is gitignored automatically
- Production website (getveltro.com) stays on **Vercel** — Netlify is for showcases only
- Vite projects: deploy `dist/` folder. Next.js projects: deploy `out/` or use Netlify's build.
