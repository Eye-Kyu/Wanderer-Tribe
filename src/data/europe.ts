// src/data/europe.ts

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
        name: "Paris, France",
        image: "/images/paris.jpeg",
        duration: "5 Days",
        region: "Western Europe",
        description: "The city of light, romance, and art.",
        highlights: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
        itinerary: [
            { day: "Day 1", details: "Arrival and Eiffel Tower visit" },
            { day: "Day 2", details: "Louvre Museum and Montmartre" },
            { day: "Day 3", details: "Day trip to Versailles" },
            { day: "Day 4", details: "Seine River Cruise and Notre-Dame" },
            { day: "Day 5", details: "Shopping and departure" }
        ],
        whyVisit: "Paris is the epitome of romance, culture, and history.",
        culture: "French art, fashion, and cuisine dominate the lifestyle.",
        tips: ["Buy museum passes in advance.", "Learn a few basic French phrases."],
        tags: ["Romantic", "Art", "History", "Food"]
    },
    {
        id: 2,
        name: "Rome, Italy",
        image: "/images/rome.jpeg",
        duration: "6 Days",
        region: "Southern Europe",
        description: "Ancient ruins blended with vibrant street life.",
        highlights: ["Colosseum", "Vatican City", "Trevi Fountain"],
        itinerary: [
            { day: "Day 1", details: "Arrival and Piazza Navona" },
            { day: "Day 2", details: "Colosseum and Roman Forum" },
            { day: "Day 3", details: "Vatican Museums & St. Peter’s Basilica" },
            { day: "Day 4", details: "Day trip to Pompeii" },
            { day: "Day 5", details: "Spanish Steps and Trevi Fountain" },
            { day: "Day 6", details: "Shopping and departure" }
        ],
        whyVisit: "Rome offers an unmatched historical and cultural experience.",
        culture: "Italian traditions, Roman ruins, and authentic cuisine.",
        tips: ["Wear comfy shoes.", "Book Vatican tickets in advance."],
        tags: ["History", "Culture", "Religion", "Food"]
    },
    {
        id: 3,
        name: "Santorini, Greece",
        image: "/images/greece.jpeg",
        duration: "4 Days",
        region: "Southern Europe",
        description: "Iconic white-washed villages and breathtaking sunsets.",
        highlights: ["Oia Sunset", "Red Beach", "Volcano Cruise"],
        itinerary: [
            { day: "Day 1", details: "Arrival and sunset at Oia" },
            { day: "Day 2", details: "Red and Black sand beaches" },
            { day: "Day 3", details: "Volcano and hot springs cruise" },
            { day: "Day 4", details: "Shopping and departure" }
        ],
        whyVisit: "One of the most picturesque islands in the world.",
        culture: "Greek traditions, seafood cuisine, and warm hospitality.",
        tips: ["Stay in a cave hotel.", "Reserve sunset dining early."],
        tags: ["Romantic", "Beach", "Scenic", "Relaxation"]
    },
    {
        id: 4,
        name: "Barcelona, Spain",
        image: "/images/barcelona.jpeg",
        duration: "5 Days",
        region: "Southern Europe",
        description: "A vibrant city of art, beaches, and Catalan culture.",
        highlights: ["Sagrada Familia", "Park Güell", "La Rambla"],
        itinerary: [
            { day: "Day 1", details: "Arrival and evening on La Rambla" },
            { day: "Day 2", details: "Sagrada Familia and Gothic Quarter" },
            { day: "Day 3", details: "Park Güell and beach afternoon" },
            { day: "Day 4", details: "Day trip to Montserrat" },
            { day: "Day 5", details: "Shopping and departure" }
        ],
        whyVisit: "Barcelona is the perfect mix of culture, architecture, and fun.",
        culture: "Catalan identity, tapas, flamenco, and Gaudí's masterpieces.",
        tips: ["Watch your belongings on La Rambla.", "Try authentic paella."],
        tags: ["Beach", "Culture", "Architecture", "Nightlife"]
    },
    {
        id: 5,
        name: "Zurich & Interlaken, Switzerland",
        image: "/images/switzerland.jpeg",
        duration: "6 Days",
        region: "Central Europe",
        description: "A haven of mountains, lakes, and adventure sports.",
        highlights: ["Lake Zurich", "Jungfraujoch", "Swiss Alps Hike"],
        itinerary: [
            { day: "Day 1", details: "Arrival and stroll around Zurich" },
            { day: "Day 2", details: "Day trip to Lucerne" },
            { day: "Day 3", details: "Train to Interlaken, scenic stopovers" },
            { day: "Day 4", details: "Excursion to Jungfraujoch" },
            { day: "Day 5", details: "Adventure sports in Interlaken" },
            { day: "Day 6", details: "Relax and departure" }
        ],
        whyVisit: "A fairytale destination for nature and thrill seekers.",
        culture: "Swiss precision, Alpine living, and chocolate heritage.",
        tips: ["Buy a Swiss Travel Pass.", "Layer up for weather changes."],
        tags: ["Nature", "Adventure", "Luxury", "Scenic"]
    },
    {
        id: 6,
        name: "Berlin, Germany",
        image: "/images/berlin.jpeg",
        duration: "4 Days",
        region: "Central Europe",
        description: "A city where modern art meets turbulent history.",
        highlights: ["Berlin Wall", "Brandenburg Gate", "Museum Island"],
        itinerary: [
            { day: "Day 1", details: "Arrival and Berlin Wall Memorial" },
            { day: "Day 2", details: "Museum Island and Unter den Linden" },
            { day: "Day 3", details: "Day trip to Potsdam" },
            { day: "Day 4", details: "Brandenburg Gate and departure" }
        ],
        whyVisit: "Berlin is Europe's hub for history and counterculture.",
        culture: "Progressive art, reunification history, and techno music.",
        tips: ["Get a Welcome Card for transport.", "Explore street art areas."],
        tags: ["History", "Nightlife", "Culture", "Art"]
    },
    {
        id: 7,
        name: "Oslo & Fjords, Norway",
        image: "/images/norway.jpeg",
        duration: "5 Days",
        region: "Northern Europe",
        description: "Majestic fjords and Nordic charm.",
        highlights: ["Geirangerfjord", "Viking Ship Museum", "Northern Lights"],
        itinerary: [
            { day: "Day 1", details: "Arrival and explore Oslo" },
            { day: "Day 2", details: "Viking Ship Museum and Aker Brygge" },
            { day: "Day 3", details: "Scenic fjord cruise" },
            { day: "Day 4", details: "Northern Lights chase" },
            { day: "Day 5", details: "Relax and departure" }
        ],
        whyVisit: "A mix of serene fjords, adventure, and Scandinavian culture.",
        culture: "Nordic traditions, minimalism, and Viking heritage.",
        tips: ["Pack layers.", "Book fjord cruises in advance."],
        tags: ["Nature", "Adventure", "Scenic", "Northern Lights"]
    },
    {
        id: 8,
        name: "Prague, Czech Republic",
        image: "/images/prague.jpeg",
        duration: "4 Days",
        region: "Eastern Europe",
        description: "A fairytale city of castles, bridges, and beer.",
        highlights: ["Charles Bridge", "Prague Castle", "Old Town Square"],
        itinerary: [
            { day: "Day 1", details: "Arrival and Charles Bridge walk" },
            { day: "Day 2", details: "Prague Castle and Cathedral" },
            { day: "Day 3", details: "Old Town and Astronomical Clock" },
            { day: "Day 4", details: "Beer tasting and departure" }
        ],
        whyVisit: "Prague is magical, affordable, and full of history.",
        culture: "Bohemian traditions, beer culture, Gothic architecture.",
        tips: ["Explore on foot.", "Try traditional goulash."],
        tags: ["History", "Affordable", "Culture", "Food"]
    },
    {
        id: 9,
        name: "Amsterdam, Netherlands",
        image: "/images/amsterdam.jpeg",
        duration: "5 Days",
        region: "Western Europe",
        description: "A city of canals, bicycles, and liberal spirit.",
        highlights: ["Canal Cruise", "Van Gogh Museum", "Tulip Gardens"],
        itinerary: [
            { day: "Day 1", details: "Arrival and evening canal cruise" },
            { day: "Day 2", details: "Van Gogh Museum and Jordaan District" },
            { day: "Day 3", details: "Day trip to Keukenhof Tulip Gardens" },
            { day: "Day 4", details: "Anne Frank House and biking tour" },
            { day: "Day 5", details: "Markets and departure" }
        ],
        whyVisit: "Amsterdam combines charm, history, and modern creativity.",
        culture: "Dutch cycling, tulips, art heritage, and tolerance.",
        tips: ["Rent a bike.", "Pre-book Anne Frank tickets."],
        tags: ["Culture", "Art", "Romantic", "Nature"]
    },
    {
        id: 10,
        name: "Dubrovnik, Croatia",
        image: "/images/dubrovnik.jpeg",
        duration: "4 Days",
        region: "Southern Europe",
        description: "The Pearl of the Adriatic, with medieval walls and beaches.",
        highlights: ["City Walls", "Lokrum Island", "Old Town"],
        itinerary: [
            { day: "Day 1", details: "Arrival and evening Old Town walk" },
            { day: "Day 2", details: "Walk Dubrovnik Walls and forts" },
            { day: "Day 3", details: "Day trip to Lokrum Island" },
            { day: "Day 4", details: "Beach relaxation and departure" }
        ],
        whyVisit: "A unique coastal medieval city with stunning sea views.",
        culture: "Croatian hospitality, seafood, and Game of Thrones fame.",
        tips: ["Walk walls early morning.", "Carry swimsuits for beaches."],
        tags: ["Beach", "History", "Scenic", "Relaxation"]
    },
    {
        id: 11,
        name: "Edinburgh, Scotland",
        image: "/images/edinburgh.jpeg",
        duration: "5 Days",
        region: "Northern Europe",
        description: "A gothic capital of castles, whisky, and festivals.",
        highlights: ["Edinburgh Castle", "Arthur's Seat", "Royal Mile"],
        itinerary: [
            { day: "Day 1", details: "Arrival and stroll along the Royal Mile" },
            { day: "Day 2", details: "Visit Edinburgh Castle" },
            { day: "Day 3", details: "Hike up Arthur's Seat" },
            { day: "Day 4", details: "Scottish whisky tasting" },
            { day: "Day 5", details: "Festival or market and departure" }
        ],
        whyVisit: "Edinburgh is mystical, historic, and culturally rich.",
        culture: "Scottish traditions, whisky, and bagpipes.",
        tips: ["Pack warm layers.", "Join a ghost tour at night."],
        tags: ["History", "Festival", "Nature", "Culture"]
    },
    {
        id: 12,
        name: "Lisbon, Portugal",
        image: "/images/lisbon.jpeg",
        duration: "5 Days",
        region: "Southern Europe",
        description: "A charming coastal city with hills, trams, and fado music.",
        highlights: ["Belém Tower", "Alfama", "Sintra day trip"],
        itinerary: [
            { day: "Day 1", details: "Arrival and tram ride through Alfama" },
            { day: "Day 2", details: "Belém Tower and Jerónimos Monastery" },
            { day: "Day 3", details: "Day trip to Sintra" },
            { day: "Day 4", details: "Time in Bairro Alto & fado show" },
            { day: "Day 5", details: "Relaxation and departure" }
        ],
        whyVisit: "Lisbon blends history, food, and stunning seaside charm.",
        culture: "Portuguese seafaring heritage, fado, and soulful cuisine.",
        tips: ["Wear comfy shoes for hills.", "Try pastel de nata."],
        tags: ["Culture", "Food", "Romantic", "Scenic"]
    }
];
