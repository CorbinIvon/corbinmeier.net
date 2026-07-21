
import { motion } from "framer-motion";
import { 
  Globe, 
  Code2, 
  TrendingUp, 
  Search, 
  Mail, 
  CreditCard, 
  AtSign, 
  Zap 
} from "lucide-react";

const services = [
  {
    id: "websites",
    title: "The Foundation",
    desc: "Custom high-performance websites, quoted to your project, that outperform Wix/Squarespace in speed, SEO, and flexibility. Once live, a static site with a contact form is free to host — you only pay for your domain, no monthly fee unless you add a database or premium feature.",
    icon: Globe,
  },
  {
    id: "apps",
    title: "Growth Tier",
    desc: "Bespoke booking systems, client portals, and custom lead-capture flows designed to automate your specific business operations.",
    icon: Code2,
  },
  {
    id: "growth",
    title: "Automation Tier",
    desc: "Connect your digital presence to your real-world operations with custom API integrations, POS sync, and reporting dashboards.",
    icon: TrendingUp,
  },
  {
    id: "seo",
    title: "Search Authority",
    desc: "Data-driven SEO auditing and keyword strategy, built on a high-performance React and Cloudflare foundation for superior crawlability and local search dominance.",
    icon: Search,
  },
  {
    id: "automations",
    title: "Email & Lead Flow",
    desc: "Robust, reliable communication channels with custom automation. Turn anonymous visitors into loyal clients automatically.",
    icon: Mail,
  },
  {
    id: "payments",
    title: "Global Commerce",
    desc: "Scale without limits. Secure, custom-integrated payment processing and subscription billing tailored to your workflow.",
    icon: CreditCard,
  },
  {
    id: "performance",
    title: "Digital Infrastructure",
    desc: "Deep tech-stack advisory and consulting. Environment provisioning and troubleshooting for systems that cannot afford to fail.",
    icon: Zap,
  },
  {
    id: "it-support",
    title: "Managed Evolution",
    desc: "Professional management and maintenance. I handle the complexity so you can focus on running your business.",
    icon: AtSign,
  },
];

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const item: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section-container bg-muted/30">
      <div className="max-w-3xl mb-10 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl font-serif mb-6">A Tiered Strategy for <span className="text-accent italic">Success.</span></h2>
        <p className="text-narrative">
          Stop fighting complex tools alone. I serve as your dedicated digital contractor, 
          handling the engineering so you can focus on your business. My mission is simple: 
          to support my family by ensuring your business succeeds.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {services.map((s) => (
          <motion.div
            key={s.id}
            variants={item}
            className="glass-panel p-8 group hover:border-accent/30 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <s.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-medium mb-3">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
