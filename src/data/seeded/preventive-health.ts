// Preventive Health Checkup Dashboard Seeded Data

export const preventiveHealthDashboardData = {
  todayStats: {
    totalCheckups: 86,
    healthChecks: 86,
    vaccinations: 24,
    executiveChecks: 18,
    campScreenings: 14,
    executiveHealth: 24,
    corporate: 48,
    walkIns: 14,
  },
  checkQueue: [
    { id: 1, name: "Rahul Mehta", package: "Executive Premium", company: "Tech Corp", time: "08:00 AM", status: "in-progress" },
    { id: 2, name: "Priya Singh", package: "Women Wellness", company: "Walk-in", time: "08:30 AM", status: "lab" },
    { id: 3, name: "Anil Kumar", package: "Cardiac Special", company: "Finance Ltd", time: "09:00 AM", status: "waiting" },
    { id: 4, name: "Sneha Reddy", package: "Basic Health", company: "Retail Co", time: "09:30 AM", status: "waiting" },
  ],
  checkupQueue: [
    { id: 1, name: "Rahul Mehta", package: "Executive Premium", company: "Tech Corp", time: "08:00 AM", status: "in-progress" },
    { id: 2, name: "Priya Singh", package: "Women Wellness", company: "Walk-in", time: "08:30 AM", status: "lab" },
    { id: 3, name: "Anil Kumar", package: "Cardiac Special", company: "Finance Ltd", time: "09:00 AM", status: "waiting" },
    { id: 4, name: "Sneha Reddy", package: "Basic Health", company: "Retail Co", time: "09:30 AM", status: "waiting" },
  ],
  packageBreakdown: {
    basic: { total: 4256, today: 24 },
    basicScreening: { total: 4256, completed: 24 },
    comprehensive: { total: 2856, today: 32 },
    executive: { total: 1245, today: 18, completed: 18 },
    cardiac: { total: 856, completed: 12 },
    wellWoman: { total: 624, completed: 8 },
    specialized: { total: 856, cardiac: 324, diabetes: 286, cancer: 246 },
  },
  riskAssessment: {
    highRisk: 8,
    moderateRisk: 28,
    healthy: 64,
  },
  corporateClients: {
    active: 86,
    employeesCovered: 24560,
    annualContracts: 42,
    onsiteCamps: 124,
  },
  findingsStats: {
    normal: 62,
    abnormalMinor: 28,
    abnormalSignificant: 8,
    criticalReferral: 2,
  },
  commonFindings: {
    dyslipidemia: 42,
    prediabetes: 28,
    hypertension: 24,
    obesity: 38,
    vitaminD: 56,
  },
  turnaroundTime: {
    reportSameDay: 68,
    reportNextDay: 28,
    reportDelayed: 4,
  },
  weeklyTrend: [
    { day: "Mon", checkups: 82, abnormal: 28 },
    { day: "Tue", checkups: 86, abnormal: 32 },
    { day: "Wed", checkups: 92, abnormal: 35 },
    { day: "Thu", checkups: 78, abnormal: 26 },
    { day: "Fri", checkups: 88, abnormal: 30 },
    { day: "Sat", checkups: 64, abnormal: 22 },
  ],
};
