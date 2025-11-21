import { Volume2, Languages, Palette, Key, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { useSettings } from "../context/SettingsContext";
import { Separator } from "./ui/separator";
import { Settings as SettingsIcon } from "lucide-react";

export function SettingsDialog() {
  const {
    voiceRate, setVoiceRate,
    showTranslations, setShowTranslations,
    theme, setTheme,
    selectedGrade, setSelectedGrade,
    apiKey, setApiKey
  } = useSettings();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Настройки</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* AI Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Key className="size-5 text-purple-500" />
              <h3 className="text-sm font-medium">AI Интеграция</h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="api-key">Google Gemini API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Вставьте ваш API ключ"
                  className="font-mono text-sm"
                />
              </div>
              <div className="bg-muted/50 p-3 rounded-lg text-xs text-muted-foreground space-y-2">
                <p>Для работы умного чата требуется бесплатный API ключ.</p>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-500 hover:underline"
                >
                  Получить ключ бесплатно <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>

          <Separator />

          {/* Voice Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Volume2 className="size-5" />
              <h3 className="text-sm font-medium">Озвучивание</h3>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Скорость речи</Label>
                <span className="text-sm text-muted-foreground">{voiceRate.toFixed(1)}x</span>
              </div>
              <Slider
                value={[voiceRate]}
                onValueChange={([value]) => setVoiceRate(value)}
                min={0.5}
                max={2}
                step={0.1}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          {/* Display Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Languages className="size-5" />
              <h3 className="text-sm font-medium">Отображение</h3>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="show-translations">Показывать переводы</Label>
              <Switch
                id="show-translations"
                checked={showTranslations}
                onCheckedChange={setShowTranslations}
              />
            </div>

            <div className="space-y-2">
              <Label>Класс обучения</Label>
              <Select
                value={selectedGrade.toString()}
                onValueChange={(value) => setSelectedGrade(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 класс</SelectItem>
                  <SelectItem value="6">6 класс</SelectItem>
                  <SelectItem value="7">7 класс</SelectItem>
                  <SelectItem value="8">8 класс</SelectItem>
                  <SelectItem value="9">9 класс</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Theme Settings */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="size-5" />
              <h3 className="text-sm font-medium">Тема</h3>
            </div>

            <div className="space-y-2">
              <Label>Цветовая схема</Label>
              <Select
                value={theme}
                onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Светлая</SelectItem>
                  <SelectItem value="dark">Темная</SelectItem>
                  <SelectItem value="system">Системная</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}