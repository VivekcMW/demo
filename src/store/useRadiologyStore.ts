import { create } from "zustand";
import { useOrderStore } from "./useOrderStore";
import type { Order, OrderStatus, OrderPriority } from "@/data/seedOrders";

// ── Types ────────────────────────────────────────────────────────────────────

export type Modality =
  | "X-Ray"
  | "Ultrasound"
  | "CT"
  | "MRI"
  | "Mammography"
  | "DEXA"
  | "Fluoroscopy"
  | "Angiography"
  | "Nuclear Medicine"
  | "PET-CT";

export interface RadiologyProcedure {
  id: string;
  name: string;
  modality: Modality;
  bodyRegion: string;
  contrastRequired: boolean;
  preparation?: string;
  turnaroundHours: number;
  price: number;
  structuredReportTemplate?: string;
}

export interface RadiologyReportTemplate {
  id: string;
  name: string;
  modality: Modality;
  bodyRegion: string;
  sections: {
    key: string;
    label: string;
    fields: {
      key: string;
      label: string;
      type: "text" | "textarea" | "select" | "boolean";
      options?: { label: string; value: string }[];
    }[];
  }[];
}

export interface RadiologyWorklistFilters {
  status: string;
  priority: string;
  modality: string;
  search: string;
}

// ── Procedure Seed Data (40+) ─────────────────────────────────────────────────

