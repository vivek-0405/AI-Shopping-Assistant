import { HeroSection } from './HeroSection'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, Star } from 'lucide-react'

const stats = [
  { label: 'AI Missions Completed', value: '2.4M+', icon: Zap },
  { label: 'Products Analyzed', value: '18M+', icon: Star },
  { label: 'Active Agents', value: '94K+', icon: Users },
  { label: 'Growth Opportunities', value: '₹482Cr+', icon: TrendingUp },
]

export function LandingPage() {
  return (
    <div>
      <HeroSection />

      {/* Stats bar */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map(({ label, value, icon: Icon }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <Icon className="w-5 h-5 text-brand-500 mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{value}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  )
}