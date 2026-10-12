/**
 * The seven emirates TCE works in, one page each under /uae/[slug]. Each page
 * has its own introduction, local industries, shooting locations and questions,
 * so no two pages are copies of each other with the name swapped.
 *
 * Locations are well-known public places, listed as examples of where films can
 * be shot. They do not claim TCE has filmed there or holds an office there.
 */
export type Area = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  industries: string;
  locations: { name: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const areas: Area[] = [
  {
    slug: "dubai",
    name: "Dubai",
    metaTitle: "TCE in Dubai: Video, Social Media & Marketing Services",
    metaDescription:
      "TCE produces brand films and runs social media, Meta ads, UGC and SEO for businesses in Dubai, from Downtown and Business Bay to Dubai Marina and Jumeirah.",
    intro: [
      "Dubai moves fast, and so does its content. TCE works with Dubai brands in food and beverage, retail, automotive, hospitality and events, producing the video and running the marketing that keeps them visible in one of the most competitive markets in the region.",
      "Whether it’s a restaurant launch in Jumeirah, a product film in a studio or an always-on campaign for a retail brand, we handle the creative and the strategy together.",
    ],
    industries: "Restaurants and cafés, retail and fashion, automotive, real estate, hospitality, beauty and events.",
    locations: [
      { name: "Downtown Dubai & Business Bay", body: "Skyline, architecture and the city at night, for brand films and launches." },
      { name: "Dubai Marina & JBR", body: "Waterfront promenades and beach light for lifestyle and hospitality content." },
      { name: "Al Fahidi Historical Neighbourhood", body: "Wind towers and quiet lanes for heritage and cultural stories." },
      { name: "Al Qudra & the desert", body: "Open roads and dunes for automotive and outdoor shoots." },
    ],
    faqs: [
      { q: "Can you shoot at locations around Dubai?", a: "Yes. We shoot on location across Dubai, from the city and the waterfront to the desert, as well as in studio settings." },
      { q: "Do you manage social media for Dubai restaurants and cafés?", a: "Yes. Food and beverage is one of the areas we work in most: menu and venue films, reels, page management and launch campaigns." },
      { q: "Can you run Meta ads aimed at Dubai only?", a: "Yes. Campaigns can target Dubai as a whole or specific areas within it, depending on where your customers are." },
    ],
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    metaTitle: "Video Production & Marketing Agency in Abu Dhabi",
    metaDescription:
      "Brand films, corporate video, social media management, Meta ads and SEO for Abu Dhabi businesses, from the Corniche and Saadiyat to Yas Island, by TCE.",
    intro: [
      "From the capital’s hospitality and tourism names to retail, food and beverage and corporate organisations, TCE produces film and manages digital marketing for businesses in Abu Dhabi.",
      "We shoot on location across the capital and run campaigns aimed squarely at Abu Dhabi audiences, so the content looks local and reaches local customers.",
    ],
    industries: "Hospitality and tourism, corporate organisations, retail, food and beverage, automotive and culture.",
    locations: [
      { name: "Abu Dhabi Corniche", body: "Long waterfront views and clean light for lifestyle and brand content." },
      { name: "Saadiyat Island", body: "Beaches and the cultural district for premium, considered visuals." },
      { name: "Yas Island", body: "Entertainment, leisure and motorsport settings for energetic campaigns." },
      { name: "Liwa & Al Dhafra", body: "Vast dunes for automotive, adventure and cinematic landscape shots." },
    ],
    faqs: [
      { q: "Do you work with businesses in Abu Dhabi?", a: "Yes. TCE works across all seven emirates, and Abu Dhabi brands get the same production and marketing service as clients anywhere in the UAE." },
      { q: "Do you produce corporate videos in Abu Dhabi?", a: "Yes. Company profiles, interviews, event coverage and internal films are part of our video production service." },
      { q: "Can ads be targeted to Abu Dhabi and Al Ain separately?", a: "Yes. Meta campaigns can target specific cities and areas, so Abu Dhabi and Al Ain audiences can be reached with their own budgets and creative." },
    ],
  },
  {
    slug: "sharjah",
    name: "Sharjah",
    metaTitle: "Video Production & Digital Marketing in Sharjah",
    metaDescription:
      "TCE produces video and runs social media, advertising, UGC and SEO for Sharjah businesses in retail, manufacturing, education, food and culture.",
    intro: [
      "Sharjah’s mix of culture, education, manufacturing and family-run retail calls for content that is thoughtful rather than loud, which suits how TCE works.",
      "We help Sharjah businesses present themselves with the polish of a national brand: product and corporate films, consistent social pages and campaigns that reach customers across the emirate and its neighbours.",
    ],
    industries: "Manufacturing and FMCG, retail, education, food and beverage, culture and family businesses.",
    locations: [
      { name: "Heart of Sharjah", body: "Restored heritage buildings and souqs for cultural and lifestyle stories." },
      { name: "Al Majaz Waterfront", body: "Lagoon views and city light for evening and family content." },
      { name: "Al Noor Island", body: "Gardens and art installations for calm, design-led visuals." },
      { name: "Mleiha", body: "Desert and mountain landscapes for outdoor and adventure shoots." },
    ],
    faqs: [
      { q: "Do you make product and factory films for Sharjah manufacturers?", a: "Yes. Product films, process videos and corporate profiles are part of our video production service." },
      { q: "Can you manage social media for a Sharjah business?", a: "Yes. We create the content, run the pages and plan the strategy, whether your customers are in Sharjah or across the UAE." },
      { q: "Do you cover the whole of Sharjah, including the east coast?", a: "Yes. TCE works across all seven emirates, including Sharjah’s east coast towns." },
    ],
  },
  {
    slug: "ajman",
    name: "Ajman",
    metaTitle: "Video Production & Digital Marketing in Ajman",
    metaDescription:
      "TCE helps Ajman businesses grow with brand video, social media management, Meta ads, local SEO and Google Business Profile support.",
    intro: [
      "Ajman’s small and medium businesses, free zone companies, hotels and retailers need marketing that works hard for every dirham. TCE brings premium production and focused digital marketing to businesses of every size in the emirate.",
      "We often start with the essentials: a strong set of photos and videos, a well-kept Instagram, and a Google Business Profile that shows up when people nearby search.",
    ],
    industries: "Small and medium businesses, free zone companies, hospitality, real estate and retail.",
    locations: [
      { name: "Ajman Corniche & beach", body: "Sea views and an easy-going pace for hospitality and lifestyle content." },
      { name: "Al Zorah", body: "Mangroves and nature reserve settings for calm, natural visuals." },
      { name: "Ajman Museum", body: "An 18th-century fort for heritage and cultural stories." },
    ],
    faqs: [
      { q: "Is TCE suitable for small businesses in Ajman?", a: "Yes. We shape the scope to the business, from a single shoot or a monthly social plan to full campaigns." },
      { q: "Can you help a new Ajman business get found on Google?", a: "Yes. Our SEO service includes local SEO and Google Business Profile optimisation so nearby customers can find you." },
      { q: "Do you shoot content in Ajman?", a: "Yes. We shoot on location across Ajman and the rest of the UAE." },
    ],
  },
  {
    slug: "umm-al-quwain",
    name: "Umm Al Quwain",
    metaTitle: "Video Production & Digital Marketing in Umm Al Quwain",
    metaDescription:
      "Video production, social media management, Meta ads and local SEO for Umm Al Quwain hotels, leisure, food and retail businesses, by TCE.",
    intro: [
      "Umm Al Quwain is quieter than its neighbours, with lagoons, mangroves and a growing hospitality and leisure scene. For businesses here, standing out online matters even more, because many customers discover them from Dubai, Sharjah and Ajman.",
      "TCE produces the visuals and runs the marketing that puts Umm Al Quwain businesses in front of those visitors as well as local residents.",
    ],
    industries: "Hospitality and leisure, marine and water sports, food and beverage, retail and small businesses.",
    locations: [
      { name: "Khor Al Beida & the mangroves", body: "Lagoons and wildlife for nature, kayaking and eco-tourism content." },
      { name: "Al Sinniyah Island", body: "Quiet beaches and island views for slow, cinematic visuals." },
      { name: "Old Town & the fort", body: "Historic buildings for heritage and community stories." },
    ],
    faqs: [
      { q: "Do you work with businesses in Umm Al Quwain?", a: "Yes. TCE works across all seven emirates, including Umm Al Quwain." },
      { q: "Can ads reach people in nearby emirates who might visit?", a: "Yes. Meta campaigns can target Umm Al Quwain and neighbouring emirates together, which suits hospitality and leisure businesses that draw visitors." },
      { q: "Can you produce content for a hotel or beach club?", a: "Yes. Venue films, reels and photography for hospitality are part of our video production and social media services." },
    ],
  },
  {
    slug: "ras-al-khaimah",
    name: "Ras Al Khaimah",
    metaTitle: "Video Production & Digital Marketing in Ras Al Khaimah",
    metaDescription:
      "TCE produces film and runs social media, Meta ads, UGC and SEO for Ras Al Khaimah hospitality, tourism, real estate and local businesses.",
    intro: [
      "Ras Al Khaimah has mountains, beaches and desert within an hour of each other, and a tourism and real estate sector that relies on showing them well. TCE produces the films and photography that do that, and runs the marketing that brings in bookings and enquiries.",
      "For local businesses, we build consistent social pages and targeted campaigns that reach residents of RAK and visitors from across the UAE.",
    ],
    industries: "Tourism and hospitality, real estate, adventure and leisure, manufacturing, food and beverage.",
    locations: [
      { name: "Jebel Jais", body: "Mountain roads and viewpoints for automotive, adventure and landscape films." },
      { name: "Al Marjan Island", body: "Resorts and coastline for hospitality and lifestyle content." },
      { name: "Dhayah Fort", body: "A hilltop fort above palm groves for heritage stories." },
    ],
    faqs: [
      { q: "Do you produce tourism and hospitality content in Ras Al Khaimah?", a: "Yes. Resort and venue films, reels and photography are part of our video production service, and we can run the campaigns that promote them." },
      { q: "Can you film automotive content in the mountains?", a: "Yes. Automotive films are part of our work, and RAK’s mountain roads are a strong setting for them." },
      { q: "Do you cover all of Ras Al Khaimah?", a: "Yes. TCE works across all seven emirates." },
    ],
  },
  {
    slug: "fujairah",
    name: "Fujairah",
    metaTitle: "Video Production & Digital Marketing in Fujairah",
    metaDescription:
      "Brand films, social media management, Meta ads and SEO for Fujairah hotels, dive and leisure businesses, logistics companies and local brands, by TCE.",
    intro: [
      "Fujairah sits on the UAE’s east coast, between the Hajar Mountains and the Gulf of Oman. Its hotels, dive and leisure businesses, shipping and logistics companies and local brands all compete for attention with businesses on the west coast.",
      "TCE brings the same production quality and digital marketing to Fujairah, so east coast businesses can look and perform like anyone else in the country.",
    ],
    industries: "Tourism and hospitality, diving and leisure, shipping and logistics, food and beverage, retail.",
    locations: [
      { name: "Hajar Mountains", body: "Rugged peaks and wadis for adventure, automotive and landscape films." },
      { name: "East coast beaches", body: "Al Aqah and Dibba coastlines for resort, dive and lifestyle content." },
      { name: "Fujairah Fort", body: "One of the country’s oldest forts, for heritage and cultural stories." },
    ],
    faqs: [
      { q: "Do you work with businesses in Fujairah?", a: "Yes. TCE works across all seven emirates, including the east coast." },
      { q: "Can you help a Fujairah hotel get more direct bookings?", a: "We can produce the content, run social media and Meta ads, and improve search visibility, all aimed at bringing guests to book with you directly." },
      { q: "Do you make corporate films for logistics and shipping companies?", a: "Yes. Corporate profiles, operations films and interviews are part of our video production service." },
    ],
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
