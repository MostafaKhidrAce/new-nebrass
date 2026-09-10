import type { Metadata } from "next";
import { AdSlot } from "@/components/layout/AdSlot";
import { CategorySection } from "@/components/home/CategorySection";
import { HeroSection } from "@/components/home/HeroSection";
import { MediaSection } from "@/components/home/MediaSection";
import { getAds } from "@/lib/api/ads";
import { getArticlesByCategory, getFeaturedArticles } from "@/lib/api/articles";
import { getAllCategories, getNewsCategory, getStaticNewsCategories } from "@/lib/api/categories";
import { getMediaItems } from "@/lib/api/media";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: SITE_NAME },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [featured, newsCategories, englishNews, allCategories, media, sectionAds] = await Promise.all([
    getFeaturedArticles(),
    getStaticNewsCategories(),
    getNewsCategory(),
    getAllCategories(),
    getMediaItems(),
    getAds("section"),
  ]);

  const [sections, englishArticles] = await Promise.all([
    Promise.all(
      newsCategories.map(async (category) => ({
        category,
        articles: (await getArticlesByCategory(category.slug, 1, 8)).items,
      })),
    ),
    getArticlesByCategory(englishNews.slug, 1, 8),
  ]);

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-7 px-3 py-5">
        <HeroSection articles={featured} categories={allCategories} />

        {sections.map((section, index) => (
          <div key={section.category.slug} className="space-y-7">
            {(index === 2 || index === 5) && sectionAds[index === 2 ? 0 : 1] && (
              <AdSlot ads={[sectionAds[index === 2 ? 0 : 1]]} />
            )}
            <CategorySection category={section.category} articles={section.articles} />
          </div>
        ))}

        {sectionAds[2] && <AdSlot ads={[sectionAds[2]]} />}
      </div>
      <MediaSection items={media} />
      <div className="mx-auto max-w-6xl px-3 py-5">
        <CategorySection category={englishNews} articles={englishArticles.items} />
      </div>
    </>
  );
}
