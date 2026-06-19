import type { TemplateDefinition } from "../templateSchema";

export const PAED_NEPHRO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "paed-nephro-consult",
  name: "Pediatric Nephrology Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Pedal edema, oliguria, hematuria, proteinuria, recurrent UTIs, hypertension, enuresis, failure to thrive" },
        { key: "age", label: "Age", type: "text", required: true, placeholder: "e.g. 4 years, 10 years" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 1 week, recurrent over months" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Edema (onset, distribution, progression), urine output (oliguria/anuria/polyuria), hematuria (color, duration, relation to infection), proteinuria (foamy urine), hypertension symptoms (headache, visual changes), fever, dysuria, frequency, abdominal/flank pain, growth failure" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Prior nephrotic syndrome, glomerulonephritis, UTI history (imaging, VCUG), renal biopsy, congenital anomalies of kidney/urinary tract (CAKUT), prior AKI, hypertension" },
        { key: "birthHistory", label: "Birth / Antenatal History", type: "textarea", rows: 2, placeholder: "Antenatal USG (hydronephrosis, renal cysts, oligohydramnios), preterm/BW, NICU stay, congenital anomalies" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Steroids, immunosuppressants, ACE inhibitors, diuretics, antibiotics, antihypertensives, vitamin D" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "immunizationStatus", label: "Immunization Status", type: "text", placeholder: "Up to date / delayed — pneumococcal, influenza, varicella (consider for immunosuppressed)" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "CKD, nephrotic syndrome, PKD, Alport syndrome, UTI, hypertension, DM, consanguinity" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "CVS (hypertension, fluid overload), respiratory (pulmonary edema), GI (anorexia, ascites), CNS (hypertensive encephalopathy, uremic symptoms)" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP (mmHg) — 90th centile for age/height?", type: "text", required: true, placeholder: "e.g. 125/85 (>=95th centile for age/height)" },
            { key: "pulse", label: "HR (bpm)", type: "number", min: 40, max: 220 },
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "spo2", label: "SpO2 (%)", type: "number" },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
            { key: "height", label: "Height (cm)", type: "number" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
            { key: "heightCentile", label: "Height Centile", type: "text" },
            { key: "bmiCentile", label: "BMI Centile", type: "text" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Edema (periorbital, pedal, sacral, ascites — grade), pallor, growth parameters, BP centile" },
        { key: "fluidStatus", label: "Fluid Status Assessment", type: "textarea", rows: 2, placeholder: "JVP, pulmonary crackles, S3 gallop, ascites, pedal edema, BP trends, weight change, urine output" },
        { key: "cvsExam", label: "CVS Exam", type: "textarea", rows: 1, placeholder: "Hypertensive changes, JVP, precordial findings" },
        { key: "abdomen", label: "Abdomen", type: "textarea", rows: 1, placeholder: "Palpable kidneys, ascites, organomegaly, bladder distension, renal graft tenderness (if post-transplant)" },
        { key: "genitalExam", label: "Genital / Urinary Exam", type: "textarea", rows: 1, placeholder: "External genitalia (ambiguous, hypospadias), VCUG scars, urethral meatus" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Nephrotic syndrome (first episode / relapse), Acute glomerulonephritis, Congenital anomaly of kidney/urinary tract, Hypertensive nephropathy, Recurrent UTI, Enuresis" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Complication", value: "Complication" }, { label: "Differential", value: "Differential" }] },
          ],
        },
        { key: "ckdStage", label: "CKD Stage / eGFR (Bedside Schwartz)", type: "text", placeholder: "e.g. CKD Stage 2 (eGFR 72), Nephrotic syndrome remission/relapse" },
        { key: "urinalysis", label: "Urinalysis Summary", type: "textarea", rows: 2, placeholder: "Dipstick: protein (++, ++++), blood (++), leukocytes. Microscopy: RBC casts, WBC, crystals. Spot protein/creatinine ratio. 24h urine protein" },
        { key: "labTrend", label: "Key Lab Trend", type: "textarea", rows: 2, placeholder: "Creatinine, eGFR, albumin, total protein, K+, Na+, Ca, PO4, HCO3, Hb, PTH, complement (C3/C4), ANA, anti-dsDNA, ASLO" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Synthesis of presentation, urinalysis, labs, and renal imaging" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Steroids (prednisolone dose/duration), immunosuppressants (cyclophosphamide, calcineurin inhibitors, MMF, rituximab), ACEi/ARB for proteinuria, antihypertensives, diuretics for edema, salt/fluid restriction" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. RFT, electrolytes, CBC, LFT, albumin, lipid profile, complement, ANA, ASLO, Hepatitis B/C, HIV, renal USG, DMSA/DTPA scan, VCUG, renal biopsy" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Oral", value: "Oral" }, { label: "IV", value: "IV" }, { label: "SC", value: "SC" }] },
            { key: "frequency", label: "Frequency", type: "text" },
          ],
        },
        { key: "dietary", label: "Dietary Advice", type: "textarea", rows: 1, placeholder: "Salt restriction (essential), fluid restriction (if edema), protein intake per CKD stage" },
        { key: "vaccinations", label: "Vaccination Plan (immunosuppressed)", type: "textarea", rows: 1, placeholder: "Check and update live vaccines (MMR, varicella) before immunosuppression, annual influenza, pneumococcal" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Pediatric urology (if CAKUT/VCUG needed), genetics (if PKD/CAKUT), nephrology transplant team, dietitian" },
        { key: "parentEducation", label: "Parent Education", type: "textarea", rows: 2, placeholder: "Home BP monitoring, urine dipstick training, edema monitoring, medication adherence (steroid compliance), when to seek emergency care (fever, oliguria, respiratory distress)" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 1 week for urine protein check, 2 weeks for BP review, 1 month for steroid taper review, 3 months" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive pediatric nephrology consultation with urinalysis, growth assessment, CKD staging, and management of nephrotic syndrome, glomerulonephritis, CAKUT, and hypertension",
    specialties: ["Pediatric Nephrology"],
    status: "active",
  },
};


