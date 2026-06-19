import type { TemplateDefinition } from "../templateSchema";

export const CARDIO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "cardio-consult",
  name: "Cardiology Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Chest pain, breathlessness, palpitations, syncope, pedal edema" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 3 days, 2 months" },
        { key: "chestPain", label: "Chest Pain Details", type: "section", fields: [
          { key: "type", label: "Type", type: "select", options: [{ label: "Typical angina", value: "Typical" }, { label: "Atypical angina", value: "Atypical" }, { label: "Non-cardiac", value: "NonCardiac" }, { label: "None", value: "None" }] },
          { key: "location", label: "Location", type: "text", placeholder: "Retrosternal, left chest, epigastric" },
          { key: "radiation", label: "Radiation", type: "text", placeholder: "Left arm, jaw, back, shoulder" },
          { key: "precipitating", label: "Precipitating Factors", type: "text", placeholder: "Exertion, rest, emotion, cold" },
          { key: "relieving", label: "Relieving Factors", type: "text", placeholder: "Rest, nitrates, analgesia" },
          { key: "severity", label: "Severity (0-10)", type: "number", min: 0, max: 10 },
          { key: "ccsClass", label: "CCS Class (angina)", type: "select", options: [{ label: "Class I — only strenuous activity", value: "I" }, { label: "Class II — slight limitation", value: "II" }, { label: "Class III — marked limitation", value: "III" }, { label: "Class IV — at rest", value: "IV" }] },
        ] },
        { key: "breathlessness", label: "Breathlessness (NYHA)", type: "section", fields: [
          { key: "nyhaClass", label: "NYHA Class", type: "select", options: [{ label: "I — No limitation", value: "I" }, { label: "II — Slight limitation", value: "II" }, { label: "III — Marked limitation", value: "III" }, { label: "IV — Symptoms at rest", value: "IV" }] },
          { key: "orthopnea", label: "Orthopnea", type: "select", options: [{ label: "None", value: "None" }, { label: "1 pillow", value: "1" }, { label: "2 pillows", value: "2" }, { label: "≥3 pillows", value: "3" }] },
          { key: "pnd", label: "Paroxysmal Nocturnal Dyspnea", type: "boolean" },
        ] },
        { key: "palpitations", label: "Palpitations", type: "textarea", rows: 1, placeholder: "Frequency, triggers, associated dizziness/syncope" },
        { key: "syncope", label: "Syncope / Pre-syncope", type: "textarea", rows: 1, placeholder: "Frequency, prodrome, context" },
        { key: "riskFactors", label: "Cardiovascular Risk Factors", type: "multiselect", options: [
          { label: "Hypertension", value: "HTN" }, { label: "Diabetes", value: "DM" },
          { label: "Dyslipidemia", value: "Dyslipidemia" }, { label: "Smoking", value: "Smoking" },
          { label: "Obesity", value: "Obesity" }, { label: "Family history of premature CAD", value: "FamilyCAD" },
          { label: "Sedentary lifestyle", value: "Sedentary" }, { label: "Chronic kidney disease", value: "CKD" },
        ] },
        { key: "pastCardiacHistory", label: "Past Cardiac History", type: "textarea", rows: 2, placeholder: "Prior MI, PCI, CABG, stroke, PAD, heart failure, arrhythmia, valvular disease" },
        { key: "medications", label: "Current Cardiac Medications", type: "textarea", rows: 2, placeholder: "Antiplatelets, statins, beta-blockers, ACEi/ARB, diuretics, anticoagulants, antiarrhythmics" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Constitutional, respiratory, GI, peripheral vascular symptoms" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg) — sitting / standing", type: "text", required: true, placeholder: "e.g. 130/80" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 30, max: 250 },
          { key: "rr", label: "Respiratory Rate", type: "number", min: 8, max: 60 },
          { key: "spo2", label: "SpO₂ (%)", type: "number", min: 50, max: 100 },
          { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
          { key: "weight", label: "Weight (kg)", type: "number", min: 30, max: 250 },
          { key: "bmi", label: "BMI", type: "number", readOnly: true },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Pallor, icterus, cyanosis, clubbing, edema, JVP, radiofemoral delay" },
        { key: "cardiacExam", label: "Cardiovascular Examination", type: "textarea", rows: 3, placeholder: "Precordium: apex, heaves, thrills. Auscultation: S1, S2, S3, S4, murmurs (location, timing, grade, radiation), rubs, bruits" },
        { key: "peripheralVascular", label: "Peripheral Vascular Exam", type: "textarea", rows: 2, placeholder: "Carotid, radial, femoral, dorsalis pedis pulses. Bruits. Ankle-brachial index if indicated" },
        { key: "respiratoryExam", label: "Respiratory Examination", type: "textarea", rows: 2, placeholder: "Chest clear / crackles / wheeze / effusion" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "e.g. I25.1 — Stable angina, I50.9 — Heart failure with reduced EF, I48 — Atrial fibrillation" },
        { key: "icdCode", label: "ICD-10 Code(s)", type: "text" },
        { key: "riskStratification", label: "Risk Stratification", type: "section", fields: [
          { key: "graceScore", label: "GRACE Score (if ACS)", type: "number", placeholder: "Risk ___%" },
          { key: "timiScore", label: "TIMI Score (if ACS)", type: "number", min: 0, max: 7 },
          { key: "chadsVasc", label: "CHA₂DS₂-VASc Score", type: "number", min: 0, max: 9 },
          { key: "hasBled", label: "HAS-BLED Score", type: "number", min: 0, max: 9 },
        ] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "investigations", label: "Investigations", type: "textarea", rows: 3, placeholder: "ECG, ECHO, stress test, Holter, CAG, CBC, RFT, LFT, lipid profile, HbA1c, troponin, BNP/NT-proBNP, coagulation profile" },
        { key: "ecgSummary", label: "ECG Summary", type: "textarea", rows: 2, placeholder: "Rate, rhythm, axis, PR/QRS/QTc, ST changes, T inversion, Q waves, LVH, arrhythmia" },
        { key: "echoSummary", label: "Echocardiography Summary", type: "textarea", rows: 2, placeholder: "EF%, wall motion, valvular lesions, chamber sizes, pericardium" },
        { key: "treatment", label: "Treatment Plan", type: "textarea", rows: 3, placeholder: "Medication changes, lifestyle modification, intervention (PCI/CABG), device therapy" },
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "New/stopped/adjusted meds with doses" },
        { key: "intervention", label: "Planned Intervention", type: "select", options: [{ label: "Medical management only", value: "Medical" }, { label: "Planned PCI", value: "PCI" }, { label: "Planned CABG", value: "CABG" }, { label: "Device (PPM/ICD/CRT)", value: "Device" }, { label: "Valve intervention", value: "Valve" }] },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Review in 2 weeks, ECHO in 3 months, stress test in 6 months" },
        { key: "referrals", label: "Referrals", type: "text", placeholder: "Cardiac rehab, endocrinology, nephrology, cardiothoracic surgery" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive cardiology outpatient consultation with chest pain characterization, risk factor assessment, and management planning",
    specialties: ["Cardiology"],
    status: "active",
  },
};


