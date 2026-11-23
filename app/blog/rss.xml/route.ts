import { site } from "@/content/site";
import { posts, plain } from "@/content/blog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** RSS feed of the blog, for feed readers and for search engines that pick up new posts from feeds. */
export function GET() {
  const items = posts
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.published}T08:00:00+04:00`).toUTCString()}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(plain(p.shortAnswer))}</description>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} blog</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Guides on video production, social media and marketing for brands in Dubai and the UAE.</description>
    <language>en-ae</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
