import Link from "next/link";
import { getAccentClass } from "@/lib/mock/categories";

type SectionHeaderProps = {
  title: string;
  href: string;
  accent: string;
};

export function SectionHeader({ title, href, accent }: SectionHeaderProps) {
  return (
    <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
      <Link href={href} className="flex items-center gap-2 text-navy hover:opacity-70">
        <span className={`h-4 w-1 rounded-full ${getAccentClass(accent)}`} />
        <h2 className="text-base font-extrabold">{title}</h2>
      </Link>
      <Link href={href} className="text-xs text-muted hover:text-navy">
        المزيد
      </Link>
    </div>
  );
}
