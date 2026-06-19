// Pediatric Subspecialties Dashboard Seeded Data

export const pediatricSubspecialtiesDashboardData = {
  todayStats: {
    totalOPD: 68,
    neonatalICU: 18,
    pediatricICU: 12,
    surgeries: 6,
  },
  subspecialtyQueue: [
    { id: 1, name: "Baby Sharma", subspecialty: "Neonatology", age: "10d", time: "09:30 AM", status: "in-nicu" },
    { id: 2, name: "Aryan Kumar", subspecialty: "Cardiology", age: "4y", time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Ananya Reddy", subspecialty: "Nephrology", age: "8y", time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Vivaan Singh", subspecialty: "Neurology", age: "6y", time: "11:00 AM", status: "waiting" },
  ],
  subspecialtyBreakdown: {
    neonatology: { admissions: 856, nicu: 18, survivors: 98.2 },
    cardiology: { total: 424, surgeries: 86, caths: 124 },
    nephrology: { total: 286, dialysis: 24, transplant: 8 },
    neurology: { total: 324, epilepsy: 186, developmental: 98 },
    hemato_oncology: { total: 186, leukemia: 48, solidTumor: 42 },
    gastroenterology: { total: 246, liver: 86, ibd: 42 },
  },
  nicuStatus: {
    totalBeds: 24,
    occupied: 18,
    ventilated: 6,
    vlbw: 4,
    elbw: 2,
  },
  picuStatus: {
    totalBeds: 16,
    occupied: 12,
    ventilated: 4,
    postOp: 6,
  },
  vaccinationClinic: {
    today: 86,
    catchUp: 24,
    special: 12,
  },
  weeklyTrend: [
    { day: "Mon", opd: 62, admissions: 8 },
    { day: "Tue", opd: 68, admissions: 10 },
    { day: "Wed", opd: 72, admissions: 12 },
    { day: "Thu", opd: 58, admissions: 6 },
    { day: "Fri", opd: 70, admissions: 9 },
    { day: "Sat", opd: 48, admissions: 4 },
  ],
};
