import { TripPlan, TripFormInputs } from '../types/trip';

export const PRESET_TRIPS: Array<{ name: string; icon: string; inputs: TripFormInputs }> = [
  {
    name: 'Tokyo Cyber & Zen',
    icon: '🗼',
    inputs: {
      destination: 'Tokyo, Japan',
      durationDays: 5,
      travelersCount: 2,
      budgetLevel: 'Moderate',
      travelStyle: 'Cultural',
      interests: ['Anime', 'Ramen', 'Shrines', 'Tech & Arcades'],
      specialRequests: 'Include Tsukiji outer market and TeamLab Planets'
    }
  },
  {
    name: 'Amalfi Coast Dream',
    icon: '🍋',
    inputs: {
      destination: 'Amalfi Coast, Italy',
      durationDays: 4,
      travelersCount: 2,
      budgetLevel: 'Luxury',
      travelStyle: 'Relaxation',
      interests: ['Coastal Views', 'Seafood', 'Boat Tour', 'Limoncello'],
      specialRequests: 'Romantic cliffside dining & private boat tour'
    }
  },
  {
    name: 'Bali Rainforest & Reef',
    icon: '🌴',
    inputs: {
      destination: 'Bali, Indonesia',
      durationDays: 7,
      travelersCount: 1,
      budgetLevel: 'Budget',
      travelStyle: 'Adventure',
      interests: ['Surfing', 'Waterfalls', 'Rice Terraces', 'Yoga'],
      specialRequests: 'Ubud cultural stays and Nusa Penida island trip'
    }
  }
];

