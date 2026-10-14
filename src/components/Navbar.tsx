import React from 'react';
import {
  Keyboard,
  BookOpen,
  Timer,
  BarChart3,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Languages,
  User,
  Gamepad2,
} from 'lucide-react';
import { StudentProfile } from '../types';

export type ActiveTab = 'dashboard' | 'trainer' | 'lesson' | 'speedtest' | 'progress' | 'games';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  profile: StudentProfile;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  showUrdu: boolean;
  onToggleUrdu: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  profile,
  darkMode,
  onToggleDarkMode,
  soundEnabled,
  onToggleSound,
  showUrdu,
  onToggleUrdu,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Institute Name */}
          <div
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Keyboard className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  Naveed Typing Master
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  STEP 1
                </span>
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                SMBT SKILL COMPUTER CENTER GOLARCHI
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop & Tablet) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <button
              type="button"
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('trainer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'trainer'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>Keyboard & Hands</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('lesson')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'lesson'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Typing Lessons (1-12)</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('speedtest')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'speedtest'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Speed Test</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('progress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'progress'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>My Progress</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('games')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'games'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Typing Games</span>
            </button>
          </nav>

          {/* Quick Controls & Student Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Urdu Language Toggle */}
            <button
              type="button"
              onClick={onToggleUrdu}
              title={showUrdu ? 'Urdu explanations enabled (Click to hide)' : 'Show Urdu explanations'}
              className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                showUrdu
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span className="font-['Noto_Nastaliq_Urdu'] text-xs font-bold leading-none hidden sm:inline">
                اردو
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={onToggleSound}
              title={soundEnabled ? 'Mute keyboard sound' : 'Enable tactile keyboard sound'}
              className={`p-2 rounded-xl border transition-all ${
                soundEnabled
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Student Name & Avatar */}
            <button
              type="button"
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                {profile.name.charAt(0) || <User className="w-4 h-4" />}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[110px]">
                  {profile.name || 'Student'}
                </div>
                <div className="text-[10px] text-slate-400 leading-tight">
                  {profile.rollNo || 'Golarchi'}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`py-1 px-2 font-medium flex items-center gap-1 rounded ${
              activeTab === 'dashboard' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/50' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => onSelectTab('trainer')}
            className={`py-1 px-2 font-medium flex items-center gap-1 rounded ${
              activeTab === 'trainer' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/50' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Keyboard
          </button>
          <button
            onClick={() => onSelectTab('lesson')}
            className={`py-1 px-2 font-medium flex items-center gap-1 rounded ${
              activeTab === 'lesson' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/50' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Lessons
          </button>
          <button
            onClick={() => onSelectTab('speedtest')}
            className={`py-1 px-2 font-medium flex items-center gap-1 rounded ${
              activeTab === 'speedtest' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/50' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Speed Test
          </button>
          <button
            onClick={() => onSelectTab('progress')}
            className={`py-1 px-2 font-medium flex items-center gap-1 rounded ${
              activeTab === 'progress' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/50' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Progress
          </button>
          <button
            onClick={() => onSelectTab('games')}
            className={`py-1 px-2 font-medium flex items-center gap-1 rounded ${
              activeTab === 'games' ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/50' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Games
          </button>
        </div>

      </div>
    </header>
  );
};
