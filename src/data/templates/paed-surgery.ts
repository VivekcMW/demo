import type { TemplateDefinition } from "../templateSchema";

export const PAED_SURGERY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "paed-surgery-consult",
  name: "Pediatric Surgery Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Abdominal pain, hernia/swelling, vomiting, constipation, undescended testis, scrotal pain, abdominal mass" },
        { key: "age", label: "Age", type: "text", required: true, placeholder: "e.g. Neonate, 2 years old" },
        { key: "duration", label: "Duration", type: "text", required: true, placeholder: "e.g. Since birth, 2 days" },
        { key: "pain", label: "Pain Characteristics", type: "section", fields: [
          { key: "location", label: "Location", type: "text", placeholder: "e.g. Periumbilical, RLQ, scrotum, diffuse" },
          { key: "onset", label: "Onset", type: "select", options: [{ label: "Sudden", value: "Sudden" }, { label: "Gradual", value: "Gradual" }] },
          { key: "nature", label: "Nature", type: "select", options: [{ label: "Colicky", value: "Colicky" }, { label: "Continuous", value: "Continuous" }, { label: "Sharp", value: "Sharp" }] },
          { key: "severity", label: "Severity (0-10)", type: "number", min: 0, max: 10 },
          { key: "radiation", label: "Radiation", type: "text", placeholder: "e.g. Back, groin" },
        ] },
        { key: "associatedSymptoms", label: "Associated Symptoms", type: "multiselect", options: [
          { label: "Vomiting (bilious/non-bilious)", value: "Vomiting" }, { label: "Fever", value: "Fever" },
          { label: "Abdominal distension", value: "Distension" },
          { label: "Constipation / obstipation", value: "Constipation" },
          { label: "Diarrhea", value: "Diarrhea" }, { label: "Feeding intolerance", value: "Feeding" },
          { label: "Weight loss", value: "WeightLoss" }, { label: "Dysphagia", value: "Dysphagia" },
        ] },
        { key: "bowelBladder", label: "Bowel & Bladder", type: "textarea", rows: 1, placeholder: "Last bowel movement (meconium in neonate?), flatus, urinary symptoms" },
        { key: "birthHistory", label: "Birth / Antenatal History", type: "textarea", rows: 2, placeholder: "Antenatal USG findings (hydronephrosis, cysts, dilated bowel), gestational age, birth weight, NICU stay" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 1, placeholder: "Prior surgeries, anesthesia history" },
        { key: "comorbidities", label: "Comorbidities", type: "textarea", rows: 1, placeholder: "Congenital anomalies, cardiac, bleeding disorders" },
        { key: "medications", label: "Medications", type: "textarea", rows: 1, placeholder: "Anticoagulants, antibiotics, analgesics" },
        { key: "allergies", label: "Allergies", type: "text" },
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
            { key: "rr", label: "RR (/min)", type: "number" },
            { key: "spo2", label: "SpO2 (%)", type: "number" },
            { key: "bp", label: "BP (mmHg)", type: "text" },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number", min: 1, max: 120 },
            { key: "height", label: "Height (cm)", type: "number" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Appearance, pallor, icterus, cyanosis, hydration, dysmorphic features" },
        { key: "abdominalExam", label: "Abdominal Examination", type: "section", fields: [
          { key: "inspection", label: "Inspection", type: "textarea", rows: 1, placeholder: "Distension, scars, visible gut loops, hernias, umbilicus" },
          { key: "palpation", label: "Palpation", type: "textarea", rows: 2, placeholder: "Tenderness (site/severity), guarding, rigidity, rebound, masses, organomegaly, hernia (reducible/irreducible/obstructed)" },
          { key: "percussion", label: "Percussion", type: "textarea", rows: 1, placeholder: "Tympany, dullness, shifting dullness" },
          { key: "auscultation", label: "Auscultation", type: "textarea", rows: 1, placeholder: "Bowel sounds (present/absent/obstructed/high-pitched)" },
        ] },
        { key: "inguinalGenitalExam", label: "Inguinal / Genital Exam", type: "textarea", rows: 1, placeholder: "Hernias, hydrocele, testicular lie (descended/retractile/undescended), testicular torsion signs, chordee" },
        { key: "imagingReview", label: "Imaging & Lab Review", type: "textarea", rows: 2, placeholder: "USG, CT, X-ray, blood work results pertinent to surgical diagnosis" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "e.g. K40.9 — Inguinal hernia (right sided), K56.1 — Intussusception, K42.9 — Umbilical hernia, N53.1 — Undescended testis" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "differential", label: "Differential Diagnoses", type: "textarea", rows: 2 },
        { key: "surgicalUrgency", label: "Surgical Urgency", type: "select", required: true, options: [{ label: "Elective", value: "Elective" }, { label: "Urgent (within 24-48 hr)", value: "Urgent" }, { label: "Emergency (within 1-2 hr)", value: "Emergency" }] },
        { key: "obstructionStatus", label: "Obstruction / Strangulation Risk", type: "select", options: [{ label: "No obstruction", value: "None" }, { label: "Obstructed — reducible", value: "Obstructed" }, { label: "Strangulated — emergency", value: "Strangulated" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "management", label: "Plan", type: "textarea", required: true, rows: 3, placeholder: "NPO, IV fluids, NG tube (if obstruction), antibiotics, analgesia, surgical timing" },
        { key: "preOpWorkup", label: "Pre-op Workup Needed", type: "textarea", rows: 2, placeholder: "CBC, RFT, LFT, coagulation, blood group & cross-match, ECG (if indicated)" },
        { key: "consent", label: "Consent Discussed with Parents", type: "boolean" },
        { key: "parentInstructions", label: "Parent Instructions", type: "textarea", rows: 2, placeholder: "Pre-op NPO timing, procedure explanation, post-op expectations" },
        { key: "followUp", label: "Follow-up / OR Timing", type: "text", placeholder: "e.g. Admit today for OR tomorrow / Review in OPD in 2 weeks / Plan elective repair in 3 months" },
      ],
    },
  ],
  metadata: {
    description: "Pediatric surgery consultation with abdominal exam, hernia evaluation, surgical urgency assessment, and pre-op planning for congenital and acquired surgical conditions",
    specialties: ["Pediatric Surgery"],
    status: "active",
  },
};


