import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import { GradeContent } from "./components/GradeContent";
import { SettingsDialog } from "./components/SettingsDialog";
import { SettingsProvider } from "./context/SettingsContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import { FlashCards } from "./components/FlashCards";
import { TestLevels } from "./components/TestLevels";
import { LearningPath } from "./components/LearningPath";
import { LearningMaterials } from "./components/LearningMaterials";
import { AIChat } from "./components/AIChat";
import { AchievementsDisplay } from "./components/AchievementsDisplay";
import { StreakDisplay } from "./components/StreakDisplay";
import { PronunciationPage } from "./components/PronunciationPage";
import { AuthModal } from "./components/AuthModal";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Target, Trophy, BookOpen, Zap, Bot, Award, Flame, LogOut, User } from "lucide-react";
import { getInitialProgress, saveProgress, recordSectionVisit, checkTimeBasedAchievements, UserProgress } from "./data/userProgress";
import { useStreakFreeze } from "./data/streakSystem";
import { getUserProgressFromDB, saveUserProgressToDB } from "./services/db";

type Page = "home" | "learning-path" | "test-levels" | "flashcards" | "materials" | "grade-5" | "grade-6" | "grade-7" | "grade-8" | "grade-9" | "achievements" | "streak" | "pronunciation" | "help" | "faq" | "about";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [userProgress, setUserProgress] = useState<UserProgress>(getInitialProgress);

  // Track section visits
  useEffect(() => {
    const updated = recordSectionVisit(userProgress, currentPage);
    if (updated !== userProgress) {
      setUserProgress(updated);
      saveProgress(updated);
    }
  }, [currentPage]);

  // Check time-based achievements on mount
  useEffect(() => {
    const updated = checkTimeBasedAchievements(userProgress);
    if (updated !== userProgress) {
      setUserProgress(updated);
      saveProgress(updated);
    }
  }, []);

  const handleUseStreakFreeze = () => {
    const result = useStreakFreeze(userProgress.streakData);
    if (result) {
      const updated = { ...userProgress, streakData: result };
      setUserProgress(updated);
      saveProgress(updated);
    }
  };

  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "learning-path":
        return <LearningPath />;
      case "test-levels":
        return <TestLevels />;
      case "flashcards":
        return <FlashCards />;
      case "materials":
        return <LearningMaterials />;
      case "grade-5":
        return <GradeContent grade={5} />;
      case "grade-6":
        return <GradeContent grade={6} />;
      case "grade-7":
        return <GradeContent grade={7} />;
      case "grade-8":
        return <GradeContent grade={8} />;
      case "grade-9":
        return <GradeContent grade={9} />;
      case "about":
        return <AboutPage />;
      case "help":
        return <HelpPage />;
      case "faq":
        return <FAQPage />;
      case "achievements":
        return <AchievementsDisplay progress={userProgress} />;
      case "streak":
        return <StreakDisplay streakData={userProgress.streakData} onUseFreeze={handleUseStreakFreeze} />;
      case "pronunciation":
        return <PronunciationPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  // Get page context for AI
  const getPageContext = () => {
    switch (currentPage) {
      case "flashcards":
        return "FlashCards - Memory cards for learning words";
      case "test-levels":
        return "TestLevels - Tests by difficulty levels";
      case "learning-path":
        return "LearningPath - Learning path with 200 levels";
      case "materials":
        return "LearningMaterials - Learning materials: tenses, words, phrasal verbs";
      default:
        return "SmartSpeak - AI platform for learning English";
    }
  };

  return (
    <AuthProvider>
      <AppContentInner
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        renderContent={renderContent}
        getPageContext={getPageContext}
      />
    </AuthProvider>
  );
}

