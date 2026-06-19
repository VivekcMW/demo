import type { TemplateDefinition } from "../templateSchema";

export const PAED_CARDIO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "paed-cardio-consult",
  name: "Pediatric Cardiology Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Murmur, cyanosis, breathlessness on feeding, fatigue, chest pain, syncope, palpitations" },
        { key: "age", label: "Age", type: "text", required: true, placeholder: "e.g. 3 years, 6 weeks" },
        { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. Since birth, progressive over 2 months" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Feeding difficulty, tachypnea, diaphoresis with feeds, cyanotic spells (trigger/duration/relief), breathlessness (related to feeding/exertion), syncope, palpitations, chest pain (exertional/rest), squatting, failure to thrive, recurrent chest infections" },
        { key: "birthHistory", label: "Birth History", type: "textarea", rows: 2, placeholder: "Gestation, birth weight, mode of delivery, NICU stay, oxygen requirement, antenatal diagnosis of CHD" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Prior cardiac interventions (surgery, catheterization), prior echocardiograms, rheumatic fever, Kawasaki disease, IE, arrhythmia" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Diuretics, ACE inhibitors, beta-blockers, anticoagulants, digoxin, prostaglandins, sildenafil" },
        { key: "allergies", label: "Allergies", type: "text", placeholder: "Drug allergies, latex" },
        { key: "immunizationStatus", label: "Immunization Status", type: "text", placeholder: "Up to date / delayed — RSV prophylaxis (Palivizumab) given?" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Congenital heart disease, cardiomyopathy, arrhythmias, sudden cardiac death, Marfan syndrome, 22q11 deletion, Down syndrome" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Constitutional, respiratory (wheeze, infections), GI (feeding, reflux), neurological" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
            { key: "pulse", label: "Heart Rate (bpm)", type: "number", min: 40, max: 220 },
            { key: "rr", label: "Respiratory Rate (/min)", type: "number", min: 10, max: 80 },
            { key: "bp", label: "BP (mmHg) — 4 limbs", type: "text", placeholder: "e.g. RU 100/60, LU 98/58, RL 105/65, LL 102/62" },
            { key: "spo2", label: "SpO₂ (%) — pre & post-ductal", type: "text", placeholder: "e.g. RA 98%, foot 97%" },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
            { key: "height", label: "Height / Length (cm)", type: "number", min: 20, max: 200 },
            { key: "headCircumference", label: "Head Circumference (cm)", type: "number", min: 20, max: 60 },
            { key: "weightCentile", label: "Weight Centile", type: "text", placeholder: "e.g. 25th centile" },
            { key: "heightCentile", label: "Height Centile", type: "text", placeholder: "e.g. 50th centile" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Cyanosis (central/peripheral), clubbing, pallor, dysmorphic features (Down, Noonan, 22q11), respiratory distress, chest deformity, edema" },
        { key: "cardiacExam", label: "Cardiovascular Examination", type: "textarea", required: true, rows: 3, placeholder: "Precordium: apex, heaves, thrills. Auscultation: S1, S2 (split — fixed/wide/narrow), S3, S4, murmurs (location, timing, grade, radiation, quality), rubs. Peripheral pulses — all 4 limbs, radiofemoral delay, femoral pulse volume" },
        { key: "respiratoryExam", label: "Respiratory Examination", type: "textarea", rows: 2, placeholder: "Work of breathing, air entry, crackles (pulmonary congestion), wheeze" },
        { key: "hepatomegaly", label: "Hepatomegaly / Abdomen", type: "text", placeholder: "Liver span, cm below costal margin, spleen" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. VSD (perimembranous), Tetralogy of Fallot, PDA, ASD secundum, Coarctation of aorta, Transposition of great arteries, Kawasaki disease" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Complication", value: "Complication" }, { label: "Differential", value: "Differential" }] },
          ],
        },
        { key: "hemodynamicStatus", label: "Hemodynamic Status / CHF Staging", type: "select", options: [{ label: "Compensated — no HF", value: "Compensated" }, { label: "Mild CHF", value: "Mild" }, { label: "Moderate CHF", value: "Moderate" }, { label: "Severe CHF / Shock", value: "Severe" }] },
        { key: "echoSummary", label: "Echocardiography Summary", type: "textarea", rows: 3, placeholder: "LV function (EF%), chamber sizes, septal defects, valve morphology/function, gradient, pulmonary artery pressure, pericardium" },
        { key: "ecgSummary", label: "ECG Summary", type: "textarea", rows: 2, placeholder: "Rate, rhythm, axis, PR/QRS/QTc, chamber enlargement, ST/T changes, arrhythmia" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Synthesis of presentation, exam, echo/ECG findings, and functional status" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Medical management (diuretics, ACEi, digoxin, beta-blockers, prostaglandin for duct-dependent lesions), surgical timing, catheter intervention (device closure, balloon valvuloplasty, stenting)" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. ECHO, ECG, Holter, CXR, CBC, BNP, blood culture, pulse oximetry, cardiac catheterization, CT/MRI" },
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
        { key: "ieProphylaxis", label: "Infective Endocarditis Prophylaxis", type: "select", options: [{ label: "Indicated", value: "Yes" }, { label: "Not indicated", value: "No" }] },
        { key: "activityRestrictions", label: "Activity Restrictions / Sports", type: "textarea", rows: 1, placeholder: "e.g. No contact sports, no competitive sports — per lesion-specific guidelines" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Pediatric cardiac surgery, genetics (22q11, Noonan), nutrition, cardiac rehab, psychology" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Review in 2 weeks, repeat ECHO in 3 months, next clinic in 6 months" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive pediatric cardiology consultation with growth assessment, detailed cardiac exam, echo/ECG review, and management planning for congenital and acquired heart disease",
    specialties: ["Pediatric Cardiology"],
    status: "active",
  },
};


