import type { TemplateDefinition } from "../templateSchema";

export const PREVENTIVE_HEALTH_CHECK_TEMPLATE: TemplateDefinition = {
  id: "preventive-health-check",
  name: "Executive Health Check / Preventive Screening",
  type: "Screening",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "patientInfo",
      label: "Patient Information",
      fields: [
        { key: "packageName", label: "Health Check Package Name", type: "select", options: [
          { label: "Executive Health Check — Basic", value: "Basic" },
          { label: "Executive Health Check — Comprehensive", value: "Comprehensive" },
          { label: "Well-woman / Well-man Check", value: "Wellness" },
          { label: "Senior Citizen Health Check", value: "Senior" },
          { label: "Pre-employment / Corporate health check", value: "Corporate" },
          { label: "Custom / Individualized screening", value: "Custom" },
        ] },
        { key: "checkDate", label: "Date of Health Check", type: "date", required: true },
        { key: "referralSource", label: "Referral Source", type: "text", placeholder: "Corporate, self-referral, insurance, primary care" },
        { key: "occupation", label: "Occupation", type: "text" },
        { key: "lifestyle", label: "Lifestyle Summary", type: "textarea", rows: 2, placeholder: "Smoking, alcohol, exercise, diet (fruit/veg intake, salt/fat/sugar), sleep, stress level (1-10)" },
      ],
    },
    {
      key: "medicalHistory",
      label: "Medical History & Risk Factors",
      fields: [
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "HTN, DM, dyslipidemia, CAD, stroke, cancer, thyroid, asthma, CKD, liver disease, autoimmune" },
        { key: "surgicalHistory", label: "Past Surgical History", type: "textarea", rows: 1 },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Premature CAD, DM, HTN, cancer (breast/colon/prostate), stroke, autoimmune disease" },
        { key: "medications", label: "Current Medications", type: "textarea", rows: 1 },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "immunizationHistory", label: "Immunization Status", type: "textarea", rows: 1, placeholder: "Influenza, pneumococcal, Tdap, COVID-19, hepatitis B, HPV (age-appropriate)" },
        { key: "cancerScreening", label: "Prior Cancer Screening History", type: "textarea", rows: 1, placeholder: "Pap smear (date/result), mammogram (date/result), colonoscopy (date/result), PSA" },
      ],
    },
    {
      key: "screeningResults",
      label: "Screening Examination & Tests",
      fields: [
        {
          key: "vitals", label: "Vitals / Anthropometry", type: "section", fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
            { key: "bmi", label: "BMI (kg/m2)", type: "number", min: 10, max: 60 },
            { key: "waistCirc", label: "Waist Circumference (cm)", type: "number", min: 40, max: 200 },
          ],
        },
        { key: "generalExam", label: "General Physical Exam", type: "textarea", rows: 2, placeholder: "Head/neck, thyroid, lymph nodes, chest, CVS, abdomen, skin, extremities, neurological screening" },
        { key: "ecg", label: "ECG", type: "text", placeholder: "e.g. NSR, rate 72, normal axis, no ischemia, normal QTc" },
        { key: "chestXray", label: "Chest X-ray (PA view)", type: "text", placeholder: "e.g. Normal lung fields, no cardiomegaly, no active lesion" },
        {
          key: "labResults", label: "Lab Results", type: "section", fields: [
            { key: "cbc", label: "CBC", type: "text", placeholder: "Hb, WBC, Plt — normal/report" },
            { key: "fastingGlucose", label: "Fasting Glucose (mg/dL)", type: "number", min: 0, max: 500 },
            { key: "hba1c", label: "HbA1c (%)", type: "number", min: 3, max: 20 },
            { key: "lipidProfile", label: "Lipid Profile", type: "text", placeholder: "TC, TG, HDL, LDL — report" },
            { key: "renal", label: "Renal Function (Cr/eGFR)", type: "text" },
            { key: "lft", label: "Liver Function", type: "text", placeholder: "AST, ALT, ALP, bilirubin, GGT" },
            { key: "tsh", label: "TSH (mIU/L)", type: "number", min: 0, max: 100 },
            { key: "urine", label: "Urine Routine", type: "text", placeholder: "Normal / abnormal findings" },
            { key: "vitaminD", label: "Vitamin D (ng/mL)", type: "number", min: 0, max: 100 },
            { key: "vitaminB12", label: "Vitamin B12 (pg/mL)", type: "number", min: 0, max: 2000 },
          ],
        },
        { key: "additionalTests", label: "Additional Tests / Imaging", type: "textarea", rows: 2, placeholder: "e.g. USG abdomen, TMT (stress test), echocardiogram, DEXA scan, mammogram, Pap smear, colonoscopy, PSA" },
      ],
    },
    {
      key: "recommendations",
      label: "Assessment & Recommendations",
      fields: [
        { key: "primaryFindings", label: "Key Findings / Abnormal Results", type: "textarea", rows: 2, placeholder: "e.g. Newly detected HTN (BP 148/92), Pre-diabetes (HbA1c 6.1%), Vitamin D deficiency (16 ng/mL)" },
        { key: "diagnoses", label: "Diagnoses / Conditions Identified", type: "repeating", fields: [
          { key: "condition", label: "Condition", type: "text", placeholder: "e.g. Prehypertension, Impaired fasting glucose, Obesity (BMI 32), Hyperlipidemia" },
          { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }] },
          { key: "followUp", label: "Follow-up Plan", type: "text", placeholder: "e.g. Repeat BP in 1 month, Start metformin, Diet + exercise" },
        ] },
        { key: "riskStratification", label: "Cardiovascular Risk Score (10-yr)", type: "text", placeholder: "e.g. ASCVD risk 7.5% (intermediate), Framingham risk score 12%" },
        { key: "lifestyleRecommendations", label: "Lifestyle Recommendations", type: "textarea", rows: 2, placeholder: "Diet (DASH/Mediterranean), exercise (150 min/week moderate), weight loss target, smoking cessation, alcohol moderation, stress management" },
        { key: "treatmentPlan", label: "Treatment / Referral Plan", type: "textarea", rows: 2, placeholder: "Initiate HTN/DM meds, start statin, refer to cardiology/endocrinology, schedule follow-up labs" },
        { key: "vaccinations", label: "Vaccinations / Health Maintenance", type: "textarea", rows: 1, placeholder: "Influenza, pneumococcal, Tdap, shingles, COVID-19 booster" },
        { key: "cancerScreeningPlan", label: "Cancer Screening Due", type: "textarea", rows: 1, placeholder: "Mammogram (if due), Pap smear, colonoscopy at 50, PSA discussion" },
        { key: "healthCoach", label: "Health Coaching / Wellness Referral", type: "boolean" },
        { key: "followUpPeriod", label: "Next Health Check / Follow-up", type: "text", placeholder: "e.g. 1 year (routine), 3 months (abnormal result follow-up)" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive executive / preventive health check — full screening with medical history, physical exam, lab/imaging, risk stratification, and lifestyle recommendations",
    specialties: ["Preventive Medicine", "MHC"],
    status: "active",
  },
};


