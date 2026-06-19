import type { TemplateDefinition } from "../templateSchema";

export const OBG_ANC_REGISTRATION_TEMPLATE: TemplateDefinition = {
  id: "obg-anc-registration",
  name: "ANC Registration",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", rows: 2, placeholder: "e.g. First antenatal visit for pregnancy confirmation / dating" },
        { key: "menstrualHistory", label: "Menstrual History", type: "section", fields: [
          { key: "lmp", label: "LMP (First day of last period)", type: "date", required: true },
          { key: "edd", label: "EDD (auto-calculated)", type: "date", readOnly: true },
          { key: "cycleRegularity", label: "Cycle Regularity", type: "select", required: true, options: [{ label: "Regular", value: "Regular" }, { label: "Irregular", value: "Irregular" }] },
          { key: "cycleLength", label: "Cycle Length (days)", type: "number", min: 21, max: 45, placeholder: "Default 28" },
        ] },
        { key: "obstetricHistory", label: "Obstetric History", type: "section", fields: [
          { key: "gravida", label: "Gravida (total pregnancies)", type: "number", required: true, min: 1, max: 20 },
          { key: "para", label: "Para (deliveries >20wk)", type: "number", required: true, min: 0, max: 15 },
          { key: "abortion", label: "Abortion (spontaneous + induced)", type: "number", required: true, min: 0, max: 15 },
          { key: "living", label: "Living children", type: "number", required: true, min: 0, max: 15 },
          { key: "ectopic", label: "Ectopic", type: "number", min: 0, max: 5 },
          { key: "previousDeliveries", label: "Previous Delivery Details", type: "repeating", fields: [
            { key: "year", label: "Year", type: "text", placeholder: "e.g. 2023" },
            { key: "type", label: "Type", type: "select", options: [{ label: "NVD", value: "NVD" }, { label: "LSCS", value: "LSCS" }, { label: "Forceps", value: "Forceps" }, { label: "Vacuum", value: "Vacuum" }] },
            { key: "place", label: "Place", type: "text" },
            { key: "birthWeight", label: "Birth Weight (kg)", type: "number", min: 0.5, max: 6 },
            { key: "complications", label: "Complications", type: "text" },
          ] },
        ] },
        { key: "currentPregnancy", label: "Current Pregnancy", type: "section", fields: [
          { key: "gestationalAge", label: "Gestational Age (weeks+days)", type: "text", placeholder: "Auto-calculated from LMP" },
          { key: "highRiskFactors", label: "High-Risk Factors", type: "multiselect", options: [
            { label: "Age < 18 or > 35", value: "AgeExtremes" },
            { label: "Grand multipara (≥5)", value: "GrandMultipara" },
            { label: "Previous LSCS", value: "PrevLSCS" },
            { label: "Previous stillbirth / NND", value: "PrevStillbirth" },
            { label: "Previous preterm", value: "PrevPreterm" },
            { label: "Previous low birth weight", value: "PrevLBW" },
            { label: "Rh negative", value: "RhNegative" },
            { label: "Multiple gestation", value: "MultipleGestation" },
            { label: "Pre-existing diabetes", value: "PreDM" },
            { label: "Pre-existing hypertension", value: "PreHTN" },
            { label: "Thyroid disorder", value: "Thyroid" },
            { label: "Cardiac disease", value: "Cardiac" },
            { label: "Renal disease", value: "Renal" },
            { label: "Anemia (Hb < 7)", value: "Anemia" },
            { label: "BMI > 30 or < 18", value: "AbnormalBMI" },
            { label: "Bad obstetric history", value: "BOH" },
            { label: "Consanguineous marriage", value: "Consanguineous" },
          ] },
          { key: "bookingWeight", label: "Booking Weight (kg)", type: "number", required: true, min: 30, max: 150 },
          { key: "bookingBP", label: "Booking BP (mmHg)", type: "text", required: true, placeholder: "e.g. 110/70" },
          { key: "bookingHb", label: "Booking Hemoglobin (g/dL)", type: "number", required: true, min: 5, max: 20 },
        ] },
        { key: "medicalHistory", label: "Medical History", type: "section", fields: [
          { key: "knownConditions", label: "Known Medical Conditions", type: "multiselect", options: [
            { label: "Diabetes", value: "DM" }, { label: "Hypertension", value: "HTN" },
            { label: "Thyroid disorder", value: "Thyroid" }, { label: "Cardiac disease", value: "Cardiac" },
            { label: "Renal disease", value: "Renal" }, { label: "Epilepsy", value: "Epilepsy" },
            { label: "Asthma", value: "Asthma" }, { label: "TB", value: "TB" },
          ] },
          { key: "surgicalHistory", label: "Surgical History", type: "textarea", rows: 2 },
          { key: "drugAllergies", label: "Drug Allergies", type: "textarea", rows: 1 },
          { key: "currentMedications", label: "Current Medications", type: "textarea", rows: 2 },
        ] },
        { key: "familySocial", label: "Family & Social History", type: "section", fields: [
          { key: "familyHistory", label: "Family History", type: "textarea", rows: 2, placeholder: "Twins, congenital anomalies, DM, HTN, genetic disorders" },
          { key: "occupation", label: "Occupation", type: "text" },
          { key: "habits", label: "Smoking / Alcohol / Substance", type: "select", options: [{ label: "None", value: "None" }, { label: "Smoking", value: "Smoking" }, { label: "Alcohol", value: "Alcohol" }, { label: "Substance use", value: "Substance" }] },
        ] },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 40, max: 200 },
          { key: "weight", label: "Weight (kg)", type: "number", min: 30, max: 150 },
          { key: "height", label: "Height (cm)", type: "number", min: 100, max: 220 },
          { key: "bmi", label: "BMI (auto)", type: "number", readOnly: true },
        ] },
        { key: "generalExam", label: "General Examination", type: "textarea", rows: 2, placeholder: "Pallor, icterus, edema, thyroid, breast" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "riskAssessment", label: "Risk Assessment", type: "select", options: [{ label: "Low Risk", value: "Low" }, { label: "High Risk", value: "High" }] },
        { key: "diagnosis", label: "Diagnosis", type: "text", placeholder: "e.g. O80 — Normal pregnancy, first trimester" },
        { key: "icdCode", label: "ICD-10 Code", type: "text", placeholder: "e.g. Z34.0" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "investigations", label: "Investigations Ordered", type: "repeating", fields: [
          { key: "test", label: "Test", type: "text", placeholder: "e.g. Hb, Blood group, VDRL, HIV, HBsAg, Urine, RBS, TSH" },
          { key: "urgency", label: "Urgency", type: "select", options: [{ label: "Routine", value: "Routine" }, { label: "Urgent", value: "Urgent" }] },
        ] },
        { key: "usgDating", label: "USG Dating Scan Referred", type: "boolean" },
        { key: "supplements", label: "Supplements Prescribed", type: "textarea", rows: 2, placeholder: "Iron + folic acid, Calcium, Vitamin D" },
        { key: "patientAdvice", label: "Advice Given", type: "textarea", rows: 2, placeholder: "Diet, hygiene, warning signs, immunization, breastfeeding" },
        { key: "nextVisit", label: "Next ANC Visit Date", type: "date" },
        { key: "referral", label: "Referral (if high-risk)", type: "text", placeholder: "Fetal medicine / MFM specialist" },
      ],
    },
  ],
  metadata: {
    description: "First antenatal registration with comprehensive menstrual, obstetric, medical history and high-risk screening",
    specialties: ["OBG"],
    status: "active",
  },
};


