# CorbinMeier.net - Cloudflare Pages (Edge-Native)

This project is configured to deploy to Cloudflare Pages as a static application with Functions support.

## Deployment Architecture

- **Platform:** Cloudflare Pages
- **Runtime:** `nodejs_compat` (required for Resend)
- **Framework:** React + Vite
- **Data Model:** Static JSON files (`src/data/*.json`)

## Build Configuration

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node.js version:** >= 18.x

## Scripts

- `npm run build`: Builds the project using Vite and outputs to `dist/`.
- `npm run preview`: Preview the production build locally.
- `npm run deploy`: Deploy the build to Cloudflare Pages via Wrangler.

## Environment Variables

Ensure the following variables are set in your Cloudflare Pages project settings:

- `RESEND_API_KEY`: API key for Resend email service.
- `PERSONAL_EMAIL`: Recipient email for contact form notifications.
