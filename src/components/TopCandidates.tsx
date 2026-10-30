import React, { useState } from 'react';
import { Medal, Clock, Award, Ticket, Edit3, AlertCircle, ChevronDown, ChevronUp, User } from 'lucide-react';
import { RankedEntry } from '../types/ticket';
import { Language, translations } from '../i18n/translations';

interface Props {
  representatives: RankedEntry[];
  onEditPoints: (entryId: string, currentPoints: number) => void;
  lang: Language;
}

export const TopCandidates: React.FC<Props> = ({ representatives, onEditPoints, lang }) => {
  const t = translations[lang];
  const top3 = representatives.slice(0, 3);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (top3.length === 0) {
    return null;
  }

  const badgeGradients = [
    'from-amber-400 to-yellow-500 text-slate-950 border-amber-300 shadow-amber-400/30', // Gold
    'from-slate-200 to-slate-400 text-slate-900 border-slate-300 shadow-slate-300/30',  // Silver
    'from-amber-700 to-amber-900 text-amber-50 border-amber-600 shadow-amber-800/30',  // Bronze
  ];

  const rankLabels = lang === 'th' ? ['อันดับ 1 (ผู้ชนะ)', 'อันดับ 2', 'อันดับ 3'] : ['1st Place (Winner)', '2nd Place', '3rd Place'];
  const firstScore = top3[0]?.score || 0;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Medal className="w-5 h-5 text-amber-500" /> {t.top3Title}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{t.top3Subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {top3.map((ranked, idx) => {
          const { entry, score, reasons } = ranked;
          const isWinner = idx === 0;
          const isExpanded = expandedId === entry.id;
          const pastUpgrades = entry.upgradesLast30Days ?? 0;
          const gapToFirst = isWinner ? 0 : Math.max(0, firstScore - score);

          return (
            <div
              key={entry.id}
              className={`relative rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between ${
                isWinner
                  ? 'bg-gradient-to-b from-amber-50/70 to-white border-amber-300 shadow-lg shadow-amber-500/10 ring-1 ring-amber-300/60'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              <div>
                {/* Header with Rank & Score */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-8 h-8 rounded-xl bg-gradient-to-br flex items-center justify-center font-black text-sm border shadow-sm ${badgeGradients[idx]}`}
                    >
                      #{idx + 1}
                    </span>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">
                        {rankLabels[idx]}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base leading-tight mt-0.5 line-clamp-1">
                        {entry.fanName}
                      </h4>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-black text-amber-600">
                      {score.toFixed(1)} <span className="text-xs font-bold text-amber-500">{t.pts}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono text-slate-500 mb-2">
                  <span>ID: {entry.id}</span>
                  {entry.membership === 'vip' && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200 text-[10px]">
                      VIP
                    </span>
                  )}
                  {pastUpgrades > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-200 flex items-center gap-1 text-[10px]">
                      <AlertCircle className="w-3 h-3" />
                      {lang === 'th' ? `โดนหัก -${pastUpgrades * 20} แต้ม (เคยได้ ${pastUpgrades} ครั้ง)` : `Penalty -${pastUpgrades * 20} pts`}
                    </span>
                  )}
                </div>

                {/* Score gap notification */}
                {!isWinner && gapToFirst > 0 && (
                  <div className="mb-3 p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium flex items-center justify-between">
                    <span>{t.gapToFirst}: <strong>{gapToFirst.toFixed(1)} แต้ม</strong></span>
                    <span className="font-bold text-amber-700 underline cursor-pointer" onClick={() => onEditPoints(entry.id, entry.loyaltyPoints ?? 0)}>
                      + เพิ่มแต้ม
                    </span>
                  </div>
                )}
              </div>

              {/* Attributes row */}
              <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.joinedQueue}</span>
                  </span>
                  <span className="font-semibold text-slate-800">
                    {new Date(entry.joinedQueueAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Ticket className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.ticketValue}</span>
                  </span>
                  <span className="font-semibold text-slate-800">
                    ${Number(entry.ticketValue || 0)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.pastUpgrades}</span>
                  </span>
                  <span className={`font-semibold ${pastUpgrades > 0 ? 'text-rose-600 font-bold' : 'text-slate-800'}`}>
                    {pastUpgrades} {t.times}
                  </span>
                </div>

                {/* Edit points button */}
                <div
                  onClick={() => onEditPoints(entry.id, entry.loyaltyPoints ?? 0)}
                  className="flex items-center justify-between bg-slate-50 hover:bg-amber-50/60 px-3 py-2 rounded-xl border border-slate-200 hover:border-amber-300 cursor-pointer transition group"
                  title={t.clickToEdit}
                >
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{t.loyaltyPoints}: <strong className="text-amber-700 font-bold">{entry.loyaltyPoints ?? 0}</strong></span>
                  </span>
                  <Edit3 className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition" />
                </div>

                {/* Expand / Collapse Score Breakdown */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  className="w-full text-[11px] text-slate-500 hover:text-amber-600 flex items-center justify-center gap-1 pt-1 font-medium transition"
                >
                  <span>{isExpanded ? t.hideBreakdown : t.viewBreakdown}</span>
                  {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                {isExpanded && (
                  <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 font-mono text-[10px] animate-in fade-in">
                    {reasons.map((r, i) => (
                      <div
                        key={i}
                        className={r.startsWith('-') ? 'text-rose-600 font-bold' : 'text-slate-700'}
                      >
                        {r}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
