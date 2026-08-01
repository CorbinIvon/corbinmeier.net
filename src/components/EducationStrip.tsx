"use client";

import associates from "@/data/associates.json";
import { education } from "@/data/education";
import { GraduationCap, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CyberCodeSectionLabel } from "@/components/cybercode/CyberCodeUIKit";

export default function EducationStrip() {
  const butte = associates.find((a) => a.name.toLowerCase().includes("butte"));
  if (!butte) return null;

  return (
    <section className="section-container !py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative glass-panel p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-8 border-accent/10"
      >
        <CyberCodeSectionLabel />
        <div className="flex-shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative bg-white rounded-full border border-border overflow-hidden m-0.5 p-px">
            <img
              src={butte.logo}
              alt={`${butte.name} logo`}
              className="absolute inset-px w-[calc(100%-2px)] h-[calc(100%-2px)] object-cover rounded-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-3">
            <GraduationCap className="w-3 h-3" />
            {education.eyebrow}
          </div>
          <h3 className="text-2xl font-serif font-medium mb-1">
            {education.degreeTitle}
          </h3>
          <p className="text-muted mb-4">
            {butte.name} • Class of 2025
          </p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <a
              href={education.degreeMapUrl}
              className="text-sm font-medium underline underline-offset-4 hover:text-accent transition-colors inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              {education.degreeMapLabel} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex-shrink-0">
          <a
            href={education.diplomaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block w-32 h-24 sm:w-40 sm:h-28 rounded-xl overflow-hidden border border-border transition-transform hover:scale-105"
            aria-label="View official diploma on Parchment.com"
            title="Official diploma (opens in new tab)"
          >
            <img
              src={education.diplomaPreviewUrl}
              alt="Diploma preview"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-bold uppercase">{education.diplomaOverlayLabel}</span>
            </div>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
