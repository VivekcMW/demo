import type { TemplateDefinition } from "../templateSchema";

export const COMMUNITY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "community-consult",
  name: "Community Medicine / Health Camp Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint / Reason for Visit", type: "textarea", required: true, rows: 2, placeholder: "e.g. Fever, cough, diarrhea, skin rash, joint pain, vision problem, antenatal check, child immunization, family planning, malnutrition, HTN screening" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 3 days, 2 weeks, chronic" },
        { key: "communityContext", label: "Community Context", type: "textarea", rows: 3, placeholder: "Camp location (urban slum/rural/tribal/displaced/school/industrial), camp type, household info: family size, housing, water source, sanitation, fuel used" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 3, placeholder: "Onset, progression, associated symptoms, prior treatment sought (pharmacy/quack/traditional healer/previous camp)" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Known chronic diseases (HTN/DM/TB/asthma/epilepsy), hospitalizations, surgeries, medications" },
        { key: "obstetricHistory", label: "Obstetric History (if female)", type: "textarea", rows: 1, placeholder: "G/P/L/A, LMP, ANC visits, contraception, breastfeeding" },
        { key: "immunizationStatus", label: "Immunization Status", type: "textarea", rows: 1, placeholder: "Child: age-appropriate vaccines per NIS. Adult: COVID-19, tetanus, influenza" },
        { key: "socialDeterminants", label: "Social Determinants / Risk Factors", type: "textarea", rows: 2, placeholder: "Nutrition (MUAC), food security, occupation, education, tobacco/alcohol, indoor air pollution (biomass), sanitation, handwashing, mosquito net use" },
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
            { key: "temp", label: "Temp (C)", type: "number", min: 30, max: 45 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 300 },
            { key: "height", label: "Height (cm)", type: "number", min: 0, max: 250 },
            { key: "muac", label: "MUAC (cm) — child", type: "number", min: 5, max: 40 },
          ],
        },
        { key: "generalExam", label: "General Exam", type: "textarea", rows: 1, placeholder: "Pallor, icterus, cyanosis, clubbing, lymphadenopathy, edema, nutritional status (wasting/edema/stunting), hydration status" },
        { key: "systemicExam", label: "Systemic Examination", type: "textarea", rows: 3, placeholder: "Respiratory (auscultation/wheeze), CVS (heart sounds/murmur), Abdomen (hepatosplenomegaly/tenderness), CNS, Skin, ENT, Eyes (vision/cataract/xerophthalmia)" },
        { key: "diagnostics", label: "Point-of-Care Diagnostics", type: "textarea", rows: 2, placeholder: "e.g. RDT (malaria/dengue/typhoid), urine dipstick, blood glucose, Hb (Hemocue), pregnancy test, HIV, sputum smear, stool microscopy" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "text", required: true, placeholder: "e.g. Acute respiratory infection, Diarrheal disease, Hypertension (newly detected), Type 2 diabetes, MAM, Scabies, Cataract, Anemia, URTI, Otitis media, Malaria" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "severity", label: "Severity / Referral Need", type: "select", options: [{ label: "Mild — manage at camp", value: "Mild" }, { label: "Moderate — follow-up at PHC/CHC", value: "Moderate" }, { label: "Severe — urgent referral to hospital", value: "Severe" }] },
        { key: "sociodemographicRisk", label: "Social / Demographic Risk Factors", type: "text", placeholder: "e.g. BPL, food insecure, migrant worker, no sanitation, no immunization" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        { key: "treatment", label: "Treatment Given at Camp", type: "textarea", rows: 2, placeholder: "e.g. ORS + zinc, paracetamol + amoxicillin, ACT (malaria), IFA (anemia), scabies treatment, wound dressing" },
        {
          key: "medications", label: "Medications Dispensed", type: "repeating", fields: [
            { key: "drug", label: "Drug", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "healthEducation", label: "Health Education Given", type: "textarea", rows: 2, placeholder: "Handwashing, safe water, ORS prep, breastfeeding, nutrition, family planning, mosquito net use, tobacco cessation" },
        { key: "referral", label: "Referral to Higher Facility", type: "textarea", rows: 2, placeholder: "e.g. PHC for sputum microscopy, CHC for cataract surgery, district hospital for malnutrition" },
        { key: "followUpCamp", label: "Follow-up (Camp / Home Visit)", type: "text", placeholder: "e.g. Review at next camp (2 weeks), ASHA home visit in 1 week" },
        { key: "notifiableDisease", label: "Notifiable Disease Report Submitted", type: "boolean" },
      ],
    },
  ],
  metadata: {
    description: "Community health camp consultation note for community medicine — general illness management, health screening, maternal/child health, nutrition assessment, and referral in camp settings",
    specialties: ["Community Medicine"],
    status: "active",
  },
};


