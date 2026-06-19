export type InteractionSeverity = "Contraindicated" | "Major" | "Moderate" | "Minor";
export type InteractionEvidence = "Established" | "Probable" | "Suspected" | "Theoretical";

export interface DrugInteraction {
  drugA: string;
  drugB: string;
  severity: InteractionSeverity;
  evidence: InteractionEvidence;
  mechanism: string;
  effect: string;
  recommendation: string;
  category: string;
}

const RAW_INTERACTIONS: DrugInteraction[] = [
  // ── Anticoagulants / Antiplatelets ─────────────────────────────────────────
  { drugA: "Aspirin", drugB: "Warfarin", severity: "Major", evidence: "Established", mechanism: "Synergistic anticoagulation + GI mucosal injury", effect: "Significantly increased bleeding risk (gastrointestinal, intracranial)", recommendation: "Avoid combination if possible. If necessary, monitor INR closely, use PPI for gastric protection.", category: "Anticoagulant" },
  { drugA: "Aspirin", drugB: "Clopidogrel", severity: "Major", evidence: "Established", mechanism: "Dual antiplatelet synergy", effect: "Increased bleeding risk (2-3x vs monotherapy)", recommendation: "Use only when indicated (ACS, recent stent). Shortest duration necessary. Monitor for bleeding.", category: "Anticoagulant" },
  { drugA: "Aspirin", drugB: "Prednisolone", severity: "Moderate", evidence: "Established", mechanism: "Additive GI mucosal injury + reduced prostaglandin synthesis", effect: "Increased risk of GI bleeding and ulceration", recommendation: "Add PPI (pantoprazole/omeprazole) for gastric protection. Monitor for GI bleeding.", category: "Anticoagulant" },
  { drugA: "Aspirin", drugB: "Ibuprofen", severity: "Moderate", evidence: "Established", mechanism: "Competitive inhibition of COX-1; ibuprofen blocks aspirin's binding site", effect: "Reduced cardioprotective effect of aspirin + increased GI bleeding risk", recommendation: "Take aspirin 30 min before ibuprofen. Consider alternative NSAID (naproxen) or GI protection.", category: "Anticoagulant" },
  { drugA: "Aspirin", drugB: "Metoprolol", severity: "Minor", evidence: "Suspected", mechanism: "Aspirin may reduce hypotensive effect of beta-blockers via prostaglandin inhibition", effect: "Slightly reduced antihypertensive efficacy of beta-blockers", recommendation: "Monitor BP if high-dose aspirin initiated. Usually not clinically significant.", category: "Anticoagulant" },
  { drugA: "Aspirin", drugB: "Furosemide", severity: "Moderate", evidence: "Probable", mechanism: "Competition for renal tubular secretion + NSAID-induced sodium retention", effect: "Reduced diuretic and antihypertensive efficacy of furosemide", recommendation: "Monitor for reduced diuretic response. May need furosemide dose adjustment.", category: "Anticoagulant" },
  { drugA: "Aspirin", drugB: "Losartan", severity: "Moderate", evidence: "Probable", mechanism: "NSAID-induced sodium retention and prostaglandin inhibition", effect: "Reduced antihypertensive effect of losartan. Increased risk of renal impairment in volume-depleted patients.", recommendation: "Monitor BP and renal function. Use lowest effective aspirin dose.", category: "Anticoagulant" },
  { drugA: "Warfarin", drugB: "Amoxicillin", severity: "Moderate", evidence: "Established", mechanism: "Antibiotic reduces gut flora producing vitamin K; possible protein binding displacement", effect: "Increased INR and bleeding risk within 3-7 days of antibiotic initiation", recommendation: "Monitor INR closely (every 2-3 days) during antibiotic course. Adjust warfarin dose as needed.", category: "Anticoagulant" },
  { drugA: "Warfarin", drugB: "Azithromycin", severity: "Moderate", evidence: "Probable", mechanism: "Macrolide antibiotic inhibits CYP3A4 metabolism of warfarin", effect: "Increased INR and bleeding risk", recommendation: "Monitor INR during and 1 week after therapy. Consider warfarin dose reduction.", category: "Anticoagulant" },
  { drugA: "Warfarin", drugB: "Omeprazole", severity: "Moderate", evidence: "Probable", mechanism: "Omeprazole inhibits CYP2C19 (minor pathway for S-warfarin metabolism)", effect: "Modest increase in INR. Pantoprazole has lower interaction risk.", recommendation: "Consider pantoprazole instead of omeprazole if prolonged PPI therapy needed. Monitor INR.", category: "Anticoagulant" },
  { drugA: "Warfarin", drugB: "Prednisolone", severity: "Moderate", evidence: "Probable", mechanism: "Corticosteroids affect clotting factor synthesis and GI mucosal integrity", effect: "Increased bleeding risk (GI) plus possible altered INR", recommendation: "Use PPI for GI protection. Monitor INR during steroid initiation and taper.", category: "Anticoagulant" },
  { drugA: "Warfarin", drugB: "Ceftriaxone", severity: "Minor", evidence: "Suspected", mechanism: "Ceftriaxone may reduce vitamin K production by gut flora", effect: "Possible slight INR elevation", recommendation: "Monitor INR in prolonged therapy (>7 days). Usually not clinically significant.", category: "Anticoagulant" },
  { drugA: "Clopidogrel", drugB: "Omeprazole", severity: "Moderate", evidence: "Established", mechanism: "Inhibition of CYP2C19 reduces conversion of clopidogrel to active metabolite", effect: "Reduced antiplatelet effect of clopidogrel. Increased risk of cardiovascular events.", recommendation: "Avoid omeprazole. Use pantoprazole or ranitidine as alternative.", category: "Anticoagulant" },

  // ── Diabetes ───────────────────────────────────────────────────────────────
  { drugA: "Metformin", drugB: "Glimepiride", severity: "Moderate", evidence: "Established", mechanism: "Additive hypoglycemic effect (different mechanisms: AMPK activation vs insulin secretagogue)", effect: "Increased risk of hypoglycemia, especially when initiating", recommendation: "Start with lower doses of glimepiride (1 mg). Monitor blood glucose frequently. Educate on hypoglycemia symptoms.", category: "Diabetes" },
  { drugA: "Metformin", drugB: "Furosemide", severity: "Moderate", evidence: "Established", mechanism: "Competition for renal tubular secretion via organic cation transporter (OCT)", effect: "Increased metformin plasma levels (up to 40%) → risk of lactic acidosis", recommendation: "Monitor renal function and metformin levels. Reduce metformin dose if eGFR < 60.", category: "Diabetes" },
  { drugA: "Metformin", drugB: "Prednisolone", severity: "Moderate", evidence: "Established", mechanism: "Corticosteroids induce gluconeogenesis and reduce insulin sensitivity", effect: "Reduced glycemic control; significant hyperglycemia possible", recommendation: "Monitor blood glucose intensively during steroid therapy. May need to increase antidiabetic doses.", category: "Diabetes" },
  { drugA: "Metformin", drugB: "Losartan", severity: "Minor", evidence: "Suspected", mechanism: "Possible complementary effects on insulin sensitivity", effect: "Minor increased risk of hypoglycemia (may actually be beneficial)", recommendation: "Monitor blood glucose when starting/stopping losartan. Usually well-tolerated.", category: "Diabetes" },
  { drugA: "Metformin", drugB: "Metoprolol", severity: "Minor", evidence: "Theoretical", mechanism: "Beta-blockers can mask hypoglycemia symptoms (tachycardia, palpitations)", effect: "Hypoglycemia warning signs masked. Delayed recognition of hypoglycemia.", recommendation: "Educate patient to monitor for non-adrenergic hypoglycemia symptoms (sweating, confusion).", category: "Diabetes" },
  { drugA: "Glimepiride", drugB: "Prednisolone", severity: "Moderate", evidence: "Established", mechanism: "Counter-insular effect of steroids increases insulin resistance", effect: "Reduced hypoglycemic efficacy of glimepiride; hyperglycemia", recommendation: "Increase antidiabetic doses during steroid therapy. Consider insulin if sugars uncontrolled.", category: "Diabetes" },
  { drugA: "Glimepiride", drugB: "Metoprolol", severity: "Minor", evidence: "Probable", mechanism: "Beta-blockers mask hypoglycemia symptoms (beta-adrenergic)", effect: "Hypoglycemia symptoms (tremor, palpitations) masked. Sweating not masked.", recommendation: "Educate patient to monitor for diaphoresis, confusion, hunger as hypoglycemia indicators.", category: "Diabetes" },

  // ── Cardiovascular ─────────────────────────────────────────────────────────
  { drugA: "Amlodipine", drugB: "Metoprolol", severity: "Moderate", evidence: "Established", mechanism: "Synergistic negative chronotropic/vasodilatory effects", effect: "Additive BP and heart rate reduction. Risk of bradycardia and hypotension.", recommendation: "Monitor BP and HR. Start with lower doses if combining. Avoid in heart block or severe bradycardia.", category: "Cardiovascular" },
  { drugA: "Amlodipine", drugB: "Losartan", severity: "Moderate", evidence: "Established", mechanism: "Additive vasodilation via calcium channel blockade + AT1 receptor blockade", effect: "Enhanced BP reduction. Increased risk of hypotension (especially elderly).", recommendation: "Monitor BP closely. Start at lower doses. Caution in volume-depleted patients.", category: "Cardiovascular" },
  { drugA: "Amlodipine", drugB: "Furosemide", severity: "Moderate", evidence: "Probable", mechanism: "Additive vasodilation and volume reduction", effect: "Increased risk of hypotension and orthostatic hypotension", recommendation: "Monitor BP, especially on initiation. Advise patient to rise slowly from sitting/lying position.", category: "Cardiovascular" },
  { drugA: "Losartan", drugB: "Furosemide", severity: "Moderate", evidence: "Established", mechanism: "Combined RAAS blockade + diuretic-induced volume depletion", effect: "Significant hypotension risk, especially first dose. Hyperkalemia risk.", recommendation: "Monitor BP, renal function, and K+ within 1-2 weeks. Caution in renal artery stenosis.", category: "Cardiovascular" },
  { drugA: "Losartan", drugB: "Metoprolol", severity: "Moderate", evidence: "Established", mechanism: "Additive BP reduction via RAAS blockade + beta-blockade", effect: "Enhanced antihypertensive effect. Risk of bradycardia and hypotension.", recommendation: "Monitor BP and HR. Useful combination for resistant hypertension. Avoid in heart block.", category: "Cardiovascular" },
  { drugA: "Losartan", drugB: "Aspirin", severity: "Moderate", evidence: "Probable", mechanism: "Aspirin reduces vasodilatory prostaglandins; may attenuate RAAS blockade", effect: "Reduced antihypertensive efficacy of losartan. Increased renal risk in volume-depletion.", recommendation: "Monitor BP and renal function. Use lowest effective aspirin dose.", category: "Cardiovascular" },
  { drugA: "Metoprolol", drugB: "Furosemide", severity: "Minor", evidence: "Probable", mechanism: "Additive BP reduction through different mechanisms", effect: "Enhanced BP reduction. Possible orthostatic hypotension.", recommendation: "Monitor BP. Usually a therapeutic combination in hypertension with volume overload.", category: "Cardiovascular" },
  { drugA: "Atorvastatin", drugB: "Amlodipine", severity: "Moderate", evidence: "Established", mechanism: "Amlodipine inhibits CYP3A4, reducing atorvastatin metabolism", effect: "Increased atorvastatin plasma levels (50-60%), higher myopathy risk", recommendation: "Monitor for muscle pain/tenderness. Max atorvastatin dose 20 mg if combined with amlodipine.", category: "Cardiovascular" },
  { drugA: "Atorvastatin", drugB: "Azithromycin", severity: "Moderate", evidence: "Probable", mechanism: "Azithromycin may increase statin exposure via transporter inhibition", effect: "Increased risk of myopathy/rhabdomyolysis", recommendation: "Monitor for muscle symptoms. Consider statin hold during azithromycin course.", category: "Cardiovascular" },
  { drugA: "Atorvastatin", drugB: "Warfarin", severity: "Moderate", evidence: "Established", mechanism: "Atorvastatin potentiates warfarin effect via CYP inhibition", effect: "Increased INR and bleeding risk", recommendation: "Monitor INR within 1 week of starting/changing atorvastatin dose. Adjust warfarin as needed.", category: "Cardiovascular" },
  { drugA: "Atorvastatin", drugB: "Prednisolone", severity: "Minor", evidence: "Suspected", mechanism: "Corticosteroids may affect lipid metabolism and statin clearance", effect: "Possible reduced statin efficacy. May need dose adjustment.", recommendation: "Monitor lipid profile during steroid therapy. Dose adjustment rarely needed.", category: "Cardiovascular" },

  // ── Anti-infectives ───────────────────────────────────────────────────────
  { drugA: "Amoxicillin", drugB: "Allopurinol", severity: "Moderate", evidence: "Established", mechanism: "Unknown mechanism; possible immune-mediated", effect: "Increased risk of maculopapular rash (up to 20% vs 2-4% normally)", recommendation: "Use alternative antibiotic (cephalexin, azithromycin) if possible. If rash develops, discontinue both.", category: "Anti-infective" },
  { drugA: "Amoxicillin", drugB: "Methotrexate", severity: "Major", evidence: "Established", mechanism: "Penicillins reduce renal tubular secretion of methotrexate", effect: "Significantly increased methotrexate levels → bone marrow suppression, hepatotoxicity", recommendation: "Avoid combination. If unavoidable, monitor methotrexate levels daily, consider leucovorin rescue.", category: "Anti-infective" },
  { drugA: "Azithromycin", drugB: "Ondansetron", severity: "Moderate", evidence: "Probable", mechanism: "Both prolong QT interval via hERG channel blockade", effect: "Increased risk of torsades de pointes and cardiac arrhythmias", recommendation: "Avoid combination in patients with baseline QT prolongation, hypokalemia, or on other QT-prolonging drugs.", category: "Anti-infective" },
  { drugA: "Azithromycin", drugB: "Furosemide", severity: "Minor", evidence: "Probable", mechanism: "Furosemide-induced hypokalemia increases QT prolongation risk from azithromycin", effect: "Increased cardiac arrhythmia risk if hypokalemia develops", recommendation: "Monitor serum K+ during concurrent use. Correct hypokalemia promptly.", category: "Anti-infective" },

  // ── GI / PPIs ──────────────────────────────────────────────────────────────
  { drugA: "Omeprazole", drugB: "Clopidogrel", severity: "Moderate", evidence: "Established", mechanism: "Omeprazole inhibits CYP2C19 (required for clopidogrel activation)", effect: "Reduced antiplatelet effect of clopidogrel. Increased cardiovascular event risk.", recommendation: "Avoid combination. Use pantoprazole instead (lower CYP2C19 inhibition).", category: "Gastrointestinal" },
  { drugA: "Omeprazole", drugB: "Ceftriaxone", severity: "Minor", evidence: "Theoretical", mechanism: "PPI raises gastric pH, ceftriaxone absorption unaffected (IV)", effect: "No significant interaction with IV ceftriaxone. Oral cephalosporins may have reduced absorption.", recommendation: "Route-dependent interaction. IV ceftriaxone unaffected. Acceptable combination.", category: "Gastrointestinal" },
  { drugA: "Pantoprazole", drugB: "Warfarin", severity: "Minor", evidence: "Suspected", mechanism: "Weak CYP2C19 inhibition (much less than omeprazole)", effect: "Minimal INR effect. Safer than omeprazole with warfarin.", recommendation: "Monitor INR. Lower interaction risk compared to omeprazole.", category: "Gastrointestinal" },

  // ── CNS / Psychiatric ──────────────────────────────────────────────────────
  { drugA: "Clonazepam", drugB: "Metoprolol", severity: "Moderate", evidence: "Probable", mechanism: "Additive CNS depression and cardiovascular effects", effect: "Enhanced sedation, dizziness. Potential for excessive bradycardia.", recommendation: "Caution with driving/operating machinery. Start with lowest doses. Monitor HR.", category: "CNS / Psychiatric" },
  { drugA: "Clonazepam", drugB: "Omeprazole", severity: "Minor", evidence: "Suspected", mechanism: "Omeprazole inhibits CYP3A4 (minor pathway for clonazepam metabolism)", effect: "Slight increase in clonazepam levels. Usually not clinically significant.", recommendation: "Monitor for excessive sedation. Dose adjustment rarely needed.", category: "CNS / Psychiatric" },

  // ── Hormones / Thyroid ─────────────────────────────────────────────────────
  { drugA: "Levothyroxine", drugB: "Metformin", severity: "Minor", evidence: "Suspected", mechanism: "Metformin may slightly reduce TSH in hypothyroid patients", effect: "Possible reduced TSH. May need levothyroxine dose reduction.", recommendation: "Monitor TSH 6-8 weeks after changing metformin dose. Usually beneficial.", category: "Endocrine" },
  { drugA: "Levothyroxine", drugB: "Prednisolone", severity: "Moderate", evidence: "Probable", mechanism: "Corticosteroids inhibit TSH secretion and peripheral T4-to-T3 conversion", effect: "Reduced efficacy of levothyroxine. May need increased dose.", recommendation: "Monitor TSH during steroid therapy. May need 25-50% levothyroxine dose increase.", category: "Endocrine" },
  { drugA: "Levothyroxine", drugB: "Losartan", severity: "Minor", evidence: "Theoretical", mechanism: "Possible protein-binding displacement", effect: "Minimal clinical effect. No dose adjustment typically needed.", recommendation: "Monitor TSH if symptoms of thyroid dysfunction develop. Usually safe.", category: "Endocrine" },

  // ── Respiratory ────────────────────────────────────────────────────────────
  { drugA: "Salbutamol", drugB: "Metoprolol", severity: "Moderate", evidence: "Established", mechanism: "Beta-blockers competitively antagonize beta-2 receptor bronchodilation", effect: "Reduced bronchodilator efficacy of salbutamol. May precipitate bronchospasm.", recommendation: "Use cardioselective beta-blockers with caution in asthmatics. Consider alternative antihypertensive.", category: "Respiratory" },
  { drugA: "Salbutamol", drugB: "Furosemide", severity: "Minor", evidence: "Probable", mechanism: "Beta-2 agonists can cause hypokalemia; furosemide also lowers K+", effect: "Increased risk of hypokalemia (additive effect)", recommendation: "Monitor serum K+ in patients on high-dose salbutamol + diuretics.", category: "Respiratory" },
  { drugA: "Salbutamol", drugB: "Prednisolone", severity: "Minor", evidence: "Probable", mechanism: "Additive hyperglycemic effect", effect: "Increased blood glucose. Both drugs raise glucose via different mechanisms.", recommendation: "Monitor blood glucose, especially in diabetic patients. Acceptable combination for asthma/COPD.", category: "Respiratory" },

  // ── IV Fluids / Electrolytes ───────────────────────────────────────────────
  { drugA: "Ceftriaxone", drugB: "Calcium Gluconate", severity: "Contraindicated", evidence: "Established", mechanism: "Ceftriaxone precipitates with calcium ions forming insoluble crystals", effect: "Life-threatening pulmonary and renal ceftriaxone-calcium precipitates", recommendation: "DO NOT administer ceftriaxone and calcium-containing IV fluids within 48 hours of each other.", category: "IV Compatibility" },
  { drugA: "Furosemide", drugB: "Prednisolone", severity: "Moderate", evidence: "Probable", mechanism: "Both drugs can cause hypokalemia via different mechanisms", effect: "Increased risk of hypokalemia (additive potassium-wasting)", recommendation: "Monitor serum K+ levels. Consider K+ supplementation. Risk increases with higher doses.", category: "Electrolyte" },

  // ── Oncology (seeds) ──────────────────────────────────────────────────────
  { drugA: "Prednisolone", drugB: "Cyclophosphamide", severity: "Moderate", evidence: "Established", mechanism: "Prednisolone inhibits CYP metabolism of cyclophosphamide", effect: "Reduced activation of cyclophosphamide. Possible decreased efficacy.", recommendation: "Monitor clinical response. Dose adjustment may be needed. Typically used intentionally in protocols.", category: "Oncology" },
  { drugA: "Methotrexate", drugB: "Aspirin", severity: "Major", evidence: "Established", mechanism: "Aspirin displaces methotrexate from protein binding + reduces renal clearance", effect: "Severe methotrexate toxicity (myelosuppression, hepatotoxicity, nephrotoxicity)", recommendation: "AVOID combination. Use alternative analgesic (paracetamol) in patients on methotrexate.", category: "Oncology" },
  { drugA: "Methotrexate", drugB: "Omeprazole", severity: "Moderate", evidence: "Probable", mechanism: "Omeprazole inhibits renal tubular secretion of methotrexate", effect: "Increased and prolonged methotrexate levels → toxicity risk", recommendation: "Hold PPI during high-dose methotrexate therapy. Consider H2 blocker instead.", category: "Oncology" },
];

