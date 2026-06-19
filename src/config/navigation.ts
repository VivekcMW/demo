import {
  LayoutDashboard,
  CalendarCheck2,
  ClipboardList,
  FlaskConical,
  ScanLine,
  Pill,
  BedDouble,
  Receipt,
  Users,
  BarChart3,
  Settings,
  UserCog,
  Stethoscope,
  FileText,
  Video,
  Droplets,
  Calculator,
  HeartPulse,
  Syringe,
  FolderOpen,
  UtensilsCrossed,
  Baby,
  Activity,
  ShieldAlert,
  Dna,
  Wind,
  Eye,
  DraftingCompass,
  Timer,
  Heart,
  Brain,
  Truck,
  Ear,
  Smile,
  Bone,
  Bug,
  Package,
  HardDrive,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type NavGroup = {
  group: string;
  items: NavItem[];
};

export const navigation: NavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Appointments", href: "/appointments", icon: CalendarCheck2 },
    ],
  },
  {
    group: "Clinical",
    items: [
      { label: "Patients", href: "/patients", icon: Stethoscope },
      { label: "Examination", href: "/examination", icon: FileText },
      { label: "Telemedicine", href: "/telemedicine", icon: Video },
      { label: "Scoring", href: "/scoring", icon: Calculator },
      { label: "ECG", href: "/ecg", icon: HeartPulse },
      { label: "OB/GYN", href: "/obgyn", icon: Dna },
      { label: "Pediatrics", href: "/pediatrics", icon: Baby },
      { label: "Physiotherapy", href: "/physiotherapy", icon: Activity },
      { label: "Pulmonology", href: "/pulmonology", icon: Wind },
      { label: "Orders (CPOE)", href: "/orders", icon: ClipboardList },
      { label: "Drug Interactions", href: "/interactions", icon: ShieldAlert },
      { label: "Lab", href: "/lab", icon: FlaskConical },
      { label: "Diagnostics", href: "/diagnostics", icon: FlaskConical },
      { label: "Radiology", href: "/radiology", icon: ScanLine },
      { label: "DICOM Viewer", href: "/dicom-viewer", icon: ScanLine },
      { label: "Blood Bank", href: "/blood-bank", icon: Droplets },
      { label: "Pharmacy", href: "/pharmacy", icon: Pill },
      { label: "IPD / Beds", href: "/ipd", icon: BedDouble },
      { label: "Theatre (OT)", href: "/theatre", icon: Syringe },
      { label: "Dietary", href: "/dietary", icon: UtensilsCrossed },
      { label: "Nephrology", href: "/nephrology", icon: Droplets },
      { label: "MRD", href: "/mrd", icon: FolderOpen },
      { label: "Ophthalmology", href: "/ophthalmology", icon: Eye },
      { label: "Dermatology", href: "/dermatology", icon: DraftingCompass },
      { label: "Emergency", href: "/emergency", icon: Timer },
      { label: "Cardiology", href: "/cardiology", icon: Heart },
      { label: "Oncology", href: "/oncology", icon: Syringe },
      { label: "Gastroenterology", href: "/gastroenterology", icon: Activity },
      { label: "Neurology", href: "/neurology", icon: Brain },
      { label: "CSSD", href: "/cssd", icon: FlaskConical },
      { label: "Registrations", href: "/registrations", icon: Baby },
      { label: "Ambulance", href: "/ambulance", icon: Truck },
      { label: "ENT", href: "/ent", icon: Ear },
      { label: "Psychiatry", href: "/psychiatry", icon: Smile },
      { label: "Rheumatology", href: "/rheumatology", icon: Bone },
      { label: "Infectious Disease", href: "/infectious-disease", icon: Bug },
      { label: "Urology", href: "/urology", icon: Droplets },
      { label: "Orthopedics", href: "/orthopedics", icon: Activity },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Billing", href: "/billing", icon: Receipt, badge: "Claims" },
      { label: "Discounts", href: "/billing/discounts", icon: Receipt },
      { label: "Inventory", href: "/inventory", icon: Package },
      { label: "Staff", href: "/staff", icon: Users },
      { label: "Assets", href: "/assets", icon: HardDrive },
      { label: "CME & Learning", href: "/cme", icon: GraduationCap },
      { label: "Reports", href: "/reports", icon: BarChart3 },
    ],
  },
  {
    group: "Admin",
    items: [
      { label: "Users", href: "/users", icon: Users },
      { label: "Manage", href: "/manage", icon: UserCog },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];
