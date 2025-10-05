# Copilot Instructions for corbinmeier.net

## Project Overview

This is a personal website built with Next.js 15.5.4 using the App Router architecture. The project is in early development with a minimal structure focused on modern React and TypeScript patterns.

## Tech Stack & Configuration

- **Framework**: Next.js 15.5.4 with App Router
- **Language**: TypeScript 5 with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS
- **Build Tool**: Turbopack (enabled for both dev and build)
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Linting**: ESLint 9 with Next.js TypeScript configuration

## Key Development Patterns

### Project Structure

- All source code lives in `src/app/` following Next.js App Router conventions
- Path aliasing configured: `@/*` maps to `./src/*`
- Static assets in `public/` directory
- TypeScript configuration uses `bundler` module resolution

### Styling Approach

- Uses Tailwind CSS v4 with inline theme configuration in `globals.css`
- Dark mode support via `prefers-color-scheme` media query
- CSS custom properties for theming: `--background`, `--foreground`
- Font variables defined via Next.js font optimization

### Component Patterns

- Server Components by default (App Router)
- Font loading via `next/font/google` with variable CSS custom properties
- Image optimization using `next/image` with priority loading for above-fold content

## Development Workflow

### Commands

```bash
npm run dev --turbopack    # Development server with Turbopack
npm run build --turbopack  # Production build with Turbopack
npm run lint              # ESLint checking
```

### File Conventions

- Page components: `page.tsx` in route directories
- Layout components: `layout.tsx` for nested layouts
- Global styles: `src/app/globals.css` with Tailwind imports
- TypeScript paths: Use `@/` for imports from `src/`

## Configuration Notes

- Turbopack is enabled for faster builds and hot reloading
- ESLint uses flat config format (`eslint.config.mjs`)
- PostCSS configured specifically for Tailwind CSS v4
- TypeScript target is ES2017 with modern module resolution

## Styling System

- Base theme variables defined in `:root` and `@theme inline`
- Responsive design with Tailwind's mobile-first approach
- Dark/light mode automatic switching based on system preference
- Font family hierarchy: Geist Sans (primary), Geist Mono (code)

When working on this project:

- Follow Next.js App Router patterns for routing and data fetching
- Use TypeScript strictly - the config enforces strict mode
- Leverage Turbopack for fast development iteration
- Maintain the established theming system for consistent design
- Use the configured path aliases for clean imports

## Mobile-first design guidance

This site prioritizes a mobile-first user experience. When editing or adding components, follow these concrete rules so the site remains fast, accessible, and friendly on phones:

- Layout: Start with a single-column stacked layout for small screens. Use Tailwind's mobile (no prefix) utilities first, then add `sm:`/`md:` breakpoints for larger screens.
- Typography & spacing: Use relative units and Tailwind spacing scale (`text-base`, `leading-relaxed`, `px-4`, `py-6`) so text and tap targets are comfortable on small devices.
- CTAs: Make primary CTAs full-width on mobile (`w-full`) and centered; switch to inline or fixed-width on `sm:`/`md:` breakpoints.
- Images: Use `next/image` with appropriate `sizes` and prefer `object-cover` for responsive crops. For small screens, prefer simpler / lighter images or SVGs.
- Performance: Avoid heavy client-side libraries on the initial load. Favor server components and only hydrate interactive parts as client components.
- Accessibility: Ensure tap targets are >=44x44 px, use descriptive link text (no `click here`), and add `aria-*` attributes for non-text controls.
- Testing: Check the site in a mobile viewport (375x812 / iPhone 11) and ensure no horizontal scrolling, clear hierarchy, and fast interactive response.

Examples from this repo:

- `src/components/Hero.tsx`: make the primary CTA `w-full sm:w-auto` and stack actions with `flex-col sm:flex-row`.
- `src/components/FeaturedProjects.tsx`: render 1 column on mobile then `sm:grid-cols-3` for larger viewports.
- `src/components/EducationStrip.tsx`: keep the diploma thumbnail hidden on very small screens with `hidden sm:block` if needed.

