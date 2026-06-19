import type { TemplateDefinition } from "../templateSchema";

export const PAED_NEURO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "paed-neuro-consult",
  name: "Pediatric Neurology Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Seizures, headache, developmental delay, hypotonia, tics, movement disorder, gait abnormality, neuroregression" },
        { key: "age", label: "Age", type: "text", required: true, placeholder: "e.g. 18 months, 7 years" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. Since 6 months of age, acute onset 2 days ago" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Seizures (type, frequency, triggers, duration, post-ictal, antiepileptic response), headache (quality, severity, triggers, associated symptoms), developmental concerns (milestones attained, regression), hypotonia/weakness (distribution, progression), movement disorder (type, exacerbating factors)" },
        { key: "birthHistory", label: "Birth & Perinatal History", type: "textarea", rows: 2, placeholder: "Gestation, birth weight, mode of delivery, perinatal asphyxia, NICU stay, neonatal seizures, hypoglycemia, infection" },
        { key: "developmentalHistory", label: "Developmental History", type: "textarea", rows: 3, placeholder: "Gross motor (head control, sitting, walking), fine motor (pincer grasp), language (babbling, words, sentences), social (smile, play) — note regression if present" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Prior neuroimaging, EEG, meningitis/encephalitis, febrile seizures, head trauma, neurocutaneous markers (ash leaf, cafe au lait)" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Antiepileptics (drug, dose, level), steroids, immunomodulators, vitamins" },
        { key: "allergies", label: "Allergies", type: "text", placeholder: "Drug allergies" },
        { key: "immunizationStatus", label: "Immunization Status", type: "text", placeholder: "Up to date / delayed" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Epilepsy, febrile seizures, neurodevelopmental disorders, neuromuscular disease, consanguinity" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Sleep, feeding, vision, hearing, behavior, school performance" },
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
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "height", label: "Height / Length (cm)", type: "number" },
            { key: "headCircumference", label: "Head Circumference (cm)", type: "number", min: 20, max: 60 },
            { key: "hcCentile", label: "Head Circumference Centile", type: "text", placeholder: "e.g. 50th centile — macro/microcephaly" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Dysmorphic features, neurocutaneous stigmata (ash leaf spots, cafe au lait, Shagreen patch, port wine stain), scoliosis, joint contractures" },
        {
          key: "cranialNerves", label: "Cranial Nerves", type: "section", fields: [
            { key: "II", label: "II — Visual acuity, fundoscopy", type: "text", placeholder: "Normal, papilledema, optic atrophy, cherry red spot" },
            { key: "III_IV_VI", label: "III, IV, VI — Pupils, EOM", type: "text", placeholder: "PERRLA, full EOM, nystagmus, strabismus" },
            { key: "V", label: "V — Trigeminal", type: "text", placeholder: "Facial sensation, masseter" },
            { key: "VII", label: "VII — Facial", type: "text", placeholder: "Symmetric, forehead sparing" },
            { key: "VIII", label: "VIII — Acoustic (hearing)", type: "text", placeholder: "Response to sound, startle" },
            { key: "IX_X", label: "IX, X — Gag, swallow", type: "text", placeholder: "Gag reflex, swallowing, palate elevation" },
            { key: "XI_XII", label: "XI, XII — CN XI, XII", type: "text", placeholder: "Shoulder shrug, tongue protrusion" },
          ],
        },
        {
          key: "motorExam", label: "Motor Examination", type: "section", fields: [
            { key: "tone", label: "Tone", type: "text", placeholder: "Normal, hypotonic, spastic, rigid, dystonic" },
            { key: "power", label: "Power (MRC scale)", type: "text", placeholder: "e.g. 5/5 all limbs" },
            { key: "reflexes", label: "Deep Tendon Reflexes", type: "text", placeholder: "Biceps, triceps, knee, ankle — normal/brisk/absent, clonus, plantars" },
            { key: "coordination", label: "Coordination", type: "text", placeholder: "Finger-nose, heel-shin, dysdiadochokinesia, gait" },
            { key: "sensation", label: "Sensation", type: "text", placeholder: "Light touch, pain — age-appropriate" },
          ],
        },
        { key: "gait", label: "Gait / Mobility", type: "textarea", rows: 1, placeholder: "Normal, ataxic, spastic, waddling, toe-walking, not yet walking" },
        { key: "developmentalAssessment", label: "Developmental Assessment", type: "textarea", rows: 2, placeholder: "DASII / Denver / clinical assessment — developmental quotient / age-equivalent" },
        { key: "mentalStatus", label: "Mental Status / Behavior", type: "textarea", rows: 1, placeholder: "Alertness, attention, interaction, speech/language, behavior" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Childhood absence epilepsy, Spastic diplegic cerebral palsy, Duchenne muscular dystrophy, Autism spectrum disorder, Migraine without aura" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Differential", value: "Differential" }, { label: "Complication", value: "Complication" }] },
          ],
        },
        { key: "seizureClassification", label: "Seizure / Epilepsy Classification", type: "text", placeholder: "e.g. Focal onset aware, Generalized onset motor (tonic-clonic), Epileptic spasms" },
        { key: "severity", label: "Severity / Functional Status", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Profound", value: "Profound" }] },
        { key: "eegSummary", label: "EEG Summary", type: "textarea", rows: 2, placeholder: "Background, epileptiform discharges (focal/generalized), hypsarrhythmia, sleep architecture" },
        { key: "mriSummary", label: "MRI / Neuroimaging Summary", type: "textarea", rows: 2, placeholder: "Structural abnormalities, white matter changes, malformations of cortical development, demyelination" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Synthesis of history, exam, EEG, MRI, and developmental status" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Antiepileptic drug (choice, dose, titration), immunomodulators (steroids/IVIG), rehabilitation therapy, surgical options (epilepsy surgery, VNS) — weight-based dosing" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. EEG (routine/video/sleep-deprived), MRI brain, LP (CSF studies), metabolic screen, genetic testing (CMA/whole exome), NCS/EMG, drug levels" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Oral", value: "Oral" }, { label: "IV", value: "IV" }, { label: "PR", value: "PR" }, { label: "IM", value: "IM" }] },
            { key: "frequency", label: "Frequency", type: "text" },
          ],
        },
        { key: "rescueMeds", label: "Rescue Medication Plan", type: "textarea", rows: 1, placeholder: "e.g. Midazolam buccal/IN 0.3 mg/kg PRN for prolonged seizures >5 min" },
        { key: "therapies", label: "Therapies / Habilitations", type: "textarea", rows: 1, placeholder: "Physiotherapy, occupational therapy, speech therapy, behavioral therapy, special education" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Neurosurgery (epilepsy surgery/VNS), genetics, ophthalmology, audiology, orthopedics (contractures), developmental pediatrics, psychology" },
        { key: "patientEducation", label: "Parent Education", type: "textarea", rows: 2, placeholder: "Seizure first aid, medication adherence, sleep hygiene, school support, driving restrictions (older teens)" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 1 month for medication review, 3 months EEG, 6 months clinic" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive pediatric neurology consultation with developmental assessment, detailed neurological exam, EEG/MRI review, and management planning for seizures, neurodevelopmental disorders, and neuromuscular conditions",
    specialties: ["Pediatric Neurology"],
    status: "active",
  },
};


