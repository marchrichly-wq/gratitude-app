import { useState } from 'react'

const ANGLE_COLORS = {
  '痛點解決': { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
  '心態啟發': { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  '實戰步驟': { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
}

function getColors(angle) {
  for (const [key, colors] of Object.entries(ANGLE_COLORS)) {
    if (angle.includes(key)) return colors
  }
  return { bg: 'bg-primary-50', border: 'border-primary-200', badge: 'bg-primary-100 text-primary-700' }
}

export default function ResultCard({ version, index }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(index === 0)
  const colors = getColors(version.angle)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(version.full_post)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = version.full_post
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className={`rounded-2xl border ${colors.border} ${colors.bg} overflow-hidden transition-all shadow-sm hover:shadow-md`}>
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
            版本 {index + 1}：{version.angle}
          </span>
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1">
            {version.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={e => { e.stopPropagation(); handleCopy() }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-white/80 hover:bg-white text-gray-600 hover:text-gray-800'
            }`}
          >
            {copied ? '✓ 已複製' : '📋 一鍵複製'}
          </button>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4">
          {/* Hook */}
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">🪝 Hook — 吸引注意</div>
            <p className="text-sm text-gray-700 leading-relaxed bg-white/60 rounded-xl p-3">
              {version.hook}
            </p>
          </div>

          {/* Insight */}
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">💎 Insight — 書本洞察</div>
            <p className="text-sm text-gray-700 leading-relaxed bg-white/60 rounded-xl p-3">
              {version.insight}
            </p>
          </div>

          {/* Actions */}
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">🚀 Action — 行動指南</div>
            <ul className="space-y-2">
              {version.actions.map((action, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white/60 rounded-xl p-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {action}
                </li>
              ))}
            </ul>
          </div>

          {/* Closing Question */}
          <div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">💬 互動提問</div>
            <p className="text-sm text-gray-700 leading-relaxed bg-white/60 rounded-xl p-3 italic">
              {version.closing_question}
            </p>
          </div>

          {/* Full Post Preview */}
          <div className="border-t border-gray-200/50 pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">📄 完整貼文預覽</div>
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-white hover:bg-gray-50 text-gray-600 border border-gray-200'
                }`}
              >
                {copied ? '✓ 已複製' : '📋 複製完整貼文'}
              </button>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed bg-white rounded-xl p-4 whitespace-pre-wrap border border-gray-100">
              {version.full_post}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
