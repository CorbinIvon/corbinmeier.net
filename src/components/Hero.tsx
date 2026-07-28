"use client";

import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { homeHero } from "@/data/home";

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

        <motion.h1
          variants={item}
          className="text-6xl sm:text-8xl lg:text-[10rem] mb-10 leading-[0.8] font-serif tracking-tighter"
        >
          {homeHero.headingLine1} <br />
          <span className="text-accent italic">{homeHero.headingAccent}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-narrative mb-14"
        >
          {homeHero.paragraphPre}{" "}
          <span className="text-foreground font-medium underline decoration-accent/30 decoration-4 underline-offset-8">{homeHero.paragraphEmphasis}</span>{" "}
          {homeHero.paragraphPost}
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap justify-center sm:justify-start gap-8"
        >
          <Link
            to={homeHero.primaryCta.href}
            className="btn-artisan"
          >
            {homeHero.primaryCta.label}
          </Link>
          <Link
            to={homeHero.secondaryCta.href}
            className="inline-flex items-center justify-center px-10 py-5 rounded-full border border-border hover:bg-muted/5 transition-all font-bold text-lg"
          >
            {homeHero.secondaryCta.label}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
