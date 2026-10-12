"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SmartLink from "./SmartLink";
import Logo from "./Logo";
import { ArrowUpRight } from "./Arrow";
import { site } from "@/content/site";

/**
 * Thin editorial header. Transparent over each page's hero, solid paper once
 * scrolled, hidden while scrolling down and back on scroll up.
 * Pages declare their hero tone and id on <main data-hero="dark|light" data-page="...">.
 */
export default function Header() {
  const pathname = usePathname();
  const [heroDark, setHeroDark] = useState(true);
  const [page, setPage] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>("main[data-hero]");
    setHeroDark(main?.dataset.hero === "dark");
    setPage(main?.dataset.page ?? "");
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 320 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 320) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll, trap focus and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = Array.from(menuRef.current.querySelectorAll<HTMLElement>("a, button"));
        const all = [toggleRef.current!, ...items];
        const idx = all.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx <= 0) {
          e.preventDefault();
          all[all.length - 1].focus();
        } else if (!e.shiftKey && idx === all.length - 1) {
          e.preventDefault();
          all[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const light = open || (heroDark && !scrolled);
  const isActive = (href: string) => {
    const id = href === "/" ? "home" : href.replace(/^\//, "").split("/")[0];
    return page === id || (page.startsWith("work") && id === "work");
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-white">
        Skip to content
      </a>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-500 ease-out-expo",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          open ? "bg-transparent text-white" : scrolled ? "border-b border-ink/10 bg-paper/88 text-ink backdrop-blur-md" : light ? "border-b border-white/0 text-white" : "border-b border-ink/0 text-ink",
        ].join(" ")}
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <SmartLink href="/" className="relative z-10 block shrink-0" aria-label="The Creative Economy, home">
            <Logo tone={light ? "light" : "dark"} className="h-10 w-auto sm:h-11" priority />
          </SmartLink>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <SmartLink
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2 font-mono text-[0.74rem] font-medium uppercase tracking-[0.14em]"
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-out-expo ${
                        isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <SmartLink href="/contact" className={`btn hidden !min-h-[44px] !px-5 !py-2.5 sm:inline-flex ${light ? "btn-light" : ""}`}>
              Let’s Talk <ArrowUpRight />
            </SmartLink>
            <button
              ref={toggleRef}
              type="button"
              className="relative z-10 -mr-2 flex h-12 w-12 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-7">
                <span className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-out-expo ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`surface-dark surface-glow fixed inset-0 z-40 flex flex-col overflow-y-auto transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none invisible [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        style={{ paddingTop: "calc(var(--header-h) + env(safe-area-inset-top, 0px))" }}
      >
        <nav aria-label="Mobile" className="wrap flex flex-1 flex-col justify-center py-10">
          <ul className="grid gap-2">
            {site.nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <SmartLink
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-baseline gap-4 py-1 transition-[transform,opacity] duration-700 ease-out-expo ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                >
                  <span className="mono text-xs text-sky">0{i + 1}</span>
                  <span className={`display text-[clamp(2.2rem,11vw,4.5rem)] ${isActive(item.href) ? "" : "text-white/90"}`}>{item.label}</span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="wrap flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-6" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}>
          <p className="mono text-xs uppercase text-white/60">The Creative Economy · {site.region}</p>
          <SmartLink href="/contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="btn btn-light">
            Let’s Talk <ArrowUpRight />
          </SmartLink>
        </div>
      </div>
    </>
  );
}