export const MOCK_TOKYO_TRIP: TripPlan = {
  id: 'mock-tokyo-001',
  tripTitle: 'Tokyo Cyber & Zen Immersion',
  destination: 'Tokyo, Japan',
  durationDays: 5,
  travelersCount: 2,
  estimatedBudgetUSD: 2450,
  currencySymbol: '$',
  travelStyle: 'Cultural',
  heroImageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
  overview: 'Experience the harmonious contrast of centuries-old Shinto traditions and neon-lit futuristic metropolis across 5 curated days in Tokyo.',
  budgetBreakdown: {
    accommodation: 980,
    food: 720,
    activities: 450,
    transport: 300
  },
  days: [
    {
      dayNumber: 1,
      title: 'Neon & Heritage in Shinjuku',
      theme: 'Traditional Architecture & High-rise Panoramas',
      activities: [
        {
          id: 'act-101',
          timeOfDay: 'Morning',
          title: 'Meiji Jingu Shrine Walk',
          description: 'Stroll through 170 acres of evergreen forest leading to Tokyo\'s grandest Shinto shrine dedicated to Emperor Meiji.',
          location: 'Harajuku / Yoyogi Park',
          costUSD: 0,
          category: 'Culture',
          tips: 'Arrive before 8:30 AM to catch priest processions without crowds.'
        },
        {
          id: 'act-102',
          timeOfDay: 'Afternoon',
          title: 'Tsukiji Outer Market Tasting Tour',
          description: 'Sample fresh A5 Wagyu skewers, tamagoyaki omelettes, and fresh sea urchin from legendary stallholders.',
          location: 'Tsukiji Outer Market',
          costUSD: 45,
          category: 'Food & Dining',
          tips: 'Bring Japanese Yen cash; small vendors do not take cards.'
        },
        {
          id: 'act-103',
          timeOfDay: 'Evening',
          title: 'Shinjuku Skyscraper Observatory & Omoide Yokocho',
          description: 'Catch sunset 202m high at Tokyo Metropolitan Govt Building, followed by yakitori in Memory Lane alleyways.',
          location: 'Nishi-Shinjuku',
          costUSD: 35,
          category: 'Nightlife',
          tips: 'Free admission to observation deck. Great twilight photography spot.'
        }
      ]
    },
    {
      dayNumber: 2,
      title: 'Digital Art & Harajuku Pop Culture',
      theme: 'Immersive Tech & Street Fashion',
      activities: [
        {
          id: 'act-201',
          timeOfDay: 'Morning',
          title: 'teamLab Planets Digital Art Museum',
          description: 'Barefoot sensory experience walking through knee-deep water installation filled with digital koi fish.',
          location: 'Toyosu',
          costUSD: 28,
          category: 'Outdoor',
          tips: 'Wear pants that can easily be rolled up above your knees.'
        },
        {
          id: 'act-202',
          timeOfDay: 'Afternoon',
          title: 'Takeshita Street & Cat Street Boutiques',
          description: 'Explore trendy streetwear boutiques, vintage shops, and famous multi-layered crepe stands in Harajuku.',
          location: 'Shibuya / Harajuku',
          costUSD: 50,
          category: 'Shopping',
          tips: 'Walk down Cat Street towards Omotesando for quieter specialty cafes.'
        },
        {
          id: 'act-203',
          timeOfDay: 'Evening',
          title: 'Shibuya Crossing & Miyashita Park Rooftop',
          description: 'Watch the world\'s busiest pedestrian intersection from the glass sky deck before dinner overlooking Shibuya.',
          location: 'Shibuya Scramble',
          costUSD: 20,
          category: 'Sightseeing',
          tips: 'Book Shibuya Sky tickets 4 weeks in advance for golden hour slot.'
        }
      ]
    },
    {
      dayNumber: 3,
      title: 'Historic Asakusa & Akihabara Electric Town',
      theme: 'Senso-ji Temple & Anime Haven',
      activities: [
        {
          id: 'act-301',
          timeOfDay: 'Morning',
          title: 'Senso-ji Temple & Nakamise Shopping Street',
          description: 'Tokyo\'s oldest temple, founded in 645 AD. Sample freshly baked ningyo-yaki rice cakes.',
          location: 'Asakusa',
          costUSD: 15,
          category: 'Culture',
          tips: 'Draw an Omikuji fortune paper near the main incense burner.'
        },
        {
          id: 'act-302',
          timeOfDay: 'Afternoon',
          title: 'Akihabara Multi-Story Retro Gaming & Arcade',
          description: 'Dive into 8-story retro gaming emporiums like Super Potato and test your skill at Japanese claw machines.',
          location: 'Akihabara Electric Town',
          costUSD: 30,
          category: 'Culture',
          tips: 'Mandai and Radio Kaikan have the best rare collectibles.'
        },
        {
          id: 'act-303',
          timeOfDay: 'Evening',
          title: 'Michelin-Guide Tonkatsu Dinner at Yamabe',
          description: 'Indulge in crispy golden pork cutlet served with shredded cabbage, sesame mortar dipping sauce, and miso soup.',
          location: 'Ueno / Okachimachi',
          costUSD: 25,
          category: 'Food & Dining',
          tips: 'Counter seats only; queue opens 20 mins prior to opening.'
        }
      ]
    },
    {
      dayNumber: 4,
      title: 'Waterfront Odaiba & Tokyo Bay Cruise',
      theme: 'Bayside views, Giant Gundam & Cruise',
      activities: [
        {
          id: 'act-401',
          timeOfDay: 'Morning',
          title: 'Giant Unicorn Gundam Statue & DiverCity',
          description: 'Witness the life-sized 19.7m transformable Gundam robot dynamic transformation performance.',
          location: 'Odaiba Bay',
          costUSD: 0,
          category: 'Sightseeing',
          tips: 'Transformation shows run at 11:00 AM, 1:00 PM, 3:00 PM, and 5:00 PM.'
        },
        {
          id: 'act-402',
          timeOfDay: 'Afternoon',
          title: 'Tokyo Water Bus Cruise to Hinode',
          description: 'Scenic futuristic boat voyage along Sumida River passing under rainbow-lit urban bridges.',
          location: 'Sumida River',
          costUSD: 18,
          category: 'Outdoor',
          tips: 'Sit on the upper open-air deck for unobstructed photography.'
        },
        {
          id: 'act-403',
          timeOfDay: 'Evening',
          title: 'Roppongi Hills Sunset Skyline & Izakaya Crawl',
          description: 'Panoramas of Tokyo Tower illuminated against Mount Fuji silhouette, followed by craft sake.',
          location: 'Roppongi',
          costUSD: 60,
          category: 'Nightlife',
          tips: 'Visit Mori Art Museum included with observation tower ticket.'
        }
      ]
    },
    {
      dayNumber: 5,
      title: 'Serene Gardens & Ginza Artisanal Craft',
      theme: 'Edo Period Nature & High Design',
      activities: [
        {
          id: 'act-501',
          timeOfDay: 'Morning',
          title: 'Imperial Palace East Gardens Walk',
          description: 'Walk through historic Edo Castle moat, stone foundations, and meticulously manicured Japanese pine trees.',
          location: 'Marunouchi',
          costUSD: 0,
          category: 'Culture',
          tips: 'Closed on Mondays and Fridays. Free token given at entry gate.'
        },
        {
          id: 'act-502',
          timeOfDay: 'Afternoon',
          title: 'Ginza Flagship Craft Shopping & Matcha Ceremony',
          description: 'Explore 12-story Itoya stationery store and participate in traditional ceremonial matcha whisking.',
          location: 'Ginza District',
          costUSD: 40,
          category: 'Shopping',
          tips: 'Chuo-dori street becomes a pedestrian-only zone on weekends.'
        },
        {
          id: 'act-503',
          timeOfDay: 'Evening',
          title: 'Farewell Omakase Sushi at Sushi Shin',
          description: 'Hand-crafted nigiri sushi served piece-by-piece using Tokyo Bay seasonal catch by master chefs.',
          location: 'Shiroda / Ginza',
          costUSD: 110,
          category: 'Food & Dining',
          tips: 'Reservations essential 2 weeks prior.'
        }
      ]
    }
  ],
  hotels: [
    {
      name: 'Hotel Gracery Shinjuku',
      type: 'Boutique Modern',
      pricePerNightUSD: 180,
      rating: 4.7,
      amenities: ['Godzilla Terrace', 'Free High-speed Wi-Fi', 'Rainfall Shower', 'Subway Access'],
      description: 'Iconic high-rise hotel located directly above Toho Cinemas in Kabukicho with immediate train connectivity.',
      locationArea: 'Shinjuku, Tokyo'
    },
    {
      name: 'The Square Hotel Ginza',
      type: 'Design Hotel',
      pricePerNightUSD: 210,
      rating: 4.8,
      amenities: ['Public Onsen Bath', 'Artisanal Cafe Bar', 'Fitness Room', 'Designer Toiletries'],
      description: 'Sleek contemporary hotel featuring stylish wooden accents and a traditional modern public Sento bath.',
      locationArea: 'Ginza, Tokyo'
    }
  ],
  packingChecklist: [
    { id: 'p1', category: 'Essentials', item: 'Passport & Japan Visit Web QR Code', isPacked: true },
    { id: 'p2', category: 'Essentials', item: 'Suica / Pasmo IC Card for Subway Transit', isPacked: true },
    { id: 'p3', category: 'Gear & Tech', item: 'Type A Power Adapter (100V Japanese standard)', isPacked: false },
    { id: 'p4', category: 'Gear & Tech', item: 'Pocket Wi-Fi router / eSIM confirmation', isPacked: true },
    { id: 'p5', category: 'Clothing', item: 'Comfortable slip-on walking shoes (easy off at temples)', isPacked: false },
    { id: 'p6', category: 'Clothing', item: 'Light rain jacket & compact umbrella', isPacked: false },
    { id: 'p7', category: 'Health & Toiletries', item: 'Small hand towel & hand sanitizer (temple washing stations)', isPacked: false }
  ],
  createdAt: new Date().toISOString()
};

