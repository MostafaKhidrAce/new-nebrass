import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HomeTopAds } from "@/components/layout/HomeTopAds";
import { getAds } from "@/lib/api/ads";
import { getDynamicCategories, getMegaMenu, getStaticCategories } from "@/lib/api/categories";
import { getSettings } from "@/lib/api/settings";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-noto-kufi",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: settings.siteName,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.tagline,
    applicationName: settings.siteName,
    authors: [{ name: settings.siteName, url: SITE_URL }],
    creator: settings.siteName,
    publisher: settings.siteName,
    keywords: ["أخبار", "المملكة", "العالم", "رياضة", "تقارير"],
    alternates: { canonical: "/" },
    icons: settings.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    openGraph: {
      type: "website",
      siteName: settings.siteName,
      locale: "ar_SA",
      title: settings.siteName,
      description: settings.tagline,
      url: SITE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.siteName,
      description: settings.tagline,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [settings, staticCategories, dynamicCategories, megaMenu, homeTopAds] = await Promise.all([
    getSettings(),
    getStaticCategories(),
    getDynamicCategories(),
    getMegaMenu(),
    getAds("home-top"),
  ]);

  return (
    <html lang="ar" dir="rtl" className={`${notoKufi.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <div className="flex flex-col">
          <Header
            className="order-1 md:order-2"
            staticCategories={staticCategories}
            dynamicCategories={dynamicCategories}
            megaMenu={megaMenu}
            currentDate={settings.currentDate}
            currentDateFormatted={settings.currentDateFormatted}
            social={settings.social}
          />
          <HomeTopAds ads={homeTopAds} className="order-2 md:order-1" />
        </div>
        <main className="flex-1">{children}</main>
        <Footer staticCategories={staticCategories} settings={settings} />
      </body>
    </html>
  );
}
