import type { HomeCtaContent, HomeHeroContent } from "./types";

export const homeHero: HomeHeroContent = {
  eyebrow: "Digital Contractor",
  headingLine1: "Custom websites,",
  headingAccent: "built right.",
  paragraph:
    "I design and build custom, high-performance websites for local businesses — quoted fairly to fit your project and budget, not a one-size-fits-all price tag.",
  pricingDetails: {
    summary: "How pricing actually works",
    points: [
      "Every quote is custom — final cost depends on scope, timeline, and features, not a fixed rate.",
      "A simple static site with a contact form costs nothing to host on my end (Cloudflare Pages); your only ongoing cost is the domain.",
      "Add a database — for bookings, logins, or online orders — and that's when a monthly fee applies, scaled to what you actually use.",
      "As a reference point, small no-database sites often start around $750, but I'd rather talk through your project than quote a number in the dark.",
    ],
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
