import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import WorkGallery from "@/components/WorkGallery";
import CtaBand from "@/components/CtaBand";
import ClientStrip from "@/components/ClientStrip";
import FilmIndex from "@/components/FilmIndex";
import { workPage, profile } from "@/content/copy";
import { activeCategories, publishedProjects } from "@/content/projects";
import { pageMetadata, absoluteUrl } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { films } from "@/content/films";
import { breadcrumbs, graph, orgId, webPage } from "@/lib/schema";

// Each film as a VideoObject, so search engines can list them as videos.
const videos = films
  .filter((f) => f.video && f.poster)
  .map((f) => ({
    "@type": "VideoObject",
    name: `${f.title}${f.subtitle ? `, ${f.subtitle}` : ""} | ${f.group} film by The Creative Economy`,
    description: `${f.group} film produced by The Creative Economy (TCE) for ${f.title}${f.subtitle ? ` ${f.subtitle}` : ""}.`,
    thumbnailUrl: absoluteUrl(f.poster!),
    contentUrl: absoluteUrl(f.video!),
    creator: { "@id": orgId },
    publisher: { "@id": orgId },
  }));

const title = "Our Work: Brand Films, Commercials & Photography";
const description =
  "Films and photography by TCE for Hotpack, Lexus, Oceano, 222 Stores, It’s Good for Something and more, across automotive, food, retail and events in the UAE.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/work" });

export default function WorkPage() {
  return (
    <main id="main" data-hero="light" data-page="work">
      <JsonLd data={graph({ ...webPage({ path: "/work", name: title, description, type: "CollectionPage" }), hasPart: videos }, breadcrumbs([{ name: "Our work", path: "/work" }]))} />
      <PageHero label="Our work" h1="Our work: brand films, commercials and photography" lines={workPage.headline} intro={profile.projects} />
      <section aria-label="Portfolio" className="pb-24 md:pb-36">
        <div className="wrap">
          <div className="mb-12">
            <ClientStrip />
          </div>
          <h2 className="label mb-6">Photography</h2>
          <WorkGallery projects={publishedProjects} categories={[...activeCategories]} />
        </div>
      </section>
      <FilmIndex />
      <CtaBand />
    </main>
  );
}
