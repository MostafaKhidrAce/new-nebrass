import Image from "next/image";
import Link from "next/link";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import type { Article, Category } from "@/lib/types";
import { formatArabicDate } from "@/lib/utils/formatDate";

type ArticleCardProps = {
  article: Article;
  category?: Category;
  variant?: "default" | "featured" | "compact" | "mega" | "horizontal";
  priority?: boolean;
};

export function ArticleCard({
  article,
  category,
  variant = "default",
  priority = false,
}: ArticleCardProps) {
  const href = `/article/${article.id}`;

  if (variant === "mega") {
    return (
      <Link href={href} className="group block">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="280px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        {category && (
          <div className="mt-2">
            <CategoryBadge name={category.name} accent={category.accent} />
          </div>
        )}
        <h3 className="mt-1.5 line-clamp-3 text-sm font-bold leading-6 text-navy group-hover:text-gold">
          {article.title}
        </h3>
        <time className="mt-1 block text-[11px] text-muted">{formatArabicDate(article.date)}</time>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group flex w-full gap-2.5">
        <div className="relative h-[72px] w-[108px] shrink-0 overflow-hidden rounded-md">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="108px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0">
          {category && <CategoryBadge name={category.name} accent={category.accent} />}
          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-navy group-hover:text-gold">
            {article.title}
          </h3>
          <time className="mt-1 block text-[11px] text-muted">{formatArabicDate(article.date)}</time>
        </div>
      </Link>
    );
  }

  if (variant === "horizontal") {
    return (
      <Link href={href} className="group grid grid-cols-[140px_1fr] gap-3 overflow-hidden rounded-md border border-border bg-card shadow-sm">
        <div className="relative min-h-[96px]">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="140px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="py-2 pe-3">
          {category && <CategoryBadge name={category.name} accent={category.accent} />}
          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-navy group-hover:text-gold">
            {article.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-muted">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  const isFeatured = variant === "featured";

  return (
    <article className="group h-full overflow-hidden rounded-md border border-border bg-card shadow-sm">
      <Link href={href} className="flex h-full flex-col">
        <div
          className={`relative overflow-hidden ${
            isFeatured ? "min-h-[220px] flex-1" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={isFeatured ? article.mainImage : article.thumbnail}
            alt={article.title}
            fill
            priority={priority}
            sizes={isFeatured ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 25vw"}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className={isFeatured ? "p-3.5" : "p-2.5"}>
          {category && <CategoryBadge name={category.name} accent={category.accent} />}
          <h3
            className={`mt-1.5 font-extrabold leading-snug text-navy group-hover:text-gold ${
              isFeatured ? "line-clamp-3 text-lg md:text-xl" : "line-clamp-2 text-sm"
            }`}
          >
            {article.title}
          </h3>
          {isFeatured && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">{article.excerpt}</p>
          )}
          <time className="mt-1.5 block text-[11px] text-muted">{formatArabicDate(article.date)}</time>
        </div>
      </Link>
    </article>
  );
}
