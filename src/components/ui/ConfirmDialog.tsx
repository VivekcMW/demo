"use client";

// ── ConfirmDialog ─────────────────────────────────────────────────────────────
// Small centred modal for destructive or irreversible confirmations.
//
// Usage:
//   <ConfirmDialog
//     open={!!pendingDelete}
//     title="Delete user?"
//     message="This action cannot be undone."
//     confirmLabel="Delete"
//     variant="danger"
//     onConfirm={handleDelete}
//     onCancel={() => setPendingDelete(null)}
//   />

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  /** "danger" renders red confirm button; "primary" uses action-primary. Default: "danger" */
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  const confirmCls =
    variant === "danger"
      ? "rounded-lg bg-[var(--critical-fg)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
      : "rounded-lg bg-[var(--action-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--action-primary-hover)] transition-colors";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-backdrop"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <p className="mb-2 text-base font-semibold text-[var(--text-primary)]">{title}</p>
        )}
        <p className="text-sm text-[var(--text-primary)] mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-[var(--border-default)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] transition-colors"
          >
            Cancel
          </button>
          <button onClick={onConfirm} className={confirmCls}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
