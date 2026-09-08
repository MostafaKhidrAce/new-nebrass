"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import type { MediaItem } from "@/lib/types";

type MediaSectionProps = {
  items: MediaItem[];
  title?: string;
};

export function MediaSection({ items, title = "الوسائط" }: MediaSectionProps) {
  const [active, setActive] = useState<MediaItem | null>(null);

  return (
    <section>
      {title && (
        <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
          <h2 className="flex items-center gap-2 text-base font-extrabold text-navy">
            <span className="h-4 w-1 rounded-full bg-accent-media" />
            {title}
          </h2>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="group overflow-hidden rounded-md border border-border bg-card text-start shadow-sm transition-shadow duration-300 hover:shadow-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-navy/25 transition-colors duration-300 group-hover:bg-navy/40">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-accent-media transition group-hover:scale-110">
                  <Play className="h-5 w-5 fill-current" />
                </span>
              </span>
            </div>
            <h3 className="line-clamp-2 p-2.5 text-sm font-bold text-navy group-hover:text-gold">{item.title}</h3>
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/80 p-4" role="dialog" aria-modal>
          <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-black">
            <div className="flex items-center justify-between bg-navy px-3 py-2 text-white">
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
