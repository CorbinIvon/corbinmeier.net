import { useEffect, useRef, useState } from "react";

/**
 * Reusable behavior hooks backing the CyberCode UI Kit's animated pieces:
 * typewriter text, count-up numbers, and scroll-triggered reveals.
 */

/** Types out `text` one character at a time. Returns the current substring. */
export function useTypewriter(text: string, speedMs = 55, enabled = true): string {
  const [output, setOutput] = useState(enabled ? "" : text);

  useEffect(() => {
    if (!enabled) {
      setOutput(text);
      return;
    }

    setOutput("");
    let index = 0;
    let timer: ReturnType<typeof window.setTimeout>;

    const tick = () => {
      index += 1;
      setOutput(text.slice(0, index));
      if (index < text.length) {
        timer = window.setTimeout(tick, speedMs);
      }
    };

    timer = window.setTimeout(tick, speedMs);
    return () => window.clearTimeout(timer);
  }, [text, speedMs, enabled]);

  return output;
}

/** Counts up from 0 to `target` once the returned ref scrolls into view. */
export function useAnimatedCounter(target: number, options: { enabled?: boolean } = {}) {
  const { enabled = true } = options;
  const [ref, visible] = useRevealOnScroll<HTMLElement>({ threshold: 0.6, once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (!enabled) {
      setValue(target);
      return;
    }

    const step = Math.max(1, Math.ceil(target / 80));
    let current = 0;
    let frame: number;

    const tick = () => {
      current = Math.min(target, current + step);
      setValue(current);
      if (current < target) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [visible, target, enabled]);

  return { ref, value };
}

/** Tracks whether an element has entered the viewport, via IntersectionObserver. */
export function useRevealOnScroll<T extends HTMLElement>(
  options: { threshold?: number; once?: boolean } = {}
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.2, once = true } = options;
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, visible];
}
