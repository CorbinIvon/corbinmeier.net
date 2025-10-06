"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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

export default function ProjectCard({
  project,
  href,
  onClick,
  className,
}: {
  project: Project;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}) {
  const content = (
    <>
      <div className="relative h-40 bg-gray-100 dark:bg-gray-900">
        <Image
          src={project.images?.[0] ?? "/next.svg"}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {(project["public-url"] || "").includes("github.com") && (
          <div className="absolute left-3 bottom-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 flex items-center justify-center shadow-md">
            <Image
              src={
                "https://edent.github.io/SuperTinyIcons/images/svg/github.svg"
              }
              alt={`${project.title} GitHub`}
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold mb-1">{project.title}</h3>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </div>
    </>
  );

  const baseClass =
    (className ?? "") +
    " group block text-left border rounded-lg overflow-hidden p-0 bg-transparent";

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type="button" className={baseClass}>
      {content}
    </button>
  );
}
