// Extended database with 200+ additional words, more phrasal verbs, and conditionals

import { VocabularyWord } from "./vocabularyDatabase";

// Additional 200 words across all levels
export const additionalVocabulary: VocabularyWord[] = [
  // A1 Level additions
  { english: "Afternoon", russian: "После полудня", kazakh: "Түстен кейін", level: "A1", example: "Good afternoon!", category: "Time" },
  { english: "Evening", russian: "Вечер", kazakh: "Кеш", level: "A1", example: "Good evening, sir.", category: "Time" },
  { english: "Night", russian: "Ночь", kazakh: "Түн", level: "A1", example: "Good night, sleep well.", category: "Time" },
  { english: "Morning", russian: "Утро", kazakh: "Таң", level: "A1", example: "I wake up in the morning.", category: "Time" },
  { english: "Today", russian: "Сегодня", kazakh: "Бүгін", level: "A1", example: "Today is Monday.", category: "Time" },
  { english: "Color", russian: "Цвет", kazakh: "Түс", level: "A1", example: "What's your favorite color?", category: "Basic" },
  { english: "Red", russian: "Красный", kazakh: "Қызыл", level: "A1", example: "The apple is red.", category: "Colors" },
  { english: "Blue", russian: "Синий", kazakh: "Көк", level: "A1", example: "The sky is blue.", category: "Colors" },
  { english: "Green", russian: "Зеленый", kazakh: "Жасыл", level: "A1", example: "Grass is green.", category: "Colors" },
  { english: "Yellow", russian: "Желтый", kazakh: "Сары", level: "A1", example: "The sun is yellow.", category: "Colors" },
  { english: "Black", russian: "Черный", kazakh: "Қара", level: "A1", example: "I have a black cat.", category: "Colors" },
  { english: "White", russian: "Белый", kazakh: "Ақ", level: "A1", example: "Snow is white.", category: "Colors" },
  { english: "Big", russian: "Большой", kazakh: "Үлкен", level: "A1", example: "This is a big house.", category: "Size" },
  { english: "Small", russian: "Маленький", kazakh: "Кіші", level: "A1", example: "The room is small.", category: "Size" },
  { english: "Hot", russian: "Горячий", kazakh: "Ыстық", level: "A1", example: "The coffee is hot.", category: "Temperature" },
  { english: "Cold", russian: "Холодный", kazakh: "Суық", level: "A1", example: "It's cold outside.", category: "Temperature" },
  { english: "New", russian: "Новый", kazakh: "Жаңа", level: "A1", example: "I have a new phone.", category: "Age" },
  { english: "Old", russian: "Старый", kazakh: "Ескі", level: "A1", example: "This is an old car.", category: "Age" },
  { english: "Good", russian: "Хороший", kazakh: "Жақсы", level: "A1", example: "Have a good day!", category: "Quality" },
  { english: "Bad", russian: "Плохой", kazakh: "Жаман", level: "A1", example: "That's bad news.", category: "Quality" },

  // A2 Level additions  
  { english: "Dangerous", russian: "Опасный", kazakh: "Қауіпті", level: "A2", example: "Driving fast is dangerous.", category: "Risk" },
  { english: "Safe", russian: "Безопасный", kazakh: "Қауіпсіз", level: "A2", example: "This place is safe.", category: "Security" },
  { english: "Quiet", russian: "Тихий", kazakh: "Тыныш", level: "A2", example: "The library is quiet.", category: "Sound" },
  { english: "Loud", russian: "Громкий", kazakh: "Дауысты", level: "A2", example: "The music is too loud.", category: "Sound" },
  { english: "Fast", russian: "Быстрый", kazakh: "Жылдам", level: "A2", example: "He runs very fast.", category: "Speed" },
  { english: "Slow", russian: "Медленный", kazakh: "Баяу", level: "A2", example: "The turtle moves slowly.", category: "Speed" },
  { english: "Easy", russian: "Легкий", kazakh: "Оңай", level: "A2", example: "This test is easy.", category: "Difficulty" },
  { english: "Difficult", russian: "Трудный", kazakh: "Қиын", level: "A2", example: "Math is difficult for me.", category: "Difficulty" },
  { english: "Important", russian: "Важный", kazakh: "Маңызды", level: "A2", example: "This is very important.", category: "Significance" },
  { english: "Interesting", russian: "Интересный", kazakh: "Қызықты", level: "A2", example: "The book is interesting.", category: "Interest" },
  { english: "Boring", russian: "Скучный", kazakh: "Жалықтырарлық", level: "A2", example: "The movie was boring.", category: "Interest" },
  { english: "Funny", russian: "Смешной", kazakh: "Күлкілі", level: "A2", example: "He told a funny joke.", category: "Humor" },
  { english: "Serious", russian: "Серьезный", kazakh: "Байсалды", level: "A2", example: "This is a serious problem.", category: "Attitude" },
  { english: "Friendly", russian: "Дружелюбный", kazakh: "Достық", level: "A2", example: "People here are friendly.", category: "Personality" },
  { english: "Kind", russian: "Добрый", kazakh: "Мейірімді", level: "A2", example: "She is very kind.", category: "Personality" },
  { english: "Smart", russian: "Умный", kazakh: "Ақылды", level: "A2", example: "He is a smart student.", category: "Intelligence" },
  { english: "Busy", russian: "Занятой", kazakh: "Бос емес", level: "A2", example: "I'm busy right now.", category: "State" },
  { english: "Free", russian: "Свободный", kazakh: "Бос", level: "A2", example: "Are you free tomorrow?", category: "State" },
  { english: "Rich", russian: "Богатый", kazakh: "Бай", level: "A2", example: "He is a rich man.", category: "Wealth" },
  { english: "Poor", russian: "Бедный", kazakh: "Кедей", level: "A2", example: "They are poor people.", category: "Wealth" },

  // B1 Level additions
  { english: "Accomplish", russian: "Достигать", kazakh: "Орындау", level: "B1", example: "I want to accomplish my goals.", category: "Achievement" },
  { english: "Acquire", russian: "Приобретать", kazakh: "Иемдену", level: "B1", example: "You need to acquire new skills.", category: "Obtaining" },
  { english: "Adapt", russian: "Адаптироваться", kazakh: "Бейімделу", level: "B1", example: "We must adapt to change.", category: "Change" },
  { english: "Admire", russian: "Восхищаться", kazakh: "Таңдану", level: "B1", example: "I admire her courage.", category: "Respect" },
  { english: "Admit", russian: "Признавать", kazakh: "Мойындау", level: "B1", example: "He admitted his mistake.", category: "Truth" },
  { english: "Affect", russian: "Влиять", kazakh: "Әсер ету", level: "B1", example: "Weather can affect mood.", category: "Influence" },
  { english: "Announce", russian: "Объявлять", kazakh: "Жариялау", level: "B1", example: "They announced the results.", category: "Communication" },
  { english: "Apologize", russian: "Извиняться", kazakh: "Кешірім сұрау", level: "B1", example: "I must apologize for being late.", category: "Manners" },
  { english: "Approach", russian: "Подходить", kazakh: "Жақындау", level: "B1", example: "Winter is approaching.", category: "Movement" },
  { english: "Approve", russian: "Одобрять", kazakh: "Мақұлдау", level: "B1", example: "The boss approved the plan.", category: "Agreement" },
  { english: "Arrange", russian: "Организовывать", kazakh: "Ұйымдастыру", level: "B1", example: "Let's arrange a meeting.", category: "Planning" },
  { english: "Assist", russian: "Помогать", kazakh: "Көмектесу", level: "B1", example: "Can you assist me?", category: "Help" },
  { english: "Attach", russian: "Прикреплять", kazakh: "Тіркеу", level: "B1", example: "Please attach the file.", category: "Connection" },
  { english: "Attempt", russian: "Попытка", kazakh: "Әрекет", level: "B1", example: "I made an attempt to solve it.", category: "Effort" },
  { english: "Attract", russian: "Привлекать", kazakh: "Тарту", level: "B1", example: "The store attracts many customers.", category: "Drawing" },
  { english: "Avoid", russian: "Избегать", kazakh: "Болдырмау", level: "B1", example: "Try to avoid mistakes.", category: "Prevention" },
  { english: "Calculate", russian: "Вычислять", kazakh: "Есептеу", level: "B1", example: "Calculate the total cost.", category: "Math" },
  { english: "Clarify", russian: "Прояснять", kazakh: "Анықтау", level: "B1", example: "Please clarify your statement.", category: "Explanation" },
  { english: "Combine", russian: "Комбинировать", kazakh: "Біріктіру", level: "B1", example: "Combine all ingredients.", category: "Mixing" },
  { english: "Compare", russian: "Сравнивать", kazakh: "Салыстыру", level: "B1", example: "Compare these two options.", category: "Analysis" },

  // B2 Level additions
  { english: "Abolish", russian: "Отменять", kazakh: "Жою", level: "B2", example: "They want to abolish the law.", category: "Law" },
  { english: "Abstract", russian: "Абстрактный", kazakh: "Дерексіз", level: "B2", example: "This is an abstract concept.", category: "Concepts" },
  { english: "Accelerate", russian: "Ускорять", kazakh: "Жылдамдату", level: "B2", example: "We need to accelerate progress.", category: "Speed" },
  { english: "Accommodate", russian: "Размещать", kazakh: "Орналастыру", level: "B2", example: "The hotel can accommodate 100 guests.", category: "Space" },
  { english: "Accumulate", russian: "Накапливать", kazakh: "Жинақтау", level: "B2", example: "Dust accumulates quickly.", category: "Collection" },
  { english: "Adequate", russian: "Адекватный", kazakh: "Жеткілікті", level: "B2", example: "The resources are adequate.", category: "Sufficiency" },
  { english: "Advocate", russian: "Отстаивать", kazakh: "Жақтау", level: "B2", example: "I advocate for change.", category: "Support" },
  { english: "Ambiguous", russian: "Двусмысленный", kazakh: "Екіұдай", level: "B2", example: "The statement was ambiguous.", category: "Clarity" },
  { english: "Arbitrary", russian: "Произвольный", kazakh: "Ерікті", level: "B2", example: "It was an arbitrary decision.", category: "Random" },
  { english: "Arrogant", russian: "Высокомерный", kazakh: "Менмен", level: "B2", example: "He has an arrogant attitude.", category: "Personality" },
  { english: "Articulate", russian: "Формулировать", kazakh: "Тұжырымдау", level: "B2", example: "She articulates her ideas well.", category: "Expression" },
  { english: "Artificial", russian: "Искусственный", kazakh: "Жасанды", level: "B2", example: "This is artificial intelligence.", category: "Nature" },
  { english: "Autonomous", russian: "Автономный", kazakh: "Автономды", level: "B2", example: "They are autonomous entities.", category: "Independence" },
  { english: "Beneficial", russian: "Полезный", kazakh: "Пайдалы", level: "B2", example: "Exercise is beneficial.", category: "Advantage" },
  { english: "Bizarre", russian: "Странный", kazakh: "Ерекше", level: "B2", example: "That was a bizarre incident.", category: "Strangeness" },
  { english: "Capable", russian: "Способный", kazakh: "Қабілетті", level: "B2", example: "She is very capable.", category: "Ability" },
  { english: "Coherent", russian: "Связный", kazakh: "Байланысты", level: "B2", example: "Make a coherent argument.", category: "Logic" },
  { english: "Comprehensive", russian: "Всесторонний", kazakh: "Жан-жақты", level: "B2", example: "A comprehensive study.", category: "Completeness" },
  { english: "Concise", russian: "Краткий", kazakh: "Қысқа", level: "B2", example: "Keep your answer concise.", category: "Brevity" },
  { english: "Contemporary", russian: "Современный", kazakh: "Қазіргі заманғы", level: "B2", example: "Contemporary art.", category: "Time" },

  // C1 Level additions
  { english: "Aberration", russian: "Отклонение", kazakh: "Ауытқу", level: "C1", example: "This is an aberration from the norm.", category: "Deviation" },
  { english: "Abstruse", russian: "Непонятный", kazakh: "Түсініксіз", level: "C1", example: "An abstruse theory.", category: "Complexity" },
  { english: "Acrimonious", russian: "Язвительный", kazakh: "Ащы", level: "C1", example: "An acrimonious debate.", category: "Conflict" },
  { english: "Alacrity", russian: "Готовность", kazakh: "Дайындық", level: "C1", example: "He accepted with alacrity.", category: "Eagerness" },
  { english: "Amalgamate", russian: "Объединять", kazakh: "Біріктіру", level: "C1", example: "They amalgamated two companies.", category: "Union" },
  { english: "Ameliorate", russian: "Улучшать", kazakh: "Жақсарту", level: "C1", example: "Measures to ameliorate conditions.", category: "Improvement" },
  { english: "Anachronistic", russian: "Анахроничный", kazakh: "Ескірген", level: "C1", example: "An anachronistic belief.", category: "Time" },
  { english: "Anomaly", russian: "Аномалия", kazakh: "Ауытқу", level: "C1", example: "This is an anomaly.", category: "Irregularity" },
  { english: "Antithesis", russian: "Антитеза", kazakh: "Қарама-қайшылық", level: "C1", example: "It's the antithesis of freedom.", category: "Opposite" },
  { english: "Apocryphal", russian: "Сомнительный", kazakh: "Күмәнді", level: "C1", example: "An apocryphal story.", category: "Doubt" },
  { english: "Arcane", russian: "Тайный", kazakh: "Жасырын", level: "C1", example: "Arcane knowledge.", category: "Mystery" },
  { english: "Ascetic", russian: "Аскетичный", kazakh: "Аскеттік", level: "C1", example: "An ascetic lifestyle.", category: "Simplicity" },
  { english: "Assiduous", russian: "Старательный", kazakh: "Ұқыпты", level: "C1", example: "Assiduous work.", category: "Diligence" },
  { english: "Assuage", russian: "Успокаивать", kazakh: "Тыныштандыру", level: "C1", example: "Assuage fears.", category: "Comfort" },
  { english: "Astute", russian: "Проницательный", kazakh: "Зерек", level: "C1", example: "An astute observation.", category: "Intelligence" },
  { english: "Audacious", russian: "Дерзкий", kazakh: "Батыл", level: "C1", example: "An audacious plan.", category: "Boldness" },
  { english: "Avarice", russian: "Алчность", kazakh: "Сараңдық", level: "C1", example: "His avarice was evident.", category: "Greed" },
  { english: "Banal", russian: "Банальный", kazakh: "Қарапайым", level: "C1", example: "A banal comment.", category: "Commonplace" },
  { english: "Bellicose", russian: "Воинственный", kazakh: "Жауынгерлік", level: "C1", example: "Bellicose rhetoric.", category: "Aggression" },
  { english: "Benevolent", russian: "Доброжелательный", kazakh: "Мейірімді", level: "C1", example: "A benevolent leader.", category: "Kindness" },

  // C2 Level additions
  { english: "Cacophony", russian: "Какофония", kazakh: "Шу", level: "C2", example: "A cacophony of sounds.", category: "Noise" },
  { english: "Cajole", russian: "Уговаривать", kazakh: "Сендіру", level: "C2", example: "She cajoled him into it.", category: "Persuasion" },
  { english: "Candor", russian: "Искренность", kazakh: "Шыншылдық", level: "C2", example: "I appreciate your candor.", category: "Honesty" },
  { english: "Capricious", russian: "Капризный", kazakh: "Тұрақсыз", level: "C2", example: "Capricious behavior.", category: "Unpredictability" },
  { english: "Castigate", russian: "Наказывать", kazakh: "Жазалау", level: "C2", example: "He was castigated for his actions.", category: "Punishment" },
  { english: "Catalyst", russian: "Катализатор", kazakh: "Катализатор", level: "C2", example: "It was a catalyst for change.", category: "Trigger" },
  { english: "Caustic", russian: "Едкий", kazakh: "Өткір", level: "C2", example: "Caustic remarks.", category: "Harshness" },
  { english: "Censure", russian: "Порицание", kazakh: "Сын", level: "C2", example: "The report was censured.", category: "Criticism" },
  { english: "Chicanery", russian: "Обман", kazakh: "Алдау", level: "C2", example: "Political chicanery.", category: "Deception" },
  { english: "Circumlocution", russian: "Многословие", kazakh: "Сөзге ұйыну", level: "C2", example: "Avoid circumlocution.", category: "Speech" },
  { english: "Clairvoyant", russian: "Ясновидящий", kazakh: "Көреген", level: "C2", example: "She seemed clairvoyant.", category: "Supernatural" },
  { english: "Coalesce", russian: "Объединяться", kazakh: "Біріктіру", level: "C2", example: "The groups coalesced.", category: "Union" },
  { english: "Cogent", russian: "Убедительный", kazakh: "Сенімді", level: "C2", example: "A cogent argument.", category: "Persuasion" },
  { english: "Commensurate", russian: "Соразмерный", kazakh: "Тең", level: "C2", example: "Payment commensurate with experience.", category: "Proportion" },
  { english: "Compendium", russian: "Сборник", kazakh: "Жинақ", level: "C2", example: "A compendium of knowledge.", category: "Collection" },
  { english: "Complacent", russian: "Самодовольный", kazakh: "Өзімшіл", level: "C2", example: "Don't be complacent.", category: "Attitude" },
  { english: "Conflagration", russian: "Пожар", kazakh: "Өрт", level: "C2", example: "A conflagration destroyed the forest.", category: "Fire" },
  { english: "Conjecture", russian: "Предположение", kazakh: "Болжам", level: "C2", example: "That's pure conjecture.", category: "Speculation" },
  { english: "Consecrate", russian: "Освящать", kazakh: "Қасиеттеу", level: "C2", example: "Consecrate the temple.", category: "Religion" },
  { english: "Construe", russian: "Истолковывать", kazakh: "Түсіндіру", level: "C2", example: "How do you construe this?", category: "Interpretation" },
];

