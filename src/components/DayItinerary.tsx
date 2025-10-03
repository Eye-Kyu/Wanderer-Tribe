"use client";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import {
  Plane,
  BedDouble,
  Camera,
  Mountain,
  Ship,
  ShoppingBag,
  Utensils,
  Landmark,
} from "lucide-react";

export default function ThailandItineraryTimeline() {
  const data = [
    {
      title: "Day 1 - Phuket" ,
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-xs md:text-base text-[#333333]">
            <li className="flex items-start  ">
              <Plane className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
              Arrival at Phuket International Airport
            </li>
            <li className="flex items-start">
              <BedDouble className="w-5 h-5 mr-3 text-[#2F4F2F] flex-shrink-0" />
              Hotel check-in, free at leisure
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/shibuya.jpeg" alt="Phuket Arrival" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/hotel3.jpg" alt="Phuket City" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Arrival in Phuket</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Hotel Check-in & Leisure</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 2 - Phuket",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <Ship className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
              Phi Phi Island tour by speedboat with lunch
            </li>
            <li className="ml-8 italic text-[#555555]">
              Beaches, limestone cliffs, Viking cave & coral reefs
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/africa/seychelles.jpeg" alt="Phi Phi Beach" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/asia/goa.jpeg" alt="Phi Phi Island" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Phi Phi Island Tour</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Coral Reefs & Beaches</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 3 - Phuket",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <Camera className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
              Free day + massage experiences
            </li>
            <li className="ml-8 text-[#555555]">
              Options: Four Hands Massage, King/Queen therapies
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/luxury/bali-spa.jpeg" alt="Thai Massage" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/bali-yoga.jpeg" alt="Relaxation" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Spa & Massage Day</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Signature Therapies</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 4 - Phuket → Bangkok → Pattaya",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <Plane className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
              Flight Phuket to Bangkok
            </li>
            <li className="flex items-start">
              <BedDouble className="w-5 h-5 mr-3 text-[#2F4F2F] flex-shrink-0" />
              Transfer to Pattaya & hotel check-in
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/kerala-ayurveda.jpeg" alt="Pattaya Hotel" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/hotel3.jpg" alt="Pattaya View" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Flight to Bangkok</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Pattaya Transfer</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 5 - Pattaya",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <Landmark className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
              Nong Nooch Tropical Garden + lunch
            </li>
            <li className="flex items-start">
              <Camera className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
              Evening Alcazar Cabaret Show
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/japan-forest.jpeg" alt="Nong Nooch Garden" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/africa/lalibela.jpeg" alt="Alcazar Show" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Nong Nooch Garden</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Alcazar Cabaret</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 6 - Pattaya",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <Mountain className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
              Elephant Village & Mongchang Café
            </li>
            <li className="flex items-start">
              <Camera className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
              Pattaya Dolphinarium Show
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/africa/okavango.jpeg" alt="Elephant Village" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/adventure/great-barrier-reef.jpeg" alt="Dolphin Show" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Elephant Village</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Dolphinarium Show</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 7 - Pattaya → Bangkok",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <ShoppingBag className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
              Visit World&apos;s Biggest Gems Gallery
            </li>
            <li className="flex items-start">
              <BedDouble className="w-5 h-5 mr-3 text-[#2F4F2F] flex-shrink-0" />
              Hotel check-in at Bangkok
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/berlin.jpeg" alt="Bangkok City" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/asia/bangkok.jpeg" alt="Bangkok Hotel" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Gems Gallery</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Bangkok Hotel</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 8 - Bangkok",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <Camera className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
              Risky Market + Floating Market
            </li>
            <li className="flex items-start">
              <Utensils className="w-5 h-5 mr-3 text-[#D2691E] flex-shrink-0" />
              Dinner at Baiyoke Sky Restaurant
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/asia/kathmandu.jpeg" alt="Floating Market" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/asia/singapore.jpeg" alt="Baiyoke Restaurant" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Risky Market</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Baiyoke Sky Dinner</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 9 - Bangkok",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <ShoppingBag className="w-5 h-5 mr-3 text-orange-500 flex-shrink-0" />
              Explore Icon Siam Shopping Mall
            </li>
            <li className="flex items-start">
              <Ship className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
              Evening Chaophraya Princess Dinner Cruise
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/asia/siemreap.jpeg" alt="Icon Siam Mall" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/asia/maldives.jpeg" alt="Chaophraya Cruise" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Icon Siam Mall</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Chao Phraya Cruise</span>
          </div>
        </div>
      ),
    },
    {
      title: "Day 10 - Bangkok → Airport",
      content: (
        <div className="space-y-4">
          <ul className="space-y-3 text-sm md:text-base text-[#333333]">
            <li className="flex items-start">
              <BedDouble className="w-5 h-5 mr-3 text-[#2F4F2F] flex-shrink-0" />
              Hotel check-out, free at leisure
            </li>
            <li className="flex items-start">
              <Plane className="w-5 h-5 mr-3 text-orange-400 flex-shrink-0" />
              Transfer to Suvarnabhumi Airport
            </li>
          </ul>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Image src="/images/asia/seoul.jpeg" alt="Bangkok Airport" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow block" />
            <Image src="/images/asia/kyoto.jpeg" alt="Thailand Farewell" width={500} height={500}
              className="h-32 sm:h-40 w-full rounded-lg object-cover shadow hidden sm:block" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Check-out</span>
            <span className="bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm">Airport Transfer</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">
      <Timeline data={data} />
    </div>
  );
}

/* Tailwind helper style for tags */
const Tag = "bg-wanderer-green text-white px-3 py-1 rounded-full shadow text-xs md:text-sm font-semibold";
