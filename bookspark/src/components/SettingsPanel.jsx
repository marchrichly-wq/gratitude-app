import { useState } from 'react'

export default function SettingsPanel({ apiKey, setApiKey, creatorPosition, setCreatorPosition, coreValues, setCoreValues }) {
  const [isOpen, setIsOpen] = useState(!apiKey)

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors cursor-pointer"
      >
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        固定設定區
        <span className="text-xs text-gray-400 font-normal">（自動記憶於瀏覽器）</span>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-4 p-5 bg-white rounded-2xl border border-primary-100 shadow-sm">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-ant-api03-..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
            />
            <p className="mt-1 text-xs text-gray-400">您的 Anthropic API Key，僅儲存於本地瀏覽器</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              🎯 創作者定位
            </label>
            <input
              type="text"
              value={creatorPosition}
              onChange={e => setCreatorPosition(e.target.value)}
              placeholder="例如：專注個人成長的知識型 YouTuber"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              💡 核心價值觀
            </label>
            <input
              type="text"
              value={coreValues}
              onChange={e => setCoreValues(e.target.value)}
              placeholder="例如：持續學習、知行合一、用故事啟發改變"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
            />
          </div>
        </div>
      )}
    </div>
  )
}
