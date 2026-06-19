"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useClaimStore } from "@/store/useClaimStore";
import {
  FileText, Search, X, ThumbsUp, ThumbsDown,
} from "lucide-react";

const CLAIM_STATUS_CLS: Record<string, string> = {
  Draft:              "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Submitted:          "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Query:              "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Approved:           "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  "Partially Approved": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Rejected:           "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Settled:            "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
};

const CLAIM_STATUSES = ["Draft", "Submitted", "Query", "Approved", "Partially Approved", "Rejected", "Settled"];

function fmt(n: number) { return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n); }
function fmtDate(d: string) { return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }

export default function ClaimsDashboardPage() {
  const claims = useClaimStore((s) => s.claims);
  const updateClaimStatus = useClaimStore((s) => s.updateClaimStatus);

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [respondId, setRespondId] = useState<string | null>(null);
  const [respondAction, setRespondAction] = useState<"approve" | "reject">("approve");
  const [respondAmount, setRespondAmount] = useState("");
  const [respondNotes, setRespondNotes] = useState("");

  const filteredClaims = useMemo(() => {
    const q = query.toLowerCase().trim();
    return claims.filter((c) => {
      if (q && !c.id.toLowerCase().includes(q) && !c.patientName.toLowerCase().includes(q)) return false;
      if (statusFilter && c.status !== statusFilter) return false;
      return true;
    }).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [claims, query, statusFilter]);

  const kpis = {
    total: claims.length,
    submitted: claims.filter((c) => c.status === "Submitted" || c.status === "Query").length,
    settled: claims.filter((c) => c.status === "Settled").length,
    rejected: claims.filter((c) => c.status === "Rejected").length,
    totalClaimed: claims.reduce((s, c) => s + c.totalClaimed, 0),
    totalSettled: claims.filter((c) => c.status === "Settled").reduce((s, c) => s + (c.totalApproved ?? 0), 0),
  };

  function handleRespond(claimId: string) {
    const amt = respondAction === "approve" ? parseFloat(respondAmount) : undefined;
    updateClaimStatus(claimId, respondAction === "approve" ? "Approved" : "Rejected", amt, respondNotes || undefined);
    setRespondId(null);
    setRespondAmount("");
    setRespondNotes("");
  }

  return (
    <div className="space-y-5 pb-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Insurance Claims</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Pre-auth & claim lifecycle management</p>
        </div>
        <Link href="/billing" className="flex items-center gap-2 rounded-xl border border-[var(--border-default)] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]">
          ← Back to Billing
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Total Claims</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--text-primary)]">{kpis.total}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Pending</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--info-fg)]">{kpis.submitted}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Settled</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--normal-fg)]">{kpis.settled}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Rejected</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--critical-fg)]">{kpis.rejected}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Claimed</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--text-primary)]">₹{fmt(kpis.totalClaimed)}</p>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">Settled Amt</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-[var(--normal-fg)]">₹{fmt(kpis.totalSettled)}</p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input placeholder="Search claims…" value={query} onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[var(--action-primary)]" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {["", ...CLAIM_STATUSES].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium ${statusFilter === s ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white" : "border-[var(--border-default)] text-[var(--text-secondary)]"}`}>
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      {/* Claims table */}
      <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
        <div className="hidden md:grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1.2fr_1.2fr_1.2fr_1fr] gap-4 border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3 text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
          <span>Claim ID</span><span>Patient</span><span>Payer</span><span>Status</span><span>Claimed</span><span>Approved</span><span>Submitted</span><span />
        </div>
        {filteredClaims.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText size={32} className="mb-3 opacity-20 text-[var(--text-secondary)]" />
            <p className="text-sm text-[var(--text-secondary)]">No claims found</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border-default)]">
            {filteredClaims.map((c) => (
              <div key={c.id} className="group px-5 py-4 hover:bg-[var(--surface-sunken)] transition-colors">
                <div className="hidden md:grid grid-cols-[1.2fr_1.5fr_1fr_1fr_1.2fr_1.2fr_1.2fr_1fr] gap-4 items-center">
                  <p className="font-mono text-xs font-semibold text-[var(--action-primary)]">{c.id}</p>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{c.patientName}</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{c.payerName}</p>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">{c.payerType}</p>
                  <span className={`w-fit rounded-full px-2 py-0.5 text-xs font-medium ${CLAIM_STATUS_CLS[c.status] || ""}`}>{c.status}</span>
                  <p className="text-sm font-semibold tabular-nums">₹{fmt(c.totalClaimed)}</p>
                  <p className="text-sm font-semibold tabular-nums text-[var(--normal-fg)]">{c.totalApproved ? `₹${fmt(c.totalApproved)}` : "—"}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{c.submittedAt ? fmtDate(c.submittedAt) : "—"}</p>
                  <div className="flex gap-1">
                    {(c.status === "Submitted" || c.status === "Query") && (
                      <>
                        <button onClick={() => { setRespondId(c.id); setRespondAction("approve"); setRespondAmount(String(c.totalClaimed)); }}
                          className="rounded p-1 text-[var(--normal-fg)] hover:bg-[var(--normal-bg)]" title="Approve"><ThumbsUp size={13} /></button>
                        <button onClick={() => { setRespondId(c.id); setRespondAction("reject"); }}
                          className="rounded p-1 text-[var(--critical-fg)] hover:bg-[var(--critical-bg)]" title="Reject"><ThumbsDown size={13} /></button>
                      </>
                    )}
                    {c.status === "Approved" && (
                      <button onClick={() => updateClaimStatus(c.id, "Settled")}
                        className="flex items-center gap-1 rounded-lg bg-[var(--normal-bg)] px-2 py-1 text-xs font-medium text-[var(--normal-fg)]">
                        Settle
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Respond dialog */}
      {respondId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setRespondId(null)} />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[var(--text-primary)]">{respondAction === "approve" ? "Approve" : "Reject"} Claim</h3>
              <button onClick={() => setRespondId(null)} className="rounded-lg p-1.5 text-[var(--text-secondary)]"><X size={15} /></button>
            </div>
            {respondAction === "approve" ? (
              <div className="space-y-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Approved Amount (₹) *</label>
                  <input type="number" value={respondAmount} onChange={(e) => setRespondAmount(e.target.value)}
                    className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Notes (optional)</label>
                  <textarea rows={2} value={respondNotes} onChange={(e) => setRespondNotes(e.target.value)}
                    className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]" />
                </div>
              </div>
            ) : (
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">Rejection Reason *</label>
                <textarea rows={3} value={respondNotes} onChange={(e) => setRespondNotes(e.target.value)}
                  className="w-full resize-none rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm outline-none focus:border-[var(--action-primary)]" />
              </div>
            )}
            <div className="mt-5 flex gap-3">
              <button onClick={() => setRespondId(null)} className="flex-1 rounded-xl border border-[var(--border-default)] py-2.5 text-sm font-medium text-[var(--text-secondary)]">Cancel</button>
              <button onClick={() => handleRespond(respondId)}
                className={`flex-1 rounded-xl py-2.5 text-sm font-semibold text-white ${respondAction === "approve" ? "bg-[var(--normal-fg)]" : "bg-[var(--critical-fg)]"}`}>
                {respondAction === "approve" ? "Approve Claim" : "Reject Claim"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
