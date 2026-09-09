import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-3 py-16 text-center">
      <p className="text-sm font-bold text-navy">404</p>
      <h1 className="mt-2 text-2xl font-extrabold text-navy">الصفحة غير موجودة</h1>
      <p className="mt-2 text-sm text-muted">تعذر العثور على هذه الصفحة.</p>
      <Link href="/" className="mt-5 inline-block rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white">
        العودة إلى الرئيسية
      </Link>
    </div>
  );
}
