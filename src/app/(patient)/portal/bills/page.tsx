"use client";

import { useRouter } from "next/navigation";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { usePatientStore } from "@/store/usePatientStore";
import { useBillingStore } from "@/store/useBillingStore";
import { useMemo, useState, useEffect } from "react";
import { IndianRupee, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Clock } from "lucide-react";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_COLORS: Record<string, string> = {
  Paid: "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Pending: "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Partially Paid": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Overdue: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Cancelled: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Waived: "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Draft: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

export default function BillsPage() {
  const router = useRouter();
  const loggedInPatientId = usePatientAuthStore((s) => s.loggedInPatientId);
  const patient = usePatientStore((s) =>
    loggedInPatientId ? s.patients.find((p) => p.id === loggedInPatientId) ?? null : null
  );
  const bills = useBillingStore((s) => s.bills);
  const [expanded, setExpanded] = useState<string | null>(null);

  const patientBills = useMemo(
    () => (patient ? bills.filter((b) => b.patientId === patient.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) : []),
    [bills, patient]
  );

  const totalDue = useMemo(() => patientBills.reduce((s, b) => s + b.amountDue, 0), [patientBills]);
  const totalPaid = useMemo(() => patientBills.reduce((s, b) => s + b.amountPaid, 0), [patientBills]);

  function handlePrint(billId: string) {
    window.open(`/billing/${billId}`, "_blank");
  }

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!patient) {
    if (mounted) router.replace("/portal/login");
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5 pb-8">
      <div>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">Bills &amp; Payments</h1>
        <p className="text-sm text-[var(--text-secondary)]">View and manage your hospital bills</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
          <p className="text-2xl font-bold text-[var(--action-primary)]">{patientBills.length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Total Bills</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
          <p className="text-2xl font-bold text-[var(--normal-fg)]">₹{totalPaid.toLocaleString("en-IN")}</p>
          <p className="text-xs text-[var(--text-secondary)]">Total Paid</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
          <p className="text-2xl font-bold text-[var(--warning-fg)]">₹{totalDue.toLocaleString("en-IN")}</p>
          <p className="text-xs text-[var(--text-secondary)]">Outstanding</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-3 text-center">
          <p className="text-2xl font-bold text-[var(--critical-fg)]">{patientBills.filter((b) => b.amountDue > 0 && b.status !== "Waived" && b.status !== "Cancelled").length}</p>
          <p className="text-xs text-[var(--text-secondary)]">Pending</p>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            <IndianRupee size={13} /> Bill History
          </p>
        </div>
        {patientBills.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <IndianRupee size={36} className="mb-3 text-[var(--text-secondary)] opacity-30" />
            <p className="text-sm font-medium text-[var(--text-primary)]">No bills found</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {patientBills.map((bill) => {
              const open = expanded === bill.id;
              const pct = bill.grandTotal > 0 ? Math.round((bill.amountPaid / bill.grandTotal) * 100) : 0;
              return (
                <div key={bill.id}>
                  <button
                    onClick={() => setExpanded(open ? null : bill.id)}
                    className="flex w-full items-center gap-3 px-5 py-3.5 hover:bg-[var(--surface-sunken)] transition-colors"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      bill.amountDue > 0 ? "bg-[var(--critical-bg)]" : "bg-[var(--normal-bg)]"
                    }`}>
                      <IndianRupee size={14} className={bill.amountDue > 0 ? "text-[var(--critical-fg)]" : "text-[var(--normal-fg)]"} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{bill.category} — {bill.id}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{fmtDate(bill.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${bill.amountDue > 0 ? "text-[var(--critical-fg)]" : "text-[var(--normal-fg)]"}`}>
                        ₹{bill.grandTotal.toLocaleString("en-IN")}
                      </p>
                      <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${STATUS_COLORS[bill.status] ?? ""}`}>{bill.status}</span>
                    </div>
                    {open ? <ChevronUp size={14} className="text-[var(--text-secondary)]" /> : <ChevronDown size={14} className="text-[var(--text-secondary)]" />}
                  </button>
                  {open && (
                    <div className="border-t border-[var(--border-default)] bg-[var(--surface-page)] px-5 py-4 space-y-3">
                      {/* Payment progress */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-[var(--text-secondary)] mb-1">
                          <span>Payment Progress</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-[var(--border-default)]">
                          <div className="h-2 rounded-full bg-[var(--normal-fg)] transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>

                      {/* Line items */}
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[var(--border-default)] text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
                            <td className="pb-1.5">Item</td>
                            <td className="pb-1.5 text-right">Qty</td>
                            <td className="pb-1.5 text-right">Rate</td>
                            <td className="pb-1.5 text-right">Total</td>
                          </tr>
                        </thead>
                        <tbody>
                          {bill.items.map((item) => (
                            <tr key={item.id}>
                              <td className="py-1 text-[var(--text-primary)]">{item.description}</td>
                              <td className="py-1 text-right text-[var(--text-secondary)]">{item.qty}</td>
                              <td className="py-1 text-right text-[var(--text-secondary)]">₹{item.unitPrice.toLocaleString("en-IN")}</td>
                              <td className="py-1 text-right font-medium text-[var(--text-primary)]">₹{item.total.toLocaleString("en-IN")}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Totals */}
                      <div className="border-t border-[var(--border-default)] pt-2 space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Subtotal</span><span>₹{bill.subtotal.toLocaleString("en-IN")}</span></div>
                        {bill.discountTotal > 0 && <div className="flex justify-between"><span className="text-[var(--normal-fg)]">Discount</span><span className="text-[var(--normal-fg)]">−₹{bill.discountTotal.toLocaleString("en-IN")}</span></div>}
                        {bill.tax > 0 && <div className="flex justify-between"><span className="text-[var(--text-secondary)]">GST (5%)</span><span>₹{bill.tax.toLocaleString("en-IN")}</span></div>}
                        <div className="flex justify-between font-bold border-t border-[var(--border-default)] pt-1">
                          <span>Grand Total</span><span>₹{bill.grandTotal.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between"><span className="text-[var(--normal-fg)]">Paid</span><span className="text-[var(--normal-fg)]">₹{bill.amountPaid.toLocaleString("en-IN")}</span></div>
                        <div className="flex justify-between"><span className={bill.amountDue > 0 ? "text-[var(--critical-fg)] font-bold" : "text-[var(--text-secondary)]"}>Due</span><span className={bill.amountDue > 0 ? "text-[var(--critical-fg)] font-bold" : "text-[var(--text-secondary)]"}>₹{bill.amountDue.toLocaleString("en-IN")}</span></div>
                      </div>

                      {/* Payments */}
                      {bill.payments.length > 0 && (
                        <div className="border-t border-[var(--border-default)] pt-3">
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)] mb-2">Payment History</p>
                          {bill.payments.map((p) => (
                            <div key={p.id} className="flex items-center justify-between text-xs py-1">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 size={11} className="text-[var(--normal-fg)]" />
                                <span className="text-[var(--text-primary)]">{p.method}</span>
                                {p.ref && <span className="text-[var(--text-secondary)]">({p.ref})</span>}
                              </div>
                              <div>
                                <span className="font-medium text-[var(--normal-fg)]">₹{p.amount.toLocaleString("en-IN")}</span>
                                <span className="text-[var(--text-secondary)] ml-2">{fmtDate(p.paidAt)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {bill.notes && (
                        <p className="text-xs text-[var(--text-secondary)] italic border-t border-[var(--border-default)] pt-2">Note: {bill.notes}</p>
                      )}
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
