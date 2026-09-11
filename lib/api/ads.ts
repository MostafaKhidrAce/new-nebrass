import { apiGet } from "@/lib/api/http";
import { getHome } from "@/lib/api/home";
import { mapAd } from "@/lib/api/mappers";
import type { Ad, AdPlacement, ApiAd } from "@/lib/types";

const API_PLACEMENT: Record<AdPlacement, string> = {
  "home-top": "home_hero",
  section: "home_mid",
  "article-in-content": "article_top",
  "article-bottom": "article_bottom",
};

export async function getAds(placement: AdPlacement): Promise<Ad[]> {
  if (placement === "home-top") {
    const home = await getHome();
    return home.hero_ads.slice(0, 3).map(mapAd);
  }

  const json = await apiGet<{ data: ApiAd[] }>(`/ads?placement=${API_PLACEMENT[placement]}`);
  return json.data.map(mapAd);
}

export async function getAd(placement: AdPlacement): Promise<Ad | undefined> {
  const ads = await getAds(placement);
  return ads[0];
}
