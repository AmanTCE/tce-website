import { media, type MediaItem } from "./media";

/**
 * Portfolio. The company profile shows the work visually but does not name
 * clients, scope or results, so those fields are null and stay hidden until
 * TCE confirms them. Titles are short descriptive working titles based on what
 * each image shows; replace them with real project names when available.
 *
 * Add a project: copy an entry, give it a unique slug, set published: true.
 * Add verified details: fill client / services / summary / outcomes / year.
 */
export const categories = [
  { id: "automotive", label: "Automotive" },
  { id: "food-hospitality", label: "Food & Hospitality" },
  { id: "events-lifestyle", label: "Events & Lifestyle" },
  { id: "brand-campaigns", label: "Brand Campaigns" },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type Project = {
  slug: string;
  title: string;
  category: CategoryId;
  cover: MediaItem;
  media: MediaItem[];
  /** Confirmed client name only. */
  client: string | null;
  /** Confirmed scope of services only. */
  services: string[] | null;
  /** Verified project description only. */
  summary: string | null;
  /** Documented results only. */
  outcomes: string[] | null;
  year: number | null;
  featured: boolean;
  published: boolean;
};

const visualOnly = { client: null, services: null, summary: null, outcomes: null, year: null };

export const projects: Project[] = [
  { slug: "in-motion", title: "In Motion", category: "automotive", cover: media.suvMotion, media: [media.suvMotion], featured: true, published: true, ...visualOnly, client: "Lexus" },
  { slug: "the-bowl", title: "The Bowl", category: "food-hospitality", cover: media.bowl, media: [media.bowl, media.bowlWide], featured: true, published: true, ...visualOnly },
  { slug: "desert-run", title: "Desert Run", category: "automotive", cover: media.desertSuv, media: [media.desertSuv], featured: true, published: true, ...visualOnly },
  { slug: "table-service", title: "Table Service", category: "food-hospitality", cover: media.servicePlate, media: [media.servicePlate], featured: true, published: true, ...visualOnly },
  { slug: "snow-day", title: "Snow Day", category: "events-lifestyle", cover: media.winterRider, media: [media.winterRider], featured: true, published: true, ...visualOnly },
  { slug: "white-coupe", title: "White Coupe", category: "automotive", cover: media.whiteCoupe, media: [media.whiteCoupe], featured: true, published: true, ...visualOnly },
  { slug: "flame-seared", title: "Flame Seared", category: "food-hospitality", cover: media.sushiFlame, media: [media.sushiFlame], featured: true, published: true, ...visualOnly },
  { slug: "palm-road", title: "Palm Road", category: "automotive", cover: media.suvPalmRoad, media: [media.suvPalmRoad], featured: false, published: true, ...visualOnly },
  { slug: "plated", title: "Plated", category: "food-hospitality", cover: media.platedFish, media: [media.platedFish], featured: false, published: true, ...visualOnly },
  { slug: "under-the-canopy", title: "Under the Canopy", category: "events-lifestyle", cover: media.headphonesPortrait, media: [media.headphonesPortrait], featured: false, published: true, ...visualOnly },
];

export const publishedProjects = projects.filter((p) => p.published);
export const featuredProjects = publishedProjects.filter((p) => p.featured);

export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;

/** Only categories that actually contain published work are shown as filters. */
export const activeCategories = categories.filter((c) => publishedProjects.some((p) => p.category === c.id));

export const getProject = (slug: string) => publishedProjects.find((p) => p.slug === slug);
