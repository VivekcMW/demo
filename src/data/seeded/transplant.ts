// Transplant Dashboard Seeded Data

export const transplantDashboardData = {
  todayStats: {
    evaluations: 8,
    transplants: 2,
    followUps: 24,
    postOpRounds: 18,
    ipdPatients: 18,
  },
  waitlistQueue: [
    { id: 1, name: "Anand Sharma", organ: "Kidney", bloodGroup: "O+", waitDays: 186, waitTime: "186 days", time: "186 days", priority: "standard", status: "active" },
    { id: 2, name: "Meera Patel", organ: "Liver", bloodGroup: "B+", waitDays: 124, waitTime: "124 days", time: "124 days", priority: "standard", status: "active" },
    { id: 3, name: "Vijay Kumar", organ: "Heart", bloodGroup: "A+", waitDays: 286, waitTime: "286 days", time: "286 days", priority: "urgent", status: "urgent" },
    { id: 4, name: "Sunita Reddy", organ: "Lung", bloodGroup: "AB+", waitDays: 142, waitTime: "142 days", time: "142 days", priority: "standard", status: "active" },
  ],
  transplantSchedule: [
    { id: 1, name: "Rajesh Kumar", organ: "Kidney (LDKT)", status: "in-or", time: "07:00 AM" },
    { id: 2, name: "Priya Sharma", organ: "Liver (LDLT)", status: "scheduled", time: "11:00 AM" },
  ],
  organStats: {
    kidney: { total: 856, living: 624, deceased: 232, waitlist: 186 },
    liver: { total: 324, living: 186, deceased: 138, waitlist: 142 },
    heart: { total: 48, deceased: 48, waitlist: 86 },
    lung: { total: 24, deceased: 24, waitlist: 42 },
    pancreas: { total: 12, deceased: 12, waitlist: 18 },
  },
  waitlistStatus: {
    active: 474,
    onHold: 86,
    kidney: 186,
    liver: 142,
    heart: 86,
    lung: 42,
    newThisMonth: 24,
    removedThisMonth: 18,
  },
  donorRegistry: {
    livingDonors: { evaluated: 186, approved: 142, inProcess: 24 },
    deceasedDonors: { thisYear: 48, utilized: 42 },
  },
  postTransplantRegistry: {
    under1Year: 86,
    oneToFive: 286,
    overFive: 484,
    totalActive: 856,
  },
  outcomes: {
    oneYearSurvival: 96,
    graftFunction: 94,
    rejectionRate: 12,
    patientSurvival1Yr: 96,
    graftSurvival1Yr: 94,
    rejection: 12,
    infection: 18,
  },
  weeklyTrend: [
    { day: "Mon", evaluations: 6, transplants: 1 },
    { day: "Tue", evaluations: 8, transplants: 2 },
    { day: "Wed", evaluations: 10, transplants: 3 },
    { day: "Thu", evaluations: 6, transplants: 1 },
    { day: "Fri", evaluations: 8, transplants: 2 },
    { day: "Sat", evaluations: 4, transplants: 1 },
  ],
};
