import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LoadMoreGrid } from "@/components/shared/LoadMore";
import { getAd } from "@/lib/api/ads";
import { getArticlesByCategory } from "@/lib/api/articles";
import { getAllCategories, getCategoryBySlug } from "@/lib/api/categories";
import { getAccentClass } from "@/lib/mock/categories";
import { SITE_NAME } from "@/lib/config";
import { absoluteUrl } from "@/lib/seo";

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories
    .filter((category) => category.slug !== "home" && category.slug !== "media")
    .map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "القسم غير موجود", robots: { index: false } };
  const title = category.name;
  const description = `آخر أخبار ${category.name} على ${SITE_NAME} — تغطية متجددة وأبرز المواد في هذا القسم.`;
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
      locale: "ar_SA",
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

  if (slug === "home") redirect("/");
  if (slug === "media") redirect("/media");

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [page, sectionAd] = await Promise.all([
    getArticlesByCategory(slug, 1),
    getAd("section"),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-3 py-5">
      <header className="mb-5 flex items-center gap-2 border-b border-border pb-3">
        <span className={`h-5 w-1.5 rounded-full ${getAccentClass(category.accent)}`} />
        <h1 className="text-xl font-extrabold text-navy">{category.name}</h1>
        <span className="text-xs text-muted">({page.total} مواد)</span>
      </header>
      <LoadMoreGrid
        slug={slug}
        initialItems={page.items}
        initialHasMore={page.hasMore}
        category={category}
        ad={sectionAd}
      />
    </div>
  );
}
