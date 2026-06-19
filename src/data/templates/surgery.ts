import type { TemplateDefinition } from "../templateSchema";

export const SURGERY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "surgery-consult",
  name: "General Surgery Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Right lower quadrant pain, gallstones, hernia, breast lump" },
        { key: "duration", label: "Duration", type: "text", required: true },
        { key: "pain", label: "Pain Characteristics", type: "section", fields: [
          { key: "location", label: "Location", type: "text", placeholder: "Site of pain, migration (e.g. periumbilical → RLQ)" },
          { key: "onset", label: "Onset", type: "select", options: [{ label: "Sudden", value: "Sudden" }, { label: "Gradual", value: "Gradual" }] },
          { key: "nature", label: "Nature", type: "select", options: [{ label: "Colicky", value: "Colicky" }, { label: "Continuous", value: "Continuous" }, { label: "Burning", value: "Burning" }, { label: "Sharp", value: "Sharp" }] },
          { key: "severity", label: "Severity (0-10)", type: "number", min: 0, max: 10 },
          { key: "radiation", label: "Radiation", type: "text", placeholder: "e.g. Right shoulder, back, groin" },
          { key: "aggravatingRelieving", label: "Aggravating / Relieving Factors", type: "text" },
        ] },
        { key: "associatedSymptoms", label: "Associated Symptoms", type: "multiselect", options: [
          { label: "Nausea/vomiting", value: "Nausea" }, { label: "Fever", value: "Fever" },
          { label: "Anorexia", value: "Anorexia" }, { label: "Weight loss", value: "WeightLoss" },
          { label: "Constipation", value: "Constipation" }, { label: "Diarrhea", value: "Diarrhea" },
          { label: "Hematemesis/melena", value: "GIbleed" }, { label: "Jaundice", value: "Jaundice" },
          { label: "Dysphagia", value: "Dysphagia" }, { label: "Abdominal distension", value: "Distension" },
        ] },
        { key: "bowelBladder", label: "Bowel & Bladder", type: "textarea", rows: 1, placeholder: "Last bowel movement, flatus, urinary symptoms" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Prior surgeries, anesthesia complications" },
        { key: "comorbidities", label: "Comorbidities", type: "textarea", rows: 2, placeholder: "DM, HTN, CAD, CKD, COPD, liver disease, bleeding disorders" },
        { key: "medications", label: "Medications", type: "textarea", rows: 1, placeholder: "Anticoagulants, antiplatelets, steroids, immunosuppressants" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "socialHistory", label: "Social History (smoking, alcohol)", type: "text" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
          { key: "weight", label: "Weight (kg)", type: "number" },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Appearance, pallor, icterus, cyanosis, lymphadenopathy" },
        { key: "abdominalExam", label: "Abdominal Examination", type: "section", fields: [
          { key: "inspection", label: "Inspection", type: "textarea", rows: 1, placeholder: "Scars, distension, visible peristalsis, hernia" },
          { key: "palpation", label: "Palpation", type: "textarea", rows: 2, placeholder: "Tenderness (location, severity), guarding, rigidity, rebound, masses, organomegaly, hernia" },
          { key: "percussion", label: "Percussion", type: "textarea", rows: 1, placeholder: "Tympany, dullness, shifting dullness" },
          { key: "auscultation", label: "Auscultation", type: "textarea", rows: 1, placeholder: "Bowel sounds (present/absent/obstructed), bruits" },
          { key: "rectalExam", label: "Digital Rectal Examination", type: "textarea", rows: 1, placeholder: "Tone, masses, tenderness, blood, prostate" },
        ] },
        { key: "otherExam", label: "Other Regional Exam", type: "textarea", rows: 2, placeholder: "Breast, thyroid, hernia, perineal — depending on complaint" },
        { key: "imagingReview", label: "Imaging & Lab Review", type: "textarea", rows: 2, placeholder: "USG, CT, X-ray, blood work results" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "e.g. K35.9 — Acute appendicitis, K80.2 — Gallstones with cholecystitis" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "differential", label: "Differential Diagnoses", type: "textarea", rows: 2 },
        { key: "surgicalUrgency", label: "Surgical Urgency", type: "select", options: [{ label: "Elective", value: "Elective" }, { label: "Urgent (within 24-48 hr)", value: "Urgent" }, { label: "Emergency (within 1-2 hr)", value: "Emergency" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "management", label: "Plan", type: "textarea", required: true, rows: 3, placeholder: "NPO, IV fluids, antibiotics, analgesia, investigations, surgical consult timing" },
        { key: "preOpWorkup", label: "Pre-op Workup Needed", type: "textarea", rows: 2, placeholder: "CBC, RFT, LFT, coagulation, ECG, CXR, blood group & cross-match" },
        { key: "consent", label: "Consent Discussed", type: "boolean" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Admit for surgery / Review in OPD / Plan OR schedule" },
      ],
    },
  ],
  metadata: {
    description: "General surgery consultation with focused abdominal examination, surgical urgency assessment, and pre-op planning",
    specialties: ["General Surgery"],
    status: "active",
  },
};


export const SURGERY_PREOP_TEMPLATE: TemplateDefinition = {
  id: "surgery-preop",
  name: "Pre-operative Assessment",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preOpDetails",
      label: "Pre-operative Details",
      fields: [
        { key: "plannedProcedure", label: "Planned Procedure", type: "text", required: true },
        { key: "surgeon", label: "Primary Surgeon", type: "text", required: true },
        { key: "plannedDate", label: "Planned Date of Surgery", type: "date", required: true },
        { key: "diagnosis", label: "Pre-op Diagnosis", type: "text", required: true },
      ],
    },
    {
      key: "patientAssessment",
      label: "Patient Assessment",
      fields: [
        { key: "asaaClass", label: "ASA Physical Status", type: "select", required: true, options: [
          { label: "ASA I — Normal healthy", value: "I" },
          { label: "ASA II — Mild systemic disease", value: "II" },
          { label: "ASA III — Severe systemic disease", value: "III" },
          { label: "ASA IV — Severe disease constant threat to life", value: "IV" },
          { label: "ASA V — Moribund, surgery as last resort", value: "V" },
        ] },
        { key: "airwayAssessment", label: "Airway Assessment", type: "section", fields: [
          { key: "mallampati", label: "Mallampati Grade", type: "select", options: [{ label: "I", value: "I" }, { label: "II", value: "II" }, { label: "III", value: "III" }, { label: "IV", value: "IV" }] },
          { key: "mouthOpening", label: "Mouth Opening", type: "text", placeholder: "Normal / restricted" },
          { key: "neckMobility", label: "Neck Mobility", type: "text", placeholder: "Normal / limited" },
        ] },
        { key: "cardiacRisk", label: "Cardiac Risk Assessment", type: "textarea", rows: 1, placeholder: "History, RCRI score, ECG, ECHO if indicated" },
        { key: "pulmonaryRisk", label: "Pulmonary Risk Assessment", type: "textarea", rows: 1, placeholder: "COPD, smoking, sleep apnea, CXR" },
        { key: "bleedingRisk", label: "Bleeding Risk", type: "textarea", rows: 1, placeholder: "Anticoagulants, antiplatelets, INR/platelets, bleeding history" },
        { key: "infectiousScreen", label: "Infectious Screening", type: "textarea", rows: 1, placeholder: "HIV, HBsAg, HCV (for major surgery)" },
      ],
    },
    {
      key: "investigations",
      label: "Investigations & Clearances",
      fields: [
        { key: "requiredInvestigations", label: "Required Investigations (done today)", type: "textarea", rows: 2, placeholder: "CBC, RFT, LFT, coagulation, ECG, CXR, blood group & cross-match" },
        { key: "pacClearance", label: "PAC / Anesthesia Clearance Obtained", type: "boolean" },
        { key: "consent", label: "Informed Consent Obtained", type: "boolean" },
        { key: "bloodArranged", label: "Blood Products Arranged", type: "text", placeholder: "Cross-matched units, blood type" },
      ],
    },
    {
      key: "preOpOrders",
      label: "Pre-operative Orders",
      fields: [
        { key: "npoStatus", label: "NPO Status", type: "select", options: [{ label: "NPO since midnight", value: "Midnight" }, { label: "NPO 6 hr solids, 2 hr clear fluids", value: "Standard" }] },
        { key: "preOpMeds", label: "Pre-op Medications", type: "textarea", rows: 2, placeholder: "Held meds, pre-op antibiotics, DVT prophylaxis" },
        { key: "bowelPrep", label: "Bowel Preparation", type: "select", options: [{ label: "Not required", value: "None" }, { label: "Mechanical bowel prep", value: "Mechanical" }] },
        { key: "specialInstructions", label: "Special Instructions", type: "textarea", rows: 2, placeholder: "Allergies, DVT risk mitigation, positioning, implant required" },
      ],
    },
  ],
  metadata: {
    description: "Pre-operative assessment with ASA classification, airway evaluation, cardiac/pulmonary risk, and pre-op orders",
    specialties: ["General Surgery"],
    status: "active",
  },
};


