import React, { useState, useEffect, useRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface LazyImageProps extends Omit<HTMLMotionProps<"img">, "onLoad" | "onError"> {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallbackIcon?: React.ReactNode;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  className = "",
  imgClassName = "w-full h-full object-cover",
  fallbackIcon,
  priority = false,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerLoad = () => {
      const loadCallback = () => {
        setIsInView(true);
      };
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.requestIdleCallback(loadCallback);
      } else {
        setTimeout(loadCallback, 0);
      }
    };

    if (priority) {
      triggerLoad();
      return;
    }

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      triggerLoad();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerLoad();
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Loads the next thing on the page slightly before it scrolls into view
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Reset loaded/error state when src changes (e.g. inside a modal carousel)
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
    >
      {/* Cyberpunk Spinner - shows while loading */}
      {!isLoaded && !error && isInView && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/5 backdrop-blur-sm z-10">
          <div className="relative flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
            <div className="absolute w-8 h-8 rounded-full border border-accent/40 animate-ping opacity-40 scale-75" />
          </div>
        </div>
      )}

      {/* Fallback Icon on Error */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 text-muted-foreground/50">
          {fallbackIcon || (
            <svg
              className="w-8 h-8 opacity-40 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>
      )}

      {/* Render actual image once in view */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={imgClassName}
          {...props}
        />
      )}
    </div>
  );
}
