"use client";

import { CTA as FrameworkCTA } from "react-tailwind-framework";
import { ctaStyles } from "@/styles/theme";

export default function CTA() {
  return (
    <FrameworkCTA
      title="Ready to put your Chico business on the map?"
      subtitle="I work with local startups and small businesses — not big agencies. You get direct access to a developer who's invested in your success and based right here in the 530."
      ctaText="Let's talk"
      ctaLink="/contact"
      styles={ctaStyles}
    />
  );
}