// ── Build lookup index ─────────────────────────────────────────────────────────

interface InteractionIndex {
  [drug: string]: { severity: InteractionSeverity; interactions: DrugInteraction[] };
}

function buildIndex(interactions: DrugInteraction[]): InteractionIndex {
  const idx: InteractionIndex = {};
  for (const i of interactions) {
    if (!idx[i.drugA]) idx[i.drugA] = { severity: "Minor", interactions: [] };
    if (!idx[i.drugB]) idx[i.drugB] = { severity: "Minor", interactions: [] };
    idx[i.drugA].interactions.push(i);
    idx[i.drugB].interactions.push(i);
    const sevRank = { "Contraindicated": 4, "Major": 3, "Moderate": 2, "Minor": 1 };
    if (sevRank[idx[i.drugA].severity] < sevRank[i.severity]) idx[i.drugA].severity = i.severity;
    if (sevRank[idx[i.drugB].severity] < sevRank[i.severity]) idx[i.drugB].severity = i.severity;
  }
  return idx;
}

export const INTERACTION_INDEX = buildIndex(RAW_INTERACTIONS);
export const INTERACTION_LIST = RAW_INTERACTIONS;

export function checkInteractions(drugs: string[]): DrugInteraction[] {
  const found: DrugInteraction[] = [];
  const visited = new Set<string>();
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const key = [drugs[i], drugs[j]].sort().join("::");
      if (visited.has(key)) continue;
      visited.add(key);
      const match = RAW_INTERACTIONS.find(
        (ix) => (ix.drugA === drugs[i] && ix.drugB === drugs[j]) || (ix.drugA === drugs[j] && ix.drugB === drugs[i]),
      );
      if (match) found.push(match);
    }
  }
  return found.sort((a, b) => {
    const rank = { "Contraindicated": 4, "Major": 3, "Moderate": 2, "Minor": 1 };
    return rank[b.severity] - rank[a.severity];
  });
}