export const CARDIO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "cardio-followup",
  name: "Cardiology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom control, angina episodes, breathlessness, palpitations, syncope, edema, medication adherence" },
        { key: "symptomStatus", label: "Symptom Status", type: "select", options: [{ label: "Improved", value: "Improved" }, { label: "Stable", value: "Stable" }, { label: "Worsened", value: "Worsened" }] },
        { key: "ccsClass", label: "Current CCS Class (angina)", type: "select", options: [{ label: "I", value: "I" }, { label: "II", value: "II" }, { label: "III", value: "III" }, { label: "IV", value: "IV" }, { label: "No angina", value: "None" }] },
        { key: "nyhaClass", label: "Current NYHA Class", type: "select", options: [{ label: "I", value: "I" }, { label: "II", value: "II" }, { label: "III", value: "III" }, { label: "IV", value: "IV" }] },
        { key: "adverseEffects", label: "Medication Side Effects", type: "textarea", rows: 2, placeholder: "Bleeding, bradycardia, hypotension, cough, edema, rash" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 30, max: 250 },
          { key: "weight", label: "Weight (kg)", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
        ] },
        { key: "exam", label: "Focused CVS Examination", type: "textarea", rows: 2, placeholder: "JVP, edema, heart sounds, murmurs, lung fields" },
        { key: "investigationsToday", label: "Investigations Today", type: "textarea", rows: 2, placeholder: "ECG, ECHO, lab results — summarize key findings" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 2, placeholder: "Clinical status, disease control, concerns" },
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2 },
        { key: "ongoingPlan", label: "Ongoing Plan", type: "textarea", rows: 2, placeholder: "Continue management, scheduled investigations, next intervention" },
        { key: "nextFollowUp", label: "Next Follow-up", type: "text", placeholder: "e.g. 3 months / 6 months / 1 year" },
      ],
    },
  ],
  metadata: {
    description: "Cardiology follow-up with symptom tracking, CCS/NYHA assessment, medication review, and interval management",
    specialties: ["Cardiology"],
    status: "active",
  },
};


