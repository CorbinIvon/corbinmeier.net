import BackgroundMotion from "@/components/BackgroundMotion";
import SeoHead from "@/components/SeoHead";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { about } from "@/data/about";
import { CyberCodeSectionLabel } from "@/components/cybercode/CyberCodeUIKit";

export default function About() {
  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <SeoHead
        title="About | Corbin Meier"
        description="A journey from theoretical computer science to hands-on software architecture, driven by a relentless pursuit of digital craftsmanship."
        path="/about"
      />
      <BackgroundMotion />
      <main className="section-container">
        <header className="max-w-3xl mb-16 mx-auto sm:mx-0 text-center sm:text-left">
          <h1 className="text-5xl sm:text-7xl font-serif mb-6 tracking-tight">{about.heroHeading}</h1>
          <p className="text-narrative">
            {about.heroSubhead}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-border">
              <CyberCodeSectionLabel>// about.jpg</CyberCodeSectionLabel>
              <img
                src="/corbin.jpg"
                alt="Corbin Meier"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="mt-8 flex flex-col gap-4">
               <div className="flex items-center gap-3 text-muted">
                 <Terminal className="w-4 h-4 text-accent" />
                 <span className="text-sm font-mono uppercase tracking-widest">{about.sidebarLabel}</span>
               </div>
               <div className="h-px bg-border w-full" />
               <p className="text-sm text-muted leading-relaxed italic">
                 &quot;{about.sidebarQuote}&quot;
               </p>
            </div>
          </div>

          <div className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none text-foreground">
            {about.sections.map((section) => (
              <section key={section.heading} className={section.panelClassName ?? "mb-12"}>
                <h2 className={section.headingClassName ?? "text-3xl font-serif mb-6"}>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-lg text-muted-foreground leading-relaxed${index < section.paragraphs.length - 1 ? " mb-6" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <section className="text-center sm:text-left">
              <h2 className={about.closingSection.headingClassName}>{about.closingSection.heading}</h2>
              <p className="text-muted-foreground mb-6">
                {about.closingSection.paragraphs[0]}{" "}
                <span className="font-bold text-foreground underline decoration-accent decoration-2 underline-offset-4">{about.closingSection.boldFragment}</span>{" "}
                {about.closingSection.paragraphs[1]}
              </p>
              <div className="flex justify-center sm:justify-start">
                <Link
                  to={about.closingSection.ctaHref}
                  className="group inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                >
                  {about.closingSection.ctaLabel}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
