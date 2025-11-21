import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, Trophy, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { vocabularyByLevel } from "../data/vocabularyDatabase";
import { useSettings } from "../context/SettingsContext";

export function FlashCards() {
  const [selectedLevel, setSelectedLevel] = useState<string>("A1");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [known, setKnown] = useState<number[]>([]);
  const [unknown, setUnknown] = useState<number[]>([]);
  const { settings } = useSettings();
  
  const words = vocabularyByLevel[selectedLevel] || [];
  const currentWord = words[currentIndex];
  const progress = ((known.length + unknown.length) / words.length) * 100;

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = settings.voiceRate;
    window.speechSynthesis.speak(utterance);
  };

  const handleKnow = () => {
    if (!known.includes(currentIndex)) {
      setKnown([...known, currentIndex]);
      setScore(Math.min(score + (100 / words.length), 100));
    }
    handleNext();
  };

  const handleDontKnow = () => {
    if (!unknown.includes(currentIndex)) {
      setUnknown([...unknown, currentIndex]);
    }
    handleNext();
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore(0);
    setKnown([]);
    setUnknown([]);
  };

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl">Карточки для запоминания</h1>
        <p className="text-xl text-muted-foreground">Изучайте слова с помощью интерактивных карточек</p>
      </div>

      {/* Level Selection */}
      <div className="flex gap-2 justify-center flex-wrap">
        {levels.map(level => (
          <Button
            key={level}
            variant={selectedLevel === level ? "default" : "outline"}
            onClick={() => {
              setSelectedLevel(level);
              handleReset();
            }}
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Score Display */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-2">{Math.round(score)}</div>
            <p className="text-sm text-muted-foreground">Баллы</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-2 text-green-500">{known.length}</div>
            <p className="text-sm text-muted-foreground">Знаю</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl mb-2 text-orange-500">{unknown.length}</div>
            <p className="text-sm text-muted-foreground">Не знаю</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Прогресс</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Flash Card */}
      {currentWord && (
        <div className="relative perspective-1000">
          <div
            className={`card-container ${isFlipped ? 'flipped' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <Card className="card-face card-front min-h-[400px] cursor-pointer hover:shadow-xl transition-shadow">
              <CardContent className="p-12 flex flex-col items-center justify-center h-full space-y-6">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {currentWord.level} - {currentWord.category}
                </Badge>
                <h2 className="text-5xl text-center">{currentWord.english}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-16"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(currentWord.english);
                  }}
                >
                  <Volume2 className="size-8" />
                </Button>
                <p className="text-muted-foreground text-center">Нажмите чтобы перевернуть</p>
              </CardContent>
            </Card>

            <Card className="card-face card-back min-h-[400px] cursor-pointer hover:shadow-xl transition-shadow">
              <CardContent className="p-12 flex flex-col items-center justify-center h-full space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-3xl">🇷🇺 {currentWord.russian}</p>
                  <p className="text-3xl">🇰🇿 {currentWord.kazakh}</p>
                </div>
                <div className="bg-muted p-6 rounded-lg">
                  <p className="text-lg italic text-center">{currentWord.example}</p>
                </div>
                <p className="text-muted-foreground text-center">Нажмите чтобы вернуть</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-4 justify-center items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="size-5" />
        </Button>

        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="lg"
            onClick={handleDontKnow}
          >
            Не знаю
          </Button>
          <Button
            variant="default"
            size="lg"
            onClick={handleKnow}
            className="bg-green-500 hover:bg-green-600"
          >
            Знаю
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={currentIndex === words.length - 1}
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      {/* Additional Controls */}
      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw className="mr-2 size-4" />
          Начать сначала
        </Button>
        <span className="text-muted-foreground self-center">
          Карточка {currentIndex + 1} из {words.length}
        </span>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .card-container {
          position: relative;
          width: 100%;
          height: 400px;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .card-container.flipped {
          transform: rotateY(180deg);
        }
        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .card-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
