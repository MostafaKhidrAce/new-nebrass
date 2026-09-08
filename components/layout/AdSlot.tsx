import { AdCreative } from "@/components/layout/AdCreative";
import type { Ad } from "@/lib/types";

type AdSlotProps = {
  ads: Ad[];
  className?: string;
};

export function AdSlot({ ads, className = "" }: AdSlotProps) {
  if (ads.length === 0) return null;

  return (
    <aside className={`flex justify-center py-3 ${className}`} aria-label="مساحة إعلانية">
      <AdCreative ad={ads[0]} className="h-[110px] w-full max-w-[728px] md:h-[140px]" sizes="728px" />
    </aside>
  );
}
