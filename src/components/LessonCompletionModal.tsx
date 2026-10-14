import React from 'react';
import {
  Star,
  Trophy,
  ArrowRight,
  RotateCcw,
  Home,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { SubLessonResult } from '../types';

interface LessonCompletionModalProps {
  isOpen: boolean;
  lessonTitle: string;
  urduTitle: string;
  result: SubLessonResult;
  minWpm?: number;
  minAccuracy?: number;
  onNextLesson: () => void;
  onRetry: () => void;
  onGoHome: () => void;
  hasNextLesson: boolean;
  showUrdu: boolean;
}

export const LessonCompletionModal: React.FC<LessonCompletionModalProps> = ({
  isOpen,
  lessonTitle,
  urduTitle,
  result,
  minWpm = 15,
  minAccuracy = 90,
  onNextLesson,
  onRetry,
  onGoHome,
  hasNextLesson,
  showUrdu,
}) => {
  if (!isOpen) return null;

  const isPassed = result.passed;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-slate-200 dark:border-slate-800 text-center">
        
        {/* Glow */}
        <div
          className={`absolute -top-12 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full blur-2xl pointer-events-none ${
            isPassed ? 'bg-emerald-400/20' : 'bg-rose-500/20'
          }`}
        />

        {/* Big Pass / Fail Badge */}
        <div className="mb-4">
          {isPassed ? (
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>
          ) : (
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-9 h-9" />
            </div>
          )}
        </div>

        {/* Stars (if passed) */}
        {isPassed && (
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-7 h-7 ${
                  starIdx <= result.stars
                    ? 'fill-amber-400 text-amber-400 animate-bounce'
                    : 'text-slate-300 dark:text-slate-700'
                }`}
                style={{ animationDelay: `${starIdx * 120}ms` }}
              />
            ))}
          </div>
        )}

        {/* Result Header */}
        <div className="space-y-1">
          <div
            className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              isPassed
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30'
                : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-400/30'
            }`}
          >
            {isPassed ? '✓ PASSED / کامیاب' : '✗ NOT PASSED / دوبارہ کوشش کریں'}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
            {isPassed ? 'Lesson Test Passed!' : 'Need More Practice'}
          </h2>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lessonTitle}
          </p>

          {showUrdu && (
            <p className="font-['Noto_Nastaliq_Urdu'] text-xs text-indigo-600 dark:text-indigo-400 font-bold">
              {urduTitle}
            </p>
          )}
        </div>

        {/* Requirement Checklist */}
        <div className="my-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 mb-1">
            <span>Accuracy Required: ≥ {minAccuracy}%</span>
            <span className={`font-bold font-mono ${result.accuracy >= minAccuracy ? 'text-emerald-500' : 'text-rose-500'}`}>
              {result.accuracy}% {result.accuracy >= minAccuracy ? '✓' : '✗'}
            </span>
          </div>

          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span>Minimum Speed: ≥ {minWpm} WPM</span>
            <span className={`font-bold font-mono ${result.wpm >= minWpm ? 'text-emerald-500' : 'text-rose-500'}`}>
              {result.wpm} WPM {result.wpm >= minWpm ? '✓' : '✗'}
            </span>
          </div>
        </div>

        {/* 4 Score Metrics: WPM, CPM, Accuracy, Mistakes */}
        <div className="grid grid-cols-4 gap-2 my-4 text-center">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
              {result.wpm}
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase">WPM</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-amber-500 font-mono">
              {result.cpm}
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase">CPM</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {result.accuracy}%
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase">Accuracy</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
            <div className="text-xl sm:text-2xl font-black text-rose-500 font-mono">
              {result.mistakes}
            </div>
            <div className="text-[9px] font-bold text-slate-400 uppercase">Mistakes</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          {isPassed && hasNextLesson ? (
            <button
              onClick={onNextLesson}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : isPassed ? (
            <button
              onClick={onGoHome}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Level Complete! View Dashboard</span>
            </button>
          ) : (
            <button
              onClick={onRetry}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repeat Lesson & Test</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onRetry}
              className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isPassed ? 'Repeat to Improve' : 'Retry'}</span>
            </button>

            <button
              onClick={onGoHome}
              className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
