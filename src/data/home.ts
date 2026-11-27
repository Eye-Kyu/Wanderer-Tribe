// Home page content, carried over from DayItinerary, ItineraryOptions and Testimonials.
// Wording kept; titles split where they joined two phrases with a bullet.

export const thailandItinerary = {
  title: "Thailand 10D/9N",
  route: "Phuket, Pattaya and Bangkok",
  image: { src: "/images/asia/bangkok.webp", alt: "Bangkok's temples lit at night" },
  stops: [
    {
      place: "Phuket",
      theme: "Island escape",
      details:
        "Begin your trip in Phuket: unwind by the sea, explore Phi Phi Island's turquoise bays, and indulge in Thai spa bliss.",
      includes: ["Phi Phi Island Tour", "Thai Spa Experience"],
    },
    {
      place: "Pattaya",
      theme: "Culture and coastal vibes",
      details:
        "Fly to Bangkok and transfer to Pattaya. Discover the tropical gardens of Nong Nooch, marvel at the Alcazar Cabaret, and unwind at Mongchang Café.",
      includes: ["Nong Nooch Gardens", "Alcazar Cabaret"],
    },
    {
      place: "Bangkok",
      theme: "City of temples and taste",
      details:
        "Experience Bangkok's bustling markets, dine sky-high at Baiyoke, and cruise along the Chao Phraya River under glittering city lights.",
      includes: ["Floating Market", "Dinner Cruise"],
    },
    {
      place: "Departure",
      theme: "Farewell Thailand",
      details:
        "Enjoy a relaxed morning before your transfer to Suvarnabhumi Airport. Bid farewell to Thailand's warmth and wonder.",
      includes: [],
    },
  ],
};

export const safariCamps = [
  {
    name: "Loyk Mara Camp",
    title: "Whispers of the Wild",
    destination: "Maasai Mara, Kenya",
    includes: "Airfare, Full-board stay, Expert-led safaris",
    excludes: "Bush dining ($40/person), Personal items",
    image: "/images/bush-dine.webp",
  },
  {
    name: "Mito Safari Camp",
    title: "Safari Symphony",
    destination: "Serengeti, Tanzania",
    includes: "Flights, Luxury tents, Wildlife tours",
    excludes: "Garden walks, Extra excursions",
    image: "/images/mito-camp.webp",
  },
  {
    name: "Mara Major Camp",
    title: "Untamed Horizons",
    destination: "Maasai Mara, Kenya",
    includes: "Tented suites, Park entry",
    excludes: "Beverages, Additional drives",
    image: "/images/tents.webp",
  },
  {
    name: "Olare Mara Camp",
    title: "Serenity Escape",
    destination: "Olare, Kenya",
    includes: "Airfare, Full-board stay, Guided tours",
    excludes: "Spa services, Premium drinks",
    image: "/images/ole.jpg",
  },
  {
    name: "Talek River Camp",
    title: "Wild Dreams",
    destination: "Talek, Kenya",
    includes: "Tents, Safaris, Park entry",
    excludes: "Private guides, Beverages",
    image: "/images/talek.jpg",
  },
];

// Kept word for word, as the owner supplied them.
export const testimonials = [
  {
    name: "Peter Biko",
    location: "Luanda, Angola",
    text: "I recently booked a trip to Thailand with Wanderer-Tribe and I could not have been happier with my experience.",
  },
  {
    name: "Jennifer and Mark",
    location: "San Francisco",
    text: "My husband and I have been using Wanderer Tribe for 2 years now and they have never disappointed us.",
  },
];
