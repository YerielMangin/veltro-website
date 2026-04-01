# Google Stitch Prompts — Veltro Website Pages

> Each prompt below is self-contained. Copy-paste into Google Stitch to generate the page.
> All prompts share the same Design System Preamble — paste it once at the start of your session, then use the individual page prompts.

---

## DESIGN SYSTEM PREAMBLE (paste this first in every Stitch session)

```
You are building pages for Veltro (getveltro.com) — a modern operations platform for teams that manage physical infrastructure. The brand positioning is "Velocity + Control." Veltro is NOT maintenance software — it's an operational OS.

BRAND VOICE:
- Lead with WHY, never with WHAT. Never open with "Veltro is a CMMS that..."
- Use "operations" not "maintenance." Use "trial" never "free."
- Tone: Notion/Linear clean. Short sentences. Confident, not loud. No exclamation marks. No "revolutionary" or "game-changing."
- Exclusivity over universality: "Built for teams who demand consistency" > "For businesses of all sizes."
- Show connected systems, not feature lists. Example: "An inspection finds a problem → a work order is created → a technician resolves it → the dashboard reflects it. No one had to chase anyone."

COLOR PALETTE (Organic Tech):
- Moss: #2E4036 (primary dark green — backgrounds, text)
- Clay: #CC5833 (accent terracotta — CTAs, highlights, labels)
- Cream: #F2F0E9 (light background — cards, sections)
- Charcoal: #1A1A1A (deep dark — hero, footer, dark sections)
- White: #FFFFFF (card surfaces, contrast)

TYPOGRAPHY:
- Headings: Plus Jakarta Sans (bold, tight tracking)
- Display/Drama: Cormorant Garamond Italic (massive serif — hero headlines, manifesto quotes)
- Body: Outfit (clean sans-serif)
- Data/Labels: IBM Plex Mono (monospace — step numbers, status indicators, stats)

VISUAL TEXTURE:
- Global noise overlay via SVG feTurbulence at 0.05 opacity — eliminates flat digital feeling
- Rounded corners: rounded-[2rem] to rounded-[3rem] on ALL containers. No sharp corners anywhere.
- Magnetic buttons: scale(1.03) on hover with cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Buttons have overflow-hidden with a sliding background <span> layer for color transitions

PHOTOGRAPHY GUIDELINES:
- Use bright, warm, well-lit scenes. Clean, professional compositions. Both indoor and outdoor.
- Convey productivity, positivity, and empowerment.
- AVOID: dark/moody/nighttime imagery, cloudy/overcast scenes, chaotic compositions, single-context photos.

LAYOUT RULES:
- Sections alternate between Cream and Charcoal/Moss backgrounds
- Cards always have subtle borders, rounded-[2rem], soft shadows
- Generous whitespace — let content breathe
- Mobile-first responsive. Stack cards vertically on mobile.

NAVBAR (consistent across all pages):
- Fixed pill-shaped container, horizontally centered
- Transparent with light text at top. Morphs to bg-cream/60 backdrop-blur-xl with Moss text on scroll.
- Contains: "Veltro" logo text (Plus Jakarta Sans bold), nav links (Features, Pricing, Use Cases, Blog), CTA button "Start Trial" (Clay background)

FOOTER (consistent across all pages):
- Charcoal background, rounded-t-[4rem]
- Grid: Brand name + "Velocity + Control" tagline, navigation columns (Product, Company, Resources, Legal), social links
- "System Operational" status indicator with pulsing green dot and IBM Plex Mono label
- Bottom: © 2026 Veltro. All rights reserved.
```

---

## PAGE 1: HOME (Landing Page)

