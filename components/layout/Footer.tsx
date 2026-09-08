import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLogo } from "@/components/shared/SiteLogo";
import { InstagramIcon, XIcon, YoutubeIcon } from "@/components/shared/SocialIcons";
import { CONTACT, SITE_DESCRIPTION, SITE_NAME, SOCIAL_LINKS, USEFUL_LINKS } from "@/lib/config";
import type { Category } from "@/lib/types";

type FooterProps = {
  staticCategories: Category[];
};

export function Footer({ staticCategories }: FooterProps) {
  return (
    <footer className="mt-8 bg-navy text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-3 py-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <SiteLogo inverted />
          <p className="mt-3 text-xs leading-6 text-white/75">{SITE_DESCRIPTION}</p>
          <div className="mt-3 flex gap-2.5">
            <a href={SOCIAL_LINKS.twitter} aria-label="إكس" className="opacity-80 hover:opacity-100">
              <XIcon className="h-4 w-4" />
            </a>
            <a href={SOCIAL_LINKS.instagram} aria-label="إنستغرام" className="opacity-80 hover:opacity-100">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href={SOCIAL_LINKS.youtube} aria-label="يوتيوب" className="opacity-80 hover:opacity-100">
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-gold">الأقسام</h3>
          <ul className="space-y-1.5 text-xs text-white/80">
            {staticCategories.map((category) => (
              <li key={category.slug}>
                <Link href={category.href} className="hover:text-gold">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-gold">روابط مفيدة</h3>
          <ul className="space-y-1.5 text-xs text-white/80">
            {USEFUL_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-gold">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-gold">{CONTACT.title}</h3>
          <ul className="space-y-2 text-xs leading-6 text-white/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
              <span>
                {CONTACT.address}
                <br />
                {CONTACT.poBox}
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-gold" />
              {CONTACT.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-gold" />
              {CONTACT.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-3 py-2 text-[11px] text-white/70">
          {staticCategories.map((category) => (
            <Link key={category.slug} href={category.href} className="hover:text-gold">
              {category.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-3 py-3 sm:flex-row">
          <p className="text-[11px] text-white/60">© 2026 {SITE_NAME}. جميع الحقوق محفوظة</p>
          <div className="flex items-center gap-2.5 text-[11px] text-white/70">
            <span>تصميم وتطوير بواسطة</span>
            <span className="group relative inline-flex cursor-pointer">
              <img
                src="/logos/Orca-tech%20logo.svg"
                alt="Orca-Tech"
                className="h-8 w-auto transition duration-300 ease-out group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(196,163,90,0.55)]"
              />
              <span className="pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-20 -translate-x-1/2 translate-y-1.5 scale-90 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                <span className="relative flex items-center gap-1.5 rounded-full border border-gold/50 bg-[#0a1c33] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-gold shadow-[0_10px_30px_rgba(0,0,0,0.45),0_0_16px_rgba(196,163,90,0.2)]">
                  Orca-tech
                </span>
                <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-[3px] rotate-45 border-b border-e border-gold/50 bg-[#0a1c33]" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
