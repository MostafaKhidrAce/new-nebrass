"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import { ArticleCard } from "@/components/article/ArticleCard";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/shared/SearchOverlay";
import { SiteLogo } from "@/components/shared/SiteLogo";
import type { Article, Category } from "@/lib/types";

type HeaderProps = {
  staticCategories: Category[];
  dynamicCategories: Category[];
  megaMenu: Record<string, Article[]>;
};

export function Header({ staticCategories, dynamicCategories, megaMenu }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const hoveredCategory = staticCategories.find((category) => category.slug === hoveredSlug);
  const hoveredArticles = hoveredSlug ? (megaMenu[hoveredSlug] ?? []) : [];
  const showMegaPanel = Boolean(hoveredCategory && hoveredArticles.length > 0);

  return (
    <header
      className="sticky top-0 z-40 border-b border-border bg-white/95 shadow-sm backdrop-blur"
      onMouseLeave={() => setHoveredSlug(null)}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-3">
        <SiteLogo compact />
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
          {staticCategories.map((category) => {
            const hasMega = (megaMenu[category.slug]?.length ?? 0) > 0 && category.slug !== "home" && category.slug !== "media";

            return (
              <Link
                key={category.slug}
                href={category.href}
                onMouseEnter={() => setHoveredSlug(hasMega ? category.slug : null)}
                className={`rounded px-2 py-1.5 text-[13px] font-bold hover:text-gold ${
                  hoveredSlug === category.slug ? "text-gold" : "text-navy"
                }`}
              >
                {category.name}
              </Link>
            );
          })}
          <div className="group relative" onMouseEnter={() => setHoveredSlug(null)}>
            <button
              type="button"
              className="inline-flex items-center gap-0.5 rounded px-2 py-1.5 text-[13px] font-bold text-navy hover:text-gold"
            >
              المزيد
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute top-full left-0 z-50 min-w-[180px] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="rounded-md border border-border bg-white py-1.5 shadow-lg">
                {dynamicCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={category.href}
                    className="block px-4 py-2 text-sm font-semibold text-navy hover:bg-neutral-50 hover:text-gold"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <div className="ms-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-navy hover:border-gold hover:text-gold"
            aria-label="بحث"
          >
            <Search className="h-4 w-4" />
            <span className="hidden text-xs font-semibold sm:inline">بحث</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded p-2 text-navy hover:bg-neutral-100 lg:hidden"
            aria-label="القائمة"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showMegaPanel && hoveredCategory && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-border bg-white shadow-xl">
          <div className="mx-auto max-w-6xl px-3 py-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-navy">{hoveredCategory.name}</h3>
              <Link href={hoveredCategory.href} className="text-xs font-semibold text-gold hover:underline">
                عرض كل المواد
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {hoveredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} category={hoveredCategory} variant="mega" />
              ))}
            </div>
          </div>
        </div>
      )}

      {searchOpen && (
        <SearchOverlay categories={[...staticCategories, ...dynamicCategories]} onClose={() => setSearchOpen(false)} />
      )}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        staticCategories={staticCategories}
        dynamicCategories={dynamicCategories}
      />
    </header>
  );
}
