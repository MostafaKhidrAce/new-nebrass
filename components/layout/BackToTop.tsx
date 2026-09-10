"use client";

import { ChevronUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      aria-label="العودة إلى الأعلى"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
