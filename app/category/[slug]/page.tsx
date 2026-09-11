import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdSlot } from "@/components/layout/AdSlot";
import { LoadMoreGrid } from "@/components/shared/LoadMore";
import { getCategoryPage } from "@/lib/api/articles";
import { getAccentClass } from "@/lib/mock/categories";
import { normalizeSlug } from "@/lib/api/mappers";
import { absoluteUrl } from "@/lib/seo";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCategoryPage(normalizeSlug(slug), 1);
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

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const normalized = normalizeSlug(slug);

  if (normalized === "home") redirect("/");
  if (normalized === "media") redirect("/media");
  if (normalized === "misc") redirect("/category/variety");

  const page = await getCategoryPage(normalized, 1);
  if (!page) notFound();
  const { category } = page;
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
          slug={category.slug}
          initialItems={page.items}
          initialHasMore={page.hasMore}
          category={category}
        />
      )}
    </div>
  );
}
