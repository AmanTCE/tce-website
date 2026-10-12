import { site } from "./site";

/**
 * General questions about TCE, shown on /faq (and a few on the home page).
 * Written as plain, self-contained answers so search engines and AI assistants
 * can quote them accurately.
 */
const clientNames = site.clients.map((c) => c.name);
const listed = `${clientNames.slice(0, -1).join(", ")} and ${clientNames[clientNames.length - 1]}`;

export const faqs: { q: string; a: string; home?: boolean }[] = [
  {
    q: "What is The Creative Economy (TCE)?",
    a: "The Creative Economy (TCE) is a UAE creative media and growth marketing agency. We produce brand films, commercials and photography, and run social media management, performance marketing and Meta ads, influencer and UGC campaigns, content strategy and SEO for brands across the UAE.",
    home: true,
  },
  {
    q: "Which parts of the UAE do you work in?",
    a: "All seven emirates: Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah and Fujairah. We shoot on location wherever a project needs us and run campaigns for audiences anywhere in the country.",
    home: true,
  },
  {
    q: "What services does TCE offer?",
    a: "Video production and creative filmmaking, photography, social media management and marketing, performance marketing and Meta ads management, creative and content strategy, influencer marketing and UGC content, SEO, and marketing strategy and consulting. Brand strategy, CRM and marketing systems, and podcast production are also available.",
    home: true,
  },
  {
    q: "Which brands has TCE worked with?",
    a: `Brands TCE has worked with include ${listed}, among many more.`,
  },
  {
    q: "Which industries do you work with?",
    a: "Food and beverage, automotive, retail and fashion, hospitality, events, corporate and consumer brands. We also work with artists and individuals.",
  },
  {
    q: "How much do your services cost?",
    a: "Every project is quoted on its scope: the number of shoot days, deliverables, platforms and how long we work together. Send a short brief with your goals and budget range and we’ll recommend the right scope.",
    home: true,
  },
  {
    q: "Do you only make content, or do you handle the marketing too?",
    a: "Both. TCE produces the content in-house and plans and runs the marketing around it, so the creative and the strategy are built together.",
  },
  {
    q: "Can you manage our social media every month?",
    a: "Yes. Monthly social media management covers content creation, page management, a content calendar and regular reviews of what is working.",
  },
  {
    q: "Do you run Meta ads for Facebook and Instagram?",
    a: "Yes. We plan, create and manage Meta ad campaigns, including the ad creative, audience targeting and ongoing optimisation.",
  },
  {
    q: "Do you produce UGC content?",
    a: "Yes. We produce UGC-style video and photo content and connect brands with influencers and content creators who fit their audience.",
  },
  {
    q: "How do we start a project with TCE?",
    a: "Send an enquiry through the contact form or message us on WhatsApp with what you are working on. We’ll come back to you to talk through goals, timing and budget.",
  },
];
