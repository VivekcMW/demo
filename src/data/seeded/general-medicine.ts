// General Medicine / Internal Medicine - Seeded Dashboard Data
// This data simulates a real general medicine OPD for demo purposes

export const generalMedicineDashboardData = {
  todayStats: {
    opdPatients: 72,
    newPatients: 28,
    followUps: 44,
    consultationsCompleted: 58,
    chronicReviews: 32,
    revenue: 156000, // ₹1.56L
  },

  queueStatus: {
    waiting: 14,
    inProgress: 3,
    completed: 58,
    avgWaitTime: 18, // minutes
    avgConsultTime: 4.5, // minutes
  },

  chronicRegistries: {
    diabetes: {
      totalEnrolled: 1842,
      dueForReview: 156,
      overdueReview: 42,
      avgHbA1c: 7.2,
      controlled: 68, // percentage
    },
    hypertension: {
      totalEnrolled: 2134,
      dueForReview: 189,
      overdueReview: 58,
      avgBP: "138/86",
      controlled: 62,
    },
    thyroid: {
      totalEnrolled: 892,
      dueForReview: 78,
      overdueReview: 23,
      hypothyroid: 684,
      hyperthyroid: 208,
    },
    asthma: {
      totalEnrolled: 456,
      dueForReview: 34,
      overdueReview: 12,
    },
  },

  followUpCompliance: {
    scheduled: 156,
    attended: 134,
    missed: 22,
    complianceRate: 86,
    defaulters: [
      { name: "Ramesh Kumar", uhid: "AE2026GM4521", condition: "Diabetes", daysMissed: 8, lastVisit: "2026-06-09" },
      { name: "Lakshmi S.", uhid: "AE2026GM4389", condition: "HTN", daysMissed: 12, lastVisit: "2026-06-05" },
      { name: "Venkat Rao", uhid: "AE2026GM4612", condition: "Thyroid", daysMissed: 5, lastVisit: "2026-06-12" },
    ],
  },

  currentQueue: [
    { 
      id: "q-001",
      tokenNo: 47,
      name: "Anjali Sharma",
      uhid: "AE2026GM5123",
      age: 45,
      visitType: "Follow-up",
      chiefComplaint: "Diabetes review",
      waitingSince: "09:45",
      status: "in-progress",
      doctor: "Dr. Mehta",
    },
    { 
      id: "q-002",
      tokenNo: 48,
      name: "Rajesh Pillai",
      uhid: "AE2026GM5089",
      age: 52,
      visitType: "New",
      chiefComplaint: "Fever 3 days, body ache",
      waitingSince: "09:52",
      status: "waiting",
      doctor: "Dr. Mehta",
    },
    { 
      id: "q-003",
      tokenNo: 49,
      name: "Sunita Devi",
      uhid: "AE2026GM5156",
      age: 38,
      visitType: "Follow-up",
      chiefComplaint: "HTN review, dizziness",
      waitingSince: "09:58",
      status: "waiting",
      doctor: "Dr. Mehta",
    },
    { 
      id: "q-004",
      tokenNo: 50,
      name: "Mohammed Irfan",
      uhid: "AE2026GM5201",
      age: 61,
      visitType: "Follow-up",
      chiefComplaint: "Diabetes + HTN review",
      waitingSince: "10:05",
      status: "waiting",
      doctor: "Dr. Sharma",
    },
    { 
      id: "q-005",
      tokenNo: 51,
      name: "Priya Nair",
      uhid: "AE2026GM5178",
      age: 29,
      visitType: "New",
      chiefComplaint: "Cough, cold 5 days",
      waitingSince: "10:12",
      status: "waiting",
      doctor: "Dr. Sharma",
    },
  ],

  recentConsults: [
    {
      id: "rc-001",
      tokenNo: 46,
      name: "Kamala Rani",
      uhid: "AE2026GM5098",
      age: 56,
      visitType: "Follow-up",
      diagnosis: "Type 2 DM - controlled",
      hba1c: 6.8,
      duration: 4,
      completedAt: "10:02",
    },
    {
      id: "rc-002",
      tokenNo: 45,
      name: "Suresh Babu",
      uhid: "AE2026GM5067",
      age: 48,
      visitType: "New",
      diagnosis: "Acute viral fever",
      duration: 5,
      completedAt: "09:58",
    },
    {
      id: "rc-003",
      tokenNo: 44,
      name: "Geeta Menon",
      uhid: "AE2026GM5034",
      age: 62,
      visitType: "Follow-up",
      diagnosis: "Essential HTN - uncontrolled",
      bp: "158/96",
      duration: 6,
      completedAt: "09:52",
    },
    {
      id: "rc-004",
      tokenNo: 43,
      name: "Arjun Singh",
      uhid: "AE2026GM5012",
      age: 35,
      visitType: "New",
      diagnosis: "GERD with dyspepsia",
      duration: 4,
      completedAt: "09:46",
    },
  ],

  orderSetUsage: [
    { name: "Fever Panel", usageToday: 12, avgTime: "45s" },
    { name: "Diabetes Annual", usageToday: 8, avgTime: "38s" },
    { name: "HTN Review", usageToday: 15, avgTime: "32s" },
    { name: "Thyroid Panel", usageToday: 6, avgTime: "28s" },
    { name: "Pre-employment", usageToday: 4, avgTime: "52s" },
  ],

  diagnosisDistribution: [
    { diagnosis: "Type 2 DM", count: 18, percentage: 25 },
    { diagnosis: "Essential HTN", count: 14, percentage: 19 },
    { diagnosis: "Acute Viral Fever", count: 12, percentage: 17 },
    { diagnosis: "URTI", count: 8, percentage: 11 },
    { diagnosis: "Hypothyroidism", count: 6, percentage: 8 },
    { diagnosis: "Others", count: 14, percentage: 20 },
  ],

  weeklyTrends: [
    { day: "Mon", opdCount: 68, chronicReviews: 28, newPatients: 24 },
    { day: "Tue", opdCount: 74, chronicReviews: 32, newPatients: 28 },
    { day: "Wed", opdCount: 65, chronicReviews: 26, newPatients: 22 },
    { day: "Thu", opdCount: 78, chronicReviews: 35, newPatients: 30 },
    { day: "Fri", opdCount: 72, chronicReviews: 32, newPatients: 28 },
    { day: "Sat", opdCount: 82, chronicReviews: 38, newPatients: 32 },
    { day: "Sun", opdCount: 45, chronicReviews: 18, newPatients: 16 },
  ],

  doctorPerformance: [
    {
      id: "doc-001",
      name: "Dr. Anil Mehta",
      designation: "Senior Consultant",
      patientsToday: 32,
      avgConsultTime: 4.2,
      rating: 4.8,
      specialization: "Diabetes Care",
    },
    {
      id: "doc-002",
      name: "Dr. Priya Sharma",
      designation: "Consultant",
      patientsToday: 28,
      avgConsultTime: 4.8,
      rating: 4.7,
      specialization: "Cardio-metabolic",
    },
    {
      id: "doc-003",
      name: "Dr. Rakesh Gupta",
      designation: "Consultant",
      patientsToday: 12,
      avgConsultTime: 5.1,
      rating: 4.6,
      specialization: "Geriatric Medicine",
    },
  ],

  vitalsSnapshot: {
    avgBP: { systolic: 132, diastolic: 84 },
    avgPulse: 78,
    avgSpO2: 97,
    avgTemp: 98.4,
    avgBMI: 26.8,
  },
};

