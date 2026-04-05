import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import FeaturedProjects from "@/components/FeaturedProjects";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div className="relative overflow-hidden font-sans min-h-screen px-4 py-8 sm:px-8 sm:py-20">
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/20 dark:to-violet-900/20 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <main className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        <Hero />
        <Services />
        <HowItWorks />
        <FeaturedProjects />
        <CTA />
      </main>
    </div>
  );
}
