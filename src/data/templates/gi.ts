import type { TemplateDefinition } from "../templateSchema";

export const GI_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "gi-consult",
  name: "Gastroenterology Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Abdominal pain, dyspepsia, GERD, diarrhea, constipation, jaundice, GI bleed" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 weeks, chronic recurring" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 4, placeholder: "Pain (site/character/radiation/relieving-aggravating), relation to meals, bowel habits, blood/mucus, stool consistency (Bristol scale), weight changes, nausea/vomiting, dysphagia (solids/liquids), heartburn, regurgitation" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "GERD, PUD, IBS, IBD (Crohn's/UC), celiac, hepatitis (B/C), cirrhosis, pancreatitis, DM, HTN" },
        { key: "pastSurgicalHistory", label: "Past Surgical History", type: "textarea", rows: 2, placeholder: "Cholecystectomy, appendectomy, bowel resection, bariatric surgery, liver resection, hernia repair" },
        { key: "medicationHistory", label: "Current Medications", type: "textarea", rows: 2, placeholder: "PPI/H2RA, NSAIDs, aspirin, anticoagulants, antibiotics, immunosuppressants, lactulose, rifaximin" },
        { key: "allergies", label: "Allergies", type: "textarea", rows: 1 },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Colorectal cancer, IBD, celiac, hepatitis, pancreatic cancer in first-degree relatives" },
        { key: "socialHistory", label: "Social History", type: "textarea", rows: 2, placeholder: "Smoking, alcohol (type/quantity/duration), IV drug use, diet, travel" },
        { key: "reviewOfSystems", label: "Review of Systems", type: "textarea", rows: 3, placeholder: "Constitutional, CVS, respiratory, urinary, skin, joints, eyes" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section",
          fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 0, max: 300 },
            { key: "temp", label: "Temp (°C)", type: "number", min: 30, max: 45 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalAppearance", label: "General Appearance", type: "textarea", rows: 1, placeholder: "Icterus, pallor, cachexia, distension, Kayser-Fleischer rings, spider nevi, palmar erythema, asterixis" },
        {
          key: "abdominalExam", label: "Abdominal Examination", type: "section",
          fields: [
            { key: "inspection", label: "Inspection", type: "textarea", rows: 1, placeholder: "Distension, scars, hernias, caput medusae, visible peristalsis" },
            { key: "palpation", label: "Palpation", type: "textarea", rows: 1, placeholder: "Tenderness (site/severity), guarding, rigidity, rebound, organomegaly (liver span, spleen), masses" },
            { key: "percussion", label: "Percussion", type: "textarea", rows: 1, placeholder: "Tympany, dullness, shifting dullness, fluid thrill" },
            { key: "auscultation", label: "Auscultation", type: "textarea", rows: 1, placeholder: "Bowel sounds (frequency/character), bruits" },
          ],
        },
        { key: "rectalExam", label: "Digital Rectal Exam", type: "textarea", rows: 1, placeholder: "Tone, masses, blood (frank/occult), prostate, stool color/consistency" },
        { key: "CVS_Resp", label: "CVS & Respiratory", type: "textarea", rows: 1, placeholder: "Base assessment for surgical risk if procedure planned" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "primaryDiagnosis", label: "Primary Diagnosis", type: "text", required: true, placeholder: "e.g. GERD, IBS-D, Ulcerative colitis, Cholelithiasis, Cirrhosis decompensated" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        {
          key: "diagnoses", label: "Additional Diagnoses", type: "repeating", fields: [
            { key: "code", label: "ICD Code", type: "text" },
            { key: "label", label: "Diagnosis", type: "text" },
            { key: "type", label: "Type", type: "select", options: [{ label: "Secondary", value: "Secondary" }, { label: "Complication", value: "Complication" }, { label: "Differential", value: "Differential" }] },
          ],
        },
        { key: "endoscopyHistory", label: "Recent Endoscopy / Colonoscopy Findings", type: "textarea", rows: 2, placeholder: "Date, findings, biopsy results" },
        { key: "clinicalSummary", label: "Clinical Summary", type: "textarea", rows: 3, placeholder: "Brief synthesis of GI history, exam findings, and investigations" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Plan", type: "textarea", required: true, rows: 3, placeholder: "PPIs, prokinetics, antiemetics, antidiarrheals, immunosuppression (IBD), lactulose/rifaximin (hepatic encephalopathy), antibiotics, lifestyle modification" },
        {
          key: "investigations", label: "Investigations", type: "repeating", fields: [
            { key: "test", label: "Test", type: "text", placeholder: "e.g. upper GI endoscopy, colonoscopy, USG abdomen, MRCP, LFT, lipase, stool studies, H. pylori" },
            { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        {
          key: "medications", label: "Medications", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "frequency", label: "Frequency", type: "select", options: [{ label: "OD", value: "OD" }, { label: "BD", value: "BD" }, { label: "TDS", value: "TDS" }, { label: "QID", value: "QID" }, { label: "HS", value: "HS" }, { label: "PRN", value: "PRN" }] },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "dietaryAdvice", label: "Dietary Advice", type: "textarea", rows: 2, placeholder: "Diet modifications, trigger avoidance, fiber adjustment, FODMAP, lactose-free" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 2, placeholder: "e.g. GI surgery, hepatology, nutritionist, IBD nurse specialist" },
        { key: "patientEducation", label: "Patient Education", type: "textarea", rows: 2, placeholder: "Warning signs (GI bleed — melena/hematemesis), medication compliance, dietary triggers" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks / 1 month / for endoscopy results" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive outpatient consultation note for Gastroenterology with detailed abdominal exam and endoscopy history",
    specialties: ["Gastroenterology"],
    status: "active",
  },
};


export const GI_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "gi-followup",
  name: "Gastroenterology Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History", type: "textarea", required: true, rows: 3, placeholder: "Symptom changes — pain, bowel habits, GI bleeding, nausea, medication tolerance, appetite, weight" },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Side Effects", type: "textarea", rows: 1, placeholder: "PPI side effects, immunosuppressant toxicity, antibiotic intolerance" },
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
        { key: "abdomen", label: "Abdominal Exam", type: "textarea", rows: 1, placeholder: "Tenderness, distension, organomegaly, bowel sounds" },
        { key: "latestResults", label: "Latest Investigation Results", type: "textarea", rows: 2, placeholder: "Endoscopy findings, LFT, lipase, stool studies, histopathology" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 3, placeholder: "Disease control status, treatment response, concerns" },
        { key: "diseaseActivity", label: "Disease Activity", type: "select", options: [{ label: "Remission", value: "Remission" }, { label: "Mild active", value: "Mild" }, { label: "Moderate active", value: "Moderate" }, { label: "Severe active / Flare", value: "Severe" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "medicationChanges", label: "Medication Changes", type: "textarea", rows: 2, placeholder: "Dose changes, step-up/step-down therapy, new prescriptions" },
        { key: "investigations", label: "Investigations Due", type: "textarea", rows: 1, placeholder: "Surveillance endoscopy, imaging, labs" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 1 month / 3 months / 6 months" },
        { key: "patientInstructions", label: "Patient Instructions", type: "textarea", rows: 2, placeholder: "Diet, red flag symptoms, medication adjustments" },
      ],
    },
  ],
  metadata: {
    description: "Structured follow-up note for Gastroenterology patients with disease activity tracking",
    specialties: ["Gastroenterology"],
    status: "active",
  },
};


export const GI_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "gi-admission",
  name: "Gastroenterology IPD Admission",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "presentingComplaint",
      label: "Presenting Complaint",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Acute epigastric pain with hematemesis, acute abdomen" },
        { key: "duration", label: "Duration", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", required: true, rows: 4, placeholder: "Detailed narrative — pain character, GI bleeding (melena/hematemesis/hematochezia), vomiting, jaundice, distension, fever, weight loss" },
      ],
    },
    {
      key: "pastHistory",
      label: "Background",
      fields: [
        { key: "pmh", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "PUD, GERD, IBD, cirrhosis, pancreatitis, GI surgery" },
        { key: "medications", label: "Home Medications", type: "textarea", rows: 2, placeholder: "Anticoagulants, antiplatelets, NSAIDs, PPI, immunosuppressants" },
        { key: "alcohol", label: "Alcohol History", type: "text", placeholder: "e.g. Heavy daily use, last drink" },
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
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Icterus, pallor, distension, cachexia, ascites, encephalopathy (asterixis)" },
        { key: "abdomen", label: "Abdominal Exam", type: "textarea", required: true, rows: 2, placeholder: "Inspection, palpation (tenderness/guarding/ rigidity), percussion, auscultation, DRE findings" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "diagnosis", label: "Diagnosis at Admission", type: "textarea", required: true, rows: 2 },
        { key: "severity", label: "Severity", type: "select", options: [{ label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }, { label: "Critical", value: "Critical" }] },
        {
          key: "admissionOrders", label: "Admission Orders", type: "repeating", fields: [
            { key: "order", label: "Order", type: "text", placeholder: "e.g. CBC, LFT, lipase, coagulation profile, cross-match, USG, endoscopy" },
            { key: "priority", label: "Priority", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }, { label: "STAT", value: "STAT" }] },
          ],
        },
        { key: "treatmentPlan", label: "Treatment Plan", type: "textarea", rows: 4, placeholder: "NPO, IV fluids, PPI infusion, antibiotics, octreotide (variceal bleed), lactulose (HE), blood transfusion, urgent endoscopy / surgery consult" },
        { key: "consults", label: "Consults", type: "textarea", rows: 1, placeholder: "e.g. GI surgery, interventional radiology, nutrition, hepatology" },
      ],
    },
  ],
  metadata: {
    description: "Structured inpatient admission note for Gastroenterology — GI bleed, acute abdomen, pancreatitis, cirrhosis decompensation",
    specialties: ["Gastroenterology"],
    status: "active",
  },
};


