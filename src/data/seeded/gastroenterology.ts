// Gastroenterology - Seeded Dashboard Data

export const gastroenterologyDashboardData = {
  todayStats: {
    opdPatients: 42,
    endoscopies: 12,
    colonoscopies: 6,
    liverClinic: 8,
    followUps: 18,
    revenue: 245000,
  },

  procedureQueue: [
    { id: "P1", name: "Sharma R.", age: 52, procedure: "Upper GI Endoscopy", time: "09:00", status: "completed" },
    { id: "P2", name: "Kumar V.", age: 45, procedure: "Colonoscopy", time: "09:30", status: "completed" },
    { id: "P3", name: "Patel M.", age: 58, procedure: "ERCP", time: "10:00", status: "in-progress" },
    { id: "P4", name: "Singh A.", age: 48, procedure: "EUS", time: "11:00", status: "waiting" },
    { id: "P5", name: "Gupta S.", age: 62, procedure: "Upper GI Endoscopy", time: "11:30", status: "waiting" },
  ],

  liverDiseaseRegistry: {
    cirrhosis: { total: 234, childA: 98, childB: 86, childC: 50 },
    hepatitisB: { total: 456, onTreatment: 312, monitoring: 144 },
    hepatitisC: { total: 189, cured: 134, onTreatment: 42, untreated: 13 },
    nafld: { total: 892, fibrosis: 234, steatosis: 658 },
  },

  ibdRegistry: {
    ulcerativeColitis: { total: 312, remission: 198, active: 114 },
    crohns: { total: 156, remission: 89, active: 67 },
  },

  weeklyTrend: [
    { day: "Mon", value: 14, secondary: 8 },
    { day: "Tue", value: 12, secondary: 10 },
    { day: "Wed", value: 16, secondary: 12 },
    { day: "Thu", value: 18, secondary: 14 },
    { day: "Fri", value: 15, secondary: 11 },
    { day: "Sat", value: 8, secondary: 6 },
    { day: "Sun", value: 4, secondary: 2 },
  ],

  recentBiopsies: [
    { id: "B1", patient: "Verma K.", site: "Gastric", status: "pending", date: "16 Jun" },
    { id: "B2", patient: "Reddy P.", site: "Colonic", status: "reported", date: "15 Jun" },
    { id: "B3", patient: "Khan A.", site: "Liver", status: "processing", date: "15 Jun" },
    { id: "B4", patient: "Joshi M.", site: "Duodenal", status: "reported", date: "14 Jun" },
  ],
};

export const gastroenterologyTemplates = [
  "Endoscopy report template",
  "Colonoscopy findings form",
  "ERCP documentation",
  "Liver function assessment",
  "IBD activity scoring",
  "Hepatitis treatment protocol",
  "NAFLD/NASH workup",
  "GI bleed management",
];
