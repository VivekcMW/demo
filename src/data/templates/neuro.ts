import type { TemplateDefinition } from "../templateSchema";

export const NEURO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "neuro-consult",
  name: "Neurology Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Headache, weakness, seizures, dizziness, tremors, falls" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 days, progressive over 3 months" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Onset (acute/insidious), progression (improving/worsening/fluctuating), associated symptoms, prior episodes, triggers" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Stroke, TIA, seizures, migraine, Parkinson's, dementia, DM, HTN, CAD" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Neurosurgery, carotid endarterectomy, spine surgery" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Antiepileptics, antiparkinsonian, anticoagulants, antidepressants" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Stroke, epilepsy, neurodegenerative disorders" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, occupation, driving, living situation, fall risk" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "Constitutional, CVS, respiratory, GI, GU, musculoskeletal, skin" },
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
            { key: "temp", label: "Temp (°C)", type: "number", min: 30, max: 45 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Head circumference, neck stiffness, carotid bruits, skin lesions (neurocutaneous)" },
        {
          key: "cranialNerves", label: "Cranial Nerves", type: "section",
          fields: [
            { key: "II", label: "II — Visual acuity, fields, fundoscopy", type: "text", placeholder: "Normal / abnormal" },
            { key: "III_IV_VI", label: "III, IV, VI — EOM, pupils", type: "text", placeholder: "PERRLA, EOM full, nystagmus" },
            { key: "V", label: "V — Trigeminal", type: "text", placeholder: "Facial sensation, masseter strength" },
            { key: "VII", label: "VII — Facial", type: "text", placeholder: "Symmetric, forehead sparing (UMN vs LMN)" },
            { key: "VIII", label: "VIII — Acoustic", type: "text", placeholder: "Hearing, Rinne, Weber" },
            { key: "IX_X", label: "IX, X — Glossopharyngeal, Vagus", type: "text", placeholder: "Gag, palatal elevation, voice" },
            { key: "XI", label: "XI — Accessory", type: "text", placeholder: "Shrug, head rotation" },
            { key: "XII", label: "XII — Hypoglossal", type: "text", placeholder: "Tongue protrusion" },
          ],
        },
        {
          key: "motorExam", label: "Motor Examination", type: "section",
          fields: [
            { key: "tone", label: "Tone", type: "text", placeholder: "Normal, spastic, rigid, hypotonic" },
            { key: "power", label: "Power (MRC scale)", type: "text", placeholder: "e.g. 5/5 all limbs" },
            { key: "reflexes", label: "Deep Tendon Reflexes", type: "text", placeholder: "Biceps, triceps, knee, ankle — normal/brisk/absent, plantars" },
            { key: "coordination", label: "Coordination", type: "text", placeholder: "Finger-nose, heel-shin, gait, Romberg, tremor" },
            { key: "sensation", label: "Sensation", type: "text", placeholder: "Light touch, pain, temperature, vibration, proprioception" },
          ],
        },
        { key: "gait", label: "Gait & Balance", type: "textarea", rows: 1, placeholder: "Normal, ataxic, hemiparetic, Parkinsonian, unable to assess" },
        { key: "mentalStatus", label: "Mental Status / Cognition", type: "textarea", rows: 2, placeholder: "MMSE/MoCA score, orientation, language, memory, attention" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Acute ischemic stroke, Generalized epilepsy, Migraine without aura" },
        { key: "icdCode", label: "ICD-10 Code", type: "text", placeholder: "e.g. I63.9, G40.3, G43.0" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating",
          fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Differential", value: "Differential" }] },
          ],
        },
        { key: "nhssScore", label: "NIHSS / Seizure Type / Severity Score", type: "text", placeholder: "e.g. NIHSS 12" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis of history, localization, and investigation findings" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Acute management (thrombolysis, antiseizure), maintenance therapy, lifestyle advice" },
        {
          key: "investigations", label: "Investigations", type: "repeating",
          fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. CT head, MRI brain, EEG, LP, NCV/EMG" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating",
          fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "frequency", label: "Frequency", type: "select", options: [{ label: "OD", value: "OD" }, { label: "BD", value: "BD" }, { label: "TDS", value: "TDS" }, { label: "QID", value: "QID" }, { label: "HS", value: "HS" }] },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 2, placeholder: "e.g. Neurosurgery, rehabilitation, physiotherapy, speech therapy" },
        { key: "patientEducation", label: "Patient Education", type: "textarea", rows: 2, placeholder: "Driving restrictions, seizure precautions, stroke warning signs, fall prevention" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks / 1 month / PRN" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Neurology with detailed neurological exam",
    specialties: ["Neurology"],
    status: "active",
  },
};


