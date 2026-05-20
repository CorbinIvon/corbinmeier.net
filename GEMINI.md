# Project Notes: Cloudflare Pages & Drizzle Transition

## Overview
The project has been migrated to use **OpenNext** for Cloudflare Pages deployment, **Drizzle ORM**, and **Cloudflare D1** (SQLite). Supabase and Prisma have been removed.

## Key Changes
- **Framework:** Next.js `15.5.18`.
- **Adapter:** `@opennextjs/cloudflare`.
- **Database:** Cloudflare D1 (bound as `DB`).
- **ORM:** Drizzle ORM (replacing Prisma).
- **Schema:** Defined in `src/db/schema/index.ts`.
- **Migrations:** Managed via `drizzle-kit` and stored in `/drizzle`.

## Database Workflow
1. Modify schema in `src/db/schema/index.ts`.
2. Run `npx drizzle-kit generate` to create migrations.
3. Run `npx wrangler d1 migrations apply corbinmeier-net-db --local` for local dev.
4. Run `npx wrangler d1 migrations apply corbinmeier-net-db --remote` for production.

## Critical Files
- `src/db/index.ts`: Drizzle initialization helper.
- `wrangler.jsonc`: Cloudflare D1 and Pages configuration.
- `CLOUDFLARE.md`: Updated deployment and migration guide.
- `env.d.ts`: TypeScript definitions for Cloudflare environment bindings.
