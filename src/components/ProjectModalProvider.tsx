import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Code2, Layers, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Project } from "./ProjectCard";
import BeforeAfterSlider from "./BeforeAfterSlider";
import { CyberCodeTerminalWindow, CyberCodeWindowChrome } from "./cybercode/CyberCodeUIKit";

interface ProjectModalContextType {
  isOpen: boolean;
  project: Project | null;
  open: (project: Project, list?: Project[]) => void;
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
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [direction, setDirection] = useState(0);

  const open = (p: Project, list?: Project[]) => {
    setProject(p);
    setProjectList(list ?? []);
    setActiveIndex(0);
    setDirection(0);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    setIsOpen(false);
    setIsFullscreen(false);
    document.body.style.overflow = "unset";
  };

  const paginate = useCallback((newDirection: number) => {
    if (!project?.images?.length) return;
    setDirection(newDirection);
    setActiveIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return project.images!.length - 1;
      if (next >= project.images!.length) return 0;
      return next;
    });
  }, [project]);

  const projectIndex = project ? projectList.findIndex((p) => p.slug === project.slug) : -1;
  const hasProjectNav = projectIndex !== -1 && projectList.length > 1;

  const navigateProject = useCallback((newDirection: number) => {
    if (!project) return;
    const currentIndex = projectList.findIndex((p) => p.slug === project.slug);
    if (currentIndex === -1 || projectList.length <= 1) return;
    const nextIndex = (currentIndex + newDirection + projectList.length) % projectList.length;
    setProject(projectList[nextIndex]);
    setActiveIndex(0);
    setDirection(0);
    setIsFullscreen(false);
  }, [project, projectList]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        if (isFullscreen) setIsFullscreen(false);
        else close();
      }
      if (!isFullscreen && e.shiftKey && e.key === "ArrowRight") { navigateProject(1); return; }
      if (!isFullscreen && e.shiftKey && e.key === "ArrowLeft") { navigateProject(-1); return; }
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFullscreen, paginate, navigateProject]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
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
              className="absolute inset-0 bg-background/95"
            />
            
            {hasProjectNav && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateProject(-1); }}
                  aria-label="Previous project"
                  className="hidden lg:flex absolute left-2 xl:left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/60 hover:bg-background/90 border border-white/10 rounded-full transition-all items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); navigateProject(1); }}
                  aria-label="Next project"
                  className="hidden lg:flex absolute right-2 xl:right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-background/60 hover:bg-background/90 border border-white/10 rounded-full transition-all items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <motion.div
              key={project.slug}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
            >
              {/* Terminal View Chrome */}
              <CyberCodeWindowChrome
                title={`${project.slug}.${project.extension || "sh"}`}
                icon={<Code2 className="w-4 h-4 text-accent" />}
                showDots={true}
                onDotClick={close}
              />

              {hasProjectNav && (
                <div className="flex lg:hidden items-center justify-between border-b border-border bg-white/5 px-4 py-2">
                  <button
                    onClick={() => navigateProject(-1)}
                    className="flex items-center gap-1 text-xs font-mono text-muted hover:text-accent transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Prev
                  </button>
                  <span className="text-[10px] font-mono text-muted/60">
                    {projectIndex + 1} / {projectList.length}
                  </span>
                  <button
                    onClick={() => navigateProject(1)}
                    className="flex items-center gap-1 text-xs font-mono text-muted hover:text-accent transition-colors"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
                {/* Image Section */}
                <div className="md:w-3/5 bg-muted/20 relative overflow-hidden flex flex-col border-r border-border">
                  <div className="flex-1 relative overflow-hidden group">
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.div
                        key={activeIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0"
                      >
                        {project.images?.[activeIndex] ? (
                          <div className="w-full h-full relative cursor-zoom-in" onClick={() => setIsFullscreen(true)}>
                            {/* We only use layoutId for the image that is NOT currently being animated out */}
                            <motion.img
                              layoutId={!isFullscreen ? `project-image-${project.slug}-${activeIndex}` : undefined}
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
                                className="p-3 bg-black border border-white/50 rounded-xl text-white shadow-none hover:scale-110 transition-transform flex items-center gap-2"
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
                          onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/60 hover:bg-background/80 border border-white/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); paginate(1); }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/60 hover:bg-background/80 border border-white/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnail bar */}
                  {project.images && project.images.length > 1 && (
                    <div className="flex gap-2 p-4 border-t border-border overflow-x-auto bg-background/50">
                      {project.images.map((img, idx) => (
                        <button
                          key={img}
                          onClick={() => {
                            setDirection(idx > activeIndex ? 1 : -1);
                            setActiveIndex(idx);
                          }}
                          className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                            idx === activeIndex ? "border-accent scale-95" : "border-border/50 hover:border-border scale-100"
                          }`}
                        >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="md:w-2/5 p-[6px] overflow-y-auto flex flex-col">
                  <div className="space-y-4 flex-1">
                      <CyberCodeTerminalWindow title="details.data" showDots={false}>
                        <div className="font-mono text-sm space-y-2">
                          <div>
                            <span className="text-muted">Title:</span> <span className="text-foreground font-bold">{project.title}</span>
                          </div>
                          {project["public-url"] && (
                            <div className="truncate">
                              <span className="text-muted">URL:</span>{" "}
                              <a
                                href={project["public-url"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                              >
                                {project["public-url"]}
                              </a>
                            </div>
                          )}
                          <div>
                            <span className="text-muted">Year:</span> <span className="text-accent">{project.year}</span>
                          </div>
                          {project.wip && (
                            <div>
                              <span className="text-muted">Status:</span>{" "}
                              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-500 text-[8px] font-bold uppercase tracking-wider border border-amber-500/20">
                                UnderConstruction
                              </span>
                            </div>
                          )}
                          <div className="pt-2 border-t border-border/30">
                            <span className="text-muted block mb-1">Desc:</span>
                            <p className="text-muted leading-relaxed">{project.description}</p>
                          </div>
                        </div>
                      </CyberCodeTerminalWindow>
                      {(project["public-url"] || project["original-url"]) && (
                        <CyberCodeTerminalWindow title="source.links" showDots={false}>
                          <div className="flex flex-wrap gap-2">
                            {project["public-url"] && (
                              <a
                                href={project["public-url"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-mini"
                                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                              >
                                {project["original-url"] ? "Live Site" : "View"}
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                            {project["original-url"] && (
                              <a
                                href={project["original-url"]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-mini"
                                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                              >
                                Original
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                            {project["original-url"] &&
                              project["public-url"]?.includes("github.com") && (
                                <a
                                  href={project["public-url"]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-mini"
                                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                                >
                                  Source
                                  <IconBrandGithub className="w-2.5 h-2.5" />
                                </a>
                              )}
                          </div>
                        </CyberCodeTerminalWindow>
                      )}
                      {project.skills && (
                        <CyberCodeTerminalWindow title="stack.env" showDots={false}>
                          <div className="overflow-hidden w-full relative">
                             <style>{`
                               @keyframes cc-marquee {
                                 0% { transform: translateX(0); }
                                 100% { transform: translateX(-33.333%); }
                               }
                               .cc-marquee-inner {
                                 display: flex;
                                 gap: 8px;
                                 width: max-content;
                                 animation: cc-marquee 20s linear infinite;
                               }
                               .cc-marquee-inner:hover {
                                 animation-play-state: paused;
                               }
                             `}</style>
                             <div className="overflow-hidden w-full py-0.5">
                               <div className="cc-marquee-inner flex items-center">
                                  {[...project.skills, ...project.skills, ...project.skills].map((skill, idx) => (
                                    <React.Fragment key={`${skill}-${idx}`}>
                                      {idx > 0 && <span className="text-muted/40 px-1 font-mono text-xs">|</span>}
                                      <span className="py-1 text-xs font-mono text-muted-foreground whitespace-nowrap flex-shrink-0">
                                        {skill}
                                      </span>
                                    </React.Fragment>
                                  ))}
                               </div>
                             </div>
                          </div>
                        </CyberCodeTerminalWindow>
                      )}

                      {project.body && (
                        <CyberCodeTerminalWindow title="context.md" showDots={false}>
                          <div 
                             className="text-sm text-muted leading-relaxed prose prose-invert prose-sm max-w-none"
                             dangerouslySetInnerHTML={{ __html: project.body }}
                          />
                        </CyberCodeTerminalWindow>
                      )}

                      {project.beforeAfter && (
                        <CyberCodeTerminalWindow title="transformation.diff" showDots={false}>
                           {project.beforeAfter.before.image && project.beforeAfter.after.image && (
                             <BeforeAfterSlider 
                               beforeImage={project.beforeAfter.before.image}
                               afterImage={project.beforeAfter.after.image}
                               beforeLabel={project.beforeAfter.before.title}
                               afterLabel={project.beforeAfter.after.title}
                               className="mb-6"
                             />
                           )}

                           <div className="grid grid-cols-1 gap-4">
                              <div className="p-4 rounded-none bg-red-500/5 border border-red-500/80">
                                 <span className="text-[9px] font-bold uppercase tracking-widest text-red-500/80 mb-2 block">Before</span>
                                 <h5 className="text-sm font-medium mb-1">{project.beforeAfter.before.title}</h5>
                                 <p className="text-xs text-muted leading-relaxed">{project.beforeAfter.before.description}</p>
                              </div>
                              <div className="p-4 rounded-none bg-accent/5 border border-accent">
                                 <span className="text-[9px] font-bold uppercase tracking-widest text-accent mb-2 block">After</span>
                                 <h5 className="text-sm font-medium mb-1">{project.beforeAfter.after.title}</h5>
                                 <p className="text-xs text-muted leading-relaxed">{project.beforeAfter.after.description}</p>
                              </div>
                           </div>
                        </CyberCodeTerminalWindow>
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
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12 overflow-hidden"
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
                className="max-w-full max-h-full object-contain rounded-sm cursor-zoom-out"
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
                    onClick={(e) => { e.stopPropagation(); paginate(-1); }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 p-6 text-white/20 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-12 h-12" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); paginate(1); }}
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
