import type { TemplateDefinition } from "../templateSchema";

export const PAED_PULMO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "paed-pulmo-consult",
  name: "Pediatric Pulmonology Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Chronic cough, wheeze, breathlessness, recurrent pneumonia, noisy breathing, cyanotic spells, exercise intolerance" },
        { key: "age", label: "Age", type: "text", required: true, placeholder: "e.g. 2 years, 8 months" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. Since infancy, 3 months, acute 2 days" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Cough (dry/productive, duration, diurnal variation, triggers), wheeze (frequency, triggers, response to bronchodilators), dyspnea (exercise tolerance, MRC grade for older children, feeding-related in infants), sputum (color, volume), fever, hemoptysis, chest pain, night symptoms, growth" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Asthma (age at diagnosis, severity, exacerbations), pneumonia (frequency, sites), TB contact, bronchiolitis, congenital lung anomalies (CCAM, sequestration), GERD, foreign body aspiration, allergy" },
        { key: "birthHistory", label: "Birth & Neonatal History", type: "textarea", rows: 2, placeholder: "Gestation (preterm), oxygen requirement, mechanical ventilation, BPD/CLD, congenital anomalies, meconium aspiration" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Inhalers (type/dose/frequency), oral steroids, montelukast, antibiotics, bronchodilators, home O2" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Drug, food, environmental, latex" },
        { key: "immunizationStatus", label: "Immunization Status", type: "text", placeholder: "Up to date — RSV prophylaxis (Palivizumab) given? Influenza vaccine?" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Asthma, atopy (eczema, allergic rhinitis), cystic fibrosis, TB, immunodeficiency" },
        { key: "environmentalHistory", label: "Environmental History", type: "textarea", rows: 2, placeholder: "Smoking exposure (household), pets, mold, home ventilation, air pollution, daycare attendance" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "CVS, GI (reflux, feeding), ENT (sinusitis, nasal polyps), growth/nutrition" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
            { key: "pulse", label: "HR (bpm)", type: "number", min: 40, max: 220 },
            { key: "rr", label: "RR (/min)", type: "number", min: 10, max: 80 },
            { key: "spo2", label: "SpO2 (%) — room air", type: "number", min: 50, max: 100 },
            { key: "bp", label: "BP (mmHg)", type: "text" },
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
        { key: "generalAppearance", label: "General Appearance", type: "textarea", rows: 2, placeholder: "Respiratory distress (retractions, grunting, nasal flaring, head bobbing), cyanosis, clubbing, chest deformity (Harrison's sulcus, pectus, barrel chest), use of accessory muscles" },
        { key: "entExam", label: "ENT / Upper Airway", type: "textarea", rows: 1, placeholder: "Nasal polyps, discharge, throat (tonsillar hypertrophy), stridor, post-nasal drip" },
        {
          key: "respiratoryExam", label: "Respiratory Examination", type: "section", fields: [
            { key: "inspection", label: "Inspection", type: "textarea", rows: 1, placeholder: "Chest shape, tracheal deviation, scars (thoracotomy), breathing pattern" },
            { key: "palpation", label: "Palpation", type: "textarea", rows: 1, placeholder: "Tactile vocal fremitus, chest expansion, tracheal position" },
            { key: "percussion", label: "Percussion", type: "textarea", rows: 1, placeholder: "Resonant, dull, hyper-resonant" },
            { key: "auscultation", label: "Auscultation", type: "textarea", rows: 1, placeholder: "Air entry (symmetry), wheeze (expiratory/inspiratory/biphasic), crackles (fine/coarse), crepitations, bronchial breath sounds, pleural rub" },
          ],
        },
        { key: "CVS", label: "CVS Exam", type: "textarea", rows: 1, placeholder: "JVP, heart sounds, cor pulmonale signs (P2 loud, right heave)" },
        { key: "abdomen", label: "Abdomen", type: "textarea", rows: 1, placeholder: "Organomegaly, ascites (cor pulmonale)" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Bronchial asthma (moderate persistent), Community-acquired pneumonia, Cystic fibrosis, Recurrent wheeze, Bronchiolitis obliterans, Primary ciliary dyskinesia" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Differential", value: "Differential" }, { label: "Complication", value: "Complication" }] },
            { key: "status", label: "Status", type: "select", options: [{ label: "Active", value: "Active" }, { label: "Resolved", value: "Resolved" }, { label: "Chronic", value: "Chronic" }] },
          ],
        },
        { key: "asthmaControl", label: "Asthma Control Level (GINA)", type: "select", options: [{ label: "Well controlled", value: "WellControlled" }, { label: "Partially controlled", value: "PartiallyControlled" }, { label: "Uncontrolled", value: "Uncontrolled" }] },
        { key: "severity", label: "Severity of Current Episode", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Life-threatening", value: "Critical" }] },
        { key: "pftSummary", label: "Spirometry / PFT Summary", type: "textarea", rows: 2, placeholder: "FEV1, FVC, FEV1/FVC, bronchodilator reversibility (>=12%?), PEFR, if age >5-6 years" },
        { key: "imagingSummary", label: "Imaging Summary (CXR/CT)", type: "textarea", rows: 2, placeholder: "Consolidation, hyperinflation, atelectasis, bronchial wall thickening, bronchiectasis, collapse, masses, congenital anomalies" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Synthesis of history, triggers, exam, PFT, and imaging findings" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Step-up/step-down asthma therapy per GINA (ICS dose, LABA, LTRA), antibiotics for infection, bronchodilators, chest physiotherapy, airway clearance (CF), home O2, NIV" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. CXR, CBC, CRP, sputum C/S, ABG, sweat chloride, PFT, FeNO, bronchoscopy, BAL, allergy testing (RAST/skin prick), CT chest, pH probe (GERD), ciliary biopsy" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text", placeholder: "Drug name" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Inhaler (pMDI + spacer)", value: "Inhaler" }, { label: "Nebulized", value: "Nebulized" }, { label: "Oral", value: "Oral" }, { label: "IV", value: "IV" }, { label: "SC", value: "SC" }] },
            { key: "frequency", label: "Frequency", type: "text" },
          ],
        },
        { key: "o2Ventilation", label: "O2 / Ventilation Plan", type: "textarea", rows: 1, placeholder: "Target SpO2 >=94%, O2 delivery method (nasal cannula, mask, HFNC), NIV settings if required" },
        { key: "inhalerTechnique", label: "Inhaler Technique Check / Device Education", type: "boolean" },
        { key: "actionPlan", label: "Written Asthma Action Plan Given", type: "boolean" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Allergy, ENT (polyps/sinusitis), GI (GERD), physiotherapy (airway clearance), nutrition, Sleep lab (if OSA), CF center" },
        { key: "patientEducation", label: "Parent Education", type: "textarea", rows: 2, placeholder: "Inhaler technique, trigger avoidance, smoking cessation counseling (household), symptom diary, when to seek emergency care" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks, 1 month (PFT), 3 months (asthma control review), next RSV season" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive pediatric pulmonology consultation with growth assessment, respiratory exam, PFT/spirometry review, asthma control assessment, and management of chronic respiratory conditions",
    specialties: ["Pediatric Pulmonology"],
    status: "active",
  },
};


