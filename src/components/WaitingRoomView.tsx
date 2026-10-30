import React, { useState } from 'react';
import { Users, Clock, Award, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import { RankedEntry, TicketQueueEntry, FanGroup, ExcludedEntry } from '../types/ticket';
import { Language } from '../i18n/translations';
import { StadiumStageMap } from './StadiumStageMap';

interface Props {
  entries: TicketQueueEntry[];
  representatives: RankedEntry[];
  winner: RankedEntry | null;
  fanGroups: FanGroup[];
  excludedEntries: ExcludedEntry[];
  onEditPoints: (entryId: string, currentPoints: number) => void;
  lang: Language;
}

export const WaitingRoomView: React.FC<Props> = ({
  entries,
  representatives,
  winner,
  fanGroups,
  excludedEntries,
  onEditPoints,
  lang,
}) => {
  const [selectedFanId, setSelectedFanId] = useState<string>(
    entries[0]?.id || ''
  );

  const currentEntry = entries.find((e) => e.id === selectedFanId) || entries[0];
  if (!currentEntry) return null;

  // Status computation
  const isWinner = winner?.entry.id === currentEntry.id;
  const isExcluded = excludedEntries.some((e) => e.entry.id === currentEntry.id);
  const exclusionReason = excludedEntries.find((e) => e.entry.id === currentEntry.id)?.reason;

  // Fan group & rank
  const fanGroup = fanGroups.find((g) => g.entries.some((e) => e.id === currentEntry.id));
  const repRank = representatives.findIndex((r) => r.entry.id === currentEntry.id);
  const currentRank = repRank !== -1 ? repRank + 1 : null;
  const currentScore = representatives.find((r) => r.entry.id === currentEntry.id)?.score;

  // Gap to #1
  const firstScore = representatives[0]?.score || 0;
  const gapToFirst = currentScore !== undefined ? Math.max(0, firstScore - currentScore) : 0;

  // Progress percentage (1st is 100%, 2nd is 70%, 3rd is 45%, etc.)
  const progressPercent = isWinner ? 100 : currentRank ? Math.max(15, 100 - (currentRank - 1) * 25) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Simulation Selector Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">
              {lang === 'th' ? 'จำลองมุมมองเป็นแฟนเพลงในคิว (Simulate As Fan)' : 'Simulate Queue As Fan Profile'}
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {lang === 'th' ? 'เลือกบัญชีผู้ใช้เพื่อดูสถานะคิวเสมือนจริงแบบ Ticketmaster / Queue-it' : 'Select a fan account to test real-world virtual waiting room experience'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedFanId}
            onChange={(e) => setSelectedFanId(e.target.value)}
            className="px-4 py-2 text-xs font-bold rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white shadow-sm transition"
          >
            {entries.map((fan) => (
              <option key={fan.id} value={fan.id}>
                {fan.fanName} ({fan.id}) {fan.id === winner?.entry.id ? '★ 1st WINNER' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Virtual Waiting Room Box (Ticketmaster / Queue-it Style) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Waiting Room Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                {lang === 'th' ? 'คุณกำลังอยู่ในระบบคิวสด (LIVE QUEUE ROOM)' : 'YOU ARE IN THE LIVE QUEUE'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {currentEntry.fanName}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Ticket ID: <span className="font-mono font-bold text-slate-800">{currentEntry.id}</span> &bull; Tier: <strong className="text-indigo-600">${Number(currentEntry.ticketValue || 0)}</strong>
            </p>
          </div>

          {/* Current Rank Badge */}
          <div className="text-right bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 min-w-[200px]">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              {lang === 'th' ? 'ลำดับคิวของคุณ' : 'YOUR QUEUE POSITION'}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-indigo-700 mt-0.5">
              {isWinner ? (
                <span className="text-amber-600 flex items-center justify-end gap-1">
                  <Flame className="w-7 h-7 fill-amber-500" /> #1 WINNER
                </span>
              ) : isExcluded ? (
                <span className="text-rose-600 text-xl">EXCLUDED</span>
              ) : (
                `#${currentRank || '—'}`
              )}
            </div>
            {!isWinner && currentRank && (
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                {currentRank === 1 ? 'Next to be upgraded' : `${currentRank - 1} fan(s) ahead of you`}
              </div>
            )}
          </div>
        </div>

        {/* Queue Progress Bar (Ticketmaster style) */}
        {!isExcluded && (
          <div className="py-6 border-b border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span>{lang === 'th' ? 'ความคืบหน้าในการเข้าคิว' : 'Queue Progress'}</span>
              <span className="text-indigo-600 font-mono">{progressPercent}%</span>
            </div>

            <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isWinner
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-medium">
              <span>{lang === 'th' ? 'เข้าร่วมคิว' : 'Joined Queue'}</span>
              <span>{lang === 'th' ? 'แถวหน้าเวที VVIP Zone A (เป้าหมาย)' : 'Front Row VVIP Seat (Goal)'}</span>
            </div>
          </div>
        )}

        {/* Live Status Notification Box */}
        <div className="my-6">
          {isWinner ? (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black shrink-0 shadow">
                ★
              </div>
              <div className="flex-1">
                <h4 className="font-black text-amber-950 text-base">
                  {lang === 'th' ? 'ยินดีด้วย! คุณได้รับสิทธิ์อัปเกรดตั๋วแถวหน้าเรียบร้อยแล้ว' : 'Congratulations! You Won the Front-Row Upgrade!'}
                </h4>
                <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                  {lang === 'th'
                    ? `คะแนนของคุณ (${winner.score.toFixed(1)} แต้ม) อยู่อันดับสูงสุดในระบบคัดเลือก สามารถแสดงบัตรดิจิทัลนี้ที่จุดลงทะเบียน VVIP Zone A ได้เลย`
                    : `Your score (${winner.score.toFixed(1)} pts) ranked highest among all eligible fans. Show this verified digital pass at Zone A check-in.`}
                </p>
              </div>
            </div>
          ) : isExcluded ? (
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-rose-600 shrink-0" />
              <div>
                <h4 className="font-black text-rose-950 text-base">
                  {lang === 'th' ? 'บัตรของคุณไม่ผ่านเกณฑ์การอัปเกรดในรอบนี้' : 'Your Entry Is Ineligible for an Upgrade'}
                </h4>
                <p className="text-xs text-rose-800 mt-1 font-mono font-bold">
                  {lang === 'th' ? `สาเหตุ: ${exclusionReason}` : `Reason: ${exclusionReason}`}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-indigo-950 text-sm">
                    {lang === 'th' ? 'ระบบกำลังประมวลผลคิวแบบเรียลไทม์' : 'System is Actively Processing Upgrades'}
                  </h4>
                  <p className="text-xs text-indigo-900/80 mt-0.5 leading-relaxed">
                    {lang === 'th'
                      ? 'คะแนนของคุณคำนวณจากเวลารอคอย, ประวัติแต้ม Loyalty, สถานะสมาชิก และราคาตั๋วเดิม'
                      : 'Your priority score dynamically updates based on your wait duration, loyalty history, and ticket tier.'}
                  </p>
                </div>
              </div>

              {gapToFirst > 0 && (
                <div className="text-right shrink-0">
                  <span className="inline-block px-3 py-1 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs">
                    {lang === 'th'
                      ? `ขาดอีกเพียง ${(gapToFirst + 0.1).toFixed(1)} แต้ม จะแซงขึ้นที่ 1`
                      : `Needs ${(gapToFirst + 0.1).toFixed(1)} pts to overtake #1`}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Loyalty Points Booster */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-500 shrink-0" />
            <div>
              <div className="text-xs font-bold text-slate-900">
                {lang === 'th' ? 'ทดสอบเพิ่มคะแนน Loyalty ของคุณ:' : 'Boost Loyalty Points for this Fan:'}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {lang === 'th' ? `ปัจจุบันมี ${currentEntry.loyaltyPoints ?? 0} แต้ม (ทุก 10 แต้ม = +1 คะแนนจัดอันดับ)` : `Currently has ${currentEntry.loyaltyPoints ?? 0} pts (10 pts = +1.0 score)`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditPoints(currentEntry.id, (currentEntry.loyaltyPoints ?? 0) + 100)}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-sm transition"
            >
              +100 pts (+10 score)
            </button>
            <button
              onClick={() => onEditPoints(currentEntry.id, (currentEntry.loyaltyPoints ?? 0) + 200)}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 shadow-sm transition"
            >
              +200 pts (+20 score)
            </button>
          </div>
        </div>

        {/* Anti-Sybil Alert if linked */}
        {fanGroup && fanGroup.entries.length > 1 && (
          <div className="mt-4 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                {lang === 'th'
                  ? `ระบบตรวจพบว่าบัญชีนี้เป็น 1 ใน ${fanGroup.entries.length} บัญชีที่มีการเชื่อมโยงข้อมูลกัน`
                  : `Anti-Sybil Alert: This account is clustered in a multi-account group of ${fanGroup.entries.length} accounts.`}
              </span>
              <p className="text-[11px] text-indigo-800 mt-0.5">
                {lang === 'th'
                  ? `กลุ่มของคุณมีตัวแทนคือ "${fanGroup.representative?.entry.fanName}" (${fanGroup.representative?.score.toFixed(1)} แต้ม) ซึ่งได้สิทธิ์ลุ้นเพียงคนเดียวเพื่อความยุติธรรม`
                  : `Your group representative is "${fanGroup.representative?.entry.fanName}" (${fanGroup.representative?.score.toFixed(1)} pts). Only 1 entry competes.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Stadium Seating Mini-Map */}
      <StadiumStageMap winner={winner} lang={lang} />
    </div>
  );
};
