import { useState } from 'react'
import { getRandomBook, getCategories } from '../data/bookList'

const CATEGORY_EMOJIS = {
  '理財': '💰', '成功心理學': '🧠', '經營管理': '📊',
  '個人成長': '🌱', '自律生活': '⏰', '溝通技巧': '💬', '男女兩性': '❤️',
}

export default function InputArea({
  bookTitle, setBookTitle,
  readingNote, setReadingNote,
  onGenerate, onRandomRecommend, onFetchTrending,
  isLoading, isSearching,
  trendingBooks, isFetchingTrending,
}) {
  const [showCategories, setShowCategories] = useState(false)
  const [showTrending, setShowTrending] = useState(false)
  const categories = getCategories()

  // Fallback to static list
  const handleStaticPick = (category) => {
    const book = getRandomBook(category)
    setBookTitle(book.title)
    setShowCategories(false)
    if (onRandomRecommend) {
      onRandomRecommend(book)
    }
  }

  // Fetch live trending books
  const handleFetchCategory = async (category) => {
    setShowCategories(false)
    setShowTrending(true)
    if (onFetchTrending) {
      await onFetchTrending(category)
    }
  }

  // Pick from trending results
  const handlePickTrending = (book) => {
    setBookTitle(book.title)
    setShowTrending(false)
    if (onRandomRecommend) {
      onRandomRecommend(book)
    }
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Book Title Field */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📕 書名
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={bookTitle}
            onChange={e => setBookTitle(e.target.value)}
            placeholder="例如：原子習慣、被討厭的勇氣、致富心態..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all"
          />
          <div className="relative">
            <button
              onClick={() => { setShowCategories(!showCategories); setShowTrending(false) }}
              disabled={isLoading || isSearching || isFetchingTrending}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg disabled:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
            >
              🎲 隨機推薦
            </button>

            {/* Category Picker Dropdown */}
            {showCategories && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowCategories(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 w-64 bg-white rounded-2xl border border-gray-100 shadow-xl p-2">
                  <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    選擇書單類別
                  </div>

                  {/* Live trending section */}
                  <div className="px-3 py-1.5 text-xs font-semibold text-green-600 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    即時搜尋最新熱門書
                  </div>
                  {categories.map(cat => (
                    <button
                      key={`live-${cat}`}
                      onClick={() => handleFetchCategory(cat)}
                      className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{CATEGORY_EMOJIS[cat] || '📚'} {cat}</span>
                      <span className="text-xs text-green-400">🔍 即時</span>
                    </button>
                  ))}

                  <div className="border-t border-gray-100 mt-1.5 pt-1.5">
                    <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 flex items-center gap-1.5">
                      離線書單（不需 Gemini）
                    </div>
                    {categories.map(cat => (
                      <button
                        key={`static-${cat}`}
                        onClick={() => handleStaticPick(cat)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-500 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors cursor-pointer"
                      >
                        {CATEGORY_EMOJIS[cat] || '📚'} {cat}
                      </button>
                    ))}
                    <button
                      onClick={() => handleStaticPick(null)}
                      className="w-full text-left px-3 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-xl transition-colors cursor-pointer"
                    >
                      🎯 全類別隨機
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          輸入書名後，AI 會自動聯網搜尋書本背景資料，讓貼文更有深度
        </p>
      </div>

      {/* Fetching Trending Status */}
      {isFetchingTrending && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-100 rounded-xl">
          <div className="w-4 h-4 border-2 border-green-300 border-t-green-600 rounded-full animate-spin" />
          <span className="text-xs text-green-700 font-medium">正在即時搜尋最新熱門書單...</span>
        </div>
      )}

      {/* Trending Books Results */}
      {showTrending && trendingBooks && !isFetchingTrending && (
        <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-green-800">🔥 即時熱門書單</span>
              {trendingBooks.source_hint && (
                <span className="text-xs text-green-500">({trendingBooks.source_hint})</span>
              )}
            </div>
            <button
              onClick={() => setShowTrending(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {trendingBooks.books?.map((book, i) => (
              <button
                key={i}
                onClick={() => handlePickTrending(book)}
                disabled={isSearching}
                className="text-left p-3 bg-white/80 hover:bg-white rounded-xl border border-green-100 hover:border-green-300 hover:shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">
                      《{book.title}》
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {book.author} {book.year && `· ${book.year}`}
                    </div>
                  </div>
                  <span className="flex-shrink-0 text-lg">{CATEGORY_EMOJIS[book.category] || '📚'}</span>
                </div>
                {book.hot_reason && (
                  <div className="text-xs text-orange-600 mt-1.5 bg-orange-50 px-2 py-0.5 rounded-md inline-block">
                    🔥 {book.hot_reason}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Status */}
      {isSearching && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-xs text-blue-700 font-medium">正在聯網搜尋書本背景資料並生成讀書心得...</span>
        </div>
      )}

      {/* Reading Note */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📖 今天的讀書心得
          <span className="text-xs text-gray-400 font-normal ml-2">（使用隨機推薦時會自動填入）</span>
        </label>
        <textarea
          value={readingNote}
          onChange={e => setReadingNote(e.target.value)}
          placeholder="例如：今天讀了《原子習慣》第三章，裡面提到「微小的改變會產生複利效應」，讓我想到每天只要進步 1%，一年後就會成長 37 倍。書中用了英國自行車隊的故事來說明，他們透過改善每一個微小環節（枕頭、座墊、洗手乳），最終在奧運拿下金牌..."
          rows={6}
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm leading-relaxed transition-all resize-none placeholder:text-gray-300"
        />
      </div>

      {/* Generate Button */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          寫下你讀了哪本書、哪個章節、印象深刻的觀點或金句
        </p>
        <button
          onClick={onGenerate}
          disabled={isLoading || isSearching || !readingNote.trim()}
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg disabled:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? '生成中...' : '✨ 轉化為爆款貼文'}
        </button>
      </div>
    </div>
  )
}
