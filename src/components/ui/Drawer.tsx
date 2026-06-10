"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Tailwind max-width class, e.g. "max-w-lg" (default) or "max-w-xl" */
  maxWidth?: string;
  /** Accessible label for the dialog */
  "aria-label"?: string;
}

/**
 * Shared slide-in drawer shell.
 * - Closes on Escape key
 * - Traps focus inside the panel
 * - Returns null when closed (no DOM overhead)
 * Children are responsible for the header, body and footer.
 */
export function Drawer({
  open,
  onClose,
  children,
  maxWidth = "max-w-lg",
  "aria-label": ariaLabel,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape key → close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusableSelectors = [
      "button:not([disabled])",
      "[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(focusableSelectors)).filter(
        (el) => !el.closest("[hidden]")
      );

    // Focus first element on open
    const firstFocusable = getFocusable()[0];
    firstFocusable?.focus();

    const trapHandler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", trapHandler);
    return () => document.removeEventListener("keydown", trapHandler);
  }, [open]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={[
          "fixed inset-y-0 right-0 z-50 flex w-full flex-col",
          maxWidth,
          "border-l border-[var(--border-default)] bg-[var(--surface-raised)] shadow-2xl",
          "animate-slide-in-right",
        ].join(" ")}
      >
        {children}
      </div>
    </>
  );
}