export const CARDIO_CHEST_PAIN_TEMPLATE: TemplateDefinition = {
  id: "cardio-chest-pain",
  name: "Chest Pain Evaluation (ED/OPD)",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentation",
      label: "Chest Pain Presentation",
      fields: [
        { key: "onset", label: "Onset", type: "select", required: true, options: [{ label: "Sudden (<1 hr)", value: "Sudden" }, { label: "Gradual (hours-days)", value: "Gradual" }, { label: "Recurrent episodes", value: "Recurrent" }] },
        { key: "duration", label: "Duration", type: "text", required: true, placeholder: "e.g. 30 min, intermittent over 2 days" },
        { key: "location", label: "Location", type: "text", placeholder: "Retrosternal, left precordial, epigastric, right chest" },
        { key: "radiation", label: "Radiation", type: "text", placeholder: "Left arm, neck, jaw, back, right arm" },
        { key: "character", label: "Character", type: "select", options: [{ label: "Pressure/heaviness", value: "Pressure" }, { label: "Stabbing/sharp", value: "Stabbing" }, { label: "Burning", value: "Burning" }, { label: "Aching", value: "Aching" }, { label: "Tearing", value: "Tearing" }] },
        { key: "precipitating", label: "Precipitating Factors", type: "text", placeholder: "Exertion, rest, inspiration, movement, food, stress" },
        { key: "relieving", label: "Relieving Factors", type: "text", placeholder: "Rest, nitrates, antacids, analgesia" },
        { key: "associatedSymptoms", label: "Associated Symptoms", type: "multiselect", options: [
          { label: "Dyspnea", value: "Dyspnea" }, { label: "Nausea/vomiting", value: "Nausea" },
          { label: "Diaphoresis", value: "Diaphoresis" }, { label: "Syncope/near-syncope", value: "Syncope" },
          { label: "Palpitations", value: "Palpitations" }, { label: "Fever/cough", value: "Fever" },
        ] },
        { key: "timingLastEpisode", label: "Time of Last Episode", type: "text", placeholder: "e.g. Still ongoing, resolved 2 hr ago" },
        { key: "nitroglycerinResponse", label: "Response to Nitroglycerin", type: "select", options: [{ label: "Complete relief", value: "Complete" }, { label: "Partial relief", value: "Partial" }, { label: "No relief", value: "None" }, { label: "Not given", value: "NA" }] },
      ],
    },
    {
      key: "riskAssessment",
      label: "Risk Assessment",
      fields: [
        { key: "riskFactors", label: "Cardiac Risk Factors", type: "multiselect", options: [
          { label: "Age >55 (M) / >65 (F)", value: "Age" }, { label: "Smoking", value: "Smoking" },
          { label: "HTN", value: "HTN" }, { label: "DM", value: "DM" },
          { label: "Dyslipidemia", value: "Dyslipidemia" }, { label: "Family history", value: "Family" },
          { label: "Obesity", value: "Obesity" }, { label: "Sedentary", value: "Sedentary" },
        ] },
        { key: "priorCardiacHistory", label: "Prior Cardiac History", type: "text", placeholder: "MI, PCI, CABG, HF, known CAD" },
        { key: "hemodynamics", label: "Hemodynamic Status", type: "select", options: [{ label: "Stable", value: "Stable" }, { label: "Unstable — hypotensive", value: "Unstable" }, { label: "Unstable — tachyarrhythmia", value: "Tachy" }, { label: "Cardiogenic shock", value: "Shock" }] },
      ],
    },
    {
      key: "objective",
      label: "Objective & Investigations",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg) — both arms", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 30, max: 250 },
          { key: "rr", label: "Respiratory Rate", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
        ] },
        { key: "exam", label: "Physical Examination", type: "textarea", rows: 3, placeholder: "CVS, respiratory, abdominal — key positive and relevant negative findings" },
        { key: "ecg", label: "ECG Findings", type: "textarea", required: true, rows: 2, placeholder: "Rate, rhythm, ST elevation/depression, T inversion, Q waves, BBB, arrhythmia, STEMI/NSTEMI criteria" },
        { key: "ecgInterpretation", label: "ECG Interpretation", type: "select", options: [{ label: "Normal", value: "Normal" }, { label: "Non-specific", value: "NonSpecific" }, { label: "Ischemic changes", value: "Ischemic" }, { label: "STEMI", value: "STEMI" }, { label: "Arrhythmia", value: "Arrhythmia" }, { label: "LVH/strain", value: "LVH" }] },
        { key: "troponin", label: "High-sensitivity Troponin (ng/L)", type: "number", placeholder: "0-hr / 3-hr" },
        { key: "chestXray", label: "Chest X-ray Summary", type: "textarea", rows: 1, placeholder: "Cardiomegaly, pulmonary congestion, effusion, widened mediastinum, pneumothorax" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "provisionalDiagnosis", label: "Provisional Diagnosis", type: "text", required: true, placeholder: "e.g. ACS-STEMI / ACS-NSTEMI / Unstable angina / Non-cardiac chest pain" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "disposition", label: "Disposition", type: "select", required: true, options: [{ label: "Home / OPD follow-up", value: "Home" }, { label: "ED Observation", value: "Observation" }, { label: "Admit — Cardiology", value: "Admit" }, { label: "Emergency Cath Lab", value: "CathLab" }, { label: "Refer to higher center", value: "Refer" }] },
        { key: "immediatePlan", label: "Immediate Plan", type: "textarea", required: true, rows: 3, placeholder: "MONA (morphine, O₂, nitrates, aspirin), antiplatelet loading, anticoagulation, beta-blocker, statin, PCI decision..." },
        { key: "timelyPlan", label: "Timely Management", type: "textarea", rows: 2, placeholder: "Serial troponin, repeat ECG, ECHO, stress test/CAG, risk score calculation" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 2, placeholder: "Return if worsening, medication instructions, follow-up timing" },
      ],
    },
  ],
  metadata: {
    description: "Focused chest pain evaluation for ED/OPD with ECG interpretation, troponin, risk stratification, and disposition planning",
    specialties: ["Cardiology", "Emergency Medicine"],
    status: "active",
  },
};


