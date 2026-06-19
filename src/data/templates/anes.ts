import type { TemplateDefinition } from "../templateSchema";

export const ANES_PREOP_TEMPLATE: TemplateDefinition = {
  id: "anes-preop",
  name: "Pre-Anesthetic Evaluation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "patientInfo",
      label: "Patient Information",
      fields: [
        { key: "name", label: "Patient Name", type: "text" },
        { key: "age", label: "Age", type: "number", required: true },
        { key: "weight", label: "Weight (kg)", type: "number", required: true },
        { key: "height", label: "Height (cm)", type: "number" },
        { key: "bmi", label: "BMI", type: "number", readOnly: true },
        { key: "plannedSurgery", label: "Planned Surgery / Procedure", type: "text", required: true },
        { key: "plannedDate", label: "Planned Date of Surgery", type: "date", required: true },
        { key: "surgeon", label: "Surgeon", type: "text", required: true },
      ],
    },
    {
      key: "history",
      label: "History",
      fields: [
        { key: "presentIllness", label: "History of Present Illness", type: "textarea", rows: 2 },
        { key: "pastMedical", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Cardiac, pulmonary, renal, hepatic, neurological, endocrine, bleeding disorders" },
        { key: "pastSurgical", label: "Past Surgical & Anesthesia History", type: "textarea", rows: 2, placeholder: "Prior surgeries, anesthesia type, complications (PONV, MH, difficult airway)" },
        { key: "medications", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Include anticoagulants, antiplatelets, insulin, steroids, beta-blockers" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Drug allergies, latex allergy" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 1, placeholder: "Smoking, alcohol, recreational drugs" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Cardiac (angina, dyspnea), respiratory (cough, wheeze), GI (reflux), CNS" },
      ],
    },
    {
      key: "airwayExam",
      label: "Airway Assessment",
      fields: [
        { key: "mouthOpening", label: "Mouth Opening (cm)", type: "number", min: 0, max: 10, placeholder: "Normal > 4cm" },
        { key: "thyromentalDistance", label: "Thyromental Distance (cm)", type: "number", min: 0, max: 15, placeholder: "Normal > 6cm" },
        { key: "sternomentalDistance", label: "Sternomental Distance (cm)", type: "number", placeholder: "Normal > 12cm" },
        { key: "mallampati", label: "Mallampati Grade", type: "select", options: [{ label: "I", value: "I" }, { label: "II", value: "II" }, { label: "III", value: "III" }, { label: "IV", value: "IV" }] },
        { key: "neckMobility", label: "Neck Mobility", type: "select", options: [{ label: "Full", value: "Full" }, { label: "Limited", value: "Limited" }] },
        { key: "dentition", label: "Dentition", type: "text", placeholder: "Normal, loose teeth, caps, dentures" },
        { key: "difficultAirwayPredictors", label: "Difficult Airway Predictors", type: "textarea", rows: 1, placeholder: "Beard, obesity, sleep apnea, limited extension, previous difficulty" },
      ],
    },
    {
      key: "physicalExam",
      label: "Physical Examination",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "HR (bpm)", type: "number", min: 30, max: 250 },
          { key: "rr", label: "Respiratory Rate", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 1, placeholder: "Built, pallor, cyanosis, edema, lymphadenopathy" },
        { key: "cardiacExam", label: "Cardiovascular System", type: "textarea", rows: 1, placeholder: "Heart sounds, murmurs, JVP, edema" },
        { key: "respiratoryExam", label: "Respiratory System", type: "textarea", rows: 1, placeholder: "Air entry, wheeze, crackles" },
        { key: "otherExam", label: "Other Systems", type: "textarea", rows: 1, placeholder: "Airway, spine (for regional), vascular access sites" },
      ],
    },
    {
      key: "investigations",
      label: "Investigations & Clearance",
      fields: [
        { key: "requiredInvestigations", label: "Required Investigations (done)", type: "textarea", rows: 2, placeholder: "CBC, RFT, LFT, coagulation, ECG, CXR, echo, PFT if indicated" },
        { key: "abnormalFindings", label: "Abnormal Findings", type: "textarea", rows: 2 },
        { key: "asaClass", label: "ASA Physical Status", type: "select", required: true, options: [
          { label: "ASA I", value: "I" }, { label: "ASA II", value: "II" },
          { label: "ASA III", value: "III" }, { label: "ASA IV", value: "IV" },
          { label: "ASA V", value: "V" }, { label: "ASA VI (organ donor)", value: "VI" },
        ] },
        { key: "pacClearance", label: "PAC / Anesthesia Clearance", type: "select", options: [{ label: "Cleared for surgery", value: "Cleared" }, { label: "Optimization needed", value: "Optimize" }, { label: "High risk — discussed with team", value: "HighRisk" }, { label: "Deferred / Cancelled", value: "Deferred" }] },
      ],
    },
    {
      key: "plan",
      label: "Anesthesia Plan",
      fields: [
        { key: "anesthesiaType", label: "Planned Anesthesia Type", type: "select", options: [{ label: "General Anesthesia", value: "GA" }, { label: "Spinal / Subarachnoid", value: "Spinal" }, { label: "Epidural", value: "Epidural" }, { label: "Regional block", value: "Regional" }, { label: "Monitored anesthesia care (MAC)", value: "MAC" }, { label: "Local + sedation", value: "LocalSedation" }] },
        { key: "airwayPlan", label: "Airway Plan", type: "select", options: [{ label: "Standard RSI", value: "Standard" }, { label: "Video laryngoscope", value: "Video" }, { label: "Fiberoptic intubation (awake)", value: "Fiberoptic" }, { label: "LMA / supraglottic", value: "LMA" }, { label: "Tracheostomy under local", value: "Tracheostomy" }] },
        { key: "monitoringPlan", label: "Monitoring Plan", type: "textarea", rows: 1, placeholder: "Standard → plus: arterial line, CVP, TEG, etc." },
        { key: "preOpOrders", label: "Pre-op Orders", type: "textarea", rows: 2, placeholder: "NPO status, pre-medication, hold medications (anticoagulants, etc.), IV access, antibiotic timing" },
        { key: "postOpAnalgesiaPlan", label: "Post-op Analgesia Plan", type: "textarea", rows: 2, placeholder: "Multimodal analgesia, PCA, regional catheter, nerve block" },
        { key: "specialConsiderations", label: "Special Considerations", type: "textarea", rows: 2, placeholder: "Difficult airway equipment ready, MH cart, malignant hyperthermia precautions, ICU bed needed" },
        { key: "informedConsent", label: "Informed Consent Obtained", type: "boolean" },
        { key: "evaluatedBy", label: "Evaluated By (Anesthesiologist)", type: "text", required: true },
      ],
    },
  ],
  metadata: {
    description: "Pre-anesthetic evaluation with airway assessment, ASA class, and comprehensive anesthesia plan",
    specialties: ["Anesthesiology"],
    status: "active",
  },
};


