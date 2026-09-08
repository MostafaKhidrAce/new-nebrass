import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/config";

type SiteLogoProps = {
  compact?: boolean;
  inverted?: boolean;
};

export function SiteLogo({ compact = false, inverted = false }: SiteLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 no-underline">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          inverted ? "bg-gold text-navy" : "bg-navy text-gold"
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M12 2.2 4.8 8.4h2.3v2.1h9.8V8.4h2.3L12 2.2Zm-4.2 9.7v6.4h1.8v-6.4H7.8Zm6.6 0v6.4h1.8v-6.4h-1.8ZM5.4 19.6v1.7h13.2v-1.7H5.4Z" />
          <path d="M11.1 6.1h1.8v1.6h-1.8z" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block text-lg font-extrabold tracking-tight ${inverted ? "text-white" : "text-navy"}`}>
          {SITE_NAME}
        </span>
        {!compact && (
          <span className={`block text-[10px] ${inverted ? "text-white/70" : "text-muted"}`}>{SITE_TAGLINE}</span>
        )}
      </span>
    </Link>
  );
}
