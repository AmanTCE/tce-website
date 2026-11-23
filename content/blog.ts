import { media, type MediaItem } from "./media";

/**
 * The TCE blog, under /blog. Each post is a practical guide written to answer
 * one question people search for (and ask AI assistants), with a short answer
 * at the top, clear sections and an FAQ.
 *
 * Rules for every post: no invented statistics, prices, results, clients,
 * awards or quotes. Legal or regulatory points are kept general and point
 * readers to the official source. Inline text supports [links](/path) and
 * **bold**.
 *
 * Add a post: copy one below, give it a unique slug and today's date, and
 * put it first in the list (newest first).
 */
export type Block =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { head: string[]; rows: string[][] } };

export type Post = {
  slug: string;
  /** On-page headline (h1). */
  title: string;
  /** Search result title; the site adds " | TCE". Keep under ~60 characters with that. */
  metaTitle: string;
  /** Search result description, about 140 to 160 characters. */
  description: string;
  /** ISO dates. */
  published: string;
  updated: string;
  category: "Video production" | "Social media" | "Performance marketing" | "Influencer & UGC" | "Strategy" | "SEO";
  cover: MediaItem;
  /** Two or three sentences that answer the headline question directly. Shown first and quoted by answer engines. */
  shortAnswer: string;
  sections: { heading: string; blocks: Block[] }[];
  faqs: { q: string; a: string }[];
  /** Service page slugs (content/servicePages.ts) this post supports. */
  services: string[];
};

