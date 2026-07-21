"use client";

import { motion, Variants } from "framer-motion";
import { Link } from "react-router-dom";

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
          Digital Contractor
        </motion.div>

        <motion.h1
          variants={item}
          className="text-6xl sm:text-8xl lg:text-[10rem] mb-10 leading-[0.8] font-serif tracking-tighter"
        >
          Custom websites, <br />
          <span className="text-accent italic">free to host.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-narrative mb-14"
        >
          I design and build custom, high-performance websites for local
          businesses, quoted to your project. Once it's live, a static site
          with a simple contact form is{" "}
          <span className="text-foreground font-medium underline decoration-accent/30 decoration-4 underline-offset-8">free to host — the only ongoing cost is your domain.</span>{" "}
          Need a database for bookings, logins, or online orders? That's a
          premium feature, and it's the only thing that adds a monthly fee.
        </motion.p>
        
        <motion.div
          variants={item}
          className="flex flex-wrap justify-center sm:justify-start gap-8"
        >
          <Link
            to="/contact"
            className="btn-artisan"
          >
            Start a project
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center px-10 py-5 rounded-full border border-border hover:bg-muted/5 transition-all font-bold text-lg"
          >
            View portfolio
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