export const PREVENTIVE_WELLNESS_TEMPLATE: TemplateDefinition = {
  id: "preventive-wellness",
  name: "Wellness Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "reasonForVisit", label: "Reason for Wellness Visit", type: "textarea", required: true, rows: 2, placeholder: "e.g. Routine wellness check, weight management, stress/burnout, sleep issues, fatigue, nutrition counseling, exercise prescription, smoking cessation, menopause/perimenopause management, longevity optimization" },
        { key: "healthGoals", label: "Patient's Health Goals", type: "textarea", rows: 2, placeholder: "e.g. Lose 10 kg, reduce BP without meds, improve energy, better sleep, reduce stress, improve fitness, prevent disease" },
        { key: "dietaryHistory", label: "Dietary / Nutritional History", type: "textarea", rows: 3, placeholder: "Typical day's meals, meal timing/skipping, portions, hydration, sugar/salt/fat intake, fruits/vegetables, processed foods, eating out, supplements, food allergies/intolerances" },
        { key: "physicalActivity", label: "Physical Activity / Exercise", type: "textarea", rows: 2, placeholder: "Type, frequency, duration, intensity, sedentary hours/day, barriers to exercise" },
        { key: "sleep", label: "Sleep Assessment", type: "textarea", rows: 2, placeholder: "Duration, quality, bedtime/wake time, snoring, apneas (partner report), daytime sleepiness (Epworth), insomnia symptoms, screen time before bed" },
        { key: "stressMentalHealth", label: "Stress & Mental Health", type: "textarea", rows: 2, placeholder: "Stress level (1-10), sources, coping mechanisms, anxiety, mood, PHQ-2/GAD-2 screen, social support, work-life balance" },
        { key: "substanceUse", label: "Substance Use / Addictions", type: "textarea", rows: 1, placeholder: "Smoking (pack-years), vaping, alcohol (units/week), caffeine, recreational drugs" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Chronic diseases, surgeries, medications, allergies, family history of chronic disease" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals / Anthropometry", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "bmi", label: "BMI", type: "number", min: 10, max: 60 },
            { key: "waistCirc", label: "Waist Circumference (cm)", type: "number", min: 40, max: 200 },
            { key: "bodyFat", label: "Body Fat % (if measured)", type: "number", min: 0, max: 60 },
          ],
        },
        { key: "exam", label: "Focused Physical Exam", type: "textarea", rows: 2, placeholder: "General, CVS, respiratory, abdomen, MSK (posture/gait), skin — as relevant to wellness" },
        { key: "labs", label: "Available Labs / Screening Results", type: "text", placeholder: "e.g. HbA1c 5.5%, Vitamin D 28 ng/mL, TSH 2.5" },
        { key: "fitnessScreening", label: "Fitness Screening (if done)", type: "text", placeholder: "e.g. 6-min walk test 450m, grip strength 35kg, sit-to-stand 12 reps in 30s" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "wellnessAssessment", label: "Wellness Assessment Summary", type: "textarea", required: true, rows: 3, placeholder: "e.g. Overweight (BMI 28) with sedentary lifestyle. Poor sleep hygiene (6 hrs, fragmented). High stress (7/10) with no coping strategies. Pre-diabetic range HbA1c. Motivated for change" },
        { key: "readiness", label: "Readiness for Change (Stages of Change)", type: "select", options: [{ label: "Precontemplation", value: "Precontemplation" }, { label: "Contemplation", value: "Contemplation" }, { label: "Preparation", value: "Preparation" }, { label: "Action", value: "Action" }, { label: "Maintenance", value: "Maintenance" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "nutritionPlan", label: "Nutrition Plan", type: "textarea", rows: 2, placeholder: "e.g. Calorie target 1800/day, increase protein (25g/meal), reduce added sugar, DASH diet principles, meal prep guidance, refer to dietitian" },
        { key: "exercisePrescription", label: "Exercise Prescription (FITT)", type: "textarea", rows: 2, placeholder: "Frequency: 5x/week, Intensity: moderate (RPE 5-7/10), Time: 30 min, Type: walking + resistance training 2x/week. Progression plan" },
        { key: "sleepHygiene", label: "Sleep Hygiene Plan", type: "textarea", rows: 2, placeholder: "Set consistent bedtime/wake time, limit screens 1 hr before bed, no caffeine after 2 PM, relaxation routine, bedroom optimization" },
        { key: "stressManagement", label: "Stress Management Plan", type: "textarea", rows: 2, placeholder: "Mindfulness/meditation (10 min/day), breathing exercises, regular exercise, social connection, hobby time, EAP/counseling referral" },
        { key: "substanceModification", label: "Substance Use / Reduction Plan", type: "textarea", rows: 1, placeholder: "Smoking cessation (nicotine replacement/referral), alcohol reduction target, caffeine reduction" },
        { key: "supplements", label: "Supplements Recommended", type: "textarea", rows: 1, placeholder: "Vitamin D 2000 IU/day, Omega-3 1g/day, Protein supplement if needed" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "Dietitian, exercise physiologist, health coach, psychologist/therapist, sleep specialist, smoking cessation clinic" },
        { key: "followUp", label: "Follow-up / Coaching", type: "text", placeholder: "e.g. 2 weeks (check-in), 1 month (progress review), 3 months (repeat labs)" },
      ],
    },
  ],
  metadata: {
    description: "Wellness consult — nutrition, exercise prescription, sleep hygiene, stress management, substance use reduction, and lifestyle medicine intervention",
    specialties: ["Preventive Medicine", "MHC"],
    status: "active",
  },
};


