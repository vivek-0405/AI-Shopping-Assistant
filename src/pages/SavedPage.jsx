import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Search, Trash2, SortAsc } from 'lucide-react'
import { useState, useMemo } from 'react'
import { useAppStore } from '@/store/useAppStore'
import { ProductCard } from '@/components/Products/ProductCard'
import { EmptyState } from '@/components/Common/EmptyState'
import { formatCurrency } from '@/utils/format'

export function SavedPage() {
  const { savedProducts, removeSavedProduct } = useAppStore()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('recent')

  const filtered = useMemo(() => {
    let items = [...savedProducts]
    if (search) {
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
    else if (sort === 'match') items.sort((a, b) => b.matchScore - a.matchScore)
    return items
  }, [savedProducts, search, sort])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
          <Heart className="w-4 h-4 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Saved Products</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{savedProducts.length} items saved</p>
        </div>
      </div>

      {savedProducts.length > 0 && (
        <div className="flex gap-3 mb-6 flex-wrap">
          <div className="flex-1 min-w-48 glass rounded-xl flex items-center gap-2 px-4 py-2.5">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved products..."
              className="flex-1 bg-transparent text-sm outline-none text-slate-900 dark:text-white placeholder-slate-400"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="glass rounded-xl px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 outline-none border border-slate-200 dark:border-white/10"
          >
            <option value="recent">Recent</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="match">Best Match</option>
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={Heart}
          title={savedProducts.length === 0 ? "No saved products yet" : "No results found"}
          description={
            savedProducts.length === 0
              ? "Start shopping with the AI agent and save products you love."
              : "Try a different search term."
          }
        />
      ) : (
        <AnimatePresence>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} showCompare={false} />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}