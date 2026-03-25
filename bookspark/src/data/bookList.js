// Curated book list for random recommendation
// Categories: 理財, 成功心理學, 經營管理, 個人成長, 自律生活, 溝通技巧, 男女兩性

const BOOK_LIST = [
  // ═══════════════════════════════════════
  // 💰 理財 (25 本)
  // ═══════════════════════════════════════
  { title: '富爸爸，窮爸爸', author: 'Robert Kiyosaki', category: '理財', emoji: '💰' },
  { title: '巴比倫最富有的人', author: 'George S. Clason', category: '理財', emoji: '💰' },
  { title: '投資最重要的事', author: 'Howard Marks', category: '理財', emoji: '💰' },
  { title: '窮查理的普通常識', author: 'Charlie Munger', category: '理財', emoji: '💰' },
  { title: '致富心態', author: 'Morgan Housel', category: '理財', emoji: '💰' },
  { title: '漫步華爾街', author: 'Burton Malkiel', category: '理財', emoji: '💰' },
  { title: '有錢人想的和你不一樣', author: 'T. Harv Eker', category: '理財', emoji: '💰' },
  { title: '財務自由之路', author: 'Bodo Schäfer', category: '理財', emoji: '💰' },
  { title: '智慧型股票投資人', author: 'Benjamin Graham', category: '理財', emoji: '💰' },
  { title: '雪球：巴菲特傳', author: 'Alice Schroeder', category: '理財', emoji: '💰' },
  { title: '非典型經營者的成功法則', author: 'William Thorndike', category: '理財', emoji: '💰' },
  { title: '金錢心理學', author: 'Dan Ariely', category: '理財', emoji: '💰' },
  { title: '富足', author: 'Peter Diamandis', category: '理財', emoji: '💰' },
  { title: '一個投機者的告白', author: 'André Kostolany', category: '理財', emoji: '💰' },
  { title: '鄰家的百萬富翁', author: 'Thomas J. Stanley', category: '理財', emoji: '💰' },
  { title: '不當行為', author: 'Richard Thaler', category: '理財', emoji: '💰' },
  { title: '投資金律', author: 'William Bernstein', category: '理財', emoji: '💰' },
  { title: '約翰乖乖的投資啟示錄', author: 'John Bogle', category: '理財', emoji: '💰' },
  { title: '股票作手回憶錄', author: 'Edwin Lefèvre', category: '理財', emoji: '💰' },
  { title: '大賣空', author: 'Michael Lewis', category: '理財', emoji: '💰' },
  { title: '富爸爸的有錢有理', author: 'Robert Kiyosaki', category: '理財', emoji: '💰' },
  { title: '思考致富', author: 'Napoleon Hill', category: '理財', emoji: '💰' },
  { title: '讓錢為你工作', author: 'Esther Duflo', category: '理財', emoji: '💰' },
  { title: '持續買進', author: 'Nick Maggiulli', category: '理財', emoji: '💰' },
  { title: '慢慢致富', author: 'JL Collins', category: '理財', emoji: '💰' },

  // ═══════════════════════════════════════
  // 🧠 成功心理學 (25 本)
  // ═══════════════════════════════════════
  { title: '心態致勝', author: 'Carol Dweck', category: '成功心理學', emoji: '🧠' },
  { title: '刻意練習', author: 'Anders Ericsson', category: '成功心理學', emoji: '🧠' },
  { title: '恆毅力', author: 'Angela Duckworth', category: '成功心理學', emoji: '🧠' },
  { title: '異數', author: 'Malcolm Gladwell', category: '成功心理學', emoji: '🧠' },
  { title: '快思慢想', author: 'Daniel Kahneman', category: '成功心理學', emoji: '🧠' },
  { title: '影響力', author: 'Robert Cialdini', category: '成功心理學', emoji: '🧠' },
  { title: '動機，單純的力量', author: 'Daniel Pink', category: '成功心理學', emoji: '🧠' },
  { title: '高績效心智', author: 'Brendon Burchard', category: '成功心理學', emoji: '🧠' },
  { title: '逆思維', author: 'Adam Grant', category: '成功心理學', emoji: '🧠' },
  { title: '人性的弱點', author: 'Dale Carnegie', category: '成功心理學', emoji: '🧠' },
  { title: '拖延心理學', author: 'Jane Burka', category: '成功心理學', emoji: '🧠' },
  { title: '雜訊', author: 'Daniel Kahneman', category: '成功心理學', emoji: '🧠' },
  { title: '選擇的悖論', author: 'Barry Schwartz', category: '成功心理學', emoji: '🧠' },
  { title: '正向心理學', author: 'Martin Seligman', category: '成功心理學', emoji: '🧠' },
  { title: '引爆趨勢', author: 'Malcolm Gladwell', category: '成功心理學', emoji: '🧠' },
  { title: '決斷 2 秒間', author: 'Malcolm Gladwell', category: '成功心理學', emoji: '🧠' },
  { title: '黑天鵝效應', author: 'Nassim Nicholas Taleb', category: '成功心理學', emoji: '🧠' },
  { title: '反脆弱', author: 'Nassim Nicholas Taleb', category: '成功心理學', emoji: '🧠' },
  { title: '思考的藝術', author: 'Rolf Dobelli', category: '成功心理學', emoji: '🧠' },
  { title: '行為的藝術', author: 'Rolf Dobelli', category: '成功心理學', emoji: '🧠' },
  { title: '真確', author: 'Hans Rosling', category: '成功心理學', emoji: '🧠' },
  { title: '為什麼聰明人會做蠢事？', author: 'David Robson', category: '成功心理學', emoji: '🧠' },
  { title: '超級預測', author: 'Philip Tetlock', category: '成功心理學', emoji: '🧠' },
  { title: '高勝算決策', author: 'Annie Duke', category: '成功心理學', emoji: '🧠' },
  { title: '匱乏經濟學', author: 'Sendhil Mullainathan', category: '成功心理學', emoji: '🧠' },

  // ═══════════════════════════════════════
  // 📊 經營管理 (25 本)
  // ═══════════════════════════════════════
  { title: '從 A 到 A+', author: 'Jim Collins', category: '經營管理', emoji: '📊' },
  { title: '精實創業', author: 'Eric Ries', category: '經營管理', emoji: '📊' },
  { title: '什麼才是經營最難的事？', author: 'Ben Horowitz', category: '經營管理', emoji: '📊' },
  { title: '賈伯斯傳', author: 'Walter Isaacson', category: '經營管理', emoji: '📊' },
  { title: '給力', author: 'Patty McCord', category: '經營管理', emoji: '📊' },
  { title: '零規則', author: 'Reed Hastings', category: '經營管理', emoji: '📊' },
  { title: '高產出的本事', author: 'Andy Grove', category: '經營管理', emoji: '📊' },
  { title: '創新的兩難', author: 'Clayton Christensen', category: '經營管理', emoji: '📊' },
  { title: '藍海策略', author: 'W. Chan Kim', category: '經營管理', emoji: '📊' },
  { title: '第五項修練', author: 'Peter Senge', category: '經營管理', emoji: '📊' },
  { title: '執行力', author: 'Larry Bossidy', category: '經營管理', emoji: '📊' },
  { title: '從 0 到 1', author: 'Peter Thiel', category: '經營管理', emoji: '📊' },
  { title: '鉤癮效應', author: 'Nir Eyal', category: '經營管理', emoji: '📊' },
  { title: '精實執行', author: 'Ash Maurya', category: '經營管理', emoji: '📊' },
  { title: '師父', author: 'Norm Brodsky', category: '經營管理', emoji: '📊' },
  { title: '一人公司', author: 'Paul Jarvis', category: '經營管理', emoji: '📊' },
  { title: '獲利世代', author: 'Alexander Osterwalder', category: '經營管理', emoji: '📊' },
  { title: '競爭策略', author: 'Michael Porter', category: '經營管理', emoji: '📊' },
  { title: '重新定義公司', author: 'Eric Schmidt', category: '經營管理', emoji: '📊' },
  { title: '馬斯克傳', author: 'Walter Isaacson', category: '經營管理', emoji: '📊' },
  { title: '原則', author: 'Ray Dalio', category: '經營管理', emoji: '📊' },
  { title: '什麼時候是好時候', author: 'Daniel Pink', category: '經營管理', emoji: '📊' },
  { title: '葛洛夫給經理人的第一課', author: 'Andy Grove', category: '經營管理', emoji: '📊' },
  { title: '跨越鴻溝', author: 'Geoffrey Moore', category: '經營管理', emoji: '📊' },
  { title: '基業長青', author: 'Jim Collins', category: '經營管理', emoji: '📊' },

  // ═══════════════════════════════════════
  // 🌱 個人成長 (25 本)
  // ═══════════════════════════════════════
  { title: '原子習慣', author: 'James Clear', category: '個人成長', emoji: '🌱' },
  { title: '被討厭的勇氣', author: '岸見一郎', category: '個人成長', emoji: '🌱' },
  { title: '活出意義來', author: 'Viktor Frankl', category: '個人成長', emoji: '🌱' },
  { title: '與成功有約', author: 'Stephen Covey', category: '個人成長', emoji: '🌱' },
  { title: '僧人心態', author: 'Jay Shetty', category: '個人成長', emoji: '🌱' },
  { title: '脆弱的力量', author: 'Brené Brown', category: '個人成長', emoji: '🌱' },
  { title: '心流', author: 'Mihaly Csikszentmihalyi', category: '個人成長', emoji: '🌱' },
  { title: '底層邏輯', author: '劉潤', category: '個人成長', emoji: '🌱' },
  { title: '牧羊少年奇幻之旅', author: 'Paulo Coelho', category: '個人成長', emoji: '🌱' },
  { title: '覺醒的你', author: 'Michael Singer', category: '個人成長', emoji: '🌱' },
  { title: '人生的智慧', author: 'Arthur Schopenhauer', category: '個人成長', emoji: '🌱' },
  { title: '斜槓青年', author: 'Susan Kuang', category: '個人成長', emoji: '🌱' },
  { title: '刻意暫停', author: 'Rashmi Bismark', category: '個人成長', emoji: '🌱' },
  { title: '蛤蟆先生去看心理師', author: 'Robert de Board', category: '個人成長', emoji: '🌱' },
  { title: '你要如何衡量你的人生？', author: 'Clayton Christensen', category: '個人成長', emoji: '🌱' },
  { title: '臣服實驗', author: 'Michael Singer', category: '個人成長', emoji: '🌱' },
  { title: '做自己的生命設計師', author: 'Bill Burnett', category: '個人成長', emoji: '🌱' },
  { title: '當下的力量', author: 'Eckhart Tolle', category: '個人成長', emoji: '🌱' },
  { title: '薩提爾的對話練習', author: '李崇建', category: '個人成長', emoji: '🌱' },
  { title: '內在原力', author: '愛瑞克', category: '個人成長', emoji: '🌱' },
  { title: '也許你該找人聊聊', author: 'Lori Gottlieb', category: '個人成長', emoji: '🌱' },
  { title: '高敏感是種天賦', author: 'Elaine Aron', category: '個人成長', emoji: '🌱' },
  { title: '零極限', author: 'Joe Vitale', category: '個人成長', emoji: '🌱' },
  { title: '拆掉思維裡的牆', author: '古典', category: '個人成長', emoji: '🌱' },
  { title: '人生勝利聖經', author: 'Tim Ferriss', category: '個人成長', emoji: '🌱' },

  // ═══════════════════════════════════════
  // ⏰ 自律生活 (25 本)
  // ═══════════════════════════════════════
  { title: '起床後的黃金一小時', author: 'Hal Elrod', category: '自律生活', emoji: '⏰' },
  { title: '深度工作力', author: 'Cal Newport', category: '自律生活', emoji: '⏰' },
  { title: '為什麼我們這樣生活，那樣工作？', author: 'Charles Duhigg', category: '自律生活', emoji: '⏰' },
  { title: '搞定！', author: 'David Allen', category: '自律生活', emoji: '⏰' },
  { title: '子彈思考整理術', author: 'Ryder Carroll', category: '自律生活', emoji: '⏰' },
  { title: '最有生產力的一年', author: 'Chris Bailey', category: '自律生活', emoji: '⏰' },
  { title: '極度專注力', author: 'Nir Eyal', category: '自律生活', emoji: '⏰' },
  { title: '每天最重要的 2 小時', author: 'Josh Davis', category: '自律生活', emoji: '⏰' },
  { title: '番茄工作法', author: 'Francesco Cirillo', category: '自律生活', emoji: '⏰' },
  { title: '怦然心動的人生整理魔法', author: '近藤麻理惠', category: '自律生活', emoji: '⏰' },
  { title: '少，但是更好', author: 'Greg McKeown', category: '自律生活', emoji: '⏰' },
  { title: '精準努力', author: '野口真人', category: '自律生活', emoji: '⏰' },
  { title: '吃掉那隻青蛙', author: 'Brian Tracy', category: '自律生活', emoji: '⏰' },
  { title: '慢工作', author: 'Cal Newport', category: '自律生活', emoji: '⏰' },
  { title: '數位極簡主義', author: 'Cal Newport', category: '自律生活', emoji: '⏰' },
  { title: '一流的人如何保持巔峰', author: 'Brad Stulberg', category: '自律生活', emoji: '⏰' },
  { title: '生活槓桿', author: 'Rob Moore', category: '自律生活', emoji: '⏰' },
  { title: '5 秒法則', author: 'Mel Robbins', category: '自律生活', emoji: '⏰' },
  { title: '間歇高效率的番茄工作法', author: 'Francesco Cirillo', category: '自律生活', emoji: '⏰' },
  { title: '早起的奇蹟', author: 'Hal Elrod', category: '自律生活', emoji: '⏰' },
  { title: '專注力協定', author: 'Nir Eyal', category: '自律生活', emoji: '⏰' },
  { title: '一週工作 4 小時', author: 'Tim Ferriss', category: '自律生活', emoji: '⏰' },
  { title: '複利效應', author: 'Darren Hardy', category: '自律生活', emoji: '⏰' },
  { title: '你的大腦很愛搞怪', author: 'Dean Burnett', category: '自律生活', emoji: '⏰' },
  { title: '最高休息法', author: '久賀谷亮', category: '自律生活', emoji: '⏰' },

  // ═══════════════════════════════════════
  // 💬 溝通技巧 (25 本)
  // ═══════════════════════════════════════
  { title: '非暴力溝通', author: 'Marshall Rosenberg', category: '溝通技巧', emoji: '💬' },
  { title: '華頓商學院最受歡迎的談判課', author: 'Stuart Diamond', category: '溝通技巧', emoji: '💬' },
  { title: '跟任何人都能聊得來', author: 'Leil Lowndes', category: '溝通技巧', emoji: '💬' },
  { title: '好好說話', author: '馬薇薇', category: '溝通技巧', emoji: '💬' },
  { title: '關鍵對話', author: 'Kerry Patterson', category: '溝通技巧', emoji: '💬' },
  { title: '說話的力量', author: 'Chris Anderson', category: '溝通技巧', emoji: '💬' },
  { title: '好好接話', author: '山口拓朗', category: '溝通技巧', emoji: '💬' },
  { title: '精準提問的力量', author: 'Frank Sesno', category: '溝通技巧', emoji: '💬' },
  { title: '如何讓人改變想法', author: 'Jonah Berger', category: '溝通技巧', emoji: '💬' },
  { title: '超級說服力', author: 'Robert Cialdini', category: '溝通技巧', emoji: '💬' },
  { title: '安靜，就是力量', author: 'Susan Cain', category: '溝通技巧', emoji: '💬' },
  { title: '故事的力量', author: 'Kindra Hall', category: '溝通技巧', emoji: '💬' },
  { title: '高情商的刻意練習', author: 'Travis Bradberry', category: '溝通技巧', emoji: '💬' },
  { title: '所謂情商高，就是會說話', author: '佐佐木圭一', category: '溝通技巧', emoji: '💬' },
  { title: '談判力', author: 'Roger Fisher', category: '溝通技巧', emoji: '💬' },
  { title: '一開口就說對話', author: 'Debra Fine', category: '溝通技巧', emoji: '💬' },
  { title: '精準表達', author: 'Bill McGowan', category: '溝通技巧', emoji: '💬' },
  { title: '絕對達成', author: '橫山信弘', category: '溝通技巧', emoji: '💬' },
  { title: '你都沒在聽', author: 'Kate Murphy', category: '溝通技巧', emoji: '💬' },
  { title: '簡報女王的故事力', author: 'Nancy Duarte', category: '溝通技巧', emoji: '💬' },
  { title: '如何說，孩子才會聽', author: 'Adele Faber', category: '溝通技巧', emoji: '💬' },
  { title: '聽懂了，就能說動人', author: 'Alan Alda', category: '溝通技巧', emoji: '💬' },
  { title: '我想跟你好好說話', author: '賴佩霞', category: '溝通技巧', emoji: '💬' },
  { title: '麥肯錫寫作技術與邏輯思考', author: '高杉尚孝', category: '溝通技巧', emoji: '💬' },
  { title: '金字塔原理', author: 'Barbara Minto', category: '溝通技巧', emoji: '💬' },

  // ═══════════════════════════════════════
  // ❤️ 男女兩性 (25 本)
  // ═══════════════════════════════════════
  { title: '男人來自火星，女人來自金星', author: 'John Gray', category: '男女兩性', emoji: '❤️' },
  { title: '愛的五種語言', author: 'Gary Chapman', category: '男女兩性', emoji: '❤️' },
  { title: '親密關係', author: 'Rowland Miller', category: '男女兩性', emoji: '❤️' },
  { title: '依附', author: 'Amir Levine', category: '男女兩性', emoji: '❤️' },
  { title: '關係的藝術', author: 'John Gottman', category: '男女兩性', emoji: '❤️' },
  { title: '為何你不敢自在做自己？', author: 'Ilse Sand', category: '男女兩性', emoji: '❤️' },
  { title: '愛的藝術', author: 'Erich Fromm', category: '男女兩性', emoji: '❤️' },
  { title: '情緒勒索', author: 'Susan Forward', category: '男女兩性', emoji: '❤️' },
  { title: '七個讓愛延續的方法', author: 'John Gottman', category: '男女兩性', emoji: '❤️' },
  { title: '恐懼型依戀', author: 'Annie Chen', category: '男女兩性', emoji: '❤️' },
  { title: '你的善良必須有點鋒芒', author: '慕顏歌', category: '男女兩性', emoji: '❤️' },
  { title: '他其實沒那麼喜歡你', author: 'Greg Behrendt', category: '男女兩性', emoji: '❤️' },
  { title: '不再當乖孩子', author: '加藤諦三', category: '男女兩性', emoji: '❤️' },
  { title: '在關係中，讓愛流動', author: '賴佩霞', category: '男女兩性', emoji: '❤️' },
  { title: '愛情的正常性混亂', author: 'Ulrich Beck', category: '男女兩性', emoji: '❤️' },
  { title: '擁抱不完美', author: 'Brené Brown', category: '男女兩性', emoji: '❤️' },
  { title: '戀愛必修課', author: 'John Gray', category: '男女兩性', emoji: '❤️' },
  { title: '分手後，成為更好的自己', author: 'Bruce Fisher', category: '男女兩性', emoji: '❤️' },
  { title: '第二性', author: 'Simone de Beauvoir', category: '男女兩性', emoji: '❤️' },
  { title: '幸福的婚姻', author: 'John Gottman', category: '男女兩性', emoji: '❤️' },
  { title: '你是我最艱難的選擇', author: 'Ryan Winfield', category: '男女兩性', emoji: '❤️' },
  { title: '這不是你的錯', author: 'Beverly Engel', category: '男女兩性', emoji: '❤️' },
  { title: '愛是一種選擇', author: 'Gary Chapman', category: '男女兩性', emoji: '❤️' },
  { title: '從負面關係中解脫', author: 'Harriet Braiker', category: '男女兩性', emoji: '❤️' },
  { title: '我可能錯了', author: 'Björn Natthiko Lindeblad', category: '男女兩性', emoji: '❤️' },
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

export function getTotalCount() {
  return BOOK_LIST.length
}

export function getCategoryCounts() {
  const counts = {}
  for (const book of BOOK_LIST) {
    counts[book.category] = (counts[book.category] || 0) + 1
  }
  return counts
}

export default BOOK_LIST
