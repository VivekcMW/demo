"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { CheckCircle2, AlertTriangle, Info, X, XCircle } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast stack — bottom-right */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// ── Single toast item ─────────────────────────────────────────────────────────

const VARIANT_STYLES: Record<ToastVariant, { bg: string; icon: ReactNode }> = {
  success: {
    bg: "border-[var(--normal-fg)]/30 bg-[var(--normal-bg)] text-[var(--normal-fg)]",
    icon: <CheckCircle2 size={16} className="shrink-0 text-[var(--normal-fg)]" />,
  },
  error: {
    bg: "border-[var(--critical-fg)]/30 bg-[var(--critical-bg)] text-[var(--critical-fg)]",
    icon: <XCircle size={16} className="shrink-0 text-[var(--critical-fg)]" />,
  },
  warning: {
    bg: "border-[var(--warning-fg)]/30 bg-[var(--warning-bg)] text-[var(--warning-fg)]",
    icon: <AlertTriangle size={16} className="shrink-0 text-[var(--warning-fg)]" />,
  },
  info: {
    bg: "border-[var(--info-fg)]/30 bg-[var(--info-bg)] text-[var(--info-fg)]",
    icon: <Info size={16} className="shrink-0 text-[var(--info-fg)]" />,
  },
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const { bg, icon } = VARIANT_STYLES[toast.variant];
  return (
    <div
      role="status"
      className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg text-sm font-medium animate-toast max-w-sm ${bg}`}
    >
      {icon}
      <span className="flex-1 leading-snug text-[var(--text-primary)]">{toast.message}</span>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
