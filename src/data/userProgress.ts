// Enhanced User Progress Management with Achievements and Streak

import { ACHIEVEMENTS, checkAchievement } from './achievements';
import { StreakData, getInitialStreakData, updateStreak, saveStreakData } from './streakSystem';

export interface UserProgress {
  // Core Stats
  level: number;
  experience: number;
  reputation: number;

  // Learning Progress
  completedLessons: number[];
  totalScore: number;

  // Achievements & Streak
  unlockedAchievements: string[];
  streakData: StreakData;

  // Enhanced Tracking
  perfectScores: number; // Count of 100% scores
  vocabularyMastered: number; // Words learned
  phrasalVerbsMastered: number;
  grammarTopicsCompleted: number;

  // Time tracking
  totalStudyTimeMinutes: number;
  lastActivityDate: string;

  // Statistics
  testsCompleted: number;
  flashcardsReviewed: number;

  // Visited sections for explorer achievement
  visitedSections: string[];
}

export const getInitialProgress = (): UserProgress => {
  const saved = localStorage.getItem('smartspeak-user-progress');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Ensure streakData exists (for backward compatibility)
    if (!parsed.streakData) {
      parsed.streakData = getInitialStreakData();
    }
    return parsed;
  }
  return {
    level: 1,
    experience: 0,
    reputation: 0,
    completedLessons: [],
    totalScore: 0,
    unlockedAchievements: [],
    streakData: getInitialStreakData(),
    perfectScores: 0,
    vocabularyMastered: 0,
    phrasalVerbsMastered: 0,
    grammarTopicsCompleted: 0,
    totalStudyTimeMinutes: 0,
    lastActivityDate: '',
    testsCompleted: 0,
    flashcardsReviewed: 0,
    visitedSections: []
  };
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem('smartspeak-user-progress', JSON.stringify(progress));
  // Also save streak data separately for easier access
  saveStreakData(progress.streakData);
};

export const calculateLevel = (experience: number): number => {
  // Each level requires 100 XP
  return Math.floor(experience / 100) + 1;
};

export const getExperienceForNextLevel = (currentLevel: number): number => {
  return currentLevel * 100;
};

export const getProgressToNextLevel = (experience: number): number => {
  const currentLevelXP = (calculateLevel(experience) - 1) * 100;
  const xpInCurrentLevel = experience - currentLevelXP;
  return (xpInCurrentLevel / 100) * 100; // Percentage
};

export const addExperience = (progress: UserProgress, amount: number): UserProgress => {
  const newExperience = progress.experience + amount;
  const newLevel = calculateLevel(newExperience);
  const newReputation = progress.reputation + Math.floor(amount / 10);

  return {
    ...progress,
    experience: newExperience,
    level: newLevel,
    reputation: newReputation,
    totalScore: progress.totalScore + amount
  };
};

export const completeLesson = (progress: UserProgress, lessonId: number, score: number): UserProgress => {
  if (progress.completedLessons.includes(lessonId)) {
    return progress; // Already completed
  }

  let updatedProgress = addExperience(progress, score);
  updatedProgress = {
    ...updatedProgress,
    completedLessons: [...progress.completedLessons, lessonId]
  };

  // Update streak
  updatedProgress.streakData = updateStreak(updatedProgress.streakData);

  // Check for achievements
  updatedProgress = checkAllAchievements(updatedProgress);

  return updatedProgress;
};

export const recordPerfectScore = (progress: UserProgress): UserProgress => {
  const updated = {
    ...progress,
    perfectScores: progress.perfectScores + 1
  };
  return checkAllAchievements(updated);
};

export const recordTestCompletion = (progress: UserProgress, score: number): UserProgress => {
  let updated = {
    ...progress,
    testsCompleted: progress.testsCompleted + 1
  };

  if (score === 100) {
    updated = recordPerfectScore(updated);
  }

  updated = addExperience(updated, score);
  updated.streakData = updateStreak(updated.streakData);

  return checkAllAchievements(updated);
};

export const recordVocabularyMastery = (progress: UserProgress, count: number = 1): UserProgress => {
  const updated = {
    ...progress,
    vocabularyMastered: progress.vocabularyMastered + count
  };
  return checkAllAchievements(updated);
};

