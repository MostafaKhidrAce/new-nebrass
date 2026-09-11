import { cache } from "react";
import { ApiError, apiGet } from "@/lib/api/http";
import { isNewsArticleSlug, mapAd, mapArticleCard, mapArticleDetail, mapCategory } from "@/lib/api/mappers";
import { getApiCategories } from "@/lib/api/categories";
import { NEWS_ARTICLES } from "@/lib/api/news";
import type {
  ApiAd,
  ApiArticleCard,
  ApiArticleDetail,
  ApiCategoryRef,
  Article,
  ArticlePageData,
  LaravelPagination,
  PaginatedArticles,
  SearchResult,
} from "@/lib/types";

function byDateDesc(a: Article, b: Article) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export async function getArticlesByCategory(
  slug: string,
  page = 1,
  pageSize = 12,
): Promise<PaginatedArticles> {
  if (slug === "news") {
    const start = (page - 1) * pageSize;
    const items = NEWS_ARTICLES.slice(start, start + pageSize);
    return {
      items,
      page,
      pageSize,
      total: NEWS_ARTICLES.length,
      hasMore: start + items.length < NEWS_ARTICLES.length,
    };
  }

  const json = await apiGet<{
    data: ApiArticleCard[];
    meta: LaravelPagination;
    category: ApiCategoryRef;
    banner_ad: ApiAd | null;
  }>(`/categories/${encodeURIComponent(slug)}?page=${page}`);

  return {
    items: json.data.map((card) => mapArticleCard(card)),
    page: json.meta.current_page,
    pageSize: json.meta.per_page,
    total: json.meta.total,
    hasMore: json.meta.current_page < json.meta.last_page,
  };
}

export async function getCategoryPage(slug: string, page = 1) {
  if (slug === "news") {
    const listing = await getArticlesByCategory(slug, page);
    return { ...listing, bannerAd: undefined };
  }

  try {
    const json = await apiGet<{
      data: ApiArticleCard[];
      meta: LaravelPagination;
      category: ApiCategoryRef;
      banner_ad: ApiAd | null;
    }>(`/categories/${encodeURIComponent(slug)}?page=${page}`);

    return {
      items: json.data.map((card) => mapArticleCard(card)),
      page: json.meta.current_page,
      pageSize: json.meta.per_page,
      total: json.meta.total,
      hasMore: json.meta.current_page < json.meta.last_page,
      bannerAd: json.banner_ad ? mapAd(json.banner_ad) : undefined,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

async function fetchArticlePage(slug: string): Promise<ArticlePageData | undefined> {
  if (isNewsArticleSlug(slug)) {
    const article = NEWS_ARTICLES.find((item) => item.id === slug);
    if (!article) return undefined;
    return {
      article,
      related: NEWS_ARTICLES.filter((item) => item.id !== slug).slice(0, 4),
    };
  }

  try {
    const json = await apiGet<{
      data: {
        article: ApiArticleDetail;
        related: ApiArticleCard[];
        article_top_ad: ApiAd | null;
        article_bottom_ad: ApiAd | null;
      };
    }>(`/articles/${encodeURIComponent(slug)}`, { cache: "no-store" });

    return {
      article: mapArticleDetail(json.data.article),
      related: json.data.related.map((card) => mapArticleCard(card)),
      topAd: json.data.article_top_ad ? mapAd(json.data.article_top_ad) : undefined,
      bottomAd: json.data.article_bottom_ad ? mapAd(json.data.article_bottom_ad) : undefined,
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

export const getArticlePage = cache(fetchArticlePage);

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const page = await getArticlePage(slug);
  return page?.article;
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  return getArticleBySlug(id);
}

export async function getLatestByCategory(slug: string, limit = 3): Promise<Article[]> {
  if (slug === "news") return NEWS_ARTICLES.slice(0, limit);
  const page = await getArticlesByCategory(slug, 1, limit);
  return page.items.slice(0, limit);
}

export async function getRelatedArticles(id: string, limit = 4): Promise<Article[]> {
  const data = await fetchArticlePage(id);
  return data?.related.slice(0, limit) ?? [];
}

export async function searchArticles(query: string): Promise<SearchResult> {
  const q = query.trim();
  if (!q) return { items: [], categories: [], query: "" };

  const json = await apiGet<{
    data: ApiArticleCard[];
    query: string;
    categories: ApiCategoryRef[];
  }>(`/search?q=${encodeURIComponent(q)}`);

  const newsHits = NEWS_ARTICLES.filter(
    (article) =>
      article.title.toLowerCase().includes(q.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(q.toLowerCase()),
  ).sort(byDateDesc);

  return {
    query: json.query,
    items: [...json.data.map((card) => mapArticleCard(card)), ...newsHits],
    categories: json.categories.map(mapCategory),
  };
}

export async function getSitemapArticles(): Promise<Article[]> {
  const cats = await getApiCategories();
  const unique = new Map<string, Article>();
  for (const category of cats) {
    for (const card of category.latest_articles) {
      unique.set(card.slug, mapArticleCard(card));
    }
  }
  for (const article of NEWS_ARTICLES) unique.set(article.id, article);
  return [...unique.values()];
}
