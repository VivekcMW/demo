"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { usePatientStore } from "@/store/usePatientStore";
import {
  LayoutDashboard, Calendar, FileText, Pill, IndianRupee,
  User, LogOut, Menu, Heart, X,
} from "lucide-react";

const PORTAL_LINKS = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "Appointments", href: "/portal/appointments", icon: Calendar },
  { label: "Medical Records", href: "/portal/records", icon: FileText },
  { label: "Prescriptions", href: "/portal/prescriptions", icon: Pill },
  { label: "Bills & Payments", href: "/portal/bills", icon: IndianRupee },
  { label: "My Profile", href: "/portal/profile", icon: User },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const loggedInPatientId = usePatientAuthStore((s) => s.loggedInPatientId);
  const logout = usePatientAuthStore((s) => s.logout);
  const patient = usePatientStore((s) =>
    loggedInPatientId ? s.patients.find((p) => p.id === loggedInPatientId) ?? null : null
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    router.push("/portal/login");
  }

  return (
    <div className="flex h-full min-h-screen bg-[var(--surface-page)]">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[var(--border-default)] bg-[var(--surface-raised)] transition-transform md:relative md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--action-primary)]">
              <Heart size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">Patient Portal</p>
              <p className="text-[10px] text-[var(--text-secondary)]">Aarogya Hospital</p>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] md:hidden">
            <X size={16} />
          </button>
        </div>

        {patient && (
          <div className="border-b border-[var(--border-default)] px-5 py-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{patient.name}</p>
            <p className="font-mono text-xs text-[var(--text-secondary)]">{patient.uhid}</p>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {PORTAL_LINKS.map((item) => {
              const active = pathname === item.href || (item.href !== "/portal" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-[var(--action-subtle)] text-[var(--action-primary)] before:absolute before:left-0 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-[var(--action-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-[var(--border-default)] px-3 py-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--critical-fg)] transition-colors"
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <div className="flex items-center gap-3 border-b border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 md:hidden">
          <button onClick={() => setMobileOpen(true)} className="rounded-lg p-1 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Heart size={15} className="text-[var(--action-primary)]" />
            <p className="text-sm font-bold text-[var(--text-primary)]">Patient Portal</p>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
