"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useOrderStore } from "@/store/useOrderStore";
import type { OrderStatus, OrderType, OrderPriority } from "@/data/seedOrders";
import {
  ArrowLeft, FlaskConical, Pill, ScanLine, UserCheck,
  Stethoscope, UtensilsCrossed, AlertTriangle, CheckCircle2,
  Clock, User, XCircle, ChevronRight,
} from "lucide-react";

// ── DS helpers ────────────────────────────────────────────────────────────────

const TYPE_META: Record<OrderType, { label: string; icon: React.ReactNode; cls: string }> = {
  Lab:       { label: "Lab",        icon: <FlaskConical size={15} />,    cls: "bg-[var(--info-bg)] text-[var(--info-fg)]" },
  Medication:{ label: "Medication", icon: <Pill size={15} />,            cls: "bg-[var(--normal-bg)] text-[var(--normal-fg)]" },
  Imaging:   { label: "Imaging",    icon: <ScanLine size={15} />,        cls: "bg-[var(--action-subtle)] text-[var(--action-primary)]" },
  Referral:  { label: "Referral",   icon: <UserCheck size={15} />,       cls: "bg-[var(--warning-bg)] text-[var(--warning-fg)]" },
  Procedure: { label: "Procedure",  icon: <Stethoscope size={15} />,     cls: "bg-[var(--critical-bg)] text-[var(--critical-fg)]" },
  Diet:      { label: "Diet",       icon: <UtensilsCrossed size={15} />, cls: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]" },
};

const STATUS_CLS: Record<OrderStatus, string> = {
  Ordered:       "bg-[var(--info-bg)] text-[var(--info-fg)]",
  Acknowledged:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  "In-Progress": "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  Completed:     "bg-[var(--normal-bg)] text-[var(--normal-fg)]",
  Cancelled:     "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
};

const PRIORITY_CLS: Record<OrderPriority, string> = {
  Routine: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  Urgent:  "bg-[var(--warning-bg)] text-[var(--warning-fg)]",
  STAT:    "bg-[var(--critical-bg)] text-[var(--critical-fg)] font-bold",
};

// Ordered steps in the lifecycle
const STATUS_STEPS: OrderStatus[] = ["Ordered", "Acknowledged", "In-Progress", "Completed"];

function fmtDateTime(dt: string) {
  return new Date(dt).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });
}

// ── Cancel dialog ─────────────────────────────────────────────────────────────

