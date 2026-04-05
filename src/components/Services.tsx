"use client";

import { Features } from "react-tailwind-framework";
import { servicesStyles } from "@/styles/theme";

const services = [
  {
    title: "Win Customers at First Glance",
    description:
      "Your website is often a customer's first impression. I build sites that look professional, load fast, and turn visitors into real leads — no tech knowledge required on your end.",
  },
  {
    title: "Save Hours Every Week",
    description:
      "Stop doing the same tasks over and over. I automate booking, follow-ups, invoicing, and more so you can spend more time on the work you actually love.",
  },
  {
    title: "Grow Without the Growing Pains",
    description:
      "As your business picks up, I'm there to keep your tech running smoothly, add new features, and make sure you never outgrow your own website.",
  },
  {
    title: "Get Found by Chico Customers",
    description:
      "When locals search for what you offer, your business shows up. I handle the behind-the-scenes work so the right people find you — not your competitors.",
  },
  {
    title: "Never Lose a Lead Again",
    description:
      "Automated follow-up messages keep potential customers warm even when you're swamped or off the clock. Set it once, and it works for you every day.",
  },
  {
    title: "Get Paid Faster, With Less Friction",
    description:
      "Accept cards, deposits, or subscriptions online — securely and reliably. Getting paid should be the easiest part of running your business.",
  },
  {
    title: "Look Legit From Day One",
    description:
      "A professional email at your own domain (you@yourbusiness.com) builds instant trust with customers and sets you apart before they even read your pitch.",
  },
  {
    title: "Know What's Working",
    description:
      "Simple, clear insights into how customers find and use your site — so you can make smarter decisions and stop guessing what's actually driving growth.",
  },
];

export default function Services() {
  return (
    <Features
      title="What you get when you work with me"
      features={services}
      styles={servicesStyles}
    />
  );
}
