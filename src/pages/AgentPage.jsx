import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, RefreshCw, AlertCircle, Target, Zap, ChevronRight } from 'lucide-react'
import { AgentInput } from '@/components/Agent/AgentInput'
import { AgentWorkflow } from '@/components/Agent/AgentWorkflow'
import { ProductGrid } from '@/components/Products/ProductGrid'
import { ComparisonTable } from '@/components/Comparison/ComparisonTable'
import { useAppStore } from '@/store/useAppStore'
import { MagentaDiamondLogo } from '@/components/Common/MagentaDiamondLogo'





function ErrorState({ error, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8 text-center"
    >
      <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-6 h-6 text-red-500" />
      </div>
      <h3 className="font-bold text-slate-900 dark:text-white mb-2">Agent Error</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">{error}</p>
      <button onClick={onRetry} className="btn-primary flex items-center gap-2 mx-auto">
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </motion.div>
  )
}

export function AgentPage() {
  const { currentMission, agentState, agentError, clearMission, compareList } = useAppStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <MagentaDiamondLogo className="w-8 h-8 flex-shrink-0" />
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">AI Shopping Agent</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm ml-11">
          Describe what you're looking for and let the agent find the best options.
        </p>
      </div>

      {/* Input */}
      <AgentInput />

      {/* Agent workflow animation */}
      <AnimatePresence>
        {agentState === 'loading' && <AgentWorkflow />}
      </AnimatePresence>

      {/* Error state */}
      <AnimatePresence>
        {agentState === 'error' && (
          <ErrorState error={agentError} onRetry={clearMission} />
        )}
      </AnimatePresence>

      {/* Mission results */}
      <AnimatePresence>
        {agentState === 'success' && currentMission && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >


            {/* Products */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 dark:text-white">
                  {currentMission.recommendations.length} Recommendations Found
                </h2>
                <button
                  onClick={clearMission}
                  className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  New Mission
                </button>
              </div>
              <ProductGrid products={currentMission.recommendations} />
            </div>

            {/* Comparison table */}
            {compareList.length >= 2 && (
              <div>
                <h2 className="font-bold text-slate-900 dark:text-white mb-4">Comparison</h2>
                <ComparisonTable />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}