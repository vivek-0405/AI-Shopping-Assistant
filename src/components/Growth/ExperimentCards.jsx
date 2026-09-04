import { motion } from 'framer-motion'
import { FlaskConical, Rocket, BookmarkCheck, Edit3 } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import confetti from 'canvas-confetti'

const EFFORT_CONFIG = {
  Low: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
  Medium: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  High: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
}

export function ExperimentCards({ experiments }) {
  const { launchedExperiments, toggleExperiment } = useAppStore()

  const handleLaunchToggle = (exp) => {
    const isCurrentlyLaunched = launchedExperiments.includes(exp.id)
    toggleExperiment(exp.id)

    if (!isCurrentlyLaunched) {
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } })
    }
  }

  return (
    <div className="space-y-4">
      {experiments.map((exp, i) => {
        const launched = launchedExperiments.includes(exp.id)

        return (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`glass rounded-2xl p-6 transition-all ${launched ? 'border border-emerald-200 dark:border-emerald-800' : ''}`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                launched ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-brand-50 dark:bg-brand-900/20'
              }`}>
                <FlaskConical className={`w-5 h-5 ${launched ? 'text-emerald-500' : 'text-brand-500'}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">{exp.title}</h4>
                  {launched && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full">
                      ✓ Live
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${EFFORT_CONFIG[exp.effort]}`}>
                    {exp.effort} Effort
                  </span>
                  {exp.segment && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400">
                      {exp.segment}
                    </span>
                  )}
                  {exp.confidence && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                      {exp.confidence}% confidence
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Hypothesis: </span>
                  {exp.hypothesis}
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Primary Metric</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{exp.metric}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Expected Impact</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{exp.expectedImpact}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5 pt-4 border-t border-slate-100 dark:border-white/5">
              <button
                onClick={() => handleLaunchToggle(exp)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  launched
                    ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/40'
                    : 'btn-primary'
                }`}
                title={launched ? 'Click to reset experiment' : 'Click to launch experiment'}
              >
                <Rocket className="w-4 h-4" />
                {launched ? 'Running' : 'Launch Experiment'}
              </button>
              <button
                className="btn-secondary text-sm py-2.5 px-4 flex items-center gap-1.5"
              >
                <BookmarkCheck className="w-4 h-4" />
                Save
              </button>
              <button
                className="btn-secondary text-sm py-2.5 px-3"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}