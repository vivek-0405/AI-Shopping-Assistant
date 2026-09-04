import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Repeat, Zap, Target } from 'lucide-react'
import { useCountAnimation } from '@/hooks/useCountAnimation'

const KPI_DATA = [
  { label: 'Total Revenue', value: 48200000, prefix: '₹', suffix: '', format: 'currency', trend: +18.4, icon: DollarSign, color: 'from-brand-500 to-brand-600' },
  { label: 'Conversion Rate', value: 4.8, prefix: '', suffix: '%', format: 'decimal', trend: +1.2, icon: Target, color: 'from-emerald-500 to-emerald-600' },
  { label: 'Avg Order Value', value: 3200, prefix: '₹', suffix: '', format: 'number', trend: +8.7, icon: ShoppingCart, color: 'from-accent-500 to-accent-600' },
  { label: 'Customer LTV', value: 18500, prefix: '₹', suffix: '', format: 'number', trend: +22.1, icon: Users, color: 'from-amber-500 to-amber-600' },
  { label: 'Cart Abandonment', value: 68.4, prefix: '', suffix: '%', format: 'decimal', trend: -3.2, icon: ShoppingCart, color: 'from-red-500 to-red-600', invertTrend: true },
  { label: 'Repeat Rate', value: 34.2, prefix: '', suffix: '%', format: 'decimal', trend: +5.8, icon: Repeat, color: 'from-sky-500 to-sky-600' },
  { label: 'AI-Assisted Conv.', value: 12.4, prefix: '', suffix: '%', format: 'decimal', trend: +28.3, icon: Zap, color: 'from-purple-500 to-purple-600' },
  { label: 'Agent Revenue', value: 5800000, prefix: '₹', suffix: '', format: 'currency', trend: +41.2, icon: TrendingUp, color: 'from-teal-500 to-teal-600' },
]

function formatValue(value, format, prefix, suffix) {
  if (format === 'currency') {
    if (value >= 10000000) return `${prefix}${(value / 10000000).toFixed(1)}Cr${suffix}`
    if (value >= 100000) return `${prefix}${(value / 100000).toFixed(1)}L${suffix}`
    if (value >= 1000) return `${prefix}${(value / 1000).toFixed(1)}K${suffix}`
  }
  if (format === 'decimal') return `${prefix}${value.toFixed(1)}${suffix}`
  return `${prefix}${value.toLocaleString('en-IN')}${suffix}`
}

function KPICard({ kpi, index }) {
  const { label, value, prefix, suffix, format, trend, icon: Icon, color, invertTrend } = kpi
  const isPositive = invertTrend ? trend < 0 : trend > 0
  const TrendIcon = trend > 0 ? TrendingUp : TrendingDown

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          isPositive
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
            : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
        }`}>
          <TrendIcon className="w-3 h-3" />
          {Math.abs(trend)}%
        </div>
      </div>
      <p className="text-2xl font-extrabold text-slate-900 dark:text-white mb-1">
        {formatValue(value, format, prefix, suffix)}
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{label}</p>
    </motion.div>
  )
}

export function KPICards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {KPI_DATA.map((kpi, i) => (
        <KPICard key={i} kpi={kpi} index={i} />
      ))}
    </div>
  )
}