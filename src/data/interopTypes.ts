// ── FHIR R4 Resource Types (subset) ─────────────────────────────────────
// These define the interoperability contract for backend integration.

export type FHIRDomainResource = {
  id: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    source?: string;
    tag?: { system: string; code: string; display?: string }[];
  };
  implicitRules?: string;
  language?: string;
};

export type Identifier = {
  use?: "usual" | "official" | "temp" | "secondary" | "old";
  type?: CodeableConcept;
  system?: string;
  value?: string;
  period?: { start?: string; end?: string };
  assigner?: Reference;
};

export type CodeableConcept = {
  coding?: Coding[];
  text?: string;
};

export type Coding = {
  system?: string;
  version?: string;
  code?: string;
  display?: string;
  userSelected?: boolean;
};

export type Reference = {
  reference?: string;
  type?: string;
  identifier?: Identifier;
  display?: string;
};

export type HumanName = {
  use?: "usual" | "official" | "temp" | "nickname" | "anonymous" | "old" | "maiden";
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: { start?: string; end?: string };
};

export type ContactPoint = {
  system?: "phone" | "fax" | "email" | "pager" | "url" | "sms" | "other";
  value?: string;
  use?: "home" | "work" | "temp" | "old" | "mobile";
  rank?: number;
  period?: { start?: string; end?: string };
};

