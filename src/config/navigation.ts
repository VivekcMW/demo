import {
  LayoutDashboard,
  CalendarCheck2,
  ClipboardList,
  FlaskConical,
  Pill,
  BedDouble,
  Receipt,
  Users,
  BarChart3,
  Settings,
  UserCog,
  Stethoscope,
  FileText,
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
      { label: "Orders (CPOE)", href: "/orders", icon: ClipboardList },
      { label: "Diagnostics", href: "/diagnostics", icon: FlaskConical },
      { label: "Pharmacy", href: "/pharmacy", icon: Pill },
      { label: "IPD / Beds", href: "/ipd", icon: BedDouble },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Billing", href: "/billing", icon: Receipt },
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
