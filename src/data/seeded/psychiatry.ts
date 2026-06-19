// Psychiatry Dashboard Seeded Data

export const psychiatryDashboardData = {
  todayStats: {
    opdPatients: 35,
    newConsults: 8,
    followUps: 27,
    emergencies: 2,
  },
  opdQueue: [
    { id: 1, name: "Rahul Verma", age: 32, diagnosis: "Major Depression", time: "09:30 AM", status: "in-session" },
    { id: 2, name: "Priya Nair", age: 28, diagnosis: "Anxiety Disorder", time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Anand Kumar", age: 45, diagnosis: "Bipolar Disorder", time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Meena Sharma", age: 55, diagnosis: "Late-onset Depression", time: "11:00 AM", status: "waiting" },
  ],
  diseaseRegistry: {
    depression: { total: 425, mild: 148, moderate: 186, severe: 91 },
    anxiety: { total: 312, gad: 145, panic: 68, socialAnxiety: 54, ocd: 45 },
    bipolar: { total: 86, type1: 52, type2: 34 },
    schizophrenia: { total: 124, stable: 78, active: 46 },
    substanceUse: { total: 68, alcohol: 38, opioid: 18, other: 12 },
  },
  therapySessions: {
    cbt: 24,
    dbt: 8,
    familyTherapy: 6,
    groupTherapy: 12,
  },
  medicationMonitoring: {
    ssriSnri: 386,
    antipsychotics: 148,
    moodStabilizers: 92,
    anxiolytics: 156,
  },
  phq9Scores: {
    minimal: 148,
    mild: 186,
    moderate: 124,
    severe: 67,
  },
  weeklyTrend: [
    { day: "Mon", opd: 32, newCases: 6 },
    { day: "Tue", opd: 35, newCases: 8 },
    { day: "Wed", opd: 38, newCases: 10 },
    { day: "Thu", opd: 30, newCases: 5 },
    { day: "Fri", opd: 36, newCases: 7 },
    { day: "Sat", opd: 22, newCases: 4 },
  ],
};
