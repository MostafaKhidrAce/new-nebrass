import type { Category } from "@/lib/types";

export const HOME_CATEGORY: Category = {
  slug: "home",
  name: "الرئيسية",
  kind: "static",
  accent: "navy",
  href: "/",
};

export const STATIC_NEWS_CATEGORIES: Category[] = [
  { slug: "ksa", name: "المملكة", kind: "static", accent: "ksa", href: "/category/ksa" },
  { slug: "world", name: "العالم", kind: "static", accent: "world", href: "/category/world" },
  { slug: "reports", name: "تقارير", kind: "static", accent: "reports", href: "/category/reports" },
  { slug: "sports", name: "الرياضة", kind: "static", accent: "sports", href: "/category/sports" },
  { slug: "misc", name: "المنوعات", kind: "static", accent: "misc", href: "/category/misc" },
  { slug: "women", name: "المرأة", kind: "static", accent: "women", href: "/category/women" },
  { slug: "society", name: "المجتمع", kind: "static", accent: "society", href: "/category/society" },
  { slug: "culture", name: "ثقافة", kind: "static", accent: "culture", href: "/category/culture" },
];

export const MEDIA_CATEGORY: Category = {
  slug: "media",
  name: "الوسائط",
  kind: "static",
  accent: "media",
  href: "/media",
};

export const NEWS_CATEGORY: Category = {
  slug: "news",
  name: "News",
  kind: "static",
  accent: "news",
  href: "/category/news",
  locale: "en",
};

export const STATIC_NAV_CATEGORIES: Category[] = [
  HOME_CATEGORY,
  ...STATIC_NEWS_CATEGORIES,
  MEDIA_CATEGORY,
  NEWS_CATEGORY,
];

export const DYNAMIC_CATEGORIES: Category[] = [
  { slug: "tech", name: "التقنية", kind: "dynamic", accent: "tech", href: "/category/tech" },
  { slug: "travel", name: "السياحة", kind: "dynamic", accent: "travel", href: "/category/travel" },
  { slug: "economy", name: "اقتصاد", kind: "dynamic", accent: "economy", href: "/category/economy" },
];

export const ALL_CATEGORIES: Category[] = [
  ...STATIC_NAV_CATEGORIES,
  ...DYNAMIC_CATEGORIES,
];

const ACCENT_CLASS: Record<string, string> = {
  navy: "bg-navy",
  ksa: "bg-accent-ksa",
  world: "bg-accent-world",
  reports: "bg-accent-reports",
  sports: "bg-accent-sports",
  misc: "bg-accent-misc",
  variety: "bg-accent-misc",
  women: "bg-accent-women",
  society: "bg-accent-society",
  culture: "bg-accent-culture",
  media: "bg-accent-media",
  tech: "bg-accent-tech",
  travel: "bg-accent-travel",
  economy: "bg-accent-economy",
  news: "bg-accent-news",
};

export function getAccentClass(accent: string): string {
  return ACCENT_CLASS[accent] ?? "bg-navy";
}
