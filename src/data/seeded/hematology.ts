// Hematology Dashboard Seeded Data

export const hematologyDashboardData = {
  todayStats: {
    opdPatients: 28,
    transfusions: 12,
    bonemarrowBiopsies: 2,
    chemotherapy: 8,
  },
  transfusionQueue: [
    { id: 1, name: "Ramesh Kumar", component: "Packed RBC", units: 2, time: "10:00 AM", status: "running" },
    { id: 2, name: "Lakshmi Devi", component: "Platelets", units: 6, time: "10:30 AM", status: "waiting" },
    { id: 3, name: "Anand Sharma", component: "FFP", units: 4, time: "11:00 AM", status: "waiting" },
    { id: 4, name: "Priya Reddy", component: "Packed RBC", units: 1, time: "11:30 AM", status: "waiting" },
  ],
  diseaseRegistry: {
    anemia: { total: 245, ironDeficiency: 142, thalassemia: 48, aplastic: 18, other: 37 },
    leukemia: { total: 32, all: 8, aml: 12, cll: 6, cml: 6 },
    lymphoma: { total: 28, hodgkin: 10, nonHodgkin: 18 },
    coagulation: { total: 56, hemophilia: 22, itp: 24, vwd: 10 },
  },
  bloodBankStatus: {
    aPositive: { units: 45, critical: false },
    aNegtive: { units: 8, critical: true },
    bPositive: { units: 38, critical: false },
    bNegative: { units: 5, critical: true },
    oPositive: { units: 52, critical: false },
    oNegative: { units: 12, critical: false },
    abPositive: { units: 18, critical: false },
    abNegative: { units: 3, critical: true },
  },
  chemotherapyCycles: {
    ongoing: 24,
    dueThhisWeek: 8,
    completed: 156,
    onHold: 3,
  },
  weeklyTrend: [
    { day: "Mon", opd: 26, transfusions: 10 },
    { day: "Tue", opd: 28, transfusions: 12 },
    { day: "Wed", opd: 32, transfusions: 14 },
    { day: "Thu", opd: 24, transfusions: 8 },
    { day: "Fri", opd: 30, transfusions: 11 },
    { day: "Sat", opd: 18, transfusions: 6 },
  ],
};
