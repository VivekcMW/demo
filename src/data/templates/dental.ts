import type { TemplateDefinition } from "../templateSchema";

export const DENTAL_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "dental-consult",
  name: "Dental / Maxillofacial OPD Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Toothache, swollen gums, missing tooth, jaw pain, oral ulcer, difficulty chewing, facial swelling, impacted tooth" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 days, recurring for months" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Pain (location/severity/duration/triggers — hot/cold/sweet/biting, radiation), swelling (onset, progression), bleeding gums, halitosis, taste changes, tooth mobility, difficulty opening mouth (trismus), trauma history, prior dental procedures" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "DM, HTN, bleeding disorders, immunocompromise, cardiac conditions (IE prophylaxis), pregnancy, bisphosphonate therapy, CKD" },
        { key: "pastDentalHistory", label: "Past Dental History", type: "textarea", rows: 2, placeholder: "Last dental visit, fillings, extractions, root canals, crowns/bridges, implants, orthodontic treatment, scaling, oral hygiene habits" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Analgesics, antibiotics, anticoagulants, antiplatelets, bisphosphonates, immunosuppressants" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "LA allergy (lidocaine), antibiotic allergy, latex allergy" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Periodontal disease, oral cancer, malocclusion" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, smokeless tobacco (gutka/pan), alcohol, betel nut, oral hygiene (brushing/flossing frequency), sugar intake" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Constitutional, ENT, neck (lymphadenopathy), TMJ (clicking/pain/crepitus)" },
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
          ],
        },
        {
          key: "extraOralExam", label: "Extra-Oral Exam", type: "section", fields: [
            { key: "face", label: "Face / Symmetry", type: "text", placeholder: "Swelling, asymmetry, sinus tenderness, TMJ exam (opening, deviation, clicking, tenderness)" },
            { key: "lymphNodes", label: "Lymph Nodes", type: "text", placeholder: "Submandibular, submental, cervical — size, tenderness, fixity" },
            { key: "neck", label: "Neck", type: "text", placeholder: "Range of motion, masses, thyroid" },
          ],
        },
        {
          key: "intraOralExam", label: "Intra-Oral Exam", type: "section", fields: [
            { key: "softTissues", label: "Soft Tissues (lips, buccal mucosa, palate, tongue, floor of mouth)", type: "textarea", rows: 1, placeholder: "Lesions, ulcers, leukoplakia, erythroplakia, swelling, color changes" },
            { key: "gingiva", label: "Gingiva / Periodontium", type: "textarea", rows: 1, placeholder: "Color (pink/red), contour, bleeding on probing, recession, pocket depth, attachment loss, suppuration" },
            { key: "teeth", label: "Teeth", type: "textarea", rows: 2, placeholder: "Caries (site/class), restorations (type/condition), crowns, bridges, implants, fractures, mobility (grade I-III), attrition/abrasion/erosion, occlusion (Angle class I/II/III), missing teeth" },
            { key: "tongue", label: "Tongue", type: "text", placeholder: "Coating, fissures, scalloping, ulcers, leukoplakia, atrophy, movement" },
          ],
        },
        {
          key: "radiographs", label: "Radiographic Findings", type: "textarea", rows: 2, placeholder: "OPG, IOPA, CBCT findings — caries depth, periapical pathology, bone loss, impacted teeth, TMJ changes, cyst/tumor" },
        { key: "periodontalCharting", label: "Periodontal Charting", type: "textarea", rows: 1, placeholder: "Pocket depths, furcation involvement, mobility, bleeding index" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Dental caries (tooth #16), Chronic periodontitis, Impacted mandibular third molar, Oral submucous fibrosis" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "tooth", label: "Tooth #", type: "text" },
          ],
        },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Treatment Plan",
      fields: [
        { key: "treatmentSummary", label: "Treatment Plan Summary", type: "textarea", required: true, rows: 3, placeholder: "Restorative (filling/crown), endodontic (RCT), surgical (extraction, impaction, implant), periodontal (scaling/root planing, flap surgery), prosthetic (crown/bridge/denture), orthodontic, oral medicine (biopsy/excision), TMJ therapy" },
        {
          key: "proceduresPlanned", label: "Procedures Planned", type: "repeating", fields: [
            { key: "procedure", label: "Procedure", type: "text", placeholder: "e.g. Class II composite #16, extraction #38, scaling" },
            { key: "tooth", label: "Tooth #", type: "text" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Immediate", value: "Immediate" }, { label: "Within 1 week", value: "1week" }, { label: "Elective", value: "Elective" }] },
          ],
        },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. OPG, CBCT, pulp sensibility test, biopsy" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }] },
          ],
        },
        {
          key: "medications", label: "Prescriptions", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "frequency", label: "Frequency", type: "text" },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "oralHygieneInstructions", label: "Oral Hygiene Instructions", type: "textarea", rows: 2, placeholder: "Brushing technique, flossing, mouth rinses, dietary advice (reduce sugar/mucoadhesive foods), smoking cessation counseling" },
        { key: "patientEducation", label: "Patient Education", type: "textarea", rows: 2, placeholder: "Treatment options explained, risks/benefits, cost estimate discussed, consent process for planned procedures" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Oral surgeon, periodontist, endodontist, orthodontist, prosthodontist, ENT, oncology" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Next appointment for restorative, review in 1 week, 6-month recall" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Dentistry & Maxillofacial Surgery with full oral examination and treatment planning",
    specialties: ["Dentistry"],
    status: "active",
  },
};