export const OBG_ANC_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "obg-anc-followup",
  name: "ANC Follow-up Visit",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "visitNumber", label: "Visit Number", type: "number", required: true, min: 2, placeholder: "Auto (2, 3, 4...)" },
        { key: "gestationalAge", label: "Gestational Age (weeks+days)", type: "text", placeholder: "From LMP" },
        { key: "weeksSinceLast", label: "Weeks Since Last Visit", type: "number", readOnly: true },
        { key: "intervalHistory", label: "Interval History", type: "textarea", rows: 3, placeholder: "New complaints, fetal movements, contractions, bleeding, leaking, headache, visual disturbances..." },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "weight", label: "Weight (kg)", type: "number", min: 30, max: 150 },
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 40, max: 200 },
          { key: "urineAlbumin", label: "Urine Albumin", type: "select", options: [{ label: "Nil", value: "Nil" }, { label: "Trace", value: "Trace" }, { label: "+", value: "+" }, { label: "++", value: "++" }, { label: "+++", value: "+++" }] },
          { key: "urineSugar", label: "Urine Sugar", type: "select", options: [{ label: "Nil", value: "Nil" }, { label: "Trace", value: "Trace" }, { label: "+", value: "+" }, { label: "++", value: "++" }, { label: "+++", value: "+++" }] },
        ] },
        { key: "obstetricExam", label: "Obstetric Examination", type: "section", fields: [
          { key: "fundalHeight", label: "Fundal Height (weeks)", type: "number", min: 12, max: 42 },
          { key: "presentation", label: "Presentation", type: "select", options: [{ label: "Cephalic", value: "Cephalic" }, { label: "Breech", value: "Breech" }, { label: "Transverse", value: "Transverse" }, { label: "Unstable lie", value: "Unstable" }] },
          { key: "lie", label: "Lie", type: "select", options: [{ label: "Longitudinal", value: "Longitudinal" }, { label: "Oblique", value: "Oblique" }, { label: "Transverse", value: "Transverse" }] },
          { key: "engagement", label: "Engagement", type: "select", options: [{ label: "Not engaged", value: "Not engaged" }, { label: "1/5", value: "1/5" }, { label: "2/5", value: "2/5" }, { label: "3/5", value: "3/5" }, { label: "4/5", value: "4/5" }, { label: "5/5", value: "5/5" }] },
          { key: "fetalHeartRate", label: "Fetal Heart Rate (bpm)", type: "number", min: 100, max: 200, placeholder: "Normal 120-160" },
          { key: "fetalMovements", label: "Fetal Movements", type: "select", options: [{ label: "Present", value: "Present" }, { label: "Absent", value: "Absent" }, { label: "Reduced", value: "Reduced" }] },
          { key: "liquor", label: "Liquor", type: "select", options: [{ label: "Adequate", value: "Adequate" }, { label: "Reduced", value: "Reduced" }, { label: "Increased", value: "Increased" }] },
          { key: "edema", label: "Edema", type: "select", options: [{ label: "Nil", value: "Nil" }, { label: "Pedal", value: "Pedal" }, { label: "Generalized", value: "Generalized" }] },
        ] },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "riskStatus", label: "Risk Status", type: "select", options: [{ label: "Low", value: "Low" }, { label: "High", value: "High" }] },
        { key: "complications", label: "Complications Noted", type: "multiselect", options: [
          { label: "PIH", value: "PIH" }, { label: "GDM", value: "GDM" },
          { label: "IUGR", value: "IUGR" }, { label: "Preterm labor", value: "Preterm" },
          { label: "Anemia", value: "Anemia" }, { label: "Oligohydramnios", value: "Oligo" },
          { label: "Polyhydramnios", value: "Poly" }, { label: "APH", value: "APH" },
        ] },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "advice", label: "Advice", type: "textarea", rows: 2, placeholder: "Diet, iron/calcium, rest, warning signs" },
        { key: "investigations", label: "Investigations Ordered", type: "textarea", rows: 2, placeholder: "Hb, OGTT, growth scan, NST, etc." },
        { key: "nextVisitDate", label: "Next Visit Date", type: "date" },
        { key: "referral", label: "Referral", type: "text", placeholder: "Fetal medicine / high-risk clinic if indicated" },
      ],
    },
  ],
  metadata: {
    description: "Routine antenatal follow-up visit with obstetric examination, risk assessment, and visit scheduling",
    specialties: ["OBG"],
    status: "active",
  },
};


