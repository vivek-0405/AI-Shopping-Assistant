import React from 'react'
import { Sparkles, ShoppingBag, Clock, Heart, List, BarChart3, Plus, Trash2 } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

export function Sidebar() {
  const { recentMissions, removeRecentMission, setActivePage, activePage, clearMission } = useAppStore()

  return (
    <aside className="w-64 glass border-r border-white/10 dark:border-white/5 flex flex-col h-full select-none p-4 space-y-6">
      {/* New Mission Button */}
      <button
        onClick={() => {
          clearMission()
          setActivePage('agent')
        }}
        className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-98"
      >
        <Plus className="w-4 h-4" />
        <span>New AI Mission</span>
      </button>

      {/* Navigation Options */}
      <div className="space-y-1">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Navigation</p>
        
        <button
          onClick={() => setActivePage('agent')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activePage === 'agent'
              ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span>AI Shopping Agent</span>
        </button>

        <button
          onClick={() => setActivePage('growth')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activePage === 'growth'
              ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span>Growth Dashboard</span>
        </button>

        <button
          onClick={() => setActivePage('saved')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activePage === 'saved'
              ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-400" />
          <span>Saved Products</span>
        </button>

        <button
          onClick={() => setActivePage('list')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            activePage === 'list'
              ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <List className="w-4 h-4 text-emerald-400" />
          <span>Shopping List</span>
        </button>
      </div>

      {/* Recent History */}
      <div className="flex-1 overflow-y-auto space-y-2">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">Recent Searches</p>
        
        {recentMissions.length === 0 ? (
          <p className="text-xs text-slate-500 italic px-2">No recent searches yet.</p>
        ) : (
          recentMissions.map((m) => (
            <div
              key={m.id}
              className="group flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs text-slate-300 cursor-pointer"
              onClick={() => setActivePage('agent')}
            >
              <div className="flex items-center gap-2 truncate">
                <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{m.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeRecentMission(m.id)
                }}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  )
}
