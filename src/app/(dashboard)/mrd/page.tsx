"use client";

import { useState, useMemo } from "react";
import { useMRDStore, type DocStatus, type DocType } from "@/store/useMRDStore";
import { FileText, AlertTriangle, CheckCircle2, Clock, Search, ChevronRight, X } from "lucide-react";

const STATUS_CLS: Record<DocStatus, string> = {
  Pending: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Completed: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Deficient: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Reviewed: "bg-[var(--action-subtle)] text-[var(--action-primary)]",
};

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function MRDPage() {
  const docs = useMRDStore((s) => s.docs);
  const updateStatus = useMRDStore((s) => s.updateStatus);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<DocStatus | "all">("all");
  const [filterType, setFilterType] = useState<DocType | "all">("all");

  const filtered = useMemo(() => {
    return docs.filter((d) => {
      if (filterStatus !== "all" && d.status !== filterStatus) return false;
      if (filterType !== "all" && d.type !== filterType) return false;
      if (search && !d.patientName.toLowerCase().includes(search.toLowerCase()) && !d.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [docs, search, filterStatus, filterType]);

  const deficient = docs.filter((d) => d.status === "Deficient").length;
  const pending = docs.filter((d) => d.status === "Pending").length;

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Medical Records (MRD)</h1>
          <p className="text-sm text-[var(--text-secondary)]">Chart tracking, deficiency management & document review</p>
        </div>
        <div className="flex gap-2">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient or document…" className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] w-52" />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Documents", value: docs.length, icon: FileText, color: "var(--action-primary)" },
          { label: "Pending", value: pending, icon: Clock, color: "var(--info-fg)" },
          { label: "Deficient", value: deficient, icon: AlertTriangle, color: "var(--critical-fg)" },
          { label: "Completed", value: docs.filter((d) => d.status === "Completed" || d.status === "Reviewed").length, icon: CheckCircle2, color: "var(--normal-fg)" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
            <div className="flex items-center justify-between"><p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{c.label}</p><c.icon size={15} style={{ color: c.color }} /></div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--text-primary)]">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {(["all", "Pending", "Completed", "Deficient", "Reviewed"] as const).map((s) => (
          <button key={s} onClick={() => setFilterStatus(s)} className={`rounded-lg px-3 py-1.5 text-xs font-medium ${filterStatus === s ? "bg-[var(--action-primary)] text-white" : "border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}>{s === "all" ? "All" : s}</button>
        ))}
        <select value={filterType} onChange={(e) => setFilterType(e.target.value as DocType | "all")} className="ml-auto rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-1.5 text-xs outline-none">
          <option value="all">All Types</option>
          {["Discharge Summary", "Operative Note", "Consult Note", "Progress Note", "Nursing Note", "Lab Report", "Imaging Report", "Consent Form", "Death Summary", "Referral Letter"].map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)]">
                {["Document", "Patient", "Type", "Author", "Date", "Status", "Deficiency"].map((h) => (
                  <th key={h} className="px-4 py-2.5 text-left text-[10px] font-medium text-[var(--text-secondary)]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-b border-[var(--border-default)] last:border-0 hover:bg-[var(--surface-sunken)]">
                  <td className="px-4 py-3"><p className="font-medium text-[var(--text-primary)]">{d.title}</p><p className="text-[10px] text-[var(--text-secondary)]">v{d.version} · {d.id}</p></td>
                  <td className="px-4 py-3 text-xs text-[var(--text-primary)]">{d.patientName}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{d.type}</td>
                  <td className="px-4 py-3 text-xs text-[var(--text-secondary)]">{d.author}</td>
                  <td className="px-4 py-3 text-xs tabular-nums text-[var(--text-secondary)]">{fmtDate(d.createdAt)}</td>
                  <td className="px-4 py-3">
                    {d.status === "Pending" ? (
                      <button onClick={() => updateStatus(d.id, "Completed")} className="rounded-lg bg-[var(--action-primary)] px-2 py-1 text-[10px] font-semibold text-white">Mark Done</button>
                    ) : (
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_CLS[d.status]}`}>{d.status}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--critical-fg)]">{d.deficiency ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
