import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import SmartLink from "@/components/SmartLink";
import Media from "@/components/Media";
import { contactPage } from "@/content/copy";
import { site, socialLabels, formatWhatsapp, type SiteSocialKey } from "@/content/site";
import { coreServices } from "@/content/services";
import { media } from "@/content/media";
import { pageMetadata } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { breadcrumbs, graph, webPage } from "@/lib/schema";
import { showPendingNotes } from "@/lib/paths";

const title = "Contact TCE: Video Production & Marketing Agency UAE";
const description = "Get a quote from The Creative Economy for video production, social media, Meta ads, UGC or SEO anywhere in the UAE. Email, call or message us, or send an enquiry.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  const { email, phone, whatsapp } = site.contact;
  const socials = (Object.keys(site.social) as SiteSocialKey[]).filter((k) => site.social[k]);
  const missing = [
    !email && "email address",
    !phone && "phone number",
    !whatsapp && "WhatsApp number",
    !socials.length && "social media links",
  ].filter(Boolean);

  return (
    <main id="main" data-hero="light" data-page="contact">
      <JsonLd data={graph(webPage({ path: "/contact", name: title, description, type: "ContactPage" }), breadcrumbs([{ name: "Contact", path: "/contact" }]))} />
      <PageHero label="Contact" h1="Contact The Creative Economy" lines={contactPage.headline} intro={contactPage.body} />

      <section aria-label="Enquiry form" className="pb-24 md:pb-36">
        <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-8">
          <aside className="order-2 lg:order-1 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="media-frame reveal-img hidden aspect-[4/5] max-w-sm lg:block">
                <Media item={media.cameraHands} sizes="30vw" className="h-full w-full object-cover" />
              </div>

              {(email || phone || whatsapp || socials.length > 0) && (
                <div className="mt-10">
                  <p className="label">Direct</p>
                  {site.contact.preferred && <p className="mt-5 text-charcoal">{site.contact.preferred}</p>}
                  <ul className="mt-5 grid gap-2 text-lg">
                    {email && <li><a className="hover:text-blue" href={`mailto:${email}`}>{email}</a></li>}
                    {phone && <li><a className="hover:text-blue" href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></li>}
                    {whatsapp && <li><a className="hover:text-blue" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {formatWhatsapp(whatsapp)}</a></li>}
                    {socials.map((k) => (
                      <li key={k}><a className="hover:text-blue" href={site.social[k]!} target="_blank" rel="noopener noreferrer">{k === "instagram" ? `Instagram ${site.instagramHandle}` : socialLabels[k]}</a></li>
                    ))}
                  </ul>
                </div>
              )}

              {site.contact.meetings && (
                <div className="mt-10">
                  <p className="label">Meetings</p>
                  <p className="mt-5 text-charcoal">{site.contact.meetings}</p>
                </div>
              )}

              {showPendingNotes && missing.length > 0 && (
                <p className="mono mt-10 border border-dashed border-blue/50 px-4 py-3 text-[0.7rem] uppercase leading-relaxed tracking-[0.08em] text-blue">
                  Pending from TCE: {missing.join(", ")}. These appear here and in the footer once added to the site settings.
                </p>
              )}

              <div className="mt-10">
                <p className="label">What we do</p>
                <ul className="mt-5 grid gap-1.5">
                  {coreServices.map((s) => (
                    <li key={s.slug}>
                      <SmartLink href={`/services#${s.slug}`} className="text-charcoal transition-colors hover:text-blue">
                        {s.title}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          <div className="order-1 lg:order-2 lg:col-span-7 lg:col-start-6">
            <Suspense>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
