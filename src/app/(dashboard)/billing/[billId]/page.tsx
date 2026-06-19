"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBillingStore, type Bill, type BillStatus, type BillCategory, type PaymentMethod } from "@/store/useBillingStore";
import { useClaimStore } from "@/store/useClaimStore";
import {
  ArrowLeft, ChevronRight, IndianRupee,
  AlertTriangle, Clock, X, Loader2, User,
  BedDouble, Printer, Receipt, BadgePercent, RotateCcw,
  Package, FileText,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const STATUS_CLS: Record<BillStatus, string> = {
  Draft:            "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Pending:          "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Partially Paid": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Paid:             "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Overdue:          "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Cancelled:        "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Waived:           "bg-[var(--action-subtle)] text-[var(--action-primary)]",
};

const CATEGORY_CLS: Record<BillCategory, string> = {
  OPD:       "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  IPD:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Lab:       "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Imaging:   "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Pharmacy:  "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Procedure: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Emergency: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
};

const PAYMENT_METHODS: PaymentMethod[] = ["Cash", "UPI", "Card", "NEFT", "Insurance", "Cheque"];

function fmt(n: number) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtDateTime(d: string) {
  return new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true });
}

// ── Record Payment Dialog ─────────────────────────────────────────────────────

interface PayDialogProps {
  bill: Bill;
  onClose: () => void;
}

