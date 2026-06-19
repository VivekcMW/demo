// Sports Medicine Dashboard Seeded Data

export const sportsMedicineDashboardData = {
  todayStats: {
    consultations: 32,
    rehabilitations: 24,
    injuryEvals: 18,
    performanceTests: 12,
    rehabSessions: 24,
    injections: 8,
    screenings: 12,
  },
  athleteQueue: [
    { id: 1, name: "Virat Singh", sport: "Cricket", injury: "Shoulder Impingement", complaint: "Shoulder Impingement", time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Priya Sharma", sport: "Badminton", injury: "ACL Tear", complaint: "ACL Tear", time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Rahul Kumar", sport: "Football", injury: "Ankle Sprain", complaint: "Ankle Sprain", time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Ananya Reddy", sport: "Athletics", injury: "Stress Fracture", complaint: "Stress Fracture", time: "11:00 AM", status: "waiting" },
  ],
  patientQueue: [
    { id: 1, name: "Virat Singh", sport: "Cricket", injury: "Shoulder Impingement", time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Priya Sharma", sport: "Badminton", injury: "ACL Tear", time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Rahul Kumar", sport: "Football", injury: "Ankle Sprain", time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Ananya Reddy", sport: "Athletics", injury: "Stress Fracture", time: "11:00 AM", status: "waiting" },
  ],
  injuryBreakdown: {
    knee: { total: 856, acl: 186, meniscus: 286, patella: 124, other: 260 },
    shoulder: { total: 624, rotatorCuff: 286, labrum: 124, impingement: 186, other: 28 },
    ankle: { total: 486, sprain: 324, tendon: 98, fracture: 64 },
    muscle: { total: 724, hamstring: 286, quad: 186, calf: 142, other: 110 },
  },
  injuryRegistry: {
    acl: 186,
    meniscus: 286,
    rotatorCuff: 286,
    ankle: 324,
    concussion: 48,
  },
  athleteRegistry: {
    professional: 124,
    amateur: 486,
    recreational: 856,
    student: 324,
  },
  procedureStats: {
    prpInjections: { total: 486, thisMonth: 42 },
    cortisone: { total: 324, thisMonth: 28 },
    viscosupplementation: { total: 186, thisMonth: 18 },
    arthroscopy: { total: 124, thisMonth: 12 },
  },
  outcomes: {
    returnToSport: 86,
    fullRecovery: 78,
    reinjuryRate: 8,
  },
  returnToSport: {
    under3Months: 42,
    threeToSixMonths: 36,
    sixToTwelve: 18,
    overTwelve: 4,
  },
  teamCoverage: {
    activeTeams: 8,
    eventsThisMonth: 12,
    athletesMonitored: 486,
  },
  weeklyTrend: [
    { day: "Mon", consults: 28, rehab: 20 },
    { day: "Tue", consults: 32, rehab: 24 },
    { day: "Wed", consults: 36, rehab: 28 },
    { day: "Thu", consults: 26, rehab: 18 },
    { day: "Fri", consults: 34, rehab: 26 },
    { day: "Sat", consults: 24, rehab: 16 },
  ],
};
