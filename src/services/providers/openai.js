import { parseAIResponse } from '../ai'
import { ShoppingMissionSchema } from '@/schemas/shopping'

const SYSTEM_PROMPT = `You are a shopping AI agent. You MUST respond with ONLY valid JSON, no markdown, no explanation.
Return a JSON object matching this exact structure:
{
  "mission": { "title": string, "budget": number, "currency": "INR", "preferences": string[], "category": string, "urgency": "Low"|"Medium"|"High" },
  "recommendations": [{ "id": string, "name": string, "brand": string, "price": number, "originalPrice": number, "currency": "INR", "rating": number(0-5), "reviews": number, "matchScore": number(0-100), "availability": "In Stock"|"Low Stock"|"Out of Stock"|"Pre-order", "delivery": string, "features": string[], "pros": string[], "cons": string[], "recommendationReason": string, "badges": ("Best Overall"|"Best Value"|"Best Premium"|"Best Budget"|"Editor's Choice"|"Popular")[], "matchBreakdown": { "budgetFit": number, "featureFit": number, "brandPreference": number, "quality": number, "reviews": number, "value": number, "availability": number } }],
  "comparison": { "bestOverall": string, "bestValue": string, "bestPremium": string, "bestBudget": string },
  "nextActions": string[],
  "agentInsight": string
}
Return 3 realistic product recommendations. All prices in INR.`

export async function openaiGenerateShoppingMission(userInput, signal) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userInput },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
    signal,
  })

  if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`)

  const data = await response.json()
  const rawText = data.choices?.[0]?.message?.content

  if (!rawText) throw new Error('Empty response from OpenAI')

  const parsed = parseAIResponse(rawText)
  const result = ShoppingMissionSchema.safeParse(parsed)

  if (!result.success) {
    console.error('OpenAI response validation failed:', result.error)
    throw new Error('AI response did not match expected schema')
  }

  return result.data
}