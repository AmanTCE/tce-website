import SmartLink from "./SmartLink";
import Media from "./Media";
import { categoryLabel, type Project } from "@/content/projects";

type Props = {
  project: Project;
  index?: number;
  aspect?: string;
  sizes?: string;
  className?: string;
  delay?: number;
  tone?: "dark" | "light";
};

/** Editorial project tile: image with zoom, index, title and category. */
export default function WorkTile({ project, index, aspect = "aspect-[4/5]", sizes, className = "", delay = 0, tone = "light" }: Props) {
  return (
    <SmartLink href={`/work/${project.slug}`} className={`group block ${className}`} aria-label={`${project.title}, ${categoryLabel(project.category)}`}>
      <div className={`media-frame zoom reveal-img ${aspect}`} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
        <Media item={project.cover} sizes={sizes} className="h-full w-full object-cover" />
        <span className="pointer-events-none absolute right-4 top-4 flex h-11 w-11 scale-75 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:scale-100 group-hover:opacity-100" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="mt-4">
        <p className={`mono flex gap-3 text-[0.68rem] uppercase tracking-[0.12em] ${tone === "dark" ? "text-white/60" : "text-mute"}`}>
          {index !== undefined && <span>{String(index + 1).padStart(2, "0")}</span>}
          <span>{categoryLabel(project.category)}</span>
        </p>
        <h3 className="display display-sm mt-2 transition-colors group-hover:text-blue">{project.title}</h3>
      </div>
    </SmartLink>
  );
}
