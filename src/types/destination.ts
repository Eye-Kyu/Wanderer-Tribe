export interface ItineraryItem {
    day: string;
    details: string;
}

export interface Destination {
    id: number;
    name: string;
    duration: string;
    description: string;
    image: string;
    whyVisit: string;
    highlights: string[];
    itinerary: ItineraryItem[];  // <-- updated here
    culture: string;
    tips: string[];
    tags: string[];
}
