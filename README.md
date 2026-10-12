# The Creative Economy (TCE) website

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4. No animation library: reveals, page transitions and the hero reel are CSS plus small client components, so the shared JS stays around 100 kB.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run build:preview  # flat static preview in ./preview (no server, form disabled)
npm run build:netlify  # the live site for Netlify, in ./out
```

Copy `.env.example` to `.env.local` and fill in the values before deploying.

## Where to edit things

| What | File |
| --- | --- |
| Headlines and page copy | `content/copy.ts` |
| The five core services (profile wording) and the growth capabilities | `content/services.ts` |
| Portfolio projects, categories, client/scope/results | `content/projects.ts` |
| Photos and videos | `public/media/` + `content/media.ts` |
| Email, phone, WhatsApp, social links | `content/site.ts` |
| Colours, fonts, spacing | `app/globals.css` (`@theme` block) |

Anything left `null` in `content/site.ts` or `content/projects.ts` is not shown on the site. Adding a value makes it appear in the footer, the contact page and the project pages automatically. Categories without published work are hidden from the Work filters.

## Deploying on Netlify

The live site (www.tcespace.com) is built by Netlify from this GitHub repository: every push to `main` redeploys it. `netlify.toml` sets the build command (`npm run build:netlify`) and publish folder (`out`), so nothing needs configuring in the Netlify UI beyond:

1. **Add new site → Import an existing project → GitHub**, pick this repository and deploy.
2. **Forms:** under Site configuration → Forms, enable form detection, then add an email notification for the `enquiry` form to the inbox that should receive enquiries.
3. **Domain:** Domain management → add `www.tcespace.com` and follow Netlify's DNS steps at your domain registrar. Netlify issues the HTTPS certificate automatically.

On Netlify the enquiry form posts to Netlify Forms (see `public/__forms.html`): Netlify stores each enquiry, filters spam and emails it.

## Contact form (server hosting)

`app/api/contact/route.ts` validates the form, checks a honeypot field and a minimum fill time, rate-limits by IP, then emails the enquiry through Resend. It needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (server-side only). Until those are set the form tells visitors their message was **not** sent. Review the privacy line in `components/ContactForm.tsx` before launch.

## Brand assets

- `public/brand/tce-logo-black.png` is the logo extracted from page 1 of the company profile with its original transparency. `tce-logo-white.png` is the same file inverted for dark backgrounds, matching the white-on-dark logo TCE supplied. Neither was redrawn.
- All photos in `public/media` were extracted unaltered from the company profile (page numbers are recorded in `content/media.ts`). Most are only about 680 × 1024 px, so higher-resolution originals should replace them before launch.

## Still needed from TCE

- Original high-resolution photos and any video files
- Vector or high-resolution logo files (SVG or large PNG)
- Real project names, and any confirmed client names, scope and results
- Email, phone, WhatsApp and social media links
- Production domain (set `NEXT_PUBLIC_SITE_URL`)
- Resend (or other email service) credentials for the form

## SEO and AI search

- **Pages built for search:** seven service pages (`content/servicePages.ts`, at `/services/[slug]`), one page per emirate (`content/areas.ts`, at `/uae/[slug]`), an FAQ (`content/faq.ts`) and plain facts on the About page. Each has its own title, description, canonical link and Open Graph image.
- **Structured data** (`lib/schema.ts`): Organization, WebSite, Service, FAQPage, BreadcrumbList and VideoObject JSON-LD, built from the content files. Once `site.contact.address` is set the organisation is also marked up as a local business.
- **Crawlers:** `sitemap.xml`, `robots.txt` (search and AI crawlers named and allowed) and `llms.txt`, a plain-text summary for AI assistants, are generated at build time.
- **Domain:** set `NEXT_PUBLIC_SITE_URL` (e.g. `https://tce.ae`) for every production build. `npm run build:wix` refuses to run without it.
- **Analytics:** set `site.analytics.ga4` (or `NEXT_PUBLIC_GA4_ID`) to switch on Google Analytics 4 with Consent Mode v2 and a cookie banner. Enquiries are recorded as `generate_lead`, `contact_whatsapp`, `contact_email` and `contact_phone` events. Search Console and Bing verification codes go in `site.analytics`.
- **Reviews:** add real, approved client reviews to `content/reviews.ts`; the review boxes on the home page appear once there is at least one.
- **Legal:** Privacy Policy, Terms of Use and Cookie Policy read company details from `site.legal`. Have them reviewed by a UAE lawyer before launch.
