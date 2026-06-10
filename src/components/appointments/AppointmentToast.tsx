"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface Props {
  message: string;
  show: boolean;
  onClose: () => void;
}

export function AppointmentToast({ message, show, onClose }: Props) {
  useEffect(() => {
    if (!show) return;
    const id = setTimeout(onClose, 4000);
    return () => clearTimeout(id);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[var(--normal-fg)]/30 bg-[var(--surface-raised)] px-4 py-3 shadow-lg animate-in slide-in-from-bottom-4 duration-300 max-w-sm">
      <CheckCircle2 size={18} className="shrink-0 text-[var(--normal-fg)]" />
      <p className="flex-1 text-sm text-[var(--text-primary)]">{message}</p>
      <button
        onClick={onClose}
        className="rounded p-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
