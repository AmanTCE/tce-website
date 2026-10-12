import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { site } from "@/content/site";
import { breadcrumbs, graph, webPage } from "@/lib/schema";
import { showPendingNotes } from "@/lib/paths";

/** Shared layout for the privacy, terms and cookie pages: readable measure, plain typography. */
export default function LegalPage({ title, path, description, children }: { title: string; path: string; description: string; children: React.ReactNode }) {
  const trail = [{ name: title, path }];
  const missing = [
    !site.legal.companyName && "registered company name",
    !site.legal.licenceNumber && "trade licence number",
    !site.legal.licensingAuthority && "licensing authority",
    !site.contact.email && "contact email",
  ].filter(Boolean);
  return (
    <main id="main" data-hero="light" data-page="legal">
      <JsonLd data={graph(webPage({ path, name: title, description }), breadcrumbs(trail))} />
      <article className="wrap pb-24 pt-[calc(var(--header-h)+3.5rem)] md:pb-36 md:pt-[calc(var(--header-h)+6rem)]">
        <Breadcrumbs items={trail} />
        <h1 className="display display-lg fade-up" style={{ "--d": "100ms" } as React.CSSProperties}>
          {title}
        </h1>
        <p className="mono mt-6 text-[0.7rem] uppercase tracking-[0.14em] text-mute">Last updated {site.legal.updated}</p>
        {showPendingNotes && missing.length > 0 && (
          <p className="mono mt-8 inline-block border border-dashed border-blue/50 px-4 py-3 text-[0.7rem] uppercase leading-relaxed tracking-[0.08em] text-blue">
            Pending from TCE: {missing.join(", ")}. Have these pages reviewed by a UAE lawyer before launch.
          </p>
        )}
        <div className="legal mt-14 max-w-3xl">{children}</div>
      </article>
    </main>
  );
}
