import React, { useState } from 'react';
import { Ban, Search, AlertTriangle } from 'lucide-react';
import { ExcludedEntry } from '../types/ticket';
import { Language, translations } from '../i18n/translations';

interface Props {
  excludedEntries: ExcludedEntry[];
  lang: Language;
}

export const ExcludedEntriesTable: React.FC<Props> = ({ excludedEntries, lang }) => {
  const t = translations[lang];
  const [searchTerm, setSearchTerm] = useState('');

  const getTranslatedReason = (reason: string) => {
    if (lang === 'en') return reason;
    switch (reason) {
      case 'Cancelled entry':
        return t.reasons.cancelled;
      case 'Already upgraded':
        return t.reasons.upgraded;
      case 'Fan is blocked':
        return t.reasons.blocked;
      case 'Concert has already started':
        return t.reasons.started;
      case 'Invalid ticket value':
        return t.reasons.invalidTicket;
      default:
        return reason;
    }
  };

  const filtered = excludedEntries.filter((item) => {
    const translated = getTranslatedReason(item.reason);
    return (
      item.entry.fanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.entry.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translated.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const getReasonBadgeClass = (reason: string) => {
    switch (reason) {
      case 'Cancelled entry':
        return 'bg-rose-50 text-rose-800 border-rose-200 font-semibold';
      case 'Already upgraded':
        return 'bg-blue-50 text-blue-800 border-blue-200 font-semibold';
      case 'Fan is blocked':
        return 'bg-red-100 text-red-900 border-red-300 font-black';
      case 'Concert has already started':
        return 'bg-amber-50 text-amber-900 border-amber-300 font-semibold';
      case 'Invalid ticket value':
        return 'bg-orange-50 text-orange-900 border-orange-200 font-semibold';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Ban className="w-5 h-5 text-rose-500" /> {t.excludedTitle} ({excludedEntries.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">{t.excludedSubtitle}</p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.searchExcluded}
            className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:bg-white w-full sm:w-64 transition shadow-inner"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-slate-400 text-sm">
          {t.noExcludedFound}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <th className="pb-3 px-3.5">{t.colFan}</th>
                <th className="pb-3 px-3.5">{t.colReason}</th>
                <th className="pb-3 px-3.5">{t.colStatus}</th>
                <th className="pb-3 px-3.5">{t.colTicketVal}</th>
                <th className="pb-3 px-3.5">{t.colMembership}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.entry.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-3.5">
                    <div className="font-bold text-slate-900">{item.entry.fanName}</div>
                    <div className="text-[11px] font-mono text-slate-500">{item.entry.id}</div>
                  </td>
                  <td className="py-3 px-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] border ${getReasonBadgeClass(
                        item.reason
                      )}`}
                    >
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      {getTranslatedReason(item.reason)}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-slate-600 capitalize font-medium">
                    {item.entry.status}
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 font-mono font-medium">
                    {item.entry.ticketValue === null || item.entry.ticketValue === undefined
                      ? 'null'
                      : `$${item.entry.ticketValue}`}
                  </td>
                  <td className="py-3 px-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold ${
                        item.entry.membership === 'blocked'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.entry.membership || 'regular'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