export const PAED_SURGERY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "paed-surgery-followup",
  name: "Pediatric Surgery Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Post-operative recovery, wound healing, pain, feeding tolerance, bowel function, activity level, any concerns" },
        { key: "symptomStatus", label: "Symptom Status", type: "select", options: [{ label: "Improved", value: "Improved" }, { label: "Stable", value: "Stable" }, { label: "Worsened", value: "Worsened" }] },
        { key: "woundConcerns", label: "Wound / Scar Concerns", type: "textarea", rows: 1, placeholder: "Redness, discharge, swelling, wound dehiscence, keloid" },
        { key: "dietTolerance", label: "Diet / Feeding Tolerance", type: "select", options: [{ label: "Full oral tolerance", value: "Full" }, { label: "Partial / NGT feeds", value: "Partial" }, { label: "Tolerating poorly", value: "Poor" }] },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "pulse", label: "HR (bpm)", type: "number" },
            { key: "weight", label: "Weight (kg)", type: "number" },
          ],
        },
        {
          key: "growth", label: "Growth Parameters", type: "section", fields: [
            { key: "weightCentile", label: "Weight Centile", type: "text" },
          ],
        },
        { key: "woundExam", label: "Wound / Scar Assessment", type: "textarea", rows: 2, placeholder: "Wound healing (well/with discharge/dehiscence), surgical site infection signs, hernia repair site (recurrence?), scar quality" },
        { key: "abdominalExam", label: "Abdominal Exam", type: "textarea", rows: 1, placeholder: "Distension, tenderness, masses, hernia recurrence" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "recoveryStatus", label: "Recovery Status", type: "select", options: [{ label: "Uneventful recovery", value: "Good" }, { label: "Minor concerns", value: "Minor" }, { label: "Complication — requires intervention", value: "Complication" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Post-operative recovery, wound status, feeding/function, any concerns" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "woundCare", label: "Wound Care Instructions", type: "textarea", rows: 1, placeholder: "Dressing changes, bathing restrictions, suture removal date, activity restrictions" },
        { key: "dietAdvice", label: "Diet / Activity Advice", type: "textarea", rows: 1, placeholder: "Diet progression, lifting restrictions, return to school/sports timeline" },
        { key: "medications", label: "Medications", type: "textarea", rows: 1, placeholder: "Analgesics, antibiotics, stool softeners" },
        { key: "nextVisit", label: "Next Follow-up", type: "text", placeholder: "e.g. Suture removal in 7 days, review in 1 month, 3 months, 1 year" },
        { key: "parentInstructions", label: "Parent Instructions / Warning Signs", type: "textarea", rows: 1, placeholder: "Fever, wound changes, vomiting, feeding intolerance — when to return" },
      ],
    },
  ],
  metadata: {
    description: "Post-operative follow-up for pediatric surgery patients — wound assessment, recovery tracking, diet progression, and activity restrictions",
    specialties: ["Pediatric Surgery"],
    status: "active",
  },
};


