import type { TemplateDefinition } from "../templateSchema";

export const OCCUPATIONAL_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "occupational-consult",
  name: "Occupational Health Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint / Reason for Visit", type: "textarea", required: true, rows: 2, placeholder: "e.g. Work-related injury (sprain/fracture/laceration), occupational exposure (chemical/noise/dust/biological), respiratory symptoms (occupational asthma/pneumoconiosis), musculoskeletal pain (repetitive strain/back pain), dermatitis, hearing loss, stress/burnout, fatigue, fitness-for-duty evaluation" },
        { key: "occupationalHistory", label: "Occupational History", type: "textarea", required: true, rows: 3, placeholder: "Current occupation, employer, department, job role, years at job, specific tasks/processes, shift pattern, protective equipment used, recent changes in work process, previous jobs with exposures" },
        { key: "exposureHistory", label: "Exposure History", type: "textarea", rows: 3, placeholder: "Chemical (solvents/pesticides/heavy metals/asbestos/silica), physical (noise/vibration/radiation/heat), biological (blood/body fluids/tuberculosis/COVID), ergonomic (repetitive motion/lifting), psychosocial (stress/bullying/overwork)" },
        { key: "injuryDetails", label: "Injury/Incident Details", type: "textarea", rows: 3, placeholder: "Date/time of incident, location, mechanism of injury, witnesses, first aid given, safety equipment used, near-miss factors, root cause if known, work days lost, modified duties" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Pre-existing conditions (asthma/eczema/allergies/back pain/hearing loss/mental health), prior occupational injuries/claims, current treatments, medications" },
        { key: "medications", label: "Current Medications", type: "textarea", rows: 1, placeholder: "Analgesics, anti-inflammatory, inhalers, antihistamines, antidepressants, muscle relaxants" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1, placeholder: "Workplace sensitizers, latex, chemicals" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 1, placeholder: "Smoking, alcohol, second job, hobbies with exposures, commute, home environment" },
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
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "General appearance, distress, hygiene, protective equipment use" },
        { key: "focusedExam", label: "Focused System Exam", type: "textarea", rows: 3, placeholder: "MSK: ROM, strength, tenderness, swelling, provocative tests. Respiratory: auscultation, wheeze, spirometry. Dermatological: rash, contact dermatitis, abrasions. ENT: hearing, rhinorrhea. Neurological: sensation, reflexes, tremor" },
        { key: "spirometry", label: "Spirometry / PFT Results", type: "text", placeholder: "e.g. FVC 4.2L (85% pred), FEV1 3.0L (78% pred), FEV1/FVC 71%" },
        { key: "audiometry", label: "Audiometry Results", type: "text", placeholder: "e.g. Bilateral high-frequency hearing loss (4-8 kHz), 25 dB threshold shift" },
        { key: "labs", label: "Lab / Imaging Results", type: "text", placeholder: "e.g. Lead level 15 ug/dL, HgB 14.2, CXR (normal/pleural plaques)" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        {
          key: "diagnoses", label: "Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD-10 Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text", placeholder: "e.g. Work-related low back pain, Occupational asthma, Noise-induced hearing loss" },
            { key: "workRelatedness", label: "Work-relatedness", type: "select", options: [{ label: "Definitely work-related", value: "Definite" }, { label: "Probably work-related", value: "Probable" }, { label: "Possibly work-related", value: "Possible" }, { label: "Not work-related", value: "NotRelated" }] },
          ],
        },
        { key: "impairmentRating", label: "Impairment / Disability Rating", type: "text", placeholder: "e.g. TTD, TPD, PPI — AMA Guides %, MMI reached" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", rows: 3, placeholder: "Restricted duties/modified work, physiotherapy, medication, specialist referral, workplace accommodations, ergonomic assessment, elimination of exposure" },
        { key: "workRestrictions", label: "Work Restrictions / Return to Work", type: "textarea", rows: 2, placeholder: "e.g. No heavy lifting >10 kg x 4 weeks, no climbing, light duties only, fit note / sick leave duration" },
        { key: "investigations", label: "Investigations / Surveillance", type: "textarea", rows: 2, placeholder: "e.g. Serial PFTs, repeat lead level, MRI lumbar spine, nerve conduction study, patch testing" },
        { key: "workplaceModifications", label: "Workplace Modifications Recommended", type: "textarea", rows: 2, placeholder: "Ergonomic chair/desk, anti-fatigue mat, job rotation, hearing protection program, ventilation improvement, PPE upgrade" },
        { key: "reporting", label: "Statutory Reporting / Notification", type: "textarea", rows: 1, placeholder: "e.g. Form 5 (occupational disease) to labor department, OSHA notification, workers' compensation claim filed" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Physiotherapy, occupational therapist, ergonomist, orthopedic surgeon, pulmonologist, audiologist" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks for RTW assessment, 1 month for repeat PFTs, 3 months for surveillance audiogram" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive consultation note for Occupational Health — work-related injuries, occupational exposures, fitness-for-duty, disease surveillance, and workplace rehabilitation",
    specialties: ["Occupational Health"],
    status: "active",
  },
};


