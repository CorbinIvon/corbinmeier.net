import type { HomeCtaContent, HomeHeroContent } from "./types";

export const homeHero: HomeHeroContent = {
  eyebrow: "Digital Contractor",
  headingLine1: "Custom websites,",
  headingAccent: "free to host.",
  paragraphPre:
    "I design and build custom, high-performance websites for local businesses, quoted to your project. Once it's live, a static site with a simple contact form is",
  paragraphEmphasis: "free to host — the only ongoing cost is your domain.",
  paragraphPost:
    "Need a database for bookings, logins, or online orders? That's a premium feature, and it's the only thing that adds a monthly fee.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "View portfolio", href: "/portfolio" },
};

export const homeCta: HomeCtaContent = {
  headingPre: "Ready to build",
  headingAccent: "something better?",
  body: "I help startups and high-growth businesses ship custom, performance-first web solutions that outperform generic templates.",
  button: { label: "Get in touch", href: "/contact" },
};
