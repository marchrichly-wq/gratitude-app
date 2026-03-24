export default function InputArea({ readingNote, setReadingNote, onGenerate, isLoading }) {
  return (
    <div className="mb-8">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        📖 今天的讀書心得
      </label>
      <textarea
        value={readingNote}
        onChange={e => setReadingNote(e.target.value)}
        placeholder="例如：今天讀了《原子習慣》第三章，裡面提到「微小的改變會產生複利效應」，讓我想到每天只要進步 1%，一年後就會成長 37 倍。書中用了英國自行車隊的故事來說明，他們透過改善每一個微小環節（枕頭、座墊、洗手乳），最終在奧運拿下金牌..."
        rows={6}
        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm leading-relaxed transition-all resize-none placeholder:text-gray-300"
      />
      <div className="flex items-center justify-between mt-3">
        <p className="text-xs text-gray-400">
          寫下你讀了哪本書、哪個章節、印象深刻的觀點或金句
        </p>
        <button
          onClick={onGenerate}
          disabled={isLoading || !readingNote.trim()}
          className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg disabled:shadow-none transition-all cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? '生成中...' : '✨ 轉化為爆款貼文'}
        </button>
      </div>
    </div>
  )
}
