/**
 * Endocrinology & Diabetology specialty data
 * Includes diabetes registry, thyroid tracking, insulin protocols, HbA1c monitoring
 */

export const endocrinologyDashboardData = {
  todayStats: {
    totalPatients: 42,
    diabetesVisits: 28,
    thyroidCases: 9,
    newPatients: 5,
    avgHbA1c: 7.8,
    controlledDM: 62, // percentage
    pendingReviews: 8,
    insulinAdjustments: 12,
  },

  glucoseMetrics: {
    timeInRange: 68, // percentage
    avgFasting: 142,
    avgPostPrandial: 186,
    hypoglycemicEvents: 3,
    hyperglycemicEvents: 7,
  },

  diabetesRegistry: {
    totalRegistered: 1284,
    type1: 156,
    type2: 1098,
    gestational: 30,
    onInsulin: 412,
    onOralOnly: 742,
    dietControlled: 130,
  },

  todaySchedule: [
    {
      id: "P001",
      time: "09:00",
      name: "Ramesh Gupta",
      age: 58,
      type: "DM2",
      hbA1c: 8.2,
      lastVisit: "3 months",
      reason: "Quarterly review",
      status: "completed",
    },
    {
      id: "P002",
      time: "09:30",
      name: "Sunita Devi",
      age: 45,
      type: "Thyroid",
      tsh: 12.4,
      lastVisit: "6 weeks",
      reason: "TSH follow-up",
      status: "completed",
    },
    {
      id: "P003",
      time: "10:00",
      name: "Amit Sharma",
      age: 34,
      type: "DM1",
      hbA1c: 7.1,
      lastVisit: "1 month",
      reason: "Insulin adjustment",
      status: "in-progress",
    },
    {
      id: "P004",
      time: "10:30",
      name: "Priya Verma",
      age: 29,
      type: "GDM",
      glucoseTrend: "improving",
      gestationWeek: 28,
      reason: "Glucose monitoring",
      status: "waiting",
    },
    {
      id: "P005",
      time: "11:00",
      name: "Rajesh Kumar",
      age: 52,
      type: "DM2",
      hbA1c: 9.4,
      lastVisit: "2 months",
      reason: "Poor control",
      status: "waiting",
    },
    {
      id: "P006",
      time: "11:30",
      name: "Meera Patel",
      age: 38,
      type: "PCOS",
      insulin: "resistant",
      reason: "New diagnosis",
      status: "scheduled",
    },
  ],

  hbA1cTrends: [
    { month: "Jul", value: 8.4 },
    { month: "Aug", value: 8.1 },
    { month: "Sep", value: 7.9 },
    { month: "Oct", value: 7.8 },
    { month: "Nov", value: 7.6 },
    { month: "Dec", value: 7.5 },
  ],

  thyroidCases: [
    {
      id: "T001",
      name: "Sunita Devi",
      age: 45,
      condition: "Hypothyroid",
      currentTSH: 12.4,
      targetTSH: "0.5-4.0",
      medication: "Thyroxine 75mcg",
      compliance: "good",
    },
    {
      id: "T002",
      name: "Anita Rao",
      age: 32,
      condition: "Hyperthyroid",
      currentTSH: 0.02,
      targetTSH: "0.5-4.0",
      medication: "Carbimazole 10mg",
      compliance: "fair",
    },
    {
      id: "T003",
      name: "Kavitha S",
      age: 55,
      condition: "Thyroid nodule",
      fnacResult: "Bethesda III",
      nextAction: "Repeat FNAC",
      compliance: "pending",
    },
  ],

  insulinPatients: [
    {
      id: "I001",
      name: "Amit Sharma",
      regimen: "Basal-Bolus",
      basalDose: "Glargine 22U HS",
      bolusDose: "Aspart 8-10-8U",
      cgm: true,
      lastAdjustment: "2 days ago",
    },
    {
      id: "I002",
      name: "Ravi Menon",
      regimen: "Premixed",
      dose: "Mixtard 30/70 20-0-16U",
      cgm: false,
      lastAdjustment: "1 week ago",
    },
    {
      id: "I003",
      name: "Lakshmi K",
      regimen: "Basal only",
      basalDose: "NPH 14U HS",
      cgm: false,
      lastAdjustment: "3 days ago",
    },
  ],

  pendingLabs: [
    { patient: "Ramesh Gupta", test: "HbA1c", ordered: "Today" },
    { patient: "Priya Verma", test: "GTT 75g", ordered: "Today" },
    { patient: "Meera Patel", test: "Insulin/HOMA-IR", ordered: "Today" },
    { patient: "Sunita Devi", test: "Free T4", ordered: "Yesterday" },
    { patient: "Kavitha S", test: "Thyroglobulin", ordered: "Yesterday" },
  ],

  complications: {
    retinopathy: 145,
    nephropathy: 98,
    neuropathy: 212,
    cardiacRisk: 78,
    footUlcer: 23,
  },
};

export const endocrinologyTemplates = [
  { id: "endo-1", name: "Diabetes Initial Assessment", category: "Assessment", usageCount: 2845 },
  { id: "endo-2", name: "Diabetes Review Visit", category: "Follow-up", usageCount: 4521 },
  { id: "endo-3", name: "Insulin Initiation", category: "Treatment", usageCount: 1256 },
  { id: "endo-4", name: "Insulin Dose Adjustment", category: "Treatment", usageCount: 2187 },
  { id: "endo-5", name: "Thyroid Assessment", category: "Assessment", usageCount: 1876 },
  { id: "endo-6", name: "Thyroid Follow-up", category: "Follow-up", usageCount: 2134 },
  { id: "endo-7", name: "GDM Management", category: "Obstetric", usageCount: 654 },
  { id: "endo-8", name: "Diabetic Foot Exam", category: "Screening", usageCount: 1543 },
  { id: "endo-9", name: "PCOS Evaluation", category: "Assessment", usageCount: 987 },
  { id: "endo-10", name: "Complication Screening", category: "Screening", usageCount: 2456 },
  { id: "endo-11", name: "CGM Report Review", category: "Technology", usageCount: 432 },
  { id: "endo-12", name: "Hypoglycemia Event", category: "Acute", usageCount: 387 },
];
