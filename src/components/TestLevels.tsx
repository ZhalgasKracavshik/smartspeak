import { useState } from "react";
import { Trophy, Clock, Target, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { generateLessons } from "../data/lessonsData";

type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

interface TestResult {
  score: number;
  total: number;
  timeTaken: number;
  difficulty: Difficulty;
}

export function TestLevels() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [isTestActive, setIsTestActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [results, setResults] = useState<TestResult | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const difficulties = [
    {
      id: 'easy' as Difficulty,
      name: 'Легкий',
      description: 'Базовые вопросы для начинающих',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      questions: 10,
      timeLimit: 300
    },
    {
      id: 'medium' as Difficulty,
      name: 'Нормальный',
      description: 'Стандартные вопросы среднего уровня',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      questions: 15,
      timeLimit: 450
    },
    {
      id: 'hard' as Difficulty,
      name: 'Сложный',
      description: 'Продвинутые вопросы для опытных',
      icon: Trophy,
      color: 'from-orange-500 to-red-500',
      questions: 20,
      timeLimit: 600
    },
    {
      id: 'extreme' as Difficulty,
      name: 'Экстремально сложный',
      description: 'Самые трудные вопросы для профессионалов',
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      questions: 25,
      timeLimit: 900
    }
  ];

  const startTest = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    setIsTestActive(true);
    setCurrentQuestion(0);
    setScore(0);
    setStartTime(Date.now());
    setResults(null);
    setAnsweredQuestions(new Set());
  };

  const lessons = generateLessons();
  const testQuestions = selectedDifficulty
    ? lessons
        .filter(l => l.difficulty === selectedDifficulty)
        .slice(0, 5)
        .flatMap(l => l.questions)
        .slice(0, difficulties.find(d => d.id === selectedDifficulty)?.questions || 10)
    : [];

  const handleAnswer = () => {
    if (selectedAnswer !== null) {
      const currentQ = testQuestions[currentQuestion];
      if (selectedAnswer === currentQ.correctAnswer) {
        setScore(score + 1);
      }
      
      const newAnswered = new Set(answeredQuestions);
      newAnswered.add(currentQuestion);
      setAnsweredQuestions(newAnswered);

      if (currentQuestion < testQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        finishTest();
      }
    }
  };

  const finishTest = () => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setResults({
      score,
      total: testQuestions.length,
      timeTaken,
      difficulty: selectedDifficulty!
    });
    setIsTestActive(false);
  };

  if (results) {
    const percentage = (results.score / results.total) * 100;
    const finalScore = Math.round((percentage / 100) * 100); // Score out of 100

    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">
            {finalScore >= 90 ? '🏆' : finalScore >= 70 ? '🎉' : finalScore >= 50 ? '👍' : '📚'}
          </div>
          <h1 className="text-4xl">Результаты теста</h1>
          <p className="text-xl text-muted-foreground">
            Уровень: {difficulties.find(d => d.id === results.difficulty)?.name}
          </p>
        </div>

        <Card>
          <CardContent className="p-12 space-y-8">
            <div className="text-center space-y-4">
              <div className="text-6xl">{finalScore}/100</div>
              <p className="text-2xl">Ваш результат</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Правильных ответов:</span>
                <span className="text-green-500">{results.score} из {results.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Процент успеха:</span>
                <span>{percentage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Время:</span>
                <span>{Math.floor(results.timeTaken / 60)}:{(results.timeTaken % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>

            <Progress value={percentage} className="h-4" />

            <div className="bg-muted p-6 rounded-lg">
              <p className="text-center">
                {finalScore >= 90 && "🌟 Превосходно! Вы мастер английского языка!"}
                {finalScore >= 70 && finalScore < 90 && "✨ Отлично! Вы очень хорошо знаете английский!"}
                {finalScore >= 50 && finalScore < 70 && "💪 Хорошо! Продолжайте учиться!"}
                {finalScore < 50 && "📖 Нужно больше практики. Не сдавайтесь!"}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => {
                setResults(null);
                setSelectedDifficulty(null);
              }}>
                Вернуться к выбору
              </Button>
              <Button variant="outline" onClick={() => {
                if (selectedDifficulty) {
                  startTest(selectedDifficulty);
                }
              }}>
                Пройти снова
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isTestActive && testQuestions.length > 0) {
    const currentQ = testQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl">
              {difficulties.find(d => d.id === selectedDifficulty)?.name} тест
            </h2>
            <p className="text-muted-foreground">
              Вопрос {currentQuestion + 1} из {testQuestions.length}
            </p>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Баллы: {score}
          </Badge>
        </div>

        <Progress value={progress} className="h-3" />

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 cursor-pointer"
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              onClick={handleAnswer}
              disabled={selectedAnswer === null}
              className="w-full"
              size="lg"
            >
              {currentQuestion < testQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl">Тесты по уровням</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Проверьте свои знания английского языка. Выберите уровень сложности и получите до 100 баллов!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {difficulties.map((difficulty) => (
          <Card
            key={difficulty.id}
            className="hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => startTest(difficulty.id)}
          >
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className={`size-16 rounded-xl bg-gradient-to-br ${difficulty.color} flex items-center justify-center`}>
                  <difficulty.icon className="size-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">
                    {difficulty.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {difficulty.description}
                  </p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Вопросов:</span>
                      <span>{difficulty.questions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Время:</span>
                      <span>{Math.floor(difficulty.timeLimit / 60)} минут</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Максимум баллов:</span>
                      <span className="text-green-500">100</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Начать тест
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
