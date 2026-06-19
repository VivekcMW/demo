import type { TemplateDefinition } from "../templateSchema";

export const PAED_WELLCHILD_TEMPLATE: TemplateDefinition = {
  id: "paed-wellchild",
  name: "Well-Child / Growth & Development Visit",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "age", label: "Current Age", type: "text", required: true, placeholder: "e.g. 6 months, 2 years" },
        { key: "intervalHistory", label: "Interval History", type: "textarea", rows: 2, placeholder: "Feeding, sleep, behavior, illnesses since last visit" },
        { key: "feeding", label: "Feeding History", type: "textarea", rows: 2, placeholder: "Breast/formula/complementary feeding, frequency, quantity" },
        { key: "immunizationStatus", label: "Immunization Status", type: "textarea", rows: 2, placeholder: "Vaccines received, next due" },
        { key: "developmentalConcerns", label: "Developmental Concerns", type: "textarea", rows: 2, placeholder: "Parental concerns about milestones, speech, behaviour, schooling" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Sleep, vision, hearing, dental, elimination" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals & Anthropometry", type: "section", fields: [
          { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
          { key: "heightLength", label: "Height / Length (cm)", type: "number", min: 30, max: 200 },
          { key: "headCircumference", label: "Head Circumference (cm)", type: "number", min: 20, max: 60 },
          { key: "bmi", label: "BMI", type: "number", readOnly: true },
          { key: "temperature", label: "Temperature (°C)", type: "number", min: 34, max: 42 },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 40, max: 220 },
          { key: "rr", label: "Respiratory Rate", type: "number", min: 10, max: 80 },
        ] },
        { key: "growthPercentile", label: "Growth Percentile (on standard chart)", type: "text", placeholder: "e.g. Weight 25th, Height 50th, HC 25th" },
        { key: "physicalExam", label: "Physical Examination", type: "textarea", rows: 3, placeholder: "General, head & neck, chest, CVS, abdomen, genitourinary, spine, extremities, skin" },
        { key: "developmentalAssessment", label: "Developmental Assessment", type: "textarea", rows: 2, placeholder: "Gross motor, fine motor, language, social-adaptive milestones" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "growthStatus", label: "Growth Status", type: "select", options: [{ label: "Normal", value: "Normal" }, { label: "Underweight", value: "Underweight" }, { label: "Stunted", value: "Stunted" }, { label: "Overweight", value: "Overweight" }, { label: "Obese", value: "Obese" }] },
        { key: "developmentalStatus", label: "Developmental Status", type: "select", options: [{ label: "Age-appropriate", value: "Appropriate" }, { label: "Delayed — refer for evaluation", value: "Delayed" }, { label: "Needs monitoring", value: "Monitor" }] },
        { key: "nutritionalStatus", label: "Nutritional Status", type: "select", options: [{ label: "Well nourished", value: "Well" }, { label: "Moderate malnutrition", value: "Moderate" }, { label: "Severe malnutrition", value: "Severe" }] },
        { key: "diagnosis", label: "Diagnosis", type: "text", placeholder: "e.g. Z00.1 — Routine well-child check" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "vaccinationsGiven", label: "Vaccinations Given Today", type: "textarea", rows: 2, placeholder: "Vaccine name, dose, batch no., route, site" },
        { key: "nutritionAdvice", label: "Nutrition & Feeding Advice", type: "textarea", rows: 2, placeholder: "Breastfeeding support, complementary feeding, vitamin supplements" },
        { key: "anticipatoryGuidance", label: "Anticipatory Guidance", type: "textarea", rows: 2, placeholder: "Injury prevention, sleep safety, screen time, discipline" },
        { key: "nextVisit", label: "Next Visit / Vaccine Due Date", type: "text", placeholder: "e.g. 2 months / 12 months" },
        { key: "referrals", label: "Referrals", type: "text", placeholder: "e.g. Developmental pediatrics, ENT, ophthalmology" },
      ],
    },
  ],
  metadata: {
    description: "Well-child visit for growth monitoring, developmental assessment, immunizations, and anticipatory guidance",
    specialties: ["Paediatrics"],
    status: "active",
  },
};


