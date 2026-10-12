import { growthCapabilities } from "@/content/services";

/** The additional growth capabilities, always shown apart from the five core services. */
export default function Capabilities({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const line = tone === "dark" ? "border-white/15" : "border-ink/15";
  return (
    <ul className={`border-t ${line}`}>
      {growthCapabilities.map((c, i) => (
        <li key={c.slug} id={c.slug} className={`reveal grid gap-3 border-b ${line} py-7 md:py-8`} style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
          <h3 className="display display-sm flex items-start gap-4">
            <span aria-hidden="true" className={`mono mt-1 text-sm font-normal ${tone === "dark" ? "text-sky" : "text-blue"}`}>+</span>
            {c.title}
          </h3>
          <p className={`max-w-xl pl-8 ${tone === "dark" ? "text-white/70" : "text-charcoal"}`}>{c.body}</p>
        </li>
      ))}
    </ul>
  );
}
