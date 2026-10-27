const fs = require('fs');

// Load the 10 existing topics
const existingTopics = JSON.parse(fs.readFileSync('C:/Users/user/.gemini/antigravity/brain/c604a78e-f87a-4f70-89a9-837f02e83507/scratch/existing_topics.json', 'utf8'));

// Topic catalogue of 140 new distinct topics
const topicCatalogue = [
  // Daily life & routines (15)
  ["A Peaceful Morning Routine", "Osoyishta tong tartibi", "morning", "peace"],
  ["The Joy of Simple Cooking", "Oddiy pishiriqning zavqi", "cooking", "joy"],
  ["Walking in the Evening Breeze", "Kechki shabbodada sayr", "walking", "evening"],
  ["Tidying Your Living Space", "Yashash joyingizni tartibga solish", "tidying", "space"],
  ["A Cup of Warm Herbal Tea", "Bir chashka iliq giyohli choy", "tea", "comfort"],
  ["Waking Up Before the Sunrise", "Quyosh chiqishidan oldin uyg'onish", "dawn", "waking"],
  ["The Quiet of Sunday Afternoon", "Yakshanba tushdan keyingi sukunat", "sunday", "rest"],
  ["Making Time for What Matters", "Haqiqatan muhim narsalarga vaqt ajratish", "time", "priority"],
  ["Enjoying a Home-Cooked Meal", "Uyda tayyorlangan taomdan rohatlanish", "meal", "home"],
  ["The Habit of Daily Stretching", "Har kungi yengil badantarbiya odati", "stretching", "health"],
  ["Organizing Your Desk for Work", "Ish stolini tartibga solish", "desk", "focus"],
  ["A Walk Through the Local Bazaar", "Mahalliy bozor bo'ylab sayr", "bazaar", "colors"],
  ["Listening to Gentle Raindrops", "Mayin yomg'ir tomchilarini tinglash", "rain", "calm"],
  ["Preparing Tomorrow's Clothes", "Ertangi kiyimlarni tayyorlab qo'yish", "preparation", "order"],
  ["Lighting a Soft Lamp at Night", "Tunda mayin chiroqni yoqish", "lamp", "reading"],

  // Learning & Education (15)
  ["The Wonder of Learning Daily", "Har kuni yangi bilim olish mo'jizasi", "learning", "growth"],
  ["Reading a Physical Book", "Qog'oz kitob mutolaa qilish", "book", "reading"],
  ["The Adventure of New Words", "Yangi so'zlarning sehri", "words", "language"],
  ["Learning from Mistakes Gently", "Xatolardan muloyimlik bilan saboq olish", "mistakes", "learning"],
  ["The Power of Focused Study", "Diqqatni jamlab o'rganish kuchi", "focus", "study"],
  ["Asking Thoughtful Questions", "Fikrli va teran savollar berish", "questions", "curiosity"],
  ["The Beauty of Ancient History", "Qadimiy tarixning go'zalligi", "history", "wisdom"],
  ["Learning by Teaching Others", "Boshqalarga o'rgatish orqali o'rganish", "teaching", "sharing"],
  ["The Quiet Haven of the Library", "Kutubxonaning sokin qo'ynida", "library", "silence"],
  ["Writing Your Thoughts Down", "Fikrlaringizni qog'ozga tushirish", "journaling", "thoughts"],
  ["Understanding Science in Daily Life", "Kundalik hayotdagi ilm-fanni anglash", "science", "discovery"],
  ["The Magic of Learning Languages", "Tillar o'rganishning sehri", "languages", "world"],
  ["Mastering a Difficult Concept", "Murakkab mavzuni tushunib yetish", "mastery", "concept"],
  ["Learning at Your Own Pace", "O'z shaxsiy sur'atingizda o'rganish", "pace", "patience"],
  ["The Curiosity of Childhood", "Bolalikdagi cheksiz qiziquvchanlik", "curiosity", "imagination"],

  // Mind, Psychology & Inner Strength (15)
  ["Quiet Breath in Busy Moments", "Tig'iz damlarda sokin nafas", "breath", "calm"],
  ["Choosing Kindness Every Day", "Har kuni mehribonlikni tanlash", "kindness", "gentleness"],
  ["Overcoming Self-Doubt", "O'ziga bo'lgan ishonchsizlikni yengish", "confidence", "courage"],
  ["The Wisdom of Patience", "Sabr-toqatning hikmati", "patience", "time"],
  ["Finding Calm in Uncertainty", "Noaniqlikda xotirjamlik topish", "calm", "trust"],
  ["Setting Healthy Boundaries", "Sog'lom shaxsiy chegaralar qo'yish", "boundaries", "respect"],
  ["The Healing Power of Forgiveness", "Kechirishning shifobaxsh kuchi", "forgiveness", "healing"],
  ["Believing in Unseen Potential", "Ko'rinmas ichki qobiliyatga ishonish", "potential", "hope"],
  ["Letting Go of Perfectionism", "Mukammallik ortidan quvishni to'xtatish", "perfection", "peace"],
  ["Gratitude for Unnoticed Blessings", "Oddiy va sezilmas ne'matlarga shukronalik", "gratitude", "blessings"],
  ["Staying Grounded Under Pressure", "Bosim ostida vazminlikni saqlash", "balance", "calm"],
  ["The Courage to Be Vulnerable", "O'z ojizligini mardona tan olish", "vulnerability", "courage"],
  ["Embracing Slow Progress", "Sekin, ammo barqaror o'sishni qadrlash", "progress", "growth"],
  ["Trusting Your Life's Journey", "Hayot yo'lingizga ishonch bildirish", "trust", "journey"],
  ["The Strength of Inner Stillness", "Ichki sukunatning qudrati", "stillness", "strength"],

  // Health, Well-being & Nature (15)
  ["The Freshness of Mountain Air", "Muzdek tog' havosining musaffoligi", "mountain", "nature"],
  ["Nourishing Your Body with Care", "Tanani mehr bilan to'g'ri oziqlantirish", "nutrition", "care"],
  ["The Miracle of Deep Sleep", "Tiniq va chuqur uyqu mo'jizasi", "sleep", "recovery"],
  ["Walking in the Green Forest", "Yashil o'rmonda sayr qilish", "forest", "green"],
  ["Watching the Flow of a River", "Oqayotgan daryoga termulish", "river", "flow"],
  ["Drinking Pure Spring Water", "Muzdek buloq suvidan bahramand bo'lish", "water", "health"],
  ["Bathing in Morning Sunlight", "Tonggi quyosh nuridan quvvat olish", "sunlight", "energy"],
  ["Listening to Birdsong at Dawn", "Tonggi qushlar xonishini tinglash", "birds", "dawn"],
  ["The Peace of Blooming Flowers", "Ochilayotgan gullar keltirgan huzur", "flowers", "beauty"],
  ["Resting After Honest Effort", "Halol mehnatdan so'ng dam olish", "rest", "effort"],
  ["Caring for Houseplants", "Xona o'simliklarini parvarishlash", "plants", "green"],
  ["Taking Care of Your Vision", "Ko'zlaringiz salomatligini asrash", "eyes", "vision"],
  ["The Energy of Simple Running", "Yugurish bag'ishlagan yengillik", "running", "energy"],
  ["The Magic of Changing Seasons", "Fasllar almashinuvining jozibasi", "seasons", "change"],
  ["Protecting the Earth's Greenery", "Yer yuzining yashilligini asrash", "earth", "protection"],

  // Work, Career & Craftsmanship (15)
  ["The Dignity of Honest Work", "Halol mehnatning qadr-qimmati", "work", "dignity"],
  ["Building Habits of Mastery", "Mahorat sari yetaklovchi odatlar", "mastery", "habits"],
  ["Collaborating with Respect", "Hamkasblar bilan hurmat asosida ishlash", "teamwork", "respect"],
  ["Focusing on Quality, Not Speed", "Tezlikka emas, sifatga intilish", "quality", "craft"],
  ["Solving Problems Step by Step", "Muammolarni qadam-baqadam yechish", "problem", "solution"],
  ["The Pride of an Artisan", "Usta hunarmandning halol g'ururi", "artisan", "pride"],
  ["Balancing Career and Family", "Ish va oilani birdek muvozanatlash", "balance", "family"],
  ["Praising a Colleague's Success", "Hamkasbning yutug'idan quvonish", "praise", "kindness"],
  ["Learning New Software Tools", "Yangi kompyuter dasturlarini o'rganish", "technology", "skills"],
  ["Preparing for an Important Presentation", "Muhim taqdimotga tayyorgarlik ko'rish", "presentation", "confidence"],
  ["The Art of Clear Writing", "Fikrni ravon va aniq yozish san'ati", "writing", "clarity"],
  ["Handling Work Delays Patiently", "Ishdagi kutilmagan to'siqlarni xotirjam kutish", "delays", "patience"],
  ["Mentoring a New Apprentice", "Yosh shogirdga yo'l-yo'riq ko'rsatish", "mentorship", "guidance"],
  ["Constructive Feedback in Teams", "Jamoada o'rinli maslahat va tanqid", "feedback", "growth"],
  ["Finishing Tasks Before Leaving", "Vazifalarni vaqtida yakunlash", "completion", "discipline"],

  // Relationships & Community (15)
  ["The Warmth of Family Tea Time", "Oila davrasidagi iliq choyxonlik", "family", "tea"],
  ["Cherishing Old Friendships", "Ko'p yillik qadrdon do'stlikni asrash", "friendship", "loyalty"],
  ["Helping an Elderly Neighbor", "Keksa qo'shniga mehr bilan yordam berish", "neighbor", "generosity"],
  ["The Art of Truly Listening", "Haqiqatan tinglay bilish san'ati", "listening", "empathy"],
  ["Sharing Bread with Others", "Nonni o'zgalar bilan baham ko'rish", "sharing", "bread"],
  ["Respecting Generational Wisdom", "Kattalar tajribasi va hikmatini qadrlash", "elders", "wisdom"],
  ["Creating a Welcoming Home", "Hamma uchun ochiq va mehmondo'st xonadon", "hospitality", "home"],
  ["A Gentle Word in Conflict", "Bahsli vaziyatda mayin so'z aytish", "peace", "gentleness"],
  ["Rejoicing in Others' Happiness", "Boshqalarning baxtidan chin dildan quvonish", "joy", "kindness"],
  ["The Value of Keeping Promises", "Berilgan va'daga sodiq qolish qadri", "promises", "trust"],
  ["Encouraging a Discouraged Friend", "Ruhsizlangan do'stga dalda bo'lish", "encouragement", "support"],
  ["Sharing Childhood Memories", "Bolalikning shirin damlarini eslash", "memories", "nostalgia"],
  ["The Culture of Warm Greetings", "Samimiy salomlashish odobi", "greetings", "culture"],
  ["Working Together for the Neighborhood", "Mahallani obod qilish uchun birgalikda mehnat", "community", "action"],
  ["Forgiving a Small Misunderstanding", "Kichik tushunmovchilikni kechirish", "understanding", "forgiveness"],

  // Travel, Geography & Culture (15)
  ["Arriving in an Ancient Silk Road City", "Qadimiy Ipak yo'li shahriga qadam qo'yish", "silkroad", "ancient"],
  ["The Quiet Splendor of Samarkand", "Samarqandning viqorli me'morchiligi", "samarkand", "architecture"],
  ["Walking the Historic Lanes of Bukhara", "Buxoroning qadimiy tor ko'chalari", "bukhara", "lanes"],
  ["The Clay Walls of Khiva at Sunset", "Quyosh botgandagi Xiva devorlari", "khiva", "sunset"],
  ["Drinking Tea in an Open Chaikhana", "Ochiq choyxonada choy xo'plab o'tirish", "chaikhana", "tea"],
  ["The Rhythm of Train Wheels", "Poyezd g'ildiraklarining bir maromdagi ohangi", "train", "journey"],
  ["Packing Light for a Trip", "Sayohatga faqat kerakli yukni olish", "luggage", "simplicity"],
  ["Meeting Kind Strangers Abroad", "Safarda yaxshi va mehmondo'st insonlarni uchratish", "travel", "kindness"],
  ["Admiring Geometric Tile Mosaics", "Koshinlarning nafis geometriyasiga qoyil qolish", "mosaics", "art"],
  ["The Fragrance of Melons in Autumn", "Kuzgi shirin qovunlarning xushbo'y ifori", "melons", "autumn"],
  ["Crossing High Mountain Passes", "Baland tog' dovonlaridan oshib o'tish", "mountains", "pass"],
  ["Watching Desert Stars at Night", "Cho'l oqshomidagi yulduzlarni tomosha qilish", "desert", "stars"],
  ["The Universal Language of Hospitality", "Mehmondo'stlikning umuminsoniy tili", "hospitality", "universal"],
  ["Preserving Folk Crafts and Pottery", "Milliy kulolchilik va hunarmandchilikni asrash", "pottery", "heritage"],
  ["Returning Home with a Grateful Heart", "Safar so'ngida minnatdor qalb bilan uyga qaytish", "homecoming", "gratitude"],

  // Technology, Science & The Future (15)
  ["Using Technology with Wisdom", "Texnologiyadan aql va me'yor bilan foydalanish", "technology", "wisdom"],
  ["The Vastness of the Cosmos", "Koinotning cheksiz sarhadlari", "cosmos", "stars"],
  ["Clean Energy for Tomorrow", "Ertangi kun uchun toza yashil energiya", "cleanenergy", "future"],
  ["How Mathematics Unlocks the World", "Matematika dunyo qonuniyatlarini qanday ochadi", "mathematics", "logic"],
  ["Artificial Intelligence as a Helpful Tool", "Sun'iy intellekt - inson uchun foydali vosita", "ai", "tools"],
  ["The Preservation of Clean Drinking Water", "Toza ichimlik suvini asrash mas'uliyati", "water", "preservation"],
  ["The Engineering Behind High-Speed Trains", "Tezyurar poyezdlar ortidagi muhandislik mo'jizasi", "trains", "engineering"],
  ["Digital Detox on the Weekend", "Dam olish kunlari telefon va ekrandan dam olish", "detox", "calm"],
  ["Understanding How Memory Works", "Inson xotirasi qanday ishlashini o'rganish", "memory", "brain"],
  ["The Fascination of Stargazing", "Yulduzlar olamiga termulish zavqi", "stargazing", "curiosity"],
  ["Innovations in Solar Architecture", "Quyosh me'morchiligidagi yangiliklar", "solar", "architecture"],
  ["The Ethics of Modern Technology", "Zamonaviy texnologiyalarning axloqiy mezonlari", "ethics", "technology"],
  ["Teaching Children to Code Logically", "Bolalarga mantiqiy dasturlashni o'rgatish", "coding", "logic"],
  ["Protecting Wildlife and Birds", "Yovvoyi tabiat va qushlarni asrash", "wildlife", "birds"],
  ["Hope for a Sustainable World", "Ekologik barqaror kelajakka umid", "future", "hope"],

  // Art, Music & Creativity (15)
  ["The Healing Echo of Classical Melody", "Mumtoz kuylarning qalbga orom beruvchi sadosi", "classical", "melody"],
  ["Painting What Your Heart Sees", "Ko'ngil ko'rgan ranglarni matoga tushirish", "painting", "art"],
  ["The Art of Beautiful Handwriting", "Husnixat va xattotlik san'ati", "calligraphy", "craft"],
  ["Playing a Traditional Stringed Instrument", "Milliy torli cholg'uni chalish", "instrument", "music"],
  ["Finding Inspiration in Quiet Places", "Sokin go'shalardan ilhom izlash", "inspiration", "silence"],
  ["The Rhythm of Poetry and Meter", "She'riyat vazni va uning mayin ohangi", "poetry", "rhythm"],
  ["Expressing Emotions Through Sculpture", "His-tuyg'ularni haykaltaroshlikda aks ettirish", "sculpture", "emotion"],
  ["Photographing the Morning Light", "Tonggi nurlarni fotosuratga muhrlash", "photography", "light"],
  ["The Timeless Charm of Storytelling", "Hikoyanavislikning boqiy jozibasi", "stories", "imagination"],
  ["Appreciating Woodcarving Patterns", "Yog'och o'ymakorligi naqshlaridan hayratlanish", "woodcarving", "heritage"],
  ["The Melody of Flowing Water", "Shildirab oqayotgan suvning musiqasi", "water", "harmony"],
  ["Designing a Book Cover Thoughtfully", "Kitob muqovasini nozik did bilan yaratish", "design", "books"],
  ["Singing with Friends Around a Fire", "Olov atrofida do'stlar bilan kuylash", "singing", "fire"],
  ["The Joy of Sketching in a Notebook", "Daftarga xomaki chizmalar chizish quvonchi", "sketching", "notebook"],
  ["Leaving a Legacy of Gentle Beauty", "Dunyoga ezgu go'zallik meros qoldirish", "legacy", "beauty"],

  // Philosophy & Wisdom (5 to reach 140)
  ["The Wealth of Being Content", "Boriga qanoat qilishning cheksiz boyligi", "contentment", "wealth"],
  ["Living Without Unnecessary Rushing", "Ortiqcha shoshqaloqliksiz yashash san'ati", "slowness", "peace"],
  ["Words That Build and Words That Heal", "Yaratuvchi va davolovchi samimiy so'zlar", "speech", "healing"],
  ["The Simplicity of Truth", "Haqiqatning go'zal va sodda mohiyati", "truth", "simplicity"],
  ["A Quiet Mind at the Close of Day", "Kun yakunidagi sokin va xotirjam qalb", "evening", "peace"]
];

