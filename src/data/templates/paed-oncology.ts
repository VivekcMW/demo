import type { TemplateDefinition } from "../templateSchema";

export const PAED_ONCOLOGY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "paed-oncology-consult",
  name: "Pediatric Oncology Consultation",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Fever with pancytopenia, bone pain, limping, pallor, bruising/petechiae, lymphadenopathy, abdominal mass, headache/vomiting, mediastinal mass, prolonged fever, weight loss" },
        { key: "age", label: "Age", type: "text", required: true, placeholder: "e.g. 4 years, 14 years" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 5, placeholder: "Detailed narrative — onset (acute vs. insidious), fever pattern, bone/joint pain (site, character, nocturnal), bleeding (epistaxis, gum, petechiae), pallor, fatigue, infections, mass (site, growth rate, pain), B-symptoms (fever, night sweats, weight loss), neurological symptoms (headache, vomiting, vision, seizures, focal deficits)" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Previous cancers, chemotherapy/radiation, congenital syndromes (Down, NF1, Beckwith-Wiedemann, Li-Fraumeni), immunodeficiency, prior transfusion, central line history" },
        { key: "birthHistory", label: "Birth History", type: "textarea", rows: 1, placeholder: "Prematurity, neonatal tumors (e.g. neuroblastoma screening), congenital anomalies" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Chemotherapy protocol, antiemetics, growth factors (G-CSF), antibiotics (prophylactic/therapeutic), antifungals, antivirals, pain management, steroids" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Drug allergies (especially chemotherapy agents), latex, contrast" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Cancer in 1st/2nd degree relatives (type, age at diagnosis), genetic syndromes, consanguinity" },
        { key: "immunizationStatus", label: "Immunization Status", type: "text", placeholder: "Up to date? Live vaccines contraindicated if immunosuppressed. Previous VZV/MMR?" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "School attendance, family support, distance from hospital, financial barriers, sibling impact" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "CNS (headache, vomiting, vision changes, seizures, focal weakness), MSK (bone pain, limping), skin (rash, bruising), respiratory (cough, SOB — mediastinal mass?), abdominal (pain, distension, mass), infectious (fever, infections)" },
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
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "spo2", label: "SpO2 (%)", type: "number", min: 50, max: 100 },
          ],
        },
        {
          key: "anthropometry", label: "Growth Parameters", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number", required: true, min: 1, max: 150 },
            { key: "height", label: "Height (cm)", type: "number" },
            { key: "bsa", label: "BSA (m²)", type: "number", placeholder: "Mosteller formula" },
            { key: "weightCentile", label: "Weight Centile", type: "text" },
            { key: "heightCentile", label: "Height Centile", type: "text" },
          ],
        },
        { key: "generalAppearance", label: "General Appearance", type: "textarea", rows: 2, placeholder: "Ill/toxic vs well-appearing, pallor, jaundice, distress, distress from pain, alertness" },
        { key: "headAndNeck", label: "Head & Neck Exam", type: "textarea", rows: 2, placeholder: "Lymphadenopathy (site, size, matted, rubbery), thyroid, oral mucosa (mucositis, palatal petechiae, gum hypertrophy), fundoscopy (papilledema), cranial nerve exam" },
        { key: "chest", label: "Chest / Respiratory / CVS", type: "textarea", rows: 1, placeholder: "Mediastinal mass (SVC syndrome, tracheal deviation), pleural effusion, heart (pericardial effusion, JVP)" },
        { key: "abdomen", label: "Abdominal Exam", type: "textarea", rows: 2, placeholder: "Hepatomegaly, splenomegaly, abdominal mass (site, size, consistency, mobility), ascites" },
        { key: "msk", label: "Musculoskeletal Exam", type: "textarea", rows: 1, placeholder: "Bony tenderness, joint swelling, limping, range of motion, spinal tenderness" },
        { key: "skin", label: "Skin", type: "textarea", rows: 1, placeholder: "Pallor, petechiae, purpura, nodules, rash, jaundice, surgical scars, central line site (redness, discharge)" },
        { key: "neurological", label: "Neurological Exam", type: "textarea", rows: 2, placeholder: "GCS, cranial nerves, motor/sensory, gait, coordination, DTRs, fundoscopy (papilledema), signs of raised ICP" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis / Suspected Diagnosis", type: "text", required: true, placeholder: "e.g. B-cell ALL (standard risk), Wilms tumor stage III, Hodgkin lymphoma nodular sclerosis, Neuroblastoma high risk, Osteosarcoma left distal femur, Medulloblastoma" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "diseaseStatus", label: "Disease Status", type: "select", options: [{ label: "New diagnosis / Suspected", value: "New" }, { label: "Relapsed / Refractory", value: "Relapsed" }, { label: "Remission — End of treatment", value: "Remission" }, { label: "Surveillance / Long term follow-up", value: "FollowUp" }] },
        { key: "riskStratification", label: "Risk Stratification", type: "text", placeholder: "e.g. Standard risk ALL, High risk (N-myc amplified neuroblastoma), Favorable histology Wilms" },
        {
          key: "diagnoses", label: "Additional Diagnoses (Comorbidities)", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Comorbidity", value: "Comorbidity" }, { label: "Complication", value: "Complication" }] },
          ],
        },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 4, placeholder: "Synthesis of presentation, exam findings, and key investigation results — CBC with differential, peripheral smear, tumor markers (LDH, uric acid, AFP, beta-HCG), diagnostic imaging (US, CT, MRI, PET-CT), tissue diagnosis (biopsy/FNA/histopathology), BM biopsy/aspirate, CSF cytology" },
        { key: "staging", label: "Staging / Extent of Disease", type: "textarea", rows: 2, placeholder: "e.g. ALL: CNS status (CSF cytology), testicular. Wilms: stage I-IV. Neuroblastoma: INSS stage, imaging-defined risk factors. Hodgkin: Ann Arbor stage + B symptoms. Osteosarcoma: AJCC stage + lung mets" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatmentProtocol", label: "Proposed Treatment Protocol / Strategy", type: "textarea", required: true, rows: 3, placeholder: "e.g. Induction chemotherapy per ICiCLe/UKALL protocol, NEOPHOLL, SIOPEL, COG protocol. Surgery approach, radiation plan. Neoadjuvant vs adjuvant. Transplant plan if applicable." },
        {
          key: "chemotherapy", label: "Chemotherapy Plan", type: "repeating", fields: [
            { key: "phase", label: "Phase", type: "text", placeholder: "e.g. Induction, Consolidation, Maintenance" },
            { key: "drugs", label: "Drugs & Dosing (per m² BSA/kg)", type: "textarea", rows: 1, placeholder: "Details of agents, doses, schedule" },
            { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 4 weeks, 28-day cycle" },
          ],
        },
        {
          key: "investigations", label: "Investigations — Baseline & Staging", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. CBC, diff, LDH, uric acid, BUN/Cr, LFTs, coagulation, bone marrow aspirate + biopsy, CSF cytology, cytogenetics (PCR, FISH, karyotype), MRD, echo, US/CT/MRI/PET-CT, biopsy, tumor markers" },
            { key: "status", label: "Status", type: "select", options: [{ label: "Done", value: "Done" }, { label: "Pending", value: "Pending" }, { label: "Sent", value: "Sent" }] },
          ],
        },
        {
          key: "supportiveCare", label: "Supportive Care Plan", type: "textarea", rows: 4, placeholder: "TLS prophylaxis (allopurinol, rasburicase, IV hydration), antiemetics (aprepitant, ondansetron), G-CSF, transfusion support (platelet threshold, PRBC), PCP prophylaxis (cotrimoxazole), antifungal prophylaxis, antivirals (acyclovir if VZV), oral care (mucositis), central line care, pain management, nutrition (TPN/NG), psychology/school liaison" },
        {
          key: "complications", label: "Monitoring for Complications", type: "textarea", rows: 2, placeholder: "TLS (labs q6-8h during induction), febrile neutropenia protocol, tumor lysis, methotrexate toxicity, cardiomyopathy (anthracycline), hearing loss (cisplatin), nephrotoxicity, hepatotoxicity, pancreatitis (asparaginase), SOS/VOD, GVHD (if post-BMT)" },
        { key: "consults", label: "Consults / Multidisciplinary Team", type: "textarea", rows: 2, placeholder: "Medical oncology, radiation oncology, surgery, pathology, radiology, BMT team, pharmacist, nutritionist, social work, psychology, child life, school liaison" },
        {
          key: "clinicalTrial", label: "Clinical Trial Consideration", type: "textarea", rows: 1, placeholder: "Eligible protocols? Consent/discussion status" },
        { key: "longTermPlan", label: "Long-term Follow-up Plan", type: "textarea", rows: 2, placeholder: "Surveillance schedule (imaging, labs), late effects monitoring (cardiac, endocrine, neurocognitive), transition planning" },
        { key: "patientEducation", label: "Parent/Patient Education", type: "textarea", rows: 2, placeholder: "Diagnosis explanation, treatment phases, expected side effects, when to seek emergency care (fever, bleeding), central line care, vaccination deferral" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive pediatric oncology consultation — establishes baseline before treatment initiation including staging, risk stratification, protocol planning, supportive care, and multidisciplinary referral",
    specialties: ["Pediatric Oncology"],
    status: "active",
  },
};


