// ── PRD 1.6 §3.5 — Package Billing ─────────────────────────────────────────────

export interface PackageIncludedItem {
  serviceCode: string;
  description: string;
  qty: number;
}

export interface PackageDefinition {
  id: string;
  name: string;
  description: string;
  specialty: string[];
  category: "Maternity" | "Surgery" | "Dialysis" | "HealthCheck" | "Chemo";
  price: number;
  items: PackageIncludedItem[];
  exclusions: string[];
  validityDays: number;
}

export const PACKAGES: PackageDefinition[] = [
  {
    id: "PKG-MAT-NVD",
    name: "Maternity Package — Normal Delivery",
    description: "Includes normal vaginal delivery, 3 days maternity bed, post-natal labs, and neonatal check",
    specialty: ["OBG"],
    category: "Maternity",
    price: 35000,
    validityDays: 1,
    exclusions: ["Epidural analgesia", "Caesarean conversion", "NICU care", "Additional days beyond 3"],
    items: [
      { serviceCode: "PROC-NVD", description: "Normal Vaginal Delivery", qty: 1 },
      { serviceCode: "BED-MAT", description: "Maternity Bed (3 days)", qty: 3 },
      { serviceCode: "CONS-IPD", description: "Consultant IPD Visit (3 days)", qty: 3 },
      { serviceCode: "LAB-CBC", description: "CBC", qty: 2 },
      { serviceCode: "PROC-ANES", description: "Anaesthesia Standby", qty: 1 },
    ],
  },
  {
    id: "PKG-SURG-APPY",
    name: "Surgery Package — Laparoscopic Appendicectomy",
    description: "Includes laparoscopic appendicectomy, 3 days surgical ward, anaesthesia, and post-op meds",
    specialty: ["Surgery"],
    category: "Surgery",
    price: 45000,
    validityDays: 1,
    exclusions: ["ICU stay", "Blood transfusion", "Histopathology if outside", "Additional days beyond 3"],
    items: [
      { serviceCode: "PROC-APPY", description: "Laparoscopic Appendicectomy", qty: 1 },
      { serviceCode: "PROC-ANES", description: "Anaesthesia Charges", qty: 1 },
      { serviceCode: "BED-SURG", description: "Surgical Ward (3 days)", qty: 3 },
      { serviceCode: "CONS-IPD", description: "Consultant IPD Visit (3 days)", qty: 3 },
    ],
  },
  {
    id: "PKG-SURG-CHOLE",
    name: "Surgery Package — Laparoscopic Cholecystectomy",
    description: "Includes laparoscopic cholecystectomy, 3 days surgical ward, anaesthesia, post-op labs",
    specialty: ["Surgery"],
    category: "Surgery",
    price: 55000,
    validityDays: 1,
    exclusions: ["ERCP", "ICU stay", "Additional days beyond 3"],
    items: [
      { serviceCode: "PROC-CHOLE", description: "Laparoscopic Cholecystectomy", qty: 1 },
      { serviceCode: "PROC-ANES", description: "Anaesthesia Charges", qty: 1 },
      { serviceCode: "BED-SURG", description: "Surgical Ward (3 days)", qty: 3 },
      { serviceCode: "CONS-IPD", description: "Consultant IPD Visit (3 days)", qty: 3 },
      { serviceCode: "LAB-LFT", description: "Liver Function Test", qty: 1 },
    ],
  },
  {
    id: "PKG-DIALYSIS",
    name: "Dialysis Session Package",
    description: "Single dialysis session including consumables, nursing, and nephrologist review",
    specialty: ["Nephrology"],
    category: "Dialysis",
    price: 3500,
    validityDays: 1,
    exclusions: ["Emergency dialysis", "Vascular access procedures", "Blood transfusion"],
    items: [
      { serviceCode: "PKG-DIALYSIS", description: "Dialysis Session", qty: 1 },
    ],
  },
  {
    id: "PKG-CHECKUP",
    name: "Comprehensive Health Check Package",
    description: "Full health screening including CBC, KFT, LFT, lipid profile, ECG, chest X-ray, physician consult",
    specialty: ["General Medicine"],
    category: "HealthCheck",
    price: 5000,
    validityDays: 90,
    exclusions: ["Specialist referral", "Advanced imaging (CT/MRI)", "Vaccinations"],
    items: [
      { serviceCode: "CONS-GEN", description: "Physician Consultation", qty: 1 },
      { serviceCode: "LAB-CBC", description: "CBC", qty: 1 },
      { serviceCode: "LAB-KFT", description: "KFT", qty: 1 },
      { serviceCode: "LAB-LFT", description: "LFT", qty: 1 },
      { serviceCode: "IMG-ECG", description: "ECG", qty: 1 },
      { serviceCode: "IMG-CXR", description: "Chest X-Ray", qty: 1 },
    ],
  },
];

export function getPackage(id: string): PackageDefinition | undefined {
  return PACKAGES.find((p) => p.id === id);
}

export function getPackagesBySpecialty(specialty: string): PackageDefinition[] {
  return PACKAGES.filter((p) => p.specialty.some((s) => s.toLowerCase() === specialty.toLowerCase()));
}
