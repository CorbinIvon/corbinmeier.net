/**
 * Theme / Style Maps for corbinmeier.net
 *
 * All Tailwind classes that were previously hardcoded in components
 * are centralized here and passed via the headless framework's `styles` prop.
 */

export const heroStyles = {
  section: "w-full max-w-4xl mx-auto py-0 text-center sm:text-left",
  container: "w-full",
  title: "text-4xl sm:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-slate-900 to-indigo-700 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent",
  subtitle: "text-lg text-muted-foreground mb-6",
  ctaWrapper: "flex flex-col sm:flex-row gap-3 justify-center sm:justify-start",
  buttonStyles: {
    base: "inline-flex items-center justify-center rounded-full px-5 py-3 font-semibold",
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900/50 transition-colors",
    secondary: "border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors",
    "hero-primary": "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900/50 transition-colors",
    "hero-secondary": "border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors",
  },
};

export const headerStyles = {
  headerBase:
    "sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/60 backdrop-blur-sm dark:bg-zinc-900/60 dark:border-zinc-800/60 shadow-sm",
  headerScrolled: "",
  headerTransparent: "",
  container: "mx-auto max-w-4xl px-4 py-4",
  containerCustom: "flex items-center justify-between",
  logoLink: "flex items-center gap-3",
  logoImage: "w-10 h-10 rounded-full object-cover",
  titleBase: "font-semibold",
  titleScrolled: "",
  titleTransparent: "",
  desktopNav: "flex items-center gap-4",
  navLinkBase: "text-sm text-zinc-700 dark:text-zinc-300",
  navLinkScrolled: "",
  navLinkTransparent: "",
  buttonStyles: {
    base: "ml-2 rounded-full bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 text-sm text-white font-medium shadow-sm transition-colors",
    primary: "",
    secondary: "",
  },
  phoneIcon: "hidden",
  mobileToggleBase: "hidden",
  mobileMenuBase: "hidden",
};

export const footerStyles = {
  footerBase: "w-full border-t border-slate-200 dark:border-slate-800 py-10 mt-12 bg-slate-50 dark:bg-slate-900/80",
  container: "max-w-4xl mx-auto px-4",
  grid: "flex flex-col sm:flex-row justify-between items-center gap-4",
  brandCol: "",
  brandName: "",
  brandDescription: "",
  socialWrapper: "",
  socialIcon: "",
  linksCol: "hidden",
  colTitle: "",
  linksList: "",
  linkItem: "",
  linkDot: "",
  contactCol: "hidden",
  contactList: "",
  contactItem: "",
  contactIconWrapper: "",
  contactText: "",
  extraCol: "hidden",
  missionText: "",
  quoteBox: "",
  quoteBoxTitle: "",
  quoteBoxSubtitle: "",
  bottomBar: "",
  copyrightText: "text-sm",
  bottomLinks: "flex items-center gap-4",
  bottomLink: "text-sm",
};

export const ctaStyles = {
  section: "w-full max-w-4xl mx-auto py-12",
  container: "p-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white text-center shadow-xl shadow-indigo-200 dark:shadow-indigo-900/50",
  containerCustom: "",
  title: "text-2xl font-semibold mb-2",
  titleInvert: "",
  subtitle: "mb-4",
  subtitleInvert: "",
  ctaWrapper: "",
  buttonStyles: {
    base: "inline-block rounded-full bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 font-semibold shadow-sm transition-colors",
    primary: "",
    secondary: "",
    hero: "inline-block rounded-full bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 font-semibold shadow-sm transition-colors",
  },
};

export const servicesStyles = {
  section: "w-full max-w-4xl mx-auto py-12",
  container: "",
  title: "text-2xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-indigo-700 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent",
  subtitle: "",
  grid: "flex flex-wrap justify-center gap-6",
  card: "w-full sm:w-[48%] md:w-[30%] p-5 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all",
  iconWrapper: "w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-400",
  featureTitle: "font-semibold mb-2 text-slate-800 dark:text-slate-100",
  featureDescription: "text-sm text-muted-foreground",
};

export const howItWorksStyles = {
  section: "w-full max-w-4xl mx-auto py-12",
  container: "",
  title: "text-2xl font-bold mb-6 text-center bg-gradient-to-r from-slate-900 to-indigo-700 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent",
  subtitle: "",
  grid: "flex flex-wrap justify-center gap-6",
  card: "w-full sm:w-[48%] md:w-[30%] p-6 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all text-center",
  iconWrapper: "hidden",
  featureTitle: "font-semibold text-lg mb-3 text-slate-800 dark:text-slate-100",
  featureDescription: "text-sm text-muted-foreground",
};


export const featuredProjectsStyles = {
  section: "w-full max-w-4xl mx-auto py-12",
  title: "text-2xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-indigo-700 dark:from-white dark:to-indigo-300 bg-clip-text text-transparent",
  grid: "grid grid-cols-1 sm:grid-cols-3 gap-6",
};

export const projectCardStyles = {
  base: "group block text-left border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden p-0 bg-white dark:bg-slate-800/60 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all",
  imageWrapper: "relative h-40 bg-slate-100 dark:bg-slate-900",
  image: "object-cover",
  githubBadge: "absolute left-3 bottom-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center shadow-md",
  body: "p-4",
  title: "font-semibold mb-1 text-slate-800 dark:text-slate-100",
  description: "text-sm text-muted-foreground",
};

export const associatesGridStyles = {
  section: "w-full max-w-4xl mx-auto py-12",
  title: "text-2xl font-semibold mb-6",
  grid: "grid grid-cols-1 sm:grid-cols-3 gap-4",
};

export const associateCardStyles = {
  base: "",
  link: "group block p-3 border rounded-lg flex items-center gap-3",
  logoWrapper: "w-12 h-12 relative flex-shrink-0",
  logo: "object-contain",
  name: "font-semibold",
  role: "text-sm text-muted-foreground",
};

export const educationStripStyles = {
  section: "w-full max-w-4xl mx-auto py-6",
  card: "border rounded-lg p-4",
  grid: "grid grid-cols-2 sm:grid-cols-[56px_minmax(0,1fr)_112px] gap-4 items-center",
  logoCol: "order-1 flex items-center justify-start",
  logoWrapper: "w-10 h-10 sm:w-14 sm:h-14 relative",
  diplomaCol: "order-2 sm:order-3 flex items-center justify-end",
  diplomaLink: "w-20 h-16 sm:w-28 sm:h-20 rounded-sm overflow-hidden border",
  textCol: "order-3 sm:order-2 col-span-2 sm:col-span-1 min-w-0",
  degreeName: "font-semibold",
  schoolName: "text-sm text-muted-foreground",
  gradDate: "text-sm text-muted-foreground mt-1",
};
