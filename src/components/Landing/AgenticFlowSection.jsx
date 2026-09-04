import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const STAGES = [
  { label: 'User Goal', desc: 'Natural language input', color: '#6171f3' },
  { label: 'Intent Understanding', desc: 'Context extraction', color: '#818cf8' },
  { label: 'Product Discovery', desc: 'Catalog search', color: '#a5bbfc' },
  { label: 'Preference Matching', desc: 'Profile alignment', color: '#d946ef' },
  { label: 'Price Analysis', desc: 'Value assessment', color: '#e879f9' },
  { label: 'Product Comparison', desc: 'Feature matrix', color: '#10b981' },
  { label: 'Recommendation', desc: 'Ranked results', color: '#34d399' },
  { label: 'Purchase Optimization', desc: 'Best offer selection', color: '#f59e0b' },
  { label: 'Follow-up Monitoring', desc: 'Continuous tracking', color: '#fbbf24' },
]

export function AgenticFlowSection() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
          The Agentic Commerce Flow
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Watch your shopping goal transform through 9 intelligent agent stages, each optimizing for the perfect outcome.
        </p>
      </motion.div>

      <div className="flex flex-col items-center gap-0">
        {STAGES.map((stage, i) => (
          <div key={i} className="flex flex-col items-center w-full max-w-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.04 }}
              className="glass rounded-2xl px-6 py-4 w-full text-center border-l-4"
              style={{ borderLeftColor: stage.color }}
            >
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{stage.label}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{stage.desc}</p>
                </div>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: stage.color }}
                >
                  {i + 1}
                </div>
              </div>
            </motion.div>
            {i < STAGES.length - 1 && (
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 + 0.05 }}
                className="flex flex-col items-center py-1"
              >
                <ArrowDown className="w-4 h-4 text-slate-300 dark:text-slate-600" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}