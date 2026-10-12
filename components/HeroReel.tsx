"use client";

import { useEffect, useState } from "react";
import Media from "./Media";
import type { MediaItem } from "@/content/media";

/** Slow crossfade through real portfolio stills. Static under reduced motion. */
export default function HeroReel({ items, interval = 4200 }: { items: MediaItem[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || paused) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % items.length), interval);
    return () => window.clearInterval(t);
  }, [items.length, interval, paused]);

  return (
    <div className="relative h-full w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {items.map((item, idx) => (
        <div
          key={item.src}
          className="absolute inset-0 transition-[opacity,transform] duration-[1600ms] ease-out-expo"
          style={{ opacity: idx === i ? 1 : 0, transform: idx === i ? "scale(1)" : "scale(1.06)" }}
          aria-hidden={idx !== i}
        >
          <Media item={item} priority={idx === 0} sizes="(min-width: 1024px) 30vw, 60vw" className="h-full w-full object-cover" />
        </div>
      ))}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-1.5" aria-hidden="true">
        {items.map((item, idx) => (
          <span key={item.src} className="h-[2px] flex-1 overflow-hidden bg-white/25">
            <span
              className="block h-full bg-white"
              style={{
                width: idx === i ? "100%" : idx < i ? "100%" : "0%",
                transition: idx === i && !paused ? `width ${interval}ms linear` : "none",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