const procedures: RadiologyProcedure[] = [
  // X-Ray
  { id: "XR-001", name: "Chest PA View", modality: "X-Ray", bodyRegion: "Chest", contrastRequired: false, turnaroundHours: 2, price: 250, structuredReportTemplate: "cxr" },
  { id: "XR-002", name: "Chest AP View", modality: "X-Ray", bodyRegion: "Chest", contrastRequired: false, turnaroundHours: 2, price: 250, structuredReportTemplate: "cxr" },
  { id: "XR-003", name: "Abdomen Erect", modality: "X-Ray", bodyRegion: "Abdomen", contrastRequired: false, turnaroundHours: 2, price: 300 },
  { id: "XR-004", name: "Abdomen Supine", modality: "X-Ray", bodyRegion: "Abdomen", contrastRequired: false, turnaroundHours: 2, price: 300 },
  { id: "XR-005", name: "Skull (AP & Lateral)", modality: "X-Ray", bodyRegion: "Head", contrastRequired: false, turnaroundHours: 3, price: 350 },
  { id: "XR-006", name: "Cervical Spine", modality: "X-Ray", bodyRegion: "Spine", contrastRequired: false, turnaroundHours: 3, price: 400 },
  { id: "XR-007", name: "Thoracic Spine", modality: "X-Ray", bodyRegion: "Spine", contrastRequired: false, turnaroundHours: 3, price: 400 },
  { id: "XR-008", name: "Lumbar Spine", modality: "X-Ray", bodyRegion: "Spine", contrastRequired: false, turnaroundHours: 3, price: 400 },
  { id: "XR-009", name: "Pelvis (AP View)", modality: "X-Ray", bodyRegion: "Pelvis", contrastRequired: false, turnaroundHours: 3, price: 350 },
  { id: "XR-010", name: "Both Knees (Standing)", modality: "X-Ray", bodyRegion: "Lower Limb", contrastRequired: false, turnaroundHours: 3, price: 400 },
  { id: "XR-011", name: "Wrist (AP & Lateral)", modality: "X-Ray", bodyRegion: "Upper Limb", contrastRequired: false, turnaroundHours: 3, price: 300 },
  { id: "XR-012", name: "Ankle (AP & Lateral)", modality: "X-Ray", bodyRegion: "Lower Limb", contrastRequired: false, turnaroundHours: 3, price: 300 },
  { id: "XR-013", name: "Shoulder (AP & Axial)", modality: "X-Ray", bodyRegion: "Upper Limb", contrastRequired: false, turnaroundHours: 3, price: 350 },
  { id: "XR-014", name: "X-Ray Extremity (single view)", modality: "X-Ray", bodyRegion: "Extremity", contrastRequired: false, turnaroundHours: 2, price: 250, structuredReportTemplate: "xray-extremity" },

  // Ultrasound
  { id: "US-001", name: "Ultrasound Abdomen", modality: "Ultrasound", bodyRegion: "Abdomen", contrastRequired: false, preparation: "Fast 6 hours", turnaroundHours: 4, price: 800, structuredReportTemplate: "us-abdomen" },
  { id: "US-002", name: "Ultrasound Pelvis", modality: "Ultrasound", bodyRegion: "Pelvis", contrastRequired: false, preparation: "Full bladder", turnaroundHours: 4, price: 800 },
  { id: "US-003", name: "Ultrasound KUB", modality: "Ultrasound", bodyRegion: "Abdomen", contrastRequired: false, preparation: "Full bladder", turnaroundHours: 4, price: 750 },
  { id: "US-004", name: "Ultrasound Thyroid", modality: "Ultrasound", bodyRegion: "Neck", contrastRequired: false, turnaroundHours: 3, price: 700 },
  { id: "US-005", name: "Ultrasound Breast", modality: "Ultrasound", bodyRegion: "Breast", contrastRequired: false, turnaroundHours: 3, price: 900 },
  { id: "US-006", name: "Doppler Lower Limb (Arterial)", modality: "Ultrasound", bodyRegion: "Lower Limb", contrastRequired: false, turnaroundHours: 5, price: 1500 },
  { id: "US-007", name: "Doppler Lower Limb (Venous)", modality: "Ultrasound", bodyRegion: "Lower Limb", contrastRequired: false, turnaroundHours: 5, price: 1500 },
  { id: "US-008", name: "Doppler Upper Limb (Arterial)", modality: "Ultrasound", bodyRegion: "Upper Limb", contrastRequired: false, turnaroundHours: 5, price: 1500 },
  { id: "US-009", name: "Doppler Upper Limb (Venous)", modality: "Ultrasound", bodyRegion: "Upper Limb", contrastRequired: false, turnaroundHours: 5, price: 1500 },
  { id: "US-010", name: "Obstetric US (1st Trimester)", modality: "Ultrasound", bodyRegion: "Pelvis", contrastRequired: false, preparation: "Full bladder", turnaroundHours: 3, price: 1000 },
  { id: "US-011", name: "Obstetric US (2nd Trimester)", modality: "Ultrasound", bodyRegion: "Pelvis", contrastRequired: false, preparation: "Full bladder", turnaroundHours: 3, price: 1200 },
  { id: "US-012", name: "Obstetric US (3rd Trimester)", modality: "Ultrasound", bodyRegion: "Pelvis", contrastRequired: false, preparation: "Full bladder", turnaroundHours: 3, price: 1200 },
  { id: "US-013", name: "Carotid Doppler", modality: "Ultrasound", bodyRegion: "Neck", contrastRequired: false, turnaroundHours: 5, price: 2000 },
  { id: "US-014", name: "Echocardiogram (2D)", modality: "Ultrasound", bodyRegion: "Chest", contrastRequired: false, turnaroundHours: 4, price: 2000 },
  { id: "US-015", name: "Echocardiogram (Stress)", modality: "Ultrasound", bodyRegion: "Chest", contrastRequired: false, turnaroundHours: 6, price: 3500 },
  { id: "US-016", name: "Echocardiogram (TEE)", modality: "Ultrasound", bodyRegion: "Chest", contrastRequired: false, turnaroundHours: 6, price: 4500 },

  // CT
  { id: "CT-001", name: "CT Head (Plain)", modality: "CT", bodyRegion: "Head", contrastRequired: false, turnaroundHours: 3, price: 2000, structuredReportTemplate: "ct-head" },
  { id: "CT-002", name: "CT Head (Contrast)", modality: "CT", bodyRegion: "Head", contrastRequired: true, preparation: "Check renal function, NPO 4 hours", turnaroundHours: 4, price: 3000, structuredReportTemplate: "ct-head" },
  { id: "CT-003", name: "CT Chest", modality: "CT", bodyRegion: "Chest", contrastRequired: false, turnaroundHours: 4, price: 3000 },
  { id: "CT-004", name: "CT Abdomen", modality: "CT", bodyRegion: "Abdomen", contrastRequired: false, turnaroundHours: 4, price: 3500 },
  { id: "CT-005", name: "CT KUB", modality: "CT", bodyRegion: "Abdomen", contrastRequired: false, preparation: "Full bladder", turnaroundHours: 3, price: 3000 },
  { id: "CT-006", name: "CT Spine", modality: "CT", bodyRegion: "Spine", contrastRequired: false, turnaroundHours: 4, price: 3000 },
  { id: "CT-007", name: "CT Angiography", modality: "CT", bodyRegion: "Vascular", contrastRequired: true, preparation: "Check renal function, NPO 4 hours", turnaroundHours: 6, price: 6000 },
  { id: "CT-008", name: "CT Coronary Angiography", modality: "CT", bodyRegion: "Chest", contrastRequired: true, preparation: "HR < 65 bpm, beta-blocker if needed, NPO 4 hours", turnaroundHours: 6, price: 8000 },

  // MRI
  { id: "MRI-001", name: "MRI Brain", modality: "MRI", bodyRegion: "Head", contrastRequired: false, turnaroundHours: 6, price: 5000, structuredReportTemplate: "mri-brain" },
  { id: "MRI-002", name: "MRI Brain (Contrast)", modality: "MRI", bodyRegion: "Head", contrastRequired: true, preparation: "Check renal function", turnaroundHours: 8, price: 6500, structuredReportTemplate: "mri-brain" },
  { id: "MRI-003", name: "MRI Spine", modality: "MRI", bodyRegion: "Spine", contrastRequired: false, turnaroundHours: 6, price: 5000 },
  { id: "MRI-004", name: "MRI Knee", modality: "MRI", bodyRegion: "Lower Limb", contrastRequired: false, turnaroundHours: 5, price: 4500 },
  { id: "MRI-005", name: "MRI Shoulder", modality: "MRI", bodyRegion: "Upper Limb", contrastRequired: false, turnaroundHours: 5, price: 4500 },
  { id: "MRI-006", name: "MRI Abdomen", modality: "MRI", bodyRegion: "Abdomen", contrastRequired: false, turnaroundHours: 6, price: 6000 },
  { id: "MRI-007", name: "MRCP", modality: "MRI", bodyRegion: "Abdomen", contrastRequired: false, preparation: "NPO 6 hours", turnaroundHours: 6, price: 5500 },
  { id: "MRI-008", name: "MR Venography (MRV)", modality: "MRI", bodyRegion: "Head", contrastRequired: false, turnaroundHours: 6, price: 5000 },

  // Mammography
  { id: "MG-001", name: "Mammography Screening", modality: "Mammography", bodyRegion: "Breast", contrastRequired: false, turnaroundHours: 4, price: 2000 },
  { id: "MG-002", name: "Mammography Diagnostic", modality: "Mammography", bodyRegion: "Breast", contrastRequired: false, turnaroundHours: 4, price: 2500 },

  // Others
  { id: "DX-001", name: "DEXA Scan (Bone Density)", modality: "DEXA", bodyRegion: "Spine", contrastRequired: false, turnaroundHours: 3, price: 1500 },
  { id: "FL-001", name: "Barium Swallow", modality: "Fluoroscopy", bodyRegion: "Chest", contrastRequired: true, preparation: "NPO 6 hours", turnaroundHours: 4, price: 2000 },
  { id: "FL-002", name: "Barium Enema", modality: "Fluoroscopy", bodyRegion: "Abdomen", contrastRequired: true, preparation: "Bowel prep day prior, NPO 6 hours", turnaroundHours: 5, price: 2500 },
  { id: "FL-003", name: "IVP (Intravenous Pyelogram)", modality: "Fluoroscopy", bodyRegion: "Abdomen", contrastRequired: true, preparation: "Bowel prep, check renal function", turnaroundHours: 5, price: 3000 },
  { id: "FL-004", name: "HSG (Hysterosalpingogram)", modality: "Fluoroscopy", bodyRegion: "Pelvis", contrastRequired: true, preparation: "Schedule post-menses day 6-12", turnaroundHours: 4, price: 3000 },
  { id: "NM-001", name: "Bone Scan (Nuclear Medicine)", modality: "Nuclear Medicine", bodyRegion: "Whole Body", contrastRequired: true, turnaroundHours: 8, price: 6000 },
  { id: "PT-001", name: "PET-CT (FDG Whole Body)", modality: "PET-CT", bodyRegion: "Whole Body", contrastRequired: true, preparation: "NPO 6 hours, blood sugar < 200 mg/dL", turnaroundHours: 8, price: 15000 },
];

