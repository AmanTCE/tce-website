import { site, formatWhatsapp } from "@/content/site";
import { servicePages, type ServicePage } from "@/content/servicePages";
import { absoluteUrl } from "@/lib/seo";

/**
 * schema.org structured data. Search engines and AI assistants read these
 * blocks to understand who TCE is, what it offers and where. Every value comes
 * from the content files, so nothing here can drift from what the page says.
 */
type Json = Record<string, unknown>;

export const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

const emirateNodes = site.emirates.map((name) => ({ "@type": "AdministrativeArea", name, containedInPlace: { "@type": "Country", name: "United Arab Emirates" } }));
export const areaServed = [{ "@type": "Country", name: "United Arab Emirates", identifier: "AE" }, ...emirateNodes];

const sameAs = Object.values(site.social).filter(Boolean) as string[];

export function organization(): Json {
  const { email, phone, whatsapp, address } = site.contact;
  const telephone = phone ?? (whatsapp ? formatWhatsapp(whatsapp) : null);
  const org: Json = {
    "@type": address ? ["Organization", "ProfessionalService"] : "Organization",
    "@id": orgId,
    name: site.name,
    alternateName: site.shortName,
    ...(site.legal.companyName ? { legalName: site.legal.companyName } : {}),
    url: `${site.url}/`,
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/tce-logo-black.png"), width: 381, height: 200 },
    image: absoluteUrl("/media/og.jpg"),
    description: site.description,
    slogan: "Creative thinking. Measurable growth.",
    areaServed,
    knowsAbout: [...new Set(servicePages.flatMap((s) => [s.name, ...s.alsoKnownAs]))],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Creative media and growth marketing services",
      itemListElement: servicePages.map((s) => ({ "@type": "Offer", itemOffered: { "@id": `${absoluteUrl(`/services/${s.slug}`)}#service` } })),
    },
    ...(email ? { email } : {}),
    ...(telephone ? { telephone } : {}),
    ...(telephone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone,
            ...(email ? { email } : {}),
            areaServed: "AE",
            availableLanguage: ["English"],
          },
        }
      : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: address.street,
            addressLocality: address.city,
            addressRegion: address.emirate,
            ...(address.postalCode ? { postalCode: address.postalCode } : {}),
            addressCountry: "AE",
          },
        }
      : { address: { "@type": "PostalAddress", addressLocality: site.contact.city, addressRegion: site.contact.city, addressCountry: "AE" } }),
    ...(sameAs.length ? { sameAs } : {}),
  };
  return org;
}

export function website(): Json {
  return { "@type": "WebSite", "@id": websiteId, url: `${site.url}/`, name: site.name, alternateName: site.shortName, inLanguage: "en-AE", publisher: { "@id": orgId } };
}

export function webPage({ path, name, description, type = "WebPage" }: { path: string; name: string; description: string; type?: string }): Json {
  const url = absoluteUrl(path);
  return { "@type": type, "@id": `${url}#webpage`, url, name, description, isPartOf: { "@id": websiteId }, about: { "@id": orgId }, inLanguage: "en-AE" };
}

export function breadcrumbs(items: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function service(s: ServicePage, area?: string): Json {
  const url = absoluteUrl(`/services/${s.slug}`);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.name,
    serviceType: s.serviceType,
    alternateName: s.alsoKnownAs,
    description: s.metaDescription,
    url,
    provider: { "@id": orgId },
    areaServed: area ? { "@type": "AdministrativeArea", name: area } : areaServed,
  };
}

export function faqPage(faqs: { q: string; a: string }[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

/** Wraps nodes into one JSON-LD document. */
export const graph = (...nodes: Json[]) => ({ "@context": "https://schema.org", "@graph": nodes });
