import Hero from "@/components/Hero";
import EducationStrip from "@/components/EducationStrip";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTA from "@/components/CTA";
import SeoHead from "@/components/SeoHead";
import PageShell from "@/components/PageShell";

export default function Home() {
  return (
    <PageShell theme="blue">
      <SeoHead
        title="Corbin Meier | Software Engineer"
        description="Software Engineer specializing in building sophisticated, high-performance applications."
        path="/"
      />
      <main className="flex flex-col">
        <Hero />
        <EducationStrip />
        <FeaturedProjects />
        <Services />
        <CTA />
      </main>
    </PageShell>
  );
}
