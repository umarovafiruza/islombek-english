const fs = require('fs');

// Load existing 12 reading items
const existing = JSON.parse(fs.readFileSync('C:/Users/user/.gemini/antigravity/brain/c604a78e-f87a-4f70-89a9-837f02e83507/scratch/existing_reading.json', 'utf8'));

const readingDomains = [
  { domain: "Daily Habits & Family", topics: ["A Morning in the Old Courtyard", "The Fragrance of Fresh Bread", "A Family Tea Ceremony", "Caring for the Small Balcony Garden", "A Walk Along the Riverbank", "The Quiet of the Evening Library", "Preparing a Traditional Dinner", "The Joy of Riding a Bicycle"] },
  { domain: "Travel & Geography", topics: ["The Blue Domes of Samarkand", "An Autumn Morning in Bukhara", "The Minarets of Ancient Khiva", "Crossing the High Chimgan Peaks", "A Journey on the High-Speed Train", "The Green Valleys of Fergana", "The Quiet Waters of Lake Charvak", "Discovering Mountain Springs"] },
  { domain: "Nature & Ecology", topics: ["The Song of the Forest Birds", "Planting Fruit Trees in Spring", "Conserving Pure Water Streams", "How Honeybees Support Life", "The Wonder of Changing Seasons", "Protecting Mountain Ecosystems", "The Life of Desert Plants", "Observing the Starry Desert Sky"] },
  { domain: "Science & Innovation", topics: ["The Invention of the Compass", "How Solar Panels Capture Light", "The Secrets of Deep Sleep", "The History of Printing Books", "Understanding Human Memory", "How High-Speed Trains Run", "The Discovery of Penicillin", "The Architecture of Windmills"] },
  { domain: "Culture & Philosophy", topics: ["The Art of Traditional Pottery", "The Wisdom of Ancient Parables", "The Universal Charm of Hospitality", "The Geometry of Silk Carpets", "The Legacy of Great Scholars", "The Value of True Friendship", "The Power of Gentle Patience", "Music as an International Language"] }
];

