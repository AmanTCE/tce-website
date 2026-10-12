import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SmartLink from "@/components/SmartLink";
import Media from "@/components/Media";
import ProjectViewer from "@/components/ProjectViewer";
import CtaBand from "@/components/CtaBand";
import { ArrowUpRight } from "@/components/Arrow";
import { categoryLabel, getProject, publishedProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { showPendingNotes } from "@/lib/paths";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    ...pageMetadata({
      title: `${p.title} | ${categoryLabel(p.category)}`,
      description: p.summary ?? `${p.title}: ${categoryLabel(p.category).toLowerCase()} photography${p.client ? ` for ${p.client}` : ""} by The Creative Economy, a video production and creative media agency in the UAE.`,
      path: `/work/${p.slug}`,
    }),
    openGraph: { images: [{ url: p.cover.src, width: p.cover.width, height: p.cover.height, alt: p.cover.alt }] },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const i = publishedProjects.indexOf(project);
  const prev = publishedProjects[(i - 1 + publishedProjects.length) % publishedProjects.length];
  const next = publishedProjects[(i + 1) % publishedProjects.length];

  // Only verified fields are rendered. Unconfirmed client, scope and results stay unpublished.
  const facts: { label: string; value: string }[] = [
    { label: "Category", value: categoryLabel(project.category) },
    ...(project.client ? [{ label: "Client", value: project.client }] : []),
    ...(project.services?.length ? [{ label: "Scope", value: project.services.join(", ") }] : []),
    ...(project.year ? [{ label: "Year", value: String(project.year) }] : []),
  ];

  return (
    <main id="main" data-hero="light" data-page="work-detail">
      <section className="wrap pt-[calc(var(--header-h)+3.5rem)] md:pt-[calc(var(--header-h)+5rem)]">
        <SmartLink href="/work" className="link-line fade-up">
          ← All work
        </SmartLink>
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p className="mono fade-up text-xs text-mute" style={{ "--d": "100ms" } as React.CSSProperties}>
              Project {String(i + 1).padStart(2, "0")} / {String(publishedProjects.length).padStart(2, "0")}
            </p>
            <h1 className="display display-xl mt-4">
              <span className="line-mask">
                <span style={{ "--d": "120ms" } as React.CSSProperties}>{project.title}</span>
              </span>
            </h1>
          </div>
          <dl className="fade-up grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 lg:col-span-4" style={{ "--d": "300ms" } as React.CSSProperties}>
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">{f.label}</dt>
                <dd className="mt-1.5 text-[1.05rem]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {project.summary && <p className="lede reveal mt-12 text-charcoal">{project.summary}</p>}
        {showPendingNotes && !project.client && (
          <p className="mono mt-10 inline-block border border-dashed border-blue/50 px-4 py-3 text-[0.7rem] uppercase tracking-[0.08em] text-blue">
            Pending from TCE: project name, client, scope and results. Unconfirmed details stay unpublished.
          </p>
        )}
      </section>

      <section aria-label="Project media" className="wrap mt-12 md:mt-16">
        <ProjectViewer items={project.media} title={project.title} />
        <p className="mono mt-4 text-[0.7rem] uppercase tracking-[0.12em] text-mute">Select an image to view it full screen</p>
      </section>

      {project.outcomes?.length ? (
        <section aria-labelledby="outcomes" className="wrap mt-20">
          <h2 id="outcomes" className="label">Outcomes</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {project.outcomes.map((o) => (
              <li key={o} className="border-t border-ink/15 pt-4 text-lg">{o}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Next / previous */}
      <nav aria-label="More projects" className="mt-24 border-t border-ink/15 md:mt-32">
        <div className="wrap grid sm:grid-cols-2">
          {[
            { p: prev, dir: "Previous" },
            { p: next, dir: "Next" },
          ].map(({ p, dir }) => (
            <SmartLink
              key={dir}
              href={`/work/${p.slug}`}
              className={`group flex items-center gap-5 py-8 md:py-12 ${dir === "Next" ? "border-t border-ink/15 sm:flex-row-reverse sm:border-l sm:border-t-0 sm:pl-8 sm:text-right" : "sm:pr-8"}`}
            >
              <div className="media-frame zoom aspect-[3/4] w-20 shrink-0 md:w-28">
                <Media item={p.cover} sizes="120px" className="h-full w-full object-cover" />
              </div>
              <div className="min-w-0">
                <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-mute">{dir} project</p>
                <p className="display display-sm mt-2 transition-colors group-hover:text-blue">{p.title}</p>
              </div>
            </SmartLink>
          ))}
        </div>
      </nav>

      <section className="surface-stone">
        <div className="wrap flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <p className="max-w-lg text-charcoal">Planning something in {categoryLabel(project.category).toLowerCase()}? Tell us about it.</p>
          <SmartLink href="/contact" className="btn">
            Start a conversation <ArrowUpRight />
          </SmartLink>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
