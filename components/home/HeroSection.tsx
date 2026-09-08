import { ArticleCard } from "@/components/article/ArticleCard";
import type { Article, Category } from "@/lib/types";

type HeroSectionProps = {
  articles: Article[];
  categories: Category[];
};

export function HeroSection({ articles, categories }: HeroSectionProps) {
  const [main, ...rest] = articles;
  if (!main) return null;

  const categoryOf = (slug: string) => categories.find((item) => item.slug === slug);

  return (
    <section className="grid items-stretch gap-3 md:grid-cols-5">
      <div className="md:col-span-3">
        <ArticleCard article={main} category={categoryOf(main.category)} variant="featured" priority />
      </div>
      <div className="flex flex-col divide-y divide-border rounded-md border border-border bg-card px-2.5 md:col-span-2">
        {rest.slice(0, 6).map((article) => (
          <div key={article.id} className="flex flex-1 items-center py-2.5">
            <ArticleCard article={article} category={categoryOf(article.category)} variant="compact" />
          </div>
        ))}
      </div>
    </section>
  );
}
