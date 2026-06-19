import type { TemplateDefinition } from "../templateSchema";

export const PSYCH_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "psych-consult",
  name: "Psychiatry OPD Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Low mood, anxiety, hallucinations, sleep disturbance, suicidal thoughts, memory loss, substance use" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 weeks, recurring episodes over 2 years" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Onset (acute/insidious), precipitating factors, symptom progression, impact on function (occupational/social/self-care), prior episodes, treatment history (medications/ECT/therapy/duration/response/adherence)" },
        { key: "moodSymptoms", label: "Mood Symptoms", type: "textarea", rows: 2, placeholder: "Low mood/depression, anhedonia, hopelessness, guilt, irritability, elevated mood, grandiosity, decreased need for sleep, racing thoughts" },
        { key: "anxietySymptoms", label: "Anxiety / Panic Symptoms", type: "textarea", rows: 2, placeholder: "Anxiety (generalized/situational), panic attacks, agoraphobia, social anxiety, OCD (obsessions/compulsions), PTSD (re-experiencing/avoidance/hyperarousal)" },
        { key: "psychoticSymptoms", label: "Psychotic Symptoms", type: "textarea", rows: 2, placeholder: "Delusions (persecutory/grandiose/referential/ somatic), hallucinations (auditory/visual/ tactile/command), thought disorder, catatonia" },
        { key: "cognitiveSymptoms", label: "Cognitive Symptoms", type: "textarea", rows: 2, placeholder: "Memory loss, confusion, disorientation, attention/concentration deficits, executive dysfunction" },
        { key: "sleepAppetite", label: "Sleep & Appetite", type: "text", placeholder: "Insomnia/hypersomnia, early morning awakening, nightmares; appetite changes, weight change" },
        { key: "riskAssessment", label: "Risk Assessment", type: "textarea", rows: 2, placeholder: "Suicidal ideation (passive/active, plan/intent/means), self-harm, homicidal ideation, impulsivity, substance use — current and past" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Head injury, seizures, CVA, thyroid disease, HIV, sleep apnea, chronic pain; psychiatric hospitalizations" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 1 },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Antidepressants, antipsychotics, mood stabilizers, anxiolytics, hypnotics, stimulants. Include doses, duration, adherence" },
        { key: "substanceHistory", label: "Substance Use History", type: "textarea", rows: 2, placeholder: "Alcohol, tobacco, cannabis, opioids, stimulants, benzodiazepines — substance, quantity, frequency, last use, prior detox/treatment" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Psychiatric disorders (depression, bipolar, schizophrenia, suicide), substance use in first-degree relatives" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Living situation, marital status, education, employment, legal issues, social support, stressors, childhood history (trauma/abuse)" },
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
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalAppearance", label: "General Appearance & Behavior", type: "textarea", rows: 2, placeholder: "Appearance (grooming/dress), eye contact, psychomotor (retardation/agitation), rapport, cooperation, mannerisms, tics" },
        {
          key: "mentalStateExam", label: "Mental State Examination (MSE)", type: "section", fields: [
            { key: "speech", label: "Speech", type: "text", placeholder: "Rate (normal/pressured/poverty), volume, tone, articulation, latency, spontaneity" },
            { key: "mood", label: "Mood & Affect", type: "text", placeholder: "Subjective mood; objective affect (congruent/incongruent, restricted/blunted/labile/flat)" },
            { key: "thoughtForm", label: "Thought Form", type: "text", placeholder: "Goal-directed, circumstantial, tangential, flight of ideas, loosening of associations, thought blocking" },
            { key: "thoughtContent", label: "Thought Content", type: "text", placeholder: "Delusions (type/systematization), obsessions, ruminations, phobias, overvalued ideas" },
            { key: "perception", label: "Perception", type: "text", placeholder: "Hallucinations (modality/command/commentary), illusions, depersonalization, derealization" },
            { key: "cognition", label: "Cognition", type: "text", placeholder: "Orientation x3, attention (serial 7s), memory (immediate/recent/remote), concentration, MMSE/MoCA score" },
            { key: "insight", label: "Insight", type: "select", options: [{ label: "Full — recognizes illness and need for Rx", value: "Full" }, { label: "Partial — acknowledges symptoms but not illness", value: "Partial" }, { label: "Poor — denies illness", value: "Poor" }] },
            { key: "judgment", label: "Judgment", type: "select", options: [{ label: "Intact", value: "Intact" }, { label: "Impaired", value: "Impaired" }] },
          ],
        },
        { key: "suicideRisk", label: "Suicide / Self-Harm Risk Assessment", type: "select", options: [{ label: "Low — no ideation/plan/intent", value: "Low" }, { label: "Moderate — passive ideation, no plan", value: "Moderate" }, { label: "High — active ideation with plan/intent", value: "High" }, { label: "Imminent — plan + means + intent", value: "Imminent" }] },
        { key: "physicalExam", label: "Focused Physical / Neurological Exam", type: "textarea", rows: 1, placeholder: "Extrapyramidal symptoms (EPS), tardive dyskinesia (AIMS), thyroid, CVS (QTc monitoring)" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis (DSM-5 / ICD-10)", type: "text", required: true, placeholder: "e.g. Major Depressive Disorder (moderate), Generalized Anxiety Disorder, Schizophrenia, Bipolar I disorder (current episode manic)" },
        { key: "icdCode", label: "ICD-10 Code", type: "text", placeholder: "e.g. F32.1, F41.1, F20.9" },
        {
          key: "diagnoses", label: "Comorbid Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
          ],
        },
        { key: "severity", label: "Severity / Rating Scales", type: "text", placeholder: "e.g. PHQ-9 18 (moderate depression), GAD-7 14, YMRS 28 (manic), CGI-S 4" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis — diagnosis, risk, functional impact, formulation" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Pharmacotherapy (medication choice/starting dose/titration plan), psychotherapy (CBT/DBT/IPT/psychodynamic), ECT/rTMS (if indicated), lifestyle modification, social intervention" },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Starting Dose/Target", type: "text" },
            { key: "frequency", label: "Frequency", type: "text" },
            { key: "titration", label: "Titration Schedule", type: "text", placeholder: "e.g. Start 25mg, increase by 25mg q3-5d" },
          ],
        },
        { key: "therapyPlan", label: "Therapy / Counseling Plan", type: "textarea", rows: 2, placeholder: "Refer for CBT, frequency of sessions, therapy goals, family therapy, couples counseling" },
        { key: "safetyPlan", label: "Safety Plan", type: "textarea", rows: 2, placeholder: "Crisis hotline, emergency contact, when to go to ER, remove means (if suicide risk), family involvement" },
        { key: "investigations", label: "Investigations / Monitoring", type: "textarea", rows: 1, placeholder: "CBC, LFT, TFT, RFT, ECG (QTc), drug levels (lithium/valproate), BMI, HbA1c, lipids (metabolic monitoring)" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Clinical psychologist, addiction services, crisis team, social work, occupational therapy, rehabilitation" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 1 week / 2 weeks / 1 month / crisis plan in interim" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Psychiatry with full MSE, risk assessment, and treatment planning (DSM-5 aligned)",
    specialties: ["Psychiatry"],
    status: "active",
  },
};


