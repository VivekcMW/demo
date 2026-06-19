// Obstetrics & Gynecology Specialty - Seeded Dashboard Data
// This data simulates a real OBG department for demo purposes

export const obgDashboardData = {
  todayStats: {
    ancVisits: 34,
    newRegistrations: 8,
    followUps: 26,
    deliveriesToday: 6,
    highRiskPatients: 12,
    revenue: 380000, // ₹3.8L
  },

  deliveryPipeline: {
    stages: [
      { id: "registered", label: "ANC Registered", count: 248, color: "#7C3AED" },
      { id: "trimester2", label: "2nd Trimester", count: 186, conversion: 75, color: "#8B5CF6" },
      { id: "trimester3", label: "3rd Trimester", count: 124, conversion: 67, color: "#A78BFA" },
      { id: "nearTerm", label: "Near Term (36+)", count: 42, conversion: 34, color: "#C4B5FD" },
      { id: "delivered", label: "Delivered (MTD)", count: 28, conversion: 67, color: "#DDD6FE" },
    ],
    deliveryBreakdown: {
      nvd: 18,
      lscs: 8,
      instrumental: 2,
    },
  },

  ancCompliance: {
    firstTrimester: { onTrack: 92, total: 100 },
    secondTrimester: { onTrack: 88, total: 100 },
    thirdTrimester: { onTrack: 85, total: 100 },
    overallCompliance: 88,
  },

  highRiskPatients: [
    {
      id: "obg-hr-001",
      name: "Priya Sharma",
      uhid: "AE2026OBG1842",
      age: 32,
      gestationalAge: "34w 2d",
      riskFactors: ["Previous LSCS", "GDM"],
      edd: "2026-07-28",
      nextVisit: "2026-06-19",
      status: "monitoring",
    },
    {
      id: "obg-hr-002",
      name: "Lakshmi Devi",
      uhid: "AE2026OBG1756",
      age: 38,
      gestationalAge: "28w 5d",
      riskFactors: ["Age > 35", "PIH", "Twins"],
      edd: "2026-08-22",
      nextVisit: "2026-06-18",
      status: "high-alert",
    },
    {
      id: "obg-hr-003",
      name: "Anitha Reddy",
      uhid: "AE2026OBG1923",
      age: 29,
      gestationalAge: "32w 0d",
      riskFactors: ["IUGR", "Oligohydramnios"],
      edd: "2026-08-10",
      nextVisit: "2026-06-17",
      status: "high-alert",
    },
    {
      id: "obg-hr-004",
      name: "Meera Patel",
      uhid: "AE2026OBG1634",
      age: 26,
      gestationalAge: "36w 4d",
      riskFactors: ["Rh Negative", "Previous PPH"],
      edd: "2026-07-12",
      nextVisit: "2026-06-20",
      status: "monitoring",
    },
    {
      id: "obg-hr-005",
      name: "Sunita Kumari",
      uhid: "AE2026OBG1889",
      age: 42,
      gestationalAge: "24w 1d",
      riskFactors: ["Advanced Maternal Age", "Hypothyroid", "GDM"],
      edd: "2026-10-02",
      nextVisit: "2026-06-24",
      status: "monitoring",
    },
  ],

  laborWardStatus: {
    totalBeds: 8,
    occupied: 5,
    activeLabor: 2,
    patients: [
      {
        id: "lw-001",
        name: "Kavitha S.",
        uhid: "AE2026OBG1901",
        bedNo: "LW-01",
        admittedAt: "2026-06-17T02:30:00",
        stage: "Active Labor",
        dilatation: "7 cm",
        fhr: 142,
        contractions: "3 in 10 min",
        status: "progressing",
      },
      {
        id: "lw-002",
        name: "Radha M.",
        uhid: "AE2026OBG1856",
        bedNo: "LW-02",
        admittedAt: "2026-06-17T06:15:00",
        stage: "Early Labor",
        dilatation: "4 cm",
        fhr: 138,
        contractions: "2 in 10 min",
        status: "monitoring",
      },
      {
        id: "lw-003",
        name: "Jaya P.",
        uhid: "AE2026OBG1945",
        bedNo: "LW-03",
        admittedAt: "2026-06-16T22:00:00",
        stage: "2nd Stage",
        dilatation: "10 cm",
        fhr: 148,
        contractions: "5 in 10 min",
        status: "delivery-imminent",
      },
    ],
  },

  recentDeliveries: [
    {
      id: "del-001",
      motherName: "Savitri Devi",
      uhid: "AE2026OBG1723",
      deliveryTime: "2026-06-17T08:45:00",
      type: "NVD",
      babyWeight: 3.2,
      babySex: "Male",
      apgar: { oneMin: 8, fiveMin: 9 },
      status: "mother-baby-stable",
    },
    {
      id: "del-002",
      motherName: "Rekha Rani",
      uhid: "AE2026OBG1698",
      deliveryTime: "2026-06-17T06:20:00",
      type: "LSCS",
      indication: "Fetal Distress",
      babyWeight: 2.8,
      babySex: "Female",
      apgar: { oneMin: 7, fiveMin: 9 },
      status: "mother-baby-stable",
    },
    {
      id: "del-003",
      motherName: "Pushpa K.",
      uhid: "AE2026OBG1812",
      deliveryTime: "2026-06-17T03:10:00",
      type: "NVD",
      babyWeight: 3.5,
      babySex: "Female",
      apgar: { oneMin: 9, fiveMin: 10 },
      status: "discharged",
    },
    {
      id: "del-004",
      motherName: "Geeta Sharma",
      uhid: "AE2026OBG1756",
      deliveryTime: "2026-06-16T23:55:00",
      type: "LSCS",
      indication: "Previous LSCS",
      babyWeight: 3.1,
      babySex: "Male",
      apgar: { oneMin: 8, fiveMin: 9 },
      status: "post-op-recovery",
    },
  ],

  gynecOPD: {
    todayPatients: 22,
    conditions: [
      { condition: "AUB/Heavy Periods", count: 6 },
      { condition: "PCOS", count: 5 },
      { condition: "Infertility Workup", count: 4 },
      { condition: "Menopause/HRT", count: 3 },
      { condition: "Cervical Screening", count: 2 },
      { condition: "Others", count: 2 },
    ],
  },

  pcpndtRegister: {
    todayScans: 12,
    monthToDate: 186,
    pendingFormF: 2,
    compliance: 98.9,
  },

  upcomingSchedule: [
    { time: "09:00", type: "ANC", patient: "Anjali R.", details: "20 week anomaly scan" },
    { time: "09:30", type: "Gynec", patient: "Shanti M.", details: "Hysteroscopy follow-up" },
    { time: "10:00", type: "ANC", patient: "Deepa K.", details: "GDM - GTT review" },
    { time: "10:30", type: "OT", patient: "Rama Devi", details: "Elective LSCS" },
    { time: "11:00", type: "ANC", patient: "Nirmala S.", details: "36 week checkup" },
    { time: "11:30", type: "Gynec", patient: "Padma V.", details: "Pap smear results" },
    { time: "14:00", type: "OT", patient: "Sarita B.", details: "Laparoscopic Cystectomy" },
    { time: "15:00", type: "ANC", patient: "Usha P.", details: "High-risk - weekly review" },
  ],

  suppliesInventory: [
    {
      id: "sup-001",
      item: "Oxytocin 10 IU",
      category: "Emergency",
      inStock: 120,
      reorderLevel: 50,
      lowStock: false,
      unitPrice: 45,
    },
    {
      id: "sup-002",
      item: "MgSO4 50%",
      category: "Emergency",
      inStock: 18,
      reorderLevel: 20,
      lowStock: true,
      unitPrice: 85,
    },
    {
      id: "sup-003",
      item: "Misoprostol 200mcg",
      category: "Labor",
      inStock: 45,
      reorderLevel: 30,
      lowStock: false,
      unitPrice: 120,
    },
    {
      id: "sup-004",
      item: "Suture - Vicryl 1",
      category: "OT",
      inStock: 8,
      reorderLevel: 15,
      lowStock: true,
      unitPrice: 450,
    },
    {
      id: "sup-005",
      item: "Foley Catheter 16F",
      category: "Consumable",
      inStock: 65,
      reorderLevel: 40,
      lowStock: false,
      unitPrice: 75,
    },
  ],

  weeklyTrends: [
    { day: "Mon", ancVisits: 28, deliveries: 4, gynecOPD: 18 },
    { day: "Tue", ancVisits: 32, deliveries: 5, gynecOPD: 22 },
    { day: "Wed", ancVisits: 30, deliveries: 3, gynecOPD: 20 },
    { day: "Thu", ancVisits: 35, deliveries: 6, gynecOPD: 24 },
    { day: "Fri", ancVisits: 34, deliveries: 4, gynecOPD: 22 },
    { day: "Sat", ancVisits: 26, deliveries: 7, gynecOPD: 16 },
    { day: "Sun", ancVisits: 12, deliveries: 5, gynecOPD: 8 },
  ],
};

