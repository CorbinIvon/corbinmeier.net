# CorbinMeier.net

The professional portfolio and business hub for Corbin Meier, a Digital Contractor specializing in high-performance digital infrastructure for local small businesses.

## Architecture

This site is built with **React 19 + Vite 6** and deployed to **Cloudflare Pages**.

### Core Decision: Modern Cloud Architecture
To maintain **no monthly infrastructure fees**, this project is architected to run entirely on modern cloud infrastructure without traditional server overhead.
- **Dynamic Logic:** Contact form and interactions are handled by Cloudflare Functions.
- **JSON-First Data:** Content is managed via structured JSON files in `src/data/`. This approach ensures information is easily updatable, version-trackable, and extremely fast.
- **No Database:** No SQL/ORM layer is used. This keeps the site lightweight, secure, and focused on performance.
- **API:** Contact form logic is handled via Cloudflare Pages Functions in `/functions`.

## Redesign: The Artisan Engineer
The site features a custom visual identity balancing high-end editorial typography (**Instrument Serif**) with blueprint-inspired engineering details.

## Development

```bash
npm install
npm run dev
```

### Building for Cloudflare

```bash
npm run build
npm run preview
```

## Strategy: Zero-Cost-to-Start
I build growth-focused digital tools for local businesses without the high up-front overhead of traditional agencies or clunky DIY platforms.
