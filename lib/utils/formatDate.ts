/**
 * Format an ISO date as Arabic Gregorian, e.g. "8 سبتمبر 2026".
 */
export function formatArabicDate(isoDate: string): string {
  return new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
  }).format(new Date(isoDate));
}

export function formatArabicLongDate(date: Date = new Date()): string {
  return new Intl.DateTimeFormat("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    calendar: "gregory",
  }).format(date);
}

export function formatEnglishDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function contentLocale(
  article?: { lang?: "ar" | "en" },
  category?: { locale?: "ar" | "en" },
): "ar" | "en" {
  if (article?.lang === "en" || category?.locale === "en") return "en";
  return "ar";
}

export function formatArticleDate(
  isoDate: string,
  article?: { lang?: "ar" | "en" },
  category?: { locale?: "ar" | "en" },
): string {
  return contentLocale(article, category) === "en"
    ? formatEnglishDate(isoDate)
    : formatArabicDate(isoDate);
}

/** Local calendar date as YYYY-MM-DD, matching the reference utility bar. */
export function formatIsoDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
