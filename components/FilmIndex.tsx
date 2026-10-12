import { films, type Film } from "@/content/films";
import { asset } from "@/lib/paths";

const shape = (f: Film) =>
  f.vertical
    ? { frame: "aspect-[9/16]", span: "md:col-span-4" }
    : {
        frame: f.aspect === "4/3" ? "aspect-[4/3]" : "aspect-video",
        span:
          f.span === "full"
            ? "md:col-span-12"
            : f.span === "half"
              ? "md:col-span-6"
              : "md:col-span-8",
      };

/** Brand logo sized by its proportions, so wide wordmarks and compact marks read at a similar weight. */
function BrandLogo({
  logo,
  title,
  size,
}: {
  logo: NonNullable<Film["logo"]>;
  title: string;
  size: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(logo.src)}
      width={logo.width}
      height={logo.height}
      alt={`${title} logo`}
      loading="lazy"
      style={{ height: Math.round(size / Math.sqrt(logo.width / logo.height)) }}
      className="w-auto shrink-0 object-contain"
    />
  );
}

/** TCE's films: playable cards for films with a video, then a name list for the rest. */
export default function FilmIndex() {
  const withVideo = films.filter((f) => f.video);
  const listed = films.filter((f) => !f.video);

  return (
    <section
      aria-labelledby="films-title"
      className="section surface-stone overflow-hidden"
    >
      <div className="wrap relative z-[2]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label reveal">Film</p>
            <h2 id="films-title" className="display display-lg reveal mt-8">
              Selected films
            </h2>
          </div>
          <p className="mono reveal text-[0.7rem] uppercase tracking-[0.14em] text-mute">
            {films.length} productions
          </p>
        </div>

        <ol className="mt-14 grid items-start gap-x-8 gap-y-16 md:mt-20 md:grid-cols-12 md:gap-y-24">
          {withVideo.map((f, i) => {
            const s = shape(f);
            return (
              <li
                key={f.slug}
                className={`reveal ${s.span}`}
                style={{ "--d": `${(i % 2) * 100}ms` } as React.CSSProperties}
              >
                <div
                  className={`media-frame ${s.frame} ${f.vertical ? "mx-auto max-w-[24rem] md:max-w-none" : ""}`}
                >
                  <video
                    src={asset(f.video!)}
                    poster={f.poster ? asset(f.poster) : undefined}
                    controls
                    playsInline
                    preload="none"
                    className="h-full w-full object-cover"
                    aria-label={`${f.title}${f.subtitle ? ` ${f.subtitle}` : ""}, ${f.group.toLowerCase()} film by The Creative Economy`}
                  />
                </div>
                <div
                  className={`mt-5 flex items-start justify-between gap-6 border-t border-ink/15 pt-5 ${f.vertical ? "mx-auto max-w-[24rem] md:max-w-none" : ""}`}
                >
                  <div className="min-w-0">
                    <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">
                      {String(i + 1).padStart(2, "0")} · {f.group}
                    </p>
                    <h3 className="display mt-3 text-[clamp(1.4rem,2.6vw,2.4rem)]">
                      {f.title}
                    </h3>
                    {f.subtitle && (
                      <p className="mt-1.5 text-charcoal">{f.subtitle}</p>
                    )}
                  </div>
                  {f.logo && (
                    <BrandLogo logo={f.logo} title={f.title} size={64} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {listed.length > 0 && (
          <div className="mt-20 md:mt-28">
            <p className="mono reveal text-[0.7rem] uppercase tracking-[0.14em] text-mute">
              Also in our film archive
            </p>
            <ul className="mt-6 border-t border-ink/15">
              {listed.map((f, i) => (
                <li
                  key={f.slug}
                  className="reveal grid grid-cols-[1fr_auto] items-center gap-4 border-b border-ink/15 py-5"
                  style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
                >
                  <div className="flex items-center gap-5">
                    <h3 className="display text-[clamp(1.3rem,3vw,2.6rem)]">
                      {f.title}
                    </h3>
                    {f.logo && (
                      <BrandLogo logo={f.logo} title={f.title} size={48} />
                    )}
                  </div>
                  <p className="mono text-[0.7rem] uppercase tracking-[0.14em] text-blue">
                    {f.group}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
