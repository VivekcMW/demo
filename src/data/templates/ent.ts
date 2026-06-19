import type { TemplateDefinition } from "../templateSchema";

export const ENT_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "ent-consult",
  name: "ENT OPD Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Ear discharge, hearing loss, nasal obstruction, sore throat, hoarseness, vertigo, sinus pain, snoring" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 1 week, chronic recurrent" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Ear: hearing loss (conductive/sensorineural), discharge (color/odor/duration), tinnitus, otalgia, itching. Nose: obstruction, discharge (anterior/posterior), epistaxis, sinus pain, anosmia, sneezing. Throat: sore throat, dysphagia (solids/liquids), hoarseness, globus sensation, cough, halitosis, neck mass" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Allergic rhinitis, sinusitis, tonsillitis, OSA, DM, HTN, asthma, GERD, bleeding disorders" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Tonsillectomy, adenoidectomy, septoplasty, FESS, mastoidectomy, tympanoplasty, thyroid surgery" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Antihistamines, nasal sprays, decongestants, antibiotics, anticoagulants" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Seasonal allergies, drug allergies, contrast allergy" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Hearing loss, allergic rhinitis, head & neck cancers" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, occupation (noise exposure), voice abuse" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Constitutional, ENT, respiratory, neurological (vertigo, tinnitus, facial nerve)" },
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
        {
          key: "earExam", label: "Ear Examination", type: "section", fields: [
            { key: "rePinna", label: "RE — Pinna & Canal", type: "text", placeholder: "Normal, discharge, swelling, tenderness, foreign body, wax" },
            { key: "reTympanic", label: "RE — Tympanic Membrane", type: "text", placeholder: "Intact, perforation (central/marginal/attic), retraction, bulging, fluid level, cholesteatoma, myringosclerosis" },
            { key: "lePinna", label: "LE — Pinna & Canal", type: "text" },
            { key: "leTympanic", label: "LE — Tympanic Membrane", type: "text" },
          ],
        },
        {
          key: "hearingTest", label: "Hearing Test (Tuning Fork)", type: "section", fields: [
            { key: "rinneRe", label: "Rinne RE", type: "select", options: [{ label: "Positive", value: "Positive" }, { label: "Negative", value: "Negative" }, { label: "Not done", value: "NA" }] },
            { key: "weber", label: "Weber", type: "select", options: [{ label: "Central", value: "Central" }, { label: "Lateralizes RE", value: "LRE" }, { label: "Lateralizes LE", value: "LLE" }] },
            { key: "rinneLe", label: "Rinne LE", type: "select", options: [{ label: "Positive", value: "Positive" }, { label: "Negative", value: "Negative" }, { label: "Not done", value: "NA" }] },
          ],
        },
        {
          key: "noseExam", label: "Nasal Examination", type: "section", fields: [
            { key: "external", label: "External", type: "text", placeholder: "Shape, deformity, tenderness, mass" },
            { key: "anteriorRhinoscopy", label: "Anterior Rhinoscopy", type: "text", placeholder: "Nasal mucosa (color, edema), septum (deviation, perforation), turbinates (hypertrophy), polyps, discharge, crusting, bleeding site" },
            { key: "nasalEndoscopy", label: "Nasal Endoscopy (if done)", type: "text", placeholder: "Middle meatus, osteomeatal complex, adenoids, choana" },
          ],
        },
        {
          key: "throatExam", label: "Oral Cavity & Throat", type: "section", fields: [
            { key: "oralCavity", label: "Oral Cavity", type: "text", placeholder: "Buccal mucosa, palate, tongue, floor of mouth, teeth/hygiene" },
            { key: "oropharynx", label: "Oropharynx", type: "text", placeholder: "Tonsils (size/erythema/exudates), pillars, posterior pharyngeal wall" },
            { key: "larynx", label: "Larynx (if visualized)", type: "text", placeholder: "Epiglottis, arytenoids, vocal cords (mobility, lesions, edema)" },
          ],
        },
        { key: "neckExam", label: "Neck Exam", type: "textarea", rows: 1, placeholder: "Lymphadenopathy (level/size/consistency), thyroid, trachea, neck masses, bruit" },
        { key: "cranialNerves", label: "Cranial Nerve Exam (VII, VIII, IX, X, XII)", type: "text", placeholder: "Facial nerve (House-Brackmann), hearing, gag, tongue" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Chronic suppurative otitis media (CSOM), Allergic rhinitis, Tonsillitis, Laryngopharyngeal reflux" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
          ],
        },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Medical (antibiotics, antifungals, steroids, antihistamines, nasal spray, ear drops), surgical (myringotomy, tympanoplasty, FESS, tonsillectomy, septoplasty)" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. Pure tone audiometry, tympanometry, CT paranasal sinus, CT temporal bone, MRI IAM, nasal endoscopy biopsy, sleep study" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Oral", value: "Oral" }, { label: "Topical (ear drops)", value: "TopicalEar" }, { label: "Topical (nasal spray)", value: "TopicalNasal" }, { label: "Topical (throat)", value: "TopicalThroat" }, { label: "IV", value: "IV" }] },
            { key: "frequency", label: "Frequency", type: "text" },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 2, placeholder: "Ear/nose hygiene, smoking cessation, voice rest, sinus precautions, CPAP compliance" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Audiology, speech therapy, allergy clinic, sleep medicine, oncology" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 1 week / 1 month / audiology review / post-op day 7" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for ENT — ear, nose, throat, and head & neck examination",
    specialties: ["ENT"],
    status: "active",
  },
};


