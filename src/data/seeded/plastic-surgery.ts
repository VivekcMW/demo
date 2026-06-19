// Plastic Surgery Dashboard Seeded Data

export const plasticSurgeryDashboardData = {
  todayStats: {
    consultations: 18,
    surgeries: 6,
    minor: 12,
    followUps: 8,
  },
  surgerySchedule: [
    { id: 1, name: "Priya Sharma", procedure: "Rhinoplasty", type: "cosmetic", time: "08:00 AM", status: "in-progress" },
    { id: 2, name: "Rajesh Kumar", procedure: "Hand Reconstruction", type: "reconstructive", time: "11:00 AM", status: "scheduled" },
    { id: 3, name: "Meena Gupta", procedure: "Breast Reduction", type: "cosmetic", time: "02:00 PM", status: "scheduled" },
  ],
  procedureBreakdown: {
    cosmetic: { 
      total: 1245, 
      active: 86,
      rhinoplasty: 186, 
      liposuction: 286, 
      facelifts: 124, 
      breastAugmentation: 186,
      abdominoplasty: 142,
    },
    reconstructive: {
      total: 856,
      active: 42,
      burns: 124,
      trauma: 186,
      cancer: 142,
      congenital: 86,
      handSurgery: 186,
    },
    burn: {
      total: 148,
      active: 28,
    },
    hand: {
      total: 186,
      active: 18,
    },
    nonSurgical: {
      total: 2456,
      botox: 856,
      fillers: 624,
      laser: 486,
      peels: 324,
    },
  },
  woundCareClinic: {
    chronic: 48,
    postOp: 86,
    burns: 24,
    pressure: 18,
  },
  microsurgeryStats: {
    freeFlaps: 24,
    reimplants: 8,
    nerveRepair: 18,
    lymphedema: 12,
  },
  patientSatisfaction: {
    cosmetic: 94,
    reconstructive: 92,
    overall: 93,
  },
  outcomes: {
    patientSatisfaction: 94,
    complicationRate: 2.1,
    revisionRate: 3.2,
  },
  weeklyTrend: [
    { day: "Mon", consults: 16, surgeries: 4 },
    { day: "Tue", consults: 18, surgeries: 6 },
    { day: "Wed", consults: 20, surgeries: 8 },
    { day: "Thu", consults: 14, surgeries: 4 },
    { day: "Fri", consults: 18, surgeries: 6 },
    { day: "Sat", consults: 12, surgeries: 2 },
  ],
};
