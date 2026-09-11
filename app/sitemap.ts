import type { MetadataRoute } from "next";
import { getSitemapArticles } from "@/lib/api/articles";
import { getAllCategories } from "@/lib/api/categories";
import { SITE_URL } from "@/lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([getSitemapArticles(), getAllCategories()]);

  const categoryUrls = categories
    .filter((category) => category.slug !== "home" && category.slug !== "media")
    .map((category) => ({
      url: `${SITE_URL}${category.href}`,
      changeFrequency: "hourly" as const,
      priority: 0.8,
    }));

  const articleUrls = articles.map((article) => ({
    url: `${SITE_URL}/article/${article.id}`,
    lastModified: new Date(article.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: SITE_URL, changeFrequency: "hourly", priority: 1 },
    { url: `${SITE_URL}/media`, changeFrequency: "daily", priority: 0.6 },
    ...categoryUrls,
    ...articleUrls,
  ];
}
