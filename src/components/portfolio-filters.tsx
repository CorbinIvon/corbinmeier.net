"use client";

import { useMemo, useState } from "react";
import ProjectCard, { Project as CardProject } from "./ProjectCard";
import { useProjectModal } from "./ProjectModalProvider";

type Project = CardProject;

export default function PortfolioFilters({
  projects,
}: {
  projects: Project[];
}) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string>("all");
  const [skill, setSkill] = useState<string>("all");
  const { open } = useProjectModal();

  const years = useMemo(() => {
    const set = new Set<number>();
    projects.forEach((p) => set.add(p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, [projects]);

  const skills = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.skills?.forEach((k) => s.add(k)));
    return Array.from(s).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (year !== "all" && String(p.year) !== year) return false;
      if (skill !== "all" && !(p.skills || []).includes(skill)) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q) ||
          (p.skills || []).some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [projects, query, year, skill]);

  // close modal on ESC
  // Modal close handling is provided by ProjectModalProvider

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, skills..."
          className="flex-1 px-3 py-2 border-theme bg-input rounded-md"
        />

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-3 py-2 border-theme bg-input rounded-md"
        >
          <option value="all">All years</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="px-3 py-2 border-theme bg-input rounded-md"
        >
          <option value="all">All skills</option>
          {skills.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setQuery("");
            setYear("all");
            setSkill("all");
          }}
          className="px-3 py-2 border-theme rounded-md text-sm"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div key={p.slug}>
            <ProjectCard
              project={p}
              onClick={() => open(p)}
              className="w-full"
            />
          </div>
        ))}
      </div>
      {/* Modal is handled globally by ProjectModalProvider */}
    </div>
  );
}
