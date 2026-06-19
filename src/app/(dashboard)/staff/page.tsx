"use client";

import { useOperationsStore } from "@/store/useOperationsStore";
import { Users, BadgeCheck, Clock, Search } from "lucide-react";
import { useState } from "react";

export default function StaffPage() {
  const { staff } = useOperationsStore();
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");

  const depts = [...new Set(staff.map((s) => s.department))];
  const filtered = staff.filter((s) => {
    const m = s.name.toLowerCase().includes(query.toLowerCase()) || s.designation.toLowerCase().includes(query.toLowerCase());
    return dept === "All" ? m : m && s.department === dept;
  });

  const active = staff.filter((s) => s.status === "Active").length;
  const onLeave = staff.filter((s) => s.status === "On Leave").length;

  return (
    <div className="space-y-5 pb-8">
      <div className="flex items-center gap-3"><Users size={24} className="text-[var(--action-primary)]" /><div><h1 className="text-xl font-semibold text-[var(--text-primary)]">Staff Directory</h1><p className="text-sm text-[var(--text-secondary)]">Hospital personnel & attendance</p></div></div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-center"><p className="text-2xl font-bold text-[var(--text-primary)]">{staff.length}</p><p className="text-xs text-[var(--text-secondary)]">Total Staff</p></div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-center"><p className="text-2xl font-bold text-[var(--normal-fg)]">{active}</p><p className="text-xs text-[var(--text-secondary)]">Active</p></div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] p-4 text-center"><p className="text-2xl font-bold text-[var(--warning-fg)]">{onLeave}</p><p className="text-xs text-[var(--text-secondary)]">On Leave</p></div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input type="text" placeholder="Search by name or designation…" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[var(--action-primary)]" />
        </div>
        <select value={dept} onChange={(e) => setDept(e.target.value)} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-raised)] px-3 py-2 text-sm outline-none">
          <option value="All">All Depts</option>
          {depts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="mobile-table-wrap rounded-xl border border-[var(--border-default)]">
        <table className="w-full text-xs">
          <thead><tr className="bg-[var(--surface-sunken)]"><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Designation</th><th className="px-3 py-2 text-left">Dept</th><th className="px-3 py-2 text-left">Shift</th><th className="px-3 py-2 text-center">Status</th><th className="px-3 py-2 text-right">Exp</th></tr></thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-[var(--border-default)]">
                <td className="px-3 py-2"><p className="font-medium text-[var(--text-primary)]">{s.name}</p><p className="text-[10px] text-[var(--text-secondary)]">{s.id}</p></td>
                <td className="px-3 py-2 text-[var(--text-primary)]">{s.designation}</td>
                <td className="px-3 py-2 text-[var(--text-secondary)]">{s.department}</td>
                <td className="px-3 py-2 text-[var(--text-secondary)]">{s.shift}</td>
                <td className="px-3 py-2 text-center"><span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${s.status === "Active" ? "bg-[var(--normal-bg)] text-[var(--normal-fg)]" : s.status === "On Leave" ? "bg-[var(--warning-bg)] text-[var(--warning-fg)]" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)]"}`}>{s.status}</span></td>
                <td className="px-3 py-2 text-right text-[var(--text-secondary)]">{s.experience}y</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