export type Address = {
  use?: "home" | "work" | "temp" | "old" | "billing";
  type?: "postal" | "physical" | "both";
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

// ── Patient (FHIR R4) ────────────────────────────────────────────────────
export interface FHIRPatient extends FHIRDomainResource {
  resourceType: "Patient";
  identifier?: Identifier[];
  active?: boolean;
  name?: HumanName[];
  telecom?: ContactPoint[];
  gender?: "male" | "female" | "other" | "unknown";
  birthDate?: string;
  deceasedBoolean?: boolean;
  deceasedDateTime?: string;
  address?: Address[];
  maritalStatus?: CodeableConcept;
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;
  photo?: { contentType?: string; data?: string; url?: string }[];
  contact?: {
    relationship?: CodeableConcept[];
    name?: HumanName;
    telecom?: ContactPoint[];
    address?: Address;
    gender?: "male" | "female" | "other" | "unknown";
    organization?: Reference;
    period?: { start?: string; end?: string };
  }[];
  communication?: {
    language: CodeableConcept;
    preferred?: boolean;
  }[];
  generalPractitioner?: Reference[];
  managingOrganization?: Reference;
}

// ── Observation (FHIR R4) ────────────────────────────────────────────────
export interface FHIRObservation extends FHIRDomainResource {
  resourceType: "Observation";
  identifier?: Identifier[];
  basedOn?: Reference[];
  status: "registered" | "preliminary" | "final" | "amended" | "corrected" | "cancelled" | "entered-in-error" | "unknown";
  category?: CodeableConcept[];
  code: CodeableConcept;
  subject?: Reference;
  encounter?: Reference;
  effectiveDateTime?: string;
  issued?: string;
  performer?: Reference[];
  valueQuantity?: {
    value?: number;
    comparator?: "<" | "<=" | ">=" | ">";
    unit?: string;
    system?: string;
    code?: string;
  };
  valueCodeableConcept?: CodeableConcept;
  valueString?: string;
  valueBoolean?: boolean;
  valueInteger?: number;
  valueRange?: { low?: { value?: number }; high?: { value?: number } };
  valueRatio?: { numerator?: { value?: number }; denominator?: { value?: number } };
  valueTime?: string;
  valueDateTime?: string;
  valuePeriod?: { start?: string; end?: string };
  interpretation?: CodeableConcept[];
  note?: { text?: string; authorReference?: Reference; time?: string }[];
  bodySite?: CodeableConcept;
  method?: CodeableConcept;
  referenceRange?: {
    low?: { value?: number; unit?: string };
    high?: { value?: number; unit?: string };
    type?: CodeableConcept;
    appliesTo?: CodeableConcept[];
    age?: { low?: { value?: number }; high?: { value?: number } };
    text?: string;
  }[];
  hasMember?: Reference[];
  component?: {
    code: CodeableConcept;
    valueQuantity?: FHIRObservation["valueQuantity"];
    valueCodeableConcept?: CodeableConcept;
    valueString?: string;
    valueBoolean?: boolean;
    valueInteger?: number;
    valueRange?: FHIRObservation["valueRange"];
    valueRatio?: FHIRObservation["valueRatio"];
    valueTime?: string;
    valueDateTime?: string;
    valuePeriod?: FHIRObservation["valuePeriod"];
    dataAbsentReason?: CodeableConcept;
    interpretation?: CodeableConcept[];
    referenceRange?: FHIRObservation["referenceRange"];
  }[];
}

// ── ABDM (Ayushman Bharat Digital Mission) specific ──────────────────────

export interface ABDMProfile {
  healthId: string;       // ABHA (Ayushman Bharat Health Account) number
  healthIdNumber: string; // 14-digit ABHA number
  name: string;
  gender: "M" | "F" | "O";
  dateOfBirth: string;
  yearOfBirth?: string;
  monthOfBirth?: string;
  dayOfBirth?: string;
  address?: Address;
  mobile: string;
  email?: string;
  pinCode?: string;
  stateCode?: string;
  districtCode?: string;
  hipIds?: string[];       // Health Information Providers linked
  linkedFacilities?: string[];
  consentManaged?: boolean;
  consentExpiry?: string;
  preferredLanguages?: string[];
}

// ── DICOM / Imaging ───────────────────────────────────────────────────────

export interface DICOMMetadata {
  studyInstanceUID: string;
  seriesInstanceUID: string;
  sopInstanceUID: string;
  patientName: string;
  patientId: string;
  studyDate: string;
  studyTime: string;
  studyDescription: string;
  seriesDescription: string;
  modality:
    | "CR" | "CT" | "MR" | "US" | "XA" | "NM" | "PT" | "DX"
    | "MG" | "IO" | "OT" | "ECG" | "ES" | "RG";
  manufacturer: string;
  deviceSerialNumber?: string;
  institutionName?: string;
  referringPhysician?: string;
  numberOfFrames?: number;
  rows?: number;
  columns?: number;
  bitsAllocated?: number;
  pixelSpacing?: [number, number];
  sliceThickness?: number;
  windowCenter?: number;
  windowWidth?: number;
}

export interface DICOMStudy {
  studyInstanceUID: string;
  patientId: string;
  patientName: string;
  studyDate: string;
  studyDescription: string;
  modality: string;
  accessionNumber?: string;
  referringPhysician?: string;
  series: DICOMSeries[];
  numberOfSeries: number;
  numberOfInstances: number;
}

export interface DICOMSeries {
  seriesInstanceUID: string;
  seriesNumber: number;
  seriesDescription: string;
  modality: string;
  numberOfInstances: number;
  instances: DICOMMetadata[];
}

// ── HL7 v2 Message Segments (basic) ──────────────────────────────────────

export interface HL7Message {
  messageType: string;
  triggerEvent: string;
  messageStructure?: string;
  sendingApp: string;
  sendingFacility: string;
  receivingApp: string;
  receivingFacility: string;
  messageDateTime: string;
  messageControlId: string;
  versionId: string;
  segments: HL7Segment[];
}

export type HL7Segment =
  | HL7MSH
  | HL7PID
  | HL7PV1
  | HL7OBX
  | HL7ORC
  | HL7DG1;

export interface HL7MSH {
  segment: "MSH";
  fieldSeparator: string;
  encodingCharacters: string;
  sendingApp: string;
  sendingFacility: string;
  receivingApp: string;
  receivingFacility: string;
  messageDateTime: string;
  security?: string;
  messageType: string;
  messageControlId: string;
  processingId: string;
  versionId: string;
}

export interface HL7PID {
  segment: "PID";
  setId?: number;
  patientId?: string;
  patientIdentifierList: { id: string; type: string }[];
  patientName: { family: string; given: string }[];
  dateOfBirth: string;
  gender: string;
  address?: Address;
  phoneNumber?: string;
  ssn?: string;
}

export interface HL7PV1 {
  segment: "PV1";
  setID?: number;
  patientClass: string;
  assignedLocation: string;
  admissionType: string;
  attendingDoctor: { id: string; name: string };
  referringDoctor?: { id: string; name: string };
  admissionDate: string;
}

export interface HL7OBX {
  segment: "OBX";
  setID: number;
  valueType: string;
  observationIdentifier: { identifier: string; text: string };
  observationValue: string;
  units?: string;
  referenceRange?: string;
  abnormalFlags?: string;
  observationDateTime: string;
  observationStatus: string;
}

export interface HL7ORC {
  segment: "ORC";
  orderControl: string;
  placerOrderNumber: string;
  fillerOrderNumber?: string;
  orderStatus?: string;
  orderDateTime: string;
  orderingProvider?: { id: string; name: string };
}

export interface HL7DG1 {
  segment: "DG1";
  setID: number;
  diagnosisCodingMethod: string;
  diagnosisCode: { identifier: string; text: string };
  diagnosisDateTime: string;
  diagnosisType: string;
}
