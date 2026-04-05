import AssociateCard from "@/components/AssociateCard";
import associates from "@/data/associates.json";
import { Section, Grid, Typography } from "react-tailwind-framework";
import { associatesGridStyles } from "@/styles/theme";

export default function AssociatesGrid() {
  const list = associates.slice(0, 6);
  return (
    <Section styles={{ base: associatesGridStyles.section }}>
      <Typography as="h2" styles={{ h2: associatesGridStyles.title }}>
        College Associates
      </Typography>
      <Grid styles={{ base: associatesGridStyles.grid }}>
        {list.map((a) => (
          <AssociateCard key={a.id} associate={a} />
        ))}
      </Grid>
    </Section>
  );
}
