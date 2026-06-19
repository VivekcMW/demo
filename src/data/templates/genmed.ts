import type { TemplateDefinition } from "../templateSchema";

export const GENMED_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "genmed-consult",
  name: "GenMed New Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "Patient's primary presenting complaint…" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 3 days, 2 weeks" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Onset, course, severity, aggravating/relieving factors…" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "DM, HTN, CKD, COPD, Thyroid, CAD, Asthma, etc." },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2 },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "List all current medications with doses" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Drug allergies & reactions" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "DM, HTN, CAD, malignancy in first-degree relatives" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, occupation, diet, physical activity" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "Constitutional, CVS, Respiratory, GI, CNS, Musculoskeletal, Skin" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text", placeholder: "e.g. 120/80" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp (°C)", type: "number", min: 30, max: 45 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
            { key: "height", label: "Height (cm)", type: "number", min: 0, max: 300 },
            { key: "bmi", label: "BMI (auto)", type: "number", readOnly: true, calculate: { formula: "weight/(height/100)^2", dependencies: ["objective.vitals.weight", "objective.vitals.height"] } },
          ],
        },
        { key: "generalAppearance", label: "General Appearance", type: "textarea", rows: 2, placeholder: "Conscious, cooperative, no acute distress, built & nourishment…" },
        { key: "headAndNeck", label: "Head & Neck Exam", type: "textarea", rows: 2, placeholder: "Pallor, icterus, cyanosis, clubbing, lymphadenopathy, thyroid, JVP" },
        {
          key: "systemicExamination", label: "Systemic Examination", type: "section",
          fields: [
            { key: "CVS", label: "CVS", type: "textarea", rows: 1, placeholder: "S1S2, murmurs, rubs, gallop, edema" },
            { key: "Respiratory", label: "Respiratory", type: "textarea", rows: 1, placeholder: "Bilateral air entry, wheeze, crackles, rhonchi" },
            { key: "Abdomen", label: "Abdomen", type: "textarea", rows: 1, placeholder: "Soft, tenderness, organomegaly, bowel sounds" },
            { key: "CNS", label: "CNS", type: "textarea", rows: 1, placeholder: "Consciousness, power, tone, reflexes, sensation, cerebellar" },
            { key: "Musculoskeletal", label: "Musculoskeletal", type: "textarea", rows: 1, placeholder: "Joint swelling, tenderness, deformity, ROM" },
          ],
        },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Type 2 Diabetes Mellitus" },
        { key: "icdCode", label: "ICD-10 Code", type: "text", placeholder: "e.g. E11.9" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating",
          fields: [
            { key: "code", label: "ICD Code", type: "text", placeholder: "e.g. I10" },
            { key: "label", label: "Diagnosis", type: "text", placeholder: "Diagnosis label" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Differential", value: "Differential" }, { label: "Complication", value: "Complication" }] },
            { key: "status", label: "Status", type: "select", options: [{ label: "Active", value: "Active" },             { label: "Resolved", value: "Resolved" }, { label: "Chronic", value: "Chronic" }] },
          ],
        },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief summary of findings and clinical reasoning…" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "selectedOrderSets", label: "Order Sets", type: "orderSet", orderSetIds: ["fever-workup", "htn-review", "diabetes-followup", "dyspnea-workup", "chest-pain-initial", "anemia-workup", "thyroid-followup", "ckd-monitoring"] },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Management plan, lifestyle advice, medications…" },
        {
          key: "investigations", label: "Investigations Ordered", type: "repeating",
          fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. HbA1c, Lipid profile" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "prescriptions", label: "Prescriptions", type: "repeating",
          fields: [
            { key: "drug", label: "Drug", type: "text", placeholder: "Drug name" },
            { key: "dose", label: "Dose", type: "text", placeholder: "e.g. 500mg" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Oral", value: "Oral" }, { label: "IV", value: "IV" }, { label: "IM", value: "IM" }, { label: "Topical", value: "Topical" }, { label: "Inhaler", value: "Inhaler" }, { label: "SL", value: "SL" }, { label: "SC", value: "SC" }] },
            { key: "frequency", label: "Frequency", type: "select", options: [{ label: "OD", value: "OD" }, { label: "BD", value: "BD" }, { label: "TDS", value: "TDS" }, { label: "QID", value: "QID" }, { label: "SOS", value: "SOS" }, { label: "HS", value: "HS" }, { label: "Weekly", value: "Weekly" }] },
            { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 7 days" },
          ],
        },
        { key: "referrals", label: "Referrals / Consults", type: "textarea", rows: 2, placeholder: "e.g. Refer to Cardiology for murmur evaluation" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Review in 2 weeks / 1 month" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 3, placeholder: "Diet, activity, warning signs, when to return…" },
      ],
    },
  ],
  metadata: {
    description: "Complete new consultation note for General Medicine / Internal Medicine",
    specialties: ["General Medicine"],
    status: "active",
  },
};


