export default function Hero() {
  return (
    <section className="w-full max-w-4xl mx-auto text-center sm:text-left">
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
        Build a better web presence for your business — fast, scalable, and
        custom.
      </h1>
      <p className="text-lg text-muted-foreground mb-6">
        I design and build accessible, high-performance websites and web apps
        tailored for startups and small businesses. More capability than a
        WYSIWYG site — professional layouts, integrations, and growth-ready
        code.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
        <a
          className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-5 py-3 font-semibold"
          href="/contact"
        >
          Start a project
        </a>
        <a
          className="inline-flex items-center justify-center rounded-full border border-solid border-foreground px-5 py-3 font-medium"
          href="/portfolio"
        >
          View portfolio
        </a>
      </div>
    </section>
  );
}
