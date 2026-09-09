import type { Metadata } from "next";
import { ArticleCard } from "@/components/article/ArticleCard";
import { searchArticles } from "@/lib/api/articles";
import { getAllCategories } from "@/lib/api/categories";

export async function generateMetadata({ searchParams }: PageProps<"/search">): Promise<Metadata> {
  const { q } = await searchParams;
  const query = Array.isArray(q) ? (q[0] ?? "") : (q ?? "");
  return {
    title: query ? `نتائج البحث: ${query}` : "البحث",
    description: query ? `نتائج البحث عن «${query}»` : "ابحث في الأرشيف الإخباري.",
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({ searchParams }: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = Array.isArray(q) ? (q[0] ?? "") : (q ?? "");
  const [results, categories] = await Promise.all([searchArticles(query), getAllCategories()]);

  return (
    <div className="mx-auto max-w-6xl px-3 py-5">
      <h1 className="mb-4 text-xl font-extrabold text-navy">
        {query ? `نتائج البحث عن «${query}»` : "البحث"}
      </h1>
      {results.length === 0 ? (
        <p className="rounded-md border border-dashed border-border bg-white p-8 text-center text-sm text-muted">
          لا توجد نتائج
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {results.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              category={categories.find((item) => item.slug === article.category)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