export const CARDIO_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "cardio-procedure",
  name: "Cardiac Procedure Note (Cath Lab)",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Procedure Details",
      fields: [
        { key: "procedureType", label: "Procedure Type", type: "select", required: true, options: [
          { label: "Coronary Angiography", value: "Angiography" },
          { label: "PCI (Percutaneous Coronary Intervention)", value: "PCI" },
          { label: "Primary PCI (STEMI)", value: "PrimaryPCI" },
          { label: "Temporary Pacemaker Insertion", value: "TempPPM" },
          { label: "Permanent Pacemaker Implant", value: "PPM" },
          { label: "ICD Implant", value: "ICD" },
          { label: "CRT-D/P Implant", value: "CRT" },
        ] },
        { key: "date", label: "Date of Procedure", type: "date", required: true },
        { key: "operator", label: "Primary Operator", type: "text", required: true },
        { key: "assistant", label: "Assistant(s)", type: "text" },
        { key: "access", label: "Access Site", type: "select", options: [{ label: "Right radial", value: "RRadial" }, { label: "Left radial", value: "LRadial" }, { label: "Right femoral", value: "RFemoral" }, { label: "Left femoral", value: "LFemoral" }, { label: "Brachial", value: "Brachial" }] },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "preOpMedications", label: "Pre-op Medications", type: "textarea", rows: 1, placeholder: "DAPT loading, heparin, sedation" },
      ],
    },
    {
      key: "angiography",
      label: "Angiography Findings",
      fields: [
        { key: "lms", label: "Left Main Stem", type: "text", placeholder: "e.g. Normal, 50% distal stenosis" },
        { key: "lad", label: "LAD", type: "text", placeholder: "e.g. Proximal 70% stenosis" },
        { key: "lcx", label: "LCx", type: "text", placeholder: "e.g. OM1 80% stenosis" },
        { key: "rca", label: "RCA", type: "text", placeholder: "e.g. Proximal 90% stenosis" },
        { key: "dominance", label: "Dominance", type: "select", options: [{ label: "Right dominant", value: "Right" }, { label: "Left dominant", value: "Left" }, { label: "Co-dominant", value: "Co" }] },
        { key: "significantLesions", label: "Significant Lesions Summary", type: "textarea", rows: 2, placeholder: "e.g. Single vessel disease — LAD, Syntax score ___" },
      ],
    },
    {
      key: "intervention",
      label: "Intervention Details",
      fields: [
        { key: "vesselTreated", label: "Vessel(s) Treated", type: "text", placeholder: "e.g. LAD, LCx" },
        { key: "stentType", label: "Stent Type", type: "select", options: [{ label: "DES — Drug Eluting", value: "DES" }, { label: "BMS — Bare Metal", value: "BMS" }, { label: "Drug-coated balloon", value: "DCB" }] },
        { key: "stentDetails", label: "Stent(s) Deployed", type: "repeating", fields: [
          { key: "vessel", label: "Vessel", type: "text" },
          { key: "size", label: "Stent Size (mm)", type: "text", placeholder: "e.g. 3.5x28" },
          { key: "deploymentPressure", label: "Deployment Pressure (atm)", type: "number", min: 0, max: 30 },
          { key: "postDilatation", label: "Post-dilatation", type: "boolean" },
        ] },
        { key: "procedureSuccess", label: "Procedural Success", type: "select", options: [{ label: "Successful — TIMI 3 flow", value: "Success" }, { label: "Partial — TIMI 2 flow", value: "Partial" }, { label: "Unsuccessful", value: "Unsuccessful" }] },
        { key: "contrastVolume", label: "Contrast Volume (mL)", type: "number", min: 0, max: 500 },
        { key: "fluoroscopyTime", label: "Fluoroscopy Time (min)", type: "number" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Dissection, perforation, no-reflow, hematoma, bleeding, arrhythmia, contrast reaction" },
      ],
    },
    {
      key: "postOp",
      label: "Post-Procedure Plan",
      fields: [
        { key: "hemostasis", label: "Hemostasis Method", type: "select", options: [{ label: "TR band", value: "TRBand" }, { label: "Manual compression", value: "Manual" }, { label: "Closure device", value: "Closure" }] },
        { key: "postOpMedications", label: "Post-op Medications", type: "textarea", rows: 2, placeholder: "DAPT (aspirin + ticagrelor/clopidogrel/prasugrel), statin, BB, ACEi" },
        { key: "daptDuration", label: "DAPT Duration", type: "select", options: [{ label: "3 months", value: "3mo" }, { label: "6 months", value: "6mo" }, { label: "12 months", value: "12mo" }, { label: "Lifelong", value: "Lifelong" }] },
        { key: "monitoring", label: "Monitoring Plan", type: "textarea", rows: 1, placeholder: "ECG post-procedure, vitals, access site check" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Cardiologist review in 2 weeks, cardiac rehab referral" },
      ],
    },
  ],
  metadata: {
    description: "Structured cath lab procedure note for coronary angiography, PCI, primary PCI, and device implantation with detailed lesion and stent tracking",
    specialties: ["Cardiology"],
    status: "active",
  },
};


