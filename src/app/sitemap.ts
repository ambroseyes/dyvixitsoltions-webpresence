import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { solutions } from "@/content/solutions";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";

/**
 * Generated from content, not hand-maintained — a new solution, industry or
 * article is in the sitemap the moment it exists. A hand-written sitemap
 * drifts, and a drifted sitemap is a crawlability defect (§72).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/solutions", priority: 0.9, freq: "monthly" },
    { path: "/industries", priority: 0.8, freq: "monthly" },
    { path: "/expertise", priority: 0.7, freq: "monthly" },
    { path: "/projects", priority: 0.6, freq: "monthly" },
    { path: "/insights", priority: 0.7, freq: "weekly" },
    { path: "/about", priority: 0.9, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/request-audit", priority: 0.8, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/legal", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...solutions.map((s) => ({
      url: `${site.url}/solutions/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...industries.map((i) => ({
      url: `${site.url}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/insights/${a.slug}`,
      lastModified: new Date(a.updated ?? a.published),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
