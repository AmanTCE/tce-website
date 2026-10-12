import type { Metadata } from "next";
import SmartLink from "@/components/SmartLink";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { ArrowRight } from "@/components/Arrow";
import { areas } from "@/content/areas";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, graph, webPage } from "@/lib/schema";

const title = "Video Production & Marketing Agency Across the UAE";
const description =
  "TCE works with brands in all seven emirates, from Dubai and Abu Dhabi to Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/uae" });

export default function UaePage() {
  const trail = [{ name: "Across the UAE", path: "/uae" }];
  return (
    <main id="main" data-hero="light" data-page="uae">
      <JsonLd data={graph(webPage({ path: "/uae", name: title, description, type: "CollectionPage" }), breadcrumbs(trail))} />
      <section className="wrap pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+6rem)]">
        <Breadcrumbs items={trail} />
        <h1 className="display display-lg fade-up max-w-5xl" style={{ "--d": "100ms" } as React.CSSProperties}>
          Serving brands in all seven emirates
        </h1>
        <p className="lede fade-up mt-10 text-charcoal" style={{ "--d": "300ms" } as React.CSSProperties}>
          The Creative Economy is a UAE creative media and growth marketing agency. We shoot on location and run campaigns for businesses across the country, from Dubai and Abu Dhabi to the east coast.
        </p>
      </section>
      <section aria-label="Emirates" className="pb-24 md:pb-36">
        <ul className="wrap border-t border-ink/15">
          {areas.map((a, i) => (
            <li key={a.slug} className="reveal border-b border-ink/15" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
              <SmartLink href={`/uae/${a.slug}`} className="group grid gap-4 py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
                <span className="mono text-xs text-mute md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="display display-md transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:col-span-4">{a.name}</h2>
                <p className="text-charcoal md:col-span-6">{a.intro[0]}</p>
                <span className="hidden justify-end md:col-span-1 md:flex">
                  <ArrowRight />
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
