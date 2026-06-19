import type { TemplateDefinition } from "../templateSchema";

export const PHYSIO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "physio-consult",
  name: "Allied Physiotherapy Consult",
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
    description: "Allied Physiotherapy Consult template for Allied Physiotherapy",
    specialties: ["Physiotherapy", "Allied Health"],
    status: "active",
  },
};



export const PHYSIO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "physio-followup",
  name: "Allied Physiotherapy Follow-up",
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
    description: "Allied Physiotherapy Follow-up template for Allied Physiotherapy",
    specialties: ["Physiotherapy", "Allied Health"],
    status: "active",
  },
};



export const DIET_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "diet-consult",
  name: "Allied Dietetics Consult",
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
    description: "Allied Dietetics Consult template for Allied Dietetics",
    specialties: ["Dietetics", "Allied Health"],
    status: "active",
  },
};



export const DIET_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "diet-followup",
  name: "Allied Dietetics Follow-up",
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
    description: "Allied Dietetics Follow-up template for Allied Dietetics",
    specialties: ["Dietetics", "Allied Health"],
    status: "active",
  },
};



export const SPEECH_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "speech-consult",
  name: "Allied Speech Therapy Consult",
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
    description: "Allied Speech Therapy Consult template for Allied Speech Therapy",
    specialties: ["Speech Therapy", "Allied Health"],
    status: "active",
  },
};



export const SPEECH_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "speech-followup",
  name: "Allied Speech Therapy Follow-up",
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
    description: "Allied Speech Therapy Follow-up template for Allied Speech Therapy",
    specialties: ["Speech Therapy", "Allied Health"],
    status: "active",
  },
};
