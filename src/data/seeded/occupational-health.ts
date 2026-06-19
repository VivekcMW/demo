// Occupational Health Dashboard Seeded Data

export const occupationalHealthDashboardData = {
  todayStats: {
    preEmployment: 24,
    periodic: 18,
    fitnessAssess: 12,
    workplaceVisits: 2,
  },
  examQueue: [
    { id: 1, name: "Ravi Kumar", company: "Tech Corp", exam: "Pre-Employment", time: "09:30 AM", status: "in-progress" },
    { id: 2, name: "Suresh Patel", company: "Steel Works", exam: "Periodic", time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Anita Singh", company: "Pharma Ltd", exam: "Fitness-RTW", time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Vijay Reddy", company: "Auto Parts", exam: "Periodic", time: "11:00 AM", status: "waiting" },
  ],
  examBreakdown: {
    preEmployment: { total: 2456, fit: 2286, conditional: 142, unfit: 28 },
    periodic: { total: 3842, normal: 3486, abnormal: 356 },
    fitnessRTW: { total: 486, cleared: 424, pending: 62 },
  },
  corporateClients: {
    active: 48,
    employees: 12450,
    sitesManaged: 86,
    auditsCompleted: 24,
  },
  healthSurveillance: {
    hearingConservation: 856,
    respiratoryWatch: 424,
    visionScreening: 1245,
    ergonomicAssess: 186,
  },
  workplaceHazards: {
    noisExposure: 186,
    chemicalExposure: 124,
    dustExposure: 98,
    heatStress: 42,
  },
  weeklyTrend: [
    { day: "Mon", exams: 52, visits: 2 },
    { day: "Tue", exams: 54, visits: 1 },
    { day: "Wed", exams: 58, visits: 3 },
    { day: "Thu", exams: 48, visits: 1 },
    { day: "Fri", exams: 56, visits: 2 },
    { day: "Sat", exams: 32, visits: 0 },
  ],
};
