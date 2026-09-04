import React from 'react'
import { Sparkles, User, ExternalLink, Star, CheckCircle, ShieldCheck } from 'lucide-react'

export function Message({ role, content, recommendations, sources, timestamp }) {
  const isUser = role === 'user'

  return (
    <div className={`flex gap-4 p-4 rounded-2xl ${isUser ? 'bg-violet-950/20 border border-violet-500/20 ml-8' : 'bg-slate-900/40 border border-white/10 mr-8'}`}>
      {/* Avatar Icon */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-violet-600 text-white' : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'}`}>
        {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
      </div>

      <div className="flex-1 space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">
            {isUser ? 'You' : 'GrowthPilot AI Agent'}
          </span>
          {timestamp && <span className="text-[10px] text-slate-500">{timestamp}</span>}
        </div>

        {/* Message Text */}
        <p className="text-sm text-slate-200 leading-relaxed">{content}</p>

        {/* Multi-site Product Recommendations */}
        {recommendations && recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {recommendations.slice(0, 4).map((item) => (
              <div key={item.id} className="p-3 bg-slate-800/80 border border-slate-700/60 rounded-xl space-y-2">
                <div className="flex items-start justify-between">
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.name}</h4>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    ${item.price}
                  </span>
                </div>
                
                <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-700/40">
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {item.rating}
                  </span>

                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-400 hover:text-violet-300 flex items-center gap-1 font-medium"
                    >
                      <span>View Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Live Web Sources */}
        {sources && sources.length > 0 && (
          <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Verified Sources:</span>
            {sources.map((src, i) => (
              <a
                key={i}
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-400 hover:underline flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20"
              >
                <ShieldCheck className="w-3 h-3 text-indigo-400" />
                <span>{src.replace(/^https?:\/\//, '').split('/')[0]}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
