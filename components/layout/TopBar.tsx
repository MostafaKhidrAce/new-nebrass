import { SOCIAL_LINKS } from "@/lib/config";
import { formatArabicLongDate } from "@/lib/utils/formatDate";
import { InstagramIcon, XIcon, YoutubeIcon } from "@/components/shared/SocialIcons";

export function TopBar() {
  const today = formatArabicLongDate();

  return (
    <div className="border-b border-border bg-navy text-white">
      <div className="mx-auto flex h-8 max-w-6xl items-center justify-between px-3 text-[11px]">
        <time dateTime={new Date().toISOString()}>{today}</time>
        <div className="flex items-center gap-2.5">
          <a href={SOCIAL_LINKS.twitter} aria-label="إكس" className="opacity-80 hover:opacity-100">
            <XIcon className="h-3.5 w-3.5" />
          </a>
          <a href={SOCIAL_LINKS.instagram} aria-label="إنستغرام" className="opacity-80 hover:opacity-100">
            <InstagramIcon className="h-3.5 w-3.5" />
          </a>
          <a href={SOCIAL_LINKS.youtube} aria-label="يوتيوب" className="opacity-80 hover:opacity-100">
            <YoutubeIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