export const PAED_ONCOLOGY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "paed-oncology-followup",
  name: "Pediatric Oncology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "treatmentPhase", label: "Current Treatment Phase / Cycle", type: "text", placeholder: "e.g. ALL Consolidation day 14, Cycle 3 of 6" },
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Tolerance of last cycle, toxicities (mucositis, fever, infections, nausea, pain), transfusion requirements, admissions since last visit, appetite, energy, school attendance, mood" },
        { key: "fever", label: "Fever? Any infections?", type: "textarea", rows: 1, placeholder: "Febrile episodes, neutropenia, antibiotic courses, line infections" },
        { key: "pain", label: "Pain / Symptoms", type: "textarea", rows: 1 },
        { key: "medicationChanges", label: "Medication Changes Since Last Visit", type: "textarea", rows: 2, placeholder: "Dose adjustments held/delayed, new supportive care meds" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "temp", label: "Temp (°C)", type: "number", placeholder: "Current" },
            { key: "hr", label: "HR", type: "number" },
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "weight", label: "Weight (kg)", type: "number" },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Focus on treatment effects — oral mucositis, line site, lymphadenopathy, abdominal mass, neurological changes, skin rash/jaundice, capillary leak" },
        { key: "labs", label: "Labs Today / Since Last Visit", type: "textarea", rows: 2, placeholder: "CBC, diff, platelets, LDH, uric acid, LFTs, BUN/Cr, drug levels (MTX), CRP, MRD status if available" },
        { key: "imaging", label: "Imaging Results (if any)", type: "textarea", rows: 1 },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diseaseResponse", label: "Disease Response / Status", type: "textarea", required: true, rows: 2, placeholder: "e.g. MRD negative at end of induction, day 29 BM remission, stable disease on PET-CT, evidence of progression" },
        { key: "toxicities", label: "Treatment Toxicities / Adverse Events (CTCAE grade)", type: "textarea", rows: 2, placeholder: "Mucositis (Gr2), febrile neutropenia (Gr3), thrombocytopenia (Gr4), MTX hepatotoxicity — dose adjustments made" },
        { key: "overallAssessment", label: "Overall Assessment", type: "textarea", rows: 2, placeholder: "Status of current protocol phase, toxicities, tolerability, need for dose reduction/delay" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "nextTreatment", label: "Next Treatment Cycle / Phase", type: "textarea", rows: 2, placeholder: "Continue with next cycle on schedule, dose modifications, hold/change due to toxicity" },
        { key: "supportiveCare", label: "Supportive Care Adjustments", type: "textarea", rows: 2, placeholder: "Adjust antiemetics, transfusions (thresholds), growth factors, infection prophylaxis" },
        { key: "nextVisit", label: "Next Appointment / Cycle Day", type: "text", placeholder: "e.g. Day 21 of cycle, 2 weeks" },
        { key: "patientInstructions", label: "Patient / Parent Instructions", type: "textarea", rows: 1, placeholder: "Warning signs, medications, upcoming tests" },
      ],
    },
  ],
  metadata: {
    description: "Interim oncology follow-up assessing treatment tolerance, toxicities (CTCAE grading), disease response (MRD, imaging), and adjustments to ongoing protocol",
    specialties: ["Pediatric Oncology"],
    status: "active",
  },
};


