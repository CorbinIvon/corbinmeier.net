"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { homeCta } from "@/data/home";

export default function CTA() {
  return (
    <section className="section-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[3rem] bg-[#1c1917] text-[#fafaf9] px-8 py-12 sm:py-20 text-center sm:px-16 border border-white/5"
      >
        {/* Subtle background circles */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-accent/30 rounded-full blur-[100px]" />

        <div className="relative z-10 w-full">
          <h2 className="text-h2 font-serif text-white mb-8">
            {homeCta.headingPre} <span className="text-accent italic">{homeCta.headingAccent}</span>
          </h2>
          <p className="text-white/80 text-lg sm:text-xl mb-12 leading-relaxed">
            {homeCta.body}
          </p>
          <Link
            to={homeCta.button.href}
            className="group inline-flex items-center gap-2 bg-[#fafaf9] text-[#1c1917] px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 hover:bg-accent hover:text-white"
          >
            {homeCta.button.label}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
