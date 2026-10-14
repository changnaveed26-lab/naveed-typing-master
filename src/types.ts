export type FingerId =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'left-thumb'
  | 'right-thumb'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky';

export type HandId = 'left' | 'right';

export interface FingerInfo {
  id: FingerId;
  name: string;
  urduName: string;
  hand: HandId;
  keys: string[];
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  ringClass: string;
}

export interface KeyItem {
  id: string;
  char: string;
  shiftChar?: string;
  code: string;
  width?: string;
  finger: FingerId;
  isSpecial?: boolean;
  label?: string;
  isHomeKey?: boolean;
}

export interface LessonExercise {
  id: string;
  prompt: string;
  urduPrompt: string;
  text: string;
}

export interface LessonTest {
  id: string;
  prompt: string;
  urduPrompt: string;
  text: string;
  minWpm: number;
  minAccuracy: number;
  timeLimitSeconds?: number;
}

export interface SubLesson {
  id: string; // e.g. "1.1", "1.2"
  title: string;
  urduTitle: string;
  description: string;
  urduDescription: string;
  focusKeys: string[];
  instructions: string[];
  urduInstructions: string[];
  practiceExercises: LessonExercise[];
  test: LessonTest;
}

export interface Lesson {
  id: number; // 1 to 12
  title: string;
  urduTitle: string;
  subtitle: string;
  urduSubtitle: string;
  category: string;
  description: string;
  urduDescription: string;
  targetKeys: string[];
  focusFingers: FingerId[];
  instructions: string[];
  urduInstructions: string[];
  // Retain exercises for backward compatibility
  exercises: LessonExercise[];
  // Expanded multiple short lessons for each level
  subLessons: SubLesson[];
}

export interface SubLessonResult {
  subLessonId: string;
  levelId: number;
  passed: boolean;
  wpm: number;
  cpm: number;
  accuracy: number;
  mistakes: number;
  timeSpentSeconds: number;
  stars: number;
  completedAt: string;
}

export interface StudentProfile {
  name: string;
  rollNo?: string;
  joinedDate: string;
  avatarSeed: string;
}

export interface LessonResult {
  lessonId: number;
  completedAt: string;
  wpm: number;
  cpm: number;
  accuracy: number;
  timeSpentSeconds: number;
  stars: number;
  errors: number;
  passed: boolean;
}

export interface SpeedTestScore {
  id: string;
  date: string;
  durationMinutes: number;
  wpm: number;
  cpm: number;
  netWpm: number;
  accuracy: number;
  totalKeystrokes: number;
  errorCount: number;
  textTitle: string;
}

export interface GameScore {
  gameId: 'falling-letters' | 'word-rush' | 'speed-burst' | 'accuracy-pop';
  gameName: string;
  score: number;
  highScore: number;
  accuracy: number;
  wpm: number;
  date: string;
}

export interface StudentStats {
  profile: StudentProfile;
  completedLessons: Record<number, LessonResult>;
  completedSubLessons: Record<string, SubLessonResult>;
  speedTestHistory: SpeedTestScore[];
  gameScores: Record<string, number>; // gameId -> high score
  currentLessonId: number;
  currentSubLessonId?: string;
  soundEnabled: boolean;
  showUrdu: boolean;
  darkMode: boolean;
}