export const SURGERY_OPERATIVE_TEMPLATE: TemplateDefinition = {
  id: "surgery-operative",
  name: "Operative Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preOp",
      label: "Pre-operative",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true },
        { key: "date", label: "Date of Procedure", type: "date", required: true },
        { key: "surgeon", label: "Surgeon", type: "text", required: true },
        { key: "assistant", label: "Assistant(s)", type: "text" },
        { key: "anesthesia", label: "Anesthesia Type", type: "select", options: [{ label: "General", value: "General" }, { label: "Spinal", value: "Spinal" }, { label: "Regional", value: "Regional" }, { label: "Local", value: "Local" }] },
        { key: "anesthetist", label: "Anesthetist", type: "text" },
        { key: "indication", label: "Indication for Surgery", type: "textarea", required: true, rows: 2 },
        { key: "consentVerified", label: "Consent Verified", type: "boolean" },
        { key: "preOpDiagnosis", label: "Pre-op Diagnosis", type: "text", required: true },
      ],
    },
    {
      key: "intraOp",
      label: "Intra-operative Details",
      fields: [
        { key: "incision", label: "Incision / Approach", type: "text", placeholder: "e.g. Midline, McBurney's, Kocher, Pfannenstiel, laparoscopic ports" },
        { key: "findings", label: "Intra-operative Findings", type: "textarea", required: true, rows: 4, placeholder: "Detailed operative findings per organ explored" },
        { key: "procedurePerformed", label: "Procedure Performed", type: "textarea", required: true, rows: 4, placeholder: "Step-by-step description of the procedure" },
        { key: "drains", label: "Drains", type: "text", placeholder: "Type, number, location, output" },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "Histopathology, microbiology, frozen section" },
        { key: "estimatedBloodLoss", label: "Estimated Blood Loss (mL)", type: "number", min: 0, max: 10000 },
        { key: "fluidsGiven", label: "IV Fluids & Blood Products Given", type: "text", placeholder: "e.g. 2L RL, 1 unit PRBC" },
        { key: "closure", label: "Closure", type: "textarea", rows: 2, placeholder: "Fascia, subcutaneous, skin closure method. Sutures/staples used" },
        { key: "complications", label: "Intra-op Complications", type: "textarea", rows: 2, placeholder: "None / bleeding, bowel injury, etc." },
      ],
    },
    {
      key: "postOp",
      label: "Post-operative Orders",
      fields: [
        { key: "condition", label: "Patient Condition at End", type: "select", options: [{ label: "Stable", value: "Stable" }, { label: "Critical", value: "Critical" }, { label: "Intubated to ICU", value: "Intubated" }] },
        { key: "postOpDiagnosis", label: "Post-op Diagnosis", type: "text", required: true },
        { key: "npoStatus", label: "NPO / Diet", type: "select", options: [{ label: "NPO x 6 hr then sips", value: "NPO" }, { label: "Liquid diet", value: "Liquid" }, { label: "Regular diet", value: "Regular" }] },
        { key: "ivFluids", label: "IV Fluids", type: "textarea", rows: 1 },
        { key: "medications", label: "Medications", type: "textarea", rows: 2, placeholder: "Antibiotics, analgesics, antiemetics, DVT prophylaxis" },
        { key: "monitoring", label: "Monitoring Plan", type: "textarea", rows: 1, placeholder: "Vitals, drain output, urine output, wound check" },
        { key: "followUpPlan", label: "Follow-up Plan", type: "textarea", rows: 2, placeholder: "Suture removal, drain removal, follow-up visit" },
      ],
    },
  ],
  metadata: {
    description: "Complete operative note for general surgery procedures with pre-op, intra-op findings, and post-op orders",
    specialties: ["General Surgery"],
    status: "active",
  },
};


