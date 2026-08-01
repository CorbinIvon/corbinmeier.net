import SeoHead from "@/components/SeoHead";
import PageShell from "@/components/PageShell";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";
import { about } from "@/data/about";
import {
  CyberCodeTerminalWindow,
  CyberCodeTerminalLine,
  CyberCodeBlinkCursor,
} from "@/components/cybercode/CyberCodeUIKit";

export default function About() {
  return (
    <PageShell>
      <SeoHead
        title="About | Corbin Meier"
        description="A journey from theoretical computer science to hands-on software architecture, driven by a relentless pursuit of digital craftsmanship."
        path="/about"
      />
      <main className="page-container">
        <header className="w-full mb-12 text-left">
          <CyberCodeTerminalLine prompt=">" className="mb-2">
            cat /profile/about.dat
          </CyberCodeTerminalLine>
          <h1 className="text-h1 font-serif mb-6">{about.heroHeading}</h1>
          <p className="text-narrative">
            {about.heroSubhead}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-16">
            <CyberCodeTerminalWindow title="corbin.jpg" icon={<Terminal className="w-3 h-3" />} collapsible>
              <div className="relative aspect-square -m-6 overflow-hidden">
                <img
                  src="/corbin.jpg"
                  alt="Corbin Meier"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </CyberCodeTerminalWindow>
            <CyberCodeTerminalWindow
              title="whoami.sh"
              icon={<Terminal className="w-3 h-3" />}
              showDots={false}
              className="mt-6"
            >
              <CyberCodeTerminalLine output className="mb-0">
                <span className="text-accent">{about.sidebarLabel}</span>
              </CyberCodeTerminalLine>
              <div className="h-px bg-border w-full my-3" />
              <CyberCodeTerminalLine output className="mb-0 italic">
                &quot;{about.sidebarQuote}&quot;
                <CyberCodeBlinkCursor className="ml-1" />
              </CyberCodeTerminalLine>
            </CyberCodeTerminalWindow>
          </div>

          <div className="lg:col-span-8 text-foreground">
            {about.sections.map((section, i) => (
              <CyberCodeTerminalWindow
                key={section.heading}
                title={`LOG_${String(i + 1).padStart(2, "0")}.log`}
                icon={<Terminal className="w-3 h-3" />}
                showDots={false}
                className={section.panelClassName ?? "mb-12"}
              >
                <h2 className={section.headingClassName ?? "text-h2 font-mono mb-6"}>{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`text-lg text-muted-foreground leading-relaxed${index < section.paragraphs.length - 1 ? " mb-6" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </CyberCodeTerminalWindow>
            ))}

            <CyberCodeTerminalWindow title="EOF" icon={<Terminal className="w-3 h-3" />} showDots={false} className="text-left">
              <h2 className={about.closingSection.headingClassName}>{about.closingSection.heading}</h2>
              <p className="text-muted-foreground mb-6">
                {about.closingSection.paragraphs[0]}{" "}
                <span className="font-bold text-foreground underline decoration-accent decoration-2 underline-offset-4">{about.closingSection.boldFragment}</span>{" "}
                {about.closingSection.paragraphs[1]}
              </p>
              <CyberCodeTerminalLine prompt=">" className="mb-4">
                initiate_contact --propose
                <CyberCodeBlinkCursor className="ml-1" />
              </CyberCodeTerminalLine>
              <div className="flex justify-start">
                <Link
                  to={about.closingSection.ctaHref}
                  className="group inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
                >
                  {about.closingSection.ctaLabel}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </CyberCodeTerminalWindow>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
