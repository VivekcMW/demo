import { create } from "zustand";

export type TherapyStatus = "Planned" | "Active" | "On Hold" | "Completed" | "Discontinued";
export type SessionStatus = "Scheduled" | "In Progress" | "Completed" | "Missed" | "Cancelled";
export type ExerciseGoal = "Strengthening" | "Range of Motion" | "Stretching" | "Balance" | "Gait" | "Endurance" | "Coordination" | "Respiratory";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  holdSec?: number;
  frequency: string;
  instructions: string;
  goal: ExerciseGoal;
  videoUrl?: string;
}

export interface TherapyPlan {
  id: string;
  patientId: string;
  patientName: string;
  diagnosis: string;
  specialty: string;
  therapist: string;
  startDate: string;
  endDate?: string;
  status: TherapyStatus;
  exercises: Exercise[];
  notes?: string;
}

export interface TherapySession {
  id: string;
  planId: string;
  date: string;
  time: string;
  duration: number;
  status: SessionStatus;
  therapist: string;
  notes?: string;
  exercisesCompleted: { exerciseId: string; completed: boolean; repsActual?: number; setsActual?: number; painLevel?: number }[];
}

let planCounter = 1;
let sessionCounter = 1;

const seedPlans: TherapyPlan[] = [
  { id: "TP-001", patientId: "PT-0003", patientName: "Rajesh Narayan Pillai", diagnosis: "L4-L5 Disc Prolapse with Radiculopathy", specialty: "Orthopedics / Spine", therapist: "Dr. Sneha Menon", startDate: "2026-06-05", status: "Active",
    exercises: [
      { id: "EX-001", name: "McKenzie Extension in Lying", sets: 3, reps: 10, holdSec: 5, frequency: "3x daily", instructions: "Lying prone, prop up on elbows, hold 5 sec, relax. Progress to full push-up.", goal: "Range of Motion" },
      { id: "EX-002", name: "Knee to Chest Stretch", sets: 3, reps: 5, holdSec: 15, frequency: "2x daily", instructions: "Supine, bring one knee to chest, hold 15 sec. Alternate legs.", goal: "Stretching" },
      { id: "EX-003", name: "Core Stabilisation — Dead Bug", sets: 3, reps: 8, frequency: "1x daily", instructions: "Supine, arms up, legs in tabletop. Extend opposite arm & leg slowly.", goal: "Strengthening" },
      { id: "EX-004", name: "Hamstring Stretch", sets: 3, reps: 5, holdSec: 20, frequency: "2x daily", instructions: "Sitting, extend one leg, reach toward toes. Keep back straight.", goal: "Stretching" },
    ],
    notes: "Progressing well. Pain reduced from 8/10 to 4/10 over 10 days. SLR improved from 45° to 70°." },
  { id: "TP-002", patientId: "PT-0008", patientName: "Sunita Devi Yadav", diagnosis: "Post-ORIF Right Femur", specialty: "Orthopedics / Trauma", therapist: "Dr. Arun Nair", startDate: "2026-06-10", status: "Active",
    exercises: [
      { id: "EX-005", name: "Ankle Pumps", sets: 10, reps: 10, frequency: "Hourly", instructions: "Pump ankle up and down. Prevents DVT.", goal: "Range of Motion" },
      { id: "EX-006", name: "Quadriceps Setting", sets: 5, reps: 10, holdSec: 5, frequency: "3x daily", instructions: "Tighten front thigh muscle, push knee down into bed, hold 5 sec.", goal: "Strengthening" },
      { id: "EX-007", name: "Straight Leg Raise (Assisted)", sets: 3, reps: 8, holdSec: 3, frequency: "2x daily", instructions: "With knee brace locked in extension, lift leg 6-8 inches off bed.", goal: "Strengthening" },
      { id: "EX-008", name: "Bed Mobility — Rolling", sets: 5, reps: 5, frequency: "As needed", instructions: "Log roll side to side with pillow between legs.", goal: "Range of Motion" },
    ],
    notes: "Post-op day 2. NWB right lower limb. Pain controlled." },
  { id: "TP-003", patientId: "PT-0015", patientName: "Deepa Venkataraman", diagnosis: "Post-Stroke (Left MCA territory infarct)", specialty: "Neurology", therapist: "Dr. Sneha Menon", startDate: "2026-06-08", status: "Active",
    exercises: [
      { id: "EX-009", name: "Passive Range of Motion — Left Upper Limb", sets: 3, reps: 10, frequency: "2x daily", instructions: "Gently move left shoulder, elbow, wrist, fingers through full ROM.", goal: "Range of Motion" },
      { id: "EX-010", name: "Passive Range of Motion — Left Lower Limb", sets: 3, reps: 10, frequency: "2x daily", instructions: "Move left hip, knee, ankle through full ROM. Prevent contractures.", goal: "Range of Motion" },
      { id: "EX-011", name: "Bed Mobility — Scooting", sets: 5, reps: 5, frequency: "As tolerated", instructions: "Assist patient to scoot up/down in bed using right leg.", goal: "Coordination" },
      { id: "EX-012", name: "Sitting Balance", sets: 3, reps: 5, holdSec: 30, frequency: "2x daily", instructions: "Sit at edge of bed with feet supported. Maintain balance with supervision.", goal: "Balance" },
    ],
    notes: "Day 5 post-stroke. Right side strength improving. Left side still dense hemiplegia. Sitting balance fair with assistance." },
  { id: "TP-004", patientId: "PT-0005", patientName: "Meera Lakshmi Iyer", diagnosis: "Rheumatoid Arthritis — Bilateral Knees", specialty: "Rheumatology", therapist: "Dr. Arun Nair", startDate: "2026-06-01", status: "Completed",
    exercises: [
      { id: "EX-013", name: "Quadriceps Strengthening — Isometric", sets: 5, reps: 8, holdSec: 6, frequency: "3x daily", instructions: "Sit with leg extended. Tighten quad, hold 6 sec. Avoid knee movement.", goal: "Strengthening" },
      { id: "EX-014", name: "Straight Leg Raise", sets: 3, reps: 10, frequency: "2x daily", instructions: "Supine, lift leg 45° with knee straight. Lower slowly.", goal: "Strengthening" },
      { id: "EX-015", name: "Stationary Cycling — Low Resistance", sets: 1, reps: 10, holdSec: undefined, frequency: "1x daily", instructions: "10 min low-resistance cycling. Increase by 2 min each session.", goal: "Endurance" },
    ],
    notes: "6-week program completed. Improved WOMAC score from 48 to 22. Discharged to home exercise program." },
];

