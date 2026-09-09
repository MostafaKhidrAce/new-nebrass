import type { MediaItem } from "@/lib/types";

function img(id: number, w = 800, h = 450) {
  return `https://picsum.photos/id/${id}/${w}/${h}`;
}

export const MEDIA_ITEMS: MediaItem[] = [
  {
    id: "m1",
    title: "جولة مصوّرة في قلب الرياض بعد افتتاح المسار الثقافي الجديد",
    thumbnail: img(1015),
    youtubeId: "M7lc1UVf-VE",
    date: "2026-09-07T18:00:00.000Z",
  },
  {
    id: "m2",
    title: "تغطية خاصة: كيف تُدار غرفة الأخبار؟",
    thumbnail: img(1016),
    youtubeId: "jNQXAC9IVRw",
    date: "2026-09-05T16:30:00.000Z",
  },
  {
    id: "m3",
    title: "لحظات من نهائي دوري المحترفين على ملعب المملكة",
    thumbnail: img(1018),
    youtubeId: "e-ORhEE9VVg",
    date: "2026-09-03T20:15:00.000Z",
  },
  {
    id: "m4",
    title: "العُلا من الجو: مشاهد تروي قصة الحجر والإنسان",
    thumbnail: img(1019),
    youtubeId: "sGbxmsDFVnE",
    date: "2026-08-30T11:00:00.000Z",
  },
  {
    id: "m5",
    title: "حوار مع خبراء المناخ حول مواسم الأمطار في الجزيرة",
    thumbnail: img(1020),
    youtubeId: "aqz-KE-bpKQ",
    date: "2026-08-26T09:45:00.000Z",
  },
  {
    id: "m6",
    title: "كواليس معرض الكتاب: قرّاء وناشرون في لقطات سريعة",
    thumbnail: img(1024),
    youtubeId: "LXb3EKWsInQ",
    date: "2026-08-21T14:20:00.000Z",
  },
];
