# CorbinMeier.net - Cloudflare Pages (Drizzle & D1)

This project is configured to deploy to Cloudflare Pages using the `@opennextjs/cloudflare` adapter and Cloudflare D1 as the database.

## Deployment Architecture

- **Platform:** Cloudflare Workers (via Pages/OpenNext)
- **Runtime:** `nodejs_compat`
- **Adapter:** `@opennextjs/cloudflare`
- **Database:** Cloudflare D1 (SQLite)
- **ORM:** Drizzle ORM

## Database Management (Drizzle)

- `npx drizzle-kit generate`: Generate SQL migrations based on the schema in `src/db/schema/index.ts`.
- `npx wrangler d1 migrations apply corbinmeier-net-db --local`: Apply migrations to the local development database.
- `npx wrangler d1 migrations apply corbinmeier-net-db --remote`: Apply migrations to the production D1 database.

## Build Scripts

- `npm run build`: Standard Next.js build.
- `npm run build:cf`: Builds the project for Cloudflare using OpenNext.
- `npm run preview`: Preview the Cloudflare build locally using Wrangler.
- `npm run deploy`: Deploy the build to Cloudflare.

## Environment Variables

Ensure the following variables are set in your Cloudflare Dashboard:

- `RESEND_API_KEY`: API key for Resend email service.
- `PERSONAL_EMAIL`: Recipient email for contact form notifications.

The D1 database is bound via the `DB` binding in `wrangler.jsonc`.
