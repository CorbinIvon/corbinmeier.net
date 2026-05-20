import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type Project = {
  title: string;
  slug: string;
  year: number;
  skills?: string[];
  "public-url"?: string;
  description?: string;
  body?: string;
  images?: string[];
};

export default function ProjectCard({
  project,
  href,
  onClick,
  className,
}: {
  project: Project;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse tracking for the glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const content = (
    <div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-full flex flex-col group overflow-hidden bg-card border border-border rounded-2xl transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
    >
      {/* Glow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, var(--accent), transparent 40%)`
          ),
          opacity: hovered ? 0.15 : 0,
        }}
      />

      <div className="relative aspect-video overflow-hidden bg-muted/20 flex items-center justify-center">
        {project.images?.[0] ? (
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
            <Code2 className="w-12 h-12" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Source View</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
           <div className="flex gap-2">
              {project["public-url"]?.includes("github.com") && (
                <div className="p-2 rounded-full bg-background/90 text-foreground backdrop-blur-sm shadow-lg">
                  <IconBrandGithub className="w-4 h-4" />
                </div>
              )}
              <div className="p-2 rounded-full bg-accent text-white shadow-lg">
                <ExternalLink className="w-4 h-4" />
              </div>
           </div>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-[0.2em]">{project.year}</span>
          <div className="flex gap-2">
            {project.skills?.slice(0, 3).map(skill => (
              <span key={skill} className="px-2.5 py-1 rounded-md bg-muted/5 text-[9px] font-bold uppercase tracking-wider text-muted-foreground border border-border/50">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-2xl font-serif font-medium mb-3 group-hover:text-accent transition-colors leading-tight">
          {project.title}
        </h3>
        <p className="text-muted leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );

  const baseClass = cn("block text-left transition-all duration-300", className);

  if (href) {
    return (
      <Link to={href} className={baseClass}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button" className={baseClass}>
      {content}
    </button>
  );
}
