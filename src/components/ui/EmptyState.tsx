import { type ReactNode } from "react";

// ── EmptyState ────────────────────────────────────────────────────────────────
// Centered empty-list placeholder with icon, message and optional action.
//
// Usage:
//   <EmptyState
//     icon={<Receipt size={32}/>}
//     message="No bills match your filters"
//     actionLabel="Clear filters"
//     onAction={clearFilters}
//   />

interface EmptyStateProps {
  icon: ReactNode;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="mb-3 opacity-20 text-[var(--text-secondary)]">{icon}</span>
      <p className="text-sm text-[var(--text-secondary)]">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-2 text-xs text-[var(--action-primary)] underline hover:opacity-80 transition-opacity"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
