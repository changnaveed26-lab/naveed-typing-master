import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { LessonRunner } from './components/LessonRunner';
import { SpeedTest } from './components/SpeedTest';
import { MyProgress } from './components/MyProgress';
import { TypingGames } from './components/TypingGames';
import { ProfileModal } from './components/ProfileModal';
import { InteractiveKeyboardTrainer } from './components/InteractiveKeyboardTrainer';
import { LESSONS } from './data/lessonsData';
import {
  StudentStats,
  LessonResult,
  SubLessonResult,
  SpeedTestScore,
  StudentProfile,
} from './types';
import {
  loadStudentStats,
  saveStudentStats,
  recordLessonCompletion,
  recordSubLessonCompletion,
  recordSpeedTest,
  recordGameHighScore,
} from './utils/storage';
import { sounds } from './utils/soundEffects';

export default function App() {
  const [stats, setStats] = useState<StudentStats>(() => loadStudentStats());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<number>(stats.currentLessonId || 1);
  const [activeSubLessonId, setActiveSubLessonId] = useState<string | undefined>(undefined);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Sync dark mode class on <html> element
  useEffect(() => {
    if (stats.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [stats.darkMode]);

  // Sync sound manager enabled state
  useEffect(() => {
    sounds.setEnabled(stats.soundEnabled);
  }, [stats.soundEnabled]);

  // Handlers for settings toggles
  const handleToggleDarkMode = () => {
    setStats((prev) => {
      const next = { ...prev, darkMode: !prev.darkMode };
      saveStudentStats(next);
      return next;
    });
  };

  const handleToggleSound = () => {
    setStats((prev) => {
      const next = { ...prev, soundEnabled: !prev.soundEnabled };
      saveStudentStats(next);
      return next;
    });
  };

  const handleToggleUrdu = () => {
    setStats((prev) => {
      const next = { ...prev, showUrdu: !prev.showUrdu };
      saveStudentStats(next);
      return next;
    });
  };

  const handleUpdateProfile = (updates: Partial<StudentProfile>) => {
    setStats((prev) => {
      const next = {
        ...prev,
        profile: {
          ...prev.profile,
          ...updates,
        },
      };
      saveStudentStats(next);
      return next;
    });
  };

  // Lesson handlers
  const handleStartLesson = (lessonId: number, subLessonId?: string) => {
    setActiveLessonId(lessonId);
    setActiveSubLessonId(subLessonId);
    setActiveTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteSubLesson = (result: SubLessonResult) => {
    // 1. Record individual sub-lesson result
    const updated = recordSubLessonCompletion(stats, result);

    // 2. Also calculate and synchronize level overall progress
    const level = LESSONS.find((l) => l.id === result.levelId);
    if (level && level.subLessons && level.subLessons.length > 0) {
      const passedSubs = level.subLessons.filter(
        (s) => updated.completedSubLessons[s.id]?.passed
      );

      if (passedSubs.length > 0) {
        const avgWpm = Math.round(
          passedSubs.reduce(
            (acc, s) => acc + (updated.completedSubLessons[s.id]?.wpm || 0),
            0
          ) / passedSubs.length
        );
        const avgCpm = Math.round(
          passedSubs.reduce(
            (acc, s) => acc + (updated.completedSubLessons[s.id]?.cpm || 0),
            0
          ) / passedSubs.length
        );
        const avgAcc = Math.round(
          passedSubs.reduce(
            (acc, s) => acc + (updated.completedSubLessons[s.id]?.accuracy || 0),
            0
          ) / passedSubs.length
        );
        const avgStars = Math.min(
          3,
          Math.round(
            passedSubs.reduce(
              (acc, s) => acc + (updated.completedSubLessons[s.id]?.stars || 0),
              0
            ) / passedSubs.length
          )
        );
        const isLevelComplete = passedSubs.length === level.subLessons.length;

        const levelResult: LessonResult = {
          lessonId: result.levelId,
          completedAt: new Date().toISOString(),
          wpm: avgWpm,
          cpm: avgCpm,
          accuracy: avgAcc,
          timeSpentSeconds: result.timeSpentSeconds,
          stars: avgStars,
          errors: result.mistakes,
          passed: isLevelComplete,
        };

        const finalStats = recordLessonCompletion(updated, levelResult);
        setStats(finalStats);
        return;
      }
    }

    setStats(updated);
  };

  const handleNextLesson = () => {
    if (activeLessonId < LESSONS.length) {
      setActiveLessonId((prev) => prev + 1);
      setActiveSubLessonId(undefined);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveTab('dashboard');
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonId > 1) {
      setActiveLessonId((prev) => prev - 1);
      setActiveSubLessonId(undefined);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRecordSpeedTest = (score: SpeedTestScore) => {
    const updated = recordSpeedTest(stats, score);
    setStats(updated);
  };

  const handleRecordGameScore = (gameId: string, score: number) => {
    const updated = recordGameHighScore(stats, gameId, score);
    setStats(updated);
  };

  const currentLesson = LESSONS.find((l) => l.id === activeLessonId) || LESSONS[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        profile={stats.profile}
        darkMode={stats.darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        soundEnabled={stats.soundEnabled}
        onToggleSound={handleToggleSound}
        showUrdu={stats.showUrdu}
        onToggleUrdu={handleToggleUrdu}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            stats={stats}
            onStartLesson={handleStartLesson}
            onOpenSpeedTest={() => setActiveTab('speedtest')}
            onOpenProgress={() => setActiveTab('progress')}
            onOpenGames={() => setActiveTab('games')}
            onUpdateProfile={handleUpdateProfile}
            showUrdu={stats.showUrdu}
          />
        )}

        {activeTab === 'trainer' && (
          <div className="space-y-6 pb-16">
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Touch-Typing Mastery Lab
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Realistic Virtual Keyboard & Ten-Finger Placement Guide
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Interactive 104-key realistic computer layout with matching finger color-coding, live guidance, and practice modes.
                </p>
              </div>
              {stats.showUrdu && (
                <span className="font-['Noto_Nastaliq_Urdu'] text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
                  حقیقی کی بورڈ اور انگلیوں کی پوزیشن
                </span>
              )}
            </div>

            <InteractiveKeyboardTrainer
              showUrdu={stats.showUrdu}
              onOpenLessonCourse={() => handleStartLesson(stats.currentLessonId)}
            />
          </div>
        )}

        {activeTab === 'lesson' && (
          <LessonRunner
            lesson={currentLesson}
            onCompleteSubLesson={handleCompleteSubLesson}
            onNextLesson={handleNextLesson}
            onPrevLesson={handlePrevLesson}
            onGoBack={() => setActiveTab('dashboard')}
            hasNextLesson={activeLessonId < LESSONS.length}
            hasPrevLesson={activeLessonId > 1}
            showUrdu={stats.showUrdu}
            onToggleUrdu={handleToggleUrdu}
            soundEnabled={stats.soundEnabled}
            onToggleSound={handleToggleSound}
            initialSubLessonId={activeSubLessonId}
            completedSubLessons={stats.completedSubLessons}
          />
        )}

        {activeTab === 'speedtest' && (
          <SpeedTest
            profile={stats.profile}
            onRecordScore={handleRecordSpeedTest}
            onGoHome={() => setActiveTab('dashboard')}
            showUrdu={stats.showUrdu}
          />
        )}

        {activeTab === 'progress' && (
          <MyProgress
            stats={stats}
            onUpdateProfile={handleUpdateProfile}
            onStartLesson={handleStartLesson}
            showUrdu={stats.showUrdu}
          />
        )}

        {activeTab === 'games' && (
          <TypingGames
            showUrdu={stats.showUrdu}
            onRecordScore={handleRecordGameScore}
            highScores={stats.gameScores}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xs py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              Naveed Typing Master
            </div>
            <div className="text-[11px] text-slate-500">
              SMBT SKILL COMPUTER CENTER GOLARCHI · Empowering students with modern touch-typing & IT skills
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>12 Complete Levels</span>
            <span>·</span>
            <span>10-Finger Guidance</span>
            <span>·</span>
            <span className="font-['Noto_Nastaliq_Urdu'] text-indigo-600 dark:text-indigo-400 font-bold">
              گولارچی، سندھ
            </span>
          </div>
        </div>
      </footer>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={stats.profile}
        onUpdate={handleUpdateProfile}
        showUrdu={stats.showUrdu}
      />
    </div>
  );
}