export const PAED_NEURO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "paed-neuro-followup",
  name: "Pediatric Neurology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Seizure frequency (calendar review), medication adherence, side effects, developmental progress, new symptoms, school performance, sleep/behavior" },
        { key: "seizureCount", label: "Seizures Since Last Visit", type: "number", min: 0, placeholder: "Total count" },
        { key: "breakthroughSeizures", label: "Breakthrough Seizures / Status", type: "textarea", rows: 1, placeholder: "Date, type, duration, rescue meds given, ED visits" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good (>=80%)", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 1, placeholder: "Drowsiness, dizziness, ataxia, rash, behavior change, weight gain/loss" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "pulse", label: "HR", type: "number" },
            { key: "weight", label: "Weight (kg)", type: "number" },
          ],
        },
        {
          key: "growth", label: "Growth", type: "section", fields: [
            { key: "headCircumference", label: "Head Circumference (cm)", type: "number" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
          ],
        },
        { key: "neuroExam", label: "Focused Neurological Exam", type: "textarea", rows: 2, placeholder: "Change from baseline — tone, power, reflexes, gait, coordination, cranial nerves" },
        { key: "developmentalCheck", label: "Developmental Check", type: "textarea", rows: 1, placeholder: "Milestones achieved since last visit, concerns" },
        { key: "eegResults", label: "EEG / Drug Levels / MRI Results", type: "textarea", rows: 1, placeholder: "Key results from interval investigations" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "seizureControl", label: "Seizure Control Status", type: "select", options: [{ label: "Seizure-free", value: "SeizureFree" }, { label: ">=50% reduction", value: "Improved" }, { label: "<50% reduction / no change", value: "Unchanged" }, { label: "Worsening", value: "Worsening" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Response to treatment, developmental trajectory, concerns" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "Dose adjustments (weight-based), new AED, weaning plan if seizure-free" },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 1, placeholder: "e.g. Drug levels, repeat EEG, MRI, genetic testing results pending" },
        { key: "therapies", label: "Therapy Adjustments", type: "textarea", rows: 1, placeholder: "PT/OT/SLT frequency changes, orthotics, school support" },
        { key: "nextVisit", label: "Next Follow-up", type: "text", placeholder: "e.g. 1 month / 3 months / 6 months" },
        { key: "parentInstructions", label: "Parent Instructions", type: "textarea", rows: 1, placeholder: "Seizure first aid review, rescue meds renewal, warning signs" },
      ],
    },
  ],
  metadata: {
    description: "Focused pediatric neurology follow-up with seizure tracking, developmental surveillance, medication review, and family support",
    specialties: ["Pediatric Neurology"],
    status: "active",
  },
};