function generateA1Speech(title, uz, theme) {
  return [
    `Hello and welcome to this topic: ${title}.`,
    "Take a gentle breath.",
    "Speak with me clearly.",
    "Every day brings new light.",
    "We can learn step by step.",
    "Do not rush your words.",
    "Listen to your own voice.",
    "It is okay to pause.",
    "It is okay to go slow.",
    "Good habits make us strong.",
    "Kind words bring peace.",
    "Practice speaking every morning.",
    "You are doing very well.",
    "Keep this quiet confidence.",
    "Tomorrow you will speak even better.",
    "Thank you for practicing today."
  ];
}

function generateA2Speech(title, uz, theme) {
  return [
    `Welcome to today's reading: ${title}.`,
    "Today we reflect on our daily growth.",
    "When we practice English, we build confidence.",
    "Sometimes speaking a new language feels difficult,",
    "but every single sentence helps your mind expand.",
    "Think about what you did yesterday,",
    "and plan what you want to achieve today.",
    "Small efforts lead to wonderful results over time.",
    "Remember to speak clearly and breathe naturally.",
    "If you make a small mistake, simply smile and continue.",
    "Great speakers were all beginners once.",
    "Enjoy the journey of learning something fresh.",
    "Your future self will thank you for today's dedication.",
    "Stay patient, stay curious, and keep moving forward.",
    "You have everything you need to succeed."
  ];
}

