import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ProjectModalProvider from "@/components/ProjectModalProvider";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://corbinmeier.net'),
  title: "Corbin Meier — Web & Tech for Chico Small Businesses",
  description:
    "Chico-based developer helping local startups and small businesses get online, look professional, and grow. Websites, automations, and ongoing tech support.",
  openGraph: {
    title: "Corbin Meier — Web & Tech for Chico Small Businesses",
    description: "Chico-based developer helping local startups and small businesses get online, look professional, and grow. Websites, automations, and ongoing tech support.",
    url: "https://corbinmeier.net",
    siteName: "Corbin Meier",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corbin Meier — Web & Tech for Chico Small Businesses",
    description: "Chico-based developer helping local startups and small businesses get online, look professional, and grow. Websites, automations, and ongoing tech support.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Header />
          <ProjectModalProvider>
            <div className="content-wrapper">{children}</div>
          </ProjectModalProvider>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Corbin Meier",
              "areaServed": "Chico, CA",
              "telephone": "(530) 487-8104",
              "serviceType": ["Web Design", "Web Development", "Software Development"],
              "url": "https://corbinmeier.net"
            })
          }}
        />
      </body>
    </html>
  );
}
