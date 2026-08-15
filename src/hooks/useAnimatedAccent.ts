import { useEffect, useRef } from "react";
import { animate, useMotionValue } from "framer-motion";
import { accentForPath, bellEase } from "@/lib/theme";

// Animates a color motion value from the previous route's accent to the
// current route's accent along a bell-curve (slow -> fast -> slow) easing
// curve whenever the pathname changes.
export function useAnimatedAccent(pathname: string) {
  const color = useMotionValue(accentForPath(pathname));
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current === pathname) return;
    prevPathname.current = pathname;
    const controls = animate(color, accentForPath(pathname), {
      duration: 0.6,
      ease: bellEase,
    });
    return () => controls.stop();
  }, [pathname, color]);

  return color;
}