export const ANES_INTRAOP_TEMPLATE: TemplateDefinition = {
  id: "anes-intraop",
  name: "Intra-operative Anesthesia Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Procedure & Team",
      fields: [
        { key: "procedure", label: "Procedure", type: "text", required: true },
        { key: "date", label: "Date of Surgery", type: "date", required: true },
        { key: "surgeon", label: "Surgeon", type: "text", required: true },
        { key: "anesthetist", label: "Anesthesiologist", type: "text", required: true },
        { key: "anesthesiaType", label: "Anesthesia Type", type: "text", required: true, placeholder: "GA / Spinal / Epidural / Regional / MAC" },
        { key: "preOpDiagnosis", label: "Pre-op Diagnosis", type: "text" },
        { key: "postOpDiagnosis", label: "Post-op Diagnosis", type: "text" },
      ],
    },
    {
      key: "anesInduction",
      label: "Induction & Maintenance",
      fields: [
        { key: "premedication", label: "Premedication", type: "textarea", rows: 1, placeholder: "Midazolam, glycopyrrolate, etc." },
        { key: "inductionAgent", label: "Induction Agent", type: "text", placeholder: "e.g. Propofol 2mg/kg, Thiopentone" },
        { key: "muscleRelaxant", label: "Muscle Relaxant", type: "text", placeholder: "e.g. Succinylcholine, Rocuronium, Vecuronium" },
        { key: "airwayDevice", label: "Airway Device", type: "text", placeholder: "e.g. ETT 7.5, LMA #4" },
        { key: "maintenanceAgent", label: "Maintenance", type: "text", placeholder: "e.g. Sevoflurane 1-2%, Propofol infusion, TIVA" },
        { key: "analgesia", label: "Intra-op Analgesia", type: "text", placeholder: "e.g. Fentanyl 2mcg/kg, Morphine 0.1mg/kg" },
        { key: "regionalBlock", label: "Regional Block Details", type: "textarea", rows: 1, placeholder: "Type, approach, drug, dose, effect" },
      ],
    },
    {
      key: "vitalsMonitoring",
      label: "Vitals & Monitoring",
      fields: [
        { key: "monitoring", label: "Monitoring Applied", type: "text", placeholder: "ECG, SpO₂, NIBP/IBP, ETCO₂, BIS, temp" },
        { key: "bpRange", label: "BP Range (min-max)", type: "text" },
        { key: "hrRange", label: "HR Range (min-max)", type: "text" },
        { key: "spo2Range", label: "SpO₂ Range", type: "text" },
        { key: "etco2Range", label: "ETCO₂ Range (mmHg)", type: "text" },
        { key: "fluids", label: "IV Fluids Given", type: "text", placeholder: "Crystalloid, colloid, blood products" },
        { key: "estimatedBloodLoss", label: "Estimated Blood Loss (mL)", type: "number", min: 0, max: 10000 },
        { key: "urineOutput", label: "Urine Output (mL)", type: "number" },
      ],
    },
    {
      key: "emergence",
      label: "Emergence & Recovery",
      fields: [
        { key: "emergence", label: "Emergence", type: "select", options: [{ label: "Smooth", value: "Smooth" }, { label: "Agitated", value: "Agitated" }, { label: "Delayed", value: "Delayed" }] },
        { key: "reversal", label: "Reversal Agents Used", type: "text", placeholder: "e.g. Neostigmine + Glycopyrrolate" },
        { key: "extubation", label: "Extubation", type: "select", options: [{ label: "Deep", value: "Deep" }, { label: "Awake", value: "Awake" }, { label: "Still intubated — to ICU", value: "Intubated" }] },
        { key: "totalAnesthesiaTime", label: "Total Anesthesia Time (min)", type: "number" },
        { key: "complications", label: "Intra-op Complications", type: "textarea", rows: 2, placeholder: "Hypotension, arrhythmia, desaturation, anaphylaxis, airway difficulty, cardiac arrest, MH" },
        { key: "patientCondition", label: "Patient Condition at Transfer", type: "select", options: [{ label: "Stable — to PACU", value: "PACU" }, { label: "Stable — to Ward", value: "Ward" }, { label: "Critical — to ICU intubated", value: "ICU" }] },
      ],
    },
  ],
  metadata: {
    description: "Intra-operative anesthesia record with induction, maintenance, monitoring, and emergence details",
    specialties: ["Anesthesiology"],
    status: "active",
  },
};


