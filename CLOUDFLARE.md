# CorbinMeier.net - Cloudflare Pages (Pure Static)

This project is configured to deploy to Cloudflare Pages using the `@opennextjs/cloudflare` adapter.

## Deployment Architecture

- **Platform:** Cloudflare Workers (via Pages/OpenNext)
- **Runtime:** `nodejs_compat`
- **Adapter:** `@opennextjs/cloudflare`
- **Data Model:** Static JSON files (`src/data/*.json`)

## Build Scripts

- `npm run build`: Standard Next.js build.
- `npm run build:cf`: Builds the project for Cloudflare using OpenNext.
- `npm run preview`: Preview the Cloudflare build locally using Wrangler.
- `npm run deploy`: Deploy the build to Cloudflare.

## Environment Variables

Ensure the following variables are set in your Cloudflare Dashboard:

- `RESEND_API_KEY`: API key for Resend email service.
- `PERSONAL_EMAIL`: Recipient email for contact form notifications.
