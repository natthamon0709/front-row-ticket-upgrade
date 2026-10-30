export type Language = 'th' | 'en';

export const translations = {
  th: {
    appTitle: 'FRONT ROW UPGRADE',
    appSubtitle: 'ระบบคัดเลือกสิทธิ์อัปเกรดตั๋วแถวหน้าคอนเสิร์ต & ป้องกันบอทปั๊มไอดี',
    liveStatus: 'เปิดรับคิวแบบสด',
    concertName: 'WORLD TOUR 2026: THE FRONT ROW EXPERIENCE',
    artist: 'NEO CONCERT ARENA &bull; LIVE IN BANGKOK',
    venue: 'ราชมังคลากีฬาสถาน กรุงเทพฯ (Rajamangala Stadium)',
    eventDate: '29 ตุลาคม 2026 • ประตูเปิด 18:00 น.',
    seatCategory: 'สิทธิ์อัปเกรด: โซนหน้าเวที VVIP Standing / Seated Zone A',
    
    // View Switcher Tabs
    tabWaitingRoom: 'หน้าจอรอลุ้นตั๋ว (Virtual Waiting Room)',
    tabDashboard: 'กระดานคัดเลือก & ตรวจสอบระบบ (System Console)',
    tabFanPortal: 'มุมมองตั๋วแฟนเพลง (Fan Pass View)',
    
    // Time Controls
    simulatedTime: 'เวลาจำลองในระบบ',
    elapsed: 'เวลาผ่านไปแล้ว',
    advance5m: '+5 นาที',
    advance15m: '+15 นาที',
    advance1h: '+1 ชม.',
    resetTime: 'รีเซ็ตเวลา',
    resetData: 'รีเซ็ตข้อมูลทั้งหมด',
    
    // Modes
    priorityModes: 'โหมดปรับแต่งสิทธิ์พิเศษ (Priority Tuning Modes)',
    rushHour: 'Rush Hour (ชั่วโมงเร่งด่วน)',
    rushHourDesc: 'เพิ่มค่าน้ำหนักเวลารอนานขึ้น 3 เท่า สำหรับคนที่มารอนาน',
    vipHour: 'VIP Hour (ชั่วโมง VIP)',
    vipHourDesc: 'มอบแต้มพิเศษให้สมาชิก VIP เพิ่มเป็น +60 แต้ม',
    fairQueue: 'Fair Queue Mode (กระจายโอกาส)',
    fairQueueDesc: 'เพิ่มบทลงโทษคนเพิ่งเคยได้ตั๋วไปเร็วๆ นี้ ให้คนใหม่มีโอกาสลุ้น',
    
    // Winner
    winnerTitle: 'ผู้โชคดีได้รับสิทธิ์อัปเกรดแถวหน้า (Front-Row Selected Winner)',
    noWinner: 'ยังไม่มีผู้ได้รับสิทธิ์ในขณะนี้',
    noWinnerDesc: 'รายการทั้งหมดอาจถูกตัดสิทธิ์ หรือยังไม่มีแฟนเพลงที่ผ่านเกณฑ์',
    selectedWinnerBadge: 'ผู้ชนะเลิศอันดับ 1',
    vipFanBadge: 'สมาชิก VIP',
    totalScore: 'คะแนนรวม',
    pts: 'แต้ม',
    ticketValue: 'มูลค่าตั๋วเดิม',
    loyaltyPoints: 'แต้มสะสม Loyalty',
    joinedQueue: 'เวลาที่เข้าคิว',
    pastUpgrades: 'ประวัติอัปเกรด 30 วัน',
    scoreExplanation: 'รายละเอียดการคิดคะแนน & เหตุผลที่ได้รับการคัดเลือก',
    clickToEdit: 'คลิกเพื่อแก้ไขแต้ม',
    times: 'ครั้ง',
    
    // Candidates
    top3Title: 'ผู้ผ่านเข้ารอบ 3 อันดับแรก (Top 3 Candidates)',
    top3Subtitle: 'ตัวแทนที่ได้คะแนนสูงสุดจากแต่ละกลุ่มแฟนคลับอิสระ',
    gapToFirst: 'ตามหลังอันดับ 1 อยู่เพียง',
    pointsNeedToWin: 'ต้องการอีก {pts} แต้มเพื่อแซงขึ้นที่ 1',
    viewBreakdown: 'ดูการแจกแจงคะแนนอย่างละเอียด',
    hideBreakdown: 'ซ่อนการแจกแจงคะแนน',
    rank: 'อันดับ',
    
    // Groups
    groupsTitle: 'การรวมกลุ่มบัญชี & ป้องกันการปั๊มไอดี (Anti-Sybil Clusters)',
    groupsSubtitle: 'ระบบตรวจจับบัญชีที่เชื่อมโยงกัน (เบอร์โทร, เครื่อง, บัญชีจ่ายเงิน) และให้สิทธิ์ลุ้นเพียง 1 สิทธิ์ต่อกลุ่ม',
    totalGroups: 'จำนวนกลุ่มทั้งหมด',
    filterAllGroups: 'ทั้งหมด',
    filterMultiOnly: 'เฉพาะกลุ่มที่เชื่อมโยงกัน (Multi-Account)',
    filterSingleOnly: 'บัญชีเดี่ยว',
    linkedAccounts: 'บัญชีที่เชื่อมโยงกัน',
    singleAccount: 'บัญชีเดี่ยวทั่วไป',
    containsWinner: '🏆 มีผู้ชนะในกลุ่มนี้',
    representative: 'ตัวแทนกลุ่มที่ดีที่สุด',
    accountsInGroup: 'รายชื่อบัญชีในกลุ่มนี้ (มีสิทธิ์ลุ้นตั๋วเพียงตัวแทน 1 คน):',
    repBadge: 'ตัวแทนกลุ่ม',
    
    // Excluded
    excludedTitle: 'รายการที่ถูกตัดสิทธิ์ (Disqualified Entries)',
    excludedSubtitle: 'คัดออกตามกฎความปลอดภัย สถานะตั๋ว หรือคอนเสิร์ตเริ่มไปแล้ว',
    searchExcluded: 'ค้นหารายการที่ถูกตัดสิทธิ์...',
    colFan: 'ชื่อแฟนเพลง / รหัสคิว',
    colReason: 'เหตุผลที่ถูกตัดสิทธิ์',
    colStatus: 'สถานะ',
    colTicketVal: 'มูลค่าตั๋ว',
    colMembership: 'ระดับสมาชิก',
    noExcludedFound: 'ไม่พบรายการที่ตรงกับการค้นหา',
    
    // Modal
    editPointsTitle: 'แก้ไขแต้มสะสม Loyalty',
    editPointsDesc: 'แต้ม Loyalty ทุกๆ 10 พอยต์ จะช่วยเพิ่มคะแนน +1.0 แต้มในการจัดอันดับ',
    cancel: 'ยกเลิก',
    saveAndRecalc: 'บันทึก & คำนวณใหม่ทันที',
    
    // Fan Portal
    fanPortalTitle: 'บัตรคอนเสิร์ตดิจิทัล & สถานะการเข้าคิวของฉัน',
    fanPortalSubtitle: 'ตรวจสอบลำดับคิว, คะแนนสะสม และสถานะการอัปเกรดตั๋วแถวหน้าแบบเรียลไทม์',
    selectFanLabel: 'เลือกบัญชีแฟนเพลงเพื่อดูสถานะ:',
    fanStatusWon: '🎉 ยินดีด้วย! คุณได้รับสิทธิ์อัปเกรดตั๋วแถวหน้า VVIP เรียบร้อยแล้ว',
    fanStatusWaiting: '⏳ คุณกำลังอยู่ในคิวรอการคัดเลือก',
    fanStatusExcluded: '⚠️ บัตรของคุณไม่ผ่านเกณฑ์การคัดเลือกในรอบนี้',
    yourCurrentRank: 'อันดับปัจจุบันในคิว',
    yourCurrentScore: 'คะแนนรวมของคุณ',
    multiAccountAlert: 'ตรวจพบว่าบัญชีนี้เชื่อมโยงกับอีก {count} บัญชีของคุณ โดยระบบได้เลือกตัวแทนที่ดีที่สุดเป็นตัวแทนกลุ่มแล้ว',
    simulatePointsChange: 'ทดลองเปลี่ยนแต้ม Loyalty เพื่อทดสอบการเลื่อนอันดับ',
    
    // Benchmark
    benchmarkTitle: 'ทดสอบความเร็วระดับแสนคน (Scale Benchmark):',
    benchmarkResult: 'ประมวลผล {count} รายการ สำเร็จใน {time} มิลลิวินาที',
    test10k: 'ทดสอบ 10,000 คน',
    test100k: 'ทดสอบ 100,000 คน',
    testing: 'กำลังประมวลผล...',
    
    // Reasons translation mapping
    reasons: {
      cancelled: 'ตั๋วถูกยกเลิกแล้ว',
      upgraded: 'ได้รับสิทธิ์อัปเกรดไปก่อนหน้านี้แล้ว',
      started: 'คอนเสิร์ตเริ่มการแสดงไปแล้ว',
      blocked: 'บัญชีถูกระงับ (Blocked)',
      invalidTicket: 'มูลค่าตั๋วไม่ถูกต้อง (ต้องมากกว่า 0)',
      singleFan: 'บัญชีเดี่ยวทั่วไป (ไม่มีข้อมูลซ้ำกับใคร)',
      linkedPhone: 'เชื่อมโยงผ่านเบอร์โทรศัพท์เดียวกัน',
      linkedDevice: 'เชื่อมโยงผ่านรหัสเครื่อง (Device ID) เดียวกัน',
      linkedPayment: 'เชื่อมโยงผ่านบัญชีชำระเงินเดียวกัน',
    }
  },
  en: {
    appTitle: 'FRONT ROW UPGRADE',
    appSubtitle: 'Live Concert Front-Row Fair Upgrade & Anti-Sybil Allocator',
    liveStatus: 'Queue Open & Live',
    concertName: 'WORLD TOUR 2026: THE FRONT ROW EXPERIENCE',
    artist: 'NEO CONCERT ARENA &bull; LIVE IN BANGKOK',
    venue: 'Rajamangala National Stadium, Bangkok',
    eventDate: 'October 29, 2026 • Gates Open 18:00',
    seatCategory: 'Upgrade Tier: Front Row VVIP Standing / Seated Zone A',
    
    // View Switcher Tabs
    tabWaitingRoom: 'Virtual Waiting Room (Fan View)',
    tabDashboard: 'System Console (Organizer View)',
    tabFanPortal: 'My Ticket Pass (Fan Portal)',
    
    // Time Controls
    simulatedTime: 'Simulated System Time',
    elapsed: 'time advanced',
    advance5m: '+5 min',
    advance15m: '+15 min',
    advance1h: '+1 hr',
    resetTime: 'Reset Time',
    resetData: 'Reset All Data',
    
    // Modes
    priorityModes: 'Priority Tuning Modes',
    rushHour: 'Rush Hour',
    rushHourDesc: 'Triples waiting time weight (1.5 pts/min). Rewards patient fans.',
    vipHour: 'VIP Hour',
    vipHourDesc: 'Elevated VIP bonus boost from +25 to +60 pts for subscribers.',
    fairQueue: 'Fair Queue Mode',
    fairQueueDesc: 'Heavier penalty (-50 pts) for recent winners. Gives newcomers a fair shot.',
    
    // Winner
    winnerTitle: 'Front-Row Upgrade Selected Winner',
    noWinner: 'No Eligible Winner Available',
    noWinnerDesc: 'All entries may be disqualified or the queue is currently empty.',
    selectedWinnerBadge: 'Selected 1st Place Winner',
    vipFanBadge: 'VIP Member',
    totalScore: 'Total Score',
    pts: 'pts',
    ticketValue: 'Original Ticket',
    loyaltyPoints: 'Loyalty Points',
    joinedQueue: 'Queue Joined Time',
    pastUpgrades: 'Upgrades (Last 30d)',
    scoreExplanation: 'Score Breakdown & Explainable Selection Rationale',
    clickToEdit: 'Click to edit points',
    times: 'time(s)',
    
    // Candidates
    top3Title: 'Top 3 Candidates',
    top3Subtitle: 'Highest ranking representatives from each independent fan group',
    gapToFirst: 'Trailing #1 by only',
    pointsNeedToWin: 'Needs {pts} more points to overtake #1',
    viewBreakdown: 'View detailed score breakdown',
    hideBreakdown: 'Hide score breakdown',
    rank: 'Rank',
    
    // Groups
    groupsTitle: 'Fan Groups & Anti-Sybil Clusters',
    groupsSubtitle: 'Accounts linked directly or indirectly via phone, device, or payment. Only 1 representative competes per group.',
    totalGroups: 'Total Groups',
    filterAllGroups: 'All Groups',
    filterMultiOnly: 'Multi-Account Clusters Only',
    filterSingleOnly: 'Single Accounts',
    linkedAccounts: 'Linked Accounts',
    singleAccount: 'Single Account',
    containsWinner: '🏆 Contains Winner',
    representative: 'Group Representative',
    accountsInGroup: 'Accounts in this group (Only 1 representative receives an upgrade lottery entry):',
    repBadge: 'Representative',
    
    // Excluded
    excludedTitle: 'Disqualified Entries',
    excludedSubtitle: 'Filtered by safety guidelines, cancellation, or concert start time',
    searchExcluded: 'Search disqualified entries...',
    colFan: 'Fan Name / Queue ID',
    colReason: 'Disqualification Reason',
    colStatus: 'Status',
    colTicketVal: 'Ticket Value',
    colMembership: 'Tier',
    noExcludedFound: 'No disqualified entries match your search query.',
    
    // Modal
    editPointsTitle: 'Edit Loyalty Points',
    editPointsDesc: 'Every 10 loyalty points grant +1.0 pt towards the priority ranking score.',
    cancel: 'Cancel',
    saveAndRecalc: 'Save & Recalculate Now',
    
    // Fan Portal
    fanPortalTitle: 'Digital Concert Pass & Live Queue Position',
    fanPortalSubtitle: 'Track your personal queue ranking, loyalty points, and front-row upgrade odds in real-time',
    selectFanLabel: 'Select Fan Profile to Preview:',
    fanStatusWon: '🎉 Congratulations! You were selected for the Front-Row VVIP Upgrade!',
    fanStatusWaiting: '⏳ You are currently waiting in the active upgrade queue',
    fanStatusExcluded: '⚠️ Your ticket entry is disqualified for this selection round',
    yourCurrentRank: 'Your Current Rank',
    yourCurrentScore: 'Your Total Score',
    multiAccountAlert: 'Detected {count} linked accounts under your identity. Your best entry is representing the group.',
    simulatePointsChange: 'Simulate Loyalty Points update to test ranking shift',
    
    // Benchmark
    benchmarkTitle: 'High-Scale Stress Benchmark:',
    benchmarkResult: 'Processed {count} entries in {time} ms',
    test10k: 'Benchmark 10,000',
    test100k: 'Benchmark 100,000',
    testing: 'Processing...',
    
    // Reasons translation mapping
    reasons: {
      cancelled: 'Cancelled entry',
      upgraded: 'Already upgraded',
      started: 'Concert has already started',
      blocked: 'Fan is blocked',
      invalidTicket: 'Invalid ticket value (must be > 0)',
      singleFan: 'Single independent account (no shared identifiers)',
      linkedPhone: 'Linked by phone number',
      linkedDevice: 'Linked by device ID',
      linkedPayment: 'Linked by payment account',
    }
  }
};
