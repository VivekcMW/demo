"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/useOrderStore";
import { usePatientStore } from "@/store/usePatientStore";
import type { OrderType, OrderPriority } from "@/data/seedOrders";
import {
  X, FlaskConical, Pill, ScanLine, UserCheck,
  Stethoscope, UtensilsCrossed, Search, ChevronDown,
} from "lucide-react";

// ── Type config ───────────────────────────────────────────────────────────────

const ORDER_TYPES: { type: OrderType; label: string; icon: React.ReactNode; cls: string }[] = [
  { type: "Lab",        label: "Lab",        icon: <FlaskConical size={15} />,    cls: "border-[var(--info-fg)] text-[var(--info-fg)]" },
  { type: "Medication", label: "Medication", icon: <Pill size={15} />,            cls: "border-[var(--normal-fg)] text-[var(--normal-fg)]" },
  { type: "Imaging",    label: "Imaging",    icon: <ScanLine size={15} />,        cls: "border-[var(--action-primary)] text-[var(--action-primary)]" },
  { type: "Referral",   label: "Referral",   icon: <UserCheck size={15} />,       cls: "border-[var(--warning-fg)] text-[var(--warning-fg)]" },
  { type: "Procedure",  label: "Procedure",  icon: <Stethoscope size={15} />,     cls: "border-[var(--critical-fg)] text-[var(--critical-fg)]" },
  { type: "Diet",       label: "Diet",       icon: <UtensilsCrossed size={15} />, cls: "border-[var(--text-secondary)] text-[var(--text-secondary)]" },
];

// Common order suggestions per type
const SUGGESTIONS: Partial<Record<OrderType, string[]>> = {
  Lab:       ["CBC with Differential", "HbA1c", "Fasting Blood Sugar", "Lipid Profile", "LFT", "KFT", "TSH + Free T4", "Serum Creatinine + eGFR", "Troponin I (High Sensitivity)", "Urine Routine"],
  Medication:["Metformin 500mg", "Amlodipine 5mg", "Atorvastatin 20mg", "Aspirin 75mg", "Levothyroxine 50mcg", "Pantoprazole 40mg", "Losartan 50mg", "Insulin Glargine 10U"],
  Imaging:   ["Chest X-Ray (PA view)", "ECG (Resting)", "Ultrasound Abdomen", "CT Head (Plain)", "MRI Brain", "X-Ray Bilateral Knee", "2D Echo", "Doppler Lower Limb"],
  Referral:  ["Cardiology Referral", "Nephrology Referral", "Orthopaedics Referral", "Pulmonology Referral", "Endocrinology Referral", "Ophthalmology Referral"],
  Procedure: ["IV Cannulation", "Nebulisation (Salbutamol)", "Wound Dressing Change", "NG Tube Insertion", "Foley Catheter Insertion", "ABG Sampling"],
  Diet:      ["Soft Bland Diet", "Low Sodium Diet", "Diabetic Diet (1800 kcal)", "High Protein Diet", "Renal Diet", "NPO (Nil Per Oral)"],
};

// ── Form state ────────────────────────────────────────────────────────────────

interface FormState {
  patientSearch: string;
  patientId: string;
  patientName: string;
  type: OrderType | "";
  title: string;
  details: string;
  priority: OrderPriority;
  orderedBy: string;
  notes: string;
}

