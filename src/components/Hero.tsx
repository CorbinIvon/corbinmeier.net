"use client";

import { motion, Variants } from "framer-motion";
import { homeHero } from "@/data/home";
import { CyberCodeButton, CyberCodeLinkButton } from "@/components/cybercode/CyberCodeUIKit";
import { CyberCodeMatrixRain } from "@/components/cybercode/CyberCodeBackdrops";

export default function Hero() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-8 pb-16 sm:py-32 min-h-[60vh] sm:min-h-[85vh] flex flex-col justify-center items-center sm:items-start relative blueprint-bg">
      <CyberCodeMatrixRain className="pointer-events-none absolute inset-0 z-0 opacity-10" />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl relative z-10 text-center sm:text-left"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8 mx-auto sm:mx-0"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          {homeHero.eyebrow}
        </motion.div>

        <motion.div variants={item}>
          <h1 className="text-6xl sm:text-8xl lg:text-[10rem] mb-10 leading-[0.8] font-serif tracking-tighter text-foreground">
            {homeHero.headingLine1} <br />
            <span className="text-accent italic">{homeHero.headingAccent}</span>
          </h1>
        </motion.div>

        <motion.p
          variants={item}
          className="text-narrative mb-8"
        >
          {homeHero.paragraph}
        </motion.p>

        <motion.details
          variants={item}
          className="group mb-14 border border-border rounded-xl px-5 py-4 max-w-2xl text-left"
        >
          <summary className="cursor-pointer list-none flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
            <span className="transition-transform group-open:rotate-90">{">"}</span>
            {homeHero.pricingDetails.summary}
          </summary>
          <ul className="mt-4 space-y-3">
            {homeHero.pricingDetails.points.map((point) => (
              <li key={point} className="text-sm text-muted leading-relaxed pl-4 border-l border-border">
                {point}
              </li>
            ))}
          </ul>
        </motion.details>

        <motion.div
          variants={item}
          className="flex flex-wrap justify-center sm:justify-start gap-8"
        >
          <CyberCodeButton to={homeHero.primaryCta.href}>
            {homeHero.primaryCta.label}
          </CyberCodeButton>
          <CyberCodeLinkButton to={homeHero.secondaryCta.href}>
            {homeHero.secondaryCta.label}
          </CyberCodeLinkButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
