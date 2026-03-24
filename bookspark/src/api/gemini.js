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