export const NEURO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "neuro-followup",
  name: "Neurology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes, seizure frequency (if epilepsy), new symptoms, medication tolerance" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good (≥80%)", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 1, placeholder: "Drowsiness, dizziness, nausea, tremor, gait instability" },
        { key: "fallsSinceLastVisit", label: "Falls Since Last Visit", type: "number", min: 0, max: 100 },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "neuroExam", label: "Focused Neurological Exam", type: "textarea", rows: 2, placeholder: "Changes from baseline in tone, power, reflexes, gait, cognition" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 3, placeholder: "Disease control status, progression, treatment response" },
        { key: "diseaseStatus", label: "Disease Status", type: "select", options: [{ label: "Stable / Well-controlled", value: "Stable" }, { label: "Improving", value: "Improving" }, { label: "Worsening / Progressive", value: "Worsening" }, { label: "Relapse / Flare", value: "Relapse" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 3, placeholder: "Dose adjustments, drug changes, new prescriptions" },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 2, placeholder: "MRI, EEG, LP, drug levels, NCV/EMG" },
        { key: "therapyReferrals", label: "Therapy / Referrals", type: "textarea", rows: 2, placeholder: "Physiotherapy, occupational therapy, speech therapy, neuropsychology" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 month / 3 months / 6 months" },
      ],
    },
  ],
  metadata: {
    description: "Focused follow-up note for Neurology patients with disease control and medication review",
    specialties: ["Neurology"],
    status: "active",
  },
};


