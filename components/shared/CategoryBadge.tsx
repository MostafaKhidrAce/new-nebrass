import Link from "next/link";
import { getAccentClass } from "@/lib/mock/categories";

type CategoryBadgeProps = {
  name: string;
  accent: string;
  href?: string;
};

export function CategoryBadge({ name, accent, href }: CategoryBadgeProps) {
  const className = `inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold text-white ${getAccentClass(accent)}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {name}
      </Link>
    );
  }

  return <span className={className}>{name}</span>;
}
