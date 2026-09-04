import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/utils/format'

export function SegmentCards({ segments }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {segments.map((segment, i) => (
        <motion.div
          key={segment.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ y: -3 }}
          className="glass rounded-2xl p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${segment.color}22` }}
              >
                <Users className="w-5 h-5" style={{ color: segment.color }} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{segment.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{formatNumber(segment.size)} users</p>
              </div>
            </div>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            {segment.description}
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: 'Conversion', value: `${segment.conversionRate}%` },
              { label: 'AOV', value: formatCurrency(segment.averageOrderValue, 'INR') },
              { label: 'Revenue', value: formatNumber(segment.revenue) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 font-medium">{label}</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {segment.traits.map((trait, j) => (
              <span
                key={j}
                className="text-xs px-2.5 py-1 rounded-lg font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"
              >
                {trait}
              </span>
            ))}
          </div>

          <div className="bg-slate-100 dark:bg-white/5 rounded-xl p-3 border border-slate-200/50 dark:border-white/10">
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{segment.growthOpportunity}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}