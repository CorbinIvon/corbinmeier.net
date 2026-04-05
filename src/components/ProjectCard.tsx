"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "react-tailwind-framework";
import { projectCardStyles } from "@/styles/theme";

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
      <div className={projectCardStyles.imageWrapper}>
        <Image
          src={project.images?.[0] ?? "/next.svg"}
          alt={project.title}
          fill
          className={projectCardStyles.image}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {(project["public-url"] || "").includes("github.com") && (
          <div className={projectCardStyles.githubBadge}>
            <Image
              src="https://edent.github.io/SuperTinyIcons/images/svg/github.svg"
              alt={`${project.title} GitHub`}
              width={16}
              height={16}
              className="object-contain"
            />
          </div>
        )}
      </div>
      <div className={projectCardStyles.body}>
        <h3 className={projectCardStyles.title}>{project.title}</h3>
        <p className={projectCardStyles.description}>{project.description}</p>
      </div>
    </>
  );

  const baseClass = (className ?? "") + " " + projectCardStyles.base;

  if (href) {
    return (
      <Card styles={{ base: baseClass }}>
        <Link href={href} className="block">
          {content}
        </Link>
      </Card>
    );
  }

  return (
    <Card styles={{ base: baseClass }}>
      <button onClick={onClick} type="button" className="block text-left w-full">
        {content}
      </button>
    </Card>
  );
}
