// Nephrology - Seeded Dashboard Data

export const nephrologyDashboardData = {
  todayStats: {
    opdPatients: 32,
    dialysisSessions: 48,
    transplantClinic: 8,
    biopsies: 2,
    akiConsults: 4,
    revenue: 385000,
  },

  dialysisUnit: [
    { id: "D1", name: "Sharma R.", shift: "Morning", machine: "M-1", access: "AVF", status: "running" },
    { id: "D2", name: "Kumar V.", shift: "Morning", machine: "M-2", access: "Catheter", status: "running" },
    { id: "D3", name: "Patel M.", shift: "Morning", machine: "M-3", access: "AVF", status: "completed" },
    { id: "D4", name: "Singh A.", shift: "Afternoon", machine: "M-1", access: "AVG", status: "scheduled" },
  ],

  ckdRegistry: {
    stage3: { total: 456, a: 234, b: 222 },
    stage4: { total: 234, onConservative: 186, preDialysis: 48 },
    stage5: { total: 312, onHD: 234, onPD: 42, preTransplant: 36 },
  },

  transplantFollowUp: {
    total: 186,
    within1Year: 34,
    stable: 142,
    rejection: 6,
    graftLoss: 4,
  },

  weeklyTrend: [
    { day: "Mon", value: 52, secondary: 6 },
    { day: "Tue", value: 48, secondary: 4 },
    { day: "Wed", value: 52, secondary: 8 },
    { day: "Thu", value: 48, secondary: 6 },
    { day: "Fri", value: 52, secondary: 4 },
    { day: "Sat", value: 48, secondary: 2 },
    { day: "Sun", value: 24, secondary: 0 },
  ],

  akiCases: {
    active: 8,
    onCRRT: 2,
    recovered: 4,
    transitionToHD: 2,
  },
};

export const nephrologyTemplates = [
  "CKD staging form",
  "Dialysis prescription",
  "Access assessment",
  "Transplant workup",
  "Kidney biopsy consent",
  "AKI monitoring sheet",
  "CRRT parameters",
  "Post-transplant protocol",
];
