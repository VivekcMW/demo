import type { TemplateDefinition } from "../templateSchema";

export const AYURVEDA_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "ayurveda-consult",
  name: "Ayurveda Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint (Pradhana Vedana)", type: "textarea", required: true, rows: 2, placeholder: "e.g. Joint pain (Sandhigata Vata), indigestion (Agnimandya), headache (Shirashoola), skin disease (Kushtha), diabetes (Madhumeha), hypertension (Raktagata Vata), menstrual disorders (Artava Vyapad), low back pain (Katishoola), asthma (Tamaka Shwasa), arthritis (Amavata)" },
        { key: "duration", label: "Duration (Kala)", type: "text", placeholder: "e.g. 6 months, 2 years, chronic (since 5 years)" },
        { key: "historyOfIllness", label: "History of Present Illness (Vyadhi Vrittanta)", type: "textarea", rows: 4, placeholder: "Onset (acute/chronic), progression, aggravating factors (Aharaja/Viharaja/Manasika), relieving factors, prior treatment (allopathic/ayurvedic/home remedies)" },
        { key: "dietHistory", label: "Diet History (Ahara Vrittanta)", type: "textarea", rows: 2, placeholder: "Dietary pattern, meal timings, preferences, junk food, spicy/oily food, milk/curd, water, tea/coffee/alcohol, fasting" },
        { key: "bowelBladder", label: "Bowel & Bladder (Mootra Purisha)", type: "textarea", rows: 1, placeholder: "Bowel habit, urine (frequency/color/burning)" },
        { key: "sleep", label: "Sleep (Nidra)", type: "text", placeholder: "e.g. Sound, disturbed, insomnia, excessive" },
        { key: "pastMedicalHistory", label: "Past Medical History (Purva Vyadhi)", type: "textarea", rows: 2, placeholder: "Chronic diseases, surgeries, prior Ayurvedic treatments (Panchakarma, Rasayana)" },
        { key: "medications", label: "Current Medications (Aushadhi)", type: "textarea", rows: 1, placeholder: "Triphala, Ashwagandha, allopathic medicines" },
        { key: "allergies", label: "Allergies (Asatmya)", type: "textarea", rows: 1, placeholder: "Food/drug/environmental allergies" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals (Nadiadi Pariksha)", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Nadi (Pulse)", type: "text", placeholder: "e.g. Vata (60-80, snake), Pitta (80-100, frog), Kapha (100-120, swan)" },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
          ],
        },
        { key: "dashavidha", label: "Dashavidha Pariksha (Ten-fold Exam)", type: "textarea", rows: 3, placeholder: "1. Prakriti (V/P/K), 2. Vikriti, 3. Sara, 4. Samhanana, 5. Pramana, 6. Satmya, 7. Satva, 8. Ahara Shakti, 9. Vyayama Shakti, 10. Vaya" },
        { key: "ashtavidha", label: "Ashtavidha Pariksha (Eight-fold Exam)", type: "textarea", rows: 3, placeholder: "1. Nadi, 2. Mootra, 3. Mala, 4. Jihwa, 5. Shabda, 6. Sparsha, 7. Drik, 8. Akriti" },
        { key: "agni", label: "Agni (Digestive Fire) Status", type: "select", options: [{ label: "Sama Agni (balanced)", value: "Sama" }, { label: "Vishama Agni (irregular — Vata)", value: "Vishama" }, { label: "Tikshna Agni (intense — Pitta)", value: "Tikshna" }, { label: "Manda Agni (weak — Kapha)", value: "Manda" }] },
        { key: "koshtha", label: "Koshtha (Bowel Habitus)", type: "select", options: [{ label: "Krura (hard — Vata)", value: "Krura" }, { label: "Madhyama (moderate — Pitta)", value: "Madhyama" }, { label: "Mridu (soft — Kapha)", value: "Mridu" }] },
        { key: "systemicExam", label: "Systemic / Regional Exam", type: "textarea", rows: 2, placeholder: "Focused exam — joint (Sandhigata Vata), skin (Kushtha), respiratory (Tamaka Shwasa), abdominal (Grahami/Gulma)" },
        { key: "modernLabs", label: "Modern Lab / Imaging Summary", type: "text", placeholder: "e.g. Hb 12.5, TSH 4.2, HbA1c 7.2%" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment (Roga / Rogi Pariksha)",
      fields: [
        { key: "ayurvedicDiagnosis", label: "Ayurvedic Diagnosis (Vyadhi / Samprapti)", type: "text", required: true, placeholder: "e.g. Sandhigata Vata, Amavata, Madhumeha, Tamaka Shwasa, Vicharchika, Klaibya" },
        { key: "samprapti", label: "Samprapti (Pathogenesis)", type: "textarea", rows: 2, placeholder: "Nidana → Dosha Vriddhi → Dosha Dushti → Srotodushti → Adhishthana → Vyakti" },
        { key: "doshaInvolvement", label: "Dosha Involvement", type: "text", placeholder: "e.g. Vata Pradhana (Pitta Anubandha), Tridoshaja" },
        { key: "dhatu", label: "Dhatu / Srotas Involved", type: "text", placeholder: "e.g. Asthi dhatu, Majja dhatu, Rasa-Rakta srotas" },
        { key: "modernDiagnosis", label: "Modern Medicine Correlation", type: "text", placeholder: "e.g. Osteoarthritis, Type 2 DM, IBS" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "sadhyaAsadhya", label: "Sadhya-Asadhya (Prognosis)", type: "select", options: [{ label: "Sadhya (Curable)", value: "Sadhya" }, { label: "Yapya (Palliable)", value: "Yapya" }, { label: "Asadhya (Incurable)", value: "Asadhya" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan (Chikitsa)",
      fields: [
        { key: "chikitsaSutra", label: "Chikitsa Sutra (Treatment Principle)", type: "textarea", rows: 2, placeholder: "Vata Shamana + Basti, Shodhana → Shamana, Rasayana, Nidana Parivarjana, Srotoshodhana" },
        { key: "shodhana", label: "Panchakarma / Shodhana (Purification)", type: "textarea", rows: 2, placeholder: "Vamana, Virechana, Basti (Anuvasana/Niruha), Nasya, Raktamokshana" },
        { key: "shamana", label: "Shamana (Palliative Medicines)", type: "textarea", rows: 2, placeholder: "Triphala Guggulu, Yogaraj Guggulu, Chandraprabha Vati, Ashwagandha, Shilajit, Punarnavadi Kashaya" },
        { key: "ahara", label: "Ahara (Dietary / Pathya-Apathya)", type: "textarea", rows: 2, placeholder: "Pathya: warm water, rice + moong dal soup, ghee, honey, ginger. Apathya: cold water, curd, fried/spicy, processed food" },
        { key: "vihara", label: "Vihara (Lifestyle / Yoga / Pranayama)", type: "textarea", rows: 2, placeholder: "Yoga (Suryanamaskar/Padmasana), Pranayama (Anulom Vilom/Kapalbhati), Dinacharya, Ritucharya" },
        { key: "rasayana", label: "Rasayana / Rejuvenation", type: "textarea", rows: 1, placeholder: "Ashwagandha Rasayana, Brahma Rasayana, Chyawanprash" },
        {
          key: "medications", label: "Prescribed Ayurvedic Formulations", type: "repeating", fields: [
            { key: "formulation", label: "Formulation", type: "text", placeholder: "e.g. Yogaraj Guggulu" },
            { key: "dose", label: "Dose", type: "text", placeholder: "e.g. 500mg x 2 tabs" },
            { key: "anupana", label: "Anupana (Vehicle)", type: "text", placeholder: "Warm water, milk, honey" },
            { key: "duration", label: "Duration", type: "text", placeholder: "3 months" },
          ],
        },
        { key: "referrals", label: "Referrals / Follow-up", type: "textarea", rows: 1, placeholder: "Panchakarma specialist, yoga therapist, dietician" },
        { key: "followUp", label: "Follow-up", type: "text", placeholder: "e.g. 2 weeks, 1 month (Panchakarma), 3 months (Rasayana course)" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive Ayurveda consultation note based on Ashtanga Ayurveda principles — Rogi/Roga Pariksha, Dashavidha/Ashtavidha examination, Samprapti, and Chikitsa (Shodhana/Shamana/Rasayana)",
    specialties: ["Ayurveda"],
    status: "active",
  },
};


export const AYURVEDA_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "ayurveda-followup",
  name: "Ayurveda Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective (Anuvritta Vrittanta)",
      fields: [
        { key: "intervalHistory", label: "Interval History / Treatment Response", type: "textarea", required: true, rows: 3, placeholder: "Change in symptoms, compliance, dietary adherence, new symptoms, Panchakarma experience, Agni, Koshtha, Nidra, Bala" },
        { key: "dietAdherence", label: "Diet (Pathya) Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "medicationAdherence", label: "Medication Adherence", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Aushadhi Pratikiya (Side Effects)", type: "textarea", rows: 1, placeholder: "Nausea, headache, loose stools, skin rash" },
      ],
    },
    {
      key: "objective",
      label: "Objective (Pariksha)",
      fields: [
        {
          key: "vitals", label: "Vitals / Nadi", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Nadi", type: "text", placeholder: "e.g. Vata (changed), Pitta (normalized)" },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "jihwa", label: "Jihwa (Tongue)", type: "text", placeholder: "e.g. Coated (Sama), clean (Nirama), pale, dry" },
        { key: "agni", label: "Agni Status", type: "select", options: [{ label: "Sama", value: "Sama" }, { label: "Vishama", value: "Vishama" }, { label: "Tikshna", value: "Tikshna" }, { label: "Manda", value: "Manda" }] },
        { key: "focusedExam", label: "Focused Exam / Regional", type: "textarea", rows: 1, placeholder: "Change in physical findings" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment (Roga-Avastha)",
      fields: [
        { key: "diseaseStatus", label: "Disease / Symptom Status", type: "select", options: [{ label: "Significant improvement", value: "Improved" }, { label: "Mild improvement", value: "Mild" }, { label: "No change", value: "Stable" }, { label: "Worsening", value: "Worsening" }] },
        { key: "doshaStatus", label: "Current Dosha Status", type: "text", placeholder: "e.g. Vata pacified, Pitta Prakopa" },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Samprapti Vighatana, Bala, Agni, need for Samshodhana vs Samshamana" },
      ],
    },
    {
      key: "plan",
      label: "Plan (Chikitsa Anuvritti)",
      fields: [
        { key: "treatmentContinuation", label: "Continue / Modify Treatment", type: "textarea", rows: 2, placeholder: "Continue Shamana, add Rajayapana Basti, switch Virechana, add Rasayana, change dose/Anupana" },
        { key: "nextPanchakarma", label: "Next Panchakarma / Shodhana", type: "text", placeholder: "e.g. Virechana in 2 weeks, Nasya after 1 month" },
        { key: "dietModifications", label: "Diet / Lifestyle Adjustments", type: "textarea", rows: 1, placeholder: "Add specific foods per Dosha season, intensify yoga" },
        { key: "rasayana", label: "Rasayana / Rejuvenation Additions", type: "text", placeholder: "Start Ashwagandha Rasayana 10g with milk" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 2 weeks (Panchakarma), 1 month (Rasayana review)" },
      ],
    },
  ],
  metadata: {
    description: "Structured Ayurveda follow-up note with assessment of treatment response, Agni/Dosha status, dietary adherence, and Chikitsa adjustments",
    specialties: ["Ayurveda"],
    status: "active",
  },
};


// ── AYUSH — Homeopathy ────────────────────────────────────────────────────────

export const HOMEOPATHY_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "homeopathy-consult",
  name: "Homeopathy Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint", type: "textarea", required: true, rows: 2, placeholder: "e.g. Allergic rhinitis, migraine, asthma, eczema/psoriasis, arthritis, anxiety/depression, IBS, dysmenorrhea, recurrent UTI, hypothyroidism, insomnia" },
        { key: "duration", label: "Duration", type: "text", placeholder: "e.g. 2 years, recurrent since childhood" },
        { key: "historyOfIllness", label: "History of Present Illness", type: "textarea", rows: 3, placeholder: "Onset, progression, periodicity, modalities (aggravation/amelioration), concomitants, prior treatment" },
        { key: "mentalEmotionalState", label: "Mental & Emotional State (Mentals)", type: "textarea", rows: 2, placeholder: "Mood, fears, anxieties, anger, grief, consolation, sensitivity, social behavior, dreams" },
        { key: "physicalGenerals", label: "Physical Generals", type: "textarea", rows: 3, placeholder: "Thermal state, perspiration, appetite/cravings/aversions, thirst, sleep position, energy, menstrual details" },
        { key: "constitution", label: "Constitution & Miasm", type: "textarea", rows: 2, placeholder: "Constitutional type (Calc carb/Lycopodium/Sulphur/Pulsatilla). Miasmatic background: Psoric/Sycotic/Syphilitic" },
        { key: "pastMedicalHistory", label: "Past Medical History", type: "textarea", rows: 2, placeholder: "Childhood diseases, surgeries, vaccinations, allopathic medications, previous homeopathic treatment, suppression history" },
        { key: "familyHistory", label: "Family History", type: "textarea", rows: 1, placeholder: "TB, cancer, DM, HTN, allergy, autoimmune, psychiatric illness" },
        { key: "allergies", label: "Allergies / Sensitivities", type: "textarea", rows: 1, placeholder: "Seasonal, food, drugs, insect bites" },
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
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalExam", label: "General Physical Exam", type: "textarea", rows: 1, placeholder: "Build, pallor, complexion, skin, hair, nails, tongue" },
        { key: "systemicExam", label: "Systemic / Regional Exam", type: "textarea", rows: 2, placeholder: "Focused exam per complaint" },
        { key: "tongue", label: "Tongue (Homeopathic importance)", type: "text", placeholder: "e.g. Red (Bell/Bry), coated white (Ant crud), cracked (Nat mur)" },
        { key: "investigations", label: "Lab / Imaging Results", type: "text", placeholder: "e.g. IgE 250, TSH 5.8, Hb 10.2" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment (Repertorization & Analysis)",
      fields: [
        { key: "diagnosis", label: "Diagnosis", type: "text", required: true, placeholder: "e.g. Allergic rhinosinusitis, Atopic eczema, Migraine, Anxiety disorder, IBS" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
        { key: "miasmaticDiagnosis", label: "Miasmatic Diagnosis", type: "select", options: [{ label: "Psoric", value: "Psoric" }, { label: "Sycotic", value: "Sycotic" }, { label: "Syphilitic", value: "Syphilitic" }, { label: "Mixed psoro-sycotic", value: "PsoroSycotic" }, { label: "Tubercular", value: "Tubercular" }] },
      ],
    },
    {
      key: "plan",
      label: "Plan (Prescription & Management)",
      fields: [
        { key: "remedySelection", label: "Remedy Selection (Repertorization)", type: "textarea", rows: 2, placeholder: "Rubrics, remedy selected, based on totality of symptoms" },
        {
          key: "prescription", label: "Prescription", type: "repeating", fields: [
            { key: "remedy", label: "Remedy", type: "text", placeholder: "e.g. Sulphur, Lycopodium, Pulsatilla" },
            { key: "potency", label: "Potency", type: "select", options: [{ label: "6C", value: "6C" }, { label: "30C", value: "30C" }, { label: "200C", value: "200C" }, { label: "1M", value: "1M" }, { label: "10M", value: "10M" }, { label: "50M", value: "50M" }, { label: "LM1", value: "LM1" }, { label: "Q1", value: "Q1" }] },
            { key: "dose", label: "Dose & Frequency", type: "text", placeholder: "e.g. 3 globules TDS x 3 days then SOS" },
          ],
        },
        { key: "dietRegimen", label: "Diet & Regimen (Avoidances)", type: "textarea", rows: 2, placeholder: "Avoid coffee, peppermint, camphor, menthol, garlic, onion. Avoid tea/coffee 30 min before/after dose" },
        { key: "followUpPlan", label: "Follow-up Plan / Reaction Assessment", type: "textarea", rows: 2, placeholder: "Return in 2 weeks (acute) / 4 weeks (chronic). Assess aggravation/improvement/no change" },
        { key: "referrals", label: "Referrals / Adjunctive Care", type: "textarea", rows: 1, placeholder: "Allergist, dermatology, yoga/counseling" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive Homeopathy consultation note — case taking with mentals, physical generals, constitution, miasm, repertorization, remedy selection, and dietary regimen",
    specialties: ["Homeopathy"],
    status: "active",
  },
};


export const HOMEOPATHY_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "homeopathy-followup",
  name: "Homeopathy Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "intervalHistory", label: "Interval History / Reaction to Remedy", type: "textarea", required: true, rows: 3, placeholder: "Response: better/worse/same. Aggravation (duration/severity). Change in symptoms, well-being, energy, sleep, appetite, mental state. New symptoms (proving?). Compliance" },
        { key: "remedyResponse", label: "Remedy Response Assessment", type: "select", options: [
          { label: "Cured", value: "Cured" },
          { label: "Marked improvement (>75%)", value: "Marked" },
          { label: "Moderate improvement (50-75%)", value: "Moderate" },
          { label: "Mild improvement (<50%)", value: "Mild" },
          { label: "No change", value: "None" },
          { label: "Aggravation", value: "Aggravation" },
        ] },
        { key: "newSymptoms", label: "New Symptoms / Proving Symptoms", type: "textarea", rows: 1, placeholder: "e.g. New rash — proving of Sulphur?" },
        { key: "compliance", label: "Compliance with Avoidances", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
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
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Objective change in physical signs" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment",
      fields: [
        { key: "overallResponse", label: "Overall Response", type: "select", options: [{ label: "Cured", value: "Cured" }, { label: "Improving", value: "Improving" }, { label: "Stagnating", value: "Stagnating" }, { label: "Deteriorating", value: "Deteriorating" }] },
        { key: "miasmaticShift", label: "Miasmatic Shift / Layer Unfolding", type: "text", placeholder: "e.g. Psoric layer uncovered, Sycotic manifesting" },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Totality, remedy response, proving, miasmatic change, next step" },
      ],
    },
    {
      key: "plan",
      label: "Plan",
      fields: [
        {
          key: "nextRemedy", label: "Next Prescription", type: "repeating", fields: [
            { key: "remedy", label: "Remedy", type: "text" },
            { key: "potency", label: "Potency", type: "select", options: [{ label: "Placebo", value: "Placebo" }, { label: "6C", value: "6C" }, { label: "30C", value: "30C" }, { label: "200C", value: "200C" }, { label: "1M", value: "1M" }, { label: "10M", value: "10M" }, { label: "50M", value: "50M" }, { label: "LM1", value: "LM1" }, { label: "LM2", value: "LM2" }] },
            { key: "dose", label: "Dose", type: "text" },
          ],
        },
        { key: "action", label: "Action Taken", type: "select", options: [
          { label: "Continue same remedy (same potency)", value: "Continue" },
          { label: "Continue same remedy (next higher potency)", value: "NextPotency" },
          { label: "Repeat same dose (recurrence)", value: "Repeat" },
          { label: "Change remedy (changed totality)", value: "Change" },
          { label: "Antidote and re-evaluate", value: "Antidote" },
          { label: "Placebo (without active dose)", value: "Placebo" },
          { label: "Intercurrent remedy (obstacle)", value: "Intercurrent" },
        ] },
        { key: "dietRegimen", label: "Diet & Avoidance Reinforcement", type: "textarea", rows: 1, placeholder: "Reinforce avoidances, add dietary modifications" },
        { key: "nextVisit", label: "Next Visit / Follow-up Interval", type: "text", placeholder: "2 weeks, 1 month, 2 months (LM)" },
      ],
    },
  ],
  metadata: {
    description: "Structured Homeopathy follow-up note with remedy response assessment, first reaction evaluation, proving symptoms, and next prescription (Hering's Law of Cure assessment)",
    specialties: ["Homeopathy"],
    status: "active",
  },
};



// ── AYUSH — Unani ────────────────────────────────────────────────────────────

export const UNANI_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "unani-consult",
  name: "Unani Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective (Shakwa / Tarikh-e-Maraz)",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint (Shakwa-e-Asasi)", type: "textarea", required: true, rows: 2, placeholder: "e.g. Joint pain (Waja-ul-Mafasil), fever (Humma), cough/asthma (Zeeq-un-Nafas), skin disease (Jarab/Da-e-Sadaf), diabetes (Ziabitus), paralysis (Falij/Laqwa), headache (Suda), gastritis (Hazeema/Su-e-Hazm)" },
        { key: "duration", label: "Duration (Muddat-e-Maraz)", type: "text" },
        { key: "historyOfIllness", label: "HPI (Tarikh-e-Maraz-e-Hazir)", type: "textarea", rows: 3, placeholder: "Onset (Hadd/Muzmin), progression (Taraqqi/Tanazzul), precipitating factors (Asbab-e-Musahila), prior treatments" },
        { key: "dietHistory", label: "Diet History (Ghiza / Mashroobat)", type: "textarea", rows: 2, placeholder: "Food habits, quantity, quality, appetite (Ishtiha), thirst (Piyas), cravings/aversions" },
        { key: "bowelBladder", label: "Bowel & Bladder (Bartaz / Tams)", type: "textarea", rows: 1, placeholder: "Bowel: frequency, consistency (Qabz/Ishaal). Urine: frequency, color, burning" },
        { key: "sleep", label: "Sleep (Nawm)", type: "text", placeholder: "Sound, insomnia (Sahr), excessive (Subat)" },
        { key: "exerciseLifestyle", label: "Exercise & Lifestyle (Riyazat)", type: "textarea", rows: 1, placeholder: "Physical activity, occupation, sexual activity" },
        { key: "temperament", label: "Temperament & Personal History", type: "textarea", rows: 2, placeholder: "Mizaj: Damvi (hot-moist), Safravi (hot-dry), Balghami (cold-moist), Saudavi (cold-dry). Emotional state" },
        { key: "pastMedicalHistory", label: "Past Medical History (Tarikh-e-Maraz-e-Sabiq)", type: "textarea", rows: 2, placeholder: "Chronic diseases, surgeries, prior Unani/Allopathic treatment" },
        { key: "familyHistory", label: "Family History (Tarikh-e-Asbat)", type: "textarea", rows: 1, placeholder: "Sual-e-Diq (asthma), Ziabitus, Falij" },
      ],
    },
    {
      key: "objective",
      label: "Objective (Imla o Pehchan)",
      fields: [
        {
          key: "vitals", label: "Vitals (Nabz o Harrarat)", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Nabz (Pulse)", type: "text", placeholder: "Qawi/Zaeef, Mustawi/Ghair-Mustawi" },
            { key: "temp", label: "Harrarat (Temp)", type: "number", min: 30, max: 45 },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
          ],
        },
        { key: "generalExam", label: "General Exam (Adaiyya)", type: "textarea", rows: 2, placeholder: "Qiwam-e-Jism, lawn-e-Jild, Shaar, Liss, Ain, Jild" },
        { key: "asbabSitta", label: "Asbab-e-Sitta Zarooriya (6 Essentials)", type: "textarea", rows: 3, placeholder: "1. Hawa-e-Moheet, 2. Makool-o-Mashroob, 3. Harkat-o-Sukoon-e-Jismani, 4. Harkat-o-Sukoon-e-Nafsani, 5. Nawm-o-Yaqza, 6. Ihtibas-o-Istifragh" },
        { key: "nabz", label: "Nabz (Pulse Exam)", type: "textarea", rows: 2, placeholder: "Zoqandarus, Muttasil, Muqawwis. Qawi/Zaeef/Baat/Sagheer. Mustawi/Ghair Mustawi" },
        { key: "baul", label: "Baul (Urine Exam)", type: "text", placeholder: "Rang (colour), Qiwam, Zarab, Raaiha, Qillat/Kasrat" },
        { key: "baraz", label: "Baraz (Stool Exam)", type: "text", placeholder: "Qiwam, Rang, Raaiha, Alaaeq, Dam" },
        { key: "systemicExam", label: "Systemic / Regional Exam", type: "textarea", rows: 2, placeholder: "Waja-ul-Mafasil, Zeeq-un-Nafas, Jild, Falij" },
        { key: "labs", label: "Lab / Imaging Results", type: "text", placeholder: "CBC, HbA1c, TSH, IgE, X-ray" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment (Tashkhees)",
      fields: [
        { key: "diagnosis", label: "Unani Diagnosis (Tashkhees-e-Unani)", type: "text", required: true, placeholder: "e.g. Waja-ul-Mafasil, Zeeq-un-Nafas (Damvi), Da-e-Sadaf (Saudavi)" },
        { key: "mizaj", label: "Mizaj (Temperament) Assessment", type: "text", placeholder: "e.g. Ghaleez — Damm/Safra/Balgham/Sauda" },
        { key: "pathology", label: "Unani Pathology (Mafhoom-e-Maraz)", type: "textarea", rows: 2, placeholder: "Khilt-e-Balgham ka ghalba, Fasad-e-Dam, Madda-e-Saudavi" },
        { key: "modernDiagnosis", label: "Modern Correlation", type: "text", placeholder: "OA knee, COPD, DM type 2, HTN, Psoriasis" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
      ],
    },
    {
      key: "plan",
      label: "Plan (Ilaj)",
      fields: [
        { key: "ilajPrinciple", label: "Ilaj bil Tadbeer wa Dawa (Treatment Principle)", type: "textarea", rows: 2, placeholder: "Tanqia-e-Mawad → Taadeel-e-Mizaj → Taqwiyat-e-Aza" },
        { key: "ilajbilGhiza", label: "Ilaj bil Ghiza (Dietotherapy)", type: "textarea", rows: 2, placeholder: "Cold/hot regimen per Mizaj, specific foods, fasting (Sawm), cupping (Hijama), massage (Dalk), exercise (Riyazat)" },
        {
          key: "ilajbilDawa", label: "Ilaj bil Dawa (Pharmacotherapy)", type: "repeating", fields: [
            { key: "drug", label: "Unani Drug", type: "text", placeholder: "e.g. Sharbat-e-Deenar, Jawarish-e-Jalinoos" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "form", label: "Form", type: "select", options: [{ label: "Jawarish", value: "Jawarish" }, { label: "Sharbat", value: "Sharbat" }, { label: "Majoon", value: "Majoon" }, { label: "Kushta", value: "Kushta" }, { label: "Tila", value: "Tila" }, { label: "Hab", value: "Hab" }, { label: "Qurs", value: "Qurs" }, { label: "Safoof", value: "Safoof" }] },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "ilajbilYad", label: "Ilaj bil Yad (Surgery / Manual)", type: "textarea", rows: 1, placeholder: "Hijama (cupping), Fasd (venesection), Dalk (massage), Qay (emesis)" },
        { key: "advice", label: "Tadbeer-o-Nasihat (Advice)", type: "textarea", rows: 2, placeholder: "Dietary (Ghiza), climate (Hawa), exercise (Riyazat), sleep (Nawm), emotional (Nafsani), elimination (Istifragh)" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "Unani specialist, physiotherapy, dietitian" },
        { key: "followUp", label: "Follow-up (Muddat-e-Mualaja)", type: "text", placeholder: "e.g. 15 days, 1 month, 40-day Ilaj course" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive Unani consultation note — Mizaj assessment, Asbab-e-Sitta Zarooriya, Nabz/Baul/Baraz examination, Tashkhees, and Ilaj (Ilaj bil Tadbeer/Ghiza/Dawa/Yad)",
    specialties: ["Unani"],
    status: "active",
  },
};


export const UNANI_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "unani-followup",
  name: "Unani Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective (Natija-e-Ilaj)",
      fields: [
        { key: "intervalHistory", label: "Interval History / Treatment Response", type: "textarea", required: true, rows: 3, placeholder: "Symptom change, drug compliance, diet/lifestyle adherence, new symptoms, Mizaj change" },
        { key: "compliance", label: "Compliance with Ilaj", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
        { key: "sideEffects", label: "Muzir Asraat (Side Effects)", type: "textarea", rows: 1, placeholder: "GI upset, headache, rash" },
      ],
    },
    {
      key: "objective",
      label: "Objective (Muaaina)",
      fields: [
        {
          key: "vitals", label: "Vitals / Nabz", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Nabz", type: "text", placeholder: "Change in Nabz quality" },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Objective change — joint swelling, skin, respiratory" },
        { key: "labs", label: "Lab Results Today", type: "text", placeholder: "e.g. HbA1c 6.8% (down from 7.2%)" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment (Tashkhees-e-Jadeed)",
      fields: [
        { key: "response", label: "Response to Ilaj", type: "select", options: [{ label: "Marked improvement", value: "Marked" }, { label: "Mild improvement", value: "Mild" }, { label: "No change", value: "None" }, { label: "Deterioration", value: "Worse" }] },
        { key: "mizajShift", label: "Mizaj Shift", type: "text", placeholder: "e.g. Balghami → closer to Damvi" },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Progress toward Taadeel-e-Mizaj, need for Tanqia vs Taqwiyat" },
      ],
    },
    {
      key: "plan",
      label: "Plan (Ilaj ka Aghaz / Tabdeeli)",
      fields: [
        { key: "modification", label: "Ilaj Modification", type: "textarea", rows: 2, placeholder: "Continue same, change drug/dose/form, add Ilaj bil Tadbeer, switch to Taqwiyat phase" },
        { key: "nextIlaj", label: "Next Ilaj / Procedure", type: "text", placeholder: "e.g. Hijama next session, Fasd planned" },
        { key: "advice", label: "Tadbeer-o-Nasihat Adjustment", type: "textarea", rows: 1, placeholder: "Modify diet, exercise, sleep per current Mizaj" },
        { key: "nextVisit", label: "Next Visit (Doobara Muaaina)", type: "text", placeholder: "e.g. 15 days, 1 month" },
      ],
    },
  ],
  metadata: {
    description: "Structured Unani follow-up note with Mizaj reassessment, treatment response, and Ilaj adjustment",
    specialties: ["Unani"],
    status: "active",
  },
};


// ── AYUSH — Siddha ────────────────────────────────────────────────────────────

export const SIDDHA_CONSULT_TEMPLATE: TemplateDefinition = {
  id: "siddha-consult",
  name: "Siddha Consult",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective",
      fields: [
        { key: "chiefComplaint", label: "Chief Complaint (Mukiya Muraiyadai)", type: "textarea", required: true, rows: 2, placeholder: "e.g. Joint pain (Keel Vaatham), cough/asthma (Eraippu Irumal/Eiyal), skin disease (Kutta noi/Sori), diabetes (Madhumegam), hypertension (Ratha Aduppu), digestive issues (Agnimandhyam/Mandapittam), menstrual disorders (Mudalai noigal), fever (Suram)" },
        { key: "duration", label: "Duration (Kaalam)", type: "text" },
        { key: "historyOfIllness", label: "History of Present Illness (Noi Varalaru)", type: "textarea", rows: 3, placeholder: "Onset, progression, aggravating factors (Kaalam/Them/Sevvaai), relieving factors, prior treatment" },
        { key: "dietHistory", label: "Diet History (Unavu)", type: "textarea", rows: 2, placeholder: "Food type, quantity, timings, preferences, spicy/sour/sweet tastes (Suvaigal)" },
        { key: "bowelBladder", label: "Bowel & Bladder (Malam / Neer)", type: "textarea", rows: 1, placeholder: "Bowel/urine frequency, consistency, color" },
        { key: "sleep", label: "Sleep (Urakkam)", type: "text", placeholder: "e.g. Sound, disturbed, insomnia" },
        { key: "pastMedicalHistory", label: "Past Medical History (Mundiya Noi)", type: "textarea", rows: 2, placeholder: "Chronic diseases, surgeries, prior Siddha treatment" },
        { key: "medications", label: "Current Medications (Marunthu)", type: "textarea", rows: 1, placeholder: "e.g. Amukkara Chooranam, allopathic medicines" },
      ],
    },
    {
      key: "objective",
      label: "Objective",
      fields: [
        {
          key: "vitals", label: "Vitals", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Naadi (Pulse)", type: "text", placeholder: "Vatha/Pitha/Kapha naadi — type, quality, rate" },
            { key: "weight", label: "Weight (kg)", type: "number", min: 0, max: 500 },
            { key: "temp", label: "Temp", type: "number", min: 30, max: 45 },
          ],
        },
        { key: "generalExam", label: "General Exam (Udal Korvai)", type: "textarea", rows: 2, placeholder: "Udal (body), Niram (colour), Mozhi (voice), Vizhi (eyes), Malam (stool), Neer (urine), Naakku (tongue)" },
        { key: "siddhaPariksha", label: "Siddha Pariksha — Ennvagai Thervugal", type: "textarea", rows: 3, placeholder: "1. Naadi (pulse), 2. Sparisam (touch), 3. Naa (tongue), 4. Niram (colour), 5. Mozhi (voice), 6. Vizhi (eyes), 7. Malam (stool), 8. Neer (urine)" },
        { key: "systemicExam", label: "Systemic / Regional Exam", type: "textarea", rows: 2, placeholder: "Focused exam per complaint" },
        { key: "labs", label: "Lab / Imaging Results", type: "text", placeholder: "CBC, HbA1c, TSH, X-ray" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment (Noi Mudhal / Noi Iyal)",  
      fields: [
        { key: "diagnosis", label: "Siddha Diagnosis (Noi)", type: "text", required: true, placeholder: "e.g. Keel Vaatham (Osteoarthritis), Suram (Fever), Madhumegam (DM), Kutta Noi (Scabies), Eraippu Irumal (Bronchial asthma), Vatha Pitham (HTN)" },
        { key: "mukkutram", label: "Mukkutram (Three Humours) Assessment", type: "text", placeholder: "e.g. Vatha predominance, Pitha derangement, Kapha+Kaba imbalance" },
        { key: "thegi", label: "Thegi (Body Constitution)", type: "select", options: [{ label: "Vatha Thegi", value: "Vatha" }, { label: "Pitha Thegi", value: "Pitha" }, { label: "Kapha Thegi", value: "Kapha" }, { label: "Thontha Thegi (mixed)", value: "Mixed" }] },
        { key: "modernDiagnosis", label: "Modern Correlation", type: "text", placeholder: "OA knee, Type 2 DM, Bronchial asthma" },
        { key: "icdCode", label: "ICD-10 Code", type: "text" },
      ],
    },
    {
      key: "plan",  
      label: "Plan (Maruthuvam / Sikichai)",
      fields: [
        { key: "treatmentPrinciple", label: "Treatment Principle (Sikichai Muraimai)", type: "textarea", rows: 2, placeholder: "Vatha samanam (pacify Vatha) + internal/external medicine, Pitha reduction, Kapha elimination, Muppini (three faults) correction" },
        { key: "internal", label: "Internal Medicine (Akkam Marunthu)", type: "textarea", rows: 2, placeholder: "e.g. Amukkara Chooranam, Linga Chenduram, Parangipattai Chooranam, Seenthil Chooranam, Nellikai Leghyam, Mathanai Mathirai, Yoga therapies" },
        { key: "external", label: "External Medicine (Puram Marunthu)", type: "textarea", rows: 2, placeholder: "Thailam (oil) application, Kattu (bandage/poultice), Podi (powder), Pugai (fumigation), Kuzhambu (paste), Vethu (heat therapy), Kollai (leech therapy), Otturam (steam)" },
        {
          key: "medications", label: "Prescribed Siddha Medicines", type: "repeating", fields: [
            { key: "medicine", label: "Medicine", type: "text", placeholder: "e.g. Linga Chenduram" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "anupanam", label: "Anupanam (Vehicle)", type: "text", placeholder: "Honey, ghee, milk, warm water" },
            { key: "duration", label: "Duration", type: "text" },
          ],
        },
        { key: "diet", label: "Pathiyam (Diet / Regimen)", type: "textarea", rows: 2, placeholder: "Pathiyam: specific foods per humour. Avoid: opposite tastes/qualities. Include: six tastes (aru suvai) balancing" },
        { key: "lifestyle", label: "Vazhakka (Lifestyle)", type: "textarea", rows: 1, placeholder: "Yoga, breathing, daily routine, oil massage (Thokkanam), steam bath" },
        { key: "referrals", label: "Referrals", type: "textarea", rows: 1, placeholder: "Siddha specialist, physiotherapy, yoga therapist" },
        { key: "followUp", label: "Follow-up (Maruthuvam Naatkal)", type: "text", placeholder: "e.g. 15 days, 1 month, 48-day treatment course" },
      ],
    },
  ],
  metadata: {
    description: "Comprehensive Siddha consultation note — Ennvagai Thervugal (8-fold exam), Mukkutram, Thegi assessment, internal/external medicine, Pathiyam, and lifestyle regimen",
    specialties: ["Siddha"],
    status: "active",
  },
};


export const SIDDHA_FOLLOWUP_TEMPLATE: TemplateDefinition = {
  id: "siddha-followup",
  name: "Siddha Follow-up",
  type: "SOAP",
  scope: "specialty",
  version: 1,
  sections: [
    {
      key: "subjective",
      label: "Subjective (Sikichai Mudhal)",
      fields: [
        { key: "intervalHistory", label: "Interval History / Treatment Response", type: "textarea", required: true, rows: 3, placeholder: "Symptom change, medicine compliance, diet (Pathiyam) adherence, new symptoms, Naadi/Mukkutram changes" },
        { key: "compliance", label: "Pathiyam / Medicine Compliance", type: "select", options: [{ label: "Good", value: "Good" }, { label: "Partial", value: "Partial" }, { label: "Poor", value: "Poor" }] },
      ],
    },
    {
      key: "objective",
      label: "Objective (Thervugal)",
      fields: [
        {
          key: "vitals", label: "Vitals / Naadi", type: "section", fields: [
            { key: "bp", label: "BP", type: "text" },
            { key: "pulse", label: "Naadi", type: "text", placeholder: "Change in Naadi pattern" },
          ],
        },
        { key: "exam", label: "Focused Exam", type: "textarea", rows: 2, placeholder: "Objective change in findings" },
      ],
    },
    {
      key: "assessment",
      label: "Assessment (Noi Nilamai)",
      fields: [
        { key: "response", label: "Response to Treatment", type: "select", options: [{ label: "Significant improvement", value: "Marked" }, { label: "Mild improvement", value: "Mild" }, { label: "No change", value: "None" }, { label: "Worsening", value: "Worse" }] },
        { key: "mukkutramStatus", label: "Current Mukkutram Status", type: "text", placeholder: "e.g. Vatha pacified, Pitha Prakopa reducing" },
        { key: "assessment", label: "Clinical Assessment", type: "textarea", required: true, rows: 2, placeholder: "Mukkutram progress, Pathiyam effect, next treatment phase" },
      ],
    },
    {
      key: "plan",
      label: "Plan (Sikichai Maatram)",
      fields: [
        { key: "modification", label: "Treatment Modification", type: "textarea", rows: 2, placeholder: "Continue/change internal/external medicines, add Thokkanam, adjust Pathiyam" },
        { key: "nextPhase", label: "Next Phase of Treatment", type: "text", placeholder: "e.g. Start Virechanam (purgation), add Varmam therapy" },
        { key: "pathiyamUpdate", label: "Pathiyam / Diet Update", type: "textarea", rows: 1, placeholder: "Modify diet per current Mukkutram" },
        { key: "nextVisit", label: "Next Visit", type: "text", placeholder: "e.g. 15 days, 1 month" },
      ],
    },
  ],
  metadata: {
    description: "Structured Siddha follow-up note with Naadi reassessment, Mukkutram status, Pathiyam compliance, and treatment modification",
    specialties: ["Siddha"],
    status: "active",
  },
};