export const OBG_LABOR_ADMISSION_TEMPLATE: TemplateDefinition = {
  id: "obg-labor-admission",
  name: "Labor Admission Note",
  type: "Admission",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "admissionDetails",
      label: "Admission Details",
      fields: [
        { key: "admissionDateTime", label: "Date & Time of Admission", type: "date", required: true },
        { key: "referredFrom", label: "Referred From", type: "text", placeholder: "Home, OPD, other hospital..." },
        { key: "modeOfTransport", label: "Mode of Transport", type: "select", options: [{ label: "Self / Private", value: "Self" }, { label: "Ambulance", value: "Ambulance" }, { label: "Referred from other facility", value: "Referral" }] },
      ],
    },
    {
      key: "clinicalHistory",
      label: "Clinical History",
      fields: [
        { key: "chiefComplaints", label: "Chief Complaints", type: "textarea", required: true, rows: 3, placeholder: "Labor pains, leaking PV, bleeding PV, reduced fetal movements, etc." },
        { key: "pregnancySummary", label: "Current Pregnancy Summary", type: "section", fields: [
          { key: "gravida", label: "Gravida / Para / Abortion / Living", type: "text", required: true, placeholder: "e.g. G2P1L1A0" },
          { key: "edd", label: "EDD", type: "date" },
          { key: "gestationalAge", label: "Gestational Age (weeks)", type: "number", min: 24, max: 44, required: true },
          { key: "highRisk", label: "High-Risk Pregnancy", type: "boolean" },
        ] },
      ],
    },
    {
      key: "examination",
      label: "Examination",
      fields: [
        { key: "generalExam", label: "General Examination", type: "section", fields: [
          { key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number", min: 40, max: 200 },
            { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
            { key: "spo2", label: "SpO₂ (%)", type: "number", min: 50, max: 100 },
          ] },
          { key: "pallor", label: "Pallor", type: "boolean" },
          { key: "edema", label: "Edema", type: "select", options: [{ label: "Nil", value: "Nil" }, { label: "Pedal", value: "Pedal" }, { label: "Generalized", value: "Generalized" }] },
          { key: "built", label: "Built & Nourishment", type: "select", options: [{ label: "Well built", value: "Well" }, { label: "Moderate", value: "Moderate" }, { label: "Poorly built", value: "Poor" }] },
        ] },
        { key: "abdominalExam", label: "Abdominal Examination", type: "section", fields: [
          { key: "fundalHeight", label: "Fundal Height (weeks)", type: "number", min: 24, max: 44 },
          { key: "lie", label: "Lie", type: "select", options: [{ label: "Longitudinal", value: "Longitudinal" }, { label: "Oblique", value: "Oblique" }, { label: "Transverse", value: "Transverse" }] },
          { key: "presentation", label: "Presentation", type: "select", options: [{ label: "Cephalic", value: "Cephalic" }, { label: "Breech", value: "Breech" }, { label: "Transverse", value: "Transverse" }] },
          { key: "engagement", label: "Engagement", type: "select", options: [{ label: "Not engaged", value: "Not engaged" }, { label: "1/5", value: "1/5" }, { label: "2/5", value: "2/5" }, { label: "3/5", value: "3/5" }, { label: "4/5", value: "4/5" }, { label: "5/5", value: "5/5" }] },
          { key: "contractionsFrequency", label: "Contractions — Frequency (/10 min)", type: "number", min: 0, max: 10 },
          { key: "contractionsDuration", label: "Contractions — Duration (sec)", type: "number", min: 0, max: 120 },
          { key: "fetalHeartRate", label: "Fetal Heart Rate (bpm)", type: "number", min: 80, max: 200 },
        ] },
        { key: "pvExam", label: "Per Vaginal Examination", type: "section", fields: [
          { key: "cervicalDilatation", label: "Cervical Dilatation (cm)", type: "number", min: 0, max: 10 },
          { key: "effacement", label: "Effacement (%)", type: "number", min: 0, max: 100 },
          { key: "station", label: "Station", type: "text", placeholder: "e.g. -3, -2, -1, 0, +1" },
          { key: "membranes", label: "Membranes", type: "select", options: [{ label: "Intact", value: "Intact" }, { label: "Ruptured", value: "Ruptured" }] },
          { key: "liquorColor", label: "Liquor Color", type: "select", options: [{ label: "Clear", value: "Clear" }, { label: "Meconium-stained", value: "Meconium" }, { label: "Blood-stained", value: "Blood" }] },
          { key: "presentingPart", label: "Presenting Part", type: "select", options: [{ label: "Vertex", value: "Vertex" }, { label: "Breech", value: "Breech" }, { label: "Face", value: "Face" }, { label: "Brow", value: "Brow" }, { label: "Cord", value: "Cord" }] },
        ] },
        { key: "bishopScore", label: "Bishop Score (calculated)", type: "section", fields: [
          { key: "dilatationScore", label: "Dilatation (0-3)", type: "number", min: 0, max: 3 },
          { key: "effacementScore", label: "Effacement (0-3)", type: "number", min: 0, max: 3 },
          { key: "consistencyScore", label: "Consistency (0-2)", type: "number", min: 0, max: 2 },
          { key: "positionScore", label: "Position (0-2)", type: "number", min: 0, max: 2 },
          { key: "stationScore", label: "Station (0-3)", type: "number", min: 0, max: 3 },
          { key: "totalBishopScore", label: "Total Bishop Score", type: "number", readOnly: true },
        ] },
      ],
    },
    {
      key: "assessmentPlan",
      label: "Assessment & Plan",
      fields: [
        { key: "stageOfLabor", label: "Stage of Labor", type: "select", options: [{ label: "Latent (0-3 cm)", value: "Latent" }, { label: "Active (4-7 cm)", value: "Active" }, { label: "Transition (8-10 cm)", value: "Transition" }, { label: "Not in labor", value: "NotInLabor" }] },
        { key: "riskCategorization", label: "Risk Categorization", type: "select", options: [{ label: "Low risk", value: "Low" }, { label: "High risk", value: "High" }] },
        { key: "initialPlan", label: "Plan", type: "textarea", required: true, rows: 3, placeholder: "Admit for delivery, start partograph, IV access, FHR monitoring, inform pediatrician, prepare for LSCS if indicated..." },
      ],
    },
  ],
  metadata: {
    description: "Structured admission note for labor ward with full obstetric examination, Bishop scoring, and delivery planning",
    specialties: ["OBG"],
    status: "active",
  },
};


