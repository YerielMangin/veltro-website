# Stitch Cinematic Build — Design Spec

> Build a new Vite + React site in `stitch-cinematic/` that faithfully implements the 12 Stitch screen designs as a navigable multi-page app with full responsive support.

---

## 1. Goal

Create a standalone comparison site at `stitch-cinematic/` using the Stitch HTML designs as the source of truth. The site must look professional and clean on all screen sizes (desktop, tablet, phone). It sits alongside `antigravity-cinematic/` and the main Next.js site for side-by-side comparison.

---

## 2. Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Build | Vite | 5.x |
| UI | React | 19.x |
| Routing | React Router | 7.x |
| Styling | Tailwind CSS | 3.4.x |
| Animation | GSAP + ScrollTrigger | 3.12.x |
| Smooth Scroll | Lenis | 1.x |
| Icons | Material Symbols (Google Fonts) + Lucide React | latest |
| Utilities | clsx + tailwind-merge | latest |

---

## 3. Directory Structure

```
stitch-cinematic/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        # Fixed centered pill, scroll morph, mobile hamburger
│   │   │   ├── Footer.jsx        # Charcoal bg, rounded-t-[4rem], status indicator
│   │   │   └── Layout.jsx        # Navbar + main + Footer + NoiseOverlay wrapper
│   │   ├── shared/
│   │   │   ├── NoiseOverlay.jsx   # Fixed SVG feTurbulence grain
│   │   │   ├── BlurOrb.jsx        # Decorative gradient blur circles
│   │   │   ├── SectionWrapper.jsx # Consistent section padding/spacing
│   │   │   └── ScrollReveal.jsx   # GSAP scroll-triggered entrance animation
│   │   ├── ui/
│   │   │   ├── MagneticButton.jsx # CTA button with sliding bg + scale hover
│   │   │   ├── Badge.jsx          # Status/category badges
│   │   │   ├── Card.jsx           # Reusable card with hover lift
│   │   │   └── Accordion.jsx      # Details/summary FAQ accordion
│   │   └── micro/
│   │       ├── DiagnosticShuffler.jsx  # Cycling work order card stack
│   │       ├── TelemetryTypewriter.jsx # Character-by-character data feed
│   │       └── CursorScheduler.jsx     # Animated cursor on weekly grid
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Features.jsx
│   │   ├── VisualFeatures.jsx
│   │   ├── Pricing.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   ├── BlogIndex.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Customers.jsx
│   │   ├── Integrations.jsx
│   │   ├── Security.jsx
│   │   └── Careers.jsx
│   ├── lib/
│   │   └── cn.js               # clsx + tailwind-merge utility
│   ├── App.jsx                  # Router + Layout + Lenis setup
│   ├── main.jsx                 # React 19 entry
│   └── index.css                # Tailwind directives + custom utilities
├── index.html                   # Google Fonts + Material Symbols + noise SVG
├── package.json
├── tailwind.config.js           # Theme: colors, fonts, border-radius
├── postcss.config.js
└── vite.config.js
```

---

## 4. Design System Tokens

### 4.1 Colors

From the Stitch project's Material Design 3 palette:

| Token | Hex | Usage |
|-------|-----|-------|
| primary | `#182a21` | Dark Moss — deep backgrounds, authoritative text |
| primary-container | `#2e4036` | Moss container — section backgrounds |
| secondary | `#a53c19` | Clay base — CTA hover states |
| secondary-container | `#cc5833` | Clay accent — buttons, highlights, labels |
| surface | `#fbf9f2` | Cream — default page background |
| surface-container | `#f0eee7` | Cream container — card backgrounds |
| surface-container-low | `#f6f4ec` | Light card sections |
| surface-container-high | `#eae8e1` | Input backgrounds |
| surface-container-highest | `#e4e2dc` | Focused input backgrounds |
| surface-container-lowest | `#ffffff` | White cards on cream |
| tertiary | `#262626` | Charcoal — hero sections, footer |
| tertiary-container | `#3c3c3c` | Dark card backgrounds |
| on-surface | `#1b1c18` | Body text on light backgrounds |
| on-primary | `#ffffff` | Text on dark backgrounds |
| outline-variant | `#c3c8c2` | Subtle borders (use at 10-20% opacity) |

