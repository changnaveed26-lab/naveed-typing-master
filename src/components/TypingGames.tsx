import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  Sparkles,
  Flame,
  Target,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Award,
  ArrowRight,
  Shield,
  Heart,
} from 'lucide-react';
import { getFingerForChar } from '../data/fingerAssignments';
import { sounds } from '../utils/soundEffects';
import { fireConfetti } from '../utils/confetti';

export type GameType = 'falling-letters' | 'word-rush' | 'speed-blitz' | 'accuracy-pop';

interface TypingGamesProps {
  showUrdu: boolean;
  onRecordScore?: (gameId: string, score: number) => void;
  highScores?: Record<string, number>;
}

// Word bank for word games
const GAME_WORDS = [
  'naveed', 'skill', 'center', 'golarchi', 'touch', 'typing', 'speed', 'quick',
  'brown', 'fox', 'jump', 'lazy', 'dog', 'master', 'learn', 'focus', 'power',
  'hand', 'finger', 'keyboard', 'screen', 'sindh', 'pakistan', 'future', 'smart',
  'great', 'world', 'system', 'program', 'react', 'code', 'modern', 'digital',
];

export const TypingGames: React.FC<TypingGamesProps> = ({
  showUrdu,
  onRecordScore,
  highScores = {},
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('falling-letters');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);

  // Game 1: Falling Letters State
  const [fallingItems, setFallingItems] = useState<{ id: number; char: string; x: number; y: number }[]>([]);

  // Game 2: Word Rush State
  const [activeWords, setActiveWords] = useState<{ id: number; word: string; x: number; y: number }[]>([]);
  const [currentWordInput, setCurrentWordInput] = useState<string>('');

  // Game 3: Speed Blitz State
  const [blitzTimeLeft, setBlitzTimeLeft] = useState<number>(30);
  const [blitzCurrentWord, setBlitzCurrentWord] = useState<string>('typing');
  const [blitzWordsTyped, setBlitzWordsTyped] = useState<number>(0);

  // Game 4: Accuracy Pop State
  const [popTargetChar, setPopTargetChar] = useState<string>('f');
  const [popAccuracyHits, setPopAccuracyHits] = useState<number>(0);
  const [popTotalAttempts, setPopTotalAttempts] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset and Start Game
  const startGame = useCallback((gameType: GameType) => {
    setActiveGame(gameType);
    setScore(0);
    setStreak(0);
    setLives(3);
    setIsGameOver(false);
    setIsPlaying(true);

    if (gameType === 'falling-letters') {
      const keys = 'asdfjkl;qweruiopzxcvbnm';
      const initialItems = [
        { id: Date.now() + 1, char: keys[Math.floor(Math.random() * keys.length)], x: 20 + Math.random() * 60, y: 10 },
        { id: Date.now() + 2, char: keys[Math.floor(Math.random() * keys.length)], x: 20 + Math.random() * 60, y: -20 },
      ];
      setFallingItems(initialItems);
    } else if (gameType === 'word-rush') {
      setActiveWords([
        { id: Date.now() + 1, word: GAME_WORDS[Math.floor(Math.random() * GAME_WORDS.length)], x: 15 + Math.random() * 70, y: 10 },
      ]);
      setCurrentWordInput('');
    } else if (gameType === 'speed-blitz') {
      setBlitzTimeLeft(30);
      setBlitzWordsTyped(0);
      setBlitzCurrentWord(GAME_WORDS[Math.floor(Math.random() * GAME_WORDS.length)]);
    } else if (gameType === 'accuracy-pop') {
      const keys = 'asdfjkl;qweruiopzxcv';
      setPopTargetChar(keys[Math.floor(Math.random() * keys.length)]);
      setPopAccuracyHits(0);
      setPopTotalAttempts(0);
    }
  }, []);

  // End Game handler
  const endGame = useCallback(() => {
    setIsPlaying(false);
    setIsGameOver(true);
    sounds.playVictory();
    if (score > (highScores[activeGame] || 0)) {
      fireConfetti();
    }
    onRecordScore?.(activeGame, score);
  }, [activeGame, score, highScores, onRecordScore]);

  // Falling Letters Animation Loop
  useEffect(() => {
    if (!isPlaying || activeGame !== 'falling-letters') return;

    const interval = setInterval(() => {
      setFallingItems((prev) => {
        let hasHitBottom = false;
        const updated = prev.map((item) => {
          const newY = item.y + 1.6;
          if (newY >= 88) {
            hasHitBottom = true;
          }
          return { ...item, y: newY };
        });

        if (hasHitBottom) {
          sounds.playError();
          setLives((l) => {
            const nextL = l - 1;
            if (nextL <= 0) {
              endGame();
            }
            return Math.max(0, nextL);
          });
          return updated.filter((item) => item.y < 88);
        }

        // Spawn new item if fewer than 3
        if (updated.length < 3 && Math.random() > 0.6) {
          const keys = 'asdfjkl;qweruiopzxcvbnm';
          updated.push({
            id: Date.now() + Math.random(),
            char: keys[Math.floor(Math.random() * keys.length)],
            x: 15 + Math.random() * 70,
            y: 0,
          });
        }

        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, activeGame, endGame]);

  // Word Rush Animation Loop
  useEffect(() => {
    if (!isPlaying || activeGame !== 'word-rush') return;

    const interval = setInterval(() => {
      setActiveWords((prev) => {
        let hitBottom = false;
        const updated = prev.map((item) => {
          const newY = item.y + 0.8;
          if (newY >= 85) hitBottom = true;
          return { ...item, y: newY };
        });

        if (hitBottom) {
          sounds.playError();
          setLives((l) => {
            const nextL = l - 1;
            if (nextL <= 0) endGame();
            return Math.max(0, nextL);
          });
          return updated.filter((item) => item.y < 85);
        }

        if (updated.length < 2 && Math.random() > 0.7) {
          updated.push({
            id: Date.now() + Math.random(),
            word: GAME_WORDS[Math.floor(Math.random() * GAME_WORDS.length)],
            x: 10 + Math.random() * 75,
            y: 0,
          });
        }

        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, activeGame, endGame]);

  // Speed Blitz 30-sec Countdown
  useEffect(() => {
    if (!isPlaying || activeGame !== 'speed-blitz') return;

    const timer = setInterval(() => {
      setBlitzTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, activeGame, endGame]);

  // Keystroke Event Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || isGameOver) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const pressed = e.key.toLowerCase();

      // GAME 1: Falling Letters
      if (activeGame === 'falling-letters') {
        e.preventDefault();
        setFallingItems((prev) => {
          const matchIndex = prev.findIndex((item) => item.char.toLowerCase() === pressed);
          if (matchIndex !== -1) {
            sounds.playKeyClick();
            setScore((s) => s + 10);
            setStreak((st) => st + 1);
            return prev.filter((_, idx) => idx !== matchIndex);
          } else {
            sounds.playError();
            setStreak(0);
            return prev;
          }
        });
      }

      // GAME 2: Word Rush
      else if (activeGame === 'word-rush') {
        if (e.key === 'Backspace') {
          setCurrentWordInput((c) => c.slice(0, -1));
          return;
        }
        if (e.key.length === 1) {
          e.preventDefault();
          sounds.playKeyClick();
          const nextInput = currentWordInput + pressed;
          setCurrentWordInput(nextInput);

          // Check if matches any active word
          setActiveWords((prev) => {
            const matchIndex = prev.findIndex((w) => w.word.toLowerCase() === nextInput.toLowerCase());
            if (matchIndex !== -1) {
              sounds.playVictory();
              setScore((s) => s + nextInput.length * 10);
              setStreak((st) => st + 1);
              setCurrentWordInput('');
              return prev.filter((_, idx) => idx !== matchIndex);
            }
            return prev;
          });
        }
      }

      // GAME 3: Speed Blitz
      else if (activeGame === 'speed-blitz') {
        if (e.key === 'Backspace') {
          setCurrentWordInput((c) => c.slice(0, -1));
          return;
        }
        if (e.key.length === 1) {
          e.preventDefault();
          const target = blitzCurrentWord;
          const nextInput = currentWordInput + pressed;
          setCurrentWordInput(nextInput);

          if (target.startsWith(nextInput)) {
            sounds.playKeyClick();
            if (nextInput === target) {
              // Word completed!
              sounds.playVictory();
              setScore((s) => s + 25);
              setBlitzWordsTyped((w) => w + 1);
              setStreak((st) => st + 1);
              setCurrentWordInput('');
              setBlitzCurrentWord(GAME_WORDS[Math.floor(Math.random() * GAME_WORDS.length)]);
            }
          } else {
            sounds.playError();
            setStreak(0);
          }
        }
      }

      // GAME 4: Accuracy Pop
      else if (activeGame === 'accuracy-pop') {
        if (e.key.length === 1) {
          e.preventDefault();
          setPopTotalAttempts((a) => a + 1);

          if (pressed === popTargetChar.toLowerCase()) {
            sounds.playVictory();
            setScore((s) => s + 15);
            setStreak((st) => st + 1);
            setPopAccuracyHits((h) => h + 1);
            // Next random key
            const keys = 'asdfjkl;qweruiopzxcv';
            setPopTargetChar(keys[Math.floor(Math.random() * keys.length)]);
          } else {
            sounds.playError();
            setStreak(0);
            setLives((l) => {
              const nextL = l - 1;
              if (nextL <= 0) endGame();
              return Math.max(0, nextL);
            });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isGameOver, activeGame, currentWordInput, blitzCurrentWord, popTargetChar, endGame]);

  const popAccuracy = popTotalAttempts > 0 ? Math.round((popAccuracyHits / popTotalAttempts) * 100) : 100;

  return (
    <div ref={containerRef} className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>Interactive Touch-Typing Games</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Typing Arcades & Speed Challenges
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Learn letters, whole words, and laser accuracy through playful interactive drills
          </p>
        </div>

        {/* High Score Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/60 px-3.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
            <Trophy className="w-4 h-4 text-amber-500" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">High Score:</span>
              <div className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono leading-none">
                {highScores[activeGame] || 0} pts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            id: 'falling-letters' as GameType,
            title: 'Letter Reflex',
            urduTitle: 'حروف کی رفتار',
            desc: 'Catch falling keys before they touch down',
            icon: Zap,
            color: 'text-amber-500',
          },
          {
            id: 'word-rush' as GameType,
            title: 'Word Defense',
            urduTitle: 'الفاظ کا دفاع',
            desc: 'Type incoming words to blast them',
            icon: Shield,
            color: 'text-indigo-500',
          },
          {
            id: 'speed-blitz' as GameType,
            title: 'Speed Blitz',
            urduTitle: '30 سیکنڈ تیز رفتار',
            desc: '30-second rapid word frenzy sprint',
            icon: Flame,
            color: 'text-rose-500',
          },
          {
            id: 'accuracy-pop' as GameType,
            title: 'Accuracy Pop',
            urduTitle: 'درستگی کا امتحان',
            desc: '100% precision target balloon popping',
            icon: Target,
            color: 'text-emerald-500',
          },
        ].map((g) => {
          const isSelected = activeGame === g.id;
          const Icon = g.icon;

          return (
            <button
              key={g.id}
              onClick={() => startGame(g.id)}
              className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25 scale-102 ring-2 ring-indigo-400/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : g.color}`} />
                  {highScores[g.id] ? (
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                      {highScores[g.id]} pts
                    </span>
                  ) : null}
                </div>
                <div className={`font-extrabold text-sm ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                  {g.title}
                </div>
                {showUrdu && (
                  <div className={`font-['Noto_Nastaliq_Urdu'] text-[11px] mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {g.urduTitle}
                  </div>
                )}
              </div>
              <p className={`text-[11px] mt-2 leading-tight ${isSelected ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                {g.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Game Screen Canvas */}
      <div className="relative bg-slate-950 rounded-3xl border-4 border-slate-800 p-6 sm:p-8 min-h-[420px] shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Top Status Monitor inside Arena */}
        <div className="flex items-center justify-between z-10 text-xs font-mono text-slate-300 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-500 uppercase text-[10px]">Score: </span>
              <span className="text-xl font-black text-amber-400">{score}</span>
            </div>

            <div>
              <span className="text-slate-500 uppercase text-[10px]">Streak: </span>
              <span className="text-base font-bold text-emerald-400">🔥 {streak}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeGame !== 'speed-blitz' ? (
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((l) => (
                  <Heart
                    key={l}
                    className={`w-4 h-4 ${
                      l <= lives ? 'fill-rose-500 text-rose-500 animate-pulse' : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 rounded-lg border border-rose-500/40">
                <span className="text-lg font-black">{blitzTimeLeft}s</span>
              </div>
            )}
          </div>
        </div>

        {/* ARENA CONTENT ACCORDING TO GAME */}
        {!isGameOver ? (
          <div className="relative flex-1 my-4 flex items-center justify-center">
            
            {/* GAME 1: Falling Letters */}
            {activeGame === 'falling-letters' && (
              <div className="relative w-full h-[280px]">
                {fallingItems.map((item) => {
                  const finger = getFingerForChar(item.char);
                  return (
                    <div
                      key={item.id}
                      style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        backgroundColor: finger.color,
                      }}
                      className="absolute -translate-x-1/2 w-12 h-14 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-black/60 border-2 border-white text-white font-mono transition-all duration-75"
                    >
                      <span className="text-xl font-black uppercase leading-none">{item.char}</span>
                      <span className="text-[8px] font-bold opacity-80 uppercase mt-0.5">
                        {finger.name.split(' ')[1]}
                      </span>
                    </div>
                  );
                })}

                {/* Laser Defense Line at Bottom */}
                <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 opacity-70 animate-pulse" />
              </div>
            )}

            {/* GAME 2: Word Rush */}
            {activeGame === 'word-rush' && (
              <div className="relative w-full h-[280px]">
                {activeWords.map((item) => (
                  <div
                    key={item.id}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    className="absolute -translate-x-1/2 px-4 py-2 bg-indigo-900/90 border-2 border-indigo-400 rounded-2xl shadow-xl text-white font-mono font-bold text-base tracking-wider"
                  >
                    <span>{item.word}</span>
                  </div>
                ))}

                {/* Typing input bar at bottom */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 border-2 border-indigo-500 shadow-xl">
                  <span className="text-xs text-slate-400 uppercase font-mono">TYPE:</span>
                  <span className="font-mono text-xl font-black text-amber-300">
                    {currentWordInput || <span className="opacity-40">...</span>}
                  </span>
                </div>
              </div>
            )}

            {/* GAME 3: Speed Blitz */}
            {activeGame === 'speed-blitz' && (
              <div className="text-center space-y-4 max-w-md mx-auto">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Type word and blitz forward:
                </span>

                <div className="p-6 bg-slate-900 rounded-3xl border-2 border-rose-500 shadow-2xl">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-widest">
                    {blitzCurrentWord}
                  </div>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-slate-400 text-xs font-mono">You typed:</span>
                    <span className="text-xl font-mono font-black text-amber-300">
                      {currentWordInput || <span className="opacity-30">...</span>}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-400">
                  Words blasted:{' '}
                  <span className="font-bold text-emerald-400 font-mono text-sm">
                    {blitzWordsTyped}
                  </span>
                </div>
              </div>
            )}

            {/* GAME 4: Accuracy Pop */}
            {activeGame === 'accuracy-pop' && (
              <div className="text-center space-y-4">
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Target Balloon · 100% Precision
                </span>

                <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 border-4 border-white shadow-2xl flex flex-col items-center justify-center text-white font-mono animate-bounce">
                  <span className="text-4xl font-black uppercase">{popTargetChar}</span>
                  <span className="text-[10px] uppercase font-bold opacity-80 mt-1">
                    {getFingerForChar(popTargetChar).name.split(' ')[0]}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-300">
                  <div>
                    Accuracy: <span className="text-emerald-400 font-bold">{popAccuracy}%</span>
                  </div>
                  <div>
                    Pops: <span className="text-amber-400 font-bold">{popAccuracyHits}</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        ) : (
          /* GAME OVER SCREEN */
          <div className="my-8 text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-white">Game Completed!</h3>
            <p className="text-xs text-slate-400">Great reflex and touch-typing workout</p>

            <div className="inline-block px-6 py-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs text-slate-400 uppercase font-mono">Final Score</div>
              <div className="text-4xl font-black text-amber-400 font-mono">{score} pts</div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => startGame(activeGame)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-102 flex items-center gap-2 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
            </div>
          </div>
        )}

        {/* Footer Hint inside Arena */}
        <div className="pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>Type using your physical keyboard. Each key corresponds to your touch-typing fingers.</span>
        </div>
      </div>
    </div>
  );
};
