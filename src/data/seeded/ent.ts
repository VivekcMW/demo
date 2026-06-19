// ENT Dashboard Seeded Data

export const entDashboardData = {
  todayStats: {
    opdPatients: 38,
    surgeries: 5,
    audiometries: 12,
    emergencies: 3,
  },
  opdQueue: [
    { id: 1, name: "Priya Nair", age: 28, issue: "Tonsillitis", time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Rohan Gupta", age: 45, issue: "Vertigo", time: "09:45 AM", status: "waiting" },
    { id: 3, name: "Meena Kumari", age: 52, issue: "Hearing Loss", time: "10:00 AM", status: "waiting" },
    { id: 4, name: "Arjun Reddy", age: 8, issue: "Adenoid Hypertrophy", time: "10:15 AM", status: "waiting" },
  ],
  surgerySchedule: [
    { id: 1, name: "Sunita Devi", procedure: "Septoplasty", time: "11:00 AM", ot: "OT-2", status: "scheduled" },
    { id: 2, name: "Vikram Sinha", procedure: "FESS", time: "01:00 PM", ot: "OT-2", status: "scheduled" },
    { id: 3, name: "Kavita Mehta", procedure: "Tympanoplasty", time: "03:00 PM", ot: "OT-3", status: "scheduled" },
  ],
  clinicRegistry: {
    chronicSinusitis: { total: 85, onMedication: 62, postSurgery: 23 },
    hearingLoss: { total: 156, mild: 68, moderate: 52, severe: 36 },
    vertigo: { total: 42, bppv: 28, meniere: 8, other: 6 },
    sleepApnea: { total: 34, onCpap: 18, postSurgery: 16 },
  },
  audiologyStats: {
    puretonePending: 8,
    impedanceToday: 6,
    oaePediatric: 4,
    hearingAidTrials: 3,
  },
  weeklyTrend: [
    { day: "Mon", opd: 35, surgery: 4 },
    { day: "Tue", opd: 38, surgery: 5 },
    { day: "Wed", opd: 42, surgery: 6 },
    { day: "Thu", opd: 36, surgery: 4 },
    { day: "Fri", opd: 40, surgery: 5 },
    { day: "Sat", opd: 28, surgery: 3 },
  ],
};
