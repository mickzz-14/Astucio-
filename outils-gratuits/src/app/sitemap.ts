import type { MetadataRoute } from "next";
import { categories } from "@/config/categories";
import { tools } from "@/config/tools";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/a-propos`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/contact`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/conditions-utilisation`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteConfig.url}/favoris`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteConfig.url}/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${siteConfig.url}/${t.category}/${t.slug}`,
    lastModified: t.addedAt,
    changeFrequency: "monthly",
    priority: t.popular ? 0.9 : 0.7,
  }));

  return [...staticPages, ...categoryPages, ...toolPages];
}
