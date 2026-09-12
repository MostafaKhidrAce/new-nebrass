import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdSlot } from "@/components/layout/AdSlot";
import { LoadMoreGrid } from "@/components/shared/LoadMore";
import { getCategoryPage } from "@/lib/api/articles";
import { getCategoryBySlug } from "@/lib/api/categories";
import { normalizeSlug, parseCategoryId } from "@/lib/api/mappers";
import { getAccentClass } from "@/lib/mock/categories";
import { absoluteUrl } from "@/lib/seo";

export const dynamicParams = true;

type CategoryRouteProps = {
  params: Promise<{ id: string }>;
};

async function resolveCategoryPage(param: string) {
  const numericId = parseCategoryId(param);
  if (numericId) {
    const page = await getCategoryPage(numericId, 1);
    if (!page) return undefined;
    if (page.category.slug === "media") redirect("/media");
    return page;
  }

  const normalized = normalizeSlug(param);
  if (normalized === "home") redirect("/");

  const slug = normalized === "misc" ? "variety" : normalized;
  const listed = await getCategoryBySlug(slug);
  if (listed?.slug === "media") redirect("/media");
  if (listed?.id) redirect(`/category/${listed.id}`);
  return undefined;
}

export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
  const { id } = await params;
  const page = await resolveCategoryPage(id);
  if (!page) return { title: "القسم غير موجود", robots: { index: false } };
  const { category } = page;
  const isEnglish = category.locale === "en";
  const title = category.name;
  const description = isEnglish
    ? `Latest ${category.name} — rolling coverage and standout stories in this section.`
    : `آخر أخبار ${category.name} — تغطية متجددة وأبرز المواد في هذا القسم.`;
  const url = absoluteUrl(category.href);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      locale: isEnglish ? "en_GB" : "ar_SA",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryRouteProps) {
  const { id } = await params;
  const page = await resolveCategoryPage(id);
  if (!page) notFound();
  const { category } = page;
  const categoryId = category.id;
  if (categoryId == null) notFound();
  const isEnglish = category.locale === "en";

  return (
    <div className="mx-auto max-w-6xl px-3 py-5" dir={isEnglish ? "ltr" : undefined} lang={isEnglish ? "en" : undefined}>
      <header className="mb-5 flex items-center gap-2 border-b border-border pb-3">
        <span className={`h-5 w-1.5 rounded-full ${getAccentClass(category.accent)}`} />
        <h1 className="text-xl font-extrabold text-navy">{category.name}</h1>
        <span className="text-xs text-muted">
          ({page.total} {isEnglish ? "articles" : "مواد"})
        </span>
      </header>
      {page.bannerAd && <AdSlot ads={[page.bannerAd]} className="mb-5" />}
      {page.items.length === 0 ? (
        <p className="rounded-md border border-dashed border-border bg-white p-8 text-center text-sm text-muted">
          {isEnglish ? "No articles in this section yet." : "لا توجد مواد في هذا القسم حالياً."}
        </p>
      ) : (
        <LoadMoreGrid
          categoryId={categoryId}
          initialItems={page.items}
          initialHasMore={page.hasMore}
          category={category}
        />
      )}
    </div>
  );
}
