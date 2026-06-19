"use client";

import { ReactNode } from "react";
import { ScrollReveal } from "@/hooks/useScrollReveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  /** Eyebrow text above the title */
  eyebrow?: string;
  /** Center align (default) or left align */
  align?: "center" | "left";
  /** Additional content below subtitle */
  children?: ReactNode;
  className?: string;
  /** Disable animation */
  noAnimation?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "center",
  children,
  className = "",
  noAnimation = false,
}: SectionHeaderProps) {
  const alignStyles = align === "center" ? "text-center mx-auto" : "text-left";

  const content = (
    <>
      {eyebrow && (
        <p className="text-xs sm:text-sm font-semibold text-[var(--action-primary)] uppercase tracking-wide mb-2 sm:mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--text-primary)] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          {subtitle}
        </p>
      )}
      {children && <div className="mt-4 sm:mt-6">{children}</div>}
    </>
  );

  if (noAnimation) {
    return <div className={`max-w-3xl ${alignStyles} ${className}`}>{content}</div>;
  }

  return (
    <ScrollReveal className={`max-w-3xl ${alignStyles} ${className}`}>
      {content}
    </ScrollReveal>
  );
}
