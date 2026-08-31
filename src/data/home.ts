import type { HomeCtaContent, HomeHeroContent } from "./types";

export const homeHero: HomeHeroContent = {
  eyebrow: "Digital Contractor",
  headingLine1: "Custom websites,",
  headingAccent: "built right.",
  paragraph:
    "I design and build custom, high-performance websites for local businesses - quoted fairly to fit your project and budget, not a one-size-fits-all price tag.",
  pricingDetails: {
    summary: "How pricing actually works",
    points: [
      "Projects start from The Foundation at $1,500, plus $50/mo covering hosting, security, monitoring, and backups.",
      "Everything past that is chosen line by line, so you are never paying for a feature you did not ask for.",
      "Add a database - for bookings, logins, or online orders - and a usage-based monthly applies, scaled to what you actually use.",
      "Published prices are ballpark figures. Every scope is different, and the real number comes out of a conversation.",
    ],
    cta: { label: "See the full pricing menu", href: "/pricing" },
  },
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "View projects", href: "/projects" },
};

export const homeCta: HomeCtaContent = {
  headingPre: "Ready to build",
  headingAccent: "something better?",
  body: "I help startups and high-growth businesses ship custom, performance-first web solutions that outperform generic templates.",
  button: { label: "Get in touch", href: "/contact" },
};
