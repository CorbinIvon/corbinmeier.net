import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Code2, Layers, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const open = (p: Project) => {
    setProject(p);
    setActiveIndex(0);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setIsOpen(false);
    setIsFullscreen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = useCallback(() => {
    if (!project?.images?.length) return;
    setActiveIndex((prev) => (prev + 1) % project.images!.length);
  }, [project]);

  const prevImage = useCallback(() => {
    if (!project?.images?.length) return;
    setActiveIndex((prev) => (prev - 1 + project.images!.length) % project.images!.length);
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        if (isFullscreen) setIsFullscreen(false);
        else close();
      }
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFullscreen, nextImage, prevImage]);

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
              className="relative w-full max-w-6xl max-h-[90vh] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={close}
                className="absolute top-6 right-6 z-[110] p-2 bg-background/50 hover:bg-background backdrop-blur-xl border border-border rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Section */}
              <div className="md:w-3/5 bg-muted/20 relative overflow-hidden flex flex-col border-r border-border">
                <div className="flex-1 relative overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      {project.images?.[activeIndex] ? (
                        <div className="w-full h-full relative cursor-zoom-in" onClick={() => setIsFullscreen(true)}>
                          <motion.img
                            layoutId={`project-image-${project.slug}-${activeIndex}`}
                            src={project.images[activeIndex]}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          {/* Expand Button */}
                          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFullscreen(true);
                              }}
                              className="p-3 bg-black border border-white/50 rounded-xl text-white shadow-[0_0_20px_rgba(0,0,0,0.6)] backdrop-blur-sm hover:scale-110 transition-transform flex items-center gap-2"
                            >
                              <Maximize2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                          <Code2 className="w-32 h-32" />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Arrows (Desktop) */}
                  {project.images && project.images.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/20 hover:bg-background/40 backdrop-blur-xl border border-white/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/20 hover:bg-background/40 backdrop-blur-xl border border-white/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Gallery Strip */}
                {project.images && project.images.length > 1 && (
                  <div className="p-4 bg-muted/10 border-t border-border flex gap-3 overflow-x-auto no-scrollbar justify-center">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          idx === activeIndex ? "border-accent scale-105 shadow-lg" : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
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
                        <div 
                           className="text-sm text-muted leading-relaxed prose prose-invert prose-sm max-w-none"
                           dangerouslySetInnerHTML={{ __html: project.body }}
                        />
                     </div>
                   )}

                   {project.beforeAfter && (
                     <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-4">Transformation</h4>
                        <div className="grid grid-cols-1 gap-4">
                           <div className="p-4 rounded-2xl bg-muted/5 border border-border/50">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-red-500/80 mb-2 block">Before</span>
                              <h5 className="text-sm font-medium mb-1">{project.beforeAfter.before.title}</h5>
                              <p className="text-xs text-muted leading-relaxed">{project.beforeAfter.before.description}</p>
                           </div>
                           <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-accent mb-2 block">After</span>
                              <h5 className="text-sm font-medium mb-1">{project.beforeAfter.after.title}</h5>
                              <p className="text-xs text-muted leading-relaxed">{project.beforeAfter.after.description}</p>
                           </div>
                        </div>
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
                        {project["original-url"] ? "Visit Live Site" : "Visit Project"}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project["original-url"] && (
                      <a 
                        href={project["original-url"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-3 rounded-full border border-border/50 hover:bg-muted/10 transition-colors text-sm font-medium text-muted"
                      >
                        View Original
                        <ExternalLink className="w-3 h-3" />
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

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && project && project.images && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 overflow-hidden"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div 
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                layoutId={`project-image-${project.slug}-${activeIndex}`}
                src={project.images[activeIndex]}
                alt={project.title}
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm cursor-zoom-out"
                onClick={() => setIsFullscreen(false)}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
              
              {/* Close Button Fullscreen */}
              <button 
                onClick={() => setIsFullscreen(false)}
                className="absolute top-0 right-0 p-4 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Arrows Fullscreen */}
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-6 text-white/20 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-12 h-12" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-6 text-white/20 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-12 h-12" />
                  </button>
                </>
              )}

              {/* Index Indicator */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center text-white/40 font-mono text-xs tracking-widest uppercase">
                {activeIndex + 1} / {project.images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ProjectModalContext.Provider>
  );
}
