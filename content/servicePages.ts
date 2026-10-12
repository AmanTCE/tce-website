import { media, type MediaItem } from "./media";

/**
 * One landing page per service, under /services/[slug]. Each page targets the
 * searches people actually use for that service (video production company,
 * Meta ads agency, UGC content and so on) and, where a page covers one of the
 * five core services, quotes the company profile wording unchanged.
 *
 * Keep every claim here true: no invented results, prices, clients or awards.
 */
export type ServicePage = {
  slug: string;
  /** Short name for menus and links. */
  name: string;
  /** One sentence for service cards. */
  summary: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  /** schema.org serviceType. */
  serviceType: string;
  /** Other names people search for this service by. Shown on the page and given to search engines. */
  alsoKnownAs: string[];
  intro: string[];
  /** Slug of the core service in content/services.ts whose profile wording this page quotes. */
  core?: string;
  /** Slugs of growth capabilities this page covers. */
  capabilities?: string[];
  includes: { title: string; body: string }[];
  forWho: string;
  faqs: { q: string; a: string }[];
  image: MediaItem;
  /** Show TCE's films on this page. */
  showFilms?: boolean;
  /** Service preselected in the enquiry form (a core service or capability slug). */
  enquire: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "video-production",
    name: "Video Production",
    summary: "Brand films, commercials, product videos, corporate shoots, events and reels.",
    h1: "Video production & creative filmmaking in the UAE",
    metaTitle: "Video Production & Creative Filmmaking in the UAE",
    metaDescription:
      "Brand films, commercials, product videos, corporate shoots, event coverage and reels, produced by TCE for brands in Dubai, Abu Dhabi and across the UAE.",
    serviceType: "Video production",
    alsoKnownAs: ["Video production company", "Creative filmmaking", "Creative video production", "Commercial production", "Brand films", "Event videography", "Photography"],
    intro: [
      "The Creative Economy (TCE) is a creative video production company working with brands across the UAE. We plan, shoot and edit cinematic brand films, commercials, product videos and social content, with the same attention to detail from the first concept to the final frame.",
      "Every production is built around what the film needs to do for the business: launch a product, fill a venue, build a brand people remember or give a campaign something worth watching.",
    ],
    core: "visual-production",
    includes: [
      { title: "Brand films", body: "Story-led films that show who a brand is and why it matters, for websites, launches and campaigns." },
      { title: "Commercials & ad films", body: "Advertising video for social, digital and screen, cut in versions sized for each placement." },
      { title: "Product & food films", body: "Close, detailed product and menu videos for e-commerce, delivery apps, restaurants and retail." },
      { title: "Automotive & luxury shoots", body: "Controlled, cinematic coverage of cars, interiors and premium products." },
      { title: "Corporate video", body: "Company profiles, interviews, behind-the-scenes films and internal communications." },
      { title: "Event coverage", body: "Full coverage of launches, activations and events, with recap edits for social." },
      { title: "Short-form & reels", body: "Vertical 9:16 edits made for Instagram Reels, TikTok and YouTube Shorts." },
      { title: "Photography", body: "Stills captured alongside the film, so one shoot covers campaign, social and website imagery." },
    ],
    forWho:
      "Food and beverage, automotive, retail and fashion, hospitality, events and corporate brands. Recent films include work for Hotpack, Lexus, Oceano by Deep Seafood Company, 222 Stores and It’s Good for Something.",
    faqs: [
      {
        q: "How much does video production cost in the UAE?",
        a: "It depends on the shoot days, crew, locations, talent and the number of edits you need. TCE quotes each project after a short brief, so the budget matches what the film has to do. Share your goals and budget range through the contact form and we’ll suggest the right scope.",
      },
      { q: "Do you shoot outside Dubai?", a: "Yes. TCE produces films across all seven emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah." },
      { q: "Can you handle the whole production?", a: "Yes. We can take a film from concept and planning through the shoot to the final edit and delivery, or join at the stage you need us." },
      { q: "Do you make vertical videos for Reels and TikTok?", a: "Yes. Many of our films are delivered in vertical 9:16 for Instagram Reels and TikTok, alongside landscape versions for YouTube, websites and screens." },
      { q: "Do you also provide photography?", a: "Yes. Photography sits alongside our film work, and stills can be captured on the same shoot." },
    ],
    image: media.cameraHands,
    showFilms: true,
    enquire: "visual-production",
  },
  {
    slug: "social-media-management",
    name: "Social Media Management",
    summary: "Content creation, page management and organic growth for your social channels.",
    h1: "Social media management & marketing in the UAE",
    metaTitle: "Social Media Management & Marketing Agency in the UAE",
    metaDescription:
      "TCE plans, creates and manages social media for UAE brands: content production, page management, organic growth and a consistent visual identity.",
    serviceType: "Social media management",
    alsoKnownAs: ["Social media marketing", "Social media agency", "Organic marketing", "Instagram management", "Content creation"],
    intro: [
      "TCE is a social media marketing and management agency for brands that want their pages to look as good as their product, and to grow with intent. We create the content, run the pages and plan the strategy behind them.",
      "Our approach is organic first: content people want to watch and share, a recognisable visual identity, and a steady posting rhythm that builds an audience over time. When paid promotion makes sense, it plugs into the same plan.",
    ],
    core: "social-media-management",
    includes: [
      { title: "Content creation", body: "Photos, videos and reels produced by our own team, so every post is made for your brand." },
      { title: "Page management", body: "Posting, captions, highlights and profile upkeep handled for you." },
      { title: "Visual identity", body: "Templates, grid planning and a look that makes your content recognisable in the feed." },
      { title: "Content calendar", body: "A monthly plan of what to post and when, agreed with you in advance." },
      { title: "Organic growth", body: "Formats, hooks and timing chosen to grow reach and engagement without paid spend." },
      { title: "Monthly review", body: "A regular look at what worked, what didn’t and what to change next." },
    ],
    forWho:
      "Restaurants and cafés, retail and fashion labels, automotive, hospitality and service businesses that want a consistent, premium presence without building an in-house content team.",
    faqs: [
      {
        q: "What is the difference between social media management and social media marketing?",
        a: "Management is the day-to-day work of creating, posting and maintaining your pages. Marketing is the strategy behind it: who you want to reach, which content will move them and how growth is measured. TCE does both as one service.",
      },
      { q: "Do you create the content as well?", a: "Yes. TCE is a production company first, so photos, videos and reels are shot and edited by our team." },
      { q: "How does organic marketing work alongside ads?", a: "Organic content builds trust and a following over time; ads put the best of it in front of new people faster. We plan both together so they support each other." },
      { q: "Which emirates do you cover?", a: "All seven. We manage social media and shoot content for brands in Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah." },
      { q: "How do we get started?", a: "Send a short brief through the contact form or WhatsApp. We’ll look at your current pages and come back with a proposed plan." },
    ],
    image: media.socialMockup,
    enquire: "social-media-management",
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing & Meta Ads",
    summary: "Facebook and Instagram ads planned, created, targeted and optimised for results.",
    h1: "Performance marketing & Meta ads management in the UAE",
    metaTitle: "Performance Marketing & Meta Ads Agency in the UAE",
    metaDescription:
      "Meta ads on Facebook and Instagram, campaign strategy, ad creative, targeting and ongoing optimisation for UAE brands, from TCE’s performance marketers.",
    serviceType: "Performance marketing",
    alsoKnownAs: ["Meta ads management", "Facebook ads", "Instagram ads", "Paid social", "Advertising agency", "Performance marketers", "Advertisement management"],
    intro: [
      "TCE plans, creates and manages advertising campaigns across digital platforms, including Meta ads on Facebook and Instagram. Because we produce the creative ourselves, the ads and the strategy behind them are built together rather than handed between agencies.",
      "As performance marketers, we judge a campaign by what it brings the business, whether that’s enquiries, bookings, sales or footfall, and we keep refining targeting and creative as the results come in.",
    ],
    core: "advertisement-management",
    includes: [
      { title: "Campaign strategy", body: "Objectives, budgets, audiences and the path from first view to enquiry." },
      { title: "Meta ads management", body: "Facebook and Instagram campaigns set up, launched and managed in Meta Ads Manager." },
      { title: "Ad creative", body: "Video, photo and copy made for each placement, with variations to test." },
      { title: "Audience targeting", body: "Audiences built around your customers, by interest, behaviour, location and past engagement." },
      { title: "Tracking & measurement", body: "Conversion and enquiry tracking set up so every campaign can be measured." },
      { title: "Optimisation & reporting", body: "Ongoing changes to budgets, audiences and creative, with clear reports on what the spend achieved." },
    ],
    forWho:
      "Businesses that want advertising to bring in leads, bookings or sales, from product launches and seasonal campaigns to always-on lead generation.",
    faqs: [
      {
        q: "What does a performance marketing agency do?",
        a: "It plans and runs paid advertising against measurable goals, such as leads, sales or bookings, and keeps optimising toward them. TCE combines this with in-house creative production.",
      },
      { q: "Do you manage Meta ads for Facebook and Instagram?", a: "Yes. We plan, build and manage Meta ad campaigns, including the creative, the audiences and ongoing optimisation." },
      { q: "How much should we spend on ads?", a: "It depends on your goals, market and timeline. We recommend a starting budget during planning and adjust it once early results come in." },
      { q: "Do you make the ad creative too?", a: "Yes. Our team shoots and edits ad creative, so every campaign has content made for its placement." },
      { q: "Can ads target one emirate?", a: "Yes. Campaigns can target the whole UAE or specific emirates and areas, depending on where your customers are." },
    ],
    image: media.newspaperStreet,
    enquire: "advertisement-management",
  },
  {
    slug: "content-strategy",
    name: "Creative & Content Strategy",
    summary: "Content pillars, roadmaps and campaign ideas built around your audience.",
    h1: "Creative strategy & content strategy for UAE brands",
    metaTitle: "Creative & Content Strategy Agency in the UAE",
    metaDescription:
      "TCE’s creative strategists plan what your brand says, where and when: content roadmaps, content pillars and campaign ideas built around your audience.",
    serviceType: "Content strategy",
    alsoKnownAs: ["Creative strategist", "Content strategist", "Content planning", "Campaign concepts", "Creative direction"],
    intro: [
      "Good content starts with a plan. TCE’s creative strategists work out what your brand should say, to whom, in which formats and how often, then turn it into a content roadmap that your team, or ours, can follow.",
      "Strategy and production sit under one roof, so the ideas we plan are ideas we know how to make.",
    ],
    core: "content-strategy",
    includes: [
      { title: "Brand & audience discovery", body: "Understanding your brand, your customers and what they respond to." },
      { title: "Content pillars", body: "The themes your content returns to, so every post supports the brand." },
      { title: "Content roadmap & calendar", body: "What to post, when to post and how to communicate, platform by platform." },
      { title: "Campaign concepts", body: "Creative ideas for launches, seasons and key moments in your calendar." },
      { title: "Formats & tone of voice", body: "The right mix of reels, carousels, stories and long-form, and how your brand should sound." },
      { title: "Review & refine", body: "Looking at what performs and improving the plan over time." },
    ],
    forWho:
      "Brands with a lot to say and no clear plan, teams that create content in-house and need direction, and businesses launching something new.",
    faqs: [
      { q: "What does a creative strategist do?", a: "A creative strategist connects business goals to creative ideas: who the brand is talking to, what will make them care, and which content and campaigns will get there." },
      { q: "What do we get from a content strategy?", a: "A clear roadmap: your content pillars, formats, posting rhythm and calendar, plus campaign ideas. It can be handed to your team or produced by TCE." },
      { q: "Is content strategy the same as marketing strategy?", a: "Content strategy is one part of it. Our marketing strategy and consulting service looks at the wider picture, including positioning, channels and growth goals." },
      { q: "Can you produce the content as well?", a: "Yes. TCE produces photo, video and social content in-house." },
    ],
    image: media.strategyWall,
    enquire: "content-strategy",
  },
  {
    slug: "influencer-ugc-content",
    name: "Influencer & UGC Content",
    summary: "The right creators for your brand, and authentic UGC content for ads and social.",
    h1: "Influencer marketing & UGC content in the UAE",
    metaTitle: "UGC Content & Influencer Marketing Agency in the UAE",
    metaDescription:
      "TCE connects UAE brands with the right influencers and creators and produces UGC content, from creator selection and planning to production and results.",
    serviceType: "Influencer marketing",
    alsoKnownAs: ["UGC content", "User-generated content", "Influencer marketing", "Creator marketing", "Content creators", "Influencer media planning"],
    intro: [
      "People trust people. TCE helps brands work with the right influencers and content creators to reach their audience in a genuine way, and produces user-generated-style (UGC) content that feels native to the feed.",
      "We handle the planning, creator selection, briefing and content, then track what the campaign achieved.",
    ],
    core: "influencer-creator-media-planning",
    includes: [
      { title: "Influencer & creator selection", body: "Finding creators whose audience and style fit your brand, beyond follower counts." },
      { title: "Campaign planning", body: "Goals, deliverables, timelines and how the campaign will be measured." },
      { title: "UGC content production", body: "Authentic, phone-first videos and photos made for ads, product pages and social." },
      { title: "Briefing & coordination", body: "Clear briefs and one point of contact between your brand and the creators." },
      { title: "Content reuse", body: "Putting the best creator content to work across your pages and ads." },
      { title: "Results tracking", body: "Reach, engagement and response reported at the end of each campaign." },
    ],
    forWho:
      "Consumer brands, restaurants and cafés, beauty, fashion and retail, and any business launching a product that people should hear about from someone they already follow.",
    faqs: [
      {
        q: "What is UGC content?",
        a: "User-generated content (UGC) is photo and video made in the style of real customers rather than a polished advert. Brands use it in ads, on product pages and on social because it feels authentic.",
      },
      { q: "How do you choose influencers?", a: "We look at audience fit, content quality, engagement and the creator’s style, not just follower numbers, then shortlist creators for your approval." },
      { q: "Do you work with micro-influencers?", a: "Yes. Depending on the goal, smaller creators with engaged audiences can work better than large accounts." },
      { q: "Can UGC be used in Meta ads?", a: "Yes. UGC is often used as ad creative, and we can run it through your Meta campaigns as part of our performance marketing service." },
    ],
    image: media.creatorPhone,
    enquire: "influencer-creator-media-planning",
  },
  {
    slug: "seo",
    name: "SEO Services",
    summary: "Technical, on-page and local SEO, plus visibility in AI search assistants.",
    h1: "SEO services for businesses in the UAE",
    metaTitle: "SEO Services in Dubai & the UAE",
    metaDescription:
      "SEO from TCE: technical fixes, on-page optimisation, local SEO, Google Business Profile and content that helps UAE customers and AI assistants find you.",
    serviceType: "Search engine optimisation",
    alsoKnownAs: ["SEO agency", "Search engine optimisation", "Local SEO", "Google Business Profile", "AI search optimisation (GEO)"],
    intro: [
      "Search is where many customers start. TCE’s SEO service structures your website and content so the people already looking for what you offer, on Google and in AI assistants, can find you.",
      "Because we also make content, SEO here isn’t only technical fixes: it’s pages, articles and media worth ranking.",
    ],
    capabilities: ["seo"],
    includes: [
      { title: "Technical SEO", body: "Site speed, mobile experience, indexing, sitemaps and structured data." },
      { title: "On-page optimisation", body: "Titles, descriptions, headings, internal links and copy written around how customers search." },
      { title: "Local SEO", body: "Google Business Profile, location pages and consistent business details for the emirates you serve." },
      { title: "Keyword research", body: "Finding the searches that bring enquiries, not just traffic." },
      { title: "Content for search", body: "Service pages, articles and video that answer customers’ questions." },
      { title: "AI search visibility", body: "Clear, well-structured information that assistants such as ChatGPT, Gemini and Perplexity can understand and cite." },
    ],
    forWho: "Service businesses, restaurants, retailers and B2B companies that want more enquiries from people already searching for what they offer.",
    faqs: [
      { q: "How long does SEO take to work?", a: "SEO builds over months rather than days. Technical and on-page fixes can help early, while rankings for competitive searches take longer and depend on your market." },
      { q: "Do you do local SEO for specific emirates?", a: "Yes. We optimise your Google Business Profile and website for the emirates and areas you serve." },
      {
        q: "What is GEO, or AI search optimisation?",
        a: "Generative engine optimisation (GEO) means making your business easy for AI assistants such as ChatGPT, Gemini and Perplexity to understand and recommend. It relies on clear, accurate, well-structured information about who you are and what you do.",
      },
      { q: "Can you guarantee first place on Google?", a: "No one honestly can. What we can do is fix what holds your site back, build content that deserves to rank and report clearly on progress." },
    ],
    image: media.editorialPrints,
    enquire: "seo",
  },
  {
    slug: "marketing-strategy",
    name: "Marketing Strategy & Consulting",
    summary: "Positioning, digital marketing plans and growth strategy from practitioners.",
    h1: "Marketing strategy & consulting in the UAE",
    metaTitle: "Marketing Strategy & Consulting Agency in the UAE",
    metaDescription:
      "Marketing strategists and consultants for UAE businesses: brand positioning, digital marketing plans, growth marketing and the systems behind them.",
    serviceType: "Marketing consulting",
    alsoKnownAs: ["Marketing strategist", "Marketing consultant", "Digital marketing agency", "Growth marketing", "Brand strategy"],
    intro: [
      "Before spending on content or ads, it helps to know where they’ll make the most difference. TCE works as a marketing strategist and consultant for businesses that want a clear plan: who to reach, what to say, which channels to use and how to measure growth.",
      "Our advice comes from making and running the work ourselves, so the plan stays practical.",
    ],
    capabilities: ["growth-marketing", "brand-strategy", "crm-development"],
    includes: [
      { title: "Marketing review", body: "A clear look at your brand, channels, content and results today." },
      { title: "Digital marketing plan", body: "The channels, campaigns and budgets that fit your goals, across social, paid, search and content." },
      { title: "Ongoing consulting", body: "Regular sessions to review results and adjust the plan with your team." },
    ],
    forWho: "Founders, growing businesses and in-house marketing teams that want clear strategic direction, with the option of TCE delivering the work.",
    faqs: [
      {
        q: "What does a marketing consultant do?",
        a: "A marketing consultant reviews how a business markets itself today and recommends what to change: positioning, channels, budgets and priorities. TCE can also deliver the plan.",
      },
      { q: "Is TCE a digital marketing agency?", a: "Yes. TCE combines digital marketing, including social media, Meta ads, content strategy and SEO, with in-house video and photo production." },
      { q: "Can you work with our in-house team?", a: "Yes. We can set the strategy and support your team, or take on production and campaign management ourselves." },
      { q: "Do you work with smaller businesses?", a: "Yes. We work with brands and individuals at different stages and shape the scope to fit." },
    ],
    image: media.studioSet,
    enquire: "growth-marketing",
  },
];

export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug);

/** The landing page for each of the five core services, by core service slug. */
export const servicePageForCore = (coreSlug: string) => servicePages.find((p) => p.core === coreSlug);
