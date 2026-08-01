
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Code2,
  TrendingUp,
  Search,
  Mail,
  CreditCard,
  AtSign,
  Zap,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { servicesSection } from "@/data/services";
import type { ServiceItem } from "@/data/types";
import { CyberCodeSectionLabel } from "@/components/cybercode/CyberCodeUIKit";

const ICONS: Record<ServiceItem["icon"], LucideIcon> = {
  Globe,
  Code2,
  TrendingUp,
  Search,
  Mail,
  CreditCard,
  AtSign,
  Zap,
  Brain,
};

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
      <div className="max-w-3xl mb-10 sm:mb-16 mx-auto sm:mx-0 text-center sm:text-left">
        <h2 className="text-4xl sm:text-5xl font-serif mb-6">{servicesSection.headingPre} <span className="text-accent italic">{servicesSection.headingAccent}</span></h2>
        <p className="text-narrative">
          {servicesSection.intro}
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {servicesSection.items.map((s) => {
          const Icon = ICONS[s.icon];
          const Content = (
            <>
              <CyberCodeSectionLabel>{`// services.${s.id}`}</CyberCodeSectionLabel>
              <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-3">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
              {s.link && (
                <div className="mt-6 flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-widest">
                  Learn more
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              )}
            </>
          );

          if (s.link) {
            return (
              <motion.div
                key={s.id}
                variants={item}
              >
                <Link
                  to={s.link}
                  className="relative glass-panel p-8 group hover:border-accent/30 transition-all duration-300 block h-full"
                >
                  {Content}
                </Link>
              </motion.div>
            );
          }

          return (
            <motion.div
              key={s.id}
              variants={item}
              className="relative glass-panel p-8 group hover:border-accent/30 transition-all duration-300"
            >
              {Content}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  );
}
