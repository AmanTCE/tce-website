/**
 * Media library. Every photo here was extracted, unaltered, from the official
 * TCE company profile (TCE PORTFOLIO.pdf). The page number is kept so the
 * source of each asset stays traceable.
 *
 * To add media: drop the file in /public/media (a full-size version plus an
 * optional "-sm" version around 800px), then register it below.
 * Videos are supported: set kind: "video", src to the .mp4 and poster to a still.
 */
export type MediaItem = {
  src: string;
  /** Smaller variant for srcset, optional. */
  srcSm?: string;
  alt: string;
  width: number;
  height: number;
  kind?: "image" | "video";
  poster?: string;
  /** Where the asset came from. */
  source: string;
};

const img = (name: string, alt: string, width: number, height: number, page: number): MediaItem => ({
  src: `/media/${name}.webp`,
  srcSm: `/media/${name}-sm.webp`,
  alt,
  width,
  height,
  kind: "image",
  source: `TCE company profile, page ${page}`,
});

export const media = {
  studioSet: img("studio-set", "Black and white production studio with lighting rig, cameras on tripods and lounge chairs", 1200, 1600, 1),
  socialMockup: img("social-mockup", "Phone mock-ups showing a social media feed layout", 720, 900, 4),
  cameraHands: img("camera-hands", "Hands holding a mirrorless camera with a zoom lens", 516, 916, 4),
  newspaperStreet: img("newspaper-street", "Person reading a newspaper on an orange chair outside a building", 648, 810, 4),
  strategyWall: img("strategy-wall", "Hands arranging notes on a planning wall, black and white", 564, 846, 5),
  creatorPhone: img("creator-phone", "Phone on a tripod recording a woman posing in the background", 516, 773, 5),
  sushiFlame: img("sushi-flame", "Row of seared sushi topped with crispy garnish against warm light", 683, 1024, 6),
  suvPalmRoad: img("suv-palm-road", "SUV driving down a palm-lined road in soft evening light", 774, 1229, 6),
  bowlWide: img("bowl-chopsticks-wide", "Hand presenting a poke bowl while chopsticks lift a bite", 546, 820, 6),
  suvMotion: img("suv-motion", "SUV in motion on a curving road with palm trees behind", 686, 1024, 7),
  bowl: img("bowl-chopsticks", "Close-up of a colourful poke bowl held in one hand with chopsticks above", 647, 1024, 7),
  winterRider: img("winter-rider", "Person in snow gear and helmet pointing toward the camera beside a cable car", 683, 1024, 7),
  desertSuv: img("desert-suv", "Dark SUV cresting rippled desert sand dunes", 819, 1092, 7),
  whiteCoupe: img("white-coupe", "Side detail of a white sports coupe with a rear wing, framed by leaves", 683, 1024, 8),
  platedFish: img("plated-fish", "Seared fish topped with fresh salsa in a white bowl on a dark background", 684, 1024, 8),
  headphonesPortrait: img("headphones-portrait", "Man in headphones and sunglasses under a blue canopy", 683, 1024, 8),
  servicePlate: img("service-plate", "Server in an apron holding a plated rice dish and a salad", 683, 1024, 8),
  editorialPrints: img("editorial-prints", "Black and white photo prints and an open magazine spread on the floor", 1067, 1600, 10),
} satisfies Record<string, MediaItem>;
