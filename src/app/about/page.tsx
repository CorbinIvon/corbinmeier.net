import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Corbin Meier — Chico Developer & Small Business Tech Partner",
  description: "Learn about Corbin Meier, a Chico-based developer with expertise in web development and software solutions for local small businesses. Computer Science background from Chico State and Butte College.",
};

export default function AboutPage() {
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
                I&apos;m a Chico-based developer who helps small businesses get online, look professional, and grow their customer base. You focus on running your business — I handle the technology that makes it all work seamlessly.
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                When you work with me, you get direct access to someone who understands local business challenges. No account managers, no confusing processes — just clear communication and solutions that actually work for your specific needs.
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                I&apos;ve built fleet management systems that eliminated paperwork headaches, employee portals that replaced filing cabinets, and websites that turn visitors into customers. My approach is simple: understand what you need, build it right, and make sure you can use it confidently.
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                I know what it&apos;s like to start something from scratch. I&apos;ve been in Chico most of my life, and I&apos;ve seen how hard local business owners work. Whether you&apos;re just getting started or your current website isn&apos;t bringing in customers, I&apos;d love to help.
              </p>

              <p className="mt-4 text-sm text-muted-foreground border-t pt-4">
                <strong>Background:</strong> I started at Chico State studying Computer Science, built a foundation in problem-solving and systems thinking, and earned my Associate&apos;s in Computer Programming from Butte College in 2024. I typically respond to new inquiries within 24 hours.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
