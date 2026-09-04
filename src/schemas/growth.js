import { z } from 'zod'

export const GrowthInsightSchema = z.object({
  id: z.string().min(1),
  type: z.enum(['conversion', 'revenue', 'retention', 'acquisition', 'engagement']),
  title: z.string().min(1).max(150),
  description: z.string().min(1).max(500),
  opportunityScore: z.number().min(0).max(100),
  expectedImpact: z.string().max(50),
  recommendedAction: z.string().max(300),
  effort: z.enum(['Low', 'Medium', 'High']).optional(),
  timeframe: z.string().max(50).optional(),
})

export const CustomerSegmentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  description: z.string().max(300),
  size: z.number().int().nonnegative(),
  conversionRate: z.number().min(0).max(100),
  averageOrderValue: z.number().nonnegative(),
  revenue: z.number().nonnegative(),
  growthOpportunity: z.string().max(200),
  traits: z.array(z.string().max(100)).max(6),
  color: z.string().optional(),
})

export const ExperimentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(150),
  hypothesis: z.string().min(1).max(400),
  metric: z.string().max(50),
  expectedImpact: z.string().max(50),
  effort: z.enum(['Low', 'Medium', 'High']),
  confidence: z.number().min(0).max(100).optional(),
  segment: z.string().max(100).optional(),
})

export const GrowthDashboardSchema = z.object({
  insights: z.array(GrowthInsightSchema).max(10),
  segments: z.array(CustomerSegmentSchema).max(8),
  experiments: z.array(ExperimentSchema).max(6),
})