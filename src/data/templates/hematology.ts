import type { TemplateDefinition } from "../templateSchema";

export const HEMATOLOGY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "hematology-consult",
  name: "Hematology OPD Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Easy bruising/bleeding, fatigue/pallor, recurrent infections, fever of unknown origin, lymphadenopathy, splenomegaly, abnormal blood counts" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 weeks, progressive over months, lifelong" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Anemia symptoms (fatigue, dyspnea, palpitations, pallor), bleeding (epistaxis/gingival/menorrhagia/echymosis/petechiae/hemarthrosis), infections (frequency/severity/type), B-symptoms (fever/night sweats/weight loss), thrombosis (site/recurrence), bone pain, abdominal fullness (splenomegaly), pruritus" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Anemia (type), bleeding disorders (hemophilia/vWD), thrombophilia (DVT/PE), sickle cell disease, thalassemia, previous transfusions, hematological malignancy, autoimmune disease, chronic infection (HCV/HIV/EBV), renal/liver disease" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 1, placeholder: "Splenectomy, lymph node biopsy, bone marrow biopsy (previous), tonsillectomy" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Anticoagulants, antiplatelets, iron/B12/folate supplements, ESA, growth factors, hydroxyurea, tyrosine kinase inhibitors, chelation therapy, steroids, immunosuppressants" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Transfusion reactions, drug allergies (allopurinol, rasburicase)" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Hemoglobinopathies (sickle cell/thalassemia), hemophilia, thrombophilia, hematological malignancies in first-degree relatives" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, occupation (chemical/radiation exposure), travel (malaria endemic area), IV drug use" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "Constitutional (B-symptoms), skin (pallor/petechiae/purpura), ENT (bleeding), GI (melena/hematochezia), GU (hematuria/menorrhagia), CNS (headache/visual changes/TIA), MSK (bone/joint pain), CVS (dyspnea, palpitations)" },
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
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
            { key: "weight", label: "Weight", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalAppearance", label: "General Exam", type: "textarea", rows: 1, placeholder: "Pallor, icterus, petechiae, purpura, ecchymosis, gum hypertrophy, oral petechiae/ulcers, lymphadenopathy (site/size/consistency/fixity)" },
        {
          key: "hematologicalExam", label: "Hematological Exam", type: "section", fields: [
            { key: "lymphNodes", label: "Lymph Node Exam", type: "text", placeholder: "Cervical, supraclavicular, axillary, inguinal — number, size, consistency, matting" },
            { key: "spleen", label: "Spleen", type: "text", placeholder: "Not palpable / palpable (cm below costal margin / Hackett grade)" },
            { key: "liver", label: "Liver", type: "text", placeholder: "Not palpable / span in cm / tender" },
            { key: "boneTenderness", label: "Bone Tenderness", type: "text", placeholder: "Sternum, tibia, other long bones" },
          ],
        },
        { key: "CVS", label: "CVS Exam (anemia assessment)", type: "text", placeholder: "Flow murmur (hemic), signs of high-output failure" },
        { key: "neurological", label: "Neurological Exam (B12/coagulopathy)", type: "text", placeholder: "Vibration sense, proprioception, gait (subacute combined degeneration), CN deficits (coagulopathy)" },
        {
          key: "cbcSummary", label: "CBC Review / Peripheral Smear", type: "textarea", rows: 2, placeholder: "Hb 7.2 (normocytic/normochromic), WBC 2.1 (Neutropenia), Plt 45K. Smear: anisopoikilocytosis, schistocytes, blasts, spherocytes, sickle cells" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Iron deficiency anemia, Chronic lymphocytic leukemia (CLL), Acute myeloid leukemia (AML), Multiple myeloma, Immune thrombocytopenia (ITP), Deep vein thrombosis / Thrombophilia, Hemophilia A, Sickle cell disease with vaso-occlusive crisis" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
          ],
        },
        { key: "riskStratification", label: "Risk Stratification / Prognostic Score", type: "text", placeholder: "e.g. IPSS-R (MDS), FLIPI (follicular lymphoma), R-IPI (DLBCL), ISS (myeloma), CHA2DS2-VASc, HAS-BLED, Wells score" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis — CBC trends, diagnosis, stage/risk, treatment status" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Iron/B12/folate replacement, transfusions (PRBC/platelets/FFP/cryo), chemotherapy regimen, targeted therapy (TKIs, mAbs), anticoagulation/antiplatelets, immunomodulators, growth factors (G-CSF/ESA), chelation, apheresis, splenectomy, stem cell transplant discussion" },
        {
          key: "investigations", label: "Investigations / Staging", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. CBC with diff, reticulocyte count, peripheral smear, iron studies, B12/folate, LDH, uric acid, coagulation profile, Hb electrophoresis, direct Coombs, bone marrow aspiration/biopsy, flow cytometry, cytogenetics/FISH, molecular panel, PET-CT" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Oral", value: "Oral" }, { label: "IV", value: "IV" }, { label: "SC", value: "SC" }] },
            { key: "schedule", label: "Schedule", type: "text" },
          ],
        },
        { key: "supportiveCare", label: "Supportive Care", type: "textarea", rows: 2, placeholder: "Transfusion threshold (Hb <7, Plt <10K), infection prophylaxis (antivirals/ antifungals/ PCP prophylaxis), tumor lysis prophylaxis (allopurinol/rasburicase/hydration), growth factors, antiemetics" },
        { key: "vaccinations", label: "Vaccinations / Infection Prophylaxis", type: "textarea", rows: 1, placeholder: "Influenza, pneumococcal, COVID-19, hepatitis B, meningococcal (post-splenectomy/eculizumab)" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Bone marrow transplant, radiation oncology, interventional radiology (biopsy), infectious disease, transfusion medicine, clinical genetics, psychology" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 1 week (CBC check), 2 weeks, 1 month (next chemo cycle), 3 months" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Hematology — anemia, cytopenias, hematological malignancies, bleeding & thrombotic disorders",
    specialties: ["Hematology"],
    status: "active",
  },
};


