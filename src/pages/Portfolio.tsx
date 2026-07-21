import projects from "@/data/portfolio.json";
import PortfolioFilters from "@/components/portfolio-filters";
import BackgroundMotion from "@/components/BackgroundMotion";
import SeoHead from "@/components/SeoHead";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <SeoHead
        title="Portfolio | Corbin Meier"
        description="A deep dive into the systems, applications, and digital experiences built by Corbin Meier — each project solved through meticulous engineering and user-centric design."
        path="/portfolio"
      />
      <BackgroundMotion />
      <main className="section-container">
        <header className="max-w-3xl mb-16 mx-auto sm:mx-0 text-center sm:text-left">
          <h1 className="text-5xl sm:text-7xl font-serif mb-6 tracking-tight">Portfolio</h1>
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
          <PortfolioFilters projects={projects} />
        </section>
      </main>
    </div>
  );
}