export const GENMED_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "genmed-followup",
  name: "GenMed Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Changes since last visit, new symptoms, treatment response…" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }, { label: "Not applicable", value: "NA" }] },
        { key: "adverseEffects", label: "Adverse Effects / Side Effects", type: "textarea", rows: 2, placeholder: "Any drug side effects reported…" },
        { key: "reviewOfSystems", label: "Interval Review of Systems", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number" },
            { key: "spo2", label: "SpO₂ (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "weight", label: "Weight (kg)", type: "number" },
          ],
        },
        { key: "focusedExam", label: "Focused Examination", type: "textarea", rows: 3, placeholder: "System-specific exam based on follow-up reason" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical assessment, disease control status, progress…" },
        { key: "statusChange", label: "Disease Status", type: "select", options: [{ label: "Improving", value: "Improving" }, { label: "Stable", value: "Stable" }, { label: "Worsening", value: "Worsening" }, { label: "Resolved", value: "Resolved" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "selectedOrderSets", label: "Order Sets", type: "orderSet", orderSetIds: ["diabetes-followup", "htn-review", "thyroid-followup", "ckd-monitoring", "geriatric-review"] },
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 3, placeholder: "Changes made to medications (new/stopped/adjusted)…" },
        { key: "ongoingPlan", label: "Ongoing Plan", type: "textarea", rows: 3, placeholder: "Continue current management, next review, investigations due…" },
        { key: "nextFollowUp", label: "Next Follow-up", type: "text", placeholder: "e.g. 1 month / 3 months / PRN" },
      ],
    },
  ],
  metadata: {
    description: "Follow-up consultation note for returning General Medicine patients with trend context",
    specialties: ["General Medicine"],
    status: "active",
  },
};


