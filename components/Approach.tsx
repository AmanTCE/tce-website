import { approachSteps } from "@/content/copy";

/** Four-stage approach: horizontal timeline on desktop, vertical on mobile. */
export default function Approach() {
  return (
    <ol className="relative mt-16 grid gap-0 md:mt-24 lg:grid-cols-4 lg:gap-8">
      {/* desktop rail */}
      <span aria-hidden="true" className="absolute left-0 right-0 top-[11px] hidden h-px bg-ink/20 lg:block" />
      {/* mobile rail */}
      <span aria-hidden="true" className="absolute bottom-6 left-[11px] top-3 w-px bg-ink/20 lg:hidden" />
      {approachSteps.map((step, i) => (
        <li key={step.number} className="reveal relative grid grid-cols-[24px_1fr] gap-6 pb-12 last:pb-0 lg:block lg:pb-0" style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
          <span aria-hidden="true" className="relative z-[1] mt-0.5 flex h-[23px] w-[23px] items-center justify-center rounded-full border border-ink/30 bg-paper">
            <span className="h-[7px] w-[7px] rounded-full bg-blue" />
          </span>
          <div className="lg:mt-10">
            <p className="mono text-xs text-mute">Stage {step.number}</p>
            <h3 className="display mt-3 text-[clamp(1.5rem,2.1vw,2.2rem)]">{step.title}</h3>
            <p className="mt-4 max-w-xs text-charcoal">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