export const GI_PROGRESS_TEMPLATE: TemplateDefinition = {
  id: "gi-progress",
  name: "Gastroenterology Daily Progress",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjectiveUpdate",
      label: "Subjective Update",
      fields: [
        { key: "symptomUpdate", label: "Symptom Update", type: "textarea", required: true, rows: 2, placeholder: "Pain, vomiting, GI bleeding, bowel movements, diet tolerance, distension" },
        { key: "eventsOvernight", label: "Events Overnight", type: "textarea", rows: 1, placeholder: "NG output, stool frequency, bleeding, vomiting, abdominal distension" },
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
            { key: "spo2", label: "SpO₂", type: "number", min: 0, max: 100 },
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
          ],
        },
        { key: "abdomen", label: "Abdominal Exam", type: "textarea", rows: 2, placeholder: "Tenderness, distension, bowel sounds, NG output, stoma output (if applicable)" },
        { key: "labs", label: "Key Labs Today", type: "text", placeholder: "e.g. Hb 9.5 → 10.2, LFT improving, lipase trending down" },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "assessment", label: "Assessment", type: "textarea", required: true, rows: 3, placeholder: "Clinical trajectory, response to treatment, concerns" },
        { key: "planNext", label: "Plan for Next Shift", type: "textarea", rows: 2, placeholder: "Diet advancement, medication adjustments, endoscopy timing, discharge planning" },
        { key: "dischargeReadiness", label: "Discharge Readiness", type: "select", options: [{ label: "Not ready", value: "No" }, { label: "Planning", value: "Planning" }, { label: "Ready today", value: "Ready" }] },
      ],
    },
  ],
  metadata: {
    description: "Daily progress note for Gastroenterology inpatients with abdominal assessment and diet advancement tracking",
    specialties: ["Gastroenterology"],
    status: "active",
  },
};