export const PSYCH_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "psych-followup",
  name: "Psychiatry Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes, mood, anxiety, psychotic symptoms, sleep, appetite, side effects, medication adherence, functioning" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good (≥80%)", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor (<50%)", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 2, placeholder: "EPS, weight gain, sedation, sexual dysfunction, nausea, headache, QT prolongation risk" },
        { key: "riskUpdate", label: "Risk Update", type: "textarea", rows: 1, placeholder: "Suicidal ideation, self-harm, substance use, impulsivity since last visit" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals / Metabolic", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "weight", label: "Weight", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "mse", label: "Focused MSE", type: "textarea", rows: 2, placeholder: "Changes in appearance, behavior, mood, thought, perception, cognition compared to baseline" },
        { key: "labResults", label: "Lab / Drug Level Results", type: "text", placeholder: "e.g. Lithium 0.6 mEq/L, QTc 440ms, weight +2kg" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "treatmentResponse", label: "Treatment Response", type: "select", options: [{ label: "Full remission", value: "Remission" }, { label: "Partial response", value: "Partial" }, { label: "Minimal response", value: "Minimal" }, { label: "No response / Worsening", value: "None" }, { label: "Relapse", value: "Relapse" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 3, placeholder: "Synthesis of interval history, MSE, and treatment response" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "Continue current, dose adjustment, switch medication, add augmentation, taper plan" },
        { key: "therapyPlan", label: "Therapy / Counseling Update", type: "textarea", rows: 1, placeholder: "Continue/modify therapy frequency" },
        { key: "safetyPlan", label: "Safety Plan Review", type: "textarea", rows: 1, placeholder: "Update crisis plan as needed" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 week / 2 weeks / 1 month / 3 months" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Psychiatry with treatment response tracking, side effect management, and safety planning",
    specialties: ["Psychiatry"],
    status: "active",
  },
};


export const PSYCH_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "psych-admission",
  name: "Psychiatry IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint (by patient / informant)", type: "textarea", required: true, rows: 2, placeholder: "e.g. Suicidal attempt, acute mania, psychosis, severe depression with refusal to eat" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — reason for admission, mode of arrival (voluntary/involuntary), collateral history source, acute deterioration timeline" },
        { key: "collateralHistory", label: "Collateral History (from informant)", type: "textarea", rows: 2, placeholder: "Information from family/friends — symptom details, adherence, behavior changes, risk" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "psychiatricHistory", label: "Psychiatric History", type: "textarea", rows: 2, placeholder: "Prior admissions (voluntary/involuntary), diagnoses, prior treatments, suicide attempts, response to treatment" },
        { key: "medicalHistory", label: "Medical History", type: "textarea", rows: 2 },
        { key: "substanceHistory", label: "Substance Use History", type: "textarea", rows: 2, placeholder: "Current/recent use, withdrawal risk, prior detox" },
        { key: "medications", label: "Outpatient Medications", type: "textarea", rows: 2 },
        { key: "legalStatus", label: "Legal / Admission Status", type: "select", options: [{ label: "Voluntary", value: "Voluntary" }, { label: "Involuntary (sectioned)", value: "Involuntary" }, { label: "Emergency detention", value: "Emergency" }] },
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
            { key: "weight", label: "Weight", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "mse", label: "Mental State Exam on Admission", type: "textarea", required: true, rows: 3, placeholder: "Full MSE — appearance, behavior, speech, mood, affect, thought form/content, perception, cognition, insight, judgment" },
        { key: "riskOnAdmission", label: "Risk on Admission", type: "textarea", rows: 2, placeholder: "Suicide risk, self-harm, aggression, absconding risk, vulnerability — detailed assessment" },
        { key: "physicalExam", label: "Physical / Neurological Exam", type: "textarea", rows: 1, placeholder: "EPS, AIMS, metabolic panel baseline" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity / Acuity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical — risk of harm", value: "Critical" }] },
        { key: "wardType", label: "Ward / Observation Level", type: "select", options: [{ label: "Open ward", value: "Open" }, { label: "Locked ward / high dependency", value: "Locked" }, { label: "ICU / medical clearance pending", value: "ICU" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. Baseline labs, ECG, drug levels, QTc monitoring, observation level, sedation PRN" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Medication initiation/continuation, PRN sedation protocol, monitoring (vitals/weight/QTc/labs), ECT planning, psychotherapy, occupational therapy, de-escalation strategies" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Internal medicine (medical clearance), neurology (seizures), social work, addiction services, psychology" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Psychiatry — acute crisis, suicide risk, psychosis, mania, severe depression, involuntary admissions",
    specialties: ["Psychiatry"],
    status: "active",
  },
};


export const PSYCH_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "psych-progress",
  name: "Psychiatry Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "patientReport", label: "Patient Report", type: "textarea", required: true, rows: 2, placeholder: "Subjective state, mood, sleep, appetite, side effects, any concerns" },
        { key: "nursingReport", label: "Nursing / Ward Observation", type: "textarea", rows: 2, placeholder: "Behavior on ward, engagement, sleep pattern, eating, social interaction, compliance, PRN frequency" },
        { key: "eventsOvernight", label: "Events Overnight / Incidents", type: "textarea", rows: 1, placeholder: "Aggression, self-harm, falls, refusal of medication, absconding attempt" },
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
            { key: "weight", label: "Weight", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "mse", label: "MSE Today", type: "textarea", rows: 2, placeholder: "Changes from admission MSE — appearance, behavior, mood, thought, perception, cognition, insight" },
        { key: "observations", label: "Observations", type: "text", placeholder: "Observation level, engagement in activities, self-care" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, response to treatment, risk assessment update" },
        { key: "riskReassessment", label: "Risk Reassessment", type: "select", options: [{ label: "Low", value: "Low" }, { label: "Moderate", value: "Moderate" }, { label: "High", value: "High" }, { label: "Imminent", value: "Imminent" }] },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", rows: 2, placeholder: "Medication adjustments, observation level, activity plan, ECT schedule, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Psychiatry inpatients with MSE, risk reassessment, and observation level tracking",
    specialties: ["Psychiatry"],
    status: "active",
  },
};
