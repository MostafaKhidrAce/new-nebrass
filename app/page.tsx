import type { Metadata } from "next";
import { AdSlot } from "@/components/layout/AdSlot";
import { CategorySection } from "@/components/home/CategorySection";
import { HeroSection } from "@/components/home/HeroSection";
import { MediaSection } from "@/components/home/MediaSection";
import { getAllCategories } from "@/lib/api/categories";
import { getHome } from "@/lib/api/home";
import { mapAd, mapArticleCard, mapCategory } from "@/lib/api/mappers";
import { getMediaItems } from "@/lib/api/media";
import { SITE_DESCRIPTION } from "@/lib/config";

export const metadata: Metadata = {
  title: "الرئيسية",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [home, allCategories, media] = await Promise.all([
    getHome(),
    getAllCategories(),
    getMediaItems(),
  ]);

  const featured = [
    ...(home.featured_article ? [mapArticleCard(home.featured_article, { featured: true })] : []),
    ...home.latest_articles.map((card) => mapArticleCard(card)),
  ];

  const midAd = home.home_mid_ad ? mapAd(home.home_mid_ad) : undefined;
  const bottomAd = home.home_bottom_ad ? mapAd(home.home_bottom_ad) : undefined;

  const sections = home.sections.map((section) => ({
    category: mapCategory(section.category),
    articles: section.articles.map((card) => mapArticleCard(card)),
  }));

  const beforeMedia = sections.filter((section) => section.category.slug !== "media" && section.category.slug !== "news");
  const newsSection = sections.find((section) => section.category.slug === "news");

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-7 px-3 py-5">
        <HeroSection articles={featured} categories={allCategories} />

        {beforeMedia.map((section, index) => (
          <div key={section.category.slug} className="space-y-7">
            {index === 2 && midAd && <AdSlot ads={[midAd]} />}
            <CategorySection category={section.category} articles={section.articles} />
          </div>
        ))}

        {bottomAd && <AdSlot ads={[bottomAd]} />}
      </div>
      <MediaSection items={media} />
      {newsSection && newsSection.articles.length > 0 && (
        <div className="mx-auto max-w-6xl px-3 py-5">
          <CategorySection category={newsSection.category} articles={newsSection.articles} />
        </div>
      )}
    </>
  );
}
