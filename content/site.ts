/**
 * Global site settings. Contact and social details stay null until TCE
 * confirms them; anything null is simply not rendered anywhere on the site.
 */
export const site = {
  name: "The Creative Economy",
  shortName: "TCE",
  /**
   * Live domain. Every canonical link, the sitemap and the structured data are
   * built from it (NEXT_PUBLIC_SITE_URL overrides it, e.g. for local testing).
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tcespace.com").replace(/\/$/, ""),
  locale: "en_AE",
  region: "UAE",
  description:
    "The Creative Economy (TCE) is a UAE video production and digital marketing agency: brand films, social media management, performance marketing and Meta ads, UGC and influencer content, content strategy and SEO across all seven emirates.",

  contact: {
    email: "tceworkspace@gmail.com" as string | null,
    phone: "+971 50 776 2059" as string | null,
    /** How TCE prefers to be contacted, shown on the contact page. */
    preferred: "Email or an Instagram message is the quickest way to reach us.",
    /** Where TCE is based and meets clients. TCE has no public office, so this is not a street address. */
    city: "Dubai",
    meetings: "We meet clients at Dubai Founders HQ, 25hours Hotel One Central, Dubai.",
    /** Digits only with country code, e.g. "9715XXXXXXXX". */
    whatsapp: "971507762059" as string | null,
    /** Street address of an office visitors can come to. Leave null for a service-area business. */
    address: null as { street: string; city: string; emirate: string; postalCode?: string } | null,
  },

  /** Registered company details, used on the legal pages once confirmed. */
  legal: {
    companyName: null as string | null,
    licenceNumber: null as string | null,
    /** The emirate or free zone authority that issued the trade licence. */
    licensingAuthority: null as string | null,
    /** Emirate whose courts govern the Terms of Use. */
    jurisdiction: "Dubai" as string | null,
    updated: "12 October 2026",
  },

  /**
   * Measurement and search-engine verification. Each one switches on when its
   * value is set: Google Analytics 4 (with a consent banner), and the
   * verification meta tags from Google Search Console and Bing Webmaster Tools.
   */
  analytics: {
    ga4: (process.env.NEXT_PUBLIC_GA4_ID || "G-BMC76S9063") as string | null,
    googleSiteVerification: null as string | null,
    bingSiteVerification: null as string | null,
  },

  /**
   * Enquiry emails on Netlify. Netlify Forms keeps a copy of every enquiry, but
   * its email alerts are a paid feature, so the form also sends each enquiry to
   * Web3Forms (free), which emails it to TCE. The access key is public by design:
   * it can only send to the inbox it was created for.
   */
  forms: {
    web3formsKey: (process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "006a0546-2ff8-4872-b888-1a204619b3f1") as string | null,
  },

  /** Every emirate TCE works in. Each has its own page under /uae. */
  emirates: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],

  social: {
    instagram: "https://www.instagram.com/tce.space/" as string | null,
    linkedin: "https://www.linkedin.com/company/thecreativeeconomy/" as string | null,
    tiktok: null as string | null,
    youtube: null as string | null,
    facebook: null as string | null,
  },

  /** Instagram handle shown as link text. */
  instagramHandle: "@tce.space",

  /**
   * Brands TCE has worked with, as confirmed by TCE, shown in the logo slider.
   * Give a brand a `logo` (transparent PNG/SVG in public/brand/clients) and it
   * shows the logo, sized by its proportions so all logos read at a similar
   * weight; without one it shows the name until the file is supplied.
   */
  clients: [
    { name: "Lexus", logo: { src: "/brand/clients/lexus.png", width: 294, height: 135 } },
    { name: "Hotpack", logo: { src: "/brand/clients/hotpack.png", width: 359, height: 85 } },
    { name: "Oceano", logo: { src: "/brand/clients/oceano.png", width: 327, height: 99 } },
    { name: "222 Stores", logo: { src: "/brand/clients/222-stores-logo.png", width: 210, height: 88 } },
    { name: "Tass & Hamjit", logo: { src: "/brand/clients/tass-hamjit.png", width: 505, height: 174 } },
    { name: "Victory Digital Print Solutions", logo: { src: "/brand/clients/victory.png", width: 200, height: 62 } },
    { name: "Messify", logo: { src: "/brand/clients/messify.png", width: 640, height: 188 } },
    { name: "LePresso", logo: { src: "/brand/clients/lepresso.png", width: 532, height: 98 } },
    { name: "Powerology", logo: { src: "/brand/clients/powerology.png", width: 557, height: 103 } },
    { name: "Al Saqr", logo: { src: "/brand/clients/al-saqr.png", width: 509, height: 159 } },
    { name: "GBH International Group", logo: { src: "/brand/clients/gbh-international.png", width: 200, height: 36 } },
  ] as { name: string; logo?: { src: string; width: number; height: number } }[],

  /**
   * Home hero background film. Silent, looping, plays behind the headline.
   * Set src to null to fall back to the studio still.
   * Prepare files with scripts/prepare-hero-video.sh.
   */
  heroVideo: {
    // Silent 39 s montage cut from the Hotpack, 222 Stores and It’s Good for Something films
    // (15 shots, 16:9, 1280px; phones get 854px). Rebuild by re-cutting the masters with ffmpeg.
    src: "/media/video/hero-mix.mp4" as string | null,
    srcSm: "/media/video/hero-mix-sm.mp4" as string | null,
    // WebM (VP9) copies for browsers without H.264.
    webm: "/media/video/hero-mix.webm" as string | null,
    webmSm: "/media/video/hero-mix-sm.webm" as string | null,
    poster: "/media/video/hero-mix-poster.webp",
    label: "Showreel of TCE films for Hotpack, 222 Stores and It's Good for Something",
  },


  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
};

/** "971507762059" → "+971 50 776 2059" */
export const formatWhatsapp = (n: string) => n.replace(/^(\d{3})(\d{2})(\d{3})(\d{4})$/, "+$1 $2 $3 $4");

export type SiteSocialKey = keyof typeof site.social;

export const socialLabels: Record<SiteSocialKey, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
};
