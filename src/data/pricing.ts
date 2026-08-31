import type { PricingContent } from "./types";

export const pricing: PricingContent = {
  eyebrow: "Investment Menu",
  headingPre: "Own the build,",
  headingAccent: "choose the upkeep.",
  intro:
    "You pay once for the site to be built. After that you decide whether you look after it or I do. Everything beyond the build is chosen line by line, so you are never paying for a feature you did not ask for.",
  ballpark:
    "Treat these as ballpark figures. They cover the general shape of a project, but every scope is different, and the honest number comes out of a conversation about what you actually need.",

  tiersHeading: "Pick a starting point",
  tiersIntro:
    "One-time build prices. None of them carry a required monthly, because hosting a straightforward site genuinely costs nothing to run.",
  tiers: [
    {
      id: "starter",
      name: "Starter",
      build: "$700",
      tagline: "A real presence, quickly",
      summary:
        "A small custom site for a business that needs to be found, look credible, and be easy to contact. Hand-coded rather than assembled from a template, and fast on a phone.",
      includes: [
        "One to three pages, built to your content",
        "Contact form delivered straight to your inbox",
        "Set up so search engines can find and list you",
        "No monthly cost at all if you take the keys",
      ],
    },
    {
      id: "foundation",
      name: "Foundation",
      build: "$1,200",
      tagline: "The one most businesses want",
      summary:
        "Room to actually tell your story: services, background, proof, and the legal pages a business site is expected to have. The usual starting point for an established local business.",
      includes: [
        "Up to five pages, built to your content",
        "Terms of Service and Privacy Policy written for your site, included",
        "Photo and content layouts shaped around your business",
        "Everything in Starter",
      ],
      featured: true,
    },
    {
      id: "growth",
      name: "Growth",
      build: "$2,100",
      tagline: "You update it yourself",
      summary:
        "Foundation plus the machinery to run the site without calling me. A private admin area, a familiar editor, and somewhere to put large photos and video. Bought separately these run $2,600.",
      includes: [
        "Private admin area, one owner account",
        "Write and format content like a word processor",
        "Upload large photos and video without slowing the site",
        "Everything in Foundation",
      ],
    },
  ],

  maintenanceHeading: "Then decide who maintains it",
  maintenanceIntro:
    "This is the part most quotes hide. A finished site still needs someone to keep it current and keep an eye on it. That someone can be you.",
  maintenanceOptions: [
    {
      id: "self-managed",
      name: "You maintain it",
      price: "$0/mo to me",
      summary:
        "I set up every account in your name, hand you the login details, and walk you through them. The site is yours outright, with nothing tying you to me.",
      points: [
        "Accounts are in your name from day one, not mine",
        "You keep the logins whether or not we work together again",
        "Platform costs go straight to you, and for a straightforward site those are $0",
        "You can bring me back later as an administrator whenever you want",
      ],
    },
    {
      id: "maintained",
      name: "I maintain it",
      price: "$50 - $100/mo",
      summary:
        "I stay on as an administrator and keep the site healthy: content changes, updates, monitoring, and backups. $50 for a straightforward site, $100 once it stores accounts, bookings, or orders.",
      points: [
        "Content and copy changes handled as they come up",
        "Security patches and dependency updates applied for you",
        "Uptime monitoring, so I usually know before you do",
        "Regular backups you can actually be restored from",
      ],
    },
  ],

  menuHeadingPre: "The",
  menuHeadingAccent: "à-la-carte menu.",
  menuIntro:
    "Add any of these to any tier. Each line names what it costs and what I am on the hook for. A monthly appears only where the feature genuinely consumes an outside service, billed on top of whichever upkeep option you chose. Anything marked with a prerequisite needs that piece in place first.",

  groups: [
    {
      id: "infrastructure",
      title: "Data & Infrastructure",
      blurb: "The layer underneath anything your site has to remember.",
      items: [
        {
          id: "database",
          name: "Database Tier",
          upfront: "Included",
          recurring: "$15 - $100/mo usage",
          prerequisite: null,
          responsibility:
            "The memory behind your site. The moment it needs to remember someone, whether that is an account, a booking, an order, or an uploaded photo, it needs this. No separate build fee, and the monthly moves with real usage rather than a flat guess. Included in Growth, and paid straight to the platform if you self-manage.",
        },
        {
          id: "rate-limiting",
          name: "Usage Limits & Abuse Protection",
          upfront: "$300",
          recurring: null,
          prerequisite: "Database Tier",
          responsibility:
            "Caps how often one person can submit or request something, with allowances resetting at their local midnight rather than yours.",
        },
      ],
    },
    {
      id: "audience",
      title: "Audience & Engagement",
      blurb: "Turning visitors into people you can actually follow up with.",
      items: [
        {
          id: "reviews",
          name: "Reviews & Testimonials",
          upfront: "$300",
          recurring: null,
          prerequisite: null,
          responsibility:
            "Your customer reviews pulled in and displayed properly, so the proof that you are good at your job is on your own site instead of only on someone else's platform.",
        },
        {
          id: "local-seo",
          name: "Local SEO & Business Profile",
          upfront: "$350",
          recurring: null,
          prerequisite: null,
          responsibility:
            "Your Google Business Profile claimed and filled out, your details made consistent across the listings that matter, and your site marked up so search engines understand where you are and what you do.",
        },
        {
          id: "mailing-list",
          name: "Mailing List & Lead Capture",
          upfront: "$200",
          recurring: "$15/mo",
          prerequisite: null,
          responsibility:
            "Sign-up forms that screen out bots before they reach you, so your list stays real people and your mail does not get flagged as spam. The monthly covers the delivery service.",
        },
        {
          id: "countdown",
          name: "Countdown Timers & Timelines",
          upfront: "$200",
          recurring: null,
          prerequisite: null,
          responsibility:
            "Live countdowns to an opening, a deadline, or an event, plus timeline layouts for telling a story in order.",
        },
        {
          id: "gallery",
          name: "Interactive Media Gallery",
          upfront: "$275",
          recurring: null,
          prerequisite: null,
          responsibility:
            "A browsable photo or video gallery that stays quick to load even when the images are large.",
        },
        {
          id: "estimator",
          name: "Custom Inquiry & Estimator Forms",
          upfront: "$350",
          recurring: null,
          prerequisite: null,
          responsibility:
            "Multi-step forms that ask the right follow-up questions and can return a live estimate, so the enquiries reaching you are already qualified.",
        },
      ],
    },
    {
      id: "content",
      title: "Content & Publishing",
      blurb: "Updating the site yourself, without calling me first.",
      items: [
        {
          id: "blog",
          name: "Blog / Article Publishing",
          upfront: "$450",
          recurring: null,
          prerequisite: "Admin Portal & Database Tier",
          responsibility:
            "Write, edit, schedule, and publish posts yourself. Built so articles are easy for search engines to find and index.",
        },
        {
          id: "wysiwyg",
          name: "Rich Text Editor",
          upfront: "$400",
          recurring: null,
          prerequisite: "Admin Portal",
          responsibility:
            "Format your content the way you would in a word processor, with headings, links, images, and lists, and no code to learn. Included in Growth.",
        },
        {
          id: "uploader",
          name: "Media Uploader",
          upfront: "$400",
          recurring: "$15/mo",
          prerequisite: "Admin Portal & Database Tier",
          responsibility:
            "Large photo and video uploads go straight to secure storage rather than through the website, which keeps your pages fast and your upload limits generous. The monthly covers that storage. Included in Growth.",
        },
      ],
    },
    {
      id: "accounts",
      title: "Accounts & Access",
      blurb: "Letting people sign in, and controlling what they can reach.",
      items: [
        {
          id: "admin-single",
          name: "Single-User Admin Portal",
          upfront: "$600",
          recurring: null,
          prerequisite: "Database Tier",
          responsibility:
            "A private area where you add, edit, and remove your own content. One owner account, straightforward by design. Included in Growth.",
        },
        {
          id: "admin-multi",
          name: "Multi-User / SaaS Admin Portal",
          upfront: "$2,100",
          recurring: "$100/mo",
          prerequisite: "Database Tier",
          responsibility:
            "Multiple staff accounts with different permission levels, where each person sees only their own data and only the areas you have granted them.",
        },
        {
          id: "otp",
          name: "Passwordless Login",
          upfront: "$1,100",
          recurring: "$25/mo + usage",
          prerequisite: "Database Tier",
          responsibility:
            "Users sign in with a one-time code sent to their phone or inbox. No passwords to forget, reset, or leak. Message costs are billed at cost.",
        },
      ],
    },
    {
      id: "commerce",
      title: "Commerce & Payments",
      blurb: "Taking money, with the funds landing directly in your account.",
      items: [
        {
          id: "checkout",
          name: "Secure Checkout",
          upfront: "$1,200",
          recurring: "$15/mo",
          prerequisite: "Database Tier",
          responsibility:
            "Card payments for invoices, deposits, or a full cart. Payment status updates on its own, and money routes straight to your bank. It never sits with me.",
        },
        {
          id: "catalog",
          name: "Product Catalog & Cart",
          upfront: "$600",
          recurring: null,
          prerequisite: "Checkout",
          responsibility:
            "A browsable product range with a working cart, built around how you actually group and sell your items.",
        },
        {
          id: "ticketing",
          name: "Digital Ticketing",
          upfront: "$900",
          recurring: "$15/mo",
          prerequisite: "Checkout & Admin Portal",
          responsibility:
            "Someone buys a ticket and automatically receives a unique digital pass by email, ready to be checked at the door.",
        },
        {
          id: "identity",
          name: "ID Verification",
          upfront: "$900",
          recurring: "$25/mo + usage",
          prerequisite: "Database Tier",
          responsibility:
            "Confirms a customer is who they claim to be. The sensitive ID documents are handled by the verification provider and are never stored on your site.",
        },
        {
          id: "crowdfunding",
          name: "Crowdfunding & Goal Tracker",
          upfront: "$600",
          recurring: null,
          prerequisite: "Checkout",
          responsibility:
            "Collect contributions against a public target, with a progress display that updates as donations arrive.",
        },
      ],
    },
    {
      id: "operations",
      title: "Operations & Integrations",
      blurb: "Connecting the site to how your business already runs.",
      items: [
        {
          id: "booking",
          name: "Booking & Scheduling",
          upfront: "$900",
          recurring: "$25/mo",
          prerequisite: "Admin Portal & Database Tier",
          responsibility:
            "Live availability that accounts for what is already reserved, blocks out holidays and time off, and sends confirmation and change notices automatically.",
        },
        {
          id: "integrations",
          name: "Vendor Integration (each)",
          upfront: "$450",
          recurring: null,
          prerequisite: null,
          responsibility:
            "Connects your site to an outside system you already use, such as a point of sale, a booking tool, or a supplier. Priced per system, since each one stores credentials, maps data, and gets tested separately.",
        },
        {
          id: "leaderboards",
          name: "Live Leaderboards & Rankings",
          upfront: "$450",
          recurring: null,
          prerequisite: "Database Tier",
          responsibility:
            "Standings that update as results come in, for competitions, fundraising drives, or sales targets.",
        },
        {
          id: "custom",
          name: "Custom Solution",
          upfront: "Quoted",
          recurring: "Quoted",
          prerequisite: null,
          responsibility:
            "Anything not on this menu, including the specialised pieces some industries need such as age or content gating. Bring me the problem and I will scope it honestly, including telling you when it is not worth building.",
        },
      ],
    },
  ],

  noticesHeading: "Before you budget",
  notices: [
    {
      title: "The site belongs to you",
      body: "Whichever option you choose, the accounts are set up in your name and you can ask for the login details at any time. There is no version of this where leaving means losing your website.",
    },
    {
      title: "Cheaper than hiring for it",
      body: "A year of upkeep costs less than a handful of hours from a freelance developer, and a fraction of what an in-house hire runs once you count the salary, taxes, and the months they are not busy.",
    },
    {
      title: "These prices move with scope",
      body: "Everything here is negotiable against the real shape of the work: how deep the integrations run, how much content there is, and whether we are working together long-term.",
    },
    {
      title: "Ongoing partners keep their rate",
      body: "While a maintenance agreement is active, your pricing stays where it started, even as these numbers rise. Ending that agreement ends the locked rate, and returning later means coming back at current pricing.",
    },
    {
      title: "Regulated health and social data",
      body: "I do not build systems that hold medical, social services, or restricted government records directly. What I can do is connect your site to an established platform that is already certified to hold that data, so it stays with them and out of your website.",
    },
  ],

  ctaHeadingPre: "Not sure what you",
  ctaHeadingAccent: "actually need?",
  ctaBody:
    "Most people do not arrive knowing which line items apply to them, and that is fine. Tell me what you want your site to do and I will map it back to this menu, including the parts you can safely skip for now.",
  ctaLabel: "Talk through your project",
};
