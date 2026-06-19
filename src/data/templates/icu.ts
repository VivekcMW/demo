import type { TemplateDefinition } from "../templateSchema";

export const ICU_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "icu-admission",
  name: "ICU Admission Note",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "admissionDetails",
      label: "Admission Details",
      fields: [
        { key: "admissionDateTime", label: "Date & Time of ICU Admission", type: "date", required: true },
        { key: "source", label: "Source", type: "select", options: [{ label: "ED", value: "ED" }, { label: "OR / PACU", value: "OR" }, { label: "Ward transfer", value: "Ward" }, { label: "Transfer from other hospital", value: "Transfer" }, { label: "Direct admission", value: "Direct" }] },
        { key: "admittingDiagnosis", label: "Diagnosis Requiring ICU", type: "textarea", required: true, rows: 2 },
        { key: "icuType", label: "ICU Type", type: "select", options: [{ label: "MICU", value: "MICU" }, { label: "SICU", value: "SICU" }, { label: "CCU", value: "CCU" }, { label: "PICU", value: "PICU" }, { label: "NICU", value: "NICU" }] },
        { key: "attendingIntensivist", label: "Attending Intensivist", type: "text", required: true },
      ],
    },
    {
      key: "clinicalStatus",
      label: "Clinical Status on Admission",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Complete history leading to ICU admission" },
        { key: "pastHistory", label: "Past Medical History", type: "textarea", rows: 2 },
        { key: "medications", label: "Medications on Admission", type: "textarea", rows: 2 },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
      ],
    },
    {
      key: "examination",
      label: "Examination & Monitoring",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "map", label: "MAP (mmHg)", type: "number", min: 0, max: 200 },
          { key: "pulse", label: "Heart Rate (bpm)", type: "number", min: 0, max: 300 },
          { key: "rr", label: "Respiratory Rate", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
          { key: "gcs", label: "GCS", type: "text" },
        ] },
        { key: "ventilator", label: "Ventilator Settings", type: "section", fields: [
          { key: "mode", label: "Mode", type: "text", placeholder: "e.g. SIMV-PC, CPAP, BiPAP" },
          { key: "fio2", label: "FiO₂ (%)", type: "number", min: 21, max: 100 },
          { key: "peep", label: "PEEP (cmH₂O)", type: "number", min: 0, max: 30 },
          { key: "vt", label: "Tidal Volume (mL)", type: "number", min: 0, max: 1000 },
          { key: "rrSet", label: "Set RR", type: "number", min: 0, max: 40 },
        ] },
        { key: "linesTubes", label: "Lines & Tubes", type: "textarea", rows: 2, placeholder: "Central line, arterial line, chest tube, drain, Foley, OG/NG" },
        { key: "systemsExam", label: "Systems Examination", type: "textarea", rows: 3, placeholder: "CVS, respiratory, abdomen, CNS — key findings" },
      ],
    },
    {
      key: "investigationsScoring",
      label: "Investigations & Scoring",
      fields: [
        { key: "abg", label: "Arterial Blood Gas (key values)", type: "textarea", rows: 1, placeholder: "pH, pCO₂, pO₂, HCO₃, lactate, base excess" },
        { key: "keyLabs", label: "Key Lab Results", type: "textarea", rows: 2, placeholder: "CBC, chemistry, cultures, coagulation" },
        { key: "imaging", label: "Imaging", type: "textarea", rows: 1, placeholder: "CXR, CT, USG — relevant findings" },
        { key: "apacheScore", label: "APACHE II / APACHE IV Score", type: "number", min: 0, max: 71 },
        { key: "sofaScore", label: "SOFA Score", type: "number", min: 0, max: 24 },
      ],
    },
    {
      key: "plan",
      label: "ICU Plan",
      fields: [
        { key: "problemList", label: "Problem List", type: "textarea", rows: 2, placeholder: "Numbered list of active problems" },
        { key: "ventilatorPlan", label: "Ventilator Plan", type: "textarea", rows: 2, placeholder: "Weaning, settings changes, extubation readiness" },
        { key: "medicationPlan", label: "Medication Plan", type: "textarea", rows: 2, placeholder: "Vasopressors, sedation, antibiotics, anticoagulation" },
        { key: "fluidPlan", label: "Fluid & Electrolyte Plan", type: "textarea", rows: 1 },
        { key: "consults", label: "Consults", type: "text", placeholder: "Specialty consults needed" },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }, { label: "Comfort Care", value: "Comfort" }, { label: "Not discussed", value: "NotDiscussed" }] },
        { key: "admissionOrders", label: "ICU Admission Orders", type: "repeating", fields: [
          { key: "order", label: "Order", type: "text", placeholder: "e.g. ABG 4 hrly, BMP Q6H" },
          { key: "priority", label: "Priority", type: "select", options: [{ label: "STAT", value: "STAT" }, { label: "Urgent", value: "Urgent" }, { label: "Routine", value: "Routine" }] },
        ] },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive ICU admission note with ventilator settings, monitoring, severity scoring (APACHE/SOFA), and problem-based plan",
    specialties: ["Critical Care"],
    status: "active",
  },
};


