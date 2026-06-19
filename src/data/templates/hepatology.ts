import type { TemplateDefinition } from "../templateSchema";

export const HEPATOLOGY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "hepatology-consult",
  name: "Hepatology Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "Describe the primary symptom or reason for consultation" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 3, placeholder: "Onset, duration, progression, associated symptoms, prior treatments, investigations" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Relevant medical conditions, surgeries, medications, allergies" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Constitutional, cardiovascular, respiratory, gastrointestinal, neurological, musculoskeletal" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP", type: "text" },
          { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
          { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
          { key: "spo2", label: "SpO2", type: "number", min: 0, max: 100 },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "General appearance, pertinent positive and negative findings" },
        { key: "systemicExam", label: "Systemic Examination", type: "textarea", rows: 3, placeholder: "Focused examination findings relevant to the presenting complaint" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "Primary diagnosis and differential diagnoses" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 3, placeholder: "Medical management, therapy, lifestyle modifications" },
        { key: "investigations", label: "Investigations Ordered", type: "textarea", rows: 2, placeholder: "Lab tests, imaging, special studies" },
        { key: "referrals", label: "Referrals / Consults", type: "textarea", rows: 1, placeholder: "Other specialties, rehabilitation, counseling" },
        { key: "patientEducation", label: "Patient Education / Counseling", type: "textarea", rows: 1, placeholder: "Key counseling points provided" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks, 1 month, PRN" },
      ],
    },
  ],
  metadata: {
    description: "Hepatology Consult template for Hepatology",
    specialties: ["Hepatology"],
    status: "active",
  },
};



export const HEPATOLOGY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "hepatology-followup",
  name: "Hepatology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Change in symptoms since last visit, treatment response, new concerns, medication adherence, side effects" },
        { key: "medicationAdherence", label: "Medication / Treatment Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP", type: "text" },
          { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
          { key: "weight", label: "Weight", type: "number", min: 0, max: 500 },
        ] },
        { key: "exam", label: "Focused Examination", type: "textarea", rows: 2, placeholder: "Relevant exam findings compared to prior visit" },
        { key: "labs", label: "Current Lab / Imaging Results", type: "textarea", rows: 1, placeholder: "Relevant results available today" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "responseToTreatment", label: "Response to Treatment", type: "select", options: [{ label: "Good response", value: "Good" }, { label: "Partial response", value: "Partial" }, { label: "No response", value: "None" }, { label: "Worsening", value: "Worsening" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Synthesis of treatment response, lab trends, and clinical status" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatmentAdjustment", label: "Treatment Adjustment", type: "textarea", rows: 2, placeholder: "Continue current, dose adjust, switch therapy, add new agent" },
        { key: "investigations", label: "Investigations Due", type: "text", placeholder: "Labs, imaging, or consults needed" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 month, 3 months, 6 months" },
      ],
    },
  ],
  metadata: {
    description: "Hepatology Follow-up template for Hepatology",
    specialties: ["Hepatology"],
    status: "active",
  },
};



export const HEPATOLOGY_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "hepatology-admission",
  name: "Hepatology Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "Primary reason for admission" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative of events leading to admission" },
        { key: "onset", label: "Onset & Duration", type: "select", options: [{ label: "Acute (<24h)", value: "Acute" }, { label: "Subacute (1-7 days)", value: "Subacute" }, { label: "Gradual (>1 week)", value: "Gradual" }] },
      ],
    },
    {
      key: "background",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Chronic diseases, prior admissions, surgeries" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "All current medications including dose and frequency" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }] },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
          { key: "rr", label: "RR", type: "number", min: 0, max: 80 },
          { key: "spo2", label: "SpO2 (%)", type: "number", min: 0, max: 100 },
          { key: "temp", label: "Temp (C)", type: "number", min: 30, max: 45 },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "General appearance, head-to-toe survey" },
        { key: "systemicExam", label: "Systemic Examination", type: "textarea", rows: 3, placeholder: "Relevant positive and negative findings" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Admission Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "admissionOrders", label: "Admission Orders", type: "textarea", rows: 3, placeholder: "Diet, activity, IV access, monitoring, medications, investigations" },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 3, placeholder: "Medical management, surgical plan if applicable, consults needed" },
      ],
    },
  ],
  metadata: {
    description: "Hepatology Admission template for Hepatology",
    specialties: ["Hepatology"],
    status: "active",
  },
};



export const HEPATOLOGY_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "hepatology-progress",
  name: "Hepatology Progress Note",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Change in symptoms, new concerns, pain level" },
        { key: "eventsOvernight", label: "Events Overnight / Since Last Review", type: "textarea", rows: 2, placeholder: "Significant events, vitals trends, interventions" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP", type: "text" },
          { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
          { key: "spo2", label: "SpO2", type: "number", min: 0, max: 100 },
          { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
        ] },
        { key: "exam", label: "Focused Examination", type: "textarea", required: true, rows: 2, placeholder: "Key findings compared to prior assessment" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, response to treatment, concerns" },
        { key: "plan", label: "Plan for Next Shift / Day", type: "textarea", required: true, rows: 3, placeholder: "Medication changes, investigations, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Hepatology Progress Note template for Hepatology",
    specialties: ["Hepatology"],
    status: "active",
  },
};