export const PAED_ACUTE_TEMPLATE: TemplateDefinition = {
  id: "paed-acute",
  name: "Pediatric Acute Illness",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Fever with cough for 2 days" },
        { key: "age", label: "Age", type: "text", required: true, placeholder: "e.g. 3 years" },
        { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
        { key: "onsetDuration", label: "Onset & Duration", type: "text", required: true, placeholder: "e.g. Started 2 days ago, gradual onset" },
        { key: "symptomDetails", label: "Symptom Details", type: "textarea", rows: 4, placeholder: "Fever pattern, cough (wet/dry), vomiting, diarrhea, rash, pain, irritability, feeding difficulty, urine output, sleep" },
        { key: "redFlags", label: "Red Flags", type: "textarea", rows: 2, placeholder: "High fever >39°C, lethargy, neck stiffness, poor feeding, decreased urine output, rapid breathing, cyanosis, seizure" },
        { key: "pastMedical", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Chronic conditions, hospitalizations, NICU stay, medications" },
        { key: "immunizationStatus", label: "Immunization Status", type: "text", placeholder: "Up to date / delayed / unknown" },
        { key: "allergies", label: "Allergies", type: "text", placeholder: "Drug allergies" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "temp", label: "Temperature (°C)", type: "number", min: 34, max: 42 },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 40, max: 220 },
          { key: "rr", label: "Respiratory Rate (/min)", type: "number", min: 10, max: 80 },
          { key: "spo2", label: "SpO₂ (%)", type: "number", min: 50, max: 100 },
          { key: "bp", label: "BP (mmHg)", type: "text" },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Appearance, alertness, hydration, pallor, cyanosis, edema, rash, neck stiffness" },
        { key: "focusedExam", label: "Focused System Examination", type: "textarea", required: true, rows: 3, placeholder: "Relevant system: Respiratory (work of breathing, auscultation), GI (abdomen, bowel sounds), ENT (throat, ears), CNS (tone, reflexes, GCS)" },
        { key: "pediatricSeverity", label: "Severity Assessment", type: "select", options: [{ label: "Mild — home care", value: "Mild" }, { label: "Moderate — OPD follow-up", value: "Moderate" }, { label: "Severe — refer / admit", value: "Severe" }] },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Working Diagnosis", type: "text", required: true, placeholder: "e.g. J15.9 — Community Acquired Pneumonia" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "clinicalReasoning", label: "Clinical Reasoning", type: "textarea", rows: 2, placeholder: "Brief differential + key findings justifying diagnosis" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "disposition", label: "Disposition", type: "select", required: true, options: [{ label: "Home / Outpatient", value: "Home" }, { label: "Observation in ED", value: "Observation" }, { label: "Admit to Ward", value: "Admit" }, { label: "Refer to ER / PICU", value: "Refer" }] },
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Medications with dose, supportive care (hydration, antipyretics, bronchodilators)..." },
        { key: "investigations", label: "Investigations", type: "textarea", rows: 2, placeholder: "CBC, CRP, CXR, cultures, RDT, urine microscopy..." },
        { key: "parentInstructions", label: "Parent Instructions", type: "textarea", rows: 2, placeholder: "Medication schedule, fever management, feeding, when to return" },
        { key: "warningSigns", label: "Warning Signs (return precautions)", type: "textarea", rows: 2, placeholder: "High fever not responding, poor feeding, lethargy, rapid breathing, seizures" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Review in 48 hours / sooner if worsening" },
      ],
    },
  ],
  metadata: {
    description: "Focused pediatric acute illness assessment with severity triage, age-appropriate history, and parent-centered plan",
    specialties: ["Paediatrics"],
    status: "active",
  },
};


