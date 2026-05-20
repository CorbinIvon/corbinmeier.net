# CorbinMeier.net

The professional portfolio and business hub for Corbin Meier, a Digital Contractor specializing in high-performance digital infrastructure for local small businesses.

## Architecture

This site is built with **Next.js 15 (App Router)** and deployed to **Cloudflare Pages** using **OpenNext**.

### Core Decision: Pure Static
To maintain a **$0 up-front hosting model**, this project is architected as a **pure static site**. 
- **Data Source:** All content is managed via JSON files in `src/data/`.
- **No Database:** There is no SQL/ORM layer. This is an intentional constraint for simplicity and cost-efficiency.

## Redesign: The Artisan Engineer
The site features a custom visual identity balancing high-end editorial typography (**Instrument Serif**) with blueprint-inspired engineering details.

## Development

```bash
npm install
npm run dev
```

### Building for Cloudflare

```bash
npm run build:cf
npm run preview
```

## Strategy: Zero-Cost-to-Start
I build growth-focused digital tools for local businesses without the high up-front overhead of traditional agencies or clunky DIY platforms.
