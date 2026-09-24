import { TripPlan, TripFormInputs, ActivityItem } from '../types/trip';
import { generateMockTripFromInputs, ALTERNATIVE_ACTIVITIES_POOL } from './mockData';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent';

export function getStoredApiKey(): string | null {
  return localStorage.getItem('FLAM_GEMINI_API_KEY') || (import.meta as any).env?.VITE_GEMINI_API_KEY || null;
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem('FLAM_GEMINI_API_KEY', key);
}

export function clearStoredApiKey(): void {
  localStorage.removeItem('FLAM_GEMINI_API_KEY');
}

export async function generateTripWithAI(inputs: TripFormInputs, userApiKey?: string): Promise<TripPlan> {
  const apiKey = userApiKey || getStoredApiKey();

  if (!apiKey) {
    await new Promise((res) => setTimeout(res, 1200));
    return generateMockTripFromInputs(inputs);
  }

  const prompt = `
You are a master world-class travel architect and local guide. Create a detailed structured JSON trip itinerary for an Indian traveler using Gemini 3.1 Flash Lite.

TRIP REQUIREMENTS:
- Destination: ${inputs.destination}
- Duration: ${inputs.durationDays} days
- Group Size: ${inputs.travelersCount} travelers
- Budget Tier: ${inputs.budgetLevel}
- Travel Style / Vibe: ${inputs.travelStyle}
- Currency Format: ALL COSTS MUST BE IN INDIAN RUPEES (INR / ₹)
- Specific Interests: ${inputs.interests.join(', ') || 'Local food, sightseeing, culture'}
${inputs.specialRequests ? `- Special Requests: ${inputs.specialRequests}` : ''}

CRITICAL RULES:
1. Return strictly valid raw JSON only. Do not wrap in backticks (\`\`\`json).
2. All financial values (budgetBreakdown, estimatedBudgetINR, costINR, pricePerNightINR) MUST be realistic numbers in Indian Rupees (INR / ₹).
3. Follow this exact JSON schema:
{
  "id": "trip-${Date.now()}",
  "tripTitle": "Catchy Trip Title",
  "destination": "${inputs.destination}",
  "durationDays": ${inputs.durationDays},
  "travelersCount": ${inputs.travelersCount},
  "estimatedBudgetINR": number,
  "currencySymbol": "₹",
  "travelStyle": "${inputs.travelStyle}",
  "heroImageUrl": "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
  "overview": "2-3 sentence overview of trip vibe.",
  "budgetBreakdown": {
    "accommodation": number,
    "food": number,
    "activities": number,
    "transport": number
  },
  "days": [
    {
      "dayNumber": 1,
      "title": "Day title",
      "theme": "Day theme",
      "activities": [
        {
          "id": "act-1-1",
          "timeOfDay": "Morning",
          "title": "Activity name",
          "description": "Engaging 1-2 sentence description.",
          "location": "Specific landmark/neighborhood name",
          "costINR": number,
          "category": "Sightseeing" | "Food & Dining" | "Culture" | "Outdoor" | "Shopping" | "Nightlife",
          "tips": "Practical tip"
        }
      ]
    }
  ],
  "hotels": [
    {
      "name": "Hotel Name",
      "type": "Hotel category",
      "pricePerNightINR": number,
      "rating": 4.8,
      "amenities": ["Wi-Fi", "Pool", "Breakfast"],
      "description": "Short description",
      "locationArea": "Area name"
    }
  ],
  "packingChecklist": [
    {
      "id": "p1",
      "category": "Essentials" | "Clothing" | "Gear & Tech" | "Health & Toiletries",
      "item": "Item name",
      "isPacked": false
    }
  ]
}

Provide exactly ${inputs.durationDays} days. Each day MUST contain exactly 3 activities (1 Morning, 1 Afternoon, 1 Evening).
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Gemini API Error, using realistic fallback:', errText);
      return generateMockTripFromInputs(inputs);
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      return generateMockTripFromInputs(inputs);
    }

    const cleanedJson = candidateText.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
    const parsedTrip: TripPlan = JSON.parse(cleanedJson);
    parsedTrip.currencySymbol = '₹';
    parsedTrip.createdAt = new Date().toISOString();
    return parsedTrip;
  } catch (error) {
    console.error('Error generating trip with Gemini API:', error);
    return generateMockTripFromInputs(inputs);
  }
}

export async function swapActivityWithAI(
  destination: string,
  currentActivity: ActivityItem,
  userApiKey?: string
): Promise<ActivityItem> {
  const apiKey = userApiKey || getStoredApiKey();

  if (!apiKey) {
    const pool = ALTERNATIVE_ACTIVITIES_POOL[currentActivity.timeOfDay] || ALTERNATIVE_ACTIVITIES_POOL['Morning'];
    const randomChoice = pool[Math.floor(Math.random() * pool.length)];
    return {
      ...randomChoice,
      id: `swapped-${Date.now()}`
    };
  }

  const prompt = `
Give me ONE alternative replacement activity in ${destination} for a ${currentActivity.timeOfDay} slot for an Indian traveler using Gemini 3.1 Flash Lite.
It should be different from "${currentActivity.title}".

Return STRICT RAW JSON only matching this schema:
{
  "id": "swapped-${Date.now()}",
  "timeOfDay": "${currentActivity.timeOfDay}",
  "title": "New Activity Title",
  "description": "Short engaging description.",
  "location": "Neighborhood or venue name",
  "costINR": number in Indian Rupees,
  "category": "Sightseeing" | "Food & Dining" | "Culture" | "Outdoor" | "Shopping" | "Nightlife",
  "tips": "Pro travel tip"
}
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.8,
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) throw new Error('API Swap failed');
    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const cleaned = raw.replace(/^```json\s*/i, '').replace(/\s*```$/, '').trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn('Swap activity AI call failed, falling back to local pool:', err);
    const pool = ALTERNATIVE_ACTIVITIES_POOL[currentActivity.timeOfDay] || ALTERNATIVE_ACTIVITIES_POOL['Morning'];
    const choice = pool[Math.floor(Math.random() * pool.length)];
    return {
      ...choice,
      id: `swapped-${Date.now()}`
    };
  }
}