// ── Structured Report Templates ───────────────────────────────────────────────

const reportTemplates: RadiologyReportTemplate[] = [
  {
    id: "cxr",
    name: "Chest X-Ray",
    modality: "X-Ray",
    bodyRegion: "Chest",
    sections: [
      {
        key: "technique",
        label: "Technique",
        fields: [
          { key: "view", label: "View", type: "select", options: [{ label: "PA", value: "PA" }, { label: "AP", value: "AP" }, { label: "Lateral", value: "Lateral" }] },
          { key: "position", label: "Position", type: "select", options: [{ label: "Erect", value: "Erect" }, { label: "Supine", value: "Supine" }] },
          { key: "adequacy", label: "Adequacy", type: "select", options: [{ label: "Adequate", value: "Adequate" }, { label: "Suboptimal", value: "Suboptimal" }, { label: "Limited", value: "Limited" }] },
        ],
      },
      {
        key: "findings",
        label: "Findings",
        fields: [
          { key: "lungs", label: "Lungs & Pleura", type: "textarea" },
          { key: "mediastinum", label: "Mediastinum & Hila", type: "textarea" },
          { key: "heart", label: "Cardiac Silhouette", type: "textarea" },
          { key: "bones", label: "Bony Thorax", type: "textarea" },
          { key: "softTissues", label: "Soft Tissues", type: "textarea" },
        ],
      },
      {
        key: "impression",
        label: "Impression",
        fields: [
          { key: "diagnosis", label: "Primary Diagnosis", type: "text" },
          { key: "differential", label: "Differential Diagnosis", type: "textarea" },
          { key: "recommendation", label: "Recommendation", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "us-abdomen",
    name: "Ultrasound Abdomen",
    modality: "Ultrasound",
    bodyRegion: "Abdomen",
    sections: [
      {
        key: "technique",
        label: "Technique",
        fields: [
          { key: "probe", label: "Probe Used", type: "select", options: [{ label: "Curvilinear (3.5 MHz)", value: "curvilinear" }, { label: "Linear (7.5 MHz)", value: "linear" }, { label: "Phased Array", value: "phased" }] },
          { key: "quality", label: "Study Quality", type: "select", options: [{ label: "Optimal", value: "Optimal" }, { label: "Adequate", value: "Adequate" }, { label: "Limited", value: "Limited" }] },
        ],
      },
      {
        key: "findings",
        label: "Findings",
        fields: [
          { key: "liver", label: "Liver", type: "textarea" },
          { key: "gallbladder", label: "Gallbladder & CBD", type: "textarea" },
          { key: "pancreas", label: "Pancreas", type: "textarea" },
          { key: "spleen", label: "Spleen", type: "textarea" },
          { key: "kidneys", label: "Kidneys & Adrenals", type: "textarea" },
          { key: "aorta", label: "Aorta & IVC", type: "textarea" },
          { key: "bladder", label: "Urinary Bladder", type: "textarea" },
          { key: "other", label: "Other Findings", type: "textarea" },
        ],
      },
      {
        key: "impression",
        label: "Impression",
        fields: [
          { key: "diagnosis", label: "Diagnosis", type: "text" },
          { key: "recommendation", label: "Recommendation", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "ct-head",
    name: "CT Head",
    modality: "CT",
    bodyRegion: "Head",
    sections: [
      {
        key: "technique",
        label: "Technique",
        fields: [
          { key: "contrast", label: "Contrast", type: "select", options: [{ label: "Non-Contrast", value: "non-contrast" }, { label: "Contrast-Enhanced", value: "contrast" }] },
          { key: "sliceThickness", label: "Slice Thickness", type: "select", options: [{ label: "1.25 mm", value: "1.25" }, { label: "2.5 mm", value: "2.5" }, { label: "5 mm", value: "5" }] },
        ],
      },
      {
        key: "findings",
        label: "Findings",
        fields: [
          { key: "parenchyma", label: "Brain Parenchyma", type: "textarea" },
          { key: "ventricles", label: "Ventricles & CSF Spaces", type: "textarea" },
          { key: "midline", label: "Midline Shift", type: "select", options: [{ label: "None", value: "none" }, { label: "Mild (< 5 mm)", value: "mild" }, { label: "Moderate (5-10 mm)", value: "moderate" }, { label: "Severe (> 10 mm)", value: "severe" }] },
          { key: "extraaxial", label: "Extra-Axial Spaces", type: "textarea" },
          { key: "skull", label: "Skull & Calvarium", type: "textarea" },
          { key: "vessels", label: "Vascular Structures", type: "textarea" },
        ],
      },
      {
        key: "impression",
        label: "Impression",
        fields: [
          { key: "diagnosis", label: "Diagnosis", type: "text" },
          { key: "recommendation", label: "Recommendation", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "mri-brain",
    name: "MRI Brain",
    modality: "MRI",
    bodyRegion: "Head",
    sections: [
      {
        key: "technique",
        label: "Technique",
        fields: [
          { key: "contrast", label: "Contrast", type: "select", options: [{ label: "Non-Contrast", value: "non-contrast" }, { label: "Contrast-Enhanced", value: "contrast" }] },
          { key: "sequences", label: "Sequences Performed", type: "textarea" },
        ],
      },
      {
        key: "findings",
        label: "Findings",
        fields: [
          { key: "parenchyma", label: "Brain Parenchyma", type: "textarea" },
          { key: "ventricles", label: "Ventricles & CSF Spaces", type: "textarea" },
          { key: "whiteMatter", label: "White Matter", type: "textarea" },
          { key: "posteriorFossa", label: "Posterior Fossa & Brainstem", type: "textarea" },
          { key: "pituitary", label: "Sella & Pituitary", type: "textarea" },
          { key: "vessels", label: "Vascular Structures", type: "textarea" },
          { key: "sinuses", label: "Paranasal Sinuses & Mastoids", type: "textarea" },
        ],
      },
      {
        key: "impression",
        label: "Impression",
        fields: [
          { key: "diagnosis", label: "Diagnosis", type: "text" },
          { key: "comparison", label: "Comparison with Prior Study", type: "textarea" },
          { key: "recommendation", label: "Recommendation", type: "textarea" },
        ],
      },
    ],
  },
  {
    id: "xray-extremity",
    name: "X-Ray Extremity",
    modality: "X-Ray",
    bodyRegion: "Extremity",
    sections: [
      {
        key: "technique",
        label: "Technique",
        fields: [
          { key: "view", label: "View", type: "select", options: [{ label: "AP", value: "AP" }, { label: "Lateral", value: "Lateral" }, { label: "AP & Lateral", value: "AP-Lateral" }, { label: "Oblique", value: "Oblique" }] },
          { key: "side", label: "Side", type: "select", options: [{ label: "Left", value: "Left" }, { label: "Right", value: "Right" }, { label: "Bilateral", value: "Bilateral" }] },
        ],
      },
      {
        key: "findings",
        label: "Findings",
        fields: [
          { key: "bonyAlignment", label: "Bony Alignment", type: "textarea" },
          { key: "fracture", label: "Fracture / Dislocation", type: "textarea" },
          { key: "jointSpace", label: "Joint Space & Articular Surface", type: "textarea" },
          { key: "softTissue", label: "Soft Tissues", type: "textarea" },
          { key: "other", label: "Other Findings", type: "textarea" },
        ],
      },
      {
        key: "impression",
        label: "Impression",
        fields: [
          { key: "diagnosis", label: "Diagnosis", type: "text" },
          { key: "recommendation", label: "Recommendation", type: "textarea" },
        ],
      },
    ],
  },
];

// ── Modality grouping helper ──────────────────────────────────────────────────

export const MODALITY_GROUP: Record<Modality, string> = {
  "X-Ray": "X-Ray",
  "Ultrasound": "Ultrasound",
  "CT": "CT",
  "MRI": "MRI",
  "Mammography": "Mammography",
  "DEXA": "Others",
  "Fluoroscopy": "Others",
  "Angiography": "Others",
  "Nuclear Medicine": "Others",
  "PET-CT": "Others",
};

// ── Store ─────────────────────────────────────────────────────────────────────

interface RadiologyStore {
  procedures: RadiologyProcedure[];
  reportTemplates: RadiologyReportTemplate[];

  getProcedureById: (id: string) => RadiologyProcedure | undefined;
  getProceduresByModality: (modality: Modality) => RadiologyProcedure[];
  getProceduresByRegion: (region: string) => RadiologyProcedure[];
  getRadiologyOrders: () => Order[];
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getOrdersByPriority: (priority: OrderPriority) => Order[];
  getOrdersByModality: (modality: string) => Order[];
  getReportTemplate: (modality: Modality, bodyRegion: string) => RadiologyReportTemplate | undefined;
  getPendingReports: () => Order[];
  getProceduresForModalityGroup: (group: string) => RadiologyProcedure[];
  modalityGroups: string[];
}

export const useRadiologyStore = create<RadiologyStore>((_, get) => ({
  procedures,
  reportTemplates,

  getProcedureById(id) {
    return procedures.find((p) => p.id === id);
  },

  getProceduresByModality(modality) {
    return procedures.filter((p) => p.modality === modality);
  },

  getProceduresByRegion(region) {
    return procedures.filter((p) => p.bodyRegion.toLowerCase().includes(region.toLowerCase()));
  },

  getRadiologyOrders() {
    return useOrderStore.getState().orders.filter((o) => o.type === "Imaging");
  },

  getOrdersByStatus(status) {
    return get().getRadiologyOrders().filter((o) => o.status === status);
  },

  getOrdersByPriority(priority) {
    return get().getRadiologyOrders().filter((o) => o.priority === priority);
  },

  getOrdersByModality(modality) {
    const all = get().getRadiologyOrders();
    const group = modality === "Others" ? "Others" : modality;
    return all.filter((o) => {
      const proc = procedures.find((p) => o.title.toLowerCase().includes(p.name.toLowerCase()));
      if (!proc) return modality === "";
      const g = MODALITY_GROUP[proc.modality] ?? proc.modality;
      return g === group;
    });
  },

  getReportTemplate(modality, bodyRegion) {
    return reportTemplates.find(
      (t) => t.modality === modality && t.bodyRegion.toLowerCase() === bodyRegion.toLowerCase()
    );
  },

  getPendingReports() {
    return get().getRadiologyOrders().filter(
      (o) => o.status === "Ordered" || o.status === "Acknowledged" || o.status === "In-Progress"
    );
  },

  getProceduresForModalityGroup(group) {
    if (group === "All" || group === "") return procedures;
    if (group === "Others") return procedures.filter((p) => MODALITY_GROUP[p.modality] === "Others");
    return procedures.filter((p) => p.modality === group);
  },

  modalityGroups: ["All", "X-Ray", "Ultrasound", "CT", "MRI", "Mammography", "Others"],
}));