export const SURGERY_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "surgery-admission",
  name: "Surgical IPD Admission",
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
        { key: "source", label: "Source", type: "select", options: [{ label: "OPD", value: "OPD" }, { label: "Emergency", value: "Emergency" }, { label: "Transfer", value: "Transfer" }, { label: "Elective surgery admission", value: "Elective" }] },
        { key: "ward", label: "Ward / Unit", type: "text", placeholder: "e.g. Surgical Ward, SICU, HDU" },
        { key: "admissionReason", label: "Reason for Admission", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "history",
      label: "History",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Complete history with onset, progression, treatment sought" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2 },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2 },
        { key: "medications", label: "Current Medications", type: "textarea", rows: 1 },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
          { key: "rr", label: "Respiratory Rate", type: "number" },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2 },
        { key: "abdominalExam", label: "Abdominal Examination", type: "textarea", rows: 3, placeholder: "Full abdominal exam findings" },
        { key: "otherSystems", label: "Other Systems", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "surgicalPlan", label: "Surgical Plan", type: "textarea", rows: 3, placeholder: "Planned surgery, timing, pre-op optimization, consents needed" },
        { key: "treatmentPlan", label: "Immediate Treatment Plan", type: "textarea", rows: 3, placeholder: "NPO, IV fluids, antibiotics, analgesia, investigations" },
        { key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
          { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC, LFT, grouping, ECG" },
          { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
        ] },
      ],
    },
  ],
  metadata: {
    description: "General surgery admission note for elective and emergency admissions with surgical plan and pre-op optimization",
    specialties: ["General Surgery"],
    status: "active",
  },
};


