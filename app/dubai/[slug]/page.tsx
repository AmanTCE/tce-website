import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Media from "@/components/Media";
import SectionLabel from "@/components/SectionLabel";
import SmartLink from "@/components/SmartLink";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClientStrip from "@/components/ClientStrip";
import FilmIndex from "@/components/FilmIndex";
import Approach from "@/components/Approach";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { ArrowRight, ArrowUpRight } from "@/components/Arrow";
import { dubaiPages, getDubaiPage } from "@/content/dubai";
import { getServicePage, servicePages } from "@/content/servicePages";
import { getArea } from "@/content/areas";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, orgId, webPage } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return dubaiPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getDubaiPage((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/dubai/${p.slug}` });
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function DubaiPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getDubaiPage((await params).slug);
  if (!p) notFound();

  const path = `/dubai/${p.slug}`;
  const trail = [
    { name: "Dubai", path: "/uae/dubai" },
    { name: p.name, path },
  ];
  const dubai = getArea("dubai")!;
  const base = p.includesFrom ? getServicePage(p.includesFrom) : undefined;
  const cards = (p.services ?? []).map(getServicePage).filter((s): s is NonNullable<typeof s> => Boolean(s));
  const others = dubaiPages.filter((o) => o.slug !== p.slug);
  const url = absoluteUrl(path);
  const serviceNode = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: p.h1,
    serviceType: p.serviceType,
    description: p.metaDescription,
    url,
    provider: { "@id": orgId },
    areaServed: { "@type": "City", name: "Dubai", containedInPlace: { "@type": "Country", name: "United Arab Emirates" } },
  };

  return (
    <main id="main" data-hero="light" data-page="services">
      <JsonLd data={graph(webPage({ path, name: p.metaTitle, description: p.metaDescription }), breadcrumbs(trail), serviceNode, faqPage(p.faqs))} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="wrap grid gap-12 pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)] lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Breadcrumbs items={trail} />
            <h1 className="display display-lg fade-up" style={d(100)}>
              {p.h1}
            </h1>
            {p.intro.map((t, i) => (
              <p key={i} className={`fade-up mt-8 max-w-2xl ${i === 0 ? "lede text-charcoal" : "text-charcoal"}`} style={d(300 + i * 100)}>
                {t}
              </p>
            ))}
            <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(500)}>
              <SmartLink href={`/contact?service=${p.enquire}`} className="btn">
                Get a quote <ArrowUpRight />
              </SmartLink>
              <SmartLink href="/work" className="btn btn-ghost">
                See our work <ArrowRight />
              </SmartLink>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="media-frame fade-up aspect-[4/5] w-full max-w-md" style={d(250)}>
              <Media item={p.image} priority sizes="(min-width: 1024px) 30vw, 90vw" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Why a Dubai team */}
      <section aria-labelledby="why-title" className="section surface-stone">
        <div className="wrap">
          <SectionLabel>Why TCE in Dubai</SectionLabel>
          <h2 id="why-title" className="display display-md reveal mt-8 max-w-4xl">
            A Dubai team that plans, shoots and runs the work.
          </h2>
          <ul className="mt-14 grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {p.why.map((w, i) => (
              <li key={w.title} className="reveal border-b border-r border-ink/15 p-7 md:p-9" style={d(i * 80)}>
                <span className="mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-[clamp(1.2rem,1.8vw,1.6rem)]">{w.title}</h3>
                <p className="mt-3 text-charcoal">{w.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included, or the services behind a broad page */}
      <section aria-labelledby="included-title" className="section">
        <div className="wrap">
          <SectionLabel>{base ? "What’s included" : "What we do"}</SectionLabel>
          <h2 id="included-title" className="display display-md reveal mt-8 max-w-4xl">
            {base ? `${base.name} in Dubai, end to end.` : "Every part of your digital marketing, in one place."}
          </h2>
          {base ? (
            <ul className={`mt-14 grid border-l border-t border-ink/15 sm:grid-cols-2 ${base.includes.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {base.includes.map((it, i) => (
                <li key={it.title} className="reveal border-b border-r border-ink/15 p-7 md:p-9" style={d((i % 3) * 80)}>
                  <h3 className="display text-[clamp(1.2rem,1.8vw,1.6rem)]">{it.title}</h3>
                  <p className="mt-3 text-charcoal">{it.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-14 grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((s, i) => (
                <li key={s.slug} className="reveal border-b border-r border-ink/15" style={d((i % 3) * 80)}>
                  <SmartLink href={`/services/${s.slug}`} className="group flex h-full flex-col p-7 md:p-9">
                    <h3 className="display text-[clamp(1.2rem,1.8vw,1.6rem)] transition-colors group-hover:text-blue">{s.name}</h3>
                    <p className="mt-3 flex-1 text-charcoal">{s.summary}</p>
                    <span className="mono mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-blue">
                      Learn more <ArrowRight />
                    </span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          )}
          {base && (
            <p className="reveal mt-8 text-charcoal">
              Working outside Dubai too? See{" "}
              <SmartLink href={`/services/${base.slug}`} className="underline decoration-blue underline-offset-4">
                {base.name.toLowerCase()} across the UAE
              </SmartLink>
              .
            </p>
          )}
        </div>
      </section>

      {p.showFilms && <FilmIndex />}

      {/* Dubai: industries and places */}
      <section aria-labelledby="dubai-title" className="section">
        <div className={`wrap grid gap-14 lg:grid-cols-12 lg:gap-8 ${p.showFilms ? "pt-24 md:pt-32" : ""}`}>
          <div className="lg:col-span-4">
            <SectionLabel>Across Dubai</SectionLabel>
            <h2 id="dubai-title" className="display display-sm reveal mt-6">
              Working with Dubai brands
            </h2>
            <p className="reveal mt-6 text-charcoal">
              <strong className="font-semibold text-ink">Industries we work with:</strong> {dubai.industries}
            </p>
            {site.contact.meetings && <p className="reveal mt-4 text-charcoal">{site.contact.meetings}</p>}
          </div>
          <ul className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
            {dubai.locations.map((l, i) => (
              <li key={l.name} className="reveal grid gap-2 border-b border-ink/15 py-6 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8" style={d(i * 70)}>
                <h3 className="font-semibold">{l.name}</h3>
                <p className="text-charcoal">{l.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="wrap mt-20">
          <ClientStrip />
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="section surface-stone">
        <div className="wrap">
          <SectionLabel>How we work</SectionLabel>
          <h2 id="process-title" className="display display-md reveal mt-8">
            Every great result starts with a clear direction.
          </h2>
          <Approach />
        </div>
      </section>

      {/* Questions */}
      <section aria-labelledby="faq-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>Questions</SectionLabel>
            <h2 id="faq-title" className="display display-sm reveal mt-6">
              {p.name}: common questions
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={p.faqs} />
          </div>
        </div>
      </section>

      {/* More in Dubai */}
      <nav aria-labelledby="related-title" className="section surface-stone">
        <div className="wrap">
          <h2 id="related-title" className="label">
            More from TCE in Dubai
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <SmartLink href={`/dubai/${o.slug}`} className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.95rem] transition-colors hover:border-ink hover:bg-ink hover:text-white">
                  {o.name}
                </SmartLink>
              </li>
            ))}
            {servicePages
              .filter((s) => s.slug !== p.includesFrom && !p.services?.includes(s.slug))
              .map((s) => (
                <li key={s.slug}>
                  <SmartLink href={`/services/${s.slug}`} className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.95rem] transition-colors hover:border-ink hover:bg-ink hover:text-white">
                    {s.name}
                  </SmartLink>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <CtaBand />
    </main>
  );
}
