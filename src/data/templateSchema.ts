// ── PRD 1.3 §3.2 / FR-CDE-010–014 — Template Engine Schema Types ──

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "time"
  | "select"
  | "multiselect"
  | "radio"
  | "boolean"
  | "repeating"
  | "section"
  | "attachment"
  | "orderSet";

export interface ConditionalRule {
  field: string;
  operator: "equals" | "notEquals" | "greaterThan" | "lessThan" | "in" | "notIn";
  value: unknown;
}

export interface CalculatedRule {
  formula: string;
  dependencies: string[];
}

export interface TemplateField {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  defaultValue?: unknown;
  options?: { label: string; value: string }[];
  unit?: string;
  min?: number;
  max?: number;
  rows?: number;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
  showIf?: ConditionalRule;
  requiredIf?: ConditionalRule;
  calculate?: CalculatedRule;
  fields?: TemplateField[];
  orderSetIds?: string[];
  hint?: string;
}

export interface TemplateSection {
  key: string;
  label: string;
  icon?: string;
  fields: TemplateField[];
  showIf?: ConditionalRule;
}

export type TemplateType =
  | "SOAP"
  | "Admission"
  | "Progress"
  | "Procedure"
  | "Discharge"
  | "Screening"
  | "Survey"
  | "Allied";

export type TemplateScope = "system" | "facility" | "department" | "specialty" | "provider";

export interface TemplateDefinition {
  id: string;
  name: string;
  type: TemplateType;
  scope: TemplateScope;
  version: number;
  sections: TemplateSection[];
  metadata: {
    description: string;
    specialties: string[];
    effectiveFrom?: string;
    effectiveTo?: string;
    status: "active" | "inactive" | "draft";
    orderSets?: string[];
  };
}

// Structured form values keyed by field path (e.g., "sectionKey.fieldKey")
export type FormValues = Record<string, unknown>;