export const OCCUPATIONAL_SCREENING_TEMPLATE: TemplateDefinition = {
  id: "occupational-screening",
  name: "Occupational Health Screening",
  type: "Screening",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "patientInfo",
      label: "Patient / Employee Information",
      fields: [
        { key: "employeeId", label: "Employee ID / Badge Number", type: "text" },
        { key: "employer", label: "Employer / Company", type: "text" },
        { key: "department", label: "Department / Work Unit", type: "text" },
        { key: "jobTitle", label: "Job Title / Role", type: "text", required: true },
        { key: "yearsInRole", label: "Years in Current Role", type: "number", min: 0, max: 60 },
        { key: "shiftPattern", label: "Shift Pattern", type: "select", options: [{ label: "Day shift", value: "Day" }, { label: "Night shift", value: "Night" }, { label: "Rotating shifts", value: "Rotating" }, { label: "On-call", value: "OnCall" }] },
        { key: "screeningType", label: "Screening Type", type: "select", required: true, options: [
          { label: "Pre-employment / Pre-placement", value: "PreEmployment" },
          { label: "Periodic / Annual surveillance", value: "Periodic" },
          { label: "Return to work after illness", value: "RTW" },
          { label: "Post-offer / Conditional", value: "PostOffer" },
          { label: "Exit / Termination", value: "Exit" },
        ] },
      ],
    },
    {
      key: "occupationalHistory",
      label: "Occupational & Exposure History",
      fields: [
        { key: "exposureRisks", label: "Identified Workplace Risks", type: "textarea", rows: 2, placeholder: "Chemical, physical, biological, ergonomic, psychosocial risks" },
        { key: "ppeUsage", label: "PPE Usage / Compliance", type: "select", options: [{ label: "Always uses required PPE", value: "Always" }, { label: "Sometimes uses", value: "Sometimes" }, { label: "Rarely/never", value: "Rarely" }, { label: "Not applicable", value: "NA" }] },
        { key: "pastIncidents", label: "Past Work-related Incidents", type: "textarea", rows: 1, placeholder: "Prior injuries, exposures, near-misses, days lost" },
        { key: "medicalHistory", label: "Medical History (relevant to work)", type: "textarea", rows: 2, placeholder: "Asthma, dermatitis, allergies, MSK, hearing, vision, mental health, epilepsy, diabetes, medications" },
      ],
    },
    {
      key: "screeningResults",
      label: "Screening Examination & Tests",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "bmi", label: "BMI", type: "number", min: 10, max: 60 },
          ],
        },
        { key: "vision", label: "Vision Screening", type: "text", placeholder: "e.g. VA 20/20 OU, Ishihara 12/14, visual fields full" },
        { key: "hearing", label: "Hearing Screening (Audiometry)", type: "text", placeholder: "e.g. 500-4kHz: <25dB bilaterally, no STS from baseline" },
        { key: "spirometry", label: "Spirometry / Lung Function", type: "text", placeholder: "e.g. FVC 95%pred, FEV1 90%pred, FEV1/FVC 78% — normal" },
        { key: "musculoskeletal", label: "Musculoskeletal Screening", type: "textarea", rows: 2, placeholder: "Spine ROM, strength, grip, squat, lifting assessment (NIOSH), balance, repetitive motion" },
        { key: "labTests", label: "Lab / Biological Monitoring", type: "textarea", rows: 2, placeholder: "e.g. Blood lead 8 ug/dL, HgB 15.2, Urine mercury <5 ug/L, urine dipstick" },
        { key: "chestXray", label: "Chest X-ray (if indicated)", type: "text", placeholder: "e.g. ILO 0/1 — no pneumoconiosis" },
        { key: "drugAlcohol", label: "Drug & Alcohol Screen", type: "select", options: [{ label: "Not required", value: "NA" }, { label: "Negative", value: "Negative" }, { label: "Positive — pending", value: "PositivePending" }, { label: "Positive — confirmed", value: "PositiveConfirmed" }] },
        { key: "mentalHealth", label: "Mental Health Screening (PHQ-9 / GAD-7)", type: "text", placeholder: "e.g. PHQ-9 score 4 (minimal depression)" },
      ],
    },
    {
      key: "recommendations",
      label: "Recommendations / Fitness Determination",
      fields: [
        { key: "fitness", label: "Fitness for Work Determination", type: "select", required: true, options: [
          { label: "Fit for work — no restrictions", value: "Fit" },
          { label: "Fit for work — with restrictions", value: "FitRestricted" },
          { label: "Temporarily unfit", value: "TempUnfit" },
          { label: "Permanently unfit for current role", value: "PermUnfit" },
        ] },
        { key: "restrictions", label: "Work Restrictions / Accommodations", type: "textarea", rows: 2, placeholder: "e.g. No heavy lifting >15kg, no climbing ladders, no respirator use, hearing protection mandatory" },
        { key: "healthSurveillance", label: "Health Surveillance Follow-up", type: "textarea", rows: 1, placeholder: "e.g. Annual audiogram, quarterly lead level, 6-month PFT" },
        { key: "vaccinations", label: "Vaccinations Recommended", type: "textarea", rows: 1, placeholder: "Hepatitis B, influenza, Tdap, MMR, varicella, COVID-19, BCG (healthcare), rabies" },
        { key: "healthPromotion", label: "Health Promotion / Counseling", type: "textarea", rows: 2, placeholder: "Smoking cessation, weight management, ergonomic training, stress management, sleep hygiene" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "e.g. Physiotherapy, ergonomic assessment, occupational medicine, EAP" },
        { key: "followUp", label: "Next Screening / Review Date", type: "date" },
      ],
    },
  ],
  metadata: {
    description: "Structured occupational health screening — pre-employment, periodic surveillance, return to work, and exit examinations with fitness determination",
    specialties: ["Occupational Health"],
    status: "active",
  },
};


