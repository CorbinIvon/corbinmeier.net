import Hero from "@/components/Hero";
import EducationStrip from "@/components/EducationStrip";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTA from "@/components/CTA";
import BackgroundMotion from "@/components/BackgroundMotion";

export default function Home() {
  return (
    <div className="relative min-h-screen pt-24 pb-20">
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
