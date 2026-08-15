// Per-route accent colors, mirroring the .theme-* classes in globals.css.
export const NAV_ACCENTS: Record<string, string> = {
  "/": "#3b82f6",
  "/projects": "#10b981",
  "/tools": "#eab308",
  "/about": "#ef4444",
};

export const DEFAULT_ACCENT = "#3b82f6";

export function accentForPath(pathname: string): string {
  return NAV_ACCENTS[pathname] ?? DEFAULT_ACCENT;
}

// A symmetric ease-in-out curve — velocity ramps up then back down like a
// bell curve, rather than the linear pace of a default CSS transition.
export const bellEase: [number, number, number, number] = [0.65, 0, 0.35, 1];
