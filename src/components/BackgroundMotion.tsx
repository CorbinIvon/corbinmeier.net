"use client";

import { useEffect } from "react";

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export default function BackgroundMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const start = performance.now();

    function loop(now: number) {
      const t = (now - start) / 1000; // seconds

      // Sinusoidal offsets in percentage points
      const x1 = 10 + Math.sin(t * 0.18) * 6; // slow drift
      const y1 = 10 + Math.sin(t * 0.13 + 1) * 6;

      const x2 = 90 + Math.sin(t * 0.12 + 2) * 5;
      const y2 = 80 + Math.sin(t * 0.16 + 0.5) * 5;

      const x3 = 60 + Math.sin(t * 0.2 + 0.8) * 4;
      const y3 = 40 + Math.sin(t * 0.14 + 1.2) * 4;

      const root = document.documentElement;
      root.style.setProperty("--bg-blob-1-x", `${clamp(x1, 0, 100)}%`);
      root.style.setProperty("--bg-blob-1-y", `${clamp(y1, 0, 100)}%`);

      root.style.setProperty("--bg-blob-2-x", `${clamp(x2, 0, 100)}%`);
      root.style.setProperty("--bg-blob-2-y", `${clamp(y2, 0, 100)}%`);

      root.style.setProperty("--bg-blob-3-x", `${clamp(x3, 0, 100)}%`);
      root.style.setProperty("--bg-blob-3-y", `${clamp(y3, 0, 100)}%`);

      raf = requestAnimationFrame(loop);
    }

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return null;
}
