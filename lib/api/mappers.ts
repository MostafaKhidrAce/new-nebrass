import type {
  Ad,
  AdPlacement,
  ApiAd,
  ApiArticleCard,
  ApiArticleDetail,
  ApiCategoryListItem,
  ApiCategoryRef,
  ApiSettings,
  Article,
  Category,
  SiteSettings,
} from "@/lib/types";
import { absoluteMediaUrl } from "@/lib/api/mediaUrl";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const AD_PLACEMENT: Record<string, AdPlacement> = {
  home_hero: "home-top",
  home_mid: "section",
  home_bottom: "section",
  article_top: "article-in-content",
  article_bottom: "article-bottom",
  category_banner: "section",
  nav: "nav",
};

export function categoryHref(slug: string): string {
  if (slug === "media") return "/media";
  return `/category/${slug}`;
}

/** Decode route params that may arrive percent-encoded (Arabic CMS slugs). */
export function normalizeSlug(value: string): string {
  let current = value.trim();
  for (let i = 0; i < 3; i += 1) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) break;
      current = decoded;
    } catch {
      break;
    }
  }
  return current;
}

export function accentForSlug(slug: string): string {
  if (slug === "variety") return "variety";
  return slug;
}

export function isEnglishCategory(slug: string): boolean {
  return slug === "news";
}

export function mapCategory(category: ApiCategoryRef): Category {
  return {
    slug: category.slug,
    name: category.name,
    kind: category.is_system ? "static" : "dynamic",
    accent: accentForSlug(category.slug),
    href: categoryHref(category.slug),
    locale: isEnglishCategory(category.slug) ? "en" : undefined,
  };
}

export function youtubeIdFromUrl(url?: string | null): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\//, "") || null;
    }
    const fromQuery = parsed.searchParams.get("v");
    if (fromQuery) return fromQuery;
    const embed = parsed.pathname.match(/\/embed\/([^/]+)/);
    return embed?.[1] ?? null;
  } catch {
    return null;
  }
}

export function mapArticleCard(card: ApiArticleCard, extra?: Partial<Article>): Article {
  const image = absoluteMediaUrl(card.image_url);
  const youtubeId = card.youtube_id || youtubeIdFromUrl(card.video_url) || youtubeIdFromUrl(card.embed_url);
  return {
    id: card.slug,
    title: card.title,
    excerpt: card.excerpt ?? "",
    description: "",
    thumbnail: image,
    mainImage: image,
    category: card.category.slug,
    date: card.published_at,
    dateFormatted: card.published_at_formatted,
    mediaType: card.media_type,
    videoUrl: card.video_url,
    embedUrl: card.embed_url,
    youtubeId,
    lang: isEnglishCategory(card.category.slug) ? "en" : undefined,
    ...extra,
  };
}

export function mapArticleDetail(detail: ApiArticleDetail): Article {
  return mapArticleCard(detail, {
    description: detail.body_html ?? "",
    videoUrl: detail.video_url,
    source: detail.source,
  });
}

export function mapAd(ad: ApiAd): Ad {
  const title = stripHtml(ad.caption_html ?? "");
  const internalSlug = ad.article?.slug;
  return {
    id: String(ad.id),
    img: absoluteMediaUrl(ad.image_url),
    linkType: ad.type,
    link: ad.type === "external" ? (ad.external_url ?? "#") : `/article/${internalSlug ?? ""}`,
    placement: AD_PLACEMENT[ad.placement] ?? "section",
    alt: title || "إعلان",
    title: title || undefined,
  };
}

export function mapSettings(data: ApiSettings): SiteSettings {
  return {
    tagline: data.tagline,
    aboutHtml: data.about_html ?? "",
    contact: data.contact,
    social: data.social,
    currentDate: data.current_date,
    currentDateFormatted: data.current_date_formatted,
    navAd: data.nav_ad ? mapAd(data.nav_ad) : undefined,
  };
}

export function mapListedCategory(item: ApiCategoryListItem): Category {
  return mapCategory(item);
}

