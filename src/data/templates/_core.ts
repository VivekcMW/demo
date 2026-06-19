import type { TemplateDefinition } from "../templateSchema";

export const SOAP_TEMPLATE: TemplateDefinition = {
  id: "soap-default",
  name: "SOAP Note",
  type: "SOAP",
  scope: "system",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        {
          key: "chiefComplaint",
          label: "Chief Complaint",
          type: "textarea",
          required: true,
          rows: 2,
          placeholder: "Patient's primary presenting complaint…",
        },
        {
          key: "historyOfIllness",
          label: "History of Present Illness",
          type: "textarea",
          rows: 4,
          placeholder: "Onset, duration, severity, associated symptoms, aggravating/relieving factors…",
        },
        {
          key: "reviewOfSystems",
          label: "Review of Systems",
          type: "textarea",
          rows: 3,
          placeholder: "Any other system complaints…",
        },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals",
          label: "Vitals",
          type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text", placeholder: "e.g. 120/80" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", placeholder: "e.g. 72", min: 0, max: 300 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", placeholder: "e.g. 98", min: 0, max: 100 },
            { key: "temp", label: "Temp (°C)", type: "number", placeholder: "e.g. 36.8", min: 30, max: 45 },
            { key: "weight", label: "Weight (kg)", type: "number", placeholder: "e.g. 70", min: 0, max: 500 },
            { key: "height", label: "Height (cm)", type: "number", placeholder: "e.g. 170", min: 0, max: 300 },
          ],
        },
        {
          key: "generalAppearance",
          label: "General Appearance",
          type: "textarea",
          rows: 2,
          placeholder: "e.g. Conscious, cooperative, no acute distress…",
        },
        {
          key: "systemicExamination",
          label: "Systemic Examination",
          type: "section",
          fields: [
            { key: "CVS", label: "CVS", type: "text", placeholder: "Finding…" },
            { key: "Respiratory", label: "Respiratory", type: "text", placeholder: "Finding…" },
            { key: "Abdomen", label: "Abdomen", type: "text", placeholder: "Finding…" },
            { key: "CNS", label: "CNS", type: "text", placeholder: "Finding…" },
            { key: "Musculoskeletal", label: "Musculoskeletal", type: "text", placeholder: "Finding…" },
            { key: "Skin", label: "Skin", type: "text", placeholder: "Finding…" },
            { key: "ENT", label: "ENT", type: "text", placeholder: "Finding…" },
            { key: "Eyes", label: "Eyes", type: "text", placeholder: "Finding…" },
          ],
        },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        {
          key: "diagnoses",
          label: "Diagnoses",
          type: "repeating",
          fields: [
            { key: "code", label: "ICD Code", type: "text", placeholder: "e.g. E11.9" },
            { key: "label", label: "Diagnosis", type: "text", placeholder: "Diagnosis label" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Primary", value: "Primary" }, { label: "Secondary", value: "Secondary" }, { label: "Differential", value: "Differential" }] },
            { key: "status", label: "Status", type: "select", options: [{ label: "Active", value: "Active" }, { label: "Resolved", value: "Resolved" }, { label: "Chronic", value: "Chronic" }] },
          ],
        },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        {
          key: "prescriptions",
          label: "Prescriptions",
          type: "repeating",
          fields: [
            { key: "drug", label: "Drug", type: "text", placeholder: "Drug name" },
            { key: "dose", label: "Dose", type: "text", placeholder: "e.g. 500mg" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Oral", value: "Oral" }, { label: "IV", value: "IV" }, { label: "IM", value: "IM" }, { label: "Topical", value: "Topical" }, { label: "Inhaler", value: "Inhaler" }, { label: "SL", value: "SL" }, { label: "SC", value: "SC" }] },
            { key: "frequency", label: "Frequency", type: "select", options: [{ label: "OD", value: "OD" }, { label: "BD", value: "BD" }, { label: "TDS", value: "TDS" }, { label: "QID", value: "QID" }, { label: "SOS", value: "SOS" }, { label: "HS", value: "HS" }, { label: "Weekly", value: "Weekly" }, { label: "Monthly", value: "Monthly" }] },
            { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 7 days" },
            { key: "instructions", label: "Instructions", type: "text", placeholder: "Optional" },
          ],
        },
        {
          key: "procedures",
          label: "Procedures Ordered",
          type: "textarea",
          rows: 3,
          placeholder: "e.g. ECG, Wound dressing…",
        },
        {
          key: "referrals",
          label: "Referrals",
          type: "textarea",
          rows: 3,
          placeholder: "e.g. Refer to Cardiology…",
        },
        {
          key: "followUpDays",
          label: "Follow-up (days)",
          type: "number",
          min: 0,
          placeholder: "e.g. 14",
        },
        {
          key: "patientInstructions",
          label: "Patient Instructions",
          type: "textarea",
          rows: 3,
          placeholder: "Dietary advice, activity restrictions, warning signs…",
        },
      ],
    },
  ],
  metadata: {
    description: "Standard SOAP (Subjective, Objective, Assessment, Plan) consultation note",
    specialties: ["General Medicine", "Cardiology", "Pulmonology", "Endocrinology", "Surgery", "OBG", "Paediatrics"],
    status: "active",
  },
};


