import type { ReactNode } from "react";
import BackgroundMotion from "@/components/BackgroundMotion";
import { cn } from "@/lib/utils";

/**
 * Shared page-level root: owns the top clearance needed to sit below the
 * fixed mobile header (removed at lg+, where the sidebar takes over instead)
 * and the ambient background layer. Every page renders exactly one of these
 * as its root instead of hand-rolling the same pt-24/pb-20/BackgroundMotion
 * boilerplate, so the padding can't drift out of sync or get doubled up by
 * a page's own inner wrapper.
 */
export default function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen pt-24 lg:pt-12 pb-20", className)}>
      <BackgroundMotion />
      {children}
    </div>
  );
}
