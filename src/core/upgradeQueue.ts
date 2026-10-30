import { FrontRowUpgradeResult, ModeOptions, RankedEntry, TicketQueueEntry } from '../types/ticket';
import { partitionEntries } from './filter';
import { groupFanEntries } from './grouper';
import { compareRankedEntries } from './scorer';

/**
 * Builds the Front Row Upgrade Queue according to the specification.
 * 
 * Required Steps:
 * 1. Remove entries that cannot receive an upgrade.
 * 2. Find accounts that belong to the same fan group.
 * 3. Choose one representative entry from each fan group.
 * 4. Choose one winner from all representatives.
 * 5. Return reasons that explain why the winner was selected.
 * 
 * Characteristics:
 * - Deterministic: Same input + same time = same winner.
 * - Non-mutating: Original input array is never altered.
 * - High performance: Scales smoothly to 100k-500k entries with O(N * alpha(N)) complexity.
 */
export function buildFrontRowUpgradeQueue(
  entries: TicketQueueEntry[],
  now: Date,
  options?: ModeOptions
): FrontRowUpgradeResult {
  // Step 1: Remove entries that cannot receive an upgrade
  const { validEntries, excludedEntries } = partitionEntries(entries, now);

  // Step 2 & 3: Find accounts in the same fan group and choose one representative per group
  const fanGroups = groupFanEntries(validEntries, now, options);

  // Step 4: Collect all representatives and choose the winner
  const representatives: RankedEntry[] = [];
  for (const group of fanGroups) {
    if (group.representative) {
      representatives.push(group.representative);
    }
  }

  // Deterministic ranking among representatives
  representatives.sort(compareRankedEntries);

  const winner = representatives.length > 0 ? representatives[0] : null;

  // Step 5: The winner object contains `reasons: string[]` explaining why it was selected.

  return {
    winner,
    fanGroups,
    excludedEntries,
  };
}
