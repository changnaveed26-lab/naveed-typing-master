import { FingerId, FingerInfo } from '../types';

export const FINGER_DATA: Record<FingerId, FingerInfo> = {
  'left-pinky': {
    id: 'left-pinky',
    name: 'Left Little Finger',
    urduName: 'بائیں چھوٹی انگلی',
    hand: 'left',
    keys: ['`', '~', '1', '!', 'Q', 'q', 'A', 'a', 'Z', 'z', 'Tab', 'CapsLock', 'ShiftLeft', 'ControlLeft'],
    color: '#ec4899', // Pink
    bgClass: 'bg-pink-100 dark:bg-pink-950/60',
    borderClass: 'border-pink-400 dark:border-pink-600',
    textClass: 'text-pink-700 dark:text-pink-300',
    ringClass: 'ring-pink-500 shadow-pink-200 dark:shadow-pink-950',
  },
  'left-ring': {
    id: 'left-ring',
    name: 'Left Ring Finger',
    urduName: 'بائیں تیسری انگلی',
    hand: 'left',
    keys: ['2', '@', 'W', 'w', 'S', 's', 'X', 'x'],
    color: '#f97316', // Orange
    bgClass: 'bg-orange-100 dark:bg-orange-950/60',
    borderClass: 'border-orange-400 dark:border-orange-600',
    textClass: 'text-orange-700 dark:text-orange-300',
    ringClass: 'ring-orange-500 shadow-orange-200 dark:shadow-orange-950',
  },
  'left-middle': {
    id: 'left-middle',
    name: 'Left Middle Finger',
    urduName: 'بائیں درمیانی انگلی',
    hand: 'left',
    keys: ['3', '#', 'E', 'e', 'D', 'd', 'C', 'c'],
    color: '#eab308', // Amber / Yellow
    bgClass: 'bg-amber-100 dark:bg-amber-950/60',
    borderClass: 'border-amber-400 dark:border-amber-600',
    textClass: 'text-amber-800 dark:text-amber-300',
    ringClass: 'ring-amber-500 shadow-amber-200 dark:shadow-amber-950',
  },
  'left-index': {
    id: 'left-index',
    name: 'Left Index Finger',
    urduName: 'بائیں شہادت کی انگلی',
    hand: 'left',
    keys: ['4', '$', '5', '%', 'R', 'r', 'F', 'f', 'V', 'v', 'T', 't', 'G', 'g', 'B', 'b'],
    color: '#10b981', // Emerald / Green
    bgClass: 'bg-emerald-100 dark:bg-emerald-950/60',
    borderClass: 'border-emerald-400 dark:border-emerald-600',
    textClass: 'text-emerald-700 dark:text-emerald-300',
    ringClass: 'ring-emerald-500 shadow-emerald-200 dark:shadow-emerald-950',
  },
  'left-thumb': {
    id: 'left-thumb',
    name: 'Left Thumb',
    urduName: 'بایاں انگوٹھا',
    hand: 'left',
    keys: [' ', 'Space', 'AltLeft'],
    color: '#6366f1', // Indigo (Unified Thumbs Color)
    bgClass: 'bg-indigo-100 dark:bg-indigo-950/60',
    borderClass: 'border-indigo-400 dark:border-indigo-600',
    textClass: 'text-indigo-700 dark:text-indigo-300',
    ringClass: 'ring-indigo-500 shadow-indigo-200 dark:shadow-indigo-950',
  },
  'right-thumb': {
    id: 'right-thumb',
    name: 'Right Thumb',
    urduName: 'دایاں انگوٹھا',
    hand: 'right',
    keys: [' ', 'Space', 'AltRight'],
    color: '#6366f1', // Indigo (Unified Thumbs Color)
    bgClass: 'bg-indigo-100 dark:bg-indigo-950/60',
    borderClass: 'border-indigo-400 dark:border-indigo-600',
    textClass: 'text-indigo-700 dark:text-indigo-300',
    ringClass: 'ring-indigo-500 shadow-indigo-200 dark:shadow-indigo-950',
  },
  'right-index': {
    id: 'right-index',
    name: 'Right Index Finger',
    urduName: 'دائیں شہادت کی انگلی',
    hand: 'right',
    keys: ['6', '^', '7', '&', 'Y', 'y', 'U', 'u', 'H', 'h', 'J', 'j', 'N', 'n', 'M', 'm'],
    color: '#06b6d4', // Cyan
    bgClass: 'bg-cyan-100 dark:bg-cyan-950/60',
    borderClass: 'border-cyan-400 dark:border-cyan-600',
    textClass: 'text-cyan-800 dark:text-cyan-300',
    ringClass: 'ring-cyan-500 shadow-cyan-200 dark:shadow-cyan-950',
  },
  'right-middle': {
    id: 'right-middle',
    name: 'Right Middle Finger',
    urduName: 'دائیں درمیانی انگلی',
    hand: 'right',
    keys: ['8', '*', 'I', 'i', 'K', 'k', ',', '<'],
    color: '#3b82f6', // Blue
    bgClass: 'bg-blue-100 dark:bg-blue-950/60',
    borderClass: 'border-blue-400 dark:border-blue-600',
    textClass: 'text-blue-700 dark:text-blue-300',
    ringClass: 'ring-blue-500 shadow-blue-200 dark:shadow-blue-950',
  },
  'right-ring': {
    id: 'right-ring',
    name: 'Right Ring Finger',
    urduName: 'دائیں تیسری انگلی',
    hand: 'right',
    keys: ['9', '(', 'O', 'o', 'L', 'l', '.', '>'],
    color: '#8b5cf6', // Violet
    bgClass: 'bg-violet-100 dark:bg-violet-950/60',
    borderClass: 'border-violet-400 dark:border-violet-600',
    textClass: 'text-violet-700 dark:text-violet-300',
    ringClass: 'ring-violet-500 shadow-violet-200 dark:shadow-violet-950',
  },
  'right-pinky': {
    id: 'right-pinky',
    name: 'Right Little Finger',
    urduName: 'دائیں چھوٹی انگلی',
    hand: 'right',
    keys: [
      '0', ')', '-', '_', '=', '+', 'P', 'p', '[', '{', ']', '}', '\\', '|',
      ';', ':', '\'', '"', '/', '?', 'Backspace', 'Enter', 'ShiftRight', 'ControlRight'
    ],
    color: '#d946ef', // Fuchsia / Purple
    bgClass: 'bg-fuchsia-100 dark:bg-fuchsia-950/60',
    borderClass: 'border-fuchsia-400 dark:border-fuchsia-600',
    textClass: 'text-fuchsia-700 dark:text-fuchsia-300',
    ringClass: 'ring-fuchsia-500 shadow-fuchsia-200 dark:shadow-fuchsia-950',
  },
};

/**
 * Maps any single character or key code to its corresponding finger.
 */
export function getFingerForChar(char: string): FingerInfo {
  if (!char) return FINGER_DATA['right-thumb'];
  
  if (char === ' ' || char === 'Space') {
    return FINGER_DATA['right-thumb'];
  }

  // Iterate over all fingers and check their keys
  for (const fingerId of Object.keys(FINGER_DATA) as FingerId[]) {
    const finger = FINGER_DATA[fingerId];
    if (finger.keys.includes(char) || finger.keys.includes(char.toLowerCase()) || finger.keys.includes(char.toUpperCase())) {
      return finger;
    }
  }

  return FINGER_DATA['right-index'];
}

/**
 * Retrieve the canonical color for any finger
 */
export function getFingerColor(fingerId: FingerId): string {
  return FINGER_DATA[fingerId]?.color || '#64748b';
}
