import React, { useState } from 'react';
import { Ticket, QrCode, Sparkles, Award, Clock, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { RankedEntry, TicketQueueEntry, FanGroup, ExcludedEntry } from '../types/ticket';
import { Language, translations } from '../i18n/translations';

interface Props {
  entries: TicketQueueEntry[];
  representatives: RankedEntry[];
  winner: RankedEntry | null;
  fanGroups: FanGroup[];
  excludedEntries: ExcludedEntry[];
  onEditPoints: (entryId: string, currentPoints: number) => void;
  lang: Language;
}

export const FanPortalView: React.FC<Props> = ({
  entries,
  representatives,
  winner,
  fanGroups,
  excludedEntries,
  onEditPoints,
  lang,
}) => {
  const t = translations[lang];
  const [selectedFanId, setSelectedFanId] = useState<string>(
    entries[0]?.id || ''
  );

  const currentEntry = entries.find((e) => e.id === selectedFanId) || entries[0];
  if (!currentEntry) return null;

  // Determine fan status
  const isWinner = winner?.entry.id === currentEntry.id;
  const isExcluded = excludedEntries.some((e) => e.entry.id === currentEntry.id);
  const exclusionReason = excludedEntries.find((e) => e.entry.id === currentEntry.id)?.reason;

  // Find their group
  const fanGroup = fanGroups.find((g) => g.entries.some((e) => e.id === currentEntry.id));

  // Find their rank among all representatives
  const repRank = representatives.findIndex((r) => r.entry.id === currentEntry.id);
  const currentRank = repRank !== -1 ? repRank + 1 : null;
  const currentScore = representatives.find((r) => r.entry.id === currentEntry.id)?.score;

  // Score gap to #1
  const firstScore = representatives[0]?.score || 0;
  const gapToFirst = currentScore !== undefined ? Math.max(0, firstScore - currentScore) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Selector Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200 flex items-center gap-1.5 w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" /> {t.tabFanPortal}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.fanPortalTitle}</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">{t.fanPortalSubtitle}</p>
        </div>

        {/* Fan Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-slate-700 shrink-0">
            {t.selectFanLabel}
          </label>
          <select
            value={selectedFanId}
            onChange={(e) => setSelectedFanId(e.target.value)}
            className="px-3.5 py-2.5 text-xs font-bold rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white transition shadow-sm"
          >
            {entries.map((fan) => (
              <option key={fan.id} value={fan.id}>
                {fan.fanName} ({fan.id}) {fan.id === winner?.entry.id ? '★ WINNER' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Fan Ticket Showcase Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Authentic Concert Digital Pass */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-slate-200 shadow-lg">
            {/* Ticket Header Foil */}
            <div className={`p-4 sm:p-5 flex items-center justify-between text-xs font-black uppercase tracking-widest ${
              isWinner 
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 shadow-sm' 
                : 'bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-sm'
            }`}>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 fill-current" />
                <span>{isWinner ? 'OFFICIAL FRONT ROW PASS • WINNER' : 'OFFICIAL CONCERT PASS'}</span>
              </div>
              <span className="font-mono">PASS #{currentEntry.id.toUpperCase()}</span>
            </div>

            {/* Ticket Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase text-indigo-700 tracking-wider">
                      {t.concertName}
                    </span>
                    {currentEntry.membership === 'vip' && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                        VIP
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    {currentEntry.fanName}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5 font-semibold">
                    Account: {currentEntry.fanId} &bull; Joined: {new Date(currentEntry.joinedQueueAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="text-right bg-slate-50 p-3 rounded-2xl border border-slate-200 shrink-0">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Assigned Tier
                  </div>
                  <div className={`text-base font-black mt-0.5 ${isWinner ? 'text-amber-600' : 'text-slate-900'}`}>
                    {isWinner ? 'FRONT ROW VVIP (Zone A)' : `Regular ($${Number(currentEntry.ticketValue || 0)})`}
                  </div>
                </div>
              </div>

              {/* Status Banner on Ticket */}
              {isWinner ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-center gap-3">
                  <Flame className="w-6 h-6 text-amber-600 fill-amber-500 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-amber-950">{t.fanStatusWon}</div>
                    <div className="text-xs text-amber-800 mt-0.5">
                      Your score ranked #1 with {winner.score.toFixed(1)} points. Proceed to VVIP gate at 18:00!
                    </div>
                  </div>
                </div>
              ) : isExcluded ? (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                  <div>
                    <div className="font-bold text-sm text-rose-950">{t.fanStatusExcluded}</div>
                    <div className="text-xs text-rose-800 mt-0.5">
                      Reason: <strong className="font-mono">{exclusionReason}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-amber-600 shrink-0" />
                    <div>
                      <div className="font-bold text-sm text-slate-900">{t.fanStatusWaiting}</div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Current Queue Rank: <strong className="text-amber-700 font-bold">#{currentRank || '—'}</strong> ({currentScore?.toFixed(1) || 0} pts)
                      </div>
                    </div>
                  </div>

                  {gapToFirst > 0 && (
                    <div className="text-right">
                      <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                        {t.pointsNeedToWin.replace('{pts}', (gapToFirst + 0.1).toFixed(1))}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Barcode & Perforated line */}
              <div className="pt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Security Hash</div>
                  <div className="text-xs font-mono font-semibold text-slate-600">SHA-256: 7F9E..3A8C</div>
                </div>
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Personal Upgrade Odds & Quick Loyalty Simulator */}
        <div className="lg:col-span-5 space-y-4">
          {/* Standing & Score Breakdown */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h4 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Live Queue Performance
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-bold">{t.yourCurrentRank}</div>
                <div className="text-2xl font-black text-amber-600 mt-1">
                  {currentRank ? `#${currentRank}` : 'Excluded'}
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-xs text-slate-500 font-bold">{t.yourCurrentScore}</div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {currentScore !== undefined ? currentScore.toFixed(1) : '0'}{' '}
                  <span className="text-xs font-bold text-slate-500">{t.pts}</span>
                </div>
              </div>
            </div>

            {/* Anti-Sybil Group Alert */}
            {fanGroup && fanGroup.entries.length > 1 && (
              <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-1.5 mb-4">
                <div className="font-bold flex items-center gap-1.5 text-indigo-900">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  {t.multiAccountAlert.replace('{count}', (fanGroup.entries.length - 1).toString())}
                </div>
                <div className="text-[11px] text-slate-600">
                  Representative for your group:{' '}
                  <strong className="text-emerald-700 font-bold">
                    {fanGroup.representative?.entry.fanName}
                  </strong>{' '}
                  ({fanGroup.representative?.score.toFixed(1)} pts)
                </div>
              </div>
            )}

            {/* Quick Loyalty Editor directly for this Fan */}
            <div className="pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">
                  {t.loyaltyPoints}
                </span>
                <span className="font-mono text-xs font-black text-amber-600">
                  {currentEntry.loyaltyPoints ?? 0} pts
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEditPoints(currentEntry.id, (currentEntry.loyaltyPoints ?? 0) + 100)}
                  className="flex-1 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition"
                >
                  +100 pts (+10 score)
                </button>
                <button
                  onClick={() => onEditPoints(currentEntry.id, (currentEntry.loyaltyPoints ?? 0) + 300)}
                  className="flex-1 py-2 text-xs font-bold rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition"
                >
                  +300 pts (+30 score)
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 text-center font-medium">
                {t.simulatePointsChange}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