export const SURGERY_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "surgery-progress",
  name: "Surgical Post-op Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "header",
      label: "Progress Header",
      fields: [
        { key: "date", label: "Date", type: "date", required: true },
        { key: "postOpDay", label: "Post-operative Day", type: "number", min: 0, placeholder: "e.g. POD 1" },
      ],
    },
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "pain", label: "Pain (0-10)", type: "number", min: 0, max: 10 },
        { key: "review", label: "Symptoms Review", type: "textarea", rows: 2, placeholder: "Pain control, nausea/vomiting, appetite, bowels, flatus, urination, ambulation, wound concerns" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
        ] },
        { key: "wound", label: "Wound Assessment", type: "textarea", rows: 2, placeholder: "Dressing, soakage, erythema, discharge, condition" },
        { key: "drains", label: "Drains", type: "text", placeholder: "Output (color, amount), removal plan" },
        { key: "abdomen", label: "Abdominal Exam", type: "textarea", rows: 2, placeholder: "Distension, tenderness, bowel sounds, hernia repair site" },
        { key: "other", label: "Other Systems", type: "textarea", rows: 1, placeholder: "Respiratory, DVT assessment" },
      ],
    },
    {
      key: "plan",
      label: "Assessment & Plan",
      fields: [
        { key: "diet", label: "Diet Progression", type: "select", options: [{ label: "NPO", value: "NPO" }, { label: "Sips", value: "Sips" }, { label: "Liquid", value: "Liquid" }, { label: "Soft", value: "Soft" }, { label: "Regular", value: "Regular" }] },
        { key: "activity", label: "Activity / Ambulation", type: "select", options: [{ label: "Bed rest", value: "Bed" }, { label: "Chair", value: "Chair" }, { label: "Ambulating with assistance", value: "Assist" }, { label: "Independent", value: "Independent" }] },
        { key: "plan", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "Pain management, IV fluids, medications, drain care, mobilization" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily post-operative progress note for surgical patients with wound assessment, drain management, and recovery tracking",
    specialties: ["General Surgery"],
    status: "active",
  },
};