```
Create the Veltro homepage — the primary landing page at getveltro.com.

Use the Design System Preamble provided. This page has 6 sections:

SECTION A — HERO ("The Opening Shot")
- Full viewport height (100dvh). Full-bleed background image of a bright, modern facility interior — clean industrial space with natural light, warm tones.
- Heavy Moss-to-black gradient overlay (bg-gradient-to-t) so text is readable.
- Content pushed to bottom-left third using flex + generous padding.
- Typography:
  Line 1 (Plus Jakarta Sans, bold, ~2rem): "Your operation has a"
  Line 2 (Cormorant Garamond Italic, ~8rem, Cream color): "Rhythm."
- Below headline, tagline in Outfit (~1.1rem, Cream/70% opacity): "The operations platform for teams who run on precision. Assets, work, inspections, compliance — one place, total clarity."
- CTA button: "Start Your 14-Day Trial" (Clay background, white text, magnetic hover effect)
- Subtle scroll indicator at bottom center — a ChevronDown icon that bounces gently.
- Entrance animation: staggered fade-up (y:40→0, opacity:0→1) for each text element, 0.08s stagger.

SECTION B — FEATURES ("Interactive Functional Artifacts")
- Cream background. Section heading: "How it works" (Plus Jakarta Sans, Moss color).
- 3 interactive cards in a horizontal row (stack vertically on mobile), each rounded-[2rem] with subtle border and shadow.

Card 1 — "Keep work moving"
A micro-UI showing 3 overlapping task cards that cycle vertically every 3s with spring-bounce animation. Cards labeled: "HVAC Unit #7 — Scheduled", "Roof Leak — Urgent", "Fire Panel — Complete". Shows work flowing through the system.

Card 2 — "One shared place"
A monospace live-text feed (IBM Plex Mono) that types out operational messages character by character: "Asset registered: Boiler Room #3...", "Inspection completed: Building A...", "Work order assigned: Maria T...". Blinking Clay-colored cursor. "Live Feed" label with pulsing green dot.

Card 3 — "Turn findings into action"
A weekly schedule grid (S M T W T F S) where an animated cursor enters, moves to Wednesday, clicks it (scale 0.95 press), activates it with Clay highlight, then moves to a "Schedule" button before fading. Label: "INSPECTION PROTOCOL".

Below each card: heading (Plus Jakarta Sans bold) + one-line description (Outfit).

SECTION C — PHILOSOPHY ("The Manifesto")
- Full-width section, Charcoal background.
- Faint parallax texture image behind text (organic moss/fern texture at 10% opacity).
- Two contrasting statements, centered:
  Line 1 (Outfit, ~1.5rem, white/60% opacity): "Most operations focus on: managing the chaos."
  Line 2 (Cormorant Garamond Italic, ~4rem, white, with "eliminating it" in Clay color): "We focus on: eliminating it."
- Text reveals word-by-word on scroll (each word fades from 10% to 100% opacity with 0.05s stagger).

SECTION D — PROTOCOL ("Sticky Stacking Archive")
- 3 full-screen cards that stack on scroll using sticky positioning.
- As a new card scrolls into view, the card underneath scales to 0.9, blurs to 20px, and fades to 50% opacity.

Card 1 (Cream background): Step "01" (IBM Plex Mono, Clay color). Title: "Capture" (Plus Jakarta Sans, 3rem). Description: "Every asset, every reading, every finding — logged once, visible everywhere. Your operation stops living in spreadsheets and group chats." Animated SVG: slowly rotating concentric circles in Moss color.

Card 2 (Moss background, white text): Step "02". Title: "Direct". Description: "Work orders flow to the right person at the right time. Inspections trigger actions. Incidents create corrective workflows. Nothing falls through." Animated SVG: horizontal scanning laser-line moving across a grid of dots.

Card 3 (Charcoal background, Cream text): Step "03". Title: "Reflect". Description: "Dashboards that show what happened, what's coming, and where to improve. Every cycle makes your operation sharper." Animated SVG: pulsing EKG-style waveform using stroke-dashoffset animation.

SECTION E — CTA ("The Closer")
- Cream background. Centered text.
- Heading (Plus Jakarta Sans, ~2rem, Moss): "Veltro isn't for everyone."
- Sub-heading (Outfit, ~1.2rem, Moss/70%): "It's for the teams who understand that speed is a byproduct of precision."
- CTA button: "Start Your 14-Day Trial" (Clay background, large, magnetic hover)
- Below button (IBM Plex Mono, small, uppercase, Moss/50%): "NO CREDIT CARD REQUIRED · SETUP IN < 2 MINS"

SECTION F — FOOTER
- Use the standard footer from the Design System Preamble.
```

---

## PAGE 2: FEATURES

```
Create the Veltro Features page — a detailed breakdown of what the platform does.

Use the Design System Preamble provided.

HERO SECTION:
- Half-height hero (50vh), Charcoal background.
- Centered text:
  Line 1 (Plus Jakarta Sans, bold, ~1.5rem, Cream/60%): "What's inside"
  Line 2 (Cormorant Garamond Italic, ~5rem, Cream): "Everything connects."
- Subtitle (Outfit, ~1.1rem, Cream/50%): "25 modules. One operational picture. Here's how the pieces fit together."

SECTION: THE CONNECTED FLOW
- Cream background. Full-width horizontal flow diagram showing:
  "Inspection → Finding → Work Order → Assignment → Resolution → Dashboard"
- Each step is a rounded-[2rem] card connected by Clay-colored arrows.
- Each card has an icon (Lucide-style), step name, and one-line description.
- On scroll, cards animate in left-to-right with stagger.
- Below the flow: "This is why Veltro feels different. Every signal is connected." (Outfit, centered, Moss/70%)

SECTION: MODULE GROUPS (4 groups, alternating Cream/White backgrounds)

Group 1 — "Work Management"
Left: illustration or screenshot mockup of a work order dashboard.
Right: text block.
- Heading: "Keep work moving" (Plus Jakarta Sans, Moss)
- Modules listed with Clay dot bullets: Work Orders, Preventive Maintenance, Task Scheduling, Team Assignment
- Body: "Create, assign, and track work from request to completion. Scheduled maintenance runs on autopilot. Urgent work gets routed instantly."

Group 2 — "Asset Intelligence"
Right: illustration of an asset detail view.
Left: text block.
- Heading: "Know every asset" (Plus Jakarta Sans, Moss)
- Modules: Asset Registry, Location Hierarchy, Parts & Inventory, Meter Readings
- Body: "Every piece of equipment has a history — maintenance records, costs, downtime, parts consumed. One tap to see the full picture."

Group 3 — "Safety & Compliance"
Left: illustration of an inspection checklist.
Right: text block.
- Heading: "Prevent, don't react"
- Modules: Inspections, Incidents, Corrective Actions, Compliance Tracking, Safety Observations
- Body: "Run inspections on schedule. When findings appear, corrective actions generate automatically. Incidents trigger workflows, not emails."

Group 4 — "Visibility & Analytics"
Right: illustration of a dashboard with charts.
Left: text block.
- Heading: "See the whole operation"
- Modules: Dashboards, Reports, Audit Logs, API Access
- Body: "Real-time dashboards for every KPI that matters. Exportable reports. Full audit trail. API for integrating with your existing systems."

SECTION: CTA
- Moss background. White text, centered.
- "Ready to see how it connects?" (Plus Jakarta Sans, 2rem)
- CTA: "Start Your 14-Day Trial" (Clay button)
- Sub-text: "NO CREDIT CARD REQUIRED" (IBM Plex Mono, small)

FOOTER: Standard.
```