export const posts: Post[] = [
  {
    slug: "ugc-vs-influencer-marketing-uae",
    title: "UGC vs influencer marketing in the UAE: which does your brand need?",
    metaTitle: "UGC vs Influencer Marketing in the UAE: Which Do You Need?",
    description:
      "The difference between UGC content and influencer marketing, when each one works best for UAE brands, usage rights, advertiser permits and how to brief creators.",
    published: "2026-11-23",
    updated: "2026-11-23",
    category: "Influencer & UGC",
    cover: media.creatorPhone,
    shortAnswer:
      "UGC (user-generated-style content) is video and photo made by creators in a natural, customer-like style that your brand then posts or runs as ads. Influencer marketing pays a creator to publish to their own audience. In short, UGC buys content and influencer marketing buys attention and trust from an existing audience. Many UAE brands use both: influencers for awareness, UGC to feed their ads and social channels.",
    sections: [
      {
        heading: "What is UGC content?",
        blocks: [
          { p: "UGC started as content real customers made on their own: an unboxing, a review, a quick clip from a restaurant table. Today most brands commission it. A creator films the product the way a customer would, usually vertical, handheld and talking to camera, and delivers the files to the brand." },
          { p: "The creator does not need a large following, because the content is published on **your** channels or used in **your** ads. What you are paying for is a natural, trustworthy style that feels native to Instagram, TikTok and Snapchat feeds." },
        ],
      },
      {
        heading: "What is influencer marketing?",
        blocks: [
          { p: "Influencer marketing pays a creator to feature your brand on their own account. You are buying access to an audience that already follows and trusts that person, so who the audience is matters as much as the content." },
          { p: "It works best when the creator’s followers match your customers by location, language, age and interests, and when the product fits naturally into what the creator already posts." },
        ],
      },
      {
        heading: "UGC vs influencer marketing at a glance",
        blocks: [
          {
            table: {
              head: ["", "UGC content", "Influencer marketing"],
              rows: [
                ["What you get", "Video and photo files for your own channels and ads", "Posts or stories on the creator’s account"],
                ["Main goal", "Content that converts, especially in paid ads", "Reach, awareness and social proof"],
                ["Creator’s following", "Not important", "Central: you are paying for their audience"],
                ["Where it runs", "Your social pages, website and ads", "The creator’s profile (and your ads, if agreed)"],
                ["Best for", "Testing many ad creatives, product demos, reviews", "Launches, openings, events, building a name"],
              ],
            },
          },
        ],
      },
      {
        heading: "When to choose UGC",
        blocks: [
          {
            ul: [
              "You run Meta or TikTok ads and need a steady supply of fresh creative to test.",
              "Your product needs to be shown in use: food, beauty, gadgets, apps, fitness.",
              "You want content that looks like a real customer recommendation rather than a polished advert.",
              "You need several hooks, angles or languages from one brief, for example English and Arabic versions.",
            ],
          },
          { p: "UGC pairs naturally with [performance marketing](/services/performance-marketing): the ads show which videos and hooks work, and the next batch of UGC builds on them." },
        ],
      },
      {
        heading: "When to choose influencers",
        blocks: [
          {
            ul: [
              "You are launching a product, opening a venue or hosting an event and need people to hear about it quickly.",
              "Your category runs on recommendations, such as restaurants, cafes, beauty and lifestyle.",
              "You want to reach a specific community, emirate or language audience that a creator already owns.",
            ],
          },
          { p: "Check a creator’s audience before you book: where their followers are based, how many of them engage, and whether past sponsored posts got real comments rather than generic ones." },
        ],
      },
      {
        heading: "UAE rules to know before you book creators",
        blocks: [
          { p: "In the UAE, people who are paid to promote products or services on social media generally need an advertiser permit from the UAE Media Council, and paid content should be clearly identified as advertising. Ask creators for their permit details and make the disclosure part of the brief." },
          { p: "Rules are updated from time to time, so check the current requirements with the UAE Media Council before a campaign rather than relying on an old checklist. This article is general guidance, not legal advice." },
        ],
      },
      {
        heading: "Usage rights: the detail most briefs miss",
        blocks: [
          { p: "Whoever films the content usually owns it unless the contract says otherwise. Agree in writing:" },
          {
            ul: [
              "Where you can use the content: organic social, paid ads, website, in-store screens.",
              "For how long: a fixed period or in perpetuity.",
              "Whether you can run ads from the creator’s handle (often called partnership or whitelisted ads).",
              "Whether you receive raw footage as well as the final edit.",
            ],
          },
        ],
      },
      {
        heading: "How to brief a creator",
        blocks: [
          {
            ol: [
              "One clear goal: awareness, sign-ups, sales or footfall.",
              "Who the audience is and what they care about.",
              "Three or four key messages, with anything that must not be said.",
              "The format: length, orientation, hooks to try, captions, language.",
              "Disclosure wording, usage rights and the delivery date.",
            ],
          },
          { p: "Leave room for the creator’s own voice. Scripts that sound like an advert lose the very thing you are paying for." },
        ],
      },
      {
        heading: "How TCE can help",
        blocks: [
          { p: "TCE produces UGC-style content and connects brands with creators across the UAE, then plans how that content is used in social and paid campaigns. See our [influencer marketing and UGC content](/services/influencer-ugc-content) service or [tell us about your brand](/contact)." },
        ],
      },
    ],
    faqs: [
      {
        q: "Is UGC cheaper than influencer marketing?",
        a: "Often, because with UGC you pay for content rather than access to a large audience. Costs for both depend on the creator, the number of videos, usage rights and how long you can use the content.",
      },
      {
        q: "Can I use influencer content in my ads?",
        a: "Only if the agreement allows it. Agree paid usage, the duration and whether ads can run from the creator’s handle before the content is made.",
      },
      {
        q: "Do creators in the UAE need a licence to advertise?",
        a: "People paid to advertise on social media in the UAE generally need an advertiser permit from the UAE Media Council. Check the Council’s current rules before you book creators.",
      },
      {
        q: "Should UGC be in English or Arabic?",
        a: "It depends on who you are selling to. Many UAE brands brief both, because the same idea can be filmed in each language and tested in ads.",
      },
    ],
    services: ["influencer-ugc-content", "performance-marketing", "social-media-management"],
  },
  {
    slug: "social-media-management-dubai-guide",
    title: "Social media management in Dubai: what’s included and how to choose an agency",
    metaTitle: "Social Media Management in Dubai: What’s Included",
    description:
      "What a social media management agency in Dubai actually does each month, which platforms matter for UAE brands, and the questions to ask before you sign.",
    published: "2026-11-23",
    updated: "2026-11-23",
    category: "Social media",
    cover: media.socialMockup,
    shortAnswer:
      "Social media management means an agency plans, creates, publishes and reviews your brand’s social content every month. A complete service covers strategy, a content calendar, content creation, posting, community management and monthly reporting. When choosing an agency in Dubai, check who actually makes the content, how results are reported, and that your brand keeps ownership of its accounts and files.",
    sections: [
      {
        heading: "What social media management includes",
        blocks: [
          {
            ul: [
              "**Strategy:** who you are talking to, what you want them to do, and the content themes that get them there.",
              "**Content calendar:** what goes out each week, planned around launches, seasons and UAE moments such as Ramadan, Eid and National Day.",
              "**Content creation:** photography, short-form video, graphics and captions.",
              "**Publishing:** posting at the right times, in the right formats for each platform.",
              "**Community management:** replying to comments and messages, and flagging leads or complaints to your team.",
              "**Reporting:** a regular review of what worked, what didn’t and what changes next month.",
            ],
          },
          { p: "Agencies package these differently, so compare what is actually included rather than the number of posts alone." },
        ],
      },
      {
        heading: "Which platforms matter for UAE brands?",
        blocks: [
          {
            ul: [
              "**Instagram:** the default for food, hospitality, retail, beauty, real estate and lifestyle brands.",
              "**TikTok:** strong for discovery and short-form video, especially with younger audiences.",
              "**LinkedIn:** the main channel for B2B, professional services and hiring.",
              "**Snapchat:** worth considering for consumer brands targeting younger UAE audiences.",
              "**YouTube:** for longer films, tutorials and content you want found through search.",
            ],
          },
          { p: "You don’t need all of them. Two platforms done consistently beat five done badly. Choose based on where your customers spend time and what content you can sustain." },
        ],
      },
      {
        heading: "Organic social vs paid social",
        blocks: [
          { p: "Organic social is what you post to your own followers. Paid social is advertising, such as Meta ads, that puts content in front of people who don’t follow you yet. Organic builds trust and gives people something to find when they check you out; paid brings in new audiences and measurable leads or sales." },
          { p: "The two work best together: content that performs well organically is often the best material for ads. See [performance marketing and Meta ads](/services/performance-marketing) for the paid side." },
        ],
      },
      {
        heading: "How to choose a social media agency in Dubai",
        blocks: [
          {
            ol: [
              "**Look at their own work.** Ask for examples in your industry and check the content quality, not just follower counts.",
              "**Ask who makes the content.** Agencies that shoot and edit in-house can usually move faster and keep the look consistent.",
              "**Ask how results are reported.** Agree which numbers matter to you, such as enquiries, bookings, sales or reach, and how often you will review them.",
              "**Confirm ownership.** Your brand should own its accounts, ad accounts and the content you pay for.",
              "**Check the contract.** Understand the minimum term, what happens if you leave, and how extra work is charged.",
            ],
          },
        ],
      },
      {
        heading: "Red flags",
        blocks: [
          {
            ul: [
              "Guaranteed follower numbers, or any suggestion of buying followers or engagement.",
              "Agencies that set up accounts in their own name and keep the logins.",
              "Reports that only show likes and impressions, with no link to your business goals.",
              "Content that looks the same as every other client’s.",
            ],
          },
        ],
      },
      {
        heading: "What you’ll need to provide",
        blocks: [
          { p: "Access to your accounts, your brand guidelines and logo files, product or menu information, and someone on your side who can approve content and answer questions quickly. A fast approval loop matters more than most brands expect." },
        ],
      },
      {
        heading: "How TCE can help",
        blocks: [
          { p: "TCE produces content in-house and manages social media for brands across Dubai and the UAE, from strategy and the monthly calendar to filming, posting and reporting. See [social media management in Dubai](/dubai/social-media-management) or [get in touch](/contact)." },
        ],
      },
    ],
    faqs: [
      {
        q: "How many posts a month do I need?",
        a: "Enough to stay consistent with content you can make well. Agree a monthly plan per platform with your agency and adjust it once you see what your audience responds to.",
      },
      {
        q: "Does social media management include ads?",
        a: "Not always. Some agencies include ad management, others treat it as a separate service with its own budget. Ask how organic content and paid campaigns will work together.",
      },
      {
        q: "Should we post in English and Arabic?",
        a: "If your customers use both, yes. Many UAE brands post bilingually or create separate versions for key campaigns.",
      },
      {
        q: "How long before social media management shows results?",
        a: "Agree what results mean for your business first, then review them monthly. Consistency over several months matters more than any single post.",
      },
    ],
    services: ["social-media-management", "content-strategy", "performance-marketing"],
  },
  {
    slug: "video-production-cost-dubai",
    title: "How much does video production cost in Dubai? What actually drives the price",
    metaTitle: "Video Production Cost in Dubai: What Drives the Price",
    description:
      "What sets the price of a brand film, commercial or social video in Dubai: shoot days, crew, locations and permits, talent, editing and usage. Plus what to put in your brief.",
    published: "2026-11-23",
    updated: "2026-11-23",
    category: "Video production",
    cover: media.cameraHands,
    shortAnswer:
      "Video production in Dubai is priced on scope, not on the length of the finished video. The main cost drivers are pre-production, the number of shoot days, crew and equipment, locations and permits, talent, post-production, the number of versions and formats you need, and how long you can use the footage. The quickest way to an accurate quote is a short brief with your goal, deliverables, deadline and budget range.",
    sections: [
      {
        heading: "Why there is no fixed price per minute",
        blocks: [
          { p: "A 30-second video filmed on a phone in one location and a 30-second commercial with actors, three locations and colour grading are both “30-second videos”, but they are completely different jobs. Production companies quote on the work involved: planning, shooting and editing." },
        ],
      },
      {
        heading: "The eight things that set the price",
        blocks: [
          {
            ol: [
              "**Pre-production:** concept, script, storyboard, shot list, casting and scheduling. Good planning makes the shoot day cheaper.",
              "**Shoot days:** usually the biggest single factor. More locations and set-ups mean more time.",
              "**Crew and equipment:** a small team with one camera for social content, or a director, camera operators, lighting, sound and a producer for a commercial.",
              "**Locations and permits:** studios, venues and outdoor locations each have costs. Filming in public places in Dubai generally needs a permit, so build time for it into your schedule.",
              "**Talent:** presenters, actors, models or creators, plus their usage fees.",
              "**Post-production:** editing, colour grading, sound design, music licensing, subtitles and motion graphics.",
              "**Versions and formats:** a 16:9 film for YouTube and your website, 9:16 cut-downs for Reels and TikTok, and English and Arabic versions all add editing time.",
              "**Usage:** where the video will run and for how long, especially if it includes paid talent or licensed music.",
            ],
          },
        ],
      },
      {
        heading: "How to get more from one shoot",
        blocks: [
          {
            ul: [
              "Plan social cut-downs before the shoot, not after, so the right shots are captured.",
              "Shoot photography on the same day to share the crew, location and styling costs.",
              "Batch several months of social content in one production day.",
              "Film extra hooks and openings so you can test different versions in ads.",
            ],
          },
          { p: "This is how a single production day can supply a brand film, a set of Reels and a library of stills. See our [films and photography](/work) for examples." },
        ],
      },
      {
        heading: "What to put in your brief",
        blocks: [
          {
            ul: [
              "What the video is for and where it will be shown.",
              "Who it is for, and what you want them to think or do after watching.",
              "The deliverables: how many videos, their lengths and formats.",
              "Your deadline and any fixed dates such as a launch or event.",
              "A budget range, so the production company can recommend the right scope.",
              "References: videos you like, and what you like about them.",
            ],
          },
        ],
      },
      {
        heading: "Questions to ask a video production company",
        blocks: [
          {
            ul: [
              "What exactly is included in the quote, and what would cost extra?",
              "How many rounds of revisions are included?",
              "Who owns the footage, and will we receive the raw files?",
              "Is music licensed for paid ads as well as organic posts?",
              "Who handles permits, locations and casting?",
            ],
          },
        ],
      },
      {
        heading: "How TCE can help",
        blocks: [
          { p: "TCE plans, shoots and edits brand films, commercials and social video for brands across Dubai and the UAE. Send a brief and we’ll recommend the right scope for your budget. See [video production in Dubai](/dubai/video-production) or [request a quote](/contact?service=video-production)." },
        ],
      },
    ],
    faqs: [
      {
        q: "Do video production companies in Dubai charge per minute of video?",
        a: "Rarely. Most quote on the work involved: planning, shoot days, crew, locations, talent and editing. The length of the final video has less effect on the price than these.",
      },
      {
        q: "Do I need a permit to film in Dubai?",
        a: "Filming in public places in Dubai generally needs a permit. Private venues and studios need the owner’s permission. A production company can usually arrange both.",
      },
      {
        q: "How long does it take to make a brand video?",
        a: "It depends on the scope. A simple social video can be turned around quickly, while a multi-location brand film needs time for planning, shooting and editing. Agree delivery dates in the quote.",
      },
      {
        q: "Can one shoot cover video and photography?",
        a: "Yes. Planning both together lets you share crew, location and styling costs across a film, social cut-downs and stills.",
      },
    ],
    services: ["video-production", "content-strategy"],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

/** "2026-11-23" → "23 November 2026" */
export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** Rough reading time at 220 words a minute. */
export function readingMinutes(p: Post): number {
  const text = [p.shortAnswer, ...p.sections.flatMap((s) => [s.heading, ...s.blocks.flatMap(blockText)]), ...p.faqs.flatMap((f) => [f.q, f.a])].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function blockText(b: Block): string[] {
  if ("p" in b) return [b.p];
  if ("ul" in b) return b.ul;
  if ("ol" in b) return b.ol;
  return [...b.table.head, ...b.table.rows.flat()];
}

/** Strips [link](url) and **bold** markup, for plain-text uses (feeds, llms.txt). */
export const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");

/** Anchor id for a section heading. */
export const anchor = (s: string) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
