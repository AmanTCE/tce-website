import type { MediaItem } from "@/content/media";
import { asset } from "@/lib/paths";

type Props = {
  item: MediaItem;
  sizes?: string;
  className?: string;
  priority?: boolean;
  imgClassName?: string;
};

/** Responsive image with explicit dimensions (no layout shift) and lazy loading below the fold. */
export default function Media({ item, sizes = "(min-width: 1024px) 50vw, 100vw", className = "", priority = false, imgClassName = "" }: Props) {
  if (item.kind === "video") {
    return (
      <video
        className={`${className} ${imgClassName}`}
        src={asset(item.src)}
        poster={item.poster ? asset(item.poster) : undefined}
        width={item.width}
        height={item.height}
        muted
        playsInline
        loop
        autoPlay
        preload={priority ? "auto" : "metadata"}
        aria-label={item.alt}
      />
    );
  }
  const srcSet = item.srcSm ? `${asset(item.srcSm)} 800w, ${asset(item.src)} ${item.width}w` : undefined;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(item.src)}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={item.alt}
      width={item.width}
      height={item.height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`${className} ${imgClassName}`}
    />
  );
}
