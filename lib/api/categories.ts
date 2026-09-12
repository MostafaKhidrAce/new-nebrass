import { cache } from "react";
import { apiGet } from "@/lib/api/http";
import { mapArticleCard, mapListedCategory, normalizeSlug } from "@/lib/api/mappers";
import type { ApiCategoryListItem, Article, Category } from "@/lib/types";

export const HOME_CATEGORY: Category = {
  slug: "home",
  name: "الرئيسية",
  kind: "static",
  accent: "navy",
  href: "/",
};

export const getApiCategories = cache(async (): Promise<ApiCategoryListItem[]> => {
  const json = await apiGet<{ data: ApiCategoryListItem[] }>("/categories");
  return json.data;
});

export async function getStaticCategories(): Promise<Category[]> {
  const api = await getApiCategories();
  const system = api.filter((category) => category.is_system).map(mapListedCategory);
  return [HOME_CATEGORY, ...system];
}

export async function getDynamicCategories(): Promise<Category[]> {
  const api = await getApiCategories();
  return api.filter((category) => !category.is_system).map(mapListedCategory);
}

export async function getAllCategories(): Promise<Category[]> {
  const [staticCategories, dynamicCategories] = await Promise.all([
    getStaticCategories(),
    getDynamicCategories(),
  ]);
  return [...staticCategories, ...dynamicCategories];
}

export async function getCategoryById(id: number): Promise<Category | undefined> {
  const api = await getApiCategories();
  const match = api.find((category) => category.id === id);
  return match ? mapListedCategory(match) : undefined;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const needle = normalizeSlug(slug);
  if (needle === "home") return HOME_CATEGORY;
  const api = await getApiCategories();
  const match = api.find((category) => normalizeSlug(category.slug) === needle);
  return match ? mapListedCategory(match) : undefined;
}

export async function getMegaMenu(): Promise<Record<string, Article[]>> {
  const api = await getApiCategories();
  const mega: Record<string, Article[]> = {};

  for (const category of api) {
    if (!category.is_system || category.slug === "media") continue;
    mega[category.slug] = category.latest_articles.map((card) => mapArticleCard(card));
  }

  return mega;
}