export const GENMED_CHRONIC_TEMPLATE: TemplateDefinition = {
  id: "genmed-chronic",
  name: "Chronic Disease Review",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "diseaseContext",
      label: "Disease Context",
      fields: [
        {
          key: "condition", label: "Primary Chronic Condition", type: "select", required: true,
          options: [
            { label: "Diabetes Mellitus (DM)", value: "DM" },
            { label: "Hypertension (HTN)", value: "HTN" },
            { label: "Chronic Kidney Disease (CKD)", value: "CKD" },
            { label: "COPD", value: "COPD" },
            { label: "Asthma", value: "Asthma" },
            { label: "Hypothyroidism", value: "Hypothyroidism" },
            { label: "Dyslipidemia", value: "Dyslipidemia" },
            { label: "Coronary Artery Disease (CAD)", value: "CAD" },
            { label: "Heart Failure", value: "HeartFailure" },
          ],
        },
        { key: "duration", label: "Duration / Year of Diagnosis", type: "text", placeholder: "e.g. Since 2018" },
        { key: "intervalHistory", label: "Interval History", type: "textarea", rows: 3, placeholder: "Symptom control, exacerbations, hospitalizations since last review…" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good (>80%)", value: "Good" }, { label: "Partial (50-80%)", value: "Partial" }, { label: "Poor (<50%)", value: "Poor" }] },
        { key: "adverseEffects", label: "Side Effects / Intolerance", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "diseaseSpecific",
      label: "Disease-Specific Assessment",
      fields: [
        { key: "dmHbA1c", label: "HbA1c (%)", type: "number", min: 3, max: 20, showIf: { field: "diseaseContext.condition", operator: "in", value: ["DM"] } },
        { key: "dmFBS", label: "Fasting Blood Sugar (mg/dL)", type: "number", showIf: { field: "diseaseContext.condition", operator: "in", value: ["DM"] } },
        { key: "dmPPBS", label: "Post-prandial Blood Sugar (mg/dL)", type: "number", showIf: { field: "diseaseContext.condition", operator: "in", value: ["DM"] } },
        { key: "dmComplications", label: "Diabetes Complications", type: "multiselect", options: [{ label: "Retinopathy", value: "Retinopathy" }, { label: "Nephropathy", value: "Nephropathy" }, { label: "Neuropathy", value: "Neuropathy" }, { label: "CAD", value: "CAD" }, { label: "PVD", value: "PVD" }, { label: "Diabetic Foot", value: "DiabeticFoot" }], showIf: { field: "diseaseContext.condition", operator: "in", value: ["DM"] } },
        { key: "htnBP", label: "BP Reading Today", type: "text", showIf: { field: "diseaseContext.condition", operator: "in", value: ["HTN", "CKD", "CAD", "HeartFailure"] } },
        { key: "htnTargetBP", label: "Target BP (mmHg)", type: "select", options: [{ label: "<130/80", value: "130/80" }, { label: "<140/90", value: "140/90" }], showIf: { field: "diseaseContext.condition", operator: "in", value: ["HTN", "CKD", "DM", "CAD"] } },
        { key: "ckdEGFR", label: "eGFR (mL/min/1.73m²)", type: "number", min: 0, max: 150, showIf: { field: "diseaseContext.condition", operator: "in", value: ["CKD", "DM"] } },
        { key: "ckdCreatinine", label: "Serum Creatinine (mg/dL)", type: "number", min: 0, max: 20, showIf: { field: "diseaseContext.condition", operator: "in", value: ["CKD"] } },
        { key: "copdFEV1", label: "FEV1 (% predicted)", type: "number", min: 0, max: 100, showIf: { field: "diseaseContext.condition", operator: "in", value: ["COPD", "Asthma"] } },
        { key: "copdExacerbations", label: "Exacerbations in past year", type: "number", min: 0, showIf: { field: "diseaseContext.condition", operator: "in", value: ["COPD", "Asthma"] } },
        { key: "thyroidTSH", label: "TSH (mIU/L)", type: "number", min: 0, max: 100, showIf: { field: "diseaseContext.condition", operator: "equals", value: "Hypothyroidism" } },
        { key: "lipidLDL", label: "LDL Cholesterol (mg/dL)", type: "number", showIf: { field: "diseaseContext.condition", operator: "in", value: ["Dyslipidemia", "DM", "CAD"] } },
        { key: "cadSymptoms", label: "Angina / ACS Symptoms", type: "select", options: [{ label: "None", value: "None" }, { label: "Stable angina", value: "Stable" }, { label: "Unstable/New", value: "Unstable" }, { label: "Atypical", value: "Atypical" }], showIf: { field: "diseaseContext.condition", operator: "in", value: ["CAD", "HeartFailure"] } },
        { key: "hfNYHA", label: "NYHA Class", type: "select", options: [{ label: "I — No limitation", value: "I" }, { label: "II — Slight limitation", value: "II" }, { label: "III — Marked limitation", value: "III" }, { label: "IV — Symptoms at rest", value: "IV" }], showIf: { field: "diseaseContext.condition", operator: "equals", value: "HeartFailure" } },
      ],
    },
    {
      key: "medicationReview",
      label: "Medication Review",
      fields: [
        {
          key: "currentMeds", label: "Current Medications", type: "repeating",
          fields: [
            { key: "drug", label: "Drug", type: "text", placeholder: "Drug name" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "frequency", label: "Frequency", type: "text" },
            { key: "continue", label: "Continue?", type: "select", options: [{ label: "Continue", value: "Continue" }, { label: "Modify", value: "Modify" }, { label: "Stop", value: "Stop" }] },
          ],
        },
        { key: "careGaps", label: "Care Gaps / Due Investigations", type: "textarea", rows: 3, placeholder: "e.g. HbA1c overdue, eye exam due, influenza vaccine due…" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "selectedOrderSets", label: "Order Sets", type: "orderSet", orderSetIds: ["diabetes-followup", "htn-review", "ckd-monitoring", "geriatric-review", "thyroid-followup"] },
        { key: "plan", label: "Management Plan", type: "textarea", required: true, rows: 3, placeholder: "Medication adjustments, lifestyle modifications, monitoring plan…" },
        { key: "investigationsOrdered", label: "Investigations Ordered", type: "textarea", rows: 2 },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 2, placeholder: "e.g. Ophthalmology for annual retina screen" },
        { key: "nextReview", label: "Next Review", type: "text", placeholder: "e.g. 3 months / 6 months" },
        { key: "patientEducation", label: "Patient Education Provided", type: "textarea", rows: 2, placeholder: "Diet, exercise, medication compliance, warning signs…" },
      ],
    },
  ],
  metadata: {
    description: "Structured chronic disease review for Diabetes, Hypertension, CKD, COPD, Thyroid, Dyslipidemia, and CAD follow-up",
    specialties: ["General Medicine"],
    status: "active",
  },
};


