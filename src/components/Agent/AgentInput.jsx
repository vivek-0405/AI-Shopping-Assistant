import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, Mic, X } from 'lucide-react'
import { useAgentRequest } from '@/hooks/useAgentRequest'
import { useAppStore } from '@/store/useAppStore'

const EXAMPLE_PROMPTS = [
  'Best laptop under ₹70,000 for AI development',
  'Running shoes under ₹8,000 for daily training',
  'Build a skincare routine under ₹3,000 for oily skin',
]

export function AgentInput() {
  const [query, setQuery] = useState('')
  const { agentState } = useAppStore()
  const { execute, cancel } = useAgentRequest()
  const inputRef = useRef(null)
  const isLoading = agentState === 'loading'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim() || isLoading) return
    execute(query.trim())
  }

  const handleExample = (prompt) => {
    setQuery(prompt)
    inputRef.current?.focus()
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <div className="glass rounded-2xl p-1.5 flex gap-2">
          <div className="flex-1 flex items-center gap-3 px-4">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tell the AI agent what you're looking for..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-base outline-none py-3"
              aria-label="Shopping query"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {isLoading ? (
            <button
              type="button"
              onClick={cancel}
              className="flex items-center gap-2 px-5 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-all"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          ) : (
            <motion.button
              type="submit"
              disabled={!query.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex items-center gap-2 py-3 px-5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:block">Launch Agent</span>
            </motion.button>
          )}
        </div>
      </form>

      {/* Example prompts */}
      {agentState === 'idle' && (
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleExample(prompt)}
              className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/5 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400 px-3 py-1.5 rounded-full transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}