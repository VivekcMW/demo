import type { TemplateDefinition } from "../templateSchema";

export const DERMA_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "derma-consult",
  name: "Dermatology OPD Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Skin rash, itching, mole changes, acne, hair loss, nail changes, skin growth" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 1 week, recurrent over years, progressive" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Onset (acute/insidious), location/distribution (localized/generalized), lesion morphology (macule/papule/plaque/vesicle/pustule/ulcer), progression, itching (severity/diurnal/nocturnal), pain, bleeding, associated symptoms (fever, joint pain, photosensitivity). Triggers (stress, food, sun exposure, medications, contactants). Prior treatments and response" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Atopy (asthma, allergic rhinitis, eczema), psoriasis, DM, thyroid disease, autoimmune conditions, HIV, hepatitis" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 1, placeholder: "Skin surgery, laser treatments, cosmetic procedures" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Topical (steroids, antifungals, retinoids), systemic (antihistamines, immunosuppressants, biologics, isotretinoin), OTC, herbal" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Drug allergies, contact allergens (patch test history), sunscreen allergy" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Atopy, psoriasis, melanoma, skin cancer, autoimmune disease" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Sun exposure, tanning bed use, occupation (chemicals/water exposure), smoking, stress, skin care routine" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Constitutional, MSK (arthralgia), mucosal (oral/genital ulcers), ocular, GI" },
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
        {
          key: "skinExam", label: "Skin Examination", type: "section", fields: [
            { key: "distribution", label: "Distribution", type: "text", placeholder: "Localized / generalized / symmetrical / asymmetrical / flexural / extensor / photo-distributed / intertriginous / dermatomal" },
            { key: "morphology", label: "Lesion Morphology", type: "textarea", rows: 2, placeholder: "Macule, papule, plaque, nodule, vesicle, bulla, pustule, wheal, scale, crust, erosion, ulcer, fissure, lichenification, excoriation, atrophy, scar" },
            { key: "color", label: "Color & Border", type: "text", placeholder: "Erythema, violaceous, hypopigmented, hyperpigmented, border (well-defined/ill-defined)" },
            { key: "secondaryChanges", label: "Secondary Changes", type: "text", placeholder: "Excoriations, lichenification, fissures, erosions, ulceration, scarring, atrophy" },
          ],
        },
        {
          key: "specificAreas", label: "Specific Area Exam", type: "section", fields: [
            { key: "scalp", label: "Scalp & Hair", type: "text", placeholder: "Scaling, erythema, pustules, alopecia (pattern/cicatricial), hair shaft abnormalities" },
            { key: "face", label: "Face", type: "text", placeholder: "Acne (comedones/papules/pustules/nodules/cysts), rosacea, perioral dermatitis" },
            { key: "nails", label: "Nails", type: "text", placeholder: "Pitting, onycholysis, thickening, discoloration, splinter hemorrhages, Beau's lines" },
            { key: "mucosa", label: "Mucous Membranes", type: "text", placeholder: "Oral ulcers, genital lesions, conjunctival injection" },
          ],
        },
        {
          key: "dermoscopy", label: "Dermoscopy / Wood's Lamp", type: "textarea", rows: 1, placeholder: "Dermoscopic findings — pigmented lesion pattern, vascular pattern, Wood's lamp fluorescence" },
        { key: "lymphNodes", label: "Lymph Nodes (if skin malignancy)", type: "text", placeholder: "Palpable nodes — site, size, consistency" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Atopic dermatitis, Psoriasis vulgaris, Acne vulgaris, Tinea corporis, Basal cell carcinoma, Vitiligo" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
          ],
        },
        { key: "severityScore", label: "Severity / Activity Score", type: "text", placeholder: "e.g. BSA 15%, EASI 12, PASI 8, IGA 3, DLQI 18" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Topical (steroids, calcineurin inhibitors, retinoids, antifungals, antibacterials), systemic (antihistamines, antibiotics, isotretinoin, methotrexate, biologics, JAK inhibitors), phototherapy, laser, surgical excision" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. Skin scraping KOH mount, skin biopsy (punch/incisional/excisional), patch test, IgE levels, ANA, anti-dsDNA, fungal culture" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "strength", label: "Strength", type: "text", placeholder: "e.g. 0.05%" },
            { key: "formulation", label: "Formulation", type: "select", options: [{ label: "Cream", value: "Cream" }, { label: "Ointment", value: "Ointment" }, { label: "Lotion", value: "Lotion" }, { label: "Gel", value: "Gel" }, { label: "Solution", value: "Solution" }, { label: "Foam", value: "Foam" }, { label: "Oral", value: "Oral" }, { label: "Injectable", value: "Injectable" }] },
            { key: "frequency", label: "Frequency", type: "text" },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "skinCareAdvice", label: "Skin Care / Lifestyle Advice", type: "textarea", rows: 2, placeholder: "Moisturizer regimen, sun protection (SPF 50+, broad-spectrum), trigger avoidance, gentle cleansers, wet wrap therapy, emollient bath" },
        { key: "cosmeticProcedures", label: "Cosmetic Procedures Discussed", type: "textarea", rows: 1, placeholder: "Chemical peel, microdermabrasion, laser (CO2/Nd:YAG/ IPL), botox, fillers — risks/benefits/cost explained" },
        { key: "patientEducation", label: "Patient Education", type: "textarea", rows: 2, placeholder: "Disease chronicity, treatment adherence, side effects to monitor, when to return, skin cancer surveillance (ABCDE)" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Dermatopathology, phototherapy unit, cosmetic dermatology, allergy clinic, rheumatology" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks / 1 month / 3 months / for biopsy results" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Dermatology with detailed skin exam, dermoscopy, and treatment planning",
    specialties: ["Dermatology"],
    status: "active",
  },
};


