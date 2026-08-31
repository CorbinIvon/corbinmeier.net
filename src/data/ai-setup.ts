import type { AiSetupContent } from "./types";

export const aiSetup: AiSetupContent = {
  eyebrow: "Next-Gen Infrastructure",
  headingLine1: "Your own AI.",
  headingAccent: "Direct Cloud Ownership.",
  intro:
    "Take control of your data and your workflow. I provide the professional setup to deploy private, uncensored AI environments like **Hermes** directly on your own cloud infrastructure.",
  valueProps: [
    {
      icon: "ShieldCheck",
      title: "Total Privacy",
      body: "Your data stays on your server. No corporate logging or external training on your sensitive business information.",
    },
    {
      icon: "DollarSign",
      title: "Direct Infrastructure",
      body: "Avoid per-user markups. You own the access and pay only for the underlying cloud or hardware subscriptions you choose.",
    },
    {
      icon: "Zap",
      title: "Uncensored Power",
      body: "Access the full potential of open-weights models like Hermes without artificial constraints or corporate filters.",
    },
  ],
  stackHeadingPre: "The",
  stackHeadingAccent: "Hermes",
  stackBody:
    "I leverage Hostinger's high-performance VPS infrastructure to provision a robust environment capable of running the latest open-source LLMs. This isn't just a chatbot-it's a private foundation for your business intelligence.",
  checklist: [
    { text: "Optimized Linux VPS provisioning via Hostinger." },
    { text: "Deployment of the Hermes environment and supporting models." },
    { text: "Secure API access and web-based interaction layer." },
    { text: "Security hardening and automated backup configuration." },
  ],
  pricingHeadingPre: "Invest in your",
  pricingHeadingAccent: "Digital Sovereignty.",
  pricingTierLabel: "Standard Cloud Setup",
  price: "499",
  priceNote: "One-time setup fee. Hostinger VPS costs billed separately.",
  packages: [
    {
      title: "Standard Package",
      body: "Full deployment on Hostinger VPS, model optimization, and secure access setup.",
    },
    {
      title: "Custom Local Setup",
      body: "Installation on your own local hardware or office servers for maximum performance.",
      note: "Contact for Quote",
    },
  ],
  ctaLabel: "Secure your setup",
};
