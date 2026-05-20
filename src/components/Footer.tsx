"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border mt-20">
      <div className="section-container !py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="font-serif text-2xl tracking-tight mb-6 block">
              Corbin Meier
            </Link>
            <p className="text-muted max-w-sm mb-8">
              Providing high-performance, custom-engineered digital infrastructure 
              for local businesses with a zero up-front hosting model.
            </p>
            <div className="flex gap-5">
              <a href="https://github.com/CorbinMeier" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors" title="GitHub">
                <IconBrandGithub className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/corbin-meier-a49484125/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors" title="LinkedIn">
                <IconBrandLinkedin className="w-5 h-5" />
              </a>
              <a href="mailto:contact@corbinmeier.net" className="text-muted hover:text-accent transition-colors" title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/portfolio" className="text-muted hover:text-accent transition-colors">Portfolio</Link></li>
              <li><Link href="/about" className="text-muted hover:text-accent transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><span className="text-muted">© {currentYear} Corbin Meier</span></li>
              <li><span className="text-muted">All rights reserved</span></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
            Built with Next.js, Cloudflare, and Drizzle.
          </p>
          <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100">
             <span className="text-[10px] font-bold text-muted-foreground uppercase">Verified Professional</span>
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