export const PAED_VACCINATION_TEMPLATE: TemplateDefinition = {
  id: "paed-vaccination",
  name: "Vaccination Note",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preVaccination",
      label: "Pre-Vaccination Assessment",
      fields: [
        { key: "childName", label: "Child Name & Age", type: "text", required: true, placeholder: "e.g. Baby A, 6 weeks" },
        { key: "weight", label: "Current Weight (kg)", type: "number", min: 1, max: 80 },
        { key: "screening", label: "Contraindication Screening", type: "section", fields: [
          { key: "feverToday", label: "Fever today?", type: "boolean" },
          { key: "acuteIllness", label: "Acute illness in past 48hr?", type: "boolean" },
          { key: "allergyVaccine", label: "Known allergy to vaccine component?", type: "boolean" },
          { key: "previousReaction", label: "Previous vaccine reaction?", type: "boolean" },
          { key: "immunosuppressed", label: "Immunosuppressed / on steroids?", type: "boolean" },
        ] },
        { key: "contraindicationsCleared", label: "Cleared for vaccination", type: "boolean", required: true },
      ],
    },
    {
      key: "vaccinesAdministered",
      label: "Vaccines Administered",
      fields: [
        { key: "vaccines", label: "Vaccines", type: "repeating", required: true, fields: [
          { key: "vaccine", label: "Vaccine", type: "select", options: [
            { label: "BCG", value: "BCG" },
            { label: "OPV (0/1/2/3/booster)", value: "OPV" },
            { label: "IPV", value: "IPV" },
            { label: "Hep B (birth/6wk/14wk/booster)", value: "HepB" },
            { label: "Pentavalent (1/2/3)", value: "Pentavalent" },
            { label: "PCV (1/2/3/booster)", value: "PCV" },
            { label: "Rota Virus (1/2/3)", value: "Rota" },
            { label: "MMR (1/2)", value: "MMR" },
            { label: "Varicella (1/2)", value: "Varicella" },
            { label: "Hep A (1/2)", value: "HepA" },
            { label: "Typhoid", value: "Typhoid" },
            { label: "HPV (1/2/3)", value: "HPV" },
            { label: "Influenza (seasonal)", value: "Influenza" },
            { label: "COVID-19", value: "COVID" },
          ] },
          { key: "doseNumber", label: "Dose Number", type: "text", placeholder: "e.g. 1st, 2nd, Booster" },
          { key: "batchNo", label: "Batch No.", type: "text" },
          { key: "route", label: "Route", type: "select", options: [{ label: "Intramuscular", value: "IM" }, { label: "Subcutaneous", value: "SC" }, { label: "Oral", value: "Oral" }, { label: "Intradermal", value: "ID" }] },
          { key: "site", label: "Site", type: "select", options: [{ label: "Left thigh", value: "LThigh" }, { label: "Right thigh", value: "RThigh" }, { label: "Left deltoid", value: "LDeltoid" }, { label: "Right deltoid", value: "RDeltoid" }, { label: "Left arm (ID)", value: "LArm" }, { label: "Right arm (ID)", value: "RArm" }] },
          { key: "manufacturer", label: "Manufacturer", type: "text" },
        ] },
      ],
    },
    {
      key: "postVaccination",
      label: "Post-Vaccination",
      fields: [
        { key: "observation", label: "Observed for 30 min — no immediate reaction", type: "boolean" },
        { key: "nextVaccineDue", label: "Next Vaccine(s) Due", type: "text", placeholder: "e.g. PCV booster at 15 months" },
        { key: "nextVisitDate", label: "Next Visit Date", type: "date" },
        { key: "parentAdvice", label: "Advice to Parent", type: "textarea", rows: 2, placeholder: "Common side effects, when to seek care, vaccination card updated" },
      ],
    },
  ],
  metadata: {
    description: "Structured vaccination note with contraindication screening, vaccine administration details, batch tracking, and parent education",
    specialties: ["Paediatrics"],
    status: "active",
  },
};


