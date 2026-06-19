// IVF Reproductive Medicine Dashboard Seeded Data

export const ivfDashboardData = {
  todayStats: {
    consultations: 22,
    eggRetrievals: 3,
    embryoTransfers: 4,
    followUps: 15,
  },
  cycleQueue: [
    { id: 1, name: "Priya Menon", cycle: "IVF-ICSI", day: "Day 10", time: "09:30 AM", status: "in-stim" },
    { id: 2, name: "Sneha Reddy", cycle: "FET", day: "Day 18", time: "10:00 AM", status: "ready-et" },
    { id: 3, name: "Anjali Sharma", cycle: "IUI", day: "Day 12", time: "10:30 AM", status: "trigger" },
    { id: 4, name: "Kavitha Nair", cycle: "IVF", day: "Day 3", time: "11:00 AM", status: "in-stim" },
  ],
  cycleStats: {
    ivfIcsi: { active: 28, thisMonth: 12, successRate: 42 },
    fet: { active: 15, thisMonth: 8, successRate: 48 },
    iui: { active: 22, thisMonth: 18, successRate: 18 },
    oocyteFreezing: { active: 4, thisMonth: 2 },
  },
  labStatus: {
    embryosCultured: 45,
    frozenEmbryos: 386,
    oocytesBanked: 124,
    spermSamples: 86,
  },
  outcomeTracking: {
    pregnancyRate: 44,
    livebirthRate: 38,
    multipleRate: 12,
    miscarriageRate: 18,
  },
  patientRegistry: {
    newConsults: 86,
    activeIVF: 42,
    postTransfer: 28,
    pregnant: 18,
  },
  weeklyTrend: [
    { day: "Mon", consults: 20, procedures: 5 },
    { day: "Tue", consults: 22, procedures: 7 },
    { day: "Wed", consults: 25, procedures: 8 },
    { day: "Thu", consults: 18, procedures: 4 },
    { day: "Fri", consults: 24, procedures: 6 },
    { day: "Sat", consults: 15, procedures: 3 },
  ],
};
