import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Code2, Layers } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Project } from "./ProjectCard";

interface ProjectModalContextType {
  isOpen: boolean;
  project: Project | null;
  open: (project: Project) => void;
  close: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(undefined);

export const useProjectModal = () => {
  const context = useContext(ProjectModalContext);
  if (!context) throw new Error("useProjectModal must be used within ProjectModalProvider");
  return context;
};

export default function ProjectModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  const open = (p: Project) => {
    setProject(p);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <ProjectModalContext.Provider value={{ isOpen, project, open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && project && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={close}
                className="absolute top-6 right-6 z-10 p-2 bg-background/50 hover:bg-background backdrop-blur-xl border border-border rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section */}
              <div className="md:w-3/5 bg-muted/20 relative overflow-hidden group">
                <div className="h-full min-h-[300px] md:min-h-0 relative">
                  {project.images?.[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Code2 className="w-32 h-32" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto flex flex-col">
                <div className="mb-8">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-accent">
                        <Calendar className="w-3 h-3" />
                        {project.year}
                      </div>
                      <div className="h-4 w-px bg-border" />
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-muted">
                        <Layers className="w-3 h-3" />
                        Project
                      </div>
                   </div>
                   <h2 className="text-4xl font-serif leading-tight mb-4">{project.title}</h2>
                   <p className="text-muted leading-relaxed text-lg">
                     {project.description}
                   </p>
                </div>

                <div className="space-y-8 flex-1">
                   {project.skills && (
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-4">Core Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                           {project.skills.map(skill => (
                             <span key={skill} className="px-3 py-1.5 rounded-xl bg-muted/5 border border-border text-xs font-medium">
                               {skill}
                             </span>
                           ))}
                        </div>
                     </div>
                   )}

                   {project.body && (
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-4">Context</h4>
                        <p className="text-sm text-muted leading-relaxed">
                           {project.body}
                        </p>
                     </div>
                   )}
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-4">
                    {project["public-url"] && (
                      <a 
                        href={project["public-url"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-artisan py-3 px-8 text-sm"
                      >
                        Visit Project
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project["public-url"]?.includes("github.com") && (
                      <a 
                        href={project["public-url"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-3 rounded-full border border-border hover:bg-muted/10 transition-colors text-sm font-bold"
                      >
                        Source Code
                        <IconBrandGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ProjectModalContext.Provider>
  );
}
