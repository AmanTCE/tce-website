import type { NextConfig } from "next";

// PREVIEW=1 produces a flat, path-agnostic static export used for the hosted preview
// (see scripts/build-preview.mjs). Normal builds keep the server so /api/contact works.
// PUBLIC_STATIC=1 (with PREVIEW=1) is the same export for a real static host such as Wix:
// preview-only notes are hidden and the form points visitors to WhatsApp instead.
// NETLIFY=1 (scripts/build-netlify.mjs) is a normal static export with clean URLs for
// Netlify: public, no preview notes, and the form posts to Netlify Forms, which emails TCE.
const isNetlify = process.env.NETLIFY_BUILD === "1";
const isPreview = process.env.PREVIEW === "1";
const isPublicStatic = process.env.PUBLIC_STATIC === "1" || isNetlify;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isPreview || isNetlify ? { output: "export" as const, images: { unoptimized: true } } : {}),
  env: {
    NEXT_PUBLIC_PREVIEW: isPreview ? "1" : "",
    NEXT_PUBLIC_STATIC_PUBLIC: isPublicStatic ? "1" : "",
    NEXT_PUBLIC_FORM_BACKEND: isNetlify ? "netlify" : "",
  },
};

export default nextConfig;
