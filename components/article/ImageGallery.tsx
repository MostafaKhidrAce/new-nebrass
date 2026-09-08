"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type ImageGalleryProps = {
  images: string[];
  alt: string;
};

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [active, setActive] = useState<string | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="mb-2 text-sm font-bold text-navy">معرض الصور</h2>
      <div className="grid grid-cols-3 gap-2">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(src)}
            className="relative aspect-[4/3] overflow-hidden rounded-md"
          >
            <Image src={src} alt={`${alt} ${index + 1}`} fill sizes="200px" className="object-cover" />
          </button>
        ))}
      </div>
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/85 p-4" role="dialog" aria-modal>
          <button type="button" className="absolute end-4 top-4 text-white" onClick={() => setActive(null)} aria-label="إغلاق">
            <X className="h-6 w-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Image src={active} alt={alt} fill className="object-contain" sizes="90vw" />
          </div>
        </div>
      )}
    </section>
  );
}
