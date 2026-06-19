"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarCheck2, Stethoscope, Pill, Receipt, Menu } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";

const bottomItems = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Appts", href: "/appointments", icon: CalendarCheck2 },
  { label: "Patients", href: "/patients", icon: Stethoscope },
  { label: "Pharmacy", href: "/pharmacy", icon: Pill },
  { label: "Billing", href: "/billing", icon: Receipt },
];

export function BottomNav() {
  const pathname = usePathname();
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-14 items-center border-t border-[var(--border-default)] bg-[var(--surface-raised)] md:hidden safe-area-bottom">
      {bottomItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(item.href + "/");
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 flex-col items-center justify-center gap-0.5 h-full text-[10px] font-medium transition-colors ${
              active
                ? "text-[var(--action-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Icon size={18} />
            <span>{item.label}</span>
          </Link>
        );
      })}
      <button
        onClick={toggleSidebar}
        className="flex flex-1 flex-col items-center justify-center gap-0.5 h-full text-[10px] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        aria-label="Open navigation menu"
      >
        <Menu size={18} />
        <span>Menu</span>
      </button>
    </nav>
  );
}
