import { ArticleCard } from "@/components/article/ArticleCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import type { Article, Category } from "@/lib/types";

type CategorySectionProps = {
  category: Category;
  articles: Article[];
};

export function CategorySection({ category, articles }: CategorySectionProps) {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <section>
      <SectionHeader title={category.name} href={category.href} accent={category.accent} />
      <div className="grid gap-3 md:grid-cols-4">
        <div className="md:col-span-2">
          <ArticleCard article={featured} category={category} variant="featured" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:col-span-2">
          {rest.slice(0, 4).map((article) => (
            <ArticleCard key={article.id} article={article} category={category} />
          ))}
        </div>
      </div>
      {rest.length > 4 && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {rest.slice(4, 7).map((article) => (
            <ArticleCard key={article.id} article={article} category={category} variant="compact" />
          ))}
        </div>
      )}
    </section>
  );
}
