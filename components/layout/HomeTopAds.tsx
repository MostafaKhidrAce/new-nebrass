"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Ad } from "@/lib/types";

function CameraIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function FeaturedAdPanel({ ad }: { ad: Ad }) {
  const panel = (
    <span className="relative block h-[280px] w-full overflow-hidden md:h-[340px] lg:h-[380px]">
      <Image src={ad.img} alt={ad.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" priority />
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
      {ad.title && (
        <span className="absolute inset-x-4 top-[28%] text-center text-base font-bold leading-snug text-white drop-shadow-md md:top-[30%] md:text-lg lg:text-xl">
          {ad.title}
        </span>
      )}
      <span className="absolute bottom-5 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md">
        <CameraIcon />
      </span>
    </span>
  );

  if (ad.linkType === "external") {
    return (
      <a href={ad.link} target="_blank" rel="noopener noreferrer" className="block">
        {panel}
      </a>
    );
  }

  return (
    <Link href={ad.link} className="block">
      {panel}
    </Link>
  );
}

/** Homepage-only full-width 3-panel strip above the navbar. */
export function HomeTopAds({ ads }: { ads: Ad[] }) {
  const pathname = usePathname();
  if (pathname !== "/" || ads.length === 0) return null;

  return (
    <aside className="w-full bg-black" aria-label="مساحة إعلانية">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {ads.map((ad) => (
          <FeaturedAdPanel key={ad.id} ad={ad} />
        ))}
      </div>
    </aside>
  );
}
