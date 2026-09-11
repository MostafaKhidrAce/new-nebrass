import type { Metadata } from "next";
import Link from "next/link";
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
  const [result, categories] = await Promise.all([searchArticles(query), getAllCategories()]);

  return (
    <div className="mx-auto max-w-6xl px-3 py-5">
      <h1 className="mb-4 text-xl font-extrabold text-navy">
        {query ? `نتائج البحث عن «${query}»` : "البحث"}
      </h1>
      {result.categories.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold text-muted">أقسام مطابقة</p>
          <div className="flex flex-wrap gap-2">
            {result.categories.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-navy hover:bg-neutral-50"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      {result.items.length === 0 ? (
        <p className="rounded-md border border-dashed border-border bg-white p-8 text-center text-sm text-muted">
          لا توجد نتائج
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {result.items.map((article) => (
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