export const GENMED_ACUTE_TEMPLATE: TemplateDefinition = {
  id: "genmed-acute",
  name: "Acute Illness Focused",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentation",
      label: "Presentation",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Fever with cough for 3 days" },
        { key: "onset", label: "Onset", type: "select", options: [{ label: "Sudden (<24hr)", value: "Sudden" }, { label: "Acute (1-7 days)", value: "Acute" }, { label: "Subacute (1-4 weeks)", value: "Subacute" }] },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 3 days" },
        {
          key: "symptomCategory", label: "Symptom Category", type: "select", required: true,
          options: [
            { label: "Fever / Infectious", value: "Fever" },
            { label: "Respiratory / Cough / SOB", value: "Respiratory" },
            { label: "GI / Abdomen", value: "GI" },
            { label: "UTI / Genitourinary", value: "UTI" },
            { label: "Chest Pain / Discomfort", value: "Chest" },
            { label: "Headache / Neurological", value: "Neuro" },
            { label: "Musculoskeletal / Joint", value: "MSK" },
            { label: "Skin / Rash", value: "Skin" },
          ],
        },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }] },
        { key: "hpDetails", label: "History Details", type: "textarea", rows: 4, placeholder: "Associated symptoms, aggravating/relieving factors, similar episodes, fever pattern, chills, rash, travel history, sick contacts…" },
        { key: "redFlags", label: "Red Flags / Concerning Features", type: "textarea", rows: 2, placeholder: "e.g. High-grade fever >103°F, hemoptysis, chest pain, altered sensorium, vomiting, oliguria" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number" },
            { key: "spo2", label: "SpO₂ (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "rr", label: "Respiratory Rate", type: "number", placeholder: "breaths/min" },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 2, placeholder: "Appearance, distress, hydration, pallor, icterus" },
        { key: "focusedExam", label: "Focused System Exam", type: "textarea", required: true, rows: 3, placeholder: "System-specific findings based on presenting complaint…" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Working Diagnosis", type: "text", required: true, placeholder: "e.g. Community Acquired Pneumonia" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "clinicalReasoning", label: "Clinical Reasoning", type: "textarea", rows: 2, placeholder: "Brief differential and reasoning…" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Home / Outpatient", value: "OPD" }, { label: "Observe / ED", value: "Observation" }, { label: "Admit IPD", value: "Admit" }, { label: "Refer to ER", value: "ER" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "selectedOrderSets", label: "Order Sets", type: "orderSet", orderSetIds: ["fever-workup", "dyspnea-workup", "chest-pain-initial", "anemia-workup"] },
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Medications, supportive care, monitoring…" },
        {
          key: "investigations", label: "Investigations", type: "repeating",
          fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. CBC, CRP, CXR" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "symptomRelief", label: "Symptom Relief Advice", type: "textarea", rows: 2, placeholder: "Antipyretics, hydration, rest, steam inhalation…" },
        { key: "warningSigns", label: "Return Precautions / Warning Signs", type: "textarea", rows: 2, placeholder: "When to return or go to ER…" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Review in 48-72 hours if not improving" },
      ],
    },
  ],
  metadata: {
    description: "Focused acute illness assessment for fever, respiratory infections, GI complaints, UTI, chest pain, and other acute presentations",
    specialties: ["General Medicine"],
    status: "active",
  },
};