export const COMMUNITY_SURVEY_TEMPLATE: TemplateDefinition = {
  id: "community-survey",
  name: "Community Medicine Epidemiological Survey Note",
  type: "Survey",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "surveyDetails",
      label: "Survey Details",
      fields: [
        { key: "surveyTitle", label: "Survey Title / Study Name", type: "text", required: true, placeholder: "e.g. NFHS-6 catchment area survey, DM prevalence in urban slum, TB active case finding in tribal area, STEPS NCD survey, Malnutrition screening" },
        { key: "surveyType", label: "Survey Type", type: "select", required: true, options: [
          { label: "Cross-sectional survey", value: "CrossSectional" },
          { label: "Active case finding / screening", value: "ActiveCaseFinding" },
          { label: "Cluster survey (30x7 methodology)", value: "Cluster" },
          { label: "Line listing / outbreak investigation", value: "LineListing" },
          { label: "Rapid assessment", value: "RapidAssessment" },
          { label: "Household survey", value: "Household" },
          { label: "School health survey", value: "School" },
        ] },
        { key: "surveyDate", label: "Date(s) of Survey", type: "text", required: true },
        { key: "location", label: "Location / Area / Cluster", type: "text", required: true, placeholder: "e.g. Ward 14 urban slum, Ramnagar PHC catchment" },
        { key: "population", label: "Target Population", type: "text", placeholder: "e.g. Adults >=18y, Children 6-59mo, Women 15-49y" },
        { key: "sampleSize", label: "Sample Size Planned / Achieved", type: "text", placeholder: "e.g. 30 clusters x 7 = 210, Achieved n=198 (94.3%)" },
        { key: "surveyTeam", label: "Survey Team", type: "text", placeholder: "PI, 2 MOs, 4 ASHAs, 1 lab tech, 1 data entry operator" },
        { key: "objectives", label: "Objectives", type: "textarea", rows: 3, placeholder: "Primary: estimate prevalence of [condition]. Secondary: risk factors, health-seeking behavior, program coverage, KAP" },
      ],
    },
    {
      key: "methodology",
      label: "Methodology",
      fields: [
        { key: "sampling", label: "Sampling Method", type: "textarea", rows: 2, placeholder: "e.g. Multistage stratified random sampling, PPS, systematic random" },
        { key: "dataCollection", label: "Data Collection Tools", type: "textarea", rows: 2, placeholder: "Questionnaires, anthropometry, BP, RDTs, sputum, stool, Hemocue, urine dipstick, MUAC" },
        { key: "definitions", label: "Case Definitions / Criteria", type: "textarea", rows: 2, placeholder: "HTN: SBP>=140/DBP>=90. DM: RBG>=200. Malnutrition: MUAC<11.5cm (SAM), <12.5cm (MAM). TB suspect: cough>2wks + fever/night sweats/weight loss" },
        { key: "qualityMeasures", label: "Quality Assurance Measures", type: "textarea", rows: 1, placeholder: "Training, pre-testing, calibration, supervision, 10% re-check, data validation" },
        { key: "ethics", label: "Ethical Considerations", type: "textarea", rows: 1, placeholder: "Informed consent, confidentiality, referral of positives, ethics approval" },
      ],
    },
    {
      key: "findings",
      label: "Survey Findings",
      fields: [
        { key: "coverage", label: "Coverage / Response Rate", type: "text", placeholder: "e.g. Households: 185/200 (92.5%), Individuals: 640" },
        { key: "demographics", label: "Demographic Profile", type: "textarea", rows: 2, placeholder: "Mean age 42.5y, 55% female, 60% BPL, 35% illiterate, 90% biomass fuel" },
        { key: "keyResults", label: "Key Findings / Prevalence Data", type: "textarea", required: true, rows: 4, placeholder: "HTN 32.5%, DM 12.8%, Tobacco 45% male, Stunting 38%, Wasting 15%." },
        {
          key: "classification", label: "Disease / Condition Classification", type: "repeating", fields: [
            { key: "condition", label: "Condition", type: "text" },
            { key: "count", label: "Count (n)", type: "number" },
            { key: "prevalence", label: "Prevalence (%)", type: "text" },
          ],
        },
        { key: "riskFactors", label: "Identified Risk Factors", type: "textarea", rows: 2, placeholder: "Open defecation 25%, indoor air pollution 80%, low fruit/veg 70%, physical inactivity 45%" },
        { key: "healthInfrastructure", label: "Health System / Infrastructure Gaps", type: "textarea", rows: 2, placeholder: "2km to PHC, no sub-center, ASHA vacancy 40%, drug stock-outs" },
      ],
    },
    {
      key: "recommendations",
      label: "Recommendations & Action Plan",
      fields: [
        { key: "publicHealthActions", label: "Public Health Actions Recommended", type: "textarea", rows: 3, placeholder: "NCD screening clinic at PHC, health education, sanitation campaign, supplementation (IFA/vitamin A/zinc), TB contact tracing" },
        { key: "programmatic", label: "Programmatic Interventions", type: "textarea", rows: 2, placeholder: "ASHA/ANM training, supply chain, IEC development, VHSNC engagement, m-health" },
        { key: "policy", label: "Policy Recommendations", type: "textarea", rows: 2, placeholder: "Regulation of tobacco/alcohol, food fortification, clean fuel subsidy" },
        { key: "research", label: "Further Research / Next Survey", type: "text", placeholder: "Follow-up survey in 1 year, qualitative study" },
        { key: "dissemination", label: "Dissemination Plan", type: "textarea", rows: 1, placeholder: "Report to DHO, district review, community feedback, publication" },
      ],
    },
  ],
  metadata: {
    description: "Epidemiological survey note for community medicine — prevalence surveys, active case finding, cluster surveys, rapid assessments, and KAP studies with actionable public health recommendations",
    specialties: ["Community Medicine"],
    status: "active",
  },
};


