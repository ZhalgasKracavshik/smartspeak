import { useState } from "react";
import { Clock, BookOpen, Repeat, ListChecks, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { vocabularyByLevel, phrasalVerbsDatabase } from "../data/vocabularyDatabase";
import { useSettings } from "../context/SettingsContext";

const tensesData = [
  {
    name: "Present Simple",
    category: "Simple",
    usage: "Регулярные действия, факты, расписания",
    formation: "I/You/We/They + verb | He/She/It + verb + s/es",
    examples: [
      { english: "I work every day.", russian: "Я работаю каждый день.", kazakh: "Мен күнде жұмыс істеймін." },
      { english: "She likes coffee.", russian: "Она любит кофе.", kazakh: "Ол кофені жақсы көреді." },
      { english: "They play football on Sundays.", russian: "Они играют в футбол по воскресеньям.", kazakh: "Олар жексенбі күндері футбол ойнайды." }
    ],
    keywords: ["always", "usually", "often", "sometimes", "never", "every day"]
  },
  {
    name: "Present Continuous",
    category: "Continuous",
    usage: "Действия, происходящие сейчас или в текущий период",
    formation: "am/is/are + verb + ing",
    examples: [
      { english: "I am studying now.", russian: "Я сейчас учусь.", kazakh: "Мен қазір оқып жатырмын." },
      { english: "She is reading a book.", russian: "Она читает книгу.", kazakh: "Ол кітап оқып жатыр." },
      { english: "They are playing football.", russian: "Они играют в футбол.", kazakh: "Олар футбол ойнап жатыр." }
    ],
    keywords: ["now", "at the moment", "currently", "right now", "today"]
  },
  {
    name: "Present Perfect",
    category: "Perfect",
    usage: "Действия, совершенные к настоящему моменту; опыт",
    formation: "have/has + verb (past participle)",
    examples: [
      { english: "I have finished my homework.", russian: "Я закончил домашнюю работу.", kazakh: "Мен үй жұмысын бітірдім." },
      { english: "She has visited Paris.", russian: "Она была в Париже.", kazakh: "Ол Парижге барған." },
      { english: "They have lived here for 5 years.", russian: "Они живут здесь 5 лет.", kazakh: "Олар мұнда 5 жыл тұрады." }
    ],
    keywords: ["already", "yet", "just", "ever", "never", "recently", "since", "for"]
  },
  {
    name: "Past Simple",
    category: "Simple",
    usage: "Завершенные действия в прошлом",
    formation: "verb + ed (regular) | irregular forms",
    examples: [
      { english: "I worked yesterday.", russian: "Я работал вчера.", kazakh: "Мен кеше жұмыс істедім." },
      { english: "She went to school.", russian: "Она пошла в школу.", kazakh: "Ол мектепке барды." },
      { english: "They played football last week.", russian: "Они играли в футбол на прошлой неделе.", kazakh: "Олар өткен аптада футбол ойнады." }
    ],
    keywords: ["yesterday", "last week", "ago", "in 2020", "when"]
  },
  {
    name: "Past Continuous",
    category: "Continuous",
    usage: "Длительные действия в прошлом",
    formation: "was/were + verb + ing",
    examples: [
      { english: "I was studying at 8 PM.", russian: "Я учился в 8 вечера.", kazakh: "Мен кешкі сағат 8-де оқып жатырдым." },
      { english: "She was reading when I called.", russian: "Она читала, когда я позвонил.", kazakh: "Мен қоңырау шалғанда ол оқып жатырды." },
      { english: "They were playing football all day.", russian: "Они играли в футбол весь день.", kazakh: "Олар күні бойы футбол ойнады." }
    ],
    keywords: ["while", "when", "at that moment", "all day"]
  },
  {
    name: "Past Perfect",
    category: "Perfect",
    usage: "Действия, завершенные до другого действия в прошлом",
    formation: "had + verb (past participle)",
    examples: [
      { english: "I had finished before he arrived.", russian: "Я закончил до его прихода.", kazakh: "Ол келгенге дейін мен бітірдім." },
      { english: "She had already left.", russian: "Она уже ушла.", kazakh: "Ол әлдеқашан кеткен." },
      { english: "They had lived there for years.", russian: "Они прожили там много лет.", kazakh: "Олар сонда көп жыл тұрды." }
    ],
    keywords: ["before", "after", "already", "by the time"]
  },
  {
    name: "Future Simple",
    category: "Simple",
    usage: "Простые будущие действия, решения, предсказания",
    formation: "will + verb",
    examples: [
      { english: "I will work tomorrow.", russian: "Я буду работать завтра.", kazakh: "Мен ертең жұмыс істеймін." },
      { english: "She will go to school.", russian: "Она пойдет в школу.", kazakh: "Ол мектепке барады." },
      { english: "They will play football.", russian: "Они будут играть в футбол.", kazakh: "Олар футбол ойнайды." }
    ],
    keywords: ["tomorrow", "next week", "soon", "in the future", "probably"]
  },
  {
    name: "Future Continuous",
    category: "Continuous",
    usage: "Длительные действия в будущем",
    formation: "will be + verb + ing",
    examples: [
      { english: "I will be studying at 8 PM.", russian: "Я буду учиться в 8 вечера.", kazakh: "Мен кешкі сағат 8-де оқып жатырмын." },
      { english: "She will be reading all evening.", russian: "Она будет читать весь вечер.", kazakh: "Ол кеш бойы оқып жатады." },
      { english: "They will be playing football.", russian: "Они будут играть в футбол.", kazakh: "Олар футбол ойнап жатады." }
    ],
    keywords: ["at this time tomorrow", "all day", "for hours"]
  },
  {
    name: "Future Perfect",
    category: "Perfect",
    usage: "Действия, которые будут завершены к определенному моменту в будущем",
    formation: "will have + verb (past participle)",
    examples: [
      { english: "I will have finished by 5 PM.", russian: "Я закончу к 5 вечера.", kazakh: "Мен сағат 5-ке дейін бітіремін." },
      { english: "She will have left by then.", russian: "Она уже уйдет к тому времени.", kazakh: "Ол сол кезге дейін кетеді." },
      { english: "They will have completed the project.", russian: "Они завершат проект.", kazakh: "Олар жобаны аяқтайды." }
    ],
    keywords: ["by", "by the time", "before"]
  }
];

const irregularVerbsList = [
  { base: "be", pastSimple: "was/were", pastParticiple: "been", translation: "быть / болу" },
  { base: "become", pastSimple: "became", pastParticiple: "become", translation: "становиться / болу" },
  { base: "begin", pastSimple: "began", pastParticiple: "begun", translation: "начинать / бастау" },
  { base: "break", pastSimple: "broke", pastParticiple: "broken", translation: "ломать / сындыру" },
  { base: "bring", pastSimple: "brought", pastParticiple: "brought", translation: "приносить / әкелу" },
  { base: "build", pastSimple: "built", pastParticiple: "built", translation: "строить / салу" },
  { base: "buy", pastSimple: "bought", pastParticiple: "bought", translation: "покупать / сатып алу" },
  { base: "catch", pastSimple: "caught", pastParticiple: "caught", translation: "ловить / ұстау" },
  { base: "choose", pastSimple: "chose", pastParticiple: "chosen", translation: "выбирать / таңдау" },
  { base: "come", pastSimple: "came", pastParticiple: "come", translation: "приходить / келу" },
  { base: "do", pastSimple: "did", pastParticiple: "done", translation: "делать / жасау" },
  { base: "drink", pastSimple: "drank", pastParticiple: "drunk", translation: "пить / ішу" },
  { base: "drive", pastSimple: "drove", pastParticiple: "driven", translation: "водить / жүргізу" },
  { base: "eat", pastSimple: "ate", pastParticiple: "eaten", translation: "есть / жеу" },
  { base: "fall", pastSimple: "fell", pastParticiple: "fallen", translation: "падать / құлау" },
  { base: "feel", pastSimple: "felt", pastParticiple: "felt", translation: "чувствовать / сезу" },
  { base: "find", pastSimple: "found", pastParticiple: "found", translation: "находить / табу" },
  { base: "fly", pastSimple: "flew", pastParticiple: "flown", translation: "летать / ұшу" },
  { base: "forget", pastSimple: "forgot", pastParticiple: "forgotten", translation: "забывать / ұмыту" },
  { base: "get", pastSimple: "got", pastParticiple: "got/gotten", translation: "получать / алу" },
  { base: "give", pastSimple: "gave", pastParticiple: "given", translation: "давать / беру" },
  { base: "go", pastSimple: "went", pastParticiple: "gone", translation: "идти / бару" },
  { base: "have", pastSimple: "had", pastParticiple: "had", translation: "иметь / иелену" },
  { base: "hear", pastSimple: "heard", pastParticiple: "heard", translation: "слышать / есту" },
  { base: "keep", pastSimple: "kept", pastParticiple: "kept", translation: "держать / ұстау" },
  { base: "know", pastSimple: "knew", pastParticiple: "known", translation: "знать / білу" },
  { base: "leave", pastSimple: "left", pastParticiple: "left", translation: "покидать / кету" },
  { base: "lose", pastSimple: "lost", pastParticiple: "lost", translation: "терять / жоғалту" },
  { base: "make", pastSimple: "made", pastParticiple: "made", translation: "делать / жасау" },
  { base: "meet", pastSimple: "met", pastParticiple: "met", translation: "встречать / кездесу" },
  { base: "pay", pastSimple: "paid", pastParticiple: "paid", translation: "платить / төлеу" },
  { base: "read", pastSimple: "read", pastParticiple: "read", translation: "читать / оқу" },
  { base: "run", pastSimple: "ran", pastParticiple: "run", translation: "бежать / жүгіру" },
  { base: "say", pastSimple: "said", pastParticiple: "said", translation: "говорить / айту" },
  { base: "see", pastSimple: "saw", pastParticiple: "seen", translation: "видеть / көру" },
  { base: "sell", pastSimple: "sold", pastParticiple: "sold", translation: "продавать / сату" },
  { base: "send", pastSimple: "sent", pastParticiple: "sent", translation: "отправлять / жіберу" },
  { base: "show", pastSimple: "showed", pastParticiple: "shown", translation: "показывать / көрсету" },
  { base: "sing", pastSimple: "sang", pastParticiple: "sung", translation: "петь / ән айту" },
  { base: "sit", pastSimple: "sat", pastParticiple: "sat", translation: "сидеть / отыру" },
  { base: "sleep", pastSimple: "slept", pastParticiple: "slept", translation: "спать / ұйықтау" },
  { base: "speak", pastSimple: "spoke", pastParticiple: "spoken", translation: "говорить / сөйлеу" },
  { base: "spend", pastSimple: "spent", pastParticiple: "spent", translation: "тратить / жұмсау" },
  { base: "stand", pastSimple: "stood", pastParticiple: "stood", translation: "стоять / тұру" },
  { base: "swim", pastSimple: "swam", pastParticiple: "swum", translation: "плавать / жүзу" },
  { base: "take", pastSimple: "took", pastParticiple: "taken", translation: "брать / алу" },
  { base: "teach", pastSimple: "taught", pastParticiple: "taught", translation: "учить / оқыту" },
  { base: "tell", pastSimple: "told", pastParticiple: "told", translation: "рассказывать / айту" },
  { base: "think", pastSimple: "thought", pastParticiple: "thought", translation: "думать / ойлау" },
  { base: "understand", pastSimple: "understood", pastParticiple: "understood", translation: "понимать / түсіну" },
  { base: "wake", pastSimple: "woke", pastParticiple: "woken", translation: "просыпаться / ояну" },
  { base: "wear", pastSimple: "wore", pastParticiple: "worn", translation: "носить / кию" },
  { base: "win", pastSimple: "won", pastParticiple: "won", translation: "выигрывать / жеңу" },
  { base: "write", pastSimple: "wrote", pastParticiple: "written", translation: "писать / жазу" },
];

export function LearningMaterials() {
  const [searchTerm, setSearchTerm] = useState("");
  const { settings } = useSettings();

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = settings.voiceRate;
    window.speechSynthesis.speak(utterance);
  };

  const allWords = Object.values(vocabularyByLevel).flat();
  const filteredWords = allWords.filter(word =>
    word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.russian.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.kazakh.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPhrasalVerbs = phrasalVerbsDatabase.filter(verb =>
    verb.verb.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIrregularVerbs = irregularVerbsList.filter(verb =>
    verb.base.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl">Учебные материалы</h1>
        <p className="text-xl text-muted-foreground">
          Полная база знаний для изучения английского языка
        </p>
      </div>

      <Input
        placeholder="Поиск по материалам..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md mx-auto"
      />

      <Tabs defaultValue="tenses">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="tenses" className="gap-2">
            <Clock className="size-4" />
            Времена
          </TabsTrigger>
          <TabsTrigger value="vocabulary" className="gap-2">
            <BookOpen className="size-4" />
            Словарь
          </TabsTrigger>
          <TabsTrigger value="phrasal" className="gap-2">
            <Repeat className="size-4" />
            Phrasal Verbs
          </TabsTrigger>
          <TabsTrigger value="irregular" className="gap-2">
            <ListChecks className="size-4" />
            Irregular Verbs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tenses" className="space-y-6">
          {tensesData.map((tense, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{tense.name}</CardTitle>
                    <Badge>{tense.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">Использование:</h4>
                  <p>{tense.usage}</p>
                </div>

                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">Образование:</h4>
                  <code className="bg-muted px-3 py-1 rounded text-sm">{tense.formation}</code>
                </div>

                <div>
                  <h4 className="text-sm text-muted-foreground mb-2">Примеры:</h4>
                  <div className="space-y-3">
                    {tense.examples.map((example, i) => (
                      <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="flex items-start gap-2">
                          <div className="flex-1">
                            <p className="mb-1">{example.english}</p>
                            <p className="text-sm text-muted-foreground">🇷🇺 {example.russian}</p>
                            <p className="text-sm text-muted-foreground">🇰🇿 {example.kazakh}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSpeak(example.english)}
                          >
                            <Volume2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm text-muted-foreground mb-2">Ключевые слова:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tense.keywords.map((keyword, i) => (
                      <Badge key={i} variant="outline">{keyword}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="vocabulary" className="space-y-4">
          <div className="grid gap-4">
            {filteredWords.map((word, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl">{word.english}</h3>
                        <Badge variant="outline">{word.level}</Badge>
                        <Badge variant="secondary">{word.category}</Badge>
                      </div>
                      <div className="space-y-1">
                        <p className="text-muted-foreground">🇷🇺 {word.russian}</p>
                        <p className="text-muted-foreground">🇰🇿 {word.kazakh}</p>
                      </div>
                      <p className="text-sm italic">"{word.example}"</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSpeak(word.english)}
                    >
                      <Volume2 className="size-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="phrasal" className="space-y-4">
          <div className="grid gap-4">
            {filteredPhrasalVerbs.map((verb, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl">{verb.verb}</h3>
                        <Badge>{verb.level}</Badge>
                      </div>
                      <p className="text-muted-foreground">{verb.meaning}</p>
                      <p className="text-sm italic">"{verb.example}"</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleSpeak(verb.example)}
                    >
                      <Volume2 className="size-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="irregular" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Base Form</th>
                      <th className="text-left p-3">Past Simple</th>
                      <th className="text-left p-3">Past Participle</th>
                      <th className="text-left p-3">Перевод</th>
                      <th className="text-left p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIrregularVerbs.map((verb, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3">{verb.base}</td>
                        <td className="p-3">{verb.pastSimple}</td>
                        <td className="p-3">{verb.pastParticiple}</td>
                        <td className="p-3 text-muted-foreground">{verb.translation}</td>
                        <td className="p-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSpeak(`${verb.base}, ${verb.pastSimple}, ${verb.pastParticiple}`)}
                          >
                            <Volume2 className="size-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
