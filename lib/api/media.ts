import { MEDIA_ITEMS } from "@/lib/mock/media";
import type { MediaItem } from "@/lib/types";

/** Swap this body for a real fetch later. */
export async function getMediaItems(): Promise<MediaItem[]> {
  return MEDIA_ITEMS;
}

export async function getMediaItemById(id: string): Promise<MediaItem | undefined> {
  return MEDIA_ITEMS.find((item) => item.id === id);
}
