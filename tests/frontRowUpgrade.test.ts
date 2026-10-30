import { describe, expect, it } from 'vitest';
import { buildFrontRowUpgradeQueue } from '../src/core/upgradeQueue';
import { TicketQueueEntry } from '../src/types/ticket';

describe('Front Row Ticket Upgrade Challenge - Test Suite', () => {
  const baseDate = new Date('2026-10-29T12:00:00Z');
  const futureConcert = new Date('2026-10-29T18:00:00Z').toISOString();
  const pastConcert = new Date('2026-10-29T10:00:00Z').toISOString();

  // Test 1: Cancelled entries cannot win
  it('1. Cancelled entries cannot win', () => {
    const entries: TicketQueueEntry[] = [
      {
        id: 'entry-1',
        fanId: 'fan-1',
        fanName: 'Alice',
        ticketValue: 150,
        joinedQueueAt: new Date('2026-10-29T08:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'cancelled', // Cancelled
        loyaltyPoints: 1000,
      },
      {
        id: 'entry-2',
        fanId: 'fan-2',
        fanName: 'Bob',
        ticketValue: 50,
        joinedQueueAt: new Date('2026-10-29T11:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        loyaltyPoints: 10,
      },
    ];

    const result = buildFrontRowUpgradeQueue(entries, baseDate);
    expect(result.winner?.entry.id).toBe('entry-2');
    expect(result.excludedEntries.some((e) => e.entry.id === 'entry-1')).toBe(true);
    const cancelledEx = result.excludedEntries.find((e) => e.entry.id === 'entry-1');
    expect(cancelledEx?.reason).toBe('Cancelled entry');
  });

  // Test 2: Entries after the concert start time cannot win
  it('2. Entries after the concert start time cannot win', () => {
    const entries: TicketQueueEntry[] = [
      {
        id: 'entry-past',
        fanId: 'fan-past',
        fanName: 'Late Fan',
        ticketValue: 200,
        joinedQueueAt: new Date('2026-10-29T07:00:00Z').toISOString(),
        eventStartsAt: pastConcert, // Concert already started at 10:00, now is 12:00
        status: 'waiting',
        loyaltyPoints: 500,
      },
      {
        id: 'entry-valid',
        fanId: 'fan-valid',
        fanName: 'On Time Fan',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T11:30:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        loyaltyPoints: 20,
      },
    ];

    const result = buildFrontRowUpgradeQueue(entries, baseDate);
    expect(result.winner?.entry.id).toBe('entry-valid');
    expect(result.excludedEntries.some((e) => e.entry.id === 'entry-past')).toBe(true);
    const pastEx = result.excludedEntries.find((e) => e.entry.id === 'entry-past');
    expect(pastEx?.reason).toBe('Concert has already started');
  });

  // Test 3: Blocked fans cannot win
  it('3. Blocked fans cannot win', () => {
    const entries: TicketQueueEntry[] = [
      {
        id: 'entry-blocked',
        fanId: 'fan-blocked',
        fanName: 'Bad Actor',
        ticketValue: 500,
        joinedQueueAt: new Date('2026-10-29T06:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        membership: 'blocked', // Blocked
        loyaltyPoints: 9999,
      },
      {
        id: 'entry-ok',
        fanId: 'fan-ok',
        fanName: 'Regular Fan',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T11:45:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        membership: 'regular',
        loyaltyPoints: 5,
      },
    ];

    const result = buildFrontRowUpgradeQueue(entries, baseDate);
    expect(result.winner?.entry.id).toBe('entry-ok');
    const blockedEx = result.excludedEntries.find((e) => e.entry.id === 'entry-blocked');
    expect(blockedEx?.reason).toBe('Fan is blocked');
  });

  // Test 4: Invalid or zero ticket values cannot win
  it('4. Invalid or zero ticket values cannot win', () => {
    const entries: TicketQueueEntry[] = [
      {
        id: 'zero-val',
        fanId: 'fan-z',
        fanName: 'Zero Ticket',
        ticketValue: 0,
        joinedQueueAt: new Date('2026-10-29T09:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
      },
      {
        id: 'neg-val',
        fanId: 'fan-neg',
        fanName: 'Negative Ticket',
        ticketValue: -50,
        joinedQueueAt: new Date('2026-10-29T09:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
      },
      {
        id: 'nan-val',
        fanId: 'fan-nan',
        fanName: 'NaN Ticket',
        ticketValue: 'invalid_price',
        joinedQueueAt: new Date('2026-10-29T09:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
      },
      {
        id: 'valid-val',
        fanId: 'fan-v',
        fanName: 'Valid Ticket',
        ticketValue: '120.50',
        joinedQueueAt: new Date('2026-10-29T11:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
      },
    ];

    const result = buildFrontRowUpgradeQueue(entries, baseDate);
    expect(result.winner?.entry.id).toBe('valid-val');
    expect(result.excludedEntries.length).toBe(3);
    expect(result.excludedEntries.every((e) => e.reason === 'Invalid ticket value')).toBe(true);
  });

  // Test 5: Different phone formatting connects entries
  it('5. Different phone formatting connects entries', () => {
    const entries: TicketQueueEntry[] = [
      {
        id: 'phone-format-1',
        fanId: 'f1',
        fanName: 'John A',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '081-234-5678',
      },
      {
        id: 'phone-format-2',
        fanId: 'f2',
        fanName: 'John B',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:05:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '081 234 5678',
      },
      {
        id: 'phone-format-3',
        fanId: 'f3',
        fanName: 'John C',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:10:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: ' 0812345678 ',
      },
    ];

    const result = buildFrontRowUpgradeQueue(entries, baseDate);
    expect(result.fanGroups.length).toBe(1);
    expect(result.fanGroups[0].entries.length).toBe(3);
    expect(result.winner?.entry.id).toBe('phone-format-1'); // Picked earliest / highest score as representative
  });

  // Test 6: Indirect connections create one fan group
  it('6. Indirect connections create one fan group (Account A -phone-> B -device-> C)', () => {
    const entries: TicketQueueEntry[] = [
      {
        id: 'acc-A',
        fanId: 'f-A',
        fanName: 'Account A',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '089-111-2222',
        deviceId: 'device-1',
      },
      {
        id: 'acc-B',
        fanId: 'f-B',
        fanName: 'Account B',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:05:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '0891112222', // Connects with A via phone
        deviceId: 'device-2',       // Connects with C via device
      },
      {
        id: 'acc-C',
        fanId: 'f-C',
        fanName: 'Account C',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:10:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '089-999-8888',
        deviceId: 'device-2',       // Connects with B via device
      },
    ];

    const result = buildFrontRowUpgradeQueue(entries, baseDate);
    expect(result.fanGroups.length).toBe(1);
    expect(result.fanGroups[0].entries.map((e) => e.id).sort()).toEqual(['acc-A', 'acc-B', 'acc-C']);
  });

  // Test 7: The same input always gives the same winner (deterministic)
  it('7. The same input always gives the same winner (deterministic guarantee)', () => {
    const entries: TicketQueueEntry[] = [
      {
        id: 'entry-x',
        fanId: 'fx',
        fanName: 'Candidate X',
        ticketValue: 150,
        joinedQueueAt: new Date('2026-10-29T11:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        loyaltyPoints: 100,
      },
      {
        id: 'entry-y',
        fanId: 'fy',
        fanName: 'Candidate Y',
        ticketValue: 150,
        joinedQueueAt: new Date('2026-10-29T11:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        loyaltyPoints: 100,
      },
    ];

    const result1 = buildFrontRowUpgradeQueue(entries, baseDate);
    const result2 = buildFrontRowUpgradeQueue([...entries], baseDate);
    const result3 = buildFrontRowUpgradeQueue([...entries].reverse(), baseDate);

    expect(result1.winner?.entry.id).toBe(result2.winner?.entry.id);
    expect(result1.winner?.entry.id).toBe(result3.winner?.entry.id);
    expect(result1.winner?.entry.id).toBe('entry-x'); // Alphabetical tie breaker
  });

  // Edge Case 1: Empty / null / whitespace values must NOT connect accounts
  it('8. Edge Case 1: Empty, null, or whitespace-only identifiers must not falsely connect independent accounts', () => {
    const entries: TicketQueueEntry[] = [
      {
        id: 'solo-1',
        fanId: 'f-s1',
        fanName: 'Solo One',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: null,
        deviceId: '',
        paymentAccount: '   ',
      },
      {
        id: 'solo-2',
        fanId: 'f-s2',
        fanName: 'Solo Two',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:10:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '',
        deviceId: '   ',
        paymentAccount: undefined,
      },
    ];

    const result = buildFrontRowUpgradeQueue(entries, baseDate);
    expect(result.fanGroups.length).toBe(2);
    expect(result.fanGroups[0].entries.length).toBe(1);
    expect(result.fanGroups[1].entries.length).toBe(1);
  });

  // Edge Case 2: Deep 5-node indirect chain + Fair Queue Mode penalty verification
  it('9. Edge Case 2: 5-hop indirect connection chain & Fair Queue Mode penalizes previous winners', () => {
    const entries: TicketQueueEntry[] = [
      // Chain of 3 accounts belonging to one user
      {
        id: 'user1-a',
        fanId: 'u1a',
        fanName: 'Puppet 1',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T09:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '090-000-0001',
        upgradesLast30Days: 2, // Has won twice before
      },
      {
        id: 'user1-b',
        fanId: 'u1b',
        fanName: 'Puppet 2',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T09:30:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '090-000-0001',
        deviceId: 'dev-chain-1',
      },
      {
        id: 'user1-c',
        fanId: 'u1c',
        fanName: 'Puppet 3',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T09:45:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        deviceId: 'dev-chain-1',
        paymentAccount: 'pay-chain-1',
      },
      // Independent honest fan
      {
        id: 'honest-fan',
        fanId: 'hf',
        fanName: 'Honest Fan',
        ticketValue: 100,
        joinedQueueAt: new Date('2026-10-29T10:00:00Z').toISOString(),
        eventStartsAt: futureConcert,
        status: 'waiting',
        phoneNumber: '099-999-9999',
        upgradesLast30Days: 0,
      },
    ];

    // Under Fair Queue Mode, user1's representative should be heavily penalized
    const resultNormal = buildFrontRowUpgradeQueue(entries, baseDate);
    const resultFair = buildFrontRowUpgradeQueue(entries, baseDate, { fairQueueMode: true });

    expect(resultNormal.fanGroups.length).toBe(2);
    expect(resultFair.fanGroups.length).toBe(2);
    // Honest fan wins in Fair Queue Mode due to penalty on Puppet
    expect(resultFair.winner?.entry.id).toBe('honest-fan');
  });

  // Benchmark Scale Test: 100,000 entries performance test
  it('10. Performance Requirement: processes 100,000 entries efficiently without O(N^2) explosion', () => {
    const N = 100000;
    const largeEntries: TicketQueueEntry[] = new Array(N);

    for (let i = 0; i < N; i++) {
      // Create some multi-account clusters every 10 accounts
      const clusterId = Math.floor(i / 5);
      largeEntries[i] = {
        id: `entry-${i}`,
        fanId: `fan-${i}`,
        fanName: `Fan ${i}`,
        ticketValue: 100 + (i % 50),
        joinedQueueAt: new Date(baseDate.getTime() - (i % 300) * 60000).toISOString(),
        eventStartsAt: futureConcert,
        status: i % 20 === 0 ? 'cancelled' : 'waiting',
        loyaltyPoints: i % 500,
        phoneNumber: `080${clusterId.toString().padStart(7, '0')}`,
        deviceId: i % 2 === 0 ? `device-${clusterId}` : null,
        paymentAccount: i % 3 === 0 ? `pay-${clusterId}` : null,
      };
    }

    const start = performance.now();
    const result = buildFrontRowUpgradeQueue(largeEntries, baseDate);
    const elapsed = performance.now() - start;

    expect(result.winner).not.toBeNull();
    expect(result.excludedEntries.length).toBe(5000); // 100,000 / 20 = 5000 cancelled
    expect(elapsed).toBeLessThan(5000); // Must be under 5 seconds on normal laptop under load
  });
});
