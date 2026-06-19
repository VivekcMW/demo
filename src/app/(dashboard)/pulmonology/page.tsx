"use client";

import { useState } from "react";
import PFTViewer from "@/components/PFTViewer";
import ABGInterpreter from "@/components/ABGInterpreter";
import { Wind, Activity } from "lucide-react";

type Tab = "pft" | "abg";

export default function PulmonologyPage() {
  const [tab, setTab] = useState<Tab>("pft");

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3">
        <Wind size={24} className="text-[var(--action-primary)]" />
        <div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Pulmonology</h1>
          <p className="text-sm text-[var(--text-secondary)]">Pulmonary function testing & arterial blood gas analysis</p>
        </div>
      </div>

      <div className="flex gap-2 border-b border-[var(--border-default)] pb-0">
        {[
          { id: "pft" as Tab, label: "PFT Viewer", icon: Wind },
          { id: "abg" as Tab, label: "ABG Interpreter", icon: Activity },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-all ${tab === t.id ? "border-[var(--action-primary)] text-[var(--action-primary)]" : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>
              <Icon size={16} />{t.label}
            </button>
          );
        })}
      </div>

      {tab === "pft" && <PFTViewer />}
      {tab === "abg" && <ABGInterpreter />}
    </div>
  );
}
