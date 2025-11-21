import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Trophy, Target, Flame, Star, Sparkles, Lock } from 'lucide-react';
import { ACHIEVEMENTS, Achievement, getRarityColor, getRarityGradient } from '../data/achievements';
import { UserProgress } from '../data/userProgress';

interface AchievementsDisplayProps {
    progress: UserProgress;
}

export function AchievementsDisplay({ progress }: AchievementsDisplayProps) {
    const [selectedCategory, setSelectedCategory] = useState<Achievement['category'] | 'all'>('all');

    const unlockedAchievements = ACHIEVEMENTS.filter(a =>
        progress.unlockedAchievements.includes(a.id)
    );

    const lockedAchievements = ACHIEVEMENTS.filter(a =>
        !progress.unlockedAchievements.includes(a.id)
    );

    const filteredUnlocked = selectedCategory === 'all'
        ? unlockedAchievements
        : unlockedAchievements.filter(a => a.category === selectedCategory);

    const filteredLocked = selectedCategory === 'all'
        ? lockedAchievements
        : lockedAchievements.filter(a => a.category === selectedCategory);

    const getProgressForAchievement = (achievement: Achievement): number => {
        let currentValue = 0;

        switch (achievement.id) {
            case 'first-lesson':
            case 'lessons-10':
            case 'lessons-50':
            case 'lessons-100':
            case 'lessons-200':
                currentValue = progress.completedLessons.length;
                break;

            case 'level-5':
            case 'level-10':
            case 'level-25':
            case 'level-50':
            case 'level-100':
                currentValue = progress.level;
                break;

            case 'streak-3':
            case 'streak-7':
            case 'streak-14':
            case 'streak-30':
            case 'streak-100':
                currentValue = progress.streakData.currentStreak;
                break;

            case 'perfect-score':
            case 'perfect-5':
                currentValue = progress.perfectScores;
                break;

            case 'vocabulary-master':
                currentValue = progress.vocabularyMastered;
                break;

            case 'phrasal-expert':
                currentValue = progress.phrasalVerbsMastered;
                break;

            case 'grammar-guru':
                currentValue = progress.grammarTopicsCompleted;
                break;
        }

        return Math.min(100, (currentValue / achievement.requirement) * 100);
    };

    const getCategoryIcon = (category: Achievement['category']) => {
        switch (category) {
            case 'learning': return <Target className="size-4" />;
            case 'streak': return <Flame className="size-4" />;
            case 'mastery': return <Trophy className="size-4" />;
            case 'social': return <Star className="size-4" />;
            case 'special': return <Sparkles className="size-4" />;
        }
    };

    const getCategoryName = (category: Achievement['category']) => {
        switch (category) {
            case 'learning': return 'Обучение';
            case 'streak': return 'Streak';
            case 'mastery': return 'Мастерство';
            case 'social': return 'Социальные';
            case 'special': return 'Особые';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Разблокировано</CardDescription>
                        <CardTitle className="text-3xl">{unlockedAchievements.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Всего</CardDescription>
                        <CardTitle className="text-3xl">{ACHIEVEMENTS.length}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Прогресс</CardDescription>
                        <CardTitle className="text-3xl">
                            {Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100)}%
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Заработано XP</CardDescription>
                        <CardTitle className="text-3xl">
                            {unlockedAchievements.reduce((sum, a) => sum + a.xpReward, 0)}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Category Filter */}
            <Tabs defaultValue="all" onValueChange={(v) => setSelectedCategory(v as any)}>
                <TabsList className="grid grid-cols-6 w-full">
                    <TabsTrigger value="all">Все</TabsTrigger>
                    <TabsTrigger value="learning" className="gap-1">
                        {getCategoryIcon('learning')} Обучение
                    </TabsTrigger>
                    <TabsTrigger value="streak" className="gap-1">
                        {getCategoryIcon('streak')} Streak
                    </TabsTrigger>
                    <TabsTrigger value="mastery" className="gap-1">
                        {getCategoryIcon('mastery')} Мастерство
                    </TabsTrigger>
                    <TabsTrigger value="social" className="gap-1">
                        {getCategoryIcon('social')} Социальные
                    </TabsTrigger>
                    <TabsTrigger value="special" className="gap-1">
                        {getCategoryIcon('special')} Особые
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={selectedCategory} className="space-y-6 mt-6">
                    {/* Unlocked Achievements */}
                    {filteredUnlocked.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">🏆 Разблокированные</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredUnlocked.map((achievement) => (
                                    <Card key={achievement.id} className="relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${getRarityGradient(achievement.rarity)} opacity-5`} />
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className={`text-4xl size-16 rounded-2xl bg-gradient-to-br ${getRarityGradient(achievement.rarity)} flex items-center justify-center shadow-lg`}>
                                                    {achievement.icon}
                                                </div>
                                                <Badge variant="secondary" className={getRarityColor(achievement.rarity)}>
                                                    {achievement.rarity}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-lg mt-4">{achievement.title}</CardTitle>
                                            <CardDescription>{achievement.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-muted-foreground">
                                                    {getCategoryName(achievement.category)}
                                                </span>
                                                <span className="font-semibold text-green-600 dark:text-green-400">
                                                    +{achievement.xpReward} XP
                                                </span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Locked Achievements */}
                    {filteredLocked.length > 0 && (
                        <div>
                            <h3 className="text-xl font-semibold mb-4">🔒 Заблокированные</h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredLocked.map((achievement) => {
                                    const progressPercent = getProgressForAchievement(achievement);

                                    return (
                                        <Card key={achievement.id} className="relative overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                                            <CardHeader>
                                                <div className="flex items-start justify-between">
                                                    <div className="text-4xl size-16 rounded-2xl bg-muted flex items-center justify-center relative">
                                                        <span className="opacity-30">{achievement.icon}</span>
                                                        <Lock className="size-6 absolute text-muted-foreground" />
                                                    </div>
                                                    <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                                                        {achievement.rarity}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-lg mt-4">{achievement.title}</CardTitle>
                                                <CardDescription>{achievement.description}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="space-y-3">
                                                <Progress value={progressPercent} className="h-2" />
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">
                                                        {Math.round(progressPercent)}% завершено
                                                    </span>
                                                    <span className="font-semibold text-muted-foreground">
                                                        +{achievement.xpReward} XP
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {filteredUnlocked.length === 0 && filteredLocked.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            Нет достижений в этой категории
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
