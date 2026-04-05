import Image from "next/image";
import associates from "@/data/associates.json";
import { Section, Card } from "react-tailwind-framework";
import { educationStripStyles } from "@/styles/theme";

export default function EducationStrip() {
  const butte = associates.find((a) => a.name.toLowerCase().includes("butte"));
  if (!butte) return null;

  return (
    <Section styles={{ base: educationStripStyles.section }}>
      <Card styles={{ base: educationStripStyles.card }}>
        <div className={educationStripStyles.grid}>
          {/* Logo (left on all sizes) */}
          <div className={educationStripStyles.logoCol}>
            <div className={educationStripStyles.logoWrapper}>
              <Image
                src={butte.logo}
                alt={`${butte.name} logo`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Diploma (on mobile sits next to logo; on sm+ moves to third column) */}
          <div className={educationStripStyles.diplomaCol}>
            <a
              href="https://www.parchment.com/u/award/e84ced0798b2ee4710bd18d2a5da3634"
              target="_blank"
              rel="noopener noreferrer"
              className={educationStripStyles.diplomaLink}
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
          <div className={educationStripStyles.textCol}>
            <div className={educationStripStyles.degreeName}>
              Associate in Science - Computer Programming
            </div>
            <div className={educationStripStyles.schoolName}>
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
            <div className={educationStripStyles.gradDate}>
              Graduated Jan 2025
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}
