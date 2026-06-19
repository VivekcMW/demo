"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { useBloodBankStore } from "@/store/useBloodBankStore";
import { COMPATIBILITY_MATRIX } from "@/data/seedBloodBank";
import type { CrossMatchStatus } from "@/data/seedBloodBank";
import {
  ArrowLeft, Droplets, AlertTriangle, CheckCircle2,
  ChevronRight, Clock,
} from "lucide-react";

const STATUS_CLS: Record<string, string> = {
  Ordered:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  "Cross-Matched": "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  "In-Progress": "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Completed:     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Reaction:      "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  Cancelled:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const CROSSMATCH_CLS: Record<string, string> = {
  Pending:      "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Compatible:   "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Incompatible: "bg-[var(--critical-bg)] text-[var(--critical-fg)]",
  "Not Required": "bg-[var(--info-bg)] text-[var(--info-fg)]",
};

const URGENCY_CLS: Record<string, string> = {
  Emergency: "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-bold",
  Urgent:    "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  Routine:   "bg-[var(--info-bg)] text-[var(--info-fg)]",
};

function fmtDateTime(dt?: string) {
  if (!dt) return "—";
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

export default function BloodBankDetailPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const order = useBloodBankStore((s) => s.getById(orderId));
  const updateCrossMatchStatus = useBloodBankStore((s) => s.updateCrossMatchStatus);
  const startTransfusion = useBloodBankStore((s) => s.startTransfusion);
  const completeTransfusion = useBloodBankStore((s) => s.completeTransfusion);
  const reportReaction = useBloodBankStore((s) => s.reportReaction);
  const cancelOrder = useBloodBankStore((s) => s.cancelOrder);
  const getInventoryByProduct = useBloodBankStore((s) => s.getInventoryByProduct);
  const router = useRouter();
  const [reactionNotes, setReactionNotes] = useState("");
  const [showReactionForm, setShowReactionForm] = useState(false);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)]" />
        <p className="text-lg font-semibold text-[var(--text-primary)]">Order not found</p>
        <button onClick={() => router.push("/blood-bank")}
          className="mt-4 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white">
          Back to Blood Bank
        </button>
      </div>
    );
  }

  const inventory = getInventoryByProduct(order.product).filter(
    (i) => COMPATIBILITY_MATRIX[order.patientBloodGroup].includes(i.bloodGroup)
  );
  const availableUnits = inventory.reduce((sum, i) => sum + i.unitsAvailable, 0);

  return (
    <div className="space-y-5 pb-8">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 bg-[var(--surface-page)] px-4 sm:px-6 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2 pt-1 pb-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-[var(--border-default)] p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="text-sm text-[var(--text-secondary)]">Blood Bank</span>
          <ChevronRight size={12} className="text-[var(--text-secondary)]" />
          <span className="font-mono text-sm font-semibold text-[var(--action-primary)]">{order.id}</span>
        </div>

        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--critical-bg)] text-[var(--critical-fg)]">
            <Droplets size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-[var(--text-primary)]">{order.patientName}</h1>
              <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[10px] font-medium ${URGENCY_CLS[order.urgency]}`}>
                {order.urgency}
              </span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLS[order.status]}`}>
                {order.status}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">
              {order.product} &middot; {order.units} unit{order.units > 1 ? "s" : ""} &middot; Blood Group {order.patientBloodGroup}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
        {/* Left sidebar */}
        <div className="w-full space-y-3 lg:w-72 lg:shrink-0">
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Order Details</p>
            </div>
            <dl className="divide-y divide-[var(--border-default)] text-sm">
              {[
                ["Order ID", order.id],
                ["Product", order.product],
                ["Units", String(order.units)],
                ["Blood Group", order.patientBloodGroup],
                ["Urgency", order.urgency],
                ["Ordered By", order.orderedBy],
                ["Ordered At", fmtDateTime(order.orderedAt)],
                ["Reason", order.reason],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 px-4 py-3">
                  <dt className="text-[var(--text-secondary)]">{label}</dt>
                  <dd className="font-medium text-[var(--text-primary)] text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Cross-Match</p>
            </div>
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Status</span>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${CROSSMATCH_CLS[order.crossMatchStatus]}`}>
                  {order.crossMatchStatus}
                </span>
              </div>
              {order.crossMatchResult && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--text-secondary)]">Result</p>
                  <p className="mt-0.5 text-sm text-[var(--text-primary)]">{order.crossMatchResult}</p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Inventory</p>
            </div>
            <div className="px-4 py-3 space-y-2">
              <p className="text-sm text-[var(--text-secondary)]">
                Available compatible stock for <strong className="text-[var(--text-primary)]">{order.product}</strong>:
              </p>
              <p className="text-2xl font-bold text-[var(--action-primary)]">{availableUnits} <span className="text-sm font-normal text-[var(--text-secondary)]">units</span></p>
              {inventory.length > 0 && (
                <div className="space-y-1">
                  {inventory.map((i) => (
                    <div key={i.id} className="flex items-center justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">{i.bloodGroup}</span>
                      <span className={`font-semibold tabular-nums ${i.unitsAvailable < 3 ? "text-[var(--critical-fg)]" : "text-[var(--text-primary)]"}`}>
                        {i.unitsAvailable}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {inventory.length === 0 && (
                <p className="text-xs text-[var(--critical-fg)]">No compatible stock available</p>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Transfusion timeline */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Transfusion Timeline</p>
            </div>
            <div className="px-5 py-4">
              <div className="space-y-4">
                {[
                  { label: "Ordered", time: order.orderedAt, done: true },
                  { label: "Cross-Matched", time: order.crossMatchStatus !== "Pending" ? order.orderedAt : undefined, done: order.crossMatchStatus !== "Pending" },
                  { label: "In-Progress", time: order.transfusionStartedAt, done: !!order.transfusionStartedAt },
                  { label: "Completed", time: order.transfusionCompletedAt, done: order.status === "Completed" },
                ].map((step, i) => (
                  <div key={step.label} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        step.done ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"
                      }`}>
                        {step.done ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                      </div>
                      {i < 3 && <div className="mt-1 h-6 w-px bg-[var(--border-default)]" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${step.done ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                        {step.label}
                      </p>
                      {step.time && (
                        <p className="text-xs text-[var(--text-secondary)]">{fmtDateTime(step.time)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          {order.status !== "Completed" && order.status !== "Cancelled" && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Actions</p>
              </div>
              <div className="px-5 py-4 space-y-3">
                {/* Cross-Match actions */}
                {(order.status === "Ordered" || order.status === "Cross-Matched") && order.crossMatchStatus === "Pending" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateCrossMatchStatus(order.id, "Compatible", "Cross-match compatible — no agglutination at 37°C")}
                      className="rounded-lg bg-[var(--normal-bg)] px-4 py-2 text-sm font-semibold text-[var(--normal-fg)] hover:opacity-80 transition-opacity"
                    >
                      Mark Cross-Match Compatible
                    </button>
                    <button
                      onClick={() => updateCrossMatchStatus(order.id, "Incompatible", "Cross-match incompatible — agglutination detected")}
                      className="rounded-lg bg-[var(--critical-bg)] px-4 py-2 text-sm font-semibold text-[var(--critical-fg)] hover:opacity-80 transition-opacity"
                    >
                      Mark Cross-Match Incompatible
                    </button>
                  </div>
                )}

                {/* Start Transfusion — when cross-matched or ordered (if cross-match not required) */}
                {(order.status === "Cross-Matched" || (order.status === "Ordered" && order.crossMatchStatus === "Not Required")) && (
                  <div>
                    <button
                      onClick={() => startTransfusion(order.id)}
                      className="rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
                    >
                      Start Transfusion
                    </button>
                  </div>
                )}

                {/* In-Progress actions */}
                {order.status === "In-Progress" && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => completeTransfusion(order.id)}
                      className="rounded-lg bg-[var(--normal-bg)] px-4 py-2 text-sm font-semibold text-[var(--normal-fg)] hover:opacity-80 transition-opacity"
                    >
                      Complete Transfusion
                    </button>
                    <button
                      onClick={() => setShowReactionForm(true)}
                      className="rounded-lg bg-[var(--critical-bg)] px-4 py-2 text-sm font-semibold text-[var(--critical-fg)] hover:opacity-80 transition-opacity"
                    >
                      Report Reaction
                    </button>
                  </div>
                )}

                {/* Reaction form */}
                {showReactionForm && (
                  <div className="space-y-2">
                    <textarea
                      rows={3}
                      placeholder="Describe the transfusion reaction…"
                      value={reactionNotes}
                      onChange={(e) => setReactionNotes(e.target.value)}
                      className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          reportReaction(order.id, reactionNotes);
                          setShowReactionForm(false);
                        }}
                        disabled={!reactionNotes.trim()}
                        className="rounded-lg bg-[var(--critical-bg)] px-4 py-2 text-sm font-semibold text-[var(--critical-fg)] hover:opacity-80 transition-opacity disabled:opacity-50"
                      >
                        Submit Reaction Report
                      </button>
                      <button
                        onClick={() => setShowReactionForm(false)}
                        className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Cancel (only when Ordered) */}
                {order.status === "Ordered" && (
                  <div className="pt-2 border-t border-[var(--border-default)]">
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="text-sm text-[var(--critical-fg)] underline hover:opacity-80 transition-opacity"
                    >
                      Cancel Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reaction info */}
          {order.status === "Reaction" && order.reactionNotes && (
            <div className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-5 py-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={16} className="shrink-0 mt-0.5 text-[var(--critical-fg)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--critical-fg)]">Transfusion Reaction Reported</p>
                  <p className="mt-1 text-sm text-[var(--critical-fg)] opacity-80">{order.reactionNotes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Completion info */}
          {order.status === "Completed" && (
            <div className="rounded-xl border border-[var(--normal-fg)]/20 bg-[var(--normal-bg)] px-5 py-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5 text-[var(--normal-fg)]" />
                <div>
                  <p className="text-sm font-bold text-[var(--normal-fg)]">Transfusion Completed</p>
                  <p className="mt-1 text-sm text-[var(--normal-fg)] opacity-80">
                    Started: {fmtDateTime(order.transfusionStartedAt)} &middot;
                    Completed: {fmtDateTime(order.transfusionCompletedAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Cancelled info */}
          {order.status === "Cancelled" && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-4">
              <p className="text-sm font-medium text-[var(--text-secondary)]">
                This order has been cancelled.
                {order.notes && <span className="block mt-1 text-xs opacity-70">{order.notes}</span>}
              </p>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Notes</p>
              </div>
              <div className="px-5 py-4">
                <p className="text-sm text-[var(--text-primary)]">{order.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
