import Image, { type ImageProps } from "next/image";
import { isOptimizedImageHost } from "@/lib/api/mediaUrl";

type RemoteImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
};

/** next/image for known hosts; unoptimized otherwise so CMS/YouTube URLs never crash the page. */
export function RemoteImage({ src, alt, className, ...props }: RemoteImageProps) {
  if (!src) {
    return (
      <span
        className={`${props.fill ? "absolute inset-0" : "block h-full w-full"} bg-neutral-200 ${className ?? ""}`}
        aria-hidden
      />
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={className}
      unoptimized={!isOptimizedImageHost(src)}
    />
  );
}
