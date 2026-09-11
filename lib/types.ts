export interface Article {
  id: string;
  thumbnail: string;
  mainImage: string;
  images?: string[];
  title: string;
  description: string;
  category: string;
  date: string;
  dateFormatted?: string;
  excerpt: string;
  featured?: boolean;
  lang?: "ar" | "en";
  mediaType?: "image" | "video";
  videoUrl?: string | null;
  source?: { name: string | null; url: string | null };
}

export interface Category {
  slug: string;
  name: string;
  kind: "static" | "dynamic";
  accent: string;
  href: string;
  locale?: "ar" | "en";
}

export interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId?: string;
  date: string;
}

export interface PaginatedArticles {
  items: Article[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

/** internal = same tab (e.g. /article/ksa-1); external = new tab (e.g. https://portal.sideup.co/) */
export type AdLinkType = "internal" | "external";

export type AdPlacement = "home-top" | "section" | "article-in-content" | "article-bottom";

export interface Ad {
  id: string;
  img: string;
  link: string;
  linkType: AdLinkType;
  placement: AdPlacement;
  alt: string;
  title?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  faviconUrl: string | null;
  aboutHtml: string;
  contact: { phone: string; email: string; address: string };
  social: { youtube: string; instagram: string; x: string };
  currentDate: string;
  currentDateFormatted: string;
}

export interface ArticlePageData {
  article: Article;
  related: Article[];
  topAd?: Ad;
  bottomAd?: Ad;
}

export interface SearchResult {
  items: Article[];
  categories: Category[];
  query: string;
}

export interface ApiCategoryRef {
  id: number;
  name: string;
  slug: string;
  is_system: boolean;
}

export interface ApiArticleCard {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  media_type: "image" | "video";
  views_count: number;
  category: ApiCategoryRef;
  published_at: string;
  published_at_formatted: string;
}

export interface ApiCategoryListItem extends ApiCategoryRef {
  sort_order: number;
  latest_articles: ApiArticleCard[];
}

export interface ApiAd {
  id: number;
  placement: string;
  type: "internal" | "external";
  image_url: string;
  caption_html: string | null;
  sort_order: number;
  external_url: string | null;
  article: { id: number; title: string; slug: string; category_slug: string } | null;
}

export interface ApiArticleDetail extends ApiArticleCard {
  body_html: string;
  video_url: string | null;
  source: { name: string | null; url: string | null };
  created_at_formatted?: string;
  updated_at_formatted?: string;
}

export interface ApiSettings {
  site_name: string;
  tagline: string;
  logo_url: string | null;
  favicon_url: string | null;
  primary_color: string | null;
  about_html: string;
  contact: { phone: string; email: string; address: string };
  social: { youtube: string; instagram: string; x: string };
  current_date: string;
  current_date_formatted: string;
}

export interface ApiHomeData {
  hero_ads: ApiAd[];
  home_mid_ad: ApiAd | null;
  home_bottom_ad: ApiAd | null;
  featured_article: ApiArticleCard | null;
  latest_articles: ApiArticleCard[];
  sections: { category: ApiCategoryRef; articles: ApiArticleCard[] }[];
}

export interface LaravelPagination {
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}
