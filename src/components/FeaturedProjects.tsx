import Image from "next/image";
import projects from "@/data/portfolio.json";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">Featured projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {featured.map((p) => (
          <a
            key={p.slug}
            href={`/portfolio/${p.slug}`}
            className="group block border rounded-lg overflow-hidden"
          >
            <div className="relative h-40 bg-gray-100 dark:bg-gray-900">
              <Image
                src={p.images?.[0] ?? "/next.svg"}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
