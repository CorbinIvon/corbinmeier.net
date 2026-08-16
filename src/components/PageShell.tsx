import type { ReactNode } from "react";
import BackgroundMotion from "@/components/BackgroundMotion";
import ErrorBoundary from "@/components/ErrorBoundary";
import { cn } from "@/lib/utils";
import { useThemeTransition } from "@/hooks/useThemeTransition";
import type { ThemeName } from "@/lib/theme";

/**
 * Shared page-level root: owns the top clearance needed to sit below the
 * fixed mobile header and the ambient background layer. Every page renders exactly one of these
 * as its root, smoothly transitioning the document's color palette to match.
 */
export default function PageShell({
  children,
  className,
  theme = "blue",
}: {
  children: ReactNode;
  className?: string;
  theme?: ThemeName;
}) {
  useThemeTransition(theme);

  return (
    <div className={cn("relative min-h-screen pt-16 lg:pt-6 pb-10", className)}>
      {/* Purely ambient, and the layer most likely to hit an engine-specific
          compositing bug — so it fails to nothing rather than to a blank page. */}
      <ErrorBoundary label="BackgroundMotion">
        <BackgroundMotion />
      </ErrorBoundary>
      {children}
    </div>
  );
}
