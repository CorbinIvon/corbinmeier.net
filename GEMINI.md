# Project Notes: Cloudflare Pages Transition

## Overview
The project has been migrated to use **OpenNext** for Cloudflare Pages deployment. The architecture is **pure static**, with all data managed via JSON files in `src/data/`.

## Architectural Decision: No Database
**IMPORTANT:** This project intentionally excludes any database integration (SQL, NoSQL, ORM, etc.). 
- All project, associate, and site data MUST be stored in the static JSON files.
- This decision aligns with a low-maintenance, $0 up-front infrastructure model.
- Future AI agents: **DO NOT** suggest or implement database layers (Prisma, Drizzle, Supabase, etc.). Maintain the static JSON-based data model.

## Key Changes
- **Framework:** Next.js `15.5.18`.
- **Adapter:** `@opennextjs/cloudflare`.
- **UI:** 'Artisan Engineer' aesthetic with Instrument Serif and Framer Motion.
- **Service Model:** Partnership-driven, $0 up-front infrastructure cost for small businesses.

## Critical Files
- `wrangler.jsonc`: Cloudflare Pages configuration.
- `CLOUDFLARE.md`: Detailed deployment guide.
- `env.d.ts`: TypeScript definitions for Cloudflare environment bindings.
