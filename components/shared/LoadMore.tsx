"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/article/ArticleCard";
import { AdSlot } from "@/components/layout/AdSlot";
import { getArticlesByCategory } from "@/lib/api/articles";
import type { Ad, Article, Category } from "@/lib/types";

type LoadMoreGridProps = {
  slug: string;
  initialItems: Article[];
  initialHasMore: boolean;
  category?: Category;
  ad?: Ad;
};

export function LoadMoreGrid({ slug, initialItems, initialHasMore, category, ad }: LoadMoreGridProps) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    const next = await getArticlesByCategory(slug, page + 1);
    setItems((current) => [...current, ...next.items]);
    setPage((current) => current + 1);
    setHasMore(next.hasMore);
    setLoading(false);
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {items.map((article, index) => (
          <div key={article.id} className="contents">
            {(index === 6 || index === 12) && ad && (
              <div className="col-span-full">
                <AdSlot ads={[ad]} />
              </div>
            )}
            <ArticleCard article={article} category={category} />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => void loadMore()}
            disabled={loading}
            className="rounded-md bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy/90 disabled:opacity-60"
          >
            {category?.locale === "en"
              ? loading
                ? "Loading..."
                : "Load more"
              : loading
                ? "جاري التحميل..."
                : "تحميل المزيد"}
          </button>
        </div>
      )}
    </>
  );
}