// General Medicine templates for demonstration
export const generalMedicineTemplates = [
  { id: "gm-soap", name: "Quick SOAP Note", category: "OPD", usageCount: 28450 },
  { id: "gm-fever", name: "Fever Evaluation", category: "Acute", usageCount: 12340 },
  { id: "gm-diabetes", name: "Diabetes Review", category: "Chronic", usageCount: 18920 },
  { id: "gm-htn", name: "Hypertension Review", category: "Chronic", usageCount: 15670 },
  { id: "gm-thyroid", name: "Thyroid Disorder", category: "Chronic", usageCount: 6890 },
  { id: "gm-resp", name: "Respiratory Illness", category: "Acute", usageCount: 9450 },
  { id: "gm-gi", name: "GI Complaints", category: "Acute", usageCount: 7820 },
  { id: "gm-annual", name: "Annual Health Check", category: "Preventive", usageCount: 4560 },
  { id: "gm-dengue", name: "Dengue Monitoring", category: "Seasonal", usageCount: 2340 },
];

// Order sets
export const generalMedicineOrderSets = {
  fever: {
    name: "Fever Panel",
    tests: ["CBC", "ESR", "CRP", "Dengue NS1", "Typhoid"],
    medications: ["Paracetamol 500mg", "ORS"],
  },
  diabetesAnnual: {
    name: "Diabetes Annual Workup",
    tests: ["HbA1c", "FBS", "PPBS", "Lipid Profile", "Creatinine", "Urine Routine", "Fundoscopy"],
    medications: [],
  },
  htnReview: {
    name: "HTN Review",
    tests: ["Creatinine", "Potassium", "Lipid Profile", "ECG"],
    medications: [],
  },
};

export type GeneralMedicineDashboardData = typeof generalMedicineDashboardData;
export type GeneralMedicineTemplates = typeof generalMedicineTemplates;
