# Project Notes: React + Vite (Pure Static)

## Overview
The project has been migrated from Next.js to a **React + Vite** architecture for simplicity and reliable deployment on Cloudflare Pages.

## Architecture
- **Framework:** React 19 + Vite 6
- **Routing:** React Router 7
- **Deployment:** Cloudflare Pages (Pure Static Assets)
- **API:** Cloudflare Pages Functions (located in `/functions`)
- **Data Model:** Static JSON files in `src/data/`
- **Infrastructure:** $0 up-front cost model.

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
