export interface MovementInfo {
  hand: 'LEFT HAND' | 'RIGHT HAND' | 'EITHER HAND (THUMBS)';
  urduHand: string;
  fingerName: string;
  urduFingerName: string;
  action: string;
  urduAction: string;
  isHome: boolean;
}

export function getFingerMovement(char: string): MovementInfo {
  const c = char ? char.toLowerCase() : '';

  // Spacebar
  if (c === ' ' || c === 'space' || char === '␣') {
    return {
      hand: 'EITHER HAND (THUMBS)',
      urduHand: 'دونوں انگوٹھے (کوئی بھی استعمال کریں)',
      fingerName: 'Left or Right Thumb',
      urduFingerName: 'بایاں یا دایاں انگوٹھا',
      action: 'Tap lightly with either thumb. Keep both hands resting naturally on the Home Row.',
      urduAction: 'کسی بھی انگوٹھے سے اسپیس دبائیں۔ بقیہ انگلیاں ہوم رو پر رہیں۔',
      isHome: true,
    };
  }

  // LEFT HAND KEYS
  // Left Pinky
  if (['a'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Little Finger (Pinky)',
      urduFingerName: 'بائیں چھوٹی انگلی',
      action: 'Home Row anchor position. Press gently right where your pinky naturally rests.',
      urduAction: 'ہوم رو کی بنیادی پوزیشن۔ بغیر حرکت دیے دبائیں۔',
      isHome: true,
    };
  }
  if (['q', '1', '`', '~', '!'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Little Finger (Pinky)',
      urduFingerName: 'بائیں چھوٹی انگلی',
      action: 'Reach upward and slightly left from A, strike the key, and immediately return to A.',
      urduAction: 'A سے اوپر بائیں جانب انگلی لے جائیں اور واپس A پر آئیں۔',
      isHome: false,
    };
  }
  if (['z'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Little Finger (Pinky)',
      urduFingerName: 'بائیں چھوٹی انگلی',
      action: 'Angle downward and slightly right from A to strike Z, then return to A.',
      urduAction: 'A سے نیچے دائیں طرف زاویہ بنا کر Z دبائیں اور واپس A پر آئیں۔',
      isHome: false,
    };
  }
  if (['tab', 'capslock', 'shift'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Little Finger (Pinky)',
      urduFingerName: 'بائیں چھوٹی انگلی',
      action: 'Extend your left pinky to the outer left column, then snap back to A.',
      urduAction: 'بائیں جانب پھیلا کر کی دبائیں اور واپس ہوم پوزیشن پر آئیں۔',
      isHome: false,
    };
  }

  // Left Ring
  if (['s'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Ring Finger',
      urduFingerName: 'بائیں تیسری انگلی',
      action: 'Home Row anchor position. Press directly under your ring finger.',
      urduAction: 'ہوم رو کی بنیادی پوزیشن۔ سیدھا نیچے دبائیں۔',
      isHome: true,
    };
  }
  if (['w', '2', '@'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Ring Finger',
      urduFingerName: 'بائیں تیسری انگلی',
      action: 'Reach upward one row from S to press W/2, then return immediately to S.',
      urduAction: 'S سے ایک قطار اوپر لے جا کر دبائیں اور فوراً S پر واپس لوٹیں۔',
      isHome: false,
    };
  }
  if (['x'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Ring Finger',
      urduFingerName: 'بائیں تیسری انگلی',
      action: 'Reach downward one row from S to press X, then return to S.',
      urduAction: 'S سے نیچے کی طرف موڑ کر X دبائیں اور واپس ہوم پوزیشن پر آئیں۔',
      isHome: false,
    };
  }

  // Left Middle
  if (['d'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Middle Finger',
      urduFingerName: 'بائیں درمیانی انگلی',
      action: 'Home Row anchor position. Natural resting spot for the left middle finger.',
      urduAction: 'ہوم رو کی بنیادی پوزیشن۔ بائیں درمیانی انگلی کی آرام دہ جگہ۔',
      isHome: true,
    };
  }
  if (['e', '3', '#'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Middle Finger',
      urduFingerName: 'بائیں درمیانی انگلی',
      action: 'Extend upward from D to strike E/3 cleanly, then return to D.',
      urduAction: 'D سے اوپر بڑھا کر E دبائیں اور واپس D پر آئیں۔',
      isHome: false,
    };
  }
  if (['c'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Middle Finger',
      urduFingerName: 'بائیں درمیانی انگلی',
      action: 'Curl downward and slightly right from D to press C, then snap back to D.',
      urduAction: 'D سے نیچے کی جانب لے جا کر C دبائیں اور واپس D پر لوٹیں۔',
      isHome: false,
    };
  }

  // Left Index
  if (['f'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Index Finger',
      urduFingerName: 'بائیں شہادت کی انگلی',
      action: 'Home Row Master Anchor! Feel the raised tactile locator bump with your fingertip.',
      urduAction: 'ہوم رو کا اہم ترین مرکز! انگلی کے پور سے ابھار (Bump) کو محسوس کریں۔',
      isHome: true,
    };
  }
  if (['r', '4', '$'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Index Finger',
      urduFingerName: 'بائیں شہادت کی انگلی',
      action: 'Reach straight upward from F to press R/4, then return to the F bump.',
      urduAction: 'F سے سیدھا اوپر لے جا کر R دبائیں اور واپس F کے ابھار پر آئیں۔',
      isHome: false,
    };
  }
  if (['t', '5', '%'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Index Finger',
      urduFingerName: 'بائیں شہادت کی انگلی',
      action: 'Reach upward and stretch slightly right from F to strike T, then return to F.',
      urduAction: 'F سے اوپر اور تھوڑا دائیں جانب بڑھا کر T دبائیں، پھر F پر لوٹیں۔',
      isHome: false,
    };
  }
  if (['g'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Index Finger',
      urduFingerName: 'بائیں شہادت کی انگلی',
      action: 'Stretch horizontally to the right to press G, then snap back to F immediately.',
      urduAction: 'F سے دائیں جانب کھینچ کر G دبائیں اور فوراً واپس F پر آئیں۔',
      isHome: false,
    };
  }
  if (['v'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Index Finger',
      urduFingerName: 'بائیں شہادت کی انگلی',
      action: 'Move downward from F to press V, then return to F.',
      urduAction: 'F سے سیدھا نیچے لا کر V دبائیں اور واپس F پر آئیں۔',
      isHome: false,
    };
  }
  if (['b'].includes(c)) {
    return {
      hand: 'LEFT HAND',
      urduHand: 'بایاں ہاتھ',
      fingerName: 'Left Index Finger',
      urduFingerName: 'بائیں شہادت کی انگلی',
      action: 'Reach downward and stretch right to strike B, then return to F.',
      urduAction: 'F سے نیچے دائیں طرف لے جا کر B دبائیں اور واپس F پر آئیں۔',
      isHome: false,
    };
  }

  // RIGHT HAND KEYS
  // Right Index
  if (['j'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Index Finger',
      urduFingerName: 'دائیں شہادت کی انگلی',
      action: 'Home Row Master Anchor! Feel the raised tactile locator bump under your right index.',
      urduAction: 'ہوم رو کا اہم ترین مرکز! انگلی کے پور سے J کے ابھار کو محسوس کریں۔',
      isHome: true,
    };
  }
  if (['u', '7', '&'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Index Finger',
      urduFingerName: 'دائیں شہادت کی انگلی',
      action: 'Reach straight upward from J to strike U/7, then return to the J bump.',
      urduAction: 'J سے سیدھا اوپر جا کر U دبائیں اور واپس J پر آئیں۔',
      isHome: false,
    };
  }
  if (['y', '6', '^'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Index Finger',
      urduFingerName: 'دائیں شہادت کی انگلی',
      action: 'Reach upward and stretch to the left to strike Y/6, then return to J.',
      urduAction: 'J سے اوپر بائیں جانب کھینچ کر Y دبائیں اور واپس J پر لوٹیں۔',
      isHome: false,
    };
  }
  if (['h'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Index Finger',
      urduFingerName: 'دائیں شہادت کی انگلی',
      action: 'Stretch horizontally to the left to press H, then snap back to J.',
      urduAction: 'J سے بائیں جانب بڑھا کر H دبائیں اور فوراً واپس J پر آئیں۔',
      isHome: false,
    };
  }
  if (['m'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Index Finger',
      urduFingerName: 'دائیں شہادت کی انگلی',
      action: 'Move downward from J to strike M, then return to J.',
      urduAction: 'J سے سیدھا نیچے لا کر M دبائیں اور واپس J پر آئیں۔',
      isHome: false,
    };
  }
  if (['n'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Index Finger',
      urduFingerName: 'دائیں شہادت کی انگلی',
      action: 'Reach downward and stretch to the left to press N, then return to J.',
      urduAction: 'J سے نیچے بائیں جانب لے جا کر N دبائیں اور واپس J پر آئیں۔',
      isHome: false,
    };
  }

  // Right Middle
  if (['k'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Middle Finger',
      urduFingerName: 'دائیں درمیانی انگلی',
      action: 'Home Row anchor position. Natural resting spot for the right middle finger.',
      urduAction: 'ہوم رو کی بنیادی پوزیشن۔ دائیں درمیانی انگلی کا قدرتی مرکز۔',
      isHome: true,
    };
  }
  if (['i', '8', '*'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Middle Finger',
      urduFingerName: 'دائیں درمیانی انگلی',
      action: 'Reach straight upward from K to strike I/8, then return to K.',
      urduAction: 'K سے سیدھا اوپر جا کر I دبائیں اور واپس K پر لوٹیں۔',
      isHome: false,
    };
  }
  if ([',', '<'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Middle Finger',
      urduFingerName: 'دائیں درمیانی انگلی',
      action: 'Curl downward from K to press comma (,), then return to K.',
      urduAction: 'K سے نیچے موڑ کر کوما (,) دبائیں اور واپس K پر آئیں۔',
      isHome: false,
    };
  }

  // Right Ring
  if (['l'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Ring Finger',
      urduFingerName: 'دائیں تیسری انگلی',
      action: 'Home Row anchor position. Natural resting spot for the right ring finger.',
      urduAction: 'ہوم رو کی بنیادی پوزیشن۔ دائیں تیسری انگلی کا قدرتی مرکز۔',
      isHome: true,
    };
  }
  if (['o', '9', '('].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Ring Finger',
      urduFingerName: 'دائیں تیسری انگلی',
      action: 'Reach upward one row from L to strike O/9, then return to L.',
      urduAction: 'L سے اوپر کی قطار میں O دبائیں اور واپس L پر آئیں۔',
      isHome: false,
    };
  }
  if (['.', '>'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Ring Finger',
      urduFingerName: 'دائیں تیسری انگلی',
      action: 'Curl downward from L to press period (.), then return to L.',
      urduAction: 'L سے نیچے کی جانب فل اسٹاپ (.) دبائیں اور واپس L پر آئیں۔',
      isHome: false,
    };
  }

  // Right Pinky
  if ([';'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Little Finger (Pinky)',
      urduFingerName: 'دائیں چھوٹی انگلی',
      action: 'Home Row anchor position. Semicolon (;) resting spot for right pinky.',
      urduAction: 'ہوم رو کی بنیادی پوزیشن۔ سیمی کولن (;) پر دائیں چھوٹی انگلی کا آرام۔',
      isHome: true,
    };
  }
  if (['p', '0', ')', '-', '_', '=', '+', '[', '{', ']', '}', '\\', '|'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Little Finger (Pinky)',
      urduFingerName: 'دائیں چھوٹی انگلی',
      action: 'Reach upward and right from semicolon (;), strike the key, then return to ;.',
      urduAction: '; سے اوپر اور دائیں طرف انگلی لے جا کر دبائیں اور واپس ; پر آئیں۔',
      isHome: false,
    };
  }
  if (['\'', '"', 'enter', 'backspace'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Little Finger (Pinky)',
      urduFingerName: 'دائیں چھوٹی انگلی',
      action: 'Extend right pinky to the outer right edge for Enter/Backspace/Quotes, then snap back.',
      urduAction: 'باہر کی جانب پھیلا کر Enter یا Backspace دبائیں اور واپس آئیں۔',
      isHome: false,
    };
  }
  if (['/', '?'].includes(c)) {
    return {
      hand: 'RIGHT HAND',
      urduHand: 'دایاں ہاتھ',
      fingerName: 'Right Little Finger (Pinky)',
      urduFingerName: 'دائیں چھوٹی انگلی',
      action: 'Reach downward from semicolon (;) to strike slash (/), then return to ;.',
      urduAction: '; سے نیچے کی طرف سلیش (/) دبائیں اور واپس ; پر آئیں۔',
      isHome: false,
    };
  }

  // Fallback
  return {
    hand: 'RIGHT HAND',
    urduHand: 'دایاں ہاتھ',
    fingerName: 'Right Hand Finger',
    urduFingerName: 'دائیں ہاتھ کی انگلی',
    action: `Type '${char}' with the designated touch-typing finger, then return to home row.`,
    urduAction: `مقررہ انگلی سے '${char}' دبائیں اور واپس ہوم رو پر آئیں۔`,
    isHome: false,
  };
}