export const GENMED_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "genmed-admission",
  name: "GenMed IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "admissionDetails",
      label: "Admission Details",
      fields: [
        { key: "admissionDate", label: "Date & Time of Admission", type: "date", required: true },
        { key: "admittingDoctor", label: "Admitting Doctor", type: "text", required: true },
        { key: "source", label: "Source", type: "select", options: [{ label: "OPD", value: "OPD" }, { label: "Emergency", value: "Emergency" }, { label: "Transfer from other", value: "Transfer" }] },
        { key: "ward", label: "Ward / Unit", type: "text", placeholder: "e.g. General Ward, ICU" },
        { key: "bed", label: "Bed Number", type: "text" },
      ],
    },
    {
      key: "clinicalHistory",
      label: "Clinical History",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Complete history leading to admission" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Chronic conditions, past admissions" },
        { key: "medicationHistory", label: "Medication on Admission", type: "textarea", rows: 2 },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals on Admission", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number" },
            { key: "spo2", label: "SpO₂ (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "rr", label: "Respiratory Rate", type: "number" },
            { key: "gcs", label: "GCS", type: "text", placeholder: "e.g. 15/15" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2 },
        { key: "systemicExam", label: "Systemic Examination", type: "textarea", rows: 3, placeholder: "CVS, Respiratory, Abdomen, CNS — full findings" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "selectedOrderSets", label: "Order Sets", type: "orderSet", orderSetIds: ["pre-admission-clearance", "fever-workup", "chest-pain-initial", "dyspnea-workup"] },
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "severity", label: "Severity / Acuity", type: "select", options: [{ label: "Stable", value: "Stable" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating",
          fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. IV access, CBC, ECG" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Detailed inpatient management plan…" },
        { key: "consults", label: "Consults / Referrals", type: "textarea", rows: 2 },
      ],
    },
  ],
  metadata: {
    description: "Structured admission note for General Medicine inpatient encounters",
    specialties: ["General Medicine"],
    status: "active",
  },
};


export const GENMED_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "genmed-progress",
  name: "GenMed Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "progressHeader",
      label: "Progress Header",
      fields: [
        { key: "date", label: "Date", type: "date", required: true },
        { key: "dayOfAdmission", label: "Day of Admission", type: "number", min: 1 },
        { key: "shift", label: "Shift", type: "select", options: [{ label: "Morning", value: "Morning" }, { label: "Evening", value: "Evening" }, { label: "Night", value: "Night" }] },
      ],
    },
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "intervalEvents", label: "Events Since Last Review", type: "textarea", rows: 3, placeholder: "New symptoms, changes, overnight events…" },
        { key: "pain", label: "Pain (0-10)", type: "number", min: 0, max: 10 },
      ],
    },
    {
      key: "objectiveUpdate",
      label: "Objective Update",
      fields: [
        {
          key: "vitals", label: "Current Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number" },
            { key: "spo2", label: "SpO₂ (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "urineOutput", label: "Urine Output (mL/24hr)", type: "number" },
          ],
        },
        { key: "focusedExam", label: "Focused Examination", type: "textarea", rows: 3, placeholder: "Relevant positive and negative findings" },
        { key: "investigationResults", label: "New Investigation Results", type: "textarea", rows: 2, placeholder: "CBC, chemistry, cultures, imaging — key results" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "selectedOrderSets", label: "Order Sets", type: "orderSet", orderSetIds: ["diabetes-followup", "htn-review", "ckd-monitoring", "geriatric-review"] },
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical impression, response to treatment, concerns…" },
        { key: "plan", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "Medication changes, investigations, procedures, discharge planning…" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }, { label: "Comfort Care", value: "Comfort" }, { label: "Not discussed", value: "NotDiscussed" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily inpatient progress note for General Medicine rounds with SOAPIE format",
    specialties: ["General Medicine"],
    status: "active",
  },
};


