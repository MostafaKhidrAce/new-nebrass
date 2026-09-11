import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LoadMoreGrid } from "@/components/shared/LoadMore";
import { getCategoryPage } from "@/lib/api/articles";
import { getAllCategories, getCategoryBySlug } from "@/lib/api/categories";
import { getAccentClass } from "@/lib/mock/categories";
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

  if (slug === "home") redirect("/");
  if (slug === "media") redirect("/media");
  if (slug === "misc") redirect("/category/variety");

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const page = await getCategoryPage(slug, 1);
  if (!page) notFound();
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
      <LoadMoreGrid
        slug={slug}
        initialItems={page.items}
        initialHasMore={page.hasMore}
        category={category}
        ad={page.bannerAd}
      />
    </div>
  );
}
