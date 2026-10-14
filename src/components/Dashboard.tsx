import React, { useState } from 'react';
import {
  Play,
  Award,
  Zap,
  Target,
  CheckCircle2,
  Lock,
  ArrowRight,
  UserCheck,
  Building2,
  Trophy,
  Flame,
  ChevronRight,
  BookOpen,
  Gamepad2,
  Sparkles,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { LESSONS } from '../data/lessonsData';
import { StudentStats, StudentProfile } from '../types';
import { HomeRowGuide } from './HomeRowGuide';
import { InteractiveKeyboardTrainer } from './InteractiveKeyboardTrainer';

interface DashboardProps {
  stats: StudentStats;
  onStartLesson: (lessonId: number, subLessonId?: string) => void;
  onOpenSpeedTest: () => void;
  onOpenProgress: () => void;
  onOpenGames?: () => void;
  onUpdateProfile: (profile: Partial<StudentProfile>) => void;
  showUrdu: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  onStartLesson,
  onOpenSpeedTest,
  onOpenProgress,
  onOpenGames,
  onUpdateProfile,
  showUrdu,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(stats.profile.name);

  // Compute stats
  const totalLessons = LESSONS.length;
  const completedCount = Object.keys(stats.completedLessons).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Sub-lesson statistics
  const completedSubList = Object.values(stats.completedSubLessons || {});
  const passedSubCount = completedSubList.filter((s) => s.passed).length;
  const totalSubLessons = LESSONS.reduce(
    (acc, l) => acc + (l.subLessons ? l.subLessons.length : 1),
    0
  );

  // Calculate average WPM and Accuracy
  const completedList = Object.values(stats.completedLessons);
  const avgWpm = completedList.length > 0
    ? Math.round(completedList.reduce((acc, curr) => acc + curr.wpm, 0) / completedList.length)
    : 0;
  const avgAcc = completedList.length > 0
    ? Math.round(completedList.reduce((acc, curr) => acc + curr.accuracy, 0) / completedList.length)
    : 100;
  const totalStars = completedList.reduce((acc, curr) => acc + curr.stars, 0);

  const handleSaveName = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (tempName.trim()) {
      onUpdateProfile({ name: tempName.trim() });
    }
    setEditingName(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Banner: Institute Branding + Student Name Input */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl border border-indigo-900/60 p-6 sm:p-8 lg:p-10">
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              <span>SMBT SKILL COMPUTER CENTER GOLARCHI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Naveed Typing Master
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Professional touch-typing curriculum with interactive virtual keyboard, 10-finger anatomical guidance, short lessons with tests, and real-time speed analysis.
            </p>

            {showUrdu && (
              <p className="font-['Noto_Nastaliq_Urdu'] text-indigo-200 text-sm sm:text-base leading-loose pt-1">
                ایس ایم بی ٹی اسکل کمپیوٹر سینٹر گولارچی کا جدید ترین ٹائپنگ ٹیوٹر — 10 انگلیوں کی رہنمائی اور سرٹیفیکیشن کے ساتھ۔
              </p>
            )}

            {/* Student Name Input & Edit Box */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Student Name:
                </span>
                {editingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Enter Student Name"
                      autoFocus
                      className="px-3 py-1 rounded-lg bg-slate-800 text-white border border-indigo-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg font-bold text-amber-300 bg-amber-400/10 px-3 py-0.5 rounded-lg border border-amber-400/20">
                      {stats.profile.name}
                    </span>
                    <button
                      onClick={() => setEditingName(true)}
                      className="text-xs text-indigo-300 hover:text-white underline underline-offset-2 transition-all cursor-pointer"
                    >
                      (Change Name)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => onStartLesson(stats.currentLessonId)}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 transition-all hover:scale-102 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Start Learning (Lesson {stats.currentLessonId})</span>
            </button>

            <button
              onClick={onOpenSpeedTest}
              className="px-7 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 font-bold text-sm sm:text-base border border-slate-700 shadow-md flex items-center justify-center gap-2.5 transition-all cursor-pointer"
            >
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Take Speed Test</span>
            </button>

            {onOpenGames && (
              <button
                onClick={onOpenGames}
                className="px-7 py-2.5 rounded-2xl bg-indigo-900/60 hover:bg-indigo-800/60 text-indigo-200 font-bold text-xs sm:text-sm border border-indigo-700/50 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4 text-amber-400" />
                <span>Play Typing Games</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Card */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {progressPercent}%
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {passedSubCount} / {totalSubLessons} Short Lessons Done
            </div>
          </div>
        </div>

        {/* Avg WPM Card */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {avgWpm} <span className="text-xs font-medium text-slate-400">WPM</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Average Typing Speed
            </div>
          </div>
        </div>

        {/* Accuracy Card */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {avgAcc}%
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Keystroke Accuracy
            </div>
          </div>
        </div>

        {/* Stars Card */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {totalStars} <span className="text-xs font-medium text-slate-400">Stars</span>
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Earned Badges
            </div>
          </div>
        </div>
      </section>

      {/* Prominently Displayed Realistic QWERTY Keyboard & 10-Finger Placement System */}
      <section id="interactive-keyboard-section" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 font-bold text-xs">
              <span>DESKTOP TOUCH-TYPING KEYBOARD</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Virtual Keyboard & Ten-Finger Placement Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Interactive 104-key realistic computer layout with matching finger color-coding, live guidance, and practice modes.
            </p>
          </div>
          {showUrdu && (
            <span className="font-['Noto_Nastaliq_Urdu'] text-sm text-indigo-600 dark:text-indigo-400 font-bold">
              حقیقی کمپیوٹر کی بورڈ اور 10 انگلیوں کی رہنمائی
            </span>
          )}
        </div>

        <InteractiveKeyboardTrainer showUrdu={showUrdu} onOpenLessonCourse={() => onStartLesson(stats.currentLessonId)} />
      </section>

      {/* Educational Home Row Guide Section */}
      <HomeRowGuide showUrdu={showUrdu} />

      {/* Typing Games Section (Letters, Words, Speed, Accuracy) */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white border border-indigo-800/50 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>ARCADE TYPING ARENA</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Typing Games for Letters, Words, Speed & Accuracy
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Reinforce muscle memory through fun interactive challenges with live scoring and audio effects.
            </p>
          </div>
          {onOpenGames && (
            <button
              onClick={onOpenGames}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-102 cursor-pointer self-start sm:self-auto"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Play All Games</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div
            onClick={onOpenGames}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-110 transition-transform">
              🔤
            </div>
            <h3 className="font-bold text-sm text-white">Falling Letters</h3>
            <p className="text-[11px] text-slate-300 mt-1">
              Catch descending characters before they hit the bottom row.
            </p>
            <div className="text-[10px] text-amber-300 font-bold mt-2">
              Best: {stats.gameScores['falling-letters'] || 0} pts
            </div>
          </div>

          <div
            onClick={onOpenGames}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="font-bold text-sm text-white">Word Rush</h3>
            <p className="text-[11px] text-slate-300 mt-1">
              Type full words floating across the screen to score big streaks.
            </p>
            <div className="text-[10px] text-amber-300 font-bold mt-2">
              Best: {stats.gameScores['word-rush'] || 0} pts
            </div>
          </div>

          <div
            onClick={onOpenGames}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-110 transition-transform">
              ⏱️
            </div>
            <h3 className="font-bold text-sm text-white">Speed Blitz</h3>
            <p className="text-[11px] text-slate-300 mt-1">
              30-second rapid sprint to type as many words as possible.
            </p>
            <div className="text-[10px] text-amber-300 font-bold mt-2">
              Best: {stats.gameScores['speed-blitz'] || 0} words
            </div>
          </div>

          <div
            onClick={onOpenGames}
            className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-sm mb-2 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h3 className="font-bold text-sm text-white">Accuracy Pop</h3>
            <p className="text-[11px] text-slate-300 mt-1">
              High-pressure target pops with zero tolerance for mistakes.
            </p>
            <div className="text-[10px] text-amber-300 font-bold mt-2">
              Best: {stats.gameScores['accuracy-pop'] || 0} hits
            </div>
          </div>
        </div>
      </section>

      {/* 12 Learning Levels Course Grid (With Sub-Lessons Expanded) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Typing Lessons (12 Levels & Short Lessons)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Each level contains short modular lessons, practice exercises, and an end-of-lesson test.
            </p>
          </div>
          {showUrdu && (
            <span className="font-['Noto_Nastaliq_Urdu'] text-sm text-indigo-600 dark:text-indigo-400 font-bold">
              12 درجاتی مکمل ٹائپنگ نصاب اور شارٹ اسباق
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LESSONS.map((lesson) => {
            const result = stats.completedLessons[lesson.id];
            const isCompleted = !!result;
            const isCurrent = lesson.id === stats.currentLessonId;
            const isUnlocked = lesson.id <= stats.currentLessonId || isCompleted;
            const subList = lesson.subLessons || [];

            return (
              <div
                key={lesson.id}
                className={`
                  relative flex flex-col justify-between p-5 rounded-2xl transition-all duration-200 border
                  ${
                    isCurrent
                      ? 'bg-white dark:bg-slate-900 border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg'
                      : isCompleted
                      ? 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-900/60 shadow-xs'
                      : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                  }
                `}
              >
                <div>
                  {/* Category & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded-md">
                      {lesson.category}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Level Passed</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full animate-pulse">
                        <span>Current</span>
                      </span>
                    ) : !isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    ) : null}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    {lesson.title}
                  </h3>
                  {showUrdu && (
                    <div className="font-['Noto_Nastaliq_Urdu'] text-xs text-indigo-600 dark:text-indigo-300 font-bold mb-1">
                      {lesson.urduTitle}
                    </div>
                  )}

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {lesson.subtitle}
                  </p>

                  {/* Target keys tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {lesson.targetKeys.slice(0, 7).map((key, kIdx) => (
                      <span
                        key={kIdx}
                        className="px-1.5 py-0.5 font-mono text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700"
                      >
                        {key === ' ' ? 'SPACE' : key.toUpperCase()}
                      </span>
                    ))}
                    {lesson.targetKeys.length > 7 && (
                      <span className="px-1 py-0.5 text-[10px] text-slate-400">
                        +{lesson.targetKeys.length - 7} more
                      </span>
                    )}
                  </div>

                  {/* Sub-Lessons List for this Level (Requirement 1 & 2) */}
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>Short Lessons & End Test:</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-mono">
                        {subList.filter((s) => stats.completedSubLessons[s.id]?.passed).length}/{subList.length}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {subList.map((sub) => {
                        const subResult = stats.completedSubLessons[sub.id];
                        const isSubPassed = subResult?.passed;

                        return (
                          <div
                            key={sub.id}
                            onClick={() => onStartLesson(lesson.id, sub.id)}
                            className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs cursor-pointer transition-colors group"
                          >
                            <div className="flex items-center gap-1.5 min-w-0 pr-2">
                              {isSubPassed ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
                              )}
                              <span className="font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                {sub.title}
                              </span>
                            </div>
                            {subResult ? (
                              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                                {subResult.wpm} WPM
                              </span>
                            ) : (
                              <span className="text-[10px] text-slate-400 group-hover:text-indigo-500 font-bold shrink-0">
                                Start →
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer with Performance or Action Button */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  {isCompleted ? (
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {result.wpm} WPM
                      </span>
                      <span>·</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {result.accuracy}%
                      </span>
                      <span>·</span>
                      <span className="text-amber-500">
                        {'★'.repeat(result.stars)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-400">
                      {subList.length} Lessons + Tests
                    </div>
                  )}

                  <button
                    onClick={() => onStartLesson(lesson.id)}
                    type="button"
                    className={`
                      px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer
                      ${
                        isCurrent
                          ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                          : isCompleted
                          ? 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                          : 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100'
                      }
                    `}
                  >
                    <span>{isCompleted ? 'Repeat Lesson' : isCurrent ? 'Continue' : 'Start'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Speed Test & Certificate Promotion Card */}
      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-violet-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            <span>SMBT Typing Speed Certification</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to test your real typing speed?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl">
            Take an official 1, 2, 3, 5, or 10-minute timed typing test with live accuracy tracking, net words per minute calculation, and a student certificate.
          </p>
        </div>

        <button
          onClick={onOpenSpeedTest}
          className="px-6 py-3.5 bg-white text-indigo-950 hover:bg-slate-100 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-transform hover:scale-102 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span>Launch Speed Test</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
