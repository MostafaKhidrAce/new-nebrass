import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/config";
import type { Article } from "@/lib/types";

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return normalized;
}

export function toPlainText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Prefer a clean excerpt, then a stripped HTML body, for meta/OG description. */
export function articleSeoDescription(article: Article): string {
  const excerpt = article.excerpt?.trim();
  if (excerpt) return excerpt;
  const body = toPlainText(article.description);
  return body.slice(0, 220);
}

export function articleMetadata(article: Article, section?: string, english = false): Metadata {
  const title = article.title;
  const description = articleSeoDescription(article);
  const url = absoluteUrl(`/article/${article.id}`);
  const image = {
    url: article.thumbnail,
    alt: title,
    width: 480,
    height: 300,
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: english ? "en_GB" : "ar_SA",
      url,
      title,
      description,
      publishedTime: article.date,
      section,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.thumbnail],
    },
  };
}

export function articleJsonLd(article: Article, categoryName?: string, english = false) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: articleSeoDescription(article),
    image: [article.thumbnail],
    datePublished: article.date,
    dateModified: article.date,
    mainEntityOfPage: absoluteUrl(`/article/${article.id}`),
    inLanguage: english ? "en" : "ar",
    articleSection: categoryName,
    publisher: {
      "@type": "NewsMediaOrganization",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
    },
  };
}

export const rootOpenGraph: Metadata["openGraph"] = {
  type: "website",
  locale: "ar_SA",
  title: "الرئيسية",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
};
