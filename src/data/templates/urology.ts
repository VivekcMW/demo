import type { TemplateDefinition } from "../templateSchema";

export const UROLOGY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "urology-consult",
  name: "Urology Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Difficulty urinating, hematuria, flank pain, scrotal swelling, UTIs" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 weeks, progressive over months" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Urinary symptoms (frequency, urgency, hesitancy, straining, intermittency, incomplete emptying, dysuria), hematuria (visible/microscopic, clots), flank/loin pain (radiation, severity, relation to voiding), scrotal pain/swelling, UTI history, stone passage, incontinence (stress/urge/mixed), nocturia" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "BPH, nephrolithiasis, UTIs, prostatitis, STD, DM, HTN, CKD" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "TURP, cystoscopy, nephrectomy, PCNL, URS, prostatectomy, orchiectomy, penile surgery" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Alpha-blockers, 5-ARI, anticholinergics, phosphodiesterase inhibitors, anticoagulants, antibiotics" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Prostate cancer, renal stones, BPH, kidney cancer in first-degree relatives" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, fluid intake, occupation (sedentary/active)" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "Constitutional, CVS, respiratory, MSK, sexual history (if relevant)" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
            { key: "temp", label: "Temp (°C)", type: "number", min: 30, max: 45 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalAppearance", label: "General Exam", type: "textarea", rows: 1, placeholder: "Pallor, edema, suprapubic distension, loin tenderness" },
        {
          key: "urologicalExam", label: "Urological Examination", type: "section",
          fields: [
            { key: "renalAngle", label: "Renal Angle / Flank", type: "text", placeholder: "CVA tenderness, masses, scars" },
            { key: "suprapubic", label: "Suprapubic", type: "text", placeholder: "Distension, tenderness, palpable mass" },
            { key: "externalGenitalia", label: "External Genitalia", type: "text", placeholder: "Penis (lesions, discharge), testes (size, masses, tenderness), spermatic cord, varicocele, hernia" },
            { key: "dre", label: "Digital Rectal Exam (DRE)", type: "text", placeholder: "Prostate size (grade), consistency, nodules, tenderness, sphincter tone" },
          ],
        },
        { key: "abdomen", label: "Abdomen", type: "textarea", rows: 1, placeholder: "Palpable bladder, renal masses, tenderness, scars" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. BPH with LUTS, Left ureteric calculus, Prostate cancer, Recurrent UTI" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Complication", value: "Complication" }] },
          ],
        },
        { key: "ipssScore", label: "IPSS / Stone Size / PSA", type: "text", placeholder: "e.g. IPSS 18 (moderate)" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis of urological history, exam, and investigation findings" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Medical (alpha-blockers, 5-ARI, antibiotics), surgical plan, stone management (MET vs intervention)" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. Urine R/M, urine C/S, KFT, PSA, USG KUB, CT KUB, Uroflow, cystoscopy" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "frequency", label: "Frequency", type: "select", options: [{ label: "OD", value: "OD" }, { label: "BD", value: "BD" }, { label: "HS", value: "HS" }, { label: "PRN", value: "PRN" }] },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "lifestyle", label: "Lifestyle Advice", type: "textarea", rows: 1, placeholder: "Fluid intake ≥2L/day, salt restriction, timed voiding, pelvic floor exercises" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Nephrology (if CKD), oncology (if GU malignancy), urodynamics" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks / 1 month / after stone passage" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Urology with prostate, stone, and LUTS assessment",
    specialties: ["Urology"],
    status: "active",
  },
};


export const UROLOGY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "urology-followup",
  name: "Urology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes — LUTS improvement, hematuria recurrence, pain, UTI episodes, medication tolerance" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 1, placeholder: "Orthostatic hypotension (alpha-blockers), decreased libido (5-ARI), dry mouth (anticholinergics)" },
        { key: "stonePassage", label: "Stone Passage / Stent Tolerance", type: "textarea", rows: 1, placeholder: "Any stones passed, stent discomfort, hematuria" },
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
          ],
        },
        { key: "exam", label: "Focused Urological Exam", type: "textarea", rows: 1, placeholder: "Prostate size (DRE), flank tenderness, suprapubic" },
        { key: "latestLabs", label: "Latest Investigations", type: "text", placeholder: "e.g. PSA trend, urine culture, KFT, imaging results" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 3, placeholder: "Symptom control, disease progression, treatment response" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2 },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 1, placeholder: "PSA, KFT, urine C/S, USG, Uroflow, cystoscopy" },
        { key: "surgeryPlan", label: "Surgery / Procedure Plan", type: "textarea", rows: 1, placeholder: "e.g. TURP scheduled, URS in 2 weeks, stent removal" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 month / 3 months / 6 months" },
      ],
    },
  ],
  metadata: {
    description: "Follow-up note for Urology patients with LUTS, stone disease, and post-procedural tracking",
    specialties: ["Urology"],
    status: "active",
  },
};


