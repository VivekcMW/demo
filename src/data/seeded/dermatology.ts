// Dermatology & Cosmetology - Seeded Dashboard Data

export const dermatologyDashboardData = {
  todayStats: {
    opdPatients: 48,
    procedures: 16,
    cosmeticConsults: 12,
    biopsies: 4,
    followUps: 18,
    revenue: 185000,
  },

  procedureQueue: [
    { id: "P1", name: "Sharma R.", procedure: "Laser Hair Removal", area: "Face", time: "10:00", status: "completed" },
    { id: "P2", name: "Kumar V.", procedure: "Chemical Peel", area: "Face", time: "10:30", status: "in-progress" },
    { id: "P3", name: "Patel M.", procedure: "Botox", area: "Forehead", time: "11:00", status: "waiting" },
    { id: "P4", name: "Singh A.", procedure: "Mole Excision", area: "Back", time: "11:30", status: "waiting" },
    { id: "P5", name: "Gupta S.", procedure: "PRP Hair", area: "Scalp", time: "12:00", status: "waiting" },
  ],

  skinConditions: {
    acne: { total: 892, severe: 124, moderate: 456, mild: 312 },
    psoriasis: { total: 234, plaque: 186, guttate: 32, pustular: 16 },
    vitiligo: { total: 156, stable: 98, progressive: 58 },
    eczema: { total: 423, atopic: 312, contact: 111 },
  },

  weeklyTrend: [
    { day: "Mon", value: 52, secondary: 18 },
    { day: "Tue", value: 48, secondary: 16 },
    { day: "Wed", value: 56, secondary: 22 },
    { day: "Thu", value: 44, secondary: 14 },
    { day: "Fri", value: 58, secondary: 24 },
    { day: "Sat", value: 38, secondary: 12 },
    { day: "Sun", value: 12, secondary: 4 },
  ],

  cosmeticServices: {
    laser: 124,
    botox: 86,
    fillers: 52,
    peels: 98,
    prp: 64,
  },
};

export const dermatologyTemplates = [
  "Skin examination form",
  "Cosmetic consent forms",
  "Laser safety checklist",
  "Biopsy requisition",
  "Phototherapy log",
  "Acne severity scale",
  "PASI scoring (psoriasis)",
  "Vitiligo assessment",
];
