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

/** One of the build tiers. `build` is a one-time price, and there is
 *  deliberately no recurring field: ongoing cost is chosen separately on the
 *  maintenance axis below, so a self-managed client genuinely owes nothing
 *  monthly. Folding a monthly in here is what made the earlier single-tier
 *  page contradict the "no hosting fees" claim on the About page. */
export interface PricingTier {
  id: string;
  name: string;
  build: string;
  tagline: string;
  summary: string;
  includes: string[];
  /** Marks the tier to lead with visually. Exactly one tier sets this. */
  featured?: boolean;
}

/** How a finished site is looked after. This is an axis rather than a tier:
 *  every build is offered both ways, so it renders once beside the tiers
 *  instead of being repeated inside each one. */
export interface PricingMaintenanceOption {
  id: string;
  name: string;
  price: string;
  summary: string;
  points: string[];
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
  tiersHeading: string;
  tiersIntro: string;
  tiers: PricingTier[];
  maintenanceHeading: string;
  maintenanceIntro: string;
  maintenanceOptions: PricingMaintenanceOption[];
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
