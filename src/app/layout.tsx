import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ProjectModalProvider from "@/components/ProjectModalProvider";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corbin Meier | Software Engineer",
  description:
    "Software Engineer specializing in building sophisticated, high-performance applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased font-sans`}
      >
        <Header />
        <ProjectModalProvider>
          <div className="content-wrapper">{children}</div>
        </ProjectModalProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
