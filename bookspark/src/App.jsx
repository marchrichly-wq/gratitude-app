import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { generatePosts } from './api/claude'
import SettingsPanel from './components/SettingsPanel'
import InputArea from './components/InputArea'
import LoadingState from './components/LoadingState'
import ResultCard from './components/ResultCard'

function App() {
  // Persistent settings (localStorage)
  const [apiKey, setApiKey] = useLocalStorage('bookspark_api_key', '')
  const [creatorPosition, setCreatorPosition] = useLocalStorage('bookspark_creator_position', '')
  const [coreValues, setCoreValues] = useLocalStorage('bookspark_core_values', '')

  // Dynamic state
  const [readingNote, setReadingNote] = useState('')
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

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
      const data = await generatePosts(apiKey, creatorPosition, coreValues, readingNote)
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
          creatorPosition={creatorPosition}
          setCreatorPosition={setCreatorPosition}
          coreValues={coreValues}
          setCoreValues={setCoreValues}
        />

        {/* Input */}
        <InputArea
          readingNote={readingNote}
          setReadingNote={setReadingNote}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

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
        {!isLoading && !results && !error && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-4">📖</div>
            <p className="text-sm">在上方輸入你的讀書心得，AI 將幫你轉化為社群爆款貼文</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-gray-400">
        BookSpark — 使用 Claude Sonnet 4.6 驅動 · React + Tailwind CSS
      </footer>
    </div>
  )
}

export default App
