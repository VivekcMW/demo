import type { TemplateDefinition } from "../templateSchema";

export const ORTHO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "ortho-consult",
  name: "Orthopedics Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Right knee pain, hip fracture, low back pain with sciatica" },
        { key: "onset", label: "Onset & Mechanism", type: "textarea", required: true, rows: 2, placeholder: "Acute trauma, fall, RTA, gradual onset, overuse, no known cause" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 1 week, 3 months" },
        { key: "pain", label: "Pain Characteristics", type: "section", fields: [
          { key: "location", label: "Location", type: "text", placeholder: "Joint, bone, muscle, specific region" },
          { key: "radiation", label: "Radiation", type: "text", placeholder: "e.g. Sciatica down leg, radiating to arm" },
          { key: "severity", label: "Severity (0-10)", type: "number", min: 0, max: 10 },
          { key: "nature", label: "Nature", type: "select", options: [{ label: "Sharp", value: "Sharp" }, { label: "Dull ache", value: "Dull" }, { label: "Burning", value: "Burning" }, { label: "Throbbing", value: "Throbbing" }, { label: "Stabbing", value: "Stabbing" }] },
          { key: "aggravating", label: "Aggravating Factors", type: "text", placeholder: "Weight bearing, movement, night, rest" },
          { key: "relieving", label: "Relieving Factors", type: "text", placeholder: "Rest, ice, elevation, analgesia, positioning" },
        ] },
        { key: "functionalLimitation", label: "Functional Limitation", type: "textarea", rows: 2, placeholder: "Unable to bear weight, limited ROM, difficulty walking, gripping, lifting" },
        { key: "associatedSymptoms", label: "Associated Symptoms", type: "textarea", rows: 2, placeholder: "Swelling, deformity, bruising, locking, giving way, instability, numbness, tingling, weakness" },
        { key: "pastOrthoHistory", label: "Past Orthopedic History", type: "textarea", rows: 2, placeholder: "Prior fractures, surgeries, joint replacements, arthritis, osteoporosis" },
        { key: "comorbidities", label: "Comorbidities (affecting bone healing/surgery risk)", type: "textarea", rows: 2, placeholder: "DM, osteoporosis, steroid use, smoking, CKD, autoimmune disease" },
        { key: "occupationActivity", label: "Occupation & Activity Level", type: "textarea", rows: 1, placeholder: "Job, sports, daily activity demands" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 1, placeholder: "Vitals, built, nutrition, deformity, gait assessment" },
        { key: "localExam", label: "Local Musculoskeletal Examination", type: "section", fields: [
          { key: "inspection", label: "Inspection", type: "textarea", rows: 2, placeholder: "Deformity, swelling, bruising, scars, sinus, muscle wasting, limb length discrepancy" },
          { key: "palpation", label: "Palpation", type: "textarea", rows: 2, placeholder: "Tenderness, warmth, crepitus, swelling, joint effusion, pulse" },
          { key: "rangeOfMotion", label: "Range of Motion", type: "textarea", rows: 2, placeholder: "Active/passive ROM in degrees, flexion/extension/abduction/adduction/rotation" },
          { key: "specialTests", label: "Special Tests", type: "textarea", rows: 2, placeholder: "e.g. Lachman, McMurray, Neer, Hawkins, FABER, straight leg raise, drop arm test" },
          { key: "neurovascular", label: "Neurovascular Status", type: "textarea", rows: 2, placeholder: "Motor power (MRC grade), sensation, reflexes, distal pulses, capillary refill" },
        ] },
        { key: "imagingReview", label: "Imaging Review", type: "textarea", rows: 3, placeholder: "X-ray: views, fractures, dislocations, joint space, alignment, implants. CT/MRI if available" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "e.g. S82.6 — Closed tibial shaft fracture, M17.1 — Primary gonarthrosis right knee" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "fractureClassification", label: "Fracture Classification (if applicable)", type: "text", placeholder: "e.g. AO/OTA 32-A1, Garden I-IV, Neer classification, Gustilo-Anderson" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "nonSurgical", label: "Non-surgical Management", type: "textarea", rows: 2, placeholder: "RICE, immobilization (cast/splint/sling/brace), analgesia, physiotherapy, activity modification" },
        { key: "surgicalPlanning", label: "Surgical Planning", type: "textarea", rows: 2, placeholder: "Indication for surgery, planned procedure, implant, timing" },
        { key: "investigations", label: "Investigations", type: "textarea", rows: 2, placeholder: "X-ray views, CT, MRI, bone scan, blood work (CBC, RFT, coagulation, infection markers)" },
        { key: "physiotherapy", label: "Physiotherapy / Rehab Plan", type: "textarea", rows: 2 },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Review in 2 weeks with repeat X-ray" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive orthopedic consultation with joint-specific examination, special tests, and management planning",
    specialties: ["Orthopedics"],
    status: "active",
  },
};


