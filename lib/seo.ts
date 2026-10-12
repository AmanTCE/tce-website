import type { Metadata } from "next";
import { site } from "@/content/site";
import { routePath } from "@/lib/paths";

/** Full URL of a page or file on the live site. */
export const absoluteUrl = (path: string) => `${site.url}${path.startsWith("/media/") || path.startsWith("/brand/") ? path : routePath(path)}`;

type PageMeta = { title: string; description: string; path: string; image?: { url: string; width: number; height: number; alt: string } };

export function pageMetadata({ title, description, path, image }: PageMeta): Metadata {
  const images = image ? [image] : [{ url: "/media/og.jpg", width: 1200, height: 630, alt: "The Creative Economy, video production and digital marketing agency in the UAE" }];
  return {
    title,
    description,
    alternates: { canonical: routePath(path) },
    openGraph: { title: `${title} | ${site.shortName}`, description, url: routePath(path), type: "website", siteName: site.name, locale: site.locale, images },
    twitter: { card: "summary_large_image", title: `${title} | ${site.shortName}`, description, images: images.map((i) => i.url) },
  };
}
