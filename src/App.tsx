import React, { useMemo, useState } from 'react';
import { Ticket, RefreshCw, Activity, Globe, LayoutDashboard, Clock } from 'lucide-react';
import { INITIAL_MOCK_ENTRIES } from './mock/mockData';
import { ModeOptions, RankedEntry, TicketQueueEntry } from './types/ticket';
import { buildFrontRowUpgradeQueue } from './core/upgradeQueue';
import { compareRankedEntries } from './core/scorer';
import { Language, translations } from './i18n/translations';
import { EventBanner } from './components/EventBanner';
import { WinnerCard } from './components/WinnerCard';
import { TopCandidates } from './components/TopCandidates';
import { FanGroupsView } from './components/FanGroupsView';
import { ExcludedEntriesTable } from './components/ExcludedEntriesTable';
import { TimeTravelControls } from './components/TimeTravelControls';
import { EditPointsModal } from './components/EditPointsModal';
import { WaitingRoomView } from './components/WaitingRoomView';
import { StadiumStageMap } from './components/StadiumStageMap';

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('th');
  const t = translations[lang];

  // View Mode: 'waitingRoom' (Ticketmaster style waiting room) or 'dashboard' (Organizer evaluator console)
  const [activeTab, setActiveTab] = useState<'waitingRoom' | 'dashboard'>('waitingRoom');

  const [entries, setEntries] = useState<TicketQueueEntry[]>(INITIAL_MOCK_ENTRIES);
  const [baseDate] = useState<Date>(() => new Date());
  const [offsetMinutes, setOffsetMinutes] = useState<number>(0);
  const [options, setOptions] = useState<ModeOptions>({
    rushHour: false,
    vipHour: false,
    fairQueueMode: false,
  });

  const [editingEntry, setEditingEntry] = useState<{ id: string; points: number } | null>(null);
  const [benchmarkStats, setBenchmarkStats] = useState<{ count: number; elapsedMs: number } | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);

  // Current simulated timestamp
  const simulatedTime = useMemo(() => {
    return new Date(baseDate.getTime() + offsetMinutes * 60 * 1000);
  }, [baseDate, offsetMinutes]);

  // Main evaluation result (Memoized & Non-mutating)
  const result = useMemo(() => {
    return buildFrontRowUpgradeQueue(entries, simulatedTime, options);
  }, [entries, simulatedTime, options]);

  // All representatives sorted by deterministic score
  const representatives = useMemo(() => {
    const list: RankedEntry[] = [];
    for (const group of result.fanGroups) {
      if (group.representative) {
        list.push(group.representative);
      }
    }
    list.sort(compareRankedEntries);
    return list;
  }, [result.fanGroups]);

  // Time travel handlers
  const handleAdvanceMinutes = (mins: number) => {
    setOffsetMinutes((prev) => prev + mins);
  };

  const handleResetTime = () => {
    setOffsetMinutes(0);
  };

  // Loyalty points update
  const handleEditPoints = (entryId: string, currentPoints: number) => {
    setEditingEntry({ id: entryId, points: currentPoints });
  };

  const handleSavePoints = (newPoints: number) => {
    if (!editingEntry) return;
    setEntries((prev) =>
      prev.map((e) => (e.id === editingEntry.id ? { ...e, loyaltyPoints: newPoints } : e))
    );
  };

  // Reset to initial mock dataset
  const handleResetDataset = () => {
    setEntries(INITIAL_MOCK_ENTRIES);
    setOffsetMinutes(0);
    setBenchmarkStats(null);
  };

  // Performance benchmark runner for 10k or 100k
  const handleRunBenchmark = (count: number) => {
    setIsBenchmarking(true);
    setTimeout(() => {
      const generated: TicketQueueEntry[] = new Array(count);
      const concertTime = new Date(simulatedTime.getTime() + 180 * 60000).toISOString();

      for (let i = 0; i < count; i++) {
        const cluster = Math.floor(i / 5);
        generated[i] = {
          id: `bm-${i}`,
          fanId: `fan-${i}`,
          fanName: `Benchmark Fan ${i}`,
          ticketValue: 100 + (i % 80),
          joinedQueueAt: new Date(simulatedTime.getTime() - (i % 200) * 60000).toISOString(),
          eventStartsAt: concertTime,
          status: i % 25 === 0 ? 'cancelled' : 'waiting',
          loyaltyPoints: i % 600,
          phoneNumber: `080${cluster.toString().padStart(7, '0')}`,
          deviceId: i % 2 === 0 ? `dev-${cluster}` : null,
          paymentAccount: i % 3 === 0 ? `pay-${cluster}` : null,
        };
      }

      const t0 = performance.now();
      buildFrontRowUpgradeQueue(generated, simulatedTime, options);
      const t1 = performance.now();

      setBenchmarkStats({ count, elapsedMs: t1 - t0 });
      setIsBenchmarking(false);
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Top Floating Glass Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
              <Ticket className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-wider text-slate-900 flex items-center gap-2">
                {t.appTitle}
                <span className="hidden sm:inline-block px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  SMART QUEUE
                </span>
              </h1>
              <p className="text-[10px] text-slate-500 hidden md:block font-medium">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Center: Real-World Experience Switcher (Waiting Room vs Organizer Dashboard) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab('waitingRoom')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                activeTab === 'waitingRoom'
                  ? 'bg-white text-indigo-900 shadow-sm border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>{t.tabWaitingRoom}</span>
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t.tabDashboard}</span>
            </button>
          </div>

          {/* Right Controls: Stats, Language & Reset */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Live Queue status pill */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-slate-600 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 font-medium">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                Queue: <strong className="text-slate-900 font-bold">{entries.length}</strong> | Groups:{' '}
                <strong className="text-indigo-700 font-bold">{representatives.length}</strong>
              </span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
              <button
                onClick={() => setLang('th')}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                  lang === 'th'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                ไทย
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg font-bold text-[11px] transition ${
                  lang === 'en'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

            {/* Reset data */}
            <button
              onClick={handleResetDataset}
              className="px-2.5 py-1.5 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition flex items-center gap-1.5"
              title={t.resetData}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
        {/* Concert Event Hero Banner */}
        <EventBanner
          lang={lang}
          totalInQueue={entries.length}
          totalGroups={result.fanGroups.length}
        />

        {/* View Switcher: Waiting Room vs Organizer Dashboard */}
        {activeTab === 'waitingRoom' ? (
          /* REAL-WORLD SMART QUEUE / WAITING ROOM */
          <WaitingRoomView
            entries={entries}
            representatives={representatives}
            winner={result.winner}
            fanGroups={result.fanGroups}
            excludedEntries={result.excludedEntries}
            onEditPoints={handleEditPoints}
            lang={lang}
          />
        ) : (
          /* SYSTEM EVALUATOR / ORGANIZER DASHBOARD */
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Time Travel Controls & Priority Modes */}
            <TimeTravelControls
              simulatedTime={simulatedTime}
              timeOffsetMinutes={offsetMinutes}
              onAdvanceMinutes={handleAdvanceMinutes}
              onResetTime={handleResetTime}
              options={options}
              onOptionsChange={setOptions}
              onRunBenchmark={handleRunBenchmark}
              isBenchmarking={isBenchmarking}
              benchmarkStats={benchmarkStats}
              lang={lang}
            />

            {/* Stadium Seating Layout Map */}
            <StadiumStageMap winner={result.winner} lang={lang} />

            {/* Selected Winner Spotlight Pass */}
            <section>
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <span className="text-amber-500">★</span> {t.winnerTitle}
                </h2>
              </div>
              <WinnerCard
                winner={result.winner}
                onEditPoints={handleEditPoints}
                lang={lang}
              />
            </section>

            {/* Top 3 Candidates */}
            <section>
              <TopCandidates
                representatives={representatives}
                onEditPoints={handleEditPoints}
                lang={lang}
              />
            </section>

            {/* Fan Groups & Anti-Sybil Section */}
            <section>
              <FanGroupsView
                fanGroups={result.fanGroups}
                winnerId={result.winner?.entry.id}
                lang={lang}
              />
            </section>

            {/* Excluded Entries Section */}
            <section>
              <ExcludedEntriesTable
                excludedEntries={result.excludedEntries}
                lang={lang}
              />
            </section>
          </div>
        )}
      </main>

      {/* Edit Points Modal */}
      {editingEntry && (
        <EditPointsModal
          entryId={editingEntry.id}
          currentPoints={editingEntry.points}
          onSave={handleSavePoints}
          onClose={() => setEditingEntry(null)}
          lang={lang}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <p className="font-bold text-slate-700">
          Front Row Ticket Upgrade Platform &copy; 2026. Official Smart Queue & Take-Home Task Solution.
        </p>
        <p className="mt-1 font-mono text-[11px] text-slate-400">
          Disjoint-Set Union (DSU) O(N &middot; &alpha;(N)) &bull; Anti-Sybil Multi-Account Guard &bull; Deterministic Tie-Breaking
        </p>
      </footer>
    </div>
  );
};