export const ICU_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "icu-progress",
  name: "ICU Daily Progress / Round Note",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "header",
      label: "Round Header",
      fields: [
        { key: "date", label: "Date", type: "date", required: true },
        { key: "icuDay", label: "ICU Day", type: "number", min: 1, required: true },
        { key: "shift", label: "Shift", type: "select", options: [{ label: "Morning", value: "Morning" }, { label: "Evening", value: "Evening" }, { label: "Night", value: "Night" }] },
      ],
    },
    {
      key: "subjective",
      label: "Subjective / Events",
      fields: [
        { key: "events", label: "Events Since Last Round", type: "textarea", rows: 3, placeholder: "Arrhythmias, desaturations, hypotension, suctioning, procedures, arrests, code events" },
        { key: "sedation", label: "Sedation Status (RASS)", type: "number", min: -5, max: 4 },
        { key: "painScore", label: "Pain Score (0-10 / CPOT)", type: "number", min: 0, max: 10 },
        { key: "delirium", label: "Delirium (CAM-ICU)", type: "select", options: [{ label: "Negative", value: "Neg" }, { label: "Positive", value: "Pos" }, { label: "Unable to assess", value: "NA" }] },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals (24hr trend)", type: "section", fields: [
          { key: "bpRange", label: "BP Range (min-max)", type: "text", placeholder: "e.g. 90/60 - 130/80" },
          { key: "mapAvg", label: "MAP Average", type: "number", min: 0, max: 150 },
          { key: "hrRange", label: "HR Range (min-max)", type: "text" },
          { key: "spo2Avg", label: "SpO₂ Average", type: "number", min: 50, max: 100 },
          { key: "tempRange", label: "Temp Range (°C)", type: "text" },
        ] },
        { key: "ventilator", label: "Ventilator Settings", type: "section", fields: [
          { key: "mode", label: "Current Mode", type: "text" },
          { key: "fio2", label: "FiO₂", type: "number", min: 21, max: 100 },
          { key: "peep", label: "PEEP", type: "number", min: 0, max: 30 },
          { key: "pao2Fio2", label: "PaO₂/FiO₂ Ratio", type: "number", placeholder: "e.g. 250" },
          { key: "plateauPressure", label: "Plateau Pressure (cmH₂O)", type: "number", min: 0, max: 50 },
        ] },
        { key: "fluidBalance", label: "Fluid Balance (24hr)", type: "text", placeholder: "Input: ___ mL, Output: ___ mL, Net: ___ mL" },
        { key: "vasopressors", label: "Vasopressors / Inotropes", type: "textarea", rows: 1, placeholder: "Drug and current dose/rate" },
        { key: "sedationAnalgesia", label: "Sedation & Analgesia", type: "textarea", rows: 1, placeholder: "Drugs and current infusion rates" },
        { key: "systemsExam", label: "Systems Exam", type: "textarea", rows: 2, placeholder: "Key findings per system" },
        { key: "abg", label: "Latest ABG", type: "textarea", rows: 1, placeholder: "pH/pCO₂/pO₂/HCO₃/lactate/BE" },
        { key: "keyLabs", label: "Key Labs Today", type: "textarea", rows: 1, placeholder: "Trending values, cultures, imaging" },
      ],
    },
    {
      key: "plan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Overall Assessment", type: "textarea", required: true, rows: 2, placeholder: "Summary of clinical status, trajectory, concerns" },
        { key: "plan", label: "Today's Plan", type: "textarea", required: true, rows: 3, placeholder: "Problem-based plan: ventilator, hemodynamics, sedation, infection, fluids, nutrition, mobility, family update" },
        { key: "dischargeReadiness", label: "ICU Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Considering step-down", value: "Considering" }, { label: "Ready today", value: "Ready" }] },
        { key: "familyUpdate", label: "Family Update Given", type: "boolean" },
      ],
    },
  ],
  metadata: {
    description: "Daily ICU round note with ventilator settings, vasopressors, sedation, fluid balance, ABG, and problem-based plan",
    specialties: ["Critical Care"],
    status: "active",
  },
};


