import Link from "next/link";
// import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { BackToTop } from "@/components/layout/BackToTop";
import { LogoAdSlot } from "@/components/layout/LogoAdSlot";
import { InstagramIcon, XIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { USEFUL_LINKS } from "@/lib/config";
import type { Category, SiteSettings } from "@/lib/types";
import { sanitizeHtml } from "@/lib/utils/sanitizeHtml";

type FooterProps = {
  staticCategories: Category[];
  settings: SiteSettings;
};

export function Footer({ staticCategories, settings }: FooterProps) {
  const about = sanitizeHtml(settings.aboutHtml);

  return (
    <footer className="mt-8 bg-chrome text-white">
      <div className="border-b border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-3">
          <LogoAdSlot inverted ad={settings.navAd} />
          <div className="flex items-center gap-3">
            <a href={settings.social.x} aria-label="إكس" className="opacity-80 hover:opacity-100">
              <XIcon className="h-4 w-4" />
            </a>
            <a href={settings.social.instagram} aria-label="إنستغرام" className="opacity-80 hover:opacity-100">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={settings.social.youtube} aria-label="يوتيوب" className="opacity-80 hover:opacity-100">
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 px-3 py-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <h3 className="mb-3 text-sm font-bold text-white">من نحن</h3>
          {about ? (
            <div
              className="text-xs leading-6 text-white/75 [&_p]:mb-2"
              dangerouslySetInnerHTML={{ __html: about }}
            />
          ) : (
            <p className="text-xs leading-6 text-white/75">{settings.tagline}</p>
          )}
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-white">الأقسام</h3>
          <ul className="space-y-1.5 text-xs text-white/80">
            {staticCategories.map((category) => (
              <li key={category.slug}>
                <Link href={category.href} className="hover:opacity-70">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-white">روابط مفيدة</h3>
          <ul className="space-y-1.5 text-xs text-white/80">
            {USEFUL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:opacity-70">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-white">المركز الرئيسي</h3>
          <ul className="space-y-2 text-xs leading-6 text-white/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/70" />
              <span>{settings.contact.address}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-white/70" />
              {settings.contact.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-white/70" />
              {settings.contact.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-3 py-2 text-[11px] text-white/70">
          {staticCategories.map((category) => (
            <Link key={category.slug} href={category.href} className="hover:opacity-70">
              {category.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3">
          <p className="text-[11px] text-white/60">© 2026. جميع الحقوق محفوظة</p>
          <BackToTop />
          {/* <Image src="/logos/Orca-tech logo.svg" alt="" width={80} height={88} className="h-5 w-auto" /> */}
        </div>
      </div>
    </footer>
  );
}
