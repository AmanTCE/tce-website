import type { MetadataRoute } from "next";
import { servicePages } from "@/content/servicePages";
import { areas } from "@/content/areas";
import { dubaiPages } from "@/content/dubai";
import { posts } from "@/content/blog";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Every indexable page. lastmod is a real content date (site.contentUpdated, or
 * a post's updated date), not the build time, so it stays trustworthy for
 * search engines. The single-photo /work/[slug] pages are left out while they
 * are noindex (see app/work/[slug]/page.tsx).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", lastModified: string = site.contentUpdated) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });
  const latestPost = posts.map((p) => p.updated).sort().at(-1) ?? site.contentUpdated;
  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9),
    ...servicePages.map((s) => entry(`/services/${s.slug}`, 0.9)),
    ...dubaiPages.map((p) => entry(`/dubai/${p.slug}`, 0.9)),
    entry("/work", 0.8, "weekly"),
    entry("/blog", 0.8, "weekly", latestPost),
    ...posts.map((p) => entry(`/blog/${p.slug}`, 0.7, "monthly", p.updated)),
    entry("/uae", 0.8),
    ...areas.map((a) => entry(`/uae/${a.slug}`, 0.8)),
    entry("/about", 0.7),
    entry("/faq", 0.7),
    entry("/contact", 0.7),
    entry("/privacy-policy", 0.2, "yearly", "2026-10-12"),
    entry("/terms", 0.2, "yearly", "2026-10-12"),
    entry("/cookie-policy", 0.2, "yearly", "2026-10-12"),
  ];
}
