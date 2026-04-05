import Image from "next/image";
import { Container } from "react-tailwind-framework";
import { footerStyles } from "@/styles/theme";

export default function Footer() {
  return (
    <footer className={footerStyles.footerBase}>
      <Container styles={{ base: footerStyles.container }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
              <a href="mailto:contact@corbinmeier.net" className="hover:text-slate-800 dark:hover:text-slate-200">
                contact@corbinmeier.net
              </a>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
              <a href="tel:5304878104" className="hover:text-slate-800 dark:hover:text-slate-200">
                (530) 487-8104
              </a>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Chico, CA</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Corbin Meier</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Building thoughtful, performant experiences and useful tools for local businesses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Links</h3>
            <div className="flex flex-col gap-1">
              <a href="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                About
              </a>
              <a href="/portfolio" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                Portfolio
              </a>
              <a href="/contact" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className={footerStyles.grid}>
          <div className={footerStyles.copyrightText}>
            &copy; {new Date().getFullYear()} Corbin Meier
          </div>
          <div className={footerStyles.bottomLinks}>
            <a
              href="https://www.parchment.com/u/award/e84ced0798b2ee4710bd18d2a5da3634"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              aria-label="Official Parchment.com Diploma"
              title="Official Parchment.com Diploma"
            >
              <Image
                src="https://www.parchment.com/u/award/e84ced0798b2ee4710bd18d2a5da3634/preview-md.jpg"
                alt="Diploma thumbnail"
                width={48}
                height={36}
                className="object-contain rounded-sm"
              />
              <span className="sr-only">Official Parchment.com Diploma</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