export const GENMED_DISCHARGE_TEMPLATE: TemplateDefinition = {
  id: "genmed-discharge",
  name: "GenMed Discharge Summary",
  type: "Discharge",
  scope: "specialty",
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
        { key: "dischargeTime", label: "Time of Discharge", type: "time" },
        { key: "modeOfDischarge", label: "Mode of Discharge", type: "select", options: [{ label: "Cured / Recovered", value: "Recovered" }, { label: "Improved", value: "Improved" }, { label: "Against Medical Advice (LAMA)", value: "LAMA" }, { label: "Referred / Transferred", value: "Referred" }, { label: "Expired", value: "Expired" }] },
      ],
    },
    {
      key: "clinicalSummary",
      label: "Clinical Summary",
      fields: [
        { key: "diagnosisAtAdmission", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "diagnosisAtDischarge", label: "Diagnosis at Discharge", type: "textarea", required: true, rows: 2 },
        { key: "icdCodes", label: "ICD-10 Codes", type: "text", placeholder: "Primary + secondary codes" },
        { key: "hospitalCourse", label: "Hospital Course Summary", type: "textarea", required: true, rows: 4, placeholder: "Brief summary of hospital stay, treatments, procedures, response to therapy, complications…" },
        { key: "keyInvestigations", label: "Key Investigation Results", type: "textarea", rows: 3, placeholder: "Notable lab results, imaging findings during stay" },
        { key: "proceduresDuringStay", label: "Procedures During Stay", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "dischargePlan",
      label: "Discharge Plan",
      fields: [
        { key: "selectedOrderSets", label: "Order Sets", type: "orderSet", orderSetIds: ["geriatric-review"] },
        { key: "medications", label: "Medications at Discharge", type: "textarea", required: true, rows: 3, placeholder: "Drug, dose, frequency, duration for each discharge medication" },
        { key: "followUp", label: "Follow-up Instructions", type: "textarea", required: true, rows: 2, placeholder: "Next visit with which doctor, when, where" },
        { key: "dietActivity", label: "Diet & Activity Advice", type: "textarea", rows: 2 },
        { key: "warningSigns", label: "Warning Signs to Watch For", type: "textarea", rows: 2, placeholder: "When to return to hospital" },
        { key: "pendingAppointments", label: "Pending Appointments / Referrals", type: "textarea", rows: 2 },
        { key: "medicationReconciliation", label: "Medication Reconciliation Done", type: "boolean" },
      ],
    },
  ],
  metadata: {
    description: "Complete discharge summary for General Medicine inpatients with transition-of-care focus",
    specialties: ["General Medicine"],
    status: "active",
  },
};


export const GENMED_REFERRAL_TEMPLATE: TemplateDefinition = {
  id: "genmed-referral",
  name: "Internal Referral Note",
  type: "Allied",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "referralHeader",
      label: "Referral Header",
      fields: [
        { key: "referringDoctor", label: "Referring Doctor", type: "text", required: true },
        { key: "referringDept", label: "Referring Department", type: "text", required: true },
        { key: "consultant", label: "Consultant / Service Referred To", type: "text", required: true, placeholder: "e.g. Dr. K. Patel (Cardiology)" },
        { key: "specialty", label: "Specialty / Department", type: "select", options: [{ label: "Cardiology", value: "Cardiology" }, { label: "Gastroenterology", value: "Gastroenterology" }, { label: "Neurology", value: "Neurology" }, { label: "Nephrology", value: "Nephrology" }, { label: "Pulmonology", value: "Pulmonology" }, { label: "Endocrinology", value: "Endocrinology" }, { label: "Oncology", value: "Oncology" }, { label: "Orthopaedics", value: "Orthopaedics" }, { label: "Surgery", value: "Surgery" }, { label: "Psychiatry", value: "Psychiatry" }, { label: "Dietetics", value: "Dietetics" }, { label: "Physiotherapy", value: "Physiotherapy" }] },
        { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent (within 24hr)", value: "Urgent" }, { label: "STAT (immediate)", value: "STAT" }] },
        { key: "date", label: "Date of Referral", type: "date", required: true },
      ],
    },
    {
      key: "referralDetails",
      label: "Referral Details",
      fields: [
        { key: "reason", label: "Reason for Referral", type: "textarea", required: true, rows: 3, placeholder: "Specific clinical question or concern…" },
        { key: "background", label: "Clinical Background", type: "textarea", rows: 3, placeholder: "Relevant history, diagnoses, medications" },
        { key: "findings", label: "Relevant Findings", type: "textarea", rows: 3, placeholder: "Vitals, exam findings, investigation results relevant to the referral" },
        { key: "workingDiagnosis", label: "Working Diagnosis", type: "text" },
      ],
    },
    {
      key: "action",
      label: "Action & Response",
      fields: [
        { key: "requestedAction", label: "Requested Action", type: "textarea", rows: 2, placeholder: "e.g. Evaluate and advise on management of atrial fibrillation" },
        { key: "consultantResponse", label: "Consultant Response", type: "textarea", rows: 3, placeholder: "Filled in by consulting service…" },
        { key: "responseDate", label: "Response Date", type: "date" },
      ],
    },
  ],
  metadata: {
    description: "Structured inter-departmental referral note with clinical background and consultant response tracking",
    specialties: ["General Medicine"],
    status: "active",
  },
};
