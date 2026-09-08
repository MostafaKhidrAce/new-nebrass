import { ADS } from "@/lib/mock/ads";
import type { Ad, AdPlacement } from "@/lib/types";

/** Swap this body for a real fetch later. */
export async function getAds(placement: AdPlacement): Promise<Ad[]> {
  return ADS.filter((ad) => ad.placement === placement);
}

export async function getAd(placement: AdPlacement): Promise<Ad | undefined> {
  return ADS.find((ad) => ad.placement === placement);
}
