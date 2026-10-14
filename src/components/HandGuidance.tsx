import React from 'react';
import { FingerId } from '../types';
import { FINGER_DATA } from '../data/fingerAssignments';
import { getFingerMovement } from '../data/fingerMovements';
import { Sparkles, Compass, CheckCircle2, Hand } from 'lucide-react';

interface HandGuidanceProps {
  activeFingerId: FingerId;
  targetChar?: string;
  showUrdu?: boolean;
  onFingerClick?: (fingerId: FingerId) => void;
}

export const HandGuidance: React.FC<HandGuidanceProps> = ({
  activeFingerId,
  targetChar = '',
  showUrdu = true,
  onFingerClick,
}) => {
  const activeFinger = FINGER_DATA[activeFingerId] || FINGER_DATA['right-index'];
  const movement = getFingerMovement(targetChar || 'f');

  const isFingerActive = (id: FingerId) =>
    id === activeFingerId || (activeFingerId === 'right-thumb' && id === 'left-thumb');

  return (
    <div className="w-full bg-slate-900/95 dark:bg-slate-950/95 rounded-2xl sm:rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-xl text-slate-100 transition-all">
      {/* Top Banner: Real-time Hand, Finger & Movement Direction Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Hand className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Ten-Finger Touch-Typing Visual Guide
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <span>Positioned Above Keyboard · Natural Posture</span>
          </h3>
        </div>

        {/* Live Active Movement Banner */}
        <div
          className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-2xl border transition-all duration-300"
          style={{
            backgroundColor: `${activeFinger.color}15`,
            borderColor: `${activeFinger.color}60`,
          }}
        >
          {/* Hand Indicator Badge */}
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-xl text-xs font-black text-white uppercase shadow-sm"
              style={{ backgroundColor: activeFinger.color }}
            >
              {movement.hand}
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-white">
              {movement.fingerName}
            </span>
          </div>

          {/* Movement Direction Callout */}
          <div className="text-xs text-slate-200 border-l border-white/20 pl-3">
            <div className="font-semibold text-slate-100 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{movement.action}</span>
            </div>
            {showUrdu && (
              <div className="font-['Noto_Nastaliq_Urdu'] text-[11px] text-amber-200 mt-0.5">
                {movement.urduHand}: {movement.urduFingerName} — {movement.urduAction}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Realistic Two Hands Visualization Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center justify-center max-w-5xl mx-auto">
        
        {/* ================= LEFT HAND ================= */}
        <div
          className={`
            relative flex flex-col items-center p-4 rounded-2xl border transition-all duration-300
            ${movement.hand === 'LEFT HAND' || movement.hand === 'EITHER HAND (THUMBS)'
              ? 'bg-slate-800/80 border-slate-700 ring-2 ring-indigo-500/30 shadow-lg'
              : 'bg-slate-900/60 border-slate-800/80 opacity-90'}
          `}
        >
          <div className="flex items-center justify-between w-full px-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-pink-500" />
              LEFT HAND (بایاں ہاتھ)
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
              Resting Base: A · S · D · F
            </span>
          </div>

          {/* Left Hand SVG Illustration */}
          <div className="relative w-full max-w-[340px]">
            <svg
              viewBox="0 0 320 280"
              className="w-full h-auto drop-shadow-2xl select-none"
              aria-label="Realistic Left Hand Touch Typing Anatomy"
            >
              <defs>
                {/* Natural Hand Gradient */}
                <linearGradient id="leftSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.85" />
                </linearGradient>

                <linearGradient id="leftWristGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.75" />
                </linearGradient>

                <filter id="fingerGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Forearm & Wrist */}
              <path
                d="M 100 230 C 95 250 85 275 80 280 L 220 280 C 215 275 205 250 200 230 Z"
                fill="url(#leftWristGrad)"
                stroke="#78350f"
                strokeWidth="2.5"
                opacity="0.85"
              />

              {/* Palm Body */}
              <path
                d="M 68 150 
                   C 52 178 72 235 140 235 
                   C 210 235 235 185 230 155 
                   C 225 130 185 125 160 135 
                   C 135 128 105 130 78 140 Z"
                fill="url(#leftSkinGrad)"
                stroke="#92400e"
                strokeWidth="3"
              />

              {/* Knuckle Creases / Shading */}
              <path d="M 85 148 Q 95 153 105 148" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 120 142 Q 130 147 140 142" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 155 142 Q 165 147 175 142" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 190 148 Q 200 153 210 148" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.6" />

              {/* FINGER 1: Little Finger (Pinky) - Q, A, Z, 1 */}
              <g
                onClick={() => onFingerClick?.('left-pinky')}
                className="cursor-pointer group"
                aria-label="Left Pinky"
              >
                <path
                  d="M 52 155 L 40 85 C 38 65 62 65 64 85 L 75 145"
                  fill={isFingerActive('left-pinky') ? FINGER_DATA['left-pinky'].color : '#fde047'}
                  stroke={isFingerActive('left-pinky') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('left-pinky') ? '4' : '2.5'}
                  filter={isFingerActive('left-pinky') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                {/* Finger Tip / Key Pad */}
                <circle
                  cx="51"
                  cy="75"
                  r={isFingerActive('left-pinky') ? '16' : '13'}
                  fill={FINGER_DATA['left-pinky'].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={isFingerActive('left-pinky') ? 'animate-pulse' : ''}
                />
                <text x="51" y="80" textAnchor="middle" className="text-xs font-black fill-white pointer-events-none font-mono">
                  A
                </text>
                {/* Base Anchor Tag */}
                <text x="51" y="55" textAnchor="middle" className="text-[10px] font-bold fill-pink-400 font-mono">
                  Pinky
                </text>
              </g>

              {/* FINGER 2: Ring Finger - W, S, X, 2 */}
              <g
                onClick={() => onFingerClick?.('left-ring')}
                className="cursor-pointer group"
                aria-label="Left Ring Finger"
              >
                <path
                  d="M 80 140 L 80 55 C 80 35 105 35 106 55 L 108 135"
                  fill={isFingerActive('left-ring') ? FINGER_DATA['left-ring'].color : '#fde047'}
                  stroke={isFingerActive('left-ring') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('left-ring') ? '4' : '2.5'}
                  filter={isFingerActive('left-ring') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="93"
                  cy="46"
                  r={isFingerActive('left-ring') ? '16' : '13'}
                  fill={FINGER_DATA['left-ring'].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={isFingerActive('left-ring') ? 'animate-pulse' : ''}
                />
                <text x="93" y="51" textAnchor="middle" className="text-xs font-black fill-white pointer-events-none font-mono">
                  S
                </text>
                <text x="93" y="26" textAnchor="middle" className="text-[10px] font-bold fill-orange-400 font-mono">
                  Ring
                </text>
              </g>

              {/* FINGER 3: Middle Finger - E, D, C, 3 */}
              <g
                onClick={() => onFingerClick?.('left-middle')}
                className="cursor-pointer group"
                aria-label="Left Middle Finger"
              >
                <path
                  d="M 115 135 L 120 35 C 120 15 146 15 147 35 L 148 135"
                  fill={isFingerActive('left-middle') ? FINGER_DATA['left-middle'].color : '#fde047'}
                  stroke={isFingerActive('left-middle') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('left-middle') ? '4' : '2.5'}
                  filter={isFingerActive('left-middle') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="133.5"
                  cy="26"
                  r={isFingerActive('left-middle') ? '16' : '13'}
                  fill={FINGER_DATA['left-middle'].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={isFingerActive('left-middle') ? 'animate-pulse' : ''}
                />
                <text x="133.5" y="31" textAnchor="middle" className="text-xs font-black fill-white pointer-events-none font-mono">
                  D
                </text>
                <text x="133.5" y="8" textAnchor="middle" className="text-[10px] font-bold fill-amber-400 font-mono">
                  Middle
                </text>
              </g>

              {/* FINGER 4: Index Finger - R, F, V, T, G, B, 4, 5 (WITH HOME BUMP ON F) */}
              <g
                onClick={() => onFingerClick?.('left-index')}
                className="cursor-pointer group"
                aria-label="Left Index Finger"
              >
                <path
                  d="M 155 137 L 165 48 C 166 28 192 28 193 48 L 195 142"
                  fill={isFingerActive('left-index') ? FINGER_DATA['left-index'].color : '#fde047'}
                  stroke={isFingerActive('left-index') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('left-index') ? '4' : '2.5'}
                  filter={isFingerActive('left-index') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="179"
                  cy="39"
                  r={isFingerActive('left-index') ? '17' : '14'}
                  fill={FINGER_DATA['left-index'].color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className={isFingerActive('left-index') ? 'animate-pulse' : ''}
                />
                {/* Bump Marker Line on F */}
                <text x="179" y="44" textAnchor="middle" className="text-xs font-black fill-white pointer-events-none font-mono">
                  F
                </text>
                {/* Tactile indicator bar on F */}
                <line x1="172" y1="48" x2="186" y2="48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <text x="179" y="18" textAnchor="middle" className="text-[10px] font-extrabold fill-emerald-400 font-mono">
                  Index (F★)
                </text>
              </g>

              {/* FINGER 5: Left Thumb - Spacebar */}
              <g
                onClick={() => onFingerClick?.('left-thumb')}
                className="cursor-pointer group"
                aria-label="Left Thumb"
              >
                <path
                  d="M 205 155 L 260 178 C 275 186 265 208 248 205 L 192 185"
                  fill={isFingerActive('left-thumb') ? FINGER_DATA['left-thumb'].color : '#fde047'}
                  stroke={isFingerActive('left-thumb') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('left-thumb') ? '4' : '2.5'}
                  filter={isFingerActive('left-thumb') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="258"
                  cy="192"
                  r={isFingerActive('left-thumb') ? '15' : '12'}
                  fill={FINGER_DATA['left-thumb'].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={isFingerActive('left-thumb') ? 'animate-pulse' : ''}
                />
                <text x="258" y="196" textAnchor="middle" className="text-[10px] font-black fill-white pointer-events-none font-mono">
                  ␣
                </text>
                <text x="260" y="222" textAnchor="middle" className="text-[9px] font-bold fill-indigo-400 font-mono">
                  Thumb
                </text>
              </g>
            </svg>
          </div>

          {/* Finger Keys Summary List */}
          <div className="grid grid-cols-4 gap-1.5 w-full mt-3 pt-3 border-t border-slate-700/80 text-center">
            <div className={`p-1.5 rounded-lg text-[10px] ${isFingerActive('left-pinky') ? 'bg-pink-500/20 text-pink-300 font-bold border border-pink-500/40' : 'text-slate-400'}`}>
              <div>Pinky (A)</div>
              <div className="font-mono text-[9px] text-pink-400">Q A Z 1</div>
            </div>
            <div className={`p-1.5 rounded-lg text-[10px] ${isFingerActive('left-ring') ? 'bg-orange-500/20 text-orange-300 font-bold border border-orange-500/40' : 'text-slate-400'}`}>
              <div>Ring (S)</div>
              <div className="font-mono text-[9px] text-orange-400">W S X 2</div>
            </div>
            <div className={`p-1.5 rounded-lg text-[10px] ${isFingerActive('left-middle') ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400'}`}>
              <div>Middle (D)</div>
              <div className="font-mono text-[9px] text-amber-400">E D C 3</div>
            </div>
            <div className={`p-1.5 rounded-lg text-[10px] ${isFingerActive('left-index') ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400'}`}>
              <div>Index (F★)</div>
              <div className="font-mono text-[9px] text-emerald-400">R F V T G B</div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT HAND ================= */}
        <div
          className={`
            relative flex flex-col items-center p-4 rounded-2xl border transition-all duration-300
            ${movement.hand === 'RIGHT HAND' || movement.hand === 'EITHER HAND (THUMBS)'
              ? 'bg-slate-800/80 border-slate-700 ring-2 ring-indigo-500/30 shadow-lg'
              : 'bg-slate-900/60 border-slate-800/80 opacity-90'}
          `}
        >
          <div className="flex items-center justify-between w-full px-2 mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              RIGHT HAND (دایاں ہاتھ)
            </span>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
              Resting Base: J · K · L · ;
            </span>
          </div>

          {/* Right Hand SVG Illustration */}
          <div className="relative w-full max-w-[340px]">
            <svg
              viewBox="0 0 320 280"
              className="w-full h-auto drop-shadow-2xl select-none"
              aria-label="Realistic Right Hand Touch Typing Anatomy"
            >
              <defs>
                <linearGradient id="rightSkinGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0.85" />
                </linearGradient>

                <linearGradient id="rightWristGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#b45309" stopOpacity="0.75" />
                </linearGradient>
              </defs>

              {/* Forearm & Wrist */}
              <path
                d="M 220 230 C 225 250 235 275 240 280 L 100 280 C 105 275 115 250 120 230 Z"
                fill="url(#rightWristGrad)"
                stroke="#78350f"
                strokeWidth="2.5"
                opacity="0.85"
              />

              {/* Palm Body */}
              <path
                d="M 252 150 
                   C 268 178 248 235 180 235 
                   C 110 235 85 185 90 155 
                   C 95 130 135 125 160 135 
                   C 185 128 215 130 242 140 Z"
                fill="url(#rightSkinGrad)"
                stroke="#92400e"
                strokeWidth="3"
              />

              {/* Knuckle Creases */}
              <path d="M 235 148 Q 225 153 215 148" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 200 142 Q 190 147 180 142" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 165 142 Q 155 147 145 142" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 130 148 Q 120 153 110 148" stroke="#78350f" strokeWidth="1.5" fill="none" opacity="0.6" />

              {/* FINGER 6: Right Thumb - Spacebar */}
              <g
                onClick={() => onFingerClick?.('right-thumb')}
                className="cursor-pointer group"
                aria-label="Right Thumb"
              >
                <path
                  d="M 115 155 L 60 178 C 45 186 55 208 72 205 L 128 185"
                  fill={isFingerActive('right-thumb') ? FINGER_DATA['right-thumb'].color : '#fde047'}
                  stroke={isFingerActive('right-thumb') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('right-thumb') ? '4' : '2.5'}
                  filter={isFingerActive('right-thumb') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="62"
                  cy="192"
                  r={isFingerActive('right-thumb') ? '15' : '12'}
                  fill={FINGER_DATA['right-thumb'].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={isFingerActive('right-thumb') ? 'animate-pulse' : ''}
                />
                <text x="62" y="196" textAnchor="middle" className="text-[10px] font-black fill-white pointer-events-none font-mono">
                  ␣
                </text>
                <text x="60" y="222" textAnchor="middle" className="text-[9px] font-bold fill-indigo-400 font-mono">
                  Thumb
                </text>
              </g>

              {/* FINGER 7: Index Finger - Y, H, N, U, J, M, 6, 7 (WITH HOME BUMP ON J) */}
              <g
                onClick={() => onFingerClick?.('right-index')}
                className="cursor-pointer group"
                aria-label="Right Index Finger"
              >
                <path
                  d="M 165 137 L 155 48 C 154 28 128 28 127 48 L 125 142"
                  fill={isFingerActive('right-index') ? FINGER_DATA['right-index'].color : '#fde047'}
                  stroke={isFingerActive('right-index') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('right-index') ? '4' : '2.5'}
                  filter={isFingerActive('right-index') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="141"
                  cy="39"
                  r={isFingerActive('right-index') ? '17' : '14'}
                  fill={FINGER_DATA['right-index'].color}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  className={isFingerActive('right-index') ? 'animate-pulse' : ''}
                />
                <text x="141" y="44" textAnchor="middle" className="text-xs font-black fill-white pointer-events-none font-mono">
                  J
                </text>
                {/* Tactile indicator bar on J */}
                <line x1="134" y1="48" x2="148" y2="48" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <text x="141" y="18" textAnchor="middle" className="text-[10px] font-extrabold fill-cyan-400 font-mono">
                  Index (J★)
                </text>
              </g>

              {/* FINGER 8: Middle Finger - I, K, comma, 8 */}
              <g
                onClick={() => onFingerClick?.('right-middle')}
                className="cursor-pointer group"
                aria-label="Right Middle Finger"
              >
                <path
                  d="M 205 135 L 200 35 C 200 15 174 15 173 35 L 172 135"
                  fill={isFingerActive('right-middle') ? FINGER_DATA['right-middle'].color : '#fde047'}
                  stroke={isFingerActive('right-middle') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('right-middle') ? '4' : '2.5'}
                  filter={isFingerActive('right-middle') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="186.5"
                  cy="26"
                  r={isFingerActive('right-middle') ? '16' : '13'}
                  fill={FINGER_DATA['right-middle'].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={isFingerActive('right-middle') ? 'animate-pulse' : ''}
                />
                <text x="186.5" y="31" textAnchor="middle" className="text-xs font-black fill-white pointer-events-none font-mono">
                  K
                </text>
                <text x="186.5" y="8" textAnchor="middle" className="text-[10px] font-bold fill-blue-400 font-mono">
                  Middle
                </text>
              </g>

              {/* FINGER 9: Ring Finger - O, L, period, 9 */}
              <g
                onClick={() => onFingerClick?.('right-ring')}
                className="cursor-pointer group"
                aria-label="Right Ring Finger"
              >
                <path
                  d="M 240 140 L 240 55 C 240 35 215 35 214 55 L 212 135"
                  fill={isFingerActive('right-ring') ? FINGER_DATA['right-ring'].color : '#fde047'}
                  stroke={isFingerActive('right-ring') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('right-ring') ? '4' : '2.5'}
                  filter={isFingerActive('right-ring') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="227"
                  cy="46"
                  r={isFingerActive('right-ring') ? '16' : '13'}
                  fill={FINGER_DATA['right-ring'].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={isFingerActive('right-ring') ? 'animate-pulse' : ''}
                />
                <text x="227" y="51" textAnchor="middle" className="text-xs font-black fill-white pointer-events-none font-mono">
                  L
                </text>
                <text x="227" y="26" textAnchor="middle" className="text-[10px] font-bold fill-violet-400 font-mono">
                  Ring
                </text>
              </g>

              {/* FINGER 10: Little Finger (Pinky) - P, semicolon, slash, 0 */}
              <g
                onClick={() => onFingerClick?.('right-pinky')}
                className="cursor-pointer group"
                aria-label="Right Pinky"
              >
                <path
                  d="M 268 155 L 280 85 C 282 65 258 65 256 85 L 245 145"
                  fill={isFingerActive('right-pinky') ? FINGER_DATA['right-pinky'].color : '#fde047'}
                  stroke={isFingerActive('right-pinky') ? '#ffffff' : '#92400e'}
                  strokeWidth={isFingerActive('right-pinky') ? '4' : '2.5'}
                  filter={isFingerActive('right-pinky') ? 'url(#fingerGlow)' : undefined}
                  className="transition-all duration-200"
                />
                <circle
                  cx="269"
                  cy="75"
                  r={isFingerActive('right-pinky') ? '16' : '13'}
                  fill={FINGER_DATA['right-pinky'].color}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className={isFingerActive('right-pinky') ? 'animate-pulse' : ''}
                />
                <text x="269" y="80" textAnchor="middle" className="text-xs font-black fill-white pointer-events-none font-mono">
                  ;
                </text>
                <text x="269" y="55" textAnchor="middle" className="text-[10px] font-bold fill-fuchsia-400 font-mono">
                  Pinky
                </text>
              </g>
            </svg>
          </div>

          {/* Finger Keys Summary List */}
          <div className="grid grid-cols-4 gap-1.5 w-full mt-3 pt-3 border-t border-slate-700/80 text-center">
            <div className={`p-1.5 rounded-lg text-[10px] ${isFingerActive('right-index') ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400'}`}>
              <div>Index (J★)</div>
              <div className="font-mono text-[9px] text-cyan-400">Y H N U J M</div>
            </div>
            <div className={`p-1.5 rounded-lg text-[10px] ${isFingerActive('right-middle') ? 'bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40' : 'text-slate-400'}`}>
              <div>Middle (K)</div>
              <div className="font-mono text-[9px] text-blue-400">I K , 8</div>
            </div>
            <div className={`p-1.5 rounded-lg text-[10px] ${isFingerActive('right-ring') ? 'bg-violet-500/20 text-violet-300 font-bold border border-violet-500/40' : 'text-slate-400'}`}>
              <div>Ring (L)</div>
              <div className="font-mono text-[9px] text-violet-400">O L . 9</div>
            </div>
            <div className={`p-1.5 rounded-lg text-[10px] ${isFingerActive('right-pinky') ? 'bg-fuchsia-500/20 text-fuchsia-300 font-bold border border-fuchsia-500/40' : 'text-slate-400'}`}>
              <div>Pinky (;)</div>
              <div className="font-mono text-[9px] text-fuchsia-400">P ; / 0 ↵</div>
            </div>
          </div>
        </div>

      </div>

      {/* Touch typing rules footer */}
      <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 font-semibold text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Resting Anchor Rule:
        </span>
        <span>
          Fingers always rest on Home Row keys <strong className="text-white">A S D F</strong> and <strong className="text-white">J K L ;</strong>. After striking any upper or lower key, return immediately to your resting home key.
        </span>
      </div>
    </div>
  );
};