function RecordPaymentDialog({ bill, onClose }: PayDialogProps) {
  const recordPayment = useBillingStore((s) => s.recordPayment);
  const [amount, setAmount]   = useState(String(bill.amountDue));
  const [method, setMethod]   = useState<PaymentMethod>("Cash");
  const [ref, setRef]         = useState("");
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState("");

  function handleSubmit() {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) { setError("Enter a valid amount"); return; }
    if (amt > bill.amountDue + 0.01) { setError(`Amount cannot exceed ₹${fmt(bill.amountDue)}`); return; }
    setSaving(true);
    setTimeout(() => {
      recordPayment({ billId: bill.id, amount: amt, method, ref: ref.trim() || undefined, by: "Cashier" });
      setSaving(false);
      onClose();
    }, 500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--text-primary)]">Record Payment</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>

        <div className="mb-4 rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--text-secondary)]">Grand Total</span>
            <span className="font-semibold tabular-nums">₹{fmt(bill.grandTotal)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[var(--text-secondary)]">Already Paid</span>
            <span className="font-semibold tabular-nums text-[var(--normal-fg)]">₹{fmt(bill.amountPaid)}</span>
          </div>
          <div className="flex justify-between mt-1 pt-1 border-t border-[var(--border-default)]">
            <span className="font-semibold text-[var(--text-primary)]">Amount Due</span>
            <span className="font-bold tabular-nums text-[var(--critical-fg)]">₹{fmt(bill.amountDue)}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Amount (₹) *</label>
            <input
              type="number"
              min={1}
              max={bill.amountDue}
              value={amount}
              onChange={(e) => { setAmount(e.target.value); setError(""); }}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
            />
            {error && <p className="mt-1 text-xs text-[var(--critical-fg)]">{error}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Payment Method *</label>
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${method === m ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {(method === "UPI" || method === "NEFT" || method === "Cheque" || method === "Insurance") && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                {method === "UPI" ? "UPI Transaction ID" : method === "NEFT" ? "NEFT Reference" : method === "Insurance" ? "Insurance Claim Ref" : "Cheque No."}
              </label>
              <input
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                placeholder="Enter reference number…"
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
              />
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-60"
          >
            {saving ? <><Loader2 size={13} className="animate-spin" /> Recording…</> : "Record Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Waive Dialog ──────────────────────────────────────────────────────────────

function WaiveDialog({ bill, onClose }: { bill: Bill; onClose: () => void }) {
  const waiveBill = useBillingStore((s) => s.waiveBill);
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSubmit() {
    setSaving(true);
    setTimeout(() => {
      waiveBill(bill.id, "Billing Officer", note.trim() || undefined);
      setSaving(false);
      onClose();
    }, 400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--text-primary)]">Waive Bill</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>
        <div className="mb-4 rounded-xl border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] px-4 py-3">
          <p className="text-sm text-[var(--warning-fg)]">This will waive the remaining balance of <strong>₹{fmt(bill.amountDue)}</strong> and mark the bill as Waived.</p>
        </div>
        <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Reason (optional)</label>
        <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. BPL patient — hospital policy waiver" className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]" />
        <div className="mt-4 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button onClick={handleSubmit} disabled={saving} className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-60">
            {saving ? <><Loader2 size={13} className="animate-spin" /> Waiving…</> : "Confirm Waive"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Discount Request Dialog ────────────────────────────────────────────────────

function DiscountDialog({ bill, onClose }: { bill: Bill; onClose: () => void }) {
  const requestDiscount = useBillingStore((s) => s.requestDiscount);
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSubmit() {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || amt > bill.amountDue) return;
    setSaving(true);
    setTimeout(() => {
      requestDiscount({ billId: bill.id, amount: amt, reason: reason.trim(), requestedBy: "Billing Officer" });
      setSaving(false);
      onClose();
    }, 400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--text-primary)]">Request Discount</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>
        <div className="mb-4 rounded-xl border border-[var(--info-bg)] px-4 py-3 text-sm text-[var(--info-fg)]">
          Current due: <strong>₹{bill.amountDue.toLocaleString("en-IN")}</strong>
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Discount Amount (₹) *</label>
            <input type="number" min={1} max={bill.amountDue} value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Reason *</label>
            <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)}
              className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]"
              placeholder="e.g. Corporate discount, loyalty discount…" />
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button onClick={handleSubmit} disabled={saving || !amount || !reason}
            className="flex-1 rounded-xl bg-[var(--action-primary)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-60">
            {saving ? "Requesting…" : "Request Discount"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Refund Dialog ──────────────────────────────────────────────────────────────

function RefundDialog({ bill, onClose }: { bill: Bill; onClose: () => void }) {
  const processRefund = useBillingStore((s) => s.processRefund);
  const [amount, setAmount] = useState(String(bill.amountPaid));
  const [method, setMethod] = useState<PaymentMethod>("Cash");
  const [reason, setReason] = useState("");
  const [ref, setRef] = useState("");
  const [saving, setSaving] = useState(false);

  function handleSubmit() {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0 || amt > bill.amountPaid) return;
    setSaving(true);
    setTimeout(() => {
      processRefund({
        billId: bill.id, amount: amt, reason: reason.trim(),
        method, ref: ref.trim() || undefined,
        originalPaymentIds: bill.payments.map((p) => p.id),
        processedBy: "Billing Officer",
      });
      setSaving(false);
      onClose();
    }, 400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--text-primary)]">Process Refund</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>
        <div className="mb-4 rounded-xl border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] px-4 py-3 text-sm text-[var(--warning-fg)]">
          Max refund: <strong>₹{bill.amountPaid.toLocaleString("en-IN")}</strong> (total paid)
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Refund Amount (₹) *</label>
            <input type="number" min={1} max={bill.amountPaid} value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Refund Method *</label>
            <div className="flex flex-wrap gap-2">
              {["Cash", "UPI", "NEFT", "Cheque"].map((m) => (
                <button key={m} onClick={() => setMethod(m as PaymentMethod)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium ${method === m ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)]"}`}>{m}</button>
              ))}
            </div>
          </div>
          {method !== "Cash" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Reference</label>
              <input value={ref} onChange={(e) => setRef(e.target.value)}
                className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]" />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Reason *</label>
            <textarea rows={2} value={reason} onChange={(e) => setReason(e.target.value)}
              className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]"
              placeholder="e.g. Duplicate payment / Service not rendered…" />
          </div>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)]">Cancel</button>
          <button onClick={handleSubmit} disabled={saving || !amount || !reason}
            className="flex-1 rounded-xl bg-[var(--critical-fg)] py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Processing…" : "Process Refund"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Package Dialog ─────────────────────────────────────────────────────────────

function PackageDialog({ bill, onClose }: { bill: Bill; onClose: () => void }) {
  const applyPackage = useBillingStore((s) => s.applyPackage);
  const [selected, setSelected] = useState("");
  const [saving, setSaving] = useState(false);

  const packages = [
    { id: "PKG-MAT-NVD", name: "Maternity — Normal Delivery", price: 35000 },
    { id: "PKG-SURG-APPY", name: "Surgery — Lap Appendicectomy", price: 45000 },
    { id: "PKG-SURG-CHOLE", name: "Surgery — Lap Cholecystectomy", price: 55000 },
    { id: "PKG-DIALYSIS", name: "Dialysis Session", price: 3500 },
    { id: "PKG-CHECKUP", name: "Health Check Package", price: 5000 },
  ];

  function handleSubmit() {
    if (!selected) return;
    setSaving(true);
    setTimeout(() => {
      applyPackage({ billId: bill.id, packageId: selected, price: packages.find((p) => p.id === selected)?.price ?? 0, appliedBy: "Billing Officer" });
      setSaving(false);
      onClose();
    }, 400);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--text-primary)]">Apply Package</h3>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"><X size={15} /></button>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {packages.map((pkg) => (
            <button key={pkg.id} onClick={() => setSelected(pkg.id)}
              className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition-colors ${selected === pkg.id ? "border-[var(--action-primary)] bg-[var(--action-subtle)]" : "border-[var(--border-default)] hover:bg-[var(--surface-sunken)]"}`}>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{pkg.name}</p>
                <p className="text-xs text-[var(--text-secondary)]">{pkg.id}</p>
              </div>
              <p className="text-sm font-bold tabular-nums text-[var(--action-primary)]">₹{pkg.price.toLocaleString("en-IN")}</p>
            </button>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={onClose} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)]">Cancel</button>
          <button onClick={handleSubmit} disabled={saving || !selected}
            className="flex-1 rounded-xl bg-[var(--action-primary)] py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {saving ? "Applying…" : "Apply Package"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function BillDetailPage({ params }: { params: Promise<{ billId: string }> }) {
  const { billId } = use(params);
  const router     = useRouter();
  const cancelBill = useBillingStore((s) => s.cancelBill);

  // Re-read live so payment recording reflects immediately
  const bill = useBillingStore((s) => s.bills.find((b) => b.id === billId));
  const pendingDiscounts = useBillingStore((s) => s.discountApprovals.filter((d) => d.billId === billId && d.status === "Pending"));
  const billRefunds = useBillingStore((s) => s.refunds.filter((r) => r.billId === billId));
  const billCharges = useBillingStore((s) => s.chargeEvents.filter((e) => e.billId === billId));
  const billClaims = useClaimStore((s) => s.claims.filter((c) => c.billId === billId));

  const [payDialogOpen,     setPayDialogOpen]      = useState(false);
  const [waiveDialogOpen,   setWaiveDialogOpen]     = useState(false);
  const [discountDialogOpen, setDiscountDialogOpen]  = useState(false);
  const [refundDialogOpen,  setRefundDialogOpen]     = useState(false);
  const [packageDialogOpen, setPackageDialogOpen]    = useState(false);

  if (!bill) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)]" />
        <p className="text-lg font-semibold text-[var(--text-primary)]">Bill not found</p>
        <button onClick={() => router.push("/billing")} className="mt-4 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white">
          Back to Billing
        </button>
      </div>
    );
  }

  const pct = bill.grandTotal > 0 ? Math.min(100, (bill.amountPaid / bill.grandTotal) * 100) : 0;
  const canPay  = bill.status !== "Paid" && bill.status !== "Cancelled" && bill.status !== "Waived" && bill.amountDue > 0;
  const canWaive   = canPay;
  const canCancel  = bill.status === "Draft" || bill.status === "Pending";

  return (
    <div className="space-y-5 pb-8 print-root">
      {payDialogOpen     && <RecordPaymentDialog bill={bill} onClose={() => setPayDialogOpen(false)} />}
      {waiveDialogOpen   && <WaiveDialog bill={bill} onClose={() => setWaiveDialogOpen(false)} />}
      {discountDialogOpen && <DiscountDialog bill={bill} onClose={() => setDiscountDialogOpen(false)} />}
      {refundDialogOpen  && <RefundDialog bill={bill} onClose={() => setRefundDialogOpen(false)} />}
      {packageDialogOpen && <PackageDialog bill={bill} onClose={() => setPackageDialogOpen(false)} />}

      {/* Print-only header */}
      <div className="print-header">
        <h1>Aarogya Hospital</h1>
        <p className="print-sub">Multi-Specialty Hospital &amp; Research Centre</p>
        <p className="print-contact">123 Healthcare Avenue, Medical District · Tel: +91-80-2345-6789 · info@aarogya.in</p>
      </div>
      <div className="print-title">Tax Invoice</div>
      <div className="print-info-grid">
        <div><div className="label">Patient Name</div><div className="value">{bill.patientName}</div></div>
        <div><div className="label">Patient ID</div><div className="value">{bill.patientId}</div></div>
        <div><div className="label">Invoice No.</div><div className="value">{bill.id}</div></div>
        <div><div className="label">Date</div><div className="value">{fmtDate(bill.createdAt)}</div></div>
        <div><div className="label">Category</div><div className="value">{bill.category}</div></div>
        <div><div className="label">Status</div><div className="value">{bill.status}</div></div>
        {bill.admissionId && <div><div className="label">Admission</div><div className="value">{bill.admissionId}</div></div>}
      </div>

      {/* Sticky header */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 bg-[var(--surface-page)] px-4 sm:px-6 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2 pt-1 pb-3">
          <button onClick={() => router.back()} className="rounded-lg border border-[var(--border-default)] p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors">
            <ArrowLeft size={14} />
          </button>
          <span className="text-sm text-[var(--text-secondary)]">Billing</span>
          <ChevronRight size={12} className="text-[var(--text-secondary)]" />
          <span className="font-mono text-sm font-semibold text-[var(--action-primary)]">{bill.id}</span>
        </div>

        <div className="flex flex-wrap items-start gap-4">
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${CATEGORY_CLS[bill.category]}`}>
            <Receipt size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-[var(--text-primary)]">{bill.patientName}</h1>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_CLS[bill.category]}`}>{bill.category}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLS[bill.status]}`}>{bill.status}</span>
              {bill.status === "Overdue" && <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--critical-fg)]"><AlertTriangle size={11} /> Overdue since {fmtDate(bill.dueDate)}</span>}
            </div>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">Created {fmtDateTime(bill.createdAt)} · by {bill.createdBy}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 ml-auto">
            <button onClick={() => window.print()} className="flex items-center gap-1.5 rounded-xl border border-[var(--border-default)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
              <Printer size={13} /> Print
            </button>
            {canPay && (
              <button onClick={() => setPackageDialogOpen(true)} className="rounded-xl border border-[var(--border-default)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
                <Package size={13} className="inline mr-1" />Package
              </button>
            )}
            {bill.amountDue > 0 && bill.status !== "Cancelled" && bill.status !== "Waived" && (
              <button onClick={() => setDiscountDialogOpen(true)} className="rounded-xl border border-[var(--border-default)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
                <BadgePercent size={13} className="inline mr-1" />Discount
              </button>
            )}
            {bill.amountPaid > 0 && bill.status !== "Cancelled" && (
              <button onClick={() => setRefundDialogOpen(true)} className="rounded-xl border border-[var(--border-default)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
                <RotateCcw size={13} className="inline mr-1" />Refund
              </button>
            )}
            {canWaive && (
              <button onClick={() => setWaiveDialogOpen(true)} className="rounded-xl border border-[var(--border-default)] px-3 py-2 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
                Waive
              </button>
            )}
            {canCancel && (
              <button onClick={() => cancelBill(bill.id, "Billing Officer")} className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-3 py-2 text-xs font-semibold text-[var(--critical-fg)] hover:opacity-80">
                Cancel Bill
              </button>
            )}
            {canPay && (
              <button onClick={() => setPayDialogOpen(true)} className="flex items-center gap-1.5 rounded-xl bg-[var(--action-primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--action-primary-hover)]">
                <IndianRupee size={13} /> Record Payment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Two-column */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

        {/* Left sidebar */}
        <div className="w-full space-y-3 lg:w-72 lg:shrink-0 lg:sticky lg:top-40">

          {/* Payment summary card */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Payment Summary</p>
            </div>
            <div className="px-4 py-4 space-y-3">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--text-secondary)]">Subtotal</dt>
                  <dd className="font-medium tabular-nums">₹{fmt(bill.subtotal)}</dd>
                </div>
                {bill.discountTotal > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-[var(--text-secondary)]">Discount</dt>
                    <dd className="font-medium tabular-nums text-[var(--normal-fg)]">− ₹{fmt(bill.discountTotal)}</dd>
                  </div>
                )}
                {bill.tax > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-[var(--text-secondary)]">GST (5%)</dt>
                    <dd className="font-medium tabular-nums">₹{fmt(bill.tax)}</dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-[var(--border-default)] pt-2">
                  <dt className="font-semibold text-[var(--text-primary)]">Grand Total</dt>
                  <dd className="font-bold tabular-nums text-[var(--text-primary)]">₹{fmt(bill.grandTotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--normal-fg)]">Paid</dt>
                  <dd className="font-semibold tabular-nums text-[var(--normal-fg)]">₹{fmt(bill.amountPaid)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className={bill.amountDue > 0 ? "text-[var(--critical-fg)] font-semibold" : "text-[var(--text-secondary)]"}>Due</dt>
                  <dd className={`font-bold tabular-nums ${bill.amountDue > 0 ? "text-[var(--critical-fg)]" : "text-[var(--text-secondary)]"}`}>₹{fmt(bill.amountDue)}</dd>
                </div>
              </dl>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[10px] text-[var(--text-secondary)] mb-1">
                  <span>Payment progress</span>
                  <span>{pct.toFixed(0)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--border-default)]">
                  <div className="h-2 rounded-full bg-[var(--normal-fg)] transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-[var(--text-secondary)]">Due date</span>
                <span className={`font-medium ${new Date(bill.dueDate) < new Date() && bill.status !== "Paid" ? "text-[var(--critical-fg)]" : "text-[var(--text-primary)]"}`}>{fmtDate(bill.dueDate)}</span>
              </div>
            </div>
          </div>

          {/* Patient quick-link */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Patient</p>
            </div>
            <Link href={`/patients/${bill.patientId}`} className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-sunken)] transition-colors group">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--action-primary)] text-white"><User size={14} /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{bill.patientName}</p>
                <p className="text-xs text-[var(--action-primary)]">{bill.patientId}</p>
              </div>
              <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-secondary)]" />
            </Link>
          </div>

          {/* Admission link */}
          {bill.admissionId && (
            <Link href={`/ipd/${bill.admissionId}`} className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3 hover:bg-[var(--surface-sunken)] transition-colors group">
              <BedDouble size={14} className="text-[var(--action-primary)]" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[var(--text-secondary)]">Admission</p>
                <p className="font-mono text-sm font-semibold text-[var(--action-primary)]">{bill.admissionId}</p>
              </div>
              <ChevronRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-secondary)]" />
            </Link>
          )}

          {/* Insurance */}
          {bill.insuranceClaim && (
            <div className="rounded-xl border border-[var(--info-fg)]/20 bg-[var(--info-bg)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--info-fg)]">Insurance Claim</p>
              <p className="mt-1 font-mono text-xs font-semibold text-[var(--info-fg)]">{bill.insuranceClaim}</p>
              {billClaims.length > 0 && (
                <Link href={`/billing/claims`} className="mt-2 flex items-center gap-1 text-xs text-[var(--info-fg)] hover:underline">
                  <FileText size={11} /> View claim{billClaims.length > 1 ? "s" : ""}
                </Link>
              )}
            </div>
          )}

          {/* Discount approvals */}
          {pendingDiscounts.length > 0 && (
            <div className="rounded-xl border border-[var(--warning-fg)]/20 bg-[var(--warning-bg)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--warning-fg)]">Pending Discount{pendingDiscounts.length > 1 ? "s" : ""}</p>
              {pendingDiscounts.map((d) => (
                <div key={d.id} className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-[var(--text-secondary)]">₹{d.amount.toLocaleString("en-IN")} — {d.reason}</span>
                  <span className="text-[var(--warning-fg)]">{d.requestedBy}</span>
                </div>
              ))}
            </div>
          )}

          {/* Refunds */}
          {billRefunds.length > 0 && (
            <div className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--critical-fg)]">Refund{billRefunds.length > 1 ? "s" : ""} Processed</p>
              {billRefunds.map((r) => (
                <div key={r.id} className="mt-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium text-[var(--critical-fg)]">− ₹{r.amount.toLocaleString("en-IN")}</span>
                    <span className="text-[var(--text-secondary)]">{r.method}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] mt-0.5">{r.reason}</p>
                </div>
              ))}
            </div>
          )}

          {/* Charge events */}
          {billCharges.length > 0 && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Source Charges</p>
              <div className="mt-2 space-y-1">
                {billCharges.map((ce) => (
                  <div key={ce.id} className="flex items-center justify-between text-xs">
                    <span className="text-[var(--action-primary)] font-medium">{ce.sourceModule}</span>
                    <span className="text-[var(--text-secondary)]">{ce.item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {bill.notes && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Notes</p>
              <p className="mt-1 text-xs text-[var(--text-primary)] leading-relaxed">{bill.notes}</p>
            </div>
          )}
        </div>

        {/* Right panel */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Print-only items table */}
          <table className="print-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Category</th>
                <th className="right">Unit Price</th>
                <th className="center">Qty</th>
                <th className="right">Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.description}
                    {item.discount && item.discount > 0 ? <span className="print-muted"> (Discount: −₹{fmt(item.discount)})</span> : null}
                  </td>
                  <td><span className="print-muted">{item.category}</span></td>
                  <td className="right">₹{fmt(item.unitPrice)}</td>
                  <td className="center">{item.qty}</td>
                  <td className="right">₹{fmt(item.total)}</td>
                </tr>
              ))}
              {bill.discountTotal > 0 && (
                <tr>
                  <td colSpan={4} className="right print-bold">Discount</td>
                  <td className="right">−₹{fmt(bill.discountTotal)}</td>
                </tr>
              )}
              {bill.tax > 0 && (
                <tr>
                  <td colSpan={4} className="right">GST (5%)</td>
                  <td className="right">₹{fmt(bill.tax)}</td>
                </tr>
              )}
              <tr className="total-row">
                <td colSpan={4} className="right print-bold">Grand Total</td>
                <td className="right print-bold">₹{fmt(bill.grandTotal)}</td>
              </tr>
              <tr>
                <td colSpan={4} className="right">Amount Paid</td>
                <td className="right">₹{fmt(bill.amountPaid)}</td>
              </tr>
              <tr>
                <td colSpan={4} className="right print-bold">Amount Due</td>
                <td className="right print-bold" style={bill.amountDue > 0 ? { color: "#b91c1c" } : {}}>₹{fmt(bill.amountDue)}</td>
              </tr>
            </tbody>
          </table>

          {/* Print-only signature block */}
          <div className="print-signature">
            <div className="sig-block">
              <div className="sig-line" />
              <div className="sig-label">Authorised Signatory</div>
              <div className="sig-name">{bill.createdBy}</div>
            </div>
            <div className="sig-block">
              <div className="sig-line" />
              <div className="sig-label">Patient / Guardian</div>
            </div>
          </div>

          {/* Print-only footer */}
          <div className="print-footer">
            <span>This is a computer-generated invoice</span>
            <span>Bill ID: {bill.id}</span>
            <span>Generated: {fmtDateTime(bill.createdAt)}</span>
          </div>

          {/* Line items (screen) */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Invoice Items</p>
            </div>
            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_0.8fr_1fr] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)]/50 px-5 py-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              <span>Description</span><span>Category</span><span>Unit Price</span><span>Qty</span><span className="text-right">Total</span>
            </div>
            <div className="divide-y divide-[var(--border-default)]">
              {bill.items.map((item) => (
                <div key={item.id} className="grid grid-cols-2 gap-3 px-5 py-3 text-sm md:grid-cols-[2fr_1fr_1fr_0.8fr_1fr] md:items-center md:gap-4">
                  <div>
                    <p className="font-medium text-[var(--text-primary)]">{item.description}</p>
                    {item.discount && item.discount > 0 ? <p className="text-[10px] text-[var(--normal-fg)]">Discount: −₹{fmt(item.discount)}</p> : null}
                  </div>
                  <span className={`hidden md:inline-flex w-fit rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_CLS[item.category]}`}>{item.category}</span>
                  <p className="hidden md:block tabular-nums text-[var(--text-secondary)]">₹{fmt(item.unitPrice)}</p>
                  <p className="hidden md:block text-center tabular-nums">{item.qty}</p>
                  <p className="text-right font-semibold tabular-nums text-[var(--text-primary)]">₹{fmt(item.total)}</p>
                </div>
              ))}
            </div>
            {/* Footer totals */}
            <div className="border-t border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 space-y-1 text-sm">
              <div className="flex justify-end gap-8">
                <span className="text-[var(--text-secondary)]">Subtotal</span>
                <span className="w-24 text-right tabular-nums font-medium">₹{fmt(bill.subtotal)}</span>
              </div>
              {bill.discountTotal > 0 && (
                <div className="flex justify-end gap-8">
                  <span className="text-[var(--normal-fg)]">Discount</span>
                  <span className="w-24 text-right tabular-nums font-medium text-[var(--normal-fg)]">−₹{fmt(bill.discountTotal)}</span>
                </div>
              )}
              {bill.tax > 0 && (
                <div className="flex justify-end gap-8">
                  <span className="text-[var(--text-secondary)]">GST (5%)</span>
                  <span className="w-24 text-right tabular-nums font-medium">₹{fmt(bill.tax)}</span>
                </div>
              )}
              <div className="flex justify-end gap-8 border-t border-[var(--border-default)] pt-2">
                <span className="font-bold text-[var(--text-primary)]">Grand Total</span>
                <span className="w-24 text-right tabular-nums font-bold text-[var(--text-primary)]">₹{fmt(bill.grandTotal)}</span>
              </div>
            </div>
          </div>

          {/* Payment history */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Payment History</p>
              {canPay && (
                <button
                  onClick={() => setPayDialogOpen(true)}
                  className="flex items-center gap-1 rounded-lg bg-[var(--action-primary)] px-2.5 py-1 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)]"
                >
                  + Record Payment
                </button>
              )}
            </div>

            {bill.payments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Clock size={24} className="mb-2 opacity-20 text-[var(--text-secondary)]" />
                <p className="text-sm text-[var(--text-secondary)]">No payments recorded yet</p>
              </div>
            ) : (
              <>
                <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_1.5fr_1fr] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)]/50 px-5 py-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                  <span>Date</span><span>Amount</span><span>Method</span><span>Reference</span><span>By</span>
                </div>
                <div className="divide-y divide-[var(--border-default)]">
                  {bill.payments.map((p) => (
                    <div key={p.id} className="grid grid-cols-2 gap-3 px-5 py-3 text-sm md:grid-cols-[1fr_1fr_1fr_1.5fr_1fr] md:items-center md:gap-4">
                      <p className="text-xs text-[var(--text-secondary)]">{fmtDateTime(p.paidAt)}</p>
                      <p className="font-semibold tabular-nums text-[var(--normal-fg)]">₹{fmt(p.amount)}</p>
                      <span className="hidden md:inline-flex w-fit rounded-full bg-[var(--surface-sunken)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]">{p.method}</span>
                      <p className="hidden md:block font-mono text-xs text-[var(--text-secondary)] truncate">{p.ref ?? "—"}</p>
                      <p className="hidden md:block text-xs text-[var(--text-secondary)]">{p.by}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Totals footer */}
            {bill.payments.length > 0 && (
              <div className="border-t border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 flex justify-end gap-8 text-sm">
                <span className="text-[var(--normal-fg)] font-semibold">Total Paid</span>
                <span className="w-24 text-right tabular-nums font-bold text-[var(--normal-fg)]">₹{fmt(bill.amountPaid)}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