export const HEMATOLOGY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "hematology-followup",
  name: "Hematology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History / Treatment Review", type: "textarea", required: true, rows: 3, placeholder: "CBC results (from patient/lab), symptoms (bleeding, fatigue, infections, B-symptoms, bone pain), treatment tolerance, side effects, transfusion requirement" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects / Toxicity", type: "textarea", rows: 2, placeholder: "Myelosuppression, neuropathy, nausea, rash, fatigue, infections, bleeding events" },
        { key: "transfusionsSinceLastVisit", label: "Transfusions Since Last Visit", type: "text", placeholder: "e.g. PRBC ×2 units, Platelets ×1" },
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
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 1, placeholder: "Pallor, lymph nodes, spleen/liver size, skin (petechiae), bleeding sites" },
        { key: "cbc", label: "CBC / Lab Summary Today", type: "text", placeholder: "e.g. Hb 9.8 (↑), WBC 3.2, ANC 1.5, Plt 120K" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diseaseStatus", label: "Disease Status", type: "select", options: [{ label: "Complete remission (CR)", value: "CR" }, { label: "Partial remission (PR)", value: "PR" }, { label: "Stable disease (SD)", value: "SD" }, { label: "Progressive disease (PD)", value: "PD" }, { label: "Relapse", value: "Relapse" }, { label: "Stable — on treatment", value: "StableOnRx" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Synthesis of CBC trends, treatment response, and toxicity" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "nextCycle", label: "Next Treatment / Cycle", type: "textarea", rows: 2, placeholder: "Continue, dose adjust (reduce/delay), switch regimen, hold for toxicity, transfusion plan" },
        { key: "supportiveCare", label: "Supportive Care Adjustments", type: "textarea", rows: 1, placeholder: "Growth factors, antiemetics, infection prophylaxis" },
        { key: "investigations", label: "Investigations Due", type: "text", placeholder: "e.g. Bone marrow biopsy, PET-CT, MRD assessment, iron studies" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. Next cycle day 1, 1 week for CBC nadir, 3 months" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Hematology with CBC trends, treatment response, and toxicity management",
    specialties: ["Hematology"],
    status: "active",
  },
};