---

## PAGE 3: PRICING

```
Create the Veltro Pricing page — a clean 3-tier pricing grid.

Use the Design System Preamble provided.

HERO SECTION:
- Half-height (40vh), Cream background.
- Centered:
  Line 1 (Plus Jakarta Sans, ~1.5rem, Moss/60%): "Simple, transparent"
  Line 2 (Cormorant Garamond Italic, ~5rem, Moss): "Pricing."
- Subtitle: "Start where you are. Scale as you grow. No surprises." (Outfit, Moss/50%)

SECTION: PRICING TIERS
- 3 cards in a horizontal row (stack on mobile), centered on page.
- All cards: rounded-[2rem], subtle border, generous padding.

Card 1 — STARTER (White background)
- Label: "STARTER" (IBM Plex Mono, small, uppercase, Moss/50%)
- For: "Small teams getting organized"
- Tagline: "Get your team on the same page" (Cormorant Garamond Italic, ~1.5rem)
- Includes (bullet list with check icons):
  · Work Orders
  · Assets & Locations
  · 1 site
  · Up to 5 users
  · Email support
- CTA: "Start Trial" (Moss outline button)

Card 2 — OPERATIONS (Moss background, white text — HIGHLIGHTED)
- Slightly larger scale or elevated with a ring/glow.
- Popular badge: "MOST POPULAR" (Clay background, small pill)
- Label: "OPERATIONS"
- For: "Growing operations that need full visibility"
- Tagline: "See everything. Control everything." (Cormorant Garamond Italic)
- Includes:
  · Everything in Starter
  · Inspections & Findings
  · Incidents & Corrective Actions
  · Inventory & Parts
  · PM Schedules
  · Dashboards & Analytics
  · Unlimited users
  · Priority support
- CTA: "Start Trial" (Clay background button, white text)

Card 3 — ENTERPRISE (White background)
- Label: "ENTERPRISE"
- For: "Multi-site orgs with compliance needs"
- Tagline: "Scale with confidence" (Cormorant Garamond Italic)
- Includes:
  · Everything in Operations
  · Multi-site management
  · API access
  · Audit logs & compliance
  · SSO / SAML
  · Dedicated account manager
  · Custom integrations
- CTA: "Talk to Us" (Moss outline button)

Below the cards, centered: "All plans include a 14-day trial. No credit card required." (IBM Plex Mono, small, Moss/50%)

SECTION: FAQ
- Cream background. Heading: "Common questions" (Plus Jakarta Sans, Moss)
- Accordion-style FAQ items (rounded-[1.5rem] borders, expand/collapse):
  1. "Can I switch plans later?" → "Yes. Upgrade or downgrade anytime. Changes take effect on your next billing cycle."
  2. "What happens after my trial?" → "You choose a plan or your account pauses. No surprise charges. Your data stays safe for 30 days."
  3. "Do you offer discounts for annual billing?" → "Yes. Annual plans save 20% compared to monthly."
  4. "Is my data secure?" → "Absolutely. Row-level security, encrypted at rest and in transit, SOC 2 compliance in progress."
  5. "Can I import data from my current system?" → "Yes. We offer CSV import and a dedicated onboarding specialist for Operations and Enterprise plans."

SECTION: CTA
- Charcoal background. Cream text, centered.
- "Still deciding?" (Plus Jakarta Sans, ~2rem)
- "Start your trial and explore at your own pace." (Outfit, Cream/60%)
- CTA: "Start Your 14-Day Trial" (Clay button)

FOOTER: Standard.
```

---

## PAGE 4: USE CASES (Template — generate one per industry)

