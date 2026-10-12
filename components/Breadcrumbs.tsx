import SmartLink from "./SmartLink";

/** Visible breadcrumb trail; the matching structured data comes from lib/schema breadcrumbs(). */
export default function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="fade-up mb-8">
      <ol className="mono flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.7rem] uppercase tracking-[0.12em] text-mute">
        {all.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === all.length - 1 ? (
              <span aria-current="page" className="text-ink">{it.name}</span>
            ) : (
              <SmartLink href={it.path} className="transition-colors hover:text-blue">
                {it.name}
              </SmartLink>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