export const PAED_PULMO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "paed-pulmo-followup",
  name: "Pediatric Pulmonology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes — cough frequency, wheeze, exercise tolerance, night symptoms, school absence, rescue bronchodilator use, exacerbations, medication adherence" },
        { key: "exacerbations", label: "Exacerbations Since Last Visit", type: "number", min: 0, placeholder: "Number requiring OCS/ED visit/admission" },
        { key: "rescueReliever", label: "Reliever Use (puffs/week)", type: "text", placeholder: "e.g. Salbutamol 2-3x/week" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good (>=80%)", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor (<=50%)", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects / Concerns", type: "textarea", rows: 1, placeholder: "Oral thrush, hoarseness, tremors, weight gain (OCS), inhaler technique issues" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "rr", label: "RR (/min)", type: "number" },
            { key: "spo2", label: "SpO2 (%)", type: "number" },
            { key: "pulse", label: "HR", type: "number" },
            { key: "weight", label: "Weight (kg)", type: "number" },
          ],
        },
        {
          key: "growth", label: "Growth Parameters", type: "section", fields: [
            { key: "height", label: "Height (cm)", type: "number" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
            { key: "heightCentile", label: "Height Centile", type: "text" },
          ],
        },
        { key: "exam", label: "Respiratory Exam", type: "textarea", rows: 2, placeholder: "Air entry, wheeze (presence/degree), crackles, retractions, chest shape, comparison to prior" },
        { key: "pftToday", label: "Spirometry / PFT Today", type: "textarea", rows: 2, placeholder: "FEV1, FVC, FEV1/FVC ratio, % predicted, change from baseline" },
        { key: "actScore", label: "ACT / cACT Score", type: "number", min: 0, max: 27, placeholder: "e.g. 20 (well controlled if >=20)" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "controlStatus", label: "Asthma Control (GINA)", type: "select", options: [{ label: "Well controlled", value: "WellControlled" }, { label: "Partially controlled", value: "PartiallyControlled" }, { label: "Uncontrolled", value: "Uncontrolled" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Response to therapy, control level, growth trend, adherence issues" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "Step up/down per GINA (ICS dose adjustment, add LABA/LTRA, biologic eligibility), OCS taper" },
        { key: "inhalerReview", label: "Inhaler Technique Reviewed", type: "boolean" },
        { key: "actionPlan", label: "Asthma Action Plan Updated", type: "boolean" },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 1, placeholder: "e.g. Spirometry, FeNO, allergy testing, IgE, sleep study, sweat chloride" },
        { key: "nextVisit", label: "Next Follow-up", type: "text", placeholder: "e.g. 1 month, 3 months, 6 months" },
        { key: "parentInstructions", label: "Parent / Patient Instructions", type: "textarea", rows: 1, placeholder: "Trigger avoidance, adherence reinforcement, warning signs, school letter for inhaler use" },
      ],
    },
  ],
  metadata: {
    description: "Follow-up for pediatric pulmonology patients — asthma control assessment (ACT), PFT trends, medication step-up/down, inhaler technique, and exacerbation tracking",
    specialties: ["Pediatric Pulmonology"],
    status: "active",
  },
};


