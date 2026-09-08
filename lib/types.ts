export interface Article {
  id: string;
  thumbnail: string;
  mainImage: string;
  images?: string[];
  title: string;
  description: string;
  category: string;
  date: string;
  excerpt: string;
  featured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  kind: "static" | "dynamic";
  accent: string;
  href: string;
}

export interface MediaItem {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
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
