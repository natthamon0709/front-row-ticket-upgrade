export type TicketQueueEntry = {
  id: string;
  fanId: string;
  fanName: string;
  ticketValue: string | number | null;
  joinedQueueAt: string;
  eventStartsAt: string;
  status: "waiting" | "upgraded" | "cancelled";
  loyaltyPoints?: number | null;
  upgradesLast30Days?: number | null;
  membership?: "regular" | "vip" | "blocked";
  phoneNumber?: string | null;
  deviceId?: string | null;
  paymentAccount?: string | null;
};

export type RankedEntry = {
  entry: TicketQueueEntry;
  score: number;
  reasons: string[];
};

export type FanGroup = {
  id: string;
  entries: TicketQueueEntry[];
  representative: RankedEntry | null;
  connectionReasons: string[];
};

export type ExcludedEntry = {
  entry: TicketQueueEntry;
  reason: string;
};

export type FrontRowUpgradeResult = {
  winner: RankedEntry | null;
  fanGroups: FanGroup[];
  excludedEntries: ExcludedEntry[];
};

export type ModeOptions = {
  rushHour?: boolean;      // waiting time matters more
  vipHour?: boolean;       // VIP fans get a small boost
  fairQueueMode?: boolean; // fans with many recent upgrades receive a larger penalty
};
