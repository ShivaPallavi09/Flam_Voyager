export type TravelStyle = 'Adventure' | 'Cultural' | 'Luxury' | 'Budget' | 'Foodie' | 'Relaxation';
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening';

export interface ActivityItem {
  id: string;
  timeOfDay: TimeOfDay;
  title: string;
  description: string;
  location: string;
  costINR: number;
  category: 'Sightseeing' | 'Food & Dining' | 'Culture' | 'Outdoor' | 'Shopping' | 'Nightlife';
  tips: string;
}

export interface DayItinerary {
  dayNumber: number;
  title: string;
  theme: string;
  activities: ActivityItem[];
}

export interface HotelRecommendation {
  name: string;
  type: string;
  pricePerNightINR: number;
  rating: number;
  amenities: string[];
  description: string;
  locationArea: string;
}

export interface PackingItem {
  id: string;
  category: 'Essentials' | 'Clothing' | 'Gear & Tech' | 'Health & Toiletries';
  item: string;
  isPacked?: boolean;
}

export interface BudgetBreakdown {
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
}

export interface TripPlan {
  id: string;
  tripTitle: string;
  destination: string;
  durationDays: number;
  travelersCount: number;
  estimatedBudgetINR: number;
  currencySymbol: string;
  travelStyle: TravelStyle;
  heroImageUrl: string;
  overview: string;
  budgetBreakdown: BudgetBreakdown;
  days: DayItinerary[];
  hotels: HotelRecommendation[];
  packingChecklist: PackingItem[];
  createdAt: string;
}

export interface TripFormInputs {
  destination: string;
  durationDays: number;
  travelersCount: number;
  budgetLevel: 'Budget' | 'Moderate' | 'Luxury';
  travelStyle: TravelStyle;
  interests: string[];
  specialRequests?: string;
}
