import type { ReactNode } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProjectModalProvider from "@/components/ProjectModalProvider";
import PersonJsonLd from "@/components/PersonJsonLd";
import CrtNotFound from "@/components/CrtNotFound";
import { CyberCodeStyles } from "@/components/cybercode/CyberCodeUIKit";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import AiSetup from "@/pages/AiSetup";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Sidebar />
      <div className="lg:pl-60">
        <ProjectModalProvider>
          <div className="content-wrapper">{children}</div>
        </ProjectModalProvider>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <div className="antialiased font-sans">
      <CyberCodeStyles />
      <PersonJsonLd />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
        <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
        <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
        <Route path="/projects" element={<SiteLayout><Projects /></SiteLayout>} />
        <Route path="/ai-setup" element={<SiteLayout><AiSetup /></SiteLayout>} />
        <Route path="/privacy-policy" element={<SiteLayout><PrivacyPolicy /></SiteLayout>} />
        <Route path="/terms-of-service" element={<SiteLayout><TermsOfService /></SiteLayout>} />
        <Route path="*" element={<CrtNotFound />} />
      </Routes>
      <Analytics />
    </div>
  );
}

export default App;
