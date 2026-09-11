import { cache } from "react";
import { ApiError, apiGet } from "@/lib/api/http";
import { mapAd, mapArticleCard, mapArticleDetail, mapCategory, normalizeSlug } from "@/lib/api/mappers";
import { getApiCategories } from "@/lib/api/categories";
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

export async function getArticlesByCategory(slug: string, page = 1): Promise<PaginatedArticles> {
  const pathSlug = encodeURIComponent(normalizeSlug(slug));
  const json = await apiGet<{
    data: ApiArticleCard[];
    meta: LaravelPagination;
    category: ApiCategoryRef;
    banner_ad: ApiAd | null;
  }>(`/categories/${pathSlug}?page=${page}`);

  return {
    items: json.data.map((card) => mapArticleCard(card)),
    page: json.meta.current_page,
    pageSize: json.meta.per_page,
    total: json.meta.total,
    hasMore: json.meta.current_page < json.meta.last_page,
  };
}

async function fetchCategoryPage(slug: string, page = 1) {
  const pathSlug = encodeURIComponent(normalizeSlug(slug));
  try {
    const json = await apiGet<{
      data: ApiArticleCard[];
      meta: LaravelPagination;
      category: ApiCategoryRef;
      banner_ad: ApiAd | null;
    }>(`/categories/${pathSlug}?page=${page}`);

    return {
      category: mapCategory(json.category),
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

export const getCategoryPage = cache(fetchCategoryPage);

async function fetchArticlePage(slug: string): Promise<ArticlePageData | undefined> {
  try {
    const json = await apiGet<{
      data: {
        article: ApiArticleDetail;
        related: ApiArticleCard[];
        article_top_ad: ApiAd | null;
        article_bottom_ad: ApiAd | null;
      };
    }>(`/articles/${encodeURIComponent(normalizeSlug(slug))}`, { cache: "no-store" });

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
  const page = await getArticlesByCategory(slug, 1);
  return page.items.slice(0, limit);
}

export async function getRelatedArticles(id: string, limit = 4): Promise<Article[]> {
  const data = await getArticlePage(id);
  return data?.related.slice(0, limit) ?? [];
}

export async function searchArticles(query: string): Promise<SearchResult> {
  const q = query.trim();
  if (!q) return { items: [], categories: [], query: "" };

  try {
    const json = await apiGet<{
      data: ApiArticleCard[];
      query: string;
      categories: ApiCategoryRef[];
    }>(`/search?q=${encodeURIComponent(q)}`);

    return {
      query: json.query,
      items: json.data.map((card) => mapArticleCard(card)),
      categories: json.categories.map(mapCategory),
    };
  } catch (error) {
    if (error instanceof ApiError && (error.status === 422 || error.status === 404)) {
      return { items: [], categories: [], query: q };
    }
    throw error;
  }
}

export async function getSitemapArticles(): Promise<Article[]> {
  const cats = await getApiCategories();
  const unique = new Map<string, Article>();
  for (const category of cats) {
    for (const card of category.latest_articles) {
      unique.set(card.slug, mapArticleCard(card));
    }
  }
  return [...unique.values()];
}
