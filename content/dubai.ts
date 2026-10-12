import { media, type MediaItem } from "./media";

/**
 * Dubai landing pages, one per high-intent search ("video production Dubai",
 * "social media management Dubai", "digital marketing agency Dubai"), under
 * /dubai/[slug]. TCE is based in Dubai, so these pages carry the local detail
 * the UAE-wide service pages can't. Copy stays factual: no invented clients,
 * results, offices or permits.
 */
export type DubaiPage = {
  slug: string;
  /** Short name used in links, e.g. "Video production in Dubai". */
  name: string;
  h1: string;
  metaTitle: string;
  /** 160 characters or fewer. */
  metaDescription: string;
  serviceType: string;
  intro: string[];
  /** The UAE-wide service page whose "what's included" list this page shows. */
  includesFrom?: string;
  /** Or a set of service pages, shown as cards (for broad pages such as digital marketing). */
  services?: string[];
  why: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  image: MediaItem;
  showFilms?: boolean;
  /** Preselected service on the contact form. */
  enquire: string;
};

export const dubaiPages: DubaiPage[] = [
  {
    slug: "video-production",
    name: "Video production in Dubai",
    h1: "Video production company in Dubai",
    metaTitle: "Video Production Company in Dubai: Brand Films & Reels",
    metaDescription:
      "TCE is a Dubai video production company: brand films, commercials, product and food videos, corporate films, events and reels, from concept to final edit.",
    serviceType: "Video production",
    intro: [
      "The Creative Economy (TCE) is a video production company based in Dubai. We plan, shoot and edit brand films, commercials, product and food videos, corporate films, event coverage and reels for businesses across the city, from Downtown and Business Bay to Jumeirah, Dubai Marina and Al Quoz.",
      "Dubai audiences see a lot of polished content, so every film starts with what it has to do for the business. Then it gets the craft to match: a clear idea, considered lighting and an edit cut for where it will be watched.",
    ],
    includesFrom: "video-production",
    why: [
      { title: "Based in Dubai", body: "Our team works in Dubai and meets clients at Dubai Founders HQ in 25hours Hotel One Central, so briefs, recces and shoots happen in person." },
      { title: "Made for every screen", body: "Films are delivered in vertical 9:16 for Instagram Reels and TikTok, and in landscape for YouTube, websites and screens." },
      { title: "Studio, city or desert", body: "We plan each shoot around the look the brand needs, in a studio or on location across Dubai and the other emirates." },
      { title: "Production and marketing together", body: "TCE also runs social media and ads, so films are planned with the campaign in mind rather than handed over and forgotten." },
    ],
    faqs: [
      {
        q: "How much does video production cost in Dubai?",
        a: "It depends on the shoot days, crew, locations, talent and how many edits you need. TCE quotes each project after a short brief, so the budget matches what the film has to do. Share your goals and budget range through the contact form and we’ll suggest the right scope.",
      },
      {
        q: "How long does a video shoot take in Dubai?",
        a: "It depends on the project. Product and social shoots can often be done in a single day, while brand films and commercials need planning before the shoot and time for editing after. We share a timeline with every quote.",
      },
      { q: "Can you film on location around Dubai?", a: "Yes. We shoot in studios and on location across Dubai, from the city and the waterfront to the desert, as well as in the other six emirates." },
      { q: "Do you make corporate and event videos in Dubai?", a: "Yes. Company profiles, interviews, launches, activations and corporate events are all part of our video production service, with quick recap edits for social media." },
      { q: "Where can I see your work?", a: "Our films and photography are on the Work page of this site, and our latest projects are on Instagram at @tce.space." },
    ],
    image: media.cameraHands,
    showFilms: true,
    enquire: "visual-production",
  },
  {
    slug: "social-media-management",
    name: "Social media management in Dubai",
    h1: "Social media management agency in Dubai",
    metaTitle: "Social Media Management Agency in Dubai",
    metaDescription:
      "TCE runs social media for Dubai brands: content shot by our own team, reels, page management, a monthly content calendar and organic growth.",
    serviceType: "Social media management",
    intro: [
      "TCE is a social media management and marketing agency based in Dubai. We plan the content, shoot it ourselves, post it and look after your pages, so your brand shows up consistently without you building an in-house team.",
      "TCE started as a production company, so the photos, videos and reels on your pages are made by the same team that plans them, and they look like your brand rather than a template.",
    ],
    includesFrom: "social-media-management",
    why: [
      { title: "Content shot in Dubai", body: "Your venue, products and people, filmed and photographed in Dubai by our own team rather than stock or generic templates." },
      { title: "Organic first", body: "Content people want to watch and share, a recognisable look and a steady rhythm that builds an audience over time." },
      { title: "Ads when they help", body: "When paid promotion makes sense, our Meta ads team puts your best content in front of the right people in Dubai." },
      { title: "One team to talk to", body: "Strategy, production and posting sit with one team, and we meet clients in person in Dubai." },
    ],
    faqs: [
      {
        q: "How much does social media management cost in Dubai?",
        a: "It depends on the number of platforms, how much content you need each month and whether shoots are included. We quote after looking at your current pages and goals. Monthly support and one-off projects are both available.",
      },
      { q: "Which platforms do you manage?", a: "We focus on the platforms your customers use, most often Instagram, TikTok and Facebook, and recommend where to put your effort during planning." },
      { q: "Do you create the content as well?", a: "Yes. Photos, videos and reels are shot and edited by our team in Dubai, so every post is made for your brand." },
      { q: "Do you manage social media for Dubai restaurants and cafés?", a: "Yes. Food and beverage is one of the areas we work in most: menu and venue films, reels, page management and launch campaigns." },
      { q: "How do we get started?", a: "Send a short brief through the contact form, WhatsApp or Instagram. We’ll look at your pages and come back with a proposed plan." },
    ],
    image: media.socialMockup,
    enquire: "social-media-management",
  },
  {
    slug: "digital-marketing",
    name: "Digital marketing in Dubai",
    h1: "Digital marketing agency in Dubai",
    metaTitle: "Digital Marketing Agency in Dubai: Meta Ads & SEO",
    metaDescription:
      "TCE is a Dubai digital marketing agency: Meta ads, social media, SEO, content strategy and marketing consulting, with video and photo made in-house.",
    serviceType: "Digital marketing",
    intro: [
      "TCE is a digital marketing agency based in Dubai. We plan and run the marketing that brings businesses enquiries, bookings and sales: Meta ads on Facebook and Instagram, social media, SEO, content strategy and marketing consulting.",
      "What makes TCE different is that the creative is made in-house. The same team that plans your campaign shoots the videos and photos it runs on, so strategy, content and results stay connected.",
    ],
    services: ["performance-marketing", "social-media-management", "seo", "content-strategy", "influencer-ugc-content", "marketing-strategy"],
    why: [
      { title: "Judged on results", body: "Campaigns are measured by what they bring the business, whether that’s enquiries, bookings, sales or footfall, and refined as results come in." },
      { title: "Creative made in-house", body: "Ad creative, reels and photography are produced by our own team, so campaigns aren’t held up waiting on another agency." },
      { title: "Targeted to Dubai", body: "Ads can target all of Dubai or the specific areas where your customers live and work, with budgets set per audience." },
      { title: "Based in Dubai", body: "We work in Dubai and meet clients at Dubai Founders HQ in 25hours Hotel One Central." },
    ],
    faqs: [
      {
        q: "What does a digital marketing agency in Dubai do?",
        a: "It plans and runs a business’s online marketing: paid ads, social media, search and content. TCE does all of these and produces the creative in-house, so one team covers the plan, the content and the results.",
      },
      { q: "Do you run Meta ads for Dubai businesses?", a: "Yes. We plan, build and manage Facebook and Instagram campaigns in Meta Ads Manager, including the creative, the audiences and ongoing optimisation." },
      { q: "Can you help us rank on Google in Dubai?", a: "Yes. Our SEO service covers technical fixes, on-page optimisation, local SEO and Google Business Profile, so people searching in Dubai can find you. No one can honestly guarantee first place, but we fix what holds a site back and report clearly on progress." },
      { q: "How much should we budget for digital marketing in Dubai?", a: "It depends on your goals, competition and timeline. We recommend a starting budget during planning, then adjust it once early results come in." },
      { q: "Do you offer marketing consulting without running the campaigns?", a: "Yes. We can set the strategy and support your in-house team, or take on the campaigns and content ourselves." },
    ],
    image: media.newspaperStreet,
    enquire: "growth-marketing",
  },
];

export const getDubaiPage = (slug: string) => dubaiPages.find((p) => p.slug === slug);
/** The Dubai page for a UAE-wide service page, if there is one. */
export const dubaiPageFor = (serviceSlug: string) =>
  dubaiPages.find((p) => p.includesFrom === serviceSlug) ?? (["performance-marketing", "marketing-strategy"].includes(serviceSlug) ? getDubaiPage("digital-marketing") : undefined);
