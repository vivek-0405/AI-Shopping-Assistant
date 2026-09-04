import { parseAIResponse } from '../ai'
import { ShoppingMissionSchema } from '@/schemas/shopping'

export async function geminiGenerateShoppingMission(userInput, signal) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is not configured')

  const prompt = `You are GrowthPilot AI, an expert e-commerce shopping recommendation agent.
Analyze the user search query: "${userInput}"

STRICT INSTRUCTIONS:
1. EXACT CATEGORY MATCHING: Identify the exact product type requested in "${userInput}".
   - If the user asks for a "t-shirt", "tshirt", "t shirt", or "tee", you MUST ONLY recommend T-shirts (round neck, V-neck, oversized, polo tees). Do NOT recommend button-down casual shirts or dress shirts!
   - If the user asks for "shoes", recommend ONLY shoes.
   - If the user asks for "laptop", recommend ONLY laptops.
2. STRICT BUDGET CAP: Check if the user specified a price limit (e.g. "under 500", "below 1000", "under 50000").
   - Extract the numerical budget limit in INR.
   - Every recommended product's "price" MUST be LESS THAN OR EQUAL to this budget limit!
3. REAL PRODUCTS & STORES IN INDIA:
   - Provide 4 to 6 real, highly rated products available in India.
   - Use authentic Indian shopping store names: "Amazon India", "Flipkart", "Myntra", "Ajio", "Croma", "Nike India", "Reliance Digital", "Tata CLiQ".
4. ACCURATE MEDIA & LINKS:
   - Provide relevant, working Unsplash image URLs matching the product type (e.g. t-shirt images for t-shirts).
   - Use store search URLs like "https://www.amazon.in/s?k=product+name".

Return ONLY valid JSON matching this EXACT structure (no markdown formatting, no text before or after):
{
  "mission": {
    "title": "${userInput}",
    "budget": 500,
    "currency": "INR",
    "preferences": ["Best rated", "Under budget", "High quality"],
    "category": "Apparel",
    "urgency": "Medium"
  },
  "recommendations": [
    {
      "id": "product-1",
      "name": "Full Product Name",
      "brand": "Brand Name",
      "store": "Myntra",
      "url": "https://www.myntra.com/search?q=product",
      "price": 399,
      "originalPrice": 899,
      "currency": "INR",
      "rating": 4.5,
      "reviews": 1200,
      "matchScore": 96,
      "availability": "In Stock",
      "delivery": "1-2 days",
      "features": ["Feature 1", "Feature 2", "Feature 3"],
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1"],
      "recommendationReason": "Best choice under budget for your search.",
      "badges": ["Best Overall", "Best Value"],
      "category": "T-Shirts",
      "image": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
      "imageColor": "#6171f3",
      "matchBreakdown": {
        "budgetFit": 98,
        "featureFit": 95,
        "brandPreference": 90,
        "quality": 94,
        "reviews": 92,
        "value": 96,
        "availability": 95
      }
    }
  ],
  "comparison": {
    "bestOverall": "product-1",
    "bestValue": "product-1",
    "bestPremium": "product-2",
    "bestBudget": "product-3"
  },
  "nextActions": [
    "Compare top choices",
    "Check size chart",
    "Track price changes"
  ],
  "agentInsight": "Analyzed top recommendations matching your budget and product preference across Indian e-commerce platforms."
}`

  const modelsToTry = [
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-pro'
  ]

  let lastError = null

  for (const model of modelsToTry) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: 'application/json'
            },
          }),
          signal,
        }
      )

      if (!response.ok) {
        const errorJson = await response.json().catch(() => null)
        const detail = errorJson?.error?.message || response.statusText
        if (response.status === 401 || response.status === 403) {
          throw new Error(`Gemini API Authentication Failed (${response.status}): ${detail}. Please verify VITE_GEMINI_API_KEY in .env.`)
        }
        throw new Error(`Gemini API error ${response.status} (${model}): ${detail}`)
      }

      const data = await response.json()
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text

      if (!rawText) throw new Error(`Empty response from Gemini API model ${model}`)

      const parsed = parseAIResponse(rawText)
      const result = ShoppingMissionSchema.safeParse(parsed)

      if (!result.success) {
        console.error('Gemini response validation failed:', result.error)
        throw new Error('Gemini response schema validation failed.')
      }

      return result.data
    } catch (err) {
      lastError = err
      if (err.message.includes('Authentication Failed')) {
        throw err // Don't loop if API key is invalid
      }
    }
  }

  throw lastError || new Error('Failed to generate response from Gemini API')
}