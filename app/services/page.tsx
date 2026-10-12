import type { Metadata } from "next";
import Media from "@/components/Media";
import SectionLabel from "@/components/SectionLabel";
import PageHero from "@/components/PageHero";
import Capabilities from "@/components/Capabilities";
import CtaBand from "@/components/CtaBand";
import SmartLink from "@/components/SmartLink";
import { ArrowUpRight } from "@/components/Arrow";
import { servicesPage } from "@/content/copy";
import { coreServices } from "@/content/services";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { servicePages, servicePageForCore } from "@/content/servicePages";
import { breadcrumbs, graph, webPage } from "@/lib/schema";
import { ArrowRight } from "@/components/Arrow";

const title = "Digital Marketing & Video Production Services in the UAE";
const description =
  "Video production, social media, Meta ads, content strategy, UGC, SEO and marketing consulting from TCE, for brands across all seven emirates of the UAE.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/services" });

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function ServicesPage() {
  return (
    <main id="main" data-hero="light" data-page="services">
      <JsonLd
        data={graph(
          {
            ...webPage({ path: "/services", name: title, description, type: "CollectionPage" }),
            mainEntity: { "@type": "ItemList", itemListElement: servicePages.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: absoluteUrl(`/services/${s.slug}`) })) },
          },
          breadcrumbs([{ name: "Services", path: "/services" }]),
        )}
      />
      <PageHero label="Services" h1="Digital marketing & video production services in the UAE" lines={servicesPage.headline} intro={servicesPage.intro}>
        <nav aria-label="Services on this page" className="fade-up mt-14 md:mt-20" style={d(700)}>
          <ul className="flex flex-wrap gap-2">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <SmartLink href={`/services/${s.slug}`} className="mono inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/20 px-4 text-[0.72rem] uppercase tracking-[0.1em] transition-colors hover:border-ink hover:bg-ink hover:text-white">
                  {s.name}
                </SmartLink>
              </li>
            ))}
            <li>
              <a href="#growth-capabilities" className="mono inline-flex min-h-[44px] items-center gap-2 rounded-full border border-blue/40 px-4 text-[0.72rem] uppercase tracking-[0.1em] text-blue transition-colors hover:bg-blue hover:text-white">
                + Growth capabilities
              </a>
            </li>
          </ul>
        </nav>
      </PageHero>

      {/* Core services: original profile wording */}
      <div className="border-t border-ink/15">
        {coreServices.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className={`border-b border-ink/15 py-20 md:py-32 ${flip ? "surface-stone" : ""}`}>
              <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
                <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <div className="media-frame reveal-img aspect-[4/5] w-full max-w-xl">
                    <Media item={s.image} sizes="(min-width: 1024px) 40vw, 92vw" className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <div className="flex items-center gap-4">
                    <SectionLabel>Core service</SectionLabel>
                    <span className="mono reveal text-xs text-mute">{s.number} / 05</span>
                  </div>
                  <p aria-hidden="true" className="display outline-text reveal mt-8 text-[clamp(4rem,10vw,9rem)] leading-none text-ink/40">
                    {s.number}
                  </p>
                  <h2 id={`${s.slug}-title`} className="display reveal mt-4 text-[clamp(1.55rem,4vw,4.4rem)]">
                    {s.title}
                  </h2>
                  <p className="reveal mt-8 max-w-xl text-[clamp(1.08rem,1.4vw,1.25rem)] leading-[1.7] text-charcoal" style={d(80)}>
                    {s.body}
                  </p>
                  <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8" style={d(140)}>
                    <SmartLink href={`/contact?service=${s.slug}`} className="btn">
                      Enquire about {s.title} <ArrowUpRight />
                    </SmartLink>
                    {servicePageForCore(s.slug) && (
                      <SmartLink href={`/services/${servicePageForCore(s.slug)!.slug}`} className="link-line">
                        More on {servicePageForCore(s.slug)!.name} <ArrowRight />
                      </SmartLink>
                    )}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Additional capabilities, kept separate from the profile's five services */}
      <section id="growth-capabilities" aria-labelledby="capabilities-title" className="section surface-dark surface-glow grain overflow-hidden">
        <div className="wrap relative z-[2] grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel>Beyond the core five</SectionLabel>
              <h2 id="capabilities-title" className="display display-md reveal mt-8">
                Additional growth capabilities
              </h2>
              <p className="reveal mt-8 max-w-md text-white/75">
                Alongside the five core services, TCE supports businesses with the strategy and systems that connect creative work to commercial goals: a recognisable brand, organised marketing, smoother customer journeys and more effective digital operations.
              </p>
              <div className="reveal mt-10">
                <SmartLink href="/contact?service=growth-marketing" className="btn btn-light">
                  Talk about growth <ArrowUpRight />
                </SmartLink>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Capabilities />
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
