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
import { servicePages, getServicePage } from "@/content/servicePages";
import { coreServices, growthCapabilities } from "@/content/services";
import { areas } from "@/content/areas";
import { dubaiPageFor } from "@/content/dubai";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, service, webPage } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getServicePage((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getServicePage((await params).slug);
  if (!s) notFound();

  const core = s.core ? coreServices.find((c) => c.slug === s.core) : undefined;
  const caps = growthCapabilities.filter((c) => s.capabilities?.includes(c.slug));
  const path = `/services/${s.slug}`;
  const trail = [
    { name: "Services", path: "/services" },
    { name: s.name, path },
  ];
  const others = servicePages.filter((o) => o.slug !== s.slug);
  const dubaiPage = dubaiPageFor(s.slug);

  return (
    <main id="main" data-hero="light" data-page="services">
      <JsonLd data={graph(webPage({ path, name: s.metaTitle, description: s.metaDescription }), breadcrumbs(trail), service(s), faqPage(s.faqs))} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="wrap grid gap-12 pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)] lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Breadcrumbs items={trail} />
            <h1 className="display display-lg fade-up" style={d(100)}>
              {s.h1}
            </h1>
            {s.intro.map((p, i) => (
              <p key={i} className={`fade-up mt-8 max-w-2xl ${i === 0 ? "lede text-charcoal" : "text-charcoal"}`} style={d(300 + i * 100)}>
                {p}
              </p>
            ))}
            <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(500)}>
              <SmartLink href={`/contact?service=${s.enquire}`} className="btn">
                Get a quote <ArrowUpRight />
              </SmartLink>
              <SmartLink href="/work" className="btn btn-ghost">
                See our work <ArrowRight />
              </SmartLink>
            </div>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="media-frame fade-up aspect-[4/5] w-full max-w-md" style={d(250)}>
              <Media item={s.image} priority sizes="(min-width: 1024px) 30vw, 90vw" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
        <div className="wrap pb-16 md:pb-20">
          <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">This covers</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {s.alsoKnownAs.map((k) => (
              <li key={k} className="rounded-full border border-ink/20 px-4 py-2 text-sm text-charcoal">
                {k}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The company profile's own description of this service */}
      {(core || caps.length > 0) && (
        <section aria-labelledby="in-our-words" className="surface-stone py-16 md:py-24">
          <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionLabel>{core ? "From our company profile" : "How we describe it"}</SectionLabel>
              <h2 id="in-our-words" className="display display-sm reveal mt-6">
                {core ? core.title : caps.map((c) => c.title).join(" · ")}
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              {core ? (
                <blockquote className="reveal border-l-2 border-blue pl-6 text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.6] md:pl-9">
                  <p>{core.body}</p>
                </blockquote>
              ) : (
                <div className="grid gap-6">
                  {caps.map((c) => (
                    <p key={c.slug} className="reveal border-l-2 border-blue pl-6 text-[1.1rem] leading-[1.6] md:pl-9">
                      <strong className="font-semibold">{c.title}.</strong> {c.body}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* What's included */}
      <section aria-labelledby="included-title" className="section">
        <div className="wrap">
          <SectionLabel>What’s included</SectionLabel>
          <h2 id="included-title" className="display display-md reveal mt-8 max-w-4xl">
            {s.name}, end to end.
          </h2>
          <ul className={`mt-14 grid border-l border-t border-ink/15 sm:grid-cols-2 ${s.includes.length % 4 === 0 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {s.includes.map((it, i) => (
              <li key={it.title} className="reveal border-b border-r border-ink/15 p-7 md:p-9" style={d((i % 3) * 80)}>
                <span className="mono text-xs text-blue">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-[clamp(1.2rem,1.8vw,1.6rem)]">{it.title}</h3>
                <p className="mt-3 text-charcoal">{it.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {s.showFilms && <FilmIndex />}

      {/* Who it's for */}
      <section aria-labelledby="who-title" className="section pt-0">
        <div className="wrap">
          <div className={`grid gap-8 lg:grid-cols-12 lg:gap-8 ${s.showFilms ? "pt-24 md:pt-32" : ""}`}>
            <div className="lg:col-span-4">
              <SectionLabel>Who it’s for</SectionLabel>
            </div>
            <p className="reveal text-[clamp(1.15rem,1.8vw,1.6rem)] leading-[1.45] lg:col-span-7 lg:col-start-6">{s.forWho}</p>
          </div>
          <div className="mt-16">
            <ClientStrip />
          </div>
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

      {/* Across the UAE */}
      <section aria-labelledby="areas-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>Across the UAE</SectionLabel>
            <h2 id="areas-title" className="display display-sm reveal mt-6">
              {s.name} in every emirate
            </h2>
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {areas.map((a) => (
              <li key={a.slug} className="border-b border-ink/15">
                <SmartLink href={a.slug === "dubai" && dubaiPage ? `/dubai/${dubaiPage.slug}` : `/uae/${a.slug}`} className="group flex min-h-[56px] items-center justify-between gap-4 py-3 transition-colors hover:text-blue">
                  <span>
                    {s.name} in {a.name}
                  </span>
                  <ArrowRight />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Questions */}
      <section aria-labelledby="faq-title" className="section surface-stone">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>Questions</SectionLabel>
            <h2 id="faq-title" className="display display-sm reveal mt-6">
              {s.name}: common questions
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={s.faqs} />
          </div>
        </div>
      </section>

      {/* Related services */}
      <nav aria-labelledby="related-title" className="section">
        <div className="wrap">
          <h2 id="related-title" className="label">
            More from TCE
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <SmartLink
                  href={`/services/${o.slug}`}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/20 px-5 text-[0.95rem] transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
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
