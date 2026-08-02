# Project Notes: React + Vite (Edge-Native)

## Overview
The project is built on an **Edge-Native** architecture for simplicity and reliable deployment on Cloudflare Pages.

## Architecture
- **Framework:** React 19 + Vite 6
- **Routing:** React Router 7
- **Deployment:** Cloudflare Pages (Edge-Native Assets + Functions)
- **API:** Cloudflare Pages Functions (located in `/functions`)
- **Data Model:** Pure JSON files in `src/data/` (Mandated for static, non-mutable, easily updatable, and trackable information. No database unless explicitly required).
- **Infrastructure:** No monthly infrastructure fees (Cloudflare Free Tier model).

## Key Changes
- Removed Next.js, OpenNext, and related complexities.
- Moved pages to `src/pages/` and set up declarative routing in `src/App.tsx`.
- API logic migrated to `functions/api/send.ts`.
- Simple build process: `npm run build` outputs to `dist/`.

## Deployment
Cloudflare Pages should be configured to:
1. **Build command:** `npm run build`
2. **Build output directory:** `dist`
3. **Compatibility flag:** `nodejs_compat` (required for Resend in Functions)

## Features
- **Custom Project Links:** Added support for a `links` array of `{ label: string, url: string }` objects on project entries in `src/data/projects.json`. These links are dynamically rendered inside the `source.links` terminal block in `src/components/ProjectModalProvider.tsx`.

