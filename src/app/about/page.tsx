import projects from "@/data/portfolio.json";
import Image from "next/image";

type Project = {
  title: string;
  slug: string;
  year?: number;
  description?: string;
  "public-url"?: string;
};

export default function AboutPage() {
  // pull some projects for personal anecdotes
  const inventory = projects.find((p) => p.slug === "inventory-asset-system");
  const diabetes = projects.find(
    (p) => p.slug === "gestational-diabetes-assistant"
  );
  const media = projects.find((p) => p.slug === "media-control-api");

  const items = [diabetes, inventory, media].filter(Boolean) as Project[];

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
                I&apos;m passionate about programming — building thoughtful,
                performant experiences and useful tools. I like projects that
                solve real problems and make people&apos;s lives a bit easier,
                whether that&apos;s an internal tool, a mobile app, or a weekend
                project.
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                I initially attended Chico State University in 2016 pursuing a
                Bachelor&apos;s in Science for Computer Science in hopes that I
                would be able to hone in on my interests in programming and
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
                In 2023, I learned about the Computer Programming Associates
                program at Butte College and jumped at the opportunity to enroll
                in 2024. Driven by curiosity and a desire to sharpen my craft, I
                decided to pursue my associates degree in computer programming —
                excited to dive deeper into hands-on development and collaborate
                with others who share my passion and graduated by the end of
                2024.
              </p>

              <div className="mt-6 text-white">
                See the{" "}
                <a href="/global-clicks" className="decoration underline">
                  global click counter
                </a>{" "}
                for a small project demo demonstrating a simple API with Next.js
                and serverless functions.
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
