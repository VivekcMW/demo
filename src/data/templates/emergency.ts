import type { TemplateDefinition } from "../templateSchema";

export const EMERGENCY_TRIAGE_TEMPLATE: TemplateDefinition = {
  id: "emergency-triage",
  name: "ED Triage Note",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "triage",
      label: "Triage Assessment",
      fields: [
        { key: "arrivalDateTime", label: "Arrival Date & Time", type: "date", required: true },
        { key: "modeOfArrival", label: "Mode of Arrival", type: "select", options: [{ label: "Walk-in", value: "WalkIn" }, { label: "Ambulance", value: "Ambulance" }, { label: "Referred from other facility", value: "Referral" }, { label: "Police / bystander", value: "Police" }] },
        { key: "triageLevel", label: "Triage Level (ESI)", type: "select", required: true, options: [
          { label: "ESI 1 — Resuscitation (immediate)", value: "1" },
          { label: "ESI 2 — Emergent (within 10 min)", value: "2" },
          { label: "ESI 3 — Urgent (within 30 min)", value: "3" },
          { label: "ESI 4 — Semi-urgent (within 60 min)", value: "4" },
          { label: "ESI 5 — Non-urgent (within 120 min)", value: "5" },
        ] },
        { key: "chiefComplaint", label: "Chief Complaint", type: "text", required: true, placeholder: "e.g. Chest pain, breathlessness, fever, trauma, fall" },
        { key: "duration", label: "Duration of symptoms", type: "text", placeholder: "e.g. 2 hours, 3 days" },
        { key: "briefHistory", label: "Brief History", type: "textarea", rows: 2, placeholder: "Key history for triage decision" },
      ],
    },
    {
      key: "initialAssessment",
      label: "Initial Assessment",
      fields: [
        { key: "airway", label: "Airway", type: "select", options: [{ label: "Patent", value: "Patent" }, { label: "Compromised", value: "Compromised" }, { label: "Intubated", value: "Intubated" }] },
        { key: "breathing", label: "Breathing", type: "select", options: [{ label: "Normal", value: "Normal" }, { label: "Distressed", value: "Distressed" }, { label: "Apneic", value: "Apneic" }] },
        { key: "circulation", label: "Circulation", type: "select", options: [{ label: "Stable", value: "Stable" }, { label: "Unstable", value: "Unstable" }, { label: "Shock", value: "Shock" }] },
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
          { key: "rr", label: "Respiratory Rate", type: "number", min: 0, max: 80 },
          { key: "spo2", label: "SpO₂ (%)", type: "number", min: 0, max: 100 },
          { key: "temp", label: "Temp (°C)", type: "number", min: 30, max: 45 },
          { key: "gcs", label: "GCS", type: "text", placeholder: "e.g. 15/15 or E4V5M6" },
          { key: "painScore", label: "Pain Score (0-10)", type: "number", min: 0, max: 10 },
        ] },
      ],
    },
    {
      key: "triagePlan",
      label: "Triage Plan",
      fields: [
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Resuscitation bay", value: "Resus" }, { label: "Treatment area", value: "Treatment" }, { label: "Fast track / Minor", value: "Minor" }, { label: "Waiting room", value: "Waiting" }] },
        { key: "immediateActions", label: "Immediate Actions", type: "textarea", rows: 2, placeholder: "O₂, IV access, labs, ECG, imaging, notify doctor" },
        { key: "notedBy", label: "Triaged By", type: "text", required: true },
        { key: "timeToDoctor", label: "Time seen by doctor", type: "time" },
      ],
    },
  ],
  metadata: {
    description: "Rapid triage assessment with ESI level, ABC assessment, and initial disposition",
    specialties: ["Emergency Medicine"],
    status: "active",
  },
};


