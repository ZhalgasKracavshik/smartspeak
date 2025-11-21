import { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { calculateSimilarity } from '../utils/stringSimilarity';

interface PronunciationTrainerProps {
    targetPhrase: string;
    translation?: string;
    onComplete?: (score: number) => void;
}

export function PronunciationTrainer({ targetPhrase, translation, onComplete }: PronunciationTrainerProps) {
    const [score, setScore] = useState<number | null>(null);
    const [feedback, setFeedback] = useState<string>('');

    const {
        isListening,
        startListening,
        stopListening,
        transcript,
        hasSupport: hasMicSupport
    } = useSpeechRecognition();

    const { speak, isSpeaking } = useSpeechSynthesis();

    useEffect(() => {
        if (transcript && !isListening) {
            const similarity = calculateSimilarity(targetPhrase, transcript);
            setScore(similarity);

            if (similarity >= 80) {
                setFeedback('Отлично! 🎉');
                if (onComplete) onComplete(similarity);
            } else if (similarity >= 50) {
                setFeedback('Хорошо, но можно лучше. Попробуйте еще раз! 💪');
            } else {
                setFeedback('Попробуйте произнести четче. 👂');
            }
        }
    }, [transcript, isListening, targetPhrase, onComplete]);

    const handleToggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            setScore(null);
            setFeedback('');
            startListening();
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-green-500';
        if (score >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-center text-lg">Тренировка произношения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Target Phrase */}
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-primary">{targetPhrase}</h3>
                    {translation && <p className="text-muted-foreground">{translation}</p>}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => speak(targetPhrase)}
                        disabled={isSpeaking}
                        className="mt-2"
                    >
                        <Volume2 className="size-4 mr-2" />
                        Прослушать
                    </Button>
                </div>

                {/* Recording Controls */}
                <div className="flex justify-center">
                    {hasMicSupport ? (
                        <Button
                            size="lg"
                            variant={isListening ? "destructive" : "default"}
                            className={`rounded-full size-16 p-0 ${isListening ? 'animate-pulse' : ''}`}
                            onClick={handleToggleListening}
                        >
                            {isListening ? <MicOff className="size-8" /> : <Mic className="size-8" />}
                        </Button>
                    ) : (
                        <p className="text-red-500 text-sm">Микрофон не поддерживается браузером</p>
                    )}
                </div>

                {/* Feedback Area */}
                <div className="min-h-[100px] text-center space-y-3">
                    {isListening && <p className="text-muted-foreground animate-pulse">Слушаю...</p>}

                    {transcript && !isListening && (
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Вы сказали:</p>
                            <p className="font-medium">"{transcript}"</p>
                        </div>
                    )}

                    {score !== null && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4">
                            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                                {score}%
                            </div>
                            <Progress value={score} className="h-2" />
                            <p className="font-medium">{feedback}</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
