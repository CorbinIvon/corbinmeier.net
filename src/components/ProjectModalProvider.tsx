"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import Image from "next/image";

export type Project = {
  title: string;
  slug: string;
  year: number;
  skills?: string[];
  "public-url"?: string;
  description?: string;
  body?: string;
  images?: string[];
};

type ModalContext = {
  open: (p: Project) => void;
  close: () => void;
};

const ctx = createContext<ModalContext | null>(null);

export function useProjectModal() {
  const c = useContext(ctx);
  if (!c)
    throw new Error("useProjectModal must be used within ProjectModalProvider");
  return c;
}

export default function ProjectModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState<Project | null>(null);

  const open = useCallback((p: Project) => setActive(p), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <ctx.Provider value={{ open, close }}>
      {children}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          <div className="relative z-10 max-w-3xl w-full bg-white dark:bg-gray-900 border rounded-lg overflow-hidden shadow-xl">
            <div className="relative h-64 bg-gray-100 dark:bg-gray-800">
              <Image
                src={active.images?.[0] ?? "/next.svg"}
                alt={active.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{active.title}</h2>
                  <p className="text-sm text-muted-foreground">{active.year}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  {active["public-url"] && (
                    <a
                      href={active["public-url"]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-3 py-2 border rounded-md"
                    >
                      View
                    </a>
                  )}
                  <button
                    onClick={close}
                    className="text-sm px-3 py-2 border rounded-md"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="mt-4 prose dark:prose-invert max-w-none">
                <p>{active.description}</p>
                {active.body && (
                  <div dangerouslySetInnerHTML={{ __html: active.body }} />
                )}
              </div>

              {active.skills && active.skills.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {active.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-1 text-xs border rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ctx.Provider>
  );
}
