// ── PRD 1.6 §3.2 — Tariff Master ──────────────────────────────────────────────

export type PayerType = "Cash" | "Insurance" | "TPA" | "CGHS" | "ESIC" | "Ayushman" | "Corporate";

export interface TariffItem {
  id: string;
  serviceCode: string;
  description: string;
  category: "Consultation" | "Lab" | "Imaging" | "Procedure" | "Pharmacy" | "Bed" | "Nursing" | "Consumable" | "Therapy" | "Package";
  specialty: string[];
  defaultPrice: number;
  hsnSac: string;
  taxable: boolean;
  taxRate: number; // GST %
}

export interface PayerPriceOverride {
  payerType: PayerType;
  payerName?: string;
  price: number;
  coPayPercent?: number;
  requiresPreAuth: boolean;
  coverageCap?: number;
}

export interface ServiceWithPricing extends TariffItem {
  payerOverrides: PayerPriceOverride[];
}

export const TARIFF_ITEMS: ServiceWithPricing[] = [
  {
    id: "T-001", serviceCode: "CONS-GEN", description: "OPD Consultation — General Medicine",
    category: "Consultation", specialty: ["General Medicine"], defaultPrice: 500, hsnSac: "998311", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "CGHS", price: 300, requiresPreAuth: false },
      { payerType: "ESIC", price: 250, requiresPreAuth: false },
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 500 },
    ],
  },
  {
    id: "T-002", serviceCode: "CONS-SPEC", description: "OPD Consultation — Specialist",
    category: "Consultation", specialty: ["Cardiology", "Neurology", "Endocrinology"], defaultPrice: 800, hsnSac: "998311", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "CGHS", price: 500, requiresPreAuth: false },
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 800 },
    ],
  },
  {
    id: "T-003", serviceCode: "CONS-EMER", description: "Emergency Consultation",
    category: "Consultation", specialty: ["Emergency"], defaultPrice: 1000, hsnSac: "998311", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-004", serviceCode: "CONS-IPD", description: "IPD Daily Visit — Consultant",
    category: "Consultation", specialty: ["General Medicine", "Surgery"], defaultPrice: 600, hsnSac: "998311", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "CGHS", price: 350, requiresPreAuth: false },
    ],
  },
  {
    id: "T-005", serviceCode: "BED-GEN", description: "Bed Charge — General Ward (per day)",
    category: "Bed", specialty: ["General"], defaultPrice: 1200, hsnSac: "996313", taxable: false, taxRate: 0,
    payerOverrides: [
      { payerType: "CGHS", price: 800, requiresPreAuth: false },
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 1200 },
    ],
  },
  {
    id: "T-006", serviceCode: "BED-SEMI", description: "Bed Charge — Semi-Private (per day)",
    category: "Bed", specialty: ["General"], defaultPrice: 2500, hsnSac: "996313", taxable: false, taxRate: 0,
    payerOverrides: [],
  },
  {
    id: "T-007", serviceCode: "BED-PVT", description: "Bed Charge — Private (per day)",
    category: "Bed", specialty: ["General"], defaultPrice: 4500, hsnSac: "996313", taxable: false, taxRate: 0,
    payerOverrides: [],
  },
  {
    id: "T-008", serviceCode: "BED-ICU", description: "Bed Charge — ICU/HDU (per day)",
    category: "Bed", specialty: ["ICU", "Critical Care"], defaultPrice: 8000, hsnSac: "996313", taxable: false, taxRate: 0,
    payerOverrides: [
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 8000 },
    ],
  },
  {
    id: "T-009", serviceCode: "BED-MAT", description: "Bed Charge — Maternity (per day)",
    category: "Bed", specialty: ["OBG"], defaultPrice: 1800, hsnSac: "996313", taxable: false, taxRate: 0,
    payerOverrides: [
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 1800 },
    ],
  },
  {
    id: "T-010", serviceCode: "BED-SURG", description: "Bed Charge — Surgical Ward (per day)",
    category: "Bed", specialty: ["Surgery"], defaultPrice: 1200, hsnSac: "996313", taxable: false, taxRate: 0,
    payerOverrides: [],
  },
  {
    id: "T-011", serviceCode: "LAB-CBC", description: "Complete Blood Count (CBC)",
    category: "Lab", specialty: ["General"], defaultPrice: 350, hsnSac: "998214", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-012", serviceCode: "LAB-HBA1C", description: "HbA1c Test",
    category: "Lab", specialty: ["Endocrinology", "General Medicine"], defaultPrice: 350, hsnSac: "998214", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-013", serviceCode: "LAB-KFT", description: "Kidney Function Test (KFT)",
    category: "Lab", specialty: ["General", "Nephrology"], defaultPrice: 750, hsnSac: "998214", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-014", serviceCode: "LAB-LFT", description: "Liver Function Test (LFT)",
    category: "Lab", specialty: ["General", "Gastroenterology"], defaultPrice: 650, hsnSac: "998214", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-015", serviceCode: "LAB-TFT", description: "Thyroid Function Test (TFT)",
    category: "Lab", specialty: ["Endocrinology"], defaultPrice: 650, hsnSac: "998214", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-016", serviceCode: "LAB-BP", description: "Basic Metabolic Panel",
    category: "Lab", specialty: ["General"], defaultPrice: 450, hsnSac: "998214", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-017", serviceCode: "IMG-CXR", description: "Chest X-Ray PA View",
    category: "Imaging", specialty: ["General", "Pulmonology"], defaultPrice: 600, hsnSac: "998312", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-018", serviceCode: "IMG-ECG", description: "12-Lead ECG",
    category: "Imaging", specialty: ["Cardiology"], defaultPrice: 500, hsnSac: "998312", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-019", serviceCode: "IMG-ECHO", description: "2D Echo + Doppler",
    category: "Imaging", specialty: ["Cardiology"], defaultPrice: 2200, hsnSac: "998312", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-020", serviceCode: "IMG-HRCT", description: "HRCT Chest",
    category: "Imaging", specialty: ["Pulmonology"], defaultPrice: 4500, hsnSac: "998312", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-021", serviceCode: "IMG-USG", description: "Ultrasound Abdomen",
    category: "Imaging", specialty: ["General", "OBG"], defaultPrice: 1500, hsnSac: "998312", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-022", serviceCode: "IMG-CT", description: "CT Scan (plain)",
    category: "Imaging", specialty: ["General"], defaultPrice: 3500, hsnSac: "998312", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-023", serviceCode: "IMG-MRI", description: "MRI (one region)",
    category: "Imaging", specialty: ["General"], defaultPrice: 6500, hsnSac: "998312", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-024", serviceCode: "IMG-CTA", description: "CT Coronary Angiography",
    category: "Imaging", specialty: ["Cardiology"], defaultPrice: 8500, hsnSac: "998312", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-025", serviceCode: "PROC-APPY", description: "Appendicectomy — Laparoscopic",
    category: "Procedure", specialty: ["Surgery"], defaultPrice: 28000, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 28000 },
    ],
  },
  {
    id: "T-026", serviceCode: "PROC-CHOLE", description: "Laparoscopic Cholecystectomy",
    category: "Procedure", specialty: ["Surgery"], defaultPrice: 35000, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 35000 },
    ],
  },
  {
    id: "T-027", serviceCode: "PROC-LSCS", description: "Caesarean Section (LSCS)",
    category: "Procedure", specialty: ["OBG"], defaultPrice: 25000, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 25000 },
    ],
  },
  {
    id: "T-028", serviceCode: "PROC-NVD", description: "Normal Vaginal Delivery",
    category: "Procedure", specialty: ["OBG"], defaultPrice: 12000, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 12000 },
    ],
  },
  {
    id: "T-029", serviceCode: "PROC-ANES", description: "Anaesthesia Charges",
    category: "Procedure", specialty: ["Anaesthesia"], defaultPrice: 8000, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-030", serviceCode: "PROC-TMT", description: "Treadmill Test (TMT)",
    category: "Procedure", specialty: ["Cardiology"], defaultPrice: 1800, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-031", serviceCode: "PROC-PFT", description: "Spirometry / PFT",
    category: "Procedure", specialty: ["Pulmonology"], defaultPrice: 800, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-032", serviceCode: "PROC-PHYSIO", description: "Physiotherapy Session",
    category: "Therapy", specialty: ["Orthopaedics", "Physiotherapy"], defaultPrice: 600, hsnSac: "998315", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-033", serviceCode: "PROC-CMON", description: "Cardiac Monitoring — Continuous",
    category: "Procedure", specialty: ["Cardiology", "ICU"], defaultPrice: 3000, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-034", serviceCode: "PROC-VENT", description: "Mechanical Ventilation (per day)",
    category: "Procedure", specialty: ["ICU", "Critical Care"], defaultPrice: 12000, hsnSac: "998313", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-035", serviceCode: "PROC-NURSING-ICU", description: "ICU Nursing — Intensive (per day)",
    category: "Nursing", specialty: ["ICU", "Critical Care"], defaultPrice: 6000, hsnSac: "998314", taxable: false, taxRate: 0,
    payerOverrides: [],
  },
  {
    id: "T-036", serviceCode: "PKG-MATERNITY", description: "Maternity Package (Normal Delivery)",
    category: "Package", specialty: ["OBG"], defaultPrice: 35000, hsnSac: "998319", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "Ayushman", price: 0, requiresPreAuth: true, coverageCap: 35000 },
    ],
  },
  {
    id: "T-037", serviceCode: "PKG-SURGERY-APPY", description: "Package — Lap Appendicectomy",
    category: "Package", specialty: ["Surgery"], defaultPrice: 45000, hsnSac: "998319", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-038", serviceCode: "PKG-DIALYSIS", description: "Dialysis Session Package",
    category: "Package", specialty: ["Nephrology"], defaultPrice: 3500, hsnSac: "998319", taxable: true, taxRate: 5,
    payerOverrides: [
      { payerType: "CGHS", price: 2500, requiresPreAuth: false },
    ],
  },
  {
    id: "T-039", serviceCode: "PKG-HEALTHCHECK", description: "Comprehensive Health Check Package",
    category: "Package", specialty: ["General Medicine"], defaultPrice: 5000, hsnSac: "998319", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
  {
    id: "T-040", serviceCode: "CONS-ALLIED", description: "Allied Health Consultation (Physio/Dietician)",
    category: "Consultation", specialty: ["Physiotherapy", "Nutrition"], defaultPrice: 400, hsnSac: "998311", taxable: true, taxRate: 5,
    payerOverrides: [],
  },
];

export function getTariffPrice(serviceCode: string, payerType?: PayerType, payerName?: string): number {
  const item = TARIFF_ITEMS.find((t) => t.serviceCode === serviceCode);
  if (!item) return 0;
  if (payerType) {
    const override = item.payerOverrides.find((o) => o.payerType === payerType && (!payerName || !o.payerName || o.payerName === payerName));
    if (override) return override.price;
  }
  return item.defaultPrice;
}

export function getTariffItem(serviceCode: string): ServiceWithPricing | undefined {
  return TARIFF_ITEMS.find((t) => t.serviceCode === serviceCode);
}

export function getTariffItemsByCategory(category: string): ServiceWithPricing[] {
  return TARIFF_ITEMS.filter((t) => t.category === category);
}

export function getTariffItemsBySpecialty(specialty: string): ServiceWithPricing[] {
  return TARIFF_ITEMS.filter((t) => t.specialty.some((s) => s.toLowerCase() === specialty.toLowerCase()));
}