export const COMMUNITY_FIELD_VISIT_TEMPLATE: TemplateDefinition = {
  id: "community-field-visit",
  name: "Community Medicine Field Visit Report",
  type: "Survey",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "surveyDetails",
      label: "Visit Information",
      fields: [
        { key: "visitDate", label: "Date of Visit", type: "date", required: true },
        { key: "visitType", label: "Visit Type", type: "select", required: true, options: [
          { label: "Field supervision / monitoring", value: "Supervision" },
          { label: "Outbreak investigation", value: "Outbreak" },
          { label: "Community outreach / camp", value: "Outreach" },
          { label: "Home visit / family visit", value: "HomeVisit" },
          { label: "School health visit", value: "SchoolHealth" },
          { label: "PHC/CHC facility visit", value: "FacilityVisit" },
          { label: "Urban health post visit", value: "UrbanPost" },
          { label: "Anganwadi / ICDS visit", value: "Anganwadi" },
          { label: "Disaster / relief camp visit", value: "Disaster" },
        ] },
        { key: "location", label: "Area / Facility Visited", type: "text", required: true, placeholder: "e.g. PHC Ramnagar, Anganwadi Ward 5, urban slum, IDP camp" },
        { key: "purpose", label: "Purpose of Visit", type: "textarea", required: true, rows: 2, placeholder: "e.g. Supervision of immunization session, outbreak investigation (suspected cholera), NCD screening monitoring, school health camp, Anganwadi nutrition assessment" },
        { key: "accompaniedBy", label: "Accompanied By", type: "text", placeholder: "e.g. District program officer, BMO, PHC MO, ANM, ASHA, CDPO" },
      ],
    },
    {
      key: "findings",
      label: "Field Observations & Findings",
      fields: [
        { key: "facilityStatus", label: "Facility / Infrastructure Status", type: "textarea", rows: 3, placeholder: "e.g. PHC building functional, staff quarters 2/4 occupied, electricity (solar backup), water (borewell), equipment status, cold chain, drug stock" },
        { key: "staffing", label: "Staffing / HR Status", type: "textarea", rows: 2, placeholder: "e.g. MO 2 (1 on leave), ANM 4/6, ASHA 8/10, pharmacist 1" },
        { key: "services", label: "Service Delivery Observations", type: "textarea", rows: 3, placeholder: "e.g. OPD 45/day, ANC 12/month, immunization 68%, inst. delivery 82%, FP uptake, TB DOTS" },
        { key: "communityObservations", label: "Community-Level Observations", type: "textarea", rows: 3, placeholder: "Open defecation 30%, handwashing 20%, biomass cooking 80%, mosquito breeding sites" },
        { key: "outbreakInvestigation", label: "Outbreak Investigation Details", type: "textarea", rows: 3, placeholder: "e.g. Cholera outbreak in ward X: 15 cases, 2 deaths, index case, rectal swabs positive for V. cholerae. Control measures: rehydration, chlorination, chemoprophylaxis" },
        { key: "dataReview", label: "Data / Record Review", type: "textarea", rows: 2, placeholder: "HMIS reporting 80%, TB notification discrepancy, vaccine wastage 12%, IFA coverage 50%" },
        { key: "communityFeedback", label: "Community Feedback / Complaints", type: "textarea", rows: 2, placeholder: "Rude MPHW, lack of medicines, distance to facility, no doctor after 2 PM" },
      ],
    },
    {
      key: "recommendations",
      label: "Recommendations / Action Taken",
      fields: [
        { key: "immediateActions", label: "Immediate Actions Taken", type: "textarea", rows: 2, placeholder: "Oral rehydration set up, water chlorination started, IEC distributed, cold chain advice, order placed" },
        { key: "recommendations", label: "Recommendations to District / Block", type: "textarea", rows: 3, placeholder: "Immediate: replenish OCP, repair scale, fill ANM vacancies. Short-term: VHSNC meeting, immunization catch-up, water chlorination" },
        { key: "followUpVisit", label: "Follow-up Visit Plan", type: "text", placeholder: "e.g. 2 weeks for outbreak review, 1 month for immunization catch-up" },
        { key: "reportSubmission", label: "Report Submitted To", type: "text", placeholder: "e.g. District Health Officer" },
      ],
    },
  ],
  metadata: {
    description: "Field visit report for Community Medicine — PHC/sub-center supervision, outbreak investigation, community outreach monitoring, school health visits, and programmatic assessment",
    specialties: ["Community Medicine"],
    status: "active",
  },
};