export const PAED_ONCOLOGY_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "paed-oncology-admission",
  name: "Pediatric Oncology Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Febrile neutropenia, tumor lysis syndrome, disease progression, pain crisis, respiratory distress from mediastinal mass, new focal neurological deficits, SVC syndrome, bleeding" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — current oncologic diagnosis, treatment phase (which cycle, day), onset and evolution of symptoms, fever (max temp, duration, rigors), bleeding (site, severity), pain (site, severity), neurological changes, response to treatment at home" },
      ],
    },
    {
      key: "background",
      label: "Oncology Background",
      fields: [
        { key: "diagnosis", label: "Oncologic Diagnosis", type: "text", required: true, placeholder: "e.g. B-ALL standard risk, Wilms tumor stage II, Hodgkin lymphoma" },
        { key: "protocol", label: "Current Treatment Protocol & Phase", type: "textarea", rows: 2, placeholder: "Protocol name, phase/cycle, day of cycle, date of last chemotherapy, upcoming treatment" },
        { key: "status", label: "Disease Status", type: "select", options: [{ label: "Newly diagnosed (pre-treatment)", value: "New" }, { label: "On active treatment", value: "Active" }, { label: "Relapsed", value: "Relapsed" }, { label: "End of life / Palliative", value: "Palliative" }] },
        { key: "history", label: "Relevant Medical History", type: "textarea", rows: 2, placeholder: "Previous chemotherapy cycles, radiation, surgeries, BMT/SCT, complications (VOD, pancreatitis, neuropathy), allergic reactions to chemotherapy" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "codeStatus", label: "Code Status", type: "select", options: [{ label: "Full Code", value: "Full" }, { label: "DNR/DNI", value: "DNR" }, { label: "Comfort Care", value: "Comfort" }] },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        {
          key: "vitals", label: "Vitals on Admission", type: "section", fields: [
            { key: "temp", label: "Temp (°C)", type: "number" },
            { key: "hr", label: "HR (bpm)", type: "number" },
            { key: "rr", label: "RR (/min)", type: "number" },
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "spo2", label: "SpO2 (%)", type: "number" },
          ],
        },
        {
          key: "anthropometry", label: "Anthropometry", type: "section", fields: [
            { key: "weight", label: "Weight (kg)", type: "number", required: true },
            { key: "bsa", label: "BSA (m²)", type: "number" },
          ],
        },
        { key: "generalExam", label: "General & Systemic Exam", type: "textarea", rows: 3, placeholder: "Pallor, petechiae, purpura, hydration, oral mucositis grading, central line site (erythema, discharge, tenderness), lymphadenopathy, hepatosplenomegaly, abdominal mass, neurological status (GCS, focal deficits, papilledema), respiratory (distress, wheeze, mediastinal mass effects)" },
        { key: "relevantLabs", label: "Relevant Labs at Admission", type: "textarea", rows: 3, placeholder: "CBC + diff + platelet, LDH, uric acid, BUN/Cr, LFTs, K+, Ca++, PO4, coagulation profile, CRP, blood cx, CRP, drug levels (if MTX), viral PCR (CMV, EBV if post-BMT)" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Admission Diagnosis", type: "textarea", required: true, rows: 2, placeholder: "e.g. Febrile neutropenia Gr4 in patient with B-ALL on consolidation (Cycle 2)" },
        { key: "severity", label: "Severity / Risk", type: "select", options: [{ label: "Low risk", value: "Low" }, { label: "High risk (ANC <100, septic shock, lung mets, central line)", value: "High" }, { label: "Critical / Life-threatening", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. Blood cultures x2, CBC q12h, BMP q8h (TLS), CRP, CXR, empiric broad-spectrum antibiotics (cefepime/piptazo) ± aminoglycoside ± vancomycin, antifungal if prolonged fever, IV fluids (D5 1/2NS + KCL), antiemetics" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Febrile neutropenia: empiric abx (per protocol), G-CSF (if indicated), transfusion support (platelets if <10k/bleeding, PRBC if Hgb <7), TLS management (IV fluids, allopurinol, rasburicase, electrolyte monitoring q6-8h), pain management (PCA, adjuvants), mucositis care, antifungal escalation if persistent fever >72-96h" },
        { key: "monitoringPlan", label: "Monitoring Plan", type: "textarea", rows: 2, placeholder: "Vitals q1-4h, CNS monitoring if neuro symptoms, I/O, daily weight, CBC/diff/platelet q12-24h, LDH/uric acid/creatinine/phosphate/K+ q6-8h (TLS), drug levels (MTX, tacro if post-BMT), blood cx from central line and peripheral" },
        { key: "isolation", label: "Isolation / Infection Prevention", type: "select", options: [{ label: "Standard", value: "Standard" }, { label: "Neutropenic precautions", value: "Neutropenic" }, { label: "Contact (VRE/C diff)", value: "Contact" }, { label: "Respiratory (droplet/airborne)", value: "Respiratory" }] },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Infectious disease, PICU (if shock/ventilatory support), oncology attending, nutrition, pain service, social work if new diagnosis" },
        { key: "dischargeCriteria", label: "Discharge Criteria", type: "textarea", rows: 1, placeholder: "Afebrile x48h, ANC recovery >500, negative cultures, tolerating PO, pain controlled, stable vitals" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission for pediatric oncology emergencies — febrile neutropenia, TLS, disease progression, treatment-related toxicity, and supportive care escalation",
    specialties: ["Pediatric Oncology"],
    status: "active",
  },
};


export const PAED_ONCOLOGY_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "paed-oncology-procedure",
  name: "Pediatric Oncology Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureDetails",
      label: "Procedure Details",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "textarea", required: true, rows: 1, placeholder: "e.g. Lumbar puncture with intrathecal chemotherapy, Bone marrow aspiration + biopsy, Central line placement/removal (Port-a-Cath/Hickman/PICC), Tumor biopsy, Ommaya reservoir tap" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2, placeholder: "e.g. CNS prophylaxis (IT MTX day 15 of consolidation), BM assessment for MRD at end of induction, Stage III neuroblastoma tumor biopsy" },
        { key: "consent", label: "Consent Obtained", type: "boolean", required: true },
        { key: "consentDiscussant", label: "Consent Discussed With", type: "text", placeholder: "Parent/guardian, patient (if age-appropriate), legal guardian" },
        { key: "preProcedureChecklist", label: "Pre-Procedure Checklist", type: "section", fields: [
          { key: "coagulation", label: "Coagulation labs (PT/PTT/INR, platelets)", type: "boolean" },
          { key: "informedConsent", label: "Informed consent signed", type: "boolean" },
          { key: "timeOut", label: "Surgical time-out performed (correct patient, procedure, site)", type: "boolean" },
          { key: "antibiotics", label: "Antibiotic prophylaxis given (if indicated)", type: "boolean" },
          { key: "anesthesia", label: "Anesthesia/sedation plan confirmed", type: "boolean" },
          { key: "allergyCheck", label: "Allergy check (lidocaine, chlorhexidine, latex, chemotherapy)", type: "boolean" },
          { key: "heparinFlush", label: "Heparin/saline flush available (for central line access)", type: "boolean" },
        ] },
        { key: "anesthesia", label: "Anesthesia / Sedation", type: "select", options: [{ label: "General anesthesia (GA)", value: "GA" }, { label: "Conscious sedation (Ketamine/Propofol)", value: "Sedation" }, { label: "Local anesthesia only", value: "Local" }, { label: "None (awake)", value: "None" }] },
      ],
    },
    {
      key: "procedureLog",
      label: "Procedure Log",
      fields: [
        { key: "time", label: "Date & Time", type: "text", required: true },
        { key: "location", label: "Location", type: "select", options: [{ label: "OR", value: "OR" }, { label: "Procedure Room (oncology unit)", value: "ProcedureRoom" }, { label: "PICU", value: "PICU" }, { label: "Bedside", value: "Bedside" }] },
        { key: "operator", label: "Operator", type: "text", placeholder: "Attending/fellow/resident name" },
        { key: "supervisor", label: "Supervising Attending", type: "text" },
        { key: "assistant", label: "Assistant(s)", type: "text" },
        { key: "sterility", label: "Sterile Technique", type: "select", options: [{ label: "Full sterile (gown, gloves, mask, cap, drape)", value: "Full" }, { label: "Clean technique", value: "Clean" }] },
        { key: "position", label: "Patient Position", type: "text", placeholder: "e.g. Lateral decubitus (LP), prone (BM), supine" },
        { key: "prep", label: "Prep & Drape", type: "text", placeholder: "e.g. Chlorhexidine + sterile drape" },
        { key: "needle", label: "Needle/Catheter Used", type: "text", placeholder: "e.g. 22G spinal needle, 11G BM needle, Port-access Huber needle" },
        { key: "approach", label: "Approach / Landmarks", type: "textarea", rows: 1, placeholder: "e.g. L4-L5 interspace for LP (midline approach), posterior iliac crest for BMA, right subclavian vein for Port insertion" },
        { key: "findings", label: "Intra-procedure Findings", type: "textarea", rows: 2, placeholder: "LP: opening pressure, CSF appearance (clear/turbid/bloody), number of tubes collected. BM: appearance (particulate), aspiration dry tap? Core biopsy length. Central line: vessel patency, blood return confirmation. Biopsy: specimen gross appearance, sample adequacy." },
        { key: "roundsAttempts", label: "Number of Attempts", type: "number", min: 1, placeholder: "e.g. 1" },
        { key: "chemotherapy", label: "Intrathecal Chemotherapy (if applicable)", type: "section", fields: [
          { key: "drug", label: "Drug(s)", type: "text", placeholder: "e.g. Methotrexate 12 mg, Hydrocortisone 25 mg, Cytarabine 30 mg" },
          { key: "volume", label: "Volume given (mL)", type: "text" },
          { key: "batch", label: "Batch/Preparation verified (2-person check)", type: "boolean" },
        ] },
        { key: "bloods", label: "Blood Samples Obtained During Procedure", type: "textarea", rows: 1, placeholder: "e.g. BM aspirate for morphology, flow cytometry, cytogenetics, MRD; trough drug levels" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "e.g. Bleeding, CSF leak, vasovagal episode, pain, sedation-related hypoxia, failed attempt (referred to attending)" },
        { key: "hemostasis", label: "Hemostasis Achieved", type: "boolean" },
        { key: "dressing", label: "Dressing Applied", type: "text", placeholder: "e.g. Pressure dressing x5 min, Steri-Strips + Tegaderm, suture x1 (port)" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "condition", label: "Patient Condition Post-Procedure", type: "textarea", rows: 1, placeholder: "Stable, transferred to recovery/PACU/ward on same sedation level. Pain controlled. Vitals stable." },
        { key: "postProcedureOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "Bed rest x1hr (LP), flat lying for headache prevention. BM: pressure dressing x10 min, monitor site for bleeding. Port: heparin/saline lock. Pain management (acetaminophen). Neurological observations (if LP with sedation q15min x1hr)." },
        { key: "specimen", label: "Specimens Sent To", type: "text", placeholder: "e.g. Pathology, Flow cytometry, Cytogenetics, Microbiology" },
        { key: "followUp", label: "Follow-up / Next steps", type: "textarea", rows: 1, placeholder: "Await pathology results. Next cycle due in 2 weeks. Review at next MDT." },
      ],
    },
  ],
  metadata: {
    description: "Procedural note template for pediatric oncology procedures — LP + IT chemotherapy, bone marrow aspirate/biopsy, central line placement/removal, tumor biopsy, with pre-procedure checklist, sterile preparation, intraoperative findings, and post-procedure care",
    specialties: ["Pediatric Oncology"],
    status: "active",
  },
};
