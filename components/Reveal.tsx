"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds .is-in to .reveal / .reveal-img elements as they enter the viewport.
 * Content is fully visible without JavaScript; the "js" class on <html> opts
 * into the animation.
 */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in), .reveal-img:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
