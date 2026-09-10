import { ArticleCard } from "@/components/article/ArticleCard";
import type { Article, Category } from "@/lib/types";

type RelatedArticlesProps = {
  articles: Article[];
  category?: Category;
};

export function RelatedArticles({ articles, category }: RelatedArticlesProps) {
  if (articles.length === 0) return null;
  const isEnglish = category?.locale === "en";

  return (
    <section className="mt-8">
      <h2 className="mb-3 border-b border-border pb-2 text-base font-extrabold text-navy">
        {isEnglish ? "Related articles" : "مواد ذات صلة"}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} category={category} />
        ))}
      </div>
    </section>
  );
}