export const EMERGENCY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "emergency-consult",
  name: "ED Consultation Note",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Onset, course, severity, associated symptoms, treatment before arrival" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Chronic conditions, surgeries, medications, allergies" },
        { key: "lastOralIntake", label: "Last Oral Intake", type: "text", placeholder: "Time of last meal / drink" },
        { key: "eventsBeforeArrival", label: "Events Before Arrival", type: "textarea", rows: 2, placeholder: "Details from ambulance, referring doctor, family" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
          { key: "rr", label: "Respiratory Rate", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
          { key: "gcs", label: "GCS", type: "text" },
          { key: "painScore", label: "Pain Score (0-10)", type: "number", min: 0, max: 10 },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Appearance, distress, hydration, pallor, cyanosis, lymphadenopathy" },
        { key: "focusedExam", label: "Focused System Examination", type: "textarea", required: true, rows: 3, placeholder: "System-specific findings by presenting complaint" },
        { key: "investigations", label: "Investigations Done", type: "textarea", rows: 2, placeholder: "Labs, ECG, imaging, bedside USG — key results" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "ED Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "Provisional diagnosis with ICD-10 if known" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "treatmentGiven", label: "Treatment Given in ED", type: "textarea", rows: 3, placeholder: "Medications, procedures, interventions" },
        { key: "disposition", label: "Disposition", type: "select", required: true, options: [{ label: "Discharged home", value: "Home" }, { label: "Admit to ward", value: "AdmitWard" }, { label: "Admit to ICU", value: "AdmitICU" }, { label: "Observe in ED", value: "Observation" }, { label: "Transfer to other facility", value: "Transfer" }, { label: "OR / Cath Lab", value: "OR" }, { label: "LAMA / absconded", value: "LAMA" }, { label: "Expired", value: "Expired" }] },
        { key: "admissionOrders", label: "Admission Orders (if admitting)", type: "textarea", rows: 2, placeholder: "Inpatient orders, consults, pending investigations" },
        { key: "dischargeInstructions", label: "Discharge Instructions (if going home)", type: "textarea", rows: 2, placeholder: "Medications, follow-up, return precautions, sick leave" },
        { key: "edPhysician", label: "ED Physician", type: "text", required: true },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive emergency department consultation note with treatment, disposition, and discharge planning",
    specialties: ["Emergency Medicine"],
    status: "active",
  },
};


export const EMERGENCY_TRAUMA_TEMPLATE: TemplateDefinition = {
  id: "emergency-trauma",
  name: "Trauma Evaluation Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "traumaHeader",
      label: "Trauma Details",
      fields: [
        { key: "arrivalDateTime", label: "Arrival Date & Time", type: "date", required: true },
        { key: "mechanism", label: "Mechanism of Injury", type: "select", required: true, options: [{ label: "Road traffic accident", value: "RTA" }, { label: "Fall from height", value: "Fall" }, { label: "Assault", value: "Assault" }, { label: "Stab wound", value: "Stab" }, { label: "Firearm injury", value: "Firearm" }, { label: "Blast injury", value: "Blast" }, { label: "Burn", value: "Burn" }, { label: "Other", value: "Other" }] },
        { key: "timeOfInjury", label: "Time of Injury", type: "time" },
        { key: "protectiveDevices", label: "Protective Devices Used", type: "text", placeholder: "Seatbelt, helmet, not applicable" },
        { key: "lossOfConsciousness", label: "Loss of Consciousness", type: "boolean" },
        { key: "traumaType", label: "Trauma Type", type: "select", options: [{ label: "Blunt", value: "Blunt" }, { label: "Penetrating", value: "Penetrating" }, { label: "Burn", value: "Burn" }] },
      ],
    },
    {
      key: "primarySurvey",
      label: "Primary Survey (ATLS)",
      fields: [
        { key: "airway", label: "A — Airway with C-spine", type: "select", options: [{ label: "Patent — no intervention", value: "Patent" }, { label: "Patent — with positioning/chin lift", value: "Assisted" }, { label: "Compromised — intubated", value: "Intubated" }, { label: "Surgical airway", value: "Surgical" }] },
        { key: "breathing", label: "B — Breathing & Ventilation", type: "select", options: [{ label: "Normal — SpO₂ >95%", value: "Normal" }, { label: "Distressed — O₂ required", value: "Distressed" }, { label: "Inadequate — ventilated", value: "Ventilated" }] },
        { key: "circulation", label: "C — Circulation & Hemorrhage Control", type: "select", options: [{ label: "Stable — normal perfusion", value: "Stable" }, { label: "Unstable — fluid responsive", value: "Unstable" }, { label: "Shock — blood products + surgical", value: "Shock" }] },
        { key: "disability", label: "D — Disability (Neurological)", type: "select", options: [{ label: "GCS 15 — Alert", value: "Alert" }, { label: "GCS 9-14 — Confused", value: "Confused" }, { label: "GCS <9 — Unconscious", value: "Unconscious" }] },
        { key: "exposure", label: "E — Exposure / Environmental", type: "textarea", rows: 1, placeholder: "Undressed, log-rolled, spine examined, hypothermia prevention" },
        { key: "adjuncts", label: "Adjuncts to Primary Survey", type: "textarea", rows: 2, placeholder: "FAST, CXR, pelvis X-ray, ABG, lactate, base deficit" },
      ],
    },
    {
      key: "secondarySurvey",
      label: "Secondary Survey",
      fields: [
        { key: "headFace", label: "Head & Face", type: "textarea", rows: 1, placeholder: "Lacerations, fractures, pupils, hemotympanum" },
        { key: "neck", label: "Neck & C-spine", type: "textarea", rows: 1, placeholder: "Tenderness, step-off, collar, palpable fracture" },
        { key: "chest", label: "Chest", type: "textarea", rows: 1, placeholder: "Breath sounds, crepitus, flail chest, chest tube" },
        { key: "abdomen", label: "Abdomen / Pelvis", type: "textarea", rows: 1, placeholder: "Tenderness, guarding, FAST+, pelvic stability" },
        { key: "extremities", label: "Extremities", type: "textarea", rows: 1, placeholder: "Deformity, pulses, compartment status, open fractures" },
        { key: "backSpine", label: "Back & Spine", type: "textarea", rows: 1, placeholder: "Log-roll findings, spinal tenderness" },
        { key: "neurological", label: "Neurological", type: "textarea", rows: 1, placeholder: "GCS, pupils, motor/sensory, reflexes" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Trauma Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "List all injuries with severity" },
        { key: "issScore", label: "ISS / Injury Severity Score", type: "number", min: 0, max: 75 },
        { key: "plan", label: "Plan", type: "textarea", required: true, rows: 3, placeholder: "Resuscitation ongoing, imaging, consults (surgery, ortho, neurosurgery), OR, ICU" },
        { key: "bloodProducts", label: "Blood Products Transfused", type: "text", placeholder: "PRBC, FFP, platelets, cryo — units" },
        { key: "tetanusProphylaxis", label: "Tetanus Prophylaxis Given", type: "boolean" },
        { key: "teamLead", label: "Trauma Team Lead", type: "text" },
      ],
    },
  ],
  metadata: {
    description: "Structured trauma evaluation following ATLS primary/secondary survey with injury scoring and disposition",
    specialties: ["Emergency Medicine"],
    status: "active",
  },
};


