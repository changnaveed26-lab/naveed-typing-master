import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Play,
  Volume2,
  VolumeX,
  Languages,
  Layers,
  ArrowRight,
  Flame,
  Target,
} from 'lucide-react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandGuidance } from './HandGuidance';
import { ColorLegend } from './ColorLegend';
import { getFingerForChar, getFingerColor } from '../data/fingerAssignments';
import { getFingerMovement } from '../data/fingerMovements';
import { sounds } from '../utils/soundEffects';
import { FingerId } from '../types';

export type PracticeMode =
  | 'left-hand'
  | 'right-hand'
  | 'both-hands'
  | 'home-row'
  | 'all-keys';

interface PracticePreset {
  id: PracticeMode;
  label: string;
  urduLabel: string;
  description: string;
  urduDescription: string;
  characters: string[];
}

const PRACTICE_PRESETS: Record<PracticeMode, PracticePreset> = {
  'left-hand': {
    id: 'left-hand',
    label: 'Practice Left Hand',
    urduLabel: 'بائیں ہاتھ کی پریکٹس',
    description: 'Drills for Q, W, E, R, T, A, S, D, F, G, Z, X, C, V, B and digits 1-5.',
    urduDescription: 'بائیں ہاتھ کی تمام کیز (Q سے B اور ہندسے 1 تا 5) کی خصوصی مشق۔',
    characters: ['a', 's', 'd', 'f', 'g', 'q', 'w', 'e', 'r', 't', 'z', 'x', 'c', 'v', 'b', '1', '2', '3', '4', '5'],
  },
  'right-hand': {
    id: 'right-hand',
    label: 'Practice Right Hand',
    urduLabel: 'دائیں ہاتھ کی پریکٹس',
    description: 'Drills for Y, U, I, O, P, H, J, K, L, ;, N, M, comma, period, slash and digits 6-0.',
    urduDescription: 'دائیں ہاتھ کی تمام کیز (Y سے P، J، K، L، ;، N، M اور 6 تا 0) کی مشق۔',
    characters: ['j', 'k', 'l', ';', 'h', 'y', 'u', 'i', 'o', 'p', 'n', 'm', ',', '.', '/', '6', '7', '8', '9', '0'],
  },
  'both-hands': {
    id: 'both-hands',
    label: 'Practice Both Hands',
    urduLabel: 'دونوں ہاتھوں کا تال میل',
    description: 'Alternating left and right hand drills with Spacebar to master coordination.',
    urduDescription: 'بائیں اور دائیں ہاتھ کے درمیان روانی اور اسپیس بار کی متوازن مشق۔',
    characters: ['f', 'j', 'd', 'k', 's', 'l', 'a', ';', 'r', 'u', 'e', 'i', 'w', 'o', 'q', 'p', 'v', 'm', 'c', ',', 'x', '.', 'z', '/', ' '],
  },
  'home-row': {
    id: 'home-row',
    label: 'Practice Home Row',
    urduLabel: 'ہوم رو ماسٹری (A S D F — J K L ;)',
    description: 'Master the 8 core resting keys and tactile bumps on F & J.',
    urduDescription: 'بنیادی 8 ہوم کیز اور F و J کے ابھاروں کی روانی سے پریکٹس۔',
    characters: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', 'g', 'h', ' '],
  },
  'all-keys': {
    id: 'all-keys',
    label: 'Practice All Keys',
    urduLabel: 'تمام کیز کی مکمل مشق',
    description: 'Comprehensive full-keyboard challenge across all letters, digits, and punctuation.',
    urduDescription: 'پورے کی بورڈ پر مشتمل چیلنج: تمام حروف، ہندسے اور علامات۔',
    characters: [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', ',', '.', ';', ' ',
    ],
  },
};

interface InteractiveKeyboardTrainerProps {
  showUrdu: boolean;
  onOpenLessonCourse?: () => void;
}

