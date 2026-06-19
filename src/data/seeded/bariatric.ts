// Bariatric Surgery Dashboard Seeded Data

export const bariatricDashboardData = {
  todayStats: {
    opdPatients: 18,
    surgeries: 3,
    postOpFollowUp: 12,
    nutritionConsult: 8,
  },
  surgerySchedule: [
    { id: 1, name: "Rajesh Kumar", procedure: "Sleeve Gastrectomy", bmi: 45.2, time: "08:00 AM", status: "in-progress" },
    { id: 2, name: "Meena Sharma", procedure: "Gastric Bypass", bmi: 48.6, time: "11:00 AM", status: "scheduled" },
    { id: 3, name: "Vikram Singh", procedure: "Mini Gastric Bypass", bmi: 42.8, time: "02:00 PM", status: "scheduled" },
  ],
  procedureStats: {
    sleeveGastrectomy: { total: 286, thisYear: 48 },
    gastricBypass: { total: 124, thisYear: 22 },
    miniGastricBypass: { total: 86, thisYear: 18 },
    revision: { total: 24, thisYear: 6 },
  },
  patientRegistry: {
    preOp: { total: 42, clearance: 28, pending: 14 },
    postOp: { total: 486, under6Months: 86, sixTo12Months: 124, over12Months: 276 },
  },
  outcomes: {
    excessWeightLoss: { avg6Month: 52, avg12Month: 68, avg24Month: 72 },
    diabetesRemission: 78,
    hypertensionRemission: 65,
    osaImproved: 82,
  },
  nutritionFollowUp: {
    onTrack: 324,
    needsAttention: 86,
    deficiencyAlert: 24,
  },
  weeklyTrend: [
    { day: "Mon", opd: 16, surgery: 2 },
    { day: "Tue", opd: 18, surgery: 3 },
    { day: "Wed", opd: 20, surgery: 4 },
    { day: "Thu", opd: 14, surgery: 2 },
    { day: "Fri", opd: 18, surgery: 3 },
    { day: "Sat", opd: 10, surgery: 1 },
  ],
};
