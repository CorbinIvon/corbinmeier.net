import Hero from "@/components/Hero";
import EducationStrip from "@/components/EducationStrip";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTA from "@/components/CTA";
import BackgroundMotion from "@/components/BackgroundMotion";
import SeoHead from "@/components/SeoHead";

export default function Home() {
  return (
    <div className="relative min-h-screen pt-24 pb-12 sm:pb-20">
      <SeoHead
        title="Corbin Meier | Software Engineer"
        description="Software Engineer specializing in building sophisticated, high-performance applications."
        path="/"
      />
      <BackgroundMotion />
      <main className="flex flex-col">
        <Hero />
        <EducationStrip />
        <FeaturedProjects />
        <Services />
        <CTA />
      </main>
    </div>
  );
}
