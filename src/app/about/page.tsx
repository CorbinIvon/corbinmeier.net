import AssociatesGrid from "@/components/AssociatesGrid";
import projects from "@/data/portfolio.json";
import Image from "next/image";

type Project = {
  title: string;
  slug: string;
  year?: number;
  description?: string;
  [key: string]: any;
};

export default function AboutPage() {
  // pull some projects for personal anecdotes
  const inventory = projects.find((p) => p.slug === "inventory-asset-system");
  const diabetes = projects.find(
    (p) => p.slug === "gestational-diabetes-assistant"
  );
  const media = projects.find((p) => p.slug === "media-control-api");

  const items = [diabetes, inventory, media].filter(Boolean) as any[];

  return (
    <div className="font-sans min-h-screen px-4 py-8 sm:px-8 sm:py-20">
      <main className="w-full max-w-3xl mx-auto flex flex-col gap-8">
        <section className="py-6">
          <h1 className="text-3xl font-semibold mb-2">About</h1>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-36 h-36 relative flex-shrink-0 rounded-full overflow-hidden">
              <Image
                src="/corbin.jpg"
                alt="Corbin"
                fill
                className="object-cover"
              />
            </div>

            <div className="text-sm text-neutral-800">
              <p className="mb-3 text-muted-foreground">
                I'm passionate about programming — building thoughtful,
                performant experiences and useful tools. I like projects that
                solve real problems and make people's lives a bit easier,
                whether that's an internal tool, a mobile app, or a weekend
                project.
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                I initially attended Chico State University in 2016 pursuing a
                Bachelor's in Science for Computer Science in hopes that I would
                be able to hone in on my interests in programming and
                algorithms. Little did I know that Computer Science was more
                about theory and mathematics than practical software
                development. After three years, and another 4 to go, the bills
                from loans and initial outbreak of Covid lead to financial
                insecurity and forced me to stop attending college. However, the
                experience provided a solid foundation in problem-solving and
                critical thinking, which has been invaluable in my career thus
                far.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                In 2023, I discovered the Computer Programming Associates
                program at Butte College and jumped at the opportunity to enroll
                in 2024. Driven by curiosity and a desire to sharpen my craft, I
                decided to pursue my associates degree in computer programming —
                excited to dive deeper into hands-on development and collaborate
                with others who share my passion and graduated by the end of
                2024.
              </p>
            </div>
          </div>
        </section>

        {/* Projects section - staggered layout */}
        <section className="py-6">
          <h2 className="text-2xl font-semibold mb-4">Selected Projects</h2>
          <div className="flex flex-col gap-8">
            {items.map((p, idx) => {
              const isOdd = idx % 2 === 1;
              // image path convention: /images/portfolio/<slug>/hero.jpg
              const imgSrc = `/images/portfolio/${p.slug}/hero.jpg`;

              return (
                <article
                  key={p.slug}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Image column */}
                  <div
                    className={
                      isOdd
                        ? "sm:col-span-5 sm:order-2"
                        : "sm:col-span-5 sm:order-1"
                    }
                  >
                    <div className="w-full h-40 relative rounded overflow-hidden bg-slate-100">
                      <Image
                        src={imgSrc}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Text column */}
                  <div
                    className={
                      isOdd
                        ? "sm:col-span-7 sm:order-1"
                        : "sm:col-span-7 sm:order-2"
                    }
                  >
                    <h3 className="font-semibold text-lg mb-1">{p.title}</h3>
                    <div className="text-sm text-muted-foreground mb-2">
                      {p.year}
                    </div>
                    <p className="text-sm mb-2">{p.description}</p>
                    {p["public-url"] && (
                      <a
                        href={p["public-url"]}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-primary underline"
                      >
                        View repo
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
