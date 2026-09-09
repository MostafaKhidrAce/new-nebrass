import type { Metadata } from "next";
import Link from "next/link";
import { MediaSection } from "@/components/home/MediaSection";
import { getMediaItems } from "@/lib/api/media";

export const metadata: Metadata = {
  title: "الوسائط",
  description: "مقاطع وتغطيات مصوّرة — شاهد أحدث المواد المرئية.",
  alternates: { canonical: "/media" },
  openGraph: {
    type: "website",
    title: "الوسائط",
    description: "مقاطع وتغطيات مصوّرة — شاهد أحدث المواد المرئية.",
    url: "/media",
    locale: "ar_SA",
  },
};

export default async function MediaPage() {
  const items = await getMediaItems();

  return (
    <div className="py-5">
      <nav className="mx-auto mb-3 max-w-6xl px-3 text-[11px] text-muted">
        <Link href="/" className="hover:text-navy">
          الرئيسية
        </Link>
        <span> / الوسائط</span>
      </nav>
      <MediaSection items={items} />
    </div>
  );
}
