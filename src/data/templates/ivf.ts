import type { TemplateDefinition } from "../templateSchema";

export const IVF_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "ivf-consult",
  name: "Reproductive Medicine / IVF OPD Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Primary infertility, secondary infertility, recurrent pregnancy loss, PCOS, amenorrhea, male factor infertility" },
        { key: "duration", label: "Duration of Infertility", type: "text", placeholder: "e.g. 2 years of unprotected intercourse" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Type (primary/secondary), duration of trying, prior evaluation and treatment (IUI cycles, IVF cycles, surgeries), previous pregnancy outcomes, current symptoms (cycle regularity, pelvic pain, dysmenorrhea, hirsutism, galactorrhea, weight changes)" },
        { key: "menstrualHistory", label: "Menstrual & Ovulatory History", type: "textarea", rows: 2, placeholder: "Menarche, cycle length/regularity, LMP, ovulation signs (mittelschmerz, cervical mucus), intermenstrual bleeding, dysmenorrhea" },
        { key: "obstetricHistory", label: "Obstetric History", type: "textarea", rows: 2, placeholder: "Gravida/Para/Abortus, previous live births, miscarriages (gestational age), ectopic pregnancies, terminations, complications" },
        { key: "contraceptionHistory", label: "Contraception History", type: "text", placeholder: "OCP, IUD, barrier, prior fertility awareness" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "PCOS, endometriosis, thyroid disease, hyperprolactinemia, autoimmune disease, DM, TB, STIs, PID, surgery" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Laparoscopy (endometriosis/fibroids/tubal surgery), myomectomy, ovarian cystectomy, tubal ligation reversal, C-section" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "Ovulation induction agents (clomiphene/letrozole/gonadotropins), metformin, thyroid replacement, vitamins/supplements" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Infertility, PCOS, endometriosis, genetic disorders, recurrent miscarriage in family" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, caffeine, exercise, occupation, stress, age of partner" },
        { key: "partnerHistory", label: "Partner History (Male Factor)", type: "textarea", rows: 2, placeholder: "Age, prior paternity, semen analysis results (if available), urological history, medications, lifestyle" },
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
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "BMI, hirsutism (Ferriman-Gallwey score), acne, acanthosis nigricans, goiter, galactorrhea, virilization" },
        {
          key: "gynecExam", label: "Gynecological / Pelvic Exam", type: "section", fields: [
            { key: "inspection", label: "Inspection", type: "text", placeholder: "Vulva, vagina, discharge" },
            { key: "cervix", label: "Cervix / Speculum", type: "text", placeholder: "Appearance, discharge, cervical smear status" },
            { key: "bimanual", label: "Bimanual Exam", type: "text", placeholder: "Uterus (size/position/mobility/adnexal masses/tenderness), cul-de-sac tenderness (endometriosis)" },
          ],
        },
        { key: "ultrasound", label: "Pelvic Ultrasound (Transvaginal)", type: "textarea", rows: 2, placeholder: "Endometrial thickness, ovarian volume, AFC (antral follicle count), dominant follicle, endometrioma, fibroids, adenomyosis, tubal findings" },
        { key: "partnerExam", label: "Partner Exam (if applicable)", type: "text", placeholder: "Testicular volume, varicocele, hernia, secondary sexual characteristics" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. Primary infertility due to PCOS, Unexplained infertility, Male factor infertility (oligoasthenoteratozoospermia), Recurrent pregnancy loss, Tubal factor infertility, Diminished ovarian reserve" },
        { key: "icdCode", label: "ICD-10 Code", type: "text", placeholder: "e.g. N97.1, N97.8" },
        {
          key: "diagnoses", label: "Contributing Factors", type: "repeating", fields: [
            { key: "factor", label: "Factor", type: "select", options: [{ label: "Ovulatory", value: "Ovulatory" }, { label: "Tubal", value: "Tubal" }, { label: "Male", value: "Male" }, { label: "Uterine", value: "Uterine" }, { label: "Age-related", value: "Age" }, { label: "Unexplained", value: "Unexplained" }] },
            { key: "details", label: "Details", type: "text" },
          ],
        },
        { key: "amh", label: "AMH / Ovarian Reserve", type: "text", placeholder: "e.g. AMH 1.2 ng/mL, AFC 8" },
        { key: "semenAnalysis", label: "Partner Semen Analysis Summary", type: "text", placeholder: "e.g. Volume 2.5mL, Count 15M/mL, Motility 35%, Morphology 2%" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 2, placeholder: "Concise summary of infertility workup results" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "Ovulation induction (clomiphene/letrozole/gonadotropins), IUI, IVF (antagonist/agonist protocol, freeze-all, donor egg/sperm/embryo), surgical (laparoscopy/hysteroscopy), lifestyle optimization" },
        {
          key: "investigations", label: "Investigations / Workup", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. Day 2-4 FSH/E2/AMH/LH, TSH, prolactin, HSG/SIS, hysteroscopy, semen analysis, genetic carrier screening" },
            { key: "partner", label: "For Partner?", type: "boolean" },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "timing", label: "Cycle Timing", type: "text", placeholder: "e.g. Day 3-7, trigger on Day 12" },
          ],
        },
        { key: "procedurePlan", label: "Procedure Plan (IUI/IVF/ICSI)", type: "textarea", rows: 2, placeholder: "Cycle type (natural/stimulated), protocol, trigger, egg retrieval timing, embryo transfer (fresh/frozen), single/double embryo transfer" },
        { key: "geneticTesting", label: "Genetic Testing / Counseling", type: "textarea", rows: 1, placeholder: "PGT-A, PGT-M, carrier screening discussed/offered" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 2, placeholder: "Medication schedule, monitoring visits, intercourse timing, supplements (folic acid, CoQ10, vitamin D), lifestyle (diet, exercise, smoking cessation, alcohol)" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Reproductive endocrinology, urology/andrology, genetics counselor, nutritionist, psychology (fertility counseling)" },
        { key: "followUp", label: "Follow-up / Next Cycle Monitoring", type: "text", placeholder: "e.g. Day 2 of next cycle for baseline ultrasound, IUI timing" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive infertility / reproductive medicine consultation with cycle assessment, ovarian reserve, and treatment planning (IUI/IVF/ICSI)",
    specialties: ["Reproductive Medicine"],
    status: "active",
  },
};


