"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { searchArticles } from "@/lib/api/articles";
import type { Article, Category } from "@/lib/types";
import { displayArticleDate } from "@/lib/utils/formatDate";

type SearchOverlayProps = {
  onClose: () => void;
  categories: Category[];
};

export function SearchOverlay({ onClose, categories }: SearchOverlayProps) {
  const router = useRouter();
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [matchedCategories, setMatchedCategories] = useState<Category[]>([]);

  const suggestionCategories = categories.filter(
    (category) => category.slug !== "home" && category.kind === "static",
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleQueryChange(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setMatchedCategories([]);
      return;
    }
    try {
      const payload = await searchArticles(value);
      setResults(payload.items.slice(0, 8));
      setMatchedCategories(payload.categories);
    } catch {
      setResults([]);
      setMatchedCategories([]);
    }
  }

  function goToResults(value: string) {
    const q = value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onClose();
  }

  const categoryOf = (slug: string) => categories.find((item) => item.slug === slug);
  const pills = query.trim() && matchedCategories.length > 0 ? matchedCategories : suggestionCategories;

  return (
    <div
      className="fixed inset-0 z-50 bg-chrome/75 px-3 pt-16 backdrop-blur-[2px] sm:pt-24"
      role="dialog"
      aria-modal
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-navy" />
          <h2 id={titleId} className="sr-only">
            البحث
          </h2>
          <input
            autoFocus
            value={query}
            onChange={(event) => {
              void handleQueryChange(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") goToResults(query);
            }}
            placeholder="ابحث عن خبر أو موضوع..."
            className="w-full bg-transparent text-base outline-none placeholder:text-muted"
          />
          {query && (
            <button type="button" onClick={() => void handleQueryChange("")} className="text-xs text-muted hover:text-navy">
              مسح
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="إغلاق البحث" className="rounded-full p-1 text-muted hover:bg-neutral-100 hover:text-navy">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-4 py-3">
          {pills.length > 0 && (
            <div className={query.trim() && results.length > 0 ? "mb-3" : undefined}>
              <p className="mb-2 text-xs font-semibold text-muted">
                {query.trim() && matchedCategories.length > 0 ? "أقسام مطابقة" : "اقتراحات للبحث"}
              </p>
              <div className="flex flex-wrap gap-2">
                {pills.map((category) => (
                  <button
                    key={category.slug}
                    type="button"
                    onClick={() => goToResults(category.name)}
                    className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-navy hover:bg-neutral-50"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              {!query.trim() && (
                <p className="mt-4 text-[11px] text-muted">اضغط Enter لعرض كل النتائج، أو Esc للإغلاق</p>
              )}
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <p className="py-8 text-center text-sm text-muted">لا توجد نتائج مطابقة لـ «{query}»</p>
          )}

          {results.length > 0 && (
            <ul className="space-y-1">
              {results.map((article) => {
                const category = categoryOf(article.category);
                return (
                  <li key={article.id}>
                    <Link
                      href={`/article/${article.id}`}
                      onClick={onClose}
                      className="flex gap-3 rounded-md p-2 hover:bg-neutral-50"
                    >
                      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded">
                        <Image src={article.thumbnail} alt={article.title} fill sizes="96px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        {category && <CategoryBadge name={category.name} accent={category.accent} />}
                        <p className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-navy">{article.title}</p>
                        <time className="mt-0.5 block text-[11px] text-muted">
                          {displayArticleDate(article, category)}
                        </time>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {query.trim() && results.length > 0 && (
          <Link
            href={`/search?q=${encodeURIComponent(query.trim())}`}
            onClick={onClose}
            className="block border-t border-border py-3 text-center text-sm font-bold text-navy hover:bg-neutral-50"
          >
            عرض كل النتائج
          </Link>
        )}
      </div>
    </div>
  );
}
