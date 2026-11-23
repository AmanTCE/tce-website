import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import Media from "@/components/Media";
import RichText from "@/components/RichText";
import SmartLink from "@/components/SmartLink";
import { ArrowRight } from "@/components/Arrow";
import { anchor, blockText, formatDate, getPost, posts, readingMinutes, type Block } from "@/content/blog";
import { servicePages } from "@/content/servicePages";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { blogPosting, breadcrumbs, faqPage, graph, webPage } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  const base = pageMetadata({
    title: p.metaTitle,
    description: p.description,
    path: `/blog/${p.slug}`,
    image: { url: p.cover.src, width: p.cover.width, height: p.cover.height, alt: p.cover.alt },
  });
  return {
    ...base,
    authors: [{ name: site.name, url: site.url }],
    openGraph: { ...base.openGraph, type: "article", publishedTime: p.published, modifiedTime: p.updated, section: p.category, authors: [site.name] },
  };
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function BlockView({ b }: { b: Block }) {
  if ("p" in b) return <p className="mt-5 text-[1.075rem] leading-relaxed text-charcoal"><RichText text={b.p} /></p>;
  if ("ul" in b || "ol" in b) {
    const items = "ul" in b ? b.ul : b.ol;
    const List = "ul" in b ? "ul" : "ol";
    return (
      <List className={`mt-5 grid gap-3 pl-6 text-[1.075rem] leading-relaxed text-charcoal ${"ul" in b ? "list-disc" : "list-decimal"} marker:text-blue`}>
        {items.map((t, i) => (
          <li key={i} className="pl-1"><RichText text={t} /></li>
        ))}
      </List>
    );
  }
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[0.98rem]">
        <thead>
          <tr className="border-b border-ink/30">
            {b.table.head.map((h, i) => (
              <th key={i} scope="col" className="mono py-3 pr-4 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-mute">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.table.rows.map((r, i) => (
            <tr key={i} className="border-b border-ink/15 align-top">
              {r.map((c, j) =>
                j === 0 ? (
                  <th key={j} scope="row" className="py-3 pr-4 font-semibold">{c}</th>
                ) : (
                  <td key={j} className="py-3 pr-4 text-charcoal">{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();

  const path = `/blog/${p.slug}`;
  const trail = [
    { name: "Blog", path: "/blog" },
    { name: p.title, path },
  ];
  const related = servicePages.filter((s) => p.services.includes(s.slug));
  const more = posts.filter((o) => o.slug !== p.slug).slice(0, 2);
  const words = [p.shortAnswer, ...p.sections.flatMap((s) => s.blocks.flatMap(blockText))].join(" ").split(/\s+/).length;

  return (
    <main id="main" data-hero="light" data-page="blog">
      <JsonLd
        data={graph(
          webPage({ path, name: p.metaTitle, description: p.description }),
          blogPosting({ slug: p.slug, title: p.title, description: p.description, published: p.published, updated: p.updated, category: p.category, image: p.cover, services: p.services, words }),
          breadcrumbs(trail),
          faqPage(p.faqs),
        )}
      />

      <article>
        <header className="wrap pb-12 pt-[calc(var(--header-h)+3.5rem)] md:pb-16 md:pt-[calc(var(--header-h)+6rem)]">
          <Breadcrumbs items={trail} />
          <p className="mono fade-up text-[0.7rem] uppercase tracking-[0.14em] text-mute" style={d(80)}>
            {p.category} · {readingMinutes(p)} min read
          </p>
          <h1 className="display display-lg fade-up mt-5 max-w-5xl" style={d(100)}>
            {p.title}
          </h1>
          <p className="fade-up mt-8 text-charcoal" style={d(250)}>
            By {site.name} team · Published <time dateTime={p.published}>{formatDate(p.published)}</time>
            {p.updated !== p.published && (
              <>
                {" "}· Updated <time dateTime={p.updated}>{formatDate(p.updated)}</time>
              </>
            )}
          </p>
        </header>

        <div className="wrap grid gap-14 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-8">
          <div className="min-w-0 lg:col-span-8">
            <div className="media-frame fade-up aspect-[16/10] w-full overflow-hidden" style={d(300)}>
              <Media item={p.cover} priority sizes="(min-width: 1024px) 60vw, 92vw" className="h-full w-full object-cover" />
            </div>

            <section aria-labelledby="short-answer" className="mt-12 border-l-2 border-blue bg-stone/60 p-7 md:p-9">
              <h2 id="short-answer" className="label">The short answer</h2>
              <p className="mt-4 text-[1.15rem] leading-relaxed">{p.shortAnswer}</p>
            </section>

            {p.sections.map((s) => (
              <section key={s.heading} aria-labelledby={anchor(s.heading)} className="mt-14">
                <h2 id={anchor(s.heading)} className="display scroll-mt-28 text-[clamp(1.5rem,2.6vw,2.2rem)] leading-tight">
                  {s.heading}
                </h2>
                {s.blocks.map((b, i) => (
                  <BlockView key={i} b={b} />
                ))}
              </section>
            ))}

            <section aria-labelledby="post-faq" className="mt-16">
              <h2 id="post-faq" className="display mb-8 text-[clamp(1.5rem,2.6vw,2.2rem)]">Frequently asked questions</h2>
              <Faq items={p.faqs} />
            </section>
          </div>

          <aside className="lg:col-span-3 lg:col-start-10">
            <div className="lg:sticky lg:top-28">
              <nav aria-labelledby="toc-title">
                <h2 id="toc-title" className="label">In this guide</h2>
                <ol className="mt-5 grid gap-2.5 text-[0.95rem]">
                  {p.sections.map((s) => (
                    <li key={s.heading}>
                      <a href={`#${anchor(s.heading)}`} className="text-charcoal transition-colors hover:text-blue">{s.heading}</a>
                    </li>
                  ))}
                </ol>
              </nav>
              {related.length > 0 && (
                <nav aria-labelledby="related-title" className="mt-12">
                  <h2 id="related-title" className="label">Related services</h2>
                  <ul className="mt-5 grid gap-2.5">
                    {related.map((s) => (
                      <li key={s.slug}>
                        <SmartLink href={`/services/${s.slug}`} className="inline-flex items-center gap-2 text-charcoal transition-colors hover:text-blue">
                          {s.name} <ArrowRight />
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </aside>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="section surface-stone">
          <div className="wrap">
            <h2 id="more-title" className="label">More guides</h2>
            <ul className="mt-8 grid gap-8 md:grid-cols-2">
              {more.map((o) => (
                <li key={o.slug}>
                  <SmartLink href={`/blog/${o.slug}`} className="group block border-t border-ink/15 pt-6">
                    <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">{o.category}</p>
                    <h3 className="display mt-3 text-[clamp(1.2rem,1.8vw,1.6rem)] leading-tight transition-colors group-hover:text-blue">{o.title}</h3>
                  </SmartLink>
                </li>
              ))}
            </ul>
            <SmartLink href="/blog" className="link-line mt-10 inline-block">All guides</SmartLink>
          </div>
        </section>
      )}

      <CtaBand />
    </main>
  );
}
