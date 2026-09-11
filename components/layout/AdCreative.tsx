import { RemoteImage } from "@/components/shared/RemoteImage";
import Link from "next/link";
import type { Ad } from "@/lib/types";

type AdCreativeProps = {
  ad: Ad;
  className?: string;
  sizes?: string;
};

export function AdCreative({ ad, className = "", sizes = "100vw" }: AdCreativeProps) {
  const image = (
    <>
      <RemoteImage
        src={ad.img}
        alt={ad.alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/45" />
    </>
  );

  const box = `group relative block overflow-hidden rounded-md border border-border bg-white shadow-sm ${className}`;

  if (ad.linkType === "external") {
    return (
      <a href={ad.link} target="_blank" rel="noopener noreferrer" className={box}>
        {image}
      </a>
    );
  }

  return (
    <Link href={ad.link} className={box}>
      {image}
    </Link>
  );
}
