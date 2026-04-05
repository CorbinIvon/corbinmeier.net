"use client";

import { Features } from "react-tailwind-framework";
import { howItWorksStyles } from "@/styles/theme";

const steps = [
  {
    title: "We Talk",
    description:
      "We discuss your needs, goals, and vision. No technical jargon — just a clear conversation about what you want to achieve and how technology can help your business grow.",
  },
  {
    title: "I Build",
    description:
      "I develop your solution with regular updates so you're never in the dark. You'll see progress as it happens and can request changes along the way.",
  },
  {
    title: "You Launch",
    description:
      "We deploy your solution and I provide ongoing support. You get training on how to use everything, and I'm here when you need help or want to add new features.",
  },
];

export default function HowItWorks() {
  return (
    <Features
      title="How it works"
      features={steps}
      styles={howItWorksStyles}
    />
  );
}