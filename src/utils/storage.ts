import { StudentStats, LessonResult, SubLessonResult, SpeedTestScore } from '../types';

const STORAGE_KEY = 'naveed_typing_master_stats_v2';

export const DEFAULT_STATS: StudentStats = {
  profile: {
    name: 'Naveed Student',
    rollNo: 'SMBT-001',
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    avatarSeed: 'scholar',
  },
  completedLessons: {},
  completedSubLessons: {},
  speedTestHistory: [],
  gameScores: {},
  currentLessonId: 1,
  currentSubLessonId: '1.1',
  soundEnabled: true,
  showUrdu: true,
  darkMode: false,
};

export function loadStudentStats(): StudentStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('naveed_typing_master_stats_v1');
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      profile: {
        ...DEFAULT_STATS.profile,
        ...(parsed.profile || {}),
      },
      completedLessons: parsed.completedLessons || {},
      completedSubLessons: parsed.completedSubLessons || {},
      gameScores: parsed.gameScores || {},
      speedTestHistory: parsed.speedTestHistory || [],
    };
  } catch (err) {
    console.error('Failed to load stats from localStorage', err);
    return DEFAULT_STATS;
  }
}

export function saveStudentStats(stats: StudentStats) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save stats to localStorage', err);
  }
}

export function recordSubLessonCompletion(
  stats: StudentStats,
  result: SubLessonResult
): StudentStats {
  const existing = stats.completedSubLessons[result.subLessonId];
  // Keep best WPM and accuracy if repeating lesson
  const bestResult = existing
    ? {
        ...result,
        wpm: Math.max(existing.wpm, result.wpm),
        cpm: Math.max(existing.cpm, result.cpm),
        accuracy: Math.max(existing.accuracy, result.accuracy),
        stars: Math.max(existing.stars, result.stars),
        passed: existing.passed || result.passed,
      }
    : result;

  const updatedSub = {
    ...stats.completedSubLessons,
    [result.subLessonId]: bestResult,
  };

  const newStats: StudentStats = {
    ...stats,
    completedSubLessons: updatedSub,
  };

  saveStudentStats(newStats);
  return newStats;
}

export function recordLessonCompletion(
  stats: StudentStats,
  result: LessonResult
): StudentStats {
  const existing = stats.completedLessons[result.lessonId];
  const bestResult = existing
    ? {
        ...result,
        wpm: Math.max(existing.wpm, result.wpm),
        cpm: Math.max(existing.cpm, result.cpm),
        accuracy: Math.max(existing.accuracy, result.accuracy),
        stars: Math.max(existing.stars, result.stars),
        passed: existing.passed || result.passed,
      }
    : result;

  const updatedCompleted = {
    ...stats.completedLessons,
    [result.lessonId]: bestResult,
  };

  const nextId = Math.min(12, Math.max(stats.currentLessonId, result.lessonId + 1));

  const newStats: StudentStats = {
    ...stats,
    completedLessons: updatedCompleted,
    currentLessonId: nextId,
  };

  saveStudentStats(newStats);
  return newStats;
}

export function recordSpeedTest(
  stats: StudentStats,
  testResult: SpeedTestScore
): StudentStats {
  const newHistory = [testResult, ...stats.speedTestHistory.slice(0, 19)];
  const newStats: StudentStats = {
    ...stats,
    speedTestHistory: newHistory,
  };
  saveStudentStats(newStats);
  return newStats;
}

export function recordGameHighScore(
  stats: StudentStats,
  gameId: string,
  score: number
): StudentStats {
  const currentBest = stats.gameScores[gameId] || 0;
  if (score > currentBest) {
    const updated = {
      ...stats,
      gameScores: {
        ...stats.gameScores,
        [gameId]: score,
      },
    };
    saveStudentStats(updated);
    return updated;
  }
  return stats;
}
