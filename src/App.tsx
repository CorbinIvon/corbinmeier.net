import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ProjectModalProvider from "@/components/ProjectModalProvider";
import PersonJsonLd from "@/components/PersonJsonLd";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Projects from "@/pages/Projects";
import AiSetup from "@/pages/AiSetup";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

function App() {
  return (
    <div className="antialiased font-sans">
      <PersonJsonLd />
      <ScrollToTop />
      <Header />
      <ProjectModalProvider>
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/ai-setup" element={<AiSetup />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<div className="section-container text-center py-40">Page Not Found</div>} />
          </Routes>
        </div>
      </ProjectModalProvider>
      <Footer />
      <Analytics />
    </div>
  );
}

export default App;
