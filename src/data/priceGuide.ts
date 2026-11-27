// Carried over from the old Destinations page: the owner's featured trips with length and cost.

export interface PricedTrip {
  name: string;
  days: number;
  cost: string;
  activities: string;
}

export const priceGuide: { region: "africa" | "europe" | "asia"; trips: PricedTrip[] }[] = [
  {
    region: "africa",
    trips: [
      { name: "Maasai Mara, Kenya", days: 4, cost: "$3,200", activities: "Game Drives, Hot Air Balloon, Maasai Village Visit" },
      { name: "Cape Town, South Africa", days: 5, cost: "$3,500", activities: "Table Mountain, Robben Island, Wine Tasting" },
      { name: "Serengeti, Tanzania", days: 6, cost: "$4,000", activities: "Wildlife Safari, Ngorongoro Crater, Cultural Tours" },
      { name: "Victoria Falls, Zambia/Zimbabwe", days: 4, cost: "$3,300", activities: "Boat Cruise, Devil's Pool, Helicopter Tour" },
      { name: "Marrakech, Morocco", days: 5, cost: "$3,100", activities: "Jemaa el-Fna, Bahia Palace, Sahara Excursion" },
    ],
  },
  {
    region: "europe",
    trips: [
      { name: "Dubai, United Arab Emirates", days: 4, cost: "$3,200", activities: "Burj Khalifa Visit, Desert Safari, Dubai Marina Cruise" },
      { name: "Petra, Jordan", days: 3, cost: "$2,400", activities: "Treasury Visit, Siq Canyon Walk, Wadi Rum Excursion" },
      { name: "Cairo, Egypt", days: 5, cost: "$2,800", activities: "Pyramids Tour, Egyptian Museum, Nile Dinner Cruise" },
      { name: "Doha, Qatar", days: 4, cost: "$2,900", activities: "Souq Waqif, Museum of Islamic Art, Corniche Walk" },
      { name: "Muscat, Oman", days: 3, cost: "$2,700", activities: "Grand Mosque Visit, Muttrah Souq, Dolphin Watching Cruise" },
    ],
  },
  {
    region: "asia",
    trips: [
      { name: "Kyoto, Japan", days: 5, cost: "$3,800", activities: "Fushimi Inari Shrine, Bamboo Forest, Tea Ceremony" },
      { name: "Tsushima, Japan", days: 4, cost: "$3,500", activities: "Hiking, Historical Sites, Coastal Views" },
      { name: "Mount Fuji, Japan", days: 3, cost: "$2,900", activities: "Hiking, Lake Kawaguchi, Onsen Visit" },
      { name: "Shibuya, Japan", days: 4, cost: "$3,400", activities: "Shibuya Crossing, Harajuku, Meiji Shrine" },
      { name: "Bali, Indonesia", days: 6, cost: "$3,700", activities: "Ubud Monkey Forest, Tanah Lot, Beach Relaxation" },
    ],
  },
];

// The first sentence of each region's description, and its travel tip, from the old page.
export const regionNotes: Record<"africa" | "europe" | "asia", { intro: string; tip: string; image: string }> = {
  africa: {
    intro: "Africa, the cradle of humanity, boasts wild safaris in Maasai Mara and scenic coastlines in Cape Town.",
    tip: "Pack lightweight clothing and sunscreen, and book safaris during the dry season for optimal wildlife viewing.",
    image: "/images/discover-africa.webp",
  },
  europe: {
    intro: "The Middle East, a crossroads of cultures, invites you to explore its ancient wonders and modern marvels.",
    tip: "Visit during the cooler months for pleasant weather, and embrace local customs and traditions.",
    image: "/images/middleeast/dubai.webp",
  },
  asia: {
    intro: "Asia, a fusion of ancient traditions and modernity, features serene temples in Kyoto and tropical paradises in Bali.",
    tip: "Respect local customs, and visit during shoulder seasons for balanced weather and costs.",
    image: "/images/explore-asia.jpeg",
  },
};
