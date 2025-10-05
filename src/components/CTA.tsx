export default function CTA() {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 text-center">
      <div className="p-8 rounded-lg bg-foreground text-background">
        <h3 className="text-2xl font-semibold mb-2">
          Ready to build something better?
        </h3>
        <p className="mb-4">
          I help startups and small businesses ship custom web solutions that
          outgrow templates.
        </p>
        <a
          className="inline-block rounded-full bg-background text-foreground px-6 py-3 font-semibold"
          href="/contact"
        >
          Get a quote
        </a>
      </div>
    </section>
  );
}
