import { useState } from 'react'
import { getRandomBook, getCategories } from '../data/bookList'

export default function InputArea({
  bookTitle, setBookTitle,
  readingNote, setReadingNote,
  onGenerate, onRandomRecommend,
  isLoading, isSearching,
}) {
  const [showCategories, setShowCategories] = useState(false)
  const categories = getCategories()

  const handleRandomPick = (category) => {
    const book = getRandomBook(category)
    setBookTitle(`${book.title}`)
    setShowCategories(false)
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
              onClick={() => setShowCategories(!showCategories)}
              disabled={isLoading || isSearching}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-300 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg disabled:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
            >
              🎲 隨機推薦
            </button>

            {showCategories && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowCategories(false)} />
                <div className="absolute right-0 top-full mt-2 z-20 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl p-2 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    選擇書單類別
                  </div>
                  {categories.map(cat => {
                    const emojis = { '理財': '💰', '成功心理學': '🧠', '經營管理': '📊', '個人成長': '🌱', '自律生活': '⏰', '溝通技巧': '💬', '男女兩性': '❤️' }
                    return (
                      <button
                        key={cat}
                        onClick={() => handleRandomPick(cat)}
                        className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 rounded-xl transition-colors cursor-pointer"
                      >
                        {emojis[cat] || '📚'} {cat}
                      </button>
                    )
                  })}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => handleRandomPick(null)}
                      className="w-full text-left px-3 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-xl transition-colors cursor-pointer"
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

      {/* Search Status */}
      {isSearching && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-100 rounded-xl">
          <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          <span className="text-xs text-blue-700 font-medium">正在聯網搜尋書本背景資料...</span>
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