### 4.2 Typography

| Role | Font Family | Weight | Usage |
|------|------------|--------|-------|
| Display | Cormorant Garamond (Italic) | 400-700 | Hero headlines, manifesto quotes, large numbers |
| Heading | Plus Jakarta Sans | 700-800 | Section titles, nav, buttons, card titles |
| Body | Outfit | 300-500 | Paragraphs, descriptions |
| Label/Data | IBM Plex Mono | 400-500 | Uppercase labels, timestamps, code, step numbers |

Tailwind config:
```js
fontFamily: {
  sans: ['"Plus Jakarta Sans"', 'Outfit', 'sans-serif'],
  drama: ['"Cormorant Garamond"', 'serif'],
  body: ['"Outfit"', 'sans-serif'],
  mono: ['"IBM Plex Mono"', 'monospace'],
}
```

### 4.3 Border Radius

- Buttons: `rounded-full` (pill shape)
- Cards: `rounded-[2rem]` to `rounded-[3rem]`
- Inputs: `rounded-[1.5rem]`
- Footer top: `rounded-t-[4rem]`
- **No sharp corners anywhere**

### 4.4 Shadows

- Ambient only: `shadow-[0_40px_60px_-15px_rgba(24,42,33,0.04)]`
- Never pure black shadows — tinted with Moss
- If clearly visible as a "drop shadow," it's too heavy

### 4.5 The "No-Line" Rule

No `1px solid` borders for sectioning. Boundaries defined through:
- Background color shifts (surface → surface-container)
- Spacing
- Subtle outline-variant at 10-20% opacity only where accessibility requires it

---

## 5. Responsive Strategy

### 5.1 Breakpoints

| Breakpoint | Width | Target |
|-----------|-------|--------|
| `sm` | 640px | Phone landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Small desktop |
| `xl` | 1280px | Desktop (design baseline) |

### 5.2 Responsive Patterns Per Component

**Navbar:**
- Desktop (md+): Centered pill with nav links + CTA
- Mobile (<md): Compact pill with logo + hamburger. Full-screen overlay menu on open with staggered link entrance animation. Semi-transparent backdrop.

**Hero Sections:**
- Desktop: Full typography scale (7xl-9xl drama font, 5xl headings)
- Tablet: Scaled down (5xl-7xl drama, 4xl headings), maintained padding
- Phone: Stacked layout, (4xl-5xl drama, 2xl-3xl headings), reduced padding (px-6)

**Grids:**
- Desktop: 3-4 columns as designed
- Tablet: 2 columns
- Phone: 1 column, full width

**Feature Sections (alternating image + text):**
- Desktop: `md:grid-cols-2` side by side
- Phone: Stack vertically, image first then text

**Horizontal Carousels (Connected Flow, filter pills):**
- Desktop: Full horizontal layout
- Tablet/Phone: Horizontally scrollable with `overflow-x-auto`, snap scrolling, no scrollbar

**Blog Post:**
- Desktop: Article + sticky TOC sidebar
- Tablet: Article full width, TOC hidden or collapsible
- Phone: Article only, no TOC

**Pricing Cards:**
- Desktop: 3-column grid, middle card elevated
- Tablet: 3-column maintained but tighter
- Phone: Vertical stack, highlighted card first

**Contact Page:**
- Desktop: 2-column (form + info cards)
- Phone: Stack vertically, form first

**Footer:**
- Desktop: Multi-column grid
- Tablet: 2-column grid
- Phone: Single column stack

### 5.3 Responsive Typography Scale

