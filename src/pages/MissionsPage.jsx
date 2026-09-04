import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Trash2, Target } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { formatCurrency, formatRelativeTime } from '@/utils/format'
import { EmptyState } from '@/components/Common/EmptyState'

export function MissionsPage() {
  const { recentMissions, removeRecentMission, setActivePage } = useAppStore()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
          <Clock className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">AI Missions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{recentMissions.length} past missions</p>
        </div>
      </div>

      {recentMissions.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No missions yet"
          description="Launch your first AI shopping mission to see it here."
          action={
            <button onClick={() => setActivePage('agent')} className="btn-primary">
              Start First Mission
            </button>
          }
        />
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {recentMissions.map((mission, i) => (
              <motion.div
                key={mission.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500/20 to-accent-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-brand-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1">{mission.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {formatCurrency(mission.budget, mission.currency || 'INR')}
                    </span>
                    {mission.matchScore > 0 && (
                      <span className="text-xs font-semibold text-brand-500">
                        {mission.matchScore}% Match
                      </span>
                    )}
                    <span className="text-xs text-slate-400">{formatRelativeTime(mission.timestamp)}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      removeRecentMission(mission.id)
                    }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    aria-label="Delete mission"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}