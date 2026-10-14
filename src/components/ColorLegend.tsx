import React from 'react';
import { FINGER_DATA } from '../data/fingerAssignments';
import { FingerId } from '../types';

interface ColorLegendProps {
  activeFingerId?: FingerId;
  onSelectFinger?: (fingerId: FingerId) => void;
  showUrdu?: boolean;
}

export const ColorLegend: React.FC<ColorLegendProps> = ({
  activeFingerId,
  onSelectFinger,
  showUrdu = true,
}) => {
  const legendItems: {
    id: FingerId;
    handLabel: 'Left Hand' | 'Right Hand' | 'Thumbs';
    urduHandLabel: string;
    label: string;
    urduLabel: string;
    keys: string;
  }[] = [
    {
      id: 'left-pinky',
      handLabel: 'Left Hand',
      urduHandLabel: 'بایاں ہاتھ',
      label: 'Little (Pinky)',
      urduLabel: 'چھوٹی انگلی',
      keys: 'Q · A · Z · 1 · Tab · Shift',
    },
    {
      id: 'left-ring',
      handLabel: 'Left Hand',
      urduHandLabel: 'بایاں ہاتھ',
      label: 'Ring Finger',
      urduLabel: 'تیسری انگلی',
      keys: 'W · S · X · 2',
    },
    {
      id: 'left-middle',
      handLabel: 'Left Hand',
      urduHandLabel: 'بایاں ہاتھ',
      label: 'Middle Finger',
      urduLabel: 'درمیانی انگلی',
      keys: 'E · D · C · 3',
    },
    {
      id: 'left-index',
      handLabel: 'Left Hand',
      urduHandLabel: 'بایاں ہاتھ',
      label: 'Index Finger (F★)',
      urduLabel: 'شہادت کی انگلی',
      keys: 'R · F · V · T · G · B · 4 · 5',
    },
    {
      id: 'right-thumb',
      handLabel: 'Thumbs',
      urduHandLabel: 'دونوں انگوٹھے',
      label: 'Thumbs (Either Hand)',
      urduLabel: 'دونوں انگوٹھے',
      keys: 'Spacebar ␣ (Use either thumb)',
    },
    {
      id: 'right-index',
      handLabel: 'Right Hand',
      urduHandLabel: 'دایاں ہاتھ',
      label: 'Index Finger (J★)',
      urduLabel: 'شہادت کی انگلی',
      keys: 'Y · H · N · U · J · M · 6 · 7',
    },
    {
      id: 'right-middle',
      handLabel: 'Right Hand',
      urduHandLabel: 'دایاں ہاتھ',
      label: 'Middle Finger',
      urduLabel: 'درمیانی انگلی',
      keys: 'I · K · Comma (,) · 8',
    },
    {
      id: 'right-ring',
      handLabel: 'Right Hand',
      urduHandLabel: 'دایاں ہاتھ',
      label: 'Ring Finger',
      urduLabel: 'تیسری انگلی',
      keys: 'O · L · Period (.) · 9',
    },
    {
      id: 'right-pinky',
      handLabel: 'Right Hand',
      urduHandLabel: 'دایاں ہاتھ',
      label: 'Little (Pinky)',
      urduLabel: 'چھوٹی انگلی',
      keys: 'P · ; · / · 0 · Enter · Backspace',
    },
  ];

  return (
    <div className="w-full bg-slate-900/90 dark:bg-slate-950/90 rounded-2xl border border-slate-800 p-3 sm:p-4 shadow-md text-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-300">
            Official Touch-Typing Finger Color Code Legend
          </h4>
        </div>
        <p className="text-[11px] text-slate-400">
          Keys on the keyboard share the exact color with their assigned finger
        </p>
      </div>

      {/* Legend Badges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2">
        {legendItems.map((item) => {
          const finger = FINGER_DATA[item.id];
          const isSelected = activeFingerId === item.id || (item.id === 'right-thumb' && activeFingerId === 'left-thumb');

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectFinger?.(item.id)}
              style={{
                borderColor: isSelected ? finger.color : `${finger.color}40`,
                backgroundColor: isSelected ? `${finger.color}25` : 'rgba(30, 41, 59, 0.5)',
              }}
              className={`
                group p-2 rounded-xl text-left border transition-all duration-200 cursor-pointer
                hover:scale-102 flex flex-col justify-between
                ${isSelected ? 'ring-2 shadow-lg shadow-black/40 scale-102' : 'hover:border-slate-600'}
              `}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs ring-1 ring-white/20"
                    style={{ backgroundColor: finger.color }}
                  />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    {item.handLabel}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-white leading-tight">
                  {item.label}
                </div>

                {showUrdu && (
                  <div className="font-['Noto_Nastaliq_Urdu'] text-[10px] text-slate-400 mt-0.5 leading-tight">
                    {item.urduLabel}
                  </div>
                )}
              </div>

              <div
                className="mt-2 pt-1 border-t border-white/10 font-mono text-[9px] font-semibold truncate"
                style={{ color: finger.color }}
                title={item.keys}
              >
                {item.keys}
              </div>
            </button>
          );
        })}
      </div>

      {/* Thumbs Callout Note */}
      <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-md shrink-0"
            style={{ backgroundColor: FINGER_DATA['right-thumb'].color }}
          />
          <span>
            <strong className="text-indigo-400">Thumb Rule:</strong> The Spacebar is colored{' '}
            <span className="text-indigo-300 font-bold">Indigo</span> to represent thumbs. You may use either your Left Thumb or Right Thumb based on comfort.
          </span>
        </div>
        {showUrdu && (
          <span className="font-['Noto_Nastaliq_Urdu'] text-slate-300 text-[11px]">
            اسپیس بار دبانے کے لیے بایاں یا دایاں کوئی بھی انگوٹھا استعمال کر سکتے ہیں۔
          </span>
        )}
      </div>
    </div>
  );
};
