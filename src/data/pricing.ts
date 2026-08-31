import type { PricingContent } from "./types";

export const pricing: PricingContent = {
  eyebrow: "Investment Menu",
  headingPre: "Pick a foundation,",
  headingAccent: "add what you need.",
  intro:
    "Modular, value-based pricing. Every site starts from the same solid base, and everything beyond that is chosen line by line - so you are never paying for a feature you did not ask for.",
  ballpark:
    "Treat these as ballpark figures. They cover the general shape of a project, but every scope is different, and the honest number comes out of a conversation about what you actually need.",

  cornerstonesHeading: "Where every project starts",
  cornerstones: [
    {
      id: "foundation",
      name: "The Foundation",
      upfront: "$1,500",
      recurring: "$50/mo",
      summary:
        "A custom-built public website, hand-coded rather than assembled from a template, and served from data centers around the world so it loads fast wherever your customers are.",
      includes: [
        "Up to five pages, built to your content",
        "Fast on phones, not just on desktop",
        "Terms of Service and Privacy Policy written for your site, at no extra cost",
        "The monthly covers hosting, your security certificate, uptime monitoring, and backups",
      ],
    },
    {
      id: "database",
      name: "The Database Tier",
      upfront: "Included",
      recurring: "$15 - $100/mo",
      summary:
        "The memory behind your site. The moment your site needs to remember someone - an account, a booking, an order, an uploaded photo - it needs this. There is no separate build fee; the monthly scales with how much you actually use.",
      includes: [
        "Required for logins, bookings, orders, and uploads",
        "No upfront cost of its own",
        "The monthly moves with real usage, not a flat guess",
        "Several features below list this as their prerequisite",
      ],
    },
  ],

  menuHeadingPre: "The",
  menuHeadingAccent: "à-la-carte menu.",
  menuIntro:
    "Each line names what it costs and what I am on the hook for. Anything marked with a prerequisite needs that piece in place first.",

  groups: [
    {
      id: "audience",
      title: "Audience & Engagement",
      blurb: "Turning visitors into people you can actually follow up with.",
      items: [
        {
          id: "mailing-list",
          name: "Mailing List & Lead Capture",
          upfront: "$250",
          recurring: "$25/mo",
          prerequisite: "The Foundation",
          responsibility:
            "Sign-up forms that screen out bots before they reach you, so your list stays real people and your mail does not get flagged as spam.",
        },
        {
          id: "age-gate",
          name: "Age Gate / Content Overlay",
          upfront: "$150",
          recurring: null,
          prerequisite: "The Foundation",
          responsibility:
            "An age or content check on entry that remembers a visitor for the rest of their visit, so returning readers are not stopped at the door every time.",
        },
        {
          id: "countdown",
          name: "Countdown Timers & Timelines",
          upfront: "$250",
          recurring: null,
          prerequisite: "The Foundation",
          responsibility:
            "Live countdowns to an opening, a deadline, or an event, plus timeline layouts for telling a story in order.",
        },
        {
          id: "gallery",
          name: "Interactive Media Gallery",
          upfront: "$350",
          recurring: null,
          prerequisite: "The Foundation",
          responsibility:
            "A browsable photo or video gallery that stays quick to load even when the images are large.",
        },
        {
          id: "estimator",
          name: "Custom Inquiry & Estimator Forms",
          upfront: "$450",
          recurring: null,
          prerequisite: "The Foundation",
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
          upfront: "$600",
          recurring: "$25/mo",
          prerequisite: "Admin Portal & Database Tier",
          responsibility:
            "Write, edit, schedule, and publish posts yourself. Built so articles are easy for search engines to find and index.",
        },
        {
          id: "wysiwyg",
          name: "Rich Text Editor",
          upfront: "$500",
          recurring: null,
          prerequisite: "Admin Portal",
          responsibility:
            "Format your content the way you would in a word processor - headings, links, images, lists - with no code to learn.",
        },
        {
          id: "uploader",
          name: "Media Uploader",
          upfront: "$500",
          recurring: "$15/mo",
          prerequisite: "Admin Portal & Database Tier",
          responsibility:
            "Large photo and video uploads go straight to secure storage rather than through the website, which keeps your pages fast and your upload limits generous.",
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
          upfront: "$800",
          recurring: "$25/mo",
          prerequisite: "Database Tier",
          responsibility:
            "A private area where you add, edit, and remove your own content. One owner account, straightforward by design.",
        },
        {
          id: "admin-multi",
          name: "Multi-User / SaaS Admin Portal",
          upfront: "$2,800",
          recurring: "$200/mo",
          prerequisite: "Database Tier",
          responsibility:
            "Multiple staff accounts with different permission levels, where each person sees only their own data and only the areas you have granted them.",
        },
        {
          id: "otp",
          name: "Passwordless Login",
          upfront: "$1,400",
          recurring: "$50/mo + usage",
          prerequisite: "Database Tier",
          responsibility:
            "Users sign in with a one-time code sent to their phone or inbox. No passwords to forget, reset, or leak. Message costs are billed at cost.",
        },
        {
          id: "rate-limiting",
          name: "Usage Limits & Abuse Protection",
          upfront: "$400",
          recurring: "$15/mo",
          prerequisite: "Database Tier",
          responsibility:
            "Caps how often one person can submit or request something, with allowances resetting at their local midnight rather than yours.",
        },
      ],
    },
    {
      id: "commerce",
      title: "Commerce & Payments",
      blurb: "Taking money, with the funds landing directly in your account.",
      items: [
        {
          id: "catalog",
          name: "Product Catalog & Cart",
          upfront: "$800",
          recurring: null,
          prerequisite: "Checkout",
          responsibility:
            "A browsable product range with a working cart, built around how you actually group and sell your items.",
        },
        {
          id: "checkout",
          name: "Secure Checkout",
          upfront: "$1,500",
          recurring: "$25/mo",
          prerequisite: "Database Tier",
          responsibility:
            "Card payments for invoices, deposits, or a full cart. Payment status updates on its own, and money routes straight to your bank - it never sits with me.",
        },
        {
          id: "identity",
          name: "ID Verification",
          upfront: "$1,200",
          recurring: "$25/mo + usage",
          prerequisite: "Database Tier",
          responsibility:
            "Confirms a customer is who they claim to be. The sensitive ID documents are handled by the verification provider and are never stored on your site.",
        },
        {
          id: "crowdfunding",
          name: "Crowdfunding & Goal Tracker",
          upfront: "$800",
          recurring: "$25/mo",
          prerequisite: "Checkout",
          responsibility:
            "Collect contributions against a public target, with a progress display that updates as donations arrive.",
        },
        {
          id: "ticketing",
          name: "Digital Ticketing",
          upfront: "$1,200",
          recurring: "$25/mo",
          prerequisite: "Checkout & Admin Portal",
          responsibility:
            "Someone buys a ticket and automatically receives a unique digital pass by email, ready to be checked at the door.",
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
          upfront: "$1,200",
          recurring: "$35/mo",
          prerequisite: "Admin Portal & Database Tier",
          responsibility:
            "Live availability that accounts for what is already reserved, blocks out holidays and time off, and sends confirmation and change notices automatically.",
        },
        {
          id: "integrations",
          name: "Vendor Integration (each)",
          upfront: "$600",
          recurring: null,
          prerequisite: "The Foundation",
          responsibility:
            "Connects your site to an outside system you already use - a point of sale, a booking tool, a supplier. Priced per system, since each one stores credentials, maps data, and gets tested separately.",
        },
        {
          id: "leaderboards",
          name: "Live Leaderboards & Rankings",
          upfront: "$600",
          recurring: "$25/mo",
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
            "Anything not on this menu. Bring me the problem and I will scope it honestly, including telling you when it is not worth building.",
        },
      ],
    },
  ],

  noticesHeading: "Before you budget",
  notices: [
    {
      title: "These prices move with scope",
      body: "Everything here is negotiable against the real shape of the work - how deep the integrations run, how much content there is, and whether we are working together long-term.",
    },
    {
      title: "Ongoing partners keep their rate",
      body: "While a recurring agreement is active, your pricing stays where it started, even as these numbers rise. Ending that agreement ends the locked rate, and returning later means coming back at current pricing.",
    },
    {
      title: "Regulated health and social data",
      body: "I do not build systems that hold medical, social services, or restricted government records directly. What I can do is connect your site to an established platform that is already certified to hold that data, so it stays with them and out of your website.",
    },
  ],

  ctaHeadingPre: "Not sure what you",
  ctaHeadingAccent: "actually need?",
  ctaBody:
    "Most people do not arrive knowing which line items apply to them, and that is fine. Tell me what you want your site to do and I will map it back to this menu - including the parts you can safely skip for now.",
  ctaLabel: "Talk through your project",
};
