/**
 * Film projects, named after TCE's Google Drive portfolio folders (titles
 * approved by TCE). Films with a video show as players on the Work page, in
 * this order (rows of 12 columns: landscape 8, half 6, full 12, portrait 4); films
 * without a video yet are listed by name underneath.
 */
export type Film = {
  slug: string;
  title: string;
  group: "Automotive" | "Corporate" | "Events" | "Brand Content" | "Food & Beverage" | "Fashion & Retail";
  /** Google Drive file id of the master, for reference (empty when uploaded directly). */
  driveId: string;
  video: string | null;
  poster: string | null;
  /** Short line under the title, e.g. the company behind the brand (confirmed by TCE). */
  subtitle?: string;
  /** Brand logo supplied by TCE, shown beside the title. */
  logo?: { src: string; width: number; height: number };
  /** Player shape; defaults to 16:9. */
  aspect?: "4/3";
  /** Landscape film width in the 12-column grid: half (6) or full (12); default 8. */
  span?: "half" | "full";
  /** Portrait (9:16) films get a narrower player. */
  vertical?: boolean;
};

export const films: Film[] = [
  { slug: "hotpack", title: "Hotpack", group: "Brand Content", driveId: "1KkpSO-pch3mxOi0fQ1TCR5p0BY8SsDkx", video: "/media/video/hotpack.mp4", poster: "/media/video/hotpack-poster.webp", logo: { src: "/brand/clients/hotpack.png", width: 359, height: 85 } },
  { slug: "oceano", title: "Oceano", subtitle: "by Deep Seafood Company", group: "Food & Beverage", driveId: "", video: "/media/video/oceano.mp4", poster: "/media/video/oceano-poster.webp", vertical: true, logo: { src: "/brand/clients/oceano.png", width: 327, height: 99 } },
  { slug: "lexus", title: "Lexus", group: "Automotive", driveId: "1t3coAGWW7Y9Jamle7-0scDPdsGFVloyS", video: "/media/video/lexus.mp4", poster: "/media/video/lexus-poster.webp", vertical: true, logo: { src: "/brand/clients/lexus.png", width: 294, height: 135 } },
  { slug: "mercedes-a35", title: "Mercedes A35", group: "Automotive", driveId: "1pkcsN4Y2JHvCFJln-Rs7PSQv09kPiSoq", video: "/media/video/mercedes-a35.mp4", poster: "/media/video/mercedes-a35-poster.webp", vertical: true },
  { slug: "offset-25", title: "Offset ’25", group: "Events", driveId: "1Wbp16oTo3Q4mY8z86omrscU9fxjLwwsP", video: "/media/video/offset-25.mp4", poster: "/media/video/offset-25-poster.webp", vertical: true },
  { slug: "mcdonalds-shahzad", title: "McDonald’s × Shahzad", group: "Food & Beverage", driveId: "", video: "/media/video/mcdonalds-shahzad.mp4", poster: "/media/video/mcdonalds-shahzad-poster.webp", vertical: true },
  { slug: "222-stores", title: "222 Stores", group: "Fashion & Retail", driveId: "", video: "/media/video/222-stores.mp4", poster: "/media/video/222-stores-poster.webp", aspect: "4/3", logo: { src: "/brand/clients/222-stores-logo.png", width: 210, height: 88 } },
  { slug: "its-good-for-something", title: "It’s Good for Something", subtitle: "Cafe & Restaurant", group: "Food & Beverage", driveId: "", video: "/media/video/its-good-for-something.mp4", poster: "/media/video/its-good-for-something-poster.webp", span: "full", logo: { src: "/brand/clients/its-good-for-something-logo.png", width: 516, height: 397 } },
];
