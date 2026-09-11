"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { OverlayMediaCard } from "@/components/shared/OverlayMediaCard";
import { getArticleBySlug } from "@/lib/api/articles";
import { youtubeIdFromUrl } from "@/lib/api/mappers";
import type { MediaItem } from "@/lib/types";

type MediaSectionProps = {
  items: MediaItem[];
  title?: string;
};

export function MediaSection({ items, title = "الوسائط" }: MediaSectionProps) {
  const router = useRouter();
  const [active, setActive] = useState<MediaItem | null>(null);
  const [opening, setOpening] = useState<string | null>(null);

  async function openItem(item: MediaItem) {
    if (item.youtubeId) {
      setActive(item);
      return;
    }

    setOpening(item.id);
    try {
      const article = await getArticleBySlug(item.id);
      const youtubeId = article?.youtubeId || youtubeIdFromUrl(article?.videoUrl) || youtubeIdFromUrl(article?.embedUrl);
      if (youtubeId) {
        setActive({ ...item, youtubeId });
      } else {
        router.push(`/article/${item.id}`);
      }
    } catch {
      router.push(`/article/${item.id}`);
    } finally {
      setOpening(null);
    }
  }

  return (
    <section className="mt-7">
      {title && (
        <div className="mx-auto max-w-6xl px-3 pb-2">
          <h2 className="text-base font-extrabold text-navy">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {items.map((item) => (
          <OverlayMediaCard
            key={item.id}
            src={item.thumbnail}
            alt={item.title}
            title={item.title}
            onClick={() => {
              if (opening) return;
              void openItem(item);
            }}
            className="h-[240px] sm:h-[280px] md:h-[300px]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ))}
      </div>

      {active?.youtubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-chrome/80 p-4" role="dialog" aria-modal>
          <div className="w-full max-w-3xl overflow-hidden bg-black">
            <div className="flex items-center justify-between bg-chrome px-3 py-2 text-white">
              <p className="line-clamp-1 text-sm font-semibold">{active.title}</p>
              <button type="button" onClick={() => setActive(null)} aria-label="إغلاق الفيديو">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative aspect-video">
              <iframe
                title={active.title}
                src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1`}
                className="absolute inset-0 h-full w-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
