import React from 'react';
import { Crown, Sparkles, User, MapPin } from 'lucide-react';
import { RankedEntry } from '../types/ticket';
import { Language } from '../i18n/translations';

interface Props {
  winner: RankedEntry | null;
  lang: Language;
}

export const StadiumStageMap: React.FC<Props> = ({ winner, lang }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <div>
          <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" />
            {lang === 'th' ? 'ผังเวทีคอนเสิร์ต & ที่นั่งแถวหน้า VVIP' : 'Concert Stage & Front-Row VVIP Seating'}
          </h4>
          <p className="text-[11px] text-slate-500 font-medium">
            {lang === 'th' ? 'ตำแหน่งที่นั่งที่ระบบจะทำการคัดเลือกอัปเกรดให้ผู้โชคดี' : 'Live map of front-row upgrade allocation'}
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-600" /> 1 SEAT AVAILABLE
        </span>
      </div>

      {/* Visual Stadium Stage Graphic */}
      <div className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col items-center justify-center overflow-hidden">
        {/* Stage Curved Bar */}
        <div className="w-3/4 max-w-md bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 text-white text-center py-2.5 rounded-b-3xl font-black text-xs tracking-widest uppercase shadow-md shadow-indigo-500/20 mb-6 border-b-2 border-indigo-400">
          🎤 MAIN STAGE &bull; ศิลปินแสดงตรงนี้
        </div>

        {/* Front Row Zone A (The Upgrade Target) */}
        <div className="w-full max-w-lg bg-amber-50 border-2 border-dashed border-amber-300 rounded-2xl p-4 mb-4 text-center">
          <div className="text-[11px] uppercase tracking-wider font-black text-amber-800 mb-2 flex items-center justify-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            {lang === 'th' ? 'โซนแถวหน้าติดขอบเวที (FRONT ROW VVIP ZONE A)' : 'FRONT ROW VVIP ZONE A (UPGRADE TARGET)'}
          </div>

          {/* Golden Winner Seat Spotlight */}
          <div className="flex items-center justify-center gap-2">
            <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 border border-amber-300 shadow-md flex items-center gap-2 text-slate-950 font-bold text-xs animate-pulse">
              <Crown className="w-4 h-4 fill-slate-950" />
              <span>
                {lang === 'th' ? 'ที่นั่งผู้ชนะ:' : 'Winner Seat:'}{' '}
                <strong className="font-black text-slate-950">{winner ? winner.entry.fanName : 'รอคัดเลือก...'}</strong>
              </span>
              {winner && (
                <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded text-[10px] font-mono">
                  {winner.score.toFixed(1)} pts
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Regular Seating Tiers Preview */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-lg text-center text-[10px] text-slate-500 font-bold">
          <div className="bg-white py-2 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1">
            <User className="w-3 h-3 text-slate-400" /> Zone B ($200)
          </div>
          <div className="bg-white py-2 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1">
            <User className="w-3 h-3 text-slate-400" /> Zone C ($150)
          </div>
          <div className="bg-white py-2 px-3 rounded-xl border border-slate-200 flex items-center justify-center gap-1">
            <User className="w-3 h-3 text-slate-400" /> Zone D ($100)
          </div>
        </div>
      </div>
    </div>
  );
};