export const InteractiveKeyboardTrainer: React.FC<InteractiveKeyboardTrainerProps> = ({
  showUrdu,
  onOpenLessonCourse,
}) => {
  const [mode, setMode] = useState<PracticeMode>('home-row');
  const [charSequence, setCharSequence] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [pressedKeyCodes, setPressedKeyCodes] = useState<Set<string>>(new Set());
  const [lastTypedStatus, setLastTypedStatus] = useState<'correct' | 'incorrect' | null>(null);

  // Performance metrics
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Generate randomized character drill stream
  const generateSequence = useCallback((selectedMode: PracticeMode) => {
    const pool = PRACTICE_PRESETS[selectedMode].characters;
    const newSeq: string[] = [];

    // Create 30 balanced characters
    for (let i = 0; i < 30; i++) {
      const char = pool[Math.floor(Math.random() * pool.length)];
      newSeq.push(char);
    }
    setCharSequence(newSeq);
    setCurrentIndex(0);
    setLastTypedStatus(null);
  }, []);

  // Initialize or change mode
  useEffect(() => {
    generateSequence(mode);
  }, [mode, generateSequence]);

  const currentChar = charSequence[currentIndex] || 'f';
  const currentFinger = getFingerForChar(currentChar);
  const movement = getFingerMovement(currentChar);

  // Process typed key
  const handleKeyStrike = useCallback(
    (keyChar: string) => {
      // Normalize comparison
      const target = currentChar;
      const isCorrect =
        keyChar.toLowerCase() === target.toLowerCase() ||
        (target === ' ' && (keyChar === ' ' || keyChar === 'Space'));

      setPressedKeyCodes((prev) => new Set(prev).add(keyChar));
      setTimeout(() => {
        setPressedKeyCodes((prev) => {
          const next = new Set(prev);
          next.delete(keyChar);
          return next;
        });
      }, 150);

      if (isCorrect) {
        sounds.playKeyClick(target === ' ');
        setLastTypedStatus('correct');
        setCorrectCount((prev) => prev + 1);
        setStreak((prev) => prev + 1);

        // Move to next key after a correct answer
        setTimeout(() => {
          setLastTypedStatus(null);
          if (currentIndex + 1 < charSequence.length) {
            setCurrentIndex((prev) => prev + 1);
          } else {
            // Sequence completed! Refresh
            sounds.playVictory();
            generateSequence(mode);
          }
        }, 120);
      } else {
        sounds.playError();
        setLastTypedStatus('incorrect');
        setMistakeCount((prev) => prev + 1);
        setStreak(0);
        setTimeout(() => setLastTypedStatus(null), 300);
      }
    },
    [currentChar, currentIndex, charSequence.length, generateSequence, mode]
  );

  // Physical keyboard listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === ' ' || e.key.length === 1) {
        e.preventDefault();
        handleKeyStrike(e.key);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKeyStrike]);

  const totalAttempts = correctCount + mistakeCount;
  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 100;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Interactive Mode Switcher Buttons */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                Interactive Practice Drills
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select a specialized finger training zone to build rapid muscle memory
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Flame className="w-4 h-4 text-amber-500" />
              <span className="font-mono font-black text-slate-900 dark:text-white">{streak}</span>
              <span className="text-[10px] text-slate-400">Streak</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <Target className="w-4 h-4 text-emerald-500" />
              <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">{accuracy}%</span>
              <span className="text-[10px] text-slate-400">Acc</span>
            </div>

            <button
              onClick={() => generateSequence(mode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
              title="Shuffle Drill"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The 5 Required Interactive Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {(Object.keys(PRACTICE_PRESETS) as PracticeMode[]).map((presetKey) => {
            const preset = PRACTICE_PRESETS[presetKey];
            const isActive = mode === presetKey;

            return (
              <button
                key={preset.id}
                onClick={() => setMode(preset.id)}
                type="button"
                className={`
                  p-3 rounded-xl sm:rounded-2xl text-left border-2 transition-all duration-200 cursor-pointer
                  flex flex-col justify-between
                  ${
                    isActive
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/30 scale-102 ring-2 ring-indigo-400/40'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }
                `}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-indigo-200' : 'text-slate-400'}`}>
                      Drill Mode
                    </span>
                    {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm leading-tight">
                    {preset.label}
                  </div>
                  {showUrdu && (
                    <div className={`font-['Noto_Nastaliq_Urdu'] text-[11px] mt-0.5 ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {preset.urduLabel}
                    </div>
                  )}
                </div>

                <div className={`text-[10px] mt-2 pt-1 border-t truncate ${isActive ? 'border-indigo-400/50 text-indigo-100' : 'border-slate-200 dark:border-slate-700 text-slate-400'}`}>
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Key Prompt Box (Highlight Next Key + Feedback) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/80 p-5 sm:p-6 shadow-md text-center">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Target Key Sequence:
            </span>
            <div className="text-xs text-slate-600 dark:text-slate-300">
              Type the glowing key with the correct finger. Press physically or click key below.
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Progress:</span>
            <span className="font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
              {currentIndex + 1} / {charSequence.length}
            </span>
          </div>
        </div>

        {/* Interactive Character Ribbon */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 py-2 overflow-x-auto max-w-full">
          {charSequence.slice(Math.max(0, currentIndex - 3), currentIndex + 7).map((ch, idx) => {
            const realIdx = Math.max(0, currentIndex - 3) + idx;
            const isCurrent = realIdx === currentIndex;
            const isPassed = realIdx < currentIndex;
            const finger = getFingerForChar(ch);

            let statusBorder = 'border-slate-200 dark:border-slate-700';
            let statusBg = 'bg-slate-100 dark:bg-slate-800 text-slate-500';

            if (isPassed) {
              statusBg = 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border-emerald-300 dark:border-emerald-800';
            } else if (isCurrent) {
              if (lastTypedStatus === 'correct') {
                statusBg = 'bg-emerald-500 text-white border-emerald-600 scale-110 shadow-lg';
              } else if (lastTypedStatus === 'incorrect') {
                statusBg = 'bg-rose-500 text-white border-rose-600 scale-110 shadow-lg animate-shake';
              } else {
                statusBg = 'text-white scale-115 shadow-xl shadow-indigo-500/30 animate-pulse';
                statusBorder = 'border-white';
              }
            }

            return (
              <div
                key={realIdx}
                style={{
                  backgroundColor: isCurrent && !lastTypedStatus ? finger.color : undefined,
                }}
                className={`
                  w-12 h-14 sm:w-16 sm:h-18 rounded-2xl flex flex-col items-center justify-center
                  border-2 font-mono transition-all duration-150 select-none shrink-0
                  ${statusBg}
                  ${statusBorder}
                `}
              >
                <span className="text-xl sm:text-2xl font-black uppercase">
                  {ch === ' ' ? '␣' : ch}
                </span>
                <span className="text-[9px] font-bold opacity-80 uppercase leading-none">
                  {ch === ' ' ? 'Space' : finger.name.split(' ')[1] || 'Finger'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live Feedback Banner */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Target Finger:</span>
            <span
              className="px-2.5 py-1 rounded-xl text-white font-bold"
              style={{ backgroundColor: currentFinger.color }}
            >
              {movement.hand} — {movement.fingerName}
            </span>
          </div>

          <div className="text-slate-600 dark:text-slate-300">
            {movement.action}
          </div>

          {showUrdu && (
            <div className="font-['Noto_Nastaliq_Urdu'] text-indigo-600 dark:text-indigo-400 font-bold">
              {movement.urduAction}
            </div>
          )}
        </div>
      </div>

      {/* TEN-FINGER VISUAL GUIDE: POSITIONED PROMINENTLY ABOVE KEYBOARD */}
      <HandGuidance
        activeFingerId={currentFinger.id}
        targetChar={currentChar}
        showUrdu={showUrdu}
      />

      {/* COLOR-CODED REALISTIC DESKTOP KEYBOARD */}
      <VirtualKeyboard
        activeChar={currentChar}
        pressedKeys={pressedKeyCodes}
        lastTypedStatus={lastTypedStatus}
        onKeyClick={handleKeyStrike}
        showFingerColors={true}
        highlightHomeRow={true}
      />

      {/* COLOR LEGEND: GUARANTEED CONSISTENT COLORS */}
      <ColorLegend
        activeFingerId={currentFinger.id}
        showUrdu={showUrdu}
      />
    </div>
  );
};
