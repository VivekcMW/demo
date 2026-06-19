import type { TemplateDefinition } from "../templateSchema";

export const NEPHRO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "nephro-consult",
  name: "Nephrology Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Pedal edema, decreased urine output, fatigue, breathlessness" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 1 week, progressive over months" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Onset, progression, urine output trends, edema (location/grade), dyspnea, anorexia, nausea, pruritus, bone pain" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "CKD stage, DM, HTN, recurrent UTI, nephrolithiasis, glomerulonephritis, PKD, AKI episodes" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Vascular access, renal transplant, nephrectomy, dialysis catheter insertion" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Antihypertensives, diuretics, immunosuppressants, ESA, phosphate binders, vitamin D" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "CKD, PKD, ESRD on dialysis, DM, HTN in first-degree relatives" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, NSAID use, herbal remedies, occupation" },
        { key: "dialysisHistory", label: "Dialysis History", type: "textarea", rows: 2, placeholder: "Dialysis vintage, modality (HD/PD), access type, weekly schedule, UF tolerability, Kt/V, access issues" },
        { key: "transplantHistory", label: "Transplant History", type: "textarea", rows: 2, placeholder: "Transplant date, donor type, immunosuppression, rejection episodes, graft function" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "CVS, respiratory, GI, CNS, MSK, skin — uremic symptoms" },
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
            { key: "dryWeight", label: "Dry Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalAppearance", label: "General Appearance", type: "textarea", rows: 1, placeholder: "Pallor, edema (pitting/grade), uremic fetor, skin pigmentation, excoriation, access site" },
        { key: "fluidStatus", label: "Fluid Status Assessment", type: "textarea", rows: 2, placeholder: "JVP, pedal edema, pulmonary crackles, S3 gallop, ascites, BP trends, interdialytic weight gain" },
        {
          key: "accessExam", label: "Vascular Access / PD Catheter Exam", type: "section",
          fields: [
            { key: "type", label: "Access Type", type: "select", options: [{ label: "AVF", value: "AVF" }, { label: "AVG", value: "AVG" }, { label: "Tunneled CVC", value: "TunneledCVC" }, { label: "Non-tunneled CVC", value: "NonTunneledCVC" }, { label: "PD catheter", value: "PDCatheter" }, { label: "None", value: "None" }] },
            { key: "location", label: "Location", type: "text", placeholder: "e.g. Left brachiocephalic AVF, right IJ tunneled CVC" },
            { key: "findings", label: "Findings", type: "textarea", rows: 1, placeholder: "Thrill, bruit, aneurysm, stenosis, infection, tunnel tenderness, exit site erythema" },
          ],
        },
        { key: "CVS", label: "CVS Exam", type: "textarea", rows: 1, placeholder: "JVP, heart sounds, pericardial rub, S3, peripheral edema" },
        { key: "respiratory", label: "Respiratory Exam", type: "textarea", rows: 1, placeholder: "Crackles (fluid overload), pleural effusion" },
        { key: "abdomen", label: "Abdomen", type: "textarea", rows: 1, placeholder: "PD catheter site, ascites, organomegaly, renal graft tenderness" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. CKD Stage 5 on MHD, AKI on CKD, Diabetic nephropathy" },
        { key: "icdCode", label: "ICD-10 Code", type: "text", placeholder: "e.g. N18.5, N17.9" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Complication", value: "Complication" }, { label: "Differential", value: "Differential" }] },
          ],
        },
        { key: "ckdStage", label: "CKD Stage / eGFR", type: "text", placeholder: "e.g. G4 (eGFR 18), G5D (dialysis)" },
        { key: "labTrend", label: "Key Lab Trend", type: "textarea", rows: 2, placeholder: "Creatinine, eGFR, K+, Hb, Ca, PO4, PTH, HCO3, albumin trends" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis of renal status, fluid balance, electrolyte issues" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Dialysis prescription, BP management, diuretics, phosphate binders, ESA, bicarbonate, immunosuppression adjustment" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. KFT, electrolytes, CBC, B12/folate, PTH, ABG, urinalysis, USG KUB" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "frequency", label: "Frequency", type: "select", options: [{ label: "OD", value: "OD" }, { label: "BD", value: "BD" }, { label: "TDS", value: "TDS" }, { label: "HS", value: "HS" }, { label: "Post-HD", value: "PostHD" }] },
          ],
        },
        { key: "dialysisPrescription", label: "Dialysis Prescription", type: "textarea", rows: 2, placeholder: "Modality, frequency, dialyzer, dialysate K/Ca, UF target, anticoagulation, target weight" },
        { key: "fluidPlan", label: "Fluid Plan", type: "textarea", rows: 2, placeholder: "Fluid restriction, interdialytic weight gain target, UF rate, dry weight adjustment" },
        { key: "dietary", label: "Dietary Advice", type: "textarea", rows: 1, placeholder: "Low K, low PO4, low salt, protein restriction" },
        { key: "vaccinations", label: "Vaccination Status", type: "textarea", rows: 1, placeholder: "Hepatitis B, Influenza, Pneumococcal - due/up to date" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Vascular access surgeon, transplant evaluation, dietitian" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 1 week / 1 month / next HD session review" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Nephrology with CKD staging, dialysis, and transplant assessment",
    specialties: ["Nephrology"],
    status: "active",
  },
};


