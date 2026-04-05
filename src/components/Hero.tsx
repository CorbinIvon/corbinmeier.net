"use client";

import { Hero as FrameworkHero } from "react-tailwind-framework";
import Link from "next/link";
import { motion } from "framer-motion";
import { heroStyles } from "@/styles/theme";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FrameworkHero
        title="Your Chico business deserves more than a template."
        subtitle="I help local startups and small businesses get online fast, look credible from day one, and attract customers — without the tech headaches. You focus on your business. I'll handle the rest."
        backgroundImage=""
        ctaText="Let's get started"
        ctaLink="/contact"
        secondaryCtaText="See my work"
        secondaryCtaLink="/portfolio"
        LinkComponent={Link as React.ComponentType<any>}
        styles={heroStyles}
      />
    </motion.div>
  );
}
