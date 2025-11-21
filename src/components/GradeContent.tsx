import { useState } from "react";
import { BookOpen, Repeat, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { gradeContent } from "../data/gradeContent";

interface GradeContentProps {
  grade: number;
}

export function GradeContent({ grade }: GradeContentProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const content = gradeContent[grade as keyof typeof gradeContent];

  if (!content) {
    return <div>Контент не найден</div>;
  }

  const filteredVocabulary = content.vocabulary.filter(word =>
    word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.kazakh.toLowerCase().includes(searchTerm.toLowerCase()) ||
    word.russian.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPhrasalVerbs = content.phrasalVerbs.filter(verb =>
    verb.verb.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredIrregularVerbs = content.irregularVerbs.filter(verb =>
    verb.base.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verb.translation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2>{grade} класс - Учебные материалы</h2>
        <p className="text-muted-foreground">Словари, фразовые глаголы и irregular verbs</p>
      </div>

      <Input
        placeholder="Поиск слов..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-md"
      />

      <Tabs defaultValue="vocabulary">
        <TabsList>
          <TabsTrigger value="vocabulary" className="gap-2">
            <BookOpen className="size-4" />
            Словарь ({content.vocabulary.length})
          </TabsTrigger>
          <TabsTrigger value="phrasal" className="gap-2">
            <Repeat className="size-4" />
            Фразовые глаголы ({content.phrasalVerbs.length})
          </TabsTrigger>
          <TabsTrigger value="irregular" className="gap-2">
            <ListChecks className="size-4" />
            Irregular Verbs ({content.irregularVerbs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vocabulary" className="space-y-4">
          <div className="grid gap-4">
            {filteredVocabulary.map((word, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3>{word.english}</h3>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline">🇰🇿 {word.kazakh}</Badge>
                          <Badge variant="outline">🇷🇺 {word.russian}</Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{word.example}"
                    </p>
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
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3>{verb.verb}</h3>
                      <Badge>{verb.meaning}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "{verb.example}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="irregular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Неправильные глаголы</CardTitle>
              <CardDescription>Таблица irregular verbs для {grade} класса</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Base Form</th>
                      <th className="text-left p-3">Past Simple</th>
                      <th className="text-left p-3">Past Participle</th>
                      <th className="text-left p-3">Перевод</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredIrregularVerbs.map((verb, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-3">{verb.base}</td>
                        <td className="p-3">{verb.pastSimple}</td>
                        <td className="p-3">{verb.pastParticiple}</td>
                        <td className="p-3 text-muted-foreground">{verb.translation}</td>
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
