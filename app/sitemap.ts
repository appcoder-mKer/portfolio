import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects().map((p) => ({
    url: `${site.url}/work/${p.slug}`,
    lastModified: new Date(`${p.year}-12-31`),
    changeFrequency: "yearly" as const,
    priority: p.featured ? 0.8 : 0.6,
  }));
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }, ...projects];
}
