import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Corbin Meier — Get Started with Your Web Development Project",
  description: "Ready to get started? Contact Corbin Meier to discuss your web development needs. Serving Chico, CA small businesses with custom websites and software solutions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}