import { useEffect } from "react";
import { animate } from "framer-motion";
import { THEMES, bellEase, colorToRgbTriplet, paletteForTheme, type ThemeName } from "@/lib/theme";

const CSS_VARS = {
  accent: "--accent",
  background: "--background",
  cardBg: "--card-bg",
  border: "--border",
  inputBg: "--input-bg",
} as const;

// Drives the site's global palette (background, accent, card, border, input)
// as live CSS custom properties on <html>, tweening every themed color from
// the previous page's palette to the new one along a bell-curve ease instead
// of snapping instantly. Any element referencing these vars — nav, cards,
// glows, borders — transitions automatically.
export function useThemeTransition(theme: ThemeName) {
  const palette = paletteForTheme(theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-contact", theme === "contact");

    // No "already applied" short-circuit here: under React 18 StrictMode,
    // effects run, clean up, then run again before the first frame paints.
    // A ref-based skip would have the first (soon-cancelled) run mark the
    // palette as applied before any onUpdate fired, causing the real second
    // run to skip animating entirely. Reading the live CSS var as `from`
    // instead makes a same-palette re-run a cheap no-op naturally.
    const target = THEMES[palette];
    const controls = (Object.keys(CSS_VARS) as (keyof typeof CSS_VARS)[]).map((key) => {
      const cssVar = CSS_VARS[key];
      const from = getComputedStyle(root).getPropertyValue(cssVar).trim() || target[key];
      return animate(from, target[key], {
        duration: 0.6,
        ease: bellEase,
        onUpdate: (latest) => {
          root.style.setProperty(cssVar, latest);
          if (key === "accent") root.style.setProperty("--accent-rgb", colorToRgbTriplet(latest));
        },
      });
    });

    return () => controls.forEach((c) => c.stop());
  }, [palette, theme]);
}
