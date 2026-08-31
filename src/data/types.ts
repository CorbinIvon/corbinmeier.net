export interface CtaLink {
  label: string;
  href: string;
}

export interface NavItem {
  name: string;
  href: string;
}

export interface HomePricingDetails {
  summary: string;
  points: string[];
  cta: CtaLink;
}

export interface HomeHeroContent {
  eyebrow: string;
  headingLine1: string;
  headingAccent: string;
  paragraph: string;
  pricingDetails: HomePricingDetails;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
}

export interface HomeCtaContent {
  headingPre: string;
  headingAccent: string;
  body: string;
  button: CtaLink;
}

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  icon: "Globe" | "Code2" | "TrendingUp" | "Search" | "Mail" | "CreditCard" | "AtSign" | "Zap" | "Brain";
  link?: string;
}

export interface ServicesSectionContent {
  headingPre: string;
  headingAccent: string;
  intro: string;
  items: ServiceItem[];
}

/** A single à-la-carte feature on the pricing menu. `recurring` and
 *  `prerequisite` are null when the feature carries no monthly cost or stands
 *  on its own. `responsibility` is the point of the menu, not a footnote: it
 *  states in plain terms what the price actually buys. */
export interface PricingLineItem {
  id: string;
  name: string;
  upfront: string;
  recurring: string | null;
  prerequisite: string | null;
  responsibility: string;
}

export interface PricingGroup {
  id: string;
  title: string;
  blurb: string;
  items: PricingLineItem[];
}

/** The two things nearly everything else builds on, called out ahead of the
 *  menu so the entry cost is never buried in a table. */
export interface PricingCornerstone {
  id: string;
  name: string;
  upfront: string;
  recurring: string;
  summary: string;
  includes: string[];
}

export interface PricingNotice {
  title: string;
  body: string;
}

export interface PricingContent {
  eyebrow: string;
  headingPre: string;
  headingAccent: string;
  intro: string;
  ballpark: string;
  cornerstonesHeading: string;
  cornerstones: PricingCornerstone[];
  menuHeadingPre: string;
  menuHeadingAccent: string;
  menuIntro: string;
  groups: PricingGroup[];
  noticesHeading: string;
  notices: PricingNotice[];
  ctaHeadingPre: string;
  ctaHeadingAccent: string;
  ctaBody: string;
  ctaLabel: string;
}

export interface EducationContent {
  eyebrow: string;
  degreeTitle: string;
  diplomaUrl: string;
  diplomaPreviewUrl: string;
  diplomaOverlayLabel: string;
}

export interface AboutSection {
  heading: string;
  headingClassName?: string;
  paragraphs: string[];
  panelClassName?: string;
}

export interface AboutContent {
  heroHeading: string;
  heroSubhead: string;
  sidebarLabel: string;
  sidebarQuote: string;
  sections: AboutSection[];
  closingSection: AboutSection & { ctaLabel: string; ctaHref: string; boldFragment: string };
}

export interface ContactInfoItem {
  icon: "Mail" | "MapPin" | "Mailbox" | "Clock";
  label: string;
  value: string;
}

export interface ContactFormLabels {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  projectDetails: string;
  submit: string;
  submitting: string;
}

export interface ContactValidationMessages {
  missingFields: string;
  missingTurnstile: string;
  genericError: string;
  success: string;
}

export interface ContactContent {
  heading: string;
  subhead: string;
  infoItems: ContactInfoItem[];
  formLabels: ContactFormLabels;
  validation: ContactValidationMessages;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  email: string;
}

export interface SiteContent {
  brandName: string;
  navItems: NavItem[];
  contactCtaLabel: string;
  missionStatement: string;
  footerTagline: string;
  footerSocial: SocialLinks;
  footerNavLabel: string;
  footerLegalLabel: string;
  footerLegalLinks: NavItem[];
  builtWithLine: string;
}

export interface AiSetupValueProp {
  icon: "ShieldCheck" | "DollarSign" | "Zap";
  title: string;
  body: string;
}

export interface AiSetupChecklistItem {
  text: string;
}

export interface AiSetupPricingPackage {
  title: string;
  body: string;
  note?: string;
}

export interface AiSetupContent {
  eyebrow: string;
  headingLine1: string;
  headingAccent: string;
  intro: string;
  valueProps: AiSetupValueProp[];
  stackHeadingPre: string;
  stackHeadingAccent: string;
  stackBody: string;
  checklist: AiSetupChecklistItem[];
  pricingHeadingPre: string;
  pricingHeadingAccent: string;
  pricingTierLabel: string;
  price: string;
  priceNote: string;
  packages: AiSetupPricingPackage[];
  ctaLabel: string;
}