export const OBG_DELIVERY_TEMPLATE: TemplateDefinition = {
  id: "obg-delivery",
  name: "Delivery Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "deliveryHeader",
      label: "Delivery Details",
      fields: [
        { key: "date", label: "Date of Delivery", type: "date", required: true },
        { key: "time", label: "Time of Delivery", type: "time", required: true },
        { key: "place", label: "Place", type: "select", options: [{ label: "Labor Room", value: "LaborRoom" }, { label: "OT", value: "OT" }] },
        { key: "conductedBy", label: "Conducted By", type: "text", required: true },
        { key: "assistedBy", label: "Assisted By", type: "text" },
      ],
    },
    {
      key: "modeOfDelivery",
      label: "Mode of Delivery",
      fields: [
        { key: "mode", label: "Mode", type: "select", required: true, options: [{ label: "Normal Vaginal Delivery (NVD)", value: "NVD" }, { label: "Forceps-assisted", value: "Forceps" }, { label: "Vacuum-assisted", value: "Vacuum" }, { label: "LSCS", value: "LSCS" }] },
        { key: "lscsIndication", label: "If LSCS — Indication", type: "textarea", rows: 2, showIf: { field: "modeOfDelivery.mode", operator: "equals", value: "LSCS" } },
        { key: "lscsType", label: "If LSCS — Type", type: "select", options: [{ label: "Elective", value: "Elective" }, { label: "Emergency", value: "Emergency" }], showIf: { field: "modeOfDelivery.mode", operator: "equals", value: "LSCS" } },
      ],
    },
    {
      key: "babyDetails",
      label: "Baby Details",
      fields: [
        { key: "sex", label: "Sex", type: "select", required: true, options: [{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }] },
        { key: "birthWeight", label: "Birth Weight (kg)", type: "number", required: true, min: 0.3, max: 6 },
        { key: "apgar1", label: "APGAR 1 min", type: "number", min: 0, max: 10, required: true },
        { key: "apgar5", label: "APGAR 5 min", type: "number", min: 0, max: 10, required: true },
        { key: "apgar10", label: "APGAR 10 min (if <7 at 5 min)", type: "number", min: 0, max: 10 },
        { key: "resuscitation", label: "Resuscitation Needed", type: "select", options: [{ label: "None", value: "None" }, { label: "Oxygen only", value: "O2" }, { label: "PPV", value: "PPV" }, { label: "Intubation", value: "Intubation" }, { label: "Chest compressions", value: "Compressions" }, { label: "Medications", value: "Medications" }] },
        { key: "cryAtBirth", label: "Cry at Birth", type: "select", options: [{ label: "Immediate", value: "Immediate" }, { label: "Delayed", value: "Delayed" }, { label: "Absent", value: "Absent" }] },
        { key: "congenitalAnomalies", label: "Congenital Anomalies", type: "textarea", rows: 2, placeholder: "None detected / describe..." },
      ],
    },
    {
      key: "placentaThirdStage",
      label: "Placenta & Third Stage",
      fields: [
        { key: "placentaDelivery", label: "Placenta Delivery", type: "select", options: [{ label: "Spontaneous", value: "Spontaneous" }, { label: "Manual removal", value: "Manual" }] },
        { key: "placentaComplete", label: "Placenta Complete", type: "boolean" },
        { key: "placentaWeight", label: "Placenta Weight (g)", type: "number", min: 200, max: 1000 },
        { key: "bloodLoss", label: "Estimated Blood Loss (mL)", type: "number", min: 50, max: 3000 },
        { key: "oxytocinGiven", label: "Oxytocin Given", type: "boolean" },
        { key: "cordClampingTime", label: "Cord Clamping", type: "select", options: [{ label: "Immediate (<1 min)", value: "Immediate" }, { label: "Delayed (≥1 min)", value: "Delayed" }] },
      ],
    },
    {
      key: "perineum",
      label: "Perineum",
      fields: [
        { key: "perineumStatus", label: "Perineum", type: "select", options: [{ label: "Intact", value: "Intact" }, { label: "Episiotomy", value: "Episiotomy" }, { label: "Tear", value: "Tear" }] },
        { key: "episiotomyType", label: "Episiotomy Type", type: "select", options: [{ label: "Mediolateral R", value: "MLR" }, { label: "Mediolateral L", value: "MLL" }, { label: "Midline", value: "Midline" }], showIf: { field: "perineum.perineumStatus", operator: "equals", value: "Episiotomy" } },
        { key: "tearDegree", label: "Tear Degree", type: "select", options: [{ label: "1st degree", value: "1" }, { label: "2nd degree", value: "2" }, { label: "3rd degree", value: "3" }, { label: "4th degree", value: "4" }], showIf: { field: "perineum.perineumStatus", operator: "equals", value: "Tear" } },
        { key: "repairDone", label: "Repair Done", type: "boolean" },
      ],
    },
    {
      key: "maternalNewborn",
      label: "Maternal & Newborn Disposition",
      fields: [
        { key: "maternalCondition", label: "Maternal Condition Post-delivery", type: "textarea", rows: 2, placeholder: "Vitals stable, uterus contracted, bladder emptied" },
        { key: "babyDisposition", label: "Baby Handed To", type: "select", options: [{ label: "Mother", value: "Mother" }, { label: "Shifted to NICU", value: "NICU" }, { label: "Shifted to nursery", value: "Nursery" }] },
        { key: "breastfeedingInitiated", label: "Breastfeeding Initiated", type: "boolean" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive post-delivery documentation with mode, baby details, APGAR, placenta, perineum, and newborn disposition",
    specialties: ["OBG"],
    status: "active",
  },
};


export const OBG_LSCS_TEMPLATE: TemplateDefinition = {
  id: "obg-lscs",
  name: "LSCS (Cesarean Section) OT Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "preOp",
      label: "Pre-operative",
      fields: [
        { key: "indication", label: "Indication for LSCS", type: "textarea", required: true, rows: 2, placeholder: "e.g. CPD, fetal distress, failed induction, previous 2 LSCS, breech, placenta previa..." },
        { key: "consentObtained", label: "Consent Obtained", type: "boolean", required: true },
        { key: "pacClearance", label: "PAC Clearance Obtained", type: "boolean" },
        { key: "preOpHb", label: "Pre-op Hb (g/dL)", type: "number", min: 5, max: 20 },
        { key: "bloodCrossMatch", label: "Blood Cross-match Done", type: "boolean" },
      ],
    },
    {
      key: "anesthesia",
      label: "Anesthesia",
      fields: [
        { key: "type", label: "Type", type: "select", required: true, options: [{ label: "Spinal", value: "Spinal" }, { label: "Epidural", value: "Epidural" }, { label: "General Anesthesia", value: "GA" }, { label: "Combined Spinal-Epidural", value: "CSE" }] },
        { key: "anesthetist", label: "Anesthetist Name", type: "text", required: true },
      ],
    },
    {
      key: "surgicalDetails",
      label: "Surgical Details",
      fields: [
        { key: "skinIncision", label: "Skin Incision", type: "select", options: [{ label: "Pfannenstiel", value: "Pfannenstiel" }, { label: "Midline", value: "Midline" }, { label: "Joel-Cohen", value: "JoelCohen" }] },
        { key: "uterineIncision", label: "Uterine Incision", type: "select", options: [{ label: "Lower segment transverse", value: "LSCS" }, { label: "Classical (upper segment)", value: "Classical" }] },
        { key: "findings", label: "Findings", type: "textarea", rows: 3, placeholder: "Adhesions, fibroid, uterine anomaly, ovarian cyst, etc." },
        { key: "incisionToDelivery", label: "Incision-to-Delivery Time (min)", type: "number", placeholder: "e.g. 3" },
        { key: "placenta", label: "Placenta", type: "select", options: [{ label: "Spontaneous delivery", value: "Spontaneous" }, { label: "Manual removal", value: "Manual" }] },
        { key: "tubes", label: "Tubes", type: "select", options: [{ label: "Visualized — normal", value: "Normal" }, { label: "Ligation done (if requested)", value: "Ligation" }, { label: "Not visualized", value: "NotVisualized" }] },
        { key: "hemostasis", label: "Hemostasis Achieved", type: "boolean" },
        { key: "closureLayers", label: "Closure — Layers", type: "textarea", rows: 2, placeholder: "Uterus (double layer), peritoneum, fascia, subcutaneous, skin" },
        { key: "estimatedBloodLoss", label: "Estimated Blood Loss (mL)", type: "number", min: 100, max: 5000 },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "None / Atony PPH, bladder injury, etc." },
      ],
    },
    {
      key: "postOpOrders",
      label: "Post-operative Orders",
      fields: [
        { key: "ivFluids", label: "IV Fluids", type: "textarea", rows: 1, placeholder: "RL / DNS as per weight" },
        { key: "antibiotics", label: "Antibiotics", type: "textarea", rows: 1, placeholder: "Cefuroxime 1.5g IV BD x 3 doses" },
        { key: "analgesics", label: "Analgesics", type: "textarea", rows: 1, placeholder: "Paracetamol 1g IV TDS, Diclofenac 75mg IM SOS" },
        { key: "dvtProphylaxis", label: "DVT Prophylaxis", type: "select", options: [{ label: "Not indicated", value: "No" }, { label: "Enoxaparin 40mg SC OD", value: "Enoxaparin" }, { label: "Mechanical (stockings)", value: "Mechanical" }] },
        { key: "catheter", label: "Catheter", type: "select", options: [{ label: "Remove after 12 hr", value: "12hr" }, { label: "Remove after 24 hr", value: "24hr" }] },
        { key: "diet", label: "Diet", type: "select", options: [{ label: "NPO x 6 hr then sips", value: "NPO" }, { label: "Liquid diet", value: "Liquid" }, { label: "Soft diet", value: "Soft" }] },
        { key: "woundCare", label: "Wound Care", type: "textarea", rows: 1, placeholder: "Dressing day 2, check for soakage" },
        { key: "ambulation", label: "Ambulation", type: "select", options: [{ label: "Encourage after 12 hr", value: "12hr" }, { label: "Bed rest x 24 hr", value: "BedRest" }] },
        { key: "breastfeeding", label: "Breastfeeding", type: "select", options: [{ label: "Initiate within 1 hr", value: "Early" }, { label: "Deferred (mother/baby condition)", value: "Deferred" }] },
      ],
    },
  ],
  metadata: {
    description: "Structured operative note for elective or emergency cesarean section with pre-op, anesthesia, surgical, and post-op details",
    specialties: ["OBG"],
    status: "active",
  },
};


