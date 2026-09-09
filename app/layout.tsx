import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HomeTopAds } from "@/components/layout/HomeTopAds";
import { getAds } from "@/lib/api/ads";
import { getLatestByCategory } from "@/lib/api/articles";
import { getDynamicCategories, getStaticCategories, getStaticNewsCategories } from "@/lib/api/categories";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";
import { rootOpenGraph } from "@/lib/seo";
import "./globals.css";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-noto-kufi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: ["أخبار", "المملكة", "العالم", "رياضة", "تقارير"],
  alternates: { canonical: "/" },
  openGraph: rootOpenGraph,
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [staticCategories, dynamicCategories, newsCategories, homeTopAds] = await Promise.all([
    getStaticCategories(),
    getDynamicCategories(),
    getStaticNewsCategories(),
    getAds("home-top"),
  ]);

  const megaEntries = await Promise.all(
    newsCategories.map(async (category) => [category.slug, await getLatestByCategory(category.slug, 6)] as const),
  );
  const megaMenu = Object.fromEntries(megaEntries);

  return (
    <html lang="ar" dir="rtl" className={`${notoKufi.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <div className="flex flex-col">
          <Header
            className="order-1 md:order-2"
            staticCategories={staticCategories}
            dynamicCategories={dynamicCategories}
            megaMenu={megaMenu}
          />
          <HomeTopAds ads={homeTopAds} className="order-2 md:order-1" />
        </div>
        <main className="flex-1">{children}</main>
        <Footer staticCategories={staticCategories} />
      </body>
    </html>
  );
}