export const DENTAL_FOLLOWUP_TEMPLATE: TemplateDefinition = {

  id: "dental-followup",
  name: "Dental / Maxillofacial Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Post-procedure recovery, pain, swelling, bleeding, sensitivity, chewing function, healing concerns" },
        { key: "medicationAdherence", label: "Medication / Post-Op Compliance", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects / Complications", type: "textarea", rows: 1, placeholder: "Dry socket, infection, nerve paresthesia, trismus, allergic reaction" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "extraOral", label: "Extra-Oral Exam", type: "textarea", rows: 1, placeholder: "Swelling, trismus, lymphadenopathy, TMJ function" },
        { key: "intraOral", label: "Intra-Oral Exam", type: "textarea", rows: 2, placeholder: "Wound healing, socket status, suture integrity, restoration integrity, periodontal health, occlusion" },
        { key: "radiograph", label: "Radiograph (if taken)", type: "text", placeholder: "e.g. Post-op OPG, PA — healing extraction socket, implant position" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "healingStatus", label: "Healing Status", type: "select", options: [{ label: "Satisfactory — healing well", value: "Satisfactory" }, { label: "Delayed healing", value: "Delayed" }, { label: "Complication (infection/dry socket/nerve injury)", value: "Complication" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "nextProcedure", label: "Next Procedure / Treatment Phase", type: "textarea", rows: 2, placeholder: "Continue treatment plan (next tooth, restorative phase, prosthetic phase), suture removal, further investigations" },
        { key: "medicationChanges", label: "Medication Changes", type: "text", placeholder: "Analgesics, antibiotics, mouth rinse" },
        { key: "complicationManagement", label: "Complication Management (if needed)", type: "textarea", rows: 1, placeholder: "Dry socket dressing, antibiotics for infection, referral for nerve injury" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 week / 2 weeks / 1 month / 6-month recall" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Dental / Maxillofacial patients with post-procedural healing assessment",
    specialties: ["Dentistry"],
    status: "active",
  },
};

export const DENTAL_PROCEDURE_TEMPLATE: TemplateDefinition = {

  id: "dental-procedure",
  name: "Dental / Maxillofacial Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Extraction (simple/surgical), Root canal treatment (RCT), Scaling & root planing (SRP), Dental implant placement, Crown preparation, Biopsy (incisional/excisional), Orthognathic surgery, TMJ arthroscopy, Drainage of dental abscess, Surgical removal of impacted tooth, Cyst enucleation, Fracture mandible ORIF" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "toothSite", label: "Tooth / Site", type: "text", placeholder: "e.g. #16, #38 (impacted), mandible left body" },
        { key: "preOpPrep", label: "Pre-Op Preparation", type: "textarea", rows: 2, placeholder: "Antibiotic prophylaxis (if needed), anticoagulation management, radiographs reviewed (OPG/IOPA/CBCT), local anesthesia, sedation plan" },
        { key: "anesthesia", label: "Anesthesia", type: "select", options: [{ label: "Local (lidocaine 2% with epi)", value: "LA" }, { label: "LA + sedation", value: "LASedation" }, { label: "GA", value: "GA" }, { label: "Regional block", value: "Regional" }] },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. Dental chair, OT, minor procedure room" },
        { key: "dentist", label: "Dentist / Surgeon", type: "text" },
        { key: "findings", label: "Findings", type: "textarea", required: true, rows: 3, placeholder: "Pre-op and intra-op findings — tooth condition, bone quality, infection, anatomy, nerve proximity, cyst/tumor extent" },
        { key: "procedureDetails", label: "Procedure Details", type: "textarea", required: true, rows: 3, placeholder: "Step-by-step — incision, flap elevation, bone removal, tooth sectioning, implant site preparation, obturation, closure method, sutures, packing" },
        { key: "materialsUsed", label: "Materials / Implants / Grafts Used", type: "text", placeholder: "e.g. Implant 4.3×10mm Straumann, bone graft Bio-Oss 0.5g, membrane, MTA, gutta-percha" },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "e.g. Cyst lining for HPE, extracted tooth, bone biopsy" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Bleeding, nerve injury (IAN/lingual), sinus perforation, fracture, root fracture, perforation, failed anesthesia" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Hemostasis achieved, tolerated well, post-op instructions given" },
        { key: "postOpOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "Analgesics, antibiotics, chlorhexidine mouth rinse, ice pack, soft diet, activity restriction, smoking cessation" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Discharged home", value: "Home" }, { label: "Observe 1-2 hrs", value: "Observe" }, { label: "Admitted", value: "Admitted" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "textarea", rows: 1, placeholder: "Suture removal (day 7-14), review in 2 weeks, final restoration appointment, histopathology follow-up, implant uncovering" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive dental procedure note — extractions, RCT, scaling, implants, biopsy, orthognathic surgery, TMJ, trauma, and oral surgery procedures",
    specialties: ["Dentistry"],
    status: "active",
  },
};
