import type { TemplateDefinition } from "../templateSchema";

export const OPHTHALMO_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "ophthalmo-consult",
  name: "Ophthalmology OPD Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Blurred vision, redness, eye pain, foreign body sensation, discharge, photophobia, floaters, visual field loss" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 3 days, progressive over months" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Laterality (unilateral/bilateral), onset (sudden/gradual), progression, aggravating/relieving factors, associated symptoms (pain, photophobia, diplopia, tearing, discharge), trauma history, contact lens use" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "DM, HTN, cataract, glaucoma, ARMD, thyroid eye disease, connective tissue disease, HIV" },
        { key: "pastSurgicalHistory", label: "Past Ocular Surgical History", type: "textarea", rows: 2, placeholder: "Cataract surgery, LASIK, trabeculectomy, vitrectomy, retinal detachment repair, corneal transplant, squint surgery" },
        { key: "medicationHistory", label: "Current Eye Medications", type: "textarea", rows: 2, placeholder: "Eye drops (type, frequency), ointments, oral medications (acetazolamide, steroids)" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Drug allergies, contact lens solution allergy" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Glaucoma, cataract, ARMD, retinal detachment, diabetes, refractive errors" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Occupation (screen time, welding, chemicals), smoking (ARMD risk), driving" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Constitutional, neurological (headache, diplopia, facial pain)" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "visualAcuity", label: "Visual Acuity", type: "section", fields: [
            { key: "reDistance", label: "RE (Distance)", type: "text", placeholder: "e.g. 6/6, 6/36, CF, HM, PL" },
            { key: "leDistance", label: "LE (Distance)", type: "text", placeholder: "e.g. 6/6, 6/36, CF, HM, PL" },
            { key: "reNear", label: "RE (Near)", type: "text", placeholder: "e.g. N6" },
            { key: "leNear", label: "LE (Near)", type: "text", placeholder: "e.g. N6" },
            { key: "pinhole", label: "Pin-hole Improvement", type: "text", placeholder: "e.g. RE 6/12→6/9, LE 6/9→6/6" },
          ],
        },
        {
          key: "refraction", label: "Refraction", type: "section", fields: [
            { key: "reSphere", label: "RE (Sphere/Cyl/Axis)", type: "text", placeholder: "e.g. -2.00/-0.50×90" },
            { key: "leSphere", label: "LE (Sphere/Cyl/Axis)", type: "text", placeholder: "e.g. -1.50/-0.25×85" },
          ],
        },
        {
          key: "anteriorSegment", label: "Anterior Segment Exam", type: "section", fields: [
            { key: "lidsAdnexa", label: "Lids & Adnexa", type: "text", placeholder: "Erythema, edema, ptosis, ectropion, entropion, lesions, madarosis" },
            { key: "conjunctiva", label: "Conjunctiva", type: "text", placeholder: "Hyperemia, chemosis, follicles papillae, discharge, pterygium, pinguecula" },
            { key: "cornea", label: "Cornea", type: "text", placeholder: "Clear, edema, abrasion, ulcer, opacity, vascularization, keratic precipitates" },
            { key: "anteriorChamber", label: "Anterior Chamber", type: "text", placeholder: "Depth (Van Herick), cells/flare, hypopyon, hyphaema" },
            { key: "iris", label: "Iris", type: "text", placeholder: "Shape, synechiae (anterior/posterior), coloboma, neovascularization" },
            { key: "lens", label: "Lens", type: "text", placeholder: "Clear, cataract (NS/cortical/PSC grade), IOL (type/position)" },
          ],
        },
        {
          key: "iop", label: "Intraocular Pressure (IOP)", type: "section", fields: [
            { key: "reIop", label: "RE (mmHg)", type: "number", min: 0, max: 80 },
            { key: "leIop", label: "LE (mmHg)", type: "number", min: 0, max: 80 },
            { key: "method", label: "Method", type: "select", options: [{ label: "Goldmann appla nation", value: "Goldmann" }, { label: "Non-contact (air puff)", value: "NCT" }, { label: "Tonopen", value: "Tonopen" }, { label: "iCare", value: "iCare" }] },
          ],
        },
        {
          key: "posteriorSegment", label: "Posterior Segment", type: "section", fields: [
            { key: "vitreous", label: "Vitreous", type: "text", placeholder: "Clear, hemorrhage, cells, syneresis" },
            { key: "opticDisc", label: "Optic Disc", type: "text", placeholder: "Pink/pale, margins (sharp/blurred), cup/disc ratio, notching, hemorrhage" },
            { key: "macula", label: "Macula", type: "text", placeholder: "Normal, drusen, hemorrhage, exudate, hole, edema, scar" },
            { key: "retina", label: "Retina", type: "text", placeholder: "Attached/detached, hemorrhages, exudates, laser scars, retinopathy (DM/HTN)" },
            { key: "vessels", label: "Vessels", type: "text", placeholder: "AV ratio, caliber, sheathing, tortuosity" },
          ],
        },
        { key: "visualFields", label: "Visual Fields (Confrontation / Perimetry)", type: "text", placeholder: "Full, constricted, hemianopia, scotoma" },
        { key: "extraOcularMovements", label: "Extra-Ocular Movements / Squint", type: "text", placeholder: "Full EOM, ocular alignment (cover test), nystagmus" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Senile cataract (NS grade 3), Primary open-angle glaucoma, Diabetic retinopathy (NPDR/PDR)" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "eye", label: "Eye", type: "select", options: [{ label: "RE", value: "RE" }, { label: "LE", value: "LE" }, { label: "Both", value: "Both" }] },
          ],
        },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis of findings — acuity, refraction, anterior/posterior segment findings" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Medical (eye drops, oral meds), laser (YAG capsulotomy, PRP, SLT), surgery plan (cataract, trabeculectomy, vitrectomy)" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. OCT macula, OCT RNFL, FFA, perimetry, B-scan, corneal topography, Specular microscopy, Biometry" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications / Eye Drops", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose/Strength", type: "text" },
            { key: "frequency", label: "Frequency", type: "text", placeholder: "e.g. QID, BD, q1h" },
            { key: "eye", label: "Eye", type: "select", options: [{ label: "RE", value: "RE" }, { label: "LE", value: "LE" }, { label: "Both", value: "Both" }] },
          ],
        },
        { key: "opticalPrescription", label: "Optical Prescription / Glasses", type: "text", placeholder: "New / same glasses, review in —" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 2, placeholder: "Eye drop technique, hygiene, driving restrictions, red flag symptoms (sudden vision loss, flashes/floaters, eye pain)" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Low vision clinic, retinal specialist, glaucoma specialist, neuro-ophthalmology, optometrist" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 1 week / 1 month / 3 months / 6 months / 1 year" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Ophthalmology with detailed anterior/posterior segment exam and refraction",
    specialties: ["Ophthalmology"],
    status: "active",
  },
};


