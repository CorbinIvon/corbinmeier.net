import Image from "next/image";
import associates from "@/data/associates.json";

export default function EducationStrip() {
  const butte = associates.find((a) => a.name.toLowerCase().includes("butte"));
  if (!butte) return null;

  return (
    <section className="w-full max-w-4xl mx-auto py-6">
      <div className="border rounded-lg p-4">
        <div className="grid grid-cols-2 sm:grid-cols-[56px_minmax(0,1fr)_112px] gap-4 items-center">
          {/* Logo (left on all sizes) */}
          <div className="order-1 flex items-center justify-start">
            <div className="w-10 h-10 sm:w-14 sm:h-14 relative">
              <Image
                src={butte.logo}
                alt={`${butte.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Diploma (on mobile sits next to logo; on sm+ moves to third column) */}
          <div className="order-2 sm:order-3 flex items-center justify-end">
            <a
              href="https://www.parchment.com/u/award/e84ced0798b2ee4710bd18d2a5da3634"
              target="_blank"
              rel="noopener noreferrer"
              className="w-20 h-16 sm:w-28 sm:h-20 rounded-sm overflow-hidden border"
              aria-label="View official diploma on Parchment.com"
              title="Official diploma (opens in new tab)"
            >
              <Image
                src="https://www.parchment.com/u/award/e84ced0798b2ee4710bd18d2a5da3634/preview-md.jpg"
                alt="Diploma preview"
                width={112}
                height={80}
                className="object-cover"
              />
            </a>
          </div>

          {/* Text (on mobile spans two columns below logo/diploma; on sm+ sits in middle column) */}
          <div className="order-3 sm:order-2 col-span-2 sm:col-span-1 min-w-0">
            <div className="font-semibold">
              Associate in Science - Computer Programming
            </div>
            <div className="text-sm text-muted-foreground">
              {butte.name} —{" "}
              <a
                href="https://programs.butte.edu/ProgramInfo/15/3188"
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Degree map
              </a>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Graduated Jan 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
