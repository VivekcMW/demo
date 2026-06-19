"use client";

import { useState } from "react";
import { Brain, FormInput } from "lucide-react";

const MMSE_ITEMS = [
  { q: "What is today's date? (day, month, year, season)", max: 5 },
  { q: "Where are we? (hospital, floor, city, state, country)", max: 5 },
  { q: "Name 3 objects: Apple, Table, Penny (repeat immediately)", max: 3 },
  { q: "Serial 7's: Subtract 7 from 100 (×5)", max: 5 },
  { q: "Recall the 3 objects named earlier", max: 3 },
  { q: "Name a pencil and a watch (show items)", max: 2 },
  { q: "Repeat: 'No ifs, ands, or buts'", max: 1 },
  { q: "Three-stage command: 'Take this paper, fold in half, put on floor'", max: 3 },
  { q: "Read and obey: 'Close your eyes' (written)", max: 1 },
  { q: "Write a sentence (grammar + content)", max: 1 },
  { q: "Copy intersecting pentagons (visual-spatial)", max: 1 },
];

const MOCA_ITEMS = [
  { q: "Visuospatial — Trail Making (B)", max: 1 },
  { q: "Visuospatial — Cube Copy", max: 1 },
  { q: "Visuospatial — Clock Drawing (contour, numbers, hands at 11:10)", max: 3 },
  { q: "Naming — Lion, Camel, Rhinoceros", max: 3 },
  { q: "Memory — 5 words (immediate recall ×2)", max: 5 },
  { q: "Attention — Digit span forward (5) / backward (3)", max: 2 },
  { q: "Attention — Letter A tapping", max: 1 },
  { q: "Attention — Serial 7s (3 correct)", max: 3 },
  { q: "Language — Repeat 2 sentences", max: 2 },
  { q: "Language — Verbal fluency (≥11 F-words/1min)", max: 1 },
  { q: "Abstraction — Similarities (watch/ruler, train/bicycle)", max: 2 },
  { q: "Delayed recall — 5 words (no cue/delayed)", max: 5 },
  { q: "Orientation — date/month/year/day/place/city", max: 6 },
];

export default function NeurologyPage() {
  const [tab, setTab] = useState<"cog"|"eegeo">("cog");
  const [mmseScore, setMmse] = useState(0);
  const [mocaScore, setMoca] = useState(0);

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Brain size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Neurology</h1><p className="text-sm text-[var(--text-secondary)]">Cognitive assessment & EEG viewer</p></div></div>

      <div className="flex gap-2 border-b pb-0">
        <button onClick={()=>setTab("cog")} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 ${tab==="cog"?"border-[var(--action-primary)] text-[var(--action-primary)]":"border-transparent text-[var(--text-secondary)]"}`}><FormInput size={16} /> MMSE / MoCA</button>
        <button onClick={()=>setTab("eegeo")} className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 ${tab==="eegeo"?"border-[var(--action-primary)] text-[var(--action-primary)]":"border-transparent text-[var(--text-secondary)]"}`}><Brain size={16} /> EEG Viewer</button>
      </div>

      {tab === "cog" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* MMSE */}
          <div className="space-y-3"><p className="text-xs font-semibold text-[var(--action-primary)]">Mini-Mental State Exam (MMSE)</p>
            {MMSE_ITEMS.map((item,i)=><label key={i} className="flex items-center gap-2 text-xs border-b pb-1"><input type="number" min={0} max={item.max} value={0} onChange={(e)=>{const n=[...Array(MMSE_ITEMS.length)].fill(0); n[i]=Math.min(item.max,Math.max(0,parseInt(e.target.value)||0)); setMmse(n.reduce((a,b)=>a+b,0))}} className="w-12 rounded border px-1 py-0.5 text-center" /><span className="flex-1 text-[var(--text-primary)]">{item.q}</span><span className="text-[var(--text-secondary)]">/{item.max}</span></label>)}
            <div className="rounded-xl border-2 p-3 text-center"><p className="text-2xl font-bold">{mmseScore}/30</p><span className={`rounded-full px-2 py-0.5 text-xs ${mmseScore>=24?"bg-[var(--normal-bg)] text-[var(--normal-fg)]":mmseScore>=18?"bg-[var(--warning-bg)] text-[var(--warning-fg)]":"bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{mmseScore>=24?"Normal":mmseScore>=18?"Mild Impairment":"Moderate-Severe"}</span></div>
          </div>
          {/* MoCA */}
          <div className="space-y-3"><p className="text-xs font-semibold text-[var(--action-primary)]">Montreal Cognitive Assessment (MoCA)</p>
            {MOCA_ITEMS.map((item,i)=><label key={i} className="flex items-center gap-2 text-xs border-b pb-1"><input type="checkbox" onChange={()=>setMoca((p)=>p+(p===i?1:1)-(p===i?1:0))} className="accent-[var(--action-primary)]" /><span className="flex-1 text-[var(--text-primary)]">{item.q}</span><span className="text-[var(--text-secondary)]">/{item.max}</span></label>)}
            <div className="rounded-xl border-2 p-3 text-center"><p className="text-2xl font-bold">{mocaScore}/30</p><span className={`rounded-full px-2 py-0.5 text-xs ${mocaScore>=26?"bg-[var(--normal-bg)] text-[var(--normal-fg)]":"bg-[var(--critical-bg)] text-[var(--critical-fg)]"}`}>{mocaScore>=26?"Normal":"Cognitive Impairment"}</span></div>
          </div>
        </div>
      )}

      {tab === "eegeo" && (
        <div className="rounded-xl border p-6 text-center">
          <Brain size={48} className="mx-auto text-[var(--text-secondary)] opacity-30" />
          <p className="text-sm text-[var(--text-secondary)] mt-3">EEG viewer with montage selector and event markers coming soon.</p>
          <p className="text-xs text-[var(--text-disabled)] mt-1">Requires integration with EEG device waveforms.</p>
        </div>
      )}
    </div>
  );
}