export const NEURO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "neuro-admission",
  name: "Neurology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Acute onset right-sided weakness and slurred speech since 3 hours" },
        { key: "onset", label: "Onset & Progression", type: "select", options: [{ label: "Sudden / Acute (<24h)", value: "Acute" }, { label: "Subacute (1-7 days)", value: "Subacute" }, { label: "Gradual / Progressive (>1 week)", value: "Gradual" }, { label: "Fluctuating / Episodic", value: "Fluctuating" }] },
        { key: "lastKnownWell", label: "Last Known Well", type: "text", placeholder: "For stroke — date/time last seen normal" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative including deficit onset, progression, associated symptoms" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Stroke/TIA, seizures, DM, HTN, AF, CAD, hyperlipidemia" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Antiplatelets, anticoagulants, antiepileptics, statins" },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }] },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
            { key: "rr", label: "RR", type: "number", min: 0, max: 80 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp (°C)", type: "number", min: 30, max: 45 },
            { key: "rbs", label: "RBS (mg/dL)", type: "number", min: 0, max: 1000 },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Neck stiffness, carotid bruits, skin, tongue" },
        { key: "neuroExam", label: "Neurological Exam", type: "textarea", required: true, rows: 3, placeholder: "Cranial nerves, motor (MRC power), sensory, reflexes, coordination, gait, NIHSS score if stroke" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "nhssScore", label: "NIHSS / Clinical Score", type: "text", placeholder: "e.g. NIHSS 14 at presentation" },
        { key: "thrombolysisCandidate", label: "Thrombolysis / Thrombectomy Candidate", type: "select", options: [{ label: "Not applicable", value: "NA" }, { label: "Yes — within window", value: "Yes" }, { label: "Outside window / contraindicated", value: "No" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating",
          fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CT head, MRI brain, ECG, labs, IV access" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Thrombolysis/thrombectomy, antithrombotic, seizure management, BP targets, glucose control, DVT prophylaxis" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Neurosurgery, physiotherapy, speech therapy, rehabilitation" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Neurology — stroke, seizures, and other acute neurological conditions",
    specialties: ["Neurology"],
    status: "active",
  },
};


export const NEURO_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "neuro-progress",
  name: "Neurology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Neurological deficit changes, seizure activity, headache, new symptoms" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 2, placeholder: "Seizures, falls, confusion, aspiration, fever" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "spo2", label: "SpO₂", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
          ],
        },
        { key: "neuroExam", label: "Focused Neuro Exam", type: "textarea", required: true, rows: 3, placeholder: "Change in NIHSS, power, cranial nerves, GCS, comparison to prior exam" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, response to treatment, concerns" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "Medication changes, investigations, rehabilitation plan, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
        { key: "mfesScore", label: "Modified Rankin / mRS", type: "select", options: [{ label: "0 — No symptoms", value: "0" }, { label: "1 — No significant disability", value: "1" }, { label: "2 — Slight disability", value: "2" }, { label: "3 — Moderate disability", value: "3" }, { label: "4 — Moderately severe", value: "4" }, { label: "5 — Severe disability", value: "5" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Neurology inpatients with NIHSS/mRS tracking and focused neuro exam",
    specialties: ["Neurology"],
    status: "active",
  },
};


export const NEURO_DISCHARGE_TEMPLATE: TemplateDefinition = {
  id: "neuro-discharge",
  name: "Neurology Discharge Summary",
  type: "Discharge",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "admissionSummary",
      label: "Admission Summary",
      fields: [
        { key: "admissionDate", label: "Admission Date", type: "date" },
        { key: "dischargeDate", label: "Discharge Date", type: "date" },
        { key: "admissionDiagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "dischargeDiagnosis", label: "Diagnosis at Discharge", type: "textarea", required: true, rows: 2 },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "hospitalCourse", label: "Hospital Course Summary", type: "textarea", required: true, rows: 4, placeholder: "Brief narrative of the admission, treatments, interventions, response, and outcomes" },
      ],
    },
    {
      key: "outcome",
      label: "Outcome",
      fields: [
        { key: "dischargeNeurologicalStatus", label: "Neurological Status at Discharge", type: "textarea", required: true, rows: 2, placeholder: "Residual deficits, NIHSS/mRS score, functional status" },
        { key: "dischargeDisposition", label: "Discharge Disposition", type: "select", options: [{ label: "Home — independent", value: "HomeIndependent" }, { label: "Home — with caregiver", value: "HomeCaregiver" }, { label: "Rehabilitation facility", value: "Rehab" }, { label: "Transferred to other service", value: "Transfer" }, { label: "LAMA / DAMA", value: "LAMA" }, { label: "Expired", value: "Expired" }] },
        { key: "functionalScore", label: "mRS / Functional Score at Discharge", type: "select", options: [{ label: "0", value: "0" }, { label: "1", value: "1" }, { label: "2", value: "2" }, { label: "3", value: "3" }, { label: "4", value: "4" }, { label: "5", value: "5" }, { label: "6 (Deceased)", value: "6" }] },
      ],
    },
    {
      key: "dischargePlan",
      label: "Discharge Plan",
      fields: [
        { key: "medications", label: "Medications at Discharge", type: "textarea", required: true, rows: 3, placeholder: "Drug, dose, frequency, duration for each discharge medication" },
        { key: "followUp", label: "Follow-up Instructions", type: "textarea", required: true, rows: 2, placeholder: "Next visit with Neurology, when, where" },
        { key: "dietActivity", label: "Diet & Activity Advice", type: "textarea", rows: 2, placeholder: "Diet (modified texture if dysphagia), fall precautions, driving restrictions" },
        { key: "rehabPlan", label: "Rehabilitation Plan", type: "textarea", rows: 2, placeholder: "Physiotherapy, occupational therapy, speech therapy, swallowing therapy" },
        { key: "warningSigns", label: "Warning Signs to Watch For", type: "textarea", rows: 2, placeholder: "Stroke recurrence signs, seizure recurrence, medication side effects, when to return" },
        { key: "pendingAppointments", label: "Pending Appointments / Investigations", type: "textarea", rows: 2, placeholder: "MRI, EEG, LP, sleep study, follow-up with other specialists" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive discharge summary for Neurology inpatients with functional outcome and rehabilitation plan",
    specialties: ["Neurology"],
    status: "active",
  },
};
