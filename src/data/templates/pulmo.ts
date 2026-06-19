import type { TemplateDefinition } from "../templateSchema";

export const PULMO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "pulmo-consult",
  name: "Pulmonology Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Cough, breathlessness, hemoptysis, chest pain" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 1 week, 3 months" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Onset, cough (dry/productive), sputum (color/volume), dyspnea (MRC grade), hemoptysis, fever, wheeze, chest pain, orthopnea, PND…" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Asthma, COPD, TB, pneumonia, OSA, DM, HTN, CAD" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Thoracic surgery, lung resection, tracheostomy" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Inhalers, oral steroids, antibiotics, anticoagulants, O2 therapy" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Drug allergies, latex" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Asthma, atopy, TB, lung cancer" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking (pack-years), occupation (dust/fumes), travel, TB contact" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "Constitutional, CVS, GI, CNS, ENT symptoms" },
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
            { key: "rr", label: "RR (/min)", type: "number", min: 0, max: 80 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp (°C)", type: "number", min: 30, max: 45 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalAppearance", label: "General Appearance", type: "textarea", rows: 2, placeholder: "Dyspnea at rest/exertion, cyanosis, clubbing, pedal edema, use of accessory muscles" },
        { key: "entExam", label: "ENT / Upper Airway", type: "textarea", rows: 1, placeholder: "Nasal passages, throat, stridor" },
        {
          key: "respiratoryExam", label: "Respiratory Examination", type: "section",
          fields: [
            { key: "inspection", label: "Inspection", type: "textarea", rows: 1, placeholder: "Chest shape, tracheal deviation, cyanosis, pursed-lip breathing" },
            { key: "palpation", label: "Palpation", type: "textarea", rows: 1, placeholder: "Tactile vocal fremitus, tracheal position, chest expansion" },
            { key: "percussion", label: "Percussion", type: "textarea", rows: 1, placeholder: "Resonant, dull (effusion/consolidation), hyper-resonant (COPD/PTX)" },
            { key: "auscultation", label: "Auscultation", type: "textarea", rows: 1, placeholder: "Air entry, wheeze, crackles (fine/coarse), pleural rub, bronchial breathing" },
          ],
        },
        { key: "CVS", label: "CVS Exam", type: "textarea", rows: 1, placeholder: "JVP, heart sounds, murmurs, pedal edema" },
        { key: "abdomen", label: "Abdomen", type: "textarea", rows: 1, placeholder: "Organomegaly, ascites" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. COPD exacerbation, Community-acquired pneumonia, Asthma" },
        { key: "icdCode", label: "ICD-10 Code", type: "text", placeholder: "e.g. J44.1, J15.9" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating",
          fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Differential", value: "Differential" }, { label: "Complication", value: "Complication" }] },
            { key: "status", label: "Status", type: "select", options: [{ label: "Active", value: "Active" }, { label: "Resolved", value: "Resolved" }, { label: "Chronic", value: "Chronic" }] },
          ],
        },
        { key: "severity", label: "Severity Assessment", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "pftSummary", label: "PFT / Spirometry Summary", type: "textarea", rows: 2, placeholder: "FEV1, FVC, FEV1/FVC ratio, DLCO if available" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis of history, exam, and investigation findings" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Bronchodilators, steroids, antibiotics, O2 therapy, pulmonary rehab, smoking cessation…" },
        {
          key: "investigations", label: "Investigations", type: "repeating",
          fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. CXR, CBC, ABG, PFT, CT chest, sputum C/S" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating",
          fields: [
            { key: "drug", label: "Drug", type: "text", placeholder: "Drug name" },
            { key: "dose", label: "Dose", type: "text", placeholder: "e.g. 500mg" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Oral", value: "Oral" }, { label: "IV", value: "IV" }, { label: "IM", value: "IM" }, { label: "Inhaler", value: "Inhaler" }, { label: "Nebulized", value: "Nebulized" }, { label: "SC", value: "SC" }] },
            { key: "frequency", label: "Frequency", type: "select", options: [{ label: "OD", value: "OD" }, { label: "BD", value: "BD" }, { label: "TDS", value: "TDS" }, { label: "QID", value: "QID" }, { label: "PRN", value: "PRN" }, { label: "HS", value: "HS" }] },
            { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 7 days" },
          ],
        },
        { key: "o2Therapy", label: "O₂ Therapy / Ventilation", type: "textarea", rows: 2, placeholder: "O2 delivery method, flow rate, target SpO2, NIV settings if applicable" },
        { key: "referrals", label: "Referrals / Consults", type: "textarea", rows: 2, placeholder: "e.g. Thoracic surgery, allergy, pulmonary rehab, sleep lab" },
        { key: "patientEducation", label: "Patient Education", type: "textarea", rows: 2, placeholder: "Inhaler technique, smoking cessation, pulmonary rehab, when to return" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks / 1 month / PRN" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Pulmonology / Respiratory Medicine",
    specialties: ["Pulmonology"],
    status: "active",
  },
};


export const PULMO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "pulmo-followup",
  name: "Pulmonology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes since last visit — cough, sputum, dyspnea, wheeze, fever, treatment response…" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good (≥80%)", value: "Good" }, { label: "Partial (50-80%)", value: "Partial" }, { label: "Poor (<50%)", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects / Concerns", type: "textarea", rows: 1, placeholder: "Oral thrush, hoarseness, tremor, weight gain, bruising" },
        { key: "exacerbations", label: "Exacerbations Since Last Visit", type: "number", min: 0, max: 50, placeholder: "Number of acute exacerbations" },
        { key: "hospitalizations", label: "Hospitalizations Since Last Visit", type: "number", min: 0, max: 20 },
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
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
            { key: "rr", label: "RR (/min)", type: "number", min: 0, max: 80 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 0, max: 100 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "exam", label: "Respiratory Exam", type: "textarea", rows: 2, placeholder: "Air entry, wheeze, crackles, accessory muscle use, edema comparison to prior" },
        { key: "spirometry", label: "Spirometry / PFT Today", type: "textarea", rows: 2, placeholder: "FEV1, FVC, FEV1/FVC, trend from prior" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 3, placeholder: "Response to treatment, disease control status (ACT/CAT score), concerns" },
        { key: "controlStatus", label: "Control Status", type: "select", options: [{ label: "Well-controlled", value: "WellControlled" }, { label: "Partially controlled", value: "PartiallyControlled" }, { label: "Uncontrolled", value: "Uncontrolled" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 3, placeholder: "Adjustments to inhalers, step-up/step-down therapy, oral steroid taper, new medications" },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 2, placeholder: "CXR, CBC, ABG, sputum C/S, PFT, CT chest, sleep study" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 month / 3 months / PRN" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 2, placeholder: "Inhaler technique review, action plan, warning signs" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Pulmonology patients with control assessment and medication review",
    specialties: ["Pulmonology"],
    status: "active",
  },
};


