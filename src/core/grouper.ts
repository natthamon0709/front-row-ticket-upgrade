import { FanGroup, ModeOptions, RankedEntry, TicketQueueEntry } from '../types/ticket';
import { normalizeIdentifier, normalizePhone } from './normalizer';
import { calculateScore, compareRankedEntries } from './scorer';
import { UnionFind } from './unionFind';

export function groupFanEntries(
  entries: TicketQueueEntry[],
  now: Date,
  options?: ModeOptions
): FanGroup[] {
  if (entries.length === 0) return [];

  const n = entries.length;
  const uf = new UnionFind(n);

  const phoneMap = new Map<string, number>();
  const deviceMap = new Map<string, number>();
  const paymentMap = new Map<string, number>();

  for (let i = 0; i < n; i++) {
    const entry = entries[i];

    const phone = normalizePhone(entry.phoneNumber);
    if (phone) {
      if (phoneMap.has(phone)) {
        uf.union(i, phoneMap.get(phone)!);
      } else {
        phoneMap.set(phone, i);
      }
    }

    const device = normalizeIdentifier(entry.deviceId);
    if (device) {
      if (deviceMap.has(device)) {
        uf.union(i, deviceMap.get(device)!);
      } else {
        deviceMap.set(device, i);
      }
    }

    const payment = normalizeIdentifier(entry.paymentAccount);
    if (payment) {
      if (paymentMap.has(payment)) {
        uf.union(i, paymentMap.get(payment)!);
      } else {
        paymentMap.set(payment, i);
      }
    }
  }

  // Aggregate entries by their disjoint-set root
  const groupsByRoot = new Map<number, TicketQueueEntry[]>();
  for (let i = 0; i < n; i++) {
    const root = uf.find(i);
    let list = groupsByRoot.get(root);
    if (!list) {
      list = [];
      groupsByRoot.set(root, list);
    }
    list.push(entries[i]);
  }

  const fanGroups: FanGroup[] = [];

  for (const groupEntries of groupsByRoot.values()) {
    // Generate explainable connection reasons
    const connectionReasons: string[] = [];
    if (groupEntries.length > 1) {
      const phones = new Set<string>();
      const devices = new Set<string>();
      const payments = new Set<string>();

      for (const e of groupEntries) {
        const p = normalizePhone(e.phoneNumber);
        if (p) phones.add(p);
        const d = normalizeIdentifier(e.deviceId);
        if (d) devices.add(d);
        const pm = normalizeIdentifier(e.paymentAccount);
        if (pm) payments.add(pm);
      }

      if (phones.size > 0) {
        connectionReasons.push(`Linked by phone (${Array.from(phones).join(', ')})`);
      }
      if (devices.size > 0) {
        connectionReasons.push(`Linked by device ID (${Array.from(devices).join(', ')})`);
      }
      if (payments.size > 0) {
        connectionReasons.push(`Linked by payment account (${Array.from(payments).join(', ')})`);
      }
    } else {
      connectionReasons.push('Single independent account (no shared identifiers)');
    }

    // Anti-Sybil rule: find the highest recent upgrades in this fan group to prevent penalty evasion
    let maxGroupUpgrades = 0;
    for (const e of groupEntries) {
      if ((e.upgradesLast30Days ?? 0) > maxGroupUpgrades) {
        maxGroupUpgrades = e.upgradesLast30Days ?? 0;
      }
    }

    // Rank all entries within this group to choose the representative
    const rankedGroupEntries: RankedEntry[] = groupEntries.map((e) => {
      const { score, reasons } = calculateScore(e, now, options, maxGroupUpgrades);
      return { entry: e, score, reasons };
    });

    rankedGroupEntries.sort(compareRankedEntries);
    const representative = rankedGroupEntries.length > 0 ? rankedGroupEntries[0] : null;

    // Deterministic group ID based on alphabetically earliest entry ID
    const minId = groupEntries
      .map((e) => e.id)
      .sort((a, b) => a.localeCompare(b))[0];

    fanGroups.push({
      id: `group-${minId}`,
      entries: groupEntries,
      representative,
      connectionReasons,
    });
  }

  // Deterministic sorting of fan groups
  fanGroups.sort((a, b) => a.id.localeCompare(b.id));

  return fanGroups;
}
