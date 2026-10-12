import type { Metadata } from "next";
import Media from "@/components/Media";
import Headline from "@/components/Headline";
import SectionLabel from "@/components/SectionLabel";
import CtaBand from "@/components/CtaBand";
import SmartLink from "@/components/SmartLink";
import { ArrowRight } from "@/components/Arrow";
import { about, profile } from "@/content/copy";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { site } from "@/content/site";
import { servicePages } from "@/content/servicePages";
import { breadcrumbs, graph, webPage } from "@/lib/schema";

const title = "About TCE, a Creative Media Agency in the UAE";
const description =
  "TCE is a UAE creative media agency crafting cinematic video and photography for brands, artists and individuals, with growth marketing built in.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function AboutPage() {
  return (
    <main id="main" data-hero="dark" data-page="about">
      <JsonLd data={graph(webPage({ path: "/about", name: title, description, type: "AboutPage" }), breadcrumbs([{ name: "About", path: "/about" }]))} />
      {/* Hero */}
      <section className="surface-dark grain relative overflow-hidden">
        <div className="absolute inset-0 -z-[1]">
          <Media item={media.studioSet} priority sizes="100vw" className="kenburns h-full w-full object-cover object-[50%_35%] opacity-55 grayscale" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,19,0.7)_0%,rgba(5,9,19,0.3)_45%,rgba(5,9,19,0.95)_100%)]" />
        </div>
        <div className="wrap relative z-[2] flex min-h-[88svh] flex-col justify-end pb-16 pt-[calc(var(--header-h)+5rem)] md:pb-24">
          <h1 className="label fade-up mb-8 text-white/80" style={d(150)}>
            About The Creative Economy, a creative media agency in the UAE
          </h1>
          <Headline as="p" size="xl" lines={about.headline} onLoad delay={100} />
        </div>
      </section>

      {/* Official company description, quoted in full from the profile */}
      <section aria-labelledby="about-us" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>About us</SectionLabel>
            <h2 id="about-us" className="display display-md reveal mt-8">
              Visual stories with intention and clarity.
            </h2>
            <div className="media-frame reveal-img mt-12 aspect-[3/4] max-w-sm">
              <Media item={media.editorialPrints} sizes="(min-width: 1024px) 30vw, 90vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 lg:pt-20">
            <div className="prose-tce">
              <p className="reveal text-[clamp(1.35rem,2.3vw,2.05rem)] font-medium leading-[1.32] tracking-[-0.01em]">{profile.about[0]}</p>
              <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-10">
                <p className="reveal text-[1.08rem] leading-[1.7] text-charcoal" style={d(80)}>
                  {profile.about[1]}
                </p>
                <p className="reveal text-[1.08rem] leading-[1.7] text-charcoal" style={d(160)}>
                  {profile.about[2]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* At a glance: plain facts that search engines and AI assistants can quote */}
      <section aria-labelledby="facts-title" className="pb-24 md:pb-36">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>At a glance</SectionLabel>
            <h2 id="facts-title" className="display display-sm reveal mt-6">
              TCE in brief
            </h2>
          </div>
          <dl className="grid border-t border-ink/15 lg:col-span-7 lg:col-start-6">
            {[
              { k: "Name", v: `${site.name} (${site.shortName})` },
              { k: "What we do", v: "Creative media, video production and growth marketing" },
              { k: "Services", v: servicePages.map((s) => s.name).join(", ") },
              { k: "Where", v: `All seven emirates of the UAE: ${site.emirates.join(", ")}` },
              { k: "Brands we’ve worked with", v: `${site.clients.map((c) => c.name).join(", ")}, and many more` },
              ...(site.social.instagram ? [{ k: "Instagram", v: site.instagramHandle }] : []),
            ].map((f) => (
              <div key={f.k} className="reveal grid gap-1 border-b border-ink/15 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <dt className="mono text-[0.7rem] uppercase tracking-[0.14em] text-mute sm:pt-1">{f.k}</dt>
                <dd className="text-[1.05rem]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Image band */}
      <section aria-label="From our portfolio" className="overflow-hidden">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {[media.cameraHands, media.bowl, media.desertSuv, media.headphonesPortrait].map((m, i) => (
            <div key={m.src} className="media-frame reveal-img aspect-[3/4]" style={d(i * 90)}>
              <Media item={m} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Growth perspective */}
      <section aria-labelledby="growth-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <SectionLabel>{about.growth.label}</SectionLabel>
            <h2 id="growth-title" className="display display-lg mt-8">
              {about.growth.headline.map((l, i) => (
                <span key={i} className="reveal block" style={d(i * 90)}>
                  {l}
                </span>
              ))}
            </h2>
          </div>
          <div className="prose-tce lg:col-span-5 lg:col-start-8 lg:pt-28">
            {about.growth.body.map((p, i) => (
              <p key={i} className={`reveal ${i === 0 ? "text-[1.2rem] leading-[1.6]" : "text-charcoal"}`} style={d(i * 90)}>
                {p}
              </p>
            ))}
            <SmartLink href="/services" className="link-line reveal mt-10">
              See what we do <ArrowRight />
            </SmartLink>
          </div>
        </div>

        {/* The chain from creative to growth */}
        <div className="wrap mt-20 md:mt-28">
          <ol className="grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4" aria-label="From creative direction to business growth">
            {["Creative direction", "Digital visibility", "Audience engagement", "Business growth"].map((t, i) => (
              <li key={t} className="reveal flex items-center justify-between gap-4 border-b border-ink/15 py-6 sm:pr-8 lg:border-b-0 lg:border-r lg:py-10 lg:pl-6 lg:first:pl-0 lg:last:border-r-0" style={d(i * 80)}>
                <span className="display display-sm">{t}</span>
                <span aria-hidden="true" className={`mono text-blue ${i === 3 ? "invisible" : ""}`}>
                  →
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-title" className="section surface-stone">
        <div className="wrap">
          <SectionLabel>Our philosophy</SectionLabel>
          <h2 id="philosophy-title" className="display display-lg reveal mt-8 max-w-4xl">
            Three principles behind every project.
          </h2>
          <ul className="mt-16 grid gap-px bg-ink/15 md:mt-24 lg:grid-cols-3">
            {about.principles.map((p, i) => (
              <li key={p.title} className="reveal flex flex-col bg-stone py-10 lg:px-10 lg:py-4 lg:first:pl-0" style={d(i * 110)}>
                <span className="mono text-xs text-mute">Principle {String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-6 text-[clamp(1.7rem,2.8vw,2.7rem)]">{p.title}</h3>
                <p className="mt-6 max-w-sm text-charcoal">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
