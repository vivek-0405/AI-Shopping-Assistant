import React, { useState } from 'react'
import { Send, Sparkles, Loader2 } from 'lucide-react'
import { Message } from './Message'
import { useAppStore } from '@/store/useAppStore'

export function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content: 'Hello! I am GrowthPilot AI, your multi-site agentic shopping engine. What product or market search would you like me to analyze today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ])
  const [loading, setLoading] = useState(false)
  const { setCurrentMission, addRecentMission } = useAppStore()

  const handleSend = async (e) => {
    e.preventDefault()
    const query = input.trim()
    if (!query || loading) return

    const userMsg = {
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, session_id: 'session-1' })
      })

      const data = await res.json()
      if (data.success && data.data) {
        const agentData = data.data
        const agentMsg = {
          role: 'agent',
          content: agentData.mission.summary,
          recommendations: agentData.recommendations,
          sources: agentData.sources,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setMessages((prev) => [...prev, agentMsg])

        // Store mission in app state
        setCurrentMission(agentData)
        addRecentMission({
          title: agentData.mission.title,
          budget: agentData.mission.budget,
          currency: 'USD',
          matchScore: agentData.recommendations[0]?.matchScore || 90,
          productCount: agentData.recommendations.length
        })
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'agent',
            content: 'I encountered an issue processing your request across online sites. Please try again.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ])
      }
    } catch (err) {
      console.error('Agent chat error:', err)
      setMessages((prev) => [
        ...prev,
        {
          role: 'agent',
          content: 'Failed to connect to Python backend AI agent server.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full glass rounded-3xl border border-white/10 overflow-hidden">
      {/* Messages Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">GrowthPilot Multi-Site Agent Chat</h3>
            <p className="text-[11px] text-slate-400">Live web & product aggregator engine</p>
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <Message key={i} {...msg} />
        ))}

        {loading && (
          <div className="flex items-center gap-3 p-4 text-sm text-violet-300 italic">
            <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
            <span>Analyzing multi-site products & querying live web data...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-slate-900/80 backdrop-blur-md flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask AI agent to find, compare or analyze products across sites..."
          className="flex-1 bg-slate-800/90 text-white placeholder-slate-400 text-sm px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="py-3 px-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-2 transition-all"
        >
          <Send className="w-4 h-4" />
          <span>Send</span>
        </button>
      </form>
    </div>
  )
}
