import { createContext, useContext } from "react";
import type { Project } from "./ProjectCard";

// Kept apart from the provider component so that module exports only components,
// which is what React Fast Refresh needs to hot-reload it.
export interface ProjectModalContextType {
  isOpen: boolean;
  project: Project | null;
  open: (project: Project, list?: Project[]) => void;
  close: () => void;
}

export const ProjectModalContext = createContext<ProjectModalContextType | undefined>(undefined);

export const useProjectModal = () => {
  const context = useContext(ProjectModalContext);
  if (!context) throw new Error("useProjectModal must be used within ProjectModalProvider");
  return context;
};