export const PAED_PULMO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "paed-pulmo-admission",
  name: "Pediatric Pulmonology Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Acute severe asthma, respiratory distress with pneumonia, aspiration pneumonia, bronchiolitis, stridor with respiratory failure" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — onset, progression of respiratory distress, triggers, fever, feeding tolerance, prior treatment (inhalers, bronchodilators, OCS), response to ED therapy" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Asthma severity, prior PICU admissions, intubations, pneumonia, BPD/CLD, CF, GERD, aspiration, congenital lung lesions" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "ICS/LABA, OCS, bronchodilators, antibiotics, home O2, NIV" },
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
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "hr", label: "HR (bpm)", type: "number" },
            { key: "rr", label: "RR (/min)", type: "number" },
            { key: "spo2", label: "SpO2 (room air / on O2)", type: "number" },
            { key: "bp", label: "BP (mmHg)", type: "text" },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
          ],
        },
        { key: "respiratoryDistress", label: "Respiratory Distress Assessment", type: "section", fields: [
          { key: "retractions", label: "Retractions", type: "select", options: [{ label: "None", value: "None" }, { label: "Mild (subcostal)", value: "Mild" }, { label: "Moderate (intercostal)", value: "Moderate" }, { label: "Severe (supraclavicular + nasal flaring)", value: "Severe" }] },
          { key: "grunting", label: "Grunting", type: "boolean" },
          { key: "nasalFlaring", label: "Nasal Flaring", type: "boolean" },
          { key: "headBobbing", label: "Head Bobbing", type: "boolean" },
          { key: "accessoryMuscles", label: "Accessory Muscle Use", type: "boolean" },
        ] },
        { key: "chestExam", label: "Chest Examination", type: "textarea", required: true, rows: 3, placeholder: "Tracheal deviation, air entry (symmetry), wheeze (expiratory/inspiratory), crackles, cyanosis, PEFR (if cooperative, >6yr)" },
        { key: "otherSystems", label: "Other Systems", type: "textarea", rows: 2, placeholder: "CVS, ENT (stridor, nasal passages), abdomen, hydration status" },
        { key: "gasExchange", label: "Gas Exchange / ABG / PEFR", type: "textarea", rows: 2, placeholder: "ABG: pH, pCO2, pO2, HCO3. PEFR (% predicted for age/height). SpO2 trend" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity (Asthma/Pneumonia)", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Life-threatening / Impending respiratory failure", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CXR, CBC, CRP, blood culture, respiratory viral panel, ABG, sputum C/S, O2, bronchodilators, steroids" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Oxygen (target SpO2 >=94%), bronchodilators (salbutamol +- ipratropium nebulization q20min x3 then q1-4h), systemic corticosteroids (IV/PO), IV antibiotics (if pneumonia), magnesium sulfate (severe asthma), aminophylline, NIV/CPAP, intubation criteria" },
        { key: "monitoringPlan", label: "Monitoring Plan", type: "textarea", rows: 2, placeholder: "Continuous SpO2, cardiorespiratory monitoring, PEFR q1-4h (if >6yr), asthma severity scoring (PRAM/PASS), vitals q1-2h, strict I/O" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. PICU (if severe/life-threatening), respiratory therapy, physiotherapy (airway clearance)" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Pediatric Pulmonology — acute severe asthma, pneumonia, bronchiolitis, aspiration, and respiratory distress",
    specialties: ["Pediatric Pulmonology"],
    status: "active",
  },
};


