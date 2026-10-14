import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Zap,
  Target,
  Clock,
  RotateCcw,
  User,
  Calendar,
  Building2,
  CheckCircle,
  BarChart,
  BookOpen,
  Printer,
  Sparkles,
  Gamepad2,
  CheckCircle2,
  X,
  FileCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { StudentStats, StudentProfile } from '../types';
import { LESSONS } from '../data/lessonsData';

interface MyProgressProps {
  stats: StudentStats;
  onUpdateProfile: (profile: Partial<StudentProfile>) => void;
  onStartLesson: (id: number, subLessonId?: string) => void;
  showUrdu: boolean;
}

export const MyProgress: React.FC<MyProgressProps> = ({
  stats,
  onUpdateProfile,
  onStartLesson,
  showUrdu,
}) => {
  const [name, setName] = useState(stats.profile.name);
  const [rollNo, setRollNo] = useState(stats.profile.rollNo || 'SMBT-001');
  const [isSaved, setIsSaved] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'levels' | 'sublessons' | 'speedtests' | 'games'>('levels');

  const completedList = Object.values(stats.completedLessons);
  const totalCompleted = completedList.length;
  const progressPercent = Math.round((totalCompleted / LESSONS.length) * 100);

  // Sub-lessons data
  const subResults = Object.values(stats.completedSubLessons || {});
  const passedSubCount = subResults.filter((s) => s.passed).length;
  const totalSubCount = LESSONS.reduce((acc, l) => acc + (l.subLessons ? l.subLessons.length : 1), 0);

  const bestWpm = completedList.length > 0
    ? Math.max(...completedList.map((c) => c.wpm))
    : subResults.length > 0
    ? Math.max(...subResults.map((s) => s.wpm))
    : 0;

  const avgAcc = completedList.length > 0
    ? Math.round(completedList.reduce((acc, c) => acc + c.accuracy, 0) / totalCompleted)
    : subResults.length > 0
    ? Math.round(subResults.reduce((acc, s) => acc + s.accuracy, 0) / subResults.length)
    : 100;

  const totalTimeSpentMinutes = Math.round(
    (completedList.reduce((acc, c) => acc + c.timeSpentSeconds, 0) +
      subResults.reduce((acc, s) => acc + s.timeSpentSeconds, 0)) /
      60
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ name, rollNo });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const certificateNumber = `SMBT-CERT-${(stats.profile.rollNo || '001').toUpperCase().replace(/[^A-Z0-9]/g, '')}-${new Date().getFullYear()}`;

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
            <Building2 className="w-4 h-4" />
            <span>SMBT SKILL COMPUTER CENTER GOLARCHI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Student Progress & Official Certification
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time track record of all 12 levels, modular short lessons, speed tests, and verified diploma.
          </p>
        </div>

        {/* Certificate Button & Progress Gauge */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowCertificateModal(true)}
            className="flex-1 md:flex-none px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer transition-all hover:scale-102"
          >
            <Award className="w-4 h-4" />
            <span>{totalCompleted >= 12 ? 'Claim Official Certificate' : 'Certificate Preview'}</span>
          </button>

          <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-950/60 px-4 py-2.5 rounded-2xl border border-indigo-200 dark:border-indigo-800">
            <div className="text-right">
              <div className="text-2xl font-black text-indigo-700 dark:text-indigo-400 font-mono leading-none">
                {progressPercent}%
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                Completed
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              {totalCompleted}/12
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase text-slate-400">Peak Speed</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
            {bestWpm} <span className="text-xs text-slate-400 font-normal">WPM</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Highest recorded speed</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
            <Target className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase text-slate-400">Precision</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
            {avgAcc}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Average touch accuracy</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-amber-500 mb-2">
            <Award className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase text-slate-400">Short Lessons</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
            {passedSubCount} / {totalSubCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tests passed with pass grade</p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase text-slate-400">Practice Time</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
            {totalTimeSpentMinutes} <span className="text-xs text-slate-400 font-normal">min</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Total focused typing</p>
        </div>
      </div>

      {/* Student Profile Card (Editable with local storage persistence) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Student Enrollment Details (Printed on Certificate)</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Student Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
              Roll / Registration No.
            </label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              {isSaved ? '✓ Profile Saved in Local Storage!' : 'Save Student Info'}
            </button>
          </div>
        </form>
      </div>

      {/* Tab Selector: Levels vs Short Lessons vs Speed Tests vs Games */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('levels')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'levels'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          12 Course Levels ({totalCompleted}/12)
        </button>

        <button
          onClick={() => setActiveTab('sublessons')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'sublessons'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          All Short Lessons & Tests ({passedSubCount}/{totalSubCount})
        </button>

        <button
          onClick={() => setActiveTab('speedtests')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'speedtests'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Speed Tests ({stats.speedTestHistory.length})
        </button>

        <button
          onClick={() => setActiveTab('games')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'games'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Game High Scores
        </button>
      </div>

      {/* TAB 1: 12 Levels History */}
      {activeTab === 'levels' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>12-Level Touch-Typing Curriculum</span>
            </h3>
            <span className="text-xs text-slate-400">
              {totalCompleted} of 12 completed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">Level Name</th>
                  <th className="py-3 px-4">Short Lessons</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">WPM</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Stars</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {LESSONS.map((lesson) => {
                  const res = stats.completedLessons[lesson.id];
                  const isDone = !!res;
                  const subList = lesson.subLessons || [];
                  const passedSubs = subList.filter((s) => stats.completedSubLessons[s.id]?.passed).length;

                  return (
                    <tr key={lesson.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-500">
                        #{lesson.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {lesson.title}
                        </div>
                        {showUrdu && (
                          <div className="font-['Noto_Nastaliq_Urdu'] text-[11px] text-slate-400">
                            {lesson.urduTitle}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500">
                        {passedSubs} / {subList.length}
                      </td>
                      <td className="py-3 px-4">
                        {isDone ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            <span>Passed</span>
                          </span>
                        ) : lesson.id === stats.currentLessonId ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                            <span>In Progress</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {isDone ? `${res.wpm} WPM` : '—'}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {isDone ? `${res.accuracy}%` : '—'}
                      </td>
                      <td className="py-3 px-4 text-amber-500">
                        {isDone ? '★'.repeat(res.stars) : '—'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onStartLesson(lesson.id)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] transition-all cursor-pointer"
                        >
                          {isDone ? 'Repeat Lesson' : 'Practice'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Short Lessons Detailed Breakdown (Requirements 1, 2, 7, 8) */}
      {activeTab === 'sublessons' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Short Lessons & End-of-Lesson Test Results</span>
            </h3>
            <span className="text-xs text-slate-400">
              {passedSubCount} of {totalSubCount} passed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4">Sub-Lesson ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Result</th>
                  <th className="py-3 px-4">WPM</th>
                  <th className="py-3 px-4">CPM</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Mistakes</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {LESSONS.flatMap((lesson) =>
                  (lesson.subLessons || []).map((sub) => {
                    const result = stats.completedSubLessons[sub.id];
                    const isPassed = result?.passed;

                    return (
                      <tr key={sub.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {sub.id}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-800 dark:text-slate-200">
                            {sub.title}
                          </div>
                          {showUrdu && (
                            <div className="font-['Noto_Nastaliq_Urdu'] text-[11px] text-slate-400">
                              {sub.urduTitle}
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {isPassed ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Pass</span>
                            </span>
                          ) : result ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-full">
                              <span>Fail</span>
                            </span>
                          ) : (
                            <span className="text-slate-400">Not Attempted</span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                          {result ? `${result.wpm} WPM` : '—'}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">
                          {result ? result.cpm : '—'}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                          {result ? `${result.accuracy}%` : '—'}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">
                          {result ? result.mistakes : '—'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => onStartLesson(lesson.id, sub.id)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] transition-all cursor-pointer"
                          >
                            {result ? 'Repeat Drill' : 'Start'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Speed Test History */}
      {activeTab === 'speedtests' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Speed Assessment Assessment History (1, 2, 3, 5, 10 min)</span>
          </h3>

          {stats.speedTestHistory.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">
              No speed tests taken yet. Launch a test from the Speed Test tab!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {stats.speedTestHistory.map((test) => (
                <div
                  key={test.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>{test.date}</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{test.durationMinutes} min test</span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {test.netWpm}
                    </span>
                    <span className="text-xs font-bold text-slate-400">Net WPM</span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 ml-auto">
                      {test.accuracy}% acc
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    {test.cpm} CPM · {test.errorCount} mistakes · {test.totalKeystrokes} strokes
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: Typing Games High Scores (Requirement 11) */}
      {activeTab === 'games' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-amber-500" />
            <span>Arcade Typing Game Personal Bests</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800">
              <div className="text-2xl mb-1">🔤</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Falling Letters</div>
              <div className="text-[11px] text-slate-500">Letter Recognition Drill</div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono mt-2">
                {stats.gameScores['falling-letters'] || 0} <span className="text-xs font-medium">pts</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800">
              <div className="text-2xl mb-1">⚡</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Word Rush</div>
              <div className="text-[11px] text-slate-500">Full Word Speed Drill</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-2">
                {stats.gameScores['word-rush'] || 0} <span className="text-xs font-medium">pts</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
              <div className="text-2xl mb-1">⏱️</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Speed Blitz</div>
              <div className="text-[11px] text-slate-500">30-Second Sprint</div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono mt-2">
                {stats.gameScores['speed-blitz'] || 0} <span className="text-xs font-medium">words</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800">
              <div className="text-2xl mb-1">🎯</div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">Accuracy Pop</div>
              <div className="text-[11px] text-slate-500">Zero-Mistake Precision</div>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono mt-2">
                {stats.gameScores['accuracy-pop'] || 0} <span className="text-xs font-medium">hits</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL PRINTABLE CERTIFICATE MODAL (Requirement 14) */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-indigo-400/40 my-8">
            
            {/* Modal Controls Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-4 print:hidden">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="font-black text-sm text-slate-800 dark:text-white">
                  Official Course Completion Certificate
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintCertificate}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Certificate Frame */}
            <div className="printable-certificate bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 text-slate-900 border-8 border-double border-indigo-900 p-6 sm:p-10 rounded-2xl relative shadow-lg text-center font-serif">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 text-indigo-900 text-xl font-bold select-none">❖</div>
              <div className="absolute top-3 right-3 text-indigo-900 text-xl font-bold select-none">❖</div>
              <div className="absolute bottom-3 left-3 text-indigo-900 text-xl font-bold select-none">❖</div>
              <div className="absolute bottom-3 right-3 text-indigo-900 text-xl font-bold select-none">❖</div>

              {/* Header */}
              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-widest font-sans font-extrabold text-indigo-900">
                  Affiliated Vocational Computer & Information Technology Skills
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-indigo-950 tracking-tight font-serif uppercase">
                  SMBT SKILL COMPUTER CENTER GOLARCHI
                </h2>
                <div className="text-xs text-slate-600 font-sans font-semibold">
                  Golarchi, District Badin, Sindh, Pakistan
                </div>
                {showUrdu && (
                  <div className="font-['Noto_Nastaliq_Urdu'] text-sm text-indigo-900 font-bold mt-1">
                    ایس ایم بی ٹی اسکل کمپیوٹر سینٹر گولارچی، سندھ
                  </div>
                )}
              </div>

              {/* Title Ribbon */}
              <div className="my-6">
                <div className="inline-block px-6 py-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-indigo-950 font-black text-base sm:text-xl uppercase tracking-wider rounded-md shadow-sm font-sans">
                  Certificate of Touch-Typing Mastery
                </div>
                <div className="text-[11px] text-slate-500 font-sans tracking-widest uppercase mt-1">
                  12-Level Comprehensive Keyboard Touch Curriculum
                </div>
              </div>

              {/* Body */}
              <div className="space-y-2 max-w-2xl mx-auto my-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                <p className="italic">This is to officially certify that</p>
                <div className="text-2xl sm:text-4xl font-extrabold text-indigo-900 font-serif border-b-2 border-indigo-200 pb-1 mx-auto max-w-md">
                  {stats.profile.name || 'Dedicated Scholar'}
                </div>
                <div className="text-xs font-mono font-bold text-slate-500">
                  Roll / Registration No: <span className="text-slate-800">{stats.profile.rollNo || 'SMBT-001'}</span>
                </div>
                <p className="pt-2 text-slate-700">
                  has completed the rigorous touch typing curriculum on <strong>Naveed Typing Master</strong> at SMBT SKILL COMPUTER CENTER GOLARCHI, demonstrating complete ten-finger tactile muscle memory across alphabets, numerals, and punctuation.
                </p>
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto my-6 text-center font-sans">
                <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-xs">
                  <div className="text-lg sm:text-xl font-black text-indigo-900 font-mono">
                    {progressPercent}%
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    Curriculum Done
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-xs">
                  <div className="text-lg sm:text-xl font-black text-emerald-700 font-mono">
                    {bestWpm} WPM
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    Peak Speed
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-xs">
                  <div className="text-lg sm:text-xl font-black text-blue-700 font-mono">
                    {avgAcc}%
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    Touch Accuracy
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-indigo-100 shadow-xs">
                  <div className="text-lg sm:text-xl font-black text-amber-700 font-mono">
                    {totalCompleted}/12
                  </div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">
                    Levels Unlocked
                  </div>
                </div>
              </div>

              {/* Gold Seal & Signatures */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200 mt-6 font-sans">
                {/* Left Signature */}
                <div className="text-center sm:text-left">
                  <div className="font-serif italic font-bold text-base text-indigo-950">
                    Naveed Chang
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">
                    Director & Master Instructor
                  </div>
                  <div className="text-[9px] text-slate-400">
                    SMBT Skill Computer Center Golarchi
                  </div>
                </div>

                {/* Center Seal */}
                <div className="w-20 h-20 rounded-full border-4 border-double border-amber-600 bg-gradient-to-br from-amber-400 to-amber-600 text-indigo-950 flex flex-col items-center justify-center shadow-md p-1">
                  <div className="text-[8px] font-black uppercase text-center leading-tight">
                    ★ SMBT ★
                  </div>
                  <div className="text-[9px] font-extrabold uppercase text-center leading-tight">
                    OFFICIAL SEAL
                  </div>
                  <div className="text-[7px] text-center font-bold">
                    GOLARCHI
                  </div>
                </div>

                {/* Right Signature & Issue Date */}
                <div className="text-center sm:text-right">
                  <div className="font-mono text-xs font-bold text-slate-800">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="text-[10px] font-bold text-slate-600 uppercase">
                    Date of Certification
                  </div>
                  <div className="text-[9px] font-mono text-slate-400">
                    Ref: {certificateNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Note */}
            <p className="text-[11px] text-center text-slate-400 mt-3 print:hidden">
              Note: This certificate reflects actual saved progress and test completion recorded on this browser.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
