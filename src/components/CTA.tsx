"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="section-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] bg-[#1c1917] text-[#fafaf9] px-8 py-12 sm:py-20 text-center sm:px-16 border border-white/5 shadow-2xl"
      >
        {/* Subtle background circles */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-serif text-white mb-8 leading-tight">
            Ready to build <span className="text-accent italic">something better?</span>
          </h2>
          <p className="text-white/80 text-lg sm:text-xl mb-12 leading-relaxed">
            I help startups and high-growth businesses ship custom, performance-first 
            web solutions that outperform generic templates.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 bg-[#fafaf9] text-[#1c1917] px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 hover:bg-accent hover:text-white"
          >
            Get in touch
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
