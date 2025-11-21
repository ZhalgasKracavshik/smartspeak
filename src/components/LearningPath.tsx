import { useState, useEffect } from "react";
import { Lock, Check, Star, Trophy, Zap, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { getLessonById, Lesson } from "../data/lessonsData";
import { getInitialProgress, saveProgress, completeLesson, UserProgress } from "../data/userProgress";

export function LearningPath() {
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress());
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLessonActive, setIsLessonActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lessonScore, setLessonScore] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'path'>('path');

  useEffect(() => {
    saveProgress(userProgress);
  }, [userProgress]);

  const startLesson = (lessonId: number) => {
    const lesson = getLessonById(lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setIsLessonActive(true);
      setCurrentQuestion(0);
      setLessonScore(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handleAnswer = () => {
    if (selectedAnswer === null || !selectedLesson) return;

    const currentQ = selectedLesson.questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    if (isCorrect) {
      setLessonScore(lessonScore + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (!selectedLesson) return;

    if (currentQuestion < selectedLesson.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      finishLesson();
    }
  };

  const finishLesson = () => {
    if (!selectedLesson) return;

    const scorePercentage = (lessonScore / selectedLesson.questions.length) * 100;
    const xpEarned = Math.round((scorePercentage / 100) * selectedLesson.xpReward);
    
    const updatedProgress = completeLesson(userProgress, selectedLesson.id, xpEarned);
    setUserProgress(updatedProgress);
    
    setIsLessonActive(false);
    setSelectedLesson(null);
  };

  const isLessonUnlocked = (lessonId: number) => {
    return lessonId === 1 || userProgress.completedLessons.includes(lessonId - 1);
  };

  const renderLessonDialog = () => {
    if (!selectedLesson || !isLessonActive) return null;

    const currentQ = selectedLesson.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedLesson.questions.length) * 100;

    return (
      <Dialog open={isLessonActive} onOpenChange={() => setIsLessonActive(false)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {selectedLesson.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Badge variant="outline">
                Вопрос {currentQuestion + 1} / {selectedLesson.questions.length}
              </Badge>
              <Badge>
                Правильных: {lessonScore}
              </Badge>
            </div>

            <Progress value={progress} className="h-2" />

            <div className="space-y-4">
              <h3 className="text-xl">{currentQ.question}</h3>

              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => setSelectedAnswer(parseInt(value))}
                disabled={showExplanation}
              >
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg border ${
                      showExplanation && index === currentQ.correctAnswer
                        ? 'bg-green-50 border-green-500'
                        : showExplanation && selectedAnswer === index
                        ? 'bg-red-50 border-red-500'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`opt-${index}`} />
                    <Label htmlFor={`opt-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                    {showExplanation && index === currentQ.correctAnswer && (
                      <Check className="size-5 text-green-500" />
                    )}
                  </div>
                ))}
              </RadioGroup>

              {showExplanation && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-sm">
                    <span className="text-blue-700">Объяснение:</span> {currentQ.explanation}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {!showExplanation ? (
                <Button
                  onClick={handleAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full"
                  size="lg"
                >
                  Проверить
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="w-full"
                  size="lg"
                >
                  {currentQuestion < selectedLesson.questions.length - 1 ? 'Следующий' : 'Завершить'}
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const getLevelColor = (level: number) => {
    if (level <= 250) return 'from-green-500 to-emerald-500';
    if (level <= 500) return 'from-blue-500 to-cyan-500';
    if (level <= 750) return 'from-orange-500 to-red-500';
    return 'from-purple-500 to-pink-500';
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-700',
      medium: 'bg-blue-100 text-blue-700',
      hard: 'bg-orange-100 text-orange-700',
      extreme: 'bg-red-100 text-red-700'
    };
    return colors[difficulty as keyof typeof colors] || colors.easy;
  };

  // Render lessons in path view (first 50 lessons)
  const renderPathView = () => {
    const lessons = Array.from({ length: 50 }, (_, i) => i + 1);
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Path line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2" />
          
          {/* Lessons */}
          <div className="space-y-8">
            {lessons.map((lessonId, index) => {
              const lesson = getLessonById(lessonId);
              if (!lesson) return null;

              const isCompleted = userProgress.completedLessons.includes(lessonId);
              const isUnlocked = isLessonUnlocked(lessonId);
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={lessonId}
                  className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                    <Card
                      className={`${
                        isUnlocked ? 'hover:shadow-lg cursor-pointer' : 'opacity-50'
                      } transition-all`}
                      onClick={() => isUnlocked && startLesson(lessonId)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getDifficultyBadge(lesson.difficulty)}>
                                {lesson.difficulty}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                +{lesson.xpReward} XP
                              </span>
                            </div>
                            <h3 className="text-lg mb-1">{lesson.title}</h3>
                            <p className="text-sm text-muted-foreground">{lesson.description}</p>
                          </div>
                          {isCompleted && (
                            <Check className="size-6 text-green-500 flex-shrink-0" />
                          )}
                          {!isUnlocked && (
                            <Lock className="size-6 text-muted-foreground flex-shrink-0" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="relative z-10">
                    <div
                      className={`size-12 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isUnlocked
                          ? `bg-gradient-to-br ${getLevelColor(lessonId)} text-white`
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="size-6" />
                      ) : isUnlocked ? (
                        <span className="text-lg">{lessonId}</span>
                      ) : (
                        <Lock className="size-5" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header with stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl mb-2">Путь освоения</h1>
              <p className="text-white/80 text-lg">1000 уровней для полного овладения английским</p>
            </div>
            <div className="text-right">
              <div className="text-5xl mb-1">{userProgress.level}</div>
              <p className="text-white/80">Уровень</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="size-5" />
                <span className="text-sm">Опыт</span>
              </div>
              <div className="text-2xl">{userProgress.experience}</div>
              <Progress value={(userProgress.experience % 100)} className="mt-2 bg-white/20" />
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="size-5" />
                <span className="text-sm">Репутация</span>
              </div>
              <div className="text-2xl">{userProgress.reputation}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="size-5" />
                <span className="text-sm">Пройдено</span>
              </div>
              <div className="text-2xl">{userProgress.completedLessons.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="size-5" />
                <span className="text-sm">Достижения</span>
              </div>
              <div className="text-2xl">{userProgress.achievements.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Path */}
      {renderPathView()}

      {/* Lesson Dialog */}
      {renderLessonDialog()}
    </div>
  );
}
