// Cardiology Dashboard Seeded Data

export const cardiologyDashboardData = {
  todayStats: {
    opdPatients: 42,
    newPatients: 14,
    followUps: 28,
    echosDone: 18,
    tmtsDone: 8,
    angiosScheduled: 4,
    ccuBeds: { occupied: 6, total: 8 },
    revenue: 425000,
  },

  queueStatus: {
    waiting: 6,
    inProgress: 2,
    avgWaitTime: 18,
    avgConsultTime: 12,
  },

  currentQueue: [
    {
      id: "C001",
      tokenNo: 22,
      name: "Ramesh Kumar",
      age: "58",
      gender: "M",
      visitType: "Follow-up",
      chiefComplaint: "Post-CABG 3-month review",
      waitingSince: "10:15 AM",
      status: "in-progress",
      riskLevel: "high",
    },
    {
      id: "C002",
      tokenNo: 23,
      name: "Sunita Sharma",
      age: "52",
      gender: "F",
      visitType: "New",
      chiefComplaint: "Chest pain on exertion, breathlessness",
      waitingSince: "10:25 AM",
      status: "waiting",
      riskLevel: "urgent",
    },
    {
      id: "C003",
      tokenNo: 24,
      name: "Vijay Patel",
      age: "65",
      gender: "M",
      visitType: "Follow-up",
      chiefComplaint: "HTN + DM review, medication adjustment",
      waitingSince: "10:35 AM",
      status: "waiting",
      riskLevel: "moderate",
    },
    {
      id: "C004",
      tokenNo: 25,
      name: "Lakshmi Nair",
      age: "48",
      gender: "F",
      visitType: "Procedure",
      chiefComplaint: "2D Echo scheduled",
      waitingSince: "10:40 AM",
      status: "waiting",
    },
  ],

  ccuStatus: {
    totalBeds: 8,
    occupied: 6,
    ventilators: { total: 4, inUse: 2 },
    iabp: { total: 2, inUse: 1 },
    patients: [
      {
        id: "CCU001",
        name: "Ashok Gupta",
        age: "62",
        bed: "CCU-1",
        diagnosis: "Acute STEMI (Anterior wall)",
        admitDate: "Jun 15",
        los: 2,
        status: "critical",
        troponin: "4.2",
        ef: "35%",
        intervention: "Primary PCI done",
        onVentilator: false,
        iabp: true,
      },
      {
        id: "CCU002",
        name: "Meena Devi",
        age: "55",
        bed: "CCU-2",
        diagnosis: "Acute pulmonary edema",
        admitDate: "Jun 16",
        los: 1,
        status: "improving",
        ef: "28%",
        intervention: "IV diuretics, NIV",
        onVentilator: false,
        iabp: false,
      },
      {
        id: "CCU003",
        name: "Rajan Menon",
        age: "68",
        bed: "CCU-3",
        diagnosis: "Complete heart block",
        admitDate: "Jun 14",
        los: 3,
        status: "stable",
        intervention: "TPI in place, PPI planned",
        onVentilator: false,
        iabp: false,
      },
    ],
  },

  procedureQueue: {
    echos: [
      { id: "E001", name: "Lakshmi Nair", time: "11:00 AM", type: "2D Echo", status: "waiting" },
      { id: "E002", name: "Suresh Iyer", time: "11:30 AM", type: "2D Echo + Doppler", status: "waiting" },
      { id: "E003", name: "Anita Reddy", time: "12:00 PM", type: "Stress Echo", status: "scheduled" },
    ],
    tmts: [
      { id: "T001", name: "Prakash Joshi", time: "11:15 AM", indication: "Chest pain evaluation", status: "in-progress" },
      { id: "T002", name: "Kamala Bai", time: "12:00 PM", indication: "Pre-op clearance", status: "scheduled" },
    ],
    cathlabs: [
      { id: "CL001", name: "Mohan Das", time: "02:00 PM", procedure: "CAG", indication: "Positive TMT", status: "scheduled" },
      { id: "CL002", name: "Ashok Gupta", time: "Done", procedure: "Primary PCI", indication: "STEMI", status: "completed" },
    ],
  },

  riskStratification: {
    highRisk: 12,
    moderateRisk: 28,
    lowRisk: 42,
    recentAssessments: [
      { name: "Ramesh Kumar", age: "58", score: "HEART 6", risk: "High", recommendation: "Cardiology consult" },
      { name: "Sunita Sharma", age: "52", score: "TIMI 4", risk: "Moderate", recommendation: "Serial troponins" },
      { name: "Vijay Patel", age: "65", score: "Framingham 18%", risk: "Moderate", recommendation: "Statin intensification" },
    ],
  },

  echoFindings: {
    todayCompleted: 12,
    normalEF: 8,
    mildLVD: 2,
    moderateLVD: 1,
    severeLVD: 1,
    valvularFindings: 3,
    recentReports: [
      { name: "Suresh Menon", ef: "55%", finding: "Normal LV function, Grade 1 DD", status: "normal" },
      { name: "Kamala Devi", ef: "38%", finding: "Moderate LV dysfunction, MR++", status: "abnormal" },
      { name: "Rajan Kumar", ef: "62%", finding: "Mild concentric LVH, normal EF", status: "borderline" },
    ],
  },

  medicationAdherence: {
    onStatins: 82,
    statinAdherence: 78,
    onAntiplatelet: 64,
    antiplateletAdherence: 85,
    onBetaBlockers: 56,
    betaBlockerAdherence: 72,
    defaulters: [
      { name: "Vinod Sharma", medication: "Atorvastatin", lastRefill: "May 15", daysMissed: 32 },
      { name: "Geeta Rani", medication: "Clopidogrel", lastRefill: "Jun 01", daysMissed: 16 },
    ],
  },

  weeklyTrends: [
    { day: "Mon", opdCount: 38, echos: 14, tmts: 6, interventions: 2 },
    { day: "Tue", opdCount: 42, echos: 18, tmts: 8, interventions: 3 },
    { day: "Wed", opdCount: 45, echos: 16, tmts: 7, interventions: 4 },
    { day: "Thu", opdCount: 36, echos: 12, tmts: 5, interventions: 2 },
    { day: "Fri", opdCount: 48, echos: 20, tmts: 10, interventions: 5 },
    { day: "Sat", opdCount: 40, echos: 15, tmts: 6, interventions: 1 },
    { day: "Sun", opdCount: 0, echos: 0, tmts: 0, interventions: 0 },
  ],

  diagnosisDistribution: [
    { diagnosis: "Ischemic Heart Disease", count: 18, percentage: 35 },
    { diagnosis: "Hypertension", count: 14, percentage: 27 },
    { diagnosis: "Heart Failure", count: 8, percentage: 15 },
    { diagnosis: "Arrhythmias", count: 6, percentage: 12 },
    { diagnosis: "Valvular Heart Disease", count: 4, percentage: 8 },
    { diagnosis: "Others", count: 2, percentage: 3 },
  ],
};

export const cardiologyTemplates = [
  { id: "chest-pain", name: "Chest Pain Evaluation", category: "Emergency", usageCount: 5200 },
  { id: "ihd-review", name: "IHD Follow-up", category: "Chronic", usageCount: 8400 },
  { id: "htn-review", name: "Hypertension Review", category: "Chronic", usageCount: 7800 },
  { id: "hf-review", name: "Heart Failure Review", category: "Chronic", usageCount: 3200 },
  { id: "echo-report", name: "2D Echo Report", category: "Diagnostic", usageCount: 12500 },
  { id: "tmt-report", name: "TMT Report", category: "Diagnostic", usageCount: 4800 },
  { id: "cag-report", name: "CAG Report", category: "Intervention", usageCount: 1200 },
  { id: "pci-note", name: "PCI Procedure Note", category: "Intervention", usageCount: 680 },
  { id: "pacemaker", name: "Pacemaker Implant", category: "Intervention", usageCount: 220 },
];

export type CardiologyDashboardData = typeof cardiologyDashboardData;
