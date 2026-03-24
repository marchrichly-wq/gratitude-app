const LOADING_MESSAGES = [
  '正在為您萃取書中精華...',
  '正在套用爆款架構...',
  '正在打磨吸睛標題...',
  '正在組織知識脈絡...',
  '正在注入靈感能量...',
  '正在優化文案節奏...',
  '正在生成多角度版本...',
]

export function getRandomLoadingMessage() {
  return LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]
}

function buildSystemPrompt(creatorPosition, coreValues) {
  return `你是一位專業的說書人與知識萃取教練，同時也是社群爆款文案的高手。

## 你的身份背景
- 創作者定位：${creatorPosition || '知識型內容創作者'}
- 核心價值觀：${coreValues || '持續學習、知行合一、啟發他人'}

## 寫作風格
邏輯清晰、引人入勝、像朋友分享好書一樣自然親切，同時帶有專業深度。

## 文章架構要求
每篇內容必須嚴格符合以下架構：
1. **HOOK（吸引注意）**：用一句震撼人心的話或反直覺觀點開場，讓人忍不住往下看
2. **INSIGHT（書本洞察）**：萃取書中最精華的觀點，用淺顯易懂的方式解釋
3. **ACTION（落地應用）**：將書中智慧轉化為具體可執行的行動步驟

## 特殊要求
1. 每個版本必須包含 3 個具體的行動指南（用條列方式呈現）
2. 結尾必須有一個引導讀者分享自己看法的開放式提問
3. 加入適當的 emoji 增加可讀性（但不要過度使用）
4. 每篇字數控制在 300-500 字之間，適合社群平台閱讀

## 產出格式
請產出 3 種不同角度的版本，並以 JSON 格式回傳：

\`\`\`json
{
  "versions": [
    {
      "angle": "痛點解決",
      "title": "吸睛標題",
      "hook": "開場金句",
      "insight": "核心洞察段落",
      "actions": ["行動指南1", "行動指南2", "行動指南3"],
      "closing_question": "結尾互動提問",
      "full_post": "完整貼文（包含以上所有元素，排版適合直接貼上社群）"
    },
    {
      "angle": "心態啟發",
      "title": "...",
      "hook": "...",
      "insight": "...",
      "actions": ["...", "...", "..."],
      "closing_question": "...",
      "full_post": "..."
    },
    {
      "angle": "實戰步驟",
      "title": "...",
      "hook": "...",
      "insight": "...",
      "actions": ["...", "...", "..."],
      "closing_question": "...",
      "full_post": "..."
    }
  ]
}
\`\`\`

重要：請只回傳純 JSON，不要加任何 markdown 代碼塊標記或額外文字。`
}

export async function generatePosts(apiKey, creatorPosition, coreValues, readingNote) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6-20250514',
      max_tokens: 4096,
      system: buildSystemPrompt(creatorPosition, coreValues),
      messages: [
        {
          role: 'user',
          content: `以下是我今天的讀書心得與靈感筆記，請幫我轉化為 3 種不同角度的社群爆款貼文：

${readingNote}`,
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err.error?.message || `API 請求失敗 (${response.status})`)
  }

  const data = await response.json()
  const text = data.content[0].text

  try {
    const cleaned = text.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim()
    return JSON.parse(cleaned)
  } catch {
    throw new Error('AI 回傳格式解析失敗，請重試')
  }
}
