export interface Word {
  english: string;
  kazakh: string;
  russian: string;
  example: string;
}

export interface PhrasalVerb {
  verb: string;
  meaning: string;
  example: string;
}

export interface IrregularVerb {
  base: string;
  pastSimple: string;
  pastParticiple: string;
  translation: string;
}

export const gradeContent = {
  5: {
    vocabulary: [
      { english: "Family", kazakh: "Отбасы", russian: "Семья", example: "My family is very big." },
      { english: "School", kazakh: "Мектеп", russian: "Школа", example: "I go to school every day." },
      { english: "Friend", kazakh: "Дос", russian: "Друг", example: "She is my best friend." },
      { english: "Teacher", kazakh: "Мұғалім", russian: "Учитель", example: "Our teacher is kind." },
      { english: "Book", kazakh: "Кітап", russian: "Книга", example: "This book is interesting." },
      { english: "Pencil", kazakh: "Қарындаш", russian: "Карандаш", example: "I need a pencil." },
      { english: "House", kazakh: "Үй", russian: "Дом", example: "This is my house." },
      { english: "Cat", kazakh: "Мысық", russian: "Кошка", example: "I have a black cat." },
      { english: "Dog", kazakh: "Ит", russian: "Собака", example: "My dog is friendly." },
      { english: "Food", kazakh: "Тамақ", russian: "Еда", example: "I like healthy food." },
    ],
    phrasalVerbs: [
      { verb: "get up", meaning: "тұру, вставать", example: "I get up at 7 AM." },
      { verb: "wake up", meaning: "ояну, просыпаться", example: "I wake up early." },
      { verb: "sit down", meaning: "отыру, садиться", example: "Please sit down." },
      { verb: "stand up", meaning: "тұру, вставать", example: "Stand up, please." },
      { verb: "come in", meaning: "кіру, входить", example: "Come in and close the door." },
    ],
    irregularVerbs: [
      { base: "be", pastSimple: "was/were", pastParticiple: "been", translation: "болу / быть" },
      { base: "have", pastSimple: "had", pastParticiple: "had", translation: "иелену / иметь" },
      { base: "do", pastSimple: "did", pastParticiple: "done", translation: "жасау / делать" },
      { base: "go", pastSimple: "went", pastParticiple: "gone", translation: "бару / идти" },
      { base: "make", pastSimple: "made", pastParticiple: "made", translation: "жасау / делать" },
      { base: "see", pastSimple: "saw", pastParticiple: "seen", translation: "көру / видеть" },
      { base: "come", pastSimple: "came", pastParticiple: "come", translation: "келу / приходить" },
      { base: "get", pastSimple: "got", pastParticiple: "got/gotten", translation: "алу / получать" },
    ],
  },
  6: {
    vocabulary: [
      { english: "Adventure", kazakh: "Шытырман оқиға", russian: "Приключение", example: "We had an amazing adventure." },
      { english: "Weather", kazakh: "Ауа райы", russian: "Погода", example: "The weather is nice today." },
      { english: "Shopping", kazakh: "Сауда", russian: "Покупки", example: "I love shopping for clothes." },
      { english: "Restaurant", kazakh: "Мейрамхана", russian: "Ресторан", example: "Let's go to a restaurant." },
      { english: "Holiday", kazakh: "Мереке", russian: "Праздник", example: "Christmas is my favorite holiday." },
      { english: "Sport", kazakh: "Спорт", russian: "Спорт", example: "I play sport every weekend." },
      { english: "Music", kazakh: "Музыка", russian: "Музыка", example: "I listen to music daily." },
      { english: "Movie", kazakh: "Фильм", russian: "Фильм", example: "That movie was great." },
      { english: "Travel", kazakh: "Саяхат", russian: "Путешествие", example: "I love to travel." },
      { english: "Nature", kazakh: "Табиғат", russian: "Природа", example: "Nature is beautiful." },
    ],
    phrasalVerbs: [
      { verb: "look for", meaning: "іздеу, искать", example: "I'm looking for my keys." },
      { verb: "look after", meaning: "қарау, ухаживать", example: "She looks after her brother." },
      { verb: "turn on", meaning: "қосу, включать", example: "Turn on the light, please." },
      { verb: "turn off", meaning: "өшіру, выключать", example: "Don't forget to turn off the TV." },
      { verb: "put on", meaning: "кию, надевать", example: "Put on your coat." },
      { verb: "take off", meaning: "шешу, снимать", example: "Take off your shoes." },
    ],
    irregularVerbs: [
      { base: "eat", pastSimple: "ate", pastParticiple: "eaten", translation: "жеу / есть" },
      { base: "drink", pastSimple: "drank", pastParticiple: "drunk", translation: "ішу / пить" },
      { base: "write", pastSimple: "wrote", pastParticiple: "written", translation: "жазу / писать" },
      { base: "read", pastSimple: "read", pastParticiple: "read", translation: "оқу / читать" },
      { base: "speak", pastSimple: "spoke", pastParticiple: "spoken", translation: "сөйлеу / говорить" },
      { base: "take", pastSimple: "took", pastParticiple: "taken", translation: "алу / брать" },
      { base: "give", pastSimple: "gave", pastParticiple: "given", translation: "беру / давать" },
      { base: "know", pastSimple: "knew", pastParticiple: "known", translation: "білу / знать" },
    ],
  },
  7: {
    vocabulary: [
      { english: "Environment", kazakh: "Қоршаған орта", russian: "Окружающая среда", example: "We must protect the environment." },
      { english: "Technology", kazakh: "Технология", russian: "Технология", example: "Technology changes our lives." },
      { english: "Achievement", kazakh: "Жетістік", russian: "Достижение", example: "This is a great achievement." },
      { english: "Competition", kazakh: "Жарыс", russian: "Соревнование", example: "She won the competition." },
      { english: "Knowledge", kazakh: "Білім", russian: "Знание", example: "Knowledge is power." },
      { english: "Experience", kazakh: "Тәжірибе", russian: "Опыт", example: "I need more experience." },
      { english: "Opportunity", kazakh: "Мүмкіндік", russian: "Возможность", example: "This is a great opportunity." },
      { english: "Challenge", kazakh: "Қиындық", russian: "Вызов", example: "I accept this challenge." },
      { english: "Success", kazakh: "Табыс", russian: "Успех", example: "Hard work leads to success." },
      { english: "Failure", kazakh: "Сәтсіздік", russian: "Неудача", example: "Don't fear failure." },
    ],
    phrasalVerbs: [
      { verb: "give up", meaning: "бас тарту, сдаваться", example: "Never give up on your dreams." },
      { verb: "find out", meaning: "білу, узнавать", example: "I need to find out the truth." },
      { verb: "carry on", meaning: "жалғастыру, продолжать", example: "Carry on with your work." },
      { verb: "work out", meaning: "шешу, решать", example: "I need to work out this problem." },
      { verb: "set up", meaning: "құру, создавать", example: "They set up a new company." },
      { verb: "bring up", meaning: "тәрбиелеу, воспитывать", example: "She brought up three children." },
      { verb: "grow up", meaning: "өсу, расти", example: "I grew up in a small town." },
    ],
    irregularVerbs: [
      { base: "think", pastSimple: "thought", pastParticiple: "thought", translation: "ойлау / думать" },
      { base: "teach", pastSimple: "taught", pastParticiple: "taught", translation: "оқыту / учить" },
      { base: "buy", pastSimple: "bought", pastParticiple: "bought", translation: "сатып алу / покупать" },
      { base: "bring", pastSimple: "brought", pastParticiple: "brought", translation: "әкелу / приносить" },
      { base: "feel", pastSimple: "felt", pastParticiple: "felt", translation: "сезу / чувствовать" },
      { base: "find", pastSimple: "found", pastParticiple: "found", translation: "табу / находить" },
      { base: "understand", pastSimple: "understood", pastParticiple: "understood", translation: "түсіну / понимать" },
      { base: "tell", pastSimple: "told", pastParticiple: "told", translation: "айту / говорить" },
    ],
  },
  8: {
    vocabulary: [
      { english: "Ambition", kazakh: "Мұрат", russian: "Амбиция", example: "She has great ambition." },
      { english: "Confidence", kazakh: "Сенімділік", russian: "Уверенность", example: "He speaks with confidence." },
      { english: "Responsibility", kazakh: "Жауапкершілік", russian: "Ответственность", example: "This is your responsibility." },
      { english: "Independence", kazakh: "Тәуелсіздік", russian: "Независимость", example: "They gained independence." },
      { english: "Creativity", kazakh: "Шығармашылық", russian: "Креативность", example: "Art requires creativity." },
      { english: "Patience", kazakh: "Шыдамдылық", russian: "Терпение", example: "Teaching requires patience." },
      { english: "Courage", kazakh: "Батылдық", russian: "Смелость", example: "It takes courage to change." },
      { english: "Honesty", kazakh: "Шыншылдық", russian: "Честность", example: "Honesty is important." },
      { english: "Wisdom", kazakh: "Даналық", russian: "Мудрость", example: "He shared his wisdom." },
      { english: "Curiosity", kazakh: "Қызығушылық", russian: "Любопытство", example: "Curiosity drives learning." },
    ],
    phrasalVerbs: [
      { verb: "break down", meaning: "бұзылу, ломаться", example: "The car broke down." },
      { verb: "break up", meaning: "ажырасу, расставаться", example: "They broke up last year." },
      { verb: "catch up", meaning: "жету, догонять", example: "I need to catch up with work." },
      { verb: "check in", meaning: "тіркелу, регистрироваться", example: "We need to check in at the hotel." },
      { verb: "figure out", meaning: "түсіну, понимать", example: "I finally figured out the answer." },
      { verb: "get along", meaning: "тату болу, ладить", example: "They get along well." },
      { verb: "hold on", meaning: "күту, ждать", example: "Hold on a minute." },
      { verb: "run into", meaning: "кездесу, встречать", example: "I ran into an old friend." },
    ],
    irregularVerbs: [
      { base: "become", pastSimple: "became", pastParticiple: "become", translation: "болу / становиться" },
      { base: "begin", pastSimple: "began", pastParticiple: "begun", translation: "бастау / начинать" },
      { base: "choose", pastSimple: "chose", pastParticiple: "chosen", translation: "таңдау / выбирать" },
      { base: "forget", pastSimple: "forgot", pastParticiple: "forgotten", translation: "ұмыту / забывать" },
      { base: "lose", pastSimple: "lost", pastParticiple: "lost", translation: "жоғалту / терять" },
      { base: "meet", pastSimple: "met", pastParticiple: "met", translation: "кездесу / встречать" },
      { base: "send", pastSimple: "sent", pastParticiple: "sent", translation: "жіберу / отправлять" },
      { base: "spend", pastSimple: "spent", pastParticiple: "spent", translation: "жұмсау / тратить" },
    ],
  },
  9: {
    vocabulary: [
      { english: "Sustainable", kazakh: "Тұрақты", russian: "Устойчивый", example: "We need sustainable development." },
      { english: "Contemporary", kazakh: "Қазіргі заманғы", russian: "Современный", example: "Contemporary art is diverse." },
      { english: "Controversial", kazakh: "Даулы", russian: "Спорный", example: "This is a controversial topic." },
      { english: "Inevitable", kazakh: "Болмайтын", russian: "Неизбежный", example: "Change is inevitable." },
      { english: "Perspective", kazakh: "Көзқарас", russian: "Перспектива", example: "We need a different perspective." },
      { english: "Significance", kazakh: "Маңыздылық", russian: "Значимость", example: "This has great significance." },
      { english: "Diversity", kazakh: "Әртүрлілік", russian: "Разнообразие", example: "Diversity makes us stronger." },
      { english: "Integrity", kazakh: "Адалдық", russian: "Честность", example: "He is a man of integrity." },
      { english: "Innovation", kazakh: "Жаңашылдық", russian: "Инновация", example: "Innovation drives progress." },
      { english: "Resilience", kazakh: "Төзімділік", russian: "Устойчивость", example: "She showed great resilience." },
    ],
    phrasalVerbs: [
      { verb: "come across", meaning: "кездестіру, натыкаться", example: "I came across an interesting article." },
      { verb: "deal with", meaning: "айналысу, иметь дело", example: "How do you deal with stress?" },
      { verb: "look forward to", meaning: "асыға күту, ждать с нетерпением", example: "I look forward to seeing you." },
      { verb: "put up with", meaning: "төзу, терпеть", example: "I can't put up with this noise." },
      { verb: "run out of", meaning: "таусылу, заканчиваться", example: "We ran out of coffee." },
      { verb: "take after", meaning: "ұқсау, быть похожим", example: "She takes after her mother." },
      { verb: "turn down", meaning: "қабылдамау, отклонять", example: "They turned down my offer." },
      { verb: "count on", meaning: "сену, рассчитывать", example: "You can count on me." },
    ],
    irregularVerbs: [
      { base: "arise", pastSimple: "arose", pastParticiple: "arisen", translation: "пайда болу / возникать" },
      { base: "bear", pastSimple: "bore", pastParticiple: "borne", translation: "көтеру / нести" },
      { base: "overcome", pastSimple: "overcame", pastParticiple: "overcome", translation: "жеңу / преодолевать" },
      { base: "prove", pastSimple: "proved", pastParticiple: "proven", translation: "дәлелдеу / доказывать" },
      { base: "seek", pastSimple: "sought", pastParticiple: "sought", translation: "іздеу / искать" },
      { base: "stick", pastSimple: "stuck", pastParticiple: "stuck", translation: "жабысу / приклеивать" },
      { base: "strike", pastSimple: "struck", pastParticiple: "struck", translation: "соғу / ударять" },
      { base: "undergo", pastSimple: "underwent", pastParticiple: "undergone", translation: "өту / проходить" },
    ],
  },
};
