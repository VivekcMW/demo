// Hepatology Dashboard Seeded Data

export const hepatologyDashboardData = {
  todayStats: {
    opdPatients: 32,
    fibroscans: 8,
    endoscopies: 6,
    transplantClinic: 4,
  },
  opdQueue: [
    { id: 1, name: "Rajesh Verma", age: 52, diagnosis: "Hepatitis B", time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Meera Gupta", age: 45, diagnosis: "NAFLD/NASH", time: "09:45 AM", status: "waiting" },
    { id: 3, name: "Sunil Kumar", age: 58, diagnosis: "Cirrhosis", time: "10:00 AM", status: "waiting" },
    { id: 4, name: "Anita Singh", age: 38, diagnosis: "Autoimmune Hepatitis", time: "10:15 AM", status: "waiting" },
  ],
  diseaseRegistry: {
    hepatitisB: { total: 156, onAntivirals: 124, hbePositive: 42, cirrhotic: 28 },
    hepatitisC: { total: 48, treated: 42, svr: 38, relapsed: 4 },
    nafld: { total: 285, nash: 98, fibrosis: 64, cirrhosis: 24 },
    alcoholicLiver: { total: 78, cirrhosis: 45, hepatitis: 33 },
    autoimmune: { total: 32, aih: 18, pbc: 8, psc: 6 },
  },
  cirrhosisMonitoring: {
    compensated: { total: 85, childA: 52, childB: 33 },
    decompensated: { total: 42, childC: 42, ascites: 38, encephalopathy: 18 },
    hccSurveillance: 68,
    varicealScreening: 45,
  },
  transplantWorkup: {
    listed: 12,
    evaluation: 8,
    completed: 156,
    rejected: 4,
  },
  weeklyTrend: [
    { day: "Mon", opd: 28, fibroscan: 6 },
    { day: "Tue", opd: 32, fibroscan: 8 },
    { day: "Wed", opd: 35, fibroscan: 10 },
    { day: "Thu", opd: 30, fibroscan: 7 },
    { day: "Fri", opd: 34, fibroscan: 9 },
    { day: "Sat", opd: 22, fibroscan: 4 },
  ],
};
