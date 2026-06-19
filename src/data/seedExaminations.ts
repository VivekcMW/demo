import type { Vitals } from "./seedPatients";

// ── Types ─────────────────────────────────────────────────────────────────────
// PRD 1.3 §3.1 — Full note lifecycle
export type NoteStatus =
  | "Draft"         // Being authored, not complete
  | "In Review"     // Submitted for co-sign/review
  | "Signed"        // Finalized with e-signature
  | "Locked";       // Post-discharge/legal freeze

export type AddendumStatus = "None" | "Has Addenda";

export type ExamType    = "OPD" | "IPD Review" | "Emergency" | "Tele" | "Follow-up" | "IPD Admission" | "Procedure" | "Discharge Summary";
export type NoteType    = ExamType; // alias for clarity in documentation context
export type RxRoute     = "Oral" | "IV" | "IM" | "Topical" | "Inhaler" | "SL" | "SC";
export type DiagType    = "Primary" | "Secondary" | "Differential";
export type DiagStatus  = "Active" | "Resolved" | "Chronic";
export type SystemName  = "CVS" | "Respiratory" | "Abdomen" | "CNS" | "Musculoskeletal" | "Skin" | "ENT" | "Eyes";

export interface Rx {
  id:            string;
  drug:          string;
  dose:          string;
  route:         RxRoute;
  frequency:     string;
  duration:      string;
  instructions?: string;
}

export interface Diagnosis {
  code?:   string;
  label:   string;
  type:    DiagType;
  status:  DiagStatus;
}

export interface SystemicFinding {
  system:  SystemName;
  finding: string;
  normal:  boolean;
}

export interface Subjective {
  chiefComplaint:   string;
  historyOfIllness: string;
  reviewOfSystems?: string;
}

export interface Objective {
  vitals?:             Vitals;
  generalAppearance?:  string;
  systemicFindings:    SystemicFinding[];
}

export interface Assessment {
  diagnoses: Diagnosis[];
}

export interface Plan {
  orders:               string[];   // order IDs
  prescriptions:        Rx[];
  procedures?:          string;
  referrals?:           string;
  followUpDays?:        number;
  patientInstructions?: string;
}

// ── PRD 1.3 §4.1 — Versioning ─────────────────────────────────────────────────
export interface NoteVersion {
  versionNumber:  number;
  content:        NoteContent;
  savedAt:        string;
  savedBy:        string;
  changeSummary?: string;
}

// ── PRD 1.3 §4.1 — Addendum ───────────────────────────────────────────────────
export interface NoteAddendum {
  id:        string;
  content:   string;
  reason:    string;
  author:    string;
  createdAt: string;
}

// Structued snapshot of all note fields for versioning
export interface NoteContent {
  subjective:  Subjective;
  objective:   Objective;
  assessment:  Assessment;
  plan:        Plan;
  notes?:      string;
  // PRD §FR-CDE-011 — Template-driven form values
  templateId?:   string;
  templateData?: Record<string, unknown>;
}

// ── PRD 1.3 §4.1 — Full Examination with lifecycle ────────────────────────────
export interface Examination {
  id:              string;
  patientId:       string;
  patientName:     string;
  appointmentId?:  string;
  type:            ExamType;
  status:          NoteStatus;
  startedAt:       string;
  completedAt?:    string;
  doctor:          string;
  dept:            string;

  // Latest content
  subjective:      Subjective;
  objective:       Objective;
  assessment:      Assessment;
  plan:            Plan;
  notes?:          string;

  // PRD §FR-CDE-011 — Template engine
  templateId?:     string;
  templateData?:   Record<string, unknown>;

  // PRD 1.3 §FR-CDE-003 — Versioning
  versions:             NoteVersion[];
  currentVersionNumber: number;

  // PRD 1.3 §FR-CDE-004 — Co-sign
  reviewerId?:   string;
  cosignerId?:   string;

  // Signing
  signedBy?:     string;
  signedAt?:     string;
  signedHash?:   string;

  // PRD 1.3 §FR-CDE-072 — Addendum
  addenda:       NoteAddendum[];
}

// ── Defaults ──────────────────────────────────────────────────────────────────

export const DEFAULT_SYSTEMS: SystemName[] = ["CVS", "Respiratory", "Abdomen", "CNS", "Musculoskeletal", "Skin", "ENT", "Eyes"];

export function defaultSystemicFindings(): SystemicFinding[] {
  return DEFAULT_SYSTEMS.map((s) => ({ system: s, finding: "Normal", normal: true }));
}

export function emptyNoteContent(): NoteContent {
  return {
    subjective:  { chiefComplaint: "", historyOfIllness: "" },
    objective:   { systemicFindings: defaultSystemicFindings() },
    assessment:  { diagnoses: [] },
    plan:        { orders: [], prescriptions: [] },
  };
}

export function makeContent(e: {
  subjective: Subjective; objective: Objective;
  assessment: Assessment; plan: Plan; notes?: string;
  templateId?: string; templateData?: Record<string, unknown>;
}): NoteContent {
  return {
    subjective: e.subjective, objective: e.objective,
    assessment: e.assessment, plan: e.plan, notes: e.notes,
    templateId: e.templateId, templateData: e.templateData,
  };
}

/** Ensure seed data has the new lifecycle fields (versions, addenda) */
export function migrateExam(e: Examination): Examination {
  if (e.versions && e.versions.length > 0) return e;
  const content = makeContent(e);
  const version: NoteVersion = {
    versionNumber: 1,
    content,
    savedAt: e.completedAt ?? e.startedAt,
    savedBy: e.doctor,
    changeSummary: e.status === "Signed" ? "Initial note — signed" : "Initial note",
  };
  return {
    ...e,
    versions: [version],
    currentVersionNumber: 1,
    addenda: [],
  };
}

// ── ICD-10 suggestion map (keyword → diagnosis labels) ────────────────────────
export const ICD_SUGGESTIONS: Record<string, { code: string; label: string }[]> = {
  "diabetes":      [{ code: "E11.9", label: "Type 2 Diabetes Mellitus" }, { code: "E10.9", label: "Type 1 Diabetes Mellitus" }],
  "hypertension":  [{ code: "I10",   label: "Essential Hypertension" }],
  "chest pain":    [{ code: "I20.9", label: "Unstable Angina" }, { code: "I21.9", label: "Acute MI, Unspecified" }, { code: "R07.9", label: "Chest Pain, Unspecified" }],
  "fever":         [{ code: "R50.9", label: "Fever, Unspecified" }, { code: "A01.0", label: "Enteric Fever" }, { code: "A90",   label: "Dengue Fever" }],
  "cough":         [{ code: "J06.9", label: "Acute URTI" }, { code: "J18.9", label: "Pneumonia, Unspecified" }, { code: "J44.1", label: "COPD Exacerbation" }],
  "breathlessness":[{ code: "J45.9", label: "Asthma" }, { code: "J44.1", label: "COPD Exacerbation" }, { code: "I50.9", label: "Heart Failure" }],
  "headache":      [{ code: "G43.9", label: "Migraine" }, { code: "G44.2", label: "Tension Headache" }],
  "abdominal pain":[{ code: "K81.0", label: "Acute Cholecystitis" }, { code: "K85.9", label: "Acute Pancreatitis" }, { code: "K37",   label: "Appendicitis" }],
};

