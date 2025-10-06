import Hero from "@/components/Hero";
import EducationStrip from "@/components/EducationStrip";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="font-sans min-h-screen px-4 py-8 sm:px-8 sm:py-20">
      <main className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        <Hero />
        <EducationStrip />
        <Services />
        <FeaturedProjects />
        <CTA />
      </main>
    </div>
  );
}
