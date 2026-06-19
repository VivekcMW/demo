// Emergency Medicine Dashboard Seeded Data

export const emergencyMedicineDashboardData = {
  todayStats: {
    totalPatients: 78,
    currentlyInED: 24,
    resus: 2,
    critical: 4,
    urgent: 8,
    nonUrgent: 10,
    admissions: 18,
    discharges: 36,
    leftAMA: 2,
    avgDoorToDoc: "8 min",
  },

  triageStatus: {
    red: 2,
    orange: 4,
    yellow: 8,
    green: 10,
    avgTriageTime: "3 min",
  },

  resuscitationBays: {
    total: 4,
    occupied: 2,
    available: 2,
    patients: [
      {
        id: "RES001",
        bay: "Resus-1",
        name: "Ramesh Yadav",
        age: "58",
        gender: "M",
        chiefComplaint: "Chest pain, diaphoresis",
        vitals: { bp: "90/60", hr: 110, spo2: 88 },
        status: "STEMI - Cath lab alert",
        arrivedAt: "09:45 AM",
        team: "Dr. Sharma + Team A",
      },
      {
        id: "RES002",
        bay: "Resus-2",
        name: "Sunita Devi",
        age: "45",
        gender: "F",
        chiefComplaint: "Road traffic accident - polytrauma",
        vitals: { bp: "100/70", hr: 120, spo2: 94 },
        status: "Trauma activation - awaiting CT",
        arrivedAt: "10:15 AM",
        team: "Dr. Kumar + Trauma Team",
      },
    ],
  },

  currentQueue: [
    {
      id: "ER001",
      tokenNo: 45,
      name: "Vijay Singh",
      age: "32",
      gender: "M",
      triage: "yellow",
      chiefComplaint: "High fever, cough x 5 days",
      arrivedAt: "10:30 AM",
      status: "waiting",
      zone: "Zone B",
    },
    {
      id: "ER002",
      tokenNo: 46,
      name: "Kavita Sharma",
      age: "28",
      gender: "F",
      triage: "orange",
      chiefComplaint: "Severe abdominal pain, vomiting",
      arrivedAt: "10:35 AM",
      status: "in-progress",
      zone: "Zone A",
    },
    {
      id: "ER003",
      tokenNo: 47,
      name: "Mohan Lal",
      age: "65",
      gender: "M",
      triage: "yellow",
      chiefComplaint: "Breathlessness, pedal edema",
      arrivedAt: "10:40 AM",
      status: "waiting",
      zone: "Zone B",
    },
    {
      id: "ER004",
      tokenNo: 48,
      name: "Priya Nair",
      age: "22",
      gender: "F",
      triage: "green",
      chiefComplaint: "Minor laceration - hand",
      arrivedAt: "10:45 AM",
      status: "waiting",
      zone: "Zone C",
    },
  ],

  bedStatus: {
    zone_a: { total: 8, occupied: 6, name: "Critical Care" },
    zone_b: { total: 12, occupied: 10, name: "Acute Care" },
    zone_c: { total: 8, occupied: 4, name: "Fast Track" },
    observation: { total: 6, occupied: 4, name: "Observation" },
  },

  pendingActions: {
    labsAwaited: 12,
    imagingAwaited: 8,
    consultsPending: 6,
    dischargesPending: 5,
    admissionsPending: 4,
    items: [
      { patient: "Kavita Sharma", action: "CT Abdomen - Report awaited", priority: "high" },
      { patient: "Mohan Lal", action: "Cardiology consult pending", priority: "high" },
      { patient: "Vijay Singh", action: "CBC, CRP results pending", priority: "medium" },
      { patient: "Raj Kumar", action: "Discharge summary pending", priority: "low" },
    ],
  },

  ambulanceLog: {
    expected: 3,
    arrived: 12,
    cases: [
      { eta: "5 min", type: "Cardiac", source: "108 Ambulance", priority: "red" },
      { eta: "15 min", type: "RTA", source: "Private", priority: "orange" },
      { eta: "25 min", type: "Stroke", source: "108 Ambulance", priority: "red" },
    ],
  },

  codeStatus: {
    codeBlue: { active: false, lastActivation: "Yesterday, 3:45 PM" },
    traumaAlert: { active: true, location: "Resus-2" },
    strokeAlert: { active: false, lastActivation: "Today, 8:30 AM" },
    stemiAlert: { active: true, location: "Resus-1" },
  },

  hourlyTrends: [
    { hour: "6 AM", arrivals: 4, discharges: 2 },
    { hour: "7 AM", arrivals: 6, discharges: 3 },
    { hour: "8 AM", arrivals: 8, discharges: 5 },
    { hour: "9 AM", arrivals: 10, discharges: 6 },
    { hour: "10 AM", arrivals: 12, discharges: 8 },
    { hour: "11 AM", arrivals: 8, discharges: 7 },
    { hour: "Now", arrivals: 6, discharges: 5 },
  ],

  chiefComplaints: [
    { complaint: "Chest pain", count: 8, percentage: 16 },
    { complaint: "Fever", count: 12, percentage: 24 },
    { complaint: "Abdominal pain", count: 10, percentage: 20 },
    { complaint: "Breathlessness", count: 6, percentage: 12 },
    { complaint: "Trauma/Injury", count: 8, percentage: 16 },
    { complaint: "Others", count: 6, percentage: 12 },
  ],
};

export const emergencyMedicineTemplates = [
  { id: "triage-form", name: "Triage Assessment", category: "Triage", usageCount: 15000 },
  { id: "chest-pain", name: "Chest Pain Workup", category: "Protocol", usageCount: 4200 },
  { id: "trauma-primary", name: "Trauma Primary Survey", category: "Trauma", usageCount: 2800 },
  { id: "stroke-code", name: "Stroke Code Protocol", category: "Code", usageCount: 1200 },
  { id: "stemi-code", name: "STEMI Protocol", category: "Code", usageCount: 980 },
  { id: "sepsis-screen", name: "Sepsis Screening", category: "Protocol", usageCount: 3500 },
  { id: "acute-abdomen", name: "Acute Abdomen Eval", category: "Emergency", usageCount: 2400 },
  { id: "poisoning", name: "Poisoning Protocol", category: "Toxicology", usageCount: 1100 },
  { id: "ed-discharge", name: "ED Discharge Summary", category: "Discharge", usageCount: 12000 },
];

export type EmergencyMedicineDashboardData = typeof emergencyMedicineDashboardData;
