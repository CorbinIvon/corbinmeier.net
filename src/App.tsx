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
import Projects from "@/pages/Projects";
import Tools from "@/pages/Tools";
import Faq from "@/pages/Faq";
import Pricing from "@/pages/Pricing";
import AiSetup from "@/pages/AiSetup";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContactModalProvider from "@/components/ContactModalProvider";
import { useContactModal } from "@/components/ContactModalContext";

function ContactRouteRedirect() {
  const navigate = useNavigate();
  const { open } = useContactModal();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const subject = searchParams.get("subject") || undefined;
    open({ subject });
    navigate("/", { replace: true });
  }, [navigate, open, searchParams]);
  return null;
}

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
      <ContactModalProvider>
        <CyberCodeStyles />
        <PersonJsonLd />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
          <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
          <Route path="/contact" element={<ContactRouteRedirect />} />
          <Route path="/projects" element={<SiteLayout><Projects /></SiteLayout>} />
          <Route path="/tools" element={<SiteLayout><Tools /></SiteLayout>} />
          <Route path="/faq" element={<SiteLayout><Faq /></SiteLayout>} />
          <Route path="/pricing" element={<SiteLayout><Pricing /></SiteLayout>} />
          <Route path="/ai-setup" element={<SiteLayout><AiSetup /></SiteLayout>} />
          <Route path="/privacy-policy" element={<SiteLayout><PrivacyPolicy /></SiteLayout>} />
          <Route path="/terms-of-service" element={<SiteLayout><TermsOfService /></SiteLayout>} />
          <Route path="*" element={<CrtNotFound />} />
        </Routes>
        <Analytics />
      </ContactModalProvider>
    </div>
  );
}

export default App;