export const recordPhrasalVerbMastery = (progress: UserProgress, count: number = 1): UserProgress => {
  const updated = {
    ...progress,
    phrasalVerbsMastered: progress.phrasalVerbsMastered + count
  };
  return checkAllAchievements(updated);
};

export const recordGrammarTopicCompletion = (progress: UserProgress): UserProgress => {
  const updated = {
    ...progress,
    grammarTopicsCompleted: progress.grammarTopicsCompleted + 1
  };
  return checkAllAchievements(updated);
};

export const recordSectionVisit = (progress: UserProgress, sectionId: string): UserProgress => {
  if (progress.visitedSections.includes(sectionId)) {
    return progress;
  }

  const updated = {
    ...progress,
    visitedSections: [...progress.visitedSections, sectionId]
  };

  // Check if all sections visited (for explorer achievement)
  const allSections = ['home', 'learning-path', 'test-levels', 'flashcards', 'materials', 'about'];
  if (allSections.every(s => updated.visitedSections.includes(s))) {
    return checkAllAchievements(updated);
  }

  return updated;
};

export const addStudyTime = (progress: UserProgress, minutes: number): UserProgress => {
  return {
    ...progress,
    totalStudyTimeMinutes: progress.totalStudyTimeMinutes + minutes
  };
};

export const checkAllAchievements = (progress: UserProgress): UserProgress => {
  const newAchievements: string[] = [];

  ACHIEVEMENTS.forEach(achievement => {
    let currentValue = 0;

    switch (achievement.id) {
      // Learning achievements
      case 'first-lesson':
      case 'lessons-10':
      case 'lessons-50':
      case 'lessons-100':
      case 'lessons-200':
        currentValue = progress.completedLessons.length;
        break;

      // Level achievements
      case 'level-5':
      case 'level-10':
      case 'level-25':
      case 'level-50':
      case 'level-100':
        currentValue = progress.level;
        break;

      // Streak achievements
      case 'streak-3':
      case 'streak-7':
      case 'streak-14':
      case 'streak-30':
      case 'streak-100':
        currentValue = progress.streakData.currentStreak;
        break;

      // Mastery achievements
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

      // Special achievements
      case 'early-bird':
      case 'night-owl':
        // These are checked separately based on time
        break;

      case 'explorer':
        const allSections = ['home', 'learning-path', 'test-levels', 'flashcards', 'materials', 'about'];
        currentValue = allSections.every(s => progress.visitedSections.includes(s)) ? 1 : 0;
        break;
    }

    if (checkAchievement(achievement.id, currentValue, progress.unlockedAchievements)) {
      newAchievements.push(achievement.id);
    }
  });

  if (newAchievements.length > 0) {
    // Add XP rewards for new achievements
    let xpBonus = 0;
    newAchievements.forEach(id => {
      const achievement = ACHIEVEMENTS.find(a => a.id === id);
      if (achievement) {
        xpBonus += achievement.xpReward;
      }
    });

    const withXP = addExperience(progress, xpBonus);

    return {
      ...withXP,
      unlockedAchievements: [...progress.unlockedAchievements, ...newAchievements]
    };
  }

  return progress;
};

export const checkTimeBasedAchievements = (progress: UserProgress): UserProgress => {
  const hour = new Date().getHours();
  let updated = { ...progress };

  // Early bird (before 8 AM)
  if (hour < 8 && !progress.unlockedAchievements.includes('early-bird')) {
    const achievement = ACHIEVEMENTS.find(a => a.id === 'early-bird');
    if (achievement) {
      updated = addExperience(updated, achievement.xpReward);
      updated.unlockedAchievements = [...updated.unlockedAchievements, 'early-bird'];
    }
  }

  // Night owl (after 11 PM)
  if (hour >= 23 && !progress.unlockedAchievements.includes('night-owl')) {
    const achievement = ACHIEVEMENTS.find(a => a.id === 'night-owl');
    if (achievement) {
      updated = addExperience(updated, achievement.xpReward);
      updated.unlockedAchievements = [...updated.unlockedAchievements, 'night-owl'];
    }
  }

  return updated;
};