export const OBG_POSTNATAL_TEMPLATE: TemplateDefinition = {
  id: "obg-postnatal",
  name: "Post-Natal (PNC) Note",
  type: "Progress",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "header",
      label: "Visit Info",
      fields: [
        { key: "date", label: "Date", type: "date", required: true },
        { key: "postnatalDay", label: "Post-natal Day", type: "number", required: true, min: 0, placeholder: "e.g. 1, 2, 3..." },
        { key: "deliveryDate", label: "Date of Delivery", type: "date", required: true },
      ],
    },
    {
      key: "motherAssessment",
      label: "Mother Assessment",
      fields: [
        { key: "generalCondition", label: "General Condition", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Fair", value: "Fair" }, { label: "Unwell", value: "Unwell" }] },
        { key: "vitals", label: "Vitals", type: "section", fields: [
          { key: "bp", label: "BP (mmHg)", type: "text" },
          { key: "pulse", label: "Pulse (bpm)", type: "number", min: 40, max: 200 },
          { key: "temp", label: "Temp (°C)", type: "number", min: 34, max: 42 },
        ] },
        { key: "pallor", label: "Pallor", type: "boolean" },
        { key: "breast", label: "Breasts", type: "select", options: [{ label: "Normal", value: "Normal" }, { label: "Engorged", value: "Engorged" }, { label: "Nipple fissure", value: "Fissure" }, { label: "Mastitis", value: "Mastitis" }] },
        { key: "abdomen", label: "Abdomen (uterine involution)", type: "textarea", rows: 1, placeholder: "Uterus ___ weeks size, well contracted / soft" },
        { key: "lochia", label: "Lochia", type: "select", options: [{ label: "Normal — rubra fading", value: "Normal" }, { label: "Excessive", value: "Excessive" }, { label: "Foul-smelling", value: "FoulSmelling" }, { label: "Clots", value: "Clots" }] },
        { key: "perineum", label: "Perineum / Wound", type: "select", options: [{ label: "Healing well", value: "Healing" }, { label: "Erythema / tenderness", value: "Inflammation" }, { label: "Discharge / gaping", value: "Infection" }] },
        { key: "voiding", label: "Voiding", type: "select", options: [{ label: "Normal", value: "Normal" }, { label: "Catheter in situ", value: "Catheter" }, { label: "Difficulty / retention", value: "Retention" }] },
        { key: "bowels", label: "Bowels opened", type: "boolean" },
        { key: "breastfeeding", label: "Breastfeeding", type: "select", options: [{ label: "Established — exclusive", value: "Exclusive" }, { label: "Partial — supplementing", value: "Partial" }, { label: "Not started / difficulty", value: "Difficulty" }, { label: "Not breastfeeding", value: "NotBF" }] },
      ],
    },
    {
      key: "babyAssessment",
      label: "Baby Assessment",
      fields: [
        { key: "babyWeight", label: "Weight (kg)", type: "number", min: 0.3, max: 6 },
        { key: "feeding", label: "Feeding", type: "select", options: [{ label: "Breast — effective", value: "Breast" }, { label: "Breast — difficulty", value: "BreastDiff" }, { label: "Formula", value: "Formula" }, { label: "IV fluids", value: "IV" }] },
        { key: "jaundice", label: "Jaundice (Kramer zone)", type: "select", options: [{ label: "None", value: "0" }, { label: "Zone 1 (face)", value: "1" }, { label: "Zone 2 (chest)", value: "2" }, { label: "Zone 3 (abdomen)", value: "3" }, { label: "Zone 4 (limbs)", value: "4" }, { label: "Zone 5 (palms/soles)", value: "5" }] },
        { key: "umbilicalStump", label: "Umbilical Stump", type: "select", options: [{ label: "Clean & dry", value: "Normal" }, { label: "Moist / redness", value: "Inflamed" }, { label: "Discharge", value: "Discharge" }] },
        { key: "passedUrine", label: "Passed Urine", type: "boolean" },
        { key: "passedMeconium", label: "Passed Meconium", type: "boolean" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "plan", label: "Plan for Mother", type: "textarea", rows: 2, placeholder: "Breastfeeding support, iron/calcium, hygiene, contraception counseling..." },
        { key: "babyPlan", label: "Plan for Baby", type: "textarea", rows: 2, placeholder: "Breastfeeding, vaccination due, follow-up weight check" },
        { key: "dischargeCriteria", label: "Discharge Criteria Met", type: "boolean" },
        { key: "followUpDate", label: "Follow-up Date (PNC visit)", type: "date" },
      ],
    },
  ],
  metadata: {
    description: "Post-natal ward round note for mother and baby assessment, breastfeeding support, and discharge planning",
    specialties: ["OBG"],
    status: "active",
  },
};