export const UROLOGY_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "urology-admission",
  name: "Urology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Acute urinary retention, renal colic with fever, gross hematuria with clots" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative of the acute urological presentation" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "BPH, stones, UTIs, GU malignancy, DM, HTN, CKD" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2 },
        { key: "urologicalHistory", label: "Urological History", type: "textarea", rows: 2, placeholder: "Prior surgeries, stones, UTIs, catheter use, stents" },
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
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
            { key: "uro", label: "Urine Output (mL/hr)", type: "number", min: 0, max: 1000 },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "CVA tenderness, suprapubic distension, catheter in situ, drainage color" },
        { key: "urologicalExam", label: "Urological Exam", type: "textarea", rows: 2, placeholder: "DRE findings, external genitalia, flank/scrotal exam" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. KFT, CBC, urine C/S, USG KUB, CT scan, catheter care" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Catheterization, antibiotics, IV fluids, analgesia, surgical planning (PCNL, URS, TURP, cystoscopy)" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Nephrology, interventional radiology, oncology" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Urology — retention, renal colic, hematuria, sepsis of urological origin",
    specialties: ["Urology"],
    status: "active",
  },
};


export const UROLOGY_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "urology-progress",
  name: "Urology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Pain, urine output, hematuria, fever, catheter/stent tolerance" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 1, placeholder: "Catheter issues, stone passage, bleeding" },
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
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
            { key: "uro", label: "UO (mL/hr)", type: "number", min: 0, max: 1000 },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 1, placeholder: "Catheter output (color, clots), flank tenderness, wound/incision" },
        { key: "labs", label: "Key Labs", type: "text", placeholder: "e.g. KFT, Hb, WBC, urine culture result" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, post-op recovery, infection control" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", rows: 2, placeholder: "Catheter plan (trial without catheter), drain removal, antibiotics, surgical plan" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Urology inpatients with urinary output and post-operative recovery tracking",
    specialties: ["Urology"],
    status: "active",
  },
};


export const UROLOGY_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "urology-procedure",
  name: "Urology Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. TURP, TURBT, URS, PCNL, Cystoscopy, Orchiectomy, Nephrectomy (partial/radical), Prostatectomy (RALP/open)" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpPrep", label: "Pre-Procedure Preparation", type: "textarea", rows: 2, placeholder: "Antibiotic prophylaxis, anticoagulant management, bowel prep (if needed), imaging reviewed" },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. OT, cystoscopy suite" },
        { key: "surgeon", label: "Surgeon / Assistant", type: "text" },
        { key: "anesthesia", label: "Anesthesia", type: "text", placeholder: "e.g. GA, Spinal, LA" },
        { key: "findings", label: "Findings", type: "textarea", required: true, rows: 4, placeholder: "Detailed intra-operative findings — anatomy, pathology (tumor size, stone burden, prostate volume), blood loss, unexpected findings" },
        { key: "procedureDetails", label: "Procedure Details", type: "textarea", rows: 3, placeholder: "Step-by-step description of the procedure, instruments used, resection time, stent placement, catheter size, drain placement" },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "e.g. Prostate chips, bladder tumor, renal mass, ureteric stone" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Bleeding, capsular perforation, obturator reflex, ureteric injury, perforation, conversion to open" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Hemodynamics stable, catheter draining, drain output" },
        { key: "postOpOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "CBI (continuous bladder irrigation), antibiotics, analgesia, diet, mobilization, catheter care" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Ward", value: "Ward" }, { label: "ICU/HDU monitoring", value: "ICU" }, { label: "Daycare discharge", value: "Daycare" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "textarea", rows: 1, placeholder: "Catheter removal date, stent removal, histopathology follow-up, next review" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive operative/procedure note for urological surgeries — TURP, TURBT, URS, PCNL, cystoscopy, nephrectomy, prostatectomy",
    specialties: ["Urology"],
    status: "active",
  },
};
