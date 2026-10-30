import { ModeOptions, RankedEntry, TicketQueueEntry } from '../types/ticket';
import { parseTicketValue } from './filter';

export function calculateScore(
  entry: TicketQueueEntry,
  now: Date,
  options?: ModeOptions,
  effectiveUpgradesOverride?: number
): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  // 1. Wait Time
  const joinedTime = new Date(entry.joinedQueueAt).getTime();
  const waitMs = isNaN(joinedTime) ? 0 : Math.max(0, now.getTime() - joinedTime);
  const waitMinutes = Math.floor(waitMs / (1000 * 60));
  const waitHours = Math.floor(waitMinutes / 60);

  const waitWeightPerMin = options?.rushHour ? 1.5 : 0.5;
  const waitPoints = Math.round(waitMinutes * waitWeightPerMin * 10) / 10;
  score += waitPoints;
  reasons.push(
    `+${waitPoints} pts: Waited ${waitHours > 0 ? `${waitHours}h ` : ''}${waitMinutes % 60}m${
      options?.rushHour ? ' (Rush Hour 3x boost)' : ''
    }`
  );

  // Fairness bonus for fans waiting more than 2 hours
  if (waitMinutes >= 120) {
    const fairnessBonus = 20;
    score += fairnessBonus;
    reasons.push(`+${fairnessBonus} pts: Long-wait fairness bonus (≥ 2 hours)`);
  }

  // 2. Loyalty Points
  const loyalty = entry.loyaltyPoints ?? 0;
  if (loyalty > 0) {
    const loyaltyPts = Math.round(loyalty * 0.1 * 10) / 10;
    score += loyaltyPts;
    reasons.push(`+${loyaltyPts} pts: Loyalty (${loyalty} pts)`);
  }

  // 3. VIP Membership
  const isVip = entry.membership === 'vip';
  if (isVip) {
    const vipBonus = options?.vipHour ? 60 : 25;
    score += vipBonus;
    reasons.push(
      `+${vipBonus} pts: VIP Member${options?.vipHour ? ' (VIP Hour bonus)' : ''}`
    );
  }

  // 4. Ticket Value
  const ticketVal = parseTicketValue(entry.ticketValue) ?? 0;
  if (ticketVal > 0) {
    const ticketPts = Math.round(ticketVal * 0.05 * 10) / 10;
    score += ticketPts;
    reasons.push(`+${ticketPts} pts: Ticket Value ($${ticketVal})`);
  }

  // 5. Recent Upgrades Penalty (Last 30 days)
  // Anti-Sybil rule: Evasion prevention using maximum upgrades among linked accounts if provided
  const recentUpgrades = effectiveUpgradesOverride !== undefined 
    ? effectiveUpgradesOverride 
    : (entry.upgradesLast30Days ?? 0);

  if (recentUpgrades > 0) {
    const penaltyPerUpgrade = options?.fairQueueMode ? 50 : 20;
    const penalty = recentUpgrades * penaltyPerUpgrade;
    score -= penalty;
    const isInherited = effectiveUpgradesOverride !== undefined && effectiveUpgradesOverride > (entry.upgradesLast30Days ?? 0);
    reasons.push(
      `-${penalty} pts: Penalty for ${recentUpgrades} recent upgrade${
        recentUpgrades > 1 ? 's' : ''
      }${isInherited ? ' (inherited from linked fan group)' : ''}${
        options?.fairQueueMode ? ' (Fair Queue Mode elevated penalty)' : ''
      }`
    );
  }

  const finalScore = Math.round(score * 10) / 10;
  return { score: finalScore, reasons };
}

/**
 * Deterministic tie-breaking comparator:
 * 1. Higher score
 * 2. Earliest joinedQueueAt (longer wait)
 * 3. Higher loyalty points
 * 4. Higher ticket value
 * 5. Lexicographical ID (guarantees determinism)
 */
export function compareRankedEntries(a: RankedEntry, b: RankedEntry): number {
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  const timeA = new Date(a.entry.joinedQueueAt).getTime();
  const timeB = new Date(b.entry.joinedQueueAt).getTime();
  if (timeA !== timeB) {
    return timeA - timeB; // Earliest date first
  }

  const loyaltyA = a.entry.loyaltyPoints ?? 0;
  const loyaltyB = b.entry.loyaltyPoints ?? 0;
  if (loyaltyB !== loyaltyA) {
    return loyaltyB - loyaltyA;
  }

  const ticketA = parseTicketValue(a.entry.ticketValue) ?? 0;
  const ticketB = parseTicketValue(b.entry.ticketValue) ?? 0;
  if (ticketB !== ticketA) {
    return ticketB - ticketA;
  }

  return a.entry.id.localeCompare(b.entry.id);
}
