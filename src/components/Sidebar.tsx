"use client";

import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { FileCode2, Home, Send } from "lucide-react";
import { site } from "@/data/site";

const ICONS = [Home, FileCode2, FileCode2];

export default function Sidebar() {
  const { pathname } = useLocation();
  const items = [{ name: "Home", href: "/" }, ...site.navItems];

  return (
    <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 z-40 w-60 flex-col border-r border-border bg-background">
      <Link to="/" className="flex items-center gap-3 px-6 py-6 border-b border-border group">
        <div className="relative w-9 h-9 overflow-hidden rounded-full border border-border transition-transform group-hover:scale-105">
          <img
            src="/corbin.jpg"
            alt="Corbin Meier"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <span className="font-serif text-base tracking-tight truncate">{site.brandName}</span>
      </Link>

      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-3 mb-2 font-mono text-[10px] uppercase tracking-widest text-muted">// nav</p>
        {items.map((item, index) => {
          const Icon = ICONS[index] ?? FileCode2;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg font-mono text-sm border-l-2 transition-colors",
                active
                  ? "border-accent text-accent bg-accent/5"
                  : "border-transparent text-muted hover:text-foreground hover:bg-muted/5"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.name.toLowerCase()}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          to="/contact"
          className={cn(
            "flex items-center justify-center gap-2 w-full bg-primary text-background px-4 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95",
            pathname === "/contact" && "ring-1 ring-accent"
          )}
        >
          <Send className="w-4 h-4" />
          {site.contactCtaLabel}
        </Link>
      </div>
    </aside>
  );
}
