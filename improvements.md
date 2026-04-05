# Site Improvements — corbinmeier.net

> Generated 2026-04-05 via orchestrator review. Target audience: small local Chico businesses getting started.

---

## What's Working

- **Hero** — Headline and subtitle are solid. Outcome-focused, local-specific, non-technical language.
- **Services** — Best section on the site. Every title is a customer outcome. Descriptions stay in plain language.
- **CTA** — "530" area code is a smart local trust signal. Positioning against "big agencies" is good.

---

## Critical Issues (Blockers)

- [ ] **Mobile navigation is completely broken** — `src/components/Header.tsx` + `src/styles/theme.ts` — mobile menu styles are both set to `"hidden"`. No hamburger menu. Mobile users cannot navigate beyond the homepage.
- [ ] **No sitemap or robots.txt** — Add `src/app/sitemap.ts` and `src/app/robots.ts`.
- [ ] **No Open Graph tags** — `src/app/layout.tsx` only has `title` and `description`. No OG image, no Twitter card. Shared links look blank.
- [ ] **No per-page metadata** — About, Portfolio, and Contact inherit the root title/description. Each needs its own.
- [ ] **No custom 404 page** — Add `src/app/not-found.tsx`.

---

## High Priority

- [ ] **EducationStrip kills homepage momentum** — Sits at position 2 (immediately after Hero) and shows a diploma. Move to About page or remove. (`src/app/page.tsx`)
- [ ] **No social proof anywhere** — No testimonials, client quotes, or reviews. Biggest trust gap for risk-averse local business owners.
- [ ] **No pricing signals** — No starting price, no package tiers, no "free consultation" mention. Reduces friction for non-technical clients.
- [ ] **No "How It Works" section** — A simple 3-step section ("We talk → I build → You launch") removes fear of the unknown.
- [ ] **Portfolio is written for developers, not clients** — `src/data/portfolio.json` mentions GraphQL, WebSockets, Docker-compose, Prisma, Fastify. Reframe as business outcomes or remove from homepage.

---

## Medium Priority

- [ ] **About page over-indexes on education history** — Two of four paragraphs are about the degree path. Lead with business relationship and outcomes, move credentials to the bottom. (`src/app/about/page.tsx`)
- [ ] **"College Associates" section hurts professional positioning** — One entry (Butte College, Alumni) makes the site feel like a student portfolio. Replace with client logos or remove. (`src/components/AssociatesGrid.tsx`)
- [ ] **Contact page is bare** — No response-time expectation, no phone number, no reassurance copy, generic off-theme button (`bg-blue-600`). (`src/app/contact/page.tsx`)
- [ ] **Footer is minimal** — No phone, no email, no location, no tagline. Duplicate diploma image. (`src/components/Footer.tsx`)
- [ ] **No LocalBusiness structured data** — Add JSON-LD with service area (Chico, CA), contact info, and service types for local search pack placement.

---

## Lower Priority / Ongoing

- [ ] Add a FAQ page (common non-technical client questions)
- [ ] Add analytics (no integration currently)
- [ ] Add a dedicated `/chico-web-design` landing page for local search
- [ ] Set up and link Google Business Profile
- [ ] Migrate `images.domains` → `images.remotePatterns` in `next.config.ts` (deprecated in Next.js 13+)
- [ ] Add blog/resources section for local SEO content marketing

---

## Prioritized Checklist

| Priority | Item | File(s) |
|---|---|---|
| Must Fix | Mobile navigation | `Header.tsx`, `theme.ts` |
| Must Fix | sitemap.ts + robots.ts | `src/app/` |
| Must Fix | Open Graph / social meta tags | `layout.tsx` |
| Must Fix | Per-page metadata | All page files |
| Must Fix | Custom 404 page | `src/app/not-found.tsx` |
| High | Remove EducationStrip from homepage | `page.tsx` |
| High | Add social proof / testimonials | New component |
| High | Add pricing signal or free consultation CTA | `CTA.tsx`, `contact/page.tsx` |
| High | Add "How It Works" section | New component |
| High | Rewrite portfolio for business audience | `portfolio.json` |
| Medium | Rewrite About page | `about/page.tsx` |
| Medium | Remove or replace "College Associates" | `AssociatesGrid.tsx` |
| Medium | Improve Contact page | `contact/page.tsx` |
| Medium | Improve Footer | `Footer.tsx` |
| Medium | LocalBusiness JSON-LD | `layout.tsx` or new component |
