import type { TemplateDefinition } from "../templateSchema";

export const ANDROLOGY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "andrology-consult",
  name: "Andrology / Sexual Medicine Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Erectile dysfunction (ED), low libido, premature ejaculation, delayed ejaculation, Peyronie's disease (penile curvature/pain), infertility, testicular pain/swelling, hypogonadism symptoms, penile discharge, scrotal swelling, hematospermia" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 6 months, progressive over 2 years, acute onset 1 week" },
        { key: "sexualHistory", label: "Sexual History", type: "textarea", required: true, rows: 3, placeholder: "Erectile function (initiation/maintenance/rigidity), IIEF-5 score, libido (morning erections present/absent), ejaculatory function (premature/retarded/anorgasmia), pain during erection/intercourse, partner history, frequency of intercourse, masturbation, pornography use" },
        { key: "medicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "DM, HTN, dyslipidemia, CAD/PAD, neurological disease (MS/spinal cord), pelvic surgery/trauma, prostate conditions, hypogonadism, thyroid disease, depression/anxiety, hypogonadotropic hypogonadism (Kallmann), chronic renal/liver disease, sickle cell, sleep apnea" },
        { key: "surgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Prostatectomy (radical/TURP), cystectomy, pelvic fracture, penile implant, vasectomy, orchidopexy, testicular prosthesis, inguinal hernia repair, spinal surgery" },
        { key: "medications", label: "Current Medications", type: "textarea", rows: 2, placeholder: "PDE5i (sildenafil/tadalafil/vardenafil), testosterone therapy, antidepressants (SSRIs/SNRIs), antipsychotics, antihypertensives (BB/diuretics), statins, 5<ce:alpha>-reductase inhibitors, opiates, steroids, finasteride" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Drug allergies, latex (important for penile implant)" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, recreational drugs (cocaine/marijuana/opiates), relationship status, stress, occupation, sleep quality, exercise" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 2, placeholder: "Constitutional (fatigue/weight change), GU (urinary symptoms/LUTS/hematuria), endocrine (gynecomastia/hot flashes/galactorrhea), neurological (numbness/weakness/sensation), CVS (claudication/chest pain)" },
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
            { key: "bmi", label: "BMI", type: "number", min: 10, max: 60 },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Habitus, secondary sexual characteristics, gynecomastia, hair distribution (Tanner staging), BMI, abdominal obesity, thyroid" },
        { key: "genitalExam", label: "Genital Examination", type: "textarea", rows: 3, placeholder: "Penis: size/curvature (Peyronie's plaque — site/size/pain with erection), urethral meatus, foreskin lesions. Testes: volume (Prader orchidometer), consistency, tenderness, masses, varicocele (grade I-III), hydrocele, spermatic cord. Prostate: DRE — size, consistency, nodules, tenderness" },
        { key: "neurologicalExam", label: "Neurological Exam", type: "text", placeholder: "Perianal sensation (S2-S4), bulbocavernosus reflex, cremasteric reflex, anal sphincter tone, lower limb sensation/reflexes" },
        { key: "vascularExam", label: "Vascular Exam", type: "text", placeholder: "Peripheral pulses, femoral bruits, penile Doppler if indicated" },
        { key: "hormonalLabs", label: "Hormonal / Lab Summary", type: "textarea", rows: 2, placeholder: "Total T, free T, SHBG, LH, FSH, prolactin, TSH, HbA1c, lipid profile, morning cortisol, estradiol, karyotype (if indicated)" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Erectile dysfunction (organic/psychogenic/mixed), Hypogonadism (primary/secondary), Premature ejaculation (lifelong/acquired), Peyronie's disease, Male infertility (azoospermia/oligospermia), Varicocele, Testosterone deficiency, Delayed ejaculation" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
          ],
        },
        { key: "severity", label: "Severity / Staging", type: "text", placeholder: "e.g. IIEF-5 score 12/25 (moderate ED), AMS score, Peyronie's curvature 45<ce:degree>, Tanner stage V" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Lifestyle (weight loss, exercise, smoking cessation), PDE5i (on-demand/daily), testosterone replacement (gel/injections/pellets), vacuum erection device, intracavernosal injection (ICI) therapy, intraurethral alprostadil, psychosexual counseling, couples therapy, androgen deprivation reversal, clomiphene/hCG for infertility" },
        { key: "surgery", label: "Surgical Options Discussed", type: "textarea", rows: 2, placeholder: "Penile implant (inflatable/malleable), Peyronie's plication/grafting, penile revascularization, varicocelectomy, vasovasostomy, TESE/micro-TESE, penile straightening" },
        {
          key: "investigations", label: "Investigations Ordered", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. Morning total T, free T, SHBG, LH, FSH, prolactin, TSH, HbA1c, lipids, PSA, nocturnal penile tumescence (NPT), penile duplex Doppler, cavernosography, MRI pituitary, semen analysis, scrotal US, genetic testing (karyotype/Y microdeletion/CFTR)" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "instructions", label: "Instructions", type: "text" },
          ],
        },
        { key: "counseling", label: "Psychosexual Counseling", type: "boolean" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Urology, endocrinology, psychosexual therapist, fertility specialist, pelvic physiotherapy, sexual medicine specialist" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 4 weeks (trial of PDE5i), 3 months (testosterone levels), 6 months (semen analysis)" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Andrology / Sexual Medicine — erectile dysfunction, hypogonadism, Peyronie's disease, male infertility, ejaculatory disorders",
    specialties: ["Andrology", "Sexual Medicine"],
    status: "active",
  },
};