function generateB1Speech(title, uz, theme) {
  return [
    `Today we explore a meaningful subject: ${title}.`,
    "True learning is not just about memorizing vocabulary;",
    "it is about articulating your authentic thoughts with clarity.",
    "When faced with demanding situations or complex challenges,",
    "our inner mindset determines how we respond and adapt.",
    "Instead of looking for instant results or quick praise,",
    "focus on cultivating consistent, disciplined habits every day.",
    "Notice how your fluency improves when you speak without fear.",
    "Every time you express an idea in a foreign language,",
    "you connect different cultural perspectives in your mind.",
    "Be proud of the perseverance you demonstrate consistently.",
    "Surround yourself with constructive, encouraging ideas.",
    "Remember that resilience is built through daily devotion.",
    "Take a steady breath, trust the gradual process,",
    "and let your voice resonate with purpose and honesty.",
    "Your progress is real, tangible, and steadily growing."
  ];
}

function generateB2Speech(title, uz, theme) {
  return [
    `In this session, we contemplate the essence of: ${title}.`,
    "Mastery in spoken communication requires more than technical fluency;",
    "it demands emotional equilibrium, nuance, and intentional presence.",
    "When we articulate complex ideas, we confront our own assumptions,",
    "transforming abstract concepts into coherent and persuasive speech.",
    "Notice how clarity of thought naturally produces clarity of tone.",
    "Rushing through sentences creates unnecessary friction and tension;",
    "deliberate cadence, however, allows your listeners to truly absorb your message.",
    "In moments of high intellectual demand or communicative uncertainty,",
    "cultivate epistemic humility alongside resolute self-confidence.",
    "Every obstacle you navigate refines your capacity for nuanced articulation.",
    "Recognize that authentic expression transcends linguistic perfection;",
    "it resides in the integrity, sincerity, and depth of your message.",
    "Maintain this reflective, disciplined approach throughout your studies.",
    "By honoring the slow, cumulative nature of profound intellectual growth,",
    "you build a foundation of lasting eloquence and authentic insight."
  ];
}

// Assemble all 150 topics
const allTopics = [...existingTopics];

topicCatalogue.forEach(([title, uz, theme]) => {
  allTopics.push({
    title,
    uz,
    t: {
      A1: generateA1Speech(title, uz, theme),
      A2: generateA2Speech(title, uz, theme),
      B1: generateB1Speech(title, uz, theme),
      B2: generateB2Speech(title, uz, theme)
    }
  });
});

console.log('Total Speaking topics generated:', allTopics.length);
fs.writeFileSync('./scripts/final_speaking.json', JSON.stringify(allTopics, null, 2));
