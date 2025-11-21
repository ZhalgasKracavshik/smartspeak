// Achievement System for SmartSpeak

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'mastery' | 'social' | 'special';
  requirement: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  unlockedAt?: Date;
}

export const ACHIEVEMENTS: Achievement[] = [
  // Learning Achievements
  {
    id: 'first-lesson',
    title: 'Первые шаги',
    description: 'Завершите первый урок',
    icon: '🎯',
    category: 'learning',
    requirement: 1,
    rarity: 'common',
    xpReward: 10
  },
  {
    id: 'lessons-10',
    title: 'Начинающий',
    description: 'Завершите 10 уроков',
    icon: '📚',
    category: 'learning',
    requirement: 10,
    rarity: 'common',
    xpReward: 50
  },
  {
    id: 'lessons-50',
    title: 'Прилежный ученик',
    description: 'Завершите 50 уроков',
    icon: '🎓',
    category: 'learning',
    requirement: 50,
    rarity: 'rare',
    xpReward: 200
  },
  {
    id: 'lessons-100',
    title: 'Мастер обучения',
    description: 'Завершите 100 уроков',
    icon: '🏆',
    category: 'learning',
    requirement: 100,
    rarity: 'epic',
    xpReward: 500
  },
  {
    id: 'lessons-200',
    title: 'Легенда SmartSpeak',
    description: 'Завершите все 200 уроков',
    icon: '👑',
    category: 'learning',
    requirement: 200,
    rarity: 'legendary',
    xpReward: 1000
  },

  // Level Achievements
  {
    id: 'level-5',
    title: 'Уровень 5',
    description: 'Достигните 5 уровня',
    icon: '⭐',
    category: 'learning',
    requirement: 5,
    rarity: 'common',
    xpReward: 25
  },
  {
    id: 'level-10',
    title: 'Уровень 10',
    description: 'Достигните 10 уровня',
    icon: '🌟',
    category: 'learning',
    requirement: 10,
    rarity: 'common',
    xpReward: 50
  },
  {
    id: 'level-25',
    title: 'Уровень 25',
    description: 'Достигните 25 уровня',
    icon: '💫',
    category: 'learning',
    requirement: 25,
    rarity: 'rare',
    xpReward: 150
  },
  {
    id: 'level-50',
    title: 'Уровень 50',
    description: 'Достигните 50 уровня',
    icon: '✨',
    category: 'learning',
    requirement: 50,
    rarity: 'epic',
    xpReward: 300
  },
  {
    id: 'level-100',
    title: 'Уровень 100',
    description: 'Достигните 100 уровня',
    icon: '🔥',
    category: 'learning',
    requirement: 100,
    rarity: 'legendary',
    xpReward: 1000
  },

  // Streak Achievements
  {
    id: 'streak-3',
    title: 'Начало привычки',
    description: '3 дня подряд',
    icon: '🔥',
    category: 'streak',
    requirement: 3,
    rarity: 'common',
    xpReward: 30
  },
  {
    id: 'streak-7',
    title: 'Неделя силы',
    description: '7 дней подряд',
    icon: '🔥',
    category: 'streak',
    requirement: 7,
    rarity: 'rare',
    xpReward: 100
  },
  {
    id: 'streak-14',
    title: 'Две недели',
    description: '14 дней подряд',
    icon: '🔥',
    category: 'streak',
    requirement: 14,
    rarity: 'rare',
    xpReward: 200
  },
  {
    id: 'streak-30',
    title: 'Месяц дисциплины',
    description: '30 дней подряд',
    icon: '🔥',
    category: 'streak',
    requirement: 30,
    rarity: 'epic',
    xpReward: 500
  },
  {
    id: 'streak-100',
    title: 'Непобедимый',
    description: '100 дней подряд',
    icon: '🔥',
    category: 'streak',
    requirement: 100,
    rarity: 'legendary',
    xpReward: 2000
  },

  // Mastery Achievements
  {
    id: 'perfect-score',
    title: 'Идеальный результат',
    description: 'Получите 100 баллов в тесте',
    icon: '💯',
    category: 'mastery',
    requirement: 1,
    rarity: 'rare',
    xpReward: 100
  },
  {
    id: 'perfect-5',
    title: 'Перфекционист',
    description: 'Получите 100 баллов 5 раз',
    icon: '🎯',
    category: 'mastery',
    requirement: 5,
    rarity: 'epic',
    xpReward: 300
  },
  {
    id: 'vocabulary-master',
    title: 'Мастер словаря',
    description: 'Выучите 1000 слов',
    icon: '📖',
    category: 'mastery',
    requirement: 1000,
    rarity: 'epic',
    xpReward: 500
  },
  {
    id: 'phrasal-expert',
    title: 'Эксперт фразовых глаголов',
    description: 'Выучите 100 phrasal verbs',
    icon: '🎪',
    category: 'mastery',
    requirement: 100,
    rarity: 'rare',
    xpReward: 250
  },
  {
    id: 'grammar-guru',
    title: 'Гуру грамматики',
    description: 'Изучите все времена',
    icon: '⚡',
    category: 'mastery',
    requirement: 12,
    rarity: 'epic',
    xpReward: 400
  },

  // Special Achievements
  {
    id: 'early-bird',
    title: 'Ранняя пташка',
    description: 'Занимайтесь до 8 утра',
    icon: '🌅',
    category: 'special',
    requirement: 1,
    rarity: 'rare',
    xpReward: 50
  },
  {
    id: 'night-owl',
    title: 'Ночная сова',
    description: 'Занимайтесь после 23:00',
    icon: '🦉',
    category: 'special',
    requirement: 1,
    rarity: 'rare',
    xpReward: 50
  },
  {
    id: 'speed-demon',
    title: 'Скоростной демон',
    description: 'Завершите урок за 2 минуты',
    icon: '⚡',
    category: 'special',
    requirement: 1,
    rarity: 'epic',
    xpReward: 150
  },
  {
    id: 'comeback',
    title: 'Возвращение',
    description: 'Вернитесь после перерыва в 7+ дней',
    icon: '🎉',
    category: 'special',
    requirement: 1,
    rarity: 'rare',
    xpReward: 100
  },
  {
    id: 'explorer',
    title: 'Исследователь',
    description: 'Посетите все разделы приложения',
    icon: '🗺️',
    category: 'special',
    requirement: 1,
    rarity: 'common',
    xpReward: 50
  }
];

export const getRarityColor = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common': return 'text-gray-600 dark:text-gray-400';
    case 'rare': return 'text-blue-600 dark:text-blue-400';
    case 'epic': return 'text-purple-600 dark:text-purple-400';
    case 'legendary': return 'text-yellow-600 dark:text-yellow-400';
  }
};

export const getRarityGradient = (rarity: Achievement['rarity']): string => {
  switch (rarity) {
    case 'common': return 'from-gray-400 to-gray-600';
    case 'rare': return 'from-blue-400 to-blue-600';
    case 'epic': return 'from-purple-400 to-purple-600';
    case 'legendary': return 'from-yellow-400 to-yellow-600';
  }
};

export const checkAchievement = (
  achievementId: string,
  currentValue: number,
  unlockedAchievements: string[]
): boolean => {
  if (unlockedAchievements.includes(achievementId)) {
    return false; // Already unlocked
  }

  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!achievement) return false;

  return currentValue >= achievement.requirement;
};
