import type { TemplateDefinition } from "../templateSchema";

export const ENDO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "endo-consult",
  name: "Endocrinology Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Poor glycemic control, thyroid mass, weight gain, osteoporosis, PCOS" },
        { key: "presentIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Complete history with timeline, prior workup, treatments tried" },
        { key: "dmHistory", label: "Diabetes History", type: "section", fields: [
          { key: "type", label: "Type", type: "select", options: [{ label: "Type 1", value: "T1DM" }, { label: "Type 2", value: "T2DM" }, { label: "GDM", value: "GDM" }, { label: "MODY / other", value: "Other" }, { label: "Not diabetic", value: "NA" }] },
          { key: "duration", label: "Duration (years)", type: "number", min: 0 },
          { key: "recentHba1c", label: "Recent HbA1c (%)", type: "number", min: 3, max: 20 },
          { key: "complications", label: "Diabetes Complications", type: "multiselect", options: [
            { label: "Retinopathy", value: "Retinopathy" }, { label: "Nephropathy", value: "Nephropathy" },
            { label: "Neuropathy", value: "Neuropathy" }, { label: "CAD", value: "CAD" },
            { label: "PVD", value: "PVD" }, { label: "Diabetic foot", value: "Foot" },
          ] },
          { key: "currentTreatment", label: "Current Diabetes Treatment", type: "textarea", rows: 2, placeholder: "Oral drugs, insulin type/dose, GLP-1 RA, SGLT2i" },
        ] },
        { key: "thyroidHistory", label: "Thyroid History", type: "section", fields: [
          { key: "condition", label: "Condition", type: "select", options: [{ label: "Hypothyroidism", value: "Hypo" }, { label: "Hyperthyroidism", value: "Hyper" }, { label: "Nodule / Goiter", value: "Nodule" }, { label: "Thyroid cancer", value: "Cancer" }, { label: "Normal", value: "Normal" }] },
          { key: "currentTreatment", label: "Current Treatment", type: "text", placeholder: "e.g. Levothyroxine 100mcg OD" },
          { key: "recentTSH", label: "Recent TSH (mIU/L)", type: "number", min: 0, max: 100 },
        ] },
        { key: "otherEndoHistory", label: "Other Endocrine History", type: "textarea", rows: 2, placeholder: "Osteoporosis, PCOS, adrenal, pituitary, calcium disorders, lipid disorders" },
        { key: "medications", label: "All Current Medications", type: "textarea", rows: 2 },
        { key: "familyHistory", label: "Family History (endocrine)", type: "textarea", rows: 1, placeholder: "DM, thyroid, osteoporosis, endocrine tumors" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals & Anthropometry", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number" },
          { key: "weight", label: "Weight (kg)", type: "number" },
          { key: "height", label: "Height (cm)", type: "number" },
          { key: "bmi", label: "BMI", type: "number", readOnly: true },
          { key: "waistCircumference", label: "Waist Circumference (cm)", type: "number" },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Goiter, thyroid nodule, acanthosis nigricans, hirsutism, striae, pigmentation, fat distribution" },
        { key: "thyroidExam", label: "Thyroid Examination", type: "textarea", rows: 2, placeholder: "Palpable, size, consistency, nodule characteristics, bruit, lymph nodes" },
        { key: "diabeticFootExam", label: "Diabetic Foot Exam", type: "textarea", rows: 2, placeholder: "Inspection, monofilament, pulses, deformities, ulcers" },
        { key: "otherExam", label: "Other System Exam", type: "textarea", rows: 2, placeholder: "CVS, eyes (fundoscopy), neurological, skin" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "e.g. E11.9 — T2DM with complications, E03.9 — Hypothyroidism" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "glycemicControl", label: "Glycemic Control Assessment", type: "select", options: [{ label: "Excellent — HbA1c <7", value: "Excellent" }, { label: "Good — HbA1c 7-8", value: "Good" }, { label: "Fair — HbA1c 8-9", value: "Fair" }, { label: "Poor — HbA1c >9", value: "Poor" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 3, placeholder: "Adjustments to anti-diabetic, thyroid, osteoporosis, or other endocrine medications" },
        { key: "investigations", label: "Investigations Ordered", type: "textarea", rows: 2, placeholder: "HbA1c, CMP, lipid panel, TSH, TFTs, cortisol, calcium/vit D, DXA scan, thyroid USG" },
        { key: "lifestyleModification", label: "Lifestyle Modification Advice", type: "textarea", rows: 2, placeholder: "Diet, exercise, weight management, smoking cessation" },
        { key: "monitoringPlan", label: "Monitoring & Follow-up", type: "textarea", rows: 2, placeholder: "Self-monitoring, follow-up interval, HbA1c target, annual complication screening" },
        { key: "referrals", label: "Referrals", type: "text", placeholder: "Ophthalmology (retina screen), podiatry, dietetics, cardiology" },
        { key: "patientEducation", label: "Patient Education Provided", type: "textarea", rows: 2, placeholder: "Hypoglycemia awareness, sick day rules, medication adherence, foot care" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive endocrinology consultation covering diabetes, thyroid, metabolic bone disease, and other endocrine disorders",
    specialties: ["Endocrinology"],
    status: "active",
  },
};


export const ENDO_DIABETES_TEMPLATE: TemplateDefinition = {
  id: "endo-diabetes",
  name: "Diabetes Focused Visit",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Glycemic control, hypoglycemic episodes, medication adherence, diet, activity, weight changes" },
        { key: "symptoms", label: "Hyper/Hypoglycemic Symptoms", type: "textarea", rows: 2, placeholder: "Polyuria, polydipsia, weight loss, blurred vision, fatigue, hypoglycemia episodes" },
        { key: "drugChanges", label: "Medication Changes Since Last Visit", type: "textarea", rows: 2 },
        { key: "selfMonitoring", label: "Self-Monitoring Glucose Log", type: "textarea", rows: 2, placeholder: "Fasting range, post-prandial range, hypoglycemia events" },
        { key: "complicationReview", label: "Complication Screening Review", type: "textarea", rows: 2, placeholder: "Vision, feet, renal, cardiovascular — any new issues?" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number" },
          { key: "weight", label: "Weight (kg)", type: "number" },
          { key: "bmi", label: "BMI", type: "number", readOnly: true },
        ] },
        { key: "footExam", label: "Foot Examination", type: "textarea", rows: 1, placeholder: "Intact sensation, foot pulses, no ulcers" },
        { key: "recentLabs", label: "Recent Lab Results", type: "section", fields: [
          { key: "hba1c", label: "HbA1c (%)", type: "number", min: 3, max: 20 },
          { key: "fbs", label: "FBS (mg/dL)", type: "number", min: 30, max: 600 },
          { key: "ppbs", label: "PPBS (mg/dL)", type: "number" },
          { key: "egfr", label: "eGFR (mL/min)", type: "number", min: 0, max: 150 },
          { key: "acr", label: "Urine ACR (mg/g)", type: "number", min: 0 },
        ] },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "glycemicControl", label: "Glycemic Control", type: "select", options: [{ label: "At target", value: "Target" }, { label: "Above target — therapy intensification needed", value: "Above" }, { label: "Below target — de-intensify", value: "Below" }, { label: "Suboptimal — adherence/barriers identified", value: "Suboptimal" }] },
        { key: "medicationAdjustment", label: "Medication Adjustment", type: "textarea", rows: 2, placeholder: "Changes made to medications" },
        { key: "plan", label: "Plan", type: "textarea", rows: 3, placeholder: "Drug adjustments, insulin titration plan, lifestyle modification, follow-up interval" },
        { key: "nextHba1c", label: "Target HbA1c & Next Check", type: "text", placeholder: "e.g. Target <7%, check in 3 months" },
        { key: "complicationScreening", label: "Complication Screening Due", type: "textarea", rows: 1, placeholder: "Annual eye exam, foot exam, urine ACR, lipid profile" },
      ],
    },
  ],
  metadata: {
    description: "Focused diabetes management visit with glucose review, medication titration, and complication screening",
    specialties: ["Endocrinology"],
    status: "active",
  },
};