function AppContentInner({
  currentPage,
  setCurrentPage,
  isChatOpen,
  setIsChatOpen,
  userProgress,
  setUserProgress,
  renderContent,
  getPageContext
}: any) {
  const { user, logout } = useAuth();

  // Load progress from DB when user logs in
  useEffect(() => {
    async function loadUserProgress() {
      if (user) {
        const dbProgress = await getUserProgressFromDB(user.uid);
        if (dbProgress) {
          setUserProgress(dbProgress);
          saveProgress(dbProgress); // Sync to local storage as backup
        } else {
          // First time login or no data in DB, save current local progress to DB
          await saveUserProgressToDB(user.uid, userProgress);
        }
      }
    }
    loadUserProgress();
  }, [user]);

  // Sync progress to DB when it changes
  useEffect(() => {
    if (user) {
      const timeoutId = setTimeout(() => {
        saveUserProgressToDB(user.uid, userProgress);
      }, 1000); // Debounce saves
      return () => clearTimeout(timeoutId);
    }
  }, [userProgress, user]);

  return (
    <SettingsProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <AppSidebar onNavigate={setCurrentPage} currentPage={currentPage} />

          <div className="flex-1 flex flex-col">
            {/* Header - Minimalist Meridian Style */}
            <header className="border-b sticky top-0 bg-white/80 backdrop-blur-lg z-40">
              <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <span className="text-xl">✨</span>
                      </div>
                      <div>
                        <h1 className="text-lg tracking-tight">SmartSpeak</h1>
                        <p className="text-xs text-muted-foreground">AI Language Assistant</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Quick Stats */}
                    <div className="hidden md:flex items-center gap-4 mr-4 text-sm">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                        <Trophy className="size-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="font-semibold">{userProgress.level}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
                        <Flame className="size-4 text-orange-600 dark:text-orange-400" />
                        <span className="font-semibold">{userProgress.streakData.currentStreak}</span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
                        <Award className="size-4 text-green-600 dark:text-green-400" />
                        <span className="font-semibold">{userProgress.unlockedAchievements.length}</span>
                      </div>
                    </div>

                    <ThemeToggle />

                    {user ? (
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full">
                          <User className="size-4" />
                          <span className="text-sm font-medium max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={logout} title="Выйти">
                          <LogOut className="size-4" />
                        </Button>
                      </div>
                    ) : (
                      <AuthModal />
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsChatOpen(!isChatOpen)}
                      className="gap-2"
                    >
                      <Bot className="size-4" />
                      AI Помощник
                    </Button>
                    <SettingsDialog />
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-12 max-w-7xl">
              {renderContent()}
            </main>

            {/* Footer - Minimalist */}
            <footer className="border-t bg-muted/30">
              <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                  <p>© 2025 SmartSpeak. Все права защищены.</p>
                  <p>Изучайте английский с AI</p>
                </div>
              </div>
            </footer>
          </div>

          {/* AI Chat */}
          <AIChat
            pageContext={getPageContext()}
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen(!isChatOpen)}
          />
        </div>
      </SidebarProvider>
    </SettingsProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

// HomePage Component - Meridian Style
function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const features = [
    {
      title: "Путь освоения",
      description: "200 уровней для освоения английского языка с уникальными вопросами",
      icon: Target,
      action: "learning-path" as Page,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Тесты",
      description: "Проверьте свои знания на 4 уровнях сложности и получите до 100 баллов",
      icon: Trophy,
      action: "test-levels" as Page,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Карточки",
      description: "Интерактивные карточки для запоминания слов всех уровней от A1 до C2",
      icon: Zap,
      action: "flashcards" as Page,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Материалы",
      description: "Полная база: времена, словарь, phrasal verbs, irregular verbs",
      icon: BookOpen,
      action: "materials" as Page,
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section - Meridian Style */}
      <div className="text-center space-y-8 py-20">
        <div className="inline-block">
          <div className="size-24 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl mb-8">
            <span className="text-5xl">✨</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl tracking-tight">
          SmartSpeak
        </h1>

        <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Революционная платформа для изучения английского языка на основе искусственного интеллекта
        </p>

        <div className="flex gap-4 justify-center pt-8">
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg shadow-lg"
            onClick={() => onNavigate("learning-path")}
          >
            Начать обучение
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-lg"
            onClick={() => onNavigate("about")}
          >
            Узнать больше
          </Button>
        </div>
      </div>

      {/* Features Grid - Clean Design */}
      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            onClick={() => onNavigate(feature.action)}
            className="group p-8 rounded-3xl border hover:border-primary/50 hover:shadow-2xl transition-all cursor-pointer bg-card"
          >
            <div className={`size-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <feature.icon className="size-7 text-white" />
            </div>

            <h3 className="text-2xl mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Stats Section - Minimalist */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-5xl mb-3">1000</p>
            <p className="text-sm text-muted-foreground">Уровней</p>
          </div>
          <div className="text-center">
            <p className="text-5xl mb-3">5000+</p>
            <p className="text-sm text-muted-foreground">Слов</p>
          </div>
          <div className="text-center">
            <p className="text-5xl mb-3">200+</p>
            <p className="text-sm text-muted-foreground">Phrasal Verbs</p>
          </div>
          <div className="text-center">
            <p className="text-5xl mb-3">AI</p>
            <p className="text-sm text-muted-foreground">Технология</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// About Page
function AboutPage() {
  return (
    <div className="max-w-3xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl">О SmartSpeak</h1>
        <p className="text-xl text-muted-foreground">
          Революционная AI-платформа для изучения английского языка
        </p>
      </div>

      <div className="prose prose-lg max-w-none space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl">🎯 Наша миссия</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Сделать изучение английского языка доступным, эффективным и увлекательным для каждого студента.
            Мы используем передовые технологии искусственного интеллекта для создания персонализированного
            опыта обучения.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl">✨ Ключевые особенности</h2>
          <ul className="space-y-3 text-lg text-muted-foreground">
            <li>🎓 <strong>200 уровней</strong> - уникальные вопросы для каждого пользователя</li>
            <li>🏆 <strong>Система тестов</strong> - 4 уровня сложности с баллами до 100</li>
            <li>📚 <strong>Интерактивные карточки</strong> - 5200+ слов для изучения</li>
            <li>📖 <strong>Полная база материалов</strong> - conditionals, phrasal verbs, irregular verbs</li>
            <li>🤖 <strong>AI-помощник</strong> - умный чат для ответов на любые вопросы</li>
            <li>📊 <strong>Прогресс и репутация</strong> - отслеживание достижений</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl">🔒 Безопасность</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Все данные хранятся локально в вашем браузере. Мы не собираем личную информацию
            и не передаем данные третьим лицам. Ваша конфиденциальность - наш приоритет.
          </p>
        </div>
      </div>
    </div>
  );
}

// Help Page
function HelpPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl mb-2">Помощь</h1>
        <p className="text-xl text-muted-foreground">Руководство по использованию SmartSpeak</p>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl">🎯 Путь освоения</h2>
          <p className="text-muted-foreground leading-relaxed">
            Система из 1000 уровней для постепенного изучения английского языка. Проходите уроки,
            зарабатывайте опыт (XP) и повышайте свою репутацию. Каждый уровень содержит вопросы
            разной сложности и приносит баллы.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl">🏆 Тесты</h2>
          <p className="text-muted-foreground leading-relaxed">
            Выберите уровень сложности: легкий, нормальный, сложный или экстремально сложный.
            Пройдите тест и получите оценку до 100 баллов. Результаты помогут определить
            ваш текущий уровень знаний.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl">📚 Карточки</h2>
          <p className="text-muted-foreground leading-relaxed">
            Интерактивные карточки для запоминания слов. Выберите уровень (A1-C2), переворачивайте
            карточки для просмотра перевода. Отмечайте, какие слова вы знаете, а какие нужно повторить.
            Зарабатывайте до 100 баллов за сессию.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl">📖 Учебные материалы</h2>
          <p className="text-muted-foreground leading-relaxed">
            Полная база знаний включает: все времена с примерами, словарь по уровням (A1-C2),
            200+ phrasal verbs, 50+ irregular verbs. Используйте поиск для быстрого нахождения нужной информации.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl">🔊 Озвучивание</h2>
          <p className="text-muted-foreground leading-relaxed">
            Нажимайте кнопку с иконкой динамика для прослушивания произношения слов и фраз.
            Скорость речи можно настроить в настройках приложения.
          </p>
        </div>
      </div>
    </div>
  );
}

// FAQ Page
function FAQPage() {
  const faqs = [
    {
      q: "Как работает система уровней?",
      a: "Каждый пройденный урок дает вам опыт (XP). Накопив 100 XP, вы переходите на следующий уровень. Всего доступно 200 уровней с уникальными вопросами, которые не повторяются благодаря генерации на основе вашего ID."
    },
    {
      q: "Что такое репутация?",
      a: "Репутация - это показатель вашего общего прогресса. Вы получаете репутацию за прохождение уроков и тестов. Чем выше репутация, тем больше ваших достижений."
    },
    {
      q: "Как получить 100 баллов?",
      a: "Максимум 100 баллов можно получить: в тестах - ответив правильно на все вопросы, в карточках - отметив все слова как известные. Баллы показывают вашу успешность в конкретном задании."
    },
    {
      q: "Сохраняется ли мой прогресс?",
      a: "Да, весь ваш прогресс, включая пройденные уровни, баллы и репутацию, автоматически сохраняется в браузере. Данные не отправляются на сервер и остаются только на вашем устройстве."
    },
    {
      q: "Какие браузеры поддерживаются?",
      a: "SmartSpeak работает во всех современных браузерах: Chrome, Edge, Firefox, Safari. Для озвучивания рекомендуется использовать Chrome или Edge."
    },
    {
      q: "Нужно ли подключение к интернету?",
      a: "Для первой загрузки нужен интернет. После этого большинство функций работают офлайн, кроме озвучивания, которое требует подключения."
    },
  ];

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl mb-2">Частые вопросы</h1>
        <p className="text-xl text-muted-foreground">Ответы на популярные вопросы</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl mb-3">{faq.q}</h3>
            <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}