// OBG-specific clinical templates for demonstration
export const obgTemplates = {
  ancRegistration: {
    name: "ANC Registration",
    sections: ["Menstrual History", "Obstetric History", "Current Pregnancy", "Risk Assessment"],
  },
  ancFollowUp: {
    name: "ANC Follow-up",
    sections: ["Vitals", "Obstetric Exam", "Investigations", "Plan"],
  },
  partograph: {
    name: "Digital Partograph",
    sections: ["Fetal Condition", "Labor Progress", "Contractions", "Maternal Vitals"],
  },
  deliveryNote: {
    name: "Delivery Note",
    sections: ["Labor Summary", "Delivery Details", "Baby Details", "Placenta & Blood Loss"],
  },
  lscsNote: {
    name: "LSCS Operative Note",
    sections: ["Indication", "Procedure", "Findings", "Baby Details", "Closure"],
  },
  gynecOPD: {
    name: "Gynec OPD Note",
    sections: ["Chief Complaint", "Menstrual History", "Examination", "Assessment & Plan"],
  },
};

// OBG workflows for demonstration
export const obgWorkflows = {
  ancJourney: {
    name: "ANC Journey Tracker",
    stages: [
      { id: "registration", label: "First Visit & Registration", week: "8-12" },
      { id: "dating", label: "Dating Scan", week: "11-14" },
      { id: "anomaly", label: "Anomaly Scan", week: "18-22" },
      { id: "gdmScreen", label: "GDM Screening", week: "24-28" },
      { id: "growthScan", label: "Growth Scan", week: "28-32" },
      { id: "weeklyVisits", label: "Weekly Visits", week: "36+" },
      { id: "delivery", label: "Delivery", week: "37-42" },
    ],
  },
  laborMonitoring: {
    name: "Labor Room Monitoring",
    checkpoints: [
      { item: "FHR", frequency: "Every 30 min" },
      { item: "Contractions", frequency: "Every 30 min" },
      { item: "Cervical Progress", frequency: "Every 4 hours" },
      { item: "Maternal Vitals", frequency: "Every 2 hours" },
      { item: "Partograph Update", frequency: "Real-time" },
    ],
  },
  highRiskProtocol: {
    name: "High-Risk Pregnancy Protocol",
    conditions: [
      { condition: "GDM", protocol: "Weekly BSL, monthly growth scan" },
      { condition: "PIH", protocol: "Twice weekly BP, weekly labs" },
      { condition: "IUGR", protocol: "Biweekly Doppler, weekly NST" },
      { condition: "Previous LSCS", protocol: "Monitor for scar tenderness, plan TOLAC vs ERCS" },
    ],
  },
};

export type OBGDashboardData = typeof obgDashboardData;
export type OBGTemplates = typeof obgTemplates;
export type OBGWorkflows = typeof obgWorkflows;
