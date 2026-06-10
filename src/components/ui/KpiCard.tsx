"use client";

import Link from "next/link";
import { type ReactNode, type ElementType } from "react";
import { useCountUp } from "@/hooks/useCountUp";

// ── KpiCard ───────────────────────────────────────────────────────────────────
// Stat card used on list pages and the dashboard.
//
// Usage (static value):
//   <KpiCard label="Total Bills" value={42} icon={<Receipt size={16}/>} colorClass="text-[var(--info-fg)]" />
//
// Usage (animated count-up, dashboard style):
//   <KpiCard label="Patients" value={120} icon={Users} href="/patients"
//            colorClass="…" sub="registered" animated staggerClass="stagger-2" />

interface KpiCardBaseProps {
  label: string;
  /** Numeric target (supports count-up) or a pre-formatted string like "₹1,234" */
  value: number | string;
  icon: ReactNode | ElementType;
  /** Tailwind color class applied to icon and value, e.g. "text-[var(--info-fg)]" */
  colorClass?: string;
  sub?: string;
  href?: string;
  /** Enable animated count-up (only works when value is a number) */
  animated?: boolean;
  staggerClass?: string;
}

function InnerCard({
  label, value, icon, colorClass = "text-[var(--text-primary)]", sub, animated, staggerClass,
}: Omit<KpiCardBaseProps, "href">) {
  // If icon is a React element type (component), render it; otherwise use as-is
  const IconEl = typeof icon === "function"
    ? (() => {
        const I = icon as ElementType;
        return <I size={16} style={{ color: `var(--action-primary)` }} />;
      })()
    : icon as ReactNode;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const animatedValue = animated && typeof value === "number" ? useCountUp(value, 700) : null;

  const displayValue = animatedValue !== null ? animatedValue : value;

  return (
    <div className={`rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 ${animated ? `card-hover animate-slide-up ${staggerClass ?? ""}` : ""}`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--text-secondary)]">{label}</p>
        <span className={colorClass}>{IconEl}</span>
      </div>
      <p className={`mt-2 text-2xl font-bold tabular-nums ${colorClass}`}>{displayValue}</p>
      {sub && <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{sub}</p>}
    </div>
  );
}

export function KpiCard(props: KpiCardBaseProps) {
  const { href, ...rest } = props;
  if (href) {
    return (
      <Link href={href} className="block">
        <InnerCard {...rest} />
      </Link>
    );
  }
  return <InnerCard {...rest} />;
}
