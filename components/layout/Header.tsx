"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Search } from "lucide-react";
import { ArticleCard } from "@/components/article/ArticleCard";
import { LogoAdSlot } from "@/components/layout/LogoAdSlot";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/shared/SearchOverlay";
import { InstagramIcon, XIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { SOCIAL_LINKS } from "@/lib/config";
import type { Article, Category } from "@/lib/types";
import { formatIsoDate } from "@/lib/utils/formatDate";

type HeaderProps = {
  staticCategories: Category[];
  dynamicCategories: Category[];
  megaMenu: Record<string, Article[]>;
  className?: string;
};

export function Header({ staticCategories, dynamicCategories, megaMenu, className = "" }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const hoveredCategory = staticCategories.find((category) => category.slug === hoveredSlug);
  const hoveredArticles = hoveredSlug ? (megaMenu[hoveredSlug] ?? []) : [];
  const showMegaPanel = Boolean(hoveredCategory && hoveredArticles.length > 0);
  const today = formatIsoDate();

  return (
    <header
      className={`sticky top-0 z-40 shadow-sm ${className}`}
      onMouseLeave={() => setHoveredSlug(null)}
    >
      <div className="hidden bg-white lg:block">
        <div className="mx-auto flex max-w-6xl justify-start px-3 py-3">
          <LogoAdSlot />
        </div>
      </div>

      <div className="bg-chrome text-white lg:bg-white lg:text-navy">
        <div className="mx-auto flex h-12 max-w-6xl items-center gap-2 px-3 lg:h-14">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded p-2 hover:opacity-70 lg:hidden"
            aria-label="بحث"
          >
            <Search className="h-5 w-5" />
          </button>

          <div className="flex flex-1 justify-center lg:hidden">
            <LogoAdSlot compact />
          </div>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex">
            {staticCategories.map((category) => {
              const hasMega =
                (megaMenu[category.slug]?.length ?? 0) > 0 && category.slug !== "home" && category.slug !== "media";

              return (
                <Link
                  key={category.slug}
                  href={category.href}
                  onMouseEnter={() => setHoveredSlug(hasMega ? category.slug : null)}
                  className={`rounded px-2 py-1.5 text-[13px] font-bold hover:opacity-70 ${
                    hoveredSlug === category.slug ? "underline underline-offset-4" : ""
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
            <div className="group relative" onMouseEnter={() => setHoveredSlug(null)}>
              <button
                type="button"
                className="inline-flex items-center gap-0.5 rounded px-2 py-1.5 text-[13px] font-bold hover:opacity-70"
              >
                المزيد
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute top-full left-0 z-50 min-w-[180px] pt-1 opacity-0 transition group-hover:visible group-hover:opacity-100">
                <div className="rounded-md border border-border bg-white py-1.5 text-navy shadow-lg">
                  {dynamicCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={category.href}
                      className="block px-4 py-2 text-sm font-semibold hover:bg-neutral-50 hover:underline"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded p-2 hover:opacity-70 lg:hidden"
            aria-label="القائمة"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-black text-white">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-3">
          <time dateTime={today} className="text-[13px] font-semibold tracking-wide text-mustard" suppressHydrationWarning>
            {today}
          </time>
          <div className="flex items-center gap-3.5" dir="ltr">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden text-white hover:opacity-70 lg:inline-flex"
              aria-label="بحث"
            >
              <Search className="h-4 w-4" />
            </button>
            <a href={SOCIAL_LINKS.youtube} aria-label="يوتيوب" className="text-white opacity-90 hover:opacity-100">
              <YoutubeIcon className="h-4 w-4" />
            </a>
            <a href={SOCIAL_LINKS.instagram} aria-label="إنستغرام" className="text-white opacity-90 hover:opacity-100">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={SOCIAL_LINKS.twitter} aria-label="إكس" className="text-white opacity-90 hover:opacity-100">
              <XIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {showMegaPanel && hoveredCategory && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-border bg-white text-navy shadow-xl">
          <div className="mx-auto max-w-6xl px-3 py-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-extrabold">{hoveredCategory.name}</h3>
              <Link href={hoveredCategory.href} className="text-xs font-semibold hover:underline">
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
