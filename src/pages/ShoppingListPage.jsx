import { motion, AnimatePresence, Reorder } from 'framer-motion'
import { List, Check, Trash2, Plus, Copy, Download } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { formatCurrency } from '@/utils/format'
import { EmptyState } from '@/components/Common/EmptyState'

function ListItem({ item }) {
  const { togglePurchased, removeFromShoppingList, updateListItem } = useAppStore()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`glass rounded-xl p-4 flex items-center gap-4 transition-all ${
        item.purchased ? 'opacity-60' : ''
      }`}
    >
      <button
        onClick={() => togglePurchased(item.listId)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
          item.purchased
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-slate-300 dark:border-slate-600 hover:border-brand-500'
        }`}
        aria-label={item.purchased ? 'Mark as not purchased' : 'Mark as purchased'}
      >
        {item.purchased && <Check className="w-3.5 h-3.5" />}
      </button>

      <div className="flex-1 min-w-0">
        <p className={`font-semibold text-slate-900 dark:text-white text-sm ${item.purchased ? 'line-through' : ''}`}>
          {item.name}
        </p>
        <p className="text-xs text-slate-400">{item.brand}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 glass rounded-lg px-2 py-1">
          <button
            onClick={() => updateListItem(item.listId, { quantity: Math.max(1, item.quantity - 1) })}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 w-5 h-5 flex items-center justify-center"
          >
            −
          </button>
          <span className="text-sm font-bold text-slate-900 dark:text-white w-5 text-center">{item.quantity}</span>
          <button
            onClick={() => updateListItem(item.listId, { quantity: item.quantity + 1 })}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 w-5 h-5 flex items-center justify-center"
          >
            +
          </button>
        </div>
        <span className="text-sm font-bold text-slate-900 dark:text-white w-24 text-right">
          {formatCurrency(item.price * item.quantity, item.currency || 'INR')}
        </span>
        <button
          onClick={() => removeFromShoppingList(item.listId)}
          className="text-slate-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export function ShoppingListPage() {
  const { shoppingList, clearShoppingList } = useAppStore()

  const total = shoppingList.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const purchased = shoppingList.filter((i) => i.purchased)
  const pending = shoppingList.filter((i) => !i.purchased)

  const handleCopy = () => {
    const text = shoppingList
      .map((i) => `• ${i.name} (${i.brand}) x${i.quantity} - ${formatCurrency(i.price * i.quantity, 'INR')}`)
      .join('\n')
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <List className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Shopping List</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {pending.length} pending · {purchased.length} purchased
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {shoppingList.length > 0 && (
            <>
              <button onClick={handleCopy} className="btn-secondary text-sm flex items-center gap-1.5">
                <Copy className="w-4 h-4" /> Copy
              </button>
              <button
                onClick={() => { clearShoppingList(); }}
                className="btn-secondary text-sm flex items-center gap-1.5 text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </>
          )}
        </div>
      </div>

      {shoppingList.length === 0 ? (
        <EmptyState
          icon={List}
          title="Your shopping list is empty"
          description="Add products from AI recommendations to build your shopping list."
        />
      ) : (
        <div className="space-y-6">
          {pending.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                To Buy ({pending.length})
              </h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {pending.map((item) => <ListItem key={item.listId} item={item} />)}
                </AnimatePresence>
              </div>
            </div>
          )}

          {purchased.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wider">
                Purchased ({purchased.length})
              </h2>
              <div className="space-y-3">
                <AnimatePresence>
                  {purchased.map((item) => <ListItem key={item.listId} item={item} />)}
                </AnimatePresence>
              </div>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Total Estimate</p>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-white">{formatCurrency(total, 'INR')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">{shoppingList.length} items</p>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {purchased.length}/{shoppingList.length} done
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}