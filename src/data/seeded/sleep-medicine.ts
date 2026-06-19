// Sleep Medicine Dashboard Seeded Data

export const sleepMedicineDashboardData = {
  todayStats: {
    consultations: 18,
    sleepStudies: 6,
    cpapFollowUps: 12,
    cpapTitrations: 4,
    titrations: 4,
    followUps: 12,
  },
  patientQueue: [
    { id: 1, name: "Suresh Menon", complaint: "Snoring & Apnea", ahi: 32, time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Priya Kumar", complaint: "Insomnia", ahi: null, time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Rakesh Sharma", complaint: "Excessive Sleepiness", ahi: 45, time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Anjali Reddy", complaint: "Restless Legs", ahi: 8, time: "11:00 AM", status: "waiting" },
  ],
  studyBreakdown: {
    diagnostic: { total: 1245, osa: 856, insomnia: 186, narcolepsy: 48, other: 155 },
    titration: { total: 486, cpap: 386, bipap: 86, asv: 14 },
    mslt: { total: 86, narcolepsy: 42, idiopathic: 28, negative: 16 },
  },
  diagnosisBreakdown: {
    osa: 1096,
    severeOSA: 386,
    moderateOSA: 424,
    insomnia: 424,
    narcolepsy: 48,
  },
  osaRegistry: {
    mild: 286,
    moderate: 424,
    severe: 386,
    onCpap: 724,
    compliant: 68,
  },
  disorderRegistry: {
    osa: 1096,
    insomnia: 424,
    narcolepsy: 48,
    rls: 124,
    parasomnia: 86,
  },
  cpapCompliance: {
    excellent: 42,
    good: 26,
    poor: 18,
    nonCompliant: 14,
  },
  labStatus: {
    totalBeds: 8,
    occupied: 6,
    pending: 4,
    hsat_devices: 12,
    outTonight: 8,
  },
  weeklyTrend: [
    { day: "Mon", consults: 16, studies: 4 },
    { day: "Tue", consults: 18, studies: 6 },
    { day: "Wed", consults: 20, studies: 8 },
    { day: "Thu", consults: 14, studies: 4 },
    { day: "Fri", consults: 18, studies: 6 },
    { day: "Sat", consults: 12, studies: 2 },
  ],
};
