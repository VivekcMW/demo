import {
  LayoutDashboard,
  UserPlus,
  CalendarCheck2,
  Users,
  BedDouble,
  Receipt,
  FileText,
  QrCode,
  type LucideIcon,
} from "lucide-react";

export type RxNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

export type RxNavGroup = {
  group: string;
  items: RxNavItem[];
};

export const receptionNavigation: RxNavGroup[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard",      href: "/reception",             icon: LayoutDashboard },
      { label: "Check-in",       href: "/reception/checkin",     icon: QrCode },
    ],
  },
  {
    group: "Patient Services",
    items: [
      { label: "Register Patient", href: "/reception/register",      icon: UserPlus },
      { label: "Appointments",     href: "/reception/appointments",  icon: CalendarCheck2 },
      { label: "OPD Queue",        href: "/reception/queue",         icon: Users },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "IPD Requests",  href: "/reception/ipd",       icon: BedDouble },
      { label: "Billing",       href: "/reception/billing",   icon: Receipt },
      { label: "Visitors",      href: "/reception/visitors",  icon: FileText },
    ],
  },
];