// ── Seed data ─────────────────────────────────────────────────────────────────

// Seed data doesn't include versions/addenda — migration adds them
type SeedExam = Omit<Examination, "versions" | "currentVersionNumber" | "addenda">;

function migrateAll(exams: SeedExam[]): Examination[] {
  return exams.map((e) => migrateExam(e as Examination));
}

export const seedExaminations: Examination[] = migrateAll([
  // ── 1. Signed Off — DM follow-up ──
  {
    id: "EXM-0001",
    patientId: "PT-0001", patientName: "Anil Kumar Sharma",
    type: "Follow-up", status: "Signed",
    startedAt: "2026-06-08T09:30:00", completedAt: "2026-06-08T10:00:00",
    doctor: "Dr. Priya Mehta", dept: "Endocrinology",
    subjective: {
      chiefComplaint: "Review of diabetes control and medication adjustment",
      historyOfIllness: "Patient presents for 3-monthly DM review. Reports occasional post-prandial hyperglycaemia. Adherent to medications. No hypoglycaemic episodes. Foot examination last done 6 months ago.",
      reviewOfSystems: "Denies chest pain, dyspnoea, polyuria. Mild fatigue noted.",
    },
    objective: {
      vitals: { bp: "136/84", pulse: 78, spo2: 98, temp: 36.8, weight: 82, height: 170, bmi: 28.4, recordedAt: "2026-06-08" },
      generalAppearance: "Conscious, cooperative, well-nourished, no acute distress.",
      systemicFindings: [
        { system: "CVS",            finding: "S1 S2 heard, no murmurs. Peripheral pulses intact.", normal: true },
        { system: "Respiratory",    finding: "Normal",                                             normal: true },
        { system: "Abdomen",        finding: "Soft, non-tender. No organomegaly.",                 normal: true },
        { system: "CNS",            finding: "Normal",                                             normal: true },
        { system: "Musculoskeletal",finding: "Normal",                                             normal: true },
        { system: "Skin",           finding: "No diabetic dermopathy. Feet: no ulcers, calluses.", normal: true },
        { system: "ENT",            finding: "Normal",                                             normal: true },
        { system: "Eyes",           finding: "Fundus exam deferred — referred to ophthalmology.",  normal: false },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "E11.9", label: "Type 2 Diabetes Mellitus — Inadequately Controlled", type: "Primary", status: "Chronic" },
        { code: "I10",   label: "Essential Hypertension",                              type: "Secondary", status: "Chronic" },
        { code: "E78.5", label: "Dyslipidaemia",                                       type: "Secondary", status: "Chronic" },
      ],
    },
    plan: {
      orders: ["ORD-0001"],
      prescriptions: [
        { id: "rx-0001-1", drug: "Metformin 500mg",   dose: "500mg",  route: "Oral", frequency: "BD",  duration: "3 months", instructions: "With meals" },
        { id: "rx-0001-2", drug: "Glipizide 5mg",     dose: "5mg",    route: "Oral", frequency: "OD",  duration: "3 months", instructions: "Before breakfast" },
        { id: "rx-0001-3", drug: "Telmisartan 40mg",  dose: "40mg",   route: "Oral", frequency: "OD",  duration: "3 months" },
        { id: "rx-0001-4", drug: "Atorvastatin 20mg", dose: "20mg",   route: "Oral", frequency: "OD",  duration: "3 months", instructions: "At bedtime" },
      ],
      followUpDays: 90,
      patientInstructions: "HbA1c target <7%. Strict diet control. Daily foot inspection. Ophthalmology referral given.",
    },
    signedBy: "Dr. Priya Mehta", signedAt: "2026-06-08T10:05:00",
  },

  // ── 2. Signed Off — HTN emergency
  {
    id: "EXM-0002",
    patientId: "PT-0003", patientName: "Rajesh Narayan Pillai",
    type: "Emergency", status: "Signed",
    startedAt: "2026-06-09T14:45:00", completedAt: "2026-06-09T15:30:00",
    doctor: "Dr. Suresh Nair", dept: "Cardiology",
    subjective: {
      chiefComplaint: "Severe headache and dizziness for 2 hours, BP recorded 190/120 at home",
      historyOfIllness: "Known hypertensive on Amlodipine 5mg. Missed last 3 days of medication due to travel. Sudden onset severe occipital headache, no vomiting, no visual disturbance, no focal neurological deficits.",
    },
    objective: {
      vitals: { bp: "190/122", pulse: 96, spo2: 97, temp: 37.1, weight: 88, height: 172, bmi: 29.8, recordedAt: "2026-06-09" },
      generalAppearance: "Distressed, flushed face. Alert and oriented.",
      systemicFindings: [
        { system: "CVS",         finding: "Tachycardia. S1 S2 heard. No JVD.",         normal: false },
        { system: "Respiratory", finding: "Clear bilaterally.",                          normal: true },
        { system: "Abdomen",     finding: "Normal",                                      normal: true },
        { system: "CNS",         finding: "No focal deficits. Pupils equal and reactive.", normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                  normal: true },
        { system: "Skin",        finding: "Normal",                                      normal: true },
        { system: "ENT",         finding: "Normal",                                      normal: true },
        { system: "Eyes",        finding: "Fundoscopy: Grade II hypertensive retinopathy.", normal: false },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "I16.1", label: "Hypertensive Emergency with Target Organ Damage", type: "Primary",   status: "Active" },
        { code: "I10",   label: "Essential Hypertension",                          type: "Secondary", status: "Chronic" },
      ],
    },
    plan: {
      orders: ["ORD-0006"],
      prescriptions: [
        { id: "rx-0002-1", drug: "IV Labetalol",     dose: "20mg",  route: "IV",   frequency: "Stat then infusion", duration: "24 hours", instructions: "Titrate to target BP <160/100" },
        { id: "rx-0002-2", drug: "Amlodipine 10mg",  dose: "10mg",  route: "Oral", frequency: "OD", duration: "Continue", instructions: "Dose escalated" },
        { id: "rx-0002-3", drug: "Tab Atenolol 50mg",dose: "50mg",  route: "Oral", frequency: "OD", duration: "Continue" },
      ],
      procedures: "IV access secured. Cardiac monitor attached. Hourly BP recording.",
      followUpDays: 1,
      patientInstructions: "Strict medication compliance essential. Daily BP log. Low salt diet.",
    },
    signedBy: "Dr. Suresh Nair", signedAt: "2026-06-09T15:35:00",
  },

  // ── 3. Signed Off — Asthma exacerbation
  {
    id: "EXM-0003",
    patientId: "PT-0005", patientName: "Meera Lakshmi Iyer",
    type: "Emergency", status: "Signed",
    startedAt: "2026-06-07T11:10:00", completedAt: "2026-06-07T11:55:00",
    doctor: "Dr. Ananya Krishnan", dept: "Pulmonology",
    subjective: {
      chiefComplaint: "Sudden onset breathlessness and wheeze, SpO2 88% on arrival",
      historyOfIllness: "Known asthmatic on Salbutamol inhaler PRN. Increased dusty environment at workplace. Progressively worsening breathlessness over 6 hours. No fever, no sputum.",
    },
    objective: {
      vitals: { bp: "124/78", pulse: 112, spo2: 88, temp: 37.0, weight: 58, height: 162, bmi: 22.1, recordedAt: "2026-06-07" },
      generalAppearance: "Tachypnoeic. Accessory muscle use. Unable to complete sentences.",
      systemicFindings: [
        { system: "CVS",         finding: "Tachycardia. No murmurs.",                              normal: false },
        { system: "Respiratory", finding: "Bilateral expiratory wheeze. Prolonged expiration. No crepitations.", normal: false },
        { system: "Abdomen",     finding: "Normal",                                                 normal: true },
        { system: "CNS",         finding: "Normal",                                                 normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                             normal: true },
        { system: "Skin",        finding: "Normal",                                                 normal: true },
        { system: "ENT",         finding: "Normal",                                                 normal: true },
        { system: "Eyes",        finding: "Normal",                                                 normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "J45.1", label: "Moderate Persistent Asthma — Acute Exacerbation", type: "Primary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0003-1", drug: "Salbutamol Nebulisation", dose: "2.5mg", route: "Inhaler", frequency: "Q20min × 3", duration: "1 hour", instructions: "Via nebuliser" },
        { id: "rx-0003-2", drug: "Ipratropium Bromide Nebulisation", dose: "0.5mg", route: "Inhaler", frequency: "Q20min × 3", duration: "1 hour" },
        { id: "rx-0003-3", drug: "IV Methylprednisolone", dose: "40mg", route: "IV", frequency: "BD", duration: "3 days" },
        { id: "rx-0003-4", drug: "Salbutamol MDI", dose: "200mcg", route: "Inhaler", frequency: "QID", duration: "7 days", instructions: "With spacer" },
      ],
      procedures: "Nebulisation started immediately. O2 at 4L/min via mask. SpO2 monitoring.",
      followUpDays: 7,
      patientInstructions: "Avoid triggers. Inhaler technique reviewed. Action plan given. Return if SpO2 <94%.",
    },
    signedBy: "Dr. Ananya Krishnan", signedAt: "2026-06-07T12:00:00",
  },

  // ── 4. Signed Off — Enteric fever
  {
    id: "EXM-0004",
    patientId: "PT-0010", patientName: "Kavya Subramaniam",
    type: "OPD", status: "Signed",
    startedAt: "2026-06-10T17:00:00", completedAt: "2026-06-10T17:40:00",
    doctor: "Dr. Priya Mehta", dept: "General Medicine",
    subjective: {
      chiefComplaint: "Fever for 8 days, headache and abdominal discomfort",
      historyOfIllness: "8-day history of continuous fever 39–40°C, worse in evenings. Frontal headache, anorexia, loose stools × 2/day. No vomiting. Ate at a local food stall 2 weeks prior.",
    },
    objective: {
      vitals: { bp: "110/70", pulse: 86, spo2: 98, temp: 39.2, weight: 52, height: 158, bmi: 20.8, recordedAt: "2026-06-10" },
      generalAppearance: "Febrile, mild pallor, tongue coated, mildly toxic.",
      systemicFindings: [
        { system: "CVS",         finding: "Relative bradycardia. Normal heart sounds.", normal: false },
        { system: "Respiratory", finding: "Normal",                                     normal: true },
        { system: "Abdomen",     finding: "Soft, mild diffuse tenderness, palpable spleen tip. No guarding.", normal: false },
        { system: "CNS",         finding: "Normal",                                     normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                 normal: true },
        { system: "Skin",        finding: "Rose spots noted on trunk × 3.",              normal: false },
        { system: "ENT",         finding: "Normal",                                     normal: true },
        { system: "Eyes",        finding: "Normal",                                     normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "A01.0", label: "Enteric Fever (Typhoid)", type: "Primary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0004-1", drug: "Inj Ceftriaxone 2g",     dose: "2g",     route: "IV",   frequency: "OD",  duration: "10 days" },
        { id: "rx-0004-2", drug: "Tab Paracetamol 650mg",  dose: "650mg",  route: "Oral", frequency: "TDS", duration: "5 days", instructions: "For fever" },
        { id: "rx-0004-3", drug: "ORS Sachets",             dose: "1 sachet",route: "Oral",frequency: "After each loose stool", duration: "5 days" },
      ],
      followUpDays: 3,
      patientInstructions: "Boiled water only. Soft diet. Strictly avoid raw food. Return if fever persists >14 days or worsens.",
    },
    signedBy: "Dr. Priya Mehta", signedAt: "2026-06-10T17:45:00",
  },

  // ── 5. Signed Off — Pneumonia
  {
    id: "EXM-0005",
    patientId: "PT-0012", patientName: "Mohan Das Verma",
    type: "IPD Review", status: "Signed",
    startedAt: "2026-06-09T09:30:00", completedAt: "2026-06-09T10:00:00",
    doctor: "Dr. Suresh Nair", dept: "Pulmonology",
    subjective: {
      chiefComplaint: "IPD review — Day 1 of admission for CAP",
      historyOfIllness: "Admitted yesterday with productive cough, right-sided pleuritic chest pain, fever 38.9°C, and SpO2 91% on room air. CXR shows right lower lobe consolidation.",
    },
    objective: {
      vitals: { bp: "122/76", pulse: 94, spo2: 94, temp: 38.4, weight: 74, height: 168, bmi: 26.2, recordedAt: "2026-06-09" },
      generalAppearance: "Febrile. On O2 3L/min. Improved from yesterday.",
      systemicFindings: [
        { system: "CVS",         finding: "Normal rate and rhythm.",                                  normal: true },
        { system: "Respiratory", finding: "Dullness on percussion right base. Bronchial breath sounds. Reduced air entry right base.", normal: false },
        { system: "Abdomen",     finding: "Normal",                                                    normal: true },
        { system: "CNS",         finding: "Normal",                                                    normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                               normal: true },
        { system: "Skin",        finding: "Normal",                                                    normal: true },
        { system: "ENT",         finding: "Normal",                                                    normal: true },
        { system: "Eyes",        finding: "Normal",                                                    normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "J18.9", label: "Community Acquired Pneumonia — Moderate Severity (PSI Class III)", type: "Primary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0005-1", drug: "Inj Piperacillin-Tazobactam 4.5g", dose: "4.5g", route: "IV",   frequency: "Q8h", duration: "7 days" },
        { id: "rx-0005-2", drug: "Tab Azithromycin 500mg",            dose: "500mg",route: "Oral", frequency: "OD",  duration: "5 days", instructions: "Atypical coverage" },
        { id: "rx-0005-3", drug: "Tab Paracetamol 650mg",             dose: "650mg",route: "Oral", frequency: "TDS", duration: "3 days" },
      ],
      procedures: "Continue O2 therapy. Incentive spirometry QID. Physiotherapy BD.",
      followUpDays: 1,
    },
    signedBy: "Dr. Suresh Nair", signedAt: "2026-06-09T10:05:00",
  },

  // ── 6. Signed Off — NSTEMI
  {
    id: "EXM-0006",
    patientId: "PT-0004", patientName: "Karthik Balaji Sundaram",
    type: "Emergency", status: "Signed",
    startedAt: "2026-06-10T03:30:00", completedAt: "2026-06-10T04:15:00",
    doctor: "Dr. Suresh Nair", dept: "Cardiology",
    subjective: {
      chiefComplaint: "Severe central chest pain radiating to left arm for 1 hour, diaphoresis",
      historyOfIllness: "Sudden onset severe central chest pain at rest, radiating to left arm and jaw. Associated diaphoresis and nausea. Known hypertensive and diabetic. Smoker 20 pack-years.",
    },
    objective: {
      vitals: { bp: "148/92", pulse: 102, spo2: 96, temp: 37.0, weight: 86, height: 174, bmi: 28.4, recordedAt: "2026-06-10" },
      generalAppearance: "Distressed, diaphoretic, pale.",
      systemicFindings: [
        { system: "CVS",         finding: "Tachycardia. No murmurs. No S3/S4.",          normal: false },
        { system: "Respiratory", finding: "Clear. No pulmonary oedema.",                  normal: true },
        { system: "Abdomen",     finding: "Normal",                                        normal: true },
        { system: "CNS",         finding: "Normal",                                        normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                   normal: true },
        { system: "Skin",        finding: "Diaphoretic.",                                  normal: false },
        { system: "ENT",         finding: "Normal",                                        normal: true },
        { system: "Eyes",        finding: "Normal",                                        normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "I21.4", label: "NSTEMI — Non-ST Elevation Myocardial Infarction", type: "Primary",   status: "Active" },
        { code: "I10",   label: "Essential Hypertension",                           type: "Secondary", status: "Chronic" },
        { code: "E11.9", label: "Type 2 Diabetes Mellitus",                         type: "Secondary", status: "Chronic" },
      ],
    },
    plan: {
      orders: ["ORD-0006", "ORD-0007"],
      prescriptions: [
        { id: "rx-0006-1", drug: "Aspirin 300mg Loading",      dose: "300mg",  route: "Oral", frequency: "Stat",        duration: "Once" },
        { id: "rx-0006-2", drug: "Clopidogrel 600mg Loading",  dose: "600mg",  route: "Oral", frequency: "Stat",        duration: "Once" },
        { id: "rx-0006-3", drug: "Enoxaparin 1mg/kg SC",       dose: "86mg",   route: "SC",   frequency: "BD",          duration: "48 hours" },
        { id: "rx-0006-4", drug: "IV Nitroglycerine Infusion", dose: "5mcg/min",route: "IV",  frequency: "Continuous",  duration: "24 hours" },
        { id: "rx-0006-5", drug: "Atorvastatin 80mg",          dose: "80mg",   route: "Oral", frequency: "OD",          duration: "Continue", instructions: "High intensity statin" },
        { id: "rx-0006-6", drug: "Metoprolol Succinate 25mg",  dose: "25mg",   route: "Oral", frequency: "OD",          duration: "Continue" },
      ],
      procedures: "IV access × 2. Cardiac monitor. Defibrillator on standby. Cardiology consult for urgent angiography.",
      referrals: "Urgent Cardiology — Coronary Angiography within 24h",
      followUpDays: 1,
      patientInstructions: "NPO. Complete bed rest. All procedures explained to patient and family.",
    },
    signedBy: "Dr. Suresh Nair", signedAt: "2026-06-10T04:20:00",
  },

  // ── 7. Signed Off — Pre-natal
  {
    id: "EXM-0007",
    patientId: "PT-0015", patientName: "Deepa Venkataraman",
    type: "OPD", status: "Signed",
    startedAt: "2026-06-10T22:15:00", completedAt: "2026-06-10T22:50:00",
    doctor: "Dr. Priya Mehta", dept: "Obstetrics & Gynaecology",
    subjective: {
      chiefComplaint: "Labour pains with regular contractions, 39 weeks gestation",
      historyOfIllness: "G2P1. 39 weeks POG. Regular uterine contractions 3 in 10 minutes. Spontaneous rupture of membranes 1 hour ago, liquor clear. No antepartum haemorrhage. Previous normal delivery.",
    },
    objective: {
      vitals: { bp: "116/74", pulse: 84, spo2: 99, temp: 36.9, weight: 74, height: 160, bmi: 28.9, recordedAt: "2026-06-10" },
      generalAppearance: "In active labour. Cooperative.",
      systemicFindings: [
        { system: "CVS",         finding: "Normal",                                       normal: true },
        { system: "Respiratory", finding: "Normal",                                       normal: true },
        { system: "Abdomen",     finding: "Fundal height 38cm. Cephalic presentation. FHR 144bpm, regular.", normal: true },
        { system: "CNS",         finding: "Normal",                                       normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                  normal: true },
        { system: "Skin",        finding: "Normal",                                       normal: true },
        { system: "ENT",         finding: "Normal",                                       normal: true },
        { system: "Eyes",        finding: "Normal",                                       normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "O80", label: "Normal Vaginal Delivery — Active Labour, 39 Weeks", type: "Primary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0007-1", drug: "IV Oxytocin",    dose: "5 IU", route: "IV",   frequency: "Augmentation protocol", duration: "Labour", instructions: "Titrate per protocol" },
        { id: "rx-0007-2", drug: "Epidural Analgesia", dose: "Per anaesthesia", route: "IV", frequency: "Continuous", duration: "Labour" },
      ],
      procedures: "CTG monitoring continuous. IV access. Partograph initiated.",
      followUpDays: 1,
    },
    signedBy: "Dr. Priya Mehta", signedAt: "2026-06-10T22:55:00",
  },

  // ── 8. Signed Off — COPD
  {
    id: "EXM-0008",
    patientId: "PT-0028", patientName: "Venkatesh Iyer",
    type: "Emergency", status: "Signed",
    startedAt: "2026-06-11T09:10:00", completedAt: "2026-06-11T09:55:00",
    doctor: "Dr. Ananya Krishnan", dept: "Pulmonology",
    subjective: {
      chiefComplaint: "Worsening breathlessness and increased sputum production for 3 days",
      historyOfIllness: "Known COPD (GOLD Stage III) on triple inhaler therapy. 3-day history of purulent sputum, worsening dyspnoea at rest. FEV1/FVC 0.52 on prior PFT. Ex-smoker 40 pack-years.",
    },
    objective: {
      vitals: { bp: "128/82", pulse: 98, spo2: 86, temp: 37.8, weight: 66, height: 165, bmi: 24.2, recordedAt: "2026-06-11" },
      generalAppearance: "Tachypnoeic, barrel chest, pursed-lip breathing.",
      systemicFindings: [
        { system: "CVS",         finding: "Normal rate and rhythm.",                                  normal: true },
        { system: "Respiratory", finding: "Hyperresonant bilaterally. Bilateral expiratory rhonchi. Reduced air entry at bases.", normal: false },
        { system: "Abdomen",     finding: "Normal",                                                    normal: true },
        { system: "CNS",         finding: "Mildly confused (CO2 retention?). GCS 14/15.",             normal: false },
        { system: "Musculoskeletal", finding: "Normal",                                               normal: true },
        { system: "Skin",        finding: "Central cyanosis noted.",                                   normal: false },
        { system: "ENT",         finding: "Normal",                                                    normal: true },
        { system: "Eyes",        finding: "Normal",                                                    normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "J44.1", label: "COPD — Acute Exacerbation",    type: "Primary",   status: "Active"  },
        { code: "J44.0", label: "COPD with Acute LRTI",          type: "Secondary", status: "Active"  },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0008-1", drug: "Controlled O2",               dose: "28%",     route: "Inhaler", frequency: "Continuous", duration: "Ongoing", instructions: "Venturi mask, titrate to SpO2 88-92%" },
        { id: "rx-0008-2", drug: "Salbutamol + Ipratropium Neb",dose: "2.5+0.5mg",route: "Inhaler",frequency: "Q4h",       duration: "3 days" },
        { id: "rx-0008-3", drug: "IV Hydrocortisone 100mg",     dose: "100mg",   route: "IV",      frequency: "Q8h",       duration: "3 days" },
        { id: "rx-0008-4", drug: "Inj Ceftriaxone 1g",          dose: "1g",      route: "IV",      frequency: "BD",        duration: "5 days" },
      ],
      procedures: "ABG stat. CXR requested. NIV/BiPAP initiated. ICU review if no improvement in 2h.",
      followUpDays: 1,
    },
    signedBy: "Dr. Ananya Krishnan", signedAt: "2026-06-11T10:00:00",
  },

  // ── 9. Completed — Dengue
  {
    id: "EXM-0009",
    patientId: "PT-0016", patientName: "Arjun Vikram Nair",
    type: "OPD", status: "In Review",
    startedAt: "2026-06-10T08:45:00", completedAt: "2026-06-10T09:15:00",
    doctor: "Dr. Ramesh Gupta", dept: "General Medicine",
    subjective: {
      chiefComplaint: "High fever 5 days, body aches, bleeding gums",
      historyOfIllness: "5-day history of high-grade fever 40°C, severe myalgia and arthralgia, retro-orbital pain, and bleeding gums since yesterday. No rash initially but petechiae appeared today. No vomiting.",
    },
    objective: {
      vitals: { bp: "102/64", pulse: 92, spo2: 98, temp: 39.6, weight: 70, height: 175, bmi: 22.9, recordedAt: "2026-06-10" },
      generalAppearance: "Febrile, tourniquet test positive.",
      systemicFindings: [
        { system: "CVS",         finding: "Normal",                                      normal: true },
        { system: "Respiratory", finding: "Normal",                                      normal: true },
        { system: "Abdomen",     finding: "Mild hepatomegaly. No free fluid.",           normal: false },
        { system: "CNS",         finding: "Normal",                                      normal: true },
        { system: "Musculoskeletal", finding: "Diffuse myalgia and arthralgia.",         normal: false },
        { system: "Skin",        finding: "Petechial rash on lower limbs. Tourniquet test positive.", normal: false },
        { system: "ENT",         finding: "Bleeding gums noted.",                        normal: false },
        { system: "Eyes",        finding: "Retro-orbital pain on palpation.",            normal: false },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "A90", label: "Dengue Fever with Thrombocytopenia — Warning Signs", type: "Primary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0009-1", drug: "Tab Paracetamol 650mg",  dose: "650mg",  route: "Oral", frequency: "Q6h",   duration: "5 days", instructions: "Avoid NSAIDs/Aspirin" },
        { id: "rx-0009-2", drug: "IV Normal Saline",        dose: "500mL",  route: "IV",   frequency: "Q12h",  duration: "48 hours" },
        { id: "rx-0009-3", drug: "ORS",                     dose: "200mL",  route: "Oral", frequency: "Q2-4h", duration: "5 days" },
      ],
      procedures: "Daily CBC mandatory. Strict fluid balance monitoring. Platelet transfusion if <20,000.",
      followUpDays: 1,
      patientInstructions: "Return immediately if: severe abdominal pain, persistent vomiting, mucosal bleeding, restlessness.",
    },
  },

  // ── 10. Completed — DKA
  {
    id: "EXM-0010",
    patientId: "PT-0013", patientName: "Bharathi Murugesan",
    type: "Emergency", status: "In Review",
    startedAt: "2026-06-11T07:50:00", completedAt: "2026-06-11T08:30:00",
    doctor: "Dr. Ananya Krishnan", dept: "Endocrinology",
    subjective: {
      chiefComplaint: "Nausea, vomiting, altered sensorium for 6 hours in known diabetic",
      historyOfIllness: "Known T2DM on insulin. Stopped insulin 2 days ago (ran out). Progressively worsening nausea, vomiting, abdominal cramps. Fruity breath noted by family. GCS 12 on arrival.",
    },
    objective: {
      vitals: { bp: "98/60", pulse: 118, spo2: 97, temp: 37.2, weight: 62, height: 155, bmi: 25.8, recordedAt: "2026-06-11" },
      generalAppearance: "Kussmaul breathing. Fruity breath. Dehydrated, sunken eyes.",
      systemicFindings: [
        { system: "CVS",         finding: "Tachycardia. Low volume pulse.",                 normal: false },
        { system: "Respiratory", finding: "Kussmaul respirations (deep and rapid).",         normal: false },
        { system: "Abdomen",     finding: "Mild diffuse tenderness. No guarding.",           normal: false },
        { system: "CNS",         finding: "GCS 12/15 (E3V4M5). Mildly drowsy.",             normal: false },
        { system: "Musculoskeletal", finding: "Normal",                                      normal: true },
        { system: "Skin",        finding: "Dry skin, poor turgor. Signs of dehydration.",    normal: false },
        { system: "ENT",         finding: "Normal",                                          normal: true },
        { system: "Eyes",        finding: "Sunken eyes. Normal pupils.",                     normal: false },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "E11.10", label: "Diabetic Ketoacidosis (DKA) — Moderate Severity", type: "Primary",   status: "Active" },
        { code: "E11.9",  label: "Type 2 Diabetes Mellitus",                         type: "Secondary", status: "Chronic" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0010-1", drug: "IV Normal Saline",           dose: "1L",      route: "IV", frequency: "Over 1hr then 500mL/hr", duration: "First 4 hours" },
        { id: "rx-0010-2", drug: "IV Regular Insulin Infusion",dose: "0.1u/kg/hr",route: "IV",frequency: "Continuous",           duration: "Until DKA resolved" },
        { id: "rx-0010-3", drug: "IV Potassium Chloride",      dose: "20mEq",   route: "IV", frequency: "Per protocol",          duration: "As per K+ levels" },
        { id: "rx-0010-4", drug: "IV Sodium Bicarbonate",      dose: "50mEq",   route: "IV", frequency: "Once",                  duration: "If pH<7.1" },
      ],
      procedures: "ABG, VBG, electrolytes hourly. Urinary catheter. Strict fluid balance. HDU admission.",
      followUpDays: 1,
    },
  },

  // ── 11. Completed — Septic shock
  {
    id: "EXM-0011",
    patientId: "PT-0017", patientName: "Padma Raghunathan",
    type: "Emergency", status: "In Review",
    startedAt: "2026-06-11T01:35:00", completedAt: "2026-06-11T02:15:00",
    doctor: "Dr. Ananya Krishnan", dept: "Intensive Care",
    subjective: {
      chiefComplaint: "Fever, hypotension, altered sensorium — referral from Emergency",
      historyOfIllness: "Presented with 3 days fever, progressive hypotension, now requiring vasopressors. Suspected source intra-abdominal. Peritonitis features on examination.",
    },
    objective: {
      vitals: { bp: "80/50", pulse: 128, spo2: 92, temp: 39.8, weight: 54, height: 156, bmi: 22.2, recordedAt: "2026-06-11" },
      generalAppearance: "Severely ill. On vasopressors. Intubated.",
      systemicFindings: [
        { system: "CVS",         finding: "Tachycardia. Hypotension despite fluids. On noradrenaline 0.15mcg/kg/min.", normal: false },
        { system: "Respiratory", finding: "Mechanically ventilated. Bilateral infiltrates on CXR.",                    normal: false },
        { system: "Abdomen",     finding: "Rigid, board-like abdomen. Guarding and rebound tenderness.",               normal: false },
        { system: "CNS",         finding: "GCS 6/15 prior to intubation. Pupils equal 3mm reactive.",                  normal: false },
        { system: "Musculoskeletal", finding: "Normal",                                                                 normal: true },
        { system: "Skin",        finding: "Mottled skin. Prolonged capillary refill >4 seconds.",                       normal: false },
        { system: "ENT",         finding: "Normal",                                                                     normal: true },
        { system: "Eyes",        finding: "Normal",                                                                     normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "A41.9", label: "Septic Shock — Intra-abdominal Source", type: "Primary",   status: "Active" },
        { code: "K65.9", label: "Generalised Peritonitis",                type: "Secondary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0011-1", drug: "Inj Piperacillin-Tazobactam 4.5g",dose: "4.5g", route: "IV", frequency: "Q6h",  duration: "7 days" },
        { id: "rx-0011-2", drug: "Inj Metronidazole 500mg",          dose: "500mg",route: "IV", frequency: "Q8h",  duration: "7 days" },
        { id: "rx-0011-3", drug: "Inj Noradrenaline",                dose: "0.15mcg/kg/min",route:"IV",frequency:"Continuous",duration:"Until haemodynamically stable" },
        { id: "rx-0011-4", drug: "IV Hydrocortisone 50mg",           dose: "50mg", route: "IV", frequency: "Q6h",  duration: "3 days", instructions: "Relative adrenal insufficiency" },
      ],
      procedures: "Emergency CT abdomen done. Surgical consult — OT booked for exploratory laparotomy.",
      referrals: "Urgent General Surgery — Exploratory Laparotomy",
      followUpDays: 1,
    },
  },

  // ── 12. Completed — ACS
  {
    id: "EXM-0012",
    patientId: "PT-0006", patientName: "Ramesh Chandra Patel",
    type: "IPD Review", status: "In Review",
    startedAt: "2026-06-09T08:00:00", completedAt: "2026-06-09T08:40:00",
    doctor: "Dr. Suresh Nair", dept: "Cardiology",
    subjective: {
      chiefComplaint: "IPD Day 1 review post-NSTEMI — query respiratory aspirate",
      historyOfIllness: "Admitted yesterday with NSTEMI. Now Day 1. Developed aspiration during feeding. SpO2 dropped to 84%. Emergent intubation done. Troponin trending. Angiography deferred due to respiratory failure.",
    },
    objective: {
      vitals: { bp: "118/70", pulse: 88, spo2: 95, temp: 37.5, weight: 76, height: 166, bmi: 27.6, recordedAt: "2026-06-09" },
      generalAppearance: "Intubated and sedated. On mechanical ventilation.",
      systemicFindings: [
        { system: "CVS",         finding: "Regular rate. No murmurs.",                             normal: true },
        { system: "Respiratory", finding: "Mechanical ventilation. Bilateral coarse crepitations.", normal: false },
        { system: "Abdomen",     finding: "Normal",                                                 normal: true },
        { system: "CNS",         finding: "Sedated. Pupils equal and reactive.",                    normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                             normal: true },
        { system: "Skin",        finding: "Normal",                                                 normal: true },
        { system: "ENT",         finding: "Normal",                                                 normal: true },
        { system: "Eyes",        finding: "Normal",                                                 normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "J68.0", label: "Aspiration Pneumonitis",                             type: "Primary",   status: "Active" },
        { code: "I21.4", label: "NSTEMI",                                              type: "Secondary", status: "Active" },
        { code: "J96.0", label: "Acute Respiratory Failure",                          type: "Secondary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0012-1", drug: "Inj Meropenem 1g",             dose: "1g",     route: "IV",  frequency: "Q8h",     duration: "7 days" },
        { id: "rx-0012-2", drug: "IV Midazolam + Fentanyl",       dose: "Per protocol",route:"IV",frequency:"Continuous",duration:"Ongoing" },
        { id: "rx-0012-3", drug: "Aspirin 75mg via NGT",          dose: "75mg",   route: "Oral",frequency: "OD",       duration: "Continue" },
      ],
      procedures: "MV settings: AC mode, TV 8mL/kg IBW, RR 16, PEEP 6, FiO2 50%. Daily VAP bundle.",
      followUpDays: 1,
    },
  },

  // ── 13. In Progress — DM OPD ──
  {
    id: "EXM-0013",
    patientId: "PT-0009", patientName: "Suresh Ramamoorthy",
    type: "OPD", status: "Draft",
    startedAt: "2026-06-11T10:00:00",
    doctor: "Dr. Ramesh Gupta", dept: "General Medicine",
    subjective: {
      chiefComplaint: "Chest tightness and exertional dyspnoea for 2 weeks",
      historyOfIllness: "2-week history of exertional chest tightness and breathlessness on climbing one flight of stairs. No chest pain at rest. No palpitations. Known hypertensive on Amlodipine.",
    },
    objective: {
      vitals: { bp: "148/90", pulse: 82, spo2: 97, temp: 36.6, weight: 80, height: 168, bmi: 28.3, recordedAt: "2026-06-11" },
      generalAppearance: "Comfortable at rest. No distress.",
      systemicFindings: defaultSystemicFindings(),
    },
    assessment: {
      diagnoses: [
        { code: "I20.9", label: "Unstable Angina — Suspected", type: "Primary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0013-1", drug: "Tab Aspirin 75mg",        dose: "75mg",   route: "Oral", frequency: "OD",  duration: "Continue", instructions: "After food" },
        { id: "rx-0013-2", drug: "Tab Metoprolol 25mg",     dose: "25mg",   route: "Oral", frequency: "BD",  duration: "1 month" },
        { id: "rx-0013-3", drug: "GTN Sublingual 0.5mg",    dose: "0.5mg",  route: "SL",   frequency: "SOS", duration: "PRN", instructions: "For acute chest pain" },
      ],
      procedures: "ECG ordered. Treadmill test planned.",
      referrals: "Cardiology referral for TMT and Echo",
      followUpDays: 7,
    },
  },

  // ── 14. In Progress — Paediatric follow-up
  {
    id: "EXM-0014",
    patientId: "PT-0020", patientName: "Vijay Shankar Reddy",
    type: "Follow-up", status: "Draft",
    startedAt: "2026-06-11T10:30:00",
    doctor: "Dr. Ramesh Gupta", dept: "Surgery",
    subjective: {
      chiefComplaint: "Post-op Day 5 review — appendicectomy wound check",
      historyOfIllness: "Laparoscopic appendicectomy done 5 days ago. Wound healing, oral feeds tolerated. Mild pain at port sites. No fever. Asking about discharge.",
    },
    objective: {
      vitals: { bp: "118/72", pulse: 74, spo2: 99, temp: 36.5, weight: 72, height: 172, bmi: 24.3, recordedAt: "2026-06-11" },
      generalAppearance: "Comfortable, ambulant.",
      systemicFindings: defaultSystemicFindings(),
    },
    assessment: {
      diagnoses: [
        { code: "Z48.02", label: "Post-Laparoscopic Appendicectomy — Day 5, Uncomplicated", type: "Primary", status: "Resolved" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0014-1", drug: "Tab Augmentin 625mg", dose: "625mg", route: "Oral", frequency: "BD",  duration: "3 days" },
        { id: "rx-0014-2", drug: "Tab Ibuprofen 400mg", dose: "400mg", route: "Oral", frequency: "TDS", duration: "3 days", instructions: "After food" },
      ],
      followUpDays: 7,
      patientInstructions: "Keep wound dry for 48h. Avoid strenuous activity for 2 weeks. Return if fever, redness, or discharge from wound.",
    },
  },

  // ── 15. In Progress — New OPD
  {
    id: "EXM-0015",
    patientId: "PT-0024", patientName: "Naresh Tiwari",
    type: "OPD", status: "Draft",
    startedAt: "2026-06-11T11:00:00",
    doctor: "Dr. Ananya Krishnan", dept: "Surgery",
    subjective: {
      chiefComplaint: "Persistent wound pain and mild redness at pilonidal excision site",
      historyOfIllness: "Pilonidal sinus excision 1 day ago. Complains of increasing pain at wound site. Mild erythema around wound. No fever, no discharge currently.",
    },
    objective: {
      vitals: { bp: "120/78", pulse: 78, spo2: 98, temp: 37.0, weight: 68, height: 170, bmi: 23.5, recordedAt: "2026-06-11" },
      generalAppearance: "Mild discomfort. Ambulant.",
      systemicFindings: defaultSystemicFindings(),
    },
    assessment: {
      diagnoses: [
        { code: "T81.30", label: "Post-Operative Wound — Day 1, Normal Healing", type: "Primary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0015-1", drug: "Inj Cefazolin 1g",       dose: "1g",    route: "IV",   frequency: "BD",   duration: "2 days" },
        { id: "rx-0015-2", drug: "Tab Paracetamol 1g",     dose: "1g",    route: "Oral", frequency: "Q6h",  duration: "3 days" },
        { id: "rx-0015-3", drug: "Tab Tramadol 50mg",      dose: "50mg",  route: "Oral", frequency: "SOS",  duration: "PRN" },
      ],
      procedures: "Wound packing change daily. Wound swab sent.",
      followUpDays: 2,
    },
  },

  // ── 16. In Progress — Tele
  {
    id: "EXM-0016",
    patientId: "PT-0002", patientName: "Priya Venkateshwari",
    type: "Tele", status: "Draft",
    startedAt: "2026-06-11T11:30:00",
    doctor: "Dr. Priya Mehta", dept: "General Medicine",
    subjective: {
      chiefComplaint: "Follow-up after hospitalisation for acute gastroenteritis",
      historyOfIllness: "Discharged 3 days ago after 5-day IPD admission for acute gastroenteritis. Feeling better, stools normal now, no fever. Appetite returned partially.",
    },
    objective: {
      vitals: { bp: "110/70", pulse: 76, spo2: 99, temp: 36.7, weight: 55, height: 160, bmi: 21.5, recordedAt: "2026-06-11" },
      generalAppearance: "Tele consult — patient reports feeling well.",
      systemicFindings: defaultSystemicFindings(),
    },
    assessment: {
      diagnoses: [
        { code: "K59.1", label: "Post-Gastroenteritis Recovery — Resolving", type: "Primary", status: "Resolved" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0016-1", drug: "Tab Probiotics (VSL#3)",  dose: "1 sachet", route: "Oral", frequency: "OD",  duration: "14 days" },
        { id: "rx-0016-2", drug: "Oral Zinc Syrup",          dose: "20mg",     route: "Oral", frequency: "OD",  duration: "14 days" },
      ],
      followUpDays: 14,
      patientInstructions: "Bland diet for 1 week. Plenty of fluids. Avoid raw food and street food.",
    },
  },

  // ── 17. Signed Off — Hypo-thyroid follow-up
  {
    id: "EXM-0017",
    patientId: "PT-0018", patientName: "Geetha Krishnamurthy",
    type: "Follow-up", status: "Signed",
    startedAt: "2026-06-09T10:30:00", completedAt: "2026-06-09T11:00:00",
    doctor: "Dr. Priya Mehta", dept: "Endocrinology",
    subjective: {
      chiefComplaint: "Annual thyroid review and pre-op clearance for knee replacement",
      historyOfIllness: "Known hypothyroid on Thyroxine 50mcg. Fatigue and weight gain over 6 months. Planned total knee replacement next week. Pre-op workup needed.",
    },
    objective: {
      vitals: { bp: "132/82", pulse: 64, spo2: 98, temp: 36.4, weight: 78, height: 158, bmi: 31.3, recordedAt: "2026-06-09" },
      generalAppearance: "Mild periorbital puffiness. Dry skin. Obese.",
      systemicFindings: [
        { system: "CVS",            finding: "Bradycardia HR 64. Normal heart sounds.",               normal: false },
        { system: "Respiratory",    finding: "Normal",                                                normal: true },
        { system: "Abdomen",        finding: "Normal",                                                normal: true },
        { system: "CNS",            finding: "Delayed relaxation of ankle reflexes.",                 normal: false },
        { system: "Musculoskeletal",finding: "Right knee crepitus. Limited ROM. Bilateral ankle oedema.", normal: false },
        { system: "Skin",           finding: "Dry, coarse skin. Mild myxoedema.",                     normal: false },
        { system: "ENT",            finding: "Normal",                                                normal: true },
        { system: "Eyes",           finding: "Periorbital puffiness.",                                normal: false },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "E03.9", label: "Hypothyroidism — Inadequately Controlled", type: "Primary",   status: "Chronic" },
        { code: "M17.1", label: "Right Knee Osteoarthritis",                 type: "Secondary", status: "Chronic" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0017-1", drug: "Tab Levothyroxine 75mcg", dose: "75mcg", route: "Oral", frequency: "OD", duration: "3 months", instructions: "Empty stomach, 30min before food" },
        { id: "rx-0017-2", drug: "Calcium + Vit D3",        dose: "500mg + 250IU", route: "Oral", frequency: "BD", duration: "3 months" },
      ],
      procedures: "Pre-op clearance: ECG, CBC, LFT, TFT, coagulation profile. Cardiology clearance obtained.",
      followUpDays: 90,
    },
    signedBy: "Dr. Priya Mehta", signedAt: "2026-06-09T11:05:00",
  },

  // ── 18. Signed Off — Iron deficiency anaemia
  {
    id: "EXM-0018",
    patientId: "PT-0025", patientName: "Sudha Narayanan",
    type: "OPD", status: "Signed",
    startedAt: "2026-06-06T12:30:00", completedAt: "2026-06-06T13:00:00",
    doctor: "Dr. Priya Mehta", dept: "Haematology",
    subjective: {
      chiefComplaint: "Extreme fatigue, pallor and dyspnoea on exertion for 3 months",
      historyOfIllness: "Progressive exertional breathlessness and fatigue for 3 months. Menorrhagia for 2 years. No haematemesis, haematochezia, or haematuria. No weight loss.",
    },
    objective: {
      vitals: { bp: "100/64", pulse: 104, spo2: 97, temp: 36.7, weight: 48, height: 152, bmi: 20.8, recordedAt: "2026-06-06" },
      generalAppearance: "Pallor ++. Koilonychia noted. Atrophic glossitis.",
      systemicFindings: [
        { system: "CVS",            finding: "Tachycardia. Haemic murmur Grade 2/6 at apex.",  normal: false },
        { system: "Respiratory",    finding: "Normal",                                          normal: true },
        { system: "Abdomen",        finding: "Normal",                                          normal: true },
        { system: "CNS",            finding: "Normal",                                          normal: true },
        { system: "Musculoskeletal",finding: "Normal",                                          normal: true },
        { system: "Skin",           finding: "Dry, brittle nails. Koilonychia.",                normal: false },
        { system: "ENT",            finding: "Angular stomatitis.",                             normal: false },
        { system: "Eyes",           finding: "Pallor of conjunctiva ++.",                       normal: false },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "D50.9", label: "Iron Deficiency Anaemia — Severe (Hb 5.2 g/dL)", type: "Primary",   status: "Active" },
        { code: "N92.0", label: "Menorrhagia",                                      type: "Secondary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0018-1", drug: "Inj Iron Sucrose 200mg",    dose: "200mg",  route: "IV",   frequency: "3 doses alternate days", duration: "5 days" },
        { id: "rx-0018-2", drug: "Tab Ferrous Sulphate 200mg",dose: "200mg",  route: "Oral", frequency: "BD",  duration: "3 months", instructions: "With Vitamin C" },
        { id: "rx-0018-3", drug: "Tab Folic Acid 5mg",        dose: "5mg",    route: "Oral", frequency: "OD",  duration: "3 months" },
      ],
      referrals: "Gynaecology referral for menorrhagia evaluation.",
      followUpDays: 30,
    },
    signedBy: "Dr. Priya Mehta", signedAt: "2026-06-06T13:05:00",
  },

  // ── 19. Signed Off — Pancreatitis
  {
    id: "EXM-0019",
    patientId: "PT-0030", patientName: "Madhuri Kulkarni",
    type: "Emergency", status: "Signed",
    startedAt: "2026-06-11T11:40:00", completedAt: "2026-06-11T12:10:00",
    doctor: "Dr. Suresh Nair", dept: "Gastroenterology",
    subjective: {
      chiefComplaint: "Acute severe epigastric pain radiating to back, nausea and vomiting",
      historyOfIllness: "Sudden onset severe epigastric pain radiating to back, associated nausea and multiple episodes of vomiting since last evening. No history of gallstones. Occasional alcohol use.",
    },
    objective: {
      vitals: { bp: "112/72", pulse: 96, spo2: 98, temp: 37.4, weight: 58, height: 160, bmi: 22.7, recordedAt: "2026-06-11" },
      generalAppearance: "Distressed, in severe pain.",
      systemicFindings: [
        { system: "CVS",         finding: "Tachycardia. Normal heart sounds.",                     normal: false },
        { system: "Respiratory", finding: "Normal",                                                 normal: true },
        { system: "Abdomen",     finding: "Severe epigastric tenderness. Guarding. Epigastric mass not palpable. Grey-Turner and Cullen signs absent.", normal: false },
        { system: "CNS",         finding: "Normal",                                                 normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                            normal: true },
        { system: "Skin",        finding: "Normal",                                                 normal: true },
        { system: "ENT",         finding: "Normal",                                                 normal: true },
        { system: "Eyes",        finding: "Normal",                                                 normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "K85.9", label: "Acute Pancreatitis — Mild (BISAP Score 1)", type: "Primary", status: "Active" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0019-1", drug: "IV Normal Saline",         dose: "3L/day",  route: "IV",   frequency: "Continuous",   duration: "48 hours" },
        { id: "rx-0019-2", drug: "Inj Tramadol 100mg",       dose: "100mg",   route: "IV",   frequency: "Q8h",          duration: "3 days" },
        { id: "rx-0019-3", drug: "Inj Pantoprazole 40mg",    dose: "40mg",    route: "IV",   frequency: "BD",           duration: "5 days" },
        { id: "rx-0019-4", drug: "Inj Ondansetron 4mg",      dose: "4mg",     route: "IV",   frequency: "TDS PRN",      duration: "2 days" },
      ],
      procedures: "NPO. Nasogastric tube if vomiting persists. Daily LFT, CBC. CT abdomen if no improvement in 48h.",
      followUpDays: 2,
    },
    signedBy: "Dr. Suresh Nair", signedAt: "2026-06-11T12:15:00",
  },

  // ── 20. Signed Off — Post-LSCS review
  {
    id: "EXM-0020",
    patientId: "PT-0019", patientName: "Anitha Rajan",
    type: "IPD Review", status: "Signed",
    startedAt: "2026-06-09T07:30:00", completedAt: "2026-06-09T08:00:00",
    doctor: "Dr. Ananya Krishnan", dept: "Obstetrics & Gynaecology",
    subjective: {
      chiefComplaint: "Post-LSCS Day 2 — routine review",
      historyOfIllness: "Emergency LSCS done for foetal distress. Day 2 post-op. Breastfeeding initiated. Lochia normal. No fever. Wound healthy.",
    },
    objective: {
      vitals: { bp: "112/72", pulse: 76, spo2: 99, temp: 36.8, weight: 64, height: 162, bmi: 24.4, recordedAt: "2026-06-09" },
      generalAppearance: "Comfortable. Ambulant with support.",
      systemicFindings: [
        { system: "CVS",         finding: "Normal",                                                  normal: true },
        { system: "Respiratory", finding: "Normal",                                                  normal: true },
        { system: "Abdomen",     finding: "Uterus well-contracted. Pfannenstiel wound healthy, no discharge.", normal: true },
        { system: "CNS",         finding: "Normal",                                                  normal: true },
        { system: "Musculoskeletal", finding: "Normal",                                              normal: true },
        { system: "Skin",        finding: "Normal",                                                  normal: true },
        { system: "ENT",         finding: "Normal",                                                  normal: true },
        { system: "Eyes",        finding: "Normal",                                                  normal: true },
      ],
    },
    assessment: {
      diagnoses: [
        { code: "O82", label: "Post-LSCS Day 2 — Normal Recovery", type: "Primary", status: "Resolved" },
      ],
    },
    plan: {
      orders: [],
      prescriptions: [
        { id: "rx-0020-1", drug: "Inj Cefazolin 1g",           dose: "1g",    route: "IV",   frequency: "Q8h", duration: "2 days" },
        { id: "rx-0020-2", drug: "Tab Ibuprofen 400mg",         dose: "400mg", route: "Oral", frequency: "TDS", duration: "3 days", instructions: "After food" },
        { id: "rx-0020-3", drug: "Iron + Folic Acid Tablet",    dose: "1 tab", route: "Oral", frequency: "OD",  duration: "3 months" },
        { id: "rx-0020-4", drug: "Tab Metronidazole 400mg",     dose: "400mg", route: "Oral", frequency: "TDS", duration: "5 days" },
      ],
      procedures: "Mobilise with physio. Breastfeeding support. Remove urinary catheter today.",
      followUpDays: 7,
      patientInstructions: "Wound care at home. Report fever or discharge from wound. Planned discharge Day 3.",
    },
    signedBy: "Dr. Ananya Krishnan", signedAt: "2026-06-09T08:05:00",
  },
]);