| Element | Phone | Tablet | Desktop |
|---------|-------|--------|---------|
| Drama display | text-4xl | text-6xl | text-7xl to text-9xl |
| Section heading | text-2xl | text-4xl | text-5xl |
| Card title | text-xl | text-xl | text-2xl |
| Body | text-base | text-base | text-lg |
| Label (mono) | text-[10px] | text-xs | text-xs |

### 5.4 Responsive Spacing

| Context | Phone | Tablet | Desktop |
|---------|-------|--------|---------|
| Section padding-x | px-5 | px-8 | px-12 to px-16 |
| Section padding-y | py-16 | py-20 | py-24 to py-32 |
| Card gap | gap-4 | gap-6 | gap-8 |
| Max content width | 100% | 100% | max-w-7xl centered |

### 5.5 Touch & Mobile Considerations

- Touch targets: minimum 44x44px for all interactive elements
- Hover effects gracefully degrade (no hover-dependent content)
- Horizontal scrollable areas show scroll hints (gradient fade at edges)
- Sticky stacking (Protocol section): simplified on mobile — standard scroll with fade-in instead of pin + blur effect
- GSAP animations: reduced motion for `prefers-reduced-motion` media query

---

## 6. Routes

| Path | Page Component | Stitch Screen |
|------|---------------|---------------|
| `/` | Home | Velocity + Control |
| `/features` | Features | Features |
| `/features/visual` | VisualFeatures | Visual Connected Features |
| `/pricing` | Pricing | Pricing |
| `/contact` | Contact | Contact |
| `/about` | About | About Us |
| `/blog` | BlogIndex | Blog Index |
| `/blog/predictive-maintenance` | BlogPost | Blog Post Template |
| `/customers` | Customers | Customers |
| `/integrations` | Integrations | Integrations |
| `/security` | Security | Security |
| `/careers` | Careers | Careers |

All routes wrapped by `<Layout>` providing Navbar, Footer, and NoiseOverlay.

---

## 7. Page Specifications

### 7.1 Home (`/`)

**Sections:**
1. **Hero** — 100dvh, background image with gradient overlay, content bottom-left. Two-line headline: sans bold line 1 + drama italic line 2 ("Rhythm.") in clay. CTA button. Bouncing scroll indicator.
2. **Features** — "How it works" heading. 3 interactive micro-UI cards (DiagnosticShuffler, TelemetryTypewriter, CursorScheduler) in glass-card containers.
3. **Philosophy** — Dark charcoal bg with parallax texture image. Two contrasting statements: neutral small text vs. drama italic large text with clay highlights. Word-by-word ScrollTrigger reveal.
4. **Protocol** — 3 sticky-stacking full-screen cards (Capture/Direct/Reflect). Each pinned with ScrollTrigger. Previous card blurs/scales/fades as next overlaps. Desktop only — mobile uses standard stacked sections with scroll reveal.
5. **CTA** — Cream bg, drama italic headline with clay accent, large moss CTA button.

**Responsive:** Hero text scales per 5.3. Feature cards stack vertically on phone. Protocol simplified on mobile.

### 7.2 Features (`/features`)

**Sections:**
1. **Hero** — Dark tertiary bg with blur orbs. Drama italic headline.
2. **Connected Flow** — Horizontal scrollable card carousel (7 steps: Inspection → Finding → Work Order → Assignment → Resolution → Dashboard). Cards linked by pulsing arrow icons. Snap scroll on mobile.
3. **Feature Sections** — 4 alternating image+text sections with monospace step numbers (01-04) and clay-colored labels. Grid reverses direction on alternate sections.

**Responsive:** Carousel horizontal scroll with snap on all sizes. Alternating sections stack on phone.

### 7.3 Pricing (`/pricing`)

