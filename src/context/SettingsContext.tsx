import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface SettingsContextType {
  voiceRate: number;
  setVoiceRate: (rate: number) => void;
  showTranslations: boolean;
  setShowTranslations: (show: boolean) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  selectedGrade: number;
  setSelectedGrade: (grade: number) => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Voice Rate
  const [voiceRate, setVoiceRate] = useState(() => {
    const saved = localStorage.getItem("smartspeak-voiceRate");
    return saved ? parseFloat(saved) : 0.9;
  });

  // Show Translations
  const [showTranslations, setShowTranslations] = useState(() => {
    const saved = localStorage.getItem("smartspeak-showTranslations");
    return saved ? JSON.parse(saved) : true;
  });

  // Theme
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("smartspeak-theme");
    return (saved as Theme) || "system";
  });

  // Selected Grade
  const [selectedGrade, setSelectedGrade] = useState(() => {
    const saved = localStorage.getItem("smartspeak-grade");
    return saved ? parseInt(saved) : 5;
  });

  // API Key
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem("smartspeak-api-key") || "";
  });

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem("smartspeak-voiceRate", voiceRate.toString());
  }, [voiceRate]);

  useEffect(() => {
    localStorage.setItem("smartspeak-showTranslations", JSON.stringify(showTranslations));
  }, [showTranslations]);

  useEffect(() => {
    localStorage.setItem("smartspeak-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("smartspeak-grade", selectedGrade.toString());
  }, [selectedGrade]);

  useEffect(() => {
    localStorage.setItem("smartspeak-api-key", apiKey);
  }, [apiKey]);

  return (
    <SettingsContext.Provider
      value={{
        voiceRate,
        setVoiceRate,
        showTranslations,
        setShowTranslations,
        theme,
        setTheme,
        selectedGrade,
        setSelectedGrade,
        apiKey,
        setApiKey,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}