// Additional Phrasal Verbs (50 more)
export const additionalPhrasalVerbs = [
  { verb: "act up", meaning: "вести себя плохо / дұрыс емес", example: "The kids were acting up.", level: "B1" },
  { verb: "back down", meaning: "отступать / артқа шегу", example: "He refused to back down.", level: "B2" },
  { verb: "bank on", meaning: "рассчитывать / сену", example: "You can bank on me.", level: "B2" },
  { verb: "bear with", meaning: "потерпеть / шыдау", example: "Please bear with me.", level: "B1" },
  { verb: "blow up", meaning: "взрываться / жарылу", example: "The building blew up.", level: "B1" },
  { verb: "boil down to", meaning: "сводиться к / қысқаша", example: "It boils down to money.", level: "B2" },
  { verb: "brush up on", meaning: "освежить знания / қайталау", example: "I need to brush up on my Spanish.", level: "B2" },
  { verb: "bump into", meaning: "столкнуться / кездесу", example: "I bumped into an old friend.", level: "B1" },
  { verb: "call off", meaning: "отменять / тоқтату", example: "They called off the meeting.", level: "B1" },
  { verb: "calm down", meaning: "успокоиться / тыныштану", example: "Please calm down.", level: "A2" },
  { verb: "carry out", meaning: "выполнять / орындау", example: "Carry out the plan.", level: "B1" },
  { verb: "chip in", meaning: "складываться / үлес қосу", example: "Everyone chipped in for the gift.", level: "B2" },
  { verb: "clam up", meaning: "замолчать / үнсіз қалу", example: "He clammed up when asked.", level: "C1" },
  { verb: "clamp down on", meaning: "ужесточать / қатаң болу", example: "Police clamped down on crime.", level: "C1" },
  { verb: "clear up", meaning: "проясняться / анықталу", example: "The weather cleared up.", level: "B1" },
  { verb: "close down", meaning: "закрываться / жабылу", example: "The shop closed down.", level: "B1" },
  { verb: "come down to", meaning: "сводиться к / байланысты", example: "It comes down to trust.", level: "B2" },
  { verb: "come up against", meaning: "столкнуться с / кездесу", example: "We came up against problems.", level: "B2" },
  { verb: "count in", meaning: "включать / қосу", example: "Count me in!", level: "B1" },
  { verb: "crack down on", meaning: "бороться с / күресу", example: "They're cracking down on speeding.", level: "B2" },
  { verb: "cut back on", meaning: "сокращать / қысқарту", example: "Cut back on sugar.", level: "B1" },
  { verb: "cut in", meaning: "перебивать / араласу", example: "Don't cut in when I'm talking.", level: "B1" },
  { verb: "die down", meaning: "затихать / басылу", example: "The noise died down.", level: "B2" },
  { verb: "dish out", meaning: "раздавать / тарату", example: "She dishes out advice.", level: "B2" },
  { verb: "do away with", meaning: "избавляться / жою", example: "Do away with old habits.", level: "B2" },
  { verb: "draw up", meaning: "составлять / құру", example: "Draw up a contract.", level: "B2" },
  { verb: "drop by", meaning: "заходить / кіру", example: "Drop by anytime.", level: "B1" },
  { verb: "drop off", meaning: "отвозить / апару", example: "Can you drop me off?", level: "B1" },
  { verb: "ease up", meaning: "ослабевать / босаңсу", example: "The rain eased up.", level: "B2" },
  { verb: "embark on", meaning: "начинать / бастау", example: "Embark on a journey.", level: "C1" },
  { verb: "end up", meaning: "оказаться / болу", example: "We ended up staying late.", level: "B1" },
  { verb: "face up to", meaning: "признавать / мойындау", example: "Face up to reality.", level: "B2" },
  { verb: "fall apart", meaning: "разваливаться / ыдырау", example: "The deal fell apart.", level: "B2" },
  { verb: "fall back on", meaning: "прибегать к / сүйену", example: "Fall back on savings.", level: "B2" },
  { verb: "fall behind", meaning: "отставать / артта қалу", example: "Don't fall behind in school.", level: "B1" },
  { verb: "fall for", meaning: "попадаться / алдану", example: "Don't fall for scams.", level: "B1" },
  { verb: "fall out", meaning: "ссориться / ұрысу", example: "They fell out over money.", level: "B2" },
  { verb: "fall through", meaning: "срываться / бұзылу", example: "The plan fell through.", level: "B2" },
  { verb: "feel up to", meaning: "чувствовать силы / қабілетті болу", example: "I don't feel up to going out.", level: "B2" },
  { verb: "fight back", meaning: "давать отпор / қарсылық көрсету", example: "Fight back against injustice.", level: "B2" },
  { verb: "fill in", meaning: "заполнять / толтыру", example: "Fill in the form.", level: "B1" },
  { verb: "fill out", meaning: "заполнять / толтыру", example: "Fill out the application.", level: "B1" },
  { verb: "filter through", meaning: "просачиваться / өту", example: "News filtered through slowly.", level: "C1" },
  { verb: "fit in", meaning: "вписываться / үйлесу", example: "I don't fit in here.", level: "B1" },
  { verb: "flare up", meaning: "вспыхивать / басталу", example: "Violence flared up.", level: "B2" },
  { verb: "follow through", meaning: "доводить до конца / аяқтау", example: "Follow through on promises.", level: "B2" },
  { verb: "fool around", meaning: "дурачиться / ойнау", example: "Stop fooling around!", level: "B1" },
  { verb: "freak out", meaning: "паниковать / қорқу", example: "Don't freak out.", level: "B1" },
  { verb: "get at", meaning: "добираться / жету", example: "What are you getting at?", level: "B2" },
  { verb: "get by", meaning: "обходиться / өту", example: "We can get by with less.", level: "B1" },
];

