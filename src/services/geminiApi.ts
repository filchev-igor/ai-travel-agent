import { GEMINI_API_KEY } from '@env';
import { TripData, TripVariant } from '../types';

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const buildPrompt = (tripData: TripData): string => {
  const { start, end, startDate, endDate, group, budget } = tripData;
  const days = Math.max(
    1,
    Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000)
  );
  console.log('[Gemini] Building prompt for trip:', tripData);
  return `You are an AI travel agent. A user wants to travel from ${start} to ${end} for ${days} days with a budget of $${budget} for ${group} person(s). Travel dates: ${startDate} to ${endDate}.

Generate exactly 3 different trip variants with different activities or accommodation styles.

Respond ONLY with valid JSON, no markdown, no explanation. Format:
{
  "variants": [
    {
      "title": "Trip suggestions - variant 1",
      "activities": "short description of 2-3 main activities",
      "flight": 120,
      "transportation": 40,
      "hospitality": 200,
      "activity1_name": "Museum visit",
      "activity1_cost": 25,
      "activity2_name": "Boat tour",
      "activity2_cost": 35,
      "total": 420
    }
  ]
}
Keep all costs realistic and within the $${budget} budget. Use USD.`;
};

const generateFallback = (tripData: TripData): TripVariant[] => {
  console.warn('[Gemini] Using fallback data');
  const b = parseInt(tripData.budget);
  return [
    {
      title: 'Trip suggestions - variant 1',
      activities: 'City sightseeing, museum visits, local cuisine',
      flight: Math.round(b * 0.25),
      transportation: Math.round(b * 0.08),
      hospitality: Math.round(b * 0.40),
      activity1_name: 'City museum',
      activity1_cost: Math.round(b * 0.07),
      activity2_name: 'Local food tour',
      activity2_cost: Math.round(b * 0.06),
      total: Math.round(b * 0.86),
    },
    {
      title: 'Trip suggestions - variant 2',
      activities: 'Nature excursions, boat tours, outdoor activities',
      flight: Math.round(b * 0.22),
      transportation: Math.round(b * 0.12),
      hospitality: Math.round(b * 0.35),
      activity1_name: 'Boat tour',
      activity1_cost: Math.round(b * 0.09),
      activity2_name: 'Hiking excursion',
      activity2_cost: Math.round(b * 0.05),
      total: Math.round(b * 0.83),
    },
    {
      title: 'Trip suggestions - variant 3',
      activities: 'Cultural events, theatre, fine dining',
      flight: Math.round(b * 0.28),
      transportation: Math.round(b * 0.06),
      hospitality: Math.round(b * 0.45),
      activity1_name: 'Theatre show',
      activity1_cost: Math.round(b * 0.08),
      activity2_name: 'Fine dining',
      activity2_cost: Math.round(b * 0.10),
      total: Math.round(b * 0.97),
    },
  ];
};

export const fetchTripVariants = async (tripData: TripData): Promise<TripVariant[]> => {
  console.log('[Gemini] Starting API call...');
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildPrompt(tripData) }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
      }),
    });
    console.log('[Gemini] Response status:', response.status);
    const data = await response.json();
    if (data.error) {
      console.error('[Gemini] API error:', data.error.message);
      return generateFallback(tripData);
    }
    let text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    console.log('[Gemini] Raw response length:', text.length);
    text = text.replace(/```json|```/g, '').trim();
    const parsed: { variants: TripVariant[] } = JSON.parse(text);
    console.log('[Gemini] Parsed', parsed.variants.length, 'variants');
    return parsed.variants;
  } catch (error) {
    console.error('[Gemini] Fetch failed:', (error as Error).message);
    return generateFallback(tripData);
  }
};
