// Infectious Diseases Dashboard Seeded Data

export const infectiousDiseasesDashboardData = {
  todayStats: {
    opdPatients: 32,
    hivClinic: 18,
    tbClinic: 12,
    feverWorkup: 8,
  },
  activeOutbreaks: [
    { id: 1, disease: "Dengue", cases: 45, trend: "rising", alert: "high" },
    { id: 2, disease: "Malaria", cases: 28, trend: "stable", alert: "medium" },
    { id: 3, disease: "Typhoid", cases: 12, trend: "declining", alert: "low" },
  ],
  hivRegistry: {
    total: 486,
    onART: 452,
    viralSuppressed: 418,
    newDiagnosis: 8,
    lostToFollowUp: 12,
  },
  tbRegistry: {
    activeCases: 124,
    pulmonary: 86,
    extraPulmonary: 38,
    mdr: 8,
    onTreatment: 118,
    completed: 256,
  },
  hepatitisRegistry: {
    hepatitisB: { total: 145, onAntivirals: 112, monitoring: 33 },
    hepatitisC: { total: 68, onDAA: 42, svr: 56 },
  },
  travelClinic: {
    consultations: 6,
    vaccinations: 12,
    prophylaxis: 4,
  },
  antimicrobialStewardship: {
    consultations: 14,
    deEscalations: 8,
    restrictedUse: 6,
  },
  weeklyTrend: [
    { day: "Mon", opd: 28, hivClinic: 15 },
    { day: "Tue", opd: 32, hivClinic: 18 },
    { day: "Wed", opd: 35, hivClinic: 22 },
    { day: "Thu", opd: 30, hivClinic: 16 },
    { day: "Fri", opd: 34, hivClinic: 20 },
    { day: "Sat", opd: 20, hivClinic: 10 },
  ],
};
