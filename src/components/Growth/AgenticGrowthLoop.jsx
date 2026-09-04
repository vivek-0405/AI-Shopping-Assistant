import { motion } from 'framer-motion'

const LOOP_STAGES = [
  { label: 'Observe', desc: 'Collect signals', color: '#6171f3' },
  { label: 'Understand', desc: 'Extract intent', color: '#818cf8' },
  { label: 'Predict', desc: 'Model outcomes', color: '#d946ef' },
  { label: 'Recommend', desc: 'Surface actions', color: '#e879f9' },
  { label: 'Act', desc: 'Execute decisions', color: '#10b981' },
  { label: 'Measure', desc: 'Track results', color: '#34d399' },
  { label: 'Learn', desc: 'Update models', color: '#f59e0b' },
  { label: 'Optimize', desc: 'Improve loop', color: '#fbbf24' },
]

export function AgenticGrowthLoop() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="text-center mb-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Agentic Growth Loop</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Continuous AI optimization cycle</p>
      </div>

      <div className="relative flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-full max-w-sm" aria-label="Agentic growth loop diagram">
          {LOOP_STAGES.map((stage, i) => {
            const angle = (i / LOOP_STAGES.length) * Math.PI * 2 - Math.PI / 2
            const r = 140
            const x = 200 + r * Math.cos(angle)
            const y = 200 + r * Math.sin(angle)

            return (
              <motion.g
                key={stage.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <motion.circle
                  cx={x}
                  cy={y}
                  r={28}
                  fill={`${stage.color}22`}
                  stroke={stage.color}
                  strokeWidth={2}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                />
                <text
                  x={x}
                  y={y - 4}
                  textAnchor="middle"
                  className="fill-current text-slate-900 dark:text-white"
                  fontSize={8}
                  fontWeight="700"
                  fill="currentColor"
                >
                  {stage.label}
                </text>
                <text
                  x={x}
                  y={y + 9}
                  textAnchor="middle"
                  fontSize={6}
                  fill={stage.color}
                >
                  {stage.desc}
                </text>
              </motion.g>
            )
          })}

          {/* Center */}
          <motion.circle
            cx={200}
            cy={200}
            r={45}
            fill="url(#center-gradient)"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <defs>
            <radialGradient id="center-gradient">
              <stop offset="0%" stopColor="#6171f3" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <text x={200} y={196} textAnchor="middle" fontSize={9} fontWeight="800" fill="#6171f3">
            Growth
          </text>
          <text x={200} y={208} textAnchor="middle" fontSize={9} fontWeight="800" fill="#d946ef">
            Pilot AI
          </text>

          {/* Animated arrows */}
          <motion.circle
            cx={200}
            cy={60}
            r={4}
            fill="#6171f3"
            animate={{
              cx: LOOP_STAGES.map((_, i) => {
                const angle = (i / LOOP_STAGES.length) * Math.PI * 2 - Math.PI / 2
                return 200 + 140 * Math.cos(angle)
              }),
              cy: LOOP_STAGES.map((_, i) => {
                const angle = (i / LOOP_STAGES.length) * Math.PI * 2 - Math.PI / 2
                return 200 + 140 * Math.sin(angle)
              }),
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            opacity={0.7}
          />
        </svg>
      </div>
    </div>
  )
}