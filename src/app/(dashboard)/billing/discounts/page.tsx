"use client";

import { useState } from "react";
import Link from "next/link";
import { useBillingStore, type DiscountApproval } from "@/store/useBillingStore";
import {
  BadgePercent, CheckCircle2, X, ThumbsUp, ThumbsDown, Loader2,
} from "lucide-react";

function fmt(n: number) { return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n); }
function fmtDate(d: string) { return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }

export default function DiscountApprovalsPage() {
  const pendingDiscounts = useBillingStore((s) => s.discountApprovals);
  const respondDiscount = useBillingStore((s) => s.respondDiscount);
  const bills = useBillingStore((s) => s.bills);

  const [processing, setProcessing] = useState<string | null>(null);

  const pending = pendingDiscounts.filter((d) => d.status === "Pending");
  const history = pendingDiscounts.filter((d) => d.status !== "Pending");

  function handleApprove(d: DiscountApproval) {
    setProcessing(d.id);
    setTimeout(() => {
      respondDiscount({ discountId: d.id, approved: true, approvedBy: "Manager" });
      setProcessing(null);
    }, 400);
  }

  function handleReject(d: DiscountApproval) {
    setProcessing(d.id);
    setTimeout(() => {
      respondDiscount({ discountId: d.id, approved: false, approvedBy: "Manager" });
      setProcessing(null);
    }, 400);
  }

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Discount Approvals</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{pending.length} pending approval{pending.length !== 1 ? "s" : ""}</p>
        </div>
        <Link href="/billing" className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
          ← Back to Billing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Pending</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--warning-fg)]">{pending.length}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Approved Today</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--normal-fg)]">{history.filter((d) => d.status === "Approved").length}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Rejected</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--critical-fg)]">{history.filter((d) => d.status === "Rejected").length}</p>
        </div>
      </div>

      {/* Pending approvals */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">Pending Approvals</p>
        </div>
        {pending.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <CheckCircle2 size={32} className="mb-2 text-[var(--normal-fg)] opacity-40" />
            <p className="text-sm text-[var(--text-secondary)]">No pending discount requests</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {pending.map((d) => {
              const bill = bills.find((b) => b.id === d.billId);
              return (
                <div key={d.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--warning-bg)]">
                    <BadgePercent size={16} className="text-[var(--warning-fg)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{bill?.patientName ?? d.billId}</p>
                      <span className="font-mono text-xs text-[var(--text-secondary)]">{d.billId}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                      ₹{fmt(d.amount)} discount requested — {d.reason}
                    </p>
                    <p className="text-[10px] text-[var(--text-secondary)] mt-0.5">
                      Requested by {d.requestedBy} on {fmtDate(d.requestedAt)}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleReject(d)}
                      disabled={processing === d.id}
                      className="flex items-center gap-1 rounded-lg border border-[var(--critical-fg)]/20 px-3 py-2 text-xs font-medium text-[var(--critical-fg)] hover:bg-[var(--critical-bg)] disabled:opacity-50"
                    >
                      {processing === d.id ? <Loader2 size={12} className="animate-spin" /> : <ThumbsDown size={12} />}
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(d)}
                      disabled={processing === d.id}
                      className="flex items-center gap-1 rounded-lg bg-[var(--normal-fg)] px-3 py-2 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
                    >
                      {processing === d.id ? <Loader2 size={12} className="animate-spin" /> : <ThumbsUp size={12} />}
                      Approve ₹{fmt(d.amount)}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Approval history */}
      {history.length > 0 && (
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
          <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">History</p>
          </div>
          <div className="divide-y divide-[var(--border-default)]">
            {history.map((d) => (
              <div key={d.id} className="flex items-center gap-4 px-5 py-3">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${d.status === "Approved" ? "bg-[var(--normal-bg)]" : "bg-[var(--critical-bg)]"}`}>
                  {d.status === "Approved" ? <CheckCircle2 size={14} className="text-[var(--normal-fg)]" /> : <X size={14} className="text-[var(--critical-fg)]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--text-primary)]">
                    <span className="font-semibold">{d.status}</span> — ₹{fmt(d.amount)} for {d.billId}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{d.reason} · by {d.approvedBy} on {d.respondedAt ? fmtDate(d.respondedAt) : "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
