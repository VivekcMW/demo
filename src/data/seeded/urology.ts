// Urology - Seeded Dashboard Data

export const urologyDashboardData = {
  todayStats: {
    opdPatients: 36,
    surgeries: 6,
    cystoscopies: 8,
    dialysisReview: 4,
    followUps: 14,
    revenue: 245000,
  },

  surgeryQueue: [
    { id: "S1", name: "Sharma R.", procedure: "TURP", time: "08:00", status: "completed" },
    { id: "S2", name: "Kumar V.", procedure: "PCNL", time: "10:00", status: "in-progress" },
    { id: "S3", name: "Patel M.", procedure: "Cystoscopy", time: "11:30", status: "waiting" },
    { id: "S4", name: "Singh A.", procedure: "URS", time: "12:30", status: "waiting" },
  ],

  stoneClinic: {
    totalPatients: 456,
    renal: 234,
    ureteric: 156,
    bladder: 66,
    stentInSitu: 42,
  },

  prostateRegistry: {
    bph: { total: 624, onMedication: 456, postTURP: 168 },
    cancer: { total: 89, activeSurveillance: 34, postSurgery: 42, onHormones: 13 },
  },

  weeklyTrend: [
    { day: "Mon", value: 38, secondary: 8 },
    { day: "Tue", value: 42, secondary: 10 },
    { day: "Wed", value: 36, secondary: 6 },
    { day: "Thu", value: 44, secondary: 12 },
    { day: "Fri", value: 40, secondary: 8 },
    { day: "Sat", value: 24, secondary: 4 },
    { day: "Sun", value: 8, secondary: 2 },
  ],

  urodynamics: {
    scheduled: 6,
    completed: 4,
    pending: 2,
  },
};

export const urologyTemplates = [
  "Stone assessment form",
  "IPSS questionnaire",
  "Urodynamic study report",
  "Cystoscopy findings",
  "TURP consent form",
  "Post-op voiding diary",
  "PSA monitoring log",
  "Stent removal tracking",
];
