import { useState, useEffect, useCallback } from 'react';

interface UseSpeechSynthesisProps {
    onEnd?: () => void;
}

export function useSpeechSynthesis({ onEnd }: UseSpeechSynthesisProps = {}) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            const loadVoices = () => {
                const availableVoices = window.speechSynthesis.getVoices();
                setVoices(availableVoices);

                // Try to find a good English voice
                const englishVoice = availableVoices.find(
                    voice => voice.name.includes('Google US English') || voice.lang === 'en-US'
                );
                if (englishVoice) {
                    setSelectedVoice(englishVoice);
                }
            };

            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const speak = useCallback((text: string, rate: number = 0.9) => {
        if (!window.speechSynthesis) return;

        // Cancel any current speaking
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }
        utterance.rate = rate;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            setIsSpeaking(false);
            if (onEnd) onEnd();
        };
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, [selectedVoice, onEnd]);

    const cancel = useCallback(() => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return {
        isSpeaking,
        speak,
        cancel,
        voices,
        selectedVoice,
        setSelectedVoice
    };
}
