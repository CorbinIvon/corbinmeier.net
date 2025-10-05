export default function Services() {
  const services = [
    {
      id: "websites",
      title: "Custom Websites",
      desc: "Bespoke marketing and sales sites with accessible designs and fast performance.",
    },
    {
      id: "apps",
      title: "Web Apps & Integrations",
      desc: "Custom dashboards, booking systems, or integrations with tools like Stripe and Zapier.",
    },
    {
      id: "growth",
      title: "Growth & Support",
      desc: "Ongoing support, optimization, and feature work as your business scales.",
    },
    {
      id: "seo",
      title: "SEO",
      desc: "Technical SEO audits, on-page optimization, and content recommendations to improve discoverability.",
    },
    {
      id: "automations",
      title: "Text & Email Automations",
      desc: "Automated onboarding, reminders, and marketing flows to keep customers engaged and reduce manual work.",
    },
    {
      id: "payments",
      title: "Payment Processing",
      desc: "Secure checkout flows, subscription billing, and Stripe integrations for reliable payments.",
    },
    {
      id: "email-domains",
      title: "Custom Email Domains",
      desc: "Setup and DNS configuration for professional email addresses that match your brand.",
    },
    {
      id: "performance",
      title: "Fast Performance & Analytics",
      desc: "Performance tuning, caching strategies, and lightweight analytics to measure growth without slowing the site.",
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">
        Services tailored to startups
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="w-full sm:w-[48%] md:w-[30%] p-4 border rounded-lg"
          >
            <h3 className="font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
