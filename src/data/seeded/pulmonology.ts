// Pulmonology - Seeded Dashboard Data

export const pulmonologyDashboardData = {
  todayStats: {
    opdPatients: 42,
    pftStudies: 12,
    bronchoscopies: 4,
    sleepStudies: 3,
    icuConsults: 6,
    revenue: 195000,
  },

  pftQueue: [
    { id: "P1", name: "Sharma R.", indication: "COPD assessment", time: "09:00", status: "completed" },
    { id: "P2", name: "Kumar V.", indication: "Asthma follow-up", time: "09:30", status: "completed" },
    { id: "P3", name: "Patel M.", indication: "Pre-op evaluation", time: "10:00", status: "in-progress" },
    { id: "P4", name: "Singh A.", indication: "ILD workup", time: "10:30", status: "waiting" },
  ],

  chronicRegistry: {
    copd: { total: 892, gold1: 234, gold2: 398, gold3: 186, gold4: 74 },
    asthma: { total: 1234, controlled: 856, partiallyControlled: 298, uncontrolled: 80 },
    ild: { total: 156, ipf: 68, sarcoidosis: 42, hypersensitivity: 46 },
    tb: { total: 234, onTreatment: 186, completed: 48 },
  },

  weeklyTrend: [
    { day: "Mon", value: 45, secondary: 14 },
    { day: "Tue", value: 42, secondary: 12 },
    { day: "Wed", value: 48, secondary: 16 },
    { day: "Thu", value: 44, secondary: 14 },
    { day: "Fri", value: 46, secondary: 15 },
    { day: "Sat", value: 28, secondary: 8 },
    { day: "Sun", value: 12, secondary: 4 },
  ],

  sleepLab: {
    osa: 186,
    onCpap: 124,
    titrationDue: 28,
  },
};

export const pulmonologyTemplates = [
  "PFT interpretation",
  "Bronchoscopy report",
  "COPD action plan",
  "Asthma control test",
  "Sleep study report",
  "TB treatment card",
  "ILD assessment form",
  "CPAP compliance log",
];
