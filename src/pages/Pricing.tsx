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

/** Every menu item keyed by id, so a card can price its own prerequisites
 *  instead of the data file restating those numbers and drifting out of sync
 *  the next time one of them changes. */
const itemsById = new Map<string, PricingLineItem>(
  pricing.groups.flatMap((group) => group.items).map((entry) => [entry.id, entry]),
);

/** Both halves of a price as one string. A prerequisite whose real cost is the
 *  monthly rather than the build fee still has to show that monthly, or the
 *  running total a reader adds up is wrong. */
function fullCost({ upfront, recurring }: PricingLineItem) {
  return recurring ? `${upfront} + ${recurring}` : upfront;
}

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

/** Prerequisites are listed with their own prices because the card's headline
 *  number is not what the feature actually costs to reach: the Rich Text
 *  Editor reads as $400 until you notice it cannot exist without a $600 admin
 *  portal underneath it. */
function Prerequisites({ ids }: { ids: string[] }) {
  const required = ids
    .map((id) => itemsById.get(id))
    .filter((entry): entry is PricingLineItem => entry !== undefined);

  if (required.length === 0) return null;

  return (
    <div className="pt-1 flex flex-col gap-1.5">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-muted/80">Requires</p>
      <ul className="flex flex-col gap-1">
        {required.map((entry) => (
          <li
            key={entry.id}
            className="flex flex-wrap items-baseline justify-between gap-x-3 text-xs text-accent"
          >
            <span>{entry.name}</span>
            <span className="text-accent/70">{fullCost(entry)}</span>
          </li>
        ))}
      </ul>
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

      <Prerequisites ids={entry.prerequisites} />
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <PageShell theme="teal">
      <SeoHead
        title="Pricing | Corbin Meier"
        description="Custom websites from $700, built once and owned outright. Three build tiers, maintenance you can opt out of entirely, and an à-la-carte menu with every cost and responsibility stated up front."
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

        {/* Build tiers */}
        <section className="mb-16">
          <h2 className="text-h2 font-serif mb-3">{pricing.tiersHeading}</h2>
          <p className="text-narrative mb-8">{pricing.tiersIntro}</p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch"
          >
            {pricing.tiers.map((tier) => (
              <motion.div
                key={tier.id}
                variants={item}
                className={`glass-panel p-8 flex flex-col gap-5 h-full transition-colors duration-300 ${
                  tier.featured ? "border-accent/40" : "hover:border-accent/30"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-h3 font-serif">{tier.name}</h3>
                    {tier.featured && (
                      <span className="px-2 py-0.5 rounded border border-accent/30 bg-accent/10 text-accent text-[0.6rem] font-bold uppercase tracking-[0.15em]">
                        Most chosen
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted mb-4">
                    {tier.tagline}
                  </p>

                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-serif text-4xl text-accent">{tier.build}</span>
                    <span className="text-sm text-muted">one-time</span>
                  </div>
                </div>

                <p className="text-narrative text-base">{tier.summary}</p>

                <ul className="space-y-3 mt-auto">
                  {tier.includes.map((line) => (
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

        {/* Maintenance axis: offered against every tier, so it renders once
            here rather than being repeated inside each tier card. */}
        <section className="mb-16">
          <h2 className="text-h2 font-serif mb-3">{pricing.maintenanceHeading}</h2>
          <p className="text-narrative mb-8">{pricing.maintenanceIntro}</p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
          >
            {pricing.maintenanceOptions.map((option) => (
              <motion.div
                key={option.id}
                variants={item}
                className="glass-panel p-8 flex flex-col gap-5 h-full hover:border-accent/30 transition-colors duration-300"
              >
                <div>
                  <h3 className="text-h3 font-serif mb-3">{option.name}</h3>
                  <span className="font-serif text-3xl text-accent">{option.price}</span>
                </div>

                <p className="text-narrative text-base">{option.summary}</p>

                <ul className="space-y-3 mt-auto">
                  {option.points.map((line) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
