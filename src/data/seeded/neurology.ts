// Neurology - Seeded Dashboard Data

export const neurologyDashboardData = {
  todayStats: {
    opdPatients: 38,
    eegStudies: 8,
    strokeAlerts: 2,
    epilepsyClinic: 12,
    movementDisorders: 6,
    revenue: 185000,
  },

  strokePatients: [
    { id: "S1", name: "Sharma R.", type: "Ischemic", nihss: 8, tpa: "Given", time: "06:30", status: "ICU" },
    { id: "S2", name: "Kumar V.", type: "Hemorrhagic", nihss: 14, tpa: "N/A", time: "08:15", status: "Neuro ICU" },
  ],

  epilepsyRegistry: {
    total: 892,
    controlled: 634,
    drugResistant: 156,
    surgeryEvaluated: 42,
    seizureFreePostSurgery: 28,
  },

  movementDisorderClinic: [
    { id: "M1", name: "Patel M.", condition: "Parkinson's", stage: "H&Y 2", medication: "Levodopa 300mg", nextReview: "3 months" },
    { id: "M2", name: "Singh A.", condition: "Essential Tremor", stage: "Moderate", medication: "Propranolol 80mg", nextReview: "6 months" },
    { id: "M3", name: "Gupta S.", condition: "Dystonia", stage: "Focal", medication: "Botox due", nextReview: "3 months" },
  ],

  eegQueue: [
    { id: "E1", name: "Verma K.", indication: "Seizure evaluation", status: "in-progress", time: "09:30" },
    { id: "E2", name: "Reddy P.", indication: "Altered sensorium", status: "waiting", time: "10:30" },
    { id: "E3", name: "Khan M.", indication: "Follow-up epilepsy", status: "waiting", time: "11:30" },
  ],

  weeklyTrend: [
    { day: "Mon", value: 42, secondary: 10 },
    { day: "Tue", value: 38, secondary: 8 },
    { day: "Wed", value: 45, secondary: 12 },
    { day: "Thu", value: 40, secondary: 9 },
    { day: "Fri", value: 36, secondary: 11 },
    { day: "Sat", value: 20, secondary: 4 },
    { day: "Sun", value: 12, secondary: 2 },
  ],

  headacheClinic: {
    migraine: 234,
    tensionType: 156,
    cluster: 23,
    medicationOveruse: 45,
  },
};

export const neurologyTemplates = [
  "Stroke assessment (NIHSS)",
  "Epilepsy monitoring form",
  "EEG report template",
  "Movement disorder scale",
  "Headache diary",
  "Cognitive assessment (MMSE/MoCA)",
  "Nerve conduction study",
  "Lumbar puncture consent",
];
