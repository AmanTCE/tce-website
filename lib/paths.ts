/**
 * Builds hrefs and asset URLs. In the hosted preview (PREVIEW=1) every page is
 * a flat .html file and every URL is relative, so the preview works from any
 * folder. In the real build these are ordinary absolute routes.
 */
export const isPreview = process.env.NEXT_PUBLIC_PREVIEW === "1";
/** A static export published for real visitors (e.g. on Wix): no server, but no preview notes either. */
export const isPublicStatic = process.env.NEXT_PUBLIC_STATIC_PUBLIC === "1";
/** On Netlify the enquiry form posts to Netlify Forms (a stored copy) and Web3Forms (the email to TCE). */
export const netlifyForms = process.env.NEXT_PUBLIC_FORM_BACKEND === "netlify";
/** Notes for TCE about missing content, shown only in the design preview. */
export const showPendingNotes = isPreview && !isPublicStatic;

export function pageHref(href: string): string {
  if (!isPreview || /^(https?:|mailto:|tel:)/.test(href)) return href;
  const m = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  const [, path = "", query = "", hash = ""] = m ?? [];
  if (path === "") return `${query}${hash}`;
  // On the live static host index.html is the home page, so link to the site root.
  if (path === "/" && isPublicStatic) return `./${query}${hash}`;
  const file = path === "/" ? "home.html" : path.replace(/^\//, "").replace(/\/$/, "").replace(/\//g, "-") + ".html";
  return `${file}${query}${hash}`;
}

export function asset(src: string): string {
  return isPreview ? src.replace(/^\//, "") : src;
}

/**
 * The public path of a page as visitors and search engines see it: "/about"
 * on a server, "/about.html" on the flat static host. Used for canonical links,
 * the sitemap and structured data.
 */
export function routePath(href: string): string {
  // Only the flat export (preview, Wix) has .html addresses; Netlify serves clean URLs.
  if (!isPreview || !isPublicStatic || href === "/") return href;
  return `/${pageHref(href)}`;
}
