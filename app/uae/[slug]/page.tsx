import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionLabel from "@/components/SectionLabel";
import SmartLink from "@/components/SmartLink";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClientStrip from "@/components/ClientStrip";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { ArrowRight, ArrowUpRight } from "@/components/Arrow";
import { areas, getArea } from "@/content/areas";
import { servicePages } from "@/content/servicePages";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, orgId, webPage } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArea((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.metaTitle, description: a.metaDescription, path: `/uae/${a.slug}` });
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const a = getArea((await params).slug);
  if (!a) notFound();

  const path = `/uae/${a.slug}`;
  const trail = [
    { name: "Across the UAE", path: "/uae" },
    { name: a.name, path },
  ];
  const others = areas.filter((o) => o.slug !== a.slug);
  const offers = {
    "@type": "OfferCatalog",
    name: `TCE services in ${a.name}`,
    itemListElement: servicePages.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: `${s.name} in ${a.name}`, serviceType: s.serviceType, provider: { "@id": orgId }, areaServed: { "@type": "AdministrativeArea", name: a.name } } })),
  };

  return (
    <main id="main" data-hero="light" data-page="uae">
      <JsonLd data={graph({ ...webPage({ path, name: a.metaTitle, description: a.metaDescription }), mainEntity: offers }, breadcrumbs(trail), faqPage(a.faqs))} />

      <section className="relative overflow-hidden">
        <div className="wrap pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]">
          <Breadcrumbs items={trail} />
          <h1 className="display display-lg fade-up max-w-5xl" style={d(100)}>
            Video production & digital marketing in {a.name}
          </h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-8">
            {a.intro.map((p, i) => (
              <p key={i} className={`fade-up lg:col-span-5 ${i === 0 ? "lede text-charcoal" : "text-charcoal lg:col-start-7 lg:pt-2"}`} style={d(300 + i * 100)}>
                {p}
              </p>
            ))}
          </div>
          <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(500)}>
            <SmartLink href="/contact" className="btn">
              Start a project in {a.name} <ArrowUpRight />
            </SmartLink>
            <SmartLink href="/work" className="btn btn-ghost">
              See our work <ArrowRight />
            </SmartLink>
          </div>
        </div>
      </section>

      {/* Services in this emirate */}
      <section aria-labelledby="services-title" className="section surface-stone">
        <div className="wrap">
          <SectionLabel>What we do in {a.name}</SectionLabel>
          <h2 id="services-title" className="display display-md reveal mt-8 max-w-4xl">
            Creative production and marketing, under one roof.
          </h2>
          <ul className="mt-14 grid border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {servicePages.map((s, i) => (
              <li key={s.slug} className="reveal border-b border-r border-ink/15" style={d((i % 3) * 80)}>
                <SmartLink href={`/services/${s.slug}`} className="group flex h-full flex-col p-7 md:p-9">
                  <h3 className="display text-[clamp(1.2rem,1.8vw,1.6rem)] transition-colors group-hover:text-blue">
                    {s.name} in {a.name}
                  </h3>
                  <p className="mt-3 flex-1 text-charcoal">{s.summary}</p>
                  <span className="mono mt-6 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-blue">
                    Learn more <ArrowRight />
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Locations and industries */}
      <section aria-labelledby="locations-title" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>Shooting in {a.name}</SectionLabel>
            <h2 id="locations-title" className="display display-sm reveal mt-6">
              Places that make a film look like {a.name}
            </h2>
            <p className="reveal mt-6 text-charcoal">
              <strong className="font-semibold text-ink">Industries we work with here:</strong> {a.industries}
            </p>
          </div>
          <ul className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
            {a.locations.map((l, i) => (
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

      <section aria-labelledby="faq-title" className="section surface-stone">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>Questions</SectionLabel>
            <h2 id="faq-title" className="display display-sm reveal mt-6">
              Working with TCE in {a.name}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={a.faqs} />
          </div>
        </div>
      </section>

      <nav aria-labelledby="other-areas" className="section">
        <div className="wrap">
          <h2 id="other-areas" className="label">
            Other emirates we work in
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <SmartLink href={`/uae/${o.slug}`} className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.95rem] transition-colors hover:border-ink hover:bg-ink hover:text-white">
                  {o.name}
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
