import type { TemplateDefinition } from "../templateSchema";

export const ONCOLOGY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "oncology-consult",
  name: "Oncology Consult (Medical/Surgical/Radiation)",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. New lump, weight loss, bleeding, pain, incidental finding on imaging" },
        { key: "duration", label: "Duration of Symptoms", type: "text", placeholder: "e.g. 3 months, progressive" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Onset and progression, B-symptoms (fever, night sweats, weight loss — quantifiable), pain (site/character/severity), bleeding, obstructive symptoms, functional decline, ECOG performance status" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Prior malignancies, DM, HTN, CKD, COPD, hepatitis B/C, HIV, immunosuppression" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Prior tumor resections, biopsies, reconstructions, ostomies" },
        { key: "cancerHistory", label: "Cancer-Specific History", type: "textarea", rows: 3, placeholder: "Primary site, histology, grade/stage at diagnosis, prior treatments (surgery, chemotherapy, radiation, targeted/immunotherapy), dates, response, complications" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Chemotherapy agents, targeted therapy, immunotherapy, supportive meds (antiemetics, G-CSF, analgesics, anticoagulants)" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Chemotherapy allergies, contrast allergy, antibiotic allergies" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "First-degree relatives with malignancy — type, age at diagnosis, genetic syndromes (BRCA, HNPCC, FAP, etc.)" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking (pack-years), alcohol, occupation (carcinogen exposure), living situation, caregiver support" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "Constitutional, pain, bleeding, neurological, respiratory, GI, GU, MSK — focus on metastatic symptoms" },
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
            { key: "height", label: "Height (cm)", type: "number", min: 0, max: 300 },
            { key: "bsa", label: "BSA (m²)", type: "number", readOnly: true },
          ],
        },
        { key: "generalAppearance", label: "General Appearance", type: "textarea", rows: 1, placeholder: "Cachexia, pallor, icterus, lymphadenopathy (cervical/supraclavicular/axillary/inguinal — site, size, consistency, fixity)" },
        { key: "ecogPs", label: "ECOG Performance Status", type: "select", options: [{ label: "0 — Fully active", value: "0" }, { label: "1 — Restricted", value: "1" }, { label: "2 — Ambulatory, self-care", value: "2" }, { label: "3 — Limited self-care", value: "3" }, { label: "4 — Disabled", value: "4" }, { label: "5 — Dead", value: "5" }] },
        {
          key: "localExam", label: "Local / Site-Specific Exam", type: "section", fields: [
            { key: "primarySite", label: "Primary Site Exam", type: "textarea", rows: 1, placeholder: "Breast, thyroid, head & neck, rectal, skin — based on tumor location" },
            { key: "lymphNodes", label: "Lymph Node Basins", type: "textarea", rows: 1, placeholder: "Palpable nodes — site, size, number, consistency, fixity" },
          ],
        },
        { key: "systemicExam", label: "Systemic Exam", type: "textarea", rows: 2, placeholder: "CVS, respiratory, abdomen (organomegaly, ascites, masses), CNS (focal deficits, cord compression signs), MSK" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "text", required: true, placeholder: "e.g. Invasive ductal carcinoma left breast cT2N1M0, Stage IIB" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "tumorStage", label: "TNM / Stage (AJCC)", type: "text", placeholder: "e.g. cT2N1M0, Stage IIB, Grade 3" },
        { key: "histology", label: "Histology / Molecular Markers", type: "textarea", rows: 1, placeholder: "e.g. ER+/PR+/HER2-, Ki67 30%, IDH-wildtype, MSI-H, BRAF V600E" },
        {
          key: "comorbidities", label: "Comorbidities & Risk Factors", type: "repeating", fields: [
            { key: "condition", label: "Condition", type: "text" },
            { key: "impact", label: "Impact on Treatment", type: "select", options: [{ label: "None", value: "None" }, { label: "Monitor", value: "Monitor" }, { label: "Dose adjust", value: "DoseAdjust" }, { label: "Contraindication", value: "Contraindication" }] },
          ],
        },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis — tumor characteristics, treatment history, current status" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatmentIntent", label: "Treatment Intent", type: "select", options: [{ label: "Curative", value: "Curative" }, { label: "Neoadjuvant", value: "Neoadjuvant" }, { label: "Adjuvant", value: "Adjuvant" }, { label: "Palliative", value: "Palliative" }, { label: "Surveillance", value: "Surveillance" }] },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", required: true, rows: 4, placeholder: "Surgery, chemotherapy regimen, radiation plan, targeted/immunotherapy, hormonal therapy, clinical trials — including cycles and schedule" },
        {
          key: "investigations", label: "Investigations / Staging", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. PET-CT, MRI, CT chest/abdomen/pelvis, tumor markers, biopsy, NGS panel" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Chemotherapy / Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug / Regimen", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "route", label: "Route", type: "select", options: [{ label: "IV", value: "IV" }, { label: "Oral", value: "Oral" }, { label: "SC", value: "SC" }, { label: "IM", value: "IM" }] },
            { key: "cycle", label: "Cycle / Schedule", type: "text", placeholder: "e.g. Day 1 q3w" },
          ],
        },
        { key: "supportiveCare", label: "Supportive Care", type: "textarea", rows: 2, placeholder: "Antiemetics, G-CSF, growth factors, transfusion plan, pain management, antiemetic prophylaxis, bisphosphonates" },
        { key: "toxicityMonitoring", label: "Toxicity Monitoring Plan", type: "textarea", rows: 2, placeholder: "CBC, LFT, RFT, ECG/Echo, neuropathy assessment, dermatology review" },
        { key: "referrals", label: "MDT / Referrals", type: "textarea", rows: 2, placeholder: "e.g. Surgical oncology, radiation oncology, tumor board, genetic counseling, palliative care, nutrition, psychology" },
        { key: "followUp", label: "Follow-up / Next Cycle", type: "text", placeholder: "e.g. Day 1 next cycle, 2 weeks, 3 months" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive oncology consultation covering medical, surgical, and radiation oncology — staging, treatment intent, and multidisciplinary planning",
    specialties: ["Oncology"],
    status: "active",
  },
};


