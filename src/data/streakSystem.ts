// Streak System - Daily learning tracking

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string; // ISO date string
    activityDates: string[]; // Array of ISO date strings
    freezeCount: number; // Number of streak freezes available
}

export const getInitialStreakData = (): StreakData => {
    const saved = localStorage.getItem('smartspeak-streak-data');
    if (saved) {
        return JSON.parse(saved);
    }
    return {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: '',
        activityDates: [],
        freezeCount: 0
    };
};

export const saveStreakData = (data: StreakData): void => {
    localStorage.setItem('smartspeak-streak-data', JSON.stringify(data));
};

export const getTodayDateString = (): string => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
};

export const getYesterdayDateString = (): string => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split('T')[0];
};

export const updateStreak = (streakData: StreakData): StreakData => {
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    // If already logged today, return unchanged
    if (streakData.activityDates.includes(today)) {
        return streakData;
    }

    let newStreak = streakData.currentStreak;

    // Check if this is a continuation of the streak
    if (streakData.lastActivityDate === yesterday) {
        // Continue streak
        newStreak = streakData.currentStreak + 1;
    } else if (streakData.lastActivityDate === today) {
        // Already counted today
        newStreak = streakData.currentStreak;
    } else {
        // Streak broken, start new
        newStreak = 1;
    }

    const newActivityDates = [...streakData.activityDates, today];
    const newLongestStreak = Math.max(streakData.longestStreak, newStreak);

    return {
        ...streakData,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: today,
        activityDates: newActivityDates
    };
};

export const useStreakFreeze = (streakData: StreakData): StreakData | null => {
    if (streakData.freezeCount <= 0) {
        return null; // No freezes available
    }

    const today = getTodayDateString();

    return {
        ...streakData,
        lastActivityDate: today,
        activityDates: [...streakData.activityDates, today],
        freezeCount: streakData.freezeCount - 1
    };
};

export const earnStreakFreeze = (streakData: StreakData): StreakData => {
    return {
        ...streakData,
        freezeCount: streakData.freezeCount + 1
    };
};

export const getStreakStatus = (streakData: StreakData): {
    isActive: boolean;
    daysUntilBreak: number;
    message: string;
} => {
    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    if (streakData.lastActivityDate === today) {
        return {
            isActive: true,
            daysUntilBreak: 1,
            message: '🔥 Отлично! Вы уже занимались сегодня!'
        };
    }

    if (streakData.lastActivityDate === yesterday) {
        return {
            isActive: true,
            daysUntilBreak: 0,
            message: '⚠️ Не забудьте позаниматься сегодня, чтобы сохранить streak!'
        };
    }

    return {
        isActive: false,
        daysUntilBreak: 0,
        message: '💔 Streak прерван. Начните новый сегодня!'
    };
};

export const getCalendarData = (streakData: StreakData, monthsBack: number = 3): {
    date: string;
    hasActivity: boolean;
    isToday: boolean;
}[] => {
    const result: { date: string; hasActivity: boolean; isToday: boolean }[] = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - monthsBack);

    const currentDate = new Date(startDate);
    const todayString = getTodayDateString();

    while (currentDate <= today) {
        const dateString = currentDate.toISOString().split('T')[0];
        result.push({
            date: dateString,
            hasActivity: streakData.activityDates.includes(dateString),
            isToday: dateString === todayString
        });
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return result;
};

export const getStreakMotivation = (streak: number): string => {
    if (streak === 0) return "Начните свой путь сегодня! 🚀";
    if (streak === 1) return "Отличное начало! 🎯";
    if (streak < 7) return "Продолжайте в том же духе! 💪";
    if (streak < 14) return "Неделя позади! Вы великолепны! 🌟";
    if (streak < 30) return "Это уже привычка! 🔥";
    if (streak < 100) return "Вы невероятны! 🏆";
    return "Легенда SmartSpeak! 👑";
};
