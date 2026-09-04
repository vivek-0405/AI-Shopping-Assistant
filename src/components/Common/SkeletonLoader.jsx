import { motion } from 'framer-motion'

export function SkeletonLine({ width = 'full', height = 4 }) {
  return (
    <div
      className={`skeleton w-${width} h-${height} rounded-md`}
      aria-hidden="true"
    />
  )
}

export function ProductSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="glass rounded-2xl p-6 space-y-4"
    >
      <div className="skeleton w-full h-40 rounded-xl" />
      <div className="space-y-2">
        <div className="skeleton w-3/4 h-5" />
        <div className="skeleton w-1/2 h-4" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton w-1/3 h-8 rounded-lg" />
        <div className="skeleton w-1/4 h-8 rounded-lg" />
      </div>
      <div className="space-y-2">
        <div className="skeleton w-full h-3" />
        <div className="skeleton w-5/6 h-3" />
        <div className="skeleton w-4/6 h-3" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton w-full h-10 rounded-xl" />
        <div className="skeleton w-10 h-10 rounded-xl" />
      </div>
    </motion.div>
  )
}

export function AgentSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading AI response...">
      <div className="glass rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="skeleton w-10 h-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <div className="skeleton w-1/2 h-5" />
            <div className="skeleton w-1/3 h-3" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="skeleton w-full h-3" />
          <div className="skeleton w-5/6 h-3" />
          <div className="skeleton w-4/6 h-3" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function InsightSkeleton() {
  return (
    <div className="glass rounded-2xl p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="skeleton w-1/3 h-5" />
        <div className="skeleton w-16 h-8 rounded-full" />
      </div>
      <div className="skeleton w-full h-3" />
      <div className="skeleton w-5/6 h-3" />
      <div className="skeleton w-4/6 h-3" />
      <div className="flex gap-2 pt-2">
        <div className="skeleton w-24 h-8 rounded-lg" />
        <div className="skeleton w-24 h-8 rounded-lg" />
      </div>
    </div>
  )
}