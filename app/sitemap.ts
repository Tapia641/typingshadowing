import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { LEVELS } from "@/lib/levels";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const levelPages: MetadataRoute.Sitemap = LEVELS.map((level) => ({
    url: `${SITE_URL}/practicar/${level.id.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/practicar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...levelPages,
  ];
}
