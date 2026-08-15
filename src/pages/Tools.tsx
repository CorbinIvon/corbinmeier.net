import tools from "@/data/tools.json";
import ToolLog from "@/components/ToolLog";
import SeoHead from "@/components/SeoHead";
import PageShell from "@/components/PageShell";
import { CyberCodeTerminalLine, Typewriter } from "@/components/cybercode/CyberCodeUIKit";
import { motion, Variants } from "framer-motion";

export default function Tools() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <PageShell theme="yellow">
      <SeoHead
        title="Tools | Corbin Meier"
        description="Internal tooling built and used by Corbin Meier to speed up and sharpen the delivery of client work."
        path="/tools"
      />
      <motion.main
        variants={container}
        initial="hidden"
        animate="show"
        className="page-container"
      >
        <motion.header variants={item} className="w-full mb-16 text-left">
          <CyberCodeTerminalLine prompt=">" className="mb-2">
            <Typewriter as="span">ls -la ./tools/</Typewriter>
          </CyberCodeTerminalLine>
          <h1 className="text-h1 font-serif mb-6">
            <Typewriter as="span">Tools</Typewriter>
          </h1>
          <p className="text-narrative mb-4">
            <Typewriter as="span">
              A working directory of the tooling I build and reach for on client
              work &mdash; kept lean, kept sharp, and expanded here one entry at a time.
            </Typewriter>
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-muted">
            <Typewriter as="span">
              {tools.length} {tools.length === 1 ? "Entry" : "Entries"}
            </Typewriter>
          </p>
        </motion.header>

        <motion.section variants={item} className="w-full">
          <ToolLog tools={tools} />
        </motion.section>
      </motion.main>
    </PageShell>
  );
}