export const PAED_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "paed-admission",
  name: "Pediatric Admission Note",
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
        { key: "ward", label: "Ward / Unit", type: "text", placeholder: "e.g. Pediatric Ward, PICU, NICU" },
        { key: "bed", label: "Bed Number", type: "text" },
        { key: "source", label: "Source", type: "select", options: [{ label: "OPD", value: "OPD" }, { label: "Emergency", value: "Emergency" }, { label: "Transfer from other hospital", value: "Transfer" }, { label: "Birth / Delivery room", value: "Birth" }] },
      ],
    },
    {
      key: "history",
      label: "History",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Complete history leading to admission" },
        { key: "birthHistory", label: "Birth History", type: "textarea", rows: 2, placeholder: "Period of gestation, mode of delivery, birth weight, NICU stay, neonatal complications" },
        { key: "feedingHistory", label: "Feeding History", type: "textarea", rows: 2, placeholder: "Breast/formula/complementary, any feeding difficulties" },
        { key: "immunizationHistory", label: "Immunization History", type: "textarea", rows: 2, placeholder: "Up to date / delayed / vaccines received" },
        { key: "developmentalHistory", label: "Developmental History", type: "textarea", rows: 2, placeholder: "Milestones attained — gross motor, fine motor, language, social" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Chronic conditions, prior admissions, surgeries, allergies" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 1 },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        { key: "vitals", label: "Vitals on Admission", type: "section", fields: [
          { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
          { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 40, max: 220 },
          { key: "rr", label: "Respiratory Rate (/min)", type: "number", min: 10, max: 80 },
          { key: "spo2", label: "SpO₂ (%)", type: "number", min: 50, max: 100 },
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "gcs", label: "GCS", type: "text", placeholder: "e.g. 15/15" },
        ] },
        { key: "anthropometry", label: "Anthropometry", type: "section", fields: [
          { key: "heightLength", label: "Height / Length (cm)", type: "number" },
          { key: "headCircumference", label: "Head Circumference (cm)", type: "number", min: 20, max: 60 },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Alertness, hydration, pallor, icterus, cyanosis, edema, rash, lymphadenopathy" },
        { key: "systemicExam", label: "Systemic Examination", type: "textarea", rows: 3, placeholder: "CVS, Respiratory, Abdomen, CNS — full findings" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", required: true, rows: 4, placeholder: "IV fluids, medications, monitoring, investigations, consults..." },
        { key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
          { key: "order", label: "Order", type: "text", placeholder: "e.g. IV access, CBC, CXR" },
          { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
        ] },
      ],
    },
  ],
  metadata: {
    description: "Structured pediatric admission note with birth, feeding, immunization, and developmental history",
    specialties: ["Paediatrics"],
    status: "active",
  },
};


export const PAED_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "paed-progress",
  name: "Pediatric Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "header",
      label: "Progress Header",
      fields: [
        { key: "date", label: "Date", type: "date", required: true },
        { key: "dayOfAdmission", label: "Day of Admission", type: "number", min: 1 },
        { key: "shift", label: "Shift", type: "select", options: [{ label: "Morning", value: "Morning" }, { label: "Evening", value: "Evening" }, { label: "Night", value: "Night" }] },
      ],
    },
    {
      key: "events",
      label: "Events & Review",
      fields: [
        { key: "eventsSinceLast", label: "Events Since Last Review", type: "textarea", rows: 3, placeholder: "Fever spikes, seizures, vomiting, feeding changes, desaturations, nursing concerns..." },
        { key: "feedingAndOutput", label: "Feeding & Output", type: "textarea", rows: 2, placeholder: "Oral intake, IV fluids, urine output, stool frequency/character" },
        { key: "painOrDiscomfort", label: "Pain / Discomfort", type: "select", options: [{ label: "None", value: "None" }, { label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }] },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Current Vitals", type: "section", fields: [
          { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 40, max: 220 },
          { key: "rr", label: "Respiratory Rate", type: "number", min: 10, max: 80 },
          { key: "spo2", label: "SpO₂ (%)", type: "number", min: 50, max: 100 },
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "weight", label: "Weight Today (kg)", type: "number" },
        ] },
        { key: "exam", label: "Focused Examination", type: "textarea", rows: 3, placeholder: "Relevant positive and negative findings for primary condition" },
        { key: "investigationResults", label: "New Investigation Results", type: "textarea", rows: 2, placeholder: "Key lab results, cultures, imaging performed today" },
      ],
    },
    {
      key: "plan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical progress, response to treatment, concerns" },
        { key: "plan", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "Medication changes, IV fluids, investigations, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily inpatient progress note for pediatric patients with age-appropriate assessment parameters",
    specialties: ["Paediatrics"],
    status: "active",
  },
};