export const PAED_SURGERY_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "paed-surgery-admission",
  name: "Pediatric Surgery Admission",
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
        { key: "ward", label: "Ward / Unit", type: "text", placeholder: "e.g. Pediatric Surgical Ward, PICU, NICU" },
        { key: "source", label: "Source", type: "select", options: [{ label: "OPD", value: "OPD" }, { label: "Emergency", value: "Emergency" }, { label: "Transfer from other hospital", value: "Transfer" }, { label: "Elective surgery admission", value: "Elective" }] },
        { key: "admissionType", label: "Admission Type", type: "select", options: [{ label: "Emergency surgical", value: "Emergency" }, { label: "Elective surgery", value: "Elective" }, { label: "Observation (non-operative)", value: "Observation" }] },
        { key: "admissionReason", label: "Reason for Admission", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "history",
      label: "History",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2 },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Complete history with onset, progression, treatment sought prior to admission" },
        { key: "birthHistory", label: "Birth / Antenatal History", type: "textarea", rows: 2, placeholder: "Antenatal diagnosis, gestational age, birth weight, neonatal course" },
        { key: "feedingHistory", label: "Feeding History", type: "textarea", rows: 1, placeholder: "Breast/formula, feeding tolerance, reflux, vomiting" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2 },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2 },
        { key: "medications", label: "Current Medications", type: "textarea", rows: 1 },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals on Admission", type: "section", fields: [
            { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
            { key: "pulse", label: "HR (bpm)", type: "number" },
            { key: "rr", label: "RR (/min)", type: "number" },
            { key: "spo2", label: "SpO2 (%)", type: "number" },
            { key: "bp", label: "BP (mmHg)", type: "text" },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number" },
            { key: "height", label: "Height (cm)", type: "number" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
          ],
        },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Hydration, pallor, icterus, cyanosis, dysmorphic features" },
        { key: "surgicalExam", label: "Focused Surgical Examination", type: "textarea", required: true, rows: 3, placeholder: "Region of interest (abdomen, inguinoscrotal, chest, spine) — detailed findings" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "severity", label: "Severity / Surgical Priority", type: "select", options: [{ label: "Stable — elective timing", value: "Elective" }, { label: "Urgent — requires surgery in 24-48 hr", value: "Urgent" }, { label: "Emergency — surgery within 1-2 hr", value: "Emergency" }] },
        { key: "surgicalPlan", label: "Planned Surgery / Procedure", type: "textarea", rows: 2, placeholder: "Procedure name, approach (open/laparoscopic), timing" },
        { key: "treatmentPlan", label: "Immediate Management Plan", type: "textarea", rows: 3, placeholder: "NPO, IV fluids, NG tube, antibiotics, analgesia, type & cross-match" },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC, coagulation, grouping, cross-match, CXR, ECG" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "Pre-op STAT", value: "STAT" }] },
          ],
        },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Pediatric anesthesia, PICU, cardiology clearance, genetics" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Pediatric Surgery — emergency and elective surgical admissions with operative planning",
    specialties: ["Pediatric Surgery"],
    status: "active",
  },
};


