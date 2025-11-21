import { useState, useEffect, useCallback } from 'react';

// Add type definitions for window and SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

// Define types locally to avoid "Cannot find name" errors
type SpeechRecognitionType = any;
type SpeechRecognitionEvent = any;
type SpeechRecognitionErrorEvent = any;

interface UseSpeechRecognitionProps {
    language?: string;
    onResult?: (transcript: string) => void;
    onEnd?: () => void;
}

export function useSpeechRecognition({
    language = 'en-US',
    onResult,
    onEnd
}: UseSpeechRecognitionProps = {}) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [recognition, setRecognition] = useState<SpeechRecognitionType | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();

            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = language;

            recognitionInstance.onstart = () => {
                setIsListening(true);
                setError(null);
            };

            recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
                const currentTranscript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('');

                setTranscript(currentTranscript);
                if (onResult) {
                    onResult(currentTranscript);
                }
            };

            recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error('Speech recognition error', event.error);
                setError(event.error);
                setIsListening(false);
            };

            recognitionInstance.onend = () => {
                setIsListening(false);
                if (onEnd) {
                    onEnd();
                }
            };

            setRecognition(recognitionInstance);
        } else {
            setError('Browser does not support speech recognition.');
        }
    }, [language]);

    const startListening = useCallback(() => {
        if (recognition) {
            try {
                recognition.start();
            } catch (e) {
                console.error("Error starting recognition:", e);
            }
        }
    }, [recognition]);

    const stopListening = useCallback(() => {
        if (recognition) {
            recognition.stop();
        }
    }, [recognition]);

    return {
        isListening,
        transcript,
        error,
        startListening,
        stopListening,
        hasSupport: !!recognition
    };
}
