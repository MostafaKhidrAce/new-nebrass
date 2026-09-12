const ACCENT_CLASS: Record<string, string> = {
  navy: "bg-navy",
  ksa: "bg-accent-ksa",
  world: "bg-accent-world",
  reports: "bg-accent-reports",
  sports: "bg-accent-sports",
  misc: "bg-accent-misc",
  variety: "bg-accent-misc",
  women: "bg-accent-women",
  society: "bg-accent-society",
  culture: "bg-accent-culture",
  media: "bg-accent-media",
  tech: "bg-accent-tech",
  travel: "bg-accent-travel",
  economy: "bg-accent-economy",
  news: "bg-accent-news",
};

export function getAccentClass(accent: string): string {
  return ACCENT_CLASS[accent] ?? "bg-navy";
}
