// Vascular Surgery Dashboard Seeded Data

export const vascularSurgeryDashboardData = {
  todayStats: {
    consultations: 22,
    surgeries: 4,
    openSurgeries: 4,
    endovascular: 6,
    woundCare: 8,
    interventions: 6,
    dopplers: 18,
  },
  surgerySchedule: [
    { id: 1, name: "Mohan Das", procedure: "Fem-Pop Bypass", time: "08:00 AM", status: "in-progress" },
    { id: 2, name: "Lakshmi Rao", procedure: "EVAR", time: "11:00 AM", status: "scheduled" },
    { id: 3, name: "Suresh Kumar", procedure: "Varicose Vein Laser", time: "02:00 PM", status: "scheduled" },
  ],
  procedureBreakdown: {
    arterial: {
      total: 624,
      bypass: 186,
      endarterectomy: 124,
      angioplasty: 186,
      evar: 48,
      amputation: 80,
    },
    peripheral: {
      total: 486,
      active: 42,
    },
    venous: {
      total: 1245,
      active: 86,
      varicose: 856,
      dvt: 186,
      venousUlcer: 124,
      avf: 79,
    },
    dialysisAccess: {
      total: 486,
      active: 28,
      avfCreation: 286,
      avgGraft: 86,
      catheter: 114,
    },
    aortic: {
      total: 124,
      active: 18,
      aneurysm: 86,
      dissection: 24,
      occlusion: 14,
    },
  },
  limbSalvage: {
    claudication: 186,
    cli: 86,
    gangrene: 42,
    salvaged: 78,
  },
  woundClinic: {
    activeWounds: 124,
    healingWell: 86,
    needsRevision: 24,
    amputation: 14,
  },
  outcomes: {
    patencyRate: 82,
    limbSalvage: 86,
    wound_healing: 78,
    mortality30Day: 2.4,
  },
  weeklyTrend: [
    { day: "Mon", consults: 20, procedures: 8 },
    { day: "Tue", consults: 22, procedures: 10 },
    { day: "Wed", consults: 26, procedures: 12 },
    { day: "Thu", consults: 18, procedures: 6 },
    { day: "Fri", consults: 24, procedures: 10 },
    { day: "Sat", consults: 14, procedures: 4 },
  ],
};
