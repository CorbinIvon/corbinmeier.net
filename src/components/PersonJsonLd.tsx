import { Helmet } from "react-helmet-async";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Corbin Meier",
  url: "https://corbinmeier.net",
  image: "https://corbinmeier.net/corbin.jpg",
  jobTitle: "Software Engineer",
  email: "mailto:contact@corbinmeier.net",
  sameAs: [
    "https://github.com/CorbinMeier",
    "https://www.linkedin.com/in/corbin-meier-a49484125/",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Butte College",
    url: "https://www.butte.edu/",
  },
  knowsAbout: ["Software Engineering", "Web Development", "React", "Cloudflare"],
};

export default function PersonJsonLd() {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
    </Helmet>
  );
}
