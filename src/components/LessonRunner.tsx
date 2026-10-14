import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Languages,
  CheckCircle,
  HelpCircle,
  Clock,
  Gauge,
  Target,
  Sparkles,
  BookOpen,
  Award,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { Lesson, SubLesson, SubLessonResult } from '../types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandGuidance } from './HandGuidance';
import { ColorLegend } from './ColorLegend';
import { getFingerForChar } from '../data/fingerAssignments';
import { sounds } from '../utils/soundEffects';
import { fireConfetti } from '../utils/confetti';
import { LessonCompletionModal } from './LessonCompletionModal';

interface LessonRunnerProps {
  lesson: Lesson;
  onCompleteSubLesson: (result: SubLessonResult) => void;
  onNextLesson: () => void;
  onPrevLesson?: () => void;
  onGoBack: () => void;
  hasNextLesson: boolean;
  hasPrevLesson: boolean;
  showUrdu: boolean;
  onToggleUrdu: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  initialSubLessonId?: string;
  completedSubLessons?: Record<string, SubLessonResult>;
}

export const LessonRunner: React.FC<LessonRunnerProps> = ({
  lesson,
  onCompleteSubLesson,
  onNextLesson,
  onPrevLesson,
  onGoBack,
  hasNextLesson,
  hasPrevLesson,
  showUrdu,
  onToggleUrdu,
  soundEnabled,
  onToggleSound,
  initialSubLessonId,
  completedSubLessons = {},
}) => {
  // Available sub-lessons in this level
  const subLessons = lesson.subLessons && lesson.subLessons.length > 0
    ? lesson.subLessons
    : [
        {
          id: `${lesson.id}.1`,
          title: lesson.title,
          urduTitle: lesson.urduTitle,
          description: lesson.description,
          urduDescription: lesson.urduDescription,
          focusKeys: lesson.targetKeys,
          instructions: lesson.instructions,
          urduInstructions: lesson.urduInstructions,
          practiceExercises: lesson.exercises,
          test: {
            id: `${lesson.id}.1-test`,
            prompt: 'End-of-Lesson Proficiency Test',
            urduPrompt: 'سبق کا اختتامی ٹیسٹ',
            text: lesson.exercises[lesson.exercises.length - 1]?.text || 'asdf jkl;',
            minWpm: 15,
            minAccuracy: 90,
          },
        },
      ];

  // Active sub-lesson index
  const [subLessonIndex, setSubLessonIndex] = useState<number>(() => {
    if (initialSubLessonId) {
      const foundIdx = subLessons.findIndex((s) => s.id === initialSubLessonId);
      if (foundIdx !== -1) return foundIdx;
    }
    return 0;
  });

  const currentSubLesson: SubLesson = subLessons[subLessonIndex] || subLessons[0];

  // Phases within a sub-lesson:
  // 'practice' (cycles through practiceExercises 0..N-1) -> 'test' (the end-of-lesson test)
  const [phase, setPhase] = useState<'practice' | 'test'>('practice');
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);

  // Active target text
  const targetText =
    phase === 'practice'
      ? currentSubLesson.practiceExercises[exerciseIndex]?.text || currentSubLesson.practiceExercises[0]?.text || ''
      : currentSubLesson.test.text;

  // Typing state
  const [inputVal, setInputVal] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [pressedKeyCodes, setPressedKeyCodes] = useState<Set<string>>(new Set());
  const [lastTypedStatus, setLastTypedStatus] = useState<'correct' | 'incorrect' | null>(null);

  // Completion modal state
  const [modalResult, setModalResult] = useState<SubLessonResult | null>(null);

  const typingInputRef = useRef<HTMLInputElement>(null);

  // Next char to type
  const currentChar = inputVal.length < targetText.length ? targetText[inputVal.length] : '';
  const currentFinger = getFingerForChar(currentChar);

  // Total exercises including test
  const totalSteps = currentSubLesson.practiceExercises.length + 1; // + 1 for test
  const currentStepNum = phase === 'practice' ? exerciseIndex + 1 : totalSteps;
  const lessonProgressPercent = Math.round((currentStepNum / totalSteps) * 100);

  // Reset when sub-lesson or exercise changes
  const resetTypingState = useCallback(() => {
    setInputVal('');
    setStartTime(null);
    setElapsedSeconds(0);
    setErrorCount(0);
    setTotalKeystrokes(0);
    setLastTypedStatus(null);
    setIsPaused(false);
    setTimeout(() => {
      typingInputRef.current?.focus();
    }, 50);
  }, []);

  useEffect(() => {
    resetTypingState();
  }, [subLessonIndex, phase, exerciseIndex, resetTypingState]);

  // Timer loop
  useEffect(() => {
    if (!startTime || isPaused || inputVal.length >= targetText.length) return;

    const interval = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isPaused, inputVal.length, targetText.length]);

  // Live Metrics Calculation
  const minutes = Math.max(elapsedSeconds / 60, 0.016);
  const wordsTyped = inputVal.length / 5;
  const liveWpm = startTime ? Math.round(wordsTyped / minutes) : 0;
  const liveCpm = startTime ? Math.round(inputVal.length / minutes) : 0;
  const liveAccuracy =
    totalKeystrokes > 0
      ? Math.max(0, Math.round(((totalKeystrokes - errorCount) / totalKeystrokes) * 100))
      : 100;

  // Handle keystroke input
  const handleCharInput = useCallback(
    (char: string) => {
      if (isPaused) return;

      if (!startTime) {
        setStartTime(Date.now());
      }

      setTotalKeystrokes((prev) => prev + 1);

      const targetChar = targetText[inputVal.length];

      if (char === targetChar) {
        sounds.playKeyClick(char === ' ');
        setLastTypedStatus('correct');
        setTimeout(() => setLastTypedStatus(null), 120);

        const nextInput = inputVal + char;
        setInputVal(nextInput);

        // Check step completion
        if (nextInput.length === targetText.length) {
          sounds.playVictory();

          if (phase === 'practice') {
            if (exerciseIndex + 1 < currentSubLesson.practiceExercises.length) {
              // Next practice drill
              setTimeout(() => {
                setExerciseIndex((prev) => prev + 1);
              }, 300);
            } else {
              // Practice completed! Advance to the End-of-Lesson Test
              setTimeout(() => {
                setPhase('test');
                resetTypingState();
              }, 400);
            }
          } else {
            // TEST COMPLETED! Evaluate Pass / Fail
            fireConfetti();
            const finalMinutes = Math.max(elapsedSeconds / 60, 0.02);
            const finalWpm = Math.max(5, Math.round(targetText.length / 5 / finalMinutes));
            const finalCpm = Math.round(targetText.length / finalMinutes);
            const finalAcc =
              totalKeystrokes > 0
                ? Math.max(50, Math.round(((totalKeystrokes + 1 - errorCount) / (totalKeystrokes + 1)) * 100))
                : 100;

            const isPass =
              finalAcc >= currentSubLesson.test.minAccuracy && finalWpm >= currentSubLesson.test.minWpm;
            const stars = isPass ? (finalAcc >= 95 ? 3 : finalAcc >= 90 ? 2 : 1) : 0;

            const res: SubLessonResult = {
              subLessonId: currentSubLesson.id,
              levelId: lesson.id,
              passed: isPass,
              wpm: finalWpm,
              cpm: finalCpm,
              accuracy: finalAcc,
              mistakes: errorCount,
              timeSpentSeconds: elapsedSeconds,
              stars,
              completedAt: new Date().toISOString(),
            };

            onCompleteSubLesson(res);
            setModalResult(res);
          }
        }
      } else {
        // Wrong key
        sounds.playError();
        setLastTypedStatus('incorrect');
        setTimeout(() => setLastTypedStatus(null), 250);
        setErrorCount((prev) => prev + 1);
      }
    },
    [
      isPaused,
      startTime,
      targetText,
      inputVal,
      phase,
      exerciseIndex,
      currentSubLesson,
      lesson.id,
      elapsedSeconds,
      totalKeystrokes,
      errorCount,
      onCompleteSubLesson,
      resetTypingState,
    ]
  );

  // Global key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      setPressedKeyCodes((prev) => new Set(prev).add(e.code));

      if (e.key === 'Backspace') {
        e.preventDefault();
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();
        handleCharInput(e.key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeyCodes((prev) => {
        const next = new Set(prev);
        next.delete(e.code);
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleCharInput]);

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onGoBack}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Level {lesson.id} of 12
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {currentSubLesson.id}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {currentSubLesson.title}
            </h1>
            {showUrdu && (
              <p className="font-['Noto_Nastaliq_Urdu'] text-xs text-indigo-600 dark:text-indigo-300 font-bold">
                {currentSubLesson.urduTitle}
              </p>
            )}
          </div>
        </div>

        {/* Live Metrics Counters: WPM, CPM, ACC, Time */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 self-end sm:self-auto">
          {/* WPM */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Gauge className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
              {liveWpm}
            </span>
            <span className="text-[10px] text-slate-400 font-bold">WPM</span>
          </div>

          {/* CPM */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
              {liveCpm}
            </span>
            <span className="text-[10px] text-slate-400 font-bold">CPM</span>
          </div>

          {/* Accuracy */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Target className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
              {liveAccuracy}%
            </span>
            <span className="text-[10px] text-slate-400 font-bold">ACC</span>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">
              {elapsedSeconds}s
            </span>
          </div>

          {/* Pause */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
            title={isPaused ? 'Resume' : 'Pause'}
          >
            {isPaused ? <Play className="w-4 h-4 text-emerald-500" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Sub-Lesson Selector Tabs (Multiple short lessons per level) */}
      <div className="bg-white dark:bg-slate-900 p-2 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto shadow-xs">
        <span className="text-xs font-bold text-slate-400 px-2 shrink-0">Short Lessons:</span>
        {subLessons.map((sub, idx) => {
          const isSelected = idx === subLessonIndex;
          const subResult = completedSubLessons[sub.id];
          const isPassed = subResult?.passed;

          return (
            <button
              key={sub.id}
              onClick={() => {
                setSubLessonIndex(idx);
                setPhase('practice');
                setExerciseIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 border ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : isPassed
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {isPassed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : null}
              <span>{sub.title.split(':')[0]}</span>
              {subResult ? (
                <span className="text-[10px] opacity-80 font-mono">({subResult.wpm}W)</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Sub-Lesson Phase Progress Ribbon (Instructions -> Practice -> End Test) */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
              phase === 'practice'
                ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              Phase 1: Practice Exercises ({exerciseIndex + 1}/{currentSubLesson.practiceExercises.length})
            </span>

            <span className="text-slate-300">→</span>

            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
              phase === 'test'
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 ring-2 ring-amber-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              Phase 2: End-of-Lesson Test (Pass/Fail)
            </span>
          </div>
        </div>

        {/* Lesson Progress Percentage */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-400">Lesson Completion:</span>
          <div className="flex-1 sm:w-32 bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${lessonProgressPercent}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
            {lessonProgressPercent}%
          </span>
        </div>
      </div>

      {/* Instructions Card (English + Urdu) */}
      <div className="bg-indigo-50/70 dark:bg-slate-900/90 rounded-2xl border border-indigo-100 dark:border-slate-800 p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">
              {phase === 'practice'
                ? `Lesson Instructions: ${currentSubLesson.practiceExercises[exerciseIndex]?.prompt || ''}`
                : `End-of-Lesson Test: Passing requires ≥ ${currentSubLesson.test.minAccuracy}% Accuracy & ≥ ${currentSubLesson.test.minWpm} WPM`}
            </h3>
          </div>
          {showUrdu && (
            <span className="font-['Noto_Nastaliq_Urdu'] text-xs font-bold text-indigo-700 dark:text-indigo-300">
              {phase === 'practice'
                ? currentSubLesson.practiceExercises[exerciseIndex]?.urduPrompt
                : currentSubLesson.test.urduPrompt}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
          {currentSubLesson.description}
        </p>

        {showUrdu && (
          <p className="font-['Noto_Nastaliq_Urdu'] text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-loose mb-3">
            {currentSubLesson.urduDescription}
          </p>
        )}

        {/* Bullet guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-indigo-100 dark:border-slate-800">
          <div>
            <span className="font-bold text-slate-700 dark:text-slate-300">Touch Typing Rules:</span>
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              {currentSubLesson.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ul>
          </div>
          {showUrdu && (
            <div>
              <span className="font-bold text-slate-700 dark:text-slate-300 font-['Noto_Nastaliq_Urdu']">
                رہنمائی:
              </span>
              <ul className="list-disc list-inside mt-1 space-y-0.5 font-['Noto_Nastaliq_Urdu']">
                {currentSubLesson.urduInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* TYPING PRACTICE DISPLAY AREA */}
      <div
        onClick={() => typingInputRef.current?.focus()}
        className={`relative rounded-3xl border-2 shadow-lg p-6 sm:p-8 cursor-text transition-all ${
          phase === 'test'
            ? 'bg-white dark:bg-slate-900 border-amber-300 dark:border-amber-700/80'
            : 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60'
        }`}
      >
        <input
          ref={typingInputRef}
          type="text"
          className="opacity-0 absolute top-0 left-0 w-1 h-1 pointer-events-none"
          autoFocus
        />

        {/* Text Display with Green/Red Feedback */}
        <div className="font-mono text-xl sm:text-2xl md:text-3xl leading-relaxed sm:leading-loose tracking-wider select-none text-slate-700 dark:text-slate-300 break-words">
          {targetText.split('').map((char, index) => {
            const isTyped = index < inputVal.length;
            const isCurrent = index === inputVal.length;
            const isCorrect = isTyped && inputVal[index] === char;

            let charClass = 'text-slate-400 dark:text-slate-500';

            if (isTyped) {
              charClass = isCorrect
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-white bg-rose-500 rounded px-0.5 font-bold animate-shake';
            } else if (isCurrent) {
              charClass =
                'text-indigo-600 dark:text-indigo-300 font-black bg-indigo-100 dark:bg-indigo-950/80 px-1 rounded ring-2 ring-indigo-400 animate-pulse';
            }

            return (
              <span key={index} className={`relative inline-block transition-colors ${charClass}`}>
                {char === ' ' ? '␣' : char}
                {isCurrent && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-ping" />
                )}
              </span>
            );
          })}
        </div>

        {/* Next Required Key Hint */}
        {currentChar && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Next Required Key:</span>
              <span className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-mono font-bold text-sm shadow-xs">
                {currentChar === ' ' ? 'SPACEBAR' : currentChar}
              </span>
              <span className="text-slate-400">→</span>
              <span
                className="font-bold px-2 py-1 rounded-lg"
                style={{
                  backgroundColor: `${currentFinger.color}20`,
                  color: currentFinger.color,
                }}
              >
                Use {currentFinger.name}
              </span>
            </div>

            {showUrdu && (
              <div className="font-['Noto_Nastaliq_Urdu'] text-xs font-semibold text-slate-600 dark:text-slate-300">
                {currentFinger.urduName} سے دبائیں
              </div>
            )}
          </div>
        )}
      </div>

      {/* TWO HANDS 10-FINGER GUIDANCE VISUALIZATION */}
      <HandGuidance
        activeFingerId={currentFinger.id}
        targetChar={currentChar}
        showUrdu={showUrdu}
      />

      {/* VIRTUAL KEYBOARD WITH ACTIVE HIGHLIGHT & FEEDBACK */}
      <VirtualKeyboard
        activeChar={currentChar}
        pressedKeys={pressedKeyCodes}
        lastTypedStatus={lastTypedStatus}
        onKeyClick={(key) => handleCharInput(key)}
        showFingerColors={true}
        highlightHomeRow={true}
      />

      {/* COLOR LEGEND: GUARANTEED CONSISTENT COLORS */}
      <ColorLegend
        activeFingerId={currentFinger.id}
        showUrdu={showUrdu}
      />

      {/* Action Controls Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          {hasPrevLesson && (
            <button
              onClick={onPrevLesson}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Level</span>
            </button>
          )}

          <button
            onClick={resetTypingState}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repeat Step</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {hasNextLesson && (
            <button
              onClick={onNextLesson}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Next Level</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Lesson Test Completion Modal (Pass / Fail & Repeat) */}
      {modalResult && (
        <LessonCompletionModal
          isOpen={true}
          lessonTitle={currentSubLesson.title}
          urduTitle={currentSubLesson.urduTitle}
          result={modalResult}
          minWpm={currentSubLesson.test.minWpm}
          minAccuracy={currentSubLesson.test.minAccuracy}
          onNextLesson={() => {
            setModalResult(null);
            if (subLessonIndex + 1 < subLessons.length) {
              setSubLessonIndex((prev) => prev + 1);
              setPhase('practice');
              setExerciseIndex(0);
            } else if (hasNextLesson) {
              onNextLesson();
            } else {
              onGoBack();
            }
          }}
          onRetry={() => {
            setModalResult(null);
            setPhase('practice');
            setExerciseIndex(0);
            resetTypingState();
          }}
          onGoHome={() => {
            setModalResult(null);
            onGoBack();
          }}
          hasNextLesson={subLessonIndex + 1 < subLessons.length || hasNextLesson}
          showUrdu={showUrdu}
        />
      )}
    </div>
  );
};
