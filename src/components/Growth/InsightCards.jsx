import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Users, Target, ExternalLink, Plus, X } from 'lucide-react'
import { InsightSkeleton } from '@/components/Common/SkeletonLoader'

const TYPE_CONFIG = {
  conversion: { icon: Target, color: 'from-brand-500 to-brand-600', bg: 'bg-brand-50 dark:bg-brand-900/20', text: 'text-brand-600 dark:text-brand-400' },
  revenue: { icon: DollarSign, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400' },
  retention: { icon: Users, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400' },
  acquisition: { icon: TrendingUp, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' },
  engagement: { icon: Target, color: 'from-sky-500 to-sky-600', bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-600 dark:text-sky-400' },
}

function OpportunityScore({ score }) {
  const color = score >= 85 ? '#10b981' : score >= 70 ? '#f59e0b' : '#6171f3'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
      <span className="text-xs font-bold" style={{ color }}>{score}</span>
    </div>
  )
}

export function InsightCards({ insights, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => <InsightSkeleton key={i} />)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {insights.map((insight, i) => {
        const config = TYPE_CONFIG[insight.type] || TYPE_CONFIG.conversion
        const Icon = config.icon

        return (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            className="glass rounded-2xl p-6 flex flex-col gap-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className={`text-xs font-semibold ${config.text} ${config.bg} px-2 py-0.5 rounded-full capitalize`}>
                    {insight.type}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">{insight.title}</h4>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-slate-400 dark:text-slate-500">Impact</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{insight.expectedImpact}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{insight.description}</p>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Opportunity Score</p>
                <span className="text-xs text-slate-400">{insight.effort && `${insight.effort} effort`}</span>
              </div>
              <OpportunityScore score={insight.opportunityScore} />
            </div>

            <div className="bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Recommended Action</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{insight.recommendedAction}</p>
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 text-xs btn-primary py-2 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Create Experiment
              </button>
              <button
                className="text-xs btn-secondary py-2 px-3 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Ignore
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}