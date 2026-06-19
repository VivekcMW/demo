// Pain Medicine Dashboard Seeded Data

export const painMedicineDashboardData = {
  todayStats: {
    consultations: 28,
    procedures: 12,
    blockScheduled: 8,
    followUps: 18,
  },
  patientQueue: [
    { id: 1, name: "Suresh Menon", condition: "Chronic Low Back Pain", pain: 7, time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Kamala Devi", condition: "Trigeminal Neuralgia", pain: 9, time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Rajesh Kumar", condition: "Failed Back Surgery", pain: 8, time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Priya Sharma", condition: "Complex Regional Pain", pain: 8, time: "11:00 AM", status: "waiting" },
  ],
  procedureBreakdown: {
    epidural: { total: 856, lumbar: 624, cervical: 186, thoracic: 46 },
    facetBlock: { total: 424, lumbar: 324, cervical: 100 },
    rfAblation: { total: 186, facet: 124, sympathetic: 42, peripheral: 20 },
    spinalCordStim: { total: 48, trials: 24, implants: 24 },
  },
  painRegistry: {
    chronic: 486,
    cancer: 86,
    neuropathic: 186,
    musculoskeletal: 324,
  },
  outcomes: {
    painReduction50: 68,
    functionalImprove: 72,
    opioidReduction: 42,
    patientSatisfaction: 85,
  },
  interventions: {
    medicationManagement: 324,
    physicalTherapy: 186,
    psychologicalSupport: 86,
    integrative: 48,
  },
  weeklyTrend: [
    { day: "Mon", consults: 26, procedures: 10 },
    { day: "Tue", consults: 28, procedures: 12 },
    { day: "Wed", consults: 32, procedures: 14 },
    { day: "Thu", consults: 24, procedures: 8 },
    { day: "Fri", consults: 30, procedures: 12 },
    { day: "Sat", consults: 18, procedures: 6 },
  ],
};
