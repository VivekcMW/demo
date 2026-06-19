"use client";

import { useRouter } from "next/navigation";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useState, useEffect } from "react";
import { User, Phone, MapPin, Heart, Activity, Shield, Mail, FileText } from "lucide-react";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ProfilePage() {
  const router = useRouter();
  const loggedInPatientId = usePatientAuthStore((s) => s.loggedInPatientId);
  const patient = usePatientStore((s) =>
    loggedInPatientId ? s.patients.find((p) => p.id === loggedInPatientId) ?? null : null
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!patient) {
    if (mounted) router.replace("/portal/login");
    return null;
  }

  const chronicLabels: Record<string, string> = {
    DM: "Diabetes", HTN: "Hypertension", CKD: "Kidney Disease",
    Asthma: "Asthma", CAD: "Heart Disease", Hypothyroid: "Thyroid",
    COPD: "COPD", Arthritis: "Arthritis", Epilepsy: "Epilepsy",
    Obesity: "Obesity",
  };

  const personalInfo = [
    { icon: User, label: "Full Name", value: patient.name },
    { icon: FileText, label: "UHID", value: patient.uhid },
    { icon: User, label: "Age / Sex", value: `${patient.age} yrs / ${patient.sex === "M" ? "Male" : patient.sex === "F" ? "Female" : "Other"}` },
    { icon: Heart, label: "Blood Group", value: patient.bloodGroup !== "Unknown" ? patient.bloodGroup : "Not recorded" },
    { icon: Phone, label: "Phone", value: patient.phone },
    { icon: Mail, label: "Email", value: patient.email ?? "Not provided" },
    { icon: MapPin, label: "Address", value: patient.address || "Not provided" },
    { icon: Shield, label: "ABHA ID", value: patient.abhaId ?? "Not linked" },
    { icon: FileText, label: "Registered On", value: fmtDate(patient.registeredAt) },
    { icon: Activity, label: "Last Visit", value: patient.lastVisit ? fmtDate(patient.lastVisit) : "N/A" },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-8">
      <div>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">My Profile</h1>
        <p className="text-sm text-[var(--text-secondary)]">Your personal and medical information</p>
      </div>

      {/* Profile header */}
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--action-primary)] text-2xl font-bold text-white">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{patient.name}</h2>
            <p className="text-sm text-[var(--text-secondary)]">{patient.uhid}</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <User size={13} /> Personal Information
          </p>
        </div>
        <div className="divide-y divide-[var(--border-default)]">
          {personalInfo.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 px-5 py-3">
                <Icon size={14} className="shrink-0 text-[var(--text-secondary)]" />
                <div className="flex-1 min-w-0 flex justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)] text-right">{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chronic Conditions */}
      {patient.chronicConditions.length > 0 && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <Activity size={13} /> Chronic Conditions
            </p>
          </div>
          <div className="flex flex-wrap gap-2 px-5 py-4">
            {patient.chronicConditions.map((c) => (
              <span key={c} className="rounded-full border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] px-3 py-1 text-xs font-medium text-[var(--warning-fg)]">
                {chronicLabels[c] ?? c}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Allergies */}
      {patient.allergies.length > 0 && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <Shield size={13} /> Known Allergies
            </p>
          </div>
          <div className="flex flex-wrap gap-2 px-5 py-4">
            {patient.allergies.map((a, i) => (
              <span key={i} className="rounded-full border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-3 py-1 text-xs font-medium text-[var(--critical-fg)]">
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Contact */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <Phone size={13} /> Emergency Contact
          </p>
        </div>
        <div className="divide-y divide-[var(--border-default)]">
          <div className="flex items-center gap-3 px-5 py-3">
            <Phone size={14} className="shrink-0 text-[var(--text-secondary)]" />
            <div className="flex-1 min-w-0 flex justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Name</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{patient.emergencyContactName}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <Phone size={14} className="shrink-0 text-[var(--text-secondary)]" />
            <div className="flex-1 min-w-0 flex justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Phone</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{patient.emergencyContactPhone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Insurance */}
      {patient.insurance && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <Shield size={13} /> Insurance / TPA
            </p>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {[
              ["Provider", patient.insurance.provider],
              ["Policy No.", patient.insurance.policyNumber],
              ["Valid Until", fmtDate(patient.insurance.validUntil)],
              ["Coverage", patient.insurance.coverageType],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3">
                <Shield size={14} className="shrink-0 text-[var(--text-secondary)]" />
                <div className="flex-1 min-w-0 flex justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">{label}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