export const IVF_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "ivf-followup",
  name: "Reproductive Medicine / IVF Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History / Cycle Review", type: "textarea", required: true, rows: 3, placeholder: "Cycle day, treatment response, side effects (OHSS risk, injection site reactions, mood changes), symptoms (bloating, pelvic pain, bleeding)" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 1, placeholder: "OHSS symptoms (bloating/weight gain/SOB/oliguria), headache, hot flashes, injection site" },
        { key: "pregnancySymptoms", label: "Pregnancy Symptoms (if post-transfer)", type: "textarea", rows: 1, placeholder: "Nausea, breast tenderness, spotting, cramping, beta-hCG result" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "weight", label: "Weight", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "ultrasound", label: "Ultrasound Findings", type: "textarea", rows: 2, placeholder: "Endometrial thickness, follicle size/count, ovarian size (OHSS assessment), endometrial pattern, corpus luteum" },
        { key: "labResults", label: "Lab Results", type: "text", placeholder: "e.g. E2 800 pg/mL, P4 0.5 ng/mL, beta-hCG 150 mIU/mL" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "cyclePhase", label: "Cycle Phase / Status", type: "select", options: [{ label: "Baseline / Pre-stimulation", value: "Baseline" }, { label: "Stimulation — active monitoring", value: "Stimulation" }, { label: "Trigger / Retrieval planning", value: "Trigger" }, { label: "Post-retrieval / Pre-transfer", value: "PostRetrieval" }, { label: "Post-transfer — awaiting beta", value: "PostTransfer" }, { label: "Post-transfer — positive beta", value: "Positive" }, { label: "Post-transfer — negative beta", value: "Negative" }] },
        { key: "ohssRisk", label: "OHSS Risk", type: "select", options: [{ label: "Low", value: "Low" }, { label: "Moderate", value: "Moderate" }, { label: "High", value: "High" }] },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Cycle progress, response to stimulation, plan progression" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "nextSteps", label: "Next Steps", type: "textarea", required: true, rows: 2, placeholder: "Continue stimulation, trigger timing, egg retrieval date, embryo transfer plan (fresh/frozen), luteal support" },
        { key: "medicationChanges", label: "Medication Adjustments", type: "textarea", rows: 2, placeholder: "Gonadotropin dose adjustment, antagonist start, trigger (hCG/GnRH agonist), luteal support (progesterone)" },
        { key: "nextMonitoring", label: "Next Monitoring Visit", type: "text", placeholder: "e.g. Day 8 for USG + labs, trigger 36h before retrieval" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 2, placeholder: "Medication timing, intercourse restrictions (post-retrieval), OHSS warning signs, activity restrictions post-transfer" },
      ],
    },
  ],
  metadata: {
    description: "Cycle monitoring follow-up for fertility treatment — ovulation induction, IUI, and IVF cycle tracking with OHSS risk assessment",
    specialties: ["Reproductive Medicine"],
    status: "active",
  },
};