export const ALTERNATIVE_ACTIVITIES_POOL: Record<string, Array<Omit<import('../types/trip').ActivityItem, 'id'>>> = {
  Morning: [
    {
      timeOfDay: 'Morning',
      title: 'Early Morning Tsukiji Tuna Auction Viewing',
      description: 'Witness high-stakes tuna bidding by master sushi purveyors, followed by fresh sashimi breakfast.',
      location: 'Toyosu Wholesale Market',
      costUSD: 20,
      category: 'Food & Dining',
      tips: 'Requires online lottery entry 1 month prior.'
    },
    {
      timeOfDay: 'Morning',
      title: 'Shinjuku Gyoen National Garden Picnic',
      description: 'Relax in peaceful French Formal, English Landscape, and traditional Japanese garden designs.',
      location: 'Shinjuku Gyoen',
      costUSD: 4,
      category: 'Outdoor',
      tips: 'No alcohol allowed inside the garden grounds.'
    }
  ],
  Afternoon: [
    {
      timeOfDay: 'Afternoon',
      title: 'Yanaka Old Town Retro Bicycle Tour',
      description: 'Cycle through preserved pre-war neighborhoods, wooden temples, and traditional candy shops.',
      location: 'Yanaka / Nippori',
      costUSD: 35,
      category: 'Culture',
      tips: 'Rent electric assist bikes at Yanaka Ginza street entrance.'
    },
    {
      timeOfDay: 'Afternoon',
      title: 'Ghibli Museum Magical Animation Tour',
      description: 'Step inside Hayao Miyazaki\'s whimsical architectural marvel showcasing original watercolor storyboards.',
      location: 'Mitaka',
      costUSD: 10,
      category: 'Culture',
      tips: 'Tickets drop on the 10th of every preceding month.'
    }
  ],
  Evening: [
    {
      timeOfDay: 'Evening',
      title: 'Robot & Cyberpunk Izakaya Dining Experience',
      description: 'Futuristic neon dining hall featuring retro synthwave tunes, themed cocktails, and interactive games.',
      location: 'Kabukicho',
      costUSD: 55,
      category: 'Nightlife',
      tips: 'Great photos; reserve 3 days ahead.'
    },
    {
      timeOfDay: 'Evening',
      title: 'Traditional Yakatabune Lantern Boat Dinner',
      description: 'Glide across Tokyo Bay on a traditional wooden boat while enjoying tempura and bottomless beverages.',
      location: 'Tokyo Bay Shoreline',
      costUSD: 85,
      category: 'Food & Dining',
      tips: 'Includes tempura cooked live on board by private chef.'
    }
  ]
};

