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
      "Builds start at $700, paid once. Most established businesses land on the $1,200 tier.",
      "There is no required monthly. I can set every account up in your name, hand you the logins, and step away.",
      "If you would rather not think about it, I stay on and maintain the site for $50 to $100 a month.",
      "Everything past the build is chosen line by line, so you are never paying for a feature you did not ask for.",
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
