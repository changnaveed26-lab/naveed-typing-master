import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Timer,
  RotateCcw,
  Play,
  Award,
  Sparkles,
  ArrowRight,
  Printer,
  Share2,
  CheckCircle,
  AlertCircle,
  Building2,
} from 'lucide-react';
import { SPEED_TEST_PASSAGES, SpeedTestPassage } from '../data/speedTexts';
import { SpeedTestScore, StudentProfile } from '../types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandGuidance } from './HandGuidance';
import { getFingerForChar } from '../data/fingerAssignments';
import { sounds } from '../utils/soundEffects';
import { fireConfetti } from '../utils/confetti';

interface SpeedTestProps {
  profile: StudentProfile;
  onRecordScore: (score: SpeedTestScore) => void;
  onGoHome: () => void;
  showUrdu: boolean;
}

export const SpeedTest: React.FC<SpeedTestProps> = ({
  profile,
  onRecordScore,
  onGoHome,
  showUrdu,
}) => {
  const [selectedPassage, setSelectedPassage] = useState<SpeedTestPassage>(SPEED_TEST_PASSAGES[0]);
  const [duration, setDuration] = useState<number>(60); // 60, 120, 180 seconds

  // Test status
  const [status, setStatus] = useState<'idle' | 'running' | 'finished'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [inputVal, setInputVal] = useState<string>('');
  const [errorCount, setErrorCount] = useState<number>(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [finalScore, setFinalScore] = useState<SpeedTestScore | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Character mapping
  const targetText = selectedPassage.text;
  const currentChar = inputVal.length < targetText.length ? targetText[inputVal.length] : '';
  const currentFinger = getFingerForChar(currentChar);

  // Set passage and sync duration
  const handleSelectPassage = (passage: SpeedTestPassage) => {
    setSelectedPassage(passage);
    setDuration(passage.durationSeconds);
    setTimeLeft(passage.durationSeconds);
    handleReset();
  };

  const handleReset = useCallback(() => {
    setStatus('idle');
    setTimeLeft(duration);
    setInputVal('');
    setErrorCount(0);
    setTotalKeystrokes(0);
    setStartTime(null);
    setFinalScore(null);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }, [duration]);

  // Countdown timer
  useEffect(() => {
    if (status !== 'running') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // Finish test and calculate official score
  const finishTest = useCallback(() => {
    setStatus('finished');
    sounds.playVictory();
    fireConfetti();

    const timeSpentSeconds = duration - timeLeft;
    const testMinutes = Math.max(timeSpentSeconds / 60, 0.08);
    const wordsTyped = inputVal.length / 5;
    const grossWpm = Math.round(wordsTyped / testMinutes);
    const grossCpm = Math.round(inputVal.length / testMinutes);
    const uncorrectedErrors = errorCount;
    const netWpm = Math.max(0, Math.round((inputVal.length / 5 - uncorrectedErrors) / testMinutes));
    const accuracy = totalKeystrokes > 0
      ? Math.max(0, Math.round(((totalKeystrokes - errorCount) / totalKeystrokes) * 100))
      : 100;

    const score: SpeedTestScore = {
      id: `score-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      durationMinutes: Math.round(duration / 60),
      wpm: grossWpm,
      cpm: grossCpm,
      netWpm: netWpm || grossWpm,
      accuracy,
      totalKeystrokes,
      errorCount,
      textTitle: selectedPassage.title,
    };

    setFinalScore(score);
    onRecordScore(score);
  }, [duration, timeLeft, inputVal.length, errorCount, totalKeystrokes, selectedPassage.title, onRecordScore]);

  // Handle typing input
  const handleKeyInput = (char: string) => {
    if (status === 'finished') return;

    if (status === 'idle') {
      setStatus('running');
      setStartTime(Date.now());
    }

    setTotalKeystrokes((prev) => prev + 1);

    const targetChar = targetText[inputVal.length];

    if (char === targetChar) {
      sounds.playKeyClick(char === ' ');
      const nextInput = inputVal + char;
      setInputVal(nextInput);

      // Finished entire text early
      if (nextInput.length >= targetText.length) {
        finishTest();
      }
    } else {
      sounds.playError();
      setErrorCount((prev) => prev + 1);
    }
  };

  // Keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      if (status === 'finished') return;

      if (e.key.length === 1) {
        e.preventDefault();
        handleKeyInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Calculate live wpm and cpm
  const elapsed = duration - timeLeft;
  const elapsedMins = Math.max(elapsed / 60, 0.016);
  const liveWpm = elapsed > 0 ? Math.round((inputVal.length / 5) / elapsedMins) : 0;
  const liveCpm = elapsed > 0 ? Math.round(inputVal.length / elapsedMins) : 0;
  const liveAccuracy = totalKeystrokes > 0
    ? Math.max(0, Math.round(((totalKeystrokes - errorCount) / totalKeystrokes) * 100))
    : 100;

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Test Config & Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Timer className="w-4 h-4" />
            <span>Official Typing Speed Test</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Speed, CPM & Accuracy Assessment
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            SMBT SKILL COMPUTER CENTER GOLARCHI Student Certification Program
          </p>
        </div>

        {/* Duration Selectors: 1, 2, 3, 5, 10 Minutes */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
            Timer:
          </span>
          {[
            { label: '1 Min', secs: 60 },
            { label: '2 Min', secs: 120 },
            { label: '3 Min', secs: 180 },
            { label: '5 Min', secs: 300 },
            { label: '10 Min', secs: 600 },
          ].map((item) => (
            <button
              key={item.secs}
              onClick={() => {
                setDuration(item.secs);
                setTimeLeft(item.secs);
                handleReset();
              }}
              disabled={status === 'running'}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                duration === item.secs
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Passage Selector Cards */}
      {status === 'idle' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SPEED_TEST_PASSAGES.map((passage) => (
            <button
              key={passage.id}
              onClick={() => handleSelectPassage(passage)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                selectedPassage.id === passage.id
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-bold uppercase text-slate-400 mb-1">
                <span>{passage.difficulty}</span>
                <span>{passage.durationSeconds / 60}m</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                {passage.title}
              </div>
              {showUrdu && passage.urduTitle && (
                <div className="font-['Noto_Nastaliq_Urdu'] text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {passage.urduTitle}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main Test Screen (Active or Idle) */}
      {status !== 'finished' ? (
        <div className="space-y-6">
          {/* Live Monitor Bar (4 Metrics: Time, WPM, CPM, Accuracy) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {timeLeft}s
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Time Left
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {liveWpm}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Gross WPM
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">
                {liveCpm}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                CPM Speed
              </div>
            </div>

            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                {liveAccuracy}%
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                Accuracy ({errorCount} err)
              </div>
            </div>
          </div>

          {/* Typing Area */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="relative bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900 shadow-md cursor-text"
          >
            <input
              ref={inputRef}
              type="text"
              className="opacity-0 absolute top-0 left-0 w-1 h-1 pointer-events-none"
              autoFocus
            />

            {status === 'idle' && (
              <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 rounded-lg text-xs font-semibold border border-amber-200 dark:border-amber-800/80">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Timer starts automatically when you type the first letter!</span>
              </div>
            )}

            <div className="font-mono text-lg sm:text-xl leading-relaxed tracking-wide select-none text-slate-700 dark:text-slate-300">
              {targetText.split('').map((char, index) => {
                const isTyped = index < inputVal.length;
                const isCurrent = index === inputVal.length;
                const isCorrect = isTyped && inputVal[index] === char;

                let charClass = 'text-slate-400 dark:text-slate-500';

                if (isTyped) {
                  charClass = isCorrect
                    ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'text-white bg-rose-500 rounded px-0.5 font-bold';
                } else if (isCurrent) {
                  charClass =
                    'text-indigo-600 dark:text-indigo-300 font-black bg-indigo-100 dark:bg-indigo-950/80 px-1 rounded ring-2 ring-indigo-400 animate-pulse';
                }

                return (
                  <span key={index} className={`inline-block transition-colors ${charClass}`}>
                    {char === ' ' ? '␣' : char}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Virtual Keyboard */}
          <VirtualKeyboard
            activeChar={currentChar}
            onKeyClick={(key) => handleKeyInput(key)}
            showFingerColors={true}
          />

          <div className="flex justify-between items-center">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Test</span>
            </button>

            <button
              onClick={onGoHome}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-all cursor-pointer"
            >
              Cancel / Back to Home
            </button>
          </div>
        </div>
      ) : (
        /* TEST FINISHED: OFFICIAL CERTIFICATE OF COMPLETION */
        <div className="space-y-6 animate-fade-in">
          {/* Certificate Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 p-6 sm:p-10 rounded-3xl border-4 border-amber-300 dark:border-amber-600 shadow-2xl text-center">
            
            {/* Top Seal */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Award className="w-9 h-9 sm:w-11 sm:h-11" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                OFFICIAL SPEED TEST PERFORMANCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                SMBT SKILL COMPUTER CENTER GOLARCHI
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Naveed Typing Master Touch-Typing Evaluation
              </p>
            </div>

            <div className="my-6 py-4 border-y border-amber-200 dark:border-slate-800 max-w-lg mx-auto">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                This certifies that student
              </p>
              <div className="text-2xl sm:text-3xl font-serif font-black text-indigo-950 dark:text-amber-300 tracking-wide">
                {profile.name}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                has successfully completed the {duration / 60}-minute official typing test.
              </p>
            </div>

            {/* Score Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 max-w-3xl mx-auto my-6 text-center">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
                  {finalScore?.netWpm}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Net WPM
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-amber-500 font-mono">
                  {finalScore?.cpm}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  CPM Speed
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {finalScore?.accuracy}%
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Accuracy
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-200 font-mono">
                  {finalScore?.totalKeystrokes}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Keystrokes
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400 font-mono">
                  {finalScore?.errorCount}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                  Mistakes
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="flex items-center justify-between max-w-md mx-auto pt-4 text-xs border-t border-slate-200 dark:border-slate-800 text-slate-500">
              <div>
                <div className="font-script text-base text-slate-800 dark:text-slate-200 font-bold">
                  Naveed Chang
                </div>
                <div className="text-[10px]">Master Instructor, SMBT Golarchi</div>
              </div>

              <div>
                <div className="font-mono text-xs text-slate-700 dark:text-slate-300 font-bold">
                  {finalScore?.date}
                </div>
                <div className="text-[10px]">Date of Evaluation</div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Test</span>
            </button>

            <button
              onClick={onGoHome}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