export const PAED_PULMO_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "paed-pulmo-progress",
  name: "Pediatric Pulmonology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Breathing difficulty change, cough, wheeze, sputum, fever, feeding/activity tolerance, sleep" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 2, placeholder: "Respiratory distress episodes, bronchodilator frequency, O2 requirement changes, fever spikes" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "hr", label: "HR", type: "number" },
            { key: "rr", label: "RR", type: "number" },
            { key: "spo2", label: "SpO2 (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
          ],
        },
        {
          key: "respiratorySupport", label: "Respiratory Support", type: "section", fields: [
            { key: "o2Delivery", label: "O2 Delivery (device/LPM)", type: "text", placeholder: "e.g. Nasal cannula 1 LPM" },
            { key: "o2Target", label: "SpO2 Target", type: "number", placeholder: "e.g. >=94%" },
            { key: "pefr", label: "PEFR (% pred) — if applicable", type: "number" },
          ],
        },
        { key: "exam", label: "Respiratory Exam", type: "textarea", rows: 2, placeholder: "Work of breathing, air entry, wheeze/crackles change, retractions, cyanosis" },
        { key: "labs", label: "Labs / ABG / CXR Today", type: "textarea", rows: 2, placeholder: "Trend — ABG (pH/pCO2), CRP, WBC, CXR changes, culture results" },
      ],
    },
    {
      key: "plan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 2, placeholder: "Clinical trajectory — respiratory status, O2 requirement trend, treatment response" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "Bronchodilator weaning, steroid course duration, antibiotic adjustments, O2 weaning, discharge criteria (off O2, tolerating feeds, stable vitals)" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning — weaning O2", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Pediatric Pulmonology inpatients — respiratory status, O2 requirement, bronchodilator frequency, ABG trends, and discharge planning",
    specialties: ["Pediatric Pulmonology"],
    status: "active",
  },
};
