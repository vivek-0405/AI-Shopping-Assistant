import { useEffect, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, RefreshCw, AlertCircle } from 'lucide-react'
import { KPICards } from '@/components/Growth/KPICards'
import { InsightCards } from '@/components/Growth/InsightCards'
import { SegmentCards } from '@/components/Growth/SegmentCards'
import { ExperimentCards } from '@/components/Growth/ExperimentCards'
import { useAppStore } from '@/store/useAppStore'
import { generateGrowthDashboard } from '@/services/ai'
import { InsightSkeleton } from '@/components/Common/SkeletonLoader'

export function GrowthPage() {
  const { growthData, growthState, growthError, setGrowthData, setGrowthState } = useAppStore()

  useEffect(() => {
    if (growthData || growthState === 'loading') return

    const controller = new AbortController()
    setGrowthState('loading')

    generateGrowthDashboard(controller.signal)
      .then((data) => setGrowthData(data))
      .catch((err) => {
        if (err.message === 'Request aborted') return
        setGrowthState('error', err.message)
      })

    return () => controller.abort()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-accent-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">AI Growth Command Center</h1>
            </div>
          </div>
          <button
            onClick={() => {
              setGrowthState('idle')
            }}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Error state */}
      {growthState === 'error' && (
        <div className="glass rounded-2xl p-8 text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-slate-700 dark:text-slate-300 font-semibold mb-2">Failed to load growth data</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{growthError}</p>
        </div>
      )}

      {/* KPIs */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance Overview</h2>
        <KPICards />
      </section>

      {/* Customer Segments */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Customer Segments</h2>
        {growthData ? (
          <SegmentCards segments={growthData.segments} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <InsightSkeleton key={i} />)}
          </div>
        )}
      </section>

      {/* Growth Insights */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Growth Opportunities</h2>
        <InsightCards insights={growthData?.insights || []} loading={growthState === 'loading'} />
      </section>

      {/* Experiments */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">AI Growth Experiments</h2>
        {growthData ? (
          <ExperimentCards experiments={growthData.experiments} />
        ) : growthState === 'loading' ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <InsightSkeleton key={i} />)}
          </div>
        ) : null}
      </section>
    </div>
  )
}