export const ANES_PACU_TEMPLATE: TemplateDefinition = {
  id: "anes-pacu",
  name: "PACU / Recovery Note",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "header",
      label: "Post-Anesthesia Care",
      fields: [
        { key: "admissionTime", label: "PACU Admission Time", type: "time", required: true },
        { key: "dischargeTime", label: "PACU Discharge Time", type: "time" },
        { key: "anesthesiaType", label: "Type of Anesthesia", type: "text" },
        { key: "procedure", label: "Procedure Done", type: "text" },
      ],
    },
    {
      key: "admissionStatus",
      label: "Admission Status",
      fields: [
        { key: "airway", label: "Airway", type: "select", options: [{ label: "Patent — self-maintained", value: "Patent" }, { label: "Patent — with airway adjunct", value: "Adjunct" }, { label: "Intubated", value: "Intubated" }] },
        { key: "oxygen", label: "Oxygen Delivery", type: "select", options: [{ label: "Room air", value: "Air" }, { label: "Nasal cannula", value: "Cannula" }, { label: "Face mask", value: "Mask" }, { label: "Non-rebreather", value: "NRB" }, { label: "Ventilated", value: "Ventilated" }] },
        { key: "spo2", label: "SpO₂ (%)", type: "number", min: 50, max: 100 },
        { key: "bp", label: "BP (mmHg)", type: "text" },
        { key: "pulse", label: "HR (bpm)", type: "number", min: 30, max: 250 },
        { key: "consciousness", label: "Level of Consciousness", type: "select", options: [{ label: "Awake & oriented", value: "Awake" }, { label: "Drowsy but arousable", value: "Drowsy" }, { label: "Unresponsive", value: "Unresponsive" }] },
        { key: "painScore", label: "Pain Score (0-10)", type: "number", min: 0, max: 10 },
        { key: "pomScore", label: "PONV Score (0-3)", type: "number", min: 0, max: 3 },
      ],
    },
    {
      key: "recovery",
      label: "Recovery Monitoring",
      fields: [
        { key: "fluidOutput", label: "IV Fluids & Output", type: "text", placeholder: "IV fluids ongoing, urine output, drain output" },
        { key: "aldreteScore", label: "Aldrete Score (admission → discharge)", type: "text", placeholder: "e.g. 8 → 10" },
        { key: "interventions", label: "Interventions in PACU", type: "textarea", rows: 2, placeholder: "Analgesia given, antiemetics, fluids, airway interventions" },
        { key: "complications", label: "Complications in PACU", type: "textarea", rows: 2, placeholder: "Hypotension, desaturation, nausea/vomiting, bleeding, arrhythmia, emergence delirium" },
      ],
    },
    {
      key: "discharge",
      label: "PACU Discharge",
      fields: [
        { key: "dischargeCriteria", label: "Discharge Criteria Met", type: "select", options: [{ label: "Met — modified Aldrete ≥9", value: "Met" }, { label: "Not met — needs longer stay", value: "NotMet" }, { label: "Transferred to ICU", value: "ICU" }] },
        { key: "postOpAnalgesiaInstructions", label: "Post-op Analgesia Instructions", type: "textarea", rows: 2, placeholder: "Analgesic regimen, PCA settings, nerve block duration" },
        { key: "postOpOrders", label: "Post-op Orders", type: "textarea", rows: 2, placeholder: "O₂ requirement, vitals frequency, NPO / diet, activity, meds" },
        { key: "recoveryNurse", label: "PACU Nurse / Handover", type: "text" },
      ],
    },
  ],
  metadata: {
    description: "Post-anesthesia care unit (PACU) note with Aldrete scoring, pain/PONV management, and discharge criteria",
    specialties: ["Anesthesiology"],
    status: "active",
  },
};
