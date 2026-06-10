import { type ReactNode } from "react";

// ── StatusBadge ───────────────────────────────────────────────────────────────
// Generic status / category pill.
//
// Usage:
//   const STATUS_CLS: Record<BillStatus, string> = { Paid: "bg-[var(--normal-bg)] text-[var(--normal-fg)]", … };
//   <StatusBadge colorClass={STATUS_CLS[bill.status]} label={bill.status} />
//
// With an icon:
//   <StatusBadge colorClass={…} label="In Progress" icon={<Clock size={11}/>} />

interface StatusBadgeProps {
  label: string;
  colorClass: string;
  icon?: ReactNode;
  className?: string;
}

export function StatusBadge({ label, colorClass, icon, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${colorClass} ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