```
Create a Veltro Use Cases page template. This template is used for 5 industry pages:
- /use-cases/facility-management
- /use-cases/manufacturing
- /use-cases/healthcare
- /use-cases/education
- /use-cases/property-management

Use the Design System Preamble provided.

For each use case, replace the [PLACEHOLDERS] below with industry-specific content.

HERO SECTION:
- Half-height (50vh), full-bleed background image of [INDUSTRY SETTING — bright, professional, warm-lit].
- Heavy gradient overlay (Charcoal to transparent, bottom to top).
- Bottom-left aligned:
  Label (IBM Plex Mono, small, Clay): "[INDUSTRY] OPERATIONS"
  Heading (Cormorant Garamond Italic, ~4rem, Cream): "[INDUSTRY-SPECIFIC RHYTHM LINE]"
  Subtitle (Outfit, Cream/60%): "[ONE SENTENCE — how Veltro helps this industry specifically]"

SECTION: THE PAIN (Cream background)
- Heading: "Sound familiar?" (Plus Jakarta Sans, Moss)
- 3 pain-point cards in a row (rounded-[2rem], subtle Moss border):
  Card 1: [PAIN POINT 1 — specific to this industry]
  Card 2: [PAIN POINT 2]
  Card 3: [PAIN POINT 3]
- Each card: icon + heading + 2-line description. Tone: empathetic, not dramatic.

SECTION: THE SHIFT (Moss background, white text)
- Full-width. Centered.
- "From [OLD WAY] to [VELTRO WAY]" — two-column before/after comparison.
- Left column (faded, struck-through or lower opacity): The old way (3-4 bullet points)
- Right column (bright, Clay accents): The Veltro way (3-4 bullet points)
- Connected by an arrow or transition element.

SECTION: KEY MODULES FOR [INDUSTRY] (Cream background)
- Heading: "Built for how [INDUSTRY ROLE] actually works"
- 4 module highlight cards (horizontal, rounded, icons):
  Each card: Module name, one-line benefit specific to this industry.
  Example for Healthcare: "Inspections → Ensure compliance with JCAHO rounds."

SECTION: TESTIMONIAL (optional — Charcoal background)
- Large quote in Cormorant Garamond Italic, Cream.
- Attribution: Name, Title, Company (IBM Plex Mono)
- If no real testimonial, use: "See what teams like yours are achieving →" with a link to /customers.

SECTION: CTA
- Cream background, centered.
- "[INDUSTRY-SPECIFIC CTA HEADLINE]"
- CTA: "Start Your 14-Day Trial" (Clay button)

FOOTER: Standard.

---

INDUSTRY-SPECIFIC CONTENT:

**Facility Management:**
- Hero image: Modern office building lobby, bright natural light
- Rhythm line: "Every building has a pulse."
- Subtitle: "Veltro gives facility teams total visibility across sites, assets, and compliance — from one dashboard."
- Pains: "Work requests lost in email", "Deferred maintenance piling up", "Audit prep takes weeks"
- Modules: Work Orders, Asset Registry, Inspections, Dashboards

**Manufacturing:**
- Hero image: Clean modern factory floor, well-lit equipment
- Rhythm line: "Production never stops. Neither should your visibility."
- Subtitle: "Veltro connects equipment health, preventive maintenance, and production readiness in one platform."
- Pains: "Unplanned downtime killing throughput", "PM schedules on whiteboards", "No asset history when things break"
- Modules: Preventive Maintenance, Meter Readings, Parts & Inventory, Analytics

**Healthcare:**
- Hero image: Modern hospital corridor, clean and bright
- Rhythm line: "Patient safety starts with operational precision."
- Subtitle: "Veltro helps healthcare facilities stay inspection-ready, track every asset, and close compliance gaps before they become findings."
- Pains: "JCAHO prep is a fire drill", "Equipment locations unknown", "Paper inspection binders"
- Modules: Inspections, Corrective Actions, Compliance Tracking, Asset Registry

**Education:**
- Hero image: Modern school campus, sunny day, clean buildings
- Rhythm line: "Safe campuses run on systems, not heroics."
- Subtitle: "Veltro gives school operations teams a single place to manage facilities, track work, and stay compliant across every campus."
- Pains: "Teachers submit requests that disappear", "Deferred maintenance across 12 campuses", "Safety inspections on clipboards"
- Modules: Work Orders, Multi-site Locations, Inspections, Dashboards

**Property Management:**
- Hero image: Modern apartment building exterior, warm evening light
- Rhythm line: "Every property tells you what it needs. Are you listening?"
- Subtitle: "Veltro connects tenant requests, preventive maintenance, and asset tracking across your entire portfolio."
- Pains: "Tenant complaints tracked in spreadsheets", "No visibility across properties", "Reactive maintenance eating margins"
- Modules: Work Orders, Location Hierarchy, Preventive Maintenance, Reports
```

---

## PAGE 5: ABOUT

```
Create the Veltro About page — the company story.

Use the Design System Preamble provided.

HERO SECTION:
- Half-height (50vh), Moss background.
- Centered:
  Line 1 (Plus Jakarta Sans, ~1.5rem, Cream/60%): "About Veltro"
  Line 2 (Cormorant Garamond Italic, ~5rem, Cream): "Built for the people who keep everything running."

SECTION: THE STORY (Cream background)
- Two-column layout (text left, image right on desktop; stacked on mobile).
- Left:
  Heading: "Why we built Veltro" (Plus Jakarta Sans, Moss)
  Body (Outfit, Moss/80%, ~1.1rem, generous line-height):
  "Operations teams — the people who maintain buildings, manage equipment, run inspections, and keep facilities safe — are the most underserved professionals in business software.

  Sales teams have Salesforce. Engineering teams have Jira. Marketing has HubSpot. But the people who physically keep organizations running? They get spreadsheets, group chats, and systems built in the '90s.

  Veltro exists to change that. We built a modern operations platform that gives these teams the clarity, consistency, and speed they deserve. Not by adding complexity — by removing it.

  One place for every asset, every work order, every inspection, every incident. Connected workflows that turn findings into actions automatically. Dashboards that show what matters."
- Right: Warm, professional photo — team in a bright modern office, or a facilities manager using a tablet in a clean space.

SECTION: VALUES (Charcoal background, Cream text)
- Heading: "What we believe" (Plus Jakarta Sans, centered)
- 3 value cards in a row (rounded-[2rem], Charcoal lighter shade bg, subtle border):

Card 1: "Clarity over features"
"We'd rather build one thing that works perfectly than ten things that sort of work. Every module earns its place."

Card 2: "Speed is earned"
"Velocity comes from consistency and clarity — not from working harder. We build tools that create the conditions for speed."

Card 3: "Operations deserves better"
"The people who keep everything running shouldn't have to fight their software. We build for them first."

SECTION: BY THE NUMBERS (Cream background)
- 4 stat blocks in a horizontal row, centered:
  "25" (large, Clay) — "Modules" (IBM Plex Mono, small)
  "∞" (large, Clay) — "Users on Operations plan" (IBM Plex Mono)
  "< 2 min" (large, Clay) — "Setup time" (IBM Plex Mono)
  "14 days" (large, Clay) — "Trial, no card required" (IBM Plex Mono)

CTA SECTION:
- Moss background, Cream text, centered.
- "Want to see what we're building?"
- CTA: "Start Your 14-Day Trial" (Clay button)

FOOTER: Standard.
```

