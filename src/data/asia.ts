// src/data/asia.ts

export interface Destination {
    id: number;
    name: string;
    image: string;
    duration: string;
    region: string;
    description: string;
    highlights: string[];
    itinerary: { day: string; details: string }[];
    whyVisit: string;
    culture: string;
    tips: string[];
    tags: string[];
}

export const Destinations: Destination[] = [
    {
        id: 1,
        name: "Kyoto, Japan",
        image: "/images/asia/kyoto.webp",
        duration: "5 Days",
        region: "East Asia",
        description: "The cultural heart of Japan, full of temples, gardens, and tea houses.",
        highlights: ["Fushimi Inari Shrine", "Kinkaku-ji", "Gion District"],
        itinerary: [
            { day: "Day 1", details: "Arrival, explore Gion & geisha culture" },
            { day: "Day 2", details: "Visit Fushimi Inari & Kiyomizu-dera" },
            { day: "Day 3", details: "Day trip to Nara & Todaiji Temple" },
            { day: "Day 4", details: "Golden Pavilion & Arashiyama Bamboo Grove" },
            { day: "Day 5", details: "Tea ceremony & departure" }
        ],
        whyVisit: "Kyoto embodies Japanese tradition, beauty, and tranquility.",
        culture: "Zen gardens, kaiseki dining, and traditional geisha arts.",
        tips: ["Book tea ceremonies early.", "Rent a kimono for photos."],
        tags: ["Culture", "History", "Spiritual", "Scenic"]
    },
    {
        id: 2,
        name: "Bali, Indonesia",
        image: "/images/asia/bali.webp",
        duration: "6 Days",
        region: "Southeast Asia",
        description: "A tropical paradise with beaches, rice terraces, and temples.",
        highlights: ["Ubud Rice Terraces", "Uluwatu Temple", "Kuta Beach"],
        itinerary: [
            { day: "Day 1", details: "Arrival and beach sunset" },
            { day: "Day 2", details: "Ubud rice terraces and monkey forest" },
            { day: "Day 3", details: "Waterfalls and Balinese temples" },
            { day: "Day 4", details: "Uluwatu Temple and Kecak dance" },
            { day: "Day 5", details: "Island hopping or snorkeling" },
            { day: "Day 6", details: "Relaxation and departure" }
        ],
        whyVisit: "Bali is a blend of spirituality, adventure, and natural beauty.",
        culture: "Balinese Hindu traditions, dance, and offerings.",
        tips: ["Respect temple dress codes.", "Avoid tap water."],
        tags: ["Beach", "Adventure", "Culture", "Relaxation"]
    },
    {
        id: 3,
        name: "Dubai, UAE",
        image: "/images/asia/dubai.webp",
        duration: "4 Days",
        region: "Middle East",
        description: "A futuristic desert city with luxury, skyscrapers, and souks.",
        highlights: ["Burj Khalifa", "Dubai Mall", "Desert Safari"],
        itinerary: [
            { day: "Day 1", details: "Arrival & Dubai Marina" },
            { day: "Day 2", details: "Burj Khalifa & Dubai Mall" },
            { day: "Day 3", details: "Desert safari and Bedouin camp dinner" },
            { day: "Day 4", details: "Souk shopping and departure" }
        ],
        whyVisit: "Dubai offers luxury, culture, and thrilling desert adventures.",
        culture: "Arabic traditions, Islamic architecture, and global influences.",
        tips: ["Dress modestly in public.", "Book Burj tickets online."],
        tags: ["Luxury", "Shopping", "Adventure", "Modern"]
    },
    {
        id: 4,
        name: "Bangkok, Thailand",
        image: "/images/asia/bangkok.webp",
        duration: "5 Days",
        region: "Southeast Asia",
        description: "A bustling city of temples, street food, and nightlife.",
        highlights: ["Grand Palace", "Floating Markets", "Wat Arun"],
        itinerary: [
            { day: "Day 1", details: "Arrival and evening street food tour" },
            { day: "Day 2", details: "Grand Palace & Wat Pho" },
            { day: "Day 3", details: "Floating market & boat tour" },
            { day: "Day 4", details: "Day trip to Ayutthaya" },
            { day: "Day 5", details: "Shopping and departure" }
        ],
        whyVisit: "Bangkok mixes culture, flavors, and energy like no other.",
        culture: "Thai hospitality, Buddhism, and vibrant street markets.",
        tips: ["Carry cash for street vendors.", "Use the Skytrain to avoid traffic."],
        tags: ["Food", "Culture", "Nightlife", "History"]
    },
    {
        id: 5,
        name: "Kathmandu, Nepal",
        image: "/images/asia/kathmandu.webp",
        duration: "4 Days",
        region: "South Asia",
        description: "A spiritual gateway to the Himalayas.",
        highlights: ["Pashupatinath Temple", "Boudhanath Stupa", "Durbar Square"],
        itinerary: [
            { day: "Day 1", details: "Arrival and Durbar Square" },
            { day: "Day 2", details: "Pashupatinath & Boudhanath" },
            { day: "Day 3", details: "Day hike to Nagarkot" },
            { day: "Day 4", details: "Shopping and departure" }
        ],
        whyVisit: "Kathmandu offers rich spirituality and Himalayan views.",
        culture: "Hindu and Buddhist traditions blend seamlessly here.",
        tips: ["Prepare for altitude.", "Respect temple rituals."],
        tags: ["Spiritual", "History", "Culture", "Adventure"]
    },
    {
        id: 6,
        name: "Beijing, China",
        image: "/images/asia/beijing.webp",
        duration: "5 Days",
        region: "East Asia",
        description: "Ancient wonders and modern megacity vibes.",
        highlights: ["Great Wall", "Forbidden City", "Temple of Heaven"],
        itinerary: [
            { day: "Day 1", details: "Arrival and Tiananmen Square" },
            { day: "Day 2", details: "Great Wall excursion" },
            { day: "Day 3", details: "Forbidden City & hutongs" },
            { day: "Day 4", details: "Summer Palace & Peking duck dinner" },
            { day: "Day 5", details: "Temple of Heaven and departure" }
        ],
        whyVisit: "Beijing is a living museum of China's vast history.",
        culture: "Imperial dynasties, Peking opera, and dumplings.",
        tips: ["Avoid rush hours.", "Hire local guides for the Wall."],
        tags: ["History", "Culture", "Food", "Architecture"]
    },
    {
        id: 7,
        name: "Goa, India",
        image: "/images/asia/goa.webp",
        duration: "5 Days",
        region: "South Asia",
        description: "A coastal paradise of beaches, parties, and Portuguese heritage.",
        highlights: ["Baga Beach", "Basilica of Bom Jesus", "Dudhsagar Falls"],
        itinerary: [
            { day: "Day 1", details: "Arrival & Baga Beach" },
            { day: "Day 2", details: "Churches & Old Goa" },
            { day: "Day 3", details: "Water sports & nightlife" },
            { day: "Day 4", details: "Dudhsagar Falls excursion" },
            { day: "Day 5", details: "Markets and departure" }
        ],
        whyVisit: "Goa is India's top beach and party capital.",
        culture: "Blend of Indian and Portuguese influences.",
        tips: ["Try local seafood.", "Rent a scooter for exploring."],
        tags: ["Beach", "Nightlife", "Culture", "Food"]
    },
    {
        id: 8,
        name: "Seoul, South Korea",
        image: "/images/asia/seoul.webp",
        duration: "5 Days",
        region: "East Asia",
        description: "A modern hub blending K-pop, palaces, and street food.",
        highlights: ["Gyeongbokgung Palace", "Bukchon Hanok Village", "Myeongdong"],
        itinerary: [
            { day: "Day 1", details: "Arrival and night markets" },
            { day: "Day 2", details: "Palace & hanbok experience" },
            { day: "Day 3", details: "Shopping in Myeongdong" },
            { day: "Day 4", details: "N Seoul Tower & K-pop show" },
            { day: "Day 5", details: "Relaxation and departure" }
        ],
        whyVisit: "Seoul is vibrant, trendy, and deeply cultural.",
        culture: "Confucian traditions mix with cutting-edge pop culture.",
        tips: ["Learn basic Korean phrases.", "Use T-money card for transport."],
        tags: ["Modern", "Culture", "Food", "Nightlife"]
    },
    {
        id: 9,
        name: "Maldives",
        image: "/images/asia/maldives.webp",
        duration: "6 Days",
        region: "South Asia",
        description: "Idyllic islands with luxury resorts and turquoise waters.",
        highlights: ["Overwater Villas", "Snorkeling Reefs", "Sunset Cruises"],
        itinerary: [
            { day: "Day 1", details: "Arrival and relaxation in villa" },
            { day: "Day 2", details: "Snorkeling and coral reef exploration" },
            { day: "Day 3", details: "Sandbank picnic and dolphin watching" },
            { day: "Day 4", details: "Water sports and spa day" },
            { day: "Day 5", details: "Island hopping" },
            { day: "Day 6", details: "Departure" }
        ],
        whyVisit: "The Maldives is the ultimate tropical escape.",
        culture: "Island life with South Asian and Islamic influences.",
        tips: ["Best visited November-April.", "Pack light clothes."],
        tags: ["Luxury", "Beach", "Relaxation", "Romantic"]
    },
    {
        id: 10,
        name: "Hanoi & Ha Long Bay, Vietnam",
        image: "/images/asia/halong.webp",
        duration: "5 Days",
        region: "Southeast Asia",
        description: "Bustling streets of Hanoi paired with Ha Long's limestone cliffs.",
        highlights: ["Old Quarter", "Ha Long Bay Cruise", "Hoan Kiem Lake"],
        itinerary: [
            { day: "Day 1", details: "Arrival and Old Quarter food tour" },
            { day: "Day 2", details: "City tour and water puppet show" },
            { day: "Day 3", details: "Overnight Ha Long Bay cruise" },
            { day: "Day 4", details: "Kayaking and cave visits" },
            { day: "Day 5", details: "Return to Hanoi and departure" }
        ],
        whyVisit: "A mix of history, food, and jaw-dropping natural scenery.",
        culture: "Vietnamese resilience, cuisine, and French colonial influences.",
        tips: ["Try egg coffee.", "Book Ha Long cruises early."],
        tags: ["Food", "Nature", "Adventure", "Culture"]
    },
    {
        id: 11,
        name: "Singapore",
        image: "/images/asia/singapore.webp",
        duration: "4 Days",
        region: "Southeast Asia",
        description: "A futuristic city-state with gardens, skyscrapers, and street food.",
        highlights: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa"],
        itinerary: [
            { day: "Day 1", details: "Arrival & Marina Bay Sands" },
            { day: "Day 2", details: "Gardens by the Bay & Chinatown" },
            { day: "Day 3", details: "Sentosa & Universal Studios" },
            { day: "Day 4", details: "Shopping and departure" }
        ],
        whyVisit: "Singapore blends nature, modernity, and flavors beautifully.",
        culture: "Chinese, Malay, Indian, and Western influences coexist.",
        tips: ["Try hawker center food.", "Use MRT for easy travel."],
        tags: ["Modern", "Food", "Culture", "Family"]
    },
    {
        id: 12,
        name: "Siem Reap, Cambodia",
        image: "/images/asia/siemreap.webp",
        duration: "4 Days",
        region: "Southeast Asia",
        description: "Home of the majestic Angkor Wat temples.",
        highlights: ["Angkor Wat", "Bayon Temple", "Tonle Sap Lake"],
        itinerary: [
            { day: "Day 1", details: "Arrival and Angkor Wat sunset" },
            { day: "Day 2", details: "Full-day temple exploration" },
            { day: "Day 3", details: "Floating villages on Tonle Sap" },
            { day: "Day 4", details: "Local markets and departure" }
        ],
        whyVisit: "Siem Reap is both spiritual and adventurous.",
        culture: "Khmer heritage, Buddhist traditions, and vibrant crafts.",
        tips: ["Start temple tours at sunrise.", "Carry cash for local markets."],
        tags: ["History", "Culture", "Adventure", "Spiritual"]
    }
];
