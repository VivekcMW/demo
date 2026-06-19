// CTVS Dashboard Seeded Data

export const ctvsDashboardData = {
  todayStats: {
    opdPatients: 24,
    surgeries: 4,
    icuPatients: 8,
    echoScheduled: 12,
  },
  surgerySchedule: [
    { id: 1, name: "Mohan Das", procedure: "CABG x3", time: "07:00 AM", ot: "OT-1", status: "in-progress" },
    { id: 2, name: "Lakshmi Rao", procedure: "MVR", time: "11:00 AM", ot: "OT-1", status: "scheduled" },
    { id: 3, name: "Rajesh Patel", procedure: "AVR", time: "02:00 PM", ot: "OT-2", status: "scheduled" },
    { id: 4, name: "Sunita Verma", procedure: "ASD Closure", time: "04:00 PM", ot: "OT-2", status: "scheduled" },
  ],
  procedureStats: {
    cabg: { total: 856, thisYear: 124 },
    valveSurgery: { total: 342, mvr: 186, avr: 124, dvr: 32 },
    congenital: { total: 186, asd: 86, vsd: 52, tof: 28, other: 20 },
    aortic: { total: 68, aneurysm: 42, dissection: 26 },
  },
  icuStatus: {
    totalBeds: 12,
    occupied: 8,
    ventilated: 4,
    iabp: 1,
    ecmo: 0,
  },
  postOpRegistry: {
    day0to3: 6,
    day4to7: 4,
    week2: 8,
    month1: 24,
    month3: 42,
  },
  outcomes: {
    mortality30Day: 2.4,
    reOperation: 3.2,
    infection: 4.8,
    strokeRate: 1.6,
  },
  weeklyTrend: [
    { day: "Mon", opd: 22, surgery: 3 },
    { day: "Tue", opd: 24, surgery: 4 },
    { day: "Wed", opd: 26, surgery: 5 },
    { day: "Thu", opd: 20, surgery: 3 },
    { day: "Fri", opd: 24, surgery: 4 },
    { day: "Sat", opd: 14, surgery: 2 },
  ],
};