export const PAED_CARDIO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "paed-cardio-followup",
  name: "Pediatric Cardiology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Feeding tolerance, breathlessness, cyanotic spells, exercise tolerance (compared to peers), fatigue, medication adherence, intercurrent illnesses" },
        { key: "symptomStatus", label: "Symptom Status", type: "select", options: [{ label: "Improved", value: "Improved" }, { label: "Stable", value: "Stable" }, { label: "Worsened", value: "Worsened" }] },
        { key: "weightGain", label: "Weight Gain Since Last Visit (kg)", type: "number", min: 0, max: 10 },
        { key: "sideEffects", label: "Medication Side Effects", type: "textarea", rows: 1, placeholder: "Hypotension, cough, electrolyte disturbances, bradycardia" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "pulse", label: "Heart Rate (bpm)", type: "number", min: 40, max: 220 },
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 50, max: 100 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
          ],
        },
        {
          key: "growth", label: "Growth Parameters", type: "section", fields: [
            { key: "height", label: "Height (cm)", type: "number" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
          ],
        },
        { key: "exam", label: "Focused CVS Examination", type: "textarea", rows: 2, placeholder: "Murmur changes, cyanosis, hepatomegaly, JVP, edema — compare to previous visit" },
        { key: "echoToday", label: "Echocardiography Today", type: "textarea", rows: 2, placeholder: "LV function, gradient change, valve regurgitation, residual shunt, chamber sizes" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diseaseStatus", label: "Disease Status", type: "select", options: [{ label: "Stable — well controlled", value: "Stable" }, { label: "Improving", value: "Improving" }, { label: "Worsening / Deteriorating", value: "Worsening" }, { label: "Awaiting intervention", value: "AwaitingIntervention" }, { label: "Post-operative follow-up", value: "PostOp" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Synthesis of interval history, exam, growth, and echo findings" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "Dose adjustments (weight-based), new medications, weaning plan" },
        { key: "interventionTiming", label: "Surgical / Catheter Intervention Timing", type: "text", placeholder: "e.g. Plan for VSD closure at 6 months, balloon valvuloplasty next month" },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 1, placeholder: "e.g. Repeat ECHO in 3 months, Holter study, exercise test (older children)" },
        { key: "nextVisit", label: "Next Follow-up", type: "text", placeholder: "e.g. 1 month / 3 months / 6 months / 1 year" },
        { key: "parentInstructions", label: "Parent Instructions", type: "textarea", rows: 2, placeholder: "Medication schedule, IE prophylaxis, warning signs (cyanotic spells, lethargy, poor feeding), when to seek emergency care" },
      ],
    },
  ],
  metadata: {
    description: "Pediatric cardiology follow-up with growth tracking, symptom assessment, echo review, and medication/intervention planning",
    specialties: ["Pediatric Cardiology"],
    status: "active",
  },
};


