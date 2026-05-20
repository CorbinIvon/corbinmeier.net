# Project Notes: Cloudflare Pages Transition

## Overview
The project has been migrated to use **OpenNext** for Cloudflare Pages deployment. The architecture is pure static, with data managed via JSON files.

## Key Changes
- **Framework:** Next.js `15.5.18`.
- **Adapter:** `@opennextjs/cloudflare`.
- **UI:** 'Artisan Engineer' aesthetic with Instrument Serif and Framer Motion.
- **Service Model:** Partnership-driven, $0 up-front infrastructure cost for small businesses.

## Critical Files
- `wrangler.jsonc`: Cloudflare Pages configuration.
- `CLOUDFLARE.md`: Detailed deployment guide.
- `env.d.ts`: TypeScript definitions for Cloudflare environment bindings.
