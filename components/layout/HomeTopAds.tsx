"use client";

import { usePathname } from "next/navigation";
import { OverlayMediaCard } from "@/components/shared/OverlayMediaCard";
import type { Ad } from "@/lib/types";

/** Homepage-only strip: 50% + 25% + 25% like al-jazirahonline.com (Zeen block-86). */
export function HomeTopAds({ ads, className = "" }: { ads: Ad[]; className?: string }) {
  const pathname = usePathname();
  if (pathname !== "/" || ads.length === 0) return null;

  const panels = ads.slice(0, 3);

  return (
    <aside className={`w-full bg-black ${className}`} aria-label="مساحة إعلانية">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {panels.map((ad, index) => {
          const isLead = index === 0;
          return (
            <div key={ad.id} className={isLead ? "col-span-2" : "col-span-1"}>
              <OverlayMediaCard
                src={ad.img}
                alt={ad.alt}
                title={ad.title}
                href={ad.link}
                external={ad.linkType === "external"}
                priority={isLead}
                className="h-[240px] sm:h-[300px] md:h-[400px] lg:h-[480px]"
                sizes={isLead ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
