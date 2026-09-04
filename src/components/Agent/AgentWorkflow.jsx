import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, Circle, Loader, AlertCircle } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { useEffect, useState } from 'react'

const STAGES = [
  { id: 'intent', label: 'Intent Understanding', desc: 'Analyzing your request' },
  { id: 'discovery', label: 'Product Discovery', desc: 'Searching catalog' },
  { id: 'matching', label: 'Preference Matching', desc: 'Aligning with your profile' },
  { id: 'pricing', label: 'Price Analysis', desc: 'Evaluating value' },
  { id: 'comparison', label: 'Product Comparison', desc: 'Ranking results' },
  { id: 'recommendation', label: 'Final Recommendation', desc: 'Optimizing selection' },
]

function StageItem({ stage, status }) {
  const icons = {
    completed: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    analyzing: (
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
        <Loader className="w-5 h-5 text-brand-500" />
      </motion.div>
    ),
    pending: <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
        status === 'analyzing'
          ? 'bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800'
          : status === 'completed'
          ? 'opacity-70'
          : 'opacity-40'
      }`}
    >
      {icons[status]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">{stage.label}</p>
        {status === 'analyzing' && (
          <p className="text-xs text-slate-500 dark:text-slate-400">{stage.desc}</p>
        )}
      </div>
      {status === 'analyzing' && (
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-brand-500 rounded-full"
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export function AgentWorkflow() {
  const { agentState } = useAppStore()
  const [currentStage, setCurrentStage] = useState(0)

  useEffect(() => {
    if (agentState !== 'loading') {
      if (agentState === 'success') setCurrentStage(STAGES.length)
      else setCurrentStage(0)
      return
    }

    setCurrentStage(0)
    const intervals = STAGES.map((_, i) =>
      setTimeout(() => setCurrentStage(i + 1), i * 450)
    )

    return () => intervals.forEach(clearTimeout)
  }, [agentState])

  if (agentState !== 'loading') return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/25">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          >
            <Loader className="w-5 h-5 text-white" />
          </motion.div>
        </div>
        <div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">AI Agent Working</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Processing your shopping mission...</p>
        </div>
      </div>

      <div className="space-y-2">
        {STAGES.map((stage, i) => {
          const status =
            i < currentStage - 1
              ? 'completed'
              : i === currentStage - 1
              ? 'analyzing'
              : 'pending'
          return <StageItem key={stage.id} stage={stage} status={status} />
        })}
      </div>
    </motion.div>
  )
}