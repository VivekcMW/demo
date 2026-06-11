"use client";

import { useState, useMemo } from "react";
import { Receipt, CreditCard, Banknote, Smartphone, X, Search } from "lucide-react";
import { useBillingStore } from "@/store/useBillingStore";
import type { Bill } from "@/data/seedBills";
import { useToast } from "@/components/ui/ToastProvider";
import { PageHeader } from "@/components/ui/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EmptyState } from "@/components/ui/EmptyState";

const STATUS_CLS: Record<string, string> = {
  Pending:          "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Paid:             "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Partially Paid": "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Waived:           "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Overdue:          "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Cancelled:        "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

type PayMode = "Cash" | "Card" | "UPI";

function PaymentModal({ bill, onClose }: { bill: Bill; onClose: () => void }) {
  const recordPayment = useBillingStore((s) => s.recordPayment);
  const { toast }     = useToast();
  const [amount, setAmount] = useState(String(bill.grandTotal - bill.amountPaid));
  const [mode, setMode]     = useState<PayMode>("Cash");

  const outstanding = bill.grandTotal - bill.amountPaid;

  const submit = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) return;
    recordPayment({ billId: bill.id, amount: Math.min(val, outstanding), method: mode as import("@/data/seedBills").PaymentMethod, by: "Reception" });
    toast(`Payment of ₹${Math.min(val, outstanding).toLocaleString("en-IN")} recorded`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-[var(--text-primary)]">Record Payment</h3>
          <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><X size={18} /></button>
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-1">Patient: <strong className="text-[var(--text-primary)]">{bill.patientName}</strong></p>
        <p className="text-sm text-[var(--text-secondary)] mb-4">Outstanding: <strong className="text-[var(--critical-fg)]">₹{outstanding.toLocaleString("en-IN")}</strong></p>        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">Amount (₹)</label>
            <input type="number" min={1} max={outstanding}
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none focus:border-[var(--action-primary)]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-1">Payment Mode</label>
            <div className="flex gap-2">
              {([["Cash", Banknote], ["Card", CreditCard], ["UPI", Smartphone]] as [PayMode, React.ElementType][]).map(([m, Icon]) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border py-2 text-xs font-medium transition-colors ${mode === m ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
                  <Icon size={13} /> {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">Cancel</button>
          <button onClick={submit} className="flex-1 rounded-lg bg-[var(--action-primary)] py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)]">Collect</button>
        </div>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const bills    = useBillingStore((s) => s.bills);
  const [query,  setQuery]   = useState("");
  const [filter, setFilter]  = useState<"all" | "Pending" | "Partially Paid" | "Paid">("all");
  const [payingBill, setPayingBill] = useState<typeof bills[0] | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bills.filter((b) => {
      if (filter !== "all" && b.status !== filter) return false;
      if (q && !b.patientName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [bills, query, filter]);

  const totalOutstanding = bills.filter((b) => b.status === "Pending" || b.status === "Partially Paid" || b.status === "Overdue").reduce((sum, b) => sum + b.amountDue, 0);
  const totalCollected   = bills.filter((b) => b.status === "Paid").reduce((sum, b) => sum + b.amountPaid, 0);
  const pendingCount     = bills.filter((b) => b.status === "Pending" || b.status === "Overdue").length;

  return (
    <div className="space-y-5 pb-8">
      {payingBill && <PaymentModal bill={payingBill} onClose={() => setPayingBill(null)} />}

      <PageHeader title="Billing Desk" subtitle="Patient billing and payment collection" />

      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="Outstanding"     value={`₹${(totalOutstanding / 1000).toFixed(1)}k`} icon={<Receipt size={16} />}    colorClass="text-[var(--critical-fg)]" />
        <KpiCard label="Collected Today" value={`₹${(totalCollected  / 1000).toFixed(1)}k`} icon={<Banknote size={16} />}   colorClass="text-[var(--normal-fg)]" />
        <KpiCard label="Pending Bills"   value={pendingCount}                                  icon={<CreditCard size={16} />} colorClass="text-[var(--warning-fg)]" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2 pl-9 pr-3 text-sm outline-none focus:border-[var(--action-primary)]"
            placeholder="Search patient…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        {(["all", "Pending", "Partially Paid", "Paid"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f as typeof filter)}
            className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${filter === f ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)] hover:border-[var(--action-primary)]"}`}>
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="hidden grid-cols-[1fr_1fr_100px_100px_100px_120px_auto] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] md:grid">
          <span>Patient</span>
          <span>Service</span>
          <span>Total</span>
          <span>Paid</span>
          <span>Balance</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<Receipt size={32} />} message="No billing records found" />
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filtered.map((b) => {
              return (
                <div key={b.id} className="grid grid-cols-1 gap-2 px-5 py-3.5 hover:bg-[var(--surface-sunken)] transition-colors md:grid-cols-[1fr_1fr_100px_100px_100px_120px_auto] md:items-center md:gap-4">
                  <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{b.patientName}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{b.createdAt.slice(0, 10)}</p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] truncate">{b.items.map((i) => i.description).slice(0, 2).join(", ")}{b.items.length > 2 ? " …" : ""}</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">₹{b.grandTotal.toLocaleString("en-IN")}</p>
                <p className="text-sm text-[var(--normal-fg)]">₹{b.amountPaid.toLocaleString("en-IN")}</p>
                <p className={`text-sm font-semibold ${b.amountDue > 0 ? "text-[var(--critical-fg)]" : "text-[var(--normal-fg)]"}`}>
                  {b.amountDue > 0 ? `₹${b.amountDue.toLocaleString("en-IN")}` : "—"}
                  </p>
                  <StatusBadge label={b.status} colorClass={STATUS_CLS[b.status] ?? ""} />
                  {(b.status === "Pending" || b.status === "Partially Paid" || b.status === "Overdue") && (
                    <button onClick={() => setPayingBill(b)}
                      className="flex items-center gap-1.5 rounded-lg bg-[var(--action-primary)] px-3 py-1.5 text-xs font-medium text-white hover:bg-[var(--action-primary-hover)] whitespace-nowrap">
                      <CreditCard size={12} /> Collect
                    </button>
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
