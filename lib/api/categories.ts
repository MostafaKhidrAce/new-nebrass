import { cache } from "react";
import { apiGet } from "@/lib/api/http";
import { mapArticleCard, mapListedCategory } from "@/lib/api/mappers";
import { NEWS_ARTICLES } from "@/lib/api/news";
import { HOME_CATEGORY, NEWS_CATEGORY } from "@/lib/mock/categories";
import type { ApiCategoryListItem, Article, Category } from "@/lib/types";

export const getApiCategories = cache(async (): Promise<ApiCategoryListItem[]> => {
  const json = await apiGet<{ data: ApiCategoryListItem[] }>("/categories");
  return json.data;
});

export async function getStaticCategories(): Promise<Category[]> {
  const api = await getApiCategories();
  const system = api.filter((category) => category.is_system).map(mapListedCategory);
  return [HOME_CATEGORY, ...system, NEWS_CATEGORY];
}

export async function getDynamicCategories(): Promise<Category[]> {
  const api = await getApiCategories();
  return api.filter((category) => !category.is_system).map(mapListedCategory);
}

export async function getStaticNewsCategories(): Promise<Category[]> {
  const api = await getApiCategories();
  return api
    .filter((category) => category.is_system && category.slug !== "media")
    .map(mapListedCategory);
}

export async function getNewsCategory(): Promise<Category> {
  return NEWS_CATEGORY;
}

export async function getAllCategories(): Promise<Category[]> {
  const [staticCategories, dynamicCategories] = await Promise.all([
    getStaticCategories(),
    getDynamicCategories(),
  ]);
  return [...staticCategories, ...dynamicCategories];
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  if (slug === "home") return HOME_CATEGORY;
  if (slug === "news") return NEWS_CATEGORY;
  const all = await getAllCategories();
  return all.find((category) => category.slug === slug);
}

export async function getMegaMenu(): Promise<Record<string, Article[]>> {
  const api = await getApiCategories();
  const mega: Record<string, Article[]> = {
    news: NEWS_ARTICLES.slice(0, 6),
  };

  for (const category of api) {
    if (!category.is_system || category.slug === "media") continue;
    mega[category.slug] = category.latest_articles.map((card) => mapArticleCard(card));
  }

  return mega;
}