## Purpose & content priorities

This site is primarily a personal portfolio and the public face of a small business. Priorities are:

- Showcase skillsets (categories and individual projects) with links, short descriptions, tech tags, and media (images/video).
- A short, clear business section (services, contact or contact CTA, credentials).
- Feature "College Associates" as a credibility block — a compact card or logo grid on the About or Footer area that links to a detail page.

When adding new pages or components, designers/agents should prefer clarity and expandability over one-off markup.

## Suggested content structure (component-based)

Follow a composable, route-driven structure under `src/app/`. Suggested top-level routes:

- `/` — Home / hero / highlight of most important projects and business CTA. See `src/app/page.tsx` for the starter layout.
- `/about` — Personal bio + College Associates showcase (logo grid + optional detail pages at `/about/associates/[id]`).
- `/portfolio` — Project index (filter by skillset/tag) and individual project pages at `/portfolio/[slug]/page.tsx`.
- `/services` — Business services and pricing or contact CTA.
- `/contact` — Contact form or email/links.

Component guidance:

- Create small, focused components in `src/components/`, e.g. `src/components/Hero.tsx`, `src/components/ProjectCard.tsx`, `src/components/AssociateCard.tsx`, `src/components/Footer.tsx`.
- Prefer Server Components for data-heavy pages; use Client Components only where interactivity (state, effects) is required (add `'use client'` at the top).
- Keep presentational components pure and style with Tailwind utility classes. Extract repeated utility groups into small helper classes or component props.
- Use `next/image` for all site images; store assets in `public/` and reference `/images/...` paths.

## College Associates guidance (concrete)

- Represent College Associates as a simple JSON data file (example: `src/data/associates.json`) with fields: `id`, `name`, `logo`, `role`, `link`, `description`.
- Render a logo grid on `/about` using `AssociateCard` components that link to detail pages.
- If you need a preview in the footer, add a condensed `AssociateStrip` component referencing the same data source so content is centralized.

## Business / portfolio specifics

- Business CTA should be present in site header or hero and repeated in footer.
- Portfolio entries should include `title`, `slug`, `year`, `skills` (array), `description`, `images` (array), and optional `link`/`repo` fields. Consider `src/data/portfolio.json` as canonical content source for now.
- Keep project metadata separate from components so CI/content updates are data-only edits.

## Examples & files to inspect

- `src/app/page.tsx` — home starter content and layout patterns.
- `src/app/layout.tsx` — root layout, font variables and global CSS import.
- `src/app/globals.css` — Tailwind import, theme variables, and dark-mode rules.
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs` — environment and linting conventions.

## Non-goals / constraints

- This repo is intentionally minimal. Don't add heavy frameworks or CMS unless requested.
- Keep server usage minimal — prefer static or incremental generation for portfolio pages.

## How to add a new portfolio item (quick checklist)

1. Add an entry to `src/data/portfolio.json` with the required fields.
2. Add images to `public/images/portfolio/<slug>/`.
3. Create or reuse `ProjectCard` and an individual project page under `src/app/portfolio/[slug]/page.tsx` that reads the portfolio JSON.
4. Add a link from `src/app/portfolio/page.tsx` (the index) to the new project page.

## Notes for AI agents

- Preserve existing CSS variables (`--background`, `--foreground`, `--font-geist-*`) to keep consistent theming.
- Prefer edits that are componentized and data-driven; avoid one-off inline pages that duplicate logic.
- When introducing new dependencies, prefer very small, focused packages and update `package.json` and `README.md`.
- When adding routes, follow the App Router file naming convention so new pages are server-renderable by default.

---

If anything above is unclear or you'd like a specific starter component (e.g., `ProjectCard` + sample `portfolio.json` + a `AssociateCard`), tell me which one and I will add it and wire up a minimal example.
