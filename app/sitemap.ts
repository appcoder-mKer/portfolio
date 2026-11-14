import type { MetadataRoute } from "next";
import { coursework, site } from "@/content/site";
import { getProjects } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects().map((p) => ({
    url: `${site.url}/work/${p.slug}/`,
    lastModified: new Date(`${p.year}-12-31`),
    changeFrequency: "yearly" as const,
    priority: p.featured ? 0.8 : 0.6,
  }));
  // /coursework only says "nothing yet" while the list is empty, so it stays out until it has entries.
  const pages = coursework.length > 0 ? [{ url: `${site.url}/coursework/`, changeFrequency: "yearly" as const, priority: 0.5 }] : [];
  return [{ url: `${site.url}/`, changeFrequency: "monthly", priority: 1 }, ...pages, ...projects];
}
