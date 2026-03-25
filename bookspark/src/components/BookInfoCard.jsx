export default function BookInfoCard({ bookInfo, onDismiss }) {
  if (!bookInfo || bookInfo.raw_info) return null

  return (
    <div className="mb-6 p-5 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔍</span>
          <h3 className="text-sm font-bold text-indigo-800">聯網搜尋結果</h3>
          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            Google Search Grounding
          </span>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Book & Author */}
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="text-base font-bold text-gray-900">
            《{bookInfo.book_title}》
          </span>
          <span className="text-sm text-gray-600">
            — {bookInfo.author}
          </span>
        </div>

        {bookInfo.author_background && (
          <p className="text-xs text-gray-500 bg-white/60 rounded-lg px-3 py-2">
            👤 {bookInfo.author_background}
          </p>
        )}

        {/* Core Thesis */}
        {bookInfo.core_thesis && (
          <div>
            <div className="text-xs font-bold text-indigo-600 mb-1">核心論點</div>
            <p className="text-sm text-gray-700 leading-relaxed">{bookInfo.core_thesis}</p>
          </div>
        )}

        {/* Key Chapters */}
        {bookInfo.key_chapters?.length > 0 && (
          <div>
            <div className="text-xs font-bold text-indigo-600 mb-1">重點概念</div>
            <div className="flex flex-wrap gap-2">
              {bookInfo.key_chapters.map((ch, i) => (
                <span key={i} className="px-2.5 py-1 bg-white/80 text-xs text-gray-700 rounded-lg border border-indigo-100">
                  {ch}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Famous Quotes */}
        {bookInfo.famous_quotes?.length > 0 && (
          <div>
            <div className="text-xs font-bold text-indigo-600 mb-1">經典金句</div>
            <div className="space-y-1.5">
              {bookInfo.famous_quotes.map((q, i) => (
                <p key={i} className="text-sm text-gray-700 italic bg-white/60 rounded-lg px-3 py-2 border-l-3 border-indigo-300">
                  「{q}」
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-3 pt-1 text-xs text-gray-500">
          {bookInfo.why_popular && <span>🔥 {bookInfo.why_popular}</span>}
          {bookInfo.target_audience && <span>🎯 {bookInfo.target_audience}</span>}
        </div>
      </div>

      <p className="mt-3 text-xs text-indigo-400 text-center">
        以上資料由 Gemini + Google Search 即時查詢，將自動融入 AI 生成的貼文中
      </p>
    </div>
  )
}