export const ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "admission-default",
  name: "Admission Note",
  type: "Admission",
  scope: "system",
  version: 1,
  sections: [
    {
      key: "admissionDetails",
      label: "Admission Details",
      fields: [
        { key: "admissionDate", label: "Date & Time of Admission", type: "date", required: true },
        { key: "admittingDoctor", label: "Admitting Doctor", type: "text", required: true },
        { key: "ward", label: "Ward / Unit", type: "text", placeholder: "e.g. General Ward, ICU" },
        { key: "bed", label: "Bed Number", type: "text", placeholder: "e.g. B-12" },
      ],
    },
    {
      key: "history",
      label: "History",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4 },
        { key: "pastHistory", label: "Past Medical History", type: "textarea", rows: 3, placeholder: "Chronic conditions, surgeries, hospitalisations…" },
        { key: "medicationHistory", label: "Medication History", type: "textarea", rows: 2, placeholder: "Current medications, allergies…" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, occupation…" },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals",
          label: "Vitals on Admission",
          type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number" },
            { key: "spo2", label: "SpO₂ (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2 },
        { key: "systemicExam", label: "Systemic Examination", type: "textarea", rows: 3, placeholder: "CVS, Respiratory, Abdomen, CNS…" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "plan", label: "Plan of Care", type: "textarea", rows: 4, placeholder: "Treatment plan, investigations, consults…" },
        { key: "procedures", label: "Procedures Planned", type: "textarea", rows: 2 },
      ],
    },
  ],
  metadata: {
    description: "Structured admission note for inpatient encounters",
    specialties: ["General Medicine", "Surgery", "Cardiology", "Pulmonology"],
    status: "active",
  },
};


export const PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "progress-default",
  name: "Daily Progress Note",
  type: "Progress",
  scope: "system",
  version: 1,
  sections: [
    {
      key: "progressHeader",
      label: "Progress Header",
      fields: [
        { key: "date", label: "Date", type: "date", required: true },
        { key: "dayOfAdmission", label: "Day of Admission", type: "number", min: 1, placeholder: "e.g. 3" },
        { key: "shift", label: "Shift", type: "select", options: [{ label: "Morning", value: "Morning" }, { label: "Evening", value: "Evening" }, { label: "Night", value: "Night" }] },
      ],
    },
    {
      key: "events",
      label: "Overnight / Since Last Review",
      fields: [
        { key: "events", label: "Events & Changes", type: "textarea", rows: 3, placeholder: "Any significant events, changes in condition…" },
        { key: "vitalsTrend", label: "Vitals Trend", type: "textarea", rows: 2, placeholder: "BP / Pulse / SpO₂ / Temp trend summary" },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2 },
        { key: "systemicExam", label: "Systemic Examination", type: "textarea", rows: 3 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "plan", label: "Plan for Next Shift", type: "textarea", rows: 3, required: true },
        { key: "pending", label: "Pending Investigations", type: "textarea", rows: 2 },
        { key: "dischargePlan", label: "Discharge Planning", type: "textarea", rows: 2, placeholder: "Expected discharge date, barriers…" },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for inpatient rounds",
    specialties: ["General Medicine", "Surgery", "ICU", "Paediatrics"],
    status: "active",
  },
};


