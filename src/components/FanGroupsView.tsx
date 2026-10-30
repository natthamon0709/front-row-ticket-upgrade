import React, { useState } from 'react';
import { Users, Link2, ShieldCheck, ChevronDown, ChevronUp, UserCheck, Smartphone, Laptop, CreditCard } from 'lucide-react';
import { FanGroup } from '../types/ticket';
import { Language, translations } from '../i18n/translations';

interface Props {
  fanGroups: FanGroup[];
  winnerId?: string;
  lang: Language;
}

export const FanGroupsView: React.FC<Props> = ({ fanGroups, winnerId, lang }) => {
  const t = translations[lang];
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'multi' | 'single'>('all');

  const toggleExpand = (id: string) => {
    setExpandedGroupId((prev) => (prev === id ? null : id));
  };

  const filteredGroups = fanGroups.filter((g) => {
    if (filterType === 'multi') return g.entries.length > 1;
    if (filterType === 'single') return g.entries.length === 1;
    return true;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-7 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" /> {t.groupsTitle}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{t.groupsSubtitle}</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start lg:self-auto text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              filterType === 'all'
                ? 'bg-white text-indigo-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.filterAllGroups} ({fanGroups.length})
          </button>
          <button
            onClick={() => setFilterType('multi')}
            className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
              filterType === 'multi'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            {t.filterMultiOnly} ({fanGroups.filter((g) => g.entries.length > 1).length})
          </button>
          <button
            onClick={() => setFilterType('single')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              filterType === 'single'
                ? 'bg-white text-indigo-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.filterSingleOnly} ({fanGroups.filter((g) => g.entries.length === 1).length})
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredGroups.map((group) => {
          const isExpanded = expandedGroupId === group.id;
          const isWinnerGroup = group.representative?.entry.id === winnerId;
          const isMultiAccount = group.entries.length > 1;

          return (
            <div
              key={group.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isWinnerGroup
                  ? 'bg-gradient-to-r from-amber-50/70 to-white border-amber-300 shadow-md shadow-amber-500/5'
                  : isMultiAccount
                  ? 'bg-gradient-to-r from-indigo-50/40 via-white to-indigo-50/20 border-indigo-200 shadow-sm'
                  : 'bg-white border-slate-200'
              }`}
            >
              {/* Header */}
              <div
                onClick={() => toggleExpand(group.id)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 transition select-none"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isMultiAccount
                        ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isMultiAccount ? <Link2 className="w-5 h-5 text-indigo-600" /> : <Users className="w-5 h-5 text-slate-500" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">{group.id}</span>
                      {isMultiAccount ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200 animate-pulse">
                          {group.entries.length} {t.linkedAccounts}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                          {t.singleAccount}
                        </span>
                      )}
                      {isWinnerGroup && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {t.containsWinner}
                        </span>
                      )}
                    </div>

                    {/* Connection reasons tags */}
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      {group.connectionReasons.map((reason, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-slate-600 flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 font-medium"
                        >
                          <Link2 className="w-3 h-3 text-indigo-600" />
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      {t.representative}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 justify-end mt-0.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{group.representative?.entry.fanName || 'None'}</span>
                      <span className="text-amber-600 font-mono font-bold">
                        ({group.representative?.score.toFixed(1)} {t.pts})
                      </span>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-3 border-t border-slate-100 bg-slate-50/70">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                    {t.accountsInGroup}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.entries.map((entry) => {
                      const isRep = entry.id === group.representative?.entry.id;
                      return (
                        <div
                          key={entry.id}
                          className={`p-3.5 rounded-xl border text-xs transition ${
                            isRep
                              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 shadow-sm ring-1 ring-emerald-300/50'
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-sm text-slate-900">{entry.fanName}</span>
                            {isRep && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                                <UserCheck className="w-3 h-3" /> {t.repBadge}
                              </span>
                            )}
                          </div>
                          <div className="font-mono text-[11px] text-slate-500 font-semibold">ID: {entry.id}</div>
                          <div className="mt-2 space-y-1 text-[11px] text-slate-600 border-t border-slate-200 pt-2 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Smartphone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">Phone: {entry.phoneNumber || '—'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Laptop className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">Device: {entry.deviceId || '—'}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">Payment: {entry.paymentAccount || '—'}</span>
                            </div>
                            <div className="text-slate-800 font-bold pt-1">
                              Loyalty: {entry.loyaltyPoints ?? 0} pts &bull; Ticket: ${Number(entry.ticketValue || 0)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
