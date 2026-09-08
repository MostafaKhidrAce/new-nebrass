"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { searchArticles } from "@/lib/api/articles";
import type { Article, Category } from "@/lib/types";
import { formatArabicDate } from "@/lib/utils/formatDate";

const SUGGESTIONS = ["الرياض", "الرياضة", "العلا", "التقنية", "المرأة", "المناخ"];

type SearchOverlayProps = {
  onClose: () => void;
  categories: Category[];
};

export function SearchOverlay({ onClose, categories }: SearchOverlayProps) {
  const router = useRouter();
  const titleId = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function handleQueryChange(value: string) {
    setQuery(value);
    const items = await searchArticles(value);
    setResults(items.slice(0, 8));
  }

  function goToResults(value: string) {
    const q = value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onClose();
  }

  const categoryOf = (slug: string) => categories.find((item) => item.slug === slug);

  return (
    <div
      className="fixed inset-0 z-50 bg-navy/75 px-3 pt-16 backdrop-blur-[2px] sm:pt-24"
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
          <Search className="h-5 w-5 shrink-0 text-gold" />
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
            placeholder="ابحث في منارة عن خبر أو موضوع..."
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
          {!query.trim() && (
            <div>
              <p className="mb-2 text-xs font-semibold text-muted">اقتراحات للبحث</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => goToResults(term)}
                    className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-navy hover:border-gold hover:text-gold"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[11px] text-muted">اضغط Enter لعرض كل النتائج، أو Esc للإغلاق</p>
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
                        <time className="mt-0.5 block text-[11px] text-muted">{formatArabicDate(article.date)}</time>
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
            className="block border-t border-border py-3 text-center text-sm font-bold text-navy hover:bg-neutral-50 hover:text-gold"
          >
            عرض كل النتائج
          </Link>
        )}
      </div>
    </div>
  );
}
