import SmartLink from "./SmartLink";
import Logo from "./Logo";
import { ArrowUpRight } from "./Arrow";
import Year from "./Year";
import CookieSettingsButton from "./CookieSettingsButton";
import { site, socialLabels, formatWhatsapp, type SiteSocialKey } from "@/content/site";
import { servicePages } from "@/content/servicePages";
import { areas } from "@/content/areas";
import { dubaiPages } from "@/content/dubai";

export default function Footer() {
  const socials = (Object.keys(site.social) as SiteSocialKey[]).filter((k) => site.social[k]);
  const { email, phone, whatsapp } = site.contact;

  return (
    <footer className="surface-dark overflow-hidden bg-ink text-white">
      <div className="wrap grid gap-12 pb-12 pt-20 sm:grid-cols-2 md:pt-28 lg:grid-cols-12 lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-4">
          <SmartLink href="/" aria-label="The Creative Economy, home" className="inline-block">
            <Logo tone="light" className="h-16 w-auto md:h-20" />
          </SmartLink>
          <p className="muted mt-8 max-w-sm text-[0.95rem]">
            Video production, social media, performance marketing and growth strategy for brands in all seven emirates of the {site.region}.
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <p className="mono mb-5 text-xs uppercase text-white/50">Explore</p>
          <ul className="grid gap-2.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <SmartLink href={item.href} className="text-lg transition-colors hover:text-sky">
                  {item.label}
                </SmartLink>
              </li>
            ))}
            <li>
              <SmartLink href="/faq" className="text-lg transition-colors hover:text-sky">
                FAQ
              </SmartLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Services" className="lg:col-span-3">
          <p className="mono mb-5 text-xs uppercase text-white/50">Services</p>
          <ul className="grid gap-2.5">
            {servicePages.map((s) => (
              <li key={s.slug}>
                <SmartLink href={`/services/${s.slug}`} className="transition-colors hover:text-sky">
                  {s.name}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="mono mb-5 text-xs uppercase text-white/50">Get in touch</p>
          <ul className="grid gap-2.5">
            <li>
              <SmartLink href="/contact" className="inline-flex items-center gap-2 text-lg transition-colors hover:text-sky">
                Start a conversation <ArrowUpRight />
              </SmartLink>
            </li>
            {email && (
              <li>
                <a href={`mailto:${email}`} className="text-lg transition-colors hover:text-sky">{email}</a>
              </li>
            )}
            {phone && (
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-lg transition-colors hover:text-sky">{phone}</a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-lg transition-colors hover:text-sky">WhatsApp {formatWhatsapp(whatsapp)}</a>
              </li>
            )}
            {socials.map((k) => (
              <li key={k}>
                <a href={site.social[k]!} target="_blank" rel="noopener noreferrer" className="text-lg transition-colors hover:text-sky">
                  {k === "instagram" ? `Instagram ${site.instagramHandle}` : socialLabels[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dubai landing pages, then every emirate */}
      <nav aria-label="Areas we serve" className="wrap pb-12">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 pt-8 text-[0.95rem] text-white/70">
          <li className="mono text-xs uppercase text-white/50">In Dubai</li>
          {dubaiPages.map((p) => (
            <li key={p.slug}>
              <SmartLink href={`/dubai/${p.slug}`} className="inline-flex min-h-[32px] items-center transition-colors hover:text-sky">
                {p.name.replace(/ in Dubai$/, "")}
              </SmartLink>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem] text-white/70">
          <li className="mono text-xs uppercase text-white/50">
            <SmartLink href="/uae" className="transition-colors hover:text-sky">
              Across the UAE
            </SmartLink>
          </li>
          {areas.map((a) => (
            <li key={a.slug}>
              <SmartLink href={`/uae/${a.slug}`} className="inline-flex min-h-[32px] items-center transition-colors hover:text-sky">
                {a.name}
              </SmartLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Decorative wordmark band */}
      <div aria-hidden="true" className="select-none border-y border-white/10 py-4 md:py-6">
        <div className="marquee">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={`display shrink-0 pr-[0.4em] text-[clamp(3.5rem,13vw,13rem)] leading-[0.95] ${i % 2 ? "outline-text text-white/60" : "text-white"}`}>
              The Creative Economy
            </span>
          ))}
        </div>
      </div>

      <div className="wrap flex flex-col gap-3 py-7 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between" style={{ paddingBottom: "calc(1.75rem + env(safe-area-inset-bottom, 0px))" }}>
        <p>© <Year /> The Creative Economy. All rights reserved.</p>
        <nav aria-label="Legal">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <SmartLink href="/privacy-policy" className="transition-colors hover:text-white">Privacy Policy</SmartLink>
            </li>
            <li>
              <SmartLink href="/terms" className="transition-colors hover:text-white">Terms of Use</SmartLink>
            </li>
            <li>
              <SmartLink href="/cookie-policy" className="transition-colors hover:text-white">Cookie Policy</SmartLink>
            </li>
            {site.analytics.ga4 && (
              <li>
                <CookieSettingsButton className="transition-colors hover:text-white" />
              </li>
            )}
            <li>
              <a href="#main" className="mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-white">
                Back to top ↑
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
