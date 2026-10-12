import type { MetadataRoute } from "next";
import { publishedProjects } from "@/content/projects";
import { servicePages } from "@/content/servicePages";
import { areas } from "@/content/areas";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });
  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9),
    ...servicePages.map((s) => entry(`/services/${s.slug}`, 0.9)),
    entry("/work", 0.8, "weekly"),
    entry("/uae", 0.8),
    ...areas.map((a) => entry(`/uae/${a.slug}`, 0.8)),
    entry("/about", 0.7),
    entry("/faq", 0.7),
    entry("/contact", 0.7),
    ...publishedProjects.map((p) => entry(`/work/${p.slug}`, 0.5, "yearly")),
    entry("/privacy-policy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
    entry("/cookie-policy", 0.2, "yearly"),
  ];
}
