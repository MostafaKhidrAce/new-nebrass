import { getArticlesByCategory } from "@/lib/api/articles";
import { getCategoryBySlug } from "@/lib/api/categories";
import type { MediaItem } from "@/lib/types";

export async function getMediaItems(): Promise<MediaItem[]> {
  const media = await getCategoryBySlug("media");
  if (!media?.id) return [];

  const first = await getArticlesByCategory(media.id, 1);
  const articles = [...first.items];
  let page = first.page;
  let hasMore = first.hasMore;

  while (hasMore) {
    page += 1;
    const next = await getArticlesByCategory(media.id, page);
    articles.push(...next.items);
    hasMore = next.hasMore;
  }

  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    thumbnail: article.thumbnail,
    date: article.date,
    youtubeId: article.youtubeId ?? undefined,
  }));
}
