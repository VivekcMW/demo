import type { TemplateDefinition } from "../templateSchema";

export const RHEUMATOLOGY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "rheumatology-consult",
  name: "Rheumatology OPD Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Joint pain/swelling, early morning stiffness, back pain, muscle weakness, rash, Raynaud's, dry eyes/mouth" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 3 months, intermittent for years" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Onset (acute/insidious), joint pattern (mono/oligo/polyarticular, symmetric/asymmetric, small/large joints, axial/peripheral), morning stiffness (duration), inflammatory vs mechanical features, extra-articular symptoms (rash, oral ulcers, serositis, Raynaud's, photosensitivity, alopecia, sicca symptoms, enthesitis, dactylitis, uveitis, back pain (inflammatory))" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Autoimmune disease, gout, psoriasis, IBD, thyroid disease, TB exposure, hepatitis B/C, HIV, malignancy, recurrent infections" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 1, placeholder: "Joint replacement, synovectomy, spine surgery" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "NSAIDs, DMARDs (methotrexate, leflunomide, sulfasalazine, HCQ), biologics (anti-TNF, anti-IL6, anti-CD20, JAK inhibitors), steroids (current/tapers), colchicine, allopurinol" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Sulfa allergy (contraindication for some DMARDs)" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "RA, SLE, AS, psoriasis, gout, autoimmune disease in first-degree relatives" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking (major RA risk factor), alcohol, occupation (impact of disability)" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "Constitutional (fever/weight loss/fatigue), skin, eyes (dryness/redness/uveitis), oral ulcers, cardiopulmonary (pleuritic pain/ dyspnea/ pericarditis), neurological, renal (foamy urine)" },
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
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Malar rash, discoid rash, oral/nasal ulcers, alopecia, sclerodactyly, telangiectasia, calcinosis, nailfold capillary changes, psoriatic plaques, tophi, rheumatoid nodules, pitting edema" },
        {
          key: "mskExam", label: "Musculoskeletal Exam", type: "section", fields: [
            { key: "joints", label: "Joints Exam", type: "textarea", rows: 2, placeholder: "Swollen/tender joint count (28/66/68), distribution, deformity, crepitus, range of motion, instability. Specific: MCPs, PIPs, DIPs, wrists, elbows, shoulders, hips, knees, ankles, MTPs" },
            { key: "spine", label: "Spine Exam", type: "text", placeholder: "Schober test, chest expansion, occiput-to-wall, FABER, FADIR, SI joint tenderness" },
            { key: "enthesitis", label: "Enthesitis / Dactylitis", type: "text", placeholder: "Achilles, plantar fascia, elbow, dactylitis digits" },
          ],
        },
        {
          key: "functionalAssessment", label: "Functional Assessment", type: "section", fields: [
            { key: "haq", label: "HAQ / Functional Score", type: "text", placeholder: "e.g. HAQ 1.5, BASDAI 6.2, DAS28-ESR 5.1" },
            { key: "gripStrength", label: "Grip Strength / Walk Time", type: "text", placeholder: "e.g. Grip R 20mmHg, L 18mmHg" },
          ],
        },
        { key: "extraArticular", label: "Extra-Articular Exam", type: "textarea", rows: 1, placeholder: "CVS (pericarditis, murmurs), respiratory (rales/effusion), neurological (entrapment neuropathies, cord compression), eye (scleritis/uveitis)" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Rheumatoid Arthritis (seropositive/erosive), Systemic Lupus Erythematosus, Ankylosing Spondylitis, Psoriatic Arthritis, Gout, Osteoarthritis, Sjögren's syndrome, Vasculitis" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
          ],
        },
        { key: "diseaseActivity", label: "Disease Activity Score", type: "text", placeholder: "e.g. DAS28-ESR 5.1 (high activity), CDAI 22, BASDAI 6.2, SLEDAI-2K 8, remission/low/moderate/high" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "DMARDs (escalation/switch), biologics/biosimilars (anti-TNF/IL6/CD20/JAKi/CTLA4-Ig), steroid taper, NSAIDs, analgesia, treat-to-target strategy" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. RF, anti-CCP, ANA, anti-dsDNA, ENA panel, ESR, CRP, complement, uric acid, HLA-B27, X-ray hands/feet, US/MSK MRI, DXA scan" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "route", label: "Route", type: "select", options: [{ label: "Oral", value: "Oral" }, { label: "SC", value: "SC" }, { label: "IV", value: "IV" }, { label: "Topical", value: "Topical" }] },
            { key: "frequency", label: "Frequency", type: "text" },
          ],
        },
        { key: "monitoring", label: "Monitoring Plan", type: "textarea", rows: 2, placeholder: "CBC, LFT, RFT q1-3mths; TB screening (Quantiferon/PPD) before biologics; immunizations; DXA if on steroids; eye exam (HCQ)" },
        { key: "dietaryAdvice", label: "Lifestyle / Dietary Advice", type: "textarea", rows: 1, placeholder: "Weight management, joint protection, exercise (range of motion/strengthening/aquatic), anti-inflammatory diet" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Physiotherapy, occupational therapy, podiatry, ophthalmology (screening), rheumatology nurse specialist" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 1 month (treatment review), 3 months (DAS28), 6 months" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Rheumatology with disease activity scoring (DAS28/BASDAI/SLEDAI) and treat-to-target planning",
    specialties: ["Rheumatology"],
    status: "active",
  },
};


