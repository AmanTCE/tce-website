"use client";

import { useState } from "react";
import SmartLink from "./SmartLink";
import Media from "./Media";
import { ArrowUpRight } from "./Arrow";
import type { Service } from "@/content/services";
import { servicePageForCore } from "@/content/servicePages";

const hrefFor = (s: Service) => {
  const page = servicePageForCore(s.slug);
  return page ? `/services/${page.slug}` : `/services#${s.slug}`;
};

/**
 * Large stacked service rows. Desktop: whole row links to the full service,
 * with a contextual image sliding in on hover/focus. Mobile/tablet: accordion.
 */
export default function ServiceRows({ services }: { services: Service[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-t border-ink/15">
      {/* Desktop */}
      <ul className="hidden lg:block">
        {services.map((s, i) => (
          <li key={s.slug} className="reveal border-b border-ink/15" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
            <SmartLink href={hrefFor(s)} className="group relative grid grid-cols-12 items-center gap-6 py-9 xl:py-11">
              <span className="mono col-span-1 text-sm text-mute">{s.number}</span>
              <h3 className="display display-md col-span-6 transition-transform duration-700 ease-out-expo group-hover:translate-x-4 group-focus-visible:translate-x-4">
                {s.title}
              </h3>
              <p className="col-span-4 max-w-sm text-[0.95rem] text-charcoal transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0">
                {s.summary}
              </p>
              <span className="col-span-1 flex justify-end">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 ease-out-expo group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRight />
                </span>
              </span>
              <span
                className="pointer-events-none absolute right-24 top-1/2 z-10 h-44 w-36 -translate-y-1/2 overflow-hidden opacity-0 transition-all duration-700 ease-out-expo [clip-path:inset(50%_0_50%_0)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:opacity-100 group-focus-visible:[clip-path:inset(0_0_0_0)] xl:right-32 xl:h-52 xl:w-44"
                aria-hidden="true"
              >
                <Media item={s.image} sizes="180px" className="h-full w-full object-cover" />
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>

      {/* Mobile & tablet accordion */}
      <ul className="lg:hidden">
        {services.map((s) => {
          const isOpen = open === s.slug;
          return (
            <li key={s.slug} className="border-b border-ink/15">
              <h3>
                <button
                  type="button"
                  className="flex w-full items-center gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${s.slug}`}
                  onClick={() => setOpen(isOpen ? null : s.slug)}
                >
                  <span className="mono w-7 shrink-0 text-xs text-mute">{s.number}</span>
                  <span className="display flex-1 text-[clamp(1.2rem,5.4vw,2.2rem)] leading-[1.02]">{s.title}</span>
                  <span className={`relative h-4 w-4 shrink-0 transition-transform duration-500 ease-out-expo ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">
                    <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                  </span>
                </button>
              </h3>
              <div id={`svc-${s.slug}`} className={`grid transition-[grid-template-rows] duration-500 ease-out-expo ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden" inert={!isOpen}>
                  <div className="grid gap-5 pb-8 pl-11 sm:grid-cols-[1fr_160px] sm:items-start">
                    <div>
                      <p className="text-charcoal">{s.summary}</p>
                      <SmartLink href={hrefFor(s)} className="link-line mt-5">
                        Read more <ArrowUpRight />
                      </SmartLink>
                    </div>
                    <div className="media-frame aspect-[4/3] sm:aspect-[3/4]">
                      <Media item={s.image} sizes="(min-width: 640px) 160px, 90vw" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