export const OPHTHALMO_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "ophthalmo-followup",
  name: "Ophthalmology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes, vision improvement/worsening, eye drop tolerance, compliance, side effects" },
        { key: "medicationAdherence", label: "Drop Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects (Drops / Surgery)", type: "textarea", rows: 1, placeholder: "Stinging, blurred vision, redness, dry eye, photophobia" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "visualAcuity", label: "Visual Acuity", type: "section", fields: [
            { key: "reVa", label: "RE", type: "text" },
            { key: "leVa", label: "LE", type: "text" },
          ],
        },
        { key: "iop", label: "IOP (mmHg)", type: "text", placeholder: "e.g. RE 18, LE 20" },
        { key: "anteriorSegment", label: "Anterior Segment Changes", type: "textarea", rows: 1, placeholder: "Cornea clarity, AC depth, IOL position" },
        { key: "posteriorSegment", label: "Posterior Segment Changes", type: "textarea", rows: 1, placeholder: "Disc changes, macula status, retinopathy progression" },
        { key: "octFields", label: "OCT / Perimetry Comparison", type: "text", placeholder: "e.g. OCT RNFL stable, VF MD -3.5 dB" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diseaseStatus", label: "Disease Status", type: "select", options: [{ label: "Stable / Well-controlled", value: "Stable" }, { label: "Improving", value: "Improving" }, { label: "Worsening / Progressive", value: "Worsening" }, { label: "Resolved", value: "Resolved" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 3, placeholder: "Disease progression, treatment response, post-operative healing" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "Drop changes, add/drop medications, frequency adjustments" },
        { key: "surgeryPlan", label: "Surgery / Laser Plan", type: "textarea", rows: 1, placeholder: "e.g. Cataract surgery scheduling, YAG capsulotomy, PRP" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 month / 3 months / 6 months / 1 year" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 1, placeholder: "Drop schedule, driving advice, surgery counseling" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Ophthalmology with visual acuity, IOP, and disease progression tracking",
    specialties: ["Ophthalmology"],
    status: "active",
  },
};


