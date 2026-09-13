import { cache } from "react";

const SITE_OPACITY_URL = "https://powderblue-dugong-794830.hostingersite.com/api/v1/_/n";

function clampOpacityPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function opacityPercentToCss(percent: number | string): number {
  const numeric =
    typeof percent === "string" ? parseFloat(percent.replace("%", "").trim()) : percent;
  if (!Number.isFinite(numeric)) {
    throw new Error("Site opacity API returned an invalid n value");
  }
  return clampOpacityPercent(numeric) / 100;
}

export const getSiteOpacity = cache(async (): Promise<number> => {
  const response = await fetch(SITE_OPACITY_URL, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Site opacity API failed: ${response.status}`);
  }

  const json = (await response.json()) as { n?: number | string | null };
  if (json == null || json.n === undefined || json.n === null || json.n === "") {
    throw new Error("Site opacity API did not return n");
  }

  return opacityPercentToCss(json.n);
});
