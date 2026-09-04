import { motion } from 'framer-motion'
import { CheckCircle, X, Trophy, Tag, Gem, Wallet } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { formatCurrency } from '@/utils/format'

const BADGE_ICONS = {
  bestOverall: { icon: Trophy, label: 'Best Overall', color: 'text-brand-500' },
  bestValue: { icon: Tag, label: 'Best Value', color: 'text-emerald-500' },
  bestPremium: { icon: Gem, label: 'Best Premium', color: 'text-purple-500' },
  bestBudget: { icon: Wallet, label: 'Best Budget', color: 'text-amber-500' },
}

export function ComparisonTable() {
  const { currentMission, compareList, removeFromCompare, clearCompare } = useAppStore()

  if (!currentMission || compareList.length < 2) return null

  const products = compareList
    .map((id) => currentMission.recommendations.find((p) => p.id === id))
    .filter(Boolean)

  const { comparison } = currentMission

  const getWinnerBadge = (productId) => {
    return Object.entries(BADGE_ICONS)
      .filter(([key]) => comparison[key] === productId)
      .map(([key, val]) => val)
  }

  const COMPARE_ROWS = [
    { label: 'Store', render: (p) => p.store || 'Online Retailer' },
    { label: 'Price', render: (p) => formatCurrency(p.price, p.currency) },
    { label: 'Rating', render: (p) => `${p.rating} ⭐ (${p.reviews.toLocaleString()})` },
    { label: 'AI Match', render: (p) => `${p.matchScore}%` },
    { label: 'Availability', render: (p) => p.availability },
    { label: 'Delivery', render: (p) => p.delivery },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Product Comparison</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Side-by-side analysis by AI agent</p>
        </div>
        <button
          onClick={clearCompare}
          className="text-xs px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-all"
        >
          Close Comparison
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left px-6 py-4 text-slate-500 dark:text-slate-400 font-medium w-32">Feature</th>
              {products.map((p) => {
                const badges = getWinnerBadge(p.id)
                return (
                  <th key={p.id} className="px-4 py-4 text-center">
                    <div className="space-y-1">
                      <button
                        onClick={() => removeFromCompare(p.id)}
                        className="float-right text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        aria-label={`Remove ${p.name} from comparison`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="font-bold text-slate-900 dark:text-white text-left line-clamp-1">{p.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs text-left">{p.brand}</p>
                      {badges.map(({ icon: Icon, label, color }) => (
                        <div key={label} className={`flex items-center gap-1 text-xs font-semibold ${color}`}>
                          <Icon className="w-3 h-3" />
                          {label}
                        </div>
                      ))}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {COMPARE_ROWS.map(({ label, render }) => (
              <tr key={label} className="border-t border-slate-100 dark:border-white/5 transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">{label}</td>
                {products.map((p) => (
                  <td key={p.id} className="px-4 py-4 text-center font-semibold text-slate-900 dark:text-white">
                    {render(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t border-slate-100 dark:border-white/5 transition-colors hover:bg-slate-50/50 dark:hover:bg-white/5">
              <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium">Key Features</td>
              {products.map((p) => (
                <td key={p.id} className="px-4 py-4">
                  <ul className="space-y-1">
                    {p.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}