---

## PAGE 6: CONTACT

```
Create the Veltro Contact page.

Use the Design System Preamble provided.

HERO SECTION:
- Short hero (30vh), Cream background.
- Centered:
  Line 1 (Plus Jakarta Sans, ~1.5rem, Moss/60%): "Get in touch"
  Line 2 (Cormorant Garamond Italic, ~4rem, Moss): "We'd love to hear from you."

SECTION: CONTACT FORM + INFO (Cream background)
- Two-column layout.
- Left column: Contact form (rounded-[2rem] card, white background, subtle shadow):
  Fields: Name (text), Email (email), Company (text), Subject (dropdown: General Inquiry, Sales, Support, Partnership), Message (textarea)
  Submit button: "Send Message" (Clay background, magnetic hover)
  Below: "We typically respond within 24 hours." (IBM Plex Mono, small, Moss/40%)

- Right column: Contact info cards (stacked vertically):
  Card 1: "Sales" — "Interested in Veltro for your team? Let's talk." — sales@getveltro.com
  Card 2: "Support" — "Already a customer? We're here to help." — support@getveltro.com
  Card 3: "Partnerships" — "Want to integrate or resell? Let's explore." — partners@getveltro.com

FOOTER: Standard.
```

---

## PAGE 7: DEMO (Trial Signup)

```
Create the Veltro Demo/Trial page — this is the conversion page.

Use the Design System Preamble provided.

LAYOUT: Split-screen (50/50 on desktop, stacked on mobile).

LEFT HALF (Moss background, Cream text):
- Padding: generous (4rem+).
- Heading (Cormorant Garamond Italic, ~3.5rem): "See the rhythm for yourself."
- Body (Outfit, Cream/70%): "Start your 14-day trial. No credit card. No sales calls. Just your operation, organized."
- Below, 3 trust bullets with checkmark icons (Clay color):
  · "Full access to all modules"
  · "Your data, your workspace — private from day one"
  · "Setup in under 2 minutes"
- At bottom, small logos or text: "Trusted by operations teams in education, healthcare, manufacturing, and property management."

RIGHT HALF (White background):
- Centered signup form (rounded-[2rem] card, subtle shadow if on white):
  Fields: Full Name, Work Email, Company Name, Team Size (dropdown: 1-5, 6-20, 21-50, 50+), Password
  Submit: "Start Your Trial" (Clay button, full-width, magnetic hover)
  Below button: "By signing up you agree to our Terms and Privacy Policy." (small, linked)
  Divider: "or"
  "Sign up with Google" button (outline, Moss border)

FOOTER: Minimal — just copyright + legal links. No full footer on conversion pages.
```

---

## PAGE 8: BLOG (Index)

```
Create the Veltro Blog index page.

Use the Design System Preamble provided.

HERO SECTION:
- Short (30vh), Cream background.
- Centered:
  Line 1 (IBM Plex Mono, small, Clay): "INSIGHTS"
  Line 2 (Cormorant Garamond Italic, ~4rem, Moss): "The Veltro Blog"
  Subtitle (Outfit, Moss/50%): "Perspectives on operations, maintenance strategy, and building software that works."

SECTION: FEATURED POST (Cream background)
- Full-width card (rounded-[2rem], subtle border). Two columns:
  Left: Large image (warm, relevant to the post topic).
  Right: Category tag (IBM Plex Mono, small, Clay pill), Title (Plus Jakarta Sans, ~2rem, Moss), Excerpt (Outfit, 2-3 lines), Author + Date (IBM Plex Mono, small, Moss/40%), "Read more →" link (Clay).

SECTION: RECENT POSTS (White background)
- 3-column grid of post cards (stack on mobile). Each card:
  - Image (top, rounded-t-[2rem])
  - Category tag (IBM Plex Mono, small pill)
  - Title (Plus Jakarta Sans, ~1.3rem, Moss)
  - Excerpt (Outfit, 2 lines, Moss/60%)
  - Author + Date (IBM Plex Mono, small)
- "Load more" button at bottom (Moss outline)

SECTION: CATEGORIES (Cream background)
- Horizontal scrolling pill-shaped filter buttons:
  All, Operations, Maintenance Strategy, Product Updates, Industry Insights, Best Practices
- Each pill: rounded-full, Moss outline (active: Moss filled, Cream text)

FOOTER: Standard.
```

---

## PAGE 9: BLOG POST (Single)

