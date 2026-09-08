import type { Ad } from "@/lib/types";

function banner(id: number, w: number, h: number) {
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

export const ADS: Ad[] = [
  {
    id: "home-top-1",
    img: banner(1015, 900, 720),
    link: "/article/ksa-1",
    linkType: "internal",
    placement: "home-top",
    alt: "إعلان: تغطية النقل العام في الرياض",
    title: "الرياض تطلق مساراً جديداً للنقل العام يربط الأحياء بوسط المدينة",
  },
  {
    id: "home-top-2",
    img: banner(1016, 900, 720),
    link: "https://portal.sideup.co/",
    linkType: "external",
    placement: "home-top",
    alt: "إعلان: سايد أب",
    title: "حلول لوجستية أسرع لتجارتك — اكتشف منصة سايد أب",
  },
  {
    id: "home-top-3",
    img: banner(1020, 900, 720),
    link: "/category/sports",
    linkType: "internal",
    placement: "home-top",
    alt: "إعلان: قسم الرياضة",
    title: "تغطية رياضية شاملة لأبرز المباريات والبطولات",
  },
  {
    id: "section-1",
    img: banner(1024, 970, 250),
    link: "/article/reports-1",
    linkType: "internal",
    placement: "section",
    alt: "إعلان: تقرير العمل عن بُعد",
  },
  {
    id: "section-2",
    img: banner(1033, 970, 250),
    link: "https://portal.sideup.co/",
    linkType: "external",
    placement: "section",
    alt: "إعلان: سايد أب — الخدمات اللوجستية",
  },
  {
    id: "section-3",
    img: banner(1044, 970, 250),
    link: "/media",
    linkType: "internal",
    placement: "section",
    alt: "إعلان: الوسائط",
  },
  {
    id: "article-mid-1",
    img: banner(1073, 728, 200),
    link: "/article/women-3",
    linkType: "internal",
    placement: "article-in-content",
    alt: "إعلان: بحث طبي محلي",
  },
  {
    id: "article-bottom-1",
    img: banner(287, 728, 200),
    link: "https://portal.sideup.co/",
    linkType: "external",
    placement: "article-bottom",
    alt: "إعلان: سايد أب",
  },
];