export const PREVENTIVE_VACCINATION_TEMPLATE: TemplateDefinition = {
  id: "preventive-vaccination",
  name: "Vaccination / Immunization Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Vaccination Details",
      fields: [
        { key: "vaccineName", label: "Vaccine Name", type: "select", required: true, options: [
          { label: "Influenza (Inactivated) — Quadrivalent", value: "IIV4" },
          { label: "Influenza (Live attenuated) — Quadrivalent", value: "LAIV4" },
          { label: "COVID-19 (mRNA — Pfizer/BioNTech)", value: "COVIDmRNA" },
          { label: "COVID-19 (Viral vector — Janssen)", value: "COVIDVector" },
          { label: "COVID-19 (Protein subunit — Novavax)", value: "COVIDProtein" },
          { label: "Tdap (Tetanus, diphtheria, pertussis)", value: "Tdap" },
          { label: "Td (Tetanus, diphtheria)", value: "Td" },
          { label: "MMR (Measles, mumps, rubella)", value: "MMR" },
          { label: "Varicella (Chickenpox)", value: "Varicella" },
          { label: "Herpes Zoster (Shingrix — recombinant)", value: "RZV" },
          { label: "HPV (Human papillomavirus — 9-valent)", value: "HPV9" },
          { label: "Pneumococcal (PCV20 / PPSV23)", value: "Pneumococcal" },
          { label: "Hepatitis A (Havrix / Vaqta)", value: "HepA" },
          { label: "Hepatitis B (Engerix-B / Recombivax)", value: "HepB" },
          { label: "HepA + HepB (Twinrix)", value: "HepAB" },
          { label: "Meningococcal (MenACWY / MenB)", value: "Meningococcal" },
          { label: "Rabies (post-exposure prophylaxis)", value: "RabiesPEP" },
          { label: "Rabies (pre-exposure prophylaxis)", value: "RabiesPrEP" },
          { label: "Yellow Fever (Stamaril)", value: "YellowFever" },
          { label: "Typhoid (injected / oral)", value: "Typhoid" },
          { label: "Cholera (oral — Dukoral / Vaxchora)", value: "Cholera" },
          { label: "Japanese Encephalitis", value: "JE" },
          { label: "Tick-borne Encephalitis", value: "TBE" },
          { label: "BCG (Tuberculosis)", value: "BCG" },
          { label: "RSV (Respiratory syncytial virus)", value: "RSV" },
          { label: "Dengue (CYD-TDV / TAK-003)", value: "Dengue" },
        ] },
        { key: "doseNumber", label: "Dose Number / Series", type: "text", required: true, placeholder: "e.g. Dose 1 of 2, Booster, Annual, Primary series" },
        { key: "date", label: "Date of Administration", type: "date", required: true },
        { key: "manufacturer", label: "Manufacturer / Lot Number", type: "text", placeholder: "e.g. Sanofi Pasteur, Lot # U1234AB" },
        { key: "expiryDate", label: "Expiry Date", type: "date" },
        { key: "route", label: "Route", type: "select", required: true, options: [{ label: "IM (intramuscular)", value: "IM" }, { label: "SC (subcutaneous)", value: "SC" }, { label: "ID (intradermal)", value: "ID" }, { label: "Oral", value: "Oral" }, { label: "Intranasal", value: "Intranasal" }] },
        { key: "site", label: "Site", type: "select", options: [{ label: "Left deltoid", value: "LDeltoid" }, { label: "Right deltoid", value: "RDeltoid" }, { label: "Left anterolateral thigh", value: "LThigh" }, { label: "Right anterolateral thigh", value: "RThigh" }, { label: "Left gluteal", value: "LGluteal" }, { label: "Right gluteal", value: "RGluteal" }] },
      ],
    },
    {
      key: "screening",
      label: "Pre-Vaccination Screening",
      fields: [
        { key: "consentObtained", label: "Consent Obtained (VIS given and reviewed)", type: "boolean", required: true },
        { key: "contraindications", label: "Screening for Contraindications", type: "textarea", rows: 2, placeholder: "Screened for: allergy to vaccine components, prior vaccine reaction, acute illness/fever, pregnancy/breastfeeding, immunosuppression, recent blood products/IVIG, Guillain-Barre history" },
        { key: "pregnancyStatus", label: "Pregnancy Status (if applicable)", type: "select", options: [{ label: "Not applicable", value: "NA" }, { label: "Not pregnant", value: "NotPregnant" }, { label: "Pregnant — vaccine appropriate", value: "PregnantAppropriate" }] },
      ],
    },
    {
      key: "administration",
      label: "Administration & Observation",
      fields: [
        { key: "administeredBy", label: "Administered By", type: "text", required: true },
        { key: "observation", label: "Post-Vaccination Observation", type: "textarea", rows: 1, placeholder: "Patient observed for 15 min (30 min if history of allergy). No immediate adverse reaction" },
        { key: "adverseReaction", label: "Adverse Reaction (if any)", type: "textarea", rows: 1, placeholder: "e.g. Vasovagal syncope, local redness/swelling, anaphylaxis (managed per protocol)" },
        { key: "nextDose", label: "Next Dose Due Date", type: "date" },
      ],
    },
    {
      key: "postProcedure",
      label: "Counseling & Records",
      fields: [
        { key: "counselingGiven", label: "Post-Vaccination Counseling Given", type: "boolean" },
        { key: "counselingDetails", label: "Counseling Details", type: "textarea", rows: 1, placeholder: "Expected side effects (fever, soreness, fatigue), when to seek care, vaccine record card provided" },
        { key: "vaccineRegistry", label: "Documented in Vaccine Registry / EHR", type: "boolean" },
        { key: "visDate", label: "VIS (Vaccine Information Statement) Date", type: "text" },
      ],
    },
  ],
  metadata: {
    description: "Structured vaccination / immunization procedure note — pre-screening, administration, observation, counseling, and documentation for adult and travel vaccines",
    specialties: ["Preventive Medicine", "MHC", "Travel Medicine"],
    status: "active",
  },
};
