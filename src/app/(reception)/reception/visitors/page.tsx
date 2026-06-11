"use client";

import { useState, useMemo } from "react";
import { Users, Plus, LogOut, BadgeCheck, Search, X } from "lucide-react";
import { useToast } from "@/components/ui/ToastProvider";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { seedVisitors, type Visitor } from "@/data/seedQueue";

const STATUS_CLS: Record<string, string> = {
  Inside:   "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Checked Out": "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

function AddVisitorDrawer({ onClose, onAdd }: { onClose: () => void; onAdd: (v: Omit<Visitor, "id" | "badgeNo" | "inTime" | "outTime" | "status">) => void }) {
  const [name,     setName]    = useState("");
  const [relation, setRelation]= useState("");
  const [patient,  setPatient] = useState("");
  const [ward,     setWard]    = useState("");

  const submit = () => {
    if (!name.trim() || !patient.trim()) return;
    onAdd({ visitorName: name.trim(), relation: relation.trim(), patientName: patient.trim(), ward: ward.trim() });
    onClose();
  };

  const inputCls = "w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]";
  const labelCls = "block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-sm flex-col bg-[var(--surface-raised)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-5 py-4">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Register Visitor</h3>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
          <div><label className={labelCls}>Visitor Name *</label><input className={inputCls} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><label className={labelCls}>Relation to Patient</label><input className={inputCls} placeholder="e.g. Son, Wife" value={relation} onChange={(e) => setRelation(e.target.value)} /></div>
          <div><label className={labelCls}>Patient Name *</label><input className={inputCls} placeholder="Patient being visited" value={patient} onChange={(e) => setPatient(e.target.value)} /></div>
          <div><label className={labelCls}>Ward / Bed</label><input className={inputCls} placeholder="e.g. Ward 3 / Bed 12" value={ward} onChange={(e) => setWard(e.target.value)} /></div>
        </div>
        <div className="flex gap-3 border-t border-[var(--border-default)] px-5 py-4">
          <button onClick={onClose} className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-sm font-medium text-[var(--text-secondary)]">Cancel</button>
          <button onClick={submit} disabled={!name.trim() || !patient.trim()} className="flex-1 rounded-lg bg-[var(--action-primary)] py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50">Register</button>
        </div>
      </div>
    </div>
  );
}

let badgeSeq = 100;
function genBadge() { return `VB-${String(++badgeSeq).padStart(4, "0")}`; }
function now() { return new Date().toTimeString().slice(0, 5); }

export default function VisitorsPage() {
  const { toast }  = useToast();
  const [visitors, setVisitors] = useState<Visitor[]>(seedVisitors);
  const [query,    setQuery]    = useState("");
  const [filter,   setFilter]   = useState<"all" | "Inside" | "Checked Out">("Inside");
  const [showAdd,  setShowAdd]  = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return visitors.filter((v) => {
      if (filter !== "all" && v.status !== filter) return false;
      if (q && !(v.visitorName.toLowerCase().includes(q) || v.patientName.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [visitors, query, filter]);

  const inside    = visitors.filter((v) => v.status === "Inside").length;
  const checkedOut= visitors.filter((v) => v.status === "Checked Out").length;

  const handleCheckOut = (id: string) => {
    setVisitors((prev) => prev.map((v) => v.id === id ? { ...v, status: "Checked Out", outTime: now() } : v));
    toast("Visitor checked out");
  };

  const handleAdd = (data: Omit<Visitor, "id" | "badgeNo" | "inTime" | "outTime" | "status">) => {
    const newVisitor: Visitor = {
      id: `V${Date.now()}`,
      badgeNo: genBadge(),
      inTime: now(),
      outTime: undefined,
      status: "Inside",
      ...data,
    };
    setVisitors((prev) => [newVisitor, ...prev]);
    toast(`Visitor badge ${newVisitor.badgeNo} issued to ${data.visitorName}`);
  };

  return (
    <div className="space-y-5 pb-8">
      {showAdd && <AddVisitorDrawer onClose={() => setShowAdd(false)} onAdd={handleAdd} />}

      <PageHeader
        title="Visitor Management"
        subtitle="Track and manage hospital visitors"
        action={
          <button onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors">
            <Plus size={15} /> Register Visitor
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Currently Inside" value={inside}     icon={<Users size={16} />}      colorClass="text-[var(--normal-fg)]" />
        <KpiCard label="Checked Out"      value={checkedOut} icon={<LogOut size={16} />}      colorClass="text-[var(--text-secondary)]" />
        <KpiCard label="Total Today"      value={visitors.length} icon={<BadgeCheck size={16} />} colorClass="text-[var(--action-primary)]" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--action-primary)]"
            placeholder="Search visitor or patient…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        {(["all", "Inside", "Checked Out"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${filter === f ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="hidden grid-cols-[90px_1fr_100px_1fr_1fr_80px_80px_120px_auto] gap-3 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
          <span>Badge</span>
          <span>Visitor</span>
          <span>Relation</span>
          <span>Patient</span>
          <span>Ward / Bed</span>
          <span>In</span>
          <span>Out</span>
          <span>Status</span>
          <span />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<Users size={32} />} message="No visitors found" actionLabel="Register Visitor" onAction={() => setShowAdd(true)} />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((v) => (
              <div key={v.id} className="grid grid-cols-1 gap-1.5 px-5 py-3 hover:bg-[var(--surface-sunken)] transition-colors md:grid-cols-[90px_1fr_100px_1fr_1fr_80px_80px_120px_auto] md:items-center md:gap-3">
                <span className="rounded-lg bg-[var(--action-subtle)] px-2 py-1 text-center text-[11px] font-bold text-[var(--action-primary)] font-mono">{v.badgeNo}</span>
                <p className="text-sm font-medium text-[var(--text-primary)]">{v.visitorName}</p>
                <p className="text-xs text-[var(--text-secondary)]">{v.relation || "—"}</p>
                <p className="text-sm text-[var(--text-primary)]">{v.patientName}</p>
                <p className="text-xs text-[var(--text-secondary)]">{v.ward || "—"}</p>
                <p className="text-xs font-medium tabular-nums text-[var(--text-primary)]">{v.inTime}</p>
                <p className="text-xs tabular-nums text-[var(--text-secondary)]">{v.outTime ?? "—"}</p>
                <StatusBadge label={v.status} colorClass={STATUS_CLS[v.status] ?? ""} />
                {v.status === "Inside" && (
                  <button onClick={() => handleCheckOut(v.id)}
                    className="flex items-center gap-1.5 rounded-lg border border-[var(--border-default)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] whitespace-nowrap">
                    <LogOut size={12} /> Check Out
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