export const NEPHRO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "nephro-followup",
  name: "Nephrology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptoms since last visit — edema, SOB, urine output, fatigue, cramping, access issues" },
        { key: "interdialyticWeightGain", label: "Interdialytic Weight Gain (kg)", type: "number", min: 0, max: 20 },
        { key: "dialysisTolerability", label: "Dialysis Tolerability", type: "textarea", rows: 1, placeholder: "Hypotension, cramping, nausea, access problems, inadequate clearance" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "dryWeight", label: "Dry Weight", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "fluidStatus", label: "Fluid Status", type: "textarea", rows: 1, placeholder: "Edema, JVP, crackles, BP trend" },
        { key: "accessExam", label: "Access Exam", type: "textarea", rows: 1, placeholder: "Thrill, bruit, infection signs, stenosis" },
        { key: "latestLabs", label: "Latest Lab Results", type: "textarea", rows: 2, placeholder: "KFT, K+, Hb, Ca, PO4, PTH, HCO3, albumin" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 3, placeholder: "Disease progression, dialysis adequacy, complications" },
        { key: "dialysisAdequacy", label: "Dialysis Adequacy (Kt/V)", type: "text", placeholder: "e.g. spKt/V 1.4" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "Dose adjustments, ESA, phosphate binders, BP meds" },
        { key: "dialysisModifications", label: "Dialysis Modifications", type: "textarea", rows: 2, placeholder: "Target weight change, HD duration/frequency, dialysate K/Ca adjustment" },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 1, placeholder: "KFT, iron studies, PTH, Vit D, ECHO, access Doppler" },
        { key: "nextVisit", label: "Next Review", type: "text", placeholder: "e.g. 1 week / 1 month" },
      ],
    },
  ],
  metadata: {
    description: "Follow-up note for Nephrology patients with dialysis adequacy tracking and medication review",
    specialties: ["Nephrology"],
    status: "active",
  },
};


