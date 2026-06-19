// Critical Care/ICU Dashboard Seeded Data

export const criticalCareDashboardData = {
  todayStats: {
    totalBeds: 20,
    occupied: 18,
    available: 2,
    onVentilator: 8,
    onVasopressors: 5,
    onDialysis: 3,
    admissions: 4,
    discharges: 2,
    deaths: 0,
    avgApacheII: 18.5,
  },

  bedCensus: {
    medical: { total: 8, occupied: 7 },
    surgical: { total: 6, occupied: 6 },
    cardiac: { total: 4, occupied: 4 },
    neuro: { total: 2, occupied: 1 },
  },

  ventilatorStatus: {
    total: 12,
    inUse: 8,
    available: 4,
    weaning: 2,
  },

  currentPatients: [
    {
      id: "ICU001",
      bed: "ICU-01",
      name: "Ramesh Kumar",
      age: "62",
      gender: "M",
      diagnosis: "ARDS s/p COVID pneumonia",
      dayInICU: 5,
      apacheII: 22,
      sofa: 8,
      vitals: { bp: "110/70", hr: 92, spo2: 94, temp: 37.2 },
      supports: ["Ventilator", "Vasopressors"],
      status: "critical",
      ventMode: "SIMV",
      fio2: 60,
    },
    {
      id: "ICU002",
      bed: "ICU-02",
      name: "Sunita Devi",
      age: "55",
      gender: "F",
      diagnosis: "Post CABG POD-1",
      dayInICU: 1,
      apacheII: 15,
      sofa: 5,
      vitals: { bp: "125/80", hr: 88, spo2: 98, temp: 36.8 },
      supports: ["Ventilator"],
      status: "stable",
      ventMode: "CPAP",
      fio2: 40,
    },
    {
      id: "ICU003",
      bed: "ICU-03",
      name: "Vijay Singh",
      age: "48",
      gender: "M",
      diagnosis: "Severe sepsis - UTI source",
      dayInICU: 3,
      apacheII: 24,
      sofa: 10,
      vitals: { bp: "85/55", hr: 115, spo2: 96, temp: 38.5 },
      supports: ["Ventilator", "Vasopressors", "Dialysis"],
      status: "critical",
      ventMode: "AC/VC",
      fio2: 70,
    },
    {
      id: "ICU004",
      bed: "ICU-04",
      name: "Lakshmi Nair",
      age: "70",
      gender: "F",
      diagnosis: "Massive CVA - SDH evacuated",
      dayInICU: 7,
      apacheII: 28,
      sofa: 12,
      vitals: { bp: "140/90", hr: 76, spo2: 97, temp: 37.0 },
      supports: ["Ventilator", "ICP monitoring"],
      status: "critical",
      ventMode: "CMV",
      fio2: 45,
    },
  ],

  ventilatorPatients: [
    { bed: "ICU-01", name: "Ramesh Kumar", mode: "SIMV", fio2: 60, peep: 10, pip: 22, vt: 450 },
    { bed: "ICU-02", name: "Sunita Devi", mode: "CPAP", fio2: 40, peep: 5, pip: 12, vt: 480 },
    { bed: "ICU-03", name: "Vijay Singh", mode: "AC/VC", fio2: 70, peep: 12, pip: 28, vt: 420 },
    { bed: "ICU-04", name: "Lakshmi Nair", mode: "CMV", fio2: 45, peep: 8, pip: 20, vt: 400 },
  ],

  pendingTasks: {
    total: 24,
    urgent: 8,
    items: [
      { patient: "Vijay Singh", task: "Repeat lactate", priority: "urgent", due: "Now" },
      { patient: "Ramesh Kumar", task: "ABG analysis", priority: "urgent", due: "1 hr" },
      { patient: "Lakshmi Nair", task: "Neuro check", priority: "urgent", due: "Now" },
      { patient: "Sunita Devi", task: "Chest X-ray", priority: "routine", due: "2 hr" },
      { patient: "All patients", task: "4-hourly vitals", priority: "routine", due: "12 PM" },
    ],
  },

  labResults: {
    pending: 6,
    critical: 2,
    recent: [
      { patient: "Vijay Singh", test: "Lactate", value: "4.2", unit: "mmol/L", flag: "high", time: "10:30 AM" },
      { patient: "Ramesh Kumar", test: "PaO2", value: "65", unit: "mmHg", flag: "low", time: "10:15 AM" },
      { patient: "Sunita Devi", test: "Hb", value: "9.2", unit: "g/dL", flag: "low", time: "10:00 AM" },
    ],
  },

  nursingRatio: {
    patients: 18,
    nurses: 6,
    ratio: "3:1",
    shiftChange: "2:00 PM",
  },

  dailySummary: {
    newAdmissions: 4,
    discharges: 2,
    deaths: 0,
    ventDays: 32,
    avgLos: 4.2,
    vap: 0,
    clabsi: 0,
    cauti: 0,
  },

  hourlyTrends: [
    { hour: "6 AM", avgMAP: 72, avgHR: 88 },
    { hour: "8 AM", avgMAP: 75, avgHR: 85 },
    { hour: "10 AM", avgMAP: 78, avgHR: 90 },
    { hour: "12 PM", avgMAP: 74, avgHR: 92 },
    { hour: "2 PM", avgMAP: 76, avgHR: 88 },
    { hour: "4 PM", avgMAP: 80, avgHR: 86 },
    { hour: "Now", avgMAP: 77, avgHR: 89 },
  ],
};

export const criticalCareTemplates = [
  { id: "icu-admission", name: "ICU Admission Note", category: "Admission", usageCount: 4500 },
  { id: "vent-init", name: "Ventilator Initiation", category: "Respiratory", usageCount: 2800 },
  { id: "daily-round", name: "ICU Daily Round", category: "Progress", usageCount: 12000 },
  { id: "sepsis-bundle", name: "Sepsis Bundle", category: "Protocol", usageCount: 1800 },
  { id: "vas-protocol", name: "Vasopressor Protocol", category: "Protocol", usageCount: 1200 },
  { id: "weaning-trial", name: "Weaning Trial", category: "Respiratory", usageCount: 2200 },
  { id: "trach-care", name: "Tracheostomy Care", category: "Procedure", usageCount: 980 },
  { id: "icu-discharge", name: "ICU Discharge Summary", category: "Discharge", usageCount: 3800 },
  { id: "death-cert", name: "Death Certificate", category: "Documentation", usageCount: 450 },
];

export type CriticalCareDashboardData = typeof criticalCareDashboardData;