function emptyForm(prefill?: { patientId?: string; patientName?: string }): FormState {
  return {
    patientSearch: prefill?.patientName ?? "",
    patientId:     prefill?.patientId  ?? "",
    patientName:   prefill?.patientName ?? "",
    type:          "",
    title:         "",
    details:       "",
    priority:      "Routine",
    orderedBy:     "Dr. Ananya Krishnan",
    notes:         "",
  };
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface NewOrderDrawerProps {
  open: boolean;
  onClose: () => void;
  prefillPatientId?: string;
  prefillPatientName?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function NewOrderDrawer({
  open, onClose,
  prefillPatientId,
  prefillPatientName,
}: NewOrderDrawerProps) {
  const addOrder  = useOrderStore((s) => s.addOrder);
  const patients  = usePatientStore((s) => s.patients);
  const router    = useRouter();

  const [form, setForm]               = useState<FormState>(() => emptyForm({ patientId: prefillPatientId, patientName: prefillPatientName }));
  const [patientDropdown, setPatientDropdown] = useState(false);
  const [suggDropdown, setSuggDropdown]       = useState(false);
  const [errors, setErrors]           = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted]     = useState(false);

  const patientLocked = !!(prefillPatientId);

  // Patient search filter
  const matchedPatients = form.patientSearch.trim().length > 0
    ? patients.filter((p) =>
        p.name.toLowerCase().includes(form.patientSearch.toLowerCase()) ||
        p.uhid.toLowerCase().includes(form.patientSearch.toLowerCase()) ||
        p.phone.includes(form.patientSearch)
      ).slice(0, 6)
    : [];

  const suggestions = form.type ? (SUGGESTIONS[form.type as OrderType] ?? []) : [];

  function set<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.patientId)  e.patientId = "Select a patient";
    if (!form.type)       e.type      = "Select an order type";
    if (!form.title.trim()) e.title   = "Enter an order title";
    if (!form.orderedBy.trim()) e.orderedBy = "Enter ordering doctor name";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;
    const order = addOrder({
      patientId:   form.patientId,
      patientName: form.patientName,
      orderedBy:   form.orderedBy,
      type:        form.type as OrderType,
      title:       form.title,
      details:     form.details,
      priority:    form.priority,
      notes:       form.notes || undefined,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(emptyForm({ patientId: prefillPatientId, patientName: prefillPatientName }));
      onClose();
      router.push(`/orders/${order.id}`);
    }, 1200);
  }

  function handleClose() {
    setForm(emptyForm({ patientId: prefillPatientId, patientName: prefillPatientName }));
    setErrors({});
    setSubmitted(false);
    onClose();
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={handleClose} aria-hidden />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-default)] px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-[var(--text-primary)]">New Order</h2>
            <p className="text-xs text-[var(--text-secondary)]">Computerized Physician Order Entry</p>
          </div>
          <button onClick={handleClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Success overlay */}
        {submitted && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[var(--surface-raised)] gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--normal-bg)]">
              <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-[var(--normal-fg)]" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">Order Placed</p>
            <p className="text-sm text-[var(--text-secondary)]">Redirecting to order detail…</p>
          </div>
        )}

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

          {/* ── Patient ─────────────────────────────────────────────────────── */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">1. Patient</p>
            {patientLocked ? (
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--action-primary)] text-xs font-bold text-white">
                  {form.patientName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{form.patientName}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{form.patientId}</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
                  <input
                    type="text"
                    placeholder="Search patient by name, UHID or phone…"
                    value={form.patientSearch}
                    onFocus={() => setPatientDropdown(true)}
                    onChange={(e) => { set("patientSearch", e.target.value); set("patientId", ""); set("patientName", ""); setPatientDropdown(true); }}
                    className={`w-full rounded-lg border bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] ${errors.patientId ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"}`}
                  />
                </div>
                {patientDropdown && matchedPatients.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-10 mt-1 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-xl overflow-hidden">
                    {matchedPatients.map((p) => (
                      <button
                        key={p.id}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-[var(--surface-sunken)] transition-colors"
                        onClick={() => {
                          set("patientId", p.id);
                          set("patientName", p.name);
                          set("patientSearch", p.name);
                          setPatientDropdown(false);
                        }}
                      >
                        <span className="text-sm font-medium text-[var(--text-primary)]">{p.name}</span>
                        <span className="text-xs text-[var(--text-secondary)]">{p.uhid} · {p.age}y {p.sex}</span>
                      </button>
                    ))}
                  </div>
                )}
                {errors.patientId && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.patientId}</p>}
              </div>
            )}
          </div>

          {/* ── Order type ──────────────────────────────────────────────────── */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">2. Order Type</p>
            <div className="grid grid-cols-3 gap-2">
              {ORDER_TYPES.map((t) => (
                <button
                  key={t.type}
                  onClick={() => { set("type", t.type); set("title", ""); }}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 text-xs font-medium transition-colors ${
                    form.type === t.type
                      ? `${t.cls} bg-[var(--surface-sunken)]`
                      : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)] hover:text-[var(--action-primary)]"
                  }`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
            {errors.type && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.type}</p>}
          </div>

          {/* ── Title ───────────────────────────────────────────────────────── */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">3. Order Title</p>
            <div className="relative">
              <input
                type="text"
                placeholder={form.type ? `e.g. ${suggestions[0] ?? "Order title"}` : "Select order type first…"}
                value={form.title}
                disabled={!form.type}
                onFocus={() => setSuggDropdown(true)}
                onBlur={() => setTimeout(() => setSuggDropdown(false), 150)}
                onChange={(e) => set("title", e.target.value)}
                className={`w-full rounded-lg border bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] disabled:opacity-50 ${errors.title ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"}`}
              />
              {suggestions.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSuggDropdown((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
                >
                  <ChevronDown size={14} />
                </button>
              )}
              {suggDropdown && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-48 overflow-y-auto rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] shadow-xl">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      className="flex w-full items-center px-4 py-2.5 text-left text-sm hover:bg-[var(--surface-sunken)] transition-colors text-[var(--text-primary)]"
                      onClick={() => { set("title", s); setSuggDropdown(false); }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {errors.title && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.title}</p>}
          </div>

          {/* ── Priority ────────────────────────────────────────────────────── */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">4. Priority</p>
            <div className="flex gap-2">
              {(["Routine", "Urgent", "STAT"] as OrderPriority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => set("priority", p)}
                  className={`flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold transition-colors ${
                    form.priority === p
                      ? p === "STAT"   ? "border-[var(--critical-fg)] bg-[var(--critical-bg)] text-[var(--critical-fg)]"
                      : p === "Urgent" ? "border-[var(--warning-fg)] bg-[var(--warning-bg)] text-[var(--warning-fg)]"
                      : "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]"
                      : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* ── Details ─────────────────────────────────────────────────────── */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">5. Details / Instructions</p>
            <textarea
              rows={3}
              placeholder="Fasting required · urgency notes · specific instructions…"
              value={form.details}
              onChange={(e) => set("details", e.target.value)}
              className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
            />
          </div>

          {/* ── Ordered by ──────────────────────────────────────────────────── */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">6. Ordered By</p>
            <input
              type="text"
              value={form.orderedBy}
              onChange={(e) => set("orderedBy", e.target.value)}
              className={`w-full rounded-lg border bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] ${errors.orderedBy ? "border-[var(--critical-fg)]" : "border-[var(--border-default)]"}`}
            />
            {errors.orderedBy && <p className="mt-1 text-xs text-[var(--critical-fg)]">{errors.orderedBy}</p>}
          </div>

          {/* ── Notes ───────────────────────────────────────────────────────── */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">7. Clinical Notes <span className="normal-case font-normal">(optional)</span></p>
            <textarea
              rows={2}
              placeholder="Any additional clinical context…"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="flex gap-3 border-t border-[var(--border-default)] px-6 py-4">
          <button
            onClick={handleClose}
            className="flex-1 rounded-xl border border-[var(--border-default)] py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 rounded-xl bg-[var(--action-primary)] py-3 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
