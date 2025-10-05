import projects from "@/data/portfolio.json";
import PortfolioFilters from "@/components/portfolio-filters";

export default function PortfolioPage() {
  return (
    <div className="font-sans min-h-screen px-4 py-8 sm:px-8 sm:py-20">
      <main className="w-full max-w-4xl mx-auto flex flex-col gap-8">
        <section className="py-6">
          <h1 className="text-3xl font-semibold mb-2">Portfolio</h1>
          <p className="text-sm text-muted-foreground">
            Selected projects and case studies.
          </p>
        </section>

        <section className="w-full">
          <PortfolioFilters projects={projects} />
        </section>
      </main>
    </div>
  );
}
