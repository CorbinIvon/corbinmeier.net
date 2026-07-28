"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <nav className="glass-panel px-6 py-3 flex items-center justify-between border-white/10 shadow-2xl shadow-black/5">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-border transition-transform group-hover:scale-105">
              <img
                src="/corbin.jpg"
                alt="Corbin Meier"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <span className="font-serif text-lg tracking-tight block">{site.brandName}</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {site.navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-accent",
                    pathname === item.href ? "text-accent" : "text-muted"
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              className="hidden md:inline-flex bg-primary text-background px-6 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 active:scale-95"
            >
              {site.contactCtaLabel}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-nav-menu"
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 rounded-full hover:bg-muted/10 transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="md:hidden glass-panel mt-3 px-6 py-4 flex flex-col gap-1 border-white/10 shadow-2xl shadow-black/5"
            >
              {site.navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "py-3 text-base font-medium transition-colors",
                    pathname === item.href ? "text-accent" : "text-muted hover:text-accent"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 bg-primary text-background px-6 py-3 rounded-full text-sm font-bold text-center transition-transform hover:scale-105 active:scale-95"
              >
                {site.contactCtaLabel}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
