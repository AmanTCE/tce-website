"use client";

/** Reopens the cookie choice banner (see components/Analytics.tsx). */
export default function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event("tce:consent-open"))}>
      Cookie settings
    </button>
  );
}