export const CARDIO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "cardio-admission",
  name: "Cardiology IPD Admission",
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
        { key: "source", label: "Source", type: "select", options: [{ label: "OPD", value: "OPD" }, { label: "Emergency", value: "Emergency" }, { label: "Transfer from other unit", value: "Transfer" }, { label: "Post-cath lab", value: "CathLab" }] },
        { key: "ward", label: "Ward / Unit", type: "select", options: [{ label: "Cardiology Ward", value: "Ward" }, { label: "CCU", value: "CCU" }, { label: "ICU", value: "ICU" }] },
        { key: "admissionReason", label: "Reason for Admission", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "history",
      label: "History",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Complete history including symptom progression, prior evaluation, treatment received" },
        { key: "pastCardiacHistory", label: "Past Cardiac History", type: "textarea", rows: 2, placeholder: "MI, PCI, CABG, HF, arrhythmia, valvular disease, device" },
        { key: "nonCardiacHistory", label: "Non-cardiac History", type: "textarea", rows: 2, placeholder: "HTN, DM, dyslipidemia, CKD, COPD, stroke, PAD" },
        { key: "medications", label: "Medications on Admission", type: "textarea", rows: 2, placeholder: "All medications with doses" },
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
          { key: "rr", label: "Respiratory Rate", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "JVP, edema, pallor, cyanosis, clubbing" },
        { key: "cardiacExam", label: "Cardiovascular Examination", type: "textarea", rows: 3, placeholder: "Precordium, heart sounds, murmurs, rubs, S3/S4" },
        { key: "otherSystems", label: "Other Systems", type: "textarea", rows: 2, placeholder: "Respiratory, abdominal, peripheral vascular" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "severity", label: "Severity / Risk", type: "select", options: [{ label: "Low risk", value: "Low" }, { label: "Intermediate", value: "Intermediate" }, { label: "High risk", value: "High" }, { label: "Critical", value: "Critical" }] },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Medications, monitoring, interventions, consults" },
        { key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
          { key: "order", label: "Order", type: "text", placeholder: "e.g. ECG, ECHO, Troponin, BMP" },
          { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
        ] },
      ],
    },
  ],
  metadata: {
    description: "Structured cardiology admission note for CCU/ward with cardiac history, CVS exam, and risk-stratified plan",
    specialties: ["Cardiology"],
    status: "active",
  },
};


