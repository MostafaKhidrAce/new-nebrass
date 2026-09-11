import { RemoteImage } from "@/components/shared/RemoteImage";
import Link from "next/link";
import { CameraIcon } from "@/components/shared/CameraIcon";

type OverlayMediaCardProps = {
  src: string;
  alt: string;
  title?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

function CardFace({
  src,
  alt,
  title,
  priority,
  sizes,
  className,
}: Pick<OverlayMediaCardProps, "src" | "alt" | "title" | "priority" | "sizes" | "className">) {
  return (
    <span className={`group relative block w-full overflow-hidden ${className ?? "aspect-[4/3]"}`}>
      <RemoteImage
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority={priority}
      />
      <span className="absolute inset-0 bg-mask/40 transition-colors duration-300 group-hover:bg-mask/55" />
      <span className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/50" />
      {title && (
        <span className="absolute inset-x-4 top-4 text-start text-sm font-bold leading-snug text-white drop-shadow md:top-5 md:text-base lg:text-lg">
          {title}
        </span>
      )}
      <span className="absolute bottom-4 left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-md transition group-hover:scale-110">
        <CameraIcon />
      </span>
    </span>
  );
}

export function OverlayMediaCard({
  src,
  alt,
  title,
  href,
  external,
  onClick,
  priority,
  sizes,
  className,
}: OverlayMediaCardProps) {
  const face = (
    <CardFace src={src} alt={alt} title={title} priority={priority} sizes={sizes} className={className} />
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block h-full w-full text-start">
        {face}
      </button>
    );
  }

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {face}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {face}
      </Link>
    );
  }

  return face;
}
