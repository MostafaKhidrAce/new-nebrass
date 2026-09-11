import { ARTICLES } from "@/lib/mock/articles";
import type { Article } from "@/lib/types";

function byDateDesc(a: Article, b: Article) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export const NEWS_ARTICLES: Article[] = ARTICLES.filter((article) => article.category === "news").sort(byDateDesc);
