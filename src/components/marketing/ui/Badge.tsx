import { ReactNode } from "react";

type BadgeVariant = "default" | "teal" | "outline";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  icon?: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-[var(--surface-sunken)] text-[var(--text-secondary)]",
  teal: "bg-[var(--action-subtle)] text-[var(--action-primary)]",
  outline: "bg-transparent border border-[var(--border-default)] text-[var(--text-secondary)]",
};

export function Badge({ children, variant = "default", icon, className = "" }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5
        text-sm font-medium rounded-full
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {icon && <span className="shrink-0 w-4 h-4">{icon}</span>}
      {children}
    </span>
  );
}