export const ENT_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "ent-followup",
  name: "ENT Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes since last visit — ear discharge, hearing, nasal obstruction, throat pain, hoarseness, vertigo" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 1, placeholder: "Nasal spray irritation, ENT medication side effects" },
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
        { key: "entExam", label: "Focused ENT Exam", type: "textarea", rows: 2, placeholder: "Changes from prior visit — ear canal status, TM, nasal cavity, throat, neck" },
        { key: "audiogram", label: "Audiogram / Tympanometry (if done)", type: "text", placeholder: "e.g. PTA: RE 35dB, LE 25dB — mild CHL" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diseaseStatus", label: "Disease Status", type: "select", options: [{ label: "Improved", value: "Improved" }, { label: "Stable", value: "Stable" }, { label: "Worsened", value: "Worsened" }, { label: "Recurrence", value: "Recurrence" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2 },
        { key: "surgeryPlan", label: "Surgery / Procedure Plan", type: "textarea", rows: 1, placeholder: "e.g. Septoplasty scheduled, myringotomy needed" },
        { key: "investigations", label: "Investigations Due", type: "text", placeholder: "e.g. CT PNS, audiometry, sleep study" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 2 weeks / 1 month / post-op review" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for ENT patients with symptom tracking and hearing assessment",
    specialties: ["ENT"],
    status: "active",
  },
};


export const ENT_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "ent-admission",
  name: "ENT IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Peritonsillar abscess, epistaxis requiring packing, stridor, orbital complications of sinusitis" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative of the acute ENT presentation" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "ENT conditions, DM, HTN, asthma, bleeding disorders, OSA" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Anticoagulants, antiplatelets, steroids, inhalers" },
        { key: "entHistory", label: "ENT Surgical History", type: "textarea", rows: 2 },
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
          ],
        },
        { key: "generalExam", label: "General / Airway Exam", type: "textarea", rows: 1, placeholder: "Stridor, trismus, neck swelling, lymphadenopathy, airway patency" },
        { key: "entExam", label: "Detailed ENT Exam", type: "textarea", required: true, rows: 2, placeholder: "Ears, nose, oral cavity, oropharynx, larynx, neck findings relevant to admission" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical — airway concern", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC, coagulation profile, imaging (CT/MRI), IV antibiotics, airway evaluation" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "IV antibiotics, airway management, surgical intervention (I&D, tonsillectomy, packing, tracheostomy), steroids" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Anesthesia (airway assessment), interventional radiology, oncology" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for ENT — peritonsillar abscess, airway obstruction, epistaxis, orbital cellulitis, mastoiditis",
    specialties: ["ENT"],
    status: "active",
  },
};


export const ENT_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "ent-progress",
  name: "ENT Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Pain, bleeding, discharge, breathing, swallowing, voice" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 1, placeholder: "Airway concerns, bleeding from packing/site, fever" },
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
            { key: "spo2", label: "SpO₂", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
          ],
        },
        { key: "exam", label: "Focused ENT Exam", type: "textarea", rows: 2, placeholder: "Airway patency, wound/packing site, drainage, neck swelling, oral cavity, nasal cavity" },
        { key: "labs", label: "Key Labs", type: "text", placeholder: "e.g. WBC trend, Hb, cultures" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, response to treatment, airway safety" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", rows: 2, placeholder: "Antibiotics, packing removal timing, I&D site care, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for ENT inpatients with airway, infection, and post-surgical monitoring",
    specialties: ["ENT"],
    status: "active",
  },
};


export const ENT_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "ent-procedure",
  name: "ENT Procedure / Surgery Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. FESS, Septoplasty, Tonsillectomy, Tympanoplasty, Mastoidectomy, Myringotomy + grommet insertion, Tracheostomy, Thyroidectomy, Parotidectomy, Direct laryngoscopy + biopsy" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpPrep", label: "Pre-Op Preparation", type: "textarea", rows: 2, placeholder: "Antibiotic prophylaxis, anticoagulation management, imaging reviewed, blood products arranged" },
        { key: "anesthesiaPlan", label: "Anesthesia Plan", type: "select", options: [{ label: "GA", value: "GA" }, { label: "LA", value: "LA" }, { label: "LA + sedation", value: "LASedation" }] },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. OT, ENT procedure room" },
        { key: "surgeon", label: "Surgeon", type: "text" },
        { key: "findings", label: "Findings", type: "textarea", required: true, rows: 4, placeholder: "Detailed intra-operative findings — anatomy, extent of disease, bleeding, approach" },
        { key: "procedureDetails", label: "Procedure Details", type: "textarea", rows: 3, placeholder: "Step-by-step description — incisions, approaches, instruments, resection, reconstruction, packing" },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "e.g. Polyps, tonsils, tissue biopsy" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Bleeding, nerve injury, CSF leak, infection, airway complication, dental injury" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Extubated, vitals stable, airway patent, packing in situ" },
        { key: "postOpOrders", label: "Post-Op Orders", type: "textarea", rows: 2, placeholder: "IV antibiotics, analgesia, antiemetics, wound care, packing care, diet, activity, neck observation" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Ward", value: "Ward" }, { label: "ICU/HDU", value: "ICU" }, { label: "Daycare", value: "Daycare" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "textarea", rows: 1, placeholder: "Packing removal date, suture removal, histopathology follow-up, next review" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive operative note for ENT surgeries — FESS, septoplasty, tonsillectomy, tympanoplasty, mastoidectomy, tracheostomy, thyroid/parotid surgery, laryngoscopy",
    specialties: ["ENT"],
    status: "active",
  },
};