export const EMERGENCY_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "emergency-progress",
  name: "ED Observation / Boarder Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "header",
      label: "ED Progress",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "date", required: true },
        { key: "hoursInED", label: "Hours in ED", type: "number", min: 0 },
      ],
    },
    {
      key: "intervalEvents",
      label: "Interval Events",
      fields: [
        { key: "events", label: "Events Since Last Review", type: "textarea", rows: 3, placeholder: "Change in symptoms, new findings, treatment response, pending results" },
        { key: "vitalsTrend", label: "Vitals Trend", type: "textarea", rows: 2, placeholder: "Summarize vitals trajectory" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "pending", label: "Pending Results / Actions", type: "textarea", rows: 2, placeholder: "Labs, imaging, consults" },
        { key: "dispositionPlan", label: "Disposition Plan", type: "select", options: [{ label: "Continue observation", value: "Observe" }, { label: "Ready for discharge", value: "Discharge" }, { label: "Admission decision made", value: "Admit" }] },
        { key: "plan", label: "Plan", type: "textarea", rows: 2, placeholder: "Next steps in management" },
      ],
    },
  ],
  metadata: {
    description: "Progress note for ED observation patients and boarders awaiting admission or discharge",
    specialties: ["Emergency Medicine"],
    status: "active",
  },
};


export const EMERGENCY_DISCHARGE_TEMPLATE: TemplateDefinition = {
  id: "emergency-discharge",
  name: "ED Discharge Instructions",
  type: "Discharge",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "dischargeHeader",
      label: "ED Discharge",
      fields: [
        { key: "arrivalTime", label: "Arrival Time", type: "time" },
        { key: "dischargeTime", label: "Discharge Time", type: "time" },
        { key: "edPhysician", label: "ED Physician", type: "text", required: true },
        { key: "diagnosis", label: "ED Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
      ],
    },
    {
      key: "dischargePlan",
      label: "Discharge Plan",
      fields: [
        { key: "treatmentGiven", label: "Treatment Given in ED", type: "textarea", rows: 2 },
        { key: "medications", label: "Medications Prescribed", type: "textarea", rows: 2, placeholder: "Drug, dose, frequency, duration" },
        { key: "followUp", label: "Follow-up Instructions", type: "textarea", rows: 2, required: true, placeholder: "Which doctor, when, what tests pending" },
        { key: "returnPrecautions", label: "Return Precautions (warning signs)", type: "textarea", rows: 2, placeholder: "When to come back to ED" },
        { key: "sickLeave", label: "Sick Leave Advised (days)", type: "number", min: 0 },
        { key: "patientInstructions", label: "Additional Patient Instructions", type: "textarea", rows: 2, placeholder: "Diet, activity, home care" },
      ],
    },
  ],
  metadata: {
    description: "Emergency department discharge instructions with treatment summary, medications, and return precautions",
    specialties: ["Emergency Medicine"],
    status: "active",
  },
};
