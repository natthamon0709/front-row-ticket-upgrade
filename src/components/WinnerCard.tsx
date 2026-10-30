import React from 'react';
import { Crown, Sparkles, User, Ticket, Award, Clock, AlertCircle, QrCode } from 'lucide-react';
import { RankedEntry } from '../types/ticket';
import { Language, translations } from '../i18n/translations';

interface Props {
  winner: RankedEntry | null;
  onEditPoints: (entryId: string, currentPoints: number) => void;
  lang: Language;
}

export const WinnerCard: React.FC<Props> = ({ winner, onEditPoints, lang }) => {
  const t = translations[lang];

  if (!winner) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-slate-800">{t.noWinner}</h3>
        <p className="text-slate-500 text-sm mt-1">{t.noWinnerDesc}</p>
      </div>
    );
  }

  const { entry, score, reasons } = winner;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 border-2 border-amber-400/80 shadow-xl shadow-amber-500/10">
      {/* Decorative ticket notches */}
      <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 border-r-2 border-amber-400/80 z-20" />
      <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-50 border-l-2 border-amber-400/80 z-20" />

      {/* Top Gold Foil Bar */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 py-2 px-6 flex items-center justify-between text-slate-950 font-black text-xs tracking-widest uppercase shadow-sm">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          OFFICIAL FRONT-ROW VVIP PASS
        </span>
        <span className="font-mono">PASS #FRT-2026-{entry.id.toUpperCase()}</span>
      </div>

      <div className="p-6 md:p-8">
        {/* Main Ticket Body */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-amber-200/80">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25 shrink-0 border border-amber-300">
              <Crown className="w-9 h-9 fill-current" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> {t.selectedWinnerBadge}
                </span>
                {entry.membership === 'vip' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                    {t.vipFanBadge}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
                  Zone A &bull; Row 1 &bull; Seat 01
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1.5 tracking-tight">
                {entry.fanName}
              </h2>

              <p className="text-slate-500 text-xs font-mono mt-1">
                Queue ID: <span className="text-slate-700 font-bold">{entry.id}</span> &bull; Fan ID:{' '}
                <span className="text-slate-700 font-bold">{entry.fanId}</span>
              </p>
            </div>
          </div>

          {/* Right Ticket Score & Barcode Pod */}
          <div className="flex items-center gap-4 self-end lg:self-center bg-white p-4 rounded-2xl border border-amber-300 shadow-md">
            <div className="text-right">
              <div className="text-[11px] uppercase font-bold tracking-wider text-amber-800">
                {t.totalScore}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-amber-600">
                {score.toFixed(1)} <span className="text-sm font-bold text-amber-500">{t.pts}</span>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-slate-200" />

            <div className="flex flex-col items-center justify-center text-slate-700">
              <QrCode className="w-10 h-10 text-slate-800" />
              <span className="text-[9px] font-mono font-bold mt-0.5 text-slate-500">VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Ticket Key Attributes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
          <div className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">{t.ticketValue}</div>
              <div className="font-black text-slate-900 text-base">${Number(entry.ticketValue || 0)}</div>
            </div>
          </div>

          <div
            onClick={() => onEditPoints(entry.id, entry.loyaltyPoints ?? 0)}
            className="bg-white border border-slate-200 hover:border-amber-400 p-3.5 rounded-2xl flex items-center gap-3 cursor-pointer transition group shadow-sm hover:shadow-md"
            title={t.clickToEdit}
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0 group-hover:scale-110 transition">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-[11px] text-slate-500 font-semibold flex items-center justify-between">
                <span>{t.loyaltyPoints}</span>
                <span className="text-[10px] text-amber-600">✏️</span>
              </div>
              <div className="font-black text-amber-700 text-base">{entry.loyaltyPoints ?? 0} {t.pts}</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">{t.joinedQueue}</div>
              <div className="font-bold text-slate-800 text-xs">
                {new Date(entry.joinedQueueAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-semibold">{t.pastUpgrades}</div>
              <div className="font-black text-slate-800 text-base">
                {entry.upgradesLast30Days ?? 0} {t.times}
              </div>
            </div>
          </div>
        </div>

        {/* Explainability Box */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> {t.scoreExplanation}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {reasons.map((reason, idx) => {
              const isNegative = reason.startsWith('-');
              return (
                <div
                  key={idx}
                  className={`px-3 py-2 rounded-xl border font-mono flex items-center gap-2 ${
                    isNegative
                      ? 'bg-rose-50 border-rose-200 text-rose-800 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isNegative ? 'bg-rose-500' : 'bg-amber-500'}`} />
                  <span>{reason}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
