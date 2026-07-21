
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, Filter } from "lucide-react";
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

  return (
    <div className="w-full space-y-12">
      {/* Search and Filters */}
      <div className="glass-panel p-2 flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, stack, or outcome..."
            className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none text-sm"
          />
          {query && (
            <button 
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted/10 rounded-full"
            >
              <X className="w-3 h-3 text-muted" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 p-1 border-t md:border-t-0 md:border-l border-border mt-2 md:mt-0 pt-2 md:pt-0 pl-0 md:pl-2">
          <div className="relative group">
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-muted/5 group-hover:bg-muted/10 transition-colors rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none"
            >
              <option value="all">Years</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted pointer-events-none" />
          </div>

          <div className="relative group">
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 bg-muted/5 group-hover:bg-muted/10 transition-colors rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer focus:outline-none"
            >
              <option value="all">Technology</option>
              {skills.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted pointer-events-none" />
          </div>

          {(year !== "all" || skill !== "all" || query !== "") && (
             <button
               onClick={() => {
                 setQuery("");
                 setYear("all");
                 setSkill("all");
               }}
               className="px-4 py-3 bg-accent text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors"
             >
               Reset
             </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs font-bold uppercase tracking-widest text-muted">
        Showing {filtered.length} of {projects.length}{" "}
        {projects.length === 1 ? "project" : "projects"}
      </p>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              layout
              key={p.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectCard
                project={p}
                onClick={() => open(p)}
                className="h-full"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Filter className="w-12 h-12 text-muted/20 mx-auto mb-4" />
          <p className="text-muted font-serif text-xl">No projects found matching your criteria.</p>
          <button 
            onClick={() => { setQuery(""); setYear("all"); setSkill("all"); }}
            className="text-accent underline underline-offset-4 mt-4 text-sm font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
