import { cache } from "react";
import { apiGet } from "@/lib/api/http";
import { mapAd } from "@/lib/api/mappers";
import type { Ad, ApiHomeData } from "@/lib/types";

export const getHome = cache(async () => {
  const json = await apiGet<{ data: ApiHomeData }>("/home");
  return json.data;
});

export async function getHomeHeroAds(limit = 3): Promise<Ad[]> {
  const home = await getHome();
  return home.hero_ads.slice(0, limit).map(mapAd);
}
