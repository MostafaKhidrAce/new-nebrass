import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ImageGallery } from "@/components/article/ImageGallery";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { ShareButtons } from "@/components/article/ShareButtons";
import { AdSlot } from "@/components/layout/AdSlot";
import { getAd } from "@/lib/api/ads";
import { getAllArticles, getArticleById, getRelatedArticles } from "@/lib/api/articles";
import { getCategoryBySlug } from "@/lib/api/categories";
import { SITE_NAME } from "@/lib/config";
import { articleJsonLd, articleMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/article/[id]">): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return { title: "المادة غير موجودة", robots: { index: false } };
  const category = await getCategoryBySlug(article.category);
  const meta = articleMetadata(article);
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      section: category?.name,
    },
    other: {
      "article:section": category?.name ?? SITE_NAME,
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/article/[id]">) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  const [category, related, inContentAd, bottomAd] = await Promise.all([
    getCategoryBySlug(article.category),
    getRelatedArticles(article.id, 4),
    getAd("article-in-content"),
    getAd("article-bottom"),
  ]);

  return (
    <article className="mx-auto max-w-3xl px-3 py-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, category?.name)) }}
      />
      <ArticleHeader article={article} category={category} />
      <div className="mt-4">
        <ShareButtons path={`/article/${article.id}`} title={article.title} />
      </div>
      <div className="mt-5">
        <ArticleBody html={article.description} ad={inContentAd} />
      </div>
      {article.images && <ImageGallery images={article.images} alt={article.title} />}
      {bottomAd && <AdSlot ads={[bottomAd]} className="mt-6" />}
      <RelatedArticles articles={related} category={category} />
    </article>
  );
}
