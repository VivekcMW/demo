import type { TemplateDefinition } from "../templateSchema";

export const SLEEP_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "sleep-consult",
  name: "Sleep Medicine Consult",
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
    description: "Sleep Medicine Consult template for Sleep Medicine",
    specialties: ["Sleep Medicine"],
    status: "active",
  },
};



export const SLEEP_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "sleep-followup",
  name: "Sleep Medicine Follow-up",
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
    description: "Sleep Medicine Follow-up template for Sleep Medicine",
    specialties: ["Sleep Medicine"],
    status: "active",
  },
};



export const SLEEP_STUDY_TEMPLATE: TemplateDefinition = {
  id: "sleep-study",
  name: "Sleep Medicine Sleep Study Report",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "studyHeader",
      label: "Study Details",
      fields: [
        { key: "studyType", label: "Type of Sleep Study", type: "select", required: true, options: [
          { label: "Polysomnography (PSG) attended", value: "PSG" },
          { label: "Home Sleep Apnea Test (HSAT)", value: "HSAT" },
          { label: "Multiple Sleep Latency Test (MSLT)", value: "MSLT" },
          { label: "Maintenance of Wakefulness Test (MWT)", value: "MWT" },
          { label: "Actigraphy", value: "Actigraphy" },
         ] },
        { key: "date", label: "Study Date", type: "date", required: true },
        { key: "referringProvider", label: "Referring Provider", type: "text", required: true },
        { key: "indication", label: "Indication for Study", type: "textarea", required: true, rows: 2, placeholder: "e.g. Suspected OSA, narcolepsy, idiopathic hypersomnia, circadian rhythm disorder, parasomnia" },
      ],
    },
    {
      key: "results",
      label: "Study Results",
      fields: [
        { key: "ahi", label: "AHI / RDI (events/hr)", type: "number", min: 0, max: 100, placeholder: "Apnea-Hypopnea Index" },
        { key: "lowestSpo2", label: "Lowest SpO2 (%)", type: "number", min: 0, max: 100 },
        { key: "timeBelow90", label: "Time SpO2 <90% (min)", type: "number", min: 0, max: 600 },
        { key: "sleepArchitecture", label: "Sleep Architecture Summary", type: "textarea", rows: 2, placeholder: "Total sleep time, sleep efficiency, REM latency, NREM stages distribution" },
        { key: "respiratoryEvents", label: "Respiratory Event Summary", type: "textarea", rows: 2, placeholder: "Obstructive apneas, central apneas, mixed apneas, hypopneas, RERAs" },
        { key: "otherFindings", label: "Other Findings", type: "textarea", rows: 2, placeholder: "PLMS, periodic limb movements, cardiac arrhythmias, snoring intensity, body position effects" },
      ],
    },
    {
      key: "interpretation",
      label: "Interpretation & Plan",
      fields: [
        { key: "interpretation", label: "Interpretation / Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "e.g. Severe OSA (AHI 45/hr), mainly obstructive, with significant desaturations to 78%" },
        { key: "recommendations", label: "Recommendations", type: "textarea", rows: 2, placeholder: "CPAP/BiPAP settings, weight loss, positional therapy, ENT referral, dental device" },
        { key: "followUp", label: "Follow-up Plan", type: "text", placeholder: "e.g. CPAP follow-up in 1 month, repeat PSG in 1 year" },
      ],
    },
  ],
  metadata: {
    description: "Sleep Medicine Sleep Study Report template for Sleep Medicine",
    specialties: ["Sleep Medicine"],
    status: "active",
  },
};