export const ENDO_THYROID_TEMPLATE: TemplateDefinition = {
  id: "endo-thyroid",
  name: "Thyroid Focused Assessment",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "complaint", label: "Reason for Visit", type: "textarea", required: true, rows: 2, placeholder: "e.g. Thyroid nodule follow-up, hyperthyroidism symptoms, hypothyroidism management" },
        { key: "symptoms", label: "Thyroid Symptoms", type: "multiselect", options: [
          { label: "Fatigue/lethargy", value: "Fatigue" }, { label: "Weight gain/loss", value: "Weight" },
          { label: "Heat/cold intolerance", value: "Temp" }, { label: "Palpitations/tremor", value: "Palpitations" },
          { label: "Hair loss", value: "HairLoss" }, { label: "Hoarseness", value: "Hoarseness" },
          { label: "Neck mass/discomfort", value: "NeckMass" }, { label: "Dysphagia", value: "Dysphagia" },
          { label: "Mood changes", value: "Mood" }, { label: "Menstrual changes", value: "Menses" },
        ] },
        { key: "currentMedication", label: "Current Thyroid Medication", type: "text", placeholder: "Drug and dose (e.g. Levothyroxine 100mcg OD, Carbimazole 10mg BD)" },
        { key: "adherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "intervalChanges", label: "Changes Since Last Visit", type: "textarea", rows: 2, placeholder: "Dose changes, symptoms, other medications started" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 30, max: 200 },
          { key: "weight", label: "Weight (kg)", type: "number" },
        ] },
        { key: "thyroidExam", label: "Thyroid Examination", type: "textarea", rows: 2, placeholder: "Inspection (Mass, asymmetry), palpation (size, consistency, nodule size/number, tenderness), auscultation (bruit)" },
        { key: "eyeExam", label: "Eye Exam (if hyperthyroid)", type: "textarea", rows: 1, placeholder: "Proptosis, lid lag, extraocular movements, corneal integrity" },
        { key: "labResults", label: "Lab Results", type: "section", fields: [
          { key: "tsh", label: "TSH (mIU/L)", type: "number", min: 0, max: 100 },
          { key: "ft4", label: "Free T4 (ng/dL)", type: "number" },
          { key: "ft3", label: "Free T3 (pg/mL)", type: "number" },
          { key: "antiTPO", label: "Anti-TPO Antibodies", type: "text", placeholder: "Negative / Positive (titer)" },
        ] },
        { key: "imaging", label: "Imaging (Thyroid USG / Nuclear Scan)", type: "textarea", rows: 2, placeholder: "Nodule characteristics (size, TIRADS), gland size, uptake pattern" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "text", required: true, placeholder: "e.g. E03.8 — Hypothyroidism, E05.0 — Graves disease" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "doseAdjustment", label: "Dose Adjustment", type: "textarea", rows: 2, placeholder: "New dose, titration plan, timing advice" },
        { key: "plan", label: "Management Plan", type: "textarea", rows: 3, placeholder: "Medication changes, follow-up interval, next labs, surgery/RIT referral if indicated" },
        { key: "nextTSH", label: "Next TSH Check", type: "text", placeholder: "e.g. 6 weeks, 3 months" },
        { key: "referrals", label: "Referrals", type: "text", placeholder: "Surgery (for nodules >4cm, suspicious cytology), ENT, ophthalmology" },
      ],
    },
  ],
  metadata: {
    description: "Focused thyroid assessment for hypo/hyperthyroidism management, nodule evaluation, and medication titration",
    specialties: ["Endocrinology"],
    status: "active",
  },
};


export const ENDO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "endo-followup",
  name: "Endocrinology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes, new complaints, medication adjustments, lifestyle changes" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "adverseEffects", label: "Side Effects / Intolerance", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number" },
          { key: "weight", label: "Weight (kg)", type: "number" },
        ] },
        { key: "focusedExam", label: "Focused Examination", type: "textarea", rows: 2, placeholder: "Findings relevant to the endocrine condition" },
        { key: "labs", label: "Current Lab Results", type: "textarea", rows: 2, placeholder: "Summarize relevant lab trends" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", rows: 2, placeholder: "Disease control status, progress, concerns" },
        { key: "ongoingPlan", label: "Ongoing Plan", type: "textarea", rows: 2, placeholder: "Continue management, medication adjustments, investigations" },
        { key: "nextVisit", label: "Next Follow-up", type: "text", placeholder: "e.g. 3 months / 6 months" },
      ],
    },
  ],
  metadata: {
    description: "General endocrinology follow-up for diabetes, thyroid, and other endocrine conditions",
    specialties: ["Endocrinology"],
    status: "active",
  },
};
