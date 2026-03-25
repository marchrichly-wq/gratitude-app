/**
 * Gemini API with Google Search Grounding
 * Uses Gemini to search for real book information to enrich content
 */

export async function searchBookInfo(geminiApiKey, bookTitle) {
  if (!geminiApiKey || !bookTitle) return null

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `請搜尋《${bookTitle}》這本書的相關資訊，並以繁體中文回傳以下內容的 JSON 格式：

{
  "book_title": "書名",
  "author": "作者全名",
  "author_background": "作者背景（50字內）",
  "core_thesis": "本書核心論點（100字內）",
  "key_chapters": ["重點章節或概念1", "重點章節或概念2", "重點章節或概念3"],
  "famous_quotes": ["經典金句1", "經典金句2", "經典金句3"],
  "why_popular": "為什麼這本書受歡迎（50字內）",
  "target_audience": "適合什麼樣的讀者（30字內）"
}

重要：請只回傳純 JSON，不要加任何 markdown 標記或額外文字。`,
              },
            ],
          },
        ],
        tools: [{ google_search: {} }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      err.error?.message || `Gemini API 請求失敗 (${response.status})`
    )
  }

  const data = await response.json()

  // Extract text from Gemini response (may have multiple parts)
  const parts = data.candidates?.[0]?.content?.parts || []
  const textPart = parts.find((p) => p.text)
  if (!textPart) {
    throw new Error('Gemini 未回傳有效內容')
  }

  try {
    const cleaned = textPart.text
      .replace(/^```json\s*/, '')
      .replace(/```\s*$/, '')
      .trim()
    return JSON.parse(cleaned)
  } catch {
    // If JSON parse fails, return raw text as fallback
    return { raw_info: textPart.text }
  }
}

/**
 * Fetch trending/popular books by category via Google Search Grounding
 * Returns a live list of books instead of relying on a static hardcoded list
 */
export async function fetchTrendingBooks(geminiApiKey, category) {
  if (!geminiApiKey) return null

  const categoryText = category || '理財、成功心理學、經營管理、個人成長、自律生活、溝通技巧、男女兩性'

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `請搜尋「${categoryText}」類別中，目前最新、最熱門、最多人討論的書籍。

要求：
1. 請搜尋 2024-2025 年最新的暢銷書、熱門書單、讀書社群推薦書目
2. 混合經典長銷書與近期新書
3. 優先選擇在台灣、華語圈有繁體中文版的書
4. 回傳 10 本書

請以 JSON 格式回傳：
{
  "books": [
    {
      "title": "書名（繁體中文）",
      "author": "作者",
      "category": "${category || '最佳分類'}",
      "year": "出版年份或最近版本年份",
      "hot_reason": "為什麼現在很熱門（20字內）"
    }
  ],
  "search_date": "搜尋日期",
  "source_hint": "資料來源提示（例如：博客來暢銷榜、Goodreads 等）"
}

重要：請只回傳純 JSON，不要加任何 markdown 標記或額外文字。`,
              },
            ],
          },
        ],
        tools: [{ google_search: {} }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2048,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      err.error?.message || `Gemini API 請求失敗 (${response.status})`
    )
  }

  const data = await response.json()
  const parts = data.candidates?.[0]?.content?.parts || []
  const textPart = parts.find((p) => p.text)
  if (!textPart) return null

  try {
    const cleaned = textPart.text
      .replace(/^```json\s*/, '')
      .replace(/```\s*$/, '')
      .trim()
    return JSON.parse(cleaned)
  } catch {
    return null
  }
}

/**
 * Generate a full reading note from book info (for random recommendation mode)
 */
export async function generateReadingNoteFromBook(geminiApiKey, bookTitle) {
  if (!geminiApiKey || !bookTitle) return null

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `請搜尋《${bookTitle}》這本書，然後模擬一位剛讀完這本書的讀者，用第一人稱寫出一段 200-300 字的讀書心得筆記。

要求：
1. 要提到書中具體的章節或概念
2. 要引用至少一句書中的經典金句（真實存在的）
3. 要寫出自己的感悟和聯想
4. 語氣要自然，像是真的在做筆記
5. 用繁體中文撰寫

請直接回傳讀書心得文字，不要加任何標題或額外格式。`,
              },
            ],
          },
        ],
        tools: [{ google_search: {} }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1024,
        },
      }),
    }
  )

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      err.error?.message || `Gemini API 請求失敗 (${response.status})`
    )
  }

  const data = await response.json()
  const parts = data.candidates?.[0]?.content?.parts || []
  const textPart = parts.find((p) => p.text)
  return textPart?.text || null
}