export const ORTHO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "ortho-followup",
  name: "Orthopedics Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Pain level, function, weight-bearing status, cast/splint issues, complications" },
        { key: "painLevel", label: "Pain Level (0-10)", type: "number", min: 0, max: 10 },
        { key: "functionalStatus", label: "Functional Status", type: "select", options: [{ label: "Improved", value: "Improved" }, { label: "Same", value: "Same" }, { label: "Worse", value: "Worse" }] },
        { key: "complications", label: "Complications / Concerns", type: "textarea", rows: 2, placeholder: "Infection, wound issues, DVT symptoms, implant problems, fall" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "exam", label: "Focused Examination", type: "textarea", rows: 3, placeholder: "Wound status, swelling, ROM, tenderness, neurovascular status, alignment" },
        { key: "imaging", label: "Imaging Today", type: "textarea", rows: 2, placeholder: "X-ray/CT findings — callus formation, alignment, union status, implant position" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "healingStatus", label: "Healing Status", type: "select", options: [{ label: "Healing well", value: "Healing" }, { label: "Delayed union", value: "Delayed" }, { label: "Non-union", value: "NonUnion" }, { label: "Malunion", value: "Malunion" }, { label: "Infection", value: "Infection" }] },
        { key: "assessment", label: "Assessment", type: "textarea", rows: 2, placeholder: "Overall status, concerns, progress" },
        { key: "plan", label: "Plan", type: "textarea", rows: 3, placeholder: "Continue/exercise progression, weight-bearing status change, suture removal, cast change" },
        { key: "nextVisit", label: "Next Review", type: "text", placeholder: "e.g. 2 weeks / 6 weeks / 3 months with X-ray" },
      ],
    },
  ],
  metadata: {
    description: "Orthopedic follow-up with fracture healing assessment, functional status, and treatment progression",
    specialties: ["Orthopedics"],
    status: "active",
  },
};


export const ORTHO_FRACTURE_TEMPLATE: TemplateDefinition = {
  id: "ortho-fracture",
  name: "Fracture / Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Procedure Details",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Open reduction internal fixation right tibial plateau" },
        { key: "date", label: "Date of Surgery", type: "date", required: true },
        { key: "surgeon", label: "Surgeon", type: "text", required: true },
        { key: "assistant", label: "Assistant(s)", type: "text" },
        { key: "anesthesia", label: "Anesthesia", type: "select", options: [{ label: "General", value: "General" }, { label: "Spinal", value: "Spinal" }, { label: "Regional block", value: "Regional" }, { label: "Local", value: "Local" }] },
        { key: "tourniquet", label: "Tourniquet Time (min)", type: "number" },
        { key: "prophylacticAntibiotic", label: "Prophylactic Antibiotic Given", type: "boolean" },
      ],
    },
    {
      key: "findings",
      label: "Findings & Procedure",
      fields: [
        { key: "preOpDiagnosis", label: "Pre-op Diagnosis", type: "text", required: true },
        { key: "findings", label: "Intra-op Findings", type: "textarea", required: true, rows: 3, placeholder: "Fracture pattern, displacement, comminution, joint involvement, soft tissue injury, implant used" },
        { key: "procedurePerformed", label: "Procedure Performed", type: "textarea", required: true, rows: 3, placeholder: "Steps: approach, reduction, fixation (implant type/size), closure, drain" },
        { key: "implantDetails", label: "Implant Details", type: "repeating", fields: [
          { key: "implant", label: "Implant", type: "text", placeholder: "e.g. TIBIAL NAIL 10x360mm" },
          { key: "manufacturer", label: "Manufacturer", type: "text" },
          { key: "lotNo", label: "Lot/Batch No.", type: "text" },
        ] },
        { key: "boneGraft", label: "Bone Graft Used", type: "select", options: [{ label: "None", value: "None" }, { label: "Autograft", value: "Auto" }, { label: "Allograft", value: "Allo" }, { label: "Bone graft substitute", value: "Substitute" }] },
        { key: "bloodLoss", label: "Estimated Blood Loss (mL)", type: "number", min: 0, max: 5000 },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Neurovascular injury, implant malposition, fracture propagation, excessive bleeding" },
      ],
    },
    {
      key: "postOp",
      label: "Post-operative Orders",
      fields: [
        { key: "weightBearing", label: "Weight-bearing Status", type: "select", options: [{ label: "Non-weight bearing", value: "NWB" }, { label: "Toe-touch", value: "TTWB" }, { label: "Partial weight bearing", value: "PWB" }, { label: "Weight bearing as tolerated", value: "WBAT" }, { label: "Full weight bearing", value: "FWB" }] },
        { key: "immobilization", label: "Immobilization", type: "text", placeholder: "Cast, splint, brace, sling — duration" },
        { key: "medications", label: "Medications", type: "textarea", rows: 2, placeholder: "Analgesics, antibiotics, DVT prophylaxis, calcium/vitamin D" },
        { key: "dvtProphylaxis", label: "DVT Prophylaxis", type: "select", options: [{ label: "Not indicated", value: "No" }, { label: "Enoxaparin 40mg SC OD", value: "Enoxaparin" }, { label: "Rivaroxaban", value: "Rivaroxaban" }, { label: "Mechanical only", value: "Mechanical" }] },
        { key: "physiotherapy", label: "Physiotherapy Plan", type: "textarea", rows: 2, placeholder: "Passive ROM, active exercises, CPM, muscle strengthening" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Suture removal at 2 weeks, X-ray at 6 weeks, review with Dr. X" },
      ],
    },
  ],
  metadata: {
    description: "Structured orthopedic operative note for fracture fixation and joint procedures with implant tracking and post-op rehabilitation plan",
    specialties: ["Orthopedics"],
    status: "active",
  },
};


