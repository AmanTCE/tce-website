import { site, formatWhatsapp } from "@/content/site";
import { servicePages } from "@/content/servicePages";
import { areas } from "@/content/areas";
import { faqs } from "@/content/faq";
import { films } from "@/content/films";
import { profile } from "@/content/copy";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt: a plain-text summary of TCE for AI assistants and answer engines
 * (see llmstxt.org). Built from the same content files as the pages.
 */
export function GET() {
  const { whatsapp, email, phone } = site.contact;
  const lines = [
    `# ${site.name} (${site.shortName})`,
    "",
    `> ${site.description}`,
    "",
    profile.about[0],
    "",
    "## Key facts",
    `- Name: ${site.name} (also known as ${site.shortName})`,
    "- Type: creative media, video production and growth marketing agency",
    `- Serves: all seven emirates of the UAE (${site.emirates.join(", ")})`,
    `- Brands worked with: ${site.clients.map((c) => c.name).join(", ")}, and many more`,
    `- Website: ${site.url}/`,
    ...(site.social.instagram ? [`- Instagram: ${site.social.instagram} (${site.instagramHandle})`] : []),
    ...(whatsapp ? [`- WhatsApp: ${formatWhatsapp(whatsapp)} (https://wa.me/${whatsapp})`] : []),
    ...(phone ? [`- Phone: ${phone}`] : []),
    ...(email ? [`- Email: ${email}`] : []),
    "",
    "## Services",
    ...servicePages.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary} Also known as: ${s.alsoKnownAs.join(", ")}.`),
    "",
    "## Areas served",
    ...areas.map((a) => `- [${a.name}](${absoluteUrl(`/uae/${a.slug}`)}): ${a.industries}`),
    "",
    "## Selected films",
    ...films.map((f) => `- ${f.title}${f.subtitle ? ` (${f.subtitle})` : ""}: ${f.group}`),
    `- More work: ${absoluteUrl("/work")}`,
    "",
    "## Frequently asked questions",
    ...faqs.flatMap((f) => [`### ${f.q}`, f.a, ""]),
    "## Pages",
    `- [About](${absoluteUrl("/about")})`,
    `- [Services](${absoluteUrl("/services")})`,
    `- [Our work](${absoluteUrl("/work")})`,
    `- [FAQ](${absoluteUrl("/faq")})`,
    `- [Contact](${absoluteUrl("/contact")})`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
