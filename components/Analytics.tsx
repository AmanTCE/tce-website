"use client";

import { useEffect, useState } from "react";
import SmartLink from "./SmartLink";
import { site } from "@/content/site";
import { isPreview, isPublicStatic } from "@/lib/paths";

/**
 * Google Analytics 4 with Google Consent Mode v2 and a small consent banner.
 * Analytics storage stays "denied" (no cookies) until the visitor accepts.
 * Also records enquiries as GA4 events: WhatsApp clicks, email and phone
 * clicks, and enquiry form submissions (fired from ContactForm via track()).
 * Renders nothing unless site.analytics.ga4 is set.
 */
const KEY = "tce-consent";
type Choice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Send a GA4 event, if analytics is on. Safe to call anywhere in the browser. */
export function track(event: string, params: Record<string, unknown> = {}) {
  window.gtag?.("event", event, params);
}

const readChoice = (): Choice | null => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
};

export default function Analytics() {
  // Live site only: the design preview never reports to TCE’s analytics.
  const id = !isPreview || isPublicStatic ? site.analytics.ga4 : null;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    const w = window;
    w.dataLayer = w.dataLayer || [];
    // gtag must push the arguments object itself, as in Google's snippet.
    // eslint-disable-next-line prefer-rest-params
    w.gtag = w.gtag || function () { w.dataLayer!.push(arguments); };
    const choice = readChoice();
    w.gtag("consent", "default", {
      analytics_storage: choice ?? "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    });
    w.gtag("js", new Date());
    w.gtag("config", id);
    if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(s);
    }
    if (!choice) setOpen(true);

    const reopen = () => setOpen(true);
    // Contact clicks count as leads in GA4 reports.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      const href = a?.getAttribute("href") ?? "";
      if (/wa\.me|whatsapp/.test(href)) track("contact_whatsapp", { link_url: href.split("?")[0] });
      else if (href.startsWith("mailto:")) track("contact_email");
      else if (href.startsWith("tel:")) track("contact_phone");
    };
    window.addEventListener("tce:consent-open", reopen);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("tce:consent-open", reopen);
      document.removeEventListener("click", onClick);
    };
  }, [id]);

  if (!id || !open) return null;

  const choose = (c: Choice) => {
    try {
      localStorage.setItem(KEY, c);
    } catch {
      /* private mode: the choice lasts for this page view only */
    }
    window.gtag?.("consent", "update", { analytics_storage: c });
    setOpen(false);
  };

  return (
    <div role="dialog" aria-label="Cookie choice" aria-live="polite" className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl border border-ink/15 bg-paper p-5 text-ink shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:inset-x-auto sm:right-5 sm:bottom-5 md:p-6" style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}>
      <p className="text-[0.95rem] leading-relaxed text-charcoal">
        We’d like to use analytics cookies to see how visitors use this site. They’re only set if you accept.{" "}
        <SmartLink href="/cookie-policy" className="underline decoration-blue underline-offset-4">
          Cookie Policy
        </SmartLink>
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" className="btn !min-h-[44px] !px-5 !py-2.5" onClick={() => choose("granted")}>
          Accept
        </button>
        <button type="button" className="btn btn-ghost !min-h-[44px] !px-5 !py-2.5" onClick={() => choose("denied")}>
          Decline
        </button>
      </div>
    </div>
  );
}
