"use client";

import { useMemo, useState } from "react";
import WorkTile from "./WorkTile";
import type { CategoryId, Project } from "@/content/projects";

type Cat = { id: CategoryId; label: string };

/** Filterable masonry gallery. Only categories with published work are offered. */
export default function WorkGallery({ projects, categories }: { projects: Project[]; categories: Cat[] }) {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const shown = useMemo(() => (active === "all" ? projects : projects.filter((p) => p.category === active)), [active, projects]);
  const aspects = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[2/3]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[1/1]"];

  const filters: { id: CategoryId | "all"; label: string; count: number }[] = [
    { id: "all", label: "All Work", count: projects.length },
    ...categories.map((c) => ({ id: c.id, label: c.label, count: projects.filter((p) => p.category === c.id).length })),
  ];

  return (
    <div>
      <div className="sticky top-[calc(env(safe-area-inset-top,0px))] z-30 -mx-[var(--gutter)] border-b border-ink/10 bg-paper/90 px-[var(--gutter)] py-3 backdrop-blur-md">
        <div role="group" aria-label="Filter work by category" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className={`mono inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-[0.72rem] uppercase tracking-[0.1em] transition-colors ${
                active === f.id ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-ink"
              }`}
            >
              {f.label}
              <span className={active === f.id ? "text-sky" : "text-mute"}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      <ul key={active} className="mt-10 columns-1 gap-6 sm:columns-2 md:mt-14 lg:columns-3 lg:gap-8">
        {shown.map((p, i) => (
          <li key={p.slug} className="page-enter mb-12 break-inside-avoid md:mb-16" style={{ animationDelay: `${i * 60}ms` }}>
            <WorkTile project={p} index={projects.indexOf(p)} aspect={aspects[projects.indexOf(p) % aspects.length]} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 92vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}