export const PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "procedure-default",
  name: "Procedure Note",
  type: "Procedure",
  scope: "system",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Procedure Details",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true },
        { key: "date", label: "Date of Procedure", type: "date", required: true },
        { key: "surgeon", label: "Surgeon / Operator", type: "text", required: true },
        { key: "assistant", label: "Assistant(s)", type: "text" },
        { key: "anaesthesia", label: "Anaesthesia Type", type: "select", options: [{ label: "General", value: "General" }, { label: "Spinal", value: "Spinal" }, { label: "Regional", value: "Regional" }, { label: "Local", value: "Local" }, { label: "Sedation", value: "Sedation" }] },
      ],
    },
    {
      key: "procedureDetails",
      label: "Procedure Details",
      fields: [
        { key: "indication", label: "Indication", type: "textarea", rows: 2, required: true },
        { key: "consent", label: "Consent Obtained", type: "boolean" },
        { key: "findings", label: "Findings", type: "textarea", rows: 4, required: true, placeholder: "Intra-operative findings…" },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "e.g. Tissue biopsy to histopathology" },
      ],
    },
    {
      key: "postOp",
      label: "Post-Procedure",
      fields: [
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "None or describe…" },
        { key: "bloodLoss", label: "Estimated Blood Loss", type: "text", placeholder: "e.g. 50 mL" },
        { key: "postOpPlan", label: "Post-Procedure Plan", type: "textarea", rows: 3 },
      ],
    },
  ],
  metadata: {
    description: "Structured procedure / operative note",
    specialties: ["Surgery", "OBG", "Orthopaedics", "ENT", "Ophthalmology"],
    status: "active",
  },
};


export const DISCHARGE_TEMPLATE: TemplateDefinition = {
  id: "discharge-default",
  name: "Discharge Summary",
  type: "Discharge",
  scope: "system",
  version: 1,
  sections: [
    {
      key: "dischargeHeader",
      label: "Discharge Information",
      fields: [
        { key: "admissionDate", label: "Date of Admission", type: "date", required: true },
        { key: "dischargeDate", label: "Date of Discharge", type: "date", required: true },
        { key: "admittingDoctor", label: "Admitting Doctor", type: "text" },
        { key: "dischargeDoctor", label: "Discharge Doctor", type: "text", required: true },
      ],
    },
    {
      key: "diagnosis",
      label: "Diagnosis & Course",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Discharge", type: "textarea", required: true, rows: 2 },
        { key: "reasonForAdmission", label: "Reason for Admission", type: "textarea", rows: 2 },
        { key: "hospitalCourse", label: "Hospital Course Summary", type: "textarea", rows: 4, required: true, placeholder: "Brief summary of hospital stay, treatments, response…" },
        { key: "procedures", label: "Procedures During Stay", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "dischargePlan",
      label: "Discharge Plan",
      fields: [
        { key: "medications", label: "Medications at Discharge", type: "textarea", rows: 3, required: true },
        { key: "followUp", label: "Follow-up Instructions", type: "textarea", rows: 2, required: true, placeholder: "Next visit, which doctor, when…" },
        { key: "diet", label: "Diet & Activity Advice", type: "textarea", rows: 2 },
        { key: "warningSigns", label: "Warning Signs to Watch For", type: "textarea", rows: 2 },
      ],
    },
  ],
  metadata: {
    description: "Complete discharge summary for inpatient episodes",
    specialties: ["General Medicine", "Surgery", "Cardiology", "Paediatrics", "OBG"],
    status: "active",
  },
};