export const ORTHO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "ortho-admission",
  name: "Orthopedics IPD Admission",
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
        { key: "source", label: "Source", type: "select", options: [{ label: "OPD", value: "OPD" }, { label: "Emergency/Trauma", value: "Emergency" }, { label: "Transfer", value: "Transfer" }, { label: "Elective surgery", value: "Elective" }] },
        { key: "ward", label: "Ward / Unit", type: "select", options: [{ label: "Ortho Ward", value: "Ward" }, { label: "ICU/HDU", value: "ICU" }] },
        { key: "mechanismOfInjury", label: "Mechanism of Injury", type: "textarea", rows: 2, placeholder: "Fall from height, RTA, sports, assault, spontaneous" },
      ],
    },
    {
      key: "history",
      label: "History",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4 },
        { key: "pastOrthoHistory", label: "Past Orthopedic History", type: "textarea", rows: 2 },
        { key: "comorbidities", label: "Comorbidities", type: "textarea", rows: 2, placeholder: "DM, HTN, osteoporosis, CKD, steroid use, smoking" },
        { key: "medications", label: "Current Medications", type: "textarea", rows: 1, placeholder: "Anticoagulants, antiplatelets, steroids, bisphosphonates" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
        ] },
        { key: "localExam", label: "Local Examination", type: "textarea", rows: 3, placeholder: "Deformity, swelling, wound (open fracture classification), compartment status, neurovascular assessment" },
        { key: "otherSystems", label: "Other Systems", type: "textarea", rows: 2, placeholder: "Polytrauma assessment if applicable — head, chest, abdomen, pelvis" },
        { key: "imaging", label: "Imaging Summary", type: "textarea", rows: 2, placeholder: "X-ray, CT scan findings" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "severity", label: "Injury Severity", type: "select", options: [{ label: "Isolated — minor", value: "Minor" }, { label: "Isolated — major", value: "Major" }, { label: "Polytrauma", value: "Polytrauma" }] },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 3, placeholder: "Pre-op optimization, planned surgery, timing, blood cross-match, NPO status" },
        { key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
          { key: "order", label: "Order", type: "text", placeholder: "e.g. Splint, ice, elevation, analgesia, X-ray" },
          { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
        ] },
      ],
    },
  ],
  metadata: {
    description: "Orthopedic admission note for trauma and elective surgeries with injury mechanism and polytrauma assessment",
    specialties: ["Orthopedics"],
    status: "active",
  },
};


export const ORTHO_POSTOP_TEMPLATE: TemplateDefinition = {
  id: "ortho-postop",
  name: "Ortho Post-op Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "header",
      label: "Progress Header",
      fields: [
        { key: "date", label: "Date", type: "date", required: true },
        { key: "postOpDay", label: "Post-operative Day", type: "number", required: true, min: 0, placeholder: "e.g. POD 1" },
        { key: "surgeryDate", label: "Date of Surgery", type: "date", required: true },
      ],
    },
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "pain", label: "Pain (0-10)", type: "number", min: 0, max: 10 },
        { key: "symptomReview", label: "Symptom Review", type: "textarea", rows: 2, placeholder: "Pain control, sensation, movement, fever, wound concerns, DVT symptoms" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number" },
          { key: "temp", label: "Temp (°C)", type: "number" },
          { key: "spo2", label: "SpO₂ (%)", type: "number" },
        ] },
        { key: "wound", label: "Wound Assessment", type: "textarea", rows: 2, placeholder: "Dressing dry/intact, soakage, erythema, discharge, suture line" },
        { key: "limbExam", label: "Limb Examination", type: "textarea", rows: 2, placeholder: "Swelling, distal pulses, sensation, motor function, compartment status, active ROM" },
        { key: "drains", label: "Drains (if present)", type: "text", placeholder: "Output volume, color, removal plan" },
      ],
    },
    {
      key: "plan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", rows: 2, placeholder: "Recovery progress, concerns" },
        { key: "plan", label: "Plan for Today", type: "textarea", rows: 3, placeholder: "Pain management, DVT prophylaxis, wound care, mobilization, PT, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily post-operative progress note for orthopedic surgery with wound assessment, pain control, and rehabilitation tracking",
    specialties: ["Orthopedics"],
    status: "active",
  },
};
