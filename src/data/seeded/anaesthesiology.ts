// Anaesthesiology - Seeded Dashboard Data

export const anaesthesiologyDashboardData = {
  todayStats: {
    scheduledCases: 18,
    completedCases: 12,
    inProgress: 2,
    preOpAssessments: 24,
    pacu: 4,
    revenue: 285000,
  },

  casesByType: {
    generalAnaesthesia: 8,
    regionalBlock: 4,
    spinal: 3,
    sedation: 2,
    combined: 1,
  },

  otUtilization: [
    { ot: "OT-1", specialty: "Ortho", status: "active", startTime: "08:00", patient: "Sharma R." },
    { ot: "OT-2", specialty: "General", status: "active", startTime: "08:30", patient: "Kumar P." },
    { ot: "OT-3", specialty: "Gynae", status: "prep", startTime: "10:00", patient: "Devi M." },
    { ot: "OT-4", specialty: "ENT", status: "cleaning", startTime: "11:00", patient: "Singh A." },
    { ot: "OT-5", specialty: "Urology", status: "scheduled", startTime: "12:00", patient: "Patel V." },
  ],

  pacuPatients: [
    { id: "P1", name: "Verma S.", procedure: "TKR Left", aldrete: 8, time: "45 min" },
    { id: "P2", name: "Gupta R.", procedure: "Lap Chole", aldrete: 9, time: "30 min" },
    { id: "P3", name: "Singh K.", procedure: "Hysterectomy", aldrete: 7, time: "25 min" },
    { id: "P4", name: "Mehta A.", procedure: "Septoplasty", aldrete: 10, time: "15 min" },
  ],

  preOpQueue: [
    { id: "Q1", name: "Sharma V.", age: 58, surgery: "CABG", asa: "III", time: "10:30" },
    { id: "Q2", name: "Reddy P.", age: 42, surgery: "Lap Appendix", asa: "II", time: "11:00" },
    { id: "Q3", name: "Khan M.", age: 67, surgery: "Hip Replacement", asa: "III", time: "11:30" },
    { id: "Q4", name: "Joshi S.", age: 35, surgery: "LSCS", asa: "I", time: "12:00" },
  ],

  weeklyTrend: [
    { day: "Mon", value: 16, secondary: 14 },
    { day: "Tue", value: 18, secondary: 16 },
    { day: "Wed", value: 15, secondary: 14 },
    { day: "Thu", value: 20, secondary: 18 },
    { day: "Fri", value: 22, secondary: 20 },
    { day: "Sat", value: 12, secondary: 10 },
    { day: "Sun", value: 6, secondary: 5 },
  ],

  equipment: {
    ventilators: { total: 12, inUse: 6, maintenance: 1 },
    monitors: { total: 18, inUse: 8, maintenance: 0 },
    infusionPumps: { total: 24, inUse: 12, available: 12 },
  },
};

export const anaesthesiologyTemplates = [
  "Pre-anaesthetic evaluation form",
  "Airway assessment checklist",
  "Regional block consent",
  "Post-op pain protocol",
  "PACU discharge criteria",
  "Difficult airway cart checklist",
  "Malignant hyperthermia protocol",
  "Blood transfusion consent",
];
