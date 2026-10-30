import React from 'react';
import { FastForward, Clock, Zap, Star, Scale, RefreshCw, Cpu } from 'lucide-react';
import { ModeOptions } from '../types/ticket';
import { Language, translations } from '../i18n/translations';

interface Props {
  simulatedTime: Date;
  timeOffsetMinutes: number;
  onAdvanceMinutes: (mins: number) => void;
  onResetTime: () => void;
  options: ModeOptions;
  onOptionsChange: (newOptions: ModeOptions) => void;
  onRunBenchmark: (count: number) => void;
  isBenchmarking: boolean;
  benchmarkStats: { count: number; elapsedMs: number } | null;
  lang: Language;
}

export const TimeTravelControls: React.FC<Props> = ({
  simulatedTime,
  timeOffsetMinutes,
  onAdvanceMinutes,
  onResetTime,
  options,
  onOptionsChange,
  onRunBenchmark,
  isBenchmarking,
  benchmarkStats,
  lang,
}) => {
  const t = translations[lang];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-7 shadow-sm space-y-6">
      {/* Time Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-black text-slate-900">{t.simulatedTime}</h3>
            {timeOffsetMinutes > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                +{timeOffsetMinutes}m {t.elapsed}
              </span>
            )}
          </div>
          <p className="text-xs font-mono text-slate-500 mt-1 pl-10 font-semibold">
            {simulatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} &bull;{' '}
            {simulatedTime.toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onAdvanceMinutes(5)}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <FastForward className="w-3.5 h-3.5 text-amber-600" /> {t.advance5m}
          </button>
          <button
            onClick={() => onAdvanceMinutes(15)}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <FastForward className="w-3.5 h-3.5 text-amber-600" /> {t.advance15m}
          </button>
          <button
            onClick={() => onAdvanceMinutes(60)}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <FastForward className="w-3.5 h-3.5 text-amber-600" /> {t.advance1h}
          </button>
          {timeOffsetMinutes > 0 && (
            <button
              onClick={onResetTime}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {t.resetTime}
            </button>
          )}
        </div>
      </div>

      {/* Priority Tuning Modes */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          {t.priorityModes}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Rush Hour */}
          <div
            onClick={() => onOptionsChange({ ...options, rushHour: !options.rushHour })}
            className={`p-4 rounded-2xl border cursor-pointer transition select-none flex items-start gap-3.5 ${
              options.rushHour
                ? 'bg-amber-50/90 border-amber-300 text-amber-950 shadow-sm ring-1 ring-amber-300/60'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                options.rushHour ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{t.rushHour}</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    options.rushHour ? 'bg-amber-200 text-amber-900' : 'text-slate-500 bg-slate-200'
                  }`}
                >
                  {options.rushHour ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t.rushHourDesc}
              </p>
            </div>
          </div>

          {/* VIP Hour */}
          <div
            onClick={() => onOptionsChange({ ...options, vipHour: !options.vipHour })}
            className={`p-4 rounded-2xl border cursor-pointer transition select-none flex items-start gap-3.5 ${
              options.vipHour
                ? 'bg-purple-50/90 border-purple-300 text-purple-950 shadow-sm ring-1 ring-purple-300/60'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                options.vipHour ? 'bg-purple-600 text-white shadow-sm' : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{t.vipHour}</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    options.vipHour ? 'bg-purple-200 text-purple-900' : 'text-slate-500 bg-slate-200'
                  }`}
                >
                  {options.vipHour ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t.vipHourDesc}
              </p>
            </div>
          </div>

          {/* Fair Queue Mode */}
          <div
            onClick={() => onOptionsChange({ ...options, fairQueueMode: !options.fairQueueMode })}
            className={`p-4 rounded-2xl border cursor-pointer transition select-none flex items-start gap-3.5 ${
              options.fairQueueMode
                ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 shadow-sm ring-1 ring-emerald-300/60'
                : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 text-slate-700'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition ${
                options.fairQueueMode ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200 text-slate-600'
              }`}
            >
              <Scale className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{t.fairQueue}</span>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    options.fairQueueMode ? 'bg-emerald-200 text-emerald-900' : 'text-slate-500 bg-slate-200'
                  }`}
                >
                  {options.fairQueueMode ? 'ACTIVE' : 'OFF'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {t.fairQueueDesc}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stress & Benchmark Testing Footer */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Cpu className="w-4 h-4 text-cyan-600 shrink-0" />
          <span className="text-xs font-bold text-slate-700">
            {t.benchmarkTitle}
          </span>
          {benchmarkStats && (
            <span className="text-xs font-mono font-bold text-cyan-900 bg-cyan-50 px-3 py-1 rounded-xl border border-cyan-200 animate-in fade-in">
              {t.benchmarkResult
                .replace('{count}', benchmarkStats.count.toLocaleString())
                .replace('{time}', benchmarkStats.elapsedMs.toFixed(1))}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={isBenchmarking}
            onClick={() => onRunBenchmark(10000)}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 border border-slate-200 transition"
          >
            {t.test10k}
          </button>
          <button
            disabled={isBenchmarking}
            onClick={() => onRunBenchmark(100000)}
            className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-cyan-50 hover:bg-cyan-100 disabled:opacity-50 text-cyan-800 border border-cyan-200 transition font-mono shadow-sm"
          >
            {isBenchmarking ? t.testing : t.test100k}
          </button>
        </div>
      </div>
    </div>
  );
};
