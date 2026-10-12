/** Questions and answers as native disclosure widgets: keyboard and screen-reader friendly, no script needed. */
export default function Faq({ items, tone = "light", level = 3 }: { items: { q: string; a: string }[]; tone?: "light" | "dark"; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  const line = tone === "dark" ? "border-white/15" : "border-ink/15";
  return (
    <div className={`border-t ${line}`}>
      {items.map((f) => (
        <details key={f.q} className={`faq group border-b ${line}`}>
          <summary className="flex min-h-[44px] cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <H className="text-[clamp(1.05rem,1.6vw,1.3rem)] font-semibold leading-snug">{f.q}</H>
            <span aria-hidden="true" className="relative mt-1.5 h-4 w-4 shrink-0 transition-transform duration-500 ease-out-expo group-open:rotate-45">
              <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
            </span>
          </summary>
          <p className={`max-w-3xl pb-7 pr-10 ${tone === "dark" ? "text-white/75" : "text-charcoal"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
