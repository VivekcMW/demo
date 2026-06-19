import { create } from "zustand";

export type EchoValveLesion = "Normal" | "Mild" | "Moderate" | "Severe" | "Not Visualized";

export interface EchoReport {
  id: string; patientId: string; patientName: string; date: string; sonographer: string;
  lvidD: number; lvidS: number; ivsd: number; pwd: number;
  lvef: number; lvefMethod: "Simpson's Biplane" | "Teichholz" | "Visual Estimate";
  laVolume: number; laVolumeIndexed: number; rvid: number; tapse: number; raPressure: string;
  aorticValve: EchoValveLesion; mitralValve: EchoValveLesion; tricuspidValve: EchoValveLesion; pulmonicValve: EchoValveLesion;
  aorticPeakGradient?: number; aorticMeanGradient?: number; aorticArea?: number;
  mitralPeakGradient?: number; mitralMeanGradient?: number; mitralArea?: number; mrJetArea?: number;
  tricuspidRegurgVelocity?: number; pAsp?: number; rvsp?: number;
  pericardialEffusion?: "None" | "Trivial" | "Small" | "Moderate" | "Large" | "Tamponade Physiology";
  wallMotion: "Normal" | "Regional Wall Motion Abnormality" | "Global Hypokinesia" | "Akinesia";
  conclusion: string; recommendations?: string;
}

export interface StressTest {
  id: string; patientId: string; patientName: string; date: string;
  protocol: "Bruce" | "Modified Bruce" | "Naughton" | "Dobutamine" | "Adenosine" | "None (submaximal)";
  duration: number; // seconds
  maxHr: number; targetHr: number; achievedPct: number;
  restingBP: string; maxBP: string;
  restingEcg: string; ecgResponse: "Normal" | "ST Depression < 1mm" | "ST Depression 1-2mm" | "ST Depression > 2mm" | "ST Elevation" | "Non-diagnostic";
  arrhythmias?: string;
  symptoms?: string;
  dukeTreadmillScore?: number;
  conclusion: string;
  functionalCapacity: "Excellent" | "Good" | "Fair" | "Poor" | "Very Poor";
}

const seedEcho: EchoReport[] = [
  { id: "ECHO-001", patientId: "PT-0002", patientName: "Priya Venkatesh", date: "2026-06-08", sonographer: "Dr. Karthik Rajan",
    lvidD: 5.2, lvidS: 3.8, ivsd: 1.1, pwd: 1.0, lvef: 48, lvefMethod: "Simpson's Biplane",
    laVolume: 42, laVolumeIndexed: 24, rvid: 2.5, tapse: 18, raPressure: "8-10 mmHg",
    aorticValve: "Normal", mitralValve: "Mild", tricuspidValve: "Normal", pulmonicValve: "Normal",
    mitralPeakGradient: 6, mitralMeanGradient: 3, mrJetArea: 4.2,
    pericardialEffusion: "None", wallMotion: "Regional Wall Motion Abnormality",
    conclusion: "Mildly dilated LV with borderline EF (48%). Inferior wall hypokinesia. Mild MR. Grade I diastolic dysfunction.",
    recommendations: "Optimize GDMT. Repeat echo in 3-6 months. Consider cardiac MRI for viability assessment." },
  { id: "ECHO-002", patientId: "PT-0005", patientName: "Meera Lakshmi Iyer", date: "2026-06-12", sonographer: "Dr. Karthik Rajan",
    lvidD: 4.0, lvidS: 2.4, ivsd: 0.9, pwd: 0.8, lvef: 65, lvefMethod: "Teichholz",
    laVolume: 28, laVolumeIndexed: 16, rvid: 2.0, tapse: 24, raPressure: "3-5 mmHg",
    aorticValve: "Normal", mitralValve: "Normal", tricuspidValve: "Normal", pulmonicValve: "Normal",
    pericardialEffusion: "None", wallMotion: "Normal",
    conclusion: "Normal LV size and systolic function (EF 65%). Normal valves. No RWMA. Normal diastolic function.",
    recommendations: "No echo follow-up needed unless symptomatic." },
];

const seedStress: StressTest[] = [
  { id: "STRESS-001", patientId: "PT-0002", patientName: "Priya Venkatesh", date: "2026-06-10",
    protocol: "Bruce", duration: 480, maxHr: 152, targetHr: 164, achievedPct: 93,
    restingBP: "128/82", maxBP: "168/76", restingEcg: "NSR, LVH by voltage", ecgResponse: "ST Depression 1-2mm",
    arrhythmias: "Isolated PVCs during recovery", symptoms: "Fatigue, mild chest tightness at peak",
    dukeTreadmillScore: +2, conclusion: "Positive stress test (moderate risk). ST depression in V4-V6 at peak. Duke score +2 (moderate risk). Refer for coronary angiogram.",
    functionalCapacity: "Good" },
];

interface CardiologyStore {
  echoReports: EchoReport[];
  stressTests: StressTest[];
  addEcho: (r: Omit<EchoReport, "id">) => EchoReport;
  addStress: (r: Omit<StressTest, "id">) => StressTest;
}

export const useCardiologyStore = create<CardiologyStore>((set) => ({
  echoReports: seedEcho, stressTests: seedStress,
  addEcho(r) { const id = `ECHO-${String(seedEcho.length + 1).padStart(3, "0")}`; const rec: EchoReport = { id, ...r }; set((s) => ({ echoReports: [...s.echoReports, rec] })); return rec; },
  addStress(r) { const id = `STRESS-${String(seedStress.length + 1).padStart(3, "0")}`; const rec: StressTest = { id, ...r }; set((s) => ({ stressTests: [...s.stressTests, rec] })); return rec; },
}));