const seedSessions: TherapySession[] = [
  { id: "TS-001", planId: "TP-001", date: "2026-06-10", time: "09:00", duration: 30, status: "Completed", therapist: "Dr. Sneha Menon", notes: "Patient able to perform McKenzie extensions with good form. Pain during movement 3/10.",
    exercisesCompleted: [{ exerciseId: "EX-001", completed: true, repsActual: 10, setsActual: 3, painLevel: 3 }, { exerciseId: "EX-002", completed: true, repsActual: 5, setsActual: 3, painLevel: 2 }, { exerciseId: "EX-003", completed: true, repsActual: 8, setsActual: 2, painLevel: 1 }] },
  { id: "TS-002", planId: "TP-001", date: "2026-06-12", time: "09:30", duration: 30, status: "Completed", therapist: "Dr. Sneha Menon", notes: "Good progress. Added exercise progression. Pain 2/10 at rest, 4/10 at end range.",
    exercisesCompleted: [{ exerciseId: "EX-001", completed: true, repsActual: 10, setsActual: 3, painLevel: 4 }, { exerciseId: "EX-002", completed: true, repsActual: 5, setsActual: 3, painLevel: 2 }, { exerciseId: "EX-003", completed: true, repsActual: 8, setsActual: 3, painLevel: 1 }, { exerciseId: "EX-004", completed: true, repsActual: 5, setsActual: 3, painLevel: 2 }] },
  { id: "TS-003", planId: "TP-001", date: "2026-06-14", time: "09:00", duration: 30, status: "Scheduled", therapist: "Dr. Sneha Menon", exercisesCompleted: [] },
  { id: "TS-004", planId: "TP-002", date: "2026-06-11", time: "10:00", duration: 20, status: "Completed", therapist: "Dr. Arun Nair", notes: "Post-op day 1. Ankle pumps performed well. Quad sets difficult due to pain. Pain 5/10.",
    exercisesCompleted: [{ exerciseId: "EX-005", completed: true, repsActual: 10, setsActual: 5, painLevel: 2 }, { exerciseId: "EX-006", completed: true, repsActual: 5, setsActual: 3, painLevel: 5 }] },
  { id: "TS-005", planId: "TP-003", date: "2026-06-11", time: "11:00", duration: 30, status: "Completed", therapist: "Dr. Sneha Menon", notes: "Passive ROM tolerated well. Some spasticity noted in left elbow flexors. Sitting balance improved to 30 sec with support.",
    exercisesCompleted: [{ exerciseId: "EX-009", completed: true, painLevel: 1 }, { exerciseId: "EX-010", completed: true, painLevel: 1 }, { exerciseId: "EX-011", completed: true }, { exerciseId: "EX-012", completed: true, repsActual: 3 }] },
  { id: "TS-006", planId: "TP-003", date: "2026-06-14", time: "11:00", duration: 30, status: "Scheduled", therapist: "Dr. Sneha Menon", exercisesCompleted: [] },
];

interface PhysiotherapyStore {
  plans: TherapyPlan[];
  sessions: TherapySession[];
  getByPatient: (patientId: string) => TherapyPlan[];
  getSessionsByPlan: (planId: string) => TherapySession[];
  addPlan: (p: Omit<TherapyPlan, "id">) => TherapyPlan;
  updatePlanStatus: (id: string, status: TherapyStatus) => void;
  addSession: (s: Omit<TherapySession, "id">) => TherapySession;
  updateSessionStatus: (id: string, status: SessionStatus, updates?: Partial<TherapySession>) => void;
}

export const usePhysiotherapyStore = create<PhysiotherapyStore>((set, get) => ({
  plans: seedPlans,
  sessions: seedSessions,
  getByPatient(patientId) { return get().plans.filter((p) => p.patientId === patientId); },
  getSessionsByPlan(planId) { return get().sessions.filter((s) => s.planId === planId); },
  addPlan(p) {
    const id = `TP-${String(planCounter++).padStart(3, "0")}`;
    const plan: TherapyPlan = { id, ...p };
    set((s) => ({ plans: [...s.plans, plan] }));
    return plan;
  },
  updatePlanStatus(id, status) { set((s) => ({ plans: s.plans.map((p) => p.id === id ? { ...p, status } : p) })); },
  addSession(s) {
    const id = `TS-${String(sessionCounter++).padStart(3, "0")}`;
    const ses: TherapySession = { id, ...s };
    set((s2) => ({ sessions: [...s2.sessions, ses] }));
    return ses;
  },
  updateSessionStatus(id, status, updates) {
    set((s) => ({ sessions: s.sessions.map((ses) => ses.id === id ? { ...ses, status, ...updates } : ses) }));
  },
}));
