import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/60 backdrop-blur-sm dark:bg-zinc-900/60 dark:border-zinc-800/60 shadow-sm">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/corbin.jpg"
            alt="Corbin Meier"
            width={40}
            height={40}
            className="rounded-full object-cover"
            priority
          />
          <span className="font-semibold">Corbin Meier</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/about"
            className="text-sm text-zinc-700 dark:text-zinc-300"
          >
            About
          </Link>
          <Link
            href="/portfolio"
            className="text-sm text-zinc-700 dark:text-zinc-300"
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            className="ml-2 rounded-md bg-zinc-900 px-3 py-1.5 text-sm text-white hover:bg-zinc-800"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