export const PAED_NEPHRO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "paed-nephro-followup",
  name: "Pediatric Nephrology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Edema status, urine output, foamy urine (proteinuria monitoring), BP at home, medication adherence, steroid side effects, intercurrent infections" },
        { key: "relapseStatus", label: "Relapse Status (Nephrotic Syndrome)", type: "select", options: [{ label: "Remission — protein-free x 3 days", value: "Remission" }, { label: "Relapse — proteinuria 3+ x 3 days", value: "Relapse" }, { label: "Partial remission", value: "Partial" }, { label: "Infrequent relapse — <2 in 6 months", value: "Infrequent" }, { label: "Frequent relapse — >=2 in 6 months", value: "Frequent" }, { label: "Steroid dependent", value: "SteroidDependent" }, { label: "Steroid resistant", value: "SteroidResistant" }] },
        { key: "bpHome", label: "Home BP Readings (if available)", type: "text", placeholder: "e.g. 110/70 to 125/80 over past week" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects / Concerns", type: "textarea", rows: 1, placeholder: "Steroid side effects (weight gain, cushinoid, behavior, AVN), immunosuppressant toxicity, ACEi cough" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "HR", type: "number" },
            { key: "weight", label: "Weight (kg)", type: "number" },
          ],
        },
        {
          key: "growth", label: "Growth Parameters", type: "section", fields: [
            { key: "weightCentile", label: "Weight Centile", type: "text" },
            { key: "heightCentile", label: "Height Centile", type: "text" },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Edema assessment, BP centile for age/height, fluid status, steroid side effects (cushinoid, striae)" },
        { key: "urinalysis", label: "Urinalysis / Labs Today", type: "textarea", rows: 2, placeholder: "Urine dipstick (protein, blood, leukocytes), spot PCR, recent labs (creatinine, albumin, eGFR, electrolytes)" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diseaseStatus", label: "Disease Status", type: "select", options: [{ label: "Remission — well controlled", value: "Remission" }, { label: "Relapse — requiring intervention", value: "Relapse" }, { label: "Stable CKD", value: "StableCKD" }, { label: "Progressive CKD / worsening", value: "Worsening" }, { label: "Post-transplant follow-up", value: "PostTransplant" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Synthesis of clinical status, urine protein, renal function, and medication effects" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "steroidAdjustment", label: "Steroid / Immunosuppressant Adjustment", type: "textarea", rows: 2, placeholder: "Prednisolone taper (alternate day, weaning), steroid-sparing agent (levamisole, MMF, calcineurin inhibitor, rituximab) for frequent relapses/side effects" },
        { key: "medicationChanges", label: "Other Medication Changes", type: "textarea", rows: 1, placeholder: "ACEi dose, diuretics, antihypertensives, vitamin D, phosphate binders" },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 1, placeholder: "e.g. RFT, electrolytes, albumin, lipid profile, complement, urine PCR, 24h urine protein, renal USG" },
        { key: "dietary", label: "Dietary / Activity", type: "textarea", rows: 1, placeholder: "Salt restriction, fluid management, school attendance, sports" },
        { key: "nextVisit", label: "Next Follow-up", type: "text", placeholder: "e.g. 1 week (if relapse), 2 weeks (steroid taper), 1 month, 3 months" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up for pediatric nephrology with relapse monitoring in nephrotic syndrome, BP tracking, steroid weaning, and immunosuppressant management",
    specialties: ["Pediatric Nephrology"],
    status: "active",
  },
};


