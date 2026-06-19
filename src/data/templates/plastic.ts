import type { TemplateDefinition } from "../templateSchema";

export const PLASTIC_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "plastic-consult",
  name: "Plastic & Aesthetic Surgery Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Breast asymmetry, facial aging, burn scar, non-healing wound, skin lesion, congenital deformity, post-mastectomy reconstruction" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. Congenital, traumatic, progressive over years" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Main concern (aesthetic vs functional), onset (congenital/acquired/post-traumatic/post-surgical), progression, prior treatments (non-surgical/surgical), functional impact (e.g. breathing, hand function), patient expectations, motivation for consultation" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "DM, HTN, smoking, obesity, bleeding disorders, keloid/hypertrophic scar history, connective tissue disease, immunocompromise" },
        { key: "pastSurgicalHistory", label: "Past Surgical History / Prior Aesthetic Procedures", type: "textarea", rows: 2, placeholder: "Prior plastic surgery, fillers, botox, laser, breast surgery, liposuction, abdominoplasty, rhinoplasty, scar revisions" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Anticoagulants, antiplatelets, isotretinoin (recent), steroids, HRT, supplements" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "LA allergy, latex allergy, tape/dressing allergy" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Keloid scarring, breast cancer (for reconstruction), connective tissue disease" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking (critical for wound healing), alcohol, occupation, sun exposure" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Wound healing history, coagulation, cardiopulmonary fitness for surgery" },
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
            { key: "bmi", label: "BMI", type: "number", readOnly: true },
          ],
        },
        {
          key: "localExam", label: "Local / Regional Exam", type: "section", fields: [
            { key: "anatomy", label: "Anatomy & Measurements", type: "text", placeholder: "Site-specific measurements — breast (SN-N, N-IMF, sternal notch-N), facial proportions, limb circumference, scar dimensions" },
            { key: "skinQuality", label: "Skin Quality & Vascularity", type: "text", placeholder: "Skin laxity, scar type (hypertrophic/keloid/atrophic), pigmentation, tone, turgor, perfusion" },
            { key: "functionalAssessment", label: "Functional Assessment", type: "textarea", rows: 1, placeholder: "Motor function (hand/facial), nasal airway (rhinoplasty), ptosis grading (blepharoplasty), breast symmetry (reconstruction)" },
          ],
        },
        { key: "photoDocumentation", label: "Photo Documentation", type: "boolean" },
        { key: "lymphNodes", label: "Lymph Node Exam (if malignancy/skin cancer)", type: "text", placeholder: "Draining lymph node basins" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Breast ptosis (grade III), Rhinophyma, Post-burn scar contracture left forearm, Cleft lip (unilateral complete)" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "aestheticConcerns", label: "Aesthetic Concerns / Patient Goals", type: "textarea", rows: 2, placeholder: "Patient-reported goals and expectations — document specifically" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Surgical (rhinoplasty, facelift, blepharoplasty, breast augmentation/reduction/lift, abdominoplasty, liposuction, scar revision, cleft repair, hand surgery, microsurgery (DIEP/TRAM)), non-surgical (filler, botox, laser, PRP, microneedling, chemical peel)" },
        {
          key: "proceduresPlanned", label: "Procedures Planned", type: "repeating", fields: [
            { key: "procedure", label: "Procedure", type: "text" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Elective", value: "Elective" }, { label: "Semi-urgent", value: "SemiUrgent" }, { label: "Urgent (trauma)", value: "Urgent" }] },
          ],
        },
        { key: "investigations", label: "Investigations / Pre-Op Workup", type: "textarea", rows: 1, placeholder: "Routine labs, ECG, imaging (CT/MRI for microsurgery), 3D simulation" },
        { key: "photoPlan", label: "Pre-Op Photo / 3D Simulation Plan", type: "boolean" },
        { key: "risksDiscussed", label: "Risks / Benefits Discussed", type: "textarea", rows: 2, placeholder: "Scarring, infection, bleeding, asymmetry, implant complications (capsular contracture/rupture), anesthesia risks, revision rate, downtime" },
        { key: "patientEducation", label: "Patient Education / Expectations", type: "textarea", rows: 2, placeholder: "Realistic outcome expectations, recovery timeline, postoperative restrictions, smoking cessation mandatory" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Anesthesia consult, psychological evaluation (body dysmorphic disorder screen), smoking cessation clinic" },
        { key: "followUp", label: "Follow-up / Surgery Scheduling", type: "text", placeholder: "e.g. Surgery scheduled, pre-op visit in 1 week, consult for 3D simulation" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive consultation note for Plastic, Reconstructive & Aesthetic Surgery with surgical and non-surgical treatment planning",
    specialties: ["Plastic Surgery"],
    status: "active",
  },
};


export const PLASTIC_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "plastic-followup",
  name: "Plastic Surgery Follow-up / Post-Op Review",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History / Post-Op Recovery", type: "textarea", required: true, rows: 3, placeholder: "Pain, swelling, wound healing, dressing status, functional recovery, satisfaction with result, complications (bleeding, infection, seroma, numbness)" },
        { key: "medicationAdherence", label: "Medication / Compliance", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Complications / Concerns", type: "textarea", rows: 2, placeholder: "Wound dehiscence, infection, hematoma, seroma, implant issues, hypertrophic scarring, donor site morbidity" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "woundExam", label: "Wound / Surgical Site Exam", type: "textarea", rows: 2, placeholder: "Incision healing (well-approximated/dehisced), erythema, discharge, induration, suture integrity, dressing condition" },
        { key: "aestheticOutcome", label: "Aesthetic / Functional Outcome", type: "textarea", rows: 2, placeholder: "Symmetry, contour, scar quality (Vancouver Scar Scale), nipple/areola viability (breast), nasal airway (rhinoplasty), hand function" },
        { key: "photos", label: "Post-Op Photos Taken", type: "boolean" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "healingStatus", label: "Healing Status", type: "select", options: [{ label: "Satisfactory — healing as expected", value: "Satisfactory" }, { label: "Delayed wound healing", value: "Delayed" }, { label: "Complication (infection/hematoma/seroma/dehiscence)", value: "Complication" }, { label: "Unsatisfactory aesthetic outcome", value: "Unsatisfactory" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "woundCare", label: "Wound Care / Dressing Plan", type: "textarea", rows: 1, placeholder: "Continue dressing, suture removal at day X, silicone gel for scars" },
        { key: "complicationManagement", label: "Complication Management", type: "textarea", rows: 1, placeholder: "Antibiotics, drainage, wound care, revision plan" },
        { key: "revisionPlan", label: "Revision / Further Surgery Plan", type: "textarea", rows: 1, placeholder: "e.g. Revision rhinoplasty in 6 months, scar revision at 1 year, implant exchange" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 week / 1 month / 3 months / 1 year" },
      ],
    },
  ],
  metadata: {
    description: "Post-operative follow-up note for Plastic Surgery with wound healing assessment and aesthetic outcome evaluation",
    specialties: ["Plastic Surgery"],
    status: "active",
  },
};


export const PLASTIC_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "plastic-admission",
  name: "Plastic Surgery IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Traumatic amputation finger, facial fracture, burn injury, necrotizing fasciitis, flap compromise, post-surgical complication" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — trauma mechanism, burn (TBSA/depth/inhalation), infection (onset/source/progression), post-operative complication" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "DM, smoking, PVD, immunocompromise, coagulation disorders" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Anticoagulants, antiplatelets, insulin" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "tetanusStatus", label: "Tetanus Status (trauma/burn)", type: "text", placeholder: "e.g. Up to date, booster given" },
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
            { key: "spo2", label: "SpO₂", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
          ],
        },
        { key: "localWound", label: "Local / Wound / Flap Exam", type: "textarea", required: true, rows: 3, placeholder: "Detailed wound description — size, depth, tissue type (viable/necrotic), perfusion, sensation, infection signs, compartment pressure if concern" },
        { key: "vascularAssessment", label: "Vascular Assessment (flap/limb)", type: "textarea", rows: 1, placeholder: "Capillary refill, Doppler signal, tissue oximetry, venous congestion, arterial insufficiency" },
        { key: "photoDocs", label: "Photo Documentation Done", type: "boolean" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical (limb/life-threatening)", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC, coagulation, wound cultures, imaging (X-ray/CT/ Doppler), IV antibiotics, tetanus, NBM if OR planned" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Surgical (debridement/amputation/ flap/ graft/ replantation/ORIF), medical (antibiotics, anticoagulation (flap), vasodilators), dressing plan" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Orthopedics (fracture), vascular surgery, microsurgery team, OT scheduling, physiotherapy, psychology" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Plastic Surgery — trauma, burns, flaps, wound complications, and reconstructive emergencies",
    specialties: ["Plastic Surgery"],
    status: "active",
  },
};