export const PAED_SURGERY_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "paed-surgery-procedure",
  name: "Pediatric Surgical Operative Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-operative",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Laparoscopic appendectomy, Inguinal hernia repair (right), Orchiopexy, Pyloromyotomy (Ramstedt's), Colostomy closure" },
        { key: "date", label: "Date of Surgery", type: "date", required: true },
        { key: "surgeon", label: "Primary Surgeon", type: "text", required: true },
        { key: "assistant", label: "Assistant(s)", type: "text" },
        { key: "anesthesia", label: "Anesthesia Type", type: "select", options: [{ label: "General", value: "General" }, { label: "Spinal", value: "Spinal" }, { label: "Regional / caudal", value: "Regional" }, { label: "Local with sedation", value: "Local" }] },
        { key: "anesthetist", label: "Anesthetist", type: "text" },
        { key: "indication", label: "Indication for Surgery", type: "textarea", required: true, rows: 2 },
        { key: "consentVerified", label: "Parental Consent Verified", type: "boolean", required: true },
        { key: "preOpDiagnosis", label: "Pre-op Diagnosis", type: "text", required: true },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-operative Details",
      fields: [
        { key: "incision", label: "Incision / Approach", type: "text", placeholder: "e.g. McBurney's, RIF transverse skin crease, laparoscopic (umbilical + 2 ports), midline" },
        { key: "findings", label: "Intra-operative Findings", type: "textarea", required: true, rows: 4, placeholder: "Detailed description — inflammation (phlegmon/abscess/gangrene), hernia sac (contents, viability), testicular position/viability, patency of processus vaginalis" },
        { key: "procedurePerformed", label: "Procedure Performed", type: "textarea", required: true, rows: 4, placeholder: "Step-by-step description — dissection technique, ligation of sac, closure method, port closure" },
        { key: "drains", label: "Drains / Tubes", type: "text", placeholder: "None / drain type (size, site, output)" },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "e.g. Appendix (HPE), hernia sac (if indicated)" },
        { key: "estimatedBloodLoss", label: "Estimated Blood Loss (mL)", type: "number", min: 0, max: 1000 },
        { key: "fluidsGiven", label: "IV Fluids & Blood Products Given", type: "text", placeholder: "e.g. 500 mL RL" },
        { key: "doseWeight", label: "Patient Weight at Surgery (kg)", type: "number" },
        { key: "closure", label: "Closure", type: "textarea", rows: 2, placeholder: "Fascia, subcutaneous, skin closure method (subcuticular/interrupted/staples). Suture used" },
        { key: "complications", label: "Intra-op Complications", type: "textarea", rows: 2, placeholder: "None / hemorrhage, bowel perforation, anesthetic issues" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-operative Orders",
      fields: [
        { key: "condition", label: "Patient Condition at End", type: "select", options: [{ label: "Stable — extubated", value: "Stable" }, { label: "Stable — intubated to PICU", value: "Intubated" }, { label: "Critical", value: "Critical" }] },
        { key: "postOpDiagnosis", label: "Post-op Diagnosis", type: "text", required: true },
        { key: "diet", label: "Diet Plan", type: "select", options: [{ label: "NPO x 4-6 hr", value: "NPO" }, { label: "Sips then advance", value: "Sips" }, { label: "Clear liquids", value: "ClearLiquids" }, { label: "Breastfeeds on demand", value: "Breastfeeds" }, { label: "Regular diet", value: "Regular" }] },
        { key: "ivFluids", label: "IV Fluids", type: "textarea", rows: 1, placeholder: "e.g. RL with 5% D at maintenance" },
        { key: "medications", label: "Post-op Medications", type: "textarea", rows: 2, placeholder: "Analgesics (paracetamol, NSAIDs, morphine), antibiotics, antiemetics" },
        { key: "monitoring", label: "Monitoring Plan", type: "textarea", rows: 2, placeholder: "Vitals (frequency), pulse oximetry, pain scores (FLACC/Wong-Baker), wound check, drain output, urine output" },
        { key: "activity", label: "Activity / Positioning", type: "text", placeholder: "e.g. Supine, hip flexed post-hernia repair, ambulate as tolerated" },
        { key: "followUpPlan", label: "Follow-up Plan", type: "textarea", rows: 1, placeholder: "Wound check, suture removal (5-7 days), clinic review (2 weeks, 1 month, 3 months)" },
        { key: "parentInstructions", label: "Instructions to Parents", type: "textarea", rows: 2, placeholder: "Wound care, diapering, bathing, feeding, pain management, warning signs (fever, wound discharge, vomiting, feeding intolerance)" },
      ],
    },
  ],
  metadata: {
    description: "Complete operative note for pediatric surgical procedures — pre-op, intra-op findings, and post-op care plan for neonates and children",
    specialties: ["Pediatric Surgery"],
    status: "active",
  },
};
