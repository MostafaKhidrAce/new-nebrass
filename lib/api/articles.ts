import { PAGE_SIZE } from "@/lib/config";
import { ARTICLES } from "@/lib/mock/articles";
import type { Article, PaginatedArticles } from "@/lib/types";

function byDateDesc(a: Article, b: Article) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

/** Swap this body for a real fetch later. */
export async function getAllArticles(): Promise<Article[]> {
  return [...ARTICLES].sort(byDateDesc);
}

export async function getFeaturedArticles(limit = 7): Promise<Article[]> {
  const pool = ARTICLES.filter((article) => article.lang !== "en");
  const featured = pool.filter((article) => article.featured).sort(byDateDesc);
  const used = new Set(featured.map((article) => article.id));
  const extras = pool.filter((article) => !used.has(article.id)).sort(byDateDesc);
  return [...featured, ...extras].slice(0, limit);
}

export async function getArticlesByCategory(
  slug: string,
  page = 1,
  pageSize = PAGE_SIZE,
): Promise<PaginatedArticles> {
  const filtered = ARTICLES.filter((article) => article.category === slug).sort(byDateDesc);
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);

  return {
    items,
    page,
    pageSize,
    total: filtered.length,
    hasMore: start + items.length < filtered.length,
  };
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  return ARTICLES.find((article) => article.id === id);
}

export async function getLatestByCategory(slug: string, limit = 3): Promise<Article[]> {
  return ARTICLES.filter((article) => article.category === slug)
    .sort(byDateDesc)
    .slice(0, limit);
}

export async function getRelatedArticles(id: string, limit = 4): Promise<Article[]> {
  const current = await getArticleById(id);
  if (!current) return [];

  return ARTICLES.filter((article) => article.category === current.category && article.id !== id)
    .sort(byDateDesc)
    .slice(0, limit);
}

export async function searchArticles(query: string): Promise<Article[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return ARTICLES.filter(
    (article) =>
      article.title.toLowerCase().includes(q) || article.excerpt.toLowerCase().includes(q),
  ).sort(byDateDesc);
}