export const PAED_NEURO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "paed-neuro-admission",
  name: "Pediatric Neurology Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Status epilepticus, altered sensorium, acute flaccid paralysis, headache with vomiting, seizures with fever, neuroregression" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. Started 1 hour ago, progressive over 3 days" },
        { key: "lastKnownWell", label: "Last Known Well (if acute)", type: "text", placeholder: "e.g. Playing normally until 2 hr ago" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — seizure type/duration/frequency, response to rescue meds, fever/meningeal signs, trauma, weakness progression, headache characteristics, vomiting" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Known epilepsy, neurodevelopmental disorder, cerebral palsy, prior admissions, meningitis, head trauma" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Antiepileptics (dose/frequency), last dose taken, rescue meds" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }] },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "HR", type: "number" },
            { key: "rr", label: "RR", type: "number" },
            { key: "spo2", label: "SpO2 (%)", type: "number" },
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "rbs", label: "RBS (mg/dL)", type: "number" },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number" },
            { key: "headCircumference", label: "Head Circumference (cm)", type: "number" },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Neck stiffness, Kernig/Brudzinski, neurocutaneous stigmata, hydration, trauma signs" },
        { key: "gcs", label: "GCS / Consciousness", type: "text", required: true, placeholder: "e.g. E4V5M6 = 15/15" },
        { key: "neuroExam", label: "Neurological Exam", type: "textarea", required: true, rows: 3, placeholder: "Cranial nerves, motor (MRC power), tone, reflexes, plantars, sensation, coordination, gait — detailed baseline" },
        { key: "meningealSigns", label: "Meningeal Signs", type: "text", placeholder: "Neck stiffness: present/absent. Kernig: +/-. Brudzinski: +/-" },
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
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CT/MRI brain, EEG, LP, CBC, RFT, LFT, blood/CSF cultures, metabolic panel, antiepileptic drug levels" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Antiepileptic protocol (IV lorazepam/midazolam/phenytoin/levetiracetam for status), acyclovir if encephalitis suspected, antibiotics for meningitis, IVIG/steroids for autoimmune, mannitol/hypertonic saline for raised ICP" },
        { key: "monitoring", label: "Monitoring Plan", type: "textarea", rows: 2, placeholder: "Vitals, GCS q1h, continuous video-EEG if status, seizure chart, strict I/O" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. PICU (if status/raised ICP), neurosurgery (if mass/hydrocephalus), ID, ophthalmoscopy" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Pediatric Neurology — status epilepticus, acute encephalopathy, meningitis/encephalitis, raised ICP, acute weakness",
    specialties: ["Pediatric Neurology"],
    status: "active",
  },
};


export const PAED_NEURO_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "paed-neuro-progress",
  name: "Pediatric Neurology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Seizure activity (any episodes overnight), headache, vomiting, weakness change, sensorium, fever" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 2, placeholder: "Seizures (number/type/duration), rescue meds given, LOC changes, agitation" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "HR", type: "number" },
            { key: "spo2", label: "SpO2", type: "number" },
            { key: "temp", label: "Temp", type: "number" },
          ],
        },
        { key: "gcs", label: "GCS Today", type: "text", placeholder: "e.g. E4V5M6 = 15" },
        { key: "neuroExam", label: "Focused Neuro Exam", type: "textarea", required: true, rows: 3, placeholder: "Change in GCS, power, cranial nerves, tone, reflexes, gait comparison from admission" },
        { key: "labs", label: "Labs / EEG / Imaging Today", type: "textarea", rows: 2, placeholder: "Trend — drug levels, lactate, imaging changes, EEG background" },
      ],
    },
    {
      key: "plan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 2, placeholder: "Clinical trajectory, response to treatment, seizure control, concerns" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", required: true, rows: 3, placeholder: "AED adjustments, weaning plan (IV to oral), discharge planning, rehabilitation needs" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Pediatric Neurology inpatients — GCS tracking, seizure monitoring, neuro exam trends, and discharge planning",
    specialties: ["Pediatric Neurology"],
    status: "active",
  },
};
