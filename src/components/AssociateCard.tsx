import Image from "next/image";
import { Card } from "react-tailwind-framework";
import { associateCardStyles } from "@/styles/theme";

type Associate = {
  id?: string;
  name: string;
  logo: string;
  role?: string;
  link?: string;
  description?: string;
};

export default function AssociateCard({ associate }: { associate: Associate }) {
  return (
    <Card styles={{ base: associateCardStyles.base }}>
      <a
        href={associate.link}
        className={associateCardStyles.link}
      >
        <div className={associateCardStyles.logoWrapper}>
          <Image
            src={associate.logo}
            alt={associate.name}
            fill
            className={associateCardStyles.logo}
          />
        </div>
        <div>
          <div className={associateCardStyles.name}>{associate.name}</div>
          <div className={associateCardStyles.role}>{associate.role}</div>
        </div>
      </a>
    </Card>
  );
}
