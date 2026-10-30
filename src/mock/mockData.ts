import { TicketQueueEntry } from '../types/ticket';

export const INITIAL_MOCK_ENTRIES: TicketQueueEntry[] = [
  // Cluster 1: Multi-account fan (Sybil cluster via indirect connection: Phone -> Device)
  {
    id: 'entry-101',
    fanId: 'fan-alex-1',
    fanName: 'Alex Rivers (Phone)',
    ticketValue: 120,
    joinedQueueAt: new Date(Date.now() - 150 * 60000).toISOString(), // 2.5 hours ago
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(), // starts in 3 hours
    status: 'waiting',
    loyaltyPoints: 350,
    upgradesLast30Days: 0,
    membership: 'vip',
    phoneNumber: '081-999-8888',
    deviceId: 'iphone-pro-14',
    paymentAccount: 'alex.pay@bank.com',
  },
  {
    id: 'entry-102',
    fanId: 'fan-alex-2',
    fanName: 'Alex Rivers (Tablet)',
    ticketValue: 120,
    joinedQueueAt: new Date(Date.now() - 130 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'waiting',
    loyaltyPoints: 400,
    upgradesLast30Days: 1, // Has 1 upgrade
    membership: 'regular',
    phoneNumber: ' 0819998888 ', // Connected to 101 via phone
    deviceId: 'ipad-air-m2',     // Connects to 103 via device
    paymentAccount: 'secondary.card@bank.com',
  },
  {
    id: 'entry-103',
    fanId: 'fan-alex-3',
    fanName: 'Alex Rivers (Work Laptop)',
    ticketValue: 90,
    joinedQueueAt: new Date(Date.now() - 90 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'waiting',
    loyaltyPoints: 100,
    upgradesLast30Days: 0,
    membership: 'regular',
    phoneNumber: '085-000-1111',
    deviceId: 'ipad-air-m2',     // Indirectly connects 103 to 101 through 102!
    paymentAccount: 'work.corp@bank.com',
  },

  // Cluster 2: Legitimate loyal high-tier VIP fan
  {
    id: 'entry-201',
    fanId: 'fan-sarah',
    fanName: 'Sarah Jenkins',
    ticketValue: 250,
    joinedQueueAt: new Date(Date.now() - 110 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'waiting',
    loyaltyPoints: 1200,
    upgradesLast30Days: 0,
    membership: 'vip',
    phoneNumber: '082-333-4455',
    deviceId: 'pixel-9-pro',
    paymentAccount: 'sarah.j@gmail.com',
  },

  // Cluster 3: Early Bird fan who waited very long
  {
    id: 'entry-301',
    fanId: 'fan-michael',
    fanName: 'Michael Chang',
    ticketValue: 150,
    joinedQueueAt: new Date(Date.now() - 210 * 60000).toISOString(), // 3.5 hours ago!
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'waiting',
    loyaltyPoints: 450,
    upgradesLast30Days: 0,
    membership: 'regular',
    phoneNumber: '086-777-6655',
    deviceId: 'galaxy-s24',
    paymentAccount: 'm.chang@outlook.com',
  },

  // Cluster 4: Frequent Winner (testing Fair Queue penalty)
  {
    id: 'entry-401',
    fanId: 'fan-david',
    fanName: 'David Miller',
    ticketValue: 300,
    joinedQueueAt: new Date(Date.now() - 160 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'waiting',
    loyaltyPoints: 950,
    upgradesLast30Days: 3, // Won 3 times recently
    membership: 'vip',
    phoneNumber: '087-123-9988',
    deviceId: 'macbook-pro-m3',
    paymentAccount: 'david.m@apple.com',
  },

  // Cluster 5: Casual newcomer
  {
    id: 'entry-501',
    fanId: 'fan-emily',
    fanName: 'Emily Watson',
    ticketValue: 80,
    joinedQueueAt: new Date(Date.now() - 30 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'waiting',
    loyaltyPoints: 50,
    upgradesLast30Days: 0,
    membership: 'regular',
    phoneNumber: '084-555-1234',
    deviceId: 'oneplus-12',
    paymentAccount: 'emily.w@icloud.com',
  },

  // Excluded entries
  {
    id: 'entry-ex-cancelled',
    fanId: 'fan-bad-1',
    fanName: 'Tom Cancelled',
    ticketValue: 150,
    joinedQueueAt: new Date(Date.now() - 180 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'cancelled',
    loyaltyPoints: 800,
  },
  {
    id: 'entry-ex-upgraded',
    fanId: 'fan-bad-2',
    fanName: 'Chloe Already Won',
    ticketValue: 200,
    joinedQueueAt: new Date(Date.now() - 170 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'upgraded',
    loyaltyPoints: 600,
  },
  {
    id: 'entry-ex-blocked',
    fanId: 'fan-bad-3',
    fanName: 'Ethan Blocked Fan',
    ticketValue: 400,
    joinedQueueAt: new Date(Date.now() - 200 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'waiting',
    membership: 'blocked',
    loyaltyPoints: 5000,
  },
  {
    id: 'entry-ex-past',
    fanId: 'fan-bad-4',
    fanName: 'Liam Late Concert',
    ticketValue: 120,
    joinedQueueAt: new Date(Date.now() - 300 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() - 30 * 60000).toISOString(), // Concert started 30 mins ago
    status: 'waiting',
    loyaltyPoints: 300,
  },
  {
    id: 'entry-ex-zero',
    fanId: 'fan-bad-5',
    fanName: 'Zoe Zero Price',
    ticketValue: 0,
    joinedQueueAt: new Date(Date.now() - 60 * 60000).toISOString(),
    eventStartsAt: new Date(Date.now() + 180 * 60000).toISOString(),
    status: 'waiting',
  },
];
