import projects from "@/data/projects.json";
import ProjectFilters from "@/components/project-filters";
import SeoHead from "@/components/SeoHead";
import PageShell from "@/components/PageShell";

export default function Projects() {
  return (
    <PageShell>
      <SeoHead
        title="Projects | Corbin Meier"
        description="A deep dive into the systems, applications, and digital experiences built by Corbin Meier — each project solved through meticulous engineering and user-centric design."
        path="/projects"
      />
      <main className="page-container">
        <header className="w-full mb-16 text-center sm:text-left">
          <h1 className="text-h1 font-serif mb-6">Projects</h1>
          <p className="text-narrative mb-4">
            A deep dive into the systems, applications, and digital experiences
            I&apos;ve built. Each project represents a unique challenge solved through
            meticulous engineering and user-centric design.
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            {projects.length} {projects.length === 1 ? "Project" : "Projects"}
          </p>
        </header>

        <section className="w-full">
          <ProjectFilters projects={projects} />
        </section>
      </main>
    </PageShell>
  );
}
