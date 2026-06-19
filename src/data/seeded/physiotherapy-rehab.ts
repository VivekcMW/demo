// Physiotherapy & Rehabilitation Dashboard Seeded Data

export const physiotherapyRehabDashboardData = {
  todayStats: {
    sessions: 86,
    newAssessments: 12,
    hydrotherapy: 8,
    homePlans: 24,
  },
  sessionQueue: [
    { id: 1, name: "Ramesh Sharma", condition: "Post TKR", session: "Gait Training", time: "09:30 AM", status: "in-progress" },
    { id: 2, name: "Sunita Devi", condition: "Frozen Shoulder", session: "Mobilization", time: "10:00 AM", status: "waiting" },
    { id: 3, name: "Vijay Kumar", condition: "Stroke Rehab", session: "Neuro PT", time: "10:30 AM", status: "waiting" },
    { id: 4, name: "Priya Gupta", condition: "Sports Injury", session: "Strength", time: "11:00 AM", status: "waiting" },
  ],
  serviceBreakdown: {
    musculoskeletal: { total: 4256, active: 486 },
    neurological: { total: 1824, active: 186 },
    cardiopulmonary: { total: 856, active: 86 },
    pediatric: { total: 424, active: 48 },
    sports: { total: 624, active: 124 },
  },
  therapyModalities: {
    manualTherapy: 324,
    electrotherapy: 186,
    hydrotherapy: 48,
    dryNeedling: 86,
    taping: 124,
  },
  outcomeMetrics: {
    painReduction: 78,
    romImprovement: 82,
    functionalGain: 76,
    returnToWork: 68,
  },
  equipmentUtilization: {
    parallelBars: 86,
    treadmill: 72,
    ultrasound: 68,
    tens: 82,
    pool: 48,
  },
  weeklyTrend: [
    { day: "Mon", sessions: 82, assessments: 10 },
    { day: "Tue", sessions: 86, assessments: 12 },
    { day: "Wed", sessions: 92, assessments: 14 },
    { day: "Thu", sessions: 78, assessments: 8 },
    { day: "Fri", sessions: 88, assessments: 12 },
    { day: "Sat", sessions: 64, assessments: 6 },
  ],
};
