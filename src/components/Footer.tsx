import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t py-8 mt-12">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm">© {new Date().getFullYear()} Corbin Meier</div>
        <div className="flex items-center gap-4">
          <a href="/about" className="text-sm">
            About
          </a>
          <a href="/portfolio" className="text-sm">
            Portfolio
          </a>
          <a href="/contact" className="text-sm">
            Contact
          </a>
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
    </footer>
  );
}
