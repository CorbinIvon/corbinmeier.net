import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { THEMES, bellEase, colorToRgbTriplet, paletteForTheme, type PaletteName, type ThemeName } from "@/lib/theme";

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
  const prevPalette = useRef<PaletteName | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-contact", theme === "contact");

    if (prevPalette.current === palette) return;
    prevPalette.current = palette;

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