export const NEPHRO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "nephro-admission",
  name: "Nephrology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Acute oliguria with breathlessness for 3 days" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — precipitant, UO trend, volume status, electrolyte symptoms, dialysis urgency" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "CKD stage, DM, HTN, GN, PKD, transplant status" },
        { key: "baselineCr", label: "Baseline Creatinine / eGFR", type: "text", placeholder: "e.g. Cr 2.5 (baseline)" },
        { key: "dialysisStatus", label: "Dialysis Status", type: "select", options: [{ label: "Not on dialysis", value: "None" }, { label: "On HD", value: "HD" }, { label: "On PD", value: "PD" }, { label: "Post-transplant", value: "Transplant" }] },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "spo2", label: "SpO₂", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
            { key: "uro", label: "Urine Output (mL/hr)", type: "number", min: 0, max: 1000 },
          ],
        },
        { key: "generalExam", label: "General & Fluid Status", type: "textarea", rows: 2, placeholder: "Pallor, edema, JVP, crackles, ascites, skin" },
        { key: "accessExam", label: "Access Exam", type: "textarea", rows: 1, placeholder: "AVF/AVG thrill, CVC exit site, PD catheter" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "dialysisUrgency", label: "Dialysis Urgency", type: "select", options: [{ label: "Not needed", value: "None" }, { label: "May need in 24-48h", value: "Elective" }, { label: "Needed urgently", value: "Urgent" }, { label: "STAT — life-threatening", value: "STAT" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. KFT, CBC, ECG, ABG, urine R/M, cultures" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Fluid management, electrolyte correction, dialysis plan, medications, BP control" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. ICU (for CRRT), interventional radiology (access), transplant team" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Nephrology — AKI, ESRD complications, electrolyte emergencies",
    specialties: ["Nephrology"],
    status: "active",
  },
};


export const NEPHRO_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "nephro-progress",
  name: "Nephrology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Dyspnea, edema, urine output, nausea, access pain, cramping" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 1, placeholder: "Dialysis session tolerance, hypotension, cramping, access issues" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "uro", label: "UO (mL/hr)", type: "number", min: 0, max: 1000 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "fluidStatus", label: "Fluid Status", type: "textarea", rows: 1, placeholder: "Edema, JVP, crackles, dry weight comparison" },
        { key: "accessExam", label: "Access Exam", type: "textarea", rows: 1 },
        { key: "labsToday", label: "Key Labs Today", type: "text", placeholder: "e.g. K+ 5.8, Cr 4.2, Hb 9.0" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, response to dialysis, electrolyte trends" },
        { key: "dialysisPlan", label: "Dialysis Plan Today", type: "textarea", rows: 2, placeholder: "HD/PD schedule, UF target, dialysate composition, anticoagulation" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", rows: 2, placeholder: "Medication changes, electrolyte management, access management" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Nephrology inpatients with dialysis planning and fluid status tracking",
    specialties: ["Nephrology"],
    status: "active",
  },
};


export const NEPHRO_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "nephro-procedure",
  name: "Nephrology / Dialysis Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Tunneled CVC insertion, AVF creation, PD catheter insertion, renal biopsy" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpAssessment", label: "Pre-Procedure Assessment", type: "textarea", rows: 2, placeholder: "Labs (INR, platelets, Hb), access site USG marking, bleeding risk, allergies" },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. OT, IR suite, ICU bedside" },
        { key: "anesthesia", label: "Anesthesia / Sedation", type: "text", placeholder: "e.g. LA, moderate sedation" },
        { key: "findings", label: "Procedure Findings", type: "textarea", required: true, rows: 4, placeholder: "Detailed description — access vessel, cannulation site, biopsy passes, complications" },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "e.g. Renal biopsy cores for LM, IF, EM" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Bleeding, pneumothorax, hematoma, access failure, arrhythmia" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Hemostasis achieved, vitals stable, post-procedure CXR (for CVC)" },
        { key: "postOpOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "Bed rest, monitoring, analgesia, catheter care, dialysis timing" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Discharged home", value: "Home" }, { label: "Ward", value: "Ward" }, { label: "ICU monitoring", value: "ICU" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "textarea", rows: 1, placeholder: "Access use readiness, suture removal, biopsy results" },
      ],
    },
  ],
  metadata: {
    description: "Structured procedure note for vascular access, PD catheter insertion, renal biopsy, and interventional nephrology procedures",
    specialties: ["Nephrology"],
    status: "active",
  },
};
