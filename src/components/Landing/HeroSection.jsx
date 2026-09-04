import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Zap, TrendingUp, Shield } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

const floatingFeatures = [
  { icon: Sparkles, label: 'AI-Powered Discovery', color: 'from-brand-500 to-brand-600' },
  { icon: Zap, label: 'Agentic Commerce', color: 'from-accent-500 to-accent-600' },
  { icon: TrendingUp, label: 'Growth Intelligence', color: 'from-emerald-500 to-emerald-600' },
  { icon: Shield, label: 'Validated AI Output', color: 'from-amber-500 to-amber-600' },
]

export function HeroSection() {
  const { setActivePage } = useAppStore()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-500/20 dark:bg-brand-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 -right-32 w-96 h-96 bg-accent-500/20 dark:bg-accent-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-emerald-500/15 dark:bg-emerald-500/8 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-6 text-balance"
        >
          Turn Every Shopping Journey
          <br />
          Into an AI-Powered
          <br />
          Growth Opportunity
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 text-balance"
        >
          Let intelligent agents discover products, personalize experiences, optimize purchases,
          and uncover your next growth opportunity.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePage('agent')}
            className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4"
          >
            Start AI Shopping
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActivePage('growth')}
            className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4"
          >
            Explore Growth Insights
          </motion.button>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {floatingFeatures.map(({ icon: Icon, label, color }, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-4 text-center"
            >
              <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}