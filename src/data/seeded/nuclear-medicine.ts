// Nuclear Medicine Dashboard Seeded Data

export const nuclearMedicineDashboardData = {
  todayStats: {
    diagnosticScans: 18,
    therapySessions: 4,
    petScans: 6,
    spects: 8,
  },
  scanQueue: [
    { id: 1, name: "Rakesh Sharma", scan: "PET-CT", indication: "Lung Ca Staging", time: "09:30 AM", status: "in-progress" },
    { id: 2, name: "Meena Gupta", scan: "Thyroid Scan", indication: "Hyperthyroidism", time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Anil Kumar", scan: "Bone Scan", indication: "Metastatic Workup", time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Priya Nair", scan: "MIBG", indication: "Pheochromocytoma", time: "11:00 AM", status: "waiting" },
  ],
  scanBreakdown: {
    petCt: { total: 856, oncology: 686, cardiology: 124, neurology: 46 },
    spect: { total: 424, mpi: 286, bone: 98, thyroid: 40 },
    therapeutic: { total: 186, rait: 124, i131: 48, lu177: 14 },
  },
  radiopharmaceuticals: {
    fdg: { stock: 12, expiry: "6h" },
    tc99m: { stock: 8, expiry: "6h" },
    i131: { stock: 4, expiry: "8d" },
    lu177: { stock: 2, expiry: "7d" },
  },
  therapyRegistry: {
    radioiodine: { active: 24, scheduled: 8 },
    rait: { active: 12, scheduled: 4 },
    prrt: { active: 6, scheduled: 2 },
  },
  safetyMetrics: {
    doseWithinLimit: 98.5,
    contamination: 0,
    incidents: 0,
  },
  weeklyTrend: [
    { day: "Mon", diagnostic: 16, therapy: 3 },
    { day: "Tue", diagnostic: 18, therapy: 4 },
    { day: "Wed", diagnostic: 20, therapy: 5 },
    { day: "Thu", diagnostic: 14, therapy: 2 },
    { day: "Fri", diagnostic: 18, therapy: 4 },
    { day: "Sat", diagnostic: 10, therapy: 1 },
  ],
};