export const PAED_NEONATAL_TEMPLATE: TemplateDefinition = {
  id: "paed-neonatal",
  name: "Neonatal Examination",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Perinatal History",
      fields: [
        { key: "gestationalAge", label: "Gestational Age at Birth (weeks)", type: "number", required: true, min: 24, max: 44 },
        { key: "birthWeight", label: "Birth Weight (kg)", type: "number", required: true, min: 0.3, max: 6 },
        { key: "modeOfDelivery", label: "Mode of Delivery", type: "select", options: [{ label: "NVD", value: "NVD" }, { label: "LSCS", value: "LSCS" }, { label: "Forceps", value: "Forceps" }, { label: "Vacuum", value: "Vacuum" }] },
        { key: "antenatalHistory", label: "Antenatal History", type: "textarea", rows: 2, placeholder: "Maternal conditions, medications, steroid coverage, PROM, meconium" },
        { key: "resuscitationAtBirth", label: "Resuscitation at Birth", type: "textarea", rows: 1, placeholder: "APGAR, oxygen, PPV, intubation, NICU admission" },
        { key: "currentAge", label: "Current Age (hours/days)", type: "text", required: true, placeholder: "e.g. 12 hours / 3 days" },
        { key: "feeding", label: "Feeding History", type: "textarea", rows: 2, placeholder: "Breast/formula/IVF, frequency, amount, tolerance" },
        { key: "elimination", label: "Urine & Meconium Passed", type: "textarea", rows: 1, placeholder: "First urine @ __hr, first meconium @ __hr" },
        { key: "concerns", label: "Clinical Concerns", type: "textarea", rows: 2, placeholder: "Jaundice, breathing difficulty, lethargy, poor feeding, seizures, temperature instability" },
      ],
    },
    {
      key: "objective",
      label: "Examination",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "temp", label: "Temperature (°C)", type: "number", min: 34, max: 42 },
          { key: "pulse", label: "Heart Rate (bpm)", type: "number", min: 70, max: 220 },
          { key: "rr", label: "Respiratory Rate (/min)", type: "number", min: 20, max: 80 },
          { key: "spo2", label: "SpO₂ (pre-ductal %)", type: "number", min: 50, max: 100 },
          { key: "weight", label: "Current Weight (kg)", type: "number", min: 0.3, max: 6 },
        ] },
        { key: "headToToe", label: "Head-to-Toe Examination", type: "section", fields: [
          { key: "general", label: "General", type: "textarea", rows: 1, placeholder: "Activity, tone, cry, color, perfusion" },
          { key: "headNeck", label: "Head & Neck", type: "textarea", rows: 1, placeholder: "Head circumference, fontanelles, sutures, cephalhematoma, face, palate" },
          { key: "chest", label: "Chest & Lungs", type: "textarea", rows: 1, placeholder: "Chest shape, bilateral air entry, crackles, grunt, retractions" },
          { key: "cvs", label: "Cardiovascular", type: "textarea", rows: 1, placeholder: "Heart sounds, murmurs, femoral pulses, capillary refill" },
          { key: "abdomen", label: "Abdomen", type: "textarea", rows: 1, placeholder: "Distension, organomegaly, umbilical stump, bowel sounds" },
          { key: "genitalia", label: "Genitalia & Anus", type: "textarea", rows: 1, placeholder: "Normal/ambiguous, testes descended, patent anus" },
          { key: "spine", label: "Spine & Back", type: "textarea", rows: 1, placeholder: "Full length visible, sacral dimple, no masses" },
          { key: "skin", label: "Skin", type: "textarea", rows: 1, placeholder: "Jaundice (zone), rash, hemangioma, lanugo, vernix" },
          { key: "neuro", label: "Neurological", type: "textarea", rows: 1, placeholder: "Tone, Moro reflex, grasp, rooting, sucking, pupil reaction" },
        ] },
        { key: "congenitalScreening", label: "Congenital Anomalies Screening", type: "select", options: [{ label: "No obvious congenital anomalies", value: "None" }, { label: "Anomaly detected — describe", value: "Present" }] },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "gestationalAgeAssessment", label: "Gestational Age Assessment (Ballard / New Ballard)", type: "text", placeholder: "e.g. 38 weeks — term" },
        { key: "classification", label: "Classification", type: "select", options: [{ label: "Term AGA", value: "TermAGA" }, { label: "Term SGA", value: "TermSGA" }, { label: "Term LGA", value: "TermLGA" }, { label: "Preterm AGA", value: "PretermAGA" }, { label: "Preterm SGA", value: "PretermSGA" }] },
        { key: "diagnosis", label: "Diagnosis", type: "textarea", rows: 2, required: true, placeholder: "e.g. P59.9 — Neonatal jaundice, P20.0 — Meconium aspiration" },
        { key: "icdCodes", label: "ICD-10 Codes", type: "text" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "monitoring", label: "Monitoring Plan", type: "textarea", rows: 2, placeholder: "Vitals, feeding, jaundice monitoring, blood sugar surveillance" },
        { key: "investigations", label: "Investigations", type: "textarea", rows: 2, placeholder: "CBC, CRP, blood culture, bilirubin, blood sugar, sepsis screen" },
        { key: "treatments", label: "Treatments", type: "textarea", rows: 2, placeholder: "Phototherapy, antibiotics, IV fluids, oxygen" },
        { key: "feedingPlan", label: "Feeding Plan", type: "textarea", rows: 2, placeholder: "Breastfeeding support, formula supplementation, gavage if needed" },
        { key: "immunizations", label: "Immunizations Due", type: "text", placeholder: "e.g. BCG, OPV-0, Hep B" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. High-risk follow-up clinic, developmental assessment" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive neonatal examination with perinatal history, head-to-toe assessment, Ballard scoring, and management plan",
    specialties: ["Paediatrics"],
    status: "active",
  },
};


