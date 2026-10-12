import type { Metadata } from "next";
import SmartLink from "@/components/SmartLink";
import Media from "@/components/Media";
import Headline from "@/components/Headline";
import SectionLabel from "@/components/SectionLabel";
import HeroReel from "@/components/HeroReel";
import HeroVideo from "@/components/HeroVideo";
import ClientStrip from "@/components/ClientStrip";
import { site } from "@/content/site";
import WorkTile from "@/components/WorkTile";
import ServiceRows from "@/components/ServiceRows";
import Capabilities from "@/components/Capabilities";
import Approach from "@/components/Approach";
import CtaBand from "@/components/CtaBand";
import { ArrowRight, ArrowUpRight } from "@/components/Arrow";
import { home, profile } from "@/content/copy";
import { media } from "@/content/media";
import { coreServices } from "@/content/services";
import { featuredProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { areas } from "@/content/areas";
import { servicePages } from "@/content/servicePages";
import { dubaiPages } from "@/content/dubai";
import { faqs } from "@/content/faq";
import { faqPage, graph, webPage } from "@/lib/schema";

const homeFaqs = faqs.filter((f) => f.home);

const homeTitle = "Video Production & Digital Marketing Agency in Dubai, UAE";
const homeDescription =
  "Dubai video production and digital marketing agency: brand films, social media management, Meta ads, UGC, content strategy and SEO across all seven emirates.";

export const metadata: Metadata = {
  ...pageMetadata({ title: homeTitle, description: homeDescription, path: "/" }),
  title: { absolute: "Video Production & Digital Marketing Agency in Dubai | TCE" },
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function HomePage() {
  const [w0, w1, w2, w3, w4, w5, w6] = featuredProjects;
  const { heroVideo } = site;

  return (
    <main id="main" data-hero="dark" data-page="home">
      <JsonLd data={graph(webPage({ path: "/", name: homeTitle, description: homeDescription }), faqPage(homeFaqs))} />
      {/* 01 — Cinematic hero */}
      <section aria-label="Introduction" className="surface-dark grain relative flex min-h-[100svh] flex-col overflow-hidden">
        {/* The video sits under the overlays; its pause control sits above the content. */}
        {heroVideo.src && (
          <HeroVideo src={heroVideo.src} srcSm={heroVideo.srcSm} webm={heroVideo.webm} webmSm={heroVideo.webmSm} poster={heroVideo.poster} label={heroVideo.label} />
        )}
        <div className="absolute inset-0 -z-[1]">
          {!heroVideo.src && (
            <Media item={media.studioSet} priority sizes="100vw" className="kenburns h-full w-full object-cover opacity-45 grayscale" />
          )}
          <div
            className={`absolute inset-0 ${
              heroVideo.src
                ? "bg-[linear-gradient(180deg,rgba(5,9,19,0.6)_0%,rgba(5,9,19,0.32)_38%,rgba(5,9,19,0.9)_100%)]"
                : "bg-[linear-gradient(180deg,rgba(5,9,19,0.75)_0%,rgba(5,9,19,0.35)_40%,rgba(5,9,19,0.92)_100%)]"
            }`}
          />
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_100%_110%,rgba(58,114,189,0.55),transparent_60%)]" />
        </div>

        <div className="wrap relative z-[2] flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+3rem)] md:pb-14">
          <h1 className="label fade-up mb-8 text-white/80" style={d(200)}>
            Video production & digital marketing agency in Dubai, UAE
          </h1>
          <Headline as="p" size="xl" lines={home.hero.headline} onLoad delay={150} />
          <div className="mt-10 grid items-end gap-10 md:mt-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <p className="lede fade-up text-white/80" style={d(650)}>
                {home.hero.body}
              </p>
              <div className="fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={d(800)}>
                <SmartLink href="/work" className="btn btn-light">
                  Explore Our Work <ArrowRight />
                </SmartLink>
                <SmartLink href="/contact" className="btn btn-ghost text-white">
                  Let’s Work Together <ArrowUpRight />
                </SmartLink>
              </div>
            </div>

            {!heroVideo.src && (
            <div className="fade-up hidden lg:col-span-4 lg:col-start-9 lg:block" style={d(500)}>
              <div className="media-frame aspect-[5/4] w-full">
                <HeroReel items={[w0.cover, w1.cover, w2.cover, w4.cover, w6.cover]} />
              </div>
              <p className="mono mt-3 text-[0.7rem] uppercase text-white/55">From the TCE portfolio</p>
            </div>
            )}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-5 text-white/60 md:mt-16">
            <a href="#who-we-are" className="mono group inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.16em] hover:text-white">
              <span className="relative block h-8 w-px overflow-hidden bg-white/25">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-white" />
              </span>
              Scroll
            </a>
            <p className="mono text-[0.7rem] uppercase tracking-[0.16em]">Based in the UAE</p>
          </div>
        </div>
      </section>

      {/* 02 — Who we are */}
      <section id="who-we-are" aria-labelledby="who-title" className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionLabel>{home.intro.label}</SectionLabel>
            <Headline lines={home.intro.headline} size="md" className="mt-8" />
            <div className="media-frame reveal-img mt-12 hidden aspect-[4/5] max-w-md lg:block">
              <Media item={media.editorialPrints} sizes="30vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
            <blockquote className="reveal">
              <p className="text-[clamp(1.35rem,2.4vw,2.15rem)] font-medium leading-[1.3] tracking-[-0.01em]">{profile.intro[0]}</p>
              <p className="mt-6 text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.5] text-charcoal">{profile.intro[1]}</p>
              <footer className="mono mt-6 text-[0.7rem] uppercase text-mute">From the TCE company profile</footer>
            </blockquote>

            <div className="reveal mt-14 border-l-2 border-blue bg-stone px-6 py-7 md:px-9 md:py-9" style={d(120)}>
              <p className="label mb-4">Beyond production</p>
              <p className="text-[1.05rem] leading-[1.65] text-charcoal">{home.intro.growth}</p>
            </div>

            <SmartLink href="/about" className="link-line reveal mt-12">
              More About TCE <ArrowRight />
            </SmartLink>
          </div>
        </div>
        <div className="wrap mt-20 md:mt-28">
          <ClientStrip />
        </div>
      </section>

      {/* 03 — Selected work */}
      <section aria-labelledby="work-title" className="section surface-stone overflow-hidden">
        <div className="wrap">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>{home.work.label}</SectionLabel>
              <h2 id="work-title" className="display display-lg mt-8">
                {home.work.headline.map((l, i) => (
                  <span key={i} className="reveal block" style={d(i * 90)}>
                    {l}
                  </span>
                ))}
              </h2>
            </div>
            <p className="reveal max-w-xs text-charcoal">{profile.projects}</p>
          </div>

          {/* Mobile: swipeable row */}
          <div className="-mx-[var(--gutter)] mt-14 md:hidden">
            <ul className="flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] pb-4 [scrollbar-width:none]" aria-label="Selected work, swipe to see more">
              {featuredProjects.map((p, i) => (
                <li key={p.slug} className="w-[78vw] max-w-[340px] shrink-0 snap-start">
                  <WorkTile project={p} index={i} aspect="aspect-[3/4]" sizes="80vw" />
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop: asymmetric editorial grid */}
          <div className="mt-20 hidden grid-cols-12 gap-x-8 gap-y-24 md:grid">
            <WorkTile project={w0} index={0} className="col-span-7" aspect="aspect-[4/5]" sizes="55vw" />
            <WorkTile project={w1} index={1} className="col-span-4 col-start-9 mt-48" aspect="aspect-[3/4]" sizes="33vw" delay={100} />
            <WorkTile project={w2} index={2} className="col-span-8 col-start-2" aspect="aspect-[16/10]" sizes="66vw" />
            <WorkTile project={w3} index={3} className="col-span-4 -mt-10" aspect="aspect-[3/4]" sizes="33vw" />
            <WorkTile project={w4} index={4} className="col-span-4 col-start-6 mt-32" aspect="aspect-[4/5]" sizes="33vw" delay={100} />
            <WorkTile project={w5} index={5} className="col-span-3 col-start-10 mt-12" aspect="aspect-[3/4]" sizes="25vw" delay={200} />
            {w6 && <WorkTile project={w6} index={6} className="col-span-5 col-start-2 -mt-24" aspect="aspect-[5/4]" sizes="40vw" />}
          </div>

          <div className="reveal mt-16 flex justify-center md:mt-24">
            <SmartLink href="/work" className="btn">
              View All Work <ArrowUpRight />
            </SmartLink>
          </div>
        </div>
      </section>

      {/* 04 — What we do */}
      <section aria-labelledby="services-title" className="section">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <SectionLabel>{home.services.label}</SectionLabel>
              <h2 id="services-title" className="display display-lg mt-8">
                {home.services.headline.map((l, i) => (
                  <span key={i} className="reveal block" style={d(i * 90)}>
                    {l}
                  </span>
                ))}
              </h2>
            </div>
            <p className="reveal text-charcoal lg:col-span-3 lg:col-start-10">Five core services, from the camera to the campaign.</p>
          </div>
          <div className="mt-16 md:mt-20">
            <ServiceRows services={coreServices} />
          </div>
          <div className="reveal mt-12">
            <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">Every service</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <SmartLink href={`/services/${s.slug}`} className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.95rem] transition-colors hover:border-ink hover:bg-ink hover:text-white">
                    {s.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 — Built for growth */}
      <section aria-labelledby="growth-title" className="section surface-dark surface-glow grain overflow-hidden">
        <div className="wrap relative z-[2] grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel>{home.growth.label}</SectionLabel>
              <h2 id="growth-title" className="display display-md mt-8">
                {home.growth.headline.map((l, i) => (
                  <span key={i} className={`reveal block ${i === 1 ? "mt-3 text-sky" : ""}`} style={d(i * 120)}>
                    {l}
                  </span>
                ))}
              </h2>
              <p className="reveal mt-8 max-w-md text-white/75">{home.growth.body}</p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="mono reveal mb-6 text-[0.7rem] uppercase tracking-[0.14em] text-white/55">Additional capabilities</p>
            <Capabilities />
            <SmartLink href="/services#growth-capabilities" className="link-line reveal mt-10 text-white">
              How we approach growth <ArrowRight />
            </SmartLink>
          </div>
        </div>
      </section>

      {/* 06 — How we work */}
      <section aria-labelledby="approach-title" className="section">
        <div className="wrap">
          <SectionLabel>{home.approach.label}</SectionLabel>
          <h2 id="approach-title" className="display display-lg mt-8">
            {home.approach.headline.map((l, i) => (
              <span key={i} className="reveal block" style={d(i * 90)}>
                {l}
              </span>
            ))}
          </h2>
          <Approach />
        </div>
      </section>

      {/* 07 — Reviews (hidden until real reviews are added) */}
      <Reviews />

      {/* 08 — Across the UAE */}
      <section aria-labelledby="uae-title" className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <SectionLabel>06 / Across the UAE</SectionLabel>
            <h2 id="uae-title" className="display display-md reveal mt-8">
              Working in all seven emirates.
            </h2>
            <p className="reveal mt-6 max-w-md text-charcoal">Based in Dubai. From Dubai and Abu Dhabi to Fujairah on the east coast, we shoot on location and run campaigns wherever your customers are.</p>
            <ul className="reveal mt-8 flex flex-wrap gap-2">
              {dubaiPages.map((p) => (
                <li key={p.slug}>
                  <SmartLink href={`/dubai/${p.slug}`} className="inline-flex min-h-[44px] items-center rounded-full border border-ink/20 px-5 text-[0.95rem] transition-colors hover:border-ink hover:bg-ink hover:text-white">
                    {p.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid content-start gap-x-8 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {areas.map((a) => (
              <li key={a.slug} className="border-b border-ink/15">
                <SmartLink href={`/uae/${a.slug}`} className="flex min-h-[56px] items-center justify-between gap-4 py-3 text-lg transition-colors hover:text-blue">
                  {a.name} <ArrowRight />
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 — Questions */}
      <section aria-labelledby="home-faq-title" className="section surface-stone">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionLabel>07 / Questions</SectionLabel>
            <h2 id="home-faq-title" className="display display-md reveal mt-8">
              Good to know.
            </h2>
            <SmartLink href="/faq" className="link-line reveal mt-8">
              All questions <ArrowRight />
            </SmartLink>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>

      {/* 10 — Conversion */}
      <CtaBand />
    </main>
  );
}
