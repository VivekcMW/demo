import type { TemplateDefinition } from "../templateSchema";

export const NUCLEAR_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "nuclear-consult",
  name: "Nuclear Medicine Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Thyroid nodule / goiter for evaluation, hyperthyroidism (Graves'/toxic nodule), hypothyroidism, thyroid cancer follow-up, bone pain (metastatic evaluation), cardiac ischemia workup, renal function assessment, infection localization (fever of unknown origin), parathyroid adenoma localization, sentinel lymph node mapping" },
        { key: "referralReason", label: "Reason for Referral / Indication", type: "textarea", rows: 3, placeholder: "Referring physician's indication, prior imaging results, specific question to be answered (diagnosis/staging/therapy response/surveillance)" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 3, placeholder: "Symptom narrative, prior imaging (US/CT/MRI/PET findings), prior radionuclide studies, biopsy results, treatment history" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Thyroid disease, cardiac disease, renal disease, cancer history, diabetes, hypertension, osteoporosis, hyperparathyroidism, prior radiation exposure" },
        { key: "surgicalHistory", label: "Past Surgical History", type: "textarea", rows: 1, placeholder: "Thyroidectomy, parathyroidectomy, lymph node dissection, tumor resection, biopsy" },
        { key: "medications", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Levothyroxine, antithyroid drugs (methimazole/PTU), beta-blockers, amiodarone, NSAIDs, steroids, lithium, iodine-containing medications, metformin (holds for FDG PET), insulin" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Contrast allergy, iodine allergy, radiotracer allergy" },
        { key: "pregnancyStatus", label: "Pregnancy / Breastfeeding Status", type: "select", options: [{ label: "Not applicable", value: "NA" }, { label: "Not pregnant", value: "NotPregnant" }, { label: "Breastfeeding — will hold", value: "BreastfeedingHold" }, { label: "Pregnant — contraindicated", value: "Pregnant" }] },
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
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Thyroid palpation (size, nodule characteristics, tenderness, bruit), lymph node exam (neck, axilla, inguinal), surgical scars" },
        { key: "priorImaging", label: "Prior Imaging / Lab Review", type: "textarea", rows: 2, placeholder: "Thyroid US (nodule size/TIRADS), TSH, T4, T3, calcitonin, thyroglobulin, anti-TPO antibodies, calcium/PTH, creatinine/eGFR (for GFR study), blood glucose (for FDG PET), PSA, tumor markers" },
        { key: "focusedExam", label: "Focused Systemic Exam", type: "text", placeholder: "As relevant to indication — e.g. cardiac (for MUGA), bone pain sites, neurological deficits" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis / Indication", type: "text", required: true, placeholder: "e.g. Thyroid nodule (TIRADS 4), Graves' disease, Differentiated thyroid cancer s/p thyroidectomy, Metastatic prostate cancer, Suspected pheochromocytoma, Cardiac ischemia evaluation, Renal artery stenosis, Fever of unknown origin, Hyperparathyroidism" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
          ],
        },
        { key: "suitability", label: "Suitability for Nuclear Study", type: "select", options: [{ label: "Appropriate — proceed", value: "Appropriate" }, { label: "Equivocal — discuss with referring physician", value: "Equivocal" }, { label: "Not indicated — alternative recommended", value: "NotIndicated" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "recommendedStudy", label: "Recommended Radionuclide Study", type: "textarea", required: true, rows: 2, placeholder: "e.g. Tc-99m pertechnetate thyroid scan, I-123/I-131 whole body scan, Tc-99m MDP bone scan, FDG PET/CT, Tc-99m DTPA renogram, Tc-99m sestamibi parathyroid scan, Gallium-68 DOTATATE PET/CT, Tc-99m RBC GI bleed scan, V/Q scan, MUGA scan, I-131 therapy (hyperthyroidism/thyroid cancer), Lu-177 PRRT, Ra-223 dichloride" },
        { key: "radiotracer", label: "Radiotracer / Activity (mCi)", type: "text", placeholder: "e.g. Tc-99m 20 mCi, FDG 10 mCi, I-131 150 mCi" },
        { key: "patientPrep", label: "Patient Preparation", type: "textarea", rows: 2, placeholder: "Fasting (FDG — 6 hrs), hold metformin 48 hrs, hold thyroid hormone (for thyroid scan), low-iodine diet (for I-131 therapy), hold beta-blockers, hydration protocol, voiding instructions, stop breastfeeding, pregnancy test required" },
        { key: "medications", label: "Medications (Pre-/Post-Study)", type: "textarea", rows: 1, placeholder: "Pre-medication (Lugol's iodine for thyroid blockade during MIBG), antiemetics (for Lu-177), pain management, laxatives (for imaging)" },
        { key: "radiationSafety", label: "Radiation Safety Instructions", type: "textarea", rows: 2, placeholder: "Social distancing (post-therapy), avoid close contact with pregnant/children (duration), separate bathroom, sleep alone, return to work guidelines, hotline for questions, therapy counseling" },
        { key: "referrals", label: "Referrals / Multidisciplinary", type: "textarea", rows: 1, placeholder: "e.g. Endocrinology, oncology, radiation oncology, interventional radiology, pain clinic, nuclear cardiology" },
        { key: "followUp", label: "Follow-up / Next Study", type: "text", placeholder: "e.g. 1 week for scan results, 3 months for follow-up scan, 6 months for I-131 therapy assessment" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive consultation note for Nuclear Medicine — thyroid disorders, bone metastasis, cardiac imaging, renal function, infection localization, PET/CT, and theranostics",
    specialties: ["Nuclear Medicine"],
    status: "active",
  },
};


export const NUCLEAR_THERAPY_TEMPLATE: TemplateDefinition = {
  id: "nuclear-therapy",
  name: "Nuclear Medicine Therapy Note",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "therapyDetails",
      label: "Therapy Details",
      fields: [
        { key: "therapyType", label: "Therapy Type", type: "select", required: true, options: [
          { label: "I-131 Radioiodine (Hyperthyroidism — Graves'/toxic nodule)", value: "I131Hyperthyroid" },
          { label: "I-131 Radioiodine (Thyroid cancer ablation/therapy)", value: "I131Cancer" },
          { label: "Lu-177 DOTATATE PRRT (Neuroendocrine tumors)", value: "Lu177PRRT" },
          { label: "Lu-177 PSMA RLT (Prostate cancer)", value: "Lu177PSMA" },
          { label: "Ra-223 Dichloride (Bone metastases)", value: "Ra223" },
          { label: "I-131 MIBG (Neuroblastoma / pheochromocytoma)", value: "I131MIBG" },
          { label: "Y-90 SIRT/Radioembolization (Liver tumors)", value: "Y90SIRT" },
          { label: "Re-186 / Re-188 HEDP (Bone pain palliation)", value: "ReBonePain" },
        ] },
        { key: "dose", label: "Administered Activity (mCi / GBq)", type: "text", required: true, placeholder: "e.g. I-131 150 mCi (5.55 GBq), Lu-177 7.4 GBq (200 mCi)" },
        { key: "date", label: "Date of Therapy", type: "date", required: true },
        { key: "cycleNumber", label: "Cycle Number", type: "text", placeholder: "e.g. Cycle 1 of 4, Cycle 3 of 6" },
        { key: "physician", label: "Treating Nuclear Medicine Physician", type: "text", required: true },
        { key: "indication", label: "Indication for Therapy", type: "textarea", required: true, rows: 2 },
        { key: "priorTherapies", label: "Prior Therapies / Lines of Treatment", type: "textarea", rows: 2, placeholder: "Prior surgeries, external beam RT, chemotherapy, targeted therapy, immunotherapy, prior radionuclide therapy (cycle/dose/response/toxicity)" },
      ],
    },
    {
      key: "preTherapy",
      label: "Pre-Therapy Assessment",
      fields: [
        { key: "consentObtained", label: "Written Consent Obtained", type: "boolean", required: true },
        { key: "pregnancyTest", label: "Pregnancy Test (if applicable)", type: "select", options: [{ label: "Negative", value: "Negative" }, { label: "N/A — not of childbearing potential", value: "NA" }] },
        { key: "labs", label: "Pre-Therapy Labs", type: "textarea", rows: 2, placeholder: "CBC (Hb, ANC, Plt), renal (Cr, eGFR), liver (AST, ALT, ALP, bilirubin), thyroid function (TSH, T4, T3), tumor markers (thyroglobulin, PSA, chromogranin A)" },
        { key: "imagingReview", label: "Pre-Therapy Imaging Review", type: "textarea", rows: 2, placeholder: "Diagnostic scan/Dosimetry scan: uptake pattern, target-to-background ratio, dosimetry results (Gy to tumor/organ), disease progression assessment" },
        { key: "performanceStatus", label: "Performance Status (ECOG/KPS)", type: "select", options: [{ label: "ECOG 0 — Fully active", value: "0" }, { label: "ECOG 1 — Restricted", value: "1" }, { label: "ECOG 2 — Ambulatory >50%", value: "2" }, { label: "ECOG 3 — <50% bedridden", value: "3" }, { label: "ECOG 4 — Completely disabled", value: "4" }] },
        { key: "protectiveMeasures", label: "Protective / Supportive Measures", type: "textarea", rows: 2, placeholder: "Hydration protocol, antiemetics (ondansetron), dexamethasone, L-arginine/lysine (for Lu-177 PSMA renal protection), thyroid blockade (Lugol's/thyrosafe for I-131 MIBG), mouth care (ice chips), laxatives, pain control" },
      ],
    },
    {
      key: "administration",
      label: "Therapy Administration",
      fields: [
        { key: "adminRoute", label: "Route of Administration", type: "select", options: [{ label: "Oral capsule", value: "Oral" }, { label: "IV infusion", value: "IV" }, { label: "Slow IV push", value: "IVPush" }] },
        { key: "adminDateTime", label: "Date & Time of Administration", type: "text", required: true },
        { key: "adminDetails", label: "Administration Details", type: "textarea", rows: 2, placeholder: "Infusion rate, line patency, pre/post flush, patient tolerance, vital monitoring during infusion, adverse reactions" },
        { key: "tolerance", label: "Immediate Tolerance", type: "select", options: [{ label: "Well tolerated", value: "Well" }, { label: "Mild side effects", value: "Mild" }, { label: "Moderate — required intervention", value: "Moderate" }, { label: "Poor — therapy interrupted", value: "Poor" }] },
        { key: "immediateReactions", label: "Immediate Adverse Reactions", type: "textarea", rows: 1, placeholder: "Nausea, flushing, pain, hypotension, rash, radiation sickness" },
      ],
    },
    {
      key: "postTherapy",
      label: "Post-Therapy & Discharge",
      fields: [
        { key: "safetyInstructions", label: "Radiation Safety Instructions Given", type: "boolean", required: true },
        { key: "radiationSafety", label: "Radiation Precautions", type: "textarea", rows: 2, placeholder: "Dose rate at 1m, isolation duration, distance precautions, sleep alone, separate bathroom, avoid pregnant/children, duration of precautions (days)" },
        { key: "symptomManagement", label: "Expected Side Effects & Management", type: "textarea", rows: 2, placeholder: "Nausea/vomiting (antiemetics), fatigue, bone pain flare (analgesics), xerostomia (mouth care), myelosuppression (monitor CBC)" },
        { key: "followUpScan", label: "Post-Therapy Scan Date", type: "date" },
        { key: "nextCycle", label: "Next Cycle Date / Repeat Assessment", type: "text", placeholder: "e.g. Next cycle in 8 weeks, follow-up scan in 3 months" },
        { key: "referrals", label: "Referrals / Follow-up with", type: "textarea", rows: 1, placeholder: "e.g. Referring oncologist, endocrinology, medical oncology, multidisciplinary tumor board, radiation safety officer" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive therapy note for Nuclear Medicine radionuclide therapy — I-131, Lu-177 PRRT/PSMA, Ra-223, Y-90, and MIBG therapy with pre-therapy assessment, administration details, and radiation safety",
    specialties: ["Nuclear Medicine"],
    status: "active",
  },
};


export const NUCLEAR_SCAN_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "nuclear-scan-procedure",
  name: "Nuclear Medicine PET-CT / Scan Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Procedure Details",
      fields: [
        { key: "scanType", label: "Scan / Procedure Type", type: "select", required: true, options: [
          { label: "FDG PET/CT (Whole body)", value: "FDGPETCT" },
          { label: "Ga-68 DOTATATE PET/CT", value: "Ga68DOTATATE" },
          { label: "Ga-68 PSMA PET/CT", value: "Ga68PSMA" },
          { label: "F-18 NaF PET/CT (Bone)", value: "F18NaF" },
          { label: "F-18 Fluciclovine PET/CT", value: "F18Fluciclovine" },
          { label: "F-18 FET PET/CT (Brain tumors)", value: "F18FET" },
          { label: "Tc-99m MDP Bone scan (3-phase / whole body)", value: "Tc99mBone" },
          { label: "Tc-99m DTPA Renogram (diuretic renal scan)", value: "Tc99mRenal" },
          { label: "Tc-99m MAG3 Renal scan", value: "Tc99mMAG3" },
          { label: "Tc-99m Sestamibi Parathyroid scan", value: "Tc99mMIBI" },
          { label: "Tc-99m Pertechnetate Thyroid scan", value: "Tc99mThyroid" },
          { label: "Tc-99m RBC GI Bleed scan", value: "Tc99mGI" },
          { label: "V/Q Scan", value: "VQ" },
          { label: "MUGA / Radionuclide Ventriculography", value: "MUGA" },
          { label: "Myocardial Perfusion SPECT", value: "MPI" },
          { label: "Tc-99m WBC scan (Infection)", value: "Tc99mWBC" },
          { label: "I-123/I-131 Whole Body Scan", value: "I131WBS" },
          { label: "Tc-99m Lymphoscintigraphy", value: "Lymphoscintigraphy" },
          { label: "Tc-99m MAA Lung Perfusion / Shunt scan", value: "Tc99mMAA" },
        ] },
        { key: "date", label: "Date of Procedure", type: "date", required: true },
        { key: "referringPhysician", label: "Referring Physician", type: "text", required: true },
        { key: "readingPhysician", label: "Reading / Reporting Physician", type: "text", required: true },
        { key: "clinicalIndication", label: "Clinical Indication", type: "textarea", required: true, rows: 2 },
        { key: "comparisonStudies", label: "Comparison Studies", type: "text", placeholder: "e.g. Prior PET/CT dated 01/05/2026, CT chest 03/2026" },
      ],
    },
    {
      key: "patientPreparation",
      label: "Patient Preparation & Tracer",
      fields: [
        { key: "prep", label: "Preparation", type: "textarea", rows: 2, placeholder: "Fasting >=6 hrs (FDG), hold metformin 48 hrs, hold steroids/thyroid hormone, low-iodine diet, hydration, voiding protocol, smooth muscle relaxant, anesthesia/sedation if needed" },
        { key: "bloodGlucose", label: "Blood Glucose (mg/dL) — for FDG", type: "number", min: 0, max: 600 },
        { key: "radiotracer", label: "Radiotracer", type: "text", required: true, placeholder: "e.g. F-18 FDG 10.0 mCi, Ga-68 DOTATATE 2.0 mCi, Tc-99m MDP 25 mCi" },
        { key: "injectionSite", label: "Injection Site", type: "text" },
        { key: "uptakeTime", label: "Uptake Time (min)", type: "number", min: 0, max: 120 },
        { key: "patientPosition", label: "Patient Position / Bed Positions", type: "text", placeholder: "e.g. Supine, arms up, 7 bed positions" },
      ],
    },
    {
      key: "acquisition",
      label: "Acquisition & Processing",
      fields: [
        { key: "acquisitionProtocol", label: "Acquisition Protocol", type: "textarea", rows: 2, placeholder: "PET: 3D mode, 2 min/bed, OSEM. CT: 120 kV, auto mA, 3.75 mm. SPECT: 64 projections, 20s/projection" },
        { key: "ctDose", label: "CT Dose Metrics", type: "text", placeholder: "e.g. CTDIvol 8.5 mGy, DLP 520 mGy*cm, effective dose ~7.8 mSv" },
        { key: "quality", label: "Image Quality", type: "select", options: [{ label: "Good — diagnostic", value: "Good" }, { label: "Adequate — limited by artifact", value: "Adequate" }, { label: "Poor — nondiagnostic", value: "Poor" }] },
        { key: "incidental", label: "Incidental Findings on CT", type: "text", placeholder: "e.g. Lung nodule (RUL 5mm), hepatic cyst, adrenal adenoma" },
      ],
    },
    {
      key: "findings",
      label: "Findings / Impression",
      fields: [
        { key: "findings", label: "Findings Description", type: "textarea", required: true, rows: 4, placeholder: "Organ-specific findings with SUVmax, size, metabolic activity, comparison to prior" },
        { key: "impression", label: "Impression", type: "textarea", required: true, rows: 3, placeholder: "e.g. No evidence of FDG-avid metastatic disease. Deauville score 2. Complete metabolic response" },
        { key: "deauville", label: "Deauville Score (if lymphoma)", type: "select", options: [{ label: "1 — No uptake", value: "1" }, { label: "2 — <= mediastinum", value: "2" }, { label: "3 — > mediastinum <= liver", value: "3" }, { label: "4 — Moderately > liver", value: "4" }, { label: "5 — Markedly > liver", value: "5" }] },
        { key: "incidentalFindings", label: "Incidental / Additional Findings", type: "textarea", rows: 1, placeholder: "e.g. Thyroid incidentaloma, colonic wall thickening" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "tolerance", label: "Patient Tolerance", type: "select", options: [{ label: "Well tolerated", value: "Well" }, { label: "Mild side effect", value: "Mild" }, { label: "Reaction", value: "Reaction" }] },
        { key: "reactions", label: "Adverse Reactions", type: "textarea", rows: 1, placeholder: "Extravasation, allergic reaction, vasovagal, claustrophobia" },
        { key: "radiationSafety", label: "Radiation Safety Instructions", type: "textarea", rows: 1, placeholder: "Hydrate, void frequently, no special precautions for diagnostic activity. Hold breastfeeding for 24 hrs" },
        { key: "reportTimeline", label: "Preliminary / Final Report Timeline", type: "text", placeholder: "e.g. Preliminary verbal report given, final report in 24-48 hrs" },
      ],
    },
  ],
  metadata: {
    description: "Detailed procedure note for Nuclear Medicine scans — PET/CT, SPECT, bone, renal, thyroid, parathyroid, V/Q, MUGA, and dosimetry scans",
    specialties: ["Nuclear Medicine"],
    status: "active",
  },
};