export const DERMA_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "derma-followup",
  name: "Dermatology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes, itching, lesion appearance, treatment tolerance, new lesions, side effects (skin atrophy, telangiectasia, irritation)" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 1, placeholder: "Topical steroid side effects, systemic medication intolerance, photosensitivity" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "skinExam", label: "Skin Exam", type: "textarea", rows: 2, placeholder: "Change in lesion morphology, distribution, severity — comparison to prior visit" },
        { key: "photos", label: "Clinical Photos (if taken)", type: "text", placeholder: "Comparison photos available — improvement / no change / worsening" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diseaseStatus", label: "Disease Status", type: "select", options: [{ label: "Cleared / Resolved", value: "Resolved" }, { label: "Improved", value: "Improved" }, { label: "Stable", value: "Stable" }, { label: "Worsened / Flare", value: "Worsened" }, { label: "Recurrence", value: "Recurrence" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "Step-up/step-down therapy, switch to alternative, taper steroids" },
        { key: "phototherapy", label: "Phototherapy / Laser Progress", type: "text", placeholder: "e.g. NB-UVB session 12/24, cumulative dose" },
        { key: "biopsyResults", label: "Biopsy / Lab Results Reviewed", type: "text", placeholder: "e.g. Biopsy: Basal cell carcinoma, margins clear" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 2 weeks / 1 month / 3 months / 1 year" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 1, placeholder: "Continue emollients, sun protection, compliance, warning signs" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Dermatology with disease activity scoring and treatment response tracking",
    specialties: ["Dermatology"],
    status: "active",
  },
};

export const DERMA_PROCEDURE_TEMPLATE: TemplateDefinition = {

  id: "derma-procedure",
  name: "Dermatology Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Excisional biopsy, Shave biopsy, Punch biopsy, Cryotherapy, Electrodesiccation & curettage (ED&C), Chemical peel, Microdermabrasion, Laser (CO2/Nd:YAG/PDL/ IPL), Botox injection, Filler injection, Photodynamic therapy (PDT), Intralesional steroid injection" },
        { key: "indication", label: "Indication / Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpPrep", label: "Pre-Procedure Preparation", type: "textarea", rows: 2, placeholder: "Photos taken, site marked, antiseptic prep, local anesthesia, anticoagulation management, antibiotic prophylaxis (if indicated)" },
        { key: "anesthesia", label: "Anesthesia", type: "select", options: [{ label: "Topical (EMLA)", value: "Topical" }, { label: "LA (lidocaine 1% with epinephrine)", value: "LA" }, { label: "LA + sedation", value: "LASedation" }, { label: "None", value: "None" }] },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. Procedure room, minor OT, cosmetology suite" },
        { key: "surgeon", label: "Performing Clinician", type: "text" },
        { key: "site", label: "Anatomical Site", type: "text", placeholder: "e.g. Left forearm, dorsum of nose, scalp vertex" },
        {
          key: "findings", label: "Findings & Procedure Details", type: "textarea", required: true, rows: 3, placeholder: "Lesion size, shape, color, border; excision margins (if applicable); closure method (primary, flap, graft); laser settings (fluency, pulse duration, spot size); peel depth; cryo freeze-thaw cycles; botox/filler units and injection sites" },
        { key: "specimens", label: "Specimens Sent for HPE", type: "text", placeholder: "e.g. Shave biopsy — 5mm lesion left forearm; margins oriented" },
        { key: "complications", label: "Complications", type: "textarea", rows: 1, placeholder: "Bleeding, hematoma, wound dehiscence, infection, scarring, pigment change" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery", type: "textarea", rows: 1, placeholder: "Procedure tolerated, wound dressed, hemostasis achieved" },
        { key: "postOpOrders", label: "Post-Procedure Care Instructions", type: "textarea", rows: 2, placeholder: "Wound care, dressing changes, antibiotic ointment, activity restriction, sun protection, pain management" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Discharged — no follow-up needed", value: "Home" }, { label: "Discharged — follow-up for results", value: "HomeFollowUp" }, { label: "Discharged — review procedure site", value: "HomeReview" }] },
        { key: "followUpPlan", label: "Follow-up / Results", type: "text", placeholder: "e.g. Suture removal day 7-14, biopsy results in 7 days, laser session 2 in 4 weeks" },
      ],
    },
  ],
  metadata: {
    description: "Procedure note for dermatologic and cosmetic procedures — biopsy, cryotherapy, laser, chemical peel, injectables, excisions, phototherapy",
    specialties: ["Dermatology"],
    status: "active",
  },
};