export const ICU_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "icu-procedure",
  name: "ICU Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Procedure Details",
      fields: [
        { key: "procedureName", label: "Procedure", type: "select", required: true, options: [
          { label: "Central line insertion (IJV/SC/Femoral)", value: "CVC" },
          { label: "Arterial line insertion", value: "Aline" },
          { label: "Endotracheal intubation", value: "ETT" },
          { label: "Percutaneous tracheostomy", value: "Tracheostomy" },
          { label: "Chest tube insertion", value: "ChestTube" },
          { label: "Paracentesis", value: "Paracentesis" },
          { label: "Thoracentesis", value: "Thoracentesis" },
          { label: "Bronchoscopy", value: "Bronchoscopy" },
        ] },
        { key: "date", label: "Date & Time", type: "date", required: true },
        { key: "operator", label: "Operator", type: "text", required: true },
        { key: "assistant", label: "Assistant", type: "text" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consent", label: "Consent Obtained", type: "boolean" },
        { key: "sterileTechnique", label: "Sterile Technique", type: "boolean" },
        { key: "ultrasoundGuided", label: "USG-guided", type: "boolean" },
      ],
    },
    {
      key: "details",
      label: "Procedure Details",
      fields: [
        { key: "site", label: "Site / Approach", type: "text", placeholder: "e.g. Right IJV, Left radial, Orotracheal" },
        { key: "prepDrape", label: "Prep & Drape", type: "text", placeholder: "e.g. Chlorhexidine, full drape" },
        { key: "localAnesthesia", label: "Local Anesthesia", type: "text", placeholder: "e.g. 2% lidocaine 5 mL" },
        { key: "approach", label: "Approach / Technique", type: "textarea", rows: 2, placeholder: "Key steps of procedure" },
        { key: "findings", label: "Findings", type: "textarea", rows: 2, placeholder: "e.g. Free-flowing blood, air aspirated, clear fluid" },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "e.g. Blood cultures, fluid for analysis" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "None / bleeding, pneumothorax, arrhythmia, etc." },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "postProcedureOrders", label: "Post-procedure Orders", type: "textarea", rows: 2, placeholder: "CXR (for CVC/ETT/chest tube), dressing, monitoring" },
        { key: "confirmation", label: "Confirmation", type: "text", placeholder: "e.g. CXR tip at carina, waveform, aspiration, USG" },
      ],
    },
  ],
  metadata: {
    description: "Bedside ICU procedure note for central line, arterial line, intubation, chest tube, and other critical care procedures",
    specialties: ["Critical Care"],
    status: "active",
  },
};


export const ICU_DISCHARGE_TEMPLATE: TemplateDefinition = {
  id: "icu-discharge",
  name: "ICU Discharge / Step-down Summary",
  type: "Discharge",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "dischargeHeader",
      label: "ICU Discharge Summary",
      fields: [
        { key: "icuAdmissionDate", label: "ICU Admission Date", type: "date", required: true },
        { key: "icuDischargeDate", label: "ICU Discharge Date", type: "date", required: true },
        { key: "attendingIntensivist", label: "Attending Intensivist", type: "text" },
        { key: "acceptingTeam", label: "Accepting Team / Unit", type: "text", required: true, placeholder: "e.g. General Medicine, Cardiology, Surgery Ward" },
        { key: "diagnosisAtICUAdmission", label: "Diagnosis at ICU Admission", type: "textarea", required: true, rows: 2 },
        { key: "diagnosisAtICUDiscahrge", label: "Diagnosis at ICU Discharge", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "icuCourse",
      label: "ICU Course Summary",
      fields: [
        { key: "icuStaySummary", label: "Summary of ICU Stay", type: "textarea", required: true, rows: 4, placeholder: "Key events, procedures, complications, response to therapy" },
        { key: "proceduresDuringICU", label: "Procedures During ICU Stay", type: "textarea", rows: 2, placeholder: "Central line, intubation, dialysis, chest tube" },
        { key: "ventilatorDays", label: "Ventilator Days", type: "number", min: 0 },
        { key: "vasopressorDays", label: "Vasopressor Days", type: "number", min: 0 },
        { key: "rrtDays", label: "RRT / Dialysis Days", type: "number", min: 0 },
        { key: "keyInvestigationResults", label: "Key Investigation Results", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "dischargePlan",
      label: "Step-down Plan",
      fields: [
        { key: "currentStatus", label: "Current Clinical Status", type: "textarea", rows: 2, placeholder: "Hemodynamically stable, extubated, off vasopressors, neurologically intact" },
        { key: "activeProblems", label: "Active Problems", type: "textarea", rows: 2, placeholder: "Problems requiring ongoing management" },
        { key: "medications", label: "Medications (ongoing)", type: "textarea", rows: 2 },
        { key: "pendingInvestigations", label: "Pending Investigations / Consults", type: "textarea", rows: 2 },
        { key: "monitoringPlan", label: "Monitoring Plan on Ward", type: "textarea", rows: 2, placeholder: "Vitals frequency, O₂ requirement, fluid balance, neuro checks" },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }, { label: "Comfort Care", value: "Comfort" }] },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Intensivist review in 24 hr, OPD in 1 week" },
      ],
    },
  ],
  metadata: {
    description: "ICU discharge / step-down summary with ventilator and vasopressor days, active problems, and monitoring plan for ward",
    specialties: ["Critical Care"],
    status: "active",
  },
};
