export interface SpeedTestPassage {
  id: string;
  title: string;
  urduTitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Professional';
  durationSeconds: number;
  text: string;
}

export const SPEED_TEST_PASSAGES: SpeedTestPassage[] = [
  // 1 MINUTE
  {
    id: 'test-1min-standard',
    title: 'Digital Skills & Future (1 Minute Sprint)',
    urduTitle: 'ڈیجیٹل صلاحیت اور مستقبل (1 منٹ ٹیسٹ)',
    difficulty: 'Beginner',
    durationSeconds: 60,
    text: 'Typing is one of the most essential life skills of the modern digital era. At SMBT Skill Computer Center Golarchi, students learn to type with speed and precision without glancing down at their keyboards. This confidence allows learners to excel in higher education, professional jobs, programming, and freelance careers across Pakistan and around the world.',
  },
  {
    id: 'test-1min-inspirational',
    title: 'Power of Discipline (1 Minute Motivation)',
    urduTitle: 'محنت اور نظم و ضبط (1 منٹ مشق)',
    difficulty: 'Beginner',
    durationSeconds: 60,
    text: 'Success is not an accident; it is the natural result of daily practice, focused concentration, and steady perseverance. When you sit before the keyboard, relax your shoulders, maintain an upright posture, and let your fingers find their natural harmony on the home row.',
  },

  // 2 MINUTES
  {
    id: 'test-2min-art',
    title: 'The Art of Touch Typing (2 Minute Challenge)',
    urduTitle: 'ٹچ ٹائپنگ کا فن (2 منٹ چیلنج)',
    difficulty: 'Intermediate',
    durationSeconds: 120,
    text: 'Touch typing is built upon muscle memory rather than conscious visual sight. When you place your index fingers firmly on the home row bumps of F and J, each finger knows exactly which column of keys it commands. With consistent daily training, your hands dance rhythmically across the keys. Your mind effortlessly flows into text, saving hundreds of productive hours every year. In the fast-paced modern economy, the ability to rapidly convert your thoughts into clean text is an invaluable superpower.',
  },

  // 3 MINUTES
  {
    id: 'test-3min-golarchi',
    title: 'Technology in Golarchi & Sindh (3 Minute Endurance)',
    urduTitle: 'گولارچی اور سندھ میں ٹیکنالوجی (3 منٹ ٹیسٹ)',
    difficulty: 'Intermediate',
    durationSeconds: 180,
    text: 'Golarchi is witnessing a transformative wave of digital literacy through the dedicated mission of SMBT Skill Computer Center. Naveed and fellow instructors believe that every ambitious young mind deserves access to top quality computer training. By combining foundational keyboard mastery with modern software applications, students build technical confidence that opens countless doors in modern IT enterprises, academic research, creative media, and international freelance markets. True learning begins with fundamental habits, and there is no habit more practical than flawless touch typing.',
  },

  // 5 MINUTES
  {
    id: 'test-5min-professional',
    title: 'Modern Digital Economy & Careers (5 Minute Marathon)',
    urduTitle: 'جدید ڈیجیٹل معیشت اور کیریئر (5 منٹ میراتھن)',
    difficulty: 'Advanced',
    durationSeconds: 300,
    text: 'In the twenty-first century, computers are the engines of progress in every industry. From medical transcription and software engineering to administrative correspondence and freelance copywriting, typing speed directly correlates with daily output and professional earnings. When an individual can type sixty words per minute instead of twenty, they effectively regain several months of free time every single year. At SMBT Skill Computer Center in Golarchi, students are trained not merely to push plastic keys, but to cultivate deep cognitive focus and sustained discipline. By sitting upright, keeping wrists floating naturally above the desk, and trusting fingertip muscle memory, a typist enters a state of effortless flow. Even during complex technical assignments involving numerals and punctuation marks, the trained hand glides across the rows without faltering. This profound digital fluency transforms beginners into certified professionals capable of competing on the global stage.',
  },

  // 10 MINUTES
  {
    id: 'test-10min-mastery',
    title: 'Comprehensive Touch-Typing Championship (10 Minute Endurance)',
    urduTitle: 'جامع چیمپئن شپ ٹیسٹ (10 منٹ کا طویل امتحان)',
    difficulty: 'Professional',
    durationSeconds: 600,
    text: 'The true mark of a master typist is sustained endurance over extended durations. In professional certification examinations and corporate typing benchmarks, a ten-minute timed test separates casual hobbyists from disciplined keyboard masters. Maintaining an unbroken rhythm across ten full minutes demands not only quick reflexes, but also calmness under pressure, ergonomic posture, and relentless concentration. When your fingers become tired, you must breathe deeply, relax your shoulders, and refrain from tensing your wrists against the desk. Let your gaze stay fixed on the upcoming sentences, anticipating transitions before they occur. At SMBT Skill Computer Center Golarchi, our curriculum instills the highest standards of accuracy and tempo. We recognize that speed without accuracy is merely noise; true excellence demands ninety-five percent precision or higher. As you navigate complex paragraphs filled with proper nouns, technical terms, numerals, and expressive punctuation, maintain steady cadence. Each keystroke brings you closer to international touch-typing standards. With every completed sentence, you solidify your place among the finest typing scholars in Sindh and beyond.',
  },
];
