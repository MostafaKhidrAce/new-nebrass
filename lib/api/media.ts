import { getArticlesByCategory } from "@/lib/api/articles";
import type { MediaItem } from "@/lib/types";

export async function getMediaItems(): Promise<MediaItem[]> {
  const page = await getArticlesByCategory("media", 1);
  return page.items.map((article) => ({
    id: article.id,
    title: article.title,
    thumbnail: article.thumbnail,
    date: article.date,
    youtubeId: article.youtubeId ?? undefined,
  }));
}
