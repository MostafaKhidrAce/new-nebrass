import { Mail } from "lucide-react";
import { FacebookIcon, LineIcon, XIcon } from "@/components/shared/SocialIcons";
import { SITE_URL } from "@/lib/config";

type ShareButtonsProps = {
  path: string;
  title: string;
};

export function ShareButtons({ path, title }: ShareButtonsProps) {
  const url = `${SITE_URL}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const buttons = [
    {
      label: "فيسبوك",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon className="h-4 w-4" />,
      className: "bg-[#1877F2] text-white",
    },
    {
      label: "إكس",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XIcon className="h-4 w-4" />,
      className: "bg-neutral-900 text-white",
    },
    {
      label: "البريد",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: <Mail className="h-4 w-4" />,
      className: "bg-navy text-white",
    },
    {
      label: "لاين",
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      icon: <LineIcon className="h-4 w-4" />,
      className: "bg-[#06C755] text-white",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button) => (
        <a
          key={button.label}
          href={button.href}
          target={button.label === "البريد" ? undefined : "_blank"}
          rel={button.label === "البريد" ? undefined : "noopener noreferrer"}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold ${button.className}`}
        >
          {button.icon}
          {button.label}
        </a>
      ))}
    </div>
  );
}
