import Link from "next/link";
import { RemoteImage } from "@/components/shared/RemoteImage";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import type { Article, Category } from "@/lib/types";
import { displayArticleDate } from "@/lib/utils/formatDate";

type ArticleHeaderProps = {
  article: Article;
  category?: Category;
};

export function ArticleHeader({ article, category }: ArticleHeaderProps) {
  const isEnglish = category?.locale === "en" || article.lang === "en";

  return (
    <header>
      <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
        <Link href="/" className="hover:text-navy">
          {isEnglish ? "Home" : "الرئيسية"}
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link href={category.href} className="hover:text-navy">
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="line-clamp-1 text-navy">{article.title}</span>
      </nav>
      <div className="relative aspect-[16/8] overflow-hidden rounded-md">
        <RemoteImage
          src={article.mainImage}
          alt={article.title}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 760px"
          className="object-cover"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {category && <CategoryBadge name={category.name} accent={category.accent} href={category.href} />}
        <time className="text-xs text-muted">{displayArticleDate(article, category)}</time>
      </div>
      <h1 className="mt-2 text-2xl font-extrabold leading-snug text-navy md:text-3xl">{article.title}</h1>
    </header>
  );
}
