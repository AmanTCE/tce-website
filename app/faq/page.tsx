import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import SmartLink from "@/components/SmartLink";
import { faqs } from "@/content/faq";
import { servicePages } from "@/content/servicePages";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbs, faqPage, graph, webPage } from "@/lib/schema";

const title = "FAQ: Video Production & Digital Marketing in the UAE";
const description = "Answers about The Creative Economy (TCE): our services, the emirates we cover, pricing, the brands we’ve worked with and how to start a project.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/faq" });

export default function FaqPage() {
  const trail = [{ name: "FAQ", path: "/faq" }];
  return (
    <main id="main" data-hero="light" data-page="faq">
      <JsonLd data={graph(webPage({ path: "/faq", name: title, description }), breadcrumbs(trail), faqPage(faqs))} />
      <section className="wrap pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-20 md:pt-[calc(var(--header-h)+6rem)]">
        <Breadcrumbs items={trail} />
        <h1 className="display display-lg fade-up max-w-5xl" style={{ "--d": "100ms" } as React.CSSProperties}>
          Frequently asked questions
        </h1>
        <p className="lede fade-up mt-10 text-charcoal" style={{ "--d": "300ms" } as React.CSSProperties}>
          What people most often ask before working with TCE. If your question isn’t here,{" "}
          <SmartLink href="/contact" className="underline decoration-blue underline-offset-4">
            ask us directly
          </SmartLink>
          .
        </p>
      </section>
      <section aria-label="Questions and answers" className="pb-24 md:pb-36">
        <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <Faq items={faqs} level={2} />
          </div>
          <nav aria-labelledby="faq-services" className="lg:col-span-3 lg:col-start-10">
            <h2 id="faq-services" className="label">
              Services
            </h2>
            <ul className="mt-6 grid gap-2">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <SmartLink href={`/services/${s.slug}`} className="text-charcoal transition-colors hover:text-blue">
                    {s.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
