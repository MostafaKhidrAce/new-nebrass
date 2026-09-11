import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ImageGallery } from "@/components/article/ImageGallery";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { ShareButtons } from "@/components/article/ShareButtons";
import { AdSlot } from "@/components/layout/AdSlot";
import { getArticlePage } from "@/lib/api/articles";
import { getCategoryBySlug } from "@/lib/api/categories";
import { youtubeIdFromUrl } from "@/lib/api/mappers";
import { articleJsonLd, articleMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/article/[id]">): Promise<Metadata> {
  const { id } = await params;
  const data = await getArticlePage(id);
  if (!data) return { title: "المادة غير موجودة", robots: { index: false } };
  const category = await getCategoryBySlug(data.article.category);
  const isEnglish = category?.locale === "en" || data.article.lang === "en";
  return {
    ...articleMetadata(data.article, category?.name, isEnglish),
    other: {
      "article:section": category?.name ?? (isEnglish ? "News" : "أخبار"),
    },
  };
}

export default async function ArticlePage({ params }: PageProps<"/article/[id]">) {
  const { id } = await params;
  const data = await getArticlePage(id);
  if (!data) notFound();

  const { article, related, topAd, bottomAd } = data;
  const category = await getCategoryBySlug(article.category);
  const isEnglish = category?.locale === "en" || article.lang === "en";
  const youtubeId = article.youtubeId || youtubeIdFromUrl(article.videoUrl) || youtubeIdFromUrl(article.embedUrl);

  return (
    <article
      className="mx-auto max-w-3xl px-3 py-5"
      dir={isEnglish ? "ltr" : undefined}
      lang={isEnglish ? "en" : undefined}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article, category?.name, isEnglish)) }}
      />
      <ArticleHeader article={article} category={category} />
      {youtubeId && (
        <div className="relative mt-4 aspect-video overflow-hidden rounded-md bg-black">
          <iframe
            title={article.title}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            className="absolute inset-0 h-full w-full"
            allow="encrypted-media"
            allowFullScreen
          />
        </div>
      )}
      <div className="mt-4">
        <ShareButtons path={`/article/${article.id}`} title={article.title} english={isEnglish} />
      </div>
      {article.source?.name && (
        <p className="mt-3 text-sm text-muted">
          المصدر:{" "}
          {article.source.url ? (
            <a href={article.source.url} className="font-semibold text-navy underline" target="_blank" rel="noopener noreferrer">
              {article.source.name}
            </a>
          ) : (
            <span className="font-semibold text-navy">{article.source.name}</span>
          )}
        </p>
      )}
      <div className="mt-5">
        <ArticleBody html={article.description} ad={topAd} />
      </div>
      {article.images && <ImageGallery images={article.images} alt={article.title} english={isEnglish} />}
      {bottomAd && <AdSlot ads={[bottomAd]} className="mt-6" />}
      <RelatedArticles articles={related} category={category} />
    </article>
  );
}