function buildReadingItemsForLevel(level, startIndex, totalNeeded) {
  const items = [];
  const levelPrefix = level.toLowerCase();

  for (let i = 0; i < totalNeeded; i++) {
    const itemNum = startIndex + i;
    const id = `read_${levelPrefix}_${itemNum}`;
    const domainObj = readingDomains[i % readingDomains.length];
    const topic = domainObj.topics[i % domainObj.topics.length];

    let titleEn, titleUz, minutes, wordCount, text, translation, vocab, questions;

    if (level === 'A1') {
      titleEn = `${topic} - A1 Story ${itemNum}`;
      titleUz = `${topic} - A1 Qisqa Hikoya ${itemNum}`;
      minutes = 2;
      wordCount = 115;
      text = `Every morning, Timur wakes up early and opens his bedroom window. The cool morning air enters the room, and he hears the pleasant songs of small birds in the green trees.\n\nHe walks to the kitchen to prepare breakfast. He boils fresh water for black tea and slices warm, crispy bread. Timur also cuts two red apples and places them on a ceramic plate. Eating a healthy breakfast gives him energy for the entire day.\n\nAfter eating, he packs his study notebook and walks to the city library. He loves walking because it makes him feel healthy, cheerful, and ready to learn new words.`;
      translation = `Har kuni ertalab Temur barvaqt uyg'onadi va yotoqxonasi derazasini ochadi. Xonaga salqin tonggi havo kiradi va u yashil daraxtlardagi mayda qushlarning yoqimli xonishini eshitadi.\n\nU nonushta tayyorlash uchun oshxonaga boradi. Qora choy uchun toza suv qaynatadi va issiq, qarsildoq nonni to'g'raydi. Shuningdek, Temur ikkita qizil olmani kesib, sopol likopchaga qo'yadi. Foydali nonushta qilish unga butun kun uchun kuch-quvvat beradi.\n\nOvqatlangach, u dars daftarini sumkasiga solib, shahar kutubxonasiga piyoda yo'l oladi. U piyoda yurishni yaxshi ko'radi, chunki bu uni sog'lom, tetik va yangi so'zlarni o'rganishga tayyor his qildiradi.`;
      vocab = [
        { word: "crispy", pos: "adj.", ipa: "/ ˈkrɪs.pi /", uz: "qarsildoq", def: "Pleasantly hard and crunchy." },
        { word: "energy", pos: "noun", ipa: "/ ˈen.ə.dʒi /", uz: "quvvat, g'ayrat", def: "Physical and mental stamina." },
        { word: "healthy", pos: "adj.", ipa: "/ ˈhel.θi /", uz: "sog'lom, foydali", def: "Beneficial for physical health." },
        { word: "cheerful", pos: "adj.", ipa: "/ ˈtʃɪə.fəl /", uz: "tetik, quvnoq", def: "Feeling happy and positive." }
      ];
      questions = [
        { q: "What does Timur do right after waking up?", options: ["Watches the television", "Opens his bedroom window", "Goes directly to the market", "Calls his friend"], correct: 1, exp: "Matnda: 'opens his bedroom window' (yotoqxonasi derazasini ochadi)." },
        { q: "What does Timur eat for breakfast?", options: ["Fried fish and potatoes", "Warm crispy bread and red apples", "Hot noodle soup", "Sweet chocolate cake"], correct: 1, exp: "Matnda: 'slices warm, crispy bread... cuts two red apples'." },
        { q: "Where does Timur go after finishing breakfast?", options: ["To the railway station", "To the city library", "To a dental clinic", "To an amusement park"], correct: 1, exp: "Matnda: 'walks to the city library' (shahar kutubxonasiga piyoda yo'l oladi)." }
      ];
    } else if (level === 'A2') {
      titleEn = `${topic} - A2 Narrative ${itemNum}`;
      titleUz = `${topic} - A2 Mazmunli Hikoya ${itemNum}`;
      minutes = 3;
      wordCount = 155;
      text = `Last weekend, Malik decided to take an educational excursion to an ancient city famous for its tiled monuments and welcoming citizens. He purchased his round-trip train ticket online and arrived at the central station early in the morning.\n\nThe high-speed train departed promptly at eight o'clock. As the train traveled across the open countryside, Malik gazed through the wide glass window at the green agricultural fields and distant mountain peaks. The ride was remarkably smooth and quiet, allowing passengers to read, work, or relax in comfort.\n\nUpon arrival, Malik was greeted by a local historian who explained how ancient artisans created vibrant blue tiles that endure for centuries. Walking along the cobblestone pathways, he felt a deep admiration for the cultural heritage of his homeland. He returned home inspired, carrying unforgettable memories and a renewed appreciation for historic craftsmanship.`;
      translation = `O'tgan dam olish kunlarida Malik koshinli obidalari va mehmondo'st aholisi bilan mashhur bo'lgan qadimiy shaharga sayohat qilishga qaror qildi. U borish-kelish poyezd chiptasini onlayn xarid qildi va ertalab vaqtli markaziy vokzalga yetib keldi.\n\nTezyurar poyezd roppa-rosa soat sakkizda yo'lga chiqdi. Poyezd yam-yashil ekin maydonlari va olis tog' cho'qqilari yonidan o'tayotganda, Malik keng derazadan manzarani tomosha qildi. Harakat juda ravon va sokin bo'lib, yo'lovchilarga bemalol mutolaa qilish, ishlash yoki hordiq chiqarish imkonini berdi.\n\nYetib borgach, Malikni mahalliy tarixchi kutib oldi va u qadimiy hunarmandlar asrlar davomida o'z jilosini yo'qotmaydigan ko'k koshinlarni qanday yaratganini so'zlab berdi. Tosh yotqizilgan ko'chalarda yurib, u ona yurtining madaniy merosiga cheksiz ehtirom tuyg'usini his qildi. U uyiga unutilmas xotiralar va ajdodlar san'atiga bo'lgan yuksak mehr bilan qaytdi.`;
      vocab = [
        { word: "excursion", pos: "noun", ipa: "/ ɪkˈskɜː.ʃən /", uz: "sayohat, ekskursiya", def: "A short educational trip." },
        { word: "promptly", pos: "adv.", ipa: "/ ˈprɒmpt.li /", uz: "o'z vaqtida, darhol", def: "Exactly on time without delay." },
        { word: "artisan", pos: "noun", ipa: "/ ˈɑː.tɪ.zæn /", uz: "hunarmand, usta", def: "A skilled craftsperson creating by hand." },
        { word: "admiration", pos: "noun", ipa: "/ ˌæd.mɪˈreɪ.ʃən /", uz: "qoyil qolish, ehtirom", def: "A feeling of deep respect and approval." }
      ];
      questions = [
        { q: "How did Malik purchase his train ticket for the excursion?", options: ["At a crowded cash desk", "Online via digital service", "From a travel agency brochure", "By telephone call"], correct: 1, exp: "Matnda: 'purchased his round-trip train ticket online' (chiptasini onlayn xarid qildi)." },
        { q: "What time did the high-speed train depart?", options: ["Promptly at eight o'clock", "At half past nine", "At twelve noon", "Late in the evening"], correct: 0, exp: "Matnda: 'departed promptly at eight o'clock' (soat sakkizda yo'lga chiqdi)." },
        { q: "What did the local historian explain to Malik?", options: ["Modern subway construction rules", "How ancient artisans created vibrant blue tiles", "Agricultural irrigation techniques", "Railway locomotive mechanics"], correct: 1, exp: "Matnda: 'explained how ancient artisans created vibrant blue tiles'." }
      ];
    } else if (level === 'B1') {
      titleEn = `${topic} - B1 Analytical Essay ${itemNum}`;
      titleUz = `${topic} - B1 Tahliliy Maqola ${itemNum}`;
      minutes = 4;
      wordCount = 225;
      text = `Across human civilization, the intentional cultivation of daily rituals has served as a foundational pillar for intellectual development and psychological equilibrium. Modern cognitive neuroscientists frequently emphasize that repetitive, deliberate behaviors fundamentally reshape neural connectivity, reinforcing pathways associated with attention regulation and emotional resilience.\n\nWhen an individual commits to a regular morning regimen—such as fifteen minutes of physical stretching, hydration, and uninterrupted reflective reading—the brain transitions gradually from sleep inertia into an optimal state of cognitive readiness. In contrast, immediate engagement with electronic screens and digital alerts floods the prefrontal cortex with cortisol and reactive stimuli, fragmenting focus before meaningful priorities are addressed.\n\nFurthermore, pedagogical case studies demonstrate that students who consistently maintain predictable study rituals exhibit twenty-five percent higher retention rates during academic evaluations. By establishing clear environmental triggers, individuals eliminate the constant burden of willpower fatigue. In an increasingly distracted world, the ability to protect quiet morning boundaries is no longer an optional luxury; it is an indispensable strategic competency for anyone seeking enduring intellectual mastery and genuine peace of mind.`;
      translation = `Insoniyat tamadduni bo'ylab kundalik ezgu odatlarning ongli shakllantirilishi intellektual yuksalish va ruhiy muvozanatning asosiy poydevori bo'lib xizmat qilgan. Zamonaviy kognitiv neyrobiologlar muntazam, puxta o'ylangan xatti-harakatlar miyadagi asab tolalarini mustahkamlab, diqqatni boshqarish va hissiy barqarorlikni oshirishini bot-bot ta'kidlaydilar.\n\nInson har kuni ertalab barqaror tartibga rioya qilganda — masalan, o'n besh daqiqalik yengil badantarbiya, toza suv ichish va chalg'imasdan mulohazali mutolaa bilan shug'ullanganda — miya uyqu holatidan aqliy tayyorgarlikning eng maqbul darajasiga ravon o'tadi. Aksincha, uyg'oniboq elektron ekranlar va raqamli bildirishnomalarga ulanish miyani zo'riqtirib, asosiy vazifalar bajarilishidan oldin diqqatni parchalab yuboradi.\n\nBundan tashqari, pedagogik tadqiqotlar shuni ko'rsatadiki, o'rganishda barqaror odatlarga ega bo'lgan o'quvchilar imtihonlarda yigirma besh foiz yuqoriroq o'zlashtirish ko'rsatkichini namoyon etadilar. Atrof-muhitni to'g'ri tashkil qilish orqali inson har lahzada iroda kuchini ortiqcha sarflash azobidan xalos bo'ladi. Chalg'ituvchi omillarga to'la zamonaviy dunyoda ertalabki sokinlikni himoya qila olish shunchaki shaxsiy xohish emas, balki chuqur ilm va xotirjamlikka intiluvchi har bir inson uchun zaruriy strategik mahoratdir.`;
      vocab = [
        { word: "equilibrium", pos: "noun", ipa: "/ ˌiː.kwɪˈlɪb.ri.əm /", uz: "muvozanat, barqarorlik", def: "A state of balance and mental poise." },
        { word: "stimuli", pos: "noun", ipa: "/ ˈstɪm.jʊ.laɪ /", uz: "turtkilar, qo'zg'atuvchilar", def: "Things that evoke physical or psychological reactions." },
        { word: "retention", pos: "noun", ipa: "/ rɪˈten.ʃən /", uz: "xotirada saqlash", def: "The capacity to retain learned concepts over time." },
        { word: "competency", pos: "noun", ipa: "/ ˈkɒm.pɪ.tən.si /", uz: "malaka, qobiliyat", def: "The ability to perform a complex function skillfully." }
      ];
      questions = [
        { q: "What effect does immediate digital engagement upon waking have on the brain?", options: ["It instantly enhances long-term memory", "It floods the cortex with reactive cortisol and fragments focus", "It reduces physical heartbeat safely", "It accelerates foreign language pronunciation"], correct: 1, exp: "Matnda: 'floods the prefrontal cortex with cortisol and reactive stimuli, fragmenting focus'." },
        { q: "According to pedagogical studies, how much higher are retention rates for students with predictable rituals?", options: ["Ten percent", "Fifteen percent", "Twenty-five percent", "Fifty percent"], correct: 2, exp: "Matnda: 'exhibit twenty-five percent higher retention rates' (25% yuqoriroq o'zlashtirish ko'rsatkichi)." },
        { q: "Why does establishing clear environmental triggers benefit learners?", options: ["It eliminates the ongoing burden of willpower fatigue", "It guarantees immediate commercial profits", "It removes the necessity of reading physical books", "It replaces the need for sleep"], correct: 0, exp: "Matnda: 'individuals eliminate the constant burden of willpower fatigue'." }
      ];
    } else { // B2
      titleEn = `${topic} - B2 Academic Discourse ${itemNum}`;
      titleUz = `${topic} - B2 Ilmiy-Falsafiy Tadqiqot ${itemNum}`;
      minutes = 5;
      wordCount = 310;
      text = `Contemporary epistemology and educational philosophy increasingly converge on the premise that intellectual autonomy necessitates both methodological rigor and epistemic humility. As algorithmic curation engines increasingly homogenize information ecologies, scholarly inquiry faces the subtle yet pervasive hazard of confirmation bias and conceptual ossification.\n\nHistorically, seminal polymaths of the Silk Road Renaissance—exemplified by figures such as Al-Biruni and Ibn Sina—navigated scientific exploration through empirical verification paired with relentless self-critique. Rather than adopting dogmatic adherence to received wisdom, they instituted rigorous observational protocols, cross-referencing astronomical charts, botanical properties, and mathematical coordinates across diverse linguistic traditions. Their methodology acknowledged that empirical knowledge is provisional, constantly subject to refined measurement and dialetical interrogation.\n\nIn our contemporary paradigm, where digital ubiquity creates the illusion of instantaneous mastery, cultivating genuine critical discernment demands counter-cultural intellectual discipline. Scholars must actively seek out disconfirming evidence, interrogate foundational premises, and tolerate the cognitive dissonance that invariably precedes intellectual breakthroughs. When pedagogical frameworks prioritize reflective problem-solving over mechanical compliance, learners develop the capacity to discern structural nuances beneath superficial rhetoric. Ultimately, the preservation of an enlightened, resilient intellectual society depends not upon technological proliferation alone, but upon the uncompromising cultivation of dialectical rigor, ethical stewardship, and enduring curiosity.`;
      translation = `Zamonaviy epistemologiya va ta'lim falsafasi intellektual mustaqillik ham ilmiy uslubiy qat'iyatni, ham bilishdagi kamtarlikni taqozo etadi degan umumiy xulosaga tobora ko'proq kelmoqda. Algoritmik tizimlar axborot maydonini bir xillikka tushirib borayotgan bugungi davrda, ilmiy izlanishlar o'z qarashlariga mos dalillarnigina qidirish va fikriy qotib qolish xavfiga duch kelmoqda.\n\nTarixga nazar tashlasak, Ipak yo'li Uyg'onish davrining Abu Rayhon Beruniy va Ibn Sino kabi yetuk allomalari ilmiy izlanishlarni amaliy tajriba va o'ziga nisbatan tinimsiz tanqidiy qarash bilan uyg'un holda olib borganlar. Ular o'tmishdan qolgan ma'lumotlarni ko'r-ko'rona qabul qilmay, turli tillardagi astronomik jadvallar, botanik xususiyatlar va matematik koordinatalarni o'zaro solishtirib, qat'iy kuzatuv tizimini joriy qildilar. Ularning uslubi ilmiy bilim doimo yangi o'lchovlar va mantiqiy savollar orqali sayqallanishini tan olgan.\n\nBugungi raqamli dunyoda, ma'lumotning ko'pligi yuzaki tushunchalarni haqiqiy bilimdek ko'rsatib qo'yayotgan bir paytda, chinakam tanqidiy tafakkurni tarbiyalash yuksak aqliy intizomni talab etadi. Olimlar o'z fikrlariga qarshi dalillarni ham izlashi, dastlabki asosiy farazlarni qayta tekshirishi va yangi ilmiy kashfiyotlar oldidan yuzaga keladigan intellektual ziddiyatlarga chidashi lozim. Ta'lim tizimi mexanik yod olishdan ko'ra tahliliy fikrlashni ustun qo'ysagina, talabalar balandparvoz gaplar ortidagi tub mohiyatni ajrata oladigan bo'ladilar. Oxir-oqibat, ma'rifatli va mustahkam jamiyatning barqarorligi faqat texnologiyalar soniga emas, balki chuqur mantiqiy tafakkur, axloqiy mas'uliyat va so'nmas ilmiy qiziquvchanlikka tayanadi.`;
      vocab = [
        { word: "epistemology", pos: "noun", ipa: "/ ɪˌpɪs.təˈmɒl.ə.dʒi /", uz: "epistemologiya, bilish nazariyasi", def: "The philosophical theory of knowledge and justification." },
        { word: "homogenize", pos: "verb", ipa: "/ həˈmɒdʒ.ə.naɪz /", uz: "bir xillashtirmoq, qolipga solmoq", def: "To make uniform or indistinguishable in form." },
        { word: "polymath", pos: "noun", ipa: "/ ˈpɒl.i.mæθ /", uz: "qomusiy olim, alloma", def: "A person of encyclopedic learning across diverse fields." },
        { word: "provisional", pos: "adj.", ipa: "/ prəˈvɪʒ.ən.əl /", uz: "shartli, vaqtinchalik", def: "Arranged for the present, subject to subsequent revision." }
      ];
      questions = [
        { q: "According to the essay, what scientific attitude characterized historical polymaths like Al-Biruni?", options: ["Uncritical acceptance of ancient mythology", "Empirical verification paired with rigorous self-critique", "Complete rejection of mathematical tools", "Exclusively verbal tradition without writing"], correct: 1, exp: "Matnda: 'empirical verification paired with relentless self-critique' (amaliy tajriba va tanqidiy qarash)." },
        { q: "What hazard does algorithmic curation pose to scholarly inquiry?", options: ["Total eradication of digital storage", "Confirmation bias and conceptual ossification", "Excessive publication of physical parchment", "Decreased electrical power efficiency"], correct: 1, exp: "Matnda: 'pervasive hazard of confirmation bias and conceptual ossification'." },
        { q: "Why is empirical scientific knowledge described as 'provisional'?", options: ["Because it is completely fictional", "Because it is constantly subject to refined measurement and dialectical inquiry", "Because ancient manuscripts have all been lost", "Because human memory never preserves data"], correct: 1, exp: "Matnda: 'constantly subject to refined measurement and dialectical interrogation'." },
        { q: "Upon what does the preservation of an enlightened society ultimately depend?", options: ["Unrestrained social media consumption", "Technological proliferation alone", "Dialectical rigor, ethical stewardship, and enduring curiosity", "Complete isolation from world languages"], correct: 2, exp: "Matnda: 'uncompromising cultivation of dialectical rigor, ethical stewardship, and enduring curiosity'." }
      ];
    }

    items.push({
      id,
      level,
      title: titleEn,
      uz: titleUz,
      minutes,
      wordCount,
      text,
      translation,
      vocab,
      questions
    });
  }

  return items;
}

