import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Flame, Snowflake, Calendar, TrendingUp } from 'lucide-react';
import { StreakData, getStreakStatus, getStreakMotivation, getCalendarData } from '../data/streakSystem';

interface StreakDisplayProps {
    streakData: StreakData;
    onUseFreeze?: () => void;
}

export function StreakDisplay({ streakData, onUseFreeze }: StreakDisplayProps) {
    const status = getStreakStatus(streakData);
    const motivation = getStreakMotivation(streakData.currentStreak);
    const calendarData = getCalendarData(streakData, 3);

    // Group calendar data by weeks
    const weeks: typeof calendarData[] = [];
    for (let i = 0; i < calendarData.length; i += 7) {
        weeks.push(calendarData.slice(i, i + 7));
    }

    const getStreakColor = (streak: number): string => {
        if (streak === 0) return 'text-gray-400';
        if (streak < 7) return 'text-orange-500';
        if (streak < 30) return 'text-red-500';
        if (streak < 100) return 'text-purple-500';
        return 'text-yellow-500';
    };

    const getStreakGradient = (streak: number): string => {
        if (streak === 0) return 'from-gray-400 to-gray-600';
        if (streak < 7) return 'from-orange-400 to-orange-600';
        if (streak < 30) return 'from-red-400 to-red-600';
        if (streak < 100) return 'from-purple-400 to-purple-600';
        return 'from-yellow-400 to-yellow-600';
    };

    return (
        <div className="space-y-6">
            {/* Main Streak Card */}
            <Card className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${getStreakGradient(streakData.currentStreak)} opacity-5`} />
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Ваш Streak</CardTitle>
                            <CardDescription>{motivation}</CardDescription>
                        </div>
                        <div className={`size-20 rounded-full bg-gradient-to-br ${getStreakGradient(streakData.currentStreak)} flex items-center justify-center shadow-2xl`}>
                            <Flame className={`size-10 text-white ${streakData.currentStreak > 0 ? 'animate-pulse' : ''}`} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Streak Stats */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-2xl bg-muted/50">
                            <div className={`text-4xl font-bold ${getStreakColor(streakData.currentStreak)}`}>
                                {streakData.currentStreak}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Текущий</div>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-muted/50">
                            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                                {streakData.longestStreak}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Рекорд</div>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-muted/50">
                            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                                {streakData.activityDates.length}
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Всего дней</div>
                        </div>
                    </div>

                    {/* Status Message */}
                    <div className={`p-4 rounded-2xl ${status.isActive
                            ? 'bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800'
                        }`}>
                        <p className={`text-center font-medium ${status.isActive
                                ? 'text-green-700 dark:text-green-300'
                                : 'text-red-700 dark:text-red-300'
                            }`}>
                            {status.message}
                        </p>
                    </div>

                    {/* Streak Freezes */}
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-3">
                            <div className="size-12 rounded-full bg-blue-500 flex items-center justify-center">
                                <Snowflake className="size-6 text-white" />
                            </div>
                            <div>
                                <p className="font-semibold text-blue-700 dark:text-blue-300">Заморозка Streak</p>
                                <p className="text-sm text-blue-600 dark:text-blue-400">
                                    Доступно: {streakData.freezeCount}
                                </p>
                            </div>
                        </div>
                        {streakData.freezeCount > 0 && !status.isActive && onUseFreeze && (
                            <Button
                                onClick={onUseFreeze}
                                variant="outline"
                                size="sm"
                                className="border-blue-500 text-blue-700 dark:text-blue-300"
                            >
                                Использовать
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Activity Calendar */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Calendar className="size-5" />
                        <CardTitle>История активности</CardTitle>
                    </div>
                    <CardDescription>Последние 3 месяца</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex gap-2">
                                {week.map((day) => {
                                    const date = new Date(day.date);
                                    const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });

                                    return (
                                        <div
                                            key={day.date}
                                            className="group relative flex-1"
                                            title={`${date.toLocaleDateString('ru-RU')} - ${day.hasActivity ? 'Активен' : 'Нет активности'}`}
                                        >
                                            <div
                                                className={`aspect-square rounded-lg transition-all ${day.isToday
                                                        ? 'ring-2 ring-blue-500 ring-offset-2'
                                                        : ''
                                                    } ${day.hasActivity
                                                        ? 'bg-gradient-to-br from-green-400 to-green-600 hover:scale-110'
                                                        : 'bg-muted hover:bg-muted/70'
                                                    }`}
                                            />
                                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                {dayName}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t">
                        <div className="flex items-center gap-2">
                            <div className="size-4 rounded bg-gradient-to-br from-green-400 to-green-600" />
                            <span className="text-sm text-muted-foreground">Активен</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-4 rounded bg-muted" />
                            <span className="text-sm text-muted-foreground">Нет активности</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="size-4 rounded ring-2 ring-blue-500" />
                            <span className="text-sm text-muted-foreground">Сегодня</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Streak Milestones */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="size-5" />
                        <CardTitle>Следующие цели</CardTitle>
                    </div>
                    <CardDescription>Продолжайте заниматься, чтобы достичь их!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { days: 3, reward: '30 XP', icon: '🔥' },
                            { days: 7, reward: '100 XP', icon: '🌟' },
                            { days: 14, reward: '200 XP', icon: '💫' },
                            { days: 30, reward: '500 XP', icon: '✨' },
                            { days: 100, reward: '2000 XP', icon: '👑' }
                        ].map((milestone) => {
                            const isCompleted = streakData.currentStreak >= milestone.days;
                            const progress = Math.min(100, (streakData.currentStreak / milestone.days) * 100);

                            return (
                                <div key={milestone.days} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{milestone.icon}</span>
                                            <div>
                                                <p className="font-medium">
                                                    {milestone.days} дней подряд
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    Награда: {milestone.reward}
                                                </p>
                                            </div>
                                        </div>
                                        {isCompleted && (
                                            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                                                ✓ Выполнено
                                            </Badge>
                                        )}
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
