const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "https://powderblue-dugong-794830.hostingersite.com/api/v1"
).replace(/\/$/, "");

export function storageOrigin(): string {
  try {
    return new URL(API_URL).origin;
  } catch {
    return "https://powderblue-dugong-794830.hostingersite.com";
  }
}

/** Turn `/storage/...` into an absolute Hostinger URL. Leave http(s) URLs unchanged. */
export function absoluteMediaUrl(url?: string | null): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  if (trimmed.startsWith("//")) return `https:${trimmed}`;
  return `${storageOrigin()}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
}

const OPTIMIZED_HOSTS = new Set([
  "picsum.photos",
  "fastly.picsum.photos",
  "powderblue-dugong-794830.hostingersite.com",
  "i.ytimg.com",
  "img.youtube.com",
]);

export function isOptimizedImageHost(src: string): boolean {
  try {
    const host = new URL(src).hostname;
    return OPTIMIZED_HOSTS.has(host);
  } catch {
    return false;
  }
}
