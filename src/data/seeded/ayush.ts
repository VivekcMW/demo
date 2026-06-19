// AYUSH Dashboard Seeded Data

export const ayushDashboardData = {
  todayStats: {
    opdPatients: 45,
    panchakarma: 8,
    yoga: 12,
    followUps: 25,
  },
  opdQueue: [
    { id: 1, name: "Ramesh Sharma", age: 55, complaint: "Joint Pain", system: "Ayurveda", time: "09:30 AM", status: "in-consult" },
    { id: 2, name: "Sunita Devi", age: 42, complaint: "Skin Disorder", system: "Ayurveda", time: "09:45 AM", status: "waiting" },
    { id: 3, name: "Ankit Verma", age: 35, complaint: "Stress Management", system: "Yoga", time: "10:00 AM", status: "waiting" },
    { id: 4, name: "Priya Gupta", age: 28, complaint: "Infertility", system: "Ayurveda", time: "10:15 AM", status: "waiting" },
  ],
  systemBreakdown: {
    ayurveda: { total: 856, active: 245, followUp: 611 },
    yoga: { total: 324, active: 86, followUp: 238 },
    unani: { total: 145, active: 42, followUp: 103 },
    siddha: { total: 68, active: 18, followUp: 50 },
    homeopathy: { total: 412, active: 124, followUp: 288 },
  },
  panchakarmaSchedule: {
    vamana: 2,
    virechana: 3,
    basti: 4,
    nasya: 6,
    raktamokshana: 1,
  },
  conditionRegistry: {
    musculoskeletal: 245,
    skin: 186,
    digestive: 156,
    respiratory: 124,
    neurological: 98,
    metabolic: 86,
  },
  weeklyTrend: [
    { day: "Mon", opd: 42, panchakarma: 6 },
    { day: "Tue", opd: 45, panchakarma: 8 },
    { day: "Wed", opd: 48, panchakarma: 10 },
    { day: "Thu", opd: 40, panchakarma: 5 },
    { day: "Fri", opd: 46, panchakarma: 7 },
    { day: "Sat", opd: 35, panchakarma: 4 },
  ],
};
