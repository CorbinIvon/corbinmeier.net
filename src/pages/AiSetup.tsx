import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Zap, DollarSign, ArrowRight, Server, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundMotion from "@/components/BackgroundMotion";

export default function AiSetup() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <BackgroundMotion />
      
      <div className="section-container relative z-10">
        {/* Hero Section */}
        <div className="max-w-4xl mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8"
          >
            <BrainCircuit className="w-4 h-4" />
            Next-Gen Infrastructure
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-serif mb-8 leading-[0.9]"
          >
            Your own AI. <br />
            <span className="text-accent italic">Direct Cloud Ownership.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-narrative max-w-2xl"
          >
            Take control of your data and your workflow. I provide the professional 
            setup to deploy private, uncensored AI environments like **Hermes** 
            directly on your own cloud infrastructure. 
          </motion.p>
        </div>

        {/* Value Propositions */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
        >
          <motion.div variants={item} className="glass-panel p-8">
            <ShieldCheck className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-serif mb-3">Total Privacy</h3>
            <p className="text-sm text-muted">Your data stays on your server. No corporate logging or external training on your sensitive business information.</p>
          </motion.div>
          <motion.div variants={item} className="glass-panel p-8">
            <DollarSign className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-serif mb-3">Direct Infrastructure</h3>
            <p className="text-sm text-muted">Avoid per-user markups. You own the access and pay only for the underlying cloud or hardware subscriptions you choose.</p>
          </motion.div>
          <motion.div variants={item} className="glass-panel p-8">
            <Zap className="w-10 h-10 text-accent mb-6" />
            <h3 className="text-xl font-serif mb-3">Uncensored Power</h3>
            <p className="text-sm text-muted">Access the full potential of open-weights models like Hermes without artificial constraints or corporate filters.</p>
          </motion.div>
        </motion.div>

        {/* Technical Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-accent/5 border border-accent/10 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 opacity-20 blueprint-bg"></div>
               <Server className="w-48 h-48 text-accent/20" />
               <Cpu className="w-24 h-24 text-accent absolute animate-pulse" />
            </div>
          </motion.div>
          
          <div>
            <h2 className="text-4xl font-serif mb-8">The <span className="text-accent italic">Hermes</span> Environment</h2>
            <p className="text-narrative mb-8">
              I leverage Hostinger's high-performance VPS infrastructure to provision 
              a robust environment capable of running the latest open-source LLMs. 
              This isn't just a chatbot—it's a private foundation for your business intelligence.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3 text-muted">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Optimized Linux VPS provisioning via Hostinger.</span>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Deployment of the Hermes environment and supporting models.</span>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Secure API access and web-based interaction layer.</span>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Security hardening and automated backup configuration.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pricing/CTA Section */}
        <div className="glass-panel p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-serif mb-6">Invest in your <span className="text-accent italic">Digital Sovereignty.</span></h2>
          <div className="flex flex-col items-center mb-10">
            <span className="text-sm uppercase tracking-widest text-accent font-bold mb-2">Standard Cloud Setup</span>
            <div className="text-6xl font-serif flex items-start">
              <span className="text-2xl mt-2">$</span>
              <span>499</span>
              <span className="text-xl self-end mb-2 text-muted">.00</span>
            </div>
            <p className="text-muted mt-4">One-time setup fee. Hostinger VPS costs billed separately.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
            <div className="p-6 rounded-2xl bg-muted/20 border border-border">
              <h4 className="font-bold mb-2">Standard Package</h4>
              <p className="text-sm text-muted">Full deployment on Hostinger VPS, model optimization, and secure access setup.</p>
            </div>
            <div className="p-6 rounded-2xl bg-muted/20 border border-border">
              <h4 className="font-bold mb-2">Custom Local Setup</h4>
              <p className="text-sm text-muted italic text-accent">Contact for Quote</p>
              <p className="text-sm text-muted">Installation on your own local hardware or office servers for maximum performance.</p>
            </div>
          </div>

          <Link to="/contact" className="btn-artisan">
            Secure your setup
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
