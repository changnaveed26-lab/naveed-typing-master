import { KeyItem } from '../types';

export const KEYBOARD_ROWS: KeyItem[][] = [
  // ROW 1: Numbers & Tilde
  [
    { id: 'Backquote', char: '`', shiftChar: '~', code: 'Backquote', finger: 'left-pinky' },
    { id: 'Digit1', char: '1', shiftChar: '!', code: 'Digit1', finger: 'left-pinky' },
    { id: 'Digit2', char: '2', shiftChar: '@', code: 'Digit2', finger: 'left-ring' },
    { id: 'Digit3', char: '3', shiftChar: '#', code: 'Digit3', finger: 'left-middle' },
    { id: 'Digit4', char: '4', shiftChar: '$', code: 'Digit4', finger: 'left-index' },
    { id: 'Digit5', char: '5', shiftChar: '%', code: 'Digit5', finger: 'left-index' },
    { id: 'Digit6', char: '6', shiftChar: '^', code: 'Digit6', finger: 'right-index' },
    { id: 'Digit7', char: '7', shiftChar: '&', code: 'Digit7', finger: 'right-index' },
    { id: 'Digit8', char: '8', shiftChar: '*', code: 'Digit8', finger: 'right-middle' },
    { id: 'Digit9', char: '9', shiftChar: '(', code: 'Digit9', finger: 'right-ring' },
    { id: 'Digit0', char: '0', shiftChar: ')', code: 'Digit0', finger: 'right-pinky' },
    { id: 'Minus', char: '-', shiftChar: '_', code: 'Minus', finger: 'right-pinky' },
    { id: 'Equal', char: '=', shiftChar: '+', code: 'Equal', finger: 'right-pinky' },
    { id: 'Backspace', char: 'Backspace', code: 'Backspace', label: 'Backspace ⌫', width: 'w-24', finger: 'right-pinky', isSpecial: true },
  ],

  // ROW 2: Top Row (QWERTY)
  [
    { id: 'Tab', char: 'Tab', code: 'Tab', label: 'Tab ⇥', width: 'w-16', finger: 'left-pinky', isSpecial: true },
    { id: 'KeyQ', char: 'q', shiftChar: 'Q', code: 'KeyQ', finger: 'left-pinky' },
    { id: 'KeyW', char: 'w', shiftChar: 'W', code: 'KeyW', finger: 'left-ring' },
    { id: 'KeyE', char: 'e', shiftChar: 'E', code: 'KeyE', finger: 'left-middle' },
    { id: 'KeyR', char: 'r', shiftChar: 'R', code: 'KeyR', finger: 'left-index' },
    { id: 'KeyT', char: 't', shiftChar: 'T', code: 'KeyT', finger: 'left-index' },
    { id: 'KeyY', char: 'y', shiftChar: 'Y', code: 'KeyY', finger: 'right-index' },
    { id: 'KeyU', char: 'u', shiftChar: 'U', code: 'KeyU', finger: 'right-index' },
    { id: 'KeyI', char: 'i', shiftChar: 'I', code: 'KeyI', finger: 'right-middle' },
    { id: 'KeyO', char: 'o', shiftChar: 'O', code: 'KeyO', finger: 'right-ring' },
    { id: 'KeyP', char: 'p', shiftChar: 'P', code: 'KeyP', finger: 'right-pinky' },
    { id: 'BracketLeft', char: '[', shiftChar: '{', code: 'BracketLeft', finger: 'right-pinky' },
    { id: 'BracketRight', char: ']', shiftChar: '}', code: 'BracketRight', finger: 'right-pinky' },
    { id: 'Backslash', char: '\\', shiftChar: '|', code: 'Backslash', width: 'w-14', finger: 'right-pinky' },
  ],

  // ROW 3: Home Row (ASDF - JKL;)
  [
    { id: 'CapsLock', char: 'CapsLock', code: 'CapsLock', label: 'Caps Lock ⇪', width: 'w-20', finger: 'left-pinky', isSpecial: true },
    { id: 'KeyA', char: 'a', shiftChar: 'A', code: 'KeyA', finger: 'left-pinky', isHomeKey: true },
    { id: 'KeyS', char: 's', shiftChar: 'S', code: 'KeyS', finger: 'left-ring', isHomeKey: true },
    { id: 'KeyD', char: 'd', shiftChar: 'D', code: 'KeyD', finger: 'left-middle', isHomeKey: true },
    { id: 'KeyF', char: 'f', shiftChar: 'F', code: 'KeyF', finger: 'left-index', isHomeKey: true },
    { id: 'KeyG', char: 'g', shiftChar: 'G', code: 'KeyG', finger: 'left-index' },
    { id: 'KeyH', char: 'h', shiftChar: 'H', code: 'KeyH', finger: 'right-index' },
    { id: 'KeyJ', char: 'j', shiftChar: 'J', code: 'KeyJ', finger: 'right-index', isHomeKey: true },
    { id: 'KeyK', char: 'k', shiftChar: 'K', code: 'KeyK', finger: 'right-middle', isHomeKey: true },
    { id: 'KeyL', char: 'l', shiftChar: 'L', code: 'KeyL', finger: 'right-ring', isHomeKey: true },
    { id: 'Semicolon', char: ';', shiftChar: ':', code: 'Semicolon', finger: 'right-pinky', isHomeKey: true },
    { id: 'Quote', char: '\'', shiftChar: '"', code: 'Quote', finger: 'right-pinky' },
    { id: 'Enter', char: 'Enter', code: 'Enter', label: 'Enter ↵', width: 'w-24', finger: 'right-pinky', isSpecial: true },
  ],

  // ROW 4: Bottom Row (ZXCVBNM)
  [
    { id: 'ShiftLeft', char: 'Shift', code: 'ShiftLeft', label: 'Shift ⇧', width: 'w-24', finger: 'left-pinky', isSpecial: true },
    { id: 'KeyZ', char: 'z', shiftChar: 'Z', code: 'KeyZ', finger: 'left-pinky' },
    { id: 'KeyX', char: 'x', shiftChar: 'X', code: 'KeyX', finger: 'left-ring' },
    { id: 'KeyC', char: 'c', shiftChar: 'C', code: 'KeyC', finger: 'left-middle' },
    { id: 'KeyV', char: 'v', shiftChar: 'V', code: 'KeyV', finger: 'left-index' },
    { id: 'KeyB', char: 'b', shiftChar: 'B', code: 'KeyB', finger: 'left-index' },
    { id: 'KeyN', char: 'n', shiftChar: 'N', code: 'KeyN', finger: 'right-index' },
    { id: 'KeyM', char: 'm', shiftChar: 'M', code: 'KeyM', finger: 'right-index' },
    { id: 'Comma', char: ',', shiftChar: '<', code: 'Comma', finger: 'right-middle' },
    { id: 'Period', char: '.', shiftChar: '>', code: 'Period', finger: 'right-ring' },
    { id: 'Slash', char: '/', shiftChar: '?', code: 'Slash', finger: 'right-pinky' },
    { id: 'ShiftRight', char: 'Shift', code: 'ShiftRight', label: 'Shift ⇧', width: 'w-28', finger: 'right-pinky', isSpecial: true },
  ],

  // ROW 5: Bottom Utility & Spacebar
  [
    { id: 'ControlLeft', char: 'Ctrl', code: 'ControlLeft', label: 'Ctrl', width: 'w-16', finger: 'left-pinky', isSpecial: true },
    { id: 'AltLeft', char: 'Alt', code: 'AltLeft', label: 'Alt', width: 'w-16', finger: 'left-thumb', isSpecial: true },
    { id: 'Space', char: ' ', code: 'Space', label: 'Spacebar', width: 'flex-1 max-w-md', finger: 'right-thumb', isSpecial: true },
    { id: 'AltRight', char: 'Alt', code: 'AltRight', label: 'Alt', width: 'w-16', finger: 'right-thumb', isSpecial: true },
    { id: 'ControlRight', char: 'Ctrl', code: 'ControlRight', label: 'Ctrl', width: 'w-16', finger: 'right-pinky', isSpecial: true },
  ],
];
