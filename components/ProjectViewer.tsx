"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Media from "./Media";
import type { MediaItem } from "@/content/media";

/**
 * Project media with a full-screen viewer. Keyboard (←/→/Esc), swipe and
 * buttons all work; focus returns to the image that opened it.
 */
export default function ProjectViewer({ items, title }: { items: MediaItem[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => {
    setIndex((i) => {
      if (i !== null) window.setTimeout(() => triggers.current[i]?.focus(), 0);
      return null;
    });
  }, []);
  const step = useCallback((dir: number) => setIndex((i) => (i === null ? i : (i + dir + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const single = items.length === 1;

  return (
    <>
      <div className={single ? "mx-auto w-full max-w-3xl" : "grid gap-4 sm:grid-cols-2 md:gap-6"}>
        {items.map((m, i) => (
          <button
            key={m.src}
            ref={(el) => {
              triggers.current[i] = el;
            }}
            type="button"
            onClick={() => setIndex(i)}
            className="group block w-full cursor-zoom-in"
            aria-label={`View image ${i + 1} of ${items.length} full screen`}
          >
            <div className="media-frame zoom reveal-img" style={{ aspectRatio: `${m.width} / ${m.height}`, "--d": `${i * 100}ms` } as React.CSSProperties}>
              <Media item={m} priority={i === 0} sizes={single ? "(min-width: 768px) 768px, 100vw" : "(min-width: 640px) 46vw, 100vw"} className="h-full w-full object-cover" />
            </div>
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, image ${index + 1} of ${items.length}`}
          tabIndex={-1}
          className="page-enter fixed inset-0 z-[60] flex flex-col bg-ink/97 text-white outline-none"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="wrap flex h-16 shrink-0 items-center justify-between" style={{ marginTop: "env(safe-area-inset-top, 0px)" }}>
            <p className="mono text-xs uppercase tracking-[0.14em] text-white/70">
              {title} · {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button type="button" onClick={close} className="mono -mr-3 inline-flex min-h-[44px] items-center px-3 text-xs uppercase tracking-[0.14em] hover:text-sky">
              Close ✕
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6">
            <Media key={items[index].src} item={items[index]} priority sizes="100vw" className="page-enter max-h-full w-auto max-w-full object-contain" />
          </div>
          {items.length > 1 && (
            <div className="wrap flex h-20 shrink-0 items-center justify-between" style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}>
              <button type="button" onClick={() => step(-1)} className="mono inline-flex min-h-[44px] items-center text-xs uppercase tracking-[0.14em] hover:text-sky">
                ← Previous
              </button>
              <button type="button" onClick={() => step(1)} className="mono inline-flex min-h-[44px] items-center text-xs uppercase tracking-[0.14em] hover:text-sky">
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