export const OBG_GYNEC_OPD_TEMPLATE: TemplateDefinition = {
  id: "obg-gynecology-opd",
  name: "Gynecology OPD Note",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "text", required: true, placeholder: "e.g. Menstrual irregularity, white discharge, pelvic pain, infertility, post-menopausal bleeding" },
        { key: "menstrualHistory", label: "Menstrual History", type: "section", fields: [
          { key: "lmp", label: "LMP", type: "date" },
          { key: "cycleLength", label: "Cycle Length (days)", type: "number", min: 15, max: 90 },
          { key: "duration", label: "Duration of flow (days)", type: "number", min: 1, max: 15 },
          { key: "flow", label: "Flow", type: "select", options: [{ label: "Scanty", value: "Scanty" }, { label: "Normal", value: "Normal" }, { label: "Heavy", value: "Heavy" }] },
          { key: "dysmenorrhea", label: "Dysmenorrhea", type: "select", options: [{ label: "None", value: "None" }, { label: "Mild", value: "Mild" }, { label: "Moderate", value: "Moderate" }, { label: "Severe", value: "Severe" }] },
          { key: "intermenstrualBleeding", label: "Intermenstrual Bleeding", type: "boolean" },
        ] },
        { key: "obstetricHistory", label: "Obstetric History", type: "textarea", rows: 1, placeholder: "G_P_A_L — e.g. G2P1L1A0" },
        { key: "sexualContraceptive", label: "Sexual & Contraceptive History", type: "section", fields: [
          { key: "sexuallyActive", label: "Sexually Active", type: "boolean" },
          { key: "contraception", label: "Contraception Used", type: "text", placeholder: "OCP, IUCD, condoms, none" },
          { key: "dyspareunia", label: "Dyspareunia", type: "select", options: [{ label: "None", value: "None" }, { label: "Superficial", value: "Superficial" }, { label: "Deep", value: "Deep" }] },
        ] },
        { key: "associatedSymptoms", label: "Associated Symptoms", type: "textarea", rows: 2, placeholder: "Pain, discharge, fever, urinary/bowel symptoms, weight change..." },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        { key: "generalExam", label: "General Examination", type: "section", fields: [
          { key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP (mmHg)", type: "text" },
            { key: "pulse", label: "Pulse (bpm)", type: "number" },
            { key: "weight", label: "Weight (kg)", type: "number" },
            { key: "bmi", label: "BMI", type: "number", readOnly: true },
          ] },
          { key: "thyroid", label: "Thyroid palpable", type: "boolean" },
          { key: "breastExam", label: "Breast Exam", type: "textarea", rows: 1, placeholder: "Normal, mass, discharge, tenderness" },
        ] },
        { key: "abdominalExam", label: "Abdominal Examination", type: "textarea", rows: 2, placeholder: "Tenderness, mass (size, site, mobility), organomegaly, ascites" },
        { key: "speculumExam", label: "Per Speculum Examination", type: "textarea", rows: 2, placeholder: "Cervix: healthy/erosion/growth/discharge. Vagina: walls, discharge" },
        { key: "pvExam", label: "Per Vaginal (Bimanual) Examination", type: "textarea", rows: 2, placeholder: "Uterus: size, position (AVF/RVF/Mid), mobility. Adnexa: mass, tenderness. Fornices: clear / tender" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "provisionalDiagnosis", label: "Provisional Diagnosis", type: "text", required: true, placeholder: "e.g. N92.0 — Menorrhagia / D25.9 — Uterine fibroid" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "investigations", label: "Investigations", type: "textarea", rows: 2, placeholder: "USG pelvis, Pap smear, CBC, thyroid profile, hormonal assays, endometrial biopsy..." },
        { key: "treatment", label: "Treatment", type: "textarea", rows: 2, placeholder: "Medical management, surgery planned..." },
        { key: "referral", label: "Referral", type: "text", placeholder: "Infertility clinic, oncology, etc." },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "Review after reports / 1 month / PRN" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive gynecology OPD consultation for menstrual disorders, pelvic pain, discharge, and other gynec complaints",
    specialties: ["OBG"],
    status: "active",
  },
};


