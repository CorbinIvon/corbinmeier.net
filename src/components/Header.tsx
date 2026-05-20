"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const { pathname } = useLocation();

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
            <span className="font-serif text-lg tracking-tight hidden sm:block">Corbin Meier</span>
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
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
              className="bg-primary text-background px-6 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 active:scale-95"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
