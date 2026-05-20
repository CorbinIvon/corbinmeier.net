"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import projects from "@/data/portfolio.json";
import ProjectCard from "./ProjectCard";
import { useProjectModal } from "./ProjectModalProvider";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  const { open } = useProjectModal();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="section-container border-y border-border/50 blueprint-bg">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl sm:text-7xl font-serif mb-6">Selected Works</h2>
          <p className="text-narrative">
            A curated selection of digital infrastructure and performance-critical systems 
            built with precision and purpose.
          </p>
        </div>
        <Link 
          href="/portfolio" 
          className="group flex items-center gap-2 text-accent font-medium hover:underline decoration-accent underline-offset-4"
        >
          View all work
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {featured.map((p) => (
          <motion.div key={p.slug} variants={item}>
            <ProjectCard 
              project={p} 
              onClick={() => open(p)} 
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