export const RHEUMATOLOGY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "rheumatology-followup",
  name: "Rheumatology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Joint symptoms, morning stiffness duration, pain score, extra-articular symptoms, treatment tolerance, side effects" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects / Laboratory Monitoring", type: "textarea", rows: 2, placeholder: "GI upset, mouth ulcers (MTX), infection history, hepatotoxicity, myelosuppression, injection site reactions" },
        { key: "flares", label: "Flares Since Last Visit", type: "number", min: 0, max: 50 },
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
        { key: "jointExam", label: "Joint Exam (Swollen/Tender)", type: "textarea", rows: 2, placeholder: "Swollen/tender joint count, distribution, change from baseline" },
        { key: "globals", label: "Global/PGA/PhGA", type: "text", placeholder: "e.g. PGA 40mm, DAS28-ESR 4.2, CDAI 18" },
        { key: "labs", label: "Lab Results (ESR, CRP, CBC, LFT, RFT, drug levels)", type: "text", placeholder: "e.g. ESR 28, CRP 12, MTX level" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diseaseActivity", label: "Disease Activity", type: "select", options: [{ label: "Remission", value: "Remission" }, { label: "Low", value: "Low" }, { label: "Moderate", value: "Moderate" }, { label: "High", value: "High" }] },
        { key: "therapeuticResponse", label: "Therapeutic Response", type: "select", options: [{ label: "Good — target achieved", value: "Good" }, { label: "Partial — improving", value: "Partial" }, { label: "Inadequate — modify therapy", value: "Inadequate" }, { label: "Non-response", value: "None" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2 },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "DMARD dose escalation, switch to/ add biologic, steroid taper, NSAID changes" },
        { key: "monitoring", label: "Monitoring Labs / Imaging", type: "text", placeholder: "e.g. CBC/LFT/RFT q4wks, DXA at 1yr, X-ray hands/feet annual" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 month / 3 months / 6 months" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Rheumatology with disease activity scoring (DAS28/CDAI/BASDAI) and treat-to-target dose adjustments",
    specialties: ["Rheumatology"],
    status: "active",
  },
};


export const RHEUMATOLOGY_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "rheumatology-admission",
  name: "Rheumatology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. SLE flare with nephritis, acute gouty arthritis (polyarticular), vasculitic ulcer, scleroderma renal crisis, septic arthritis" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — trigger, organ system involvement, severity, prior treatments, immunosuppression status" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "rheumDiagnosis", label: "Rheumatological Diagnosis", type: "textarea", rows: 2, placeholder: "Diagnosis, duration, disease activity, organ involvement history" },
        { key: "immunosuppression", label: "Current Immunosuppression", type: "textarea", rows: 2, placeholder: "DMARDs, biologics, steroids (last dose/taper), duration" },
        { key: "infections", label: "Infection History", type: "textarea", rows: 2, placeholder: "TB history/screening, hepatitis B/C, recurrent infections, vaccination status" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 1 },
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
        { key: "generalExam", label: "General / Skin Exam", type: "textarea", rows: 1, placeholder: "Rash, ulcers, purpura, sclerodactyly, calcinosis, tophi, nodules" },
        { key: "jointExam", label: "Joint Exam", type: "textarea", rows: 2, placeholder: "Active joint count, septic joint signs (hot/swollen/erythematous/ tender — aspiration needed)" },
        { key: "organExam", label: "Target Organ Exam", type: "textarea", rows: 2, placeholder: "Renal (edema, BP), cardiac (pericardial rub), pulmonary (pleuritic rub, crackles), CNS (seizures, focal deficits, psychosis)" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical (organ-threatening)", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC, ESR, CRP, autoantibodies, complement, urinalysis, 24h urine protein, cultures, imaging, ECHO" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "IV steroids (pulse methylprednisolone), cyclophosphamide, biologics (rituximab), IVIG, plasma exchange, immunosuppression escalation, infection management, organ-specific treatment" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. Nephrology (renal biopsy), cardiology (myocarditis), pulmonology, dermatology, infectious disease, rheumatology senior" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Rheumatology — SLE flare, vasculitis, scleroderma crisis, septic joint, acute gout",
    specialties: ["Rheumatology"],
    status: "active",
  },
};


export const RHEUMATOLOGY_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "rheumatology-progress",
  name: "Rheumatology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Joint pain, swelling, morning stiffness, extra-articular symptoms, treatment tolerance" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 1, placeholder: "Fever, pain crisis, organ-specific concerns" },
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
            { key: "uro", label: "UO (mL/hr) — if renal", type: "number", min: 0, max: 1000 },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Joint exam, skin changes, organ-specific exam changes from prior" },
        { key: "labs", label: "Key Labs Today", type: "text", placeholder: "e.g. CRP 45→22, Cr 1.8→1.5, urine protein 2+" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, response to immunosuppression, organ function" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", rows: 2, placeholder: "Steroid taper, next pulse dose, renal biopsy timing, infection monitoring, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Rheumatology inpatients with disease activity monitoring and immunosuppression management",
    specialties: ["Rheumatology"],
    status: "active",
  },
};