export function generateMockTripFromInputs(inputs: TripFormInputs): TripPlan {
  const duration = inputs.durationDays || 4;
  const travelers = inputs.travelersCount || 2;
  const baseBudget = inputs.budgetLevel === 'Luxury' ? 3500 : inputs.budgetLevel === 'Moderate' ? 1800 : 950;
  const totalBudget = baseBudget * (duration / 4) * (travelers / 2);

  const mockDays = Array.from({ length: duration }).map((_, idx) => {
    const dayNum = idx + 1;
    return {
      dayNumber: dayNum,
      title: `Day ${dayNum}: Exploring ${inputs.destination}`,
      theme: `${inputs.travelStyle} highlights & curated local experiences`,
      activities: [
        {
          id: `gen-act-${dayNum}-1`,
          timeOfDay: 'Morning' as const,
          title: `Morning Discovery at ${inputs.destination} Landmarks`,
          description: `Kickstart your day exploring famous historical sights and scenic viewpoints in ${inputs.destination}.`,
          location: `${inputs.destination} Central Plaza`,
          costUSD: Math.round(15 + Math.random() * 20),
          category: 'Sightseeing' as const,
          tips: 'Start early to beat peak tourist arrivals.'
        },
        {
          id: `gen-act-${dayNum}-2`,
          timeOfDay: 'Afternoon' as const,
          title: `Local Culinary & ${inputs.travelStyle} Workshop`,
          description: `Immerse yourself in authentic ${inputs.travelStyle.toLowerCase()} culture and taste regional signature delicacies.`,
          location: `Old Quarter, ${inputs.destination}`,
          costUSD: Math.round(25 + Math.random() * 35),
          category: 'Food & Dining' as const,
          tips: 'Inform servers about dietary restrictions beforehand.'
        },
        {
          id: `gen-act-${dayNum}-3`,
          timeOfDay: 'Evening' as const,
          title: `Sunset Views & Evening Stroll`,
          description: `Unwind with sunset panoramas followed by a cozy dinner at top-rated local spots.`,
          location: `Waterfront Walkway, ${inputs.destination}`,
          costUSD: Math.round(30 + Math.random() * 40),
          category: 'Nightlife' as const,
          tips: 'Pre-book window seating for the best twilight view.'
        }
      ]
    };
  });

  return {
    id: `custom-trip-${Date.now()}`,
    tripTitle: `${inputs.durationDays}-Day ${inputs.travelStyle} Escape to ${inputs.destination}`,
    destination: inputs.destination,
    durationDays: duration,
    travelersCount: travelers,
    estimatedBudgetUSD: Math.round(totalBudget),
    currencySymbol: '$',
    travelStyle: inputs.travelStyle,
    heroImageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    overview: `A custom-crafted ${duration}-day itinerary designed for ${travelers} traveler(s) seeking authentic ${inputs.travelStyle.toLowerCase()} experiences in ${inputs.destination}.`,
    budgetBreakdown: {
      accommodation: Math.round(totalBudget * 0.4),
      food: Math.round(totalBudget * 0.3),
      activities: Math.round(totalBudget * 0.18),
      transport: Math.round(totalBudget * 0.12)
    },
    days: mockDays,
    hotels: [
      {
        name: `Grand ${inputs.destination.split(',')[0]} Haven`,
        type: inputs.budgetLevel === 'Luxury' ? '5-Star Resort' : 'Boutique Hotel',
        pricePerNightUSD: Math.round((totalBudget * 0.4) / duration),
        rating: 4.8,
        amenities: ['Infinity Pool', 'Complimentary Breakfast', 'High-Speed Wi-Fi', 'Concierge Service'],
        description: `Prime central location near top attractions with luxurious modern comfort.`,
        locationArea: inputs.destination
      }
    ],
    packingChecklist: [
      { id: 'gen-p1', category: 'Essentials', item: 'Passport & Travel Documents', isPacked: true },
      { id: 'gen-p2', category: 'Gear & Tech', item: 'Universal Power Adapter & Power Bank', isPacked: false },
      { id: 'gen-p3', category: 'Clothing', item: 'Weather-appropriate clothing layers', isPacked: false },
      { id: 'gen-p4', category: 'Health & Toiletries', item: 'Personal first-aid kit & medications', isPacked: false }
    ],
    createdAt: new Date().toISOString()
  };
}