export const OCCUPATIONAL_FITNESS_TEMPLATE: TemplateDefinition = {
  id: "occupational-fitness",
  name: "Occupational Fitness Certification",
  type: "Screening",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "patientInfo",
      label: "Employee / Applicant Information",
      fields: [
        { key: "employeeId", label: "Employee ID", type: "text" },
        { key: "employer", label: "Employer", type: "text" },
        { key: "jobTitle", label: "Proposed / Current Job Title", type: "text", required: true },
        { key: "jobCategory", label: "Job Category", type: "select", options: [
          { label: "General office / sedentary", value: "Sedentary" },
          { label: "Light physical", value: "Light" },
          { label: "Moderate physical", value: "Moderate" },
          { label: "Heavy physical", value: "Heavy" },
          { label: "Safety-critical", value: "SafetyCritical" },
          { label: "Healthcare worker", value: "Healthcare" },
          { label: "Confined spaces / heights / diver", value: "Hazardous" },
        ] },
        { key: "certificationType", label: "Certification Type", type: "select", required: true, options: [
          { label: "Pre-employment fitness certification", value: "PreEmployment" },
          { label: "Periodic / Annual recertification", value: "Periodic" },
          { label: "Return to work after injury/surgery", value: "RTW" },
          { label: "Return to work after medical leave", value: "MedLeave" },
          { label: "Fitness for safety-critical role", value: "SafetyCritical" },
          { label: "Fitness for respirator / PPE use", value: "Respirator" },
        ] },
        { key: "referralReason", label: "Reason for Certification", type: "textarea", rows: 2, placeholder: "e.g. New hire requiring fitness clearance, post-MI return to work for firefighter" },
      ],
    },
    {
      key: "medicalAssessment",
      label: "Medical Assessment",
      fields: [
        { key: "relevantHistory", label: "Relevant Medical History", type: "textarea", rows: 2, placeholder: "CVS (MI/CABG/HF/arrhythmia), respiratory (asthma/COPD), MSK (back/joint), neuro (epilepsy/stroke), vision, hearing, diabetes, mental health" },
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Pulse", type: "number", min: 0, max: 300 },
            { key: "bmi", label: "BMI", type: "number", min: 10, max: 60 },
          ],
        },
        { key: "physicalExam", label: "Focused Physical Exam", type: "textarea", rows: 3, placeholder: "CVS, respiratory, MSK, neurological, abdominal, vision, hearing" },
        { key: "functionalCapacity", label: "Functional Capacity Assessment", type: "textarea", rows: 2, placeholder: "e.g. Able to lift 25kg from floor, climb 3 flights, grip strength 40kg, stand/walk 8 hrs" },
      ],
    },
    {
      key: "screeningResults",
      label: "Special Tests / Screening",
      fields: [
        { key: "vision", label: "Vision Screening", type: "text", placeholder: "e.g. VA 6/6 bilateral, color vision normal, fields full" },
        { key: "hearing", label: "Hearing Screening", type: "text", placeholder: "e.g. <25dB at 500-4kHz, speech discrimination 100%" },
        { key: "ecg", label: "ECG (if indicated)", type: "text", placeholder: "e.g. NSR, rate 68, no ischemia, normal QTc" },
        { key: "stressTest", label: "Cardiac Stress Test (if indicated)", type: "text", placeholder: "e.g. Bruce 12 METs, target HR reached, no ischemia, fit for heavy work" },
        { key: "spirometry", label: "Spirometry / Respirator Clearance", type: "text", placeholder: "e.g. FVC 96%, FEV1 92%, FEV1/FVC 80% — normal. Fit for respirator use" },
        { key: "labTests", label: "Lab Tests (if required)", type: "text", placeholder: "e.g. HbA1c 5.6%, fasting glucose 92, lipids normal, LFTs normal" },
        { key: "drugAlcohol", label: "Drug & Alcohol Screening", type: "select", options: [{ label: "Not required", value: "NA" }, { label: "Negative", value: "Negative" }, { label: "Positive — pending", value: "Positive" }] },
      ],
    },
    {
      key: "recommendations",
      label: "Fitness Certification & Recommendations",
      fields: [
        { key: "fitnessDetermination", label: "Fitness Determination", type: "select", required: true, options: [
          { label: "FIT — Unconditional", value: "FitUnconditional" },
          { label: "FIT — With conditions", value: "FitConditional" },
          { label: "FIT — Time-limited", value: "FitTimeLimited" },
          { label: "UNFIT — Temporarily", value: "TempUnfit" },
          { label: "UNFIT — Permanently", value: "PermUnfit" },
        ] },
        { key: "conditions", label: "Conditions / Restrictions", type: "textarea", rows: 2, placeholder: "e.g. Must wear hearing protection, no heavy lifting >20kg, no heights >5m" },
        { key: "accommodations", label: "Workplace Accommodations Required", type: "textarea", rows: 2, placeholder: "Ergonomic chair, sit-stand desk, voice-to-text, reduced hours, modified duties" },
        { key: "validUntil", label: "Certificate Valid Until", type: "date" },
        { key: "healthMonitoring", label: "Ongoing Health Monitoring Plan", type: "textarea", rows: 1, placeholder: "Annual audiogram, biennial spirometry, annual cardiac review" },
        { key: "recommendations", label: "Health Recommendations", type: "textarea", rows: 2, placeholder: "Weight management, smoking cessation, diabetes optimization, physiotherapy" },
        { key: "fitNotes", label: "Notes / Comments to Employer", type: "textarea", rows: 2, placeholder: "Employee is fit for the role provided conditions are met. Review at next recertification" },
      ],
    },
  ],
  metadata: {
    description: "Occupational fitness certification — pre-employment, periodic recertification, return-to-work, and fitness for safety-critical and hazardous roles with functional assessment",
    specialties: ["Occupational Health"],
    status: "active",
  },
};
