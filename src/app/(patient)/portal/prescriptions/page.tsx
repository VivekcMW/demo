"use client";

import { useRouter } from "next/navigation";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { usePatientStore } from "@/store/usePatientStore";
import { usePharmacyStore } from "@/store/usePharmacyStore";
import { useMemo, useState, useEffect } from "react";
import { Pill, ChevronDown, ChevronUp, Clock, AlertCircle } from "lucide-react";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function PrescriptionsPage() {
  const router = useRouter();
  const loggedInPatientId = usePatientAuthStore((s) => s.loggedInPatientId);
  const patient = usePatientStore((s) =>
    loggedInPatientId ? s.patients.find((p) => p.id === loggedInPatientId) ?? null : null
  );
  const prescriptions = usePharmacyStore((s) => s.prescriptions);
  const [expanded, setExpanded] = useState<string | null>(null);

  const patientRxs = useMemo(
    () => (patient ? prescriptions.filter((p) => p.patientId === patient.id).sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)) : []),
    [prescriptions, patient]
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!patient) {
    if (mounted) router.replace("/portal/login");
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-8">
      <div>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">My Prescriptions</h1>
        <p className="text-sm text-[var(--text-secondary)]">View current and past medication orders</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
          <p className="text-2xl font-bold text-[var(--action-primary)]">{patientRxs.length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Total</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
          <p className="text-2xl font-bold text-[var(--normal-fg)]">{patientRxs.filter((r) => r.status === "Pending" || r.status === "Verified" || r.status === "Dispensing").length}</p>
          <p className="text-xs text-[var(--text-secondary)]">In Progress</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
          <p className="text-2xl font-bold text-[var(--info-fg)]">{patientRxs.filter((r) => r.status === "Pending").length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Pending</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
          <p className="text-2xl font-bold text-[var(--text-secondary)]">{patientRxs.filter((r) => r.status === "Dispensed" || r.status === "Cancelled").length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Dispensed</p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <Pill size={13} /> Prescription History
          </p>
        </div>
        {patientRxs.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <Pill size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
            <p className="text-sm font-medium text-[var(--text-primary)]">No prescriptions found</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {patientRxs.map((rx) => {
              const open = expanded === rx.id;
              return (
                <div key={rx.id}>
                  <button
                    onClick={() => setExpanded(open ? null : rx.id)}
                    className="flex w-full items-center gap-3 px-5 py-3.5 hover:bg-[var(--surface-sunken)] transition-colors"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      rx.status === "Pending" || rx.status === "Verified" || rx.status === "Dispensing" ? "bg-[var(--info-bg)]" : "bg-[var(--surface-sunken)]"
                    }`}>
                      <Pill size={14} className={rx.status === "Pending" || rx.status === "Verified" || rx.status === "Dispensing" ? "text-[var(--info-fg)]" : "text-[var(--text-secondary)]"} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{rx.items.map((i) => i.drug).join(", ")}</p>
                      <p className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <Clock size={10} /> {fmtDate(rx.receivedAt)} · {rx.prescribedBy}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      rx.status === "Pending" || rx.status === "Verified" || rx.status === "Dispensing" ? "bg-[var(--info-bg)] text-[var(--info-fg)]"
                      :                       rx.status === "Dispensed" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]"
                      : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"
                    }`}>{rx.status}</span>
                    {open ? <ChevronUp size={14} className="text-[var(--text-secondary)]" /> : <ChevronDown size={14} className="text-[var(--text-secondary)]" />}
                  </button>
                  {open && (
                    <div className="border-t border-[var(--border-default)] bg-[var(--surface-page)] px-5 py-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border-default)] text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                            <td className="pb-1.5">Drug</td>
                            <td className="pb-1.5">Dose</td>
                            <td className="pb-1.5">Route</td>
                            <td className="pb-1.5">Frequency</td>
                            <td className="pb-1.5">Duration</td>
                          </tr>
                        </thead>
                        <tbody>
                          {rx.items.map((item, i) => (
                            <tr key={i}>
                              <td className="py-1.5 font-medium text-[var(--text-primary)]">{item.drug}</td>
                              <td className="py-1.5 text-[var(--text-primary)]">{item.strength}</td>
                              <td className="py-1.5 text-[var(--text-secondary)]">{item.route}</td>
                              <td className="py-1.5 text-[var(--text-primary)]">{item.frequency}</td>
                              <td className="py-1.5 text-[var(--text-primary)]">{item.duration}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-3 flex items-center gap-4 text-[11px] text-[var(--text-secondary)] border-t border-[var(--border-default)] pt-2">
                        <span>Prescribed by: {rx.prescribedBy}</span>
                        <span>Source: {rx.source}</span>
                        {rx.notes && <span className="italic">Note: {rx.notes}</span>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
