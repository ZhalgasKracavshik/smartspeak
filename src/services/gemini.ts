import { GoogleGenerativeAI } from "@google/generative-ai";

const TEACHER_PERSONA = `
You are SmartSpeak AI, an intelligent and encouraging English language teacher.
Your goal is to help students learn English by correcting their mistakes, explaining grammar rules simply, and encouraging them to practice.
Always be polite, patient, and supportive.
If the user speaks in Russian, reply in Russian but provide English examples.
If the user speaks in English, reply in English appropriate for their level (A1-B1).
Keep responses concise (max 3-4 sentences) unless asked for a detailed explanation.
`;

export const geminiService = {
    async generateResponse(prompt: string, apiKey?: string, history: any[] = [], context: string = ""): Promise<string> {
        try {
            const systemInstruction = `${TEACHER_PERSONA}\nCurrent Context: ${context}`;

            // 1. Try using the secure backend first (if no direct key or if preferred)
            // For now, we fallback to backend if apiKey is missing or if we explicitly want to use it.
            // Since we can't easily check for backend existence, we'll try it if no key is provided.

            if (!apiKey) {
                try {
                    const response = await fetch('/api/gemini', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            prompt,
                            history,
                            systemInstruction
                        }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Backend API Error');
                    }

                    const data = await response.json();
                    return data.text;
                } catch (backendError) {
                    console.warn("Backend API failed, falling back to check for local key...", backendError);
                    throw new Error("API Key is missing. Please add it in Settings or configure the backend.");
                }
            }

            // 2. Use Client-Side Key (Legacy/Dev mode)
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: systemInstruction
            });

            const chat = model.startChat({
                history: history,
                generationConfig: {
                    maxOutputTokens: 1000,
                },
            });

            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            return response.text();

        } catch (error) {
            console.error("Gemini API Error:", error);
            throw error;
        }
    }
};