```
Create the Veltro Blog Post template page.

Use the Design System Preamble provided.

HEADER:
- Cream background. Centered, max-width 720px (readable column).
- Category (IBM Plex Mono, Clay pill)
- Title (Plus Jakarta Sans, ~2.5rem, Moss)
- Meta line (IBM Plex Mono, small, Moss/40%): "Author Name · March 22, 2026 · 8 min read"
- Featured image: full-width within content column, rounded-[2rem]

ARTICLE BODY:
- Max-width 720px, centered. Cream background.
- Typography: Outfit for body, Plus Jakarta Sans for h2/h3, IBM Plex Mono for code blocks.
- Blockquotes: left Clay border, Cormorant Garamond Italic, Cream background card.
- Images: full-width within column, rounded-[1.5rem], subtle shadow.
- Code blocks: Charcoal background, IBM Plex Mono, rounded-[1rem].

SIDEBAR (sticky, right side on wide screens, hidden on mobile):
- Table of contents with scroll-spy highlighting
- Share buttons (minimal icons)

BOTTOM:
- Divider line
- "Related posts" — 3-card horizontal row (same style as blog index cards)
- CTA banner: "Want to see Veltro in action?" → "Start Your 14-Day Trial" (Clay button)

FOOTER: Standard.
```

---

## PAGE 10: CUSTOMERS (Case Studies)

```
Create the Veltro Customers page.

Use the Design System Preamble provided.

HERO SECTION:
- Half-height (40vh), Charcoal background.
- Centered:
  Line 1 (IBM Plex Mono, small, Clay): "CUSTOMER STORIES"
  Line 2 (Cormorant Garamond Italic, ~4rem, Cream): "Teams that found their rhythm."
  Subtitle (Outfit, Cream/50%): "See how operations teams across industries use Veltro to gain clarity and velocity."

SECTION: FEATURED STORY (Cream background)
- Large two-column card (rounded-[2rem]):
  Left: Photo of the team/facility (bright, professional).
  Right: Quote in Cormorant Garamond Italic (~1.5rem), Attribution (name, title, company in IBM Plex Mono), Key metric in Clay ("40% reduction in reactive work orders"), "Read the full story →" (Clay link).

SECTION: ALL STORIES (White background)
- 2-column grid of case study cards:
  Each card (rounded-[2rem], subtle border):
  - Company logo or icon
  - Company name + industry tag (IBM Plex Mono, Clay pill)
  - One-line result: "Reduced inspection prep time from 3 weeks to 2 days"
  - "Read story →" (Clay link)

SECTION: INDUSTRIES WE SERVE (Cream background)
- Horizontal row of industry icons/labels:
  Facility Management, Manufacturing, Healthcare, Education, Property Management
- Each is a rounded pill linking to the relevant /use-cases/ page.

CTA SECTION:
- Moss background, Cream text.
- "Your team could be next."
- CTA: "Start Your 14-Day Trial" (Clay button)

FOOTER: Standard.
```

---

## PAGE 11: INTEGRATIONS

```
Create the Veltro Integrations page.

Use the Design System Preamble provided.

HERO SECTION:
- Short (40vh), Cream background.
- Centered:
  Line 1 (IBM Plex Mono, small, Clay): "INTEGRATIONS"
  Line 2 (Cormorant Garamond Italic, ~4rem, Moss): "Fits right into your workflow."
  Subtitle: "Veltro connects to the tools your team already uses." (Outfit, Moss/50%)

SECTION: INTEGRATION CATEGORIES (Cream background)
- Filter pills at top: All, Communication, ERP, IoT, Storage, Identity
- 3-column grid of integration cards (rounded-[2rem], white bg, subtle border):
  Each card:
  - Integration logo/icon (centered, 48px)
  - Name (Plus Jakarta Sans, bold)
  - Category pill (IBM Plex Mono, small)
  - One-line: "Sync work orders with Slack notifications"
  - Status badge: "Available" (green) or "Coming Soon" (Moss/40%)

Example integrations:
- Slack (Communication) — "Get notified when work orders are created or completed"
- Microsoft Teams (Communication) — "Push updates to your ops channel"
- SAP (ERP) — "Sync asset data bidirectionally" — Coming Soon
- Google Workspace (Storage) — "Attach inspection photos from Drive"
- Okta (Identity) — "SSO for Enterprise plans"
- IoT Sensors (IoT) — "Auto-create work orders from sensor thresholds" — Coming Soon

SECTION: API (Charcoal background, Cream text)
- Heading: "Build your own" (Plus Jakarta Sans, ~2rem)
- Body: "Veltro's REST API covers 9 core entities. Authenticate with API keys, paginate with cursors, filter with standard query params."
- Code snippet card (IBM Plex Mono, dark bg with syntax highlighting):
  ```
  GET /api/v1/work-orders?status=open&sort=-createdAt
  Authorization: Bearer vk_live_xxxxxxxxxxxx
  ```
- Link: "View API Documentation →" (Clay)

CTA SECTION:
- Cream background, centered.
- "Don't see your tool? Let us know."
- CTA: "Contact Us" (Moss button) + "Start Trial" (Clay button)

FOOTER: Standard.
```

---

## PAGE 12: SECURITY

