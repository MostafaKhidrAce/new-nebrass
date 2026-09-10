import {
  ALL_CATEGORIES,
  DYNAMIC_CATEGORIES,
  NEWS_CATEGORY,
  STATIC_NAV_CATEGORIES,
  STATIC_NEWS_CATEGORIES,
} from "@/lib/mock/categories";
import type { Category } from "@/lib/types";

/** Swap these for real endpoints later. */
export async function getStaticCategories(): Promise<Category[]> {
  return STATIC_NAV_CATEGORIES;
}

export async function getStaticNewsCategories(): Promise<Category[]> {
  return STATIC_NEWS_CATEGORIES;
}

export async function getNewsCategory(): Promise<Category> {
  return NEWS_CATEGORY;
}

export async function getDynamicCategories(): Promise<Category[]> {
  return DYNAMIC_CATEGORIES;
}

export async function getAllCategories(): Promise<Category[]> {
  return ALL_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return ALL_CATEGORIES.find((category) => category.slug === slug);
}