export const ONCOLOGY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "oncology-followup",
  name: "Oncology Follow-up / On-Treatment Review",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History / Cycle Review", type: "textarea", required: true, rows: 3, placeholder: "Treatment tolerance, side effects (CTCAE grading), new symptoms, pain control, functional status (ECOG)" },
        { key: "toxicityReview", label: "Toxicity Review", type: "textarea", rows: 2, placeholder: "Nausea/vomiting, mucositis, diarrhea, fatigue, neuropathy, hand-foot syndrome, febrile neutropenia, bleeding, rash" },
        { key: "medicationAdherence", label: "Medication Adherence (Oral Targeted/HT)", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
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
            { key: "weight", label: "Weight", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "ecog", label: "ECOG PS", type: "select", options: [{ label: "0", value: "0" }, { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }] },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Tumor site exam, lymph nodes, skin toxicity, oral mucosa, neurological deficit" },
        { key: "labs", label: "Lab Results (CBC, CMP, tumor markers)", type: "textarea", rows: 2, placeholder: "Hb, WBC, ANC, platelets, Cr, LFT, Ca, tumor marker trend" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "treatmentResponse", label: "Treatment Response Assessment", type: "select", options: [{ label: "Complete response (CR)", value: "CR" }, { label: "Partial response (PR)", value: "PR" }, { label: "Stable disease (SD)", value: "SD" }, { label: "Progressive disease (PD)", value: "PD" }, { label: "Too early / Not yet assessed", value: "NotAssessed" }] },
        { key: "toxicityGrade", label: "Significant Toxicity (CTCAE Grade ≥3)", type: "textarea", rows: 2, placeholder: "List any grade 3+ adverse events and management" },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 3, placeholder: "Synthesis of treatment response, toxicity, and plan" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "nextCycle", label: "Next Cycle / Treatment Decision", type: "textarea", rows: 2, placeholder: "Continue current regimen, dose reduction, delay (reason), switch regimen, hold for toxicity, imaging for response assessment" },
        { key: "doseModification", label: "Dose Modification", type: "text", placeholder: "e.g. Reduce chemo by 25%, hold immunotherapy" },
        { key: "supportiveCare", label: "Supportive Care Changes", type: "textarea", rows: 2, placeholder: "Antiemetic escalation, growth factor support, transfusion, pain management adjustment" },
        { key: "investigations", label: "Investigations Due", type: "text", placeholder: "e.g. PET-CT after cycle 3, tumor markers, echo, CT chest" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. Day 1 of cycle 4, 3 weeks, 3 months surveillance" },
      ],
    },
  ],
  metadata: {
    description: "On-treatment follow-up note — cycle review, toxicity assessment (CTCAE), response evaluation, and dose adjustment",
    specialties: ["Oncology"],
    status: "active",
  },
};