```
Create the Veltro Security page.

Use the Design System Preamble provided.

HERO SECTION:
- Half-height (40vh), Charcoal background.
- Centered:
  Line 1 (IBM Plex Mono, small, Clay): "SECURITY"
  Line 2 (Cormorant Garamond Italic, ~4rem, Cream): "Your data is not our data."
  Subtitle: "How Veltro protects your operation." (Outfit, Cream/50%)

SECTION: SECURITY PRINCIPLES (Cream background)
- 3 cards in a row (rounded-[2rem], white bg):

Card 1: "Tenant Isolation"
Icon: Shield. "Every organization's data is completely isolated. Row-level security policies enforce separation at the database level. No shared tables, no data leakage."

Card 2: "Encryption Everywhere"
Icon: Lock. "Data encrypted at rest (AES-256) and in transit (TLS 1.3). API keys use minimum 16-character prefixes. Secrets never touch client code."

Card 3: "Access Control"
Icon: Key. "Role-based permissions. SSO/SAML for Enterprise. Every API call authenticated. Every action logged in the audit trail."

SECTION: INFRASTRUCTURE (Moss background, white text)
- Two-column layout:
  Left: Heading "Built on trusted infrastructure" + bullet list:
  · Hosted on Supabase (Postgres + Edge Functions)
  · Deployed via Vercel with security headers (CSP, HSTS, X-Frame-Options)
  · Database backups every 24 hours with point-in-time recovery
  · SOC 2 Type II compliance in progress
  Right: Minimal infrastructure diagram showing: Client → CDN → Edge Functions → Postgres (RLS) with a shield icon overlay.

SECTION: PRACTICES (Cream background)
- Heading: "How we work" (Plus Jakarta Sans, Moss)
- Vertical list of practices, each with an icon:
  · "No wildcard CORS — origin allowlist only"
  · "Webhook secrets verified on every database event"
  · "Error messages never reveal whether an email exists"
  · "Production logging sanitized — no PII in logs"
  · "Dependency scanning on every build"

CTA SECTION:
- "Questions about security?" → "Contact Us" (Moss button)

FOOTER: Standard.
```

---

## PAGE 13: CAREERS

```
Create the Veltro Careers page.

Use the Design System Preamble provided.

HERO SECTION:
- Half-height (50vh), warm professional team photo as background (bright, diverse, modern office).
- Gradient overlay (Moss to transparent).
- Bottom-left:
  Line 1 (Plus Jakarta Sans, ~1.5rem, Cream/60%): "Join the team"
  Line 2 (Cormorant Garamond Italic, ~4rem, Cream): "Build the tools that keep everything running."

SECTION: WHY VELTRO (Cream background)
- Heading: "Why work here" (Plus Jakarta Sans, Moss)
- 3 value cards (rounded-[2rem]):
  "Meaningful work" — "Operations teams are underserved. We're changing that. Your code will be used by the people who keep buildings safe and equipment running."
  "Small team, big ownership" — "No layers. You'll ship features that thousands of teams rely on. Direct impact, every sprint."
  "Remote-first, async-native" — "Work where you work best. We communicate through docs and PRs, not meetings."

SECTION: OPEN POSITIONS (White background)
- Heading: "Open roles" (Plus Jakarta Sans, Moss)
- List of job cards (rounded-[1.5rem], subtle border). Each card:
  - Role title (Plus Jakarta Sans, bold)
  - Department pill (IBM Plex Mono, Clay)
  - Location: "Remote" (IBM Plex Mono, Moss/50%)
  - "View role →" (Clay link)
- Example roles: Senior Frontend Engineer, Backend Engineer (Supabase/Postgres), Product Designer, Customer Success Lead
- If no open roles: "No open positions right now. But we're always interested in hearing from great people." + "Send us a note →" email link.

SECTION: CTA (Charcoal background, Cream text)
- "Don't see your role?"
- "We're always looking for people who care about building great software for underserved teams."
- CTA: "Say Hello" → mailto link (Clay button)

FOOTER: Standard.
```

---

## PAGE 14: CHANGELOG

```
Create the Veltro Changelog page.

Use the Design System Preamble provided.

HERO SECTION:
- Short (30vh), Cream background.
- Centered:
  Line 1 (IBM Plex Mono, small, Clay): "CHANGELOG"
  Line 2 (Cormorant Garamond Italic, ~4rem, Moss): "What's new."
  Subtitle: "Every improvement, every release." (Outfit, Moss/50%)

SECTION: CHANGELOG ENTRIES (Cream background, max-width 800px centered)
- Vertical timeline layout. Each entry:
  - Date (IBM Plex Mono, Clay, sticky on scroll)
  - Version badge (IBM Plex Mono, Moss pill): "v1.2.0"
  - Title (Plus Jakarta Sans, ~1.5rem, Moss): "Audit log triggers for 9 core entities"
  - Body (Outfit, Moss/70%): Description of changes.
  - Tags: "New" (Clay pill), "Improvement" (Moss pill), "Fix" (neutral pill)
  - Left timeline line connecting entries (Clay, 2px)

- Show 5-10 most recent entries.
- "Load older entries" button at bottom (Moss outline).

FOOTER: Standard.
```

---

## PAGE 15: PARTNERS

