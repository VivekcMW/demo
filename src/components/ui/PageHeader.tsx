"use client";

import { type ReactNode } from "react";

// ── PageHeader ────────────────────────────────────────────────────────────────
// Standard page title + optional subtitle + optional action slot.
//
// Usage:
//   <PageHeader
//     title="Billing"
//     subtitle="Patient invoices & payment tracking"
//     action={<button …>New Bill</button>}
//   />

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** A button, link, or any action element rendered on the right */
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold text-[var(--text-primary)]">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">{subtitle}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
