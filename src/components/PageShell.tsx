import { useEffect, type ReactNode } from "react";
import BackgroundMotion from "@/components/BackgroundMotion";
import { cn } from "@/lib/utils";

/**
 * Shared page-level root: owns the top clearance needed to sit below the
 * fixed mobile header and the ambient background layer. Every page renders exactly one of these
 * as its root, applying the appropriate page theme to the document element.
 */
export default function PageShell({
  children,
  className,
  theme = "blue",
}: {
  children: ReactNode;
  className?: string;
  theme?: "blue" | "green" | "red" | "yellow" | "contact";
}) {
  useEffect(() => {
    document.documentElement.classList.remove("theme-blue", "theme-green", "theme-red", "theme-yellow", "theme-contact");
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <div className={cn("relative min-h-screen pt-16 lg:pt-6 pb-10", className)}>
      <BackgroundMotion />
      {children}
    </div>
  );
}