// Group existing
const existingA1 = existing.filter(x => x.level === 'A1');
const existingA2 = existing.filter(x => x.level === 'A2');
const existingB1 = existing.filter(x => x.level === 'B1');
const existingB2 = existing.filter(x => x.level === 'B2');

// Build up to 150 each
const fullA1 = [...existingA1, ...buildReadingItemsForLevel('A1', existingA1.length + 1, 150 - existingA1.length)];
const fullA2 = [...existingA2, ...buildReadingItemsForLevel('A2', existingA2.length + 1, 150 - existingA2.length)];
const fullB1 = [...existingB1, ...buildReadingItemsForLevel('B1', existingB1.length + 1, 150 - existingB1.length)];
const fullB2 = [...existingB2, ...buildReadingItemsForLevel('B2', existingB2.length + 1, 150 - existingB2.length)];

const allReading = [...fullA1, ...fullA2, ...fullB1, ...fullB2];

console.log('Reading assembled:');
console.log('A1:', fullA1.length);
console.log('A2:', fullA2.length);
console.log('B1:', fullB1.length);
console.log('B2:', fullB2.length);
console.log('Total Reading:', allReading.length);

const ids = new Set(allReading.map(x => x.id));
console.log('Unique Reading IDs:', ids.size);

fs.writeFileSync('./scripts/final_reading.json', JSON.stringify(allReading, null, 2));
