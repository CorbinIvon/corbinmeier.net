"use client";

import projects from "@/data/portfolio.json";
import ProjectCard from "./ProjectCard";
import { useProjectModal } from "./ProjectModalProvider";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  const { open } = useProjectModal();
  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">Featured projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {featured.map((p) => (
          <div key={p.slug}>
            <ProjectCard project={p} onClick={() => open(p)} />
          </div>
        ))}
      </div>
    </section>
  );
}