// ── Andrology / Sexual Medicine ───────────────────────────────────────────────

export const ANDROLOGY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "andrology-followup",
  name: "Andrology / Sexual Medicine Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Response to treatment — erectile function (IIEF-5 score), libido, morning erections, ejaculatory function, treatment side effects, compliance, partner feedback, new symptoms, pain (Peyronie's) progress" },
        { key: "medicationAdherence", label: "Medication / Treatment Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 2, placeholder: "PDE5i (headache/flushing/dyspepsia/back pain), testosterone (acne/erythrocytosis/sleep apnea/prostate concerns), ICI (pain/priapism/fibrosis), vacuum device (petechiae/numbness)" },
        { key: "partnerFeedback", label: "Partner Feedback", type: "textarea", rows: 1, placeholder: "Relationship satisfaction, partner's concerns, communication" },
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
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Peyronie's plaque change, testicular volume, penile curvature, gynecomastia, injection sites" },
        { key: "labs", label: "Lab Results Today", type: "text", placeholder: "e.g. Total T 450 ng/dL (↑ from 280), HbA1c 6.5%, PSA 1.2, Hct 48%" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "responseToTreatment", label: "Response to Treatment", type: "select", options: [{ label: "Good response", value: "Good" }, { label: "Partial response", value: "Partial" }, { label: "No response", value: "None" }, { label: "Worsening", value: "Worsening" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Synthesis of treatment response, side effects, lab trends, and adjustments needed" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatmentAdjustment", label: "Treatment Adjustment", type: "textarea", rows: 2, placeholder: "Continue current, dose adjust (up/down), switch PDE5i, add ICI, change testosterone formulation, refer for surgical evaluation" },
        { key: "investigations", label: "Investigations Due", type: "text", placeholder: "e.g. Repeat testosterone, PSA, Hb/Hct, semen analysis, penile Doppler" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 month, 3 months, 6 months" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Andrology / Sexual Medicine with treatment response monitoring and medication adjustment",
    specialties: ["Andrology", "Sexual Medicine"],
    status: "active",
  },
};


export const ANDROLOGY_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "andrology-procedure",
  name: "Andrology / Sexual Medicine Procedure",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Procedure Details",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "select", required: true, options: [
          { label: "Penile implant (inflatable/malleable)", value: "PenileImplant" },
          { label: "Peyronie's plaque incision / grafting", value: "PeyroniesGrafting" },
          { label: "Penile straightening / plication", value: "PenileStraightening" },
          { label: "Varicocelectomy (microscopic/laparoscopic)", value: "Varicocelectomy" },
          { label: "Vasectomy", value: "Vasectomy" },
          { label: "Vasovasostomy / vasoepididymostomy", value: "Vasovasostomy" },
          { label: "TESE / micro-TESE", value: "TESE" },
          { label: "Penile Doppler / cavernosometry", value: "PenileDoppler" },
          { label: "Circumcision", value: "Circumcision" },
          { label: "Orchidectomy / orchidopexy", value: "Orchidectomy" },
        ] },
        { key: "date", label: "Date of Procedure", type: "date", required: true },
        { key: "surgeon", label: "Surgeon", type: "text", required: true },
        { key: "assistant", label: "Assistant(s)", type: "text" },
        { key: "anesthesia", label: "Anesthesia", type: "select", options: [{ label: "General", value: "General" }, { label: "Spinal", value: "Spinal" }, { label: "Local", value: "Local" }, { label: "Local + sedation", value: "LocalSedation" }] },
        { key: "prophylacticAntibiotic", label: "Prophylactic Antibiotic Given", type: "boolean" },
        { key: "consent", label: "Consent Obtained", type: "boolean", required: true },
      ],
    },
    {
      key: "findings",
      label: "Findings & Procedure",
      fields: [
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "findings", label: "Intra-op Findings", type: "textarea", required: true, rows: 3, placeholder: "Penile implant: corporeal dilation, cylinder size, reservoir placement, pump position. Peyronie's: plaque size/location, degree of curvature, graft type/size. Varicocele: grade, vein size, number of ligated veins. Vasectomy: vas identification/division, fascial interposition" },
        { key: "procedureSteps", label: "Procedure Performed / Steps", type: "textarea", required: true, rows: 4, placeholder: "Detailed step-by-step: incision, dissection, key findings, implant/graft specifics, closure layers, drain, dressing" },
        {
          key: "implants", label: "Implant / Device Details", type: "repeating", fields: [
            { key: "device", label: "Device", type: "text", placeholder: "e.g. AMS 700 CX 18cm, Titan OTR 20cm" },
            { key: "manufacturer", label: "Manufacturer", type: "text" },
            { key: "lotNo", label: "Lot/Batch No.", type: "text" },
          ],
        },
        { key: "bloodLoss", label: "Estimated Blood Loss (mL)", type: "number", min: 0, max: 2000 },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Bleeding, hematoma, infection, urethral injury, corporal perforation, crossover, device malfunction, vas injury, spermatic cord hematoma" },
      ],
    },
    {
      key: "postOp",
      label: "Post-operative Orders",
      fields: [
        { key: "catheter", label: "Catheter", type: "select", options: [{ label: "None", value: "None" }, { label: "Foley in situ", value: "Foley" }] },
        { key: "dressing", label: "Dressing / Wound Care", type: "textarea", rows: 1, placeholder: "Compression dressing, scrotal support, ice packs, wound check" },
        { key: "medications", label: "Medications", type: "textarea", rows: 1, placeholder: "Analgesics, antibiotics, anti-inflammatory" },
        { key: "activity", label: "Activity Restrictions", type: "textarea", rows: 1, placeholder: "No intercourse/sexual activity for 6 weeks, no heavy lifting, scrotal support" },
        { key: "deviceInstructions", label: "Device / Implant Instructions", type: "textarea", rows: 2, placeholder: "Penile implant: inflate/deflate training at 4-6 weeks. Peyronie's: traction therapy start at 2 weeks. Vasectomy: semen analysis at 12 weeks to confirm azoospermia" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Suture removal at 10-14 days, device activation at 4-6 weeks, semen analysis at 3 months" },
      ],
    },
  ],
  metadata: {
    description: "Structured operative / procedure note for Andrology — penile implant, Peyronie's surgery, varicocelectomy, vasectomy, vasovasostomy, TESE, and diagnostic procedures",
    specialties: ["Andrology", "Sexual Medicine"],
    status: "active",
  },
};
