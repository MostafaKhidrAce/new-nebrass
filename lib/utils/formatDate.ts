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
