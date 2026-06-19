"use client";

import { useRegistrationStore } from "@/store/useCrossCuttingStores";
import { Baby } from "lucide-react";

export default function RegistrationsPage() {
  const { births, deaths } = useRegistrationStore();
  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Baby size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Birth & Death Registration</h1><p className="text-sm text-[var(--text-secondary)]">Statutory certificate management</p></div></div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--text-primary)]">Birth Certificates ({births.length})</p>
          {births.map((b) => (
            <div key={b.id} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-2 text-xs">
              <p className="font-medium text-[var(--text-primary)]">{b.babyName}</p>
              <p className="text-[var(--text-secondary)]">DOB: {b.dob} {b.time} · {b.birthWeight}kg · {b.deliveryType}</p>
              <p className="text-[var(--text-secondary)]">Mother: {b.motherName} · Cert: {b.certificateNumber || "Pending"}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--text-primary)]">Death Certificates ({deaths.length})</p>
          {deaths.map((d) => (
            <div key={d.id} className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] p-2 text-xs">
              <p className="font-medium text-[var(--text-primary)]">{d.deceasedName} <span className="text-[var(--text-secondary)]">({d.age}y, {d.sex})</span></p>
              <p className="text-[var(--text-secondary)]">DOD: {d.dod} {d.time} · {d.icdCode}</p>
              <p className="text-[var(--text-secondary)]">Cause: {d.causeOfDeath} · Cert: {d.certificateNumber || "Pending"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
