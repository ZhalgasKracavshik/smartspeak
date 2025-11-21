import { useState } from 'react';
import { PronunciationTrainer } from './PronunciationTrainer';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

const PRACTICE_PHRASES = [
    { id: 1, text: "Hello, how are you?", translation: "Привет, как дела?" },
    { id: 2, text: "I would like to order a coffee.", translation: "Я хотел бы заказать кофе." },
    { id: 3, text: "Where is the nearest subway station?", translation: "Где находится ближайшая станция метро?" },
    { id: 4, text: "The quick brown fox jumps over the lazy dog.", translation: "Быстрая коричневая лиса прыгает через ленивую собаку." },
    { id: 5, text: "Practice makes perfect.", translation: "Повторение - мать учения." }
];

export function PronunciationPage() {
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [completedPhrases, setCompletedPhrases] = useState<number[]>([]);

    const handleComplete = (score: number) => {
        if (score >= 80 && !completedPhrases.includes(currentPhraseIndex)) {
            setCompletedPhrases([...completedPhrases, currentPhraseIndex]);
        }
    };

    const handleNext = () => {
        if (currentPhraseIndex < PRACTICE_PHRASES.length - 1) {
            setCurrentPhraseIndex(currentPhraseIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentPhraseIndex > 0) {
            setCurrentPhraseIndex(currentPhraseIndex - 1);
        }
    };

    const currentPhrase = PRACTICE_PHRASES[currentPhraseIndex];

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Практика произношения</h2>
                <p className="text-muted-foreground">
                    Повторяйте фразы за диктором, чтобы улучшить свой акцент.
                </p>
            </div>

            <PronunciationTrainer
                key={currentPhrase.id} // Reset component on phrase change
                targetPhrase={currentPhrase.text}
                translation={currentPhrase.translation}
                onComplete={handleComplete}
            />

            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={currentPhraseIndex === 0}
                >
                    Назад
                </Button>

                <div className="text-sm text-muted-foreground">
                    Фраза {currentPhraseIndex + 1} из {PRACTICE_PHRASES.length}
                </div>

                <Button
                    onClick={handleNext}
                    disabled={currentPhraseIndex === PRACTICE_PHRASES.length - 1}
                >
                    Далее <ChevronRight className="ml-2 size-4" />
                </Button>
            </div>

            <div className="grid grid-cols-5 gap-2 mt-8">
                {PRACTICE_PHRASES.map((phrase, index) => (
                    <div
                        key={phrase.id}
                        className={`h-2 rounded-full transition-colors ${completedPhrases.includes(index) ? 'bg-green-500' :
                                index === currentPhraseIndex ? 'bg-blue-500' : 'bg-muted'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