export const PAED_CARDIO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "paed-cardio-admission",
  name: "Pediatric Cardiology Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Acute cyanotic spell, CHF exacerbation, chest pain with syncope, arrhythmia, fever with known CHD" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 days, started during sleep" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — onset, progression, feeding/activity tolerance, cyanosis, respiratory effort, urine output, prior admissions" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "cardiacDiagnosis", label: "Known Cardiac Diagnosis", type: "textarea", rows: 2, placeholder: "Anatomical diagnosis, prior interventions (surgery, catheter), current medical therapy" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Diuretics, ACEi, digoxin, beta-blockers, anticoagulants, prostaglandins" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }, { label: "Limitations per cardiology", value: "Limited" }] },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals on Admission", type: "section", fields: [
            { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
            { key: "pulse", label: "Heart Rate (bpm)", type: "number", min: 40, max: 220 },
            { key: "rr", label: "Respiratory Rate (/min)", type: "number", min: 10, max: 80 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 50, max: 100 },
            { key: "bp", label: "BP (mmHg)", type: "text" },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
            { key: "height", label: "Height (cm)", type: "number" },
            { key: "headCircumference", label: "Head Circumference (cm)", type: "number" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Cyanosis, clubbing, respiratory distress (retractions, grunting), edema, perfusion (capillary refill)" },
        { key: "cardiacExam", label: "Cardiovascular Examination", type: "textarea", required: true, rows: 3, placeholder: "Heart sounds, murmurs (change from baseline), gallop, rubs, JVP, hepatomegaly, peripheral pulses, perfusion" },
        { key: "respiratoryExam", label: "Respiratory Examination", type: "textarea", rows: 2, placeholder: "Work of breathing, crackles (pulmonary edema), wheeze, effusion" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity / Acuity", type: "select", options: [{ label: "Mild — compensated", value: "Mild" }, { label: "Moderate — decompensated", value: "Moderate" }, { label: "Severe — impending shock", value: "Severe" }, { label: "Critical — cardiogenic shock", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. ECHO, ECG, CXR, CBC, BNP, VBG, pulse oximetry monitoring" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Oxygen, diuretics, inotropes (dopamine/dobutamine/milrinone), vasodilators, rhythm control, prostaglandin infusion (duct-dependent lesions), fluid management, electrolyte monitoring" },
        { key: "monitoringPlan", label: "Monitoring Plan", type: "textarea", rows: 2, placeholder: "Continuous pulse oximetry, ECG telemetry, hourly vitals, strict I/O, daily weight" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Pediatric cardiothoracic surgery, PICU, cardiology (staff), cardiac anesthesia" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Pediatric Cardiology — CHF exacerbation, cyanotic spells, arrhythmia, pre-operative admissions",
    specialties: ["Pediatric Cardiology"],
    status: "active",
  },
};


export const PAED_CARDIO_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "paed-cardio-progress",
  name: "Pediatric Cardiology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Feeding tolerance, respiratory effort, cyanotic episodes, pain (if post-op), activity level, urine output" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 2, placeholder: "Desaturations, arrhythmia episodes, fever, vomiting, medication changes" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "hr", label: "Heart Rate (bpm)", type: "number" },
            { key: "rr", label: "RR (/min)", type: "number" },
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "spo2", label: "SpO₂ (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
          ],
        },
        {
          key: "io", label: "Input/Output", type: "section", fields: [
            { key: "input24h", label: "Input (24h, mL)", type: "number" },
            { key: "output24h", label: "Output (24h, mL)", type: "number" },
            { key: "weightChange", label: "Weight Change (kg from admit)", type: "number" },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Cardiac auscultation, lung fields, hepatomegaly, peripheral edema, perfusion, cyanosis" },
        { key: "labs", label: "Labs / ECHO / ECG Today", type: "textarea", rows: 2, placeholder: "Trend — BNP, electrolytes, Hb, lactate, echo findings, ECG changes" },
      ],
    },
    {
      key: "plan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 2, placeholder: "Clinical trajectory, response to therapy, concerns" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "Medication adjustments, weaning plan (oxygen, inotropes), fluid management, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Pediatric Cardiology inpatients — vitals, I/O, cardiac exam, trend tracking, and discharge planning",
    specialties: ["Pediatric Cardiology"],
    status: "active",
  },
};
