import React from 'react';
import { Sparkles, Info } from 'lucide-react';

interface HomeRowGuideProps {
  showUrdu?: boolean;
}

export const HomeRowGuide: React.FC<HomeRowGuideProps> = ({ showUrdu = true }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/60 dark:from-slate-900/90 dark:via-slate-900 dark:to-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 p-4 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
              The Home Row Foundation: A S D F — J K L ;
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The golden starting anchor for touch typing mastery
            </p>
          </div>
        </div>
        {showUrdu && (
          <span className="font-['Noto_Nastaliq_Urdu'] text-sm text-indigo-700 dark:text-indigo-400 font-bold hidden sm:inline-block">
            ہوم رو کی بنیادی رہنمائی
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Hand Home Row */}
        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-indigo-100 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Left Hand Base (بایاں ہاتھ)
            </span>
            <span className="text-xs text-slate-400">Fingers rest here</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-pink-50 dark:bg-pink-950/50 border-2 border-pink-300 dark:border-pink-800">
              <div className="text-xl font-mono font-black text-pink-700 dark:text-pink-300">A</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1">Little</div>
              {showUrdu && <div className="text-[10px] font-['Noto_Nastaliq_Urdu'] text-slate-500">چھوٹی</div>}
            </div>

            <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/50 border-2 border-orange-300 dark:border-orange-800">
              <div className="text-xl font-mono font-black text-orange-700 dark:text-orange-300">S</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1">Ring</div>
              {showUrdu && <div className="text-[10px] font-['Noto_Nastaliq_Urdu'] text-slate-500">تیسری</div>}
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border-2 border-amber-300 dark:border-amber-800">
              <div className="text-xl font-mono font-black text-amber-700 dark:text-amber-300">D</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1">Middle</div>
              {showUrdu && <div className="text-[10px] font-['Noto_Nastaliq_Urdu'] text-slate-500">درمیانی</div>}
            </div>

            <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border-2 border-emerald-500 shadow-xs relative">
              <span className="absolute -top-2 right-1 text-[9px] bg-emerald-600 text-white px-1 rounded font-bold">
                BUMP
              </span>
              <div className="text-xl font-mono font-black text-emerald-700 dark:text-emerald-300 underline decoration-2 underline-offset-4">
                F
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1">Index</div>
              {showUrdu && <div className="text-[10px] font-['Noto_Nastaliq_Urdu'] text-slate-500">شہادت</div>}
            </div>
          </div>
        </div>

        {/* Right Hand Home Row */}
        <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-indigo-100 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Right Hand Base (دایاں ہاتھ)
            </span>
            <span className="text-xs text-slate-400">Fingers rest here</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border-2 border-cyan-500 shadow-xs relative">
              <span className="absolute -top-2 right-1 text-[9px] bg-cyan-600 text-white px-1 rounded font-bold">
                BUMP
              </span>
              <div className="text-xl font-mono font-black text-cyan-700 dark:text-cyan-300 underline decoration-2 underline-offset-4">
                J
              </div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1">Index</div>
              {showUrdu && <div className="text-[10px] font-['Noto_Nastaliq_Urdu'] text-slate-500">شہادت</div>}
            </div>

            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border-2 border-blue-300 dark:border-blue-800">
              <div className="text-xl font-mono font-black text-blue-700 dark:text-blue-300">K</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1">Middle</div>
              {showUrdu && <div className="text-[10px] font-['Noto_Nastaliq_Urdu'] text-slate-500">درمیانی</div>}
            </div>

            <div className="p-2.5 rounded-lg bg-violet-50 dark:bg-violet-950/50 border-2 border-violet-300 dark:border-violet-800">
              <div className="text-xl font-mono font-black text-violet-700 dark:text-violet-300">L</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1">Ring</div>
              {showUrdu && <div className="text-[10px] font-['Noto_Nastaliq_Urdu'] text-slate-500">تیسری</div>}
            </div>

            <div className="p-2.5 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-950/50 border-2 border-fuchsia-300 dark:border-fuchsia-800">
              <div className="text-xl font-mono font-black text-fuchsia-700 dark:text-fuchsia-300">;</div>
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1">Little</div>
              {showUrdu && <div className="text-[10px] font-['Noto_Nastaliq_Urdu'] text-slate-500">چھوٹی</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Callout */}
      <div className="mt-4 flex items-start gap-3 p-3 bg-indigo-50/60 dark:bg-slate-800/60 rounded-xl text-xs text-slate-700 dark:text-slate-300">
        <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p>
            <strong className="text-indigo-900 dark:text-indigo-200">The Secret Tactile Bumps:</strong> Notice the raised horizontal bars on keys <strong className="text-emerald-700 dark:text-emerald-400">F</strong> and <strong className="text-cyan-700 dark:text-cyan-400">J</strong> on your physical keyboard. Touch typists use them to find their home position without ever looking down!
          </p>
          {showUrdu && (
            <p className="font-['Noto_Nastaliq_Urdu'] text-indigo-950 dark:text-indigo-300 pt-1 leading-relaxed">
              کی بورڈ پر موجود F اور J کیز کے اوپر چھوٹے ابھار (Bumps) ہوتے ہیں۔ ان ابھاروں کو چھو کر آپ بنا دیکھے اپنے ہاتھوں کو بالکل صحیح پوزیشن پر لا سکتے ہیں۔
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
