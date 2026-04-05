"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "react-tailwind-framework";
import { headerStyles } from "@/styles/theme";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className={headerStyles.headerBase}>
      <Container styles={{ base: headerStyles.container }} className={headerStyles.containerCustom}>
        <Link href="/" className={headerStyles.logoLink}>
          <Image
            src="/corbin.jpg"
            alt="Corbin Meier"
            width={40}
            height={40}
            className={headerStyles.logoImage}
            priority
          />
          <span className={headerStyles.titleBase}>Corbin Meier</span>
        </Link>

        <nav className={`${headerStyles.desktopNav} hidden md:flex`}>
          <Link href="/about" className={headerStyles.navLinkBase}>
            About
          </Link>
          <Link href="/portfolio" className={headerStyles.navLinkBase}>
            Portfolio
          </Link>
          <Link
            href="/contact"
            className={headerStyles.buttonStyles.base}
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        <button
          className="md:hidden flex flex-col justify-center items-center w-6 h-6"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`block h-0.5 w-6 bg-zinc-700 dark:bg-zinc-300 transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'mb-1'}`}></span>
          <span className={`block h-0.5 w-6 bg-zinc-700 dark:bg-zinc-300 transition-all ${isMobileMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
          <span className={`block h-0.5 w-6 bg-zinc-700 dark:bg-zinc-300 transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </Container>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <Link
              href="/about"
              className={headerStyles.navLinkBase}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/portfolio"
              className={headerStyles.navLinkBase}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Portfolio
            </Link>
            <Link
              href="/contact"
              className={`${headerStyles.buttonStyles.base} inline-block text-center`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      )}
    </header>
  );
}