export const IVF_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "ivf-procedure",
  name: "ART / IVF Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Transvaginal oocyte retrieval (TVOR), Fresh embryo transfer (D3/D5 blastocyst), Frozen embryo transfer (FET), Intrauterine insemination (IUI), Hysterosalpingography (HSG), Hysteroscopy, Laparoscopy for fertility, Testicular sperm extraction (TESA/PESA)" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "cycleDay", label: "Cycle Day / Stimulation Day", type: "text" },
        { key: "preOpPrep", label: "Pre-Procedure Preparation", type: "textarea", rows: 2, placeholder: "Protocol details, trigger timing, anesthesia plan (for retrieval), antibiotic prophylaxis, embryo thawing (for FET)" },
        { key: "anesthesia", label: "Anesthesia", type: "select", options: [{ label: "None", value: "None" }, { label: "IV sedation (midazolam + fentanyl)", value: "IVSedation" }, { label: "GA", value: "GA" }, { label: "None (IUI/ET)", value: "None" }] },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. IVF OT, procedure room" },
        { key: "clinician", label: "Clinician", type: "text" },
        { key: "findings", label: "Findings & Procedure Details", type: "textarea", required: true, rows: 4, placeholder: "Retrieval: number of follicles, oocytes retrieved (MII/MI/GV), complications. Embryo transfer: catheter type, ease of transfer, embryo quality (grade/expansion), number transferred. IUI: semen preparation, insemination volume" },
        { key: "spermSource", label: "Sperm Source", type: "select", options: [{ label: "Fresh ejaculated (partner)", value: "FreshPartner" }, { label: "Frozen donor", value: "DonorFrozen" }, { label: "TESA/PESA", value: "TESA" }] },
        { key: "embryoData", label: "Embryo / Oocyte Data", type: "textarea", rows: 2, placeholder: "Oocytes inseminated (IVF/ICSI), 2PN fertilization, cleavage, blastocyst grade, cryopreservation (vitrification)" },
        { key: "specimens", label: "Specimens / Cryopreservation", type: "text", placeholder: "e.g. 6 oocytes, 5 embryos vitrified, blastocyst biopsy for PGT" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Difficult retrieval, bleeding, infection, failed fertilization, difficult transfer, OHSS concerns" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Recovery from sedation, vitals stable, bleeding minimal, tolerated well" },
        { key: "postOpOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "Luteal support (progesterone, estrogen), antibiotics, OHSS monitoring (if retrieval), activity restrictions, when to call" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Discharged home", value: "Home" }, { label: "Observe 2 hrs", value: "Observe" }, { label: "Admitted (OHSS risk)", value: "Admitted" }] },
        { key: "followUpPlan", label: "Follow-up Plan", type: "text", placeholder: "e.g. Serum beta-hCG in 14 days, embryo transfer in 5 days, FET cycle start next month" },
      ],
    },
  ],
  metadata: {
    description: "Procedure note for ART/IVF procedures — oocyte retrieval, embryo transfer (fresh/frozen), IUI, HSG, hysteroscopy, TESA/PESA",
    specialties: ["Reproductive Medicine"],
    status: "active",
  },
};
