// Palliative & Geriatrics Dashboard Seeded Data

export const palliativeGeriatricsDashboardData = {
  todayStats: {
    homeVisits: 8,
    opdGeriatric: 24,
    hospiceRounds: 12,
    familyMeetings: 4,
  },
  patientQueue: [
    { id: 1, name: "Shyam Prasad", age: 82, condition: "Advanced COPD", pps: 40, time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Kamala Amma", age: 76, condition: "Metastatic Cancer", pps: 30, time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Raman Nair", age: 85, condition: "End-stage CHF", pps: 50, time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Lakshmi Devi", age: 78, condition: "Dementia", pps: 60, time: "11:00 AM", status: "waiting" },
  ],
  geriatricRegistry: {
    cognitiveImpairment: 186,
    mobilityIssues: 286,
    polypharmacy: 324,
    fallsRisk: 142,
  },
  palliativeRegistry: {
    cancer: 124,
    organFailure: 86,
    neurological: 48,
    frailty: 64,
  },
  hospiceStatus: {
    totalBeds: 20,
    occupied: 16,
    homeProgram: 42,
    respiteCare: 8,
  },
  symptomManagement: {
    painControlled: 85,
    nauseaControlled: 92,
    dyspneaRelieved: 78,
    anxietyManaged: 82,
  },
  careMetrics: {
    advanceDirectives: 68,
    goalsOfCareMeeting: 95,
    familySatisfaction: 92,
    peacefulDeath: 88,
  },
  weeklyTrend: [
    { day: "Mon", opd: 22, homeVisits: 6 },
    { day: "Tue", opd: 24, homeVisits: 8 },
    { day: "Wed", opd: 26, homeVisits: 10 },
    { day: "Thu", opd: 20, homeVisits: 6 },
    { day: "Fri", opd: 24, homeVisits: 8 },
    { day: "Sat", opd: 18, homeVisits: 4 },
  ],
};
