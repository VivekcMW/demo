"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePatientAuthStore } from "@/store/usePatientAuthStore";
import { Heart, AlertTriangle, Loader2 } from "lucide-react";

export default function PatientLoginPage() {
  const router = useRouter();
  const login = usePatientAuthStore((s) => s.login);
  const [uhid, setUhid] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = uhid.trim();
    if (!q) { setError("Enter your UHID, Phone, or ABHA ID"); return; }
    setLoading(true);
    setError("");
    setTimeout(() => {
      const ok = login(q);
      if (ok) {
        router.push("/portal");
      } else {
        setError("No patient found with that ID. Please check and try again.");
        setLoading(false);
      }
    }, 400);
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--action-primary)]">
            <Heart size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Patient Portal</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Aarogya Hospital — Access your health records</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-6 shadow-sm">
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)]">
              UHID, Phone Number, or ABHA ID
            </label>
            <input
              type="text"
              value={uhid}
              onChange={(e) => { setUhid(e.target.value); setError(""); }}
              placeholder="e.g. UHID-20240001 or 9876543210"
              className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--surface-page)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--action-primary)]"
              autoFocus
            />
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-[var(--critical-fg)]/20 bg-[var(--critical-bg)] px-3 py-2.5 text-sm text-[var(--critical-fg)]">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !uhid.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--action-primary)] py-3 text-sm font-semibold text-white hover:bg-[var(--action-primary-hover)] disabled:opacity-50 transition-colors"
          >
            {loading ? <><Loader2 size={14} className="animate-spin" /> Verifying…</> : "Access My Health Records"}
          </button>

          <p className="mt-4 text-center text-xs text-[var(--text-secondary)]">
            For assistance, contact the hospital reception or helpdesk.
          </p>
        </form>
      </div>
    </div>
  );
}
