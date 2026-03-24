// Curated book list for random recommendation
// Categories: 理財, 成功心理學, 經營管理, 個人成長, 自律生活, 溝通技巧, 男女兩性

const BOOK_LIST = [
  // 理財
  { title: '富爸爸，窮爸爸', author: 'Robert Kiyosaki', category: '理財', emoji: '💰' },
  { title: '巴比倫最富有的人', author: 'George S. Clason', category: '理財', emoji: '💰' },
  { title: '投資最重要的事', author: 'Howard Marks', category: '理財', emoji: '💰' },
  { title: '窮查理的普通常識', author: 'Charlie Munger', category: '理財', emoji: '💰' },
  { title: '致富心態', author: 'Morgan Housel', category: '理財', emoji: '💰' },
  { title: '漫步華爾街', author: 'Burton Malkiel', category: '理財', emoji: '💰' },
  { title: '有錢人想的和你不一樣', author: 'T. Harv Eker', category: '理財', emoji: '💰' },
  { title: '財務自由之路', author: 'Bodo Schäfer', category: '理財', emoji: '💰' },

  // 成功心理學
  { title: '心態致勝', author: 'Carol Dweck', category: '成功心理學', emoji: '🧠' },
  { title: '刻意練習', author: 'Anders Ericsson', category: '成功心理學', emoji: '🧠' },
  { title: '恆毅力', author: 'Angela Duckworth', category: '成功心理學', emoji: '🧠' },
  { title: '異數', author: 'Malcolm Gladwell', category: '成功心理學', emoji: '🧠' },
  { title: '快思慢想', author: 'Daniel Kahneman', category: '成功心理學', emoji: '🧠' },
  { title: '影響力', author: 'Robert Cialdini', category: '成功心理學', emoji: '🧠' },
  { title: '動機，單純的力量', author: 'Daniel Pink', category: '成功心理學', emoji: '🧠' },
  { title: '高績效心智', author: 'Brendon Burchard', category: '成功心理學', emoji: '🧠' },

  // 經營管理
  { title: '從 A 到 A+', author: 'Jim Collins', category: '經營管理', emoji: '📊' },
  { title: '精實創業', author: 'Eric Ries', category: '經營管理', emoji: '📊' },
  { title: '什麼才是經營最難的事？', author: 'Ben Horowitz', category: '經營管理', emoji: '📊' },
  { title: '賈伯斯傳', author: 'Walter Isaacson', category: '經營管理', emoji: '📊' },
  { title: '給力', author: 'Patty McCord', category: '經營管理', emoji: '📊' },
  { title: '零規則', author: 'Reed Hastings', category: '經營管理', emoji: '📊' },
  { title: '高產出的本事', author: 'Andy Grove', category: '經營管理', emoji: '📊' },
  { title: '創新的兩難', author: 'Clayton Christensen', category: '經營管理', emoji: '📊' },

  // 個人成長
  { title: '原子習慣', author: 'James Clear', category: '個人成長', emoji: '🌱' },
  { title: '被討厭的勇氣', author: '岸見一郎', category: '個人成長', emoji: '🌱' },
  { title: '活出意義來', author: 'Viktor Frankl', category: '個人成長', emoji: '🌱' },
  { title: '與成功有約', author: 'Stephen Covey', category: '個人成長', emoji: '🌱' },
  { title: '僧人心態', author: 'Jay Shetty', category: '個人成長', emoji: '🌱' },
  { title: '脆弱的力量', author: 'Brené Brown', category: '個人成長', emoji: '🌱' },
  { title: '心流', author: 'Mihaly Csikszentmihalyi', category: '個人成長', emoji: '🌱' },
  { title: '底層邏輯', author: '劉潤', category: '個人成長', emoji: '🌱' },

  // 自律生活
  { title: '起床後的黃金一小時', author: 'Hal Elrod', category: '自律生活', emoji: '⏰' },
  { title: '深度工作力', author: 'Cal Newport', category: '自律生活', emoji: '⏰' },
  { title: '為什麼我們這樣生活，那樣工作？', author: 'Charles Duhigg', category: '自律生活', emoji: '⏰' },
  { title: '搞定！', author: 'David Allen', category: '自律生活', emoji: '⏰' },
  { title: '子彈思考整理術', author: 'Ryder Carroll', category: '自律生活', emoji: '⏰' },
  { title: '最有生產力的一年', author: 'Chris Bailey', category: '自律生活', emoji: '⏰' },
  { title: '極度專注力', author: 'Nir Eyal', category: '自律生活', emoji: '⏰' },
  { title: '每天最重要的 2 小時', author: 'Josh Davis', category: '自律生活', emoji: '⏰' },

  // 溝通技巧
  { title: '非暴力溝通', author: 'Marshall Rosenberg', category: '溝通技巧', emoji: '💬' },
  { title: '華頓商學院最受歡迎的談判課', author: 'Stuart Diamond', category: '溝通技巧', emoji: '💬' },
  { title: '跟任何人都能聊得來', author: 'Leil Lowndes', category: '溝通技巧', emoji: '💬' },
  { title: '好好說話', author: '馬薇薇', category: '溝通技巧', emoji: '💬' },
  { title: '關鍵對話', author: 'Kerry Patterson', category: '溝通技巧', emoji: '💬' },
  { title: '說話的力量', author: 'Chris Anderson', category: '溝通技巧', emoji: '💬' },
  { title: '好好接話', author: '山口拓朗', category: '溝通技巧', emoji: '💬' },
  { title: '精準提問的力量', author: 'Frank Sesno', category: '溝通技巧', emoji: '💬' },

  // 男女兩性
  { title: '男人來自火星，女人來自金星', author: 'John Gray', category: '男女兩性', emoji: '❤️' },
  { title: '愛的五種語言', author: 'Gary Chapman', category: '男女兩性', emoji: '❤️' },
  { title: '親密關係', author: 'Rowland Miller', category: '男女兩性', emoji: '❤️' },
  { title: '依附', author: 'Amir Levine', category: '男女兩性', emoji: '❤️' },
  { title: '關係的藝術', author: 'John Gottman', category: '男女兩性', emoji: '❤️' },
  { title: '為何你不敢自在做自己？', author: 'Ilse Sand', category: '男女兩性', emoji: '❤️' },
  { title: '愛的藝術', author: 'Erich Fromm', category: '男女兩性', emoji: '❤️' },
  { title: '情緒勒索', author: 'Susan Forward', category: '男女兩性', emoji: '❤️' },
]

const CATEGORIES = [...new Set(BOOK_LIST.map(b => b.category))]

export function getCategories() {
  return CATEGORIES
}

export function getRandomBook(category) {
  const pool = category
    ? BOOK_LIST.filter(b => b.category === category)
    : BOOK_LIST
  return pool[Math.floor(Math.random() * pool.length)]
}

export function getBooksByCategory(category) {
  return BOOK_LIST.filter(b => b.category === category)
}

export default BOOK_LIST
