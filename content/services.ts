import { media, type MediaItem } from "./media";

/**
 * The five core services, worded exactly as in the company profile (pages 4–5).
 * Only heading capitalisation and the "STARTEGY" typo were corrected, and the
 * stray closing quote after the influencer copy was removed.
 */
export type Service = {
  slug: string;
  number: string;
  title: string;
  /** One-line summary condensed from the profile copy, used in compact lists. */
  summary: string;
  /** Original profile wording. */
  body: string;
  image: MediaItem;
};

export const coreServices: Service[] = [
  {
    slug: "visual-production",
    number: "01",
    title: "Visual Production",
    summary: "Brand films, commercials, product videos, luxury and corporate shoots, and full event coverage.",
    body: "Our work includes brand films, commercials, product videos, luxury and corporate shoots, as well as full event coverage delivering visually compelling content that elevates brand image and captures attention.",
    image: media.cameraHands,
  },
  {
    slug: "social-media-management",
    number: "02",
    title: "Social Media Management",
    summary: "High-quality social content, managed brand pages and a consistent visual identity.",
    body: "We create high-quality content for social media platforms, manage and maintain brand pages, develop a consistent visual identity, and plan creative strategies that help brands grow, connect with their audience, and build a strong online presence.",
    image: media.socialMockup,
  },
  {
    slug: "advertisement-management",
    number: "03",
    title: "Advertisement Management",
    summary: "Digital ad campaigns planned, created, targeted and optimised.",
    body: "We plan, create, and manage advertising campaigns across digital platforms. From concept development and ad creatives to targeting, execution, and performance optimization, we ensure ads reach the right audience, deliver strong engagement, and help brands achieve real business results.",
    image: media.newspaperStreet,
  },
  {
    slug: "content-strategy",
    number: "04",
    title: "Content Strategy",
    summary: "A clear content roadmap: what to post, when to post and how to communicate.",
    body: "We plan and structure content with purpose. By understanding the brand, audience, and goals, we create a clear content roadmap that defines what to post, when to post, and how to communicate—ensuring consistency, stronger engagement, and long-term brand growth across all platforms.",
    image: media.strategyWall,
  },
  {
    slug: "influencer-creator-media-planning",
    number: "05",
    title: "Influencer & Creator Media Planning",
    summary: "The right influencers and creators, from campaign planning to tracking results.",
    body: "We help brands connect with the right influencers and content creators to reach their target audience in a genuine and engaging way. From planning campaigns and selecting influencers to creating impactful content and tracking results, we make sure your brand story reaches the people who matter most.",
    image: media.creatorPhone,
  },
];

/**
 * Additional capabilities from TCE's business direction. These were not listed
 * in the company profile, so they are always presented separately from the
 * five core services.
 */
export type Capability = { slug: string; title: string; body: string };

export const growthCapabilities: Capability[] = [
  {
    slug: "growth-marketing",
    title: "Growth Marketing",
    body: "Connecting creative, channels and campaigns to the commercial goals behind them, so marketing activity is planned around how the business wants to grow.",
  },
  {
    slug: "brand-strategy",
    title: "Brand Strategy & Digital Positioning",
    body: "Defining how a brand looks, sounds and presents itself online, so every touchpoint feels recognisable and consistent.",
  },
  {
    slug: "seo",
    title: "SEO",
    body: "Structuring websites and content so the people already searching for what a business offers can find it.",
  },
  {
    slug: "crm-development",
    title: "CRM Development & Marketing Systems",
    body: "Organising leads, customer journeys and follow-ups into systems that help a team respond faster and keep track of every opportunity.",
  },
  {
    slug: "podcast-production",
    title: "Podcast Production & Content Distribution",
    body: "Producing long-form conversations and turning them into content that can travel across platforms.",
  },
];

/** Options for the enquiry form's service field. */
export const enquiryServiceOptions = [
  ...coreServices.map((s) => s.title),
  ...growthCapabilities.map((c) => c.title),
  "Not sure yet",
];