**Sections:**
1. **Hero** — Light cream bg, drama italic "Pricing." headline.
2. **Pricing Grid** — 3 tiers (Starter $49/mo, Operations $149/mo, Enterprise Custom). Middle card: dark primary bg, scale-105, "MOST POPULAR" badge. Feature lists with check icons.
3. **FAQ** — Accordion using `<details>`/`<summary>`. 5 items. Chevron rotates on open.
4. **CTA** — Dark tertiary bg, "Still deciding?" with clay accent.

**Responsive:** Cards stack on phone with highlighted card first. FAQ full width on all sizes.

### 7.4 Contact (`/contact`)

**Sections:**
1. **Hero** — Light bg, drama italic "Get in touch."
2. **Content** — 2-column: Left = form (name, email, company, subject, message with IBM Plex Mono labels, surface-container-high inputs, no borders). Right = 3 info cards (Sales/Support/Partnerships with Material Symbols icons and email links).

**Responsive:** Stack vertically on phone, form first.

### 7.5 About (`/about`)

**Sections:**
1. **Hero** — Dark primary bg with secondary blur orb. Drama italic headline.
2. **Story** — 2-column: text left + image right with overlay "Internal Motto" note card. Image has grayscale filter → color on hover.
3. **Values** — 3 cards on dark bg with icons. Hover brightens background.
4. **By the Numbers** — 4-column metrics grid with large drama italic numbers in clay color.
5. **CTA** — Dark bg with grid pattern.

**Responsive:** Story stacks on phone. Numbers grid: 2-col on tablet, 2-col on phone.

### 7.6 Blog Index (`/blog`)

**Sections:**
1. **Hero** — INSIGHTS monospace label, drama italic headline, subtitle.
2. **Filter Pills** — Horizontal scrollable category filters (All, Strategy, Technology, etc.).
3. **Featured Post** — Large 50/50 card (image left, content right) with "FEATURED" badge.
4. **Recent Posts** — 3-column grid of post cards with image, category badge, title, excerpt, author avatar, read time.
5. **Newsletter** — Dark primary bg, email input + subscribe button.

**Responsive:** Featured post stacks on phone. Grid: 2-col tablet, 1-col phone.

### 7.7 Blog Post (`/blog/predictive-maintenance`)

**Sections:**
1. **Header** — Category badge, title, author/date metadata.
2. **Featured Image** — Full width, rounded.
3. **Content** — Article body (h2, p, blockquote, code block, inline image). Sticky TOC sidebar on desktop.
4. **Related Posts** — 3-column card grid.
5. **CTA Banner** — primary-container bg with blur orb decoration.

Content is hardcoded to match the Stitch template (predictive maintenance topic).

**Responsive:** TOC hidden on tablet/phone. Article full width. Related posts: 2-col tablet, 1-col phone.

### 7.8 Customers (`/customers`)

**Sections:**
1. **Hero** — Dark tertiary bg, drama italic "Teams that found their rhythm."
2. **Featured Story** — 50/50: image + testimonial blockquote with metrics.
3. **Customer Grid** — 4 cards (2x2), each with image, company, industry, quote excerpt.
4. **Industry Tags** — Horizontal pill badges with Material Symbols icons.
5. **CTA** — Dark primary bg.

**Responsive:** Featured story stacks on phone. Grid: 2-col tablet, 1-col phone.

### 7.9 Integrations (`/integrations`)

**Sections:**
1. **Hero** — Light bg, drama italic "Fits right into your workflow."
2. **Filter Pills** — Category filters (All, Communication, ERP, IoT, etc.).
3. **Integration Grid** — 3-column, 6 cards (Slack, SAP, IoT Hub, Okta, Teams, Drive). Each with icon, name, category, description, status badge.
4. **API Section** — Dark tertiary bg, 2-column: text + code block with syntax highlighting.
5. **CTA** — Light bg, "Don't see your tool?"

**Responsive:** Grid: 2-col tablet, 1-col phone. Code block full width with horizontal scroll.

### 7.10 Security (`/security`)