export const GI_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "gi-procedure",
  name: "GI Endoscopy / Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preProcedure",
      label: "Pre-Procedure",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "text", required: true, placeholder: "e.g. Upper GI endoscopy (EGD), Colonoscopy, ERCP, EUS, PEG insertion, Polypectomy" },
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "preOpPrep", label: "Pre-Procedure Preparation", type: "textarea", rows: 2, placeholder: "Bowel prep (if colonoscopy), NPO status, anticoagulant hold, antibiotic prophylaxis" },
        { key: "sedationPlan", label: "Sedation Plan", type: "text", placeholder: "e.g. Moderate sedation with midazolam + fentanyl / Propofol / GA" },
      ],
    },
    {
      key: "intraProcedure",
      label: "Intra-Procedure",
      fields: [
        { key: "dateTime", label: "Date & Time", type: "text" },
        { key: "location", label: "Location", type: "text", placeholder: "e.g. Endoscopy suite, OT" },
        { key: "endoscopist", label: "Endoscopist / Surgeon", type: "text" },
        { key: "sedationGiven", label: "Sedation Given", type: "text", placeholder: "e.g. Midazolam 2mg + Fentanyl 50mcg IV" },
        { key: "findings", label: "Findings", type: "textarea", required: true, rows: 4, placeholder: "Detailed endoscopic findings — esophagus (mucosa, varices, strictures), stomach (ulcers, gastritis, polyps), duodenum, colon (diverticulosis, polyps, inflammation, masses), ileum" },
        { key: "interventions", label: "Interventions Performed", type: "textarea", rows: 2, placeholder: "Biopsy, polypectomy, hemostasis (clips/APC/BICAP), variceal band ligation, dilation, stent placement, ERCP with sphincterotomy / stone extraction" },
        { key: "specimens", label: "Specimens Taken", type: "text", placeholder: "e.g. Gastric biopsy ×4, polyp ×2" },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Perforation, bleeding, reaction to sedation, hypoxia, arrhythmia" },
      ],
    },
    {
      key: "postProcedure",
      label: "Post-Procedure",
      fields: [
        { key: "recovery", label: "Recovery Status", type: "textarea", rows: 1, placeholder: "Sedation recovery, vitals, pain, tolerance of PO" },
        { key: "postOpOrders", label: "Post-Procedure Orders", type: "textarea", rows: 2, placeholder: "Diet advancement, analgesia, antiemetics, antibiotics (if perforation risk)" },
        { key: "disposition", label: "Disposition", type: "select", options: [{ label: "Discharged home", value: "Home" }, { label: "Ward observation", value: "Ward" }, { label: "Admitted", value: "Admitted" }] },
        { key: "histopathologyFollowUp", label: "Histopathology Follow-up", type: "text", placeholder: "e.g. Results in 5-7 days, patient to follow up for results" },
        { key: "followUpPlan", label: "Follow-up Plan", type: "textarea", rows: 1, placeholder: "Surveillance interval, repeat procedure, medication changes" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive procedure note for GI endoscopy — EGD, colonoscopy, ERCP, EUS, polypectomy, hemostasis procedures",
    specialties: ["Gastroenterology"],
    status: "active",
  },
};