function CancelDialog({ onConfirm, onCancel }: { onConfirm: (note: string) => void; onCancel: () => void }) {
  const [note, setNote] = useState("");
  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
      <div className="fixed inset-x-4 top-1/3 z-50 mx-auto max-w-sm rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl">
        <h2 className="text-base font-semibold text-[var(--text-primary)]">Cancel Order</h2>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Provide a reason for cancellation (optional).</p>
        <textarea
          rows={3}
          placeholder="Reason…"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-3 w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)] resize-none"
        />
        <div className="mt-4 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)]"
          >
            Keep Order
          </button>
          <button
            onClick={() => onConfirm(note || "Order cancelled")}
            className="flex-1 rounded-lg bg-[var(--critical-fg)] py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order         = useOrderStore((s) => s.getById(id));
  const updateStatus  = useOrderStore((s) => s.updateStatus);
  const cancelOrder   = useOrderStore((s) => s.cancelOrder);
  const router        = useRouter();
  const [showCancel, setShowCancel] = useState(false);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <AlertTriangle size={36} className="mb-3 text-[var(--warning-fg)]" />
        <p className="text-lg font-semibold text-[var(--text-primary)]">Order not found</p>
        <button
          onClick={() => router.push("/orders")}
          className="mt-4 rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const typeMeta  = TYPE_META[order.type];
  const isClosed  = order.status === "Completed" || order.status === "Cancelled";
  const isCancelled = order.status === "Cancelled";

  // Next actionable status
  const nextStatusMap: Partial<Record<OrderStatus, OrderStatus>> = {
    Ordered:       "Acknowledged",
    Acknowledged:  "In-Progress",
    "In-Progress": "Completed",
  };
  const nextStatus = nextStatusMap[order.status];

  const nextBtnLabel: Partial<Record<OrderStatus, string>> = {
    Ordered:       "Mark Acknowledged",
    Acknowledged:  "Mark In-Progress",
    "In-Progress": "Mark Completed",
  };

  function handleAdvance() {
    if (nextStatus) {
      updateStatus(order!.id, nextStatus, "Current User");
    }
  }

  function handleCancel(note: string) {
    cancelOrder(order!.id, "Current User", note);
    setShowCancel(false);
  }

  return (
    <div className="space-y-5 pb-8">

      {showCancel && (
        <CancelDialog onConfirm={handleCancel} onCancel={() => setShowCancel(false)} />
      )}

      {/* ── Sticky header ───────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 -mx-4 sm:-mx-6 bg-[var(--surface-page)] px-4 sm:px-6 pb-4 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-2 pt-1 pb-3">
          <button
            onClick={() => router.back()}
            className="rounded-lg border border-[var(--border-default)] p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="text-sm text-[var(--text-secondary)]">Orders</span>
          <ChevronRight size={12} className="text-[var(--text-secondary)]" />
          <span className="font-mono text-sm font-semibold text-[var(--action-primary)]">{order.id}</span>
        </div>

        {/* Identity strip */}
        <div className="flex flex-wrap items-start gap-4">
          {/* Type icon */}
          <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${typeMeta.cls}`}>
            {typeMeta.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-[var(--text-primary)]">{order.title}</h1>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${PRIORITY_CLS[order.priority]}`}>
                {order.priority}
              </span>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_CLS[order.status]}`}>
                {order.status}
              </span>
            </div>
            <p className="mt-0.5 text-sm text-[var(--text-secondary)]">{order.details}</p>
          </div>
        </div>
      </div>

      {/* ── Two-column body ─────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start">

        {/* Left: Order summary card */}
        <div className="w-full space-y-3 lg:w-72 lg:shrink-0">

          {/* Summary */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Order Summary</p>
            </div>
            <dl className="divide-y divide-[var(--border-default)] text-sm">
              {[
                ["Order ID",    order.id],
                ["Type",        typeMeta.label],
                ["Priority",    order.priority],
                ["Status",      order.status],
                ["Ordered By",  order.orderedBy],
                ["Ordered At",  fmtDateTime(order.orderedAt)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 px-4 py-3">
                  <dt className="text-[var(--text-secondary)]">{label}</dt>
                  <dd className="font-medium text-[var(--text-primary)] text-right">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Patient quick-link */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-4 py-2.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Patient</p>
            </div>
            <Link
              href={`/patients/${order.patientId}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--surface-sunken)] transition-colors group"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--action-primary)] text-xs font-bold text-white">
                <User size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{order.patientName}</p>
                <p className="text-xs text-[var(--action-primary)]">{order.patientId}</p>
              </div>
              <ChevronRight size={14} className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Action buttons */}
          {!isClosed && (
            <div className="space-y-2">
              {nextStatus && (
                <button
                  onClick={handleAdvance}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] transition-colors"
                >
                  <CheckCircle2 size={15} />
                  {nextBtnLabel[order.status]}
                </button>
              )}
              <button
                onClick={() => setShowCancel(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--border-default)] px-4 py-3 text-sm font-semibold text-[var(--critical-fg)] hover:bg-[var(--critical-bg)] transition-colors"
              >
                <XCircle size={15} /> Cancel Order
              </button>
            </div>
          )}

          {isCancelled && (
            <div className="rounded-xl border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-4 py-3">
              <p className="text-xs font-semibold text-[var(--critical-fg)]">This order has been cancelled.</p>
              {order.notes && <p className="mt-1 text-xs text-[var(--critical-fg)] opacity-80">{order.notes}</p>}
            </div>
          )}

          {order.status === "Completed" && (
            <div className="rounded-xl border border-[var(--normal-fg)]/20 bg-[var(--normal-bg)] px-4 py-3">
              <p className="text-xs font-semibold text-[var(--normal-fg)]">Order completed successfully.</p>
            </div>
          )}
        </div>

        {/* Right: Status timeline + notes */}
        <div className="flex-1 min-w-0 space-y-4">

          {/* Status timeline */}
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
            <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Status Timeline</p>
            </div>
            <div className="px-5 py-5">
              {/* Lifecycle progress bar (not shown for cancelled) */}
              {!isCancelled && (
                <div className="mb-6 flex items-center gap-0">
                  {STATUS_STEPS.map((step, i) => {
                    const stepIdx  = STATUS_STEPS.indexOf(step);
                    const currIdx  = STATUS_STEPS.indexOf(order.status as OrderStatus);
                    const done     = stepIdx <= currIdx;
                    const isActive = step === order.status;
                    const isLast   = i === STATUS_STEPS.length - 1;
                    return (
                      <div key={step} className="flex flex-1 items-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors ${
                            done
                              ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
                              : "border-[var(--border-default)] bg-[var(--surface-sunken)] text-[var(--text-secondary)]"
                          }`}>
                            {done ? <CheckCircle2 size={14} /> : i + 1}
                          </div>
                          <span className={`text-[10px] whitespace-nowrap font-medium ${
                            isActive ? "text-[var(--action-primary)]" : done ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                          }`}>
                            {step}
                          </span>
                        </div>
                        {!isLast && (
                          <div className={`mx-1 h-0.5 flex-1 transition-colors ${
                            stepIdx < currIdx ? "bg-[var(--action-primary)]" : "bg-[var(--border-default)]"
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Event log */}
              <div className="space-y-0">
                {order.statusHistory.map((ev, i) => {
                  const isFirst = i === 0;
                  const isLast  = i === order.statusHistory.length - 1;
                  const isCancelledEvent = ev.status === "Cancelled";
                  return (
                    <div key={i} className="flex gap-4">
                      {/* Timeline spine */}
                      <div className="flex flex-col items-center">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                          isCancelledEvent
                            ? "border-[var(--critical-fg)] bg-[var(--critical-bg)] text-[var(--critical-fg)]"
                            : ev.status === "Completed"
                            ? "border-[var(--normal-fg)] bg-[var(--normal-bg)] text-[var(--normal-fg)]"
                            : isFirst
                            ? "border-[var(--action-primary)] bg-[var(--action-primary)] text-white"
                            : "border-[var(--action-primary)] bg-[var(--action-subtle)] text-[var(--action-primary)]"
                        }`}>
                          {isCancelledEvent ? <XCircle size={13} /> : <Clock size={13} />}
                        </div>
                        {!isLast && <div className="w-0.5 flex-1 bg-[var(--border-default)] my-1" />}
                      </div>

                      {/* Event content */}
                      <div className={`flex-1 min-w-0 ${isLast ? "" : "pb-5"}`}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLS[ev.status]}`}>
                            {ev.status}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)]">{fmtDateTime(ev.at)}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-[var(--text-secondary)]">by <span className="font-medium text-[var(--text-primary)]">{ev.by}</span></p>
                        {ev.note && (
                          <div className="mt-2 rounded-lg bg-[var(--surface-sunken)] px-3 py-2 text-xs text-[var(--text-primary)]">
                            {ev.note}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] overflow-hidden">
              <div className="border-b border-[var(--border-default)] bg-[var(--surface-sunken)] px-5 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Notes</p>
              </div>
              <p className="px-5 py-4 text-sm text-[var(--text-primary)]">{order.notes}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