```
Create the Veltro Partners page.

Use the Design System Preamble provided.

HERO SECTION:
- Half-height (40vh), Moss background.
- Centered:
  Line 1 (IBM Plex Mono, small, Clay): "PARTNER PROGRAM"
  Line 2 (Cormorant Garamond Italic, ~4rem, Cream): "Grow with Veltro."
  Subtitle: "Resell, integrate, or refer. We make it easy to partner." (Outfit, Cream/50%)

SECTION: PARTNER TYPES (Cream background)
- 3 cards in a row (rounded-[2rem]):

Card 1: "Referral Partners"
"Know a team that needs Veltro? Refer them and earn a commission on every deal. No minimum commitment."

Card 2: "Integration Partners"
"Build on the Veltro API. Create integrations that your customers need. We'll feature you in our directory."

Card 3: "Reseller Partners"
"Offer Veltro as part of your services. White-label options available for agencies and consultants."

SECTION: HOW IT WORKS (White background)
- 3-step horizontal flow (rounded cards connected by arrows):
  Step 1 (IBM Plex Mono "01"): "Apply" — "Fill out a quick form. We review within 48 hours."
  Step 2 ("02"): "Onboard" — "Get access to partner resources, demo environments, and co-marketing materials."
  Step 3 ("03"): "Earn" — "Commissions on referrals. Revenue share on reselling. Visibility for integrations."

CTA SECTION:
- Charcoal background, Cream text.
- "Ready to partner?"
- CTA: "Apply Now" (Clay button)

FOOTER: Standard.
```

---

## PAGE 16: STATUS

```
Create the Veltro Status page — system uptime and operational status.

Use the Design System Preamble provided.

HERO SECTION:
- Short (25vh), Cream background.
- Centered:
  Large green circle (pulsing) + "All Systems Operational" (Plus Jakarta Sans, Moss, ~2rem)
  Subtitle (IBM Plex Mono, Moss/40%): "Last updated: March 22, 2026 at 14:30 UTC"

SECTION: SERVICE STATUS (Cream background, max-width 800px)
- Vertical list of services, each in a rounded-[1.5rem] card:
  - Service name (Plus Jakarta Sans, Moss) + status dot (green = operational, yellow = degraded, red = outage)
  - 90-day uptime bar (thin horizontal bar, green blocks for up, yellow/red for incidents)
  - Uptime percentage (IBM Plex Mono, right-aligned): "99.98%"
  Services: Web Application, API, Database, Edge Functions, File Storage, Authentication

SECTION: INCIDENT HISTORY (White background)
- Heading: "Recent incidents" (Plus Jakarta Sans, Moss)
- If no incidents: "No incidents in the last 90 days." (Outfit, Moss/50%, with a checkmark icon)
- Incident format (when applicable):
  - Date (IBM Plex Mono, Clay)
  - Title + severity badge
  - Timeline of updates (resolved → investigating → identified → monitoring → resolved)

SECTION: SUBSCRIBE
- "Get notified of incidents" — Email input + Subscribe button (Moss)

FOOTER: Standard.
```

---

## PAGES 17-19: LEGAL (Privacy, Terms, Cookies)

```
Create the Veltro legal pages — Privacy Policy, Terms of Service, and Cookie Policy.

Use the Design System Preamble provided. All three pages follow the same layout:

HERO SECTION:
- Short (25vh), Cream background.
- Centered:
  Title (Plus Jakarta Sans, ~2.5rem, Moss): "[Privacy Policy / Terms of Service / Cookie Policy]"
  Last updated (IBM Plex Mono, small, Moss/40%): "Last updated: March 22, 2026"

CONTENT SECTION (Cream background, max-width 800px centered):
- Clean typography: Outfit for body, Plus Jakarta Sans for h2/h3.
- Numbered sections with clear headings.
- Left sidebar (sticky on desktop): Table of contents with scroll-spy.
- Generous line-height (1.7) for readability.
- Key definitions or important clauses in a Cream-darker background card with rounded-[1rem].

FOOTER: Standard.

---

Content structure for PRIVACY POLICY:
1. Information We Collect
2. How We Use Your Information
3. Data Storage and Security
4. Multi-Tenant Data Isolation
5. Third-Party Services
6. Your Rights
7. Data Retention
8. Contact Us

Content structure for TERMS OF SERVICE:
1. Acceptance of Terms
2. Account Registration
3. Permitted Use
4. Subscription and Billing
5. Data Ownership
6. Service Availability
7. Limitation of Liability
8. Termination
9. Governing Law
10. Contact

Content structure for COOKIE POLICY:
1. What Are Cookies
2. How We Use Cookies
3. Types of Cookies (Essential, Analytics, Preferences)
4. Managing Cookies
5. Contact Us
```

---

## NOTES FOR ALL PAGES

**Consistency checklist before generating any page:**
- [ ] Navbar uses floating pill with "Veltro" text logo + Features, Pricing, Use Cases, Blog links + "Start Trial" CTA
- [ ] Colors strictly follow Moss/Clay/Cream/Charcoal palette
- [ ] All containers use rounded-[2rem]+ corners — NO sharp corners
- [ ] CTAs say "Start Your 14-Day Trial" or "Start Trial" — NEVER "Free"
- [ ] Footer has "System Operational" pulsing green dot
- [ ] Typography hierarchy: Plus Jakarta Sans (headings), Cormorant Garamond Italic (drama), Outfit (body), IBM Plex Mono (data)
- [ ] All photography is bright, warm, professional — never dark/moody
- [ ] Language says "operations" not "maintenance"
- [ ] Every page leads with WHY before WHAT
- [ ] Mobile-responsive: cards stack, fonts scale down, nav collapses