export function getAllDrugNames(interactions: DrugInteraction[]): string[] {
  const names = new Set<string>();
  for (const i of interactions) { names.add(i.drugA); names.add(i.drugB); }
  return Array.from(names).sort();
}

export const ALL_INTERACTING_DRUGS = getAllDrugNames(RAW_INTERACTIONS);

// ── Seed patients on interacting drugs ─────────────────────────────────────────

export interface PatientDrugList {
  patientId: string;
  patientName: string;
  drugs: string[];
  description: string;
}

export const SEED_PATIENT_DRUGS: PatientDrugList[] = [
  { patientId: "PT-0001", patientName: "Anil Kumar Sharma", drugs: ["Metformin", "Glimepiride", "Aspirin", "Atorvastatin"], description: "Diabetic on dual therapy + primary prevention" },
  { patientId: "PT-0003", patientName: "Rajesh Narayan Pillai", drugs: ["Aspirin", "Atorvastatin", "Losartan", "Metoprolol"], description: "Post-MI with hypertension" },
  { patientId: "PT-0005", patientName: "Meera Lakshmi Iyer", drugs: ["Prednisolone", "Aspirin", "Omeprazole", "Metformin"], description: "Rheumatoid arthritis + diabetes" },
  { patientId: "PT-0007", patientName: "Mohan Lal", drugs: ["Warfarin", "Amoxicillin", "Paracetamol"], description: "Atrial fibrillation with infection" },
  { patientId: "PT-0008", patientName: "Sunita Devi Yadav", drugs: ["Ceftriaxone", "Ondansetron", "Pantoprazole", "Enoxaparin"], description: "Post-op infection prophylaxis" },
  { patientId: "PT-0015", patientName: "Deepa Venkataraman", drugs: ["Warfarin", "Azithromycin", "Prednisolone", "Furosemide"], description: "Post-stroke with pneumonia" },
];
