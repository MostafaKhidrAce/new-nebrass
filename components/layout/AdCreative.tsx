import Image from "next/image";
import Link from "next/link";
import type { Ad } from "@/lib/types";

type AdCreativeProps = {
  ad: Ad;
  className?: string;
  sizes?: string;
};

export function AdCreative({ ad, className = "", sizes = "100vw" }: AdCreativeProps) {
  const image = (
    <Image src={ad.img} alt={ad.alt} fill sizes={sizes} className="object-cover" />
  );

  const box = `relative block overflow-hidden rounded-md border border-border bg-white shadow-sm ${className}`;

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
