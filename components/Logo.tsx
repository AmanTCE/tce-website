import { asset } from "@/lib/paths";

/**
 * The authentic TCE logo, extracted with its original transparency from the
 * company profile. The white version is a pixel inversion of the same file,
 * matching the white-on-dark logo TCE supplied. Never redraw or retype it.
 */
export default function Logo({ tone = "dark", className = "", priority = false }: { tone?: "dark" | "light"; className?: string; priority?: boolean }) {
  const src = tone === "light" ? "/brand/tce-logo-white.png" : "/brand/tce-logo-black.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(src)}
      alt="The Creative Economy"
      width={381}
      height={200}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