export const PAED_NEPHRO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "paed-nephro-admission",
  name: "Pediatric Nephrology Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Generalized edema with oliguria, acute anuria, hypertensive emergency, nephrotic syndrome with infection, AKI, hematuria with hypertension" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — edema progression, urine output trend, fever/infection signs, seizures, headache, visual changes, respiratory distress, prior treatment response" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "renalDiagnosis", label: "Known Renal Diagnosis", type: "textarea", rows: 2, placeholder: "Nephrotic syndrome (steroid sensitive/resistant/frequent relapser), GN, CAKUT, CKD stage" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Steroids, immunosuppressants, ACEi, diuretics, antihypertensives" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }] },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals on Admission", type: "section", fields: [
            { key: "bp", label: "BP (mmHg)", type: "text", required: true },
            { key: "pulse", label: "HR", type: "number" },
            { key: "rr", label: "RR", type: "number" },
            { key: "spo2", label: "SpO2 (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number" },
            { key: "height", label: "Height (cm)", type: "number" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Edema (periorbital/pedal/sacral/anasarca — grade), pallor, BP centile, respiratory distress (pulmonary edema)" },
        { key: "fluidStatus", label: "Detailed Fluid Status", type: "textarea", rows: 2, placeholder: "JVP, lung crackles, S3, ascites, peripheral edema, urine output (mL/kg/hr)" },
        { key: "systemicExam", label: "Systems Exam", type: "textarea", rows: 2, placeholder: "CVS, respiratory, abdomen (ascites, palpable kidneys), CNS (hypertensive encephalopathy signs)" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild — mild edema, stable vitals", value: "Mild" }, { label: "Moderate — anasarca, hypertension", value: "Moderate" }, { label: "Severe — pulmonary edema, hypertensive urgency", value: "Severe" }, { label: "Critical — AKI, hypertensive emergency, seizures", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. RFT, electrolytes, CBC, albumin, lipid profile, complement, ASLO, ANA, blood/urine cultures, USG KUB, CXR" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Steroids (IV/oral prednisolone), diuretics (furosemide, spironolactone, albumin infusion), antihypertensives (nifedipine, labetalol, hydralazine), fluid restriction, salt restriction, albumin +- diuretic for severe edema, immunosuppression escalation if resistant" },
        { key: "monitoringPlan", label: "Monitoring Plan", type: "textarea", rows: 2, placeholder: "Strict I/O, daily weight, daily urine dipstick (protein), BP q4-6h (age-appropriate cuff), vitals, symptom monitoring" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. PICU (if hypertensive emergency/pulmonary edema), nephrology staff, nutrition, transplant team if ESRD" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Pediatric Nephrology — nephrotic syndrome with complications, AKI, hypertensive emergency, acute GN, and UTI/pyelonephritis",
    specialties: ["Pediatric Nephrology"],
    status: "active",
  },
};


export const PAED_NEPHRO_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "paed-nephro-progress",
  name: "Pediatric Nephrology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Edema change, urine output, breathing difficulty, headache, fever, appetite, abdominal pain" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 2, placeholder: "BP spikes, oliguria episodes, vomiting, fever spikes" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "HR", type: "number" },
            { key: "spo2", label: "SpO2", type: "number" },
            { key: "temp", label: "Temp", type: "number" },
          ],
        },
        {
          key: "io", label: "Input/Output", type: "section", fields: [
            { key: "input24h", label: "Input (24h, mL)", type: "number" },
            { key: "output24h", label: "Output (24h, mL)", type: "number" },
            { key: "fluidBalance", label: "Fluid Balance (+-mL)", type: "number" },
            { key: "weightChange", label: "Weight Change (from admit, kg)", type: "number" },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Edema change, lung fields, JVP, ascites, skin for steroid side effects" },
        { key: "labs", label: "Labs / Urinalysis Today", type: "textarea", rows: 2, placeholder: "Urine dipstick (protein/blood), spot PCR, creatinine, eGFR, albumin, electrolytes trend" },
      ],
    },
    {
      key: "plan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 2, placeholder: "Clinical trajectory — edema resolution, BP control, urine protein response, renal function trend" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "Steroid dosing, diuretic adjustments, antihypertensive changes, fluid management, discharge criteria" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning — edema resolving", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Pediatric Nephrology inpatients — fluid balance, BP monitoring, urine protein trend, and response to treatment",
    specialties: ["Pediatric Nephrology"],
    status: "active",
  },
};
