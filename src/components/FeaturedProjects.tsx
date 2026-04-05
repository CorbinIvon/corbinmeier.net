"use client";

import projects from "@/data/portfolio.json";
import ProjectCard from "./ProjectCard";
import { useProjectModal } from "./ProjectModalProvider";
import { Section, Grid, Typography } from "react-tailwind-framework";
import { featuredProjectsStyles } from "@/styles/theme";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  const { open } = useProjectModal();
  return (
    <Section styles={{ base: featuredProjectsStyles.section }}>
      <Typography as="h2" styles={{ h2: featuredProjectsStyles.title }}>
        Featured projects
      </Typography>
      <Grid styles={{ base: featuredProjectsStyles.grid }}>
        {featured.map((p) => (
          <div key={p.slug}>
            <ProjectCard project={p} onClick={() => open(p)} />
          </div>
        ))}
      </Grid>
    </Section>
  );
}