export const ONCOLOGY_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "oncology-admission",
  name: "Oncology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Febrile neutropenia, uncontrolled pain, hypercalcemia, cord compression, dyspnea" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — current episode, relation to chemo cycle, infection signs, bleeding, pain crisis, neurological symptoms" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "cancerDiagnosis", label: "Cancer Diagnosis & Stage", type: "textarea", rows: 2, placeholder: "Primary site, histology, stage, current treatment line/regimen" },
        { key: "lastTreatment", label: "Last Treatment Date", type: "text", placeholder: "e.g. Chemo cycle 2 day 1 on 2026-06-01" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Current chemo, supportive meds, steroids, anticoagulants" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
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
            { key: "spo2", label: "SpO₂", type: "number", min: 0, max: 100 },
            { key: "weight", label: "Weight", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 2, placeholder: "ECOG PS, pallor, petechiae, ecchymosis, lymphadenopathy, oral mucositis, hydration, skin rash" },
        { key: "systemicExam", label: "Systemic Exam", type: "textarea", rows: 2, placeholder: "CVS, respiratory (Crackles? Effusion?), abdomen (Organomegaly? Ascites?), CNS (Focal deficit? Cord compression signs?)" },
        { key: "infectionFocus", label: "Infection Focus Assessment", type: "textarea", rows: 1, placeholder: "Chest, urine, skin/IV site, oral, perianal — culture results pending" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Admission Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity / Acuity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "anc", label: "ANC / Neutropenia Grade", type: "text", placeholder: "e.g. ANC 200 (Grade 4 febrile neutropenia)" },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC with diff, blood cultures, CXR, CT scan, chemotherapy hold" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "IV antibiotics (febrile neutropenia protocol), G-CSF, IV fluids, pain management, electrolyte correction, transfusion, hold chemo" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Infectious disease, palliative care, radiation oncology, pain service" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Oncology — febrile neutropenia, oncologic emergencies, toxicity admissions, pain crisis",
    specialties: ["Oncology"],
    status: "active",
  },
};


export const ONCOLOGY_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "oncology-progress",
  name: "Oncology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Pain, fever, nausea/vomiting, diarrhea, dyspnea, bleeding, new deficits" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 1, placeholder: "Fever spikes, transfusion reaction, pain crisis, falls" },
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
            { key: "spo2", label: "SpO₂", type: "number", min: 0, max: 100 },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Mucositis, skin toxicity, lung auscultation, abdominal exam, neuro status" },
        { key: "labs", label: "Key Labs Today", type: "text", placeholder: "e.g. ANC 1500 ↑, Hb 8.5, Plt 45K, Cr 0.8" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, infection status, toxicity recovery, discharge planning" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", rows: 2, placeholder: "Antibiotics, G-CSF, transfusion, pain management, chemo hold/restart decision" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Oncology inpatients — infection monitoring, toxicity management, and treatment planning",
    specialties: ["Oncology"],
    status: "active",
  },
};


export const ONCOLOGY_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "oncology-procedure",
  name: "Oncology Procedure Note (Chemotherapy / Biopsy / Port Insertion)",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Chemotherapy administration cycle 3, Port-a-Cath insertion, Core needle biopsy, Ommaya reservoir tap, Bone marrow biopsy & aspiration" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpAssessment", label: "Pre-Procedure Assessment", type: "textarea", rows: 2, placeholder: "CBC (ANC ≥1500, platelets ≥100K), KFT, LFT, ECOG PS, allergies, IV access" },
        { key: "preMedication", label: "Pre-Medication Given", type: "textarea", rows: 1, placeholder: "Antiemetics (NK1 RA, 5HT3 RA, dexamethasone), antihistamines, hydration" },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. Chemo daycare, OT, procedure room" },
        { key: "administeredBy", label: "Administered By", type: "text" },
        { key: "regimenDetails", label: "Regimen Details", type: "textarea", required: true, rows: 3, placeholder: "Drug names, doses, route, infusion duration, sequence, diluent, rate" },
        { key: "ivAccess", label: "IV Access Used", type: "select", options: [{ label: "Peripheral IV", value: "Peripheral" }, { label: "PICC line", value: "PICC" }, { label: "Port-a-Cath", value: "Port" }, { label: "Hickman", value: "Hickman" }] },
        { key: "vitalsMonitoring", label: "Vitals During Procedure", type: "textarea", rows: 1, placeholder: "BP, HR, O2 sat pre/during/post, any infusion reactions" },
        { key: "complications", label: "Complications / Reactions", type: "textarea", rows: 2, placeholder: "Infusion reaction (grade, management given), extravasation, allergic reaction, anaphylaxis, hypotension" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery / Tolerance", type: "textarea", rows: 1, placeholder: "Tolerated well, post-hydration given, vitals stable" },
        { key: "postOpOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "Antiemetics at home, G-CSF start date, mouth care, infection precautions, when to call" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Discharged home", value: "Home" }, { label: "Observe 4-6 hrs", value: "Observe" }, { label: "Admitted", value: "Admitted" }] },
        { key: "nextAppointment", label: "Next Appointment", type: "text", placeholder: "e.g. Next cycle day 1, 3 weeks, nadir check CBC in 7 days" },
      ],
    },
  ],
  metadata: {
    description: "Procedure note for chemotherapy administration, port insertion, tumor biopsy, and other oncology procedures with toxicity monitoring",
    specialties: ["Oncology"],
    status: "active",
  },
};
