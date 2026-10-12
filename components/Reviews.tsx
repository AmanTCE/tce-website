import SectionLabel from "./SectionLabel";
import { ArrowUpRight } from "./Arrow";
import { reviews, googleReviewUrl, type Review } from "@/content/reviews";
import { showPendingNotes } from "@/lib/paths";

/**
 * Three client review boxes. Only real, approved reviews are shown. On the live
 * site the section is hidden until content/reviews.ts has at least one; the
 * design preview shows empty boxes so the layout can be checked.
 */
export default function Reviews() {
  if (!reviews.length && !showPendingNotes) return null;
  const items: (Review | null)[] = reviews.length ? reviews.slice(0, 3) : [null, null, null];

  return (
    <section aria-labelledby="reviews-title" className="section surface-stone">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>What clients say</SectionLabel>
            <h2 id="reviews-title" className="display display-lg reveal mt-8">
              In their words.
            </h2>
          </div>
          {googleReviewUrl && (
            <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="link-line reveal">
              Read and leave reviews on Google <ArrowUpRight />
            </a>
          )}
        </div>
        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6">
          {items.map((r, i) => (
            <li key={i} className="reveal flex flex-col border border-ink/15 bg-paper p-7 md:p-9" style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
              {r ? (
                <figure className="flex h-full flex-col">
                  {r.rating ? (
                    <p className="text-blue" aria-label={`Rated ${r.rating} out of 5`}>
                      <span aria-hidden="true">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    </p>
                  ) : (
                    <span aria-hidden="true" className="display text-5xl leading-none text-blue">“</span>
                  )}
                  <blockquote className="mt-5 flex-1 text-[1.08rem] leading-[1.65]">
                    <p>{r.quote}</p>
                  </blockquote>
                  <figcaption className="mt-8 border-t border-ink/15 pt-5">
                    <p className="font-semibold">{r.name}</p>
                    {(r.role || r.company) && <p className="mt-1 text-sm text-mute">{[r.role, r.company].filter(Boolean).join(", ")}</p>}
                  </figcaption>
                </figure>
              ) : (
                <p className="mono flex min-h-[14rem] items-center justify-center border border-dashed border-blue/50 p-6 text-center text-[0.7rem] uppercase leading-relaxed tracking-[0.08em] text-blue">
                  Pending from TCE: a real client review, with name, role and company
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
