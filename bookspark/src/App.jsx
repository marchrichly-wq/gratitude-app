import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generatePosts } from './api/claude'
import { searchBookInfo, generateReadingNoteFromBook, fetchTrendingBooks } from './api/gemini'
import SettingsPanel from './components/SettingsPanel'
import InputArea from './components/InputArea'
import BookInfoCard from './components/BookInfoCard'
import LoadingState from './components/LoadingState'
import ResultCard from './components/ResultCard'

function App() {
  // Persistent settings (localStorage)
  const [apiKey, setApiKey] = useLocalStorage('bookspark_api_key', '')
  const [geminiApiKey, setGeminiApiKey] = useLocalStorage('bookspark_gemini_api_key', '')
  const [creatorPosition, setCreatorPosition] = useLocalStorage('bookspark_creator_position', '')
  const [coreValues, setCoreValues] = useLocalStorage('bookspark_core_values', '')

  // Dynamic state
  const [bookTitle, setBookTitle] = useState('')
  const [readingNote, setReadingNote] = useState('')
  const [bookInfo, setBookInfo] = useState(null)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [trendingBooks, setTrendingBooks] = useState(null)
  const [isFetchingTrending, setIsFetchingTrending] = useState(false)
  const [error, setError] = useState('')

  // Search book info via Gemini
  const handleSearchBook = async (title) => {
    if (!geminiApiKey.trim() || !title) return null
    setIsSearching(true)
    try {
      const info = await searchBookInfo(geminiApiKey, title)
      setBookInfo(info)
      return info
    } catch (err) {
      console.warn('Book search failed:', err.message)
      return null
    } finally {
      setIsSearching(false)
    }
  }

  // Fetch live trending books by category
  const handleFetchTrending = async (category) => {
    if (!geminiApiKey.trim()) {
      setError('請先在「固定設定區」填入 Gemini API Key 以啟用即時熱門書單功能')
      return
    }

    setError('')
    setIsFetchingTrending(true)
    setTrendingBooks(null)

    try {
      const data = await fetchTrendingBooks(geminiApiKey, category)
      setTrendingBooks(data)
    } catch (err) {
      setError(`搜尋熱門書單失敗：${err.message}`)
    } finally {
      setIsFetchingTrending(false)
    }
  }

  // Random recommendation flow
  const handleRandomRecommend = async (book) => {
    if (!geminiApiKey.trim()) {
      setError('請先在「固定設定區」填入 Gemini API Key 以啟用聯網搜尋與隨機推薦功能')
      return
    }

    setError('')
    setResults(null)
    setBookInfo(null)
    setIsSearching(true)

    try {
      // Run both in parallel: search book info + generate reading note
      const [info, note] = await Promise.all([
        searchBookInfo(geminiApiKey, book.title),
        generateReadingNoteFromBook(geminiApiKey, book.title),
      ])

      setBookInfo(info)
      if (note) {
        setReadingNote(note)
      }
    } catch (err) {
      setError(`聯網搜尋失敗：${err.message}`)
    } finally {
      setIsSearching(false)
    }
  }

  // Main generate flow
  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError('請先在「固定設定區」填入您的 Anthropic API Key')
      return
    }
    if (!readingNote.trim()) {
      setError('請填寫您的讀書心得')
      return
    }

    setError('')
    setIsLoading(true)
    setResults(null)

    try {
      // If book title is provided but no book info yet, search first
      let context = bookInfo
      if (bookTitle.trim() && !context && geminiApiKey.trim()) {
        context = await handleSearchBook(bookTitle)
      }

      const data = await generatePosts(apiKey, creatorPosition, coreValues, readingNote, context)
      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50/30">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/70 border-b border-primary-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-lg shadow-md">
            📚
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">BookSpark</h1>
            <p className="text-xs text-gray-500">讀書心得靈感轉化器 — 將閱讀筆記轉化為爆款社群貼文</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Settings */}
        <SettingsPanel
          apiKey={apiKey}
          setApiKey={setApiKey}
          geminiApiKey={geminiApiKey}
          setGeminiApiKey={setGeminiApiKey}
          creatorPosition={creatorPosition}
          setCreatorPosition={setCreatorPosition}
          coreValues={coreValues}
          setCoreValues={setCoreValues}
        />

        {/* Input */}
        <InputArea
          bookTitle={bookTitle}
          setBookTitle={setBookTitle}
          readingNote={readingNote}
          setReadingNote={setReadingNote}
          onGenerate={handleGenerate}
          onRandomRecommend={handleRandomRecommend}
          onFetchTrending={handleFetchTrending}
          isLoading={isLoading}
          isSearching={isSearching}
          trendingBooks={trendingBooks}
          isFetchingTrending={isFetchingTrending}
        />

        {/* Book Info from Search */}
        {bookInfo && (
          <BookInfoCard bookInfo={bookInfo} onDismiss={() => setBookInfo(null)} />
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
            ⚠️ {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && <LoadingState />}

        {/* Results */}
        {results && results.versions && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-bold text-gray-800">✨ 生成結果</h2>
              <span className="text-xs text-gray-400">{results.versions.length} 個版本</span>
            </div>
            {results.versions.map((version, i) => (
              <ResultCard key={i} version={version} index={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !results && !error && !bookInfo && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📖</div>
            <p className="text-sm mb-2">在上方輸入你的讀書心得，AI 將幫你轉化為社群爆款貼文</p>
            <p className="text-xs text-gray-300">或點擊「🎲 隨機推薦」，今天不用看書也能產出爆款心得！</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400">
        BookSpark — Claude Sonnet 4.6 + Gemini Google Search Grounding · React + Tailwind CSS
      </footer>
    </div>
  )
}

export default App
