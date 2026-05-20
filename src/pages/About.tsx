import BackgroundMotion from "@/components/BackgroundMotion";
import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <BackgroundMotion />
      <main className="section-container">
        <header className="max-w-3xl mb-16">
          <h1 className="text-5xl sm:text-7xl font-serif mb-6 tracking-tight">The Engineer</h1>
          <p className="text-narrative">
            A journey from theoretical computer science to hands-on software 
            architecture, driven by a relentless pursuit of digital craftsmanship.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 sticky top-32">
            <div className="relative aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl">
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
                 <span className="text-sm font-mono uppercase tracking-widest">Est. 2016</span>
               </div>
               <div className="h-px bg-border w-full" />
               <p className="text-sm text-muted leading-relaxed italic">
                 &quot;I build for the future, ensuring every line of code adds long-term value.&quot;
               </p>
            </div>
          </div>

          <div className="lg:col-span-8 prose prose-slate dark:prose-invert max-w-none text-foreground">
            <section className="mb-12">
              <h2 className="text-3xl font-serif mb-6">Origins & Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                My path in technology began at Chico State University in 2016. While the curriculum 
                focused heavily on theory and advanced mathematics, I found myself increasingly 
                drawn to the practical application of these concepts—the act of building 
                real-world systems that solve tangible problems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe that software engineering is a craft. It requires a balance of 
                technical rigor and creative problem-solving. Whether I&apos;m architecting 
                a high-performance API or fine-tuning a user interface, my goal is always 
                the same: to create something that is both beautiful and built to last.
              </p>
            </section>

            <section className="mb-12 glass-panel p-8 border-accent/10">
              <h2 className="text-3xl font-serif mb-6">The Human Element</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I started this business to support two things: my passion for engineering and my 
                growing family. As a father of two, I understand the value of time and the 
                importance of building something stable for the future.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In a world of &quot;do-it-yourself&quot; platforms, I offer something different: 
                a partnership. Interfacing with a human is always more efficient than struggling 
                with a new tool. Think of me as your digital contractor—someone who takes the 
                complexity off your plate so you can focus on what you do best.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My core values are rooted in my faith and my community. I don&apos;t measure success 
                in transactions, but in the success of the people I serve. When your business 
                grows, my mission is fulfilled. Your success truly is my success.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-serif mb-6">Refining the Craft</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                In 2024, I completed the Computer Programming program at Butte College. 
                This period was a pivotal &quot;deep dive&quot; into hands-on development, where I 
                honed my skills in modern tech stacks, collaborative workflows, and 
                performance engineering.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, I specialize in building sophisticated web applications for 
                startups and scaling businesses. I bridge the gap between complex 
                backend logic and elegant, user-centric frontend experiences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif mb-4 italic text-accent">Strategic Partnership</h2>
              <p className="text-muted-foreground mb-6">
                I specialize in providing high-performance, custom-engineered solutions for 
                local businesses with a <span className="font-bold text-foreground underline decoration-accent decoration-2 underline-offset-4">$0 up-front hosting/infrastructure model.</span>{" "}
                By leveraging modern edge-computing, I remove the financial barrier to 
                premium digital infrastructure.
              </p>
              <Link 
                to="/contact" 
                className="group inline-flex items-center gap-2 bg-primary text-background px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
