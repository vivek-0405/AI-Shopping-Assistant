import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(300),
  brand: z.string().min(1).max(200),
  price: z.number().positive(),
  originalPrice: z.number().positive().optional(),
  currency: z.string().default('INR'),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  matchScore: z.number().min(0).max(100),
  availability: z.string().default('In Stock'),
  delivery: z.string().max(200).optional(),
  features: z.array(z.string().max(300)).max(20).optional(),
  pros: z.array(z.string().max(300)).max(15).optional(),
  cons: z.array(z.string().max(300)).max(15).optional(),
  recommendationReason: z.string().max(2000).optional(),
  badges: z.array(z.string().max(100)).max(10).optional(),
  category: z.string().max(500).optional(),
  store: z.string().max(200).optional(),
  url: z.string().max(2000).optional(),
  image: z.string().optional(),
  imageColor: z.string().optional(),
  matchBreakdown: z.object({
    budgetFit: z.number().min(0).max(100),
    featureFit: z.number().min(0).max(100),
    brandPreference: z.number().min(0).max(100),
    quality: z.number().min(0).max(100),
    reviews: z.number().min(0).max(100),
    value: z.number().min(0).max(100),
    availability: z.number().min(0).max(100),
  }).optional(),
})

export const MissionSchema = z.object({
  title: z.string().min(1).max(500),
  budget: z.number().positive(),
  currency: z.string().default('INR'),
  preferences: z.array(z.string().max(300)).max(20).optional(),
  category: z.string().max(500).optional(),
  urgency: z.string().optional(),
})

export const ComparisonSchema = z.object({
  bestOverall: z.string().optional(),
  bestValue: z.string().optional(),
  bestPremium: z.string().optional(),
  bestBudget: z.string().optional(),
})

export const ShoppingMissionSchema = z.object({
  mission: MissionSchema,
  recommendations: z.array(ProductSchema).min(1).max(10),
  comparison: ComparisonSchema.optional(),
  nextActions: z.array(z.string().max(300)).max(15).optional(),
  agentInsight: z.string().max(2000).optional(),
})