**Sections:**
1. **Hero** — Dark tertiary bg with blur orbs.
2. **Principles** — 3 cards (Tenant Isolation, Encryption, Access Control).
3. **Infrastructure** — Dark primary bg, 2-column: text list + nested diagram.
4. **Practices** — 4 expandable items with icons.
5. **CTA** — Light bg, "Questions about security?"

**Responsive:** Principle cards: 1-col on phone. Infrastructure stacks, diagram below text.

### 7.11 Careers (`/careers`)

**Sections:**
1. **Hero** — Full-height bg image with gradient overlay from primary.
2. **Why Veltro** — 2-column headline + 3 value cards.
3. **Open Positions** — 4 job cards with role, category badge, location, "View role" link.
4. **CTA** — Dark tertiary bg.

**Responsive:** Value cards: 1-col on phone. Job cards full width stacked.

### 7.12 Visual Features (`/features/visual`)

**Sections:**
1. **Hero** — Dark bg with blur orbs.
2. **Connected Flow Carousel** — 6 cards (Inspection → Dashboard) with pulsing arrows. Horizontal scroll with snap.
3. **Feature Sections** — 3 alternating image+text sections (same pattern as Features page).

**Responsive:** Same as Features page.

---

## 8. Shared Components

### 8.1 Navbar
- Fixed centered pill (`rounded-full`)
- Transparent at top → `bg-surface/60 backdrop-blur-xl` on scroll (50px threshold)
- Desktop: Logo + nav links (Features, Pricing, About, Blog, Contact) + "Start Trial" CTA
- Mobile: Logo + hamburger → full-screen overlay with staggered GSAP entrance
- Active link: secondary color with border-b-2
- All links: `scale(1.03)` on hover

### 8.2 Footer
- `bg-tertiary`, `rounded-t-[4rem]`
- Grid: Brand (2-col span) + Product + Company + Resources + Legal
- System status: pulsing orange/green dot + "Operational Pulse" monospace label
- Copyright + legal links
- Responsive: 2-col on tablet, 1-col on phone

### 8.3 NoiseOverlay
- Fixed SVG with `feTurbulence` (baseFrequency 0.80, numOctaves 4)
- `opacity-[0.05]`, `mix-blend-soft-light`
- `pointer-events-none`, z-50

### 8.4 MagneticButton
- Variants: clay (primary CTA), moss, outline
- `rounded-full`, `overflow-hidden`
- Hover: `scale(1.03)` + sliding background layer from bottom
- Touch: active state with slight scale down

### 8.5 ScrollReveal
- GSAP wrapper: `y: 40, opacity: 0, duration: 0.8`
- ScrollTrigger: `start: "top 75%"`
- Configurable: delay, stagger, direction
- Respects `prefers-reduced-motion`

---

## 9. Animation System

### 9.1 GSAP Patterns
- All animations wrapped in `gsap.context()` with `ctx.revert()` cleanup
- Default easing: `power3.out` (entrances), `power2.inOut` (morphs)
- Stagger: 0.08 for text, 0.15 for cards/containers

### 9.2 Lenis Integration
```js
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### 9.3 Reduced Motion
All GSAP animations check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip/simplify when enabled.

### 9.4 Scroll to Top
React Router navigation triggers `window.scrollTo(0, 0)` on route change via a `ScrollToTop` component.

---

## 10. Exclusions

- No backend/API connections — forms are visual only
- No MDX pipeline — blog post content is hardcoded
- No auth/Supabase
- No analytics
- No SSR/SSG — client-side SPA only
- No dark mode toggle — fixed light theme with dark sections as designed

---

## 11. Success Criteria

1. All 12 Stitch screens faithfully reproduced as navigable routes
2. Professional, clean appearance on phone (375px+), tablet (768px+), and desktop (1280px+)
3. Smooth GSAP animations and Lenis scrolling
4. Cinematic design system consistently applied (no sharp corners, no line borders, proper font hierarchy)
5. Site runs via `npm run dev` with no errors
6. Deployable to Netlify via `npm run build`
