import type { Metadata } from "next";
import { AdSlot } from "@/components/layout/AdSlot";
import { CategorySection } from "@/components/home/CategorySection";
import { HeroSection } from "@/components/home/HeroSection";
import { MediaSection } from "@/components/home/MediaSection";
import { getArticlesByCategory } from "@/lib/api/articles";
import { getAllCategories, getNewsCategory } from "@/lib/api/categories";
import { getHome } from "@/lib/api/home";
import { mapAd, mapArticleCard, mapCategory } from "@/lib/api/mappers";
import { getMediaItems } from "@/lib/api/media";
import { getSettings } from "@/lib/api/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: { absolute: settings.siteName },
    description: settings.tagline,
    alternates: { canonical: "/" },
  };
}

export default async function HomePage() {
  const [home, allCategories, media, englishNews] = await Promise.all([
    getHome(),
    getAllCategories(),
    getMediaItems(),
    getNewsCategory(),
  ]);

  const englishArticles = await getArticlesByCategory(englishNews.slug, 1, 8);

  const featured = [
    ...(home.featured_article ? [mapArticleCard(home.featured_article, { featured: true })] : []),
    ...home.latest_articles.map((card) => mapArticleCard(card)),
  ];

  const midAd = home.home_mid_ad ? mapAd(home.home_mid_ad) : undefined;
  const bottomAd = home.home_bottom_ad ? mapAd(home.home_bottom_ad) : undefined;

  const sections = home.sections
    .filter((section) => section.category.slug !== "media")
    .map((section) => ({
      category: mapCategory(section.category),
      articles: section.articles.map((card) => mapArticleCard(card)),
    }));

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-7 px-3 py-5">
        <HeroSection articles={featured} categories={allCategories} />

        {sections.map((section, index) => (
          <div key={section.category.slug} className="space-y-7">
            {index === 2 && midAd && <AdSlot ads={[midAd]} />}
            <CategorySection category={section.category} articles={section.articles} />
          </div>
        ))}

        {bottomAd && <AdSlot ads={[bottomAd]} />}
      </div>
      <MediaSection items={media} />
      <div className="mx-auto max-w-6xl px-3 py-5">
        <CategorySection category={englishNews} articles={englishArticles.items} />
      </div>
    </>
  );
}