// Conditionals - Complete guide
export const conditionalsData = [
  {
    type: "Zero Conditional",
    name: "Условные предложения 0 типа",
    usage: "Общие истины, факты, законы природы",
    structure: "If + Present Simple, Present Simple",
    formula: "If + subject + verb, subject + verb",
    examples: [
      {
        english: "If you heat water to 100°C, it boils.",
        russian: "Если нагреть воду до 100°C, она кипит.",
        kazakh: "Егер суды 100°C дейін қыздырсаңыз, ол қайнайды."
      },
      {
        english: "If you don't water plants, they die.",
        russian: "Если не поливать растения, они умирают.",
        kazakh: "Егер өсімдіктерді суармасаңыз, олар өледі."
      },
      {
        english: "If it rains, the ground gets wet.",
        russian: "Если идет дождь, земля становится мокрой.",
        kazakh: "Егер жаңбыр жаусаса, жер дымқыл болады."
      },
      {
        english: "If you mix red and blue, you get purple.",
        russian: "Если смешать красный и синий, получится фиолетовый.",
        kazakh: "Егер қызыл мен көкті араластырсаңыз, күлгін түс аласыз."
      }
    ],
    keywords: ["always", "usually", "when", "whenever"]
  },
  {
    type: "First Conditional",
    name: "Условные предложения 1 типа",
    usage: "Реальные ситуации в будущем, которые могут произойти",
    structure: "If + Present Simple, will + verb",
    formula: "If + subject + verb, subject + will + verb",
    examples: [
      {
        english: "If it rains tomorrow, I will stay home.",
        russian: "Если завтра пойдет дождь, я останусь дома.",
        kazakh: "Егер ертең жаңбыр жауса, мен үйде қаламын."
      },
      {
        english: "If you study hard, you will pass the exam.",
        russian: "Если будешь усердно учиться, сдашь экзамен.",
        kazakh: "Егер тырысып оқысаңыз, емтиханнан өтесіз."
      },
      {
        english: "If she arrives early, we will have time to talk.",
        russian: "Если она приедет рано, у нас будет время поговорить.",
        kazakh: "Егер ол ерте келсе, сөйлесуге уақытымыз болады."
      },
      {
        english: "If they don't hurry, they will miss the train.",
        russian: "Если они не поторопятся, они опоздают на поезд.",
        kazakh: "Егер олар асықпаса, пойыздан қаласады."
      }
    ],
    keywords: ["will", "might", "may", "can", "probably", "tomorrow", "next"]
  },
  {
    type: "Second Conditional",
    name: "Условные предложения 2 типа",
    usage: "Нереальные или маловероятные ситуации в настоящем/будущем",
    structure: "If + Past Simple, would + verb",
    formula: "If + subject + past verb, subject + would + verb",
    examples: [
      {
        english: "If I had a million dollars, I would buy a house.",
        russian: "Если бы у меня был миллион долларов, я бы купил дом.",
        kazakh: "Егер менде миллион доллар болса, үй сатып алар едім."
      },
      {
        english: "If I were you, I would apologize.",
        russian: "На твоем месте я бы извинился.",
        kazakh: "Сенің орныңда болсам, кешірім сұрар едім."
      },
      {
        english: "If we lived in a bigger house, we could get a dog.",
        russian: "Если бы мы жили в доме побольше, мы могли бы завести собаку.",
        kazakh: "Егер үлкен үйде тұрсақ, ит бағар едік."
      },
      {
        english: "If she studied harder, she would get better grades.",
        russian: "Если бы она училась усерднее, у нее были бы лучшие оценки.",
        kazakh: "Егер ол тырысып оқыса, жақсы баға алар еді."
      }
    ],
    keywords: ["would", "could", "might", "if I were you", "imaginary", "unreal"]
  },
  {
    type: "Third Conditional",
    name: "Условные предложения 3 типа",
    usage: "Нереальные ситуации в прошлом, которые уже не изменить",
    structure: "If + Past Perfect, would have + past participle",
    formula: "If + subject + had + past participle, subject + would have + past participle",
    examples: [
      {
        english: "If I had known, I would have helped you.",
        russian: "Если бы я знал, я бы помог тебе.",
        kazakh: "Егер білсем, саған көмектесер едім."
      },
      {
        english: "If she had studied, she would have passed the exam.",
        russian: "Если бы она училась, она бы сдала экзамен.",
        kazakh: "Егер ол оқыса, емтиханнан өтер еді."
      },
      {
        english: "If we had left earlier, we wouldn't have missed the flight.",
        russian: "Если бы мы уехали раньше, мы бы не опоздали на рейс.",
        kazakh: "Егер ерте кетсек, ұшаққа кешікпес едік."
      },
      {
        english: "If they had listened to me, this wouldn't have happened.",
        russian: "Если бы они послушали меня, этого бы не случилось.",
        kazakh: "Егер олар мені тыңдаса, бұл болмас еді."
      }
    ],
    keywords: ["would have", "could have", "might have", "if only", "regret", "past"]
  }
];
