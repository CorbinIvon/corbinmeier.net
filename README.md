# CorbinMeier.net

The professional portfolio and business hub for Corbin Meier, a Digital Contractor specializing in high-performance digital infrastructure for local small businesses.

## Architecture

This site is built with **React 19 + Vite 6** and deployed to **Cloudflare Pages**.

### Core Decision: Pure Static
To maintain a **$0 up-front hosting model**, this project is architected as a **pure static site**. 
- **Data Source:** All content is managed via JSON files in `src/data/`.
- **No Database:** There is no SQL/ORM layer. This is an intentional constraint for simplicity and cost-efficiency.
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
