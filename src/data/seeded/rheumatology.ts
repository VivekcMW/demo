// Rheumatology Dashboard Seeded Data

export const rheumatologyDashboardData = {
  todayStats: {
    opdPatients: 28,
    biologicInfusions: 6,
    jointInjections: 4,
    newDiagnosis: 3,
  },
  opdQueue: [
    { id: 1, name: "Sunita Sharma", age: 45, diagnosis: "Rheumatoid Arthritis", time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Ramesh Patel", age: 58, diagnosis: "Ankylosing Spondylitis", time: "09:45 AM", status: "waiting" },
    { id: 3, name: "Meera Gupta", age: 35, diagnosis: "SLE", time: "10:00 AM", status: "waiting" },
    { id: 4, name: "Vikram Singh", age: 62, diagnosis: "Gout", time: "10:15 AM", status: "waiting" },
  ],
  diseaseRegistry: {
    rheumatoidArthritis: { total: 245, onDMARDs: 198, onBiologics: 42, remission: 86 },
    sle: { total: 68, active: 24, stable: 44, lupusNephritis: 18 },
    spondyloarthritis: { total: 85, as: 52, psa: 33 },
    vasculitis: { total: 24, anca: 12, gca: 8, takayasu: 4 },
    otherConnectiveTissue: { total: 56, sjogren: 22, scleroderma: 18, myositis: 16 },
  },
  biologicRegistry: {
    total: 86,
    adalimumab: 28,
    etanercept: 22,
    tocilizumab: 18,
    rituximab: 12,
    other: 6,
  },
  dasScores: {
    remission: 86,
    low: 68,
    moderate: 52,
    high: 39,
  },
  weeklyTrend: [
    { day: "Mon", opd: 26, infusions: 5 },
    { day: "Tue", opd: 28, infusions: 6 },
    { day: "Wed", opd: 32, infusions: 8 },
    { day: "Thu", opd: 24, infusions: 4 },
    { day: "Fri", opd: 30, infusions: 7 },
    { day: "Sat", opd: 18, infusions: 3 },
  ],
};
