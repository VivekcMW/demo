// Fetal Medicine Dashboard Seeded Data

export const fetalMedicineDashboardData = {
  todayStats: {
    scans: 18,
    amniocentesis: 2,
    highRiskConsults: 8,
    geneticCounseling: 4,
  },
  scanQueue: [
    { id: 1, name: "Priya Sharma", scan: "NT Scan", ga: "12w3d", time: "09:30 AM", status: "in-progress" },
    { id: 2, name: "Meena Gupta", scan: "Anomaly Scan", ga: "20w1d", time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Sunita Reddy", scan: "Fetal Echo", ga: "24w0d", time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Lakshmi Nair", scan: "Growth Scan", ga: "32w2d", time: "11:00 AM", status: "waiting" },
  ],
  screeningStats: {
    ntScan: { performed: 856, highRisk: 42 },
    quadScreen: { performed: 624, highRisk: 28 },
    nipt: { performed: 186, highRisk: 8 },
    anomalyScan: { performed: 1245, abnormal: 48 },
  },
  highRiskRegistry: {
    iugr: 24,
    preterm: 18,
    multipleGestation: 12,
    fetalAnomaly: 8,
    rhIsoimmunization: 4,
  },
  interventions: {
    amniocentesis: { total: 86, thisMonth: 12 },
    cvs: { total: 24, thisMonth: 4 },
    cordocentesis: { total: 8, thisMonth: 1 },
    iut: { total: 4, thisMonth: 0 },
  },
  outcomes: {
    normalDelivery: 78,
    terminationOffered: 12,
    neonatalSurgery: 6,
    postnatalFollow: 24,
  },
  weeklyTrend: [
    { day: "Mon", scans: 16, highRisk: 6 },
    { day: "Tue", scans: 18, highRisk: 8 },
    { day: "Wed", scans: 22, highRisk: 10 },
    { day: "Thu", scans: 14, highRisk: 5 },
    { day: "Fri", scans: 20, highRisk: 7 },
    { day: "Sat", scans: 12, highRisk: 4 },
  ],
};