export const PLASTIC_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "plastic-procedure",
  name: "Plastic / Aesthetic Surgery Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Breast augmentation (subpectoral/subglandular), Rhinoplasty (open/closed), Abdominoplasty, Facelift (SMAS/ deep plane), Blepharoplasty (upper/lower), Liposuction, Scar revision, Cleft lip repair, Syndactyly release, Free flap (DIEP/ALT/ Radial forearm), Skin graft (SSG/FTSG), Tissue expansion, Burn excision & grafting, Hand (carpal tunnel release/ Dupuytren's fasciectomy/ tendon repair)" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpPrep", label: "Pre-Op Preparation", type: "textarea", rows: 2, placeholder: "Pre-op photos, marking done (patient sitting/standing), antibiotic prophylaxis, DVT prophylaxis, implant/sizing selected, steriods (if indicated)" },
        { key: "anesthesia", label: "Anesthesia", type: "select", options: [{ label: "GA", value: "GA" }, { label: "LA with sedation", value: "LASedation" }, { label: "Regional block", value: "Regional" }, { label: "Local", value: "Local" }] },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. Main OT, minor OT, procedure room" },
        { key: "surgeon", label: "Surgeon / Assistant", type: "text" },
        { key: "findings", label: "Intra-Op Findings", type: "textarea", required: true, rows: 3, placeholder: "Key anatomical findings, tissue quality, implant pocket, cartilage availability, flap pedicle position, recipient vessels" },
        { key: "procedureDetails", label: "Procedure Details", type: "textarea", required: true, rows: 4, placeholder: "Step-by-step — incisions, dissection, flap elevation, hemostasis, implant insertion, closure (layers, sutures, drains), dressings" },
        { key: "implantDetails", label: "Implant / Device / Graft Details", type: "text", placeholder: "e.g. Mentor smooth round 350cc L, textured anatomical 275cc M, AlloDerm, PDS plate, K-wire" },
        { key: "specimens", label: "Specimens", type: "text", placeholder: "e.g. Capsule for histology, skin lesion, rib cartilage" },
        { key: "drainsDressings", label: "Drains & Dressings", type: "text", placeholder: "e.g. Drain ×2 (type/site/output), pressure dressing, splint, cast" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Bleeding, seroma, flap congestion/ischemia, nerve injury, implant malposition, conversion of plan, excessive blood loss" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Extubated, vitals stable, flap viable (color/ capillary refill/temp/Doppler), drains draining, pain controlled" },
        { key: "postOpOrders", label: "Post-Op Orders", type: "textarea", rows: 2, placeholder: "Flap monitoring q1h ×24h, anticoagulation (heparin/aspirin/dextran), antibiotics, analgesia, antiemetics, drain care, DVT prophylaxis, positioning" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Ward", value: "Ward" }, { label: "ICU/HDU (free flap)", value: "ICU" }, { label: "Daycare", value: "Daycare" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "text", placeholder: "e.g. Drain removal, suture removal, wound review, implant follow-up, scar management start" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive operative note for plastic, reconstructive, and aesthetic surgeries — breast, facial, body contouring, microsurgery, hand surgery, burns, and scar revision",
    specialties: ["Plastic Surgery"],
    status: "active",
  },
};
