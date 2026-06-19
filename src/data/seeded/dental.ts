// Dental Dashboard Seeded Data

export const dentalDashboardData = {
  todayStats: {
    opdPatients: 48,
    procedures: 36,
    surgeries: 4,
    emergencies: 3,
  },
  chairQueue: [
    { id: 1, name: "Ravi Kumar", procedure: "RCT #36", chair: "Chair 1", time: "09:30 AM", status: "in-progress" },
    { id: 2, name: "Priya Singh", procedure: "Extraction #48", chair: "Chair 2", time: "09:45 AM", status: "in-progress" },
    { id: 3, name: "Ankit Sharma", procedure: "Scaling", chair: "Chair 3", time: "10:00 AM", status: "waiting" },
    { id: 4, name: "Meena Gupta", procedure: "Crown Fitting", chair: "Chair 1", time: "10:30 AM", status: "waiting" },
  ],
  procedureBreakdown: {
    restorative: { total: 2456, filling: 1856, rct: 600 },
    prosthetics: { total: 856, crowns: 486, bridges: 186, dentures: 184 },
    periodontal: { total: 1245, scaling: 986, surgery: 259 },
    oral_surgery: { total: 624, extraction: 486, impaction: 98, implant: 40 },
    orthodontics: { total: 324, braces: 186, aligners: 138 },
  },
  surgerySchedule: [
    { id: 1, name: "Vikram Reddy", procedure: "Impaction #38", time: "11:00 AM", status: "scheduled" },
    { id: 2, name: "Sunita Devi", procedure: "Implant Placement", time: "02:00 PM", status: "scheduled" },
  ],
  maxillofacialCases: {
    trauma: 12,
    tmj: 8,
    cysts: 4,
    tumors: 2,
  },
  orthoRegistry: {
    active: 186,
    newThisMonth: 12,
    retainer: 86,
  },
  weeklyTrend: [
    { day: "Mon", opd: 45, procedures: 32 },
    { day: "Tue", opd: 48, procedures: 36 },
    { day: "Wed", opd: 52, procedures: 40 },
    { day: "Thu", opd: 42, procedures: 30 },
    { day: "Fri", opd: 50, procedures: 38 },
    { day: "Sat", opd: 38, procedures: 28 },
  ],
};
