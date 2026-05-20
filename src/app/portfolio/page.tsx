import projects from "@/data/portfolio.json";
import PortfolioFilters from "@/components/portfolio-filters";
import BackgroundMotion from "@/components/BackgroundMotion";

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <BackgroundMotion />
      <main className="section-container">
        <header className="max-w-3xl mb-16">
          <h1 className="text-5xl sm:text-7xl font-serif mb-6 tracking-tight">Portfolio</h1>
          <p className="text-narrative">
            A deep dive into the systems, applications, and digital experiences 
            I&apos;ve built. Each project represents a unique challenge solved through 
            meticulous engineering and user-centric design.
          </p>
        </header>

        <section className="w-full">
          <PortfolioFilters projects={projects} />
        </section>
      </main>
    </div>
  );
}
