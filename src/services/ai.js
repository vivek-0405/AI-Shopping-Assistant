import { mockGenerateShoppingMission, mockGenerateGrowthDashboard } from './mockAi'
import { openaiGenerateShoppingMission } from './providers/openai'
import { geminiGenerateShoppingMission } from './providers/gemini'

const geminiKey = import.meta.env.VITE_GEMINI_API_KEY
const openaiKey = import.meta.env.VITE_OPENAI_API_KEY

const isGeminiValid = geminiKey && geminiKey.startsWith('AIzaSy')
const isOpenAIValid = Boolean(openaiKey)

const USE_MOCK = !isGeminiValid && !isOpenAIValid

export function getProvider() {
  if (isGeminiValid) return 'gemini'
  if (isOpenAIValid) return 'openai'
  return 'mock'
}

export async function generateShoppingMission(userInput, signal) {
  if (USE_MOCK) {
    return mockGenerateShoppingMission(userInput, signal)
  }

  const provider = getProvider()

  try {
    switch (provider) {
      case 'gemini':
        return await geminiGenerateShoppingMission(userInput, signal)
      case 'openai':
        return await openaiGenerateShoppingMission(userInput, signal)
      default:
        return await mockGenerateShoppingMission(userInput, signal)
    }
  } catch (err) {
    console.warn(`[AI Engine] ${provider} call failed: ${err.message}. Falling back to AI simulation mode.`)
    return await mockGenerateShoppingMission(userInput, signal)
  }
}

export async function generateGrowthDashboard(signal) {
  return mockGenerateGrowthDashboard(signal)
}

export function parseAIResponse(rawText) {
  let text = rawText.trim()

  text = text.replace(/```json\n?/gi, '').replace(/```\n?/g, '')

  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    text = jsonMatch[0]
  }

  try {
    return JSON.parse(text)
  } catch {
    throw new Error('Failed to parse AI response as JSON')
  }
}