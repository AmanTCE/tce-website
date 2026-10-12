import SmartLink from "./SmartLink";
import { ArrowUpRight } from "./Arrow";
import { cta } from "@/content/copy";

/** High-contrast conversion band, shared across pages. */
export default function CtaBand({ headline = cta.headline, body = cta.body }: { headline?: string[]; body?: string }) {
  return (
    <section aria-labelledby="cta-title" className="surface-dark surface-glow grain overflow-hidden">
      <div className="wrap relative z-[2] py-[clamp(6rem,14vw,12rem)]">
        <p className="label reveal mb-10">Start a project</p>
        <h2 id="cta-title" className="display text-[clamp(2.4rem,10vw,11rem)]">
          {headline.map((l, i) => (
            <span key={i} className="block reveal" style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
              {l}
            </span>
          ))}
        </h2>
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:items-end">
          <p className="lede reveal text-white/80 md:col-span-6">{body}</p>
          <div className="reveal md:col-span-6 md:flex md:justify-end" style={{ "--d": "120ms" } as React.CSSProperties}>
            <SmartLink href="/contact" className="btn btn-light btn-lg w-full sm:w-auto">
              {cta.button} <ArrowUpRight />
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