export const OBG_GYNEC_PROCEDURE_TEMPLATE: TemplateDefinition = {
  id: "obg-gynec-procedure",
  name: "Gynec Procedure Note",
  type: "Procedure",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "procedureHeader",
      label: "Procedure Details",
      fields: [
        { key: "procedureName", label: "Procedure Name", type: "select", required: true, options: [
          { label: "D&C (Dilatation & Curettage)", value: "D&C" },
          { label: "Suction Evacuation", value: "SuctionEvac" },
          { label: "Diagnostic Hysteroscopy", value: "DiagHysteroscopy" },
          { label: "Operative Hysteroscopy", value: "OpHysteroscopy" },
          { label: "Diagnostic Laparoscopy", value: "DiagLaparoscopy" },
          { label: "Operative Laparoscopy", value: "OpLaparoscopy" },
          { label: "TAH (Total Abdominal Hysterectomy)", value: "TAH" },
          { label: "TLH (Total Laparoscopic Hysterectomy)", value: "TLH" },
          { label: "Vaginal Hysterectomy", value: "VH" },
          { label: "MTP (Medical Termination of Pregnancy)", value: "MTP" },
          { label: "Myomectomy", value: "Myomectomy" },
        ] },
        { key: "date", label: "Date of Procedure", type: "date", required: true },
        { key: "surgeon", label: "Surgeon", type: "text", required: true },
        { key: "assistant", label: "Assistant", type: "text" },
        { key: "anesthesiaType", label: "Anesthesia Type", type: "select", options: [{ label: "General", value: "General" }, { label: "Spinal", value: "Spinal" }, { label: "Epidural", value: "Epidural" }, { label: "Local + Sedation", value: "Local" }, { label: "None", value: "None" }] },
      ],
    },
    {
      key: "indicationFindings",
      label: "Indication & Findings",
      fields: [
        { key: "indication", label: "Indication", type: "textarea", required: true, rows: 2 },
        { key: "findings", label: "Findings", type: "textarea", required: true, rows: 3, placeholder: "Intra-operative findings specific to procedure..." },
        { key: "specimens", label: "Specimens Sent", type: "text", placeholder: "e.g. Endometrial biopsy to histopathology" },
      ],
    },
    {
      key: "proceduralDetails",
      label: "Procedural Details",
      fields: [
        { key: "cervicalDilatation", label: "Cervical Dilatation (mm)", type: "number", min: 0, max: 12, showIf: { field: "procedureHeader.procedureName", operator: "in", value: ["D&C", "SuctionEvac"] } },
        { key: "productsObtained", label: "Products Obtained", type: "select", options: [{ label: "Complete", value: "Complete" }, { label: "Incomplete", value: "Incomplete" }], showIf: { field: "procedureHeader.procedureName", operator: "in", value: ["D&C", "SuctionEvac"] } },
        { key: "hysteroscopyFindings", label: "Hysteroscopy Findings", type: "textarea", rows: 2, placeholder: "Cavity, endometrium, polyp, fibroid, septum", showIf: { field: "procedureHeader.procedureName", operator: "in", value: ["DiagHysteroscopy", "OpHysteroscopy"] } },
        { key: "laparoscopyFindings", label: "Laparoscopy Findings", type: "textarea", rows: 2, placeholder: "Uterus, tubes, ovaries, cul-de-sac, adhesions, endometriosis", showIf: { field: "procedureHeader.procedureName", operator: "in", value: ["DiagLaparoscopy", "OpLaparoscopy"] } },
        { key: "gestationalAgeMTP", label: "Gestational Age (weeks)", type: "number", min: 4, max: 20, showIf: { field: "procedureHeader.procedureName", operator: "equals", value: "MTP" } },
        { key: "mtpMethod", label: "MTP Method", type: "select", options: [{ label: "Medical (Mifepristone + Misoprostol)", value: "Medical" }, { label: "Surgical (Suction Evacuation)", value: "Surgical" }], showIf: { field: "procedureHeader.procedureName", operator: "equals", value: "MTP" } },
        { key: "complications", label: "Complications", type: "textarea", rows: 2, placeholder: "Perforation, hemorrhage, infection, anesthesia-related" },
        { key: "bloodLoss", label: "Estimated Blood Loss (mL)", type: "number", min: 0, max: 3000 },
      ],
    },
    {
      key: "postOp",
      label: "Post-Procedure",
      fields: [
        { key: "postOpPlan", label: "Post-Procedure Plan", type: "textarea", rows: 2, placeholder: "IV fluids, antibiotics, analgesia, monitoring..." },
        { key: "completionConfirmed", label: "Completion Confirmed", type: "select", options: [{ label: "Clinically", value: "Clinical" }, { label: "USG confirmed", value: "USG" }] },
        { key: "contraceptionCounseling", label: "Contraception Counseling Done", type: "boolean" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. Review in 2 weeks" },
      ],
    },
  ],
  metadata: {
    description: "Structured operative note for common gynecologic procedures including D&C, hysteroscopy, laparoscopy, hysterectomy, and MTP",
    specialties: ["OBG"],
    status: "active",
  },
};
