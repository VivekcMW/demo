// Oncology - Seeded Dashboard Data

export const oncologyDashboardData = {
  todayStats: {
    chemoCycles: 24,
    consultations: 18,
    tumorBoards: 2,
    followUps: 32,
    newDiagnosis: 6,
    revenue: 520000,
  },

  activeChemo: [
    { id: "C1", name: "Sharma R.", cancer: "Breast Ca", regimen: "AC-T", cycle: "4/6", status: "infusing" },
    { id: "C2", name: "Kumar P.", cancer: "Lung Ca", regimen: "Pemetrexed+Carbo", cycle: "2/4", status: "infusing" },
    { id: "C3", name: "Patel M.", cancer: "Colon Ca", regimen: "FOLFOX", cycle: "8/12", status: "waiting" },
    { id: "C4", name: "Singh A.", cancer: "NHL", regimen: "R-CHOP", cycle: "3/6", status: "completed" },
  ],

  cancerRegistry: {
    breast: { total: 456, stage1_2: 234, stage3: 156, stage4: 66 },
    lung: { total: 312, nsclc: 256, sclc: 56 },
    gi: { total: 289, colorectal: 156, gastric: 89, pancreas: 44 },
    hematological: { total: 198, lymphoma: 98, leukemia: 62, myeloma: 38 },
  },

  tumorBoardQueue: [
    { id: "T1", patient: "Verma S.", cancer: "Breast Ca", stage: "IIIA", time: "14:00" },
    { id: "T2", patient: "Reddy K.", cancer: "Lung Ca", stage: "IV", time: "14:30" },
    { id: "T3", patient: "Khan M.", cancer: "Rectal Ca", stage: "II", time: "15:00" },
  ],

  weeklyTrend: [
    { day: "Mon", value: 28, secondary: 18 },
    { day: "Tue", value: 32, secondary: 22 },
    { day: "Wed", value: 26, secondary: 16 },
    { day: "Thu", value: 30, secondary: 20 },
    { day: "Fri", value: 34, secondary: 24 },
    { day: "Sat", value: 16, secondary: 10 },
    { day: "Sun", value: 8, secondary: 4 },
  ],

  recentBiopsies: [
    { id: "B1", patient: "Gupta A.", type: "Core needle", site: "Breast", status: "Malignant", date: "16 Jun" },
    { id: "B2", patient: "Singh P.", type: "Bronchoscopy", site: "Lung", status: "Pending", date: "16 Jun" },
    { id: "B3", patient: "Mehta R.", type: "Colonoscopy", site: "Colon", status: "Adenocarcinoma", date: "15 Jun" },
  ],
};

export const oncologyTemplates = [
  "Chemotherapy consent form",
  "Cancer staging documentation",
  "Tumor board summary",
  "Treatment response assessment",
  "Palliative care plan",
  "Immunotherapy monitoring",
  "Radiation planning note",
  "Survivorship care plan",
];
