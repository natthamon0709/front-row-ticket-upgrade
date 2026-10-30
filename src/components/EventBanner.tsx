import React from 'react';
import { MapPin, Calendar, Flame, ShieldAlert, Sparkles, Music } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface Props {
  lang: Language;
  totalInQueue: number;
  totalGroups: number;
}

export const EventBanner: React.FC<Props> = ({ lang, totalInQueue, totalGroups }) => {
  const t = translations[lang];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-purple-950 text-white p-6 md:p-8 shadow-xl shadow-indigo-950/10">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/25 text-rose-200 border border-rose-400/40 flex items-center gap-1.5 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              HOT EVENT &bull; LIVE UPGRADE
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-purple-200 border border-white/15 flex items-center gap-1">
              <Music className="w-3.5 h-3.5" /> STADIUM MEGA CONCERT
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            {t.concertName}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-xs text-indigo-200 font-medium pt-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-300 shrink-0" />
              <span>{t.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-300 shrink-0" />
              <span>{t.eventDate}</span>
            </div>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-200 font-bold text-xs backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              {t.seatCategory}
            </span>
          </div>
        </div>

        {/* Live Ticketing Counter Widget */}
        <div className="bg-white/10 border border-white/15 rounded-2xl p-5 min-w-[280px] shrink-0 backdrop-blur-md flex flex-col justify-between space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs uppercase tracking-wider font-bold text-indigo-200">
              Queue Status
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {t.liveStatus}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-black/20 p-3 rounded-xl border border-white/10">
              <div className="text-[11px] text-indigo-200 font-medium">Total in Queue</div>
              <div className="text-2xl font-black text-white mt-0.5">{totalInQueue}</div>
              <div className="text-[10px] text-indigo-300/70">fans waiting</div>
            </div>

            <div className="bg-black/20 p-3 rounded-xl border border-white/10">
              <div className="text-[11px] text-indigo-200 font-medium">Real Fan Groups</div>
              <div className="text-2xl font-black text-amber-300 mt-0.5">{totalGroups}</div>
              <div className="text-[10px] text-indigo-300/70">independent groups</div>
            </div>
          </div>

          <div className="text-[11px] text-indigo-100 flex items-center gap-1.5 bg-black/20 px-2.5 py-1.5 rounded-lg border border-white/10">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>Anti-Sybil protected: 1 group = 1 chance</span>
          </div>
        </div>
      </div>
    </div>
  );
};
