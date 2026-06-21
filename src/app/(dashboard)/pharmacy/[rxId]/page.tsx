"use client";

import { use, useState } from "react";
import Link from "next/link";
import { usePharmacyStore, type RxStatus, type RxItem } from "@/store/usePharmacyStore";
import { useToast } from "@/components/ui/ToastProvider";
import {
  ChevronLeft, Pill, ShieldAlert, ShieldCheck, CheckCircle2,
  AlertCircle, PackageCheck, Package, X, Loader2,
  Clock, ClipboardList, FileText, AlertTriangle,
} from "lucide-react";
import { PdfDownloadButton } from "@/components/ui/PdfActions";

// ── DS helpers ────────────────────────────────────────────────────────────────

const STATUS_CLS: Record<RxStatus, string> = {
  "Pending":              "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Verified":             "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  "Dispensing":           "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "Dispensed":            "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Partially Dispensed":  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "On Hold":              "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  "Cancelled":            "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const STOCK_CLS = {
  "Available":     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Low Stock":     "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "Out of Stock":  "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
} as const;

function fmtDT(d?: string) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
}

// ── Hold / Cancel dialogs ─────────────────────────────────────────────────────

function NoteDialog({ title, label, btnLabel, btnCls, onClose, onConfirm }: {
  title: string; label: string; btnLabel: string; btnCls: string;
  onClose: () => void; onConfirm: (note: string) => void;
}) {
  const [note, setNote] = useState("");
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/4 z-50 mx-auto max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-[var(--text-primary)]">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">{label}</label>
        <textarea
          rows={3}
          className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter reason…"
        />
        <div className="mt-4 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
            Cancel
          </button>
          <button
            disabled={!note.trim()}
            onClick={() => onConfirm(note.trim())}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white disabled:opacity-50 ${btnCls}`}
          >
            {btnLabel}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Dispense item row ─────────────────────────────────────────────────────────

function ItemRow({ item, readOnly, onDispense }: {
  item: RxItem;
  readOnly: boolean;
  onDispense: (qty: number) => void;
}) {
  const [qty, setQty] = useState(item.qty - item.qtyDispensed);
  const fullyDispensed = item.qtyDispensed >= item.qty;
  const pct = item.qty > 0 ? Math.round((item.qtyDispensed / item.qty) * 100) : 0;

  return (
    <div className={`rounded-xl border p-4 space-y-3 ${fullyDispensed ? "border-green-200 bg-green-50/50" : item.stockStatus === "Out of Stock" ? "border-[var(--critical-fg)]/20 bg-[var(--critical-bg)]/30" : "border-[var(--border-default)]"}`}>
      {/* Drug header */}
      <div className="flex flex-wrap items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{item.drug}</p>
            {item.substituted && <span className="rounded-full bg-[var(--warning-bg)] px-2 py-0.5 text-[10px] font-semibold text-[var(--warning-fg)]">Substituted</span>}
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STOCK_CLS[item.stockStatus]}`}>{item.stockStatus}</span>
            {fullyDispensed && <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">✓ Dispensed</span>}
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.genericName} · {item.form} · {item.strength}</p>
          <p className="text-xs text-[var(--text-secondary)]">{item.dose} · {item.frequency} · {item.duration} · <span className="font-medium">{item.route}</span></p>
          {item.instructions && (
            <p className="mt-1 text-xs italic text-[var(--warning-fg)]">ℹ {item.instructions}</p>
          )}
        </div>
        <div className="text-right text-xs text-[var(--text-secondary)]">
          <p className="text-sm font-bold text-[var(--text-primary)] tabular-nums">Qty: {item.qty}</p>
          <p>₹{item.unitPrice.toFixed(2)}/unit</p>
          <p className="font-semibold text-[var(--text-primary)]">₹{(item.qty * item.unitPrice).toFixed(2)}</p>
        </div>
      </div>

      {/* Dispense progress */}
      <div>
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] mb-1">
          <span>Dispensed: {item.qtyDispensed} / {item.qty}</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-[var(--surface-sunken)]">
          <div className="h-1.5 rounded-full bg-[var(--action-primary)] transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Dispense control */}
      {!readOnly && !fullyDispensed && item.stockStatus !== "Out of Stock" && (
        <div className="flex items-center gap-2">
          <label className="text-xs text-[var(--text-secondary)] shrink-0">Qty to dispense:</label>
          <input
            type="number"
            min={0}
            max={item.qty - item.qtyDispensed}
            value={qty}
            onChange={(e) => setQty(Math.min(item.qty - item.qtyDispensed, Math.max(0, parseInt(e.target.value) || 0)))}
            className="w-20 rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-2 py-1.5 text-sm outline-none focus:border-[var(--action-primary)] tabular-nums text-center"
          />
          <button
            onClick={() => onDispense(item.qtyDispensed + qty)}
            disabled={qty === 0}
            className="flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-40"
          >
            <Package size={12} /> Dispense
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function PharmacyDetailPage({ params }: { params: Promise<{ rxId: string }> }) {
  const { rxId }      = use(params);
  const store         = usePharmacyStore();
  const rx            = store.getById(rxId);

  const [holdOpen,    setHoldOpen]   = useState(false);
  const [cancelOpen,  setCancelOpen] = useState(false);
  const [dispensing,  setDispensing] = useState(false);
  const { toast } = useToast();

  if (!rx) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-4 text-[var(--warning-fg)] opacity-60" />
        <p className="text-[var(--text-secondary)]">Prescription not found</p>
        <Link href="/pharmacy" className="mt-3 text-sm text-[var(--action-primary)] underline">Back to Pharmacy</Link>
      </div>
    );
  }

  const isClosed  = rx.status === "Dispensed" || rx.status === "Cancelled";
  const isOnHold  = rx.status === "On Hold";
  const canVerify = rx.status === "Pending";
  const canDispense = rx.status === "Verified" || rx.status === "Dispensing" || rx.status === "Partially Dispensed";
  const allDispensed = rx.items.every((i) => i.qtyDispensed >= i.qty);

  function handleVerify() {
    store.verifyRx(rx?.id ?? "", "Pharm. User");
    toast("Prescription verified", "success");
  }

  function handleDispenseAll() {
    setDispensing(true);
    setTimeout(() => {
      store.dispenseAll(rx?.id ?? "", "Pharm. User");
      setDispensing(false);
      toast("All items dispensed successfully", "success");
    }, 500);
  }

  function handleItemDispense(itemId: string, qty: number) {
    store.dispenseItem(rx?.id ?? "", itemId, qty, "Pharm. User");
    toast("Item dispensed", "success");
  }

  const grandTotal = rx.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);

  const timeline = [
    { label: "Received",   at: rx.receivedAt,  by: rx.prescribedBy },
    rx.verifiedAt  ? { label: "Verified",   at: rx.verifiedAt,  by: rx.verifiedBy  ?? "—" } : null,
    rx.dispensedAt ? { label: "Dispensed",  at: rx.dispensedAt, by: rx.dispensedBy ?? "—" } : null,
  ].filter(Boolean) as { label: string; at: string; by: string }[];

  return (
    <div className="space-y-0 pb-8">

      {/* Dialogs */}
      {holdOpen && (
        <NoteDialog
          title="Place Rx On Hold"
          label="Reason for hold (will be visible to prescriber)"
          btnLabel="Confirm Hold"
          btnCls="bg-[var(--warning-fg)]"
          onClose={() => setHoldOpen(false)}
          onConfirm={(note) => { store.holdRx(rx.id, note); setHoldOpen(false); }}
        />
      )}
      {cancelOpen && (
        <NoteDialog
          title="Cancel Prescription"
          label="Reason for cancellation *"
          btnLabel="Cancel Rx"
          btnCls="bg-[var(--critical-fg)]"
          onClose={() => setCancelOpen(false)}
          onConfirm={(note) => { store.cancelRx(rx.id, note); setCancelOpen(false); }}
        />
      )}

      {/* Sticky header */}
      <div className="sticky top-0 z-30 border-b border-[var(--border-default)] bg-[var(--surface-raised)] py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/pharmacy" className="flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--action-primary)]">
              <ChevronLeft size={15} /> Back
            </Link>
            <span className="text-[var(--border-default)]">/</span>
            <div>
              <p className="font-mono text-xs text-[var(--text-secondary)]">{rx.id}</p>
              <h1 className="text-base font-semibold text-[var(--text-primary)] leading-tight">{rx.patientName}</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLS[rx.status]}`}>
              {rx.status}
            </span>

            {/* Action buttons */}
            {canVerify && (
              <button onClick={handleVerify} className="flex items-center gap-1.5 rounded-xl border border-[var(--action-primary)] bg-[var(--action-subtle)] px-4 py-2 text-sm font-semibold text-[var(--action-primary)] hover:bg-[var(--action-primary)] hover:text-white transition-colors">
                <CheckCircle2 size={14} /> Verify
              </button>
            )}
            {canDispense && !allDispensed && (
              <button
                onClick={handleDispenseAll}
                disabled={dispensing}
                className="flex items-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-60"
              >
                {dispensing ? <><Loader2 size={14} className="animate-spin" /> Dispensing…</> : <><PackageCheck size={14} /> Dispense All</>}
              </button>
            )}
            {!isClosed && !isOnHold && (
              <button onClick={() => setHoldOpen(true)} className="rounded-xl border border-[var(--warning-fg)] px-3 py-2 text-xs font-semibold text-[var(--warning-fg)] hover:bg-[var(--warning-bg)] transition-colors">
                Hold
              </button>
            )}
            {isOnHold && (
              <button onClick={() => store.resumeRx(rx.id)} className="rounded-xl border border-[var(--action-primary)] px-3 py-2 text-xs font-semibold text-[var(--action-primary)] hover:bg-[var(--action-subtle)] transition-colors">
                Resume
              </button>
            )}
            {!isClosed && (
              <button onClick={() => setCancelOpen(true)} className="rounded-xl border border-[var(--critical-fg)] px-3 py-2 text-xs font-semibold text-[var(--critical-fg)] hover:bg-[var(--critical-bg)] transition-colors">
                Cancel
              </button>
            )}
            <PdfDownloadButton template="prescription" id={rx.id} filename={`prescription-${rx.id}.pdf`} />
          </div>
        </div>
      </div>

      {/* Dispensed / Cancelled banners */}
      {rx.status === "Dispensed" && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          <ShieldCheck size={16} className="shrink-0" />
          <div>
            <p className="font-semibold">Dispensed</p>
            <p className="text-xs text-green-700 mt-0.5">By {rx.dispensedBy} on {fmtDT(rx.dispensedAt)}</p>
          </div>
        </div>
      )}
      {rx.status === "Cancelled" && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3 text-sm text-[var(--critical-fg)]">
          <X size={16} className="shrink-0" />
          <div>
            <p className="font-semibold">Prescription Cancelled</p>
            {rx.notes && <p className="text-xs mt-0.5">{rx.notes}</p>}
          </div>
        </div>
      )}
      {rx.status === "On Hold" && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] px-4 py-3 text-sm text-[var(--warning-fg)]">
          <AlertCircle size={16} className="shrink-0" />
          <div>
            <p className="font-semibold">On Hold — Pharmacist Query</p>
            {rx.notes && <p className="text-xs mt-0.5">{rx.notes}</p>}
          </div>
        </div>
      )}

      {/* Allergy alert */}
      {(rx.allergies?.length ?? 0) > 0 && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3 text-sm text-[var(--critical-fg)]">
          <ShieldAlert size={16} className="shrink-0" />
          <p><span className="font-bold">Known Allergies: </span>{rx.allergies?.join(", ")}</p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start">

        {/* Left sidebar */}
        <aside className="w-full space-y-3 lg:w-64 lg:shrink-0">

          {/* Prescription info */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Prescription Info</p>
            </div>
            <dl className="divide-y divide-[var(--border-default)] text-sm">
              {[
                ["Source",     rx.source],
                ["Prescribed by", rx.prescribedBy],
                ["Department", rx.dept],
                ["Received",   fmtDT(rx.receivedAt)],
                ["Verified",   fmtDT(rx.verifiedAt)],
                ["Dispensed",  fmtDT(rx.dispensedAt)],
              ].map(([l, v]) => (
                <div key={l} className="flex items-start justify-between gap-3 px-4 py-2.5">
                  <dt className="shrink-0 text-xs text-[var(--text-secondary)]">{l}</dt>
                  <dd className="text-xs font-medium text-[var(--text-primary)] text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Patient quick-link */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Patient</p>
            </div>
            <Link href={`/patients/${rx.patientId}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-sunken)] transition-colors group">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--action-primary)] text-white text-sm font-bold">
                {rx.patientName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{rx.patientName}</p>
                <p className="font-mono text-xs text-[var(--action-primary)]">{rx.patientId}</p>
                {rx.patientAge && <p className="text-xs text-[var(--text-secondary)]">{rx.patientAge}y · {rx.patientSex === "M" ? "Male" : "Female"}</p>}
              </div>
            </Link>
          </div>

          {/* Links */}
          {(rx.examId || rx.admissionId) && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Linked Records</p>
              </div>
              <div className="divide-y divide-[var(--border-default)]">
                {rx.examId && (
                  <Link href={`/examination/${rx.examId}`} className="flex items-center gap-2 px-4 py-3 text-xs text-[var(--action-primary)] hover:bg-[var(--surface-sunken)]">
                    <FileText size={12} /> {rx.examId}
                  </Link>
                )}
                {rx.admissionId && (
                  <Link href={`/ipd/${rx.admissionId}`} className="flex items-center gap-2 px-4 py-3 text-xs text-[var(--action-primary)] hover:bg-[var(--surface-sunken)]">
                    <ClipboardList size={12} /> {rx.admissionId}
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Timeline</p>
            </div>
            <div className="px-4 py-3 space-y-3">
              {timeline.map((ev, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-6 w-6 rounded-full bg-[var(--action-subtle)] flex items-center justify-center shrink-0">
                      <Clock size={10} className="text-[var(--action-primary)]" />
                    </div>
                    {i < timeline.length - 1 && <div className="my-1 w-0.5 h-4 bg-[var(--border-default)]" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{ev.label}</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{fmtDT(ev.at)}</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{ev.by}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {rx.notes && (
            <div className="rounded-xl border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--warning-fg)]">Notes</p>
              <p className="text-sm text-[var(--warning-fg)]">{rx.notes}</p>
            </div>
          )}
        </aside>

        {/* Right panel */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Drug items */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
              <div className="flex items-center gap-2">
                <Pill size={14} className="text-[var(--action-primary)]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Prescribed Drugs ({rx.items.length})</p>
              </div>
              {canDispense && !allDispensed && !dispensing && (
                <p className="text-xs text-[var(--text-secondary)]">Dispense individually below or use &quot;Dispense All&quot;</p>
              )}
            </div>
            <div className="p-5 space-y-3">
              {rx.items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  readOnly={isClosed || isOnHold}
                  onDispense={(qty) => handleItemDispense(item.id, qty)}
                />
              ))}
            </div>

            {/* Invoice footer */}
            <div className="border-t border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--text-secondary)]">Total Amount</p>
                <p className="text-lg font-bold tabular-nums text-[var(--text-primary)]">
                  ₹{grandTotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {rx.items.length} drug{rx.items.length !== 1 ? "s" : ""} ·
                {rx.items.reduce((s, i) => s + i.qty, 0)} total units
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