export const HEMATOLOGY_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "hematology-admission",
  name: "Hematology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Febrile neutropenia, severe anemia, acute leukemia induction, sickle cell vaso-occlusive crisis, DVT/PE, bleeding (hemophilia), hyperleukocytosis, tumor lysis syndrome" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — fever/infection source, bleeding (site/severity), thrombosis (location/onset), pain crisis, transfusion requirement" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "hematologicalDx", label: "Hematological Diagnosis", type: "textarea", rows: 2, placeholder: "Diagnosis, stage, current treatment line/phase" },
        { key: "lastTreatment", label: "Last Treatment / Chemo Date", type: "text", placeholder: "e.g. Cycle 2 of 7+3, day 10" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Chemotherapy, targeted therapy, anticoagulants, factor replacement, prophylaxis" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Transfusion reactions, drug allergies" },
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
            { key: "spo2", label: "SpO₂", type: "number", min: 0, max: 100 },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 2, placeholder: "Pallor, petechiae, purpura, ecchymosis, lymphadenopathy, splenomegaly, hepatomegaly, bleeding sites, infection focus (mucositis, perianal, skin, line)" },
        { key: "cbcEmergency", label: "Critical Labs / CBC Today", type: "text", placeholder: "e.g. Hb 6.1, WBC 0.4 (ANC 80), Plt 8K, LDH 850, Uric acid 8.5" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity / Acuity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        { key: "anc", label: "ANC / Transfusion Thresholds", type: "text", placeholder: "e.g. ANC 80 (febrile neutropenia), Plt <10K (prophylactic transfusion)" },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC daily, cultures (blood/urine), CXR, broad-spectrum IV antibiotics, G-CSF, transfusion (PRBC/platelets/FFP/cryo), chemo hold, tumor lysis prophylaxis" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "IV antibiotics (febrile neutropenia protocol), transfusion support, G-CSF, hydration, tumor lysis management, chemotherapy (induction/consolidation), factor replacement (hemophilia), anticoagulation (PE/DVT), pain management (sickle cell crisis)" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Infectious disease, transfusion medicine, BMT team, interventional radiology for line insertion, oncology, critical care" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Hematology — febrile neutropenia, bleeding crises, acute leukemia, sickle cell crisis, thrombosis, and BMT admissions",
    specialties: ["Hematology"],
    status: "active",
  },
};


export const HEMATOLOGY_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "hematology-procedure",
  name: "Hematology Procedure / Transfusion Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Bone marrow aspiration & biopsy (BMA/BMB), Lumbar puncture with intrathecal chemotherapy, Peripheral blood stem cell harvest (apheresis), Therapeutic phlebotomy, Plasma exchange, Red cell exchange (sickle cell), Transfusion (PRBC/platelets/FFP/cryo/IVIG), Factor infusion" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpPrep", label: "Pre-Procedure Preparation", type: "textarea", rows: 2, placeholder: "CBC, coagulation profile, cross-match (if transfusion), type & screen, pre-medications (antipyretics/antihistamines/ steroids for transfusion reactions), vascular access" },
        { key: "anesthesia", label: "Anesthesia / Analgesia", type: "select", options: [{ label: "LA (lidocaine)", value: "LA" }, { label: "LA + sedation", value: "LASedation" }, { label: "GA", value: "GA" }, { label: "None", value: "None" }] },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. Procedure room, ICU bedside, apheresis unit" },
        { key: "clinician", label: "Clinician", type: "text" },
        { key: "findings", label: "Findings & Procedure Details", type: "textarea", required: true, rows: 4, placeholder: "BMA/BMB: site (PSIS/ASIS), aspirate quality (particles/spicules), biopsy length, touch preparations. LP: interspace, opening pressure, CSF appearance, IT chemo given. Apheresis: blood volume processed, product yield. Phlebotomy: volume removed. Transfusion: product type, volume, unit number, pre/post vitals" },
        { key: "specimens", label: "Specimens / Products", type: "text", placeholder: "e.g. BMA slides ×4, biopsy core (2cm), CSF for cytology/flow, PRBC unit #12345" },
        { key: "complications", label: "Complications / Reactions", type: "textarea", rows: 2, placeholder: "Bleeding, hematoma, vasovagal reaction, transfusion reaction (febrile/allergic/ hemolytic/TRALI/TACO), infection, post-dural puncture headache, CSFP hypotension" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Hemostasis achieved, vitals stable, tolerated well, post-procedure monitoring" },
        { key: "postOpOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "Bed rest (post-LP/flat for 1-2 hrs), pressure dressing, vitals monitoring, analgesia, transfusion reaction monitoring" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Discharged home", value: "Home" }, { label: "Ward", value: "Ward" }, { label: "Observe (transfusion reaction risk)", value: "Observe" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "text", placeholder: "e.g. Results in 7-10 days, next procedure date, next transfusion" },
      ],
    },
  ],
  metadata: {
    description: "Procedure note for hematological procedures — bone marrow biopsy, lumbar puncture + IT chemo, apheresis, transfusion, therapeutic phlebotomy, plasma exchange",
    specialties: ["Hematology"],
    status: "active",
  },
};
