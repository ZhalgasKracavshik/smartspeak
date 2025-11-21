import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Minimize2, Maximize2, X, Settings, Mic, MicOff, Volume2, Square } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { useSettings } from "../context/SettingsContext";
import { geminiService } from "../services/gemini";
import { SettingsDialog } from "./SettingsDialog";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIChatProps {
  pageContext?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AIChat({ pageContext, isOpen, onToggle }: AIChatProps) {
  const { apiKey } = useSettings();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Привет! Я ваш AI-помощник SmartSpeak. Я могу помочь вам с изучением английского языка, объяснить непонятные моменты, перевести текст или просто поболтать на любом языке. Что вас интересует?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Voice Hooks
  const {
    isListening,
    startListening,
    stopListening,
    transcript,
    hasSupport: hasMicSupport
  } = useSpeechRecognition();

  const {
    speak,
    cancel: stopSpeaking,
    isSpeaking
  } = useSpeechSynthesis();

  // Update input with voice transcript
  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  // Initialize Gemini Service when API key changes
  // We don't strictly need this useEffect anymore as the service handles it per request,
  // but we can keep it for any initialization logic if needed in future.
  useEffect(() => {
    // Optional: Pre-validate key or setup service
  }, [apiKey]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!apiKey) {
        throw new Error("API Key missing");
      }

      const responseText = await geminiService.generateResponse(
        userMessage.content,
        pageContext || "General App Context"
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("AI Error:", error);

      let errorMessageContent = "Извините, произошла ошибка. Попробуйте снова.";

      if (error.message === "API Key missing" || error.message?.includes("API Key not configured")) {
        errorMessageContent = "Для работы AI требуется API ключ. Пожалуйста, добавьте его в настройках.";
      } else if (error.message?.includes("Invalid API Key")) {
        errorMessageContent = "Неверный API ключ. Пожалуйста, проверьте настройки.";
      }

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorMessageContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <Card className="shadow-2xl border-2">
        <CardHeader className="pb-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Bot className="size-6" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Помощник</CardTitle>
                <Badge variant="secondary" className="mt-1 bg-white/20 text-white border-0">
                  {apiKey ? "Gemini 1.5 Flash" : "Требуется настройка"}
                </Badge>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="size-4" /> : <Minimize2 className="size-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="text-white hover:bg-white/20"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0">
            <ScrollArea className="h-96 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="size-5 text-white" />
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                        : "bg-muted"
                        }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className={`text-xs ${message.role === "user" ? "text-white/70" : "text-muted-foreground"}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        {message.role === "assistant" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-6 ml-2 hover:bg-black/5"
                            onClick={() => isSpeaking ? stopSpeaking() : speak(message.content)}
                          >
                            {isSpeaking ? <Square className="size-3" /> : <Volume2 className="size-3" />}
                          </Button>
                        )}
                      </div>
                    </div>

                    {message.role === "user" && (
                      <div className="size-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="size-5" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="size-5 text-white" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "Слушаю..." : "Задайте вопрос..."}
                  disabled={isLoading}
                  className={`flex-1 ${isListening ? "border-red-500 ring-1 ring-red-500" : ""}`}
                />

                {hasMicSupport && (
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    size="icon"
                    onClick={() => isListening ? stopListening() : startListening()}
                    className={isListening ? "animate-pulse" : ""}
                  >
                    {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                  </Button>
                )}

                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  <Send className="size-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">
                  {pageContext ? `Контекст: ${pageContext}` : "Общий чат"}
                </p>
                {!apiKey && (
                  <div className="flex items-center gap-1 text-xs text-red-500 animate-pulse">
                    <Settings className="size-3" />
                    <span>Требуется ключ</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
