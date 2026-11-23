import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Media from "@/components/Media";
import SmartLink from "@/components/SmartLink";
import { ArrowRight } from "@/components/Arrow";
import { posts, formatDate, readingMinutes } from "@/content/blog";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { breadcrumbs, graph, orgId, webPage } from "@/lib/schema";

const title = "Blog: Video Production & Marketing Guides for UAE Brands";
const description =
  "Practical guides from The Creative Economy on video production, social media, Meta ads, UGC and influencer marketing for brands in Dubai and across the UAE.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/blog" });

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function BlogIndex() {
  const trail = [{ name: "Blog", path: "/blog" }];
  const blogNode = {
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: "The Creative Economy blog",
    url: absoluteUrl("/blog"),
    publisher: { "@id": orgId },
    inLanguage: "en-AE",
    blogPost: posts.map((p) => ({ "@id": `${absoluteUrl(`/blog/${p.slug}`)}#article` })),
  };
  return (
    <main id="main" data-hero="light" data-page="blog">
      <JsonLd data={graph(webPage({ path: "/blog", name: title, description, type: "CollectionPage" }), blogNode, breadcrumbs(trail))} />
      <section className="wrap pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+6rem)]">
        <Breadcrumbs items={trail} />
        <h1 className="display display-lg fade-up max-w-5xl" style={d(100)}>
          Guides for brands in Dubai and the UAE
        </h1>
        <p className="lede fade-up mt-10 text-charcoal" style={d(300)}>
          Straight answers on video production, social media, ads and creators, from the team that makes and runs the work.
        </p>
      </section>
      <section aria-label="Articles" className="pb-24 md:pb-36">
        <ul className="wrap grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <li key={p.slug} className="reveal" style={d((i % 3) * 80)}>
              <SmartLink href={`/blog/${p.slug}`} className="group block">
                <div className="media-frame aspect-[4/3] w-full overflow-hidden">
                  <Media item={p.cover} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mono mt-6 text-[0.7rem] uppercase tracking-[0.14em] text-mute">
                  {p.category} · <time dateTime={p.published}>{formatDate(p.published)}</time> · {readingMinutes(p)} min read
                </p>
                <h2 className="display mt-3 text-[clamp(1.25rem,2vw,1.7rem)] leading-tight transition-colors group-hover:text-blue">{p.title}</h2>
                <p className="mt-3 text-charcoal">{p.description}</p>
                <span className="mono mt-5 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-blue">
                  Read the guide <ArrowRight />
                </span>
              </SmartLink>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </main>
  );
}