export const CARDIO_DISCHARGE_TEMPLATE: TemplateDefinition = {
  id: "cardio-discharge",
  name: "Cardiology Discharge Summary",
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
        { key: "modeOfDischarge", label: "Mode of Discharge", type: "select", options: [{ label: "Improved", value: "Improved" }, { label: "Recovered", value: "Recovered" }, { label: "LAMA", value: "LAMA" }, { label: "Referred/Transferred", value: "Referred" }, { label: "Expired", value: "Expired" }] },
      ],
    },
    {
      key: "clinicalSummary",
      label: "Clinical Summary",
      fields: [
        { key: "diagnosisAtAdmission", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "diagnosisAtDischarge", label: "Diagnosis at Discharge", type: "textarea", required: true, rows: 2 },
        { key: "icdCodes", label: "ICD-10 Codes", type: "text" },
        { key: "hospitalCourse", label: "Hospital Course", type: "textarea", required: true, rows: 4, placeholder: "Summary of stay, key events, procedures, complications, response" },
        { key: "proceduresDuringStay", label: "Procedures During Stay", type: "textarea", rows: 2, placeholder: "CAG, PCI, device implant, ECHO, stress test" },
        { key: "keyInvestigationResults", label: "Key Investigation Results", type: "textarea", rows: 2, placeholder: "Troponin peak, EF%, ECG changes, angiogram summary" },
      ],
    },
    {
      key: "dischargePlan",
      label: "Discharge Plan",
      fields: [
        { key: "medications", label: "Medications at Discharge", type: "textarea", required: true, rows: 3, placeholder: "Drug, dose, frequency, duration — include DAPT if post-PCI, anticoagulation if indicated" },
        { key: "dietActivity", label: "Diet & Activity", type: "textarea", rows: 2, placeholder: "Cardiac diet, graded activity, cardiac rehab referral, smoking cessation" },
        { key: "followUp", label: "Follow-up Instructions", type: "textarea", required: true, rows: 2, placeholder: "Cardiology OPD, when, which doctor, what to monitor" },
        { key: "warningSigns", label: "Warning Signs (return to hospital)", type: "textarea", rows: 2, placeholder: "Chest pain, breathlessness, palpitations, syncope, bleeding (if on DAPT/anticoagulation)" },
        { key: "riskFactorModification", label: "Risk Factor Modification Goals", type: "textarea", rows: 2, placeholder: "BP target <130/80, LDL target <70, HbA1c <7, smoking cessation, weight management" },
        { key: "referrals", label: "Referrals", type: "text", placeholder: "Cardiac rehab, endocrinology, dietetics, physiotherapy" },
      ],
    },
  ],
  metadata: {
    description: "Cardiology discharge summary with procedure tracking, medication reconciliation, and risk factor goals",
    specialties: ["Cardiology"],
    status: "active",
  },
};
