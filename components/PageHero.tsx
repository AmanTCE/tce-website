import Headline from "./Headline";

type Props = {
  label: string;
  lines: string[];
  intro?: string;
  /** Keyword-rich page title. When set it becomes the h1 (shown as the small label) and the big headline becomes display text. */
  h1?: string;
  tone?: "light" | "dark";
  children?: React.ReactNode;
};

/** Interior page opener: oversized headline, label and optional intro. */
export default function PageHero({ label, lines, intro, h1, tone = "light", children }: Props) {
  const Label = h1 ? "h1" : "p";
  return (
    <section className={`${tone === "dark" ? "surface-dark surface-glow grain" : ""} relative overflow-hidden`}>
      <div className="wrap relative z-[2] pb-16 pt-[calc(var(--header-h)+5rem)] md:pb-24 md:pt-[calc(var(--header-h)+8rem)]">
        <Label className={`label fade-up mb-8 ${tone === "dark" ? "text-white/80" : ""}`} style={{ "--d": "150ms" } as React.CSSProperties}>
          {h1 ?? label}
        </Label>
        <Headline as={h1 ? "p" : "h1"} size="xl" lines={lines} onLoad delay={100} />
        {intro && (
          <p className={`lede fade-up mt-10 ${tone === "dark" ? "text-white/80" : "text-charcoal"}`} style={{ "--d": "550ms" } as React.CSSProperties}>
            {intro}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
