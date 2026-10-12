import { site } from "@/content/site";
import { asset } from "@/lib/paths";

/** Confirmed brands TCE has worked with, as a slow right-to-left logo slider. */
export default function ClientStrip({ tone = "light" }: { tone?: "light" | "dark" }) {
  if (!site.clients.length) return null;
  const muted = tone === "dark" ? "text-white/55" : "text-mute";

  const items = (hidden: boolean) =>
    site.clients.map((c) => (
      <li key={c.name} className="flex shrink-0 items-center px-8 md:px-12" aria-hidden={hidden || undefined}>
        {c.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(c.logo.src)}
            width={c.logo.width}
            height={c.logo.height}
            alt={hidden ? "" : c.name}
            loading="lazy"
            // Optical sizing: wide wordmarks get shorter, compact marks taller.
            style={{ "--lh": `${Math.round(80 / Math.sqrt(c.logo.width / c.logo.height))}px` } as React.CSSProperties}
            className="h-[calc(var(--lh)*0.75)] w-auto object-contain md:h-[var(--lh)]"
          />
        ) : (
          <span className="display whitespace-nowrap text-[clamp(1.25rem,2.2vw,2rem)]">{c.name}</span>
        )}
      </li>
    ));

  return (
    <div className={`reveal border-y py-8 ${tone === "dark" ? "border-white/15" : "border-ink/15"}`}>
      <div className="flex items-baseline justify-between gap-6">
        <p className={`mono text-[0.7rem] uppercase tracking-[0.14em] ${muted}`}>Brands we’ve worked with</p>
        <p className={`mono text-[0.7rem] uppercase tracking-[0.14em] ${muted}`}>and many more</p>
      </div>
      <div className="logo-slider mt-7">
        <ul className="logo-track" aria-label="Brands we’ve worked with">
          {items(false)}
          {items(true)}
        </ul>
      </div>
    </div>
  );
}
