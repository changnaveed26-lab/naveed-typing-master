import React from 'react';
import { KEYBOARD_ROWS } from '../data/keyboardLayout';
import { FINGER_DATA } from '../data/fingerAssignments';
import { FingerId, KeyItem } from '../types';

interface VirtualKeyboardProps {
  activeChar?: string;
  pressedKeys?: Set<string>;
  lastTypedStatus?: 'correct' | 'incorrect' | null;
  onKeyClick?: (char: string) => void;
  showFingerColors?: boolean;
  highlightHomeRow?: boolean;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  activeChar = '',
  pressedKeys = new Set(),
  lastTypedStatus = null,
  onKeyClick,
  showFingerColors = true,
  highlightHomeRow = true,
}) => {
  const targetChar = activeChar.length === 1 ? activeChar : '';
  const isTargetUppercase =
    targetChar !== '' &&
    targetChar !== targetChar.toLowerCase() &&
    targetChar.toLowerCase() !== targetChar.toUpperCase();

  const isKeyActive = (key: KeyItem): boolean => {
    if (!targetChar) return false;

    // Direct match with char or shiftChar
    if (key.char.toLowerCase() === targetChar.toLowerCase()) {
      return true;
    }
    if (key.shiftChar && key.shiftChar === targetChar) {
      return true;
    }
    // Spacebar
    if ((targetChar === ' ' || targetChar === '␣') && (key.id === 'Space' || key.char === ' ')) {
      return true;
    }
    // Highlight Shift if capital letter is requested
    if (isTargetUppercase && (key.id === 'ShiftLeft' || key.id === 'ShiftRight')) {
      const finger = FINGER_DATA[key.finger];
      // Opposite hand shift rule:
      if (
        finger.hand === 'left' &&
        !['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b'].includes(
          targetChar.toLowerCase()
        )
      ) {
        return true;
      }
      if (
        finger.hand === 'right' &&
        ['q', 'w', 'e', 'r', 't', 'a', 's', 'd', 'f', 'g', 'z', 'x', 'c', 'v', 'b'].includes(
          targetChar.toLowerCase()
        )
      ) {
        return true;
      }
    }
    return false;
  };

  const isKeyPressed = (key: KeyItem): boolean => {
    return (
      pressedKeys.has(key.code) ||
      pressedKeys.has(key.char) ||
      pressedKeys.has(key.char.toLowerCase()) ||
      (key.id === 'Space' && (pressedKeys.has('Space') || pressedKeys.has(' ')))
    );
  };

  return (
    <div className="w-full bg-linear-to-b from-slate-900 via-slate-950 to-slate-900 p-3 sm:p-5 md:p-6 rounded-3xl shadow-2xl border-4 border-slate-800 text-slate-100 select-none overflow-x-auto relative">
      {/* Keyboard Top Bevel / Status Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black tracking-wider text-slate-300 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-indigo-500 shadow-xs" />
            NAVEED PRO QWERTY 104-KEY
          </span>
          <span className="hidden sm:inline-block text-slate-500">|</span>
          <span className="hidden sm:inline-block text-slate-400">
            SMBT SKILL COMPUTER CENTER GOLARCHI
          </span>
        </div>

        {/* LED Indicators */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">TOUCH READY</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                highlightHomeRow ? 'bg-amber-400 shadow-xs shadow-amber-400' : 'bg-slate-700'
              }`}
            />
            <span className="text-[10px] font-mono uppercase font-bold text-slate-400">HOME ROW</span>
          </div>
        </div>
      </div>

      {/* Realistic Keyboard Chassis & Key Rows */}
      <div className="flex flex-col gap-1.5 sm:gap-2 min-w-[760px] lg:min-w-0 max-w-5xl mx-auto bg-slate-950/80 p-2 sm:p-3 rounded-2xl border border-slate-800/80 shadow-inner">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1 sm:gap-1.5 w-full">
            {row.map((key) => {
              const active = isKeyActive(key);
              const pressed = isKeyPressed(key);
              const finger = FINGER_DATA[key.finger];

              // Key width calculation
              const widthClass = key.width || 'flex-1 min-w-[34px] sm:min-w-[44px] max-w-[56px]';

              // Finger-based primary color
              const fingerColor = finger.color;

              // Compute background, border, and 3D shadow based on finger color
              // Keys assigned to the same finger share the exact same color!
              const baseBgColor = showFingerColors ? `${fingerColor}28` : '#1e293b';
              const baseBorderColor = showFingerColors ? fingerColor : '#475569';
              const activeBgColor = fingerColor;

              // Feedback states (Green for correct, Red for incorrect)
              let feedbackGlow = '';
              if (pressed && lastTypedStatus === 'correct') {
                feedbackGlow = 'ring-4 ring-emerald-500 bg-emerald-600! text-white scale-95';
              } else if (pressed && lastTypedStatus === 'incorrect') {
                feedbackGlow = 'ring-4 ring-rose-500 bg-rose-600! text-white animate-shake';
              }

              return (
                <button
                  key={key.id}
                  onClick={() => onKeyClick?.(key.char === 'Space' ? ' ' : key.char)}
                  type="button"
                  style={{
                    backgroundColor: active ? activeBgColor : baseBgColor,
                    borderColor: active ? '#ffffff' : baseBorderColor,
                    boxShadow: pressed
                      ? 'none'
                      : active
                      ? `0 0 20px ${fingerColor}, 0 4px 0 #0f172a`
                      : `0 4px 0 #0f172a, inset 0 1px 0 rgba(255,255,255,0.15)`,
                  }}
                  className={`
                    group relative h-12 sm:h-14 rounded-lg sm:rounded-xl font-mono
                    flex flex-col items-center justify-between p-1 sm:p-1.5 transition-all duration-100
                    border-2 cursor-pointer select-none
                    ${widthClass}
                    ${pressed ? 'translate-y-1' : 'hover:-translate-y-0.5'}
                    ${active ? 'text-white font-black z-20 scale-105 animate-pulse' : 'text-slate-200'}
                    ${key.isHomeKey && highlightHomeRow && !active ? 'ring-2 ring-white/30' : ''}
                    ${feedbackGlow}
                  `}
                >
                  {/* Top Shift / Sub-Legend Character */}
                  <div className="w-full flex justify-between items-start leading-none px-0.5">
                    {key.shiftChar ? (
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-400 group-hover:text-white">
                        {key.shiftChar}
                      </span>
                    ) : (
                      <span />
                    )}

                    {/* Finger Color Dot indicator on keycap */}
                    <span
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: fingerColor }}
                    />
                  </div>

                  {/* Main Keycap Character / Label */}
                  <div
                    className={`font-black uppercase tracking-tight flex-1 flex items-center justify-center leading-none ${
                      key.isSpecial ? 'text-[10px] sm:text-xs' : 'text-sm sm:text-lg'
                    }`}
                  >
                    {key.label || key.char}
                  </div>

                  {/* Tactile locator bumps on F and J */}
                  {key.isHomeKey && (key.char === 'f' || key.char === 'j') && (
                    <div className="w-4 sm:w-5 h-1 sm:h-1.5 bg-white rounded-full shadow-md mt-0.5" />
                  )}

                  {/* Home Row Marker for A, S, D, K, L, ; */}
                  {key.isHomeKey && key.char !== 'f' && key.char !== 'j' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 mb-0.5" />
                  )}

                  {/* Active Key Beacon Wave */}
                  {active && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Keyboard Bottom Palm Rest & Guide Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-mono font-bold text-[11px] border border-amber-400/30">
            F & J BUMPS
          </span>
          <span>Index finger locators allow blind touch-typing return to home row</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px]">
          <span className="text-slate-400">Home Row:</span>
          <span className="text-pink-400 font-bold">A</span>
          <span className="text-orange-400 font-bold">S</span>
          <span className="text-amber-400 font-bold">D</span>
          <span className="text-emerald-400 font-bold underline decoration-2">F★</span>
          <span className="text-slate-600">—</span>
          <span className="text-cyan-400 font-bold underline decoration-2">J★</span>
          <span className="text-blue-400 font-bold">K</span>
          <span className="text-violet-400 font-bold">L</span>
          <span className="text-fuchsia-400 font-bold">;</span>
        </div>
      </div>
    </div>
  );
};
