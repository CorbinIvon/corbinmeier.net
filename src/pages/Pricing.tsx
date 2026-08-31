import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { Terminal, Check, Info, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import SeoHead from "@/components/SeoHead";
import {
  CyberCodeTerminalLine,
  CyberCodeTerminalWindow,
} from "@/components/cybercode/CyberCodeUIKit";
import { pricing } from "@/data/pricing";
import type { PricingLineItem } from "@/data/types";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Price chips carry the numbers, so they stay scannable when someone is
 *  skimming for cost rather than reading the responsibility copy. */
function PriceChips({ upfront, recurring }: Pick<PricingLineItem, "upfront" | "recurring">) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-serif text-2xl text-accent">{upfront}</span>
      {recurring && (
        <span className="text-sm text-muted">
          then <span className="text-foreground">{recurring}</span>
        </span>
      )}
    </div>
  );
}

function LineItemCard({ entry }: { entry: PricingLineItem }) {
  return (
    <motion.div
      variants={item}
      className="glass-panel p-6 flex flex-col gap-4 h-full hover:border-accent/30 transition-colors duration-300"
    >
      <div className="flex flex-col gap-2">
        <h4 className="text-h3 font-serif">{entry.name}</h4>
        <PriceChips upfront={entry.upfront} recurring={entry.recurring} />
      </div>

      <p className="text-sm text-muted leading-relaxed flex-1">{entry.responsibility}</p>

      {entry.prerequisite && (
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted/80 pt-1">
          Requires <span className="text-accent">{entry.prerequisite}</span>
        </p>
      )}
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <PageShell theme="teal">
      <SeoHead
        title="Pricing | Corbin Meier"
        description="Modular, value-based pricing for custom websites and web applications. A fixed foundation plus à-la-carte features, each with its cost and responsibilities clearly stated."
        path="/pricing"
      />

      <main className="page-container">
        {/* Header */}
        <motion.header
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full mb-14 text-left"
        >
          <motion.div variants={item}>
            <CyberCodeTerminalLine prompt=">" className="mb-3">
              cat ./pricing/menu.md
            </CyberCodeTerminalLine>
          </motion.div>

          <motion.p
            variants={item}
            className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4"
          >
            {pricing.eyebrow}
          </motion.p>

          <motion.h1 variants={item} className="text-h1 font-serif mb-6">
            {pricing.headingPre}{" "}
            <span className="text-accent italic">{pricing.headingAccent}</span>
          </motion.h1>

          <motion.p variants={item} className="text-narrative mb-6">
            {pricing.intro}
          </motion.p>

          <motion.div
            variants={item}
            className="glass-panel border-accent/20 p-5 flex gap-4 items-start"
          >
            <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="text-sm text-muted leading-relaxed">{pricing.ballpark}</p>
          </motion.div>
        </motion.header>

        {/* Cornerstones */}
        <section className="mb-16">
          <h2 className="text-h2 font-serif mb-8">{pricing.cornerstonesHeading}</h2>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {pricing.cornerstones.map((stone) => (
              <motion.div
                key={stone.id}
                variants={item}
                className="glass-panel p-8 flex flex-col gap-5"
              >
                <div>
                  <h3 className="text-h3 font-serif mb-3">{stone.name}</h3>
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-serif text-4xl text-accent">{stone.upfront}</span>
                    <span className="text-muted">
                      then <span className="text-foreground">{stone.recurring}</span>
                    </span>
                  </div>
                </div>

                <p className="text-narrative text-base">{stone.summary}</p>

                <ul className="space-y-3">
                  {stone.includes.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-sm text-muted">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* À-la-carte menu */}
        <section className="mb-16">
          <CyberCodeTerminalWindow
            title="menu.sh"
            icon={<Terminal className="w-3 h-3" />}
            showDots={false}
          >
            <div className="mb-10">
              <h2 className="text-h2 font-serif mb-4">
                {pricing.menuHeadingPre}{" "}
                <span className="text-accent italic">{pricing.menuHeadingAccent}</span>
              </h2>
              <p className="text-narrative">{pricing.menuIntro}</p>
            </div>

            <div className="flex flex-col gap-12">
              {pricing.groups.map((group) => (
                <div key={group.id}>
                  <div className="mb-6 pb-4 border-b border-border">
                    <h3 className="text-h3 font-serif mb-1">{group.title}</h3>
                    <p className="text-sm text-muted">{group.blurb}</p>
                  </div>

                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                  >
                    {group.items.map((entry) => (
                      <LineItemCard key={entry.id} entry={entry} />
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          </CyberCodeTerminalWindow>
        </section>

        {/* Notices */}
        <section className="mb-16">
          <h2 className="text-h2 font-serif mb-8">{pricing.noticesHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricing.notices.map((notice) => (
              <div key={notice.title} className="glass-panel p-6">
                <h3 className="font-serif text-lg mb-3 text-accent">{notice.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{notice.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass-panel p-12 text-center">
          <h2 className="text-h2 font-serif mb-6">
            {pricing.ctaHeadingPre}{" "}
            <span className="text-accent italic">{pricing.ctaHeadingAccent}</span>
          </h2>
          <p className="text-narrative mx-auto mb-10">{pricing.ctaBody}</p>
          <Link to="/contact" className="btn-artisan">
            {pricing.ctaLabel}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </section>
      </main>
    </PageShell>
  );
}