export const OPHTHALMO_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "ophthalmo-admission",
  name: "Ophthalmology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Acute vision loss, open globe injury, orbital cellulitis, acute angle closure glaucoma" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — onset, laterality, trauma mechanism (if applicable), associated symptoms" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "DM, HTN, glaucoma, cataract surgery, anticoagulants" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Eye drops, anticoagulants, antiplatelets, steroids" },
        { key: "ocularHistory", label: "Ocular History", type: "textarea", rows: 2, placeholder: "Prior surgeries, trauma, amblyopia, contact lens use" },
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
          ],
        },
        { key: "va", label: "Visual Acuity", type: "text", placeholder: "e.g. RE CF 1m, LE 6/9" },
        { key: "pupils", label: "Pupils (RAPD)", type: "text", placeholder: "e.g. RE RAPD+, LE brisk" },
        { key: "slitLamp", label: "Slit Lamp Exam", type: "textarea", rows: 2, placeholder: "Lids, conjunctiva, cornea, AC, iris, lens findings" },
        { key: "iop", label: "IOP (mmHg)", type: "text" },
        { key: "fundus", label: "Dilated Fundus Exam", type: "textarea", rows: 1, placeholder: "Vitreous, disc, macula, retina, vessels" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Emergent", value: "Emergent" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. IV antibiotics, IOP-lowering, imaging (CT/MRI orbit), surgical planning" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "Medical management (IV antibiotics/steroids, IOP-lowering), surgical plan (OR timing, procedure planned)" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. ENT (orbital cellulitis), neurosurgery (optic nerve), anesthesia for OR" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Ophthalmology — trauma, acute vision loss, orbital cellulitis, acute glaucoma",
    specialties: ["Ophthalmology"],
    status: "active",
  },
};


export const OPHTHALMO_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "ophthalmo-procedure",
  name: "Ophthalmology Procedure / Surgery Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Phacoemulsification + IOL (RE), Trabeculectomy (LE), Vitrectomy, DCR, Scleral buckle, Corneal transplant (PKP), LASIK, YAG capsulotomy" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpPrep", label: "Pre-Op Preparation", type: "textarea", rows: 2, placeholder: "Antibiotic drops, dilating drops, anticoagulation management, biometry, IOL power calculation" },
        { key: "anesthesiaPlan", label: "Anesthesia Plan", type: "select", options: [{ label: "Topical", value: "Topical" }, { label: "Peribulbar block", value: "Peribulbar" }, { label: "Retrobulbar block", value: "Retrobulbar" }, { label: "GA", value: "GA" }, { label: "LA + sedation", value: "LASedation" }] },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. OT, minor OT, laser suite" },
        { key: "surgeon", label: "Surgeon", type: "text" },
        { key: "laterality", label: "Laterality", type: "select", options: [{ label: "RE", value: "RE" }, { label: "LE", value: "LE" }, { label: "Both", value: "Both" }] },
        { key: "findings", label: "Intra-Op Findings", type: "textarea", required: true, rows: 3, placeholder: "Key intra-operative findings — wound construction, capsulorrhexis, phaco settings, IOL type/size/power, vitreous loss, complications" },
        { key: "implantDetails", label: "Implant / IOL Details", type: "text", placeholder: "e.g. Alcon SN60WF +20.0 D in bag, glaucoma shunt model X" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Posterior capsular rupture, vitreous loss, iris trauma, bleeding, choroidal effusion, suprachoroidal hemorrhage" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Awake, vitals stable, eye patched, pain controlled" },
        { key: "postOpOrders", label: "Post-Op Orders", type: "textarea", rows: 2, placeholder: "Eye drops (antibiotic + steroid qid, cycloplegic), eye shield, activity restrictions, follow-up" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Daycare discharge", value: "Daycare" }, { label: "Admitted overnight", value: "Overnight" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "text", placeholder: "e.g. Day 1 post-op, 1 week, 1 month" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive operative note for ophthalmic surgeries — cataract, glaucoma, vitreoretinal, corneal, LASIK, and oculoplastic procedures",
    specialties: ["Ophthalmology"],
    status: "active",
  },
};
