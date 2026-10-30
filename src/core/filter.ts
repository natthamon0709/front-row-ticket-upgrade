import { ExcludedEntry, TicketQueueEntry } from '../types/ticket';

export function parseTicketValue(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') {
    return isNaN(value) ? null : value;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') return null;
    const num = Number(trimmed);
    return isNaN(num) ? null : num;
  }
  return null;
}

export function checkExclusion(entry: TicketQueueEntry, now: Date): string | null {
  // 1. Cancelled entry
  if (entry.status === 'cancelled') {
    return 'Cancelled entry';
  }

  // 2. Already upgraded
  if (entry.status === 'upgraded') {
    return 'Already upgraded';
  }

  // 3. Fan is blocked
  if (entry.membership === 'blocked') {
    return 'Fan is blocked';
  }

  // 4. Concert has already started
  const eventStart = new Date(entry.eventStartsAt).getTime();
  if (!isNaN(eventStart) && now.getTime() >= eventStart) {
    return 'Concert has already started';
  }

  // 5. Ticket value is invalid, zero, or negative
  const parsedValue = parseTicketValue(entry.ticketValue);
  if (parsedValue === null || parsedValue <= 0) {
    return 'Invalid ticket value';
  }

  return null;
}

export function partitionEntries(
  entries: TicketQueueEntry[],
  now: Date
): { validEntries: TicketQueueEntry[]; excludedEntries: ExcludedEntry[] } {
  const validEntries: TicketQueueEntry[] = [];
  const excludedEntries: ExcludedEntry[] = [];

  for (const entry of entries) {
    const reason = checkExclusion(entry, now);
    if (reason) {
      excludedEntries.push({ entry, reason });
    } else {
      validEntries.push(entry);
    }
  }

  return { validEntries, excludedEntries };
}