export const PULMO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "pulmo-admission",
  name: "Pulmonology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Acute breathlessness for 2 days" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 days, 1 week" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative of the acute episode" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Asthma, COPD, TB, OSA, DM, HTN, CAD, CKD" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Inhalers, oral meds, O2 at home" },
        { key: "smoking", label: "Smoking History", type: "text", placeholder: "e.g. 30 pack-years, quit 2 yrs ago" },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
            { key: "rr", label: "RR (/min)", type: "number", min: 0, max: 80 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp (°C)", type: "number", min: 30, max: 45 },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Cyanosis, clubbing, pedal edema, lymphadenopathy" },
        { key: "respiratoryExam", label: "Respiratory Exam", type: "textarea", required: true, rows: 2, placeholder: "Trachea, chest expansion, percussion note, air entry, added sounds" },
        { key: "otherSystems", label: "Other Systems", type: "textarea", rows: 1, placeholder: "CVS, abdomen, CNS" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "icuNeed", label: "ICU/NIV Required", type: "boolean" },
        { key: "o2Order", label: "O₂ / Ventilation Orders", type: "textarea", rows: 2, placeholder: "O2 flow, target SpO2, NIV settings, intubation criteria" },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating",
          fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC, CRP, ABG, CXR, sputum C/S, IV access" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Bronchodilators, steroids, antibiotics, fluids, supportive care" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. ICU, thoracic surgery, physiotherapy" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Pulmonology / Respiratory Medicine",
    specialties: ["Pulmonology"],
    status: "active",
  },
};


export const PULMO_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "pulmo-progress",
  name: "Pulmonology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Dyspnea, cough, sputum, fever, chest pain, overall feeling" },
        { key: "o2Requirement", label: "O₂ Requirement Trend", type: "text", placeholder: "e.g. 4L/min → 2L/min nasal cannula" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "rr", label: "RR", type: "number", min: 0, max: 80 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
          ],
        },
        { key: "respiratoryExam", label: "Respiratory Exam", type: "textarea", rows: 2, placeholder: "Changes from prior exam" },
        { key: "abg", label: "ABG Today", type: "textarea", rows: 1, placeholder: "pH, pO2, pCO2, HCO3, trend" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, response to treatment, concerns" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "Medication changes, weaning plan, investigations, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }, { label: "Comfort Care", value: "Comfort" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Pulmonology inpatients with focus on respiratory and O2 status",
    specialties: ["Pulmonology"],
    status: "active",
  },
};


export const PULMO_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "pulmo-procedure",
  name: "Pulmonology Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Bronchoscopy, Thoracentesis, Pleural biopsy" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2, placeholder: "Clinical indication for procedure" },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpAssessment", label: "Pre-Procedure Assessment", type: "textarea", rows: 2, placeholder: "Baseline vitals, SpO2, bleeding risk, anticoagulant review" },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text", placeholder: "e.g. 2026-06-15 10:30" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. Bronchoscopy suite, ICU bedside" },
        { key: "anesthesia", label: "Anesthesia / Sedation", type: "text", placeholder: "e.g. Moderate sedation, LA, GA" },
        { key: "findings", label: "Findings", type: "textarea", required: true, rows: 4, placeholder: "Detailed procedural findings — bronchial segments, fluid character, biopsy sites, tolerance" },
        { key: "specimens", label: "Specimens Taken", type: "text", placeholder: "e.g. BAL, brushings, biopsy, pleural fluid" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Bleeding, pneumothorax, desaturation, arrhythmia, etc." },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 2, placeholder: "Recovery from sedation, vitals, SpO2 on room air" },
        { key: "postProcedureOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "CXR post-procedure, NPO until swallow assessment, analgesia" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Discharged home", value: "Home" }, { label: "Ward", value: "Ward" }, { label: "ICU observation", value: "ICU" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "textarea", rows: 2, placeholder: "Biopsy results expected, next visit, medication changes" },
      ],
    },
  ],
  metadata: {
    description: "Structured procedure note for bronchoscopy, thoracentesis, pleural biopsy, and other pulmonary procedures",
    specialties: ["Pulmonology"],
    status: "active",
  },
};