export const PAED_DISCHARGE_TEMPLATE: TemplateDefinition = {
  id: "paed-discharge",
  name: "Pediatric Discharge Summary",
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
        { key: "modeOfDischarge", label: "Mode of Discharge", type: "select", options: [{ label: "Cured / Recovered", value: "Recovered" }, { label: "Improved", value: "Improved" }, { label: "LAMA", value: "LAMA" }, { label: "Referred", value: "Referred" }, { label: "Expired", value: "Expired" }] },
        { key: "dischargeWeight", label: "Discharge Weight (kg)", type: "number" },
      ],
    },
    {
      key: "clinicalSummary",
      label: "Clinical Summary",
      fields: [
        { key: "diagnosisAtAdmission", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "diagnosisAtDischarge", label: "Diagnosis at Discharge", type: "textarea", required: true, rows: 2 },
        { key: "icdCodes", label: "ICD-10 Codes", type: "text" },
        { key: "hospitalCourse", label: "Hospital Course Summary", type: "textarea", required: true, rows: 4, placeholder: "Brief narrative of hospital stay, treatments given, response, complications" },
        { key: "procedures", label: "Procedures During Stay", type: "textarea", rows: 2 },
        { key: "keyInvestigationResults", label: "Key Investigation Results", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "dischargePlan",
      label: "Discharge Plan",
      fields: [
        { key: "medications", label: "Medications at Discharge", type: "textarea", required: true, rows: 3, placeholder: "Drug, dose, frequency, duration, formulation appropriate for child's age" },
        { key: "feedingAdvice", label: "Feeding & Nutrition Advice", type: "textarea", rows: 2, placeholder: "Breastfeeding, formula, complementary feeding, vitamin supplements" },
        { key: "followUp", label: "Follow-up Instructions", type: "textarea", required: true, rows: 2, placeholder: "Which clinic, which doctor, when, what to monitor" },
        { key: "immunizationsDue", label: "Immunizations Due", type: "text", placeholder: "e.g. MMR-1 at 9 months, PCV booster at 15 months" },
        { key: "warningSigns", label: "Warning Signs (return to hospital)", type: "textarea", rows: 2, placeholder: "Fever, poor feeding, lethargy, breathing difficulty, seizures, jaundice" },
        { key: "developmentalReferral", label: "Developmental Follow-up Needed", type: "boolean" },
        { key: "referralToSpecialist", label: "Referral to Specialist", type: "text", placeholder: "e.g. Pediatric cardiology, neurology, developmental clinic" },
      ],
    },
  ],
  metadata: {
    description: "Age-appropriate pediatric discharge summary with feeding, immunization, and developmental follow-up planning",
    specialties: ["Paediatrics"],
    status: "active",
